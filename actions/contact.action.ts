"use server"

import { z } from "zod"
import { SITE_ORG } from "@/lib/site"
import { sendLeadToSyncHQ } from "@/lib/synchq/leads"

/**
 * Contact submissions go to SyncHQ, not to a table here.
 *
 * SyncHQ is where leads are worked and where the AI intake session is sent from, so posting
 * straight into it is the shortest path from "somebody filled in the form" to "somebody is
 * following it up". This site keeps no copy: a second store would be a second inbox to check, and
 * the one nobody checks is the one enquiries die in.
 */

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    /** Optional - the flow asks for it, but not everybody has one to give. */
    company: z.string().max(160).optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
    /** Ticked the SyncHQ intake session at the end of the flow. */
    wantsIntake: z.boolean().optional(),
    /** Where the enquiry came from - PROJECT, PRICING, and so on. */
    inquiryType: z.string().min(1).max(40).optional(),

    // The structured answers. Sent alongside `message` rather than only inside it, so SyncHQ can
    // filter and report on them instead of anyone having to read a paragraph to find the budget.
    projectType: z.string().max(200).optional(),
    scope: z.array(z.string().max(120)).max(20).optional(),
    budget: z.string().max(120).optional(),
    timeline: z.string().max(120).optional(),
    /** The pricing tier they arrived from, when they came through a rate-card deep link. */
    plan: z.string().max(120).optional(),
    currency: z.string().max(8).optional(),
    /** The page the flow was opened from, for attribution. */
    page: z.string().max(300).optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>

export type ContactResult =
    | { success: true; message: string }
    | { success: false; message: string }

/** Where to send someone when the handoff fails. Their message is worth more than our pipeline. */
const FALLBACK = `Please try again, or email us directly at ${SITE_ORG.email}.`

export async function submitContactForm(formData: ContactFormData): Promise<ContactResult> {
    const parsed = contactSchema.safeParse(formData)
    if (!parsed.success) {
        return {
            success: false,
            message: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
        }
    }

    const d = parsed.data

    const result = await sendLeadToSyncHQ({
        name: d.name,
        email: d.email,
        company: d.company,
        message: d.message,
        wantsIntake: d.wantsIntake ?? false,
        data: {
            // `budget` and `company` are among SyncHQ's built-in aliases, so these land on the
            // right lead fields without any mapping on either side.
            budget: d.budget,
            timeline: d.timeline,
            projectType: d.projectType,
            needs: d.scope?.length ? d.scope.join(", ") : undefined,
            plan: d.plan,
            currency: d.currency,
            inquiryType: d.inquiryType ?? "PROJECT",
            wantsIntake: d.wantsIntake ?? false,
            page: d.page ?? "/contactus",
            heardVia: "shunyahq.com contact flow",
        },
    })

    if (result.ok) {
        return {
            success: true,
            // A duplicate inside SyncHQ's 24h window is still "we have your message" from the
            // visitor's side. Telling them it was a duplicate would only make them wonder whether
            // the first one arrived.
            message: "Thank you for your message. We'll get back to you soon!",
        }
    }

    if (result.status === 429) {
        return {
            success: false,
            message: `We have had a burst of messages just now. Give it a minute and try again, or email us at ${SITE_ORG.email}.`,
        }
    }

    // Everything else is our problem, not theirs, and the detail is already in the server log.
    return { success: false, message: `Something went wrong on our end. ${FALLBACK}` }
}
