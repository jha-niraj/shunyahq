import type { FaqItem } from "@/components/landing/page-faq"

/** Which scene illustration sits beside each pillar. */
export type SceneKey = "intake" | "delivery" | "portal" | "money"

export const PILLARS: {
    id: string
    scene: SceneKey
    title: string
    body: string
    points: string[]
}[] = [
    {
        id: "intake",
        scene: "intake",
        title: "Intake that actually finds out what the client wants",
        body: "You send a link. The client answers in their own time, and an assistant asks the follow-ups a good project manager would - what happens at the edges, which systems this has to agree with, who signs it off. What comes back is a structured brief, not a paragraph in an email.",
        points: [
            "A shareable link per client - no account for them to create",
            "The assistant digs where an answer is thin, instead of accepting it",
            "Output is a scope document, not a transcript",
            "Save it as a template and reuse it for the next enquiry",
        ],
    },
    {
        id: "delivery",
        scene: "delivery",
        title: "Delivery that stays honest without a status meeting",
        body: "The scope becomes tasks. Tasks carry an owner, an estimate and the hours actually spent, so the board is also the timesheet. Nobody assembles a progress report, because the board already is one.",
        points: [
            "Projects, sprints and a board that reflects real state",
            "Estimates against actuals, per task and per project",
            "Specs, tests and decisions attached to the work, not a folder",
            "Goals and calendar so the quarter is visible, not just the week",
        ],
    },
    {
        id: "portal",
        scene: "portal",
        title: "A client portal that removes the Friday update",
        body: "Clients get a read-only view of the same records your team works in - progress, what is blocked, what needs them. It is white-labelled, it needs no login, and it replaces the weekly summary somebody used to write by hand.",
        points: [
            "Live status, not a document that is stale on arrival",
            "Blockers and slipped dates shown, because hiding them costs trust",
            "Feedback and approvals in context, against the thing being discussed",
            "Your brand on it, not ours",
        ],
    },
    {
        id: "money",
        scene: "money",
        title: "Money that comes out of the work, not a spreadsheet",
        body: "Tracked hours and project milestones assemble the invoice. Expenses, income and outstanding balances sit in the same place, so the question of whether a project is actually profitable has an answer you can look at rather than derive.",
        points: [
            "Invoices generated from real project data",
            "Expenses and income against the project that caused them",
            "Profitability per project and per client, live",
            "Proposals and pipeline in the same system as the delivery",
        ],
    },
]

export const LOOP: { title: string; body: string }[] = [
    {
        title: "Enquiry arrives",
        body: "A lead lands in the CRM from a form, an email or a link you sent. Nothing is typed twice from here on.",
    },
    {
        title: "Intake session",
        body: "You send the client a link. The guided session produces a structured brief and a scope you can price.",
    },
    {
        title: "Proposal and scope",
        body: "The brief becomes a proposal. Accepted, it becomes a project with its tasks already outlined.",
    },
    {
        title: "The work",
        body: "Team, board, estimates, time. The client watches the same records through the portal.",
    },
    {
        title: "Invoice",
        body: "Hours and milestones assemble the invoice. It goes out, and payment reconciles against the project.",
    },
    {
        title: "What you learned",
        body: "Estimated against actual, quoted against earned. The next proposal is priced on evidence.",
    },
]

export const MODULES: { title: string; body: string }[] = [
    { title: "AI client intake", body: "Guided sessions, shareable links, reusable templates and a structured brief at the end." },
    { title: "Projects and tasks", body: "Boards, sprints, estimates, dependencies, specs and tests attached to the work." },
    { title: "Client portal", body: "White-labelled, read-only, no account required, always showing current state." },
    { title: "CRM and pipeline", body: "Contacts, leads, pipelines, sequences and proposals in the same place as delivery." },
    { title: "Finance", body: "Invoices from real data, expenses, income, outstanding balances and per-project margin." },
    { title: "Time and capacity", body: "Timesheets that come from the board, plus who is over-committed next week." },
    { title: "Teams and access", body: "Role-based access for founders, leads, members and clients - each sees their own surface." },
    { title: "Docs and wiki", body: "Decisions, runbooks and reference material beside the projects they belong to." },
    { title: "Goals and reports", body: "Quarterly goals, a health view worth opening on a Monday, and reports that build themselves." },
    { title: "Requests and inbox", body: "Client requests and internal asks in one queue instead of four chat threads." },
    { title: "Integrations", body: "Connect the tools you already run so the record stays single rather than duplicated." },
    { title: "Compliance and audit", body: "An access log and a record of who changed what, for the clients who ask." },
]

export const PROOF: { label: string; value: string; note: string }[] = [
    { label: "Runs on it", value: "Every project", note: "Every case study on this site was delivered through SyncHQ." },
    { label: "Replaces", value: "6 tools", note: "Board, sheet, docs, invoicing, chat and a separate CRM." },
    { label: "Status reports", value: "0 written", note: "The portal replaced the weekly summary entirely." },
    { label: "Stage", value: "Early access", note: "In production daily, onboarding studios in small batches." },
]

export const SYNCHQ_FAQS: FaqItem[] = [
    {
        q: "What is SyncHQ?",
        a: "An operating system for agencies and studios that deliver client work. It covers client intake, project delivery, a white-labelled client portal, time tracking and invoicing in one system, so the same record carries from the first enquiry through to the paid invoice.",
    },
    {
        q: "How is the AI intake different from a form?",
        a: "A form asks a fixed set of questions and stops, so whatever it did not think to ask never gets said. The intake session is guided: it follows up where an answer is thin, offers examples when a question is hard to answer cold, and keeps going until the scope is actually clear. The output is a structured brief rather than a transcript.",
    },
    {
        q: "Do our clients need an account?",
        a: "No. Both the intake session and the client portal work from a shared link. Every authentication step between a client and their own project status is a step at which they go back to emailing you for an update instead.",
    },
    {
        q: "Is it white-labelled?",
        a: "The client-facing portal carries your brand rather than ours. Your clients see your studio, not a tool they have never heard of.",
    },
    {
        q: "Who is SyncHQ not for?",
        a: "Product teams with no external clients will not use the intake, portal or invoicing, which is most of it. Teams of one or two will find a lighter tool less annoying. Agencies past about a hundred people have procurement requirements we do not meet yet.",
    },
    {
        q: "Is it stable enough to run a business on?",
        a: "We run Shunya on it every day and have done for the projects shown on this site. It is early and in active development, which is why we onboard studios in small batches rather than opening the doors - a structural mistake found by eight teams is cheaper than one found by eight hundred.",
    },
    {
        q: "What does it cost?",
        a: "Pricing is being set with the first cohort rather than guessed at in advance. Ask for access and we will tell you what it costs for a team your size, with no obligation.",
    },
    {
        q: "Can we get our data out?",
        a: "Yes. It is your client data and your project history, and a system you cannot leave is a system you should not join. Export is available for the records you put in.",
    },
]
