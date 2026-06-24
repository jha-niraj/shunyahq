// Data-driven content for the /solutions/[audience] use-case pages.
// Each entry is real, audience-specific copy for Shunya Tech - a software
// engineering studio that architects, builds, and scales production-grade
// digital products across web, mobile, AI, and cloud.

import type { PricingKey } from "@/content/services"

export type UseCaseSlug =
    | "startups"
    | "businesses"
    | "enterprises"
    | "product-teams"

export type ServiceSlug =
    | "web-engineering"
    | "mobile-ecology"
    | "ai-integration"
    | "cloud-architecture"
    | "ui-ux-systems"
    | "system-security"

export interface UseCasePain {
    title: string
    body: string
}

export interface UseCaseFeature {
    title: string
    body: string
}

export interface UseCaseApproachStep {
    step: string
    title: string
    body: string
}

export interface UseCaseStat {
    value: string
    label: string
}

export interface UseCaseFaq {
    q: string
    a: string
}

export interface UseCaseCta {
    label: string
    href: string
    secondaryLabel: string
    secondaryHref: string
}

export interface UseCase {
    slug: UseCaseSlug
    label: string
    eyebrow: string
    heroTitle: string
    // The italic, serif-emphasised tail of the hero headline.
    heroEmphasis: string
    heroSubtitle: string
    // A richer overview paragraph shown beneath the hero.
    summary: string
    pains: UseCasePain[]
    howShunyaHelps: UseCaseFeature[]
    // A short "how we'd work with you" process.
    approach: UseCaseApproachStep[]
    // Service slugs to cross-link to /services/[slug].
    relevantServices: ServiceSlug[]
    // Pricing domain key to surface a "starting at" snapshot.
    pricingKey: PricingKey
    // Proof points / outcome stats.
    stats: UseCaseStat[]
    faqs: UseCaseFaq[]
    cta: UseCaseCta
}

export const USE_CASE_SLUGS: UseCaseSlug[] = [
    "startups",
    "businesses",
    "enterprises",
    "product-teams",
]

