"use client"

import Link from "next/link"
import { ReactNode } from "react"
import {
    Check, ArrowRight, X, Shield, Users,
    PenToolIcon as Tool, Code, MessageSquare, CheckCircle, HelpCircle
} from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { PageHero } from "@/components/landing/page-hero"
import { PageBackground } from "@/components/landing/page-background"
import { PageFAQ } from "@/components/landing/page-faq"

const VALUE_PROPS = [
    {
        icon: Shield,
        title: "Minimal Costs",
        description: "Pay only for the guidance you need, not for excessive handholding or standardized programs.",
    },
    {
        icon: Tool,
        title: "Practical Support",
        description: "Get hands-on technical help and marketing guidance tailored to your specific needs.",
    },
    {
        icon: Code,
        title: "Technical Expertise",
        description: "Access our development team to help build your MVP if you lack technical co-founders.",
    },
    {
        icon: Users,
        title: "Real-World Learning",
        description: "Do the fieldwork yourself with expert guidance, building skills that last a lifetime.",
    },
]

const TRADITIONAL = [
    "High monthly fees (₹25,000-50,000) regardless of actual support needed",
    "Significant equity requirements (5-10%) even for early-stage startups",
    "One-size-fits-all pricing that doesn't account for varying needs",
    "Long-term commitments with minimum 3-6 month contracts",
    "Hidden fees for additional services or resources",
]

const SHUNYA = [
    "Minimal guidance fees that are affordable for student entrepreneurs",
    "Small equity share (2-3%) only if significant development resources are needed",
    "Customized pricing based on your specific needs and resource requirements",
    "Flexible arrangements with no long-term commitments required",
    "Complete transparency with no hidden costs or surprise fees",
]

interface Tier {
    name: string
    price: string
    priceUnit: string
    tagline: string
    blurb: string
    badge?: string
    note: string
    cta: string
    note2: string
    features: string[]
    featured?: boolean
}

const GUIDANCE_TIERS: Tier[] = [
    {
        name: "Basic Guidance",
        price: "₹5,000",
        priceUnit: "/month",
        tagline: "For students who need strategic direction",
        blurb: "Perfect for student entrepreneurs who need expert advice but will handle execution themselves.",
        note: "No equity required",
        cta: "Get Started",
        note2: "No long-term contracts. Pay month-to-month.",
        features: [
            "Bi-weekly 1:1 mentorship sessions",
            "Business model refinement",
            "Market research guidance",
            "Pitch deck review & feedback",
            "Basic marketing strategy",
            "Access to resource library",
            "Email support",
        ],
    },
    {
        name: "Advanced Guidance",
        price: "₹8,500",
        priceUnit: "/month",
        tagline: "For startups needing comprehensive support",
        blurb: "Ideal for student entrepreneurs who need more intensive guidance and strategic support.",
        badge: "RECOMMENDED",
        note: "No equity required",
        cta: "Get Started",
        note2: "No long-term contracts. Pay month-to-month.",
        featured: true,
        features: [
            "Weekly 1:1 mentorship sessions",
            "All Basic Guidance features",
            "Detailed business model development",
            "Comprehensive marketing strategy",
            "Financial planning & projections",
            "Investor pitch preparation",
            "Networking introductions",
            "Priority email & phone support",
            "Monthly progress reviews",
        ],
    },
]

