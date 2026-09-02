// Single source of truth for the Services section. Imported by the /services
// listing page and the /services/[slug] dedicated pages so copy, metadata, and
// structured data never drift apart. Pricing numbers themselves live in
// @/content/pricing - here we only reference a pricingKey to pull the right tiers.

/** Pricing domains defined in @/content/pricing. */
export type PricingKey = "web"

/** lucide icon keys, mapped to a real component on the page (icons can't be serialized). */
export type ServiceIconKey =
    | "globe"
    | "smartphone"
    | "bot"
    | "cloud"
    | "layout"
    | "shield"

export type ProcessStep = {
    step: string
    title: string
    body: string
}

export type Outcome = {
    value: string
    label: string
}

export type ServiceFaq = {
    q: string
    a: string
}

/** A concrete, real-world scenario this service solves. */
export type UseCase = {
    title: string
    body: string
}

/** A grouped, labelled view of the tech stack so it reads as a system, not a tag soup. */
export type TechGroup = {
    group: string
    items: string[]
}

/**
 * One layer of the stack this engagement covers.
 *
 * ## Why this exists
 *
 * The studio deliberately consolidated from six services to one on 2026-08-09 (see the 301s and
 * their rationale in `next.config.ts`): six thin service URLs were competing for the same queries
 * instead of one strong one. That was the right SEO call and it stands.
 *
 * But the pitch everywhere else - the homepage capability grid, "one team for every layer of the
 * product" - names six disciplines, and only web was substantiated anywhere. A visitor who read
 * "Cloud architecture" or "AI integration" had nowhere to go.
 *
 * These are those disciplines, on the single service page rather than as five separate pages. Same
 * information, one URL, no thin duplicates.
 */
export type Discipline = {
    /** Animated SVG glyph key - see components/landing/discipline-glyphs.tsx. */
    glyph: "web" | "mobile" | "ai" | "cloud" | "design" | "security"
    title: string
    /** ONE sentence. The glyph carries the explanation; this only names the idea. */
    body: string
}

export type Service = {
    slug: string
    name: string
    eyebrow: string
    icon: ServiceIconKey
    tagline: string
    heroTitle: string
    heroDescription: string
    /** A rich, multi-sentence overview paragraph. */
    summary: string
    /** Expanded deliverables manifest. */
    whatWeDeliver: string[]
    /** The layers of the stack this engagement covers. Rendered as the "Every layer" section. */
    disciplines?: Discipline[]
    process: ProcessStep[]
    /** Real scenarios that show who this is for and what it unblocks. */
    useCases: UseCase[]
    techStack: string[]
    /** Grouped tech stack detail for a richer "tools behind the work" section. */
    techGroups: TechGroup[]
    outcomes: Outcome[]
    /** Maps the service to a pricing domain in @/content/pricing, when one applies. */
    pricingKey?: PricingKey
    faqs: ServiceFaq[]
    seoTitle: string
    seoDescription: string
}

