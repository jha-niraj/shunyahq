import Link from "next/link"
import {
    ArrowRight, CheckCircle, Users, Award, BookOpen, Calendar, Rocket, Target, Lightbulb, Code,
    TrendingUp, MessageSquare, Briefcase, GraduationCap, Clock, PenToolIcon as Tool, Compass, Sparkles, X
} from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHero } from "@/components/landing/page-hero"
import { PageBackground } from "@/components/landing/page-background"
import { PageFAQ } from "@/components/landing/page-faq"

const PILLARS = [
    {
        icon: Tool,
        title: "Practical Support",
        description:
            "Get hands-on technical help building your MVP, marketing guidance, and pitch preparation-exactly what you need, when you need it.",
    },
    {
        icon: Compass,
        title: "Self-Directed Learning",
        description:
            "We guide, you execute. Develop real-world skills by doing the fieldwork yourself with expert direction when needed.",
    },
    {
        icon: Sparkles,
        title: "Affordable Access",
        description:
            "Minimal fees for guidance, optional equity only if you need significant resources. We believe in making entrepreneurship accessible.",
    },
]

const STATS = [
    { value: "10+", label: "Products Built", sub: "By our team" },
    { value: "50+", label: "Client Projects", sub: "Successfully delivered" },
    { value: "20+", label: "Expert Team", sub: "Developers & marketers" },
    { value: "15+", label: "Investor Connections", sub: "For funding opportunities" },
]

const TRADITIONAL = [
    "High fees or significant equity (5-10%), creating financial burden on student founders",
    "Excessive handholding that doesn't prepare founders for real-world challenges",
    "One-size-fits-all programs that don't address your specific technical or marketing needs",
    "Focus on pitch decks and fundraising over building sustainable businesses",
    "Limited technical support for non-technical founders who need help building their MVP",
]

const SHUNYA = [
    "Minimal fees for guidance, equity (2-3%) only if you need significant development resources",
    "Guided independence-we advise, you execute, building real-world skills and resilience",
    "Tailored technical and marketing support based on your specific startup needs",
    "Focus on building sustainable businesses first, with fundraising as a tool, not the goal",
    "Expert technical team that can help build your MVP if you lack technical co-founders",
]

const HELP_AREAS = [
    {
        icon: Code,
        title: "Technical Development",
        description:
            "Our expert development team can help build your MVP, whether you need guidance or hands-on development support.",
    },
    {
        icon: TrendingUp,
        title: "Marketing Strategy",
        description:
            "Learn how to identify your target market, create compelling messaging, and develop effective go-to-market strategies.",
    },
    {
        icon: MessageSquare,
        title: "Pitch Preparation",
        description:
            "Our PR team will help you craft and deliver compelling pitches that resonate with investors and partners.",
    },
    {
        icon: Users,
        title: "Investor Connections",
        description:
            "Access our network of investors and funding opportunities when your startup is ready for investment.",
    },
    {
        icon: Rocket,
        title: "Product Strategy",
        description:
            "Get guidance on product roadmapping, feature prioritization, and building for product-market fit.",
    },
    {
        icon: Lightbulb,
        title: "Idea Validation",
        description:
            "Test and refine your concept with structured methodologies before investing significant time and resources.",
    },
    {
        icon: Target,
        title: "Growth Hacking",
        description:
            "Learn practical, low-cost strategies to acquire users and grow your startup on a student budget.",
    },
    {
        icon: BookOpen,
        title: "Business Fundamentals",
        description:
            "Master the essentials of business operations, legal considerations, and financial planning.",
    },
    {
        icon: Award,
        title: "Founder Mentality",
        description:
            "Develop the mindset and resilience needed to navigate the challenges of entrepreneurship.",
    },
]

