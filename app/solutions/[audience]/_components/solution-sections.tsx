"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
    ArrowRight,
    AlertTriangle,
    Check,
    Globe,
    Smartphone,
    Bot,
    Cloud,
    Layout,
    Shield,
    type LucideIcon,
} from "lucide-react"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/landing/animations"
import { PageFAQ } from "@/components/landing/page-faq"
import { CardVisual } from "@/components/landing/card-visuals"
import { ExamCard, VouchingScan, ReportDraft, DeadlineCard } from "@/components/landing/illustrations"
import { PRICING, formatPrice, startingPrice } from "@/content/pricing"
import { getServiceBySlug } from "@/content/services"
import type { UseCase, ServiceSlug } from "@/content/use-cases"

/* ------------------------------------------------------------------ */
/* Inline SVG illustrations                                            */
/* ------------------------------------------------------------------ */

/** A blueprint-style grid with a glowing build path - "we architect & ship". */
function BlueprintIllustration({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 480 280" fill="none" className={className} role="img" aria-label="Architecture blueprint">
            <defs>
                <linearGradient id="bp-stroke" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="currentColor" stopOpacity="0.9" />
                    <stop offset="1" stopColor="currentColor" stopOpacity="0.35" />
                </linearGradient>
                <pattern id="bp-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M32 0H0V32" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
                </pattern>
            </defs>
            <rect x="0.5" y="0.5" width="479" height="279" rx="16" stroke="currentColor" strokeOpacity="0.12" />
            <rect x="1" y="1" width="478" height="278" rx="16" fill="url(#bp-grid)" />

            {/* nodes */}
            {[
                { x: 70, y: 70, label: "UI" },
                { x: 240, y: 56, label: "API" },
                { x: 240, y: 150, label: "DB" },
                { x: 400, y: 70, label: "Cloud" },
                { x: 150, y: 210, label: "Auth" },
                { x: 360, y: 200, label: "CI/CD" },
            ].map((n) => (
                <g key={n.label}>
                    <rect x={n.x - 34} y={n.y - 18} width="68" height="36" rx="9" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.25" />
                    <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill="currentColor" fillOpacity="0.7">
                        {n.label}
                    </text>
                </g>
            ))}

            {/* animated connecting paths */}
            {[
                "M104 70 L206 58",
                "M240 74 L240 132",
                "M274 64 L366 70",
                "M104 78 L150 192",
                "M274 150 L334 192",
            ].map((d, i) => (
                <motion.path
                    key={d}
                    d={d}
                    stroke="url(#bp-stroke)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeDasharray="4 6"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.15 * i, ease: "easeInOut" }}
                />
            ))}
        </svg>
    )
}

/** Audience-appropriate process visual for the approach section. */
function ApproachVisual({ slug }: { slug: string }) {
    if (slug === "product-teams") return <ExamCard className="max-w-[360px] ml-auto" />
    if (slug === "enterprises") return <VouchingScan className="max-w-[360px] ml-auto" />
    if (slug === "businesses") return <ReportDraft className="max-w-[360px] ml-auto" />
    return <DeadlineCard className="max-w-[360px] ml-auto" />
}

/* ------------------------------------------------------------------ */
/* Pains                                                              */
/* ------------------------------------------------------------------ */

