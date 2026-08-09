"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { TypeformFlow, type FlowStep } from "@/components/contact/typeform-flow"
import { submitContactForm } from "@/actions/contact.action"
import { ContactSidePanel } from "./contact-side-panel"
import { IntakeCard } from "./intake-card"
import {
    CURRENCIES, budgetOptions, budgetOptionFor, findTier, type CurrencyKey,
} from "@/content/pricing"

const PROJECT_TYPES = [
    "A new product, from scratch",
    "A rebuild of something we already have",
    "Adding to an existing system",
    "Not sure yet - we want advice",
]

const SCOPE = [
    "Marketing site",
    "SaaS platform or dashboard",
    "Internal tool",
    "E-commerce",
    "Integration with another system",
    "AI feature",
]

const TIMELINES = [
    "As soon as possible",
    "Within a month",
    "One to three months",
    "Later this year",
    "Just researching for now",
]

const PERSIST_KEY = "shunya.contact.draft.v1"

/** A currency code from the query string, or USD. Guards against `?currency=<anything>`. */
function readCurrency(raw: string | null): CurrencyKey {
    return raw && raw in CURRENCIES ? (raw as CurrencyKey) : "USD"
}

export function ContactFlow() {
    const params = useSearchParams()
    const [submitted, setSubmitted] = useState(false)

    const currency = readCurrency(params.get("currency"))
    const planSlug = params.get("plan")
    const match = planSlug ? findTier(planSlug) : undefined

    const budgets = useMemo(() => budgetOptions(currency), [currency])

    /**
     * Seed from a /pricing deep link.
     *
     * The budget answer is built with the same helper the option list uses, so a prefilled value is
     * always one of the rendered choices - if it were composed separately the two could drift and
     * the step would show nothing selected.
     */
    const initialAnswers = useMemo(() => {
        const seed: Record<string, unknown> = {}
        if (match) {
            seed.budget = budgetOptionFor(match.tier, currency)
            seed.scope = [match.domain.key === "web" ? "SaaS platform or dashboard" : "Marketing site"]
        }
        const topic = params.get("topic")
        if (topic) seed.message = topic
        return seed
    }, [match, currency, params])

    const prefilledLabel = match ? `${match.tier.name}` : undefined

    const steps: FlowStep[] = useMemo(() => [
        {
            id: "welcome",
            type: "welcome",
            question: match
                ? `Let's scope your ${match.tier.name} project`
                : "Let's talk about what you are building",
            description: match
                ? `We have carried your ${match.tier.name} selection over from the rate card. Eight short questions and we will come back with a scoped estimate.`
                : "Eight short questions - who you are, what you need, and roughly what you have in mind. We reply within one business day with a scoped estimate and a realistic timeline.",
        },
        {
            id: "name", type: "short_text", required: true,
            navLabel: "Your name", navCaption: "Who we should reply to",
            question: "First, who are we speaking to?",
            placeholder: "Your full name",
            validate: (v) => (String(v ?? "").trim().length < 2 ? "Please enter your name." : null),
        },
        {
            id: "email", type: "email", required: true,
            navLabel: "Email", navCaption: "Where the reply goes",
            question: "What email should we reply to?",
            description: "We use this for the estimate and nothing else. No list, no sequence.",
            placeholder: "you@company.com",
        },
        {
            id: "company", type: "short_text",
            navLabel: "Company", navCaption: "Optional",
            question: "What is the company called?",
            description: "Optional - it helps us look you up before the call.",
            placeholder: "Company or product name",
        },
        {
            id: "projectType", type: "single_choice", required: true,
            navLabel: "Project type", navCaption: "New, rebuild, or extend",
            question: "What kind of project is this?",
            options: PROJECT_TYPES,
        },
        {
            id: "scope", type: "multiple_choice", required: true,
            navLabel: "What you need", navCaption: "Pick everything that applies",
            question: "What needs building?",
            description: "Rough is fine. We will narrow it down together.",
            options: SCOPE,
        },
        {
            id: "budget", type: "single_choice", required: true,
            navLabel: "Budget", navCaption: "From the published rate card",
            question: "Which band does the budget sit in?",
            description: `Shown in ${CURRENCIES[currency].label}. These are the same tiers as our published rate card - an honest range now saves a round trip later.`,
            options: budgets,
        },
        {
            id: "timeline", type: "single_choice", required: true,
            navLabel: "Timeline", navCaption: "When you want to start",
            question: "When would you want to start?",
            options: TIMELINES,
        },
        {
            id: "intake", type: "consent",
            navLabel: "Deep intake", navCaption: "Take your time, with SyncHQ",
            question: "One last thing - want to go deeper?",
            description: "You have given us enough to reply properly. The rest is detail, and it works better without a form in the way.",
            consentLabel: "Yes - send me a SyncHQ intake session with my reply",
            consentFootnote:
                "Free, and no obligation - a project scoped this way is simply quicker for us to price. Leave it unticked and we will reply by email either way.",
            consentBody: <IntakeCard />,
        },
    ], [match, budgets, currency])

    /** Flatten the answers into the shape the Contact table stores. */
    async function handleSubmit(answers: Record<string, unknown>) {
        const str = (k: string) => String(answers[k] ?? "").trim()
        const scope = Array.isArray(answers.scope) ? (answers.scope as string[]) : []

        const optedIn = answers.intake === true

        const lines = [
            `Project type: ${str("projectType") || "Not stated"}`,
            `Needs: ${scope.length ? scope.join(", ") : "Not stated"}`,
            `Budget: ${str("budget") || "Not stated"}`,
            `Timeline: ${str("timeline") || "Not stated"}`,
            str("company") ? `Company: ${str("company")}` : null,
            match ? `Came from pricing: ${match.tier.name} (${match.domain.title})` : null,
            `SyncHQ intake session: ${optedIn ? "yes - send one" : "no"}`,
        ].filter(Boolean).join("\n")

        const res = await submitContactForm({
            name: str("name"),
            email: str("email"),
            message: lines,
            inquiryType: match ? "PRICING" : "PROJECT",
            // Stored as its own column too, so the intake queue can be filtered without parsing
            // the message body.
            intakeOptIn: optedIn,
        })

        // The flow only shows its success screen when onSubmit resolves, so a failed insert has to
        // throw - otherwise the visitor sees "sent" for a message that was never stored.
        if (!res.success) throw new Error(res.message)

        setSubmitted(true)
        try { window.localStorage.removeItem(PERSIST_KEY) } catch { }
    }

    return (
        <TypeformFlow
            steps={steps}
            initialAnswers={initialAnswers}
            onSubmit={handleSubmit}
            submitLabel="Send it"
            persistKey={PERSIST_KEY}
            showFormBack
            hideClose
            renderSidePanel={(nav) => <ContactSidePanel nav={nav} prefilled={prefilledLabel} />}
            headerLeft={
                /* Only at small widths - on lg+ the side panel carries the wordmark. */
                <Link href="/" className="flex items-center gap-2 lg:hidden" aria-label="ShunyaHQ home">
                    <Image src="/shunyahqmainlogo.png" alt="" width={24} height={24} className="h-6 w-6 invert dark:invert-0" />
                    <span className="text-[15px] font-semibold tracking-[-0.01em] text-so-ink">ShunyaHQ</span>
                </Link>
            }
            headerRight={
                /* Hidden on lg+ - the side panel carries the same link at its foot, and two
                   identical exits two inches apart is just noise. */
                <Link
                    href="/"
                    className="rounded-xl px-3 py-2 text-sm font-medium text-so-ink-3 transition-colors hover:text-so-ink lg:hidden"
                >
                    Back to site
                </Link>
            }
            thankYouTitle="Thanks - that is everything we need"
            thankYouDesc="We reply within one business day with a scoped estimate, a realistic timeline, and the questions we would need answered first."
            thankYouActions={
                <>
                    <Link href="/projects" className="so-btn so-btn-primary">See our work</Link>
                    <Link href="/blogs" className="so-btn so-btn-ghost">Read the guides</Link>
                </>
            }
            onStepChange={() => {
                if (submitted) toast.dismiss()
            }}
        />
    )
}