export const SERVICES: Service[] = [
    {
        slug: "web-engineering",
        name: "Web Engineering",
        eyebrow: "Web Engineering",
        icon: "globe",
        tagline: "High-performance web applications built on Next.js 15 and React Server Components.",
        heroTitle: "Web applications engineered to scale, perform, and rank.",
        heroDescription:
            "From marketing sites to complex SaaS dashboards, we architect web systems that load fast, rank well, and stay maintainable as they grow.",
        summary:
            "We architect SEO-optimized, globally distributed web systems on Next.js 15 and React Server Components - from a high-converting landing page to a multi-tenant SaaS dashboard. Performance is a requirement we budget for, not an audit we run at the end. The front end, the data layer and the deploy pipeline are designed as one system, so the site that wins you a customer on Monday is the codebase your team confidently extends on Friday.",
        whatWeDeliver: [
            "Next.js 15 App Router architecture with a deliberate client/server boundary",
            "Accessible, responsive UI on a documented component library",
            "Technical SEO: semantic markup, metadata, sitemaps, JSON-LD",
            "Headless CMS so your team ships content without a deploy",
            "Core Web Vitals tuned on real devices, targeting 90+ Lighthouse",
            "Type-safe data layer with Prisma and tRPC, auth and RBAC wired in",
            "Image, font and bundle optimization with edge caching",
            "Analytics, error tracking and conversion events from day one",
            "CI/CD with a preview per pull request and one-click rollback",
            "Documentation, a component reference and 30 days of support",
        ],
        disciplines: [
            {
                glyph: "web",
                title: "Web engineering",
                body: "Next.js 15 and React Server Components, with the rendering strategy chosen per route rather than applied wholesale.",
            },
            {
                glyph: "mobile",
                title: "Mobile",
                body: "iOS and Android from one codebase, sharing the web build's data layer and design system so the two surfaces cannot drift.",
            },
            {
                glyph: "ai",
                title: "AI integration",
                body: "Retrieval grounded in your own data, with citations a user can check and an evaluation harness built alongside the feature.",
            },
            {
                glyph: "cloud",
                title: "Cloud architecture",
                body: "Infrastructure codified in Terraform and shipped through automated pipelines, so scaling is a config change rather than a project.",
            },
            {
                glyph: "design",
                title: "Design systems",
                body: "Tokens and documented components rather than a folder of screens, so the tenth feature looks like the first.",
            },
            {
                glyph: "security",
                title: "Security & DevOps",
                body: "Auth, encryption and monitoring scoped into the architecture in week one and tested before anything goes live.",
            },
        ],
        process: [
            {
                step: "01",
                title: "Architecture & Spec",
                body: "We turn your requirements into a written plan: routing, data layer, rendering strategy per route, auth model and a component inventory. You approve scope, stack and timeline before anyone writes code.",
            },
            {
                step: "02",
                title: "Build in Sprints",
                body: "Two-week sprints, each ending on a live staging URL. Every pull request ships its own preview, so you review working software instead of imagining a mockup.",
            },
            {
                step: "03",
                title: "Optimize & Harden",
                body: "We profile Core Web Vitals on real-device data, trim and split bundles, audit accessibility to WCAG 2.2 AA, and lock down security headers before launch.",
            },
            {
                step: "04",
                title: "Launch & Support",
                body: "Production deploy with monitoring, error tracking and analytics live from the first visitor - plus documentation and 30 days of post-launch support.",
            },
        ],
        useCases: [
            {
                title: "SaaS dashboard and product app",
                body: "A multi-tenant dashboard with authentication, role-based access, billing, and real-time data - built as a single Next.js codebase so your marketing site and product app share one design system, one deploy pipeline, and one team.",
            },
            {
                title: "High-converting marketing site",
                body: "A fast, SEO-strong marketing site wired to a headless CMS, with structured data, instant page loads, and conversion instrumentation - so your content team ships pages without engineering and every visit is measured.",
            },
            {
                title: "Legacy front-end rebuild",
                body: "Replacing a slow, jQuery-or-WordPress front end that drags down Core Web Vitals and rankings. We migrate incrementally to Next.js, recover lost performance budget, and leave you a typed, maintainable codebase.",
            },
            {
                title: "Headless commerce storefront",
                body: "A storefront on Next.js connected to Shopify, Stripe, or a headless commerce backend - server-rendered for SEO, edge-cached for speed, and built to handle launch-day traffic spikes without falling over.",
            },
        ],
        techStack: [
            "Next.js 15",
            "React Server Components",
            "TypeScript",
            "Tailwind CSS",
            "Prisma",
            "tRPC",
            "PostgreSQL",
            "Auth.js",
            "Vercel / Edge",
            "Framer Motion",
        ],
        techGroups: [
            { group: "Framework & UI", items: ["Next.js 15", "React Server Components", "TypeScript", "Tailwind CSS", "Framer Motion", "shadcn/ui"] },
            { group: "Data & API", items: ["Prisma", "tRPC", "PostgreSQL", "Drizzle", "Zod", "TanStack Query"] },
            { group: "Auth & Content", items: ["Auth.js", "Clerk", "Sanity", "Contentful", "Payload CMS"] },
            { group: "Infra & Delivery", items: ["Vercel / Edge", "GitHub Actions", "Sentry", "PostHog", "Cloudflare"] },
        ],
        outcomes: [
            { value: "90+", label: "Lighthouse performance, SEO, and accessibility" },
            { value: "2x", label: "Faster time-to-launch vs. a from-scratch build" },
            { value: "100%", label: "Type-safe from database to UI" },
            { value: "0", label: "Surprise rewrites - architecture built to grow" },
        ],
        pricingKey: "web",
        faqs: [
            {
                q: "Why Next.js 15 instead of a traditional CMS or page builder?",
                a: "Next.js gives us server-side rendering for SEO, fine-grained control over performance, and a single codebase for both your marketing site and product app. Page builders and traditional CMSs trade that control for short-term convenience - and you pay for it later in load times, plugin bloat, lock-in, and rigidity. With Next.js you still get a friendly content workflow through a headless CMS, without sacrificing speed or flexibility.",
            },
            {
                q: "Can you work with our existing design or do you design from scratch?",
                a: "Both. We can build pixel-accurate from your Figma files, extend an existing design system, or design and build end to end. If you have a brand, we respect it; if you don't, we'll establish one - and either way the result is a documented, reusable component library rather than a pile of one-off screens.",
            },
            {
                q: "How do you make sure the site is fast?",
                a: "We budget performance from day one: server components to ship less JavaScript, next/image and font optimization, edge caching, route-level code-splitting, and streaming where it helps. Before launch we audit against Core Web Vitals using real-device field data and target a 90+ Lighthouse score - not just a green number on a fast laptop.",
            },
            {
                q: "Will my team be able to update content without a developer?",
                a: "Yes. We integrate a headless CMS such as Sanity, Contentful, or Payload so marketing and content teams can publish, edit, and reorder content through a friendly interface - no deploys, no developer in the loop. Structured content models keep the site consistent while still giving editors freedom.",
            },
            {
                q: "Can you migrate our existing site without losing SEO?",
                a: "Yes, and we plan for it deliberately. We map old URLs to new ones with proper 301 redirects, preserve metadata and structured data, keep your sitemap current, and migrate incrementally where possible so search engines never see a broken site. The goal is to keep the rankings you've earned while gaining the speed you've been missing.",
            },
            {
                q: "What happens after launch?",
                a: "Every project ships with documentation, a component reference, and 30 days of post-launch support. Beyond that, we offer ongoing retainers for new features, maintenance, dependency updates, and performance monitoring - so the site keeps improving instead of quietly decaying.",
            },
        ],
        seoTitle: "Web Engineering & Next.js Development - Shunya",
        seoDescription:
            "High-performance web applications built on Next.js 15 and React Server Components. SEO-ready, Core Web Vitals optimized, type-safe end to end. From $1,599.",
    },
]

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug)

export function getServiceBySlug(slug: string): Service | undefined {
    return SERVICES.find((s) => s.slug === slug)
}