const DEV_TIERS: Tier[] = [
    {
        name: "Technical Consultation",
        price: "₹12,000",
        priceUnit: "/month",
        tagline: "Technical guidance without equity",
        blurb: "For student founders who need technical guidance but will handle development themselves or with their team.",
        note: "No equity required",
        cta: "Get Started",
        note2: "No long-term contracts. Pay month-to-month.",
        features: [
            "Weekly technical consultation",
            "Architecture planning",
            "Technology stack recommendations",
            "Code reviews",
            "Technical roadmap development",
            "Basic guidance features",
            "Development best practices",
            "Technical documentation support",
        ],
    },
    {
        name: "Full Development Support",
        price: "2-3%",
        priceUnit: "equity",
        tagline: "For non-technical founders needing MVP development",
        blurb: "Our development team will help build your MVP from scratch, with minimal equity instead of high upfront costs.",
        badge: "EQUITY OPTION",
        note: "No monthly fees",
        cta: "Apply Now",
        note2: "Application and project scoping required. Equity percentage based on project complexity.",
        featured: true,
        features: [
            "Full MVP development",
            "UI/UX design",
            "Product management",
            "Quality assurance testing",
            "Deployment & hosting setup",
            "Technical documentation",
            "Post-launch support (3 months)",
            "All guidance features",
            "Marketing & PR support",
            "Investor pitch preparation",
        ],
    },
]

interface ComparisonRow {
    feature: string
    basic: ReactNode
    advanced: ReactNode
    tech: ReactNode
    full: ReactNode
}

const ComX = () => <X size={18} className="text-so-ink-4 mx-auto" />
const ComCheck = () => <Check size={18} className="text-emerald-600 dark:text-emerald-400 mx-auto" />

const COMPARISON: ComparisonRow[] = [
    { feature: "Monthly Cost", basic: "₹5,000", advanced: "₹8,500", tech: "₹12,000", full: "Equity Only (2-3%)" },
    { feature: "Mentorship Sessions", basic: "Bi-weekly", advanced: "Weekly", tech: "Weekly", full: "Weekly" },
    { feature: "Business Strategy", basic: "Basic", advanced: "Comprehensive", tech: "Basic", full: "Comprehensive" },
    { feature: "Technical Support", basic: <ComX />, advanced: "Limited", tech: "Consultation Only", full: "Full Development" },
    { feature: "Marketing Support", basic: "Basic Strategy", advanced: "Comprehensive", tech: "Basic Strategy", full: "Comprehensive" },
    { feature: "Investor Connections", basic: <ComX />, advanced: "Limited", tech: <ComX />, full: "Yes" },
    { feature: "Pitch Preparation", basic: "Basic Feedback", advanced: "Full Preparation", tech: "Basic Feedback", full: "Full Preparation" },
    { feature: "MVP Development", basic: <ComX />, advanced: <ComX />, tech: <ComX />, full: <ComCheck /> },
    { feature: "Equity Required", basic: "None", advanced: "None", tech: "None", full: "2-3%" },
]

const FAQS = [
    {
        question: "Why is your pricing so much lower than traditional accelerators?",
        answer:
            "Traditional accelerators often provide standardized programs with significant overhead costs. Our approach is more focused and efficient-we provide only what you need, when you need it, without the excessive handholding or infrastructure costs.",
    },
    {
        question: "How does the equity arrangement work?",
        answer:
            "We only take equity (2-3%) when we provide significant development resources to build your MVP. The exact percentage depends on the complexity of your project. This equity is formalized through standard agreements that protect both parties.",
    },
    {
        question: "Can I upgrade or downgrade my plan?",
        answer:
            "Absolutely. As your needs change, you can easily move between our different support tiers. There's no penalty for changing plans, and we'll help you transition smoothly.",
    },
    {
        question: "Do you offer any discounts for students?",
        answer:
            "Our pricing is already designed to be accessible for student entrepreneurs. However, we may offer additional discounts for teams with exceptional ideas but very limited resources. Contact us to discuss your situation.",
    },
    {
        question: "What happens if I'm not satisfied with the support?",
        answer:
            "We believe in earning your business every month. If you're not satisfied, you can cancel your monthly plan at any time. For equity arrangements, we establish clear deliverables and milestones before beginning work.",
    },
    {
        question: "How long does MVP development typically take?",
        answer:
            "The timeline varies based on the complexity of your product, but most MVPs take 2-4 months to develop. We'll provide a more specific estimate after understanding your requirements during the initial consultation.",
    },
]

