import type { AuthorKey } from './authors'
import { ACTIVE_BLOG_SLUGS } from './active-posts'

export type BlogCategory =
	| 'buying-guide'
	| 'guides'
	| 'comparisons'
	| 'case-studies'
	| 'insights'
	| 'engineering'

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
// Organised by SEARCH INTENT, not by what we happen to know. The previous set
// (engineering / ai / product / case-studies / startups) was a map of our expertise, so every hub
// spoke to an engineer. A buyer comparing agencies searches for cost, for how to choose, and for
// custom-vs-off-the-shelf - those now have hubs of their own, and the deep technical writing keeps
// a home under `engineering` rather than defining the whole blog.
export const BLOG_CATEGORIES: Record<BlogCategory, string> = {
	'buying-guide': 'Buying Guide',
	guides: 'Guides',
	comparisons: 'Comparisons',
	'case-studies': 'Case Studies',
	insights: 'Insights',
	engineering: 'Engineering',
}

export const BLOG_CATEGORY_KEYS = Object.keys(BLOG_CATEGORIES) as BlogCategory[]

// Short intro shown on each topic-hub page above the post grid.
export const BLOG_TOPIC_INTROS: Record<BlogCategory, string> = {
	'buying-guide':
		'What a custom web application really costs, how to tell a good engineering partner from a bad one, and the questions to ask before you sign anything. Written for the person who has to justify the spend.',
	guides:
		'Practical, step-by-step guides to planning and running a web build - scoping it so it does not sprawl, sequencing it so you see working software early, and knowing what "done" actually means.',
	comparisons:
		'Straight comparisons of the decisions that shape a project: custom software against off-the-shelf, web against native, and the stack choices that decide what your product costs to maintain.',
	'case-studies':
		'Deep dives into real products we have designed, built and launched - the problem the client had, the architecture we chose, and what changed after it went live.',
	insights:
		'Perspective on why software projects succeed or fail - ownership, scope discipline, and the compounding cost of decisions that looked cheap at the time.',
	engineering:
		'The technical corner. How we architect, build and ship production systems - stacks, patterns and trade-offs, written for engineers who want the detail rather than the summary.',
}

