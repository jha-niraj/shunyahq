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
            "We architect scalable, SEO-optimized, and globally distributed web systems on Next.js 15 and React Server Components. Whether you need a high-converting landing page, a content-heavy marketing site, or a multi-tenant SaaS dashboard, we treat performance as a first-class requirement - not an afterthought. Every build is measured against Core Web Vitals, designed for maintainability, and shipped with the kind of architecture that won't need a rewrite in eighteen months. Why it matters: the web is still where most buyers form their first impression and where search engines decide whether you're worth surfacing. A slow, brittle front end quietly costs you conversions and rankings every single day - studies consistently tie every additional second of load time to measurable drops in conversion. We design the front end, the data layer, and the deploy pipeline as one coherent system, so the site that wins you a customer on Monday is the same codebase your team confidently extends on Friday.",
        whatWeDeliver: [
            "Next.js 15 App Router architecture with React Server Components and a sensible client/server boundary",
            "Responsive, accessible UI built with Tailwind CSS and a documented, reusable component library",
            "Technical SEO foundation - semantic markup, metadata, canonical URLs, XML sitemaps, robots, and JSON-LD structured data",
            "Headless CMS integration (Sanity, Contentful, or Payload) so non-technical teams ship content safely without deploys",
            "Core Web Vitals tuning and Lighthouse auditing on real devices, targeting 90+ across performance, accessibility, and SEO",
            "Type-safe data layer with Prisma and tRPC, plus authentication and role-based authorization wired in",
            "Image, font, and bundle optimization - next/image, edge caching, code-splitting, and ISR/streaming where they fit",
            "Analytics, error tracking, and conversion event instrumentation from day one, not bolted on later",
            "CI/CD deploy pipeline with a preview environment for every pull request and one-click rollbacks",
            "Documentation, a component storybook, and 30 days of post-launch support for a clean, confident handoff",
        ],
        process: [
            {
                step: "01",
                title: "Architecture & Spec",
                body: "We map your requirements to a concrete technical plan - routing model, data layer, rendering strategy (SSR, SSG, ISR, or streaming per route), auth model, and a component inventory. We pin down which pages must be statically generated for SEO and which need live data, then hand you a written spec and an architecture diagram before a single line of code is written. You approve scope, stack, and timeline up front, so there are no surprises mid-build.",
            },
            {
                step: "02",
                title: "Build in Sprints",
                body: "We work in two-week agile sprints, deploying to a staging URL at the end of every one. You always click on real, working software - never a deck of mockups - and steer priorities as the product takes shape. Each pull request ships with its own preview deployment, so stakeholders can review a live link instead of imagining what the change will look like.",
            },
            {
                step: "03",
                title: "Optimize & Harden",
                body: "We profile Core Web Vitals against real-device data, eliminate render-blocking work, trim and split JavaScript bundles, and add caching and edge strategies where they earn their keep. We audit accessibility to WCAG 2.2 AA, lock down security headers, and verify the SEO foundation - metadata, structured data, and crawlability - so the site is fast, findable, and usable by everyone.",
            },
            {
                step: "04",
                title: "Launch & Support",
                body: "We deploy to production with monitoring, error tracking, and analytics live from the first visitor. You get full documentation, a component reference, and 30 days of post-launch support to catch anything the real world surfaces. From there you can extend it in-house with confidence or keep us on a retainer for new features and ongoing performance work.",
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