export const USE_CASES: Record<UseCaseSlug, UseCase> = {
    startups: {
        slug: "startups",
        label: "For Startups & Founders",
        eyebrow: "For startups and founders",
        heroTitle: "Ship the product you can't",
        heroEmphasis: "build alone.",
        heroSubtitle:
            "No technical co-founder, a runway that won't wait, and a roadmap living in your head. Shunya becomes your engineering team - architecting and shipping a real, production MVP in four to eight weeks, not quarters, on a modern stack you won't have to throw away the moment you get traction.",
        summary:
            "Early-stage founders don't fail because their idea was wrong - they fail because they ran out of runway before they could put a real product in front of real users. Shunya closes that gap. We act as the senior engineering team you can't yet afford to hire full-time, owning architecture, frontend, backend, infrastructure, and deployment so you can stay focused on customers and fundraising. Every MVP we ship is a production system - users can sign up, pay, and use it - built on a clean, typed, documented codebase that scales with you instead of becoming the thing your next round has to rewrite. We scope in days, not weeks, deploy to staging every sprint so you always have something to demo to investors and design partners, and treat your runway like our own: no gold-plating, no six-month builds, just the smallest version that proves the thing and a foundation that's ready to grow the moment it does. When you raise and hire, your new engineers inherit a codebase they can actually read - mainstream stack, real documentation, real tests - not a black box they quietly want to throw away.",
        pains: [
            {
                title: "No technical co-founder to build it",
                body: "You have the vision, the customers, and the domain knowledge - but no one who can actually architect and ship the product. Hiring a senior engineer takes months and costs more than the entire MVP should, and a junior hire can't carry the whole stack alone.",
            },
            {
                title: "You need an MVP in front of users now",
                body: "Every week without something users can touch is a week of lost feedback, lost momentum, and burned runway. Investors and early customers want a working product they can log into - not a Figma deck or a waitlist landing page.",
            },
            {
                title: "The budget is finite and the stakes are high",
                body: "You can't afford to spend your seed money on a six-month build that ships late, or on cheap code you'll have to rewrite the moment you get traction. The first version has to be both fast to ship and solid enough to grow on.",
            },
            {
                title: "Cheap dev shops leave you with a mess",
                body: "Outsourced teams that disappear after launch hand you unmaintainable code, no documentation, no tests, and no path to scale. You inherit crippling technical debt before you've even found product-market fit.",
            },
            {
                title: "You can't tell good engineering from good talk",
                body: "Without a technical background, it's hard to know whether you're being sold a sensible architecture or an over-engineered castle. You need a partner who explains trade-offs in plain language and ships what you actually need.",
            },
        ],
        howShunyaHelps: [
            {
                title: "A full MVP, built end to end",
                body: "We own frontend, backend, infrastructure, and deployment - one team, zero handoffs. You get a production system real users can sign up for and pay through, not a brittle prototype that falls over the first time it gets traffic.",
            },
            {
                title: "Live in four to eight weeks",
                body: "We scope in days, not weeks, and deploy to staging every sprint so you see working software the whole way through. Most MVPs go from kickoff to a real, public launch in four to eight weeks.",
            },
            {
                title: "A modern stack you won't outgrow",
                body: "Next.js, tRPC, and Prisma let us move fast without piling up debt. The codebase is clean, fully typed, documented, and ready for the in-house engineers you'll hire right after you raise.",
            },
            {
                title: "Equity-friendly via our accelerator",
                body: "Pre-seed founders can build with us through the Shunya accelerator, blending cash and equity so a tight budget doesn't stop you from shipping a serious, investor-ready product.",
            },
            {
                title: "Honest timelines and bi-weekly demos",
                body: "No status decks, no vanishing acts. You get a written spec before the first line of code and a real, deployable build every two weeks, so you always know exactly where the money is going and where the product stands.",
            },
            {
                title: "Documentation and a clean handoff",
                body: "Everything ships with documentation, tests, and thirty days of post-launch support. When you build an in-house team, they inherit a codebase they can actually read, trust, and extend on day one.",
            },
        ],
        approach: [
            {
                step: "01",
                title: "Discovery & spec",
                body: "We pin down the core loop your MVP has to nail, cut everything that isn't load-bearing, and hand you a written spec and architecture plan in one to two weeks - so you know the scope, stack, and timeline before we build.",
            },
            {
                step: "02",
                title: "Build in sprints",
                body: "We work in two-week sprints with a deployable build at the end of every one. You test real software continuously and steer the roadmap as user feedback comes in, instead of waiting months for a big reveal.",
            },
            {
                step: "03",
                title: "Launch to production",
                body: "We ship to a real, monitored production environment with auth, payments, analytics, and CI/CD wired in - a system that's ready for your first hundred users and your first investor demo.",
            },
            {
                step: "04",
                title: "Support & handoff",
                body: "Thirty days of post-launch support, full documentation, and a clean handoff. Stay with us as your fractional engineering team, or hand it to the hires you make after the raise - your call.",
            },
        ],
        relevantServices: [
            "web-engineering",
            "mobile-ecology",
            "ui-ux-systems",
            "ai-integration",
        ],
        pricingKey: "web",
        stats: [
            { value: "4-8 wks", label: "From kickoff to a live MVP" },
            { value: "1 team", label: "Owns design, build, and deploy" },
            { value: "30 days", label: "Post-launch support included" },
        ],
        faqs: [
            {
                q: "Can you act as our technical team if we don't have one?",
                a: "Yes - that's exactly the gap we fill. We handle architecture, engineering, infrastructure, and deployment end to end, so you can focus on customers, fundraising, and the business while we ship the product. Many of our founders treat us as their fractional engineering team well past launch.",
            },
            {
                q: "How fast can you ship an MVP?",
                a: "Most MVPs go from kickoff to a real, deployed launch in four to eight weeks. We start with a one-to-two-week discovery and spec phase, then run two-week agile sprints with a working, deployable build at the end of each one.",
            },
            {
                q: "Do you offer equity instead of cash for early-stage founders?",
                a: "For pre-seed founders, the Shunya accelerator lets you build with a blend of cash and equity. Reach out and we'll talk through what makes sense for your stage, runway, and the size of the build.",
            },
            {
                q: "What happens to the code after launch?",
                a: "It's yours, fully documented and tested, with thirty days of post-launch support included. The stack is deliberately mainstream - Next.js, TypeScript, Prisma - so the in-house engineers you hire later can pick it up without a rewrite.",
            },
            {
                q: "How much does an MVP cost?",
                a: "Web MVPs start around the entry tier on our pricing page and scale with complexity - integrations, payments, real-time features, and AI all factor in. We give you a fixed, written scope and price before any code is written, so there are no surprises.",
            },
            {
                q: "Will the MVP be able to scale if we get traction?",
                a: "Yes. We don't build throwaway prototypes - we build production systems on auto-scaling, cloud-native infrastructure. The architecture is designed so your first thousand users and your first hundred thousand run on the same foundation.",
            },
        ],
        cta: {
            label: "Start your build",
            href: "/contactus",
            secondaryLabel: "See our work",
            secondaryHref: "/projects",
        },
    },
    businesses: {
        slug: "businesses",
        label: "For Growing Businesses",
        eyebrow: "For growing businesses",
        heroTitle: "Modernize what's holding you",
        heroEmphasis: "back.",
        heroSubtitle:
            "Aging systems, manual workflows, and infrastructure that buckles under growth quietly cost you every single day. Shunya refactors legacy code into scalable systems, automates the busywork, and moves you to a cloud that grows with demand - all without taking the business offline.",
        summary:
            "Growth has a way of exposing the software that got you here. The system that ran fine at a hundred orders a day strains at a thousand; the spreadsheet workflow that one person managed now needs five; the codebase the original developer understood is now a black box. Shunya modernizes growing businesses without the big-bang risk. We refactor legacy systems incrementally, automate the manual work that's eating your team's hours, and move you onto cloud infrastructure that absorbs traffic spikes instead of collapsing under them - all while the business keeps running. One accountable team owns the whole outcome, from the database to the deploy pipeline.",
        pains: [
            {
                title: "Legacy systems slow everything down",
                body: "The software that got you here is now the thing holding you back. Every new feature takes longer, every change risks breaking something downstream, and the developers who understood the original code are long gone.",
            },
            {
                title: "Manual processes don't scale",
                body: "Teams copy data between spreadsheets, chase approvals over email, and re-key the same information into three different systems. As volume grows, the manual work grows with it - and so do the errors, the delays, and the burnout.",
            },
            {
                title: "Growth keeps breaking the system",
                body: "Traffic spikes take you offline, the database crawls to a halt at month-end, and scaling means buying a bigger server and hoping for the best. The architecture was never designed for the load you're carrying now.",
            },
            {
                title: "Rewrites feel too risky to start",
                body: "You know the system needs to change, but a big-bang rewrite could take the business offline for weeks and blow the budget. So modernization keeps getting postponed - and the technical debt keeps compounding interest.",
            },
            {
                title: "You're locked into tools that don't talk",
                body: "Your CRM, billing, and operations systems live in separate silos, and the integration between them is held together with manual exports and fragile scripts. Reporting is a weekly fire drill instead of a live dashboard.",
            },
        ],
        howShunyaHelps: [
            {
                title: "Legacy modernization without downtime",
                body: "We refactor monolithic systems into scalable, maintainable services incrementally - strangler-fig style - so the business keeps running while the architecture quietly gets stronger underneath it. No risky cutover weekend.",
            },
            {
                title: "Automate the manual busywork",
                body: "We map the workflows that eat your team's time and replace them with reliable automation and integrations, so data flows between systems automatically instead of being re-keyed by hand into three places.",
            },
            {
                title: "Cloud infrastructure that scales on demand",
                body: "Serverless and containerized infrastructure on AWS or Azure, with auto-scaling and infrastructure as code, so traffic spikes are absorbed automatically instead of taking you offline at the worst possible moment.",
            },
            {
                title: "Systems that connect, not silos",
                body: "We wire your CRM, billing, operations, and analytics together with proper integrations and APIs, so one source of truth replaces a dozen manual exports and reporting becomes a live dashboard instead of a fire drill.",
            },
            {
                title: "Production-grade, not prototypes",
                body: "Everything we ship is built to run in production - monitoring, CI/CD, automated backups, and observability included - so reliability is engineered in from the start rather than bolted on after the first outage.",
            },
            {
                title: "Full-stack ownership, one accountable team",
                body: "Frontend, backend, infrastructure, and deployment are owned by a single team with one point of contact. No finger-pointing between vendors when something breaks - one team owns the outcome end to end.",
            },
        ],
        approach: [
            {
                step: "01",
                title: "Audit & prioritize",
                body: "We audit your current systems, data flows, and bottlenecks, then deliver a written, prioritized modernization plan that targets the highest-impact wins first - so you see value early instead of after a year of work.",
            },
            {
                step: "02",
                title: "Modernize incrementally",
                body: "We replace and refactor the system piece by piece, validating each increment in staging before it touches production. The business stays live throughout, and you measure progress sprint by sprint.",
            },
            {
                step: "03",
                title: "Automate & integrate",
                body: "We connect your tools, automate the manual workflows, and move you onto auto-scaling cloud infrastructure - so the new system is faster, cheaper to run, and ready for the next stage of growth.",
            },
            {
                step: "04",
                title: "Monitor & maintain",
                body: "Monitoring, backups, and observability ship with every release, backed by post-launch support and optional ongoing maintenance with SyncOrbit-backed visibility into delivery and system health.",
            },
        ],
        relevantServices: [
            "web-engineering",
            "cloud-architecture",
            "ai-integration",
            "system-security",
        ],
        pricingKey: "cloud",
        stats: [
            { value: "0 hrs", label: "Downtime with incremental migration" },
            { value: "Auto", label: "Scaling cloud that absorbs spikes" },
            { value: "1 source", label: "Of truth across connected systems" },
        ],
        faqs: [
            {
                q: "Can you modernize our system without taking us offline?",
                a: "Yes. We modernize incrementally - replacing parts of the system piece by piece while the rest keeps running - so there's no risky big-bang cutover and the business stays live throughout the entire migration.",
            },
            {
                q: "We're not sure what needs to change first. Can you help us scope it?",
                a: "That's exactly where we start. Our discovery phase audits your current systems and workflows, identifies the highest-impact bottlenecks, and produces a written, prioritized plan before any code is written - so you spend budget where it returns the most.",
            },
            {
                q: "Will the new system handle our growth?",
                a: "We design for it. Cloud-native, auto-scaling architecture means capacity expands with demand automatically, and we load-test against your real traffic patterns - including month-end peaks - before launch.",
            },
            {
                q: "Can you connect our existing tools and software?",
                a: "Yes. We integrate CRMs, billing systems, operations tools, and analytics through proper APIs so data flows automatically between them, replacing fragile manual exports with one reliable source of truth.",
            },
            {
                q: "What does cloud and infrastructure work cost?",
                a: "Cloud setup and DevOps work starts at the entry tier on our pricing page and scales with the size of your infrastructure and whether you need ongoing management. We scope and price the work in writing before we begin.",
            },
            {
                q: "Do you maintain the system after the project ends?",
                a: "Every project includes documentation and thirty days of post-launch support, and we offer ongoing maintenance with SyncOrbit-backed visibility for teams that want a long-term engineering partner rather than a one-off vendor.",
            },
        ],
        cta: {
            label: "Talk to an engineer",
            href: "/contactus",
            secondaryLabel: "See our work",
            secondaryHref: "/projects",
        },
    },
    enterprises: {
        slug: "enterprises",
        label: "For Enterprises",
        eyebrow: "For enterprise engineering and IT leaders",
        heroTitle: "Distributed systems, built to a higher",
        heroEmphasis: "standard.",
        heroSubtitle:
            "Complex architectures, hard compliance requirements, and a need for teams that can be trusted with mission-critical systems. Shunya designs secure, observable microservices with proper access control and audit trails - delivered by a dedicated team with a single, accountable point of contact.",
        summary:
            "At enterprise scale, the hard part isn't writing code - it's evolving complex, distributed systems without breaking compliance, security, or the dozen teams that depend on them. Shunya delivers to that standard. We architect secure microservices with clear service boundaries, role-based access control, and tamper-evident audit logging designed in from day one - not retrofitted after an audit finding. You get a dedicated team with a dedicated project manager who owns the outcome, not a queue of contractors closing tickets. And through SyncOrbit, your stakeholders get real-time, view-only visibility into delivery, pipeline health, and system status - the kind of accountability enterprise procurement expects.",
        pains: [
            {
                title: "Complex distributed systems are hard to evolve",
                body: "Dozens of services, multiple teams, and tangled dependencies make every change slow and risky. Nobody holds a complete picture, incidents take too long to diagnose, and the cost of a wrong move is measured in customers and headlines.",
            },
            {
                title: "Security and compliance can't be an afterthought",
                body: "Auditors, regulators, and your own risk team expect access controls, encryption, audit logs, and a defensible security posture. Retrofitting all of that onto an existing system is painful, expensive, and rarely as clean as building it in.",
            },
            {
                title: "Staff augmentation rarely delivers ownership",
                body: "Contractors who plug into a ticket queue don't own outcomes. You get hands on keyboards but no accountability for architecture, code quality, or whether the thing actually ships on time and to standard.",
            },
            {
                title: "Procurement needs a partner it can trust",
                body: "You can't hand mission-critical systems to a team that disappears after launch or can't pass a security review. You need a vendor that meets enterprise expectations on documentation, process, and accountability on day one.",
            },
            {
                title: "Stakeholder visibility is fragmented",
                body: "Leadership wants a current, honest picture of delivery - progress, risk, pipeline health - without sitting through another status meeting. Today that picture is assembled by hand, late, and out of date by the time it lands.",
            },
        ],
        howShunyaHelps: [
            {
                title: "Microservices designed to scale and isolate failure",
                body: "We architect distributed systems with clear service boundaries, resilient messaging, and observability built in, so the system scales horizontally and failures stay contained instead of cascading across the platform.",
            },
            {
                title: "RBAC and full audit logging",
                body: "Role-based access control and tamper-evident audit logs are designed in from the start, so every privileged action is authorized and traceable - and your compliance reviews walk in with the answers already in hand.",
            },
            {
                title: "Security engineered end to end",
                body: "Penetration testing, OAuth and OIDC, data encryption in transit and at rest, and secure-by-default infrastructure mean security is part of the architecture, not a patch applied in a panic after the audit.",
            },
            {
                title: "A dedicated team with a dedicated PM",
                body: "You get a committed team and a dedicated project manager as your single point of accountability - owning architecture, delivery, and outcomes, not just closing tickets in someone else's backlog.",
            },
            {
                title: "Observability and SyncOrbit visibility",
                body: "Real-time dashboards, monitoring, and SyncOrbit's view-only client portals give your stakeholders live visibility into delivery, pipeline status, and system health - no status deck required.",
            },
            {
                title: "Standards, documentation, and clean handoff",
                body: "Architecture decision records, runbooks, and complete documentation mean your internal teams can operate, audit, and extend the system independently long after we deliver it.",
            },
        ],
        approach: [
            {
                step: "01",
                title: "Architecture & compliance review",
                body: "We map your existing systems, security requirements, and compliance constraints, then design an architecture with access control, audit logging, and observability built into the blueprint from the start.",
            },
            {
                step: "02",
                title: "Stand up the dedicated team",
                body: "A committed team and a dedicated project manager are assigned as your single point of accountability, with SyncOrbit configured to give your stakeholders real-time, view-only visibility from day one.",
            },
            {
                step: "03",
                title: "Build, test, and harden",
                body: "We deliver in observable increments with CI/CD, automated testing, penetration testing, and security review baked into the pipeline - so quality and compliance are verified continuously, not at the end.",
            },
            {
                step: "04",
                title: "Operate & hand off",
                body: "Runbooks, architecture decision records, and complete documentation hand your internal teams everything they need to operate, audit, and extend the system with full confidence.",
            },
        ],
        relevantServices: [
            "cloud-architecture",
            "system-security",
            "web-engineering",
            "ai-integration",
        ],
        pricingKey: "cloud",
        stats: [
            { value: "RBAC", label: "And audit trails by design" },
            { value: "1 PM", label: "Single point of accountability" },
            { value: "Live", label: "SyncOrbit delivery visibility" },
        ],
        faqs: [
            {
                q: "Can you meet our security and compliance requirements?",
                a: "Yes. We design with access control, encryption, and audit logging from the outset, support penetration testing and security reviews, and can work within your compliance and procurement frameworks rather than around them.",
            },
            {
                q: "How is this different from staff augmentation?",
                a: "We deliver a dedicated team with a dedicated project manager who owns the outcome - architecture, quality, and delivery - rather than individual contractors plugging into your backlog with no accountability for whether the system actually works.",
            },
            {
                q: "How do we get visibility into a distributed engagement?",
                a: "SyncOrbit gives your stakeholders real-time dashboards and view-only portals covering sprint progress, CI/CD pipeline status, and system health, alongside regular reviews with your dedicated PM - so leadership always has a current, honest picture.",
            },
            {
                q: "Will our internal teams be able to maintain what you build?",
                a: "Yes. We deliver architecture decision records, runbooks, and full documentation so your teams can operate, audit, and extend the system independently after handoff - no lock-in to us as the only people who understand it.",
            },
            {
                q: "Can you integrate with our existing systems and identity provider?",
                a: "We design for integration. We connect to existing services, data stores, and identity providers via OAuth/OIDC and standard APIs, so the new system fits into your landscape instead of forcing a rip-and-replace.",
            },
            {
                q: "How do you price enterprise engagements?",
                a: "Enterprise work is scoped per project against architecture, compliance, and team size. Our pricing page shows representative starting points for cloud and platform work, and we deliver a written scope and statement of work before kickoff.",
            },
        ],
        cta: {
            label: "Book a strategy call",
            href: "/contactus",
            secondaryLabel: "See our work",
            secondaryHref: "/projects",
        },
    },
    "product-teams": {
        slug: "product-teams",
        label: "For Product & Engineering Teams",
        eyebrow: "For product and engineering teams",
        heroTitle: "Ship faster with one command",
        heroEmphasis: "center.",
        heroSubtitle:
            "Slow releases, tooling scattered across a dozen tabs, and no shared view of what's actually happening. Shunya brings code, tasks, and delivery into SyncOrbit - backed by real CI/CD, live dashboards, and a shared design system - so your team ships with both velocity and visibility.",
        summary:
            "Capable teams ship slowly when the process around them is the bottleneck. Releases drag because deploys are manual and nerve-racking; context is scattered because code, tasks, and updates live in different tools; and nobody can give a straight answer on status because there's no single live view. Shunya fixes the machine, not just the output. We unify code, tasks, and client communication into SyncOrbit, wire up CI/CD so releases become routine, surface progress on live dashboards, and ship a shared design system that keeps engineering and design in lockstep. Embed us alongside your team to lift velocity, or hand us a workstream to own end to end.",
        pains: [
            {
                title: "Delivery is slower than it should be",
                body: "Releases drag, deployments are manual and nerve-racking, and work sits idle waiting on handoffs. The team is genuinely capable, but the process wrapped around them is the real bottleneck.",
            },
            {
                title: "Tooling is fragmented across a dozen tabs",
                body: "Code in one place, tasks in another, client updates in a third, and CI logs somewhere else entirely. Context is scattered everywhere, and stitching it back together becomes a full-time job in itself.",
            },
            {
                title: "Nobody has a clear view of progress",
                body: "Stakeholders ask for status and the honest answer is a guess. There's no single, live picture of what's shipping, what's blocked, and where the deployment pipeline actually stands right now.",
            },
            {
                title: "Inconsistent UI slows every feature",
                body: "Without a shared design system, every screen reinvents its components, design and engineering quietly drift apart, and review cycles balloon arguing over the same recurring inconsistencies.",
            },
            {
                title: "Releases are risky instead of routine",
                body: "Without automated testing and deploy pipelines, every release is a white-knuckle event scheduled for a quiet Friday. Fear of breaking production slows the whole team down and pushes work into bigger, riskier batches.",
            },
        ],
        howShunyaHelps: [
            {
                title: "SyncOrbit as your command center",
                body: "Unify code, tasks, and client communication in one real-time interface - a Kanban board wired to Git, automated sprint reporting, and view-only client portals - so the whole engagement lives in a single place.",
            },
            {
                title: "CI/CD that makes releases routine",
                body: "We set up automated build, test, and deploy pipelines with infrastructure as code, so shipping becomes a non-event your team does on demand instead of a manual, white-knuckle ritual every release.",
            },
            {
                title: "Real-time dashboards and pipeline visibility",
                body: "Live dashboards surface sprint progress, deployment status, and system health, so stakeholders get an honest, current picture without anyone burning an afternoon assembling a status deck.",
            },
            {
                title: "A design system your whole team shares",
                body: "Atomic, reusable components and design tokens keep design and engineering in sync, cut review cycles, and make every new feature faster to build and more consistent to ship across the product.",
            },
            {
                title: "Embed with your team or run the build",
                body: "We can augment your existing team with senior engineers and our tooling, or own a complete workstream end to end - whichever closes the gap between where you are and where you need to ship fastest.",
            },
            {
                title: "Modern stack, clean foundations",
                body: "Next.js, tRPC, and Prisma plus typed, documented, tested code mean the velocity we add doesn't quietly come at the cost of debt your team has to pay down a quarter later.",
            },
        ],
        approach: [
            {
                step: "01",
                title: "Assess the bottleneck",
                body: "We look at how work actually flows through your team - releases, handoffs, tooling, review cycles - and pinpoint where velocity leaks, so we fix the real constraint instead of adding more process.",
            },
            {
                step: "02",
                title: "Wire up the command center",
                body: "We bring code, tasks, and communication into SyncOrbit, stand up CI/CD pipelines, and configure live dashboards - so the team gets one source of truth and releases become routine.",
            },
            {
                step: "03",
                title: "Ship the design system",
                body: "We build a shared, atomic design system with reusable components and tokens that keeps design and engineering aligned and makes every future feature faster and more consistent to build.",
            },
            {
                step: "04",
                title: "Embed or own",
                body: "Senior engineers embed alongside your team to lift velocity, or we take a workstream end to end - either way you keep clean, documented foundations and a measurably faster shipping cadence.",
            },
        ],
        relevantServices: [
            "web-engineering",
            "ui-ux-systems",
            "cloud-architecture",
            "mobile-ecology",
        ],
        pricingKey: "web",
        stats: [
            { value: "1 hub", label: "Code, tasks, and CI in SyncOrbit" },
            { value: "On-demand", label: "Releases via automated CI/CD" },
            { value: "Shared", label: "Design system across the team" },
        ],
        faqs: [
            {
                q: "What is SyncOrbit?",
                a: "SyncOrbit is our command center for high-velocity teams - real-time Kanban with Git integration, automated sprint reporting, CI/CD pipeline visualization, and view-only client portals, all in one interface. It's currently in beta and you can request access.",
            },
            {
                q: "Can you work alongside our existing engineering team?",
                a: "Yes. We can embed senior engineers and our tooling into your team to lift delivery velocity, or own a complete workstream end to end - whichever fits the gap you need closed. We adapt to your stack and rituals rather than forcing ours.",
            },
            {
                q: "Will you set up our CI/CD and deployment pipelines?",
                a: "Absolutely. We build automated build, test, and deploy pipelines with infrastructure as code and monitoring, so releases become routine and observable rather than manual and risky - and your team ships on demand.",
            },
            {
                q: "Do you build reusable design systems?",
                a: "Yes. We build atomic design systems with shared components and tokens that keep design and engineering aligned, speed up feature work, and keep the UI consistent as the product grows across teams and screens.",
            },
            {
                q: "How do you measure the impact on our velocity?",
                a: "We baseline your current cycle time, deploy frequency, and review turnaround at the start, then track them on live dashboards as we go - so the impact on velocity is visible and measurable, not a matter of opinion.",
            },
            {
                q: "How is an engagement priced?",
                a: "Engagements are scoped to the workstream and team size you need. Our pricing page shows representative starting points for web and platform work, and we give you a written scope before we begin so cost is predictable.",
            },
        ],
        cta: {
            label: "Get started",
            href: "/contactus",
            secondaryLabel: "See our work",
            secondaryHref: "/projects",
        },
    },
}