const TESTIMONIALS = [
    {
        quote:
            "As a student with limited funds, traditional accelerators were out of reach. ShunyaTech's affordable guidance helped me launch my startup without breaking the bank.",
        author: "Ankit Patel",
        role: "Engineering Student",
        company: "Founder, RoboAssist",
    },
    {
        quote:
            "The equity arrangement for MVP development was perfect for me as a non-technical founder. I got a high-quality product without the massive upfront costs.",
        author: "Meera Shah",
        role: "Business Student",
        company: "CEO, FinEase",
    },
    {
        quote:
            "Their approach is refreshingly different. I paid only for the guidance I needed, did the fieldwork myself, and learned invaluable skills in the process.",
        author: "Li Wei",
        role: "Computer Science Student",
        company: "Co-founder, DataSync",
    },
]

function TierCard({ tier }: { tier: Tier }) {
    return (
        <div
            className={`so-card p-8 flex flex-col h-full ${tier.featured ? "border-emerald-600/30 bg-emerald-50/40 dark:bg-emerald-950/20" : ""}`}
        >
            {tier.badge && (
                <span className="inline-flex self-start items-center mb-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-900/40 px-2.5 py-1 rounded-full">
                    {tier.badge}
                </span>
            )}
            <h3 className="text-[22px] font-semibold text-so-ink tracking-[-0.015em]">{tier.name}</h3>
            <div className="flex items-baseline gap-1 mt-2">
                <span className="text-[36px] font-semibold text-so-ink tracking-[-0.02em]">{tier.price}</span>
                <span className="text-[14px] text-so-ink-3">{tier.priceUnit}</span>
            </div>
            <p className="text-[14px] text-so-ink-2 mt-2">{tier.tagline}</p>

            <p className="text-[13.5px] leading-[1.65] text-so-ink-2 mt-5">{tier.blurb}</p>
            <div className="flex items-center gap-2 text-[13.5px] font-medium text-emerald-700 dark:text-emerald-400 mt-3">
                <Check size={15} />
                <span>{tier.note}</span>
            </div>

            <h4 className="so-eyebrow mt-7 mb-4">What&apos;s Included</h4>
            <ul className="space-y-3 flex-1">
                {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                        <Check size={17} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-[14px] text-so-ink-2">{feature}</span>
                    </li>
                ))}
            </ul>

            <div className="mt-7">
                <Link href="/submit" className="so-btn so-btn-primary w-full justify-center">
                    {tier.cta} <ArrowRight size={13} />
                </Link>
                <p className="text-[12px] text-center text-so-ink-3 mt-3">{tier.note2}</p>
            </div>
        </div>
    )
}

