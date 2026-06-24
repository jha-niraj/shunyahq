import type { AuthorKey } from './authors'

export type BlogCategory =
	| 'engineering'
	| 'ai'
	| 'product'
	| 'case-studies'
	| 'startups'

export type BlogMeta = {
	title: string
	pageTitle: string
	description: string
	ogImage: string
	author: AuthorKey
	datePublished: string
	dateModified: string
	keywords: readonly string[]
	category: BlogCategory
	readingTime: number
	faqs?: { q: string; a: string }[]
	// AEO: 3-5 concise, factual, scannable takeaways - the single most-extracted
	// block by AI answer engines. Rendered near the top of the article and crawlable.
	keyTakeaways?: string[]
}

export type BlogPostWithSlug = BlogMeta & { slug: string }

// Human-readable category labels. The keys ARE the topic-hub URL segments.
export const BLOG_CATEGORIES: Record<BlogCategory, string> = {
	engineering: 'Engineering',
	ai: 'AI',
	product: 'Product',
	'case-studies': 'Case Studies',
	startups: 'Startups',
}

export const BLOG_CATEGORY_KEYS = Object.keys(BLOG_CATEGORIES) as BlogCategory[]

// Short intro shown on each topic-hub page above the post grid.
export const BLOG_TOPIC_INTROS: Record<BlogCategory, string> = {
	engineering:
		'How we architect, build, and ship production systems - the stacks, patterns, and trade-offs behind software that actually goes live and stays up.',
	ai:
		'Practical AI engineering from the trenches - RAG pipelines, LLM agents, and intelligent automation built to survive real users and real data, not demos.',
	product:
		'How we think about building the right thing - ownership, scope, velocity, and the product decisions that decide whether software gets used.',
	'case-studies':
		'Deep dives into real products we have designed, built, and launched - the challenge, the architecture, and what it took to ship.',
	startups:
		'Lessons for founders and early teams - shipping MVPs, picking a stack you will not regret, and turning a rough idea into a working product.',
}

