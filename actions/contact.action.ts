"use server"

import { db } from "@/lib/db";
import { contact } from "@/lib/db/schema";
import { z } from "zod";

// The Contact table stores a flat record. The multi-step flow composes its extra answers - project
// type, scope, budget, timeline - into `message` before calling this, so no migration is needed and
// nothing the visitor typed is dropped.
const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    /** Where the enquiry came from. Free text, defaulted so older callers keep working. */
    inquiryType: z.string().min(1).max(40).optional(),
    /** Opted in to the SyncHQ AI intake session. Undefined means the question was not asked. */
    intakeOptIn: z.boolean().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export type ContactResult =
    | { success: true; message: string; id: string }
    | { success: false; message: string };

export async function submitContactForm(formData: ContactFormData): Promise<ContactResult> {
    const parsed = contactSchema.safeParse(formData);
    if (!parsed.success) {
        return {
            success: false,
            message: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
        };
    }

    try {
        const [created] = await db
            .insert(contact)
            .values({
                name: parsed.data.name,
                email: parsed.data.email,
                inquiryType: parsed.data.inquiryType ?? "GENERAL",
                message: parsed.data.message,
                intakeOptIn: parsed.data.intakeOptIn ?? null,
                // Set explicitly. The Drizzle schema declares .defaultNow() on updatedAt but the
                // live table has no server-side default on that column, so leaving it to `default`
                // sends NULL into a NOT NULL column and every insert fails with 23502.
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning();

        if (!created) {
            return { success: false, message: "We could not save your message. Please try again." };
        }

        return {
            success: true,
            message: "Thank you for your message. We'll get back to you soon!",
            id: created.id,
        };
    } catch (error) {
        // Never leak a driver error to the browser; log it and return something actionable.
        console.error("submitContactForm failed:", error);
        return {
            success: false,
            message: "Something went wrong on our end. Please try again, or email us directly.",
        };
    }
}