const PROCESS = [
    {
        step: "Step 1",
        title: "Initial Consultation",
        description:
            "We meet to understand your idea, vision, and specific needs to determine how we can best support you.",
        icon: Lightbulb,
    },
    {
        step: "Step 2",
        title: "Needs Assessment",
        description:
            "We identify which areas you need the most help with-technical development, marketing, pitch preparation, etc.",
        icon: Target,
    },
    {
        step: "Step 3",
        title: "Custom Support Plan",
        description:
            "We create a tailored plan that outlines exactly how we'll support you and what you'll be responsible for.",
        icon: Compass,
    },
    {
        step: "Step 4",
        title: "Guided Execution",
        description: "You build your business with our guidance and support in the areas you need it most.",
        icon: Code,
    },
    {
        step: "Step 5",
        title: "Growth & Connections",
        description:
            "As you gain traction, we help connect you with investors and partners to take your startup to the next level.",
        icon: TrendingUp,
    },
]

const TEAM = [
    { name: "Rajesh Kumar", role: "Lead Developer", expertise: "Full-stack, Mobile Apps" },
    { name: "Priya Sharma", role: "Marketing Director", expertise: "Growth, Digital Marketing" },
    { name: "Vikram Singh", role: "Product Strategist", expertise: "UX/UI, Product Management" },
    { name: "Ananya Patel", role: "PR Specialist", expertise: "Pitch Coaching, Media Relations" },
]

const SUCCESS_STORIES = [
    {
        name: "EcoTech Solutions",
        story:
            "Two engineering students with an idea but no technical skills. We helped them build their MVP and develop their marketing strategy. Now operating in 5 cities with minimal outside investment.",
        founder: "Arjun Mehta, Founder & CEO",
        id: "ecotech",
        category: "tech",
    },
    {
        name: "HealthBridge",
        story:
            "Medical students with deep domain knowledge but no business experience. Our team guided their go-to-market strategy while they handled the medical aspects. Recently expanded to 5 countries.",
        founder: "Dr. Priya Sharma, Co-founder",
        id: "healthbridge",
        category: "health",
    },
    {
        name: "EduSpark",
        story:
            "Education students who built their platform with our technical guidance. They did the fieldwork and market research themselves, creating a deeply customer-focused product that was acquired for ₹45 Cr.",
        founder: "Vikram Singh, Founder",
        id: "eduspark",
        category: "edu",
    },
]

const TESTIMONIALS = [
    {
        quote:
            "ShunyaTech didn't just hand me solutions-they taught me how to solve problems myself. The technical guidance was invaluable for a non-technical founder like me.",
        author: "Rahul Gupta",
        role: "Computer Science Student",
        company: "Founder, DataSense AI",
    },
    {
        quote:
            "What I love about ShunyaTech is that they let me do the real work while providing guidance when I needed it. I learned so much more than I would have with a traditional accelerator.",
        author: "Neha Sharma",
        role: "Engineering Student",
        company: "Co-founder, GreenEnergy",
    },
    {
        quote:
            "Their approach is perfect for students. Affordable, practical, and focused on teaching you how to build a real business-not just how to pitch for funding.",
        author: "Aditya Patel",
        role: "Business Student",
        company: "CEO, MarketPulse",
    },
]

const APPLY_STEPS = [
    {
        step: "1",
        title: "Submit Your Idea",
        description: "Tell us about your startup idea and what specific areas you need help with.",
        icon: Briefcase,
    },
    {
        step: "2",
        title: "Initial Consultation",
        description: "We'll meet to discuss your vision and how our team can best support your specific needs.",
        icon: MessageSquare,
    },
    {
        step: "3",
        title: "Custom Plan",
        description: "We'll create a tailored support plan that outlines exactly how we'll work together.",
        icon: Target,
    },
    {
        step: "4",
        title: "Start Building",
        description: "Begin working with our team to bring your startup vision to life.",
        icon: Rocket,
    },
]

