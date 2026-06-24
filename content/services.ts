// Single source of truth for the Services section. Imported by the /services
// listing page and the /services/[slug] dedicated pages so copy, metadata, and
// structured data never drift apart. Pricing numbers themselves live in
// @/content/pricing - here we only reference a pricingKey to pull the right tiers.

/** Pricing domains defined in @/content/pricing. */
export type PricingKey = "web" | "mobile" | "video" | "cloud"

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
    {
        slug: "mobile-ecology",
        name: "Mobile Ecology",
        eyebrow: "Mobile Ecology",
        icon: "smartphone",
        tagline: "Native-feel cross-platform apps using React Native and Expo.",
        heroTitle: "One codebase, two app stores, zero compromises.",
        heroDescription:
            "Reach users on iOS and Android with a single React Native codebase - without giving up native performance, biometrics, offline support, or store approval.",
        summary:
            "We build native-feel cross-platform applications using React Native and Expo, so you reach users on both iOS and Android from a single codebase without compromising on performance or native capabilities. We handle the entire lifecycle: architecture, UI, native module bridging, push notifications, offline-first data, and the often-painful submission process to the App Store and Play Store. Why it matters: building and maintaining two separate native apps is roughly twice the cost and twice the bugs. A well-architected cross-platform app ships faster, costs less to maintain, and still feels native to the people using it every day.",
        whatWeDeliver: [
            "iOS & Android binary builds from a single React Native / Expo codebase",
            "App Store and Play Store submission, review handling, and release management",
            "Push notification system with segmentation and deep linking",
            "Offline-first architecture with local caching and background sync",
            "Native module bridging for camera, biometrics, payments, and device APIs",
            "Authentication, profiles, and secure token storage",
            "Over-the-air (OTA) updates so you can ship fixes without a full store review",
        ],
        process: [
            {
                step: "01",
                title: "Platform Strategy",
                body: "We define the navigation model, offline strategy, and which features need true native modules versus cross-platform components - so nothing gets re-architected mid-build.",
            },
            {
                step: "02",
                title: "Build & Bridge",
                body: "Sprints with TestFlight / internal-track builds you can install on real devices. We bridge native capabilities (biometrics, camera, payments) as they're needed.",
            },
            {
                step: "03",
                title: "Store Submission",
                body: "We prepare store listings, handle review requirements, configure signing and certificates, and shepherd the app through Apple and Google approval.",
            },
            {
                step: "04",
                title: "Launch & Iterate",
                body: "Post-launch monitoring, crash reporting, and OTA updates let us push improvements fast - without waiting on a full store re-review for every fix.",
            },
        ],
        useCases: [
            {
                title: "Consumer app launching on both stores",
                body: "A new product that needs to reach iOS and Android users at the same time, with sign-up, payments, push, and a polished native feel - shipped from one codebase instead of funding two separate native teams.",
            },
            {
                title: "Field and operations app that works offline",
                body: "An app for technicians, drivers, or sales reps who lose signal in the field. Offline-first storage and background sync mean they keep working on a dead connection and the data reconciles the moment they're back online.",
            },
            {
                title: "Companion app for an existing web product",
                body: "Extending a SaaS or web platform with a mobile companion that reuses your existing API, adds push notifications and biometrics, and gives users a fast, native way to act on the go.",
            },
            {
                title: "Subscription or in-app purchase product",
                body: "A monetized app with tiered subscriptions or one-off purchases, wired through RevenueCat and the app stores correctly - so billing, trials, restores, and receipts all work the way Apple and Google expect.",
            },
        ],
        techStack: [
            "React Native",
            "Expo",
            "TypeScript",
            "Swift / Kotlin (native modules)",
            "Firebase",
            "Push (FCM / APNs)",
            "SQLite / WatermelonDB",
            "Stripe / RevenueCat",
        ],
        techGroups: [
            { group: "Core", items: ["React Native", "Expo", "TypeScript", "React Navigation", "Reanimated"] },
            { group: "Native bridge", items: ["Swift", "Kotlin", "Camera & biometrics", "Bluetooth / IoT"] },
            { group: "Data & sync", items: ["SQLite", "WatermelonDB", "Firebase", "Background sync"] },
            { group: "Growth & delivery", items: ["Push (FCM / APNs)", "Stripe / RevenueCat", "OTA updates", "Crash reporting"] },
        ],
        outcomes: [
            { value: "2", label: "Platforms from one codebase" },
            { value: "~50%", label: "Lower build cost vs. dual-native" },
            { value: "OTA", label: "Ship fixes without store re-review" },
            { value: "Native", label: "Feel, performance, and device APIs" },
        ],
        pricingKey: "mobile",
        faqs: [
            {
                q: "Will a React Native app actually feel native?",
                a: "Yes, when it's architected well. We use native navigation, platform-appropriate components, and bridge true native modules for performance-critical features. Most users can't tell the difference - and you ship in half the time of two separate native builds.",
            },
            {
                q: "Can you handle the App Store and Play Store submission for us?",
                a: "Completely. We manage signing, certificates, store listings, screenshots, privacy disclosures, and the review back-and-forth so your app actually gets approved and published.",
            },
            {
                q: "Does the app work offline?",
                a: "We build offline-first when your use case calls for it - local caching, optimistic updates, and background sync so the app stays usable on a spotty connection and reconciles when it's back.",
            },
            {
                q: "Can you integrate biometrics, payments, or hardware features?",
                a: "Yes. FaceID/TouchID, in-app purchases, camera, Bluetooth, and IoT integrations are all available through native module bridging. We scope which features need native code during the strategy phase.",
            },
            {
                q: "How do you push updates after launch?",
                a: "For JavaScript-layer changes we use over-the-air updates so fixes reach users instantly. Native changes still go through the stores, but the day-to-day iteration loop stays fast.",
            },
        ],
        seoTitle: "Mobile App Development - React Native & Expo - Shunya",
        seoDescription:
            "Native-feel cross-platform iOS and Android apps from a single React Native / Expo codebase. Offline-first, biometrics, push, and full store submission. From $2,599.",
    },
    {
        slug: "ai-integration",
        name: "AI Integration",
        eyebrow: "AI Integration",
        icon: "bot",
        tagline: "Custom LLM agents, RAG pipelines, and intelligent automation.",
        heroTitle: "Put real AI to work inside your own product.",
        heroDescription:
            "Custom LLM agents, retrieval-augmented generation, and automation workflows built on OpenAI, Anthropic, or open models - running in your secure infrastructure.",
        summary:
            "We help you leverage OpenAI, Anthropic, or open-source models like LLaMA to automate customer support, analyze data, and generate content - all within your own secure infrastructure. The work goes well beyond dropping a chatbot on a page: we design retrieval-augmented generation (RAG) pipelines grounded in your data, engineer and evaluate prompts, wire up tool-calling agents, and put guardrails in place so the output is accurate and on-brand. Why it matters: generic AI hallucinates and leaks context. AI that's grounded in your knowledge base, integrated into your workflows, and measured against real evaluations is the difference between a demo and a system your team and customers actually trust.",
        whatWeDeliver: [
            "Custom RAG pipelines with a vector database grounded in your own content",
            "Chatbot and assistant UI/UX, embedded in your product or site",
            "Prompt engineering with evaluation harnesses to measure accuracy and regressions",
            "API integration with OpenAI, Anthropic, or self-hosted open models",
            "Tool-calling agents that take actions, not just answer questions",
            "Fine-tuning and dataset curation where a base model isn't enough",
            "Guardrails, PII handling, and cost/latency monitoring",
        ],
        process: [
            {
                step: "01",
                title: "Use-Case Scoping",
                body: "We identify where AI actually creates value for you, pick the right model and pattern (RAG vs. fine-tune vs. agent), and define how we'll measure 'good'.",
            },
            {
                step: "02",
                title: "Ground & Build",
                body: "We ingest and chunk your data into a vector store, build the retrieval pipeline, and wire the model into your app with a clean interface.",
            },
            {
                step: "03",
                title: "Evaluate & Tune",
                body: "We run prompts against an evaluation set, tune retrieval and prompting, and add guardrails so answers stay accurate, safe, and on-brand.",
            },
            {
                step: "04",
                title: "Deploy & Monitor",
                body: "We ship to production with cost, latency, and quality monitoring - so you can see exactly how the system performs and what it spends.",
            },
        ],
        useCases: [
            {
                title: "Support assistant grounded in your docs",
                body: "A chat assistant that answers customer and internal questions from your own knowledge base, help center, and product docs - with citations - so it deflects tickets without inventing policies that don't exist.",
            },
            {
                title: "Document and data analysis at scale",
                body: "An AI layer that ingests contracts, reports, or tickets and extracts structure, summaries, and insights in seconds - turning a folder no one has time to read into searchable, queryable answers.",
            },
            {
                title: "Tool-calling agent that takes action",
                body: "An agent that doesn't just answer but acts - creating records, triggering workflows, and calling your APIs - with guardrails and human-in-the-loop approval where the stakes are high.",
            },
            {
                title: "Content and workflow automation",
                body: "Drafting, classifying, tagging, and routing content or requests automatically, integrated into the tools your team already uses - so the busywork shrinks and people focus on judgment calls.",
            },
        ],
        techStack: [
            "OpenAI",
            "Anthropic",
            "LLaMA / open models",
            "Vector DB (pgvector / Pinecone)",
            "LangChain / custom orchestration",
            "Python",
            "TypeScript",
            "Embeddings",
        ],
        techGroups: [
            { group: "Models", items: ["OpenAI", "Anthropic", "LLaMA / open models", "Embeddings"] },
            { group: "Retrieval", items: ["pgvector", "Pinecone", "Chunking & reranking", "Hybrid search"] },
            { group: "Orchestration", items: ["LangChain", "Custom agents", "Tool calling", "Eval harnesses"] },
            { group: "Platform", items: ["Python", "TypeScript", "Guardrails", "Cost & latency monitoring"] },
        ],
        outcomes: [
            { value: "RAG", label: "Grounded in your own data" },
            { value: "Eval", label: "Measured accuracy, not vibes" },
            { value: "Secure", label: "Can run entirely in your infra" },
            { value: "Cited", label: "Answers your team can stand behind" },
        ],
        pricingKey: "web",
        faqs: [
            {
                q: "Will the AI make things up?",
                a: "We minimize hallucination by grounding responses in your data with RAG, constraining the model with careful prompting and guardrails, and running an evaluation set before launch. The goal is answers your team can stand behind, with citations where it matters.",
            },
            {
                q: "Do you use OpenAI, Anthropic, or open-source models?",
                a: "Whatever fits the job. We benchmark cost, quality, latency, and privacy needs against each. For sensitive data we can run open models in your own infrastructure so nothing leaves your environment.",
            },
            {
                q: "Is my data safe and private?",
                a: "Yes. We architect for privacy from the start - PII handling, data isolation, and self-hosting options when required. Your knowledge base is yours; we don't train public models on it.",
            },
            {
                q: "What's the difference between RAG and fine-tuning?",
                a: "RAG retrieves relevant facts from your data at query time and feeds them to the model - best for knowledge that changes. Fine-tuning bakes behavior into the model itself - best for tone and format. We often combine both and tell you which your use case needs.",
            },
            {
                q: "How do you control AI costs?",
                a: "We monitor token usage, cache aggressively, route simple requests to cheaper models, and tune prompts to be efficient. You get visibility into spend instead of a surprise bill.",
            },
        ],
        seoTitle: "AI Integration - LLM Agents & RAG Pipelines - Shunya",
        seoDescription:
            "Custom LLM agents, RAG pipelines, and AI automation built on OpenAI, Anthropic, or open models - grounded in your data and running in your secure infrastructure.",
    },
    {
        slug: "cloud-architecture",
        name: "Cloud Architecture",
        eyebrow: "Cloud Architecture",
        icon: "cloud",
        tagline: "Scalable backend systems on AWS, Azure, or Google Cloud.",
        heroTitle: "Infrastructure that scales while you sleep.",
        heroDescription:
            "Serverless functions, container orchestration, and database strategies designed to handle high traffic with zero downtime - codified as infrastructure you can trust.",
        summary:
            "We design serverless functions, container orchestration with Docker and Kubernetes, and database optimization strategies so your application handles high-traffic loads with zero downtime. Everything is codified as Infrastructure as Code, wired into automated CI/CD pipelines, and built with auto-scaling and observability from day one. Why it matters: the moment your product gets traction, infrastructure stops being invisible. Manual servers fall over under load, deploys break in production, and nobody can reproduce the environment. A properly architected cloud setup turns scale, deployments, and reliability from recurring fire drills into a boring, predictable non-event.",
        whatWeDeliver: [
            "CI/CD automated pipelines with build, test, and deploy stages",
            "Database schema design, indexing, and query optimization",
            "Serverless configuration (Lambda / Edge functions) where it fits",
            "Container orchestration with Docker and Kubernetes for stateful workloads",
            "Auto-scaling rules and load balancing for traffic spikes",
            "Infrastructure as Code with Terraform - reproducible, version-controlled environments",
            "Monitoring, logging, and incident alerting so problems surface before users notice",
        ],
        process: [
            {
                step: "01",
                title: "Assess & Design",
                body: "We review your workload, traffic patterns, and reliability needs, then design an architecture - serverless, containers, or hybrid - that matches reality and budget.",
            },
            {
                step: "02",
                title: "Codify Infrastructure",
                body: "We define everything as code with Terraform so environments are reproducible, reviewable, and never live only in someone's head.",
            },
            {
                step: "03",
                title: "Automate Delivery",
                body: "We build CI/CD pipelines with automated testing and safe rollouts, so deploys are routine instead of risky.",
            },
            {
                step: "04",
                title: "Scale & Observe",
                body: "We configure auto-scaling, load balancing, and full observability - metrics, logs, and alerts - so the system handles spikes and tells you when something's wrong.",
            },
        ],
        useCases: [
            {
                title: "Scaling for a traffic spike or launch",
                body: "Infrastructure that absorbs a product launch, a viral moment, or a seasonal peak automatically - auto-scaling, load balancing, and caching tuned so the system stretches instead of falling over at the worst possible time.",
            },
            {
                title: "Migrating off manual servers",
                body: "Moving from a hand-configured VPS that only one person understands to reproducible, version-controlled infrastructure as code - so environments can be rebuilt, reviewed, and recovered instead of living in someone's head.",
            },
            {
                title: "Standing up real CI/CD",
                body: "Replacing nerve-racking manual deploys with automated build, test, and deploy pipelines and safe rollbacks - turning releases from a Friday-night event into a routine, on-demand non-event.",
            },
            {
                title: "Cutting an unpredictable cloud bill",
                body: "Right-sizing over-provisioned resources, adding auto-scaling so you pay for what you use, and optimizing databases and caching - replacing a surprise monthly bill with cost you can actually forecast.",
            },
        ],
        techStack: [
            "AWS / Azure / GCP",
            "Docker",
            "Kubernetes",
            "Terraform",
            "Serverless (Lambda / Edge)",
            "PostgreSQL",
            "Redis",
            "GitHub Actions",
            "Grafana / monitoring",
        ],
        techGroups: [
            { group: "Cloud", items: ["AWS", "Azure", "GCP", "Serverless (Lambda / Edge)"] },
            { group: "Containers & IaC", items: ["Docker", "Kubernetes", "Terraform", "Helm"] },
            { group: "Data", items: ["PostgreSQL", "Redis", "Backups & replication", "Query tuning"] },
            { group: "Delivery & observability", items: ["GitHub Actions", "Grafana", "Prometheus", "Alerting"] },
        ],
        outcomes: [
            { value: "0", label: "Downtime deploys with safe rollbacks" },
            { value: "IaC", label: "Reproducible, version-controlled environments" },
            { value: "Auto", label: "Scaling that absorbs traffic spikes" },
            { value: "24/7", label: "Monitoring and incident alerting" },
        ],
        pricingKey: "cloud",
        faqs: [
            {
                q: "Should we go serverless or use containers?",
                a: "It depends on your workload. Serverless is great for spiky, event-driven traffic and low ops overhead; containers and Kubernetes suit long-running, stateful, or resource-heavy services. We often combine both and recommend the right mix for your case.",
            },
            {
                q: "Which cloud provider do you work with?",
                a: "AWS, Azure, and Google Cloud. We pick based on your existing stack, team familiarity, pricing, and the specific managed services you need - not on a one-size-fits-all preference.",
            },
            {
                q: "What is Infrastructure as Code and why does it matter?",
                a: "Instead of clicking around a cloud console, we define your entire infrastructure in Terraform code. That makes environments reproducible, reviewable in pull requests, and recoverable - no more 'it only works on the server nobody can touch'.",
            },
            {
                q: "Can you reduce our cloud bill?",
                a: "Often, yes. We right-size resources, add auto-scaling so you only pay for what you use, optimize databases, and identify idle or over-provisioned services. Cost optimization is part of how we design.",
            },
            {
                q: "Do you offer ongoing management?",
                a: "Yes - we offer a monthly retainer covering 24/7 uptime monitoring, security patching, log analysis, incident response, and cost optimization.",
            },
        ],
        seoTitle: "Cloud Architecture & DevOps - AWS, Azure, GCP - Shunya",
        seoDescription:
            "Scalable serverless and Kubernetes infrastructure with CI/CD, Terraform, auto-scaling, and 24/7 monitoring on AWS, Azure, or GCP. Zero-downtime deploys. From $1,200.",
    },
    {
        slug: "ui-ux-systems",
        name: "UI/UX Systems",
        eyebrow: "UI/UX Systems",
        icon: "layout",
        tagline: "Atomic design systems and high-fidelity interactive prototyping.",
        heroTitle: "Design systems that convert - and scale with you.",
        heroDescription:
            "We don't just design screens. We build accessible, documented design systems and interactive prototypes that turn visitors into customers and ship straight into code.",
        summary:
            "We don't just design screens; we build comprehensive design systems. Our focus is usability, accessibility, and a delightful user journey that converts visitors into customers. That means atomic, reusable components, high-fidelity interactive prototypes you can test before a line of code, user-flow mapping, and a documented system your team can extend without it falling apart. Why it matters: inconsistent, confusing interfaces quietly bleed conversions and trust. A real design system makes every new screen faster to build, every interaction consistent, and every release accessible to all of your users - including the ones using a screen reader.",
        whatWeDeliver: [
            "Figma design files - organized, component-driven, and handoff-ready",
            "Interactive prototypes you can click through and user-test before build",
            "Atomic design system with reusable components and design tokens",
            "Design system documentation so the system survives team changes",
            "User flow diagrams and journey mapping for key conversion paths",
            "Accessibility audit and WCAG-compliant patterns",
            "Developer-ready handoff that maps cleanly to a coded component library",
        ],
        process: [
            {
                step: "01",
                title: "Research & Flows",
                body: "We map your users, their goals, and the critical journeys - then sketch the flows that get them there with the least friction.",
            },
            {
                step: "02",
                title: "Design System",
                body: "We build an atomic component library with design tokens, so everything from buttons to dashboards is consistent and reusable.",
            },
            {
                step: "03",
                title: "Prototype & Test",
                body: "We create high-fidelity interactive prototypes, then validate them against real usability and accessibility standards before any code is written.",
            },
            {
                step: "04",
                title: "Document & Hand Off",
                body: "We document the system and deliver a developer-ready handoff that maps one-to-one onto a coded component library.",
            },
        ],
        useCases: [
            {
                title: "Design system for a scaling product",
                body: "A product whose UI has drifted into inconsistency as it grew. We build an atomic, documented design system with tokens and components, so every new screen is faster to build and consistent by default.",
            },
            {
                title: "Conversion-focused redesign",
                body: "A redesign of the flows that matter most - onboarding, checkout, signup - mapped, prototyped, and usability-tested before build, so the new design measurably moves the numbers instead of just looking nicer.",
            },
            {
                title: "Accessibility remediation",
                body: "Bringing an existing product up to WCAG 2.2 AA with an audit, prioritized fixes, and accessible patterns - so the product works for every user and clears procurement and compliance reviews.",
            },
            {
                title: "Design-to-code handoff that sticks",
                body: "Closing the gap where designs get lost in translation. We deliver a system that maps one-to-one onto a coded component library, so what's designed is what ships.",
            },
        ],
        techStack: [
            "Figma",
            "Design tokens",
            "Atomic design",
            "Prototyping",
            "WCAG / a11y",
            "Tailwind CSS",
            "Storybook",
            "Framer Motion",
        ],
        techGroups: [
            { group: "Design", items: ["Figma", "Auto layout", "Variants", "Interactive prototyping"] },
            { group: "System", items: ["Design tokens", "Atomic design", "Component documentation"] },
            { group: "Quality", items: ["WCAG 2.2 AA", "Usability testing", "Contrast & focus audits"] },
            { group: "To code", items: ["Tailwind CSS", "Storybook", "Framer Motion", "shadcn/ui"] },
        ],
        outcomes: [
            { value: "1", label: "Source of truth for the whole UI" },
            { value: "WCAG", label: "Accessible by default, audited before handoff" },
            { value: "Faster", label: "Feature builds from a shared system" },
            { value: "1:1", label: "Design maps directly onto code" },
        ],
        pricingKey: "web",
        faqs: [
            {
                q: "What's the difference between a design and a design system?",
                a: "A design is a set of screens. A design system is the reusable foundation underneath them - components, tokens, rules, and documentation - so every future screen is faster to build and consistent with the rest. We deliver the system, not just the screens.",
            },
            {
                q: "Do you only design, or can you build it too?",
                a: "Both. Our designs are built to translate directly into a coded component library, and the same team can implement them. That eliminates the usual design-to-dev gap where things get lost in translation.",
            },
            {
                q: "How do you make designs accessible?",
                a: "We design to WCAG standards from the start - color contrast, focus states, keyboard navigation, and screen-reader semantics - and run an accessibility audit before handoff. Accessibility is built in, not bolted on.",
            },
            {
                q: "Can you work with our existing brand?",
                a: "Absolutely. We can build a design system on top of your existing brand and assets, or establish brand foundations if you're starting fresh.",
            },
            {
                q: "Will the design system stay usable after you hand it off?",
                a: "Yes - that's the point. We document components, tokens, and usage rules so your team can extend the system confidently long after the engagement ends.",
            },
        ],
        seoTitle: "UI/UX Design Systems & Prototyping - Shunya",
        seoDescription:
            "Atomic design systems, high-fidelity interactive prototypes, and WCAG-accessible UI that converts and ships straight into code. Documented, reusable, developer-ready.",
    },
    {
        slug: "system-security",
        name: "System Security",
        eyebrow: "System Security",
        icon: "shield",
        tagline: "Penetration testing, OAuth implementation, and data encryption.",
        heroTitle: "Security that's engineered in, not bolted on.",
        heroDescription:
            "Penetration testing, OAuth 2.0, encryption at rest and in transit, and compliance-ready controls that protect your users and your reputation.",
        summary:
            "Security is not an afterthought. We implement industry-standard protocols to protect your user data and keep you compliant with regulations like GDPR and CCPA. That spans penetration testing to find weaknesses before attackers do, OAuth 2.0 done correctly, encryption for data at rest and in transit, hardened security headers, and continuous vulnerability scanning. Why it matters: a single breach can erase years of trust and trigger real legal and financial consequences. Building security in from the start - rather than reacting after an incident - protects your users, your compliance posture, and the reputation you've worked to earn.",
        whatWeDeliver: [
            "Penetration testing with a prioritized, actionable findings report",
            "OAuth 2.0 / OIDC authentication implemented to spec",
            "Data encryption at rest (AES-256) and in transit (TLS 1.3)",
            "Security headers configuration (CSP, HSTS, and more)",
            "Automated vulnerability scanning in your pipeline",
            "Role-based access control (RBAC) and audit logging",
            "GDPR / CCPA compliance review and remediation guidance",
        ],
        process: [
            {
                step: "01",
                title: "Threat Modeling",
                body: "We map your attack surface, data flows, and the regulations you're subject to - so security work targets real risk, not a generic checklist.",
            },
            {
                step: "02",
                title: "Test & Audit",
                body: "We run penetration tests and vulnerability scans, then deliver a prioritized report that says exactly what to fix and why it matters.",
            },
            {
                step: "03",
                title: "Harden",
                body: "We implement encryption, secure auth, RBAC, security headers, and audit logging - closing the gaps the testing surfaced.",
            },
            {
                step: "04",
                title: "Monitor & Comply",
                body: "We wire scanning into your pipeline and align controls with GDPR/CCPA so security stays continuous, not a one-time event.",
            },
        ],
        useCases: [
            {
                title: "Pre-launch security audit",
                body: "A penetration test and hardening pass before you ship or close an enterprise deal - finding the auth, access-control, and configuration gaps that an attacker or a security questionnaire would, with a prioritized fix list.",
            },
            {
                title: "Getting compliance-ready",
                body: "Aligning how you collect, store, and process personal data with GDPR or CCPA - data subject rights, encryption, retention, and audit trails - so you can answer a compliance review with the controls already in place.",
            },
            {
                title: "Fixing authentication done wrong",
                body: "Replacing fragile, hand-rolled auth with correct OAuth 2.0 / OIDC, secure token storage, session handling, and role-based access control - closing the subtle mistakes that quietly turn auth into a liability.",
            },
            {
                title: "Continuous security in the pipeline",
                body: "Wiring vulnerability scanning, dependency checks, and security headers into your CI/CD so security is verified on every change instead of audited once and forgotten.",
            },
        ],
        techStack: [
            "OAuth 2.0 / OIDC",
            "AES-256 encryption",
            "TLS 1.3",
            "OWASP",
            "RBAC",
            "Security headers (CSP/HSTS)",
            "Vulnerability scanning",
            "GDPR / CCPA",
        ],
        techGroups: [
            { group: "Identity", items: ["OAuth 2.0 / OIDC", "RBAC", "Secure session handling", "MFA"] },
            { group: "Encryption", items: ["AES-256 at rest", "TLS 1.3 in transit", "Secrets management"] },
            { group: "Testing", items: ["Penetration testing", "OWASP Top 10", "Vulnerability scanning", "Dependency audits"] },
            { group: "Compliance", items: ["GDPR", "CCPA", "Audit logging", "Security headers (CSP/HSTS)"] },
        ],
        outcomes: [
            { value: "AES-256", label: "Encryption at rest" },
            { value: "TLS 1.3", label: "Encryption in transit" },
            { value: "GDPR", label: "Compliance-ready controls and audit trails" },
            { value: "OWASP", label: "Tested against the Top 10 risks" },
        ],
        pricingKey: "web",
        faqs: [
            {
                q: "What does a penetration test actually involve?",
                a: "We probe your application the way an attacker would - testing authentication, access control, injection points, and configuration - then deliver a prioritized report of findings with concrete remediation steps, ranked by severity.",
            },
            {
                q: "How do you handle GDPR and CCPA compliance?",
                a: "We review how you collect, store, and process personal data, identify gaps, and help implement the required controls - data subject rights, encryption, retention, and audit trails - so you can demonstrate compliance.",
            },
            {
                q: "Is encryption really necessary if we're a small product?",
                a: "Yes. Encryption at rest and in transit is table stakes regardless of size - it's expected by users, often required by regulation, and it's far cheaper than the fallout from leaking unencrypted data.",
            },
            {
                q: "Can you implement secure authentication for us?",
                a: "We implement OAuth 2.0 / OIDC correctly, with secure token storage, session handling, and role-based access control - avoiding the subtle mistakes that turn auth into a liability.",
            },
            {
                q: "Is security a one-time project or ongoing?",
                a: "Both. We can do a one-time audit and hardening pass, but real security is continuous - so we also wire vulnerability scanning into your pipeline and offer ongoing monitoring.",
            },
        ],
        seoTitle: "System Security - Pen Testing, OAuth & Encryption - Shunya",
        seoDescription:
            "Penetration testing, OAuth 2.0, AES-256 / TLS 1.3 encryption, RBAC, and GDPR/CCPA compliance. Security engineered in from the start, not bolted on after a breach.",
    },
]

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug)

export function getServiceBySlug(slug: string): Service | undefined {
    return SERVICES.find((s) => s.slug === slug)
}