export function SolutionPains({ useCase }: { useCase: UseCase }) {
    const audienceLabel = useCase.label.replace(/^For /, "").toLowerCase()
    return (
        <section className="so-section border-t border-so-line">
            <div className="so-container">
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-center mb-12">
                    <FadeIn>
                        <span className="so-eyebrow">The problem</span>
                        <h2 className="mt-5 mb-4 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[22ch]">
                            What gets in the way{" "}
                            <span className="so-serif italic">today.</span>
                        </h2>
                        <p className="text-[15px] leading-[1.75] text-so-ink-2 max-w-[48ch]">
                            Before we talk about what we build, it&apos;s worth naming what&apos;s actually slowing you down. These are the recurring blockers we hear from {audienceLabel} - and the ones the rest of this page is built to solve.
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.1} className="text-so-ink">
                        <div className="so-card p-6 lg:p-8">
                            <BlueprintIllustration className="w-full h-auto" />
                        </div>
                    </FadeIn>
                </div>
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {useCase.pains.map((pain) => (
                        <StaggerItem key={pain.title}>
                            <div className="so-card p-7 h-full flex gap-4">
                                <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-so-surface-2 text-so-ink-3">
                                    <AlertTriangle size={18} />
                                </div>
                                <div>
                                    <h3 className="text-[16.5px] font-semibold text-so-ink mb-1.5">{pain.title}</h3>
                                    <p className="text-[14px] leading-[1.7] text-so-ink-2">{pain.body}</p>
                                </div>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/* How Shunya helps (with blueprint illustration)                     */
/* ------------------------------------------------------------------ */

export function SolutionHelps({ useCase }: { useCase: UseCase }) {
    const audienceWord = useCase.label.replace(/^For /, "").toLowerCase()
    return (
        <section className="so-section bg-so-surface border-t border-so-line">
            <div className="so-container">
                <span className="so-eyebrow">How Shunya helps</span>
                <h2 className="mt-5 mb-10 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[24ch]">
                    Engineering built{" "}
                    <span className="so-serif italic">{audienceWord}.</span>
                </h2>

                <FadeIn className="mb-12">
                    <div className="so-card overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] items-center">
                            <div className="p-8 lg:p-10">
                                <p className="text-[15px] leading-[1.75] text-so-ink-2">
                                    {useCase.summary}
                                </p>
                            </div>
                            <div className="relative p-6 lg:p-8 bg-so-surface-2/40 border-t lg:border-t-0 lg:border-l border-so-line text-so-ink flex items-center justify-center">
                                <CardVisual name={useCase.slug} className="w-full max-w-[420px]" />
                            </div>
                        </div>
                    </div>
                </FadeIn>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {useCase.howShunyaHelps.map((feature) => (
                        <StaggerItem key={feature.title}>
                            <div className="so-card p-7 h-full flex flex-col">
                                <div className="flex items-center justify-center w-9 h-9 mb-5 rounded-full bg-so-surface-2 text-so-ink">
                                    <Check size={17} />
                                </div>
                                <h3 className="text-[16px] font-semibold text-so-ink mb-2">{feature.title}</h3>
                                <p className="text-[13.5px] leading-[1.65] text-so-ink-2">{feature.body}</p>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/* Approach - process steps with a connecting timeline                */
/* ------------------------------------------------------------------ */

export function SolutionApproach({ useCase }: { useCase: UseCase }) {
    return (
        <section className="so-section border-t border-so-line">
            <div className="so-container">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(260px,360px)] gap-10 lg:gap-16 items-center mb-12">
                    <FadeIn>
                        <span className="so-eyebrow">How we&apos;d work with you</span>
                        <h2 className="mt-5 mb-4 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[24ch]">
                            A clear path from{" "}
                            <span className="so-serif italic">first call to live.</span>
                        </h2>
                        <p className="text-[15px] leading-[1.75] text-so-ink-2 max-w-[48ch]">
                            No mystery, no black box. You see a written scope up front and working software at the end of every sprint, so you always know where the project stands and where the budget is going.
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <ApproachVisual slug={useCase.slug} />
                    </FadeIn>
                </div>

                <div className="relative">
                    {/* connecting line on large screens */}
                    <div
                        className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-so-line"
                        aria-hidden
                    />
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {useCase.approach.map((step) => (
                            <StaggerItem key={step.step}>
                                <div className="relative h-full">
                                    <div className="relative z-[1] flex items-center justify-center w-12 h-12 mb-5 rounded-full bg-so-bg border border-so-line text-[15px] font-semibold text-so-ink so-serif">
                                        {step.step}
                                    </div>
                                    <div className="so-card p-6 h-full">
                                        <h3 className="text-[16px] font-semibold text-so-ink mb-2">{step.title}</h3>
                                        <p className="text-[13.5px] leading-[1.65] text-so-ink-2">{step.body}</p>
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/* Stats strip                                                        */
/* ------------------------------------------------------------------ */

export function SolutionStats({ useCase }: { useCase: UseCase }) {
    return (
        <section className="border-t border-so-line bg-so-surface-2/40">
            <div className="so-container py-[clamp(40px,6vw,72px)]">
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-5 text-center sm:text-left">
                    {useCase.stats.map((stat) => (
                        <StaggerItem key={stat.label}>
                            <div className="flex flex-col">
                                <span className="text-[clamp(34px,5vw,52px)] leading-none tracking-[-0.03em] text-so-ink so-serif">
                                    {stat.value}
                                </span>
                                <span className="mt-3 text-[14px] leading-[1.5] text-so-ink-2 max-w-[28ch] mx-auto sm:mx-0">
                                    {stat.label}
                                </span>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/* Relevant services cross-link grid                                  */
/* ------------------------------------------------------------------ */

const SERVICE_ICONS: Record<ServiceSlug, LucideIcon> = {
    "web-engineering": Globe,
    "mobile-ecology": Smartphone,
    "ai-integration": Bot,
    "cloud-architecture": Cloud,
    "ui-ux-systems": Layout,
    "system-security": Shield,
}

export function SolutionServices({ useCase }: { useCase: UseCase }) {
    const services = useCase.relevantServices
        .map((slug) => ({ slug, service: getServiceBySlug(slug) }))
        .filter((s): s is { slug: ServiceSlug; service: NonNullable<ReturnType<typeof getServiceBySlug>> } => Boolean(s.service))

    if (services.length === 0) return null

    return (
        <section className="so-section bg-so-surface border-t border-so-line">
            <div className="so-container">
                <span className="so-eyebrow">Relevant services</span>
                <h2 className="mt-5 mb-3 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[24ch]">
                    The capabilities behind{" "}
                    <span className="so-serif italic">the work.</span>
                </h2>
                <p className="text-[15px] leading-[1.7] text-so-ink-2 max-w-[56ch] mb-12">
                    One team owns the whole stack, but it&apos;s built from distinct, battle-tested capabilities. These are the ones that come up most for this kind of work - follow any of them for the full detail.
                </p>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {services.map(({ slug, service }) => {
                        const Icon = SERVICE_ICONS[slug]
                        return (
                            <StaggerItem key={slug}>
                                <Link
                                    href={`/services/${slug}`}
                                    className="group so-card p-7 h-full flex items-start gap-4 hover:shadow-md transition-all"
                                >
                                    <div className="flex items-center justify-center w-11 h-11 shrink-0 rounded-xl bg-so-surface-2 text-so-ink">
                                        <Icon size={19} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between gap-3">
                                            <h3 className="text-[16.5px] font-semibold text-so-ink">{service.name}</h3>
                                            <ArrowRight
                                                size={15}
                                                className="shrink-0 text-so-ink-3 group-hover:translate-x-0.5 group-hover:text-so-ink transition-all"
                                            />
                                        </div>
                                        <p className="mt-1.5 text-[13.5px] leading-[1.65] text-so-ink-2">{service.tagline}</p>
                                    </div>
                                </Link>
                            </StaggerItem>
                        )
                    })}
                </StaggerContainer>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/* Pricing snapshot                                                   */
/* ------------------------------------------------------------------ */

export function SolutionPricing({ useCase }: { useCase: UseCase }) {
    const domain = PRICING[useCase.pricingKey]
    if (!domain) return null

    const from = formatPrice(startingPrice(useCase.pricingKey), "USD")

    return (
        <section className="so-section border-t border-so-line">
            <div className="so-container">
                <span className="so-eyebrow">Pricing snapshot</span>
                <h2 className="mt-5 mb-3 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[24ch]">
                    Transparent pricing,{" "}
                    <span className="so-serif italic">no surprises.</span>
                </h2>
                <p className="text-[15px] leading-[1.7] text-so-ink-2 max-w-[56ch] mb-12">
                    {domain.title} projects start at{" "}
                    <span className="font-semibold text-so-ink">{from}</span>. Every engagement gets a
                    fixed, written scope before a line of code is written - see the full breakdown of tiers
                    and what each includes on our pricing page.
                </p>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {domain.tiers.map((tier) => (
                        <StaggerItem key={tier.name}>
                            <div
                                className={`so-card p-7 h-full flex flex-col ${
                                    tier.popular ? "ring-1 ring-so-ink/15" : ""
                                }`}
                            >
                                <div className="flex items-center justify-between gap-2 mb-4">
                                    <h3 className="text-[15px] font-semibold text-so-ink">{tier.name}</h3>
                                    {tier.popular && (
                                        <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-so-ink-3 border border-so-line rounded-full px-2.5 py-1">
                                            Popular
                                        </span>
                                    )}
                                </div>
                                <div className="mb-1 flex items-baseline gap-1.5">
                                    <span className="text-[28px] tracking-[-0.02em] text-so-ink so-serif">
                                        {formatPrice(tier.basePrice, "USD")}
                                    </span>
                                    <span className="text-[12px] text-so-ink-3">{tier.suffix}</span>
                                </div>
                                <p className="text-[13px] leading-[1.6] text-so-ink-2 mb-5">{tier.description}</p>
                                <ul className="space-y-2 mt-auto">
                                    {tier.features.slice(0, 4).map((f) => (
                                        <li key={f} className="flex items-start gap-2 text-[13px] text-so-ink-2">
                                            <Check size={14} className="shrink-0 mt-0.5 text-so-ink-3" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                <div className="mt-8">
                    <Link href="/pricing" className="so-btn so-btn-ghost">
                        See full pricing <ArrowRight size={13} />
                    </Link>
                </div>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/* FAQ - uses the shared landing-style PageFAQ                        */
/* ------------------------------------------------------------------ */

export function SolutionFaq({ useCase }: { useCase: UseCase }) {
    return (
        <section className="border-t border-so-line bg-so-surface">
            <PageFAQ
                items={useCase.faqs}
                eyebrow="FAQ"
                title="Questions,"
                titleAccent="answered"
                description={`What ${useCase.label.replace(/^For /, "").toLowerCase()} usually want to know before starting a project with Shunya.`}
            />
        </section>
    )
}

/* ------------------------------------------------------------------ */
/* CTA                                                                */
/* ------------------------------------------------------------------ */

/** Decorative animated concentric rings behind the CTA - draws in on view. */
function CtaGlow() {
    return (
        <svg
            aria-hidden
            viewBox="0 0 600 300"
            className="pointer-events-none absolute inset-0 h-full w-full text-so-ink/[0.07]"
            preserveAspectRatio="xMidYMid slice"
        >
            {[60, 120, 180, 240].map((r, i) => (
                <motion.circle
                    key={r}
                    cx="300"
                    cy="150"
                    r={r}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.1 * i, ease: "easeOut" }}
                    style={{ transformOrigin: "300px 150px" }}
                />
            ))}
        </svg>
    )
}

export function SolutionCta({ useCase }: { useCase: UseCase }) {
    return (
        <section className="so-section bg-so-surface border-t border-so-line">
            <div className="so-container">
                <div className="so-card relative overflow-hidden p-[clamp(32px,5vw,64px)] text-center flex flex-col items-center">
                    <CtaGlow />
                    <span className="relative so-eyebrow">Get started</span>
                    <h2 className="relative mt-5 mb-4 text-[clamp(28px,4vw,46px)] tracking-[-0.03em] text-so-ink max-w-[20ch]">
                        Let&apos;s build something{" "}
                        <span className="so-serif italic">that ships.</span>
                    </h2>
                    <p className="relative text-[15px] leading-[1.7] text-so-ink-2 max-w-[52ch] mb-8">
                        One team that owns everything from concept to production. Tell us what you&apos;re building and we&apos;ll scope it in weeks - then start shipping real software.
                    </p>
                    <div className="relative flex flex-col sm:flex-row items-center gap-3">
                        <Link href={useCase.cta.href} className="so-btn so-btn-primary">
                            {useCase.cta.label} <ArrowRight size={13} />
                        </Link>
                        <Link href={useCase.cta.secondaryHref} className="so-btn so-btn-ghost">
                            {useCase.cta.secondaryLabel} <ArrowRight size={13} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