const FAQS = [
    {
        question: "How much does it cost to join the program?",
        answer:
            "We keep our fees minimal-significantly lower than traditional accelerators. The exact amount depends on the level of support you need. For guidance only, fees are very affordable. If you need technical development or other resource-intensive support, we may discuss a small equity share (2-3%).",
    },
    {
        question: "Do I need to have technical skills?",
        answer:
            "Not at all. Our technical team can help build your MVP if you don't have technical co-founders. We can either guide you through the development process or handle it directly, depending on your needs and arrangement.",
    },
    {
        question: "How is this different from other accelerators?",
        answer:
            "Traditional accelerators often charge high fees or take significant equity while providing a standardized program. We offer tailored support at minimal cost, focusing on practical skills and guided independence rather than excessive handholding.",
    },
    {
        question: "How much time commitment is required?",
        answer:
            "Since you'll be doing much of the fieldwork yourself with our guidance, the time commitment is flexible and can work around your academic schedule. We believe in quality over quantity when it comes to our interactions.",
    },
    {
        question: "Can you help with funding?",
        answer:
            "Yes, we have connections with investors and can make introductions when your startup is ready. However, we focus first on helping you build a sustainable business that may not need significant outside funding to get started.",
    },
    {
        question: "Do I need to have a team already?",
        answer:
            "No, solo founders are welcome. We can provide guidance on building a team or connecting with potential co-founders if needed.",
    },
]

function StoryCard({ story }: { story: (typeof SUCCESS_STORIES)[number] }) {
    return (
        <div className="so-card p-7 flex flex-col h-full">
            <span className="so-eyebrow">{story.category}</span>
            <h3 className="mt-4 text-[19px] font-semibold text-so-ink tracking-[-0.01em]">{story.name}</h3>
            <p className="text-[13px] text-so-ink-3 mb-4">{story.founder}</p>
            <p className="text-[14px] leading-[1.7] text-so-ink-2 mb-6 flex-1">{story.story}</p>
            <Link
                href={`/startups/${story.id}`}
                className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-so-ink-3 hover:text-so-ink transition-colors"
            >
                Read full story <ArrowRight size={14} />
            </Link>
        </div>
    )
}

