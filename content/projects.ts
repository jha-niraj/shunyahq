// Single typed source of truth for the /projects archive and the
// /projects/[projectslug] case-study pages. Each entry is real, shipped client
// work for Shunya - a software engineering studio that architects, builds, and
// scales production-grade digital products across web, mobile, AI, and cloud.

export interface ProjectCapability {
    title: string
    body: string
}

export interface ProjectOutcome {
    value: string
    label: string
}

export interface ProjectFaq {
    q: string
    a: string
}

export interface Project {
    slug: string
    title: string
    /** Short positioning line shown under the hero title and used as the meta description. */
    tagline: string
    /** 1-2 sentence summary used on the archive cards. */
    description: string
    industry: string
    liveUrl: string
    /** Optional screenshot asset under /public. When absent, a branded fallback tile is rendered. */
    image?: string
    technologies: string[]
    year: number
    timeline: string
    role: string
    status: string
    /** A full paragraph framing the problem the client faced. */
    challenge: string
    /** A full paragraph describing what we designed and shipped. */
    whatWeBuilt: string
    keyCapabilities: ProjectCapability[]
    outcomes: ProjectOutcome[]
    faqs: ProjectFaq[]
}

export const PROJECTS: Project[] = [
    {
        slug: "buildrhq",
        title: "BuildrHq",
        tagline: "The Engineering Intelligence Suite.",
        description:
            "An AI-powered learning and development platform that helps CS students, career switchers, and self-taught engineers master system design, open-source contribution, and full-stack architecture with specialized AI agents.",
        industry: "EdTech",
        liveUrl: "https://coderzai.xyz",
        image: "/thecoderz.png",
        technologies: ["Next.js", "Node.js", "MongoDB", "OpenAI", "Redis", "WebSockets", "Tailwind"],
        year: 2024,
        timeline: "5 months",
        role: "Full product design & engineering",
        status: "Live in production",
        challenge:
            "Developer education is hopelessly fragmented. A learner bounces between video tutorials for theory, LeetCode for interview prep, GitHub for real code, Discord for community, and ChatGPT for one-off answers - and none of those tools share any context about who the learner is or what they are trying to build. The result is a disjointed grind with no single, context-aware workspace. Worse, students graduate with transcripts and certificates but no verifiable proof of what they can actually ship, leaving employers to guess and learners to start every interview from scratch.",
        whatWeBuilt:
            "We built BuildrHq from the ground up as a unified engineering intelligence suite that collapses that fragmented toolchain into one context-aware workspace. At its core sits a Learning OS - a markdown-plus-code sandbox covering 40+ languages, with auto-generated quizzes, spaced-repetition flashcards, AI-rendered diagrams, and contextual Q&A that always knows what you are reading. Around it we layered an Intelligence Engine of specialized AI agents, a Project Foundry that scaffolds full-stack codebases from a single prompt, a real open-source contribution ecosystem with paid bounties, and an assessment layer that issues blockchain-verified, tamper-proof project certifications. The whole platform runs on a pay-per-use 'Flex Economy' of compute credits, so learners never pay for a subscription they don't use.",
        keyCapabilities: [
            {
                title: "Learning OS",
                body: "A markdown and code sandbox for 40+ languages with auto-generated quizzes, spaced-repetition flashcards, AI-rendered architecture diagrams, and contextual Q&A pinned to whatever the learner is studying.",
            },
            {
                title: "Intelligence Engine",
                body: "A roster of specialized AI agents - Interview Assistant, System Architect, Open Source Scout, Tech Stack Defender, Portfolio Audit, and Project Scoper - each tuned for a distinct slice of the engineering journey.",
            },
            {
                title: "Project Foundry",
                body: "Describe a product in plain language and the Foundry scaffolds a complete full-stack codebase, breaks the work into atomic execution plans, and validates the learner's knowledge as they build.",
            },
            {
                title: "Open-source ecosystem",
                body: "A curated Good First Issues track, a bounty program paying around $150 per challenge, and an invite-only maintainer tier that turns practice into a public contribution record.",
            },
            {
                title: "Verified assessments",
                body: "Timed skill simulations and blockchain-verified project certifications give learners proof of real ability, with coding-velocity analytics that track growth over time.",
            },
            {
                title: "Flex Economy billing",
                body: "A pay-per-use compute-credit model replaces subscriptions entirely, so learners only ever pay for the AI runs and sandbox time they actually consume.",
            },
            {
                title: "Real-time collaboration",
                body: "WebSocket-backed sessions and a Redis caching layer keep agent responses, sandbox state, and collaborative editing fast and consistent under load.",
            },
        ],
        outcomes: [
            { value: "40+", label: "Languages supported" },
            { value: "6", label: "Specialized AI agents" },
            { value: "~$150", label: "Avg. bounty per challenge" },
            { value: "5 mo", label: "Concept to launch" },
        ],
        faqs: [
            {
                q: "What makes BuildrHq different from a normal coding course?",
                a: "It is not a course - it is a workspace. Instead of linear video lessons, BuildrHq gives learners an AI-native environment where studying, building real projects, contributing to open source, and proving skill all happen in one place, with agents that carry context across every step.",
            },
            {
                q: "How do the AI agents actually help?",
                a: "Each agent is scoped to a real engineering task. The System Architect reasons through design trade-offs, the Open Source Scout finds issues matched to your level, the Portfolio Audit critiques your shipped work, and the Interview Assistant runs realistic mock sessions - all sharing the same context about your skills and goals.",
            },
            {
                q: "Why pay-per-use instead of a subscription?",
                a: "Learning is bursty. The Flex Economy charges compute credits only when you run an agent or spin up a sandbox, so a learner studying heavily one week and resting the next never pays for idle time. It removes the commitment friction of a monthly plan.",
            },
            {
                q: "Are the certifications meaningful to employers?",
                a: "Certifications are tied to real, completed projects and recorded on-chain so they cannot be faked or back-dated. Combined with the public open-source contribution record, a learner leaves with verifiable evidence of what they can ship - not just a quiz score.",
            },
        ],
    },
    {
        slug: "vidhica",
        title: "Vidhica",
        tagline: "Nepal's tax & audit, answered with the law.",
        description:
            "An AI legal and tax intelligence platform that answers Nepal's tax and law questions with the exact statutory section and court ruling - built for CAs, auditors, lawyers, businesses, and foreign investors.",
        industry: "LegalTech",
        liveUrl: "https://vidhica.nirajjha.xyz",
        technologies: ["Next.js", "PostgreSQL", "OpenAI", "Anthropic", "OCR", "Tailwind"],
        year: 2025,
        timeline: "4 months",
        role: "Full product design & engineering",
        status: "Live in production",
        challenge:
            "Nepal's tax and legal framework is vast, layered, and slow to search by hand. The relevant answer to a single question might live across the Finance Act, the Income Tax Act, a VAT circular, an NRB directive, and a Supreme Court ruling - each in a different document, often only in print or scattered PDFs. Chartered accountants, auditors, and lawyers were burning hours hunting for the precise section and precedent, and businesses and foreign investors had almost no way to get an authoritative, cited answer without paying for a consult. Professionals needed answers in seconds, grounded in the actual law, not a confident guess.",
        whatWeBuilt:
            "We built Vidhica as an AI legal and tax research engine grounded in 184+ indexed Nepali laws - the Finance Act 2082, Income Tax Act 2058, VAT Act 2052, Supreme Court rulings, and NRB directives among them. Every answer cites the exact section and the relevant precedent, so professionals can trust and verify it instantly. On top of research we shipped an OCR-powered invoice vouching tool, auto-drafted audit reports, a past-exam answer bank for CA students, and an ICAN-verified CA directory where users can book consults starting from NPR 1,500. Two model providers - OpenAI and Anthropic - back the reasoning layer so the platform can route each query to the model best suited to it.",
        keyCapabilities: [
            {
                title: "Cited AI research",
                body: "Ask any tax or law question in plain language and get an answer grounded in the exact statutory section and court ruling, drawn from 184+ indexed Nepali laws and directives.",
            },
            {
                title: "Living legal corpus",
                body: "An indexed library spanning the Finance Act 2082, Income Tax Act 2058, VAT Act 2052, Supreme Court rulings, and NRB directives, kept current as the law changes.",
            },
            {
                title: "OCR invoice vouching",
                body: "Upload invoices and the OCR pipeline extracts, structures, and cross-checks the data, turning a manual audit chore into a few seconds of review.",
            },
            {
                title: "Auto-drafted audit reports",
                body: "Generate first-draft audit reports from structured inputs, giving auditors a defensible starting point instead of a blank page.",
            },
            {
                title: "CA exam answer bank",
                body: "A searchable bank of past exam answers helps CA students study against real questions with model responses.",
            },
            {
                title: "ICAN-verified directory",
                body: "A directory of ICAN-verified chartered accountants lets users book consults starting from NPR 1,500 when they need a human in the loop.",
            },
            {
                title: "Dual-model reasoning",
                body: "OpenAI and Anthropic models sit behind a routing layer, so each query is handled by the model best suited to its complexity and length.",
            },
        ],
        outcomes: [
            { value: "184+", label: "Laws indexed" },
            { value: "Seconds", label: "From question to cited answer" },
            { value: "NPR 1,500", label: "Verified consult, starting" },
            { value: "4 mo", label: "Concept to launch" },
        ],
        faqs: [
            {
                q: "How does Vidhica avoid making up the law?",
                a: "Every answer is grounded in the indexed corpus and returns the specific section and ruling it relied on. Because the citation is shown alongside the answer, professionals can verify the source directly rather than trusting an unsourced response.",
            },
            {
                q: "Who is Vidhica built for?",
                a: "Chartered accountants, auditors, lawyers, businesses, CA students, and foreign investors navigating Nepal's tax and legal system. Each gets answers framed around the actual statutes and precedents that apply to their situation.",
            },
            {
                q: "What does the OCR vouching tool do?",
                a: "It reads uploaded invoices, extracts the structured fields, and cross-checks them - replacing a tedious manual vouching step with a fast, reviewable digital pass that auditors can sign off on.",
            },
            {
                q: "Can I still talk to a real chartered accountant?",
                a: "Yes. The ICAN-verified CA directory lets you book a consult with a real, credentialed professional starting from NPR 1,500 whenever a question needs human judgement beyond what the research engine provides.",
            },
        ],
    },
    {
        slug: "syncorbit",
        title: "SyncOrbit",
        tagline: "The calm operating system for running clients at once.",
        description:
            "A unified workspace for agencies, studios, and founders juggling many client projects - project management, white-labeled client portals, billing, and live business intelligence in one place.",
        industry: "SaaS",
        liveUrl: "https://syncorbit.nirajjha.xyz",
        technologies: ["Next.js", "GraphQL", "AWS", "PostgreSQL", "Tailwind"],
        year: 2025,
        timeline: "6 months",
        role: "Full product design & engineering",
        status: "Live in production",
        challenge:
            "Teams that run client work for a living lose the plot to fragmentation. The status of any given project is smeared across Slack threads, spreadsheets, a project management tool, a separate billing system, and someone's memory. To reconcile it all, teams fall back on status meetings and constant context-switching - both of which quietly eat hours every week and erode margins. There was no single source of truth that connected the work, the client, the team's time, and the money in one calm place.",
        whatWeBuilt:
            "We built SyncOrbit as a unified operating system for client work, designed around three promises: one source of truth, async by default, and forecasts you can trust. Project management supports sprints, dependencies, and kanban, list, and timeline views. White-labeled client portals send automatic digests so clients stay informed without a single status call, and AI-powered intake gets a new client fully onboarded in under five minutes. Team management and time tracking feed directly into billing and revenue operations, where invoices are generated automatically from logged hours and milestones. Live BI dashboards surface revenue, utilization, and on-time delivery, and a GraphQL API plus webhooks tie SyncOrbit into Figma, Linear, GitHub, and Slack. The whole platform is secured with TLS 1.3, AES-256 encryption, and SSO through Google and Okta.",
        keyCapabilities: [
            {
                title: "Project management",
                body: "Sprints, dependencies, and switchable kanban, list, and timeline views give every project a single, current picture of where the work stands.",
            },
            {
                title: "White-labeled client portals",
                body: "Branded portals send clients automatic digests of progress, so they stay informed asynchronously and status meetings simply stop being necessary.",
            },
            {
                title: "AI-powered intake",
                body: "An AI onboarding flow takes a new client from first contact to a fully set-up project in under five minutes, eliminating the manual kickoff scramble.",
            },
            {
                title: "Team & time tracking",
                body: "Capacity, assignments, and time entries live alongside the work, feeding utilization metrics and billing without duplicate data entry.",
            },
            {
                title: "Billing & revenue ops",
                body: "Invoices generate automatically from logged hours and completed milestones, closing the loop between work delivered and revenue collected.",
            },
            {
                title: "Live BI dashboards",
                body: "Real-time dashboards track revenue, team utilization, and on-time delivery - up to 94% on-time across the projects running on the platform.",
            },
            {
                title: "Integrations & API",
                body: "Native connections to Figma, Linear, GitHub, and Slack, plus a GraphQL API and webhooks, let teams wire SyncOrbit into the rest of their stack.",
            },
            {
                title: "Enterprise-grade security",
                body: "TLS 1.3 in transit, AES-256 at rest, and SSO via Google and Okta keep client data protected to the standard agencies and their clients expect.",
            },
        ],
        outcomes: [
            { value: "94%", label: "On-time delivery tracked" },
            { value: "< 5 min", label: "Client onboarding" },
            { value: "1", label: "Source of truth" },
            { value: "6 mo", label: "Concept to launch" },
        ],
        faqs: [
            {
                q: "Who is SyncOrbit for?",
                a: "Agencies, studios, and founders running multiple client projects at once. If your team's status is currently scattered across Slack, spreadsheets, a PM tool, and a billing system, SyncOrbit pulls all of it into one workspace.",
            },
            {
                q: "How do the white-labeled client portals work?",
                a: "Each client gets a branded portal that receives automatic progress digests. Because clients can self-serve the latest status asynchronously, the recurring status-update meeting becomes unnecessary.",
            },
            {
                q: "Does billing really happen automatically?",
                a: "Yes. Invoices are generated from the hours your team logs and the milestones they complete, so revenue operations stay in sync with the actual work without anyone re-keying numbers into a separate tool.",
            },
            {
                q: "What integrations are supported?",
                a: "SyncOrbit connects natively to Figma, Linear, GitHub, and Slack, and exposes a GraphQL API plus webhooks so teams can build any additional automation they need on top.",
            },
            {
                q: "How is client data secured?",
                a: "Data is encrypted with TLS 1.3 in transit and AES-256 at rest, and access is gated behind SSO through Google and Okta - meeting the security bar that agencies and their clients require.",
            },
        ],
    },
    {
        slug: "gurukul",
        title: "Gurukul",
        tagline: "Run your school. Not your paperwork.",
        description:
            "A school management platform for institutions in Nepal that turns paper-based attendance, fees, and exams into fast digital workflows - with an AI layer across every module.",
        industry: "EdTech",
        liveUrl: "https://gurukul.nirajjha.xyz",
        technologies: ["Next.js", "React Native", "PostgreSQL", "Khalti", "eSewa", "Tailwind"],
        year: 2024,
        timeline: "5 months",
        role: "Full product design & engineering",
        status: "Live in production",
        challenge:
            "Schools across Nepal spend a staggering share of their day on paperwork instead of teaching. Attendance is taken on paper and re-entered by hand, fee collection means chasing parents and writing receipts, and building exam papers each term is a manual, error-prone slog. Administrators and teachers were drowning in admin overhead - time that should have gone to students went to ledgers, registers, and reconciliation. The institutions needed their operational busywork to simply disappear.",
        whatWeBuilt:
            "We built Gurukul as an end-to-end school management platform with an AI layer woven through every module. Teachers mark a full class in about 90 seconds, parents get instant SMS alerts when a child is absent, and school-wide attendance updates live. An AI examination system generates NEB-aligned question papers in around 30 seconds. Fee management runs on Khalti and eSewa with automatic bills, receipts, and overdue reminders, cutting billing time dramatically. Students get a React Native mobile portal for their timetable, homework, attendance, and results, while staff management handles role-based access, leave workflows, and digital payslips. The outcome is roughly 35 minutes saved per teacher per day and a setup that goes live in under 24 hours.",
        keyCapabilities: [
            {
                title: "Fast daily attendance",
                body: "Teachers mark an entire class in about 90 seconds, parents receive instant SMS alerts for absences, and a live dashboard shows school-wide attendance in real time.",
            },
            {
                title: "AI examination system",
                body: "Generate NEB-aligned question papers in around 30 seconds, replacing hours of manual paper-setting each term with a reviewable AI draft.",
            },
            {
                title: "Fee management",
                body: "Collect fees through Khalti and eSewa with automatically generated bills, receipts, and overdue reminders - making billing roughly three times faster.",
            },
            {
                title: "Student mobile portal",
                body: "A React Native app gives students one place for their timetable, homework, attendance, and results, with everything synced from the school's records.",
            },
            {
                title: "Staff management",
                body: "Role-based access, digital leave workflows, and automated payslips remove the paperwork from managing teaching and non-teaching staff.",
            },
            {
                title: "AI across modules",
                body: "A shared AI layer assists across attendance, exams, and admin, so the platform actively reduces busywork rather than just digitizing it.",
            },
        ],
        outcomes: [
            { value: "35 min", label: "Saved per teacher daily" },
            { value: "98%", label: "Attendance accuracy" },
            { value: "3x", label: "Faster billing" },
            { value: "< 24h", label: "Setup to live" },
        ],
        faqs: [
            {
                q: "How quickly can a school get started?",
                a: "Onboarding is designed to be near-instant - a school can be set up and live in under 24 hours, with attendance, fees, and exams ready to use from day one.",
            },
            {
                q: "How does attendance save teachers time?",
                a: "A full class is marked in roughly 90 seconds, and the data flows straight into live school-wide stats and parent SMS alerts - eliminating the paper register and the re-entry that followed it. Across a day that adds up to about 35 minutes saved per teacher.",
            },
            {
                q: "Are the AI-generated exam papers aligned to the curriculum?",
                a: "Yes. The examination system generates NEB-aligned question papers in around 30 seconds, giving teachers a curriculum-appropriate draft they can review and adjust rather than building each paper from scratch.",
            },
            {
                q: "Which payment methods does fee management support?",
                a: "Fees are collected through Khalti and eSewa, the payment rails parents in Nepal already use, with automatic bills, receipts, and overdue reminders handled by the platform.",
            },
        ],
    },
    {
        slug: "eventeye",
        title: "EventEye",
        tagline: "College events, from discovery to door, in one platform.",
        description:
            "A dual-sided college event platform with cross-institution discovery, sub-30-second ticket checkout, and a real-time organizer dashboard - replacing the WhatsApp-and-Google-Forms scramble.",
        industry: "Events",
        liveUrl: "https://eventeye.in",
        image: "/eventeye.png",
        technologies: ["React", "Node.js", "PostgreSQL", "Razorpay", "Tailwind"],
        year: 2024,
        timeline: "3 months",
        role: "Full product design & engineering",
        status: "Live in production",
        challenge:
            "College events ran on a duct-taped stack of WhatsApp broadcasts, Google Forms, and manual attendance at the door. Students had no way to discover what was happening beyond their own campus, organizers had zero real-time visibility into who was coming, and there was no data to learn from afterward. Every event was a logistical scramble with no infrastructure underneath it and no discovery layer on top of it.",
        whatWeBuilt:
            "We built EventEye as a dual-sided platform that serves attendees and organizers as two distinct, purpose-built experiences. Attendees get a cross-institution discovery feed and a ticket checkout that takes under 30 seconds from intent to confirmed pass, paid through Razorpay. Organizers get a dashboard with real-time attendance, analytics, community tools, and role-based team access so a whole committee can run an event together. One codebase powers two products, each tuned for exactly what its audience needs.",
        keyCapabilities: [
            {
                title: "Cross-institution discovery",
                body: "A unified feed surfaces events across colleges and institutions, so students can finally find what is happening beyond their own campus walls.",
            },
            {
                title: "Sub-30-second checkout",
                body: "An optimized, Razorpay-backed flow takes an attendee from intent to a confirmed ticket in under 30 seconds, removing the friction that killed conversions on forms.",
            },
            {
                title: "Real-time organizer dashboard",
                body: "Organizers see live attendance and event health as it happens, replacing the door-clipboard and the after-the-fact spreadsheet.",
            },
            {
                title: "Event analytics",
                body: "Post-event analytics turn every event into data organizers can learn from, so the next one is run on evidence rather than guesswork.",
            },
            {
                title: "Community tools",
                body: "Built-in community features let organizers build an audience around their events instead of starting from a cold broadcast each time.",
            },
            {
                title: "Role-based team access",
                body: "A whole organizing committee can collaborate with scoped, role-based permissions, so running an event is a team sport rather than one person's burden.",
            },
        ],
        outcomes: [
            { value: "< 30s", label: "Ticket checkout" },
            { value: "2", label: "Purpose-built experiences" },
            { value: "Multi", label: "Institution discovery" },
            { value: "3 mo", label: "Concept to launch" },
        ],
        faqs: [
            {
                q: "How is EventEye different from a Google Form?",
                a: "A form takes registrations; EventEye runs the whole event. It adds cross-campus discovery so students find the event, a sub-30-second paid checkout, and a real-time organizer dashboard - none of which a form can do.",
            },
            {
                q: "What makes checkout so fast?",
                a: "The attendee flow is purpose-built and integrated directly with Razorpay, stripping the process down to the essential steps so a student goes from intent to a confirmed ticket in under 30 seconds.",
            },
            {
                q: "Can a whole committee manage one event?",
                a: "Yes. Role-based team access lets organizers invite their committee with scoped permissions, so multiple people can run check-in, analytics, and communications together.",
            },
            {
                q: "What can organizers learn after an event?",
                a: "The analytics layer captures attendance and engagement data for every event, giving organizers concrete numbers to plan the next one - turning each event into a feedback loop rather than a one-off.",
            },
        ],
    },
    {
        slug: "mp-solutions",
        title: "M.P. Solutions",
        tagline: "Real-time pharmaceutical inventory for B2B supply chains.",
        description:
            "A real-time B2B pharmaceutical inventory platform connecting pharmacies and distributors with live stock, automated reorder thresholds, dual dashboards, and a full audit trail.",
        industry: "Healthcare",
        liveUrl: "https://mpsolutions.vercel.app/",
        image: "/mpsolutions.png",
        technologies: ["Next.js", "tRPC", "Prisma", "PostgreSQL", "Tailwind"],
        year: 2023,
        timeline: "2 months",
        role: "Full stack development",
        status: "Live in production",
        challenge:
            "A pharmaceutical distributor was running its entire inventory on phone calls and memory. Stock levels lived in someone's head, reorders happened when a pharmacy phoned in a panic, and stockouts were a weekly occurrence. There was no visibility into demand patterns across the network and no single record of who ordered what - the business was scaling on goodwill and recall, both of which have hard limits.",
        whatWeBuilt:
            "We built a real-time B2B procurement platform in eight weeks. Pharmacies check live stock, place orders, and set automated reorder thresholds without a single phone call. Distributors get a unified dashboard showing demand across the entire network, low-stock alerts, and a complete order audit trail. The stack is built on Next.js with tRPC for fully type-safe end-to-end APIs and Prisma over PostgreSQL for reliable relational data, so every layer is predictable and maintainable as the network grows.",
        keyCapabilities: [
            {
                title: "Real-time stock sync",
                body: "Live inventory across the network replaces phone-call-and-memory tracking, so everyone sees the same numbers at the same time.",
            },
            {
                title: "Automated reorder thresholds",
                body: "Pharmacies set thresholds once and the system flags reorders automatically, ending the weekly cycle of panic calls and surprise stockouts.",
            },
            {
                title: "Dual dashboards",
                body: "Distinct distributor and pharmacy dashboards give each side exactly the view it needs - network-wide demand for the distributor, ordering and stock for the pharmacy.",
            },
            {
                title: "Demand analytics",
                body: "Aggregated demand patterns across the network turn a previously invisible signal into something the distributor can actually plan around.",
            },
            {
                title: "Full audit trail",
                body: "Every order is recorded end to end, creating a single source of truth that replaces fragmented memory and informal messages.",
            },
            {
                title: "Type-safe foundation",
                body: "tRPC and Prisma deliver fully type-safe APIs over PostgreSQL, keeping the platform reliable and easy to extend as more pharmacies join.",
            },
        ],
        outcomes: [
            { value: "8 wk", label: "Concept to launch" },
            { value: "0", label: "Phone calls to reorder" },
            { value: "Network", label: "Wide demand visibility" },
            { value: "Real-time", label: "Stock updates" },
        ],
        faqs: [
            {
                q: "What problem did M.P. Solutions actually solve?",
                a: "It replaced a phone-call-and-memory inventory process that caused weekly stockouts. Pharmacies now see live stock and reorder automatically, and the distributor finally has visibility into demand across the whole network.",
            },
            {
                q: "How do automated reorder thresholds work?",
                a: "Each pharmacy sets a minimum threshold per product once. When stock dips below it, the platform flags a reorder automatically - no one has to remember to call, and surprise stockouts largely disappear.",
            },
            {
                q: "Why build it on tRPC and Prisma?",
                a: "tRPC gives fully type-safe APIs from database to UI, and Prisma over PostgreSQL keeps the relational data reliable. Together they made the platform predictable to build and safe to extend as the network grew.",
            },
            {
                q: "How long did it take to ship?",
                a: "The full platform went from concept to a live B2B procurement system in about eight weeks, including both the distributor and pharmacy dashboards.",
            },
        ],
    },
]

export function getProjectBySlug(slug: string): Project | undefined {
    return PROJECTS.find((p) => p.slug === slug)
}
