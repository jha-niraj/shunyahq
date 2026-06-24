import type { ShaderPalette } from "@/components/landing/shader-palettes"

export type ToolStatus = "Live" | "In beta" | "Building"

export interface ToolMeta {
    slug: string
    name: string
    eyebrow: string
    status: ToolStatus
    palette: ShaderPalette
    /** short line for the /tools card */
    tagline: string
    /** hero on the detail page */
    heroTitle: string
    heroDescription: string
    /** detail intro paragraph */
    summary: string
    howItWorks: { step: string; title: string; body: string }[]
    features: string[]
    /** per-tool FAQs rendered with the shared PageFAQ component */
    faqs?: { q: string; a: string }[]
    seoTitle: string
    seoDescription: string
    /** optional external/internal link - when set the card links here instead of the detail page */
    href?: string
}

export const PRODUCT_TOOLS: ToolMeta[] = [
    {
        slug: "syncorbit",
        name: "SyncOrbit",
        eyebrow: "Product",
        status: "In beta",
        palette: "jade",
        tagline:
            "The centralized command center for high-velocity engineering teams. Unify code, tasks, and client communication in one real-time interface.",
        heroTitle: "One command center for your whole engineering team.",
        heroDescription:
            "SyncOrbit unifies code, tasks, and client communication in a single real-time interface - so your team and your clients always see the same source of truth.",
        summary:
            "Engineering teams lose hours stitching together a kanban board, a Git provider, a CI dashboard, and a separate channel for client updates. SyncOrbit collapses all of it into one real-time workspace: a Kanban board wired directly to your Git activity, automated sprint reports, view-only portals you can share with clients, and a live view of your CI/CD pipeline. Everyone works from the same picture, and nobody has to write a status update by hand.",
        howItWorks: [
            { step: "01", title: "Connect your repos", body: "Link your Git provider and pipelines. SyncOrbit maps branches, commits, and builds onto your board automatically - no manual ticket bookkeeping." },
            { step: "02", title: "Work in real time", body: "Your team moves cards across a Kanban that updates live with Git activity, while CI/CD status surfaces inline so blockers are visible the moment they happen." },
            { step: "03", title: "Share, don't summarize", body: "Hand clients a view-only portal and let SyncOrbit auto-generate the sprint report. Stakeholders see real progress instead of a hand-written status deck." },
        ],
        features: [
            "Real-time Kanban with Git integration",
            "Automated sprint reporting",
            "Client view-only portals",
            "CI/CD pipeline visualization",
            "One source of truth for team and clients",
        ],
        faqs: [
            { q: "Which Git providers does SyncOrbit work with?", a: "SyncOrbit connects to the major Git providers and maps your branches, commits, and pull requests onto the board automatically. If you run a setup we don't support yet, tell us during the beta and we'll prioritize it." },
            { q: "Do clients need an account to view progress?", a: "No. You share a view-only portal link and stakeholders see live progress and the latest sprint report without signing up or touching your internal workspace." },
            { q: "How are sprint reports generated?", a: "SyncOrbit assembles them from real Git and board activity, so the report reflects what actually shipped instead of a hand-written summary. You review it before it goes out." },
            { q: "Is SyncOrbit ready for production use?", a: "It's currently in beta. Core features - the Git-integrated Kanban, client portals, automated reports, and CI/CD visibility - are working today, and we onboard beta teams directly so we can shape it around how you work." },
            { q: "How do I get access?", a: "Reach out through the contact page and tell us about your team. We're letting teams into the beta in batches and will get you set up." },
        ],
        seoTitle: "SyncOrbit - real-time command center for engineering teams",
        seoDescription:
            "SyncOrbit unifies code, tasks, and client communication in one real-time interface: Git-integrated Kanban, automated sprint reports, client portals, and CI/CD visualization.",
    },
    {
        slug: "budget-estimator",
        name: "Project Budget Estimator",
        eyebrow: "Utility",
        status: "Live",
        palette: "emerald",
        tagline:
            "Get a transparent, instant cost estimate for your project across web, mobile, AI, and cloud - no 'contact for quote' wall.",
        heroTitle: "Know what your project costs - instantly.",
        heroDescription:
            "Skip the 'contact for quote' wall. Pick your scope across web, mobile, AI, and cloud and get a transparent, itemized estimate in seconds, in your currency.",
        summary:
            "Most agencies hide pricing behind a sales call. We don't. The Project Budget Estimator lets you build a rough scope - platform, features, and complexity - and returns a transparent cost range across web, mobile, AI, and cloud work. It shows a per-line breakdown so you can see exactly what drives the number, works in four currencies, and never asks you to sign up first.",
        howItWorks: [
            { step: "01", title: "Pick your scope", body: "Choose the platforms and capabilities your project needs - web, mobile, AI, cloud - and set the complexity that matches your ambitions." },
            { step: "02", title: "See it break down", body: "The estimator builds a transparent, itemized cost range, line by line, so you can see exactly what each part of the build contributes." },
            { step: "03", title: "Take it to a call", body: "Switch between four currencies and bring the estimate to a strategy call - no signup, no 'contact for quote' gate, no surprises." },
        ],
        features: [
            "Instant estimate, no sales call required",
            "Covers web, mobile, AI, and cloud scope",
            "Transparent per-line scope breakdown",
            "Four currencies (USD, EUR, AUD, INR)",
            "No signup - just answers",
        ],
        faqs: [
            { q: "How accurate is the estimate?", a: "It's a transparent ballpark, not a fixed quote. The estimator uses the same pricing logic we apply internally, so it gets you to a realistic range fast. The exact number is confirmed once we scope the details together." },
            { q: "Do I have to sign up or talk to sales first?", a: "No. There's no signup and no 'contact for quote' wall. Pick your scope and you get an itemized range in seconds." },
            { q: "What kinds of projects can I estimate?", a: "Web, mobile, AI, and cloud work, across different complexity levels. You choose the platforms and capabilities your project needs and the estimator builds the range from there." },
            { q: "Which currencies are supported?", a: "Four: USD, EUR, AUD, and INR. Switch between them so you can budget in the currency your business actually runs on." },
            { q: "What do I do with the estimate?", a: "Bring it to a free strategy call. We'll pressure-test the scope, refine the number, and turn it into a concrete plan with no obligation." },
        ],
        seoTitle: "Project Budget Estimator - instant transparent project pricing",
        seoDescription:
            "Get an instant, transparent cost estimate for your web, mobile, AI, or cloud project across four currencies - with a full scope breakdown and no 'contact for quote' wall.",
    },
    {
        slug: "rate-card",
        name: "Global Rate Card",
        eyebrow: "Reference",
        status: "Live",
        palette: "goldNoir",
        tagline:
            "Standardized, transparent pricing across 4 currencies for web, mobile, and visual production.",
        heroTitle: "Transparent pricing, in your currency.",
        heroDescription:
            "Standardized rate cards for web engineering, mobile, and visual production - shown across four global currencies, with no hidden fees.",
        summary:
            "Our Global Rate Card publishes standardized starting prices for web engineering, the mobile ecosystem, and visual production, so you can budget before you ever talk to us. Every tier lists what is and isn't included, and you can view the whole thing in USD, EUR, AUD, or INR. It's the same pricing protocol we use internally - just open for everyone to see.",
        howItWorks: [
            { step: "01", title: "Choose your domain", body: "Select the service you're scoping - web engineering, the mobile ecosystem, or visual production - to see the matching rate card." },
            { step: "02", title: "Compare the tiers", body: "Each tier lists its starting investment and exactly what's included and excluded, so there are no surprises when the contract arrives." },
            { step: "03", title: "Switch your currency", body: "View every number in USD, EUR, AUD, or INR and budget in the currency your business actually runs on." },
        ],
        features: [
            "Standardized pricing across every service",
            "Four global currencies",
            "Clear included / not-included per tier",
            "No hidden fees, no quote wall",
            "The same protocol we use internally",
        ],
        faqs: [
            { q: "Are these prices fixed?", a: "They're standardized starting points so you can budget before you talk to us. Final pricing depends on your exact scope, but every tier states clearly what is and isn't included, so there are no surprises." },
            { q: "What's included in each tier?", a: "Each tier lists its starting investment alongside exactly what's included and excluded. You see the boundaries up front rather than discovering them in the contract." },
            { q: "Which currencies can I view?", a: "USD, EUR, AUD, and INR. View the entire rate card in whichever currency your business runs on." },
            { q: "Are there hidden fees?", a: "No. The rate card is the same pricing protocol we use internally, published openly with no quote wall and no surprise costs." },
            { q: "What services does the rate card cover?", a: "Web engineering, the mobile ecosystem, and visual production. Pick the domain you're scoping to see its matching card." },
        ],
        seoTitle: "Global Rate Card - transparent agency pricing in 4 currencies",
        seoDescription:
            "Standardized, transparent rate cards for web, mobile, and visual production across four global currencies, with clear inclusions and no hidden fees.",
        href: "/pricing",
    },
    {
        slug: "strategy-call",
        name: "Free Strategy Call",
        eyebrow: "Service",
        status: "Live",
        palette: "amber",
        tagline:
            "Book a 30-min technical discovery call to scope your project with our engineers.",
        heroTitle: "Scope your project with an engineer - free.",
        heroDescription:
            "Book a 30-minute technical discovery call. You'll talk to an engineer, not a salesperson, and leave with a clear sense of scope, stack, and timeline.",
        summary:
            "Before any project starts, a short conversation saves weeks. The Free Strategy Call is a 30-minute technical discovery session with one of our engineers. We'll pressure-test your idea, talk through the right stack, surface the risks, and give you an honest read on scope and timeline - no obligation, no sales script.",
        howItWorks: [
            { step: "01", title: "Pick a slot", body: "Grab a 30-minute slot that works for you. No forms to fill out beyond your name and what you want to build." },
            { step: "02", title: "Talk to an engineer", body: "You'll meet an actual engineer who has shipped products like yours - not an account manager reading from a deck." },
            { step: "03", title: "Leave with a plan", body: "Walk away with a clear read on scope, the right stack, the real risks, and an honest timeline you can act on." },
        ],
        features: [
            "30 minutes, free, no obligation",
            "Talk to an engineer, not a salesperson",
            "Honest read on scope and timeline",
            "Stack and architecture guidance",
            "A clear next step, whatever you decide",
        ],
        faqs: [
            { q: "Is the call really free?", a: "Yes. It's a free 30-minute technical discovery session with no obligation and no sales script." },
            { q: "Who will I be talking to?", a: "An actual engineer who has shipped products like yours - not an account manager reading from a deck." },
            { q: "What should I prepare?", a: "Just your name and a sense of what you want to build. There are no forms to fill out beyond that. If you've used the budget estimator, bring the estimate along." },
            { q: "What will I walk away with?", a: "A clear read on scope, the right stack, the real risks, and an honest timeline you can act on - whether or not you decide to work with us." },
            { q: "What happens after the call?", a: "If it makes sense to move forward, we turn the conversation into a concrete plan. If not, you still leave with useful direction. No pressure either way." },
        ],
        seoTitle: "Free Strategy Call - 30-min technical project discovery",
        seoDescription:
            "Book a free 30-minute technical discovery call with a Shunya engineer to scope your project, choose the right stack, and get an honest timeline.",
        href: "https://cal.com/niraj-jha/30min",
    },
]

export function getToolBySlug(slug: string): ToolMeta | undefined {
    return PRODUCT_TOOLS.find((t) => t.slug === slug)
}