export default function AcceleratorPage() {
    return (
        <main className="relative overflow-x-clip isolate">
            <PageBackground className="z-0" />
            <PageHero
                palette="emerald"
                eyebrow="ShunyaTech Accelerator"
                title={
                    <>
                        Build your startup,{" "}
                        <span className="so-serif italic">your way.</span>
                    </>
                }
                description="A new kind of student accelerator. We empower founders with practical support, technical expertise, and real-world guidance-without the excessive costs."
            />

            {/* Quick facts + CTA strip */}
            <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                <div className="so-container">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                        <div>
                            <span className="so-eyebrow">A different approach to acceleration</span>
                            <h2 className="mt-5 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[24ch]">
                                Practical support, not{" "}
                                <span className="so-serif italic">expensive handholding.</span>
                            </h2>
                            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-[13.5px] text-so-ink-2">
                                <span className="inline-flex items-center gap-2">
                                    <Clock size={15} className="text-so-ink-3" /> Next Cohort: August 15, 2023
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <Users size={15} className="text-so-ink-3" /> 20 Startups Per Batch
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <GraduationCap size={15} className="text-so-ink-3" /> Student Founders
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                            <Link href="/submit" className="so-btn so-btn-primary">
                                Apply now <ArrowRight size={13} />
                            </Link>
                            <Link href="#program-details" className="so-btn so-btn-ghost">
                                Learn more
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Program Overview pillars */}
            <section id="program-details" className="relative z-[1] bg-so-surface so-section border-t border-so-line scroll-mt-20">
                <div className="so-container">
                    <span className="so-eyebrow">Program overview</span>
                    <h2 className="mt-5 mb-12 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[26ch]">
                        Built for student entrepreneurs who want to{" "}
                        <span className="so-serif italic">actually learn.</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {PILLARS.map((pillar) => {
                            const Icon = pillar.icon
                            return (
                                <div key={pillar.title} className="so-card p-8 h-full flex flex-col">
                                    <div className="flex items-center justify-center w-11 h-11 mb-6 rounded-xl bg-so-surface-2 text-so-ink">
                                        <Icon size={20} />
                                    </div>
                                    <h3 className="text-[19px] font-semibold text-so-ink mb-2 tracking-[-0.01em]">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-[14px] leading-[1.7] text-so-ink-2">{pillar.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Why we're different */}
            <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                <div className="so-container">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                        <div>
                            <span className="so-eyebrow">About ShunyaTech Accelerator</span>
                            <h2 className="mt-5 mb-6 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[18ch]">
                                Why we&apos;re{" "}
                                <span className="so-serif italic">different.</span>
                            </h2>
                            <div className="space-y-4 text-[15px] leading-[1.7] text-so-ink-2">
                                <p>
                                    ShunyaTech Accelerator was born from a simple observation: traditional accelerators are often too
                                    expensive for students and don&apos;t provide the practical, hands-on experience founders need.
                                </p>
                                <p>
                                    As a company that builds and manages our own products while serving clients, we have the expertise and
                                    connections to help student entrepreneurs succeed-without charging exorbitant fees or taking
                                    significant equity.
                                </p>
                                <p>
                                    Our approach is simple: we provide technical expertise, marketing guidance, and pitch preparation
                                    while you do the real-world work of building your business. This creates founders who truly understand
                                    their product and market.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {STATS.map((stat) => (
                                <div key={stat.label} className="so-card p-6">
                                    <div className="text-[28px] font-semibold text-so-ink tracking-[-0.02em]">{stat.value}</div>
                                    <p className="mt-2 text-[14px] font-medium text-so-ink">{stat.label}</p>
                                    <p className="text-[13px] text-so-ink-3">{stat.sub}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Traditional vs ShunyaTech */}
            <section className="relative z-[1] bg-so-surface so-section border-t border-so-line">
                <div className="so-container">
                    <span className="so-eyebrow">The comparison</span>
                    <h2 className="mt-5 mb-12 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[28ch]">
                        Traditional accelerators vs.{" "}
                        <span className="so-serif italic">ShunyaTech.</span>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-5">
                        <div className="so-card p-8">
                            <h3 className="text-[15px] font-semibold uppercase tracking-[0.08em] text-so-ink-3 mb-6">
                                Traditional Accelerators
                            </h3>
                            <ul className="space-y-4">
                                {TRADITIONAL.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <X size={18} className="text-so-ink-4 mt-0.5 shrink-0" />
                                        <p className="text-[14px] leading-[1.6] text-so-ink-2">{item}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="so-card p-8 border-emerald-600/30 bg-emerald-50/40 dark:bg-emerald-950/20">
                            <h3 className="text-[15px] font-semibold uppercase tracking-[0.08em] text-emerald-700 dark:text-emerald-400 mb-6">
                                ShunyaTech Approach
                            </h3>
                            <ul className="space-y-4">
                                {SHUNYA.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle size={18} className="text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                                        <p className="text-[14px] leading-[1.6] text-so-ink-2">{item}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* How we help */}
            <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                <div className="so-container">
                    <span className="so-eyebrow">How we help</span>
                    <h2 className="mt-5 mb-12 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[26ch]">
                        Support in the areas that matter most to{" "}
                        <span className="so-serif italic">early-stage startups.</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {HELP_AREAS.map((feature) => {
                            const Icon = feature.icon
                            return (
                                <div key={feature.title} className="so-card p-7 h-full flex flex-col">
                                    <div className="flex items-center justify-center w-11 h-11 mb-5 rounded-xl bg-so-surface-2 text-so-ink">
                                        <Icon size={20} />
                                    </div>
                                    <h3 className="text-[18px] font-semibold text-so-ink mb-2 tracking-[-0.01em]">{feature.title}</h3>
                                    <p className="text-[14px] leading-[1.7] text-so-ink-2 flex-1">{feature.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Our process */}
            <section className="relative z-[1] bg-so-surface so-section border-t border-so-line">
                <div className="so-container">
                    <span className="so-eyebrow">Our process</span>
                    <h2 className="mt-5 mb-12 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[26ch]">
                        How we work with student entrepreneurs to bring ideas{" "}
                        <span className="so-serif italic">to life.</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                        {PROCESS.map((phase) => {
                            const Icon = phase.icon
                            return (
                                <div key={phase.step} className="so-card p-6 h-full flex flex-col">
                                    <div className="flex items-center justify-center w-10 h-10 mb-5 rounded-xl bg-so-surface-2 text-so-ink">
                                        <Icon size={18} />
                                    </div>
                                    <span className="so-eyebrow">{phase.step}</span>
                                    <h3 className="mt-3 text-[16px] font-semibold text-so-ink mb-2 tracking-[-0.01em]">{phase.title}</h3>
                                    <p className="text-[13.5px] leading-[1.65] text-so-ink-2">{phase.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                <div className="so-container">
                    <span className="so-eyebrow">The team</span>
                    <h2 className="mt-5 mb-12 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[24ch]">
                        The professionals who help bring your startup vision{" "}
                        <span className="so-serif italic">to life.</span>
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        {TEAM.map((member) => (
                            <div key={member.name} className="so-card p-6">
                                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-so-surface-2 text-so-ink">
                                    <Users size={20} />
                                </div>
                                <h3 className="text-[16px] font-semibold text-so-ink tracking-[-0.01em]">{member.name}</h3>
                                <p className="text-[13.5px] text-emerald-700 dark:text-emerald-400">{member.role}</p>
                                <p className="text-[13px] text-so-ink-3 mt-1">{member.expertise}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8">
                        <Link href="/team" className="so-btn so-btn-ghost">
                            View full team <ArrowRight size={13} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Success stories */}
            <section className="relative z-[1] bg-so-surface so-section border-t border-so-line">
                <div className="so-container">
                    <span className="so-eyebrow">Success stories</span>
                    <h2 className="mt-5 mb-10 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[28ch]">
                        Student entrepreneurs who built with{" "}
                        <span className="so-serif italic">our guidance.</span>
                    </h2>

                    <Tabs defaultValue="all">
                        <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="tech">Tech</TabsTrigger>
                            <TabsTrigger value="health">Health</TabsTrigger>
                            <TabsTrigger value="edu">Education</TabsTrigger>
                        </TabsList>

                        <TabsContent value="all" className="mt-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {SUCCESS_STORIES.map((story) => (
                                    <StoryCard key={story.id} story={story} />
                                ))}
                            </div>
                        </TabsContent>
                        {(["tech", "health", "edu"] as const).map((cat) => (
                            <TabsContent key={cat} value={cat} className="mt-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    {SUCCESS_STORIES.filter((s) => s.category === cat).map((story) => (
                                        <StoryCard key={story.id} story={story} />
                                    ))}
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>

                    <div className="mt-10">
                        <Link href="/discover" className="so-btn so-btn-ghost">
                            Discover more startups <ArrowRight size={13} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                <div className="so-container">
                    <span className="so-eyebrow">What our founders say</span>
                    <h2 className="mt-5 mb-12 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[24ch]">
                        Heard directly from the student entrepreneurs who{" "}
                        <span className="so-serif italic">built with us.</span>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-5">
                        {TESTIMONIALS.map((t) => (
                            <figure key={t.author} className="so-card p-7 flex flex-col h-full">
                                <blockquote className="text-[15px] leading-[1.7] text-so-ink-2 italic flex-1">
                                    &ldquo;{t.quote}&rdquo;
                                </blockquote>
                                <figcaption className="mt-6 pt-5 border-t border-so-line">
                                    <p className="text-[14px] font-semibold text-so-ink">{t.author}</p>
                                    <p className="text-[13px] text-so-ink-3">{t.role}</p>
                                    <p className="text-[13px] text-emerald-700 dark:text-emerald-400">{t.company}</p>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            {/* How to apply */}
            <section className="relative z-[1] bg-so-surface so-section border-t border-so-line">
                <div className="so-container">
                    <span className="so-eyebrow">How to apply</span>
                    <h2 className="mt-5 mb-12 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[26ch]">
                        A simple process to get the support your startup{" "}
                        <span className="so-serif italic">needs.</span>
                    </h2>
                    <div className="grid md:grid-cols-4 gap-5">
                        {APPLY_STEPS.map((step) => {
                            const Icon = step.icon
                            return (
                                <div key={step.step} className="so-card p-7 h-full flex flex-col">
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-so-surface-2 text-so-ink">
                                            <Icon size={18} />
                                        </div>
                                        <span className="text-[28px] font-semibold text-so-ink-4 leading-none tracking-[-0.02em]">
                                            {step.step}
                                        </span>
                                    </div>
                                    <h3 className="text-[16px] font-semibold text-so-ink mb-2 tracking-[-0.01em]">{step.title}</h3>
                                    <p className="text-[13.5px] leading-[1.65] text-so-ink-2 flex-1">{step.description}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="mt-10">
                        <Link href="/submit" className="so-btn so-btn-primary">
                            Apply now <ArrowRight size={13} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="relative z-[1] bg-so-bg border-t border-so-line">
                <PageFAQ
                    items={FAQS.map((faq) => ({ q: faq.question, a: faq.answer }))}
                    eyebrow="FAQ"
                    title="Questions about"
                    titleAccent="our approach"
                    description="Everything you need to know about how the ShunyaTech Accelerator works."
                />
            </section>

            {/* Commitment + disclaimer */}
            <section className="relative z-[1] bg-so-surface so-section border-t border-so-line">
                <div className="so-container">
                    <div className="so-card p-[clamp(28px,4vw,56px)] max-w-3xl mx-auto">
                        <span className="so-eyebrow">Our commitment to founders</span>
                        <h2 className="mt-5 mb-5 text-[clamp(24px,3vw,34px)] tracking-[-0.025em] text-so-ink">
                            Committed to founder success and{" "}
                            <span className="so-serif italic">ethical practices.</span>
                        </h2>
                        <div className="space-y-3 text-[15px] leading-[1.7] text-so-ink-2 mb-8">
                            <p>ShunyaTech Accelerator Program is committed to founder success and ethical business practices.</p>
                            <p>
                                We do not claim any ownership of the ideas submitted on this platform. Any equity arrangement would be
                                explicitly agreed upon and only in cases where significant resources are provided.
                            </p>
                            <p>
                                Our mission is to make entrepreneurship accessible to students by providing practical support without
                                the financial barriers of traditional accelerators.
                            </p>
                        </div>

                        <div className="flex items-start gap-3 mb-8 p-4 rounded-xl bg-so-surface-2 border border-so-line">
                            <Checkbox id="terms" className="mt-0.5" />
                            <label htmlFor="terms" className="text-[13.5px] leading-[1.6] text-so-ink-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                I understand that ShunyaTech Accelerator Program is an advisory service and does not claim ownership of
                                my idea unless explicitly agreed upon through a separate equity agreement.
                            </label>
                        </div>

                        <Link href="/submit" className="so-btn so-btn-primary">
                            Submit your application <ArrowRight size={13} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                <div className="so-container">
                    <div className="so-card p-[clamp(32px,5vw,64px)] text-center flex flex-col items-center">
                        <span className="so-eyebrow">Next cohort starts August 15, 2023</span>
                        <h2 className="mt-5 mb-4 text-[clamp(28px,4vw,46px)] tracking-[-0.03em] text-so-ink max-w-[20ch]">
                            Ready to build your{" "}
                            <span className="so-serif italic">startup?</span>
                        </h2>
                        <p className="text-[15px] leading-[1.7] text-so-ink-2 max-w-[52ch] mb-8">
                            Get the practical support you need without breaking the bank or giving away your company.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-3 mb-10">
                            <Link href="/submit" className="so-btn so-btn-primary">
                                Apply now <ArrowRight size={13} />
                            </Link>
                            <Link href="/contactus" className="so-btn so-btn-ghost">
                                Contact us <ArrowRight size={13} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[13.5px] text-so-ink-2 w-full max-w-3xl">
                            <span className="inline-flex items-center justify-center gap-2">
                                <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400" /> Applications Open Year-Round
                            </span>
                            <span className="inline-flex items-center justify-center gap-2">
                                <Calendar size={16} className="text-emerald-600 dark:text-emerald-400" /> Next Cohort: August 15, 2023
                            </span>
                            <span className="inline-flex items-center justify-center gap-2">
                                <Users size={16} className="text-emerald-600 dark:text-emerald-400" /> Limited to 20 Startups Per Cohort
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
