import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, CheckCircle, ArrowRight } from "lucide-react"
import SmoothScroll from "@/components/smoothscroll"

interface Outcome {
    metric: string
    label: string
}

interface Project {
    projectslug: string
    title: string
    tagline: string
    industry: string
    client: string
    timeline: string
    role: string
    image: string
    link: string
    stack: string[]
    challenge: string
    solution: string
    features: string[]
    outcomes: Outcome[]
}

const getProjectData = async (slug: string): Promise<Project | undefined> => {
    const projects: Project[] = [
        {
            projectslug: "coderzai",
            title: "CodrzAI",
            tagline: "Engineering Intelligence Suite for CS Students",
            industry: "Education",
            client: "CodrzAI",
            timeline: "4 Months",
            role: "Full Product Development",
            image: "/thecoderz.png",
            link: "https://coderzai.xyz",
            stack: ["Next.js", "Node.js", "MongoDB", "OpenAI API", "Redis", "WebSockets", "Tailwind CSS"],
            challenge: "CS students in India were piecing together five different tools to navigate their technical journey — LeetCode for DSA, GitHub for projects, YouTube for learning, Discord for community, and ChatGPT for help. There was no single platform connecting these workflows, no AI that understood their specific academic and career context, and no way to build verifiable, real-world project experience before graduating. Students were learning in isolation with no proof of what they could actually ship.",
            solution: "We built CodrzAI from scratch as a full engineering intelligence suite. The platform gives students a structured learning OS with AI-generated roadmaps, six specialized AI agents for DSA coaching, system design guidance, and real-time code review. A Project Foundry generates complete full-stack codebases from natural language prompts. An open-source contribution marketplace connects students with real bounties — so they graduate with a portfolio that proves what they can do, not just what they studied. Certifications are blockchain-verified so they can't be faked.",
            features: [
                "AI Learning Roadmap Generator",
                "6+ Specialized AI Agents (DSA, System Design, Code Review)",
                "Full-Stack Project Scaffolding Engine",
                "Open Source Contribution Marketplace with Bounties",
                "Blockchain-Verified Certifications",
                "Credit-Based Flexible Access Model",
                "Real-Time Collaborative IDE",
                "Peer Mentorship & Community Forums"
            ],
            outcomes: [
                { metric: "500+", label: "Active Students" },
                { metric: "$50k+", label: "Bounties Available" },
                { metric: "6+", label: "AI Agents Shipped" },
                { metric: "4mo", label: "Time to Ship" }
            ]
        },
        {
            projectslug: "eventeye",
            title: "EventEye",
            tagline: "End-to-End Event Platform for Colleges & Institutions",
            industry: "Events",
            client: "EventEye",
            timeline: "3 Months",
            role: "Full Product Development",
            image: "/eventeye.png",
            link: "https://eventeye.in",
            stack: ["React", "Node.js", "PostgreSQL", "Razorpay", "Tailwind CSS"],
            challenge: "College event organizers across India were running events on a patchwork of WhatsApp announcements, Google Form registrations, and manual attendance tracking. Attendees had no way to discover events outside their own campus. Organizers had zero visibility into who was attending, no real-time data, and no tools to build a community around their events. Every event was a logistical scramble with no infrastructure to support it.",
            solution: "We built EventEye as a dual-sided platform with two completely distinct user experiences. On the attendee side: a discovery feed across institutions, an optimized checkout that gets users from intent to confirmed ticket in under 30 seconds, and a personal event history. On the organizer side: a full event management dashboard with real-time attendance tracking, analytics, community tools, and role-based team access. One codebase, two powerful products — organizers and attendees each get exactly what they need without compromise.",
            features: [
                "Dual-Pathway Architecture (Attendee & Organizer)",
                "Cross-Institution Event Discovery Feed",
                "Fast Ticket Checkout (Under 30 Seconds)",
                "Real-Time Attendance Management Dashboard",
                "Organizer Analytics & Reporting",
                "Community & Social Layer for Events",
                "Role-Based Team Access for Organizers",
                "Mobile-First Responsive Design"
            ],
            outcomes: [
                { metric: "< 30s", label: "Checkout Time" },
                { metric: "2", label: "User Pathways Built" },
                { metric: "Multi", label: "Institution Support" },
                { metric: "3mo", label: "Time to Ship" }
            ]
        },
        {
            projectslug: "mp-solutions",
            title: "M.P. Solutions",
            tagline: "Real-Time Pharmaceutical Inventory for B2B Supply Chains",
            industry: "Healthcare",
            client: "M.P. Solutions",
            timeline: "2 Months",
            role: "Full Stack Development",
            image: "/mpsolutions.png",
            link: "https://mpsolutions.vercel.app/",
            stack: ["Next.js", "tRPC", "Prisma", "PostgreSQL", "Tailwind CSS"],
            challenge: "A pharmaceutical distributor was managing inventory across multiple pharmacy partners entirely through phone calls and WhatsApp messages. Stockouts happened weekly. Surplus sat unsold. There was zero visibility into demand patterns across the network, and reorders were delayed because no one had a single source of truth for what was in stock where. The business was running on memory and goodwill, both of which have limits.",
            solution: "We built a centralized B2B procurement platform in 8 weeks. Pharmacies can check real-time stock availability, place orders, and configure automated reorder thresholds — no calls required. Distributors get a unified dashboard showing live demand patterns, low-stock alerts across the entire network, and a complete order audit trail. Built on Next.js with tRPC for fully type-safe end-to-end APIs and Prisma for reliable, relational data — every layer of the stack is predictable and maintainable.",
            features: [
                "Real-Time Inventory Sync Across Network",
                "Automated Reorder Threshold Alerts",
                "Supplier & Pharmacy Dual Dashboards",
                "Demand Forecasting & Analytics",
                "Complete Order History & Audit Trail",
                "Mobile-Accessible Interface for Field Teams"
            ],
            outcomes: [
                { metric: "2mo", label: "Time to Ship" },
                { metric: "100%", label: "Network Visibility" },
                { metric: "0", label: "Phone Calls Needed" },
                { metric: "Real-time", label: "Stock Updates" }
            ]
        }
    ]

    await new Promise(resolve => setTimeout(resolve, 50))
    return projects.find(p => p.projectslug === slug)
}