export default function PricingPage() {
    return (
        <main className="relative overflow-x-clip isolate">
            <PageBackground className="z-0" />
            <PageHero
                palette="emerald"
                eyebrow="Accelerator Pricing"
                title={
                    <>
                        Affordable support for student{" "}
                        <span className="so-serif italic">entrepreneurs.</span>
                    </>
                }
                description="Get the guidance and technical help you need without the excessive costs of traditional accelerators."
            />

            {/* CTA strip */}
            <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                <div className="so-container">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                        <div>
                            <span className="so-eyebrow">Why our approach is different</span>
                            <h2 className="mt-5 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[24ch]">
                                You shouldn&apos;t have to break the bank to{" "}
                                <span className="so-serif italic">get started.</span>
                            </h2>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                            <Link href="#pricing-options" className="so-btn so-btn-primary">
                                View pricing options <ArrowRight size={13} />
                            </Link>
                            <Link href="/contactus" className="so-btn so-btn-ghost">
                                Contact for custom plans
                            </Link>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
                        {VALUE_PROPS.map((feature) => {
                            const Icon = feature.icon
                            return (
                                <div key={feature.title} className="so-card p-7 h-full flex flex-col">
                                    <div className="flex items-center justify-center w-11 h-11 mb-5 rounded-xl bg-so-surface-2 text-so-ink">
                                        <Icon size={20} />
                                    </div>
                                    <h3 className="text-[17px] font-semibold text-so-ink mb-2 tracking-[-0.01em]">{feature.title}</h3>
                                    <p className="text-[14px] leading-[1.7] text-so-ink-2">{feature.description}</p>
                                </div>
                            )
                        })}
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

            {/* Pricing options */}
            <section id="pricing-options" className="relative z-[1] bg-so-bg so-section border-t border-so-line scroll-mt-20">
                <div className="so-container">
                    <span className="so-eyebrow">Flexible support options</span>
                    <h2 className="mt-5 mb-10 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[26ch]">
                        Choose the level of support that fits your needs and{" "}
                        <span className="so-serif italic">budget.</span>
                    </h2>

                    <Tabs defaultValue="guidance" className="max-w-5xl">
                        <TabsList>
                            <TabsTrigger value="guidance">Guidance Only</TabsTrigger>
                            <TabsTrigger value="development">Technical Development</TabsTrigger>
                        </TabsList>

                        <TabsContent value="guidance" className="mt-8">
                            <div className="grid md:grid-cols-2 gap-5">
                                {GUIDANCE_TIERS.map((tier) => (
                                    <TierCard key={tier.name} tier={tier} />
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="development" className="mt-8">
                            <div className="grid md:grid-cols-2 gap-5">
                                {DEV_TIERS.map((tier) => (
                                    <TierCard key={tier.name} tier={tier} />
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            {/* Comparison table */}
            <section className="relative z-[1] bg-so-surface so-section border-t border-so-line">
                <div className="so-container">
                    <span className="so-eyebrow">Detailed plan comparison</span>
                    <h2 className="mt-5 mb-12 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[26ch]">
                        Compare our plans to find the perfect fit for your{" "}
                        <span className="so-serif italic">startup.</span>
                    </h2>

                    <div className="so-card overflow-x-auto">
                        <table className="w-full border-collapse text-[14px]">
                            <thead>
                                <tr className="border-b border-so-line">
                                    <th className="p-4 text-left so-eyebrow w-1/4">Features</th>
                                    <th className="p-4 text-center so-eyebrow">Basic Guidance</th>
                                    <th className="p-4 text-center so-eyebrow">Advanced Guidance</th>
                                    <th className="p-4 text-center so-eyebrow">Technical Consultation</th>
                                    <th className="p-4 text-center so-eyebrow">Full Development</th>
                                </tr>
                            </thead>
                            <tbody>
                                {COMPARISON.map((row, index) => (
                                    <tr key={index} className="border-b border-so-line last:border-0">
                                        <td className="p-4 font-medium text-so-ink">
                                            {row.feature}
                                            {row.feature === "Equity Required" && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <HelpCircle size={15} className="text-so-ink-4 inline ml-1.5 align-middle" />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p className="w-60 text-sm">
                                                                Equity is only required for the Full Development option where we commit significant
                                                                resources to build your MVP.
                                                            </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </td>
                                        <td className="p-4 text-center text-so-ink-2">{row.basic}</td>
                                        <td className="p-4 text-center text-so-ink-2">{row.advanced}</td>
                                        <td className="p-4 text-center text-so-ink-2">{row.tech}</td>
                                        <td className="p-4 text-center text-so-ink-2">{row.full}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Custom solutions */}
            <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                <div className="so-container">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                        <div>
                            <span className="so-eyebrow">Need a custom solution?</span>
                            <h2 className="mt-5 mb-6 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[20ch]">
                                Every startup is{" "}
                                <span className="so-serif italic">unique.</span>
                            </h2>
                            <p className="text-[15px] leading-[1.7] text-so-ink-2 mb-8 max-w-[52ch]">
                                If our standard plans don&apos;t fit your specific needs, we&apos;re happy to create a custom package tailored
                                to your requirements and budget.
                            </p>
                            <div className="space-y-5">
                                {[
                                    {
                                        title: "Mix and Match Services",
                                        desc: "Combine different aspects of our plans to create your ideal support package",
                                    },
                                    {
                                        title: "Flexible Payment Options",
                                        desc: "We can work with your budget constraints to find a solution that works",
                                    },
                                    {
                                        title: "Hybrid Models",
                                        desc: "Combine fee-based and equity-based approaches for the perfect balance",
                                    },
                                ].map((item) => (
                                    <div key={item.title} className="flex items-start gap-3">
                                        <Check size={18} className="text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                                        <div>
                                            <h4 className="text-[15px] font-semibold text-so-ink">{item.title}</h4>
                                            <p className="text-[14px] leading-[1.6] text-so-ink-2">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8">
                                <Link href="/contactus" className="so-btn so-btn-primary">
                                    Schedule a consultation <ArrowRight size={13} />
                                </Link>
                            </div>
                        </div>
                        <figure className="so-card p-8 lg:mt-2">
                            <MessageSquare size={22} className="text-so-ink-3 mb-4" />
                            <blockquote className="text-[16px] leading-[1.7] text-so-ink italic">
                                &ldquo;They created a custom plan that perfectly fit my needs and budget as a student entrepreneur.&rdquo;
                            </blockquote>
                            <figcaption className="text-[13px] text-so-ink-3 mt-4">- Rahul M., Engineering Student</figcaption>
                        </figure>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="relative z-[1] bg-so-surface border-t border-so-line">
                <PageFAQ
                    items={FAQS.map((faq) => ({ q: faq.question, a: faq.answer }))}
                    eyebrow="FAQ"
                    title="Pricing,"
                    titleAccent="explained"
                    description="Common questions about our pricing and support options."
                />
            </section>

            {/* Testimonials */}
            <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                <div className="so-container">
                    <span className="so-eyebrow">What our founders say</span>
                    <h2 className="mt-5 mb-12 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[26ch]">
                        Founders who have experienced our affordable support{" "}
                        <span className="so-serif italic">model.</span>
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

            {/* Transparency guarantee */}
            <section className="relative z-[1] bg-so-surface so-section border-t border-so-line">
                <div className="so-container">
                    <div className="so-card p-[clamp(28px,4vw,56px)] max-w-3xl mx-auto text-center flex flex-col items-center">
                        <div className="flex items-center justify-center w-14 h-14 mb-6 rounded-full bg-so-surface-2 text-emerald-600 dark:text-emerald-400">
                            <Shield size={26} />
                        </div>
                        <span className="so-eyebrow">Our transparency guarantee</span>
                        <h2 className="mt-5 mb-4 text-[clamp(24px,3vw,34px)] tracking-[-0.025em] text-so-ink">
                            No hidden fees, no surprise{" "}
                            <span className="so-serif italic">costs.</span>
                        </h2>
                        <p className="text-[15px] leading-[1.7] text-so-ink-2 max-w-[56ch] mb-6">
                            We believe in complete transparency in our pricing and agreements. There are no hidden fees, no surprise
                            costs, and no pressure to give up equity unless it makes sense for your specific situation.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-[13.5px] text-so-ink-2">
                            <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                            <span>All terms and expectations are clearly documented before we begin working together.</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                <div className="so-container">
                    <div className="so-card p-[clamp(32px,5vw,64px)] text-center flex flex-col items-center">
                        <span className="so-eyebrow">Start building today</span>
                        <h2 className="mt-5 mb-4 text-[clamp(28px,4vw,46px)] tracking-[-0.03em] text-so-ink max-w-[20ch]">
                            Ready to build your{" "}
                            <span className="so-serif italic">startup?</span>
                        </h2>
                        <p className="text-[15px] leading-[1.7] text-so-ink-2 max-w-[52ch] mb-8">
                            Get the support you need without the excessive costs of traditional accelerators.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                            <Link href="/submit" className="so-btn so-btn-primary">
                                Apply now <ArrowRight size={13} />
                            </Link>
                            <Link href="/contactus" className="so-btn so-btn-ghost">
                                Schedule a consultation <ArrowRight size={13} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