export const BLOG_POSTS: Record<string, BlogMeta> = {
	'shipping-mvps-fast': {
		title: 'How We Ship Production MVPs in 4-8 Weeks',
		pageTitle: 'How We Ship Production MVPs in 4-8 Weeks (Without Cutting Corners)',
		description:
			'The exact process Shunya uses to take an idea to a production MVP in 4 to 8 weeks - scoping, the stack, bi-weekly deploys, and what we deliberately leave out.',
		ogImage: '/posts/shipping-mvps-fast.webp',
		author: 'niraj',
		datePublished: '2026-06-02',
		dateModified: '2026-06-18',
		keywords: [
			'how to ship an MVP fast',
			'production MVP in weeks',
			'MVP development process',
			'software agency MVP',
			'Next.js MVP stack',
		],
		category: 'engineering',
		readingTime: 7,
		keyTakeaways: [
			'A production MVP is a live system real users can use - not a prototype, a Figma deck, or a slide.',
			'We scope in weeks, not quarters: a 1-2 week discovery phase produces a written spec before any code is written.',
			'Bi-weekly deploys to staging mean the client always sees real working software instead of status updates.',
			'Speed comes from a small, opinionated stack (Next.js, tRPC, Prisma) and ruthless scope-cutting - not from skipping tests or auth.',
			'We ship the smallest thing that proves the core loop, then iterate once it is in front of users.',
		],
		faqs: [
			{
				q: 'What counts as a "production" MVP?',
				a: 'A production MVP is a deployed system real users can sign up for and use - with authentication, a real database, and the one core workflow working end to end. It is intentionally small, but it is live, not a prototype.',
			},
			{
				q: 'How can you build an MVP in 4 to 8 weeks without creating technical debt?',
				a: 'We use a small, opinionated stack we know deeply, cut scope hard down to the core loop, and keep auth, data, and deploys boring and standard. Speed comes from saying no to non-essential features, not from skipping the fundamentals.',
			},
			{
				q: 'What do you deliberately leave out of an MVP?',
				a: 'Admin dashboards, granular roles, exotic integrations, and edge-case handling for flows nobody has used yet. We add those once the core loop is validated with real users.',
			},
			{
				q: 'Will I see progress before launch?',
				a: 'Yes. We deploy to a staging environment every two weeks, so you are always looking at real working software you can click through - never just a status report.',
			},
		],
	},
	'rag-pipelines-explained': {
		title: 'Building RAG Pipelines That Actually Work in Production',
		pageTitle: 'Building RAG Pipelines That Actually Work in Production',
		description:
			'A practical guide to production RAG - chunking, embeddings, retrieval quality, grounding, and evaluation. The engineering decisions that separate a demo from a system you can trust.',
		ogImage: '/posts/rag-pipelines-explained.webp',
		author: 'niraj',
		datePublished: '2026-05-28',
		dateModified: '2026-06-12',
		keywords: [
			'RAG pipeline production',
			'retrieval augmented generation',
			'RAG architecture',
			'vector database RAG',
			'LLM grounding hallucination',
		],
		category: 'ai',
		readingTime: 9,
		keyTakeaways: [
			'RAG fails in production mostly at retrieval, not generation - if you fetch the wrong chunks, the best model still answers wrong.',
			'Chunking strategy and metadata matter more than the embedding model you pick.',
			'Always ground answers in retrieved context and cite sources, so users (and you) can verify them.',
			'You cannot improve what you do not measure - build an evaluation set before you tune anything.',
			'Treat the LLM as the last 10% of the system; the other 90% is data, retrieval, and guardrails.',
		],
		faqs: [
			{
				q: 'What is RAG (Retrieval-Augmented Generation)?',
				a: 'RAG is a pattern where you retrieve relevant documents from your own data and feed them to an LLM as context, so the model answers from your knowledge base instead of relying only on what it memorised during training.',
			},
			{
				q: 'Why do RAG demos work but production RAG fails?',
				a: 'Demos use a handful of clean documents and friendly questions. Production has messy data, ambiguous queries, and high stakes. Most failures happen at retrieval - fetching the wrong or incomplete chunks - which no amount of prompt engineering fully fixes.',
			},
			{
				q: 'Which matters more: the embedding model or the chunking strategy?',
				a: 'In our experience, chunking and metadata usually matter more. A good chunking strategy with mediocre embeddings beats great embeddings over poorly split documents, because retrieval quality is bounded by how well your chunks map to real questions.',
			},
			{
				q: 'How do you stop a RAG system from hallucinating?',
				a: 'Ground every answer in retrieved context, instruct the model to say when it does not know, cite the source passages, and evaluate against a labelled question set. You reduce hallucination by constraining and measuring, not by hoping.',
			},
		],
	},
	'full-stack-ownership': {
		title: 'Why Full-Stack Ownership Beats Handoffs',
		pageTitle: 'Why Full-Stack Ownership Beats Handoffs',
		description:
			'Handoffs between frontend, backend, infra, and design teams are where projects rot. Here is why a single team owning the whole stack ships faster and breaks less.',
		ogImage: '/posts/full-stack-ownership.webp',
		author: 'shunya-team',
		datePublished: '2026-05-20',
		dateModified: '2026-06-05',
		keywords: [
			'full-stack ownership',
			'software team handoffs',
			'end to end ownership engineering',
			'product team structure',
			'why projects fail handoffs',
		],
		category: 'product',
		readingTime: 6,
		keyTakeaways: [
			'Every handoff between teams adds a translation layer where context - and accountability - leaks out.',
			'One team owning frontend, backend, infra, and deployment removes the "not my problem" gap between layers.',
			'Ownership shortens the feedback loop: the person who built it also runs it, so they feel the bugs.',
			'Full-stack ownership is a structure choice, not a heroics choice - it works because of clear scope, not long hours.',
		],
		faqs: [
			{
				q: 'What does "full-stack ownership" actually mean?',
				a: 'It means one team is responsible for a product end to end - frontend, backend, infrastructure, and deployment - rather than passing the work between specialised teams at each stage. There is one group accountable for whether it works in production.',
			},
			{
				q: 'Does full-stack ownership mean every engineer does everything?',
				a: 'No. Engineers still have depth in particular areas. Ownership is about the team being collectively accountable for the whole system, so nothing falls into a gap between specialists.',
			},
			{
				q: 'Why are handoffs so risky?',
				a: 'Each handoff is a moment where context has to be re-explained and accountability gets blurry. When something breaks across a boundary, both sides can plausibly say it is the other side’s problem. Removing the boundary removes the finger-pointing.',
			},
		],
	},
	'codrzai-case-study': {
		title: 'Case Study: Building CodrzAI, an Engineering OS for Students',
		pageTitle: 'Case Study: Building CodrzAI, an Engineering OS for CS Students',
		description:
			'How we built CodrzAI from scratch in four months - AI roadmaps, six specialised agents, a project-scaffolding engine, and an open-source bounty marketplace - and what we learned.',
		ogImage: '/posts/codrzai-case-study.webp',
		author: 'shunya-team',
		datePublished: '2026-05-10',
		dateModified: '2026-05-30',
		keywords: [
			'CodrzAI case study',
			'AI learning platform',
			'edtech engineering',
			'LLM agents product',
			'building an AI suite',
		],
		category: 'case-studies',
		readingTime: 8,
		keyTakeaways: [
			'CS students were stitching together five tools - LeetCode, GitHub, YouTube, Discord, and ChatGPT - with nothing connecting them.',
			'We built CodrzAI as a single engineering OS: AI roadmaps, six specialised agents, a project foundry, and an open-source bounty marketplace.',
			'Shipping six AI agents in four months meant designing a shared agent framework early instead of building each one bespoke.',
			'The hardest part was not the AI - it was the product surface that made the AI useful in a student’s actual workflow.',
		],
		faqs: [
			{
				q: 'What is CodrzAI?',
				a: 'CodrzAI is an AI-powered engineering intelligence suite for computer-science students - combining AI-generated learning roadmaps, specialised coaching agents, a full-stack project-scaffolding engine, and an open-source bounty marketplace in one platform.',
			},
			{
				q: 'How long did it take to build CodrzAI?',
				a: 'We built the platform from scratch in roughly four months, including six specialised AI agents, the project foundry, and the contribution marketplace.',
			},
			{
				q: 'What was the hardest engineering challenge?',
				a: 'Shipping six distinct AI agents quickly without building each one as a one-off. We invested early in a shared agent framework - common context handling, tool access, and guardrails - so each new agent was a configuration, not a rewrite.',
			},
		],
	},
	'choosing-your-stack': {
		title: 'Next.js, tRPC, Prisma: Our Default Production Stack',
		pageTitle: 'Next.js, tRPC, Prisma: Our Default Production Stack (and Why)',
		description:
			'Why Shunya reaches for Next.js, tRPC, and Prisma by default - end-to-end type safety, one language across the stack, and a boring, reliable path from idea to production.',
		ogImage: '/posts/choosing-your-stack.webp',
		author: 'niraj',
		datePublished: '2026-04-30',
		dateModified: '2026-05-22',
		keywords: [
			'Next.js tRPC Prisma stack',
			'production tech stack',
			'type-safe full stack',
			'best stack for SaaS',
			'choosing a tech stack',
		],
		category: 'engineering',
		readingTime: 7,
		keyTakeaways: [
			'A default stack is a feature, not a constraint - it lets the team move fast because the boring decisions are already made.',
			'Next.js, tRPC, and Prisma give you end-to-end type safety from the database to the React component.',
			'One language (TypeScript) across the entire stack removes a whole class of integration bugs and context-switching.',
			'We pick boring, well-supported tools on purpose - the goal is software that still runs in two years.',
			'A default is a starting point, not a religion: we swap pieces when a project genuinely needs it.',
		],
		faqs: [
			{
				q: 'Why use Next.js, tRPC, and Prisma together?',
				a: 'Together they give you a single TypeScript codebase with end-to-end type safety: Prisma types your database, tRPC carries those types across the API boundary, and Next.js renders them in React. A change to your schema surfaces as a type error in the UI, before it ships.',
			},
			{
				q: 'When would you NOT use this stack?',
				a: 'When a project has needs the stack does not serve well - heavy data engineering, a non-TypeScript team, real-time systems with very specific latency budgets, or an existing codebase to extend. A default is a starting point, not a mandate.',
			},
			{
				q: 'Is tRPC a good choice if I might add mobile or third-party clients later?',
				a: 'tRPC is ideal when your frontend and backend live in one TypeScript monorepo. If you know you will expose a public API to many external clients, a documented REST or GraphQL layer may fit better - sometimes alongside tRPC for your own app.',
			},
		],
	},
	'nextjs-15-server-components-in-production': {
		title: 'Next.js 15 Server Components in Production: What Actually Changed',
		pageTitle: 'Next.js 15 Server Components in Production: What Actually Changed',
		description:
			'A dozen App Router apps later - the mental model that stuck, what got better, where Server Components bit us, the four overlapping caches, and the rules we ship by.',
		ogImage: '/posts/nextjs-15-server-components-in-production.webp',
		author: 'niraj',
		datePublished: '2026-04-14',
		dateModified: '2026-05-08',
		keywords: [
			'Next.js 15 server components',
			'React Server Components production',
			'App Router caching',
			"Next.js 'use client' boundary",
			'Server Actions vs API',
		],
		category: 'engineering',
		readingTime: 8,
		keyTakeaways: [
			'The server/client boundary is one question per file: does this code need the browser? If not, it stays a Server Component.',
			"'use client' is a boundary, not a per-component flag - everything a client module imports gets pulled into the browser bundle.",
			'Next.js 15 has four overlapping caches; most "stale data" reports are cache behaviour, not logic bugs.',
			'Quarantine client-only libraries behind one wrapper you own instead of scattering the boundary across the app.',
			'Treat a mutation without a matching revalidatePath/revalidateTag as an unfinished mutation.',
		],
		faqs: [
			{
				q: 'When should a component use the "use client" directive?',
				a: "Only when the browser is genuinely required - state, effects, event handlers, or browser APIs. Everything else stays a Server Component by default. Push 'use client' as deep in the tree as possible, because everything a client module imports is pulled into the client bundle.",
			},
			{
				q: 'Why does my Next.js 15 app show stale data?',
				a: 'Usually a cache hit, not a data bug. Next.js 15 has Request Memoization, the Data Cache, the Full Route Cache, and the Router Cache, and they interact. Check the cache layers before debugging your logic, and revalidate after every write.',
			},
			{
				q: 'Are Server Actions a replacement for an API?',
				a: "No. Server Actions are a feature of your web app - great for your own forms and mutations. They are POST requests under the hood without a documented contract. The moment a second client appears (mobile, partner integration), add a typed API layer instead.",
			},
			{
				q: 'Are React Server Components worth the migration?',
				a: 'Yes, with eyes open. You get smaller default bundles, data fetching next to the component, and secrets that stay on the server. The cost is a real learning curve, especially around caching, that takes a team a few weeks to internalise.',
			},
		],
	},
	'scaling-postgres-for-saas': {
		title: 'Scaling Postgres for SaaS: The Order Problems Actually Show Up',
		pageTitle: 'Scaling Postgres for SaaS: The Order Problems Actually Show Up',
		description:
			'Most "we need to scale our database" conversations are really "we never tuned our database" conversations. How we scale Postgres - measure, index, pool, replicate - in the right order.',
		ogImage: '/posts/scaling-postgres-for-saas.webp',
		author: 'niraj',
		datePublished: '2026-03-22',
		dateModified: '2026-04-18',
		keywords: [
			'scaling Postgres SaaS',
			'Postgres performance tuning',
			'pg_stat_statements indexes',
			'Postgres connection pooling PgBouncer',
			'read replicas partitioning',
		],
		category: 'engineering',
		readingTime: 9,
		keyTakeaways: [
			'Measure before you change anything - pg_stat_statements and EXPLAIN ANALYZE show you the real problem instead of the imagined one.',
			'Most slow SaaS queries are a missing, wrong, or unusable index - fix indexing before any architectural change.',
			'Connection exhaustion, not CPU, is what ambushes serverless SaaS; put a pooler in front of Postgres instead of raising max_connections.',
			'Reach for read replicas, caching, partitioning, and sharding in that order - and only when the numbers genuinely demand them.',
			'Tested backups and online, reversible migrations are non-negotiable from day one - speed without durability is not a win.',
		],
		faqs: [
			{
				q: 'When does a SaaS app actually need to scale Postgres beyond one machine?',
				a: 'Much later than most teams fear. Once a single instance is tuned, indexed, and pooled, it has enormous headroom. Read replicas, caching, and partitioning come first; genuine sharding is a last resort because of the complexity it adds.',
			},
			{
				q: 'How do I fix "too many connections" errors on serverless?',
				a: 'Do not raise max_connections - that trades the error for memory exhaustion. Put a connection pooler like PgBouncer in transaction-pooling mode in front of Postgres so many application connections multiplex over a small pool of real database connections.',
			},
			{
				q: 'What matters more: better hardware or better indexes?',
				a: 'Indexes, almost always, first. The overwhelming majority of slow SaaS queries are missing an index, using the wrong one, or written so Postgres cannot use the right one. Tuning and indexing usually reclaim more performance than throwing hardware at the problem.',
			},
			{
				q: 'When should I reach for table partitioning?',
				a: 'For tables that grow without bound and are time-structured - event logs, audit trails, time-series data - typically once a single table reaches the hundreds of millions of rows. Partitioning by time keeps each partition small and makes archiving old data trivial.',
			},
		],
	},
	'cost-of-cutting-corners': {
		title: 'The Real Cost of Cutting Corners in Software',
		pageTitle: 'The Real Cost of Cutting Corners in Software (and Why It Is Not Speed)',
		description:
			'Cutting scope makes you faster with no long-term cost. Cutting corners makes you faster today and slower every day after. Why the two are not the same, and where the bill actually lands.',
		ogImage: '/posts/cost-of-cutting-corners.webp',
		author: 'shunya-team',
		datePublished: '2026-02-26',
		dateModified: '2026-03-20',
		keywords: [
			'cost of cutting corners software',
			'technical debt vs scope',
			'cutting scope not quality',
			'software quality on a deadline',
			'engineering discipline velocity',
		],
		category: 'product',
		readingTime: 7,
		keyTakeaways: [
			'Cutting scope (building less) is a strategy; cutting corners (building badly) is a loan that accrues interest.',
			'The saving from a cut corner is small, immediate, and goes to the shortcut-taker; the cost is large, delayed, and lands on whoever maintains the system.',
			'Cut corners compound - the first untested module makes the next one feel acceptable, until the whole codebase becomes one nobody dares to touch.',
			'"Doing it right" is not gold-plating; it means the load-bearing parts are tested, failures are visible, and the next change stays cheap.',
			'On a deadline, cut the feature list, never the engineering quality of what remains.',
		],
		faqs: [
			{
				q: 'What is the difference between cutting scope and cutting corners?',
				a: 'Cutting scope means deciding not to build something - you ship fewer features, but the ones you ship are complete and solid. Cutting corners means building something badly, skipping validation, error handling, or tests. The first costs nothing long term; the second slows you down every day after.',
			},
			{
				q: 'Does writing software carefully make it slower to build?',
				a: 'No, in the long run it is faster. A team that tests core workflows, handles failures, and keeps code changeable spends its time building forward instead of repaying yesterday\'s shortcuts. Careless speed defers and multiplies cost rather than saving it.',
			},
			{
				q: 'How should a team handle quality when a deadline is tight?',
				a: 'Cut features, not quality. "We are not building the export feature this sprint" is a clean decision; "we are shipping export but it does not handle errors" is debt with your name on it. Hand over fewer features that are genuinely done.',
			},
			{
				q: 'What is the real long-term cost of cutting corners?',
				a: 'The slow loss of the ability to change your own software - the point at which a team becomes afraid to touch its own codebase. That lost agility is far more expensive than the rework itself, and protecting it is what engineering discipline buys you.',
			},
		],
	},
	'from-idea-to-mvp-in-6-weeks': {
		title: 'From Idea to MVP in 6 Weeks: The Week-by-Week Playbook',
		pageTitle: 'From Idea to MVP in 6 Weeks: The Week-by-Week Playbook',
		description:
			'The concrete, week-by-week version of how we take a founder\'s idea to a deployed MVP in six weeks - discovery, foundation, the core loop, polish, and launch.',
		ogImage: '/posts/from-idea-to-mvp-in-6-weeks.webp',
		author: 'shunya-team',
		datePublished: '2026-01-30',
		dateModified: '2026-02-22',
		keywords: [
			'idea to MVP in 6 weeks',
			'MVP development timeline',
			'MVP playbook week by week',
			'how to build an MVP fast',
			'startup MVP process',
		],
		category: 'startups',
		readingTime: 8,
		keyTakeaways: [
			'An MVP is the smallest live system that proves your core loop - not version one of the full product.',
			'If you cannot finish "a user signs up, does ___, and gets ___" in one sentence, you are ready to talk, not to build.',
			'Stand up the boring foundation - auth, database, deploy pipeline - in week two, and deploy continuously from then on.',
			'The biggest threat to the timeline is scope creep disguised as "small additions"; protect the out-of-scope list aggressively.',
			'Six weeks is enough for most ideas - the constraint is the willingness to ship the smallest real thing first, not capability.',
		],
		faqs: [
			{
				q: 'Can you really build a usable product in six weeks?',
				a: 'Yes, for most ideas - if you build an MVP, not the full product. Six weeks is enough to ship the smallest live system that proves your core loop. It is not enough to build everything you imagine, and knowing that difference is the entire skill.',
			},
			{
				q: 'What happens in each of the six weeks?',
				a: 'Week 1 is discovery and a written spec; week 2 stands up auth, database, and the deploy pipeline; weeks 3-4 build the core loop end to end on staging; week 5 adds real error and empty states; week 6 is QA, production deploy, handover, and inviting real users.',
			},
			{
				q: 'How do you stop scope creep from blowing the timeline?',
				a: 'With a real out-of-scope list that has authority. Everything new goes on the post-launch list unless it breaks the core loop. Scope creep arrives as "small additions" that each feel minor and together sink the launch, so the boundary is protected aggressively.',
			},
			{
				q: 'What kind of product does NOT fit in six weeks?',
				a: 'Products with heavy regulatory requirements, complex data migration, or a core loop that depends on a genuinely hard technical problem. We say so when an idea does not fit - pretending otherwise just relocates the delay to launch week.',
			},
		],
	},
	'designing-ai-agents-that-dont-hallucinate': {
		title: "Designing AI Agents That Don't Hallucinate",
		pageTitle: "Designing AI Agents That Don't Hallucinate: An Architecture Problem",
		description:
			'Hallucination is largely an architecture problem, not a model problem. How we build agents businesses rely on - grounding, tools, constrained outputs, citations, and evaluation.',
		ogImage: '/posts/designing-ai-agents-that-dont-hallucinate.webp',
		author: 'niraj',
		datePublished: '2025-12-12',
		dateModified: '2026-01-15',
		keywords: [
			'AI agents hallucination',
			'prevent LLM hallucination',
			'grounded AI agent design',
			'LLM tool use accuracy',
			'reliable AI agents production',
		],
		category: 'ai',
		readingTime: 8,
		keyTakeaways: [
			'Hallucination is mostly an architecture problem - you reduce it by giving the model fewer opportunities to make things up, not by waiting for a better model.',
			'Ground every answer in retrieved facts and explicitly give the agent permission to say "I do not know."',
			'Give the agent tools for anything deterministic - calculation, lookups, live data - instead of trusting its recall.',
			'Constrain outputs with schemas, require citations, and add verification passes for high-stakes answers.',
			'You cannot reduce what you do not measure - build an evaluation set before tuning anything.',
		],
		faqs: [
			{
				q: 'Why do AI agents hallucinate?',
				a: 'A language model is trained to produce plausible text. When it has the right facts in context, plausible and correct coincide; when it does not, it still produces plausible text and fills the gap with something that sounds right. It is not lying - it is doing its job in a situation where it lacks the facts.',
			},
			{
				q: 'What is the most effective way to reduce hallucination?',
				a: 'Move every factual claim off the model\'s memory and onto a deterministic system. Retrieve facts from trusted sources, give the agent tools for calculations and lookups, and instruct it to answer only from what it was given - including permission to admit it does not know.',
			},
			{
				q: 'Should an AI agent be allowed to say "I do not know"?',
				a: 'Yes, and it should be rewarded for it. An agent explicitly told that "I do not have enough information to answer" is an acceptable and preferred response is dramatically more trustworthy than one that feels obligated to always produce an answer.',
			},
			{
				q: 'How do you measure whether an agent is hallucinating?',
				a: 'Build an evaluation set - real questions paired with correct answers and the sources that should back them - before tuning anything. Then you can measure how often the agent is grounded, correctly says it does not know, or invents, and drive that number down.',
			},
		],
	},
	'ci-cd-that-actually-ships': {
		title: 'CI/CD That Actually Ships: A Pipeline on Every Project',
		pageTitle: 'CI/CD That Actually Ships: The Pipeline We Put on Every Project',
		description:
			'A deployment pipeline has one job: make shipping so safe and boring that nobody is afraid to do it. The CI/CD setup we put on every project and why each piece earns its place.',
		ogImage: '/posts/ci-cd-that-actually-ships.webp',
		author: 'niraj',
		datePublished: '2025-11-08',
		dateModified: '2025-12-04',
		keywords: [
			'CI/CD pipeline best practices',
			'continuous deployment setup',
			'preview deployments PR',
			'shift left testing',
			'automated production deploys rollback',
		],
		category: 'engineering',
		readingTime: 8,
		keyTakeaways: [
			'A pipeline\'s job is to make shipping so safe and boring that nobody is afraid to deploy - the pipeline catches problems, not the user.',
			'Shift detection as far left as possible: a type error in the editor costs nothing, the same error in production costs a support ticket and some trust.',
			'Keep CI fast or developers route around it - cache aggressively, parallelise jobs, and treat pipeline speed as a feature.',
			'Preview deployments on every PR collapse the feedback loop by letting people use the actual change before it merges.',
			'Automatic production deploys are only safe with a fast, well-rehearsed rollback - build the rollback before the automation.',
		],
		faqs: [
			{
				q: 'What should run on every pull request?',
				a: 'Type checking, linting and formatting, the test suite focused on core workflows, and a full production build. Nothing reaches the main branch without passing these gates, each one cheaper and faster than the failure it prevents.',
			},
			{
				q: 'Why are preview deployments worth setting up?',
				a: 'They give every pull request a live, deployed environment with a unique URL, so reviewers, designers, and clients click through the actual change on real infrastructure instead of a screenshot or a description. Misunderstandings get caught in review instead of after launch.',
			},
			{
				q: 'Is it safe to deploy to production automatically on every merge?',
				a: 'Yes, but only with two things in place: database migrations that are online and reversible, and a fast, obvious rollback. The willingness to deploy on every merge is earned by knowing you can undo it in seconds - build the rollback before the automation.',
			},
			{
				q: 'How fast should a CI pipeline be?',
				a: 'Fast enough that developers do not route around it. If the pipeline takes twenty minutes, people batch changes and push less often, and the feedback loop collapses. Cache aggressively, run jobs in parallel, and treat speed as a feature, not an afterthought.',
			},
		],
	},
	'building-syncorbit-case-study': {
		title: 'Case Study: Building SyncOrbit, a Command Center for Agencies',
		pageTitle: 'Case Study: Building SyncOrbit, a Command Center for Agencies',
		description:
			'How SyncOrbit came together - the problem of an agency with no single screen, the core loop, the aggregation architecture, and why the data model, not the dashboard, was the hard part.',
		ogImage: '/posts/building-syncorbit-case-study.webp',
		author: 'niraj',
		datePublished: '2025-10-10',
		dateModified: '2025-11-02',
		keywords: [
			'SyncOrbit case study',
			'agency management software',
			'data aggregation product',
			'building a command center dashboard',
			'Next.js tRPC Postgres product',
		],
		category: 'case-studies',
		readingTime: 8,
		keyTakeaways: [
			'Agencies do not lack tools - they lack a single surface that ties the tools together; SyncOrbit is that surface.',
			'The core loop: open SyncOrbit and immediately see the true state of every project and what to do next, without opening anything else.',
			'Aggregation products live and die on freshness - we combined webhooks for speed with scheduled reconciliation for correctness.',
			'The hard part was the data model, not the screens - every meaningful view downstream depended on getting it right.',
			'V1 was ruthlessly scoped: sensible defaults over customisation, the few integrations that mattered, present state before forecasting.',
		],
		faqs: [
			{
				q: 'What is SyncOrbit?',
				a: 'SyncOrbit is a command center for agencies - a single surface that aggregates projects, people, capacity, time, and money so a team can open one screen and see the true state of everything, instead of assembling the picture from five disconnected tools by hand.',
			},
			{
				q: 'What was the hardest part of building SyncOrbit?',
				a: 'The data model, not the user interface. Representing projects, people, capacity, time, and money flexibly enough for how different agencies operate - without becoming so generic it meant nothing - took more iteration than any other part, because every view downstream depended on it.',
			},
			{
				q: 'How does an aggregation product keep its dashboard accurate?',
				a: 'By treating the aggregated state as a cache that must be continuously re-proven against the source. SyncOrbit combines webhooks (push updates the moment something changes) with scheduled background reconciliation (a periodic sweep to catch anything missed). Webhooks keep it fast; reconciliation keeps it correct.',
			},
			{
				q: 'What stack was SyncOrbit built on?',
				a: 'Next.js App Router for server-rendered dashboards, tRPC for end-to-end type safety, Postgres with Prisma for relational data and safe migrations, background jobs and webhooks for sync, and role-based access for owner, member, and client-facing views.',
			},
		],
	},
	'mobile-vs-web-vs-pwa': {
		title: 'Mobile vs Web vs PWA: How to Choose the Right Platform',
		pageTitle: 'Mobile vs Web vs PWA: How to Choose the Right Platform for Your Product',
		description:
			'Native app, web app, or PWA? It is not a technology question - it is about who your users are and what you can afford to maintain. How we match the platform to the product.',
		ogImage: '/posts/mobile-vs-web-vs-pwa.webp',
		author: 'shunya-team',
		datePublished: '2025-09-05',
		dateModified: '2025-10-01',
		keywords: [
			'mobile vs web vs PWA',
			'native app vs web app',
			'progressive web app pros cons',
			'choosing a platform for your product',
			'when to build a native app',
		],
		category: 'product',
		readingTime: 8,
		keyTakeaways: [
			'Platform choice is a product question - who your users are and what you can maintain - not a technology preference.',
			'Moving from web to PWA to native gains capability and loses reach, update speed, and cheapness.',
			'A PWA is a web app that opted into app-like capabilities, so you can start on the web and enhance later without rebuilding.',
			'Choose native only when the product genuinely needs deep hardware access, reliable push, or app-store presence - not for prestige.',
			'For most products: build on the web, make it a PWA if mobile matters, and go native only when the product earns it.',
		],
		faqs: [
			{
				q: 'What is the difference between a web app, a PWA, and a native app?',
				a: 'A web app runs in the browser with nothing to install. A native app is built per platform (iOS, Android) and installed from an app store with full hardware access. A PWA is a web app enhanced with app-like capabilities - home-screen install, offline support, and push - from a single web codebase.',
			},
			{
				q: 'When should I build a native mobile app instead of a web app?',
				a: 'When the product lives in the user\'s pocket, needs deep hardware integration (background GPS, camera, secure storage), depends on reliable push notifications, or benefits from app-store discoverability. Native is the most expensive option to build and maintain, so choose it for genuine need, not prestige.',
			},
			{
				q: 'Is a PWA good enough instead of a native app?',
				a: 'Often yes - especially when your audience skews Android or desktop and app-like features are an enhancement rather than the core. The main caveat is iOS, which still restricts web push and installation more than Android. If reliable iOS push is mission-critical, that points back toward native.',
			},
			{
				q: 'What platform should most early-stage SaaS products use?',
				a: 'A web app, usually. One codebase covers every device, updates ship instantly without app-store review, and there is no download friction between a prospect and their first session. Enhance it into a PWA if mobile usage matters, and add a native client only when a real user need demands it.',
			},
		],
	},
}

// Posts in a category, newest first, with the slug attached.
export function getPostsByCategory(category: BlogCategory): BlogPostWithSlug[] {
	return Object.entries(BLOG_POSTS)
		.filter(([, meta]) => meta.category === category)
		.map(([slug, meta]) => ({ slug, ...meta }))
		.sort(
			(a, b) =>
				new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime(),
		)
}

// Related posts: same category first, then most recent others, excluding the current post.
export function getRelatedPosts(slug: string, limit = 3): BlogPostWithSlug[] {
	const current = BLOG_POSTS[slug]
	if (!current) return []

	const all = Object.entries(BLOG_POSTS)
		.filter(([key]) => key !== slug)
		.map(([key, meta]) => ({ slug: key, ...meta }))

	const sameCategory = all.filter((p) => p.category === current.category)
	const others = all.filter((p) => p.category !== current.category)

	const byDate = (a: BlogPostWithSlug, b: BlogPostWithSlug) =>
		new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()

	return [...sameCategory.sort(byDate), ...others.sort(byDate)].slice(0, limit)
}