export default async function ProjectDetailsPage({ params }: { params: Promise<{ projectslug: string }> }) {
    const { projectslug } = await params
    const project = await getProjectData(projectslug)

    if (!project) return notFound()

    return (
        <SmoothScroll>
            <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
                <div className="fixed inset-0 z-0 pointer-events-none opacity-20 dark:opacity-10">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-24">
                    {/* Navigation */}
                    <div className="flex justify-between items-center mb-12">
                        <Link
                            href="/projects"
                            className="group flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                        >
                            <div className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 group-hover:border-neutral-400 transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                            </div>
                            <span>All Projects</span>
                        </Link>
                        <span className="px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 text-xs font-mono uppercase tracking-wider text-neutral-500">
                            {project.industry}
                        </span>
                    </div>

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
                            {project.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-500 font-light">
                            {project.tagline}
                        </p>
                    </div>

                    {/* Meta Strip */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <div>
                            <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">Client</div>
                            <div className="font-semibold">{project.client}</div>
                        </div>
                        <div>
                            <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">Timeline</div>
                            <div className="font-semibold">{project.timeline}</div>
                        </div>
                        <div>
                            <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">Role</div>
                            <div className="font-semibold">{project.role}</div>
                        </div>
                        <div>
                            <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">Status</div>
                            <div className="font-semibold flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
                                Live in Production
                            </div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 mb-20 shadow-2xl shadow-neutral-200/50 dark:shadow-black/50">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Main Content + Sidebar */}
                    <div className="grid lg:grid-cols-3 gap-16">
                        <div className="lg:col-span-2 space-y-16">
                            {/* Challenge */}
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 flex items-center justify-center shrink-0">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                    </div>
                                    <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                                        The Challenge
                                    </h2>
                                </div>
                                <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
                                    {project.challenge}
                                </p>
                            </section>

                            {/* Solution */}
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 flex items-center justify-center shrink-0">
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                    <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                                        What We Built
                                    </h2>
                                </div>
                                <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
                                    {project.solution}
                                </p>
                            </section>

                            {/* Features */}
                            <section>
                                <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-6">
                                    Key Capabilities
                                </h2>
                                <ul className="grid sm:grid-cols-2 gap-3">
                                    {project.features.map((feature, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800"
                                        >
                                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                            <span className="text-sm font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                {/* Outcomes */}
                                <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                                    <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-wider mb-4">
                                        Outcomes
                                    </h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {project.outcomes.map((outcome, idx) => (
                                            <div
                                                key={idx}
                                                className="text-center p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800"
                                            >
                                                <div className="text-xl font-bold text-neutral-900 dark:text-white">
                                                    {outcome.metric}
                                                </div>
                                                <div className="text-[10px] font-mono text-neutral-500 mt-1 uppercase tracking-wide">
                                                    {outcome.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Tech Stack */}
                                <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                                    <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-wider mb-4">
                                        Tech Stack
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.stack.map(tech => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1.5 text-xs font-mono border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Live Link */}
                                <Link
                                    href={project.link}
                                    target="_blank"
                                    className="flex items-center justify-center gap-2 w-full py-4 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-2xl font-bold hover:opacity-90 transition-opacity"
                                >
                                    View Live Product <ExternalLink className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Footer CTA */}
                    <div className="mt-24 pt-12 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-6">
                        <Link
                            href="/projects"
                            className="flex items-center gap-2 font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> All Projects
                        </Link>
                        <Link
                            href="/contactus"
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black font-bold text-sm hover:opacity-90 transition-opacity"
                        >
                            Start a Similar Project <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </main>
        </SmoothScroll>
    )
}