export const BLOG_POSTS: Record<string, BlogMeta> = {
	'software-development-contract-checklist': {
		title: "Software Development Contract Checklist",
		pageTitle: "Software Development Contract: What to Check",
		description:
			"The clauses that decide who owns what, the five to insist on at any project size, and what the standard wording usually leaves out.",
		ogImage: '/posts/software-development-contract-checklist.webp',
		author: 'niraj',
		datePublished: '2025-07-07',
		dateModified: '2026-08-09',
		keywords: [
			'software development contract',
			'web development contract checklist',
			'IP ownership software contract',
			'development agreement clauses',
			'software contract review',
		],
		category: 'buying-guide',
		readingTime: 13,
		keyTakeaways: [
			"Unless the contract says otherwise, in many jurisdictions the developer owns what they wrote. You have a licence, not the thing itself, and that is the opposite of what most clients assume.",
			"Infrastructure held in the agency's accounts means that on the day you part ways, your business is inside someone else's login. Set it up in your own accounts on day one.",
			"The exit clause is the one nobody negotiates and the one that matters most when it is needed, because by then goodwill has run out.",
			"Five clauses are non-negotiable at any project size: IP assignment on payment, your infrastructure, a defined exit process, a warranty surviving acceptance, and a written change process.",
			"How a supplier responds to those five is the best signal in the whole negotiation. Ready agreement says they expect the relationship to end well.",
		],
		faqs: [
			{
				q: "Who owns the code in a software development contract?",
				a: "Whoever the contract says. Without an explicit assignment clause, the developer generally retains ownership and you hold a licence. Ask for assignment on payment, plus a written list of what is assigned and what is licensed.",
			},
			{
				q: "What should a software development contract include?",
				a: "Scope with a change process, acceptance criteria and a testing window, milestone payments, IP assignment, a warranty, a liability cap with carve-outs, a defined exit process, and a data processing agreement.",
			},
			{
				q: "Is a 30-day warranty normal for software?",
				a: "It is common. Ninety days is better and is achievable. The more important question is whether the warranty survives acceptance, because one that expires when you sign off is not a warranty at all.",
			},
			{
				q: "Should the agency host our website and own the domain?",
				a: "No. Register the domain to your company and put hosting, repositories and third-party services in accounts you own, with the agency granted access. It costs nothing at the start and prevents weeks of migration later.",
			},
			{
				q: "Do I need a lawyer to review a software contract?",
				a: "Read it yourself against a checklist first, then send the supplier your reasonable requests. Use a lawyer for the clauses you cannot evaluate - liability, indemnities and termination - which is a fraction of a full review.",
			},
		],
	},
	'why-your-website-is-slow': {
		title: "Why Your Website Is Slow",
		pageTitle: "Why Your Website Is Slow, and What It Costs to Fix",
		description:
			"The causes in order of how often they are the real problem, how to check each without a developer, and what each fix actually costs.",
		ogImage: '/posts/why-your-website-is-slow.webp',
		author: 'niraj',
		datePublished: '2025-07-16',
		dateModified: '2026-08-09',
		keywords: [
			'why is my website slow',
			'website speed optimization cost',
			'improve page load time',
			'slow website diagnosis',
			'fix slow website',
		],
		category: 'guides',
		readingTime: 13,
		keyTakeaways: [
			"Measure before anything else, on mobile, on three real pages. Without a baseline you cannot tell whether a fix worked, and it feels faster is not evidence.",
			"Images are the most common cause by a wide margin and the cheapest to fix. Third-party scripts are second and nobody owns them.",
			"Rendering approach is a real cause and it is fifth or sixth on the list, not first - which matters because it is by far the most expensive thing to change.",
			"Layout shift is the cheapest fix on the list and the most visible to users. Declaring image dimensions resolves most of it in a day.",
			"Work the causes in order and most sites never reach the expensive ones. Be sceptical of any proposal that starts with a rebuild before anything has been measured.",
		],
		faqs: [
			{
				q: "Why is my website slow on mobile but fine on desktop?",
				a: "Because mobile devices have less processing power and slower connections, so JavaScript weight and image size hurt far more. A site can score 96 on desktop and 34 on mobile, and the mobile number is the one your customers experience.",
			},
			{
				q: "How much does it cost to speed up a website?",
				a: "Images and layout shift together are usually $1,300 to $5,500 and fix most sites. JavaScript reduction is $3,000 to $12,000. A rendering change is $8,000 to $40,000 and is rarely the first thing needed.",
			},
			{
				q: "Do I need to rebuild my website to make it faster?",
				a: "Usually not. Most slow sites are slow because of images, third-party scripts and layout shift, all of which are fixable in weeks. Measure first - a rebuild is the most expensive possible answer to a cheap problem.",
			},
			{
				q: "What is a good page load time?",
				a: "Largest Contentful Paint of 2.5 seconds or less on mobile field data. Time to first byte under 600 milliseconds. Above 4 seconds for LCP is considered poor and is where bounce rate climbs sharply.",
			},
			{
				q: "Why did my site get slower over time?",
				a: "Accumulated third-party scripts, larger images, and JavaScript added feature by feature. Performance regresses silently because nobody notices the day it crossed the line. A budget enforced in the build prevents it.",
			},
		],
	},
	'managing-a-software-project-as-a-client': {
		title: "Managing a Software Project as a Client",
		pageTitle: "Managing a Software Project: The Client Side",
		description:
			"Your half of the work: the decisions only you can make, how to give feedback that helps, and the warning signs worth acting on.",
		ogImage: '/posts/managing-a-software-project-as-a-client.webp',
		author: 'niraj',
		datePublished: '2025-07-25',
		dateModified: '2026-08-09',
		keywords: [
			'managing a software project',
			'client side project management',
			'working with a development agency',
			'software project communication',
			'UAT client responsibilities',
		],
		category: 'guides',
		readingTime: 14,
		keyTakeaways: [
			"Budget four to eight hours a week of your own time on an active project. If you cannot, appoint someone who can, with authority to decide without escalating.",
			"Name a single decision maker. Committees produce contradictory feedback with no mechanism to resolve it, and the supplier ends up choosing which stakeholder to disappoint.",
			"A supplier asking you no questions is not one who has understood everything. It is one making assumptions you will meet later.",
			"Describe the problem, not the solution. Suppliers who receive solutions implement solutions; suppliers who receive problems find better answers.",
			"Everyone who can block the project at the end should be involved in the middle. Fifteen minutes at week four is cheaper than a veto at week twenty.",
		],
		faqs: [
			{
				q: "How much of my time will a software project take?",
				a: "Four to eight hours a week while it is active, more in the first fortnight and around launch. Questions only you can answer arrive continuously, and a supplier who cannot get answers either waits or guesses.",
			},
			{
				q: "What should I expect from a weekly project update?",
				a: "Half a page: what was done, what is next, what is blocked, and what decisions are needed from you. Plus something working you can click, and a short demo you attend.",
			},
			{
				q: "How do I give useful feedback on software?",
				a: "Describe the problem rather than prescribing the solution, separate defects from changes of mind, batch your feedback rather than sending it continuously, and prioritise honestly by saying what happens if it ships as-is.",
			},
			{
				q: "What are the warning signs a software project is in trouble?",
				a: "Nothing to click by week five or six, status that is always green then suddenly is not, estimates that never move, communication dropping off, and scope growing without anyone mentioning cost.",
			},
			{
				q: "Who should test the software before launch?",
				a: "People who were not in the design conversations, testing complete real journeys on the devices your customers actually use. Internal reviewers who helped design it can no longer see what is confusing.",
			},
		],
	},
	'what-happens-after-launch': {
		title: "What Happens After Launch",
		pageTitle: "What Happens After Launch: The First Year",
		description:
			"The first 48 hours, the month that matters most, what running costs really are, and the six things that must exist on day one.",
		ogImage: '/posts/what-happens-after-launch.webp',
		author: 'niraj',
		datePublished: '2025-08-06',
		dateModified: '2026-08-09',
		keywords: [
			'after website launch',
			'software maintenance first year',
			'post launch support',
			'website ongoing costs',
			'what happens after software launch',
		],
		category: 'buying-guide',
		readingTime: 13,
		keyTakeaways: [
			"The month after launch is the highest-value month in the product's life and it is routinely wasted. Hold back 10-15% of the budget deliberately to act on what it reveals.",
			"Six things must exist on day one: monitoring that alerts a person, error tracking, verified backups, a documented deployment, an access list, and a support route users can find.",
			"Maintenance is 15-20% of build cost annually and it is not deferrable. Skipped dependency updates do not cost a year's worth to catch up - they cost considerably more.",
			"Name three owners: a product owner, someone technical who is accountable, and someone who owns the numbers. Diffused responsibility is how live systems drift.",
			"Certificates expire, domains lapse, API keys stop working and third parties deprecate things. A live system degrades even when nobody touches it.",
		],
		faqs: [
			{
				q: "What happens after a website or app launches?",
				a: "A cluster of small defects in the first 48 hours, unexpected real-world data, and the first genuine learning about how people use it. Then ongoing hosting, patching, monitoring and improvement for as long as it runs.",
			},
			{
				q: "How much does it cost to maintain a web application?",
				a: "Roughly 15-20% of the original build cost annually for patching, dependency updates, bug fixes and small changes, plus hosting and third-party services. Feature development is additional and is your choice.",
			},
			{
				q: "What should be in a support agreement?",
				a: "Severity levels with response times, hours of cover, what is included versus billable, a monthly hours allocation with rules for overruns and unused time, a single contact route, and notice periods both ways.",
			},
			{
				q: "Should I budget money for after launch?",
				a: "Yes - 10 to 15% of the build cost, held back for the first month. It is the highest-return money in the project because it is the only budget informed by real user behaviour rather than assumption.",
			},
			{
				q: "What breaks on its own in a live system?",
				a: "TLS certificates, domain registrations, API keys and tokens, third-party APIs being deprecated, storage filling up, and email deliverability drifting. A quarterly half-hour check prevents most of these becoming incidents.",
			},
		],
	},
	'choosing-an-ecommerce-platform': {
		title: "Choosing an E-commerce Platform",
		pageTitle: "Choosing an E-commerce Platform: A Framework",
		description:
			"The four questions that decide it, honest cost comparisons, the hidden line nobody quotes, and when replatforming is the wrong answer.",
		ogImage: '/posts/choosing-an-ecommerce-platform.webp',
		author: 'niraj',
		datePublished: '2025-08-15',
		dateModified: '2026-08-09',
		keywords: [
			'choosing an ecommerce platform',
			'Shopify vs WooCommerce',
			'headless commerce cost',
			'ecommerce replatforming',
			'best ecommerce platform for business',
		],
		category: 'comparisons',
		readingTime: 13,
		keyTakeaways: [
			"Four questions decide it: product complexity, integration requirements, who operates it daily, and whether the buying experience is genuinely a differentiator.",
			"For most retailers - a few hundred simple products, no critical integrations, non-technical staff - a hosted platform is the correct answer rather than a compromise.",
			"Product data preparation is the largest hidden cost in every replatform, frequently exceeding the store build, and it never appears in a quote because it is your data.",
			"URL redirects from the old store are not a finishing touch. Getting them wrong loses accumulated search visibility that took years to build.",
			"Once a store is running, checkout friction, images, delivery clarity and search matter more than the platform. A well-run store on a modest platform beats the reverse.",
		],
		faqs: [
			{
				q: "Which e-commerce platform should I choose?",
				a: "A hosted platform if you have a conventional catalogue, no critical integrations and a non-technical team - which describes most retailers. Self-hosted or headless only when a specific requirement justifies the extra cost and operational burden.",
			},
			{
				q: "How much does an e-commerce website cost?",
				a: "A hosted store is $6,000 to $40,000 to build. Self-hosted is $15,000 to $80,000. Headless is $60,000 to $300,000. Add product data work, photography, migration and integrations, which are frequently the larger half.",
			},
			{
				q: "Is Shopify better than WooCommerce?",
				a: "Neither is better in general. Hosted platforms remove the operational burden and constrain you to their structure. Self-hosted gives flexibility through plugins and makes hosting, security, updates and performance your responsibility.",
			},
			{
				q: "When should I replatform my online store?",
				a: "When the current platform is unsupported, when operating it consumes disproportionate agency time, or when a genuinely needed capability is unachievable. Not because the site is slow or the design looks dated - both are cheaper to fix in place.",
			},
			{
				q: "Do I need headless commerce?",
				a: "Only if the buying experience is genuinely unusual, commerce sits inside a larger product, you sell through several channels from one catalogue, or performance is a competitive requirement at scale. Otherwise it is capability you will not use.",
			},
		],
	},
	'building-a-multi-language-website': {
		title: "Building a Multi-Language Website",
		pageTitle: "Building a Multi-Language Website: Real Costs",
		description:
			"Why translation is the smaller half, what has to change in the application, and how to prepare even if you defer the second language.",
		ogImage: '/posts/building-a-multi-language-website.webp',
		author: 'niraj',
		datePublished: '2025-08-27',
		dateModified: '2026-08-09',
		keywords: [
			'multi language website',
			'website localisation cost',
			'hreflang setup',
			'internationalisation web application',
			'translating a website',
		],
		category: 'guides',
		readingTime: 13,
		keyTakeaways: [
			"Translation converts text. Localisation makes the product appropriate for a place - currency, dates, addresses, name structures, legal requirements. Projects budget for the first and encounter the second.",
			"Text extraction is the largest line in any retrofit, because every string written directly into the code has to be pulled out screen by screen.",
			"Every language version needs its own self-referencing canonical. Every version pointing at the English page removes the translations from search results entirely.",
			"The ongoing cost is the real one: every content change now happens in every language, forever, or three of your four versions quietly go out of date.",
			"Even when deferring, extract your strings and use locale-aware formatting. A few thousand pounds during a build saves five figures later.",
		],
		faqs: [
			{
				q: "How much does it cost to make a website multi-language?",
				a: "Built in from the start, roughly $8,000 to $23,000 of technical work plus translation at $0.10 to $0.30 per word. Retrofitted onto an existing application, the technical work typically triples.",
			},
			{
				q: "Should I use subdirectories or separate domains for languages?",
				a: "Subdirectories for most businesses - one domain, shared authority, easy to add languages. Country domains give the strongest local signal at the highest cost and are worth it only for large per-country operations.",
			},
			{
				q: "What is hreflang and do I need it?",
				a: "Annotations telling search engines that a page has versions in other languages, so the right one is served to the right person. Yes, if you have more than one language version, and it needs to be implemented precisely.",
			},
			{
				q: "Is machine translation good enough for a website?",
				a: "For documentation, product descriptions and blog content with a review pass, generally yes. For your homepage, pricing and anything legal, pay for human translation - those pages are short and the stakes are higher.",
			},
			{
				q: "What breaks when you translate a website?",
				a: "Layout, because German runs about 30% longer than English. Text baked into images. Idioms and wordplay. Sorting order. Legal pages, which need rewriting per jurisdiction rather than translating.",
			},
		],
	},
	'design-systems-for-business': {
		title: "Design Systems: The Business Case",
		pageTitle: "Design Systems: The Business Case, Not the Design One",
		description:
			"Why a design system is infrastructure rather than decoration, what it saves, when to adopt rather than build, and how they fail.",
		ogImage: '/posts/design-systems-for-business.webp',
		author: 'niraj',
		datePublished: '2025-09-08',
		dateModified: '2026-08-09',
		keywords: [
			'design system business case',
			'design system cost',
			'component library vs design system',
			'design system ROI',
			'when to build a design system',
		],
		category: 'insights',
		readingTime: 13,
		keyTakeaways: [
			"A design system is infrastructure, not decoration. It is why the twentieth screen costs a third of what the fifth one did.",
			"On a small project, building one from scratch is a net cost. Adopt and theme an existing library instead - that is the correct permanent answer, not a stopgap.",
			"Accessibility is the strongest argument. Requirements apply per component, so one fixed dropdown fixes sixty pages, and fourteen bespoke ones mean fourteen separate fixes.",
			"The expensive part of a component is not how it looks. It is focus management, keyboard behaviour and states - which is exactly what mature libraries already contain.",
			"They fail through lack of ownership. Budget roughly a day a month for maintenance or use a library somebody else maintains.",
		],
		faqs: [
			{
				q: "What is a design system?",
				a: "A shared set of reusable interface components plus the rules for using them: tokens for colour and spacing, components with all their states, patterns for recurring problems, and documentation. Critically, one implementation shared by design and code.",
			},
			{
				q: "Is a design system worth the cost?",
				a: "On an application above roughly 25 screens, yes - screen build time typically drops 40-60% and changes become one edit rather than a hunt. Below fifteen screens, adopt an existing library instead.",
			},
			{
				q: "Should we build a design system or use a component library?",
				a: "Most businesses should build on unstyled accessible primitives: you get complete visual control and inherit focus management, keyboard navigation and accessibility semantics. Building entirely from scratch is justified only by an unusual interface or several products to unify.",
			},
			{
				q: "How much does a design system cost?",
				a: "$3,000 to $8,000 for a small site, $12,000 to $30,000 for an application of 25-60 screens, and $25,000 to $70,000 for a larger platform. Payback typically arrives around screen 20 to 25.",
			},
			{
				q: "Why do design systems fail?",
				a: "No owner after the project ends, too rigid to accommodate legitimate new cases so people bypass it, design and code drifting apart, or no documentation so developers build duplicates rather than search.",
			},
		],
	},
	'testing-software-before-launch': {
		title: "Testing Software Before Launch",
		pageTitle: "Testing Software Before Launch: What to Check",
		description:
			"What automated testing covers, what your acceptance testing must catch, and the checks that are skipped and cause the first week problems.",
		ogImage: '/posts/testing-software-before-launch.webp',
		author: 'niraj',
		datePublished: '2025-09-18',
		dateModified: '2026-08-09',
		keywords: [
			'user acceptance testing guide',
			'software testing before launch',
			'UAT checklist',
			'automated testing cost',
			'how to test a web application',
		],
		category: 'guides',
		readingTime: 13,
		keyTakeaways: [
			"Automated tests protect you from your own future changes. Manual testing protects you from having built the wrong thing. Neither substitutes for the other.",
			"Ask for end-to-end tests on your three or four critical journeys plus unit tests where calculations matter. Do not ask for 100% coverage - it is expensive and does not correlate with quality.",
			"Test complete journeys rather than clicking every button. Problems live between screens, and the unhappy paths are where most real defects are.",
			"Data migration deserves its own testing: run it twice on a full copy, count records in and out, and check the awkward records deliberately.",
			"A defect found while a developer writes the feature costs minutes. Found by a customer after launch it costs a support conversation, an emergency fix and some trust.",
		],
		faqs: [
			{
				q: "What is user acceptance testing?",
				a: "The stage where you and your colleagues test the software as real users before it goes live - following complete journeys on real devices with realistic data, rather than reviewing whether each feature exists.",
			},
			{
				q: "How much does automated testing add to a project?",
				a: "Around 8-12% for end-to-end tests on critical journeys, and 15-20% for solid coverage of business logic. Comprehensive coverage at 30-40% is rarely proportionate outside regulated work.",
			},
			{
				q: "What should I test before launching a website?",
				a: "Complete user journeys on real devices, unhappy paths like declined payments and expired sessions, emails and PDFs that leave the system, performance with realistic data volume, keyboard-only navigation, and a backup restore.",
			},
			{
				q: "How do I report a bug so it gets fixed?",
				a: "Four things: what you did step by step, what you expected, what happened, and where - browser, device, account and roughly when. Add a screenshot. That takes ninety seconds and replaces a conversation with a fix.",
			},
			{
				q: "What is the difference between a defect and a change request?",
				a: "A defect is the software not doing what was agreed, and the supplier fixes it. A change is it doing what was agreed but you having changed your mind, which has a cost. Your contract's acceptance clause should define the line.",
			},
		],
	},
	'adding-ai-features-to-your-product': {
		title: "Adding AI Features to Your Product",
		pageTitle: "Adding AI Features: What Is Actually Worth Building",
		description:
			"How to pick features people use, what they cost to run, the failure modes that create liability, and when to buy rather than build.",
		ogImage: '/posts/adding-ai-features-to-your-product.webp',
		author: 'niraj',
		datePublished: '2025-09-29',
		dateModified: '2026-08-09',
		keywords: [
			'adding AI to your product',
			'AI feature development cost',
			'should we add AI chatbot',
			'AI product strategy business',
			'LLM feature implementation',
		],
		category: 'buying-guide',
		readingTime: 13,
		keyTakeaways: [
			"Start from where users spend time, not from what the technology can do. Features built from competitor pressure have no way of being judged successful.",
			"Running cost scales with usage, unlike ordinary features. Work out cost per interaction times realistic volume before building, not after the first invoice.",
			"Confident wrong answers are the defining risk. Ground output in your data with citations, narrow the scope, and keep a human between output and consequential action.",
			"Narrow features with obvious scope get used. Open text boxes invite questions your product cannot answer and disappoint on most of them.",
			"Before launch, answer in writing: what is the worst thing this can output and what happens then? If it involves money, health, safety or legal rights, it needs a human in the loop.",
		],
		faqs: [
			{
				q: "Should my product have AI features?",
				a: "Only if there is a specific task users currently spend time on that this removes or shortens. Competitor pressure is not a reason, and features built from it are built with no way to tell whether they worked.",
			},
			{
				q: "How much does it cost to add AI features?",
				a: "Summarisation or drafting is $8,000 to $25,000 to build. Classification and extraction is $12,000 to $35,000. Search over your own content is $25,000 to $80,000. Running costs run from $100 to several thousand a month depending on volume.",
			},
			{
				q: "What are the risks of adding AI to a product?",
				a: "Confidently wrong output, running costs that outpace value, customer data leaving your systems without a privacy review, latency that makes the feature unusable, and no way to tell whether quality has degraded.",
			},
			{
				q: "Do we need to train our own model?",
				a: "Almost certainly not. General models supplied with your data at the point of use handle the overwhelming majority of business tasks at a fraction of the cost. If someone proposes training, ask what specifically fails without it.",
			},
			{
				q: "Which AI features actually get used?",
				a: "The unglamorous ones - drafting, summarising, classification and extraction, where output is a draft a person edits. Conversational assistants are the most requested and the hardest to make reliably useful.",
			},
		],
	},
	'api-integration-for-businesses': {
		title: 'What API Integration Actually Involves',
		pageTitle: 'API Integration: What It Involves and Costs',
		description:
			'Why integration estimates vary by 10x, the four patterns you might be buying, and the questions that halve the uncertainty before you sign.',
		ogImage: '/posts/api-integration-for-businesses.webp',
		author: 'niraj',
		datePublished: '2025-10-08',
		dateModified: '2026-08-09',
		keywords: [
			'API integration cost',
			'what is API integration',
			'system integration business',
			'webhook vs API sync',
			'integrating CRM with website',
		],
		category: 'guides',
		readingTime: 14,
		keyTakeaways: [
			'Almost every integration is one of four patterns - scheduled pull, webhook push, one-way sync or two-way sync - and knowing which you are buying tells you most of what you need about cost and risk.',
			'Two-way sync is a different category of problem, not an incremental step. Deciding what happens when both systems edit the same record is a business rule you have to make, not a technical detail.',
			'The largest driver of cost is the quality of the API on the other side, which is entirely outside your control. Ask whether a sandbox exists before accepting any estimate.',
			'Budget 10-20% of the build cost annually for maintenance. APIs change versions, deprecate authentication and add required fields whether or not you planned for it.',
			'Middleware is right for anything you would be willing to do by hand if it broke. Direct integration is right for anything you would not.',
		],
		faqs: [
			{
				q: "How much does API integration cost?",
				a: "Payment or email integrations usually run $2,000 to $9,000. A one-way CRM integration is $4,000 to $12,000, two-way is $15,000 to $45,000, and a legacy system with no documentation can exceed $60,000.",
			},
			{
				q: "Why do integration quotes vary so much?",
				a: "Because the requirement is usually four separate flows described as one, and because the target system's API quality - documentation, sandbox, rate limits, error messages - varies enormously and determines most of the effort.",
			},
			{
				q: "What is the difference between a webhook and an API call?",
				a: "With an API call your system asks the other system for data. With a webhook the other system tells yours the moment something happens. Webhooks are faster and require you to handle duplicate delivery and downtime.",
			},
			{
				q: "Should we use Zapier or build a custom integration?",
				a: "Use a platform like Zapier for low-volume, non-critical flows and for prototyping. Build directly when the logic is specific to your business, the volume is high, or the flow is something you could not tolerate failing silently.",
			},
			{
				q: "What is idempotency and why does it matter?",
				a: "It means an operation is safe to run twice. Webhooks get delivered more than once more often than people expect, so any action triggered by an incoming message must not charge, email or duplicate twice.",
			},
		],
	},
	'data-privacy-for-web-applications': {
		title: 'Data Privacy for Web Applications',
		pageTitle: 'Data Privacy for Web Apps: What to Build In',
		description:
			'What the main regimes actually require of your codebase, which parts are engineering rather than paperwork, and why retrofitting costs 3-4x.',
		ogImage: '/posts/data-privacy-for-web-applications.webp',
		author: 'niraj',
		datePublished: '2025-10-21',
		dateModified: '2026-08-09',
		keywords: [
			'data privacy web application',
			'GDPR compliance software',
			'privacy by design engineering',
			'data subject access request',
			'personal data in logs',
		],
		category: 'guides',
		readingTime: 13,
		keyTakeaways: [
			'Five obligations reach your codebase in almost every regime: know what you hold, collect only what you need, have a reason to hold it, be able to return and delete it, and know when it has been breached.',
			'The hardest engineering problem in privacy is that personal data leaks sideways into logs, error reports, analytics and backups - places nobody inventories until something goes wrong.',
			'Build the deletion pipeline and the data export during the project. Retrofitted, both cost three to four times as much because you are changing decisions other things now depend on.',
			'Applicability depends on where your users are, not where your servers are. A small B2B product with three German customers is inside the GDPR; size is not the trigger.',
			'The highest-risk item on most projects is a third-party script added without engineering review. It runs with full page access and is invisible in your codebase.',
		],
		faqs: [
			{
				q: "Does GDPR apply to my small business?",
				a: "If you offer goods or services to people in the EU, generally yes. Applicability is not determined by company size. Some obligations scale with size and volume, but whether the regulation applies to you does not.",
			},
			{
				q: "What does a data subject access request require?",
				a: "Assembling everything you hold about one person, usually within a month. If that means ad-hoc queries across six systems it will take days each time. Building a single export function during the project avoids a permanent cost.",
			},
			{
				q: "Can I delete data from backups?",
				a: "Usually not surgically. The defensible position is a documented retention window after which backups expire, plus a rule that anything restored is reprocessed against your deletion log.",
			},
			{
				q: "How much does privacy compliance cost to build in?",
				a: "Roughly $9,000 to $27,000 across data mapping, consent, deletion, export tooling, log scrubbing and access control during a build. Retrofitting the same work typically costs three to four times as much.",
			},
			{
				q: "Do cookie banners make us compliant?",
				a: "Only if they actually work. A banner that loads analytics and marketing scripts before anyone clicks, or makes rejecting harder than accepting, does not meet the standard consent is held to.",
			},
		],
	},
	'single-page-app-vs-server-rendered': {
		title: 'Single-Page App vs Server-Rendered',
		pageTitle: 'SPA vs Server-Rendered: How to Decide',
		description:
			'What each approach costs your visitors, why the binary is outdated, and the five questions that settle it for your project.',
		ogImage: '/posts/single-page-app-vs-server-rendered.webp',
		author: 'niraj',
		datePublished: '2025-10-30',
		dateModified: '2026-08-09',
		keywords: [
			'SPA vs server side rendering',
			'single page application pros cons',
			'server rendering vs client rendering',
			'SPA SEO problems',
			'should I build a single page app',
		],
		category: 'comparisons',
		readingTime: 13,
		keyTakeaways: [
			'Server rendering is faster to first content and slower between pages; a single-page app is the reverse. Server rendering spends your server time, an SPA spends your visitor device time - and you do not control their device.',
			'The binary is outdated. Modern frameworks render the first page on the server and behave like an app afterwards, and deciding rendering per route rather than per project is what a good team does.',
			'SPAs can be indexed, but rendering is a second pass, other crawlers are far less capable, and a JavaScript error produces a blank page rather than degraded content.',
			'Anything you want found by search, shared on social, or read on a poor connection should arrive as HTML. Anything behind a login can be built however suits the team.',
			'When an SPA underperforms, the fix is usually moving the highest-value routes to server rendering rather than a rewrite - and images and third-party scripts often cost more than the rendering strategy.',
		],
		faqs: [
			{
				q: "What is the difference between an SPA and a server-rendered site?",
				a: "A server-rendered site sends finished HTML for each page. A single-page app sends a mostly empty page plus JavaScript, which builds the page in the browser and then swaps content without full reloads.",
			},
			{
				q: "Are single-page apps bad for SEO?",
				a: "Not automatically. Google executes JavaScript and indexes client-rendered content, but rendering happens on a delayed second pass, other crawlers handle it poorly, and any script error results in no content at all.",
			},
			{
				q: "Should my marketing site be a single-page app?",
				a: "Almost never. A marketing site's job is the first visit by a stranger, often on a mid-range phone, and that is precisely where client rendering performs worst.",
			},
			{
				q: "Can I fix a slow SPA without rebuilding it?",
				a: "Usually yes. Move the highest-value public routes to server rendering or static generation one at a time, split the JavaScript bundle so pages only load what they use, and stop shipping code for routes that no longer need it.",
			},
			{
				q: "What is hydration?",
				a: "The step where JavaScript attaches to server-rendered HTML so the page becomes interactive. The gap between the page appearing and responding is why a site can look loaded but ignore clicks for a moment.",
			},
		],
	},
	'how-much-does-a-saas-platform-cost': {
		title: 'How Much Does a SaaS Platform Cost to Build',
		pageTitle: 'How Much Does a SaaS Platform Cost to Build?',
		description:
			'Real ranges by product shape, the floor every multi-tenant product pays before its first feature, and the running costs people forget.',
		ogImage: '/posts/how-much-does-a-saas-platform-cost.webp',
		author: 'niraj',
		datePublished: '2025-11-11',
		dateModified: '2026-08-09',
		keywords: [
			'SaaS development cost',
			'cost to build a SaaS platform',
			'SaaS MVP cost',
			'multi tenant application cost',
			'SaaS platform budget',
		],
		category: 'buying-guide',
		readingTime: 13,
		keyTakeaways: [
			'A standard B2B SaaS product runs $90,000 to $220,000 to build. The spread within that range is almost entirely scope discipline rather than anything technical.',
			'Every multi-tenant product pays a floor of roughly $55,000 to $130,000 for accounts, tenancy, permissions, billing, admin tooling, notifications and onboarding before a single distinctive feature.',
			'Build cost is half to two thirds of two-year spend. Hosting, third-party services, maintenance at 15-20% annually and continued development are not optional lines.',
			'Distinct user types drive cost more than feature count. A product with buyers, sellers and administrators is close to three products sharing a database.',
			'Multi-tenancy and permissions look like features and behave like architecture. Design both in from the start even if the first release needs only one of each.',
		],
		faqs: [
			{
				q: "How much does it cost to build a SaaS platform?",
				a: "A single-purpose tool is $40,000 to $90,000. Standard B2B SaaS is $90,000 to $220,000. A multi-tenant platform with roles and integrations is $180,000 to $450,000, and a marketplace or regulated platform goes higher.",
			},
			{
				q: "How long does it take to build a SaaS product?",
				a: "Three to five months for a focused single-purpose tool, five to nine months for standard B2B SaaS, and eight to fourteen months for a multi-tenant platform with integrations and multiple user types.",
			},
			{
				q: "What are the ongoing costs of running a SaaS platform?",
				a: "Early stage, roughly $500 to $2,700 a month for infrastructure and services, plus maintenance at 15-20% of build cost annually, plus continued development, which is the line most budgets omit.",
			},
			{
				q: "How can I reduce SaaS development costs honestly?",
				a: "Cut user types before features, buy authentication and billing rather than building them, sequence rather than descope, and skip reporting in version one. Skipping tests and deployment automation lowers the invoice and raises the two-year cost.",
			},
			{
				q: "Should I build in-house or use an agency?",
				a: "An agency wins on time to start, since hiring a team of four takes three to six months before anyone writes code. In-house wins by year three, when continuity and product knowledge compound.",
			},
		],
	},
	'choosing-a-database': {
		title: 'Choosing a Database for Your Application',
		pageTitle: 'Choosing a Database: A Guide for Decision Makers',
		description:
			'Why PostgreSQL is the right default, when each alternative earns its place, and why most scaling problems are missing indexes.',
		ogImage: '/posts/choosing-a-database.webp',
		author: 'niraj',
		datePublished: '2025-11-20',
		dateModified: '2026-08-09',
		keywords: [
			'choosing a database',
			'PostgreSQL vs MongoDB',
			'which database for web app',
			'SQL vs NoSQL business',
			'database scaling problems',
		],
		category: 'guides',
		readingTime: 14,
		keyTakeaways: [
			'Start with PostgreSQL unless you have a concrete reason not to. It enforces structure, handles transactions properly, answers questions you have not thought of yet, and has the largest hiring pool.',
			'Choosing a document store to avoid designing a schema is the most expensive database mistake we see. The schema does not disappear, it moves into application code where nothing enforces it.',
			'The most common cause of a slow application is missing indexes, not the choice of database. A query that scans a whole table is fine at a thousand rows and catastrophic at ten million.',
			'Use managed hosting. Self-hosting saves about 40% of the bill and costs more than that in engineer time the first time something goes wrong at 2am.',
			'Before funding a migration, fund a week of measurement. Most claims of having outgrown a database turn out to be query problems that resolve in days.',
		],
		faqs: [
			{
				q: "Which database should I use for my web application?",
				a: "PostgreSQL, unless you have a specific reason otherwise. It handles relational data, JSON documents, full-text search and vector similarity, has no licensing cost, and is available managed from every cloud provider.",
			},
			{
				q: "SQL or NoSQL - which is better for a business application?",
				a: "Relational, for almost all transactional business data. Orders, customers, bookings and invoices have relationships that a relational database enforces and a document store leaves to your application code.",
			},
			{
				q: "Why is my application slow if the database is fine?",
				a: "Usually missing indexes or a query pattern that issues one lookup per displayed row. Both are days of work to fix, and both are commonly misdiagnosed as needing a different database.",
			},
			{
				q: "How much does a managed database cost?",
				a: "$25 to $150 a month for a development or early-stage instance, $300 to $1,200 for production with a replica, and $2,000 upward at scale. Self-hosting saves 40-60% and costs meaningful engineer time.",
			},
			{
				q: "When should I add a second database?",
				a: "When the first one is demonstrably failing at a specific job - text search as a core feature, high-volume event data, or caching. Adding one in anticipation creates a permanent synchronisation problem for no benefit.",
			},
		],
	},
	'web-application-security-checklist': {
		title: 'Web Application Security Checklist',
		pageTitle: 'Web Application Security: A Practical Checklist',
		description:
			'The controls that block the attacks that actually happen, what each costs, and the questions to ask your team this week.',
		ogImage: '/posts/web-application-security-checklist.webp',
		author: 'niraj',
		datePublished: '2025-12-02',
		dateModified: '2026-08-09',
		keywords: [
			'web application security checklist',
			'application security basics',
			'OWASP top ten business',
			'penetration test cost',
			'securing a web app',
		],
		category: 'guides',
		readingTime: 13,
		keyTakeaways: [
			'The breaches that hit businesses your size are not sophisticated. They are an unpatched dependency, a key left in a repository, an unprotected admin page and an untested backup.',
			'The most common serious finding is an endpoint that returns data without checking who is asking. Test it yourself with two accounts and an identifier from the URL.',
			'Dependency scanning is nearly free and blocks the most common route in. Do it before paying for a penetration test that will otherwise just list the basics.',
			'Modern password guidance favours length over complexity and no forced rotation. Mandatory quarterly changes make security worse because people iterate them by one digit.',
			'A meaningful share of incidents are not technical: offboarding that leaves access open, domain control held by one person, and third-party scripts added without review.',
		],
		faqs: [
			{
				q: "What are the most important web application security measures?",
				a: "Automated dependency scanning and patching, server-side authorisation checks on every request, hashed passwords with login rate limiting, HTTPS with security headers, secrets outside the repository, and tested backups.",
			},
			{
				q: "How much does a penetration test cost?",
				a: "$6,000 to $25,000 for a web application of moderate size. Insist on authenticated testing with at least two accounts, a stated proportion of manual work, and a retest after you fix the findings.",
			},
			{
				q: "How often should we update dependencies?",
				a: "On a monthly schedule, with automated scanning raising anything critical immediately. A monthly window is cheap; an emergency upgrade across four major versions during a live exploit is not.",
			},
			{
				q: "What is the most common vulnerability in business applications?",
				a: "Broken access control - an API endpoint that returns a record to anyone who requests it by identifier. In a multi-tenant product this lets any customer read another customer's data.",
			},
			{
				q: "Do we need two-factor authentication?",
				a: "Offer it to users and require it for every administrative account, including hosting, domain registrar and payment providers. A compromised admin account makes every other control irrelevant.",
			},
		],
	},
	'seo-for-web-applications': {
		title: 'SEO for Web Applications',
		pageTitle: 'SEO for Web Applications: What Actually Works',
		description:
			'Most SEO advice assumes a content site. Here is what matters when your product is an application and most of it sits behind a login.',
		ogImage: '/posts/seo-for-web-applications.webp',
		author: 'niraj',
		datePublished: '2025-12-11',
		dateModified: '2026-08-09',
		keywords: [
			'SEO for web applications',
			'SaaS SEO strategy',
			'technical SEO checklist app',
			'comparison pages SEO',
			'indexing a web app',
		],
		category: 'guides',
		readingTime: 14,
		keyTakeaways: [
			'Decide what should be indexed before optimising anything. Crawl budget spent on 40,000 filter combinations is attention your real pages do not get.',
			'The technical floor is short: HTML rendering, one h1, unique titles, self-referencing canonicals, a generated sitemap, structured data and working internal links. A day to audit, hours to fix.',
			'For software products, comparison pages and integration pages convert far better than blog posts, because the reader is deciding rather than reading.',
			'Public documentation is frequently the largest untapped source of qualified traffic. Keeping it behind a login costs you all of it.',
			'Audit before publishing. A site where every page canonicalises to the homepage cannot benefit from content, and that pattern is common on application marketing sites.',
		],
		faqs: [
			{
				q: "Why does my SaaS site get no organic traffic?",
				a: "Usually a structural defect rather than a content shortage - a stray noindex, canonicals pointing every page at the homepage, or client-rendered marketing pages that are indexed late or not at all. Audit before publishing anything.",
			},
			{
				q: "What content works best for software products?",
				a: "Comparison pages against named competitors, one page per integration, problem-led articles using the language customers use in sales calls, and public documentation. All four reach people closer to a decision than general blog content.",
			},
			{
				q: "Should our documentation be public?",
				a: "Yes, in almost all cases. People search for how to do a thing, find your docs, and discover the product. It is often the highest-volume source of qualified organic entries a software product has.",
			},
			{
				q: "Does AI search make SEO irrelevant for software products?",
				a: "No, but it shifts the value. Generic explainers lose traffic to generated answers. Pages describing your specific product, integrations, pricing and comparisons are not substitutable and still need to be found.",
			},
			{
				q: "How do I know if my pages are indexed?",
				a: "Compare the number of pages you want indexed against the number Search Console reports. That single gap is the most diagnostic SEO metric for an application site and almost nobody tracks it.",
			},
		],
	},
	'core-web-vitals-for-business-owners': {
		title: 'Core Web Vitals for Business Owners',
		pageTitle: 'Core Web Vitals: What They Mean for Your Business',
		description:
			'What the three metrics actually measure, whether your red report is a real problem, and which fixes are cheap. Written for the person signing.',
		ogImage: '/posts/core-web-vitals-for-business-owners.webp',
		author: 'niraj',
		datePublished: '2025-12-23',
		dateModified: '2026-08-09',
		keywords: [
			'core web vitals explained',
			'core web vitals for business',
			'LCP INP CLS explained',
			'website speed business impact',
			'page experience Google',
		],
		category: 'guides',
		readingTime: 14,
		keyTakeaways: [
			'The three metrics measure how a page feels: when it appeared (LCP, target 2.5s), whether it responds (INP, target 200ms), and whether it moved while you read (CLS, target 0.1).',
			'Ask whether you are failing in the field or only in the lab. Lab data is a simulation; field data is your real users, and it is the one that matters.',
			'CLS is almost always the cheapest fix and the most visible improvement. Adding width and height to images can resolve hundreds of failures in half a day.',
			'On most business sites the largest single cost is third-party scripts nobody reviews - tag managers, chat widgets and pixels added over three years.',
			'Passing removes a disadvantage rather than creating an edge. Content relevance still dominates ranking, so treat performance as a floor, not a strategy.',
		],
		faqs: [
			{
				q: "What are Core Web Vitals?",
				a: "Three measurements of how a page feels to a real user: Largest Contentful Paint (when the main content appears), Interaction to Next Paint (how fast it responds to a tap), and Cumulative Layout Shift (how much content moves while loading).",
			},
			{
				q: "What are good Core Web Vitals scores?",
				a: "LCP of 2.5 seconds or less, INP of 200 milliseconds or less, and CLS of 0.1 or less. Above 4 seconds, 500 milliseconds and 0.25 respectively is considered poor.",
			},
			{
				q: "Do Core Web Vitals affect Google rankings?",
				a: "Yes, as one signal among many. It will not lift a page above a more relevant result. The stronger reason to fix them is that slow, jumpy pages lose visitors regardless of ranking.",
			},
			{
				q: "How much does it cost to fix Core Web Vitals?",
				a: "Quick wins - images, layout dimensions, lazy loading - typically $1,500 to $4,000 and move most sites out of the poor band. Reducing JavaScript for INP is the expensive part at $6,000 to $20,000.",
			},
			{
				q: "Why does my site pass in one tool and fail in another?",
				a: "Because one is reporting lab data from a simulated device and the other is reporting field data from real visits. When they disagree, the field data is what counts.",
			},
		],
	},
	'web-accessibility-legal-requirements': {
		title: 'Web Accessibility: What Is Actually Required',
		pageTitle: 'Web Accessibility: What Is Actually Required',
		description:
			'What the law asks for, what WCAG AA means in practice, the five fixes worth doing first, and why overlay widgets do not work.',
		ogImage: '/posts/web-accessibility-legal-requirements.webp',
		author: 'niraj',
		datePublished: '2026-01-02',
		dateModified: '2026-08-09',
		keywords: [
			'web accessibility legal requirements',
			'WCAG compliance website',
			'ADA website compliance',
			'accessibility audit cost',
			'is my website accessible',
		],
		category: 'guides',
		readingTime: 14,
		keyTakeaways: [
			'Almost every regime points at the same practical standard: WCAG level AA. The US Department of Justice has published guidance stating the ADA applies to the web.',
			'Accessibility overlay widgets do not make a site compliant, are criticised by disability advocacy groups, and have featured in litigation against the sites that installed them.',
			'Automated testing catches perhaps a third of real issues. It finds missing alt text and contrast failures; it cannot tell whether the alt text is useful or the tab order sensible.',
			'Five fixes - contrast, alt text, keyboard path, form labels, heading structure - resolve most of what automated tools detect and most of what a procurement questionnaire asks about.',
			'Built into a component library during a build it costs 5-10% of the project. Retrofitted across an existing site it costs many times that, because you fix pages rather than components.',
		],
		faqs: [
			{
				q: "Is web accessibility a legal requirement?",
				a: "It depends on jurisdiction and sector, and this is not legal advice. In the US the ADA has been applied to websites through litigation and the DOJ has published guidance saying so. The EU and UK have their own regimes. All point at WCAG as the practical standard.",
			},
			{
				q: "What is WCAG level AA?",
				a: "The commonly required conformance level. In practice it means text alternatives for images, sufficient colour contrast, full keyboard operability, labelled form fields, meaningful heading structure, clear error messages, and no information conveyed by colour alone.",
			},
			{
				q: "Do accessibility overlay widgets work?",
				a: "No. They are widely criticised by disability advocacy groups, frequently interfere with assistive technology users have already configured, and have not prevented litigation against sites using them.",
			},
			{
				q: "How much does an accessibility audit cost?",
				a: "An automated scan and triage is typically $500 to $1,500. A manual audit against WCAG AA, including keyboard and screen reader testing, is $4,000 to $12,000 depending on site size.",
			},
			{
				q: "How can I test my own site for accessibility?",
				a: "Unplug your mouse and complete your main flow with the keyboard, set browser zoom to 200%, view the page in greyscale to check for colour-only meaning, and try your homepage with the screen reader built into your operating system.",
			},
		],
	},
	'headless-cms-explained': {
		title: 'Headless CMS Explained',
		pageTitle: 'Headless CMS Explained, for People Who Sign Things',
		description:
			'What changes, what it costs, when it is genuinely right, and the editor-experience mistake that causes most headless regret.',
		ogImage: '/posts/headless-cms-explained.webp',
		author: 'niraj',
		datePublished: '2026-01-13',
		dateModified: '2026-08-09',
		keywords: [
			'headless CMS explained',
			'what is a headless CMS',
			'headless vs traditional CMS',
			'headless CMS cost',
			'should I use a headless CMS',
		],
		category: 'guides',
		readingTime: 14,
		keyTakeaways: [
			'A headless CMS manages content only and hands it out through an API. Something else renders the site. The word means it has no front end of its own.',
			'The strongest reason to adopt it is that the same content must reach more than one destination - a website and an app, several regional sites, a partner feed.',
			'The most common regret is budgeting for the API and the front end but not for the editor experience. Preview and a block system are not optional extras.',
			'Modelling content properly - concepts rather than pages, explicit relationships, structured fields rather than one rich-text blob - is the real work and it takes longer than the setup.',
			'For a conventional marketing site with a small team, headless is solving a problem you do not have. A well-built traditional CMS is cheaper and easier to staff.',
		],
		faqs: [
			{
				q: "What is a headless CMS?",
				a: "A content management system that stores and structures your content but does not render your website. It exposes content through an API, and a separate front-end application decides how it looks.",
			},
			{
				q: "When should I use a headless CMS?",
				a: "When the same content needs to reach more than one destination, when your front end is already an application with logins and complex interaction, or when your content is genuinely structured rather than page-shaped.",
			},
			{
				q: "Is a headless CMS more expensive?",
				a: "Upfront, yes - typically two to three times a traditional build for an equivalent content site. It pays back when a second channel appears, because the content is already in a form another destination can consume.",
			},
			{
				q: "What is the downside of headless?",
				a: "Two systems to maintain instead of one, developers required for changes a marketing team could previously make, and no preview or visual page building unless someone deliberately builds them.",
			},
			{
				q: "What is decoupled or hybrid CMS?",
				a: "Using a traditional CMS such as WordPress purely as a content store, serving a separate front end over its API. Your editors keep the interface they know while the front end gains freedom - often the pragmatic middle path.",
			},
		],
	},
	'signs-you-have-outgrown-your-current-system': {
		title: 'Signs You Have Outgrown Your Current System',
		pageTitle: '8 Signs You Have Outgrown Your Current System',
		description:
			'Eight signals that your software is now costing more than it saves, how to put a number on it, and what to do in the next thirty days.',
		ogImage: '/posts/signs-you-have-outgrown-your-current-system.webp',
		author: 'niraj',
		datePublished: '2026-01-23',
		dateModified: '2026-08-09',
		keywords: [
			'signs you need new software',
			'outgrown current system',
			'replace business software',
			'when to replace software',
			'software no longer fits',
		],
		category: 'buying-guide',
		readingTime: 14,
		keyTakeaways: [
			'The clearest signal is someone whose job is partly moving data between systems - an hour a day is roughly $7,000 a year, forever.',
			'Any two signals together is worth a proper evaluation. Five or more means you are already paying for a replacement, just not on an invoice.',
			'Put four numbers on one page: time cost, error cost, licence cost, opportunity cost. Under $10,000 a year, live with it. Over $40,000, you have a case.',
			'The cost concentrates in one workflow far more often than across the whole system, so the right project is usually a replacement of the part rather than the whole.',
			'Deferring does not avoid the cost. It means migrating later under a deadline set by someone else, with three more years of data to move.',
		],
		faqs: [
			{
				q: "What are the signs you have outgrown your software?",
				a: "Someone moving data between systems manually, a load-bearing spreadsheet beside the tool, routine reporting done by hand, being two versions behind, week-long onboarding, and declining work the system cannot handle.",
			},
			{
				q: "How do I know if it is worth replacing?",
				a: "Quantify four things: manual time, error cost, licence spend and revenue you have declined. Under $10,000 a year the honest answer is usually to wait. Over $40,000 you have a business case.",
			},
			{
				q: "Should we replace the whole system or part of it?",
				a: "Usually part. The cost almost always concentrates in one workflow, and replacing that while keeping the rest is cheaper, faster and far easier to get approved.",
			},
			{
				q: "What happens if we do nothing?",
				a: "The workarounds compound and the tribal knowledge leaves with staff. Most organisations eventually migrate anyway, but under a deadline forced by a compliance requirement or a broken integration.",
			},
			{
				q: "Is it the tool or how we implemented it?",
				a: "Worth separating honestly. Failed rollouts are often about training, migration and change management. If the tool was never configured properly, replacing it reproduces the outcome with a different logo.",
			},
		],
	},
	'red-flags-in-a-software-quote': {
		title: 'Red Flags in a Software Quote',
		pageTitle: '10 Red Flags in a Software Quote',
		description:
			'The warning signs are structural, not about the price. Ten things to check in twenty minutes, and what a good quote actually looks like.',
		ogImage: '/posts/red-flags-in-a-software-quote.webp',
		author: 'niraj',
		datePublished: '2026-02-04',
		dateModified: '2026-08-09',
		keywords: [
			'red flags software quote',
			'how to review a software proposal',
			'software development quote comparison',
			'evaluating development proposals',
			'software quote checklist',
		],
		category: 'buying-guide',
		readingTime: 14,
		keyTakeaways: [
			'The strongest signal is a quote that does not name who will do the work, and it is also the easiest one to check.',
			'A proposal that lists its exclusions is more trustworthy than one that appears to include everything, because exclusions mean someone drew a boundary.',
			'If a quote is 90% development with nothing for architecture, testing or infrastructure, that work was removed from the quote rather than from the project.',
			'Compare written scopes line by line before you compare totals. The gap between two quotes is usually four line items one of them never mentions.',
			'A low quote is weak evidence on its own. The question that resolves it is whether the supplier can tell you specifically why they are cheaper.',
		],
		faqs: [
			{
				q: "How do I evaluate a software development quote?",
				a: "Check ten structural things: named people, explicit exclusions, phased effort, testing as a line item, deployment included, stated assumptions, milestones with your dependencies, a change process, milestone payments, and a defined support window.",
			},
			{
				q: "Why are two quotes for the same project so different?",
				a: "Almost always because the scopes differ, not the rates. Typical gaps are user-role count, admin tooling, data migration, testing and deployment. Normalise the deliverable lists before comparing prices.",
			},
			{
				q: "Is a much cheaper quote a red flag?",
				a: "Not on its own. It can mean a smaller scope, a specialist who has built this before, or a genuinely lower cost base. Ask them to explain why they are cheaper - a real reason comes back immediately and specifically.",
			},
			{
				q: "What should a good software quote include?",
				a: "A restatement of your problem, listed assumptions, listed exclusions, phases with effort, a timeline marking your dependencies, the change process, named people, and what happens at handover.",
			},
			{
				q: "What contract red flags should I watch for?",
				a: "No copyright assignment clause, a licence instead of ownership, a revocable licence to the supplier's own components, auto-renewal with a long notice period, and liability capped for them but not for you.",
			},
		],
	},
	'questions-to-ask-in-a-software-demo': {
		title: 'Questions to Ask in a Software Demo',
		pageTitle: 'The Questions to Ask in a Software Demo',
		description:
			'A demo is a rehearsed performance. The questions that break the script, what the answers mean, and the two requests to send in advance.',
		ogImage: '/posts/questions-to-ask-in-a-software-demo.webp',
		author: 'niraj',
		datePublished: '2026-02-16',
		dateModified: '2026-08-09',
		keywords: [
			'questions to ask in a software demo',
			'software demo checklist',
			'how to evaluate software vendors',
			'software vendor evaluation questions',
			'product demo questions',
		],
		category: 'buying-guide',
		readingTime: 14,
		keyTakeaways: [
			'Two requests sent in advance change the demo more than any question: use our data, and walk through our scenario.',
			'The single best question is \'can you show me that going wrong?\' Error handling is where software quality lives and it is never in the rehearsed path.',
			'Ask for a live full data export during the demo. If you cannot leave a product easily, you are not a customer.',
			'Send the vague answers back by email and ask for written responses. Writing forces a precision that a confident verbal answer does not.',
			'The best demo does not correlate with the best product - demo polish measures sales investment, not fit for your workflow.',
		],
		faqs: [
			{
				q: "What should I ask during a software demo?",
				a: "Ask them to use your data and your scenario, to show something going wrong, to show the ugliest screen, what the product cannot do, for a live data export, what shipped recently, and what support looks like on a Friday afternoon.",
			},
			{
				q: "How do I stop a demo being just a sales pitch?",
				a: "Send fifty real records and your actual core scenario in advance and ask them to demo against those. That single request removes most of the rehearsed path.",
			},
			{
				q: "Who should attend a software demo?",
				a: "The person who will use it daily, someone who will have to integrate it, and a natural sceptic. Not the full committee - large groups stop anyone asking follow-up questions.",
			},
			{
				q: "What is a red flag in a software demo?",
				a: "Refusing to use your data, deflecting when asked to show an error state, claiming the product has no limitations, and having no technical person present to answer questions the salesperson cannot.",
			},
			{
				q: "How many products should I demo?",
				a: "Three or four. Past that you are comparing sales polish rather than fit, and the evaluations blur together unless you score each one immediately afterwards.",
			},
		],
	},
	'fixed-price-vs-time-and-materials': {
		title: 'Fixed Price vs Time and Materials',
		pageTitle: 'Fixed Price vs Time and Materials: How to Choose',
		description:
			'Both models work and both fail. Which is right depends on how well-defined the work is, and the hybrid that suits most projects better than either.',
		ogImage: '/posts/fixed-price-vs-time-and-materials.webp',
		author: 'niraj',
		datePublished: '2026-02-25',
		dateModified: '2026-08-09',
		keywords: [
			'fixed price vs time and materials',
			'software development pricing models',
			'fixed price software contract',
			'time and materials contract',
			'how to price a software project',
		],
		category: 'comparisons',
		readingTime: 14,
		keyTakeaways: [
			'The models differ in one respect that determines everything else: under fixed price the supplier carries estimation risk, under time and materials you do.',
			'The 10-25% fixed-price premium is rational rather than a markup. It is the cost of the certainty, and you cannot negotiate it away without removing the certainty.',
			'Fixed price is available only against a scope detailed enough to be fixed. On a vague brief it means a hidden buffer or an expensive change-request relationship.',
			'The arrangement that suits most projects is a hybrid: fixed-price discovery, fixed-price build scoped from what it found, and time and materials ring-fenced for genuinely unknown parts.',
			'A not-to-exceed cap plus weekly burn reporting gives time and materials most of the certainty of fixed price, and it costs the supplier nothing to agree.',
		],
		faqs: [
			{
				q: "Is fixed price or time and materials better for software?",
				a: "Neither in the abstract. Fixed price suits a scope you could write acceptance criteria for today. Time and materials suits work where you expect to learn as you go. Most projects are best served by a hybrid.",
			},
			{
				q: "Why is fixed price more expensive?",
				a: "Because the supplier is carrying the risk of their own estimate being wrong and has to price a buffer for it. That premium is typically 10-25% and it is what you are buying.",
			},
			{
				q: "What is a not-to-exceed cap?",
				a: "A ceiling on a time-and-materials engagement at which work pauses and a conversation happens. It removes the main risk of the model and suppliers rarely object to it.",
			},
			{
				q: "Can I get a fixed price without a detailed scope?",
				a: "You can, and you will either pay for a worst-case buffer or enter an expensive change-request relationship. A fixed-price discovery phase first is the version of this that works.",
			},
			{
				q: "How do I stop a time-and-materials project drifting?",
				a: "A not-to-exceed cap, weekly reporting that includes a re-forecast rather than only hours spent, a deploy every fortnight, and a defined meaning of done for each cycle.",
			},
		],
	},
	'website-redesign-vs-rebuild': {
		title: 'Website Redesign vs Rebuild',
		pageTitle: 'Website Redesign vs Rebuild: Which Do You Need?',
		description:
			'Looking dated and not working properly are different projects with a four-fold cost difference. A two-day audit that tells you which one you need.',
		ogImage: '/posts/website-redesign-vs-rebuild.webp',
		author: 'niraj',
		datePublished: '2026-03-09',
		dateModified: '2026-08-09',
		keywords: [
			'website redesign vs rebuild',
			'should I rebuild my website',
			'website replatform',
			'when to rebuild a website',
			'website redesign cost',
		],
		category: 'comparisons',
		readingTime: 14,
		keyTakeaways: [
			'The resolving question: if you got exactly the design you want applied to the current site, would your problems be gone? If not, design was never the problem.',
			'Whether your team can publish without a developer decides more of these cases than any other single question, and it is a content-model problem rather than a design one.',
			'A two-day audit - crawl, performance check, time a content change, check platform support dates - gives an evidence-based answer instead of an aesthetic one.',
			'Content migration is the most underestimated line. Eleven years of pages in six structures, plus hundreds of redirects, is where re-platform projects overrun.',
			'A redesign cannot make a slow server fast, give your team publishing autonomy, add capability the platform lacks, or fix unclear content.',
		],
		faqs: [
			{
				q: "What is the difference between a website redesign and a rebuild?",
				a: "A redesign changes how the site looks and how content is arranged on the existing platform, typically 3-6 weeks. A rebuild replaces the technical foundation underneath, typically 8-20 weeks.",
			},
			{
				q: "How do I know if I need a rebuild?",
				a: "If your team cannot publish without a developer, the platform is unsupported, the server is slow before anything renders, or you cannot add a capability you need, the problem is architectural rather than visual.",
			},
			{
				q: "How much does a website rebuild cost?",
				a: "A rebuild of the same feature set is typically $20,000-$50,000. Adding new capability moves it to $40,000-$120,000, and a re-platform with full content migration can reach $90,000.",
			},
			{
				q: "Will a redesign improve conversion?",
				a: "Sometimes, but conversion problems are more often content and flow than visual design. A better-looking page with the same unclear proposition usually converts about the same.",
			},
			{
				q: "How do I avoid losing search rankings in a redesign?",
				a: "Crawl the existing site first, preserve URLs or redirect every one of them, keep titles and descriptions unless you have a reason to change them, and carry over structured data.",
			},
		],
	},
	'nextjs-vs-wordpress-for-business-websites': {
		title: 'Next.js vs WordPress for Business Websites',
		pageTitle: 'Next.js vs WordPress for Business Websites',
		description:
			'We build on Next.js and for many business sites WordPress is the right answer. The honest comparison, with three-year costs both ways.',
		ogImage: '/posts/nextjs-vs-wordpress-for-business-websites.webp',
		author: 'niraj',
		datePublished: '2026-03-19',
		dateModified: '2026-08-09',
		keywords: [
			'Next.js vs WordPress',
			'WordPress or custom website',
			'headless WordPress Next.js',
			'best platform for business website',
			'WordPress alternative business site',
		],
		category: 'comparisons',
		readingTime: 14,
		keyTakeaways: [
			'They are not really competitors: WordPress is a product you configure, Next.js is a toolkit you build with. Configuring is faster, building is more capable.',
			'For a content-led marketing site, WordPress is cheaper across a three-year horizon and it is not close.',
			'The crossover comes when users log in and do things. Application behaviour is where WordPress starts fighting you and the cost curves reverse.',
			'Headless WordPress with a Next.js front end keeps the editing experience your team knows and adds the performance and extensibility, at the cost of two systems to maintain.',
			'Most WordPress security incidents come through plugins rather than core. Dependency count is a security decision on either platform.',
		],
		faqs: [
			{
				q: "Is Next.js better than WordPress?",
				a: "Not in general. For content-led marketing sites WordPress is usually the better and cheaper choice. Next.js is better when users log in, when the interface is genuinely custom, or when you need real integrations.",
			},
			{
				q: "When should I choose Next.js over WordPress?",
				a: "When the site is really an application, when performance is commercially material, when you need two-way integration with internal systems, or when a customer portal is on the two-year roadmap.",
			},
			{
				q: "Is WordPress insecure?",
				a: "WordPress core is actively maintained and reasonably solid. The risk concentrates in plugins and in maintenance discipline. An unmaintained site on either platform is a liability.",
			},
			{
				q: "What is headless WordPress?",
				a: "WordPress used only as a content store, with a separate front end - often Next.js - rendering the public site over its API. Your team keeps the familiar editor while the front end gains performance and flexibility.",
			},
			{
				q: "Can I start on WordPress and move to Next.js later?",
				a: "Yes, and it is a reasonable strategy. Keep the content model clean and avoid deep page-builder entanglement. Moving content out is straightforward; unpicking business logic embedded in a builder is not.",
			},
		],
	},
	'how-to-migrate-off-a-legacy-system': {
		title: 'How to Migrate Off a Legacy System',
		pageTitle: 'How to Migrate Off a Legacy System Safely',
		description:
			'An eight-phase sequence for replacing an old system without a bad Monday, including why the data is always worse than anyone believes.',
		ogImage: '/posts/how-to-migrate-off-a-legacy-system.webp',
		author: 'niraj',
		datePublished: '2026-03-30',
		dateModified: '2026-08-09',
		keywords: [
			'legacy system migration',
			'how to migrate off legacy software',
			'data migration plan',
			'system replacement project',
			'legacy modernisation',
		],
		category: 'guides',
		readingTime: 14,
		keyTakeaways: [
			'A migration is a data project with a build attached, not a build project with a data task at the end. Sequencing it the other way is the most common failure.',
			'Profile the data before designing anything. Two days of counting duplicates, nulls and distinct status values will change the project plan while changing it is still cheap.',
			'Deciding what does not migrate is the most valuable meeting in the project and often halves the effort. Archive read-only rather than migrating everything by default.',
			'Rehearse the full migration at least twice, reconciling row counts and financial totals, and time each run so you know how long the real cutover window has to be.',
			'Run both systems in parallel for at least one full business cycle. It is tedious and it is the single thing that most reliably prevents disaster.',
		],
		faqs: [
			{
				q: "How long does a legacy system migration take?",
				a: "For a mid-sized system with several years of data, six to nine months elapsed is realistic. If someone has quoted three, ask which of inventory, data profiling, rehearsal or parallel running they have removed.",
			},
			{
				q: "Why do data migrations go wrong?",
				a: "Because the data is worse than anyone believes and the business rules are undocumented. Eight years of a permissive system produces duplicates, orphans, and status fields used differently by each department.",
			},
			{
				q: "Should we migrate all our historical data?",
				a: "Usually not. A common pattern is migrating two years of live data and keeping the full history in a searchable read-only archive. That decision alone often halves the migration effort.",
			},
			{
				q: "What is parallel running and do we need it?",
				a: "Both systems run and the numbers are compared for at least one full business cycle. It is the most reliable way to surface undocumented rules while the old system is still there to fall back on.",
			},
			{
				q: "Should we improve the process while migrating?",
				a: "Usually not at the same time. Changing the system and the process together means you cannot tell which caused a problem. Migrate as-is, stabilise, then improve.",
			},
		],
	},
	'how-to-scope-an-mvp': {
		title: 'How to Scope an MVP',
		pageTitle: 'How to Scope an MVP That Is Actually Minimum',
		description:
			'An MVP answers a question. Start with the belief you are testing, ship one flow end to end, and cut the eight things that never needed to be there.',
		ogImage: '/posts/how-to-scope-an-mvp.webp',
		author: 'niraj',
		datePublished: '2026-04-09',
		dateModified: '2026-08-09',
		keywords: [
			'how to scope an MVP',
			'minimum viable product scope',
			'MVP feature prioritisation',
			'what to include in an MVP',
			'MVP planning guide',
		],
		category: 'guides',
		readingTime: 14,
		keyTakeaways: [
			'Write the belief first: \'we believe X, and if we are wrong nothing else matters.\' If no outcome would change your mind, you are not building an MVP.',
			'An MVP does one flow end to end, properly. Five flows at 60% produce no evidence, because a user who cannot finish tells you nothing.',
			'Cut roles before features. Shipping for one user type is the single biggest saving available and the one teams resist most.',
			'Never cut authentication, the data model, deployment automation or error monitoring. Together they are about 15% of the build and cutting them is what turns a fast MVP into a rewrite.',
			'Write down the number that means success, and the number that means stop, before you launch. Afterwards everyone rationalises.',
		],
		faqs: [
			{
				q: "What should be included in an MVP?",
				a: "One complete user flow, done properly, including error and empty states. Plus the things that would be embarrassing to omit: working authentication, terms and privacy, and basic monitoring.",
			},
			{
				q: "What should I cut from an MVP?",
				a: "Extra user roles, the admin panel, settings and configuration, secondary integrations, notification preferences, onboarding flows, analytics dashboards and native mobile apps.",
			},
			{
				q: "How much does an MVP cost?",
				a: "Typically $15,000-$45,000 and 6-12 weeks elapsed for a genuinely scoped one. A poorly scoped MVP - a full product with a few features removed - is several times that.",
			},
			{
				q: "How do I know if my MVP scope is wrong?",
				a: "Warning signs: more than one user type doing meaningfully different things, a flow you cannot describe in one paragraph, an estimate over three months, or nobody being able to say what would make you stop.",
			},
			{
				q: "What happens after the MVP?",
				a: "Do not immediately build the cut list. Talk to the users who completed the flow about what they tried to do next. Budget roughly 40-60% of the MVP cost again to reach a maintainable version one.",
			},
		],
	},
	'what-is-technical-debt': {
		title: 'What Is Technical Debt?',
		pageTitle: 'What Is Technical Debt? A Guide for Budget Holders',
		description:
			'Not a request to tidy up. What the metaphor actually means, what it costs you, and which debt is genuinely not worth paying down.',
		ogImage: '/posts/what-is-technical-debt.webp',
		author: 'niraj',
		datePublished: '2026-04-21',
		dateModified: '2026-08-09',
		keywords: [
			'what is technical debt',
			'technical debt explained',
			'technical debt business case',
			'managing technical debt',
			'cost of technical debt',
		],
		category: 'insights',
		readingTime: 14,
		keyTakeaways: [
			'Debt is only expensive where the code changes. The same mess in a module nobody touches costs nothing, and refactoring it is spending money on aesthetics.',
			'The clearest symptom a budget holder can see is estimates becoming unpredictable - small-sounding changes repeatedly turning into a week.',
			'Overlay change frequency against difficulty. The intersection is the entire remediation list, and everything outside it can usually wait indefinitely.',
			'Fund it as a standing 15-20% allocation or as an explicit line in feature estimates. Big-bang refactoring quarters are unshippable and get cut when priorities move.',
			'Rewrites are almost always more expensive than incremental replacement, because they discard years of undocumented fixes and rediscover them in production.',
		],
		faqs: [
			{
				q: "What is technical debt in simple terms?",
				a: "A shortcut taken to ship sooner, which you then pay interest on every time you touch that code. Some of it is sensible leverage and some is ruinous - the difference is the interest rate and what the shortcut bought.",
			},
			{
				q: "How do I know if we have technical debt?",
				a: "Estimates stop being predictable, the same bug returns, fixing one thing breaks another, onboarding a developer takes a month, there is an area nobody wants to touch, and releases get less frequent.",
			},
			{
				q: "Is all technical debt worth fixing?",
				a: "No. Debt in code that never changes costs nothing, because interest is only paid when you touch it. Debt in code that changes weekly is where all the cost is, even if it is the same amount of mess.",
			},
			{
				q: "How much should we spend on technical debt?",
				a: "A standing allocation of 15-20% of each cycle works well and stops debt accumulating faster than it is paid. Alternatively, price it into feature estimates so the trade-off is visible.",
			},
			{
				q: "Should we rewrite instead of paying down debt?",
				a: "Rarely. A rewrite discards years of accumulated small fixes, most undocumented, and rediscovers those problems in production. Incremental replacement is usually cheaper and always less risky.",
			},
		],
	},
	'why-software-projects-fail': {
		title: 'Why Software Projects Fail',
		pageTitle: 'Why Software Projects Fail (It Is Not the Code)',
		description:
			'The eight real causes, ranked, plus a pre-flight checklist. Seven of them are decided before any code is written and none are technical.',
		ogImage: '/posts/why-software-projects-fail.webp',
		author: 'niraj',
		datePublished: '2026-05-04',
		dateModified: '2026-08-09',
		keywords: [
			'why software projects fail',
			'software project failure causes',
			'IT project failure',
			'how to avoid project failure',
			'software project risk',
		],
		category: 'insights',
		readingTime: 14,
		keyTakeaways: [
			'The most common failure is not a system that breaks. It is one that gets built, launched, and then not used - and nobody counts that as a failure because a deliverable exists.',
			'Seven of the eight real causes are decided before any code is written, and none of them are technical.',
			'The single biggest cause is that stakeholders never agreed what problem was being solved. Getting three of them to sign the same paragraph costs a day and prevents it.',
			'A named decision-maker with a deputy and a 48-hour response commitment is the highest-leverage thing a client can provide, and it costs nothing.',
			'Language, framework, team size and offshore-versus-local almost never determine the outcome, which is where anxious buyers spend most of their attention.',
		],
		faqs: [
			{
				q: "Why do most software projects fail?",
				a: "Because nobody agreed what problem was being solved, the eventual users were not involved, no single person could make a decision, or scope grew without being priced. Technical causes are far down the list.",
			},
			{
				q: "What percentage of software projects fail?",
				a: "Estimates vary enormously depending on the definition used. More useful than any figure is the observation that the same handful of non-technical causes appear again and again, and all are addressable in advance.",
			},
			{
				q: "How can I reduce the risk of my software project failing?",
				a: "Get three stakeholders to sign one problem statement, watch the actual users work, name a single decision-maker and deputy, agree a written change process, profile the data, and ship something real within eight weeks.",
			},
			{
				q: "Is choosing the right technology important?",
				a: "Far less than people assume. Any mainstream stack maintained by competent people will do the job. The decisions that determine success are about scope, stakeholders and decision-making.",
			},
			{
				q: "What are the warning signs a project is failing?",
				a: "Nothing deployed you can click by week six, feedback taking over a week, additions arriving without being written down, the same items in progress three weeks running, and status reported as a percentage rather than working software.",
			},
		],
	},
	'who-owns-the-code-web-development': {
		title: 'Who Owns the Code When You Hire an Agency?',
		pageTitle: 'Who Owns the Code When You Hire an Agency?',
		description:
			'Paying for software does not automatically mean you own it. The clause that transfers copyright, and the eight others worth checking before you sign.',
		ogImage: '/posts/who-owns-the-code-web-development.webp',
		author: 'niraj',
		datePublished: '2026-05-13',
		dateModified: '2026-08-09',
		keywords: [
			'who owns the code web development',
			'software development contract ownership',
			'work made for hire software',
			'source code ownership agency',
			'intellectual property web development',
		],
		category: 'guides',
		readingTime: 15,
		keyTakeaways: [
			'Under US law a contractor\'s code is usually NOT work made for hire - software is not one of the nine eligible categories, so you need an explicit copyright assignment clause.',
			'Ownership is not one thing: custom code, agency boilerplate, open-source dependencies and commercial licences are each owned differently.',
			'Agency pre-existing libraries staying with the agency is normal and fair. What you need is a perpetual, royalty-free licence to use and modify them inside your product.',
			'Commercial third-party licences must be purchased in YOUR name, or the product stops working when the relationship ends.',
			'Owning code you cannot deploy is not ownership. Insist on your own repository and cloud accounts from day one, not at handover.',
		],
		faqs: [
			{
				q: 'Do I automatically own the code if I pay for it?',
				a: 'Not necessarily. Copyright vests in the author on creation, and the work-made-for-hire exception generally does not cover software commissioned from an independent contractor. Without an explicit written assignment, the agency may retain copyright in code you paid for.',
			},
			{
				q: 'What is the difference between work made for hire and an assignment?',
				a: 'Work made for hire treats the commissioning party as the author, but only for employees or for nine specific categories that do not include software. An assignment transfers copyright from the author to you. A well-drafted contract does both: work for hire where the law allows, assignment where it does not.',
			},
			{
				q: 'Should the agency hand over its internal libraries too?',
				a: 'No, and asking is usually unreasonable. Every competent agency brings pre-existing tooling. The standard arrangement is that they keep it and grant you a perpetual, worldwide, royalty-free licence to use and modify it as part of your product.',
			},
			{
				q: 'Who should own the cloud accounts and domain?',
				a: 'You should, from day one, with the agency added as a user. Production running in infrastructure you cannot access is the most common form of accidental lock-in, and it is trivial to avoid at the start and painful to unwind later.',
			},
			{
				q: 'What happens to ownership if the project stops halfway?',
				a: 'Most agreements transfer ownership on payment, so you own what your paid invoices cover. Confirm this before signing rather than during a dispute, and confirm you receive those deliverables in a usable state.',
			},
		],
	},
	'web-application-maintenance-cost': {
		title: 'What Does It Cost to Maintain a Web Application?',
		pageTitle: 'What Does It Cost to Maintain a Web Application?',
		description:
			'Budget 15-20% of build cost per year, and here is exactly what that buys - patching, runtime upgrades, monitoring, and the cost of skipping them.',
		ogImage: '/posts/web-application-maintenance-cost.webp',
		author: 'niraj',
		datePublished: '2026-05-25',
		dateModified: '2026-08-09',
		keywords: [
			'web application maintenance cost',
			'software maintenance cost per year',
			'website maintenance retainer',
			'technical debt cost',
			'software support and maintenance pricing',
		],
		category: 'buying-guide',
		readingTime: 15,
		keyTakeaways: [
			'Budget 15-20% of the original build cost per year for maintenance. A $40,000 build costs roughly $6,000-$8,000 a year to keep current.',
			'Runtime and framework end-of-life dates are published in advance, which makes them the easiest part of maintenance to plan and the most avoidable to be caught by.',
			'Automation like Dependabot and npm audit raises the alarm; it does not do the work. Someone still has to judge, upgrade and verify.',
			'Deferred maintenance does not save money - it converts a predictable expense into an unpredictable one, and upgrades get harder superlinearly.',
			'A retainer should name what it excludes. New features are not maintenance, and a retainer that absorbs them silently runs out of hours for the actual work.',
		],
		faqs: [
			{
				q: 'How much does web application maintenance cost per year?',
				a: 'Typically 15 to 20% of the original build cost. That covers security patching, dependency and runtime upgrades, uptime and error monitoring, backups, and fixes for defects in delivered work.',
			},
			{
				q: 'What is included in a maintenance retainer?',
				a: 'Security patching with a stated response window, regular dependency upgrades, a plan for runtime and framework end-of-life dates, uptime and error monitoring with alerting, restore-tested backups, bug fixes, and a monthly report of what actually happened.',
			},
			{
				q: 'What happens if I skip maintenance?',
				a: 'Upgrades get disproportionately harder because breaking changes interact, your exposure window to published vulnerabilities widens, hiring gets harder, and small changes stop being small. The usual endpoint is a rebuild that costs more than years of maintenance would have.',
			},
			{
				q: 'Do I need a retainer or can I pay ad hoc?',
				a: 'Ad hoc is reasonable for low-stakes internal tools. For anything the business depends on, a retainer means someone is watching before something breaks rather than after - and you are not queuing behind clients who have one.',
			},
			{
				q: 'How can I reduce maintenance costs?',
				a: 'Most of it is decided during the build: fewer dependencies, boring well-supported technology, a real test suite, automated deployment, and upgrading little and often rather than in an annual big bang.',
			},
		],
	},
	'agency-vs-freelancer-vs-in-house': {
		title: 'Agency vs Freelancer vs In-House: How to Decide',
		pageTitle: 'Agency vs Freelancer vs In-House: How to Decide',
		description:
			'The three options are not priced on the same thing. How to match the arrangement to the shape of your work, including when to hire none of them.',
		ogImage: '/posts/agency-vs-freelancer-vs-in-house.webp',
		author: 'niraj',
		datePublished: '2026-06-08',
		dateModified: '2026-08-09',
		keywords: [
			'agency vs freelancer vs in-house',
			'hire freelance developer or agency',
			'in-house developer vs agency cost',
			'software development staffing',
			'outsource software development',
		],
		category: 'comparisons',
		readingTime: 14,
		keyTakeaways: [
			'Agencies are better value for building something; employees are better value for running it. Most trouble comes from using one for the other.',
			'A freelancer\'s real cost includes your own management time - writing the spec, reviewing work, making decisions - which is substantial and usually uncounted.',
			'Hiring one lone engineer to build something significant is the most common in-house mistake: no reviewer, no second opinion, and a single point of failure.',
			'The hybrid that works: agency builds version one, company hires once there is a live system, then a deliberate handover with documentation and overlap.',
			'Ask any agency whether they have handed a client over to an in-house team. The answer reveals whether they think in relationships or in lock-in.',
		],
		faqs: [
			{
				q: 'Is an agency or a freelancer better for building a web app?',
				a: 'A freelancer suits a narrow, well-specified piece of work in one discipline that you can review yourself. An agency suits work spanning design, backend and infrastructure, or anywhere you need continuity if one person becomes unavailable.',
			},
			{
				q: 'When should I hire an in-house developer instead?',
				a: 'When the work is continuous, the domain knowledge compounds, and the software is core to how the business runs. That usually means after there is a live system with real users, which is also a far easier role to recruit for.',
			},
			{
				q: 'Is in-house cheaper than an agency?',
				a: 'Per hour over several years, usually yes. For the first three to six months, usually no - recruitment fees, equipment, employer costs and ramp-up time mean an employee is the most expensive way to start.',
			},
			{
				q: 'What is the real cost of hiring a freelancer?',
				a: 'The hourly rate plus your management time. Someone has to write the specification, review the output and make the decisions. If that person is you and you already have a job, that is the binding constraint, not the rate.',
			},
			{
				q: 'Can I move from an agency to an in-house team later?',
				a: 'Yes, and you should plan it from the start. It needs documentation, a walkthrough, repository and cloud access in your name, and a period of overlap. Ask about handover before you sign, not at the end.',
			},
		],
	},
	'how-to-write-a-web-development-brief': {
		title: 'How to Write a Web Development Brief',
		pageTitle: 'How to Write a Web Development Brief (With a Template)',
		description:
			'A two-page brief gets you comparable quotes. The nine things it needs, what to leave out, and a template you can copy straight into a document.',
		ogImage: '/posts/how-to-write-a-web-development-brief.webp',
		author: 'niraj',
		datePublished: '2026-06-17',
		dateModified: '2026-08-09',
		keywords: [
			'how to write a web development brief',
			'software project brief template',
			'website RFP template',
			'web development requirements document',
			'how to brief a development agency',
		],
		category: 'guides',
		readingTime: 14,
		keyTakeaways: [
			'A useful brief is about two pages: it describes the problem precisely and the solution loosely, so suppliers can propose something better than what you asked for.',
			'State the problem as a problem, not a feature list. "Two hours of manual re-entry every morning" tells a supplier more than "we need a dashboard".',
			'Mark every integration as modern API, old but documented, or unknown. The third category is where estimates go wrong, and naming it lets suppliers price it openly.',
			'Give a budget range and say which of deadline, budget or scope cannot move. Withholding it produces proposals for the wrong size of project.',
			'Send it to three or four suppliers, then pay two for a short discovery. That converts an unknowable decision into an informed one for a fraction of the build cost.',
		],
		faqs: [
			{
				q: 'What should a web development brief include?',
				a: 'Nine things: what the business does, the problem stated as a problem, user roles and counts, the core journey, integrations with confidence levels, ranked constraints, your budget range, what success looks like in six months, and what you will provide and when.',
			},
			{
				q: 'How long should a project brief be?',
				a: 'About two pages. Three sentences leaves suppliers guessing, and forty pages of feature list specifies solutions before anyone has agreed on the problem, so you get quotes for exactly what you described whether or not it was right.',
			},
			{
				q: 'Should I include my budget in the brief?',
				a: 'Yes, as a range. Withholding it wastes effort on proposals for the wrong size of project and removes the supplier\'s ability to tell you your scope does not fit your budget and which parts to cut.',
			},
			{
				q: 'How many agencies should I send a brief to?',
				a: 'Three or four. Past that you are comparing sales polish rather than substance. Then consider paying two of them for a short discovery so you can see how they actually work.',
			},
			{
				q: 'Should the brief specify the technology?',
				a: 'Only if you have a real constraint, such as an in-house team that will maintain it. If so, state the reason rather than just the requirement, so a supplier can tell you if there is a better fit.',
			},
		],
	},
	'web-application-development-cost': {
		title: 'How Much Does It Cost to Build a Web Application?',
		pageTitle: 'How Much Does It Cost to Build a Web Application in 2026?',
		description:
			'Real 2026 price ranges for custom web applications, the five things that actually drive the number, and the costs that never appear in the build quote.',
		ogImage: '/posts/web-application-development-cost.webp',
		author: 'niraj',
		datePublished: '2026-06-29',
		dateModified: '2026-08-09',
		keywords: [
			'web application development cost',
			'how much does it cost to build a web app',
			'custom software development cost',
			'web app development pricing',
			'cost to build a SaaS platform',
		],
		category: 'buying-guide',
		readingTime: 14,
		keyTakeaways: [
			'A custom web application typically costs $15,000 to $45,000 for an MVP and $45,000 to $150,000 for a production SaaS platform.',
			'Five things drive the number: how many user roles, how novel the data model is, how well-behaved your integrations are, how clear the requirements are, and what you mean by "done".',
			'A healthy quote spends 10-15% on architecture and 10-15% on infrastructure. A quote that is 90% "development" has not removed that work, only hidden it.',
			'Budget the first year at build cost plus 20-30% - hosting, third-party services and maintenance are real and usually unmentioned.',
			'A cheap quote is a signal to compare written scopes line by line, not a reason to negotiate the number.',
		],
		faqs: [
			{
				q: 'How much does it cost to build a web application in 2026?',
				a: 'A marketing site with a CMS runs $4,000 to $12,000, an MVP $15,000 to $45,000, and a production SaaS platform $45,000 to $150,000. Those assume a senior team, a real production deployment, and code you own at the end.',
			},
			{
				q: 'Why do web development quotes vary so much?',
				a: 'Because the scope behind them differs more than the price does. Two quotes for "the same" app often differ on user roles, admin tooling, testing, deployment and data migration. Compare the written scopes rather than the totals.',
			},
			{
				q: 'What ongoing costs should I budget after launch?',
				a: 'Hosting is typically $20 to $200 a month at launch, third-party services $50 to $500, and maintenance 15 to 20% of the original build cost per year to keep dependencies patched and the platform current.',
			},
			{
				q: 'Should I choose fixed price or time and materials?',
				a: 'Fixed price suits genuinely known scope and costs slightly more because the vendor prices the estimation risk. Time and materials suits exploratory work. A hybrid - fixed-price discovery, then a fixed build price based on what it found - usually beats both.',
			},
			{
				q: 'Is a much cheaper quote a red flag?',
				a: 'Not automatically. It usually means the scope was read narrowly, the team is more junior, or testing and deployment were excluded. Any of those can be fine if you know which one it is, so ask what is not included.',
			},
		],
	},
	'how-to-choose-a-web-development-agency': {
		title: 'How to Choose a Web Development Agency',
		pageTitle: "How to Choose a Web Development Agency",
		description:
			'The questions that actually predict how a project goes, how to read a proposal, and which trust signals are weaker than they look.',
		ogImage: '/posts/how-to-choose-a-web-development-agency.webp',
		author: 'niraj',
		datePublished: '2026-07-08',
		dateModified: '2026-08-09',
		keywords: [
			'how to choose a web development agency',
			'hiring a software development agency',
			'questions to ask a web development company',
			'web development agency vs freelancer',
			'software agency selection',
		],
		category: 'buying-guide',
		readingTime: 14,
		keyTakeaways: [
			'Ask who will actually write your code and whether you can meet them. Many agencies sell with senior people and deliver with junior ones.',
			'A proposal that names its exclusions is more trustworthy than one that appears to include everything, because exclusions mean someone thought about the boundaries.',
			'The strongest positive signal is an agency that tells you not to build something - it means they are optimising for your outcome over their invoice.',
			'Ask for a reference from a project that finished over a year ago. Recent references describe the honeymoon; old ones tell you whether the code survived.',
			'Pay two candidates for a short discovery before committing. It costs a fraction of the build and converts an unknowable decision into an informed one.',
		],
		faqs: [
			{
				q: 'What questions should I ask a web development agency?',
				a: 'Who will actually write the code and can I meet them, what happens when we disagree about scope, show me a project that went badly, what do you need from us, who owns the code afterwards, and what does support look like after launch.',
			},
			{
				q: 'How do I compare two proposals with very different prices?',
				a: 'Ignore the totals and compare the scopes. Look at whether each names its exclusions and assumptions, whether testing and deployment are line items, whether the timeline marks your dependencies, and whether the team is named.',
			},
			{
				q: 'Should I hire an agency or a freelancer?',
				a: 'A freelancer suits a small, well-defined piece of work where you can carry the project management. An agency suits work needing several disciplines - design, backend, infrastructure - or continuity if one person becomes unavailable.',
			},
			{
				q: 'Who should own the code and infrastructure?',
				a: 'You should, on full payment: source in your own repository and production running in accounts you control. Agencies that deploy only to infrastructure they own can turn a maintenance retainer into lock-in.',
			},
			{
				q: 'Are awards and portfolio size good indicators of quality?',
				a: 'Weak ones. Awards are usually paid entries judged on visual design, and a large logo wall reflects sales rather than delivery. Three case studies explaining the actual problem and architecture tell you far more.',
			},
		],
	},
	'custom-software-vs-off-the-shelf': {
		title: 'Custom Software vs Off-the-Shelf: How to Decide',
		pageTitle: 'Custom Software vs Off-the-Shelf: How to Decide',
		description:
			'One question settles most of this decision. Plus the real five-year cost comparison and the middle path that suits more companies than either extreme.',
		ogImage: '/posts/custom-software-vs-off-the-shelf.webp',
		author: 'niraj',
		datePublished: '2026-07-20',
		dateModified: '2026-08-09',
		keywords: [
			'custom software vs off the shelf',
			'build vs buy software',
			'custom software development benefits',
			'when to build custom software',
			'off the shelf software limitations',
		],
		category: 'comparisons',
		readingTime: 14,
		keyTakeaways: [
			'One question settles most cases: is this process a source of advantage, or is it overhead? Buy the overhead, build the advantage.',
			'Off-the-shelf is cheaper for longer than people expect. The crossover is driven by headcount growth and by how far your process drifts from the vendor assumptions.',
			'The failure mode of off-the-shelf is not dramatic - it is spreadsheets, WhatsApp groups and re-entry work accumulating beside the tool until they are the real system.',
			'"The tool does 80% of what we need" is usually a good deal, not a reason to build. Check whether the missing 20% is load-bearing or merely different.',
			'Most companies should buy the commodity layer, build the thin layer where they are genuinely different, and connect the two through APIs.',
		],
		faqs: [
			{
				q: 'When is custom software worth it?',
				a: 'When the process is a source of competitive advantage, when no mature product fits better than about 60%, when the process changes often, or when you need reporting that crosses systems no single vendor covers.',
			},
			{
				q: 'Is custom software more expensive than off-the-shelf?',
				a: 'Upfront, almost always. Over five years it depends on headcount and fit: SaaS costs scale per seat while custom costs stay roughly flat, so growing teams often cross over. Building purely to avoid a subscription rarely pays back.',
			},
			{
				q: 'What is the middle path between building and buying?',
				a: 'Buy the commodity layer - accounting, payroll, email, CRM, storage - build a thin custom layer only where your business is genuinely different, and connect them through the bought tools\' APIs so data stays consistent.',
			},
			{
				q: 'What are the hidden costs of off-the-shelf software?',
				a: 'Per-seat pricing that outgrows the value, workarounds like spreadsheets and manual re-entry, data locked in the vendor\'s shape, waiting on a roadmap that serves their largest segment, and brittle integrations between several tools.',
			},
			{
				q: 'How long does custom software take to build?',
				a: 'A first useful version is typically 6 to 12 weeks and a full production system 3 to 6 months. Starting with the smallest useful slice in production beats another month of planning.',
			},
		],
	},
	'how-long-does-it-take-to-build-a-web-app': {
		title: 'How Long Does It Take to Build a Web App?',
		pageTitle: 'How Long Does It Take to Build a Web App? A Realistic Guide',
		description:
			'Realistic timelines for web projects, why elapsed time beats engineering time, and the handful of things you control that move the date most.',
		ogImage: '/posts/how-long-does-it-take-to-build-a-web-app.webp',
		author: 'niraj',
		datePublished: '2026-07-29',
		dateModified: '2026-08-09',
		keywords: [
			'how long does it take to build a web app',
			'web application development timeline',
			'MVP development timeline',
			'software project timeline',
			'web development project schedule',
		],
		category: 'guides',
		readingTime: 14,
		keyTakeaways: [
			'An MVP is typically 5 to 9 weeks of engineering but 6 to 12 weeks of elapsed time. The gap is review cycles, missing content and third-party provisioning.',
			'Review latency is the biggest hidden cost. Agree a 48-hour feedback window and name one person who can approve.',
			'Start every third-party dependency in week one. Provisioning that "takes a few days" routinely takes three weeks.',
			'The last 10% - error states, migration, accessibility, load testing - is genuinely 15 to 20% of the project and is the part most often squeezed.',
			'Cutting scope is the only reliable accelerator. Adding developers, skipping tests and working weekends all make projects slower.',
		],
		faqs: [
			{
				q: 'How long does it take to build a web application?',
				a: 'A marketing site is 3 to 6 weeks elapsed, an MVP 6 to 12 weeks, an internal tool 6 to 14 weeks, and a production SaaS platform 3 to 6 months. Replacing a legacy system usually runs 6 to 12 months.',
			},
			{
				q: 'Why does the project take longer than the quoted development time?',
				a: 'Because quotes usually state engineering time while you experience elapsed time. Review cycles, content that has not been written, unavailable decision-makers and third-party provisioning routinely add 30 to 50%.',
			},
			{
				q: 'Can I speed up a project by adding more developers?',
				a: 'Rarely. Past a small team, coordination cost eats the gain, and people added mid-project make things slower for the first couple of weeks while they learn the codebase. Cutting scope is the reliable accelerator.',
			},
			{
				q: 'What is the single best thing a client can do to hit the date?',
				a: 'Name one decision-maker who can approve work within 48 hours. Fast, decisive feedback from a single owner compresses timelines more than any technical decision the team makes.',
			},
			{
				q: 'Should a timeline include buffer?',
				a: 'Yes. Every real project meets one genuine surprise. A schedule with no slack does not prevent the surprise, it just guarantees it becomes a missed date.',
			},
		],
	},
	'shipping-mvps-fast': {
		title: 'How We Ship Production MVPs in 4-8 Weeks',
		pageTitle: "How We Ship Production MVPs in 4 to 8 Weeks",
		description:
			'The exact process Shunya uses to take an idea to a production MVP in 4 to 8 weeks - scoping, the stack, bi-weekly deploys, and what we deliberately leave out.',
		ogImage: '/posts/shipping-mvps-fast.webp',
		author: 'niraj',
		datePublished: '2026-06-02',
		dateModified: '2026-08-09',
		keywords: [
			'how to ship an MVP fast',
			'production MVP in weeks',
			'MVP development process',
			'software agency MVP',
			'Next.js MVP stack',
		],
		category: 'guides',
		readingTime: 13,
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
			'A practical guide to production RAG: chunking, retrieval quality, grounding and evaluation - what separates a demo from a system you can trust.',
		ogImage: '/posts/rag-pipelines-explained.webp',
		author: 'niraj',
		datePublished: '2026-05-28',
		dateModified: '2026-08-09',
		keywords: [
			'RAG pipeline production',
			'retrieval augmented generation',
			'RAG architecture',
			'vector database RAG',
			'LLM grounding hallucination',
		],
		category: 'engineering',
		readingTime: 13,
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
			'Handoffs between frontend, backend, infra and design are where projects rot. Why one team owning the whole stack ships faster and breaks less.',
		ogImage: '/posts/full-stack-ownership.webp',
		author: 'shunya-team',
		datePublished: '2026-05-20',
		dateModified: '2026-08-09',
		keywords: [
			'full-stack ownership',
			'software team handoffs',
			'end to end ownership engineering',
			'product team structure',
			'why projects fail handoffs',
		],
		category: 'insights',
		readingTime: 13,
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
		pageTitle: "Case Study: Building CodrzAI, an Engineering OS",
		description:
			'How we built CodrzAI in four months - AI roadmaps, six specialised agents, a scaffolding engine, an open-source bounty marketplace, and what we learned.',
		ogImage: '/posts/codrzai-case-study.webp',
		author: 'shunya-team',
		datePublished: '2026-05-10',
		dateModified: '2026-08-09',
		keywords: [
			'CodrzAI case study',
			'AI learning platform',
			'edtech engineering',
			'LLM agents product',
			'building an AI suite',
		],
		category: 'case-studies',
		readingTime: 13,
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
		pageTitle: "Next.js, tRPC and Prisma: Our Default Stack",
		description:
			'Why we reach for Next.js, tRPC and Prisma by default - end-to-end type safety, one language across the stack, and a boring path to production.',
		ogImage: '/posts/choosing-your-stack.webp',
		author: 'niraj',
		datePublished: '2026-04-30',
		dateModified: '2026-08-09',
		keywords: [
			'Next.js tRPC Prisma stack',
			'production tech stack',
			'type-safe full stack',
			'best stack for SaaS',
			'choosing a tech stack',
		],
		category: 'comparisons',
		readingTime: 13,
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
		pageTitle: "Next.js 15 Server Components in Production",
		description:
			'A dozen App Router apps later: the mental model that stuck, where Server Components bit us, the four overlapping caches, and the rules we ship by.',
		ogImage: '/posts/nextjs-15-server-components-in-production.webp',
		author: 'niraj',
		datePublished: '2026-04-14',
		dateModified: '2026-08-09',
		keywords: [
			'Next.js 15 server components',
			'React Server Components production',
			'App Router caching',
			"Next.js 'use client' boundary",
			'Server Actions vs API',
		],
		category: 'engineering',
		readingTime: 13,
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
		pageTitle: "Scaling Postgres for SaaS: The Right Order",
		description:
			'Most "we need to scale the database" conversations are really "we never tuned the database". How to scale Postgres in the right order.',
		ogImage: '/posts/scaling-postgres-for-saas.webp',
		author: 'niraj',
		datePublished: '2026-03-22',
		dateModified: '2026-08-09',
		keywords: [
			'scaling Postgres SaaS',
			'Postgres performance tuning',
			'pg_stat_statements indexes',
			'Postgres connection pooling PgBouncer',
			'read replicas partitioning',
		],
		category: 'engineering',
		readingTime: 13,
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
		pageTitle: "The Real Cost of Cutting Corners in Software",
		description:
			'Cutting scope makes you faster at no long-term cost. Cutting corners makes you slower every day after. Why they are not the same thing.',
		ogImage: '/posts/cost-of-cutting-corners.webp',
		author: 'shunya-team',
		datePublished: '2026-02-26',
		dateModified: '2026-08-09',
		keywords: [
			'cost of cutting corners software',
			'technical debt vs scope',
			'cutting scope not quality',
			'software quality on a deadline',
			'engineering discipline velocity',
		],
		category: 'insights',
		readingTime: 13,
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
			'The week-by-week shape of a six-week MVP build - what happens in each one, what we need from you, and what deliberately waits until after launch.',
		ogImage: '/posts/from-idea-to-mvp-in-6-weeks.webp',
		author: 'shunya-team',
		datePublished: '2026-01-30',
		dateModified: '2026-08-09',
		keywords: [
			'idea to MVP in 6 weeks',
			'MVP development timeline',
			'MVP playbook week by week',
			'how to build an MVP fast',
			'startup MVP process',
		],
		category: 'guides',
		readingTime: 13,
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
		pageTitle: "Designing AI Agents That Don't Hallucinate",
		description:
			'Hallucination is mostly an architecture problem, not a model problem. How we build agents businesses rely on - grounding, tools and evaluation.',
		ogImage: '/posts/designing-ai-agents-that-dont-hallucinate.webp',
		author: 'niraj',
		datePublished: '2025-12-12',
		dateModified: '2026-08-09',
		keywords: [
			'AI agents hallucination',
			'prevent LLM hallucination',
			'grounded AI agent design',
			'LLM tool use accuracy',
			'reliable AI agents production',
		],
		category: 'engineering',
		readingTime: 13,
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
		pageTitle: "CI/CD That Actually Ships: Our Standard Pipeline",
		description:
			'A deployment pipeline has one job: make shipping so boring that nobody fears it. The CI/CD setup we put on every project, and why each piece earns it.',
		ogImage: '/posts/ci-cd-that-actually-ships.webp',
		author: 'niraj',
		datePublished: '2025-11-08',
		dateModified: '2026-08-09',
		keywords: [
			'CI/CD pipeline best practices',
			'continuous deployment setup',
			'preview deployments PR',
			'shift left testing',
			'automated production deploys rollback',
		],
		category: 'engineering',
		readingTime: 13,
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
		pageTitle: "Case Study: Building SyncOrbit for Agencies",
		description:
			'How SyncOrbit came together - an agency with no single screen, the aggregation architecture, and why the data model was the genuinely hard part.',
		ogImage: '/posts/building-syncorbit-case-study.webp',
		author: 'niraj',
		datePublished: '2025-10-10',
		dateModified: '2026-08-09',
		keywords: [
			'SyncOrbit case study',
			'agency management software',
			'data aggregation product',
			'building a command center dashboard',
			'Next.js tRPC Postgres product',
		],
		category: 'case-studies',
		readingTime: 13,
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
		pageTitle: "Mobile vs Web vs PWA: How to Choose the Right Platform",
		description:
			'Native app, web app or PWA? Not a technology question - it is about who your users are and what you can afford to maintain. How to choose.',
		ogImage: '/posts/mobile-vs-web-vs-pwa.webp',
		author: 'shunya-team',
		datePublished: '2025-09-05',
		dateModified: '2026-08-09',
		keywords: [
			'mobile vs web vs PWA',
			'native app vs web app',
			'progressive web app pros cons',
			'choosing a platform for your product',
			'when to build a native app',
		],
		category: 'comparisons',
		readingTime: 14,
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

// ─── Publish gate ────────────────────────────────────────────────────────────
// See content/active-posts.ts. Everything public-facing (listings, topic hubs,
// sitemap, llms.txt) must go through these rather than reading BLOG_POSTS raw,
// or drafts leak into the index.

export function isPublished(slug: string): boolean {
	return ACTIVE_BLOG_SLUGS.includes(slug)
}

/** Every published post, newest first, with the slug attached. */
export function getPublishedPosts(): BlogPostWithSlug[] {
	return Object.entries(BLOG_POSTS)
		.filter(([slug]) => isPublished(slug))
		.map(([slug, meta]) => ({ slug, ...meta }))
		.sort(
			(a, b) =>
				new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime(),
		)
}

export function getPublishedSlugs(): string[] {
	return getPublishedPosts().map((p) => p.slug)
}

// Published posts in a category, newest first, with the slug attached.
export function getPostsByCategory(category: BlogCategory): BlogPostWithSlug[] {
	return Object.entries(BLOG_POSTS)
		.filter(([slug, meta]) => meta.category === category && isPublished(slug))
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
		.filter(([key]) => key !== slug && isPublished(key))
		.map(([key, meta]) => ({ slug: key, ...meta }))

	const sameCategory = all.filter((p) => p.category === current.category)
	const others = all.filter((p) => p.category !== current.category)

	const byDate = (a: BlogPostWithSlug, b: BlogPostWithSlug) =>
		new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()

	return [...sameCategory.sort(byDate), ...others.sort(byDate)].slice(0, limit)
}
