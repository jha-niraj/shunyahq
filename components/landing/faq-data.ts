// Single source of truth for the landing-page FAQ. Imported by the FAQ
// component (faq-section.tsx) and by any page that emits FAQ JSON-LD, so the
// visible questions and the structured data never drift apart.
export const LANDING_FAQS: { q: string; a: string }[] = [
    {
        q: "What kind of projects do you take on?",
        a: "We build production web apps, mobile apps, AI integrations, and cloud infrastructure - from MVPs to enterprise systems. Every project we ship goes live: not a prototype, not a Figma deck, but a real production system people actually use.",
    },
    {
        q: "How long does a typical project take?",
        a: "We scope in weeks, not quarters. Most MVPs ship in 4-8 weeks with bi-weekly deployments to staging, so you always see real working software rather than status decks. Larger enterprise systems are scoped sprint by sprint with honest timelines from day one.",
    },
    {
        q: "What's your tech stack?",
        a: "Modern and type-safe: Next.js 15, React Server Components, tRPC, Prisma, and PostgreSQL on the application layer, plus AWS/Azure, Docker, and Kubernetes for infrastructure. We move fast with proven stacks so we never create technical debt you'll pay for later.",
    },
    {
        q: "Do you offer post-launch support?",
        a: "Yes. Every launch ships with documentation and 30 days of post-launch support. After that, we offer ongoing retainers for monitoring, security patching, and feature work so your system keeps running and evolving.",
    },
    {
        q: "How does pricing work?",
        a: "Transparent rate cards across 4 global currencies (USD, EUR, AUD, INR) - no hidden fees, no 'contact for quote' walls for standard projects. Web engineering starts at $1,599, mobile at $2,599, and visual narrative at $599. See /pricing for the full breakdown.",
    },
    {
        q: "Do you only build, or do you design too?",
        a: "Both. We deliver full design systems, high-fidelity prototypes, and accessible UI alongside the engineering. One team owns frontend, backend, infra, and deployment - no handoffs, no finger-pointing.",
    },
    {
        q: "Can you take over an existing or legacy codebase?",
        a: "Yes - we modernize monolithic architectures into scalable microservices without downtime. We start with an audit, plan the migration in safe increments, and ship continuously so your product keeps running throughout.",
    },
    {
        q: "What is SyncOrbit?",
        a: "SyncOrbit is our centralized command center for high-velocity engineering teams - currently in beta. It unifies code, tasks, and client communication in one real-time interface with Git-integrated Kanban, automated sprint reporting, client view-only portals, and CI/CD pipeline visualization.",
    },
]

// Pricing-page FAQ - same shape, page-specific content.
export const PRICING_FAQS: { q: string; a: string }[] = [
    {
        q: "Why do you publish prices when most agencies don't?",
        a: "Because hiding pricing behind a sales call wastes everyone's time. Our rate cards give you a realistic starting point for web, mobile, visual production, and cloud work before you ever talk to us. The final number depends on scope, but you'll never hit a 'contact for quote' wall for standard projects.",
    },
    {
        q: "Are these prices fixed or a starting point?",
        a: "They're transparent starting points. Each tier lists exactly what's included and excluded so you can self-select. For complex or enterprise work we scope a bespoke quote based on engineering hours and resource allocation - still itemized, still no surprises.",
    },
    {
        q: "Which currency will I be billed in?",
        a: "You can view every rate card in USD, EUR, AUD, or INR. We invoice in the currency that works best for your business; the on-page converter uses indicative rates, and the exact amount is confirmed in your proposal.",
    },
    {
        q: "What does 'support' included with each tier mean?",
        a: "Every build ships with documentation and a post-launch support window (2-90 days depending on tier) covering bug fixes and handover. After that, we offer ongoing retainers for monitoring, security patching, and feature work.",
    },
    {
        q: "Can I mix services across tiers?",
        a: "Absolutely. Most real projects combine web, mobile, AI, and cloud work. Tell us your scope and we'll assemble a single, transparent proposal across whatever services you need.",
    },
    {
        q: "Do you offer equity or deferred arrangements for startups?",
        a: "For early-stage founders we offer flexible arrangements - including small equity options instead of large upfront costs - through our accelerator. It's case-by-case and always documented clearly up front.",
    },
]
