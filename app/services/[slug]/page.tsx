import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
    Globe, Smartphone, Bot, Cloud, Layout, Shield,
    ArrowRight, Check, Zap, Crown, Sparkles,
} from "lucide-react"
import { SITE_URL, SITE_NAME } from "@/lib/site"
import { PageHero } from "@/components/landing/page-hero"
import { PageBackground } from "@/components/landing/page-background"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/landing/animations"
import { PageFAQ } from "@/components/landing/page-faq"
import {
    StreamingChat, VouchingScan, MiniBarChart, LangToggle, ExamCard, ReportDraft,
} from "@/components/landing/illustrations"
import { CardVisual } from "@/components/landing/card-visuals"
import { SectionDivider } from "./_section-divider"
import {
    SERVICE_SLUGS, getServiceBySlug, type ServiceIconKey,
} from "@/content/services"
import { PRICING, formatPrice, type PricingTier } from "@/content/pricing"

const ICONS: Record<ServiceIconKey, typeof Globe> = {
    globe: Globe,
    smartphone: Smartphone,
    bot: Bot,
    cloud: Cloud,
    layout: Layout,
    shield: Shield,
}

const TIER_ICONS = { zap: Zap, shield: Shield, crown: Crown } as const

interface PageProps {
    params: Promise<{ slug: string }>
}

export function generateStaticParams() {
    return SERVICE_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const service = getServiceBySlug(slug)
    if (!service) return { title: `Services - ${SITE_NAME}` }

    const url = `${SITE_URL}/services/${slug}`
    return {
        title: service.seoTitle,
        description: service.seoDescription,
        alternates: { canonical: url },
        openGraph: {
            title: service.seoTitle,
            description: service.seoDescription,
            url,
            type: "website",
            siteName: SITE_NAME,
        },
        twitter: {
            card: "summary_large_image",
            title: service.seoTitle,
            description: service.seoDescription,
        },
    }
}

export default async function ServiceDetailPage({ params }: PageProps) {
    const { slug } = await params
    const service = getServiceBySlug(slug)
    if (!service) notFound()

    const Icon = ICONS[service.icon]
    const url = `${SITE_URL}/services/${slug}`
    const pricing = service.pricingKey ? PRICING[service.pricingKey] : undefined

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.name,
        description: service.seoDescription,
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        areaServed: "Worldwide",
        url,
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
            { "@type": "ListItem", position: 3, name: service.name, item: url },
        ],
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <main className="relative overflow-x-clip isolate">
                <PageBackground className="z-0" />
                <PageHero
                    palette="jade"
                    eyebrow={service.eyebrow}
                    title={
                        <>
                            {service.heroTitle}
                        </>
                    }
                    description={service.heroDescription}
                />

                {/* breadcrumb strip */}
                <div className="relative z-[1] bg-so-bg border-t border-so-line">
                    <div className="so-container py-4">
                        <nav className="flex items-center gap-2 font-mono text-[12px] text-so-ink-4">
                            <Link href="/" className="hover:text-so-ink transition-colors">Home</Link>
                            <span>/</span>
                            <Link href="/services" className="hover:text-so-ink transition-colors">Services</Link>
                            <span>/</span>
                            <span className="text-so-ink-2">{service.name}</span>
                        </nav>
                    </div>
                </div>

                {/* ── Overview ── */}
                <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                    <div className="so-container">
                        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-center">
                            <FadeIn>
                                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-so-surface-2 text-so-ink border border-so-line mb-6">
                                    <Icon className="w-7 h-7" />
                                </div>
                                <span className="so-eyebrow">Overview</span>
                                <h2 className="mt-5 mb-6 text-[clamp(24px,3vw,36px)] tracking-[-0.025em] text-so-ink max-w-[20ch]">
                                    {service.name}
                                </h2>
                                <p className="text-[15px] leading-[1.8] text-so-ink-2 max-w-[60ch]">
                                    {service.summary}
                                </p>
                            </FadeIn>
                            <FadeIn delay={0.1}>
                                <ServiceGlyph slug={service.slug} icon={service.icon} />
                            </FadeIn>
                        </div>
                    </div>
                </section>

                <SectionDivider />

                {/* ── What We Deliver ── */}
                <section className="relative z-[1] bg-so-surface so-section border-t border-so-line">
                    <div className="so-container">
                        <span className="so-eyebrow">What we deliver</span>
                        <h2 className="mt-5 mb-12 text-[clamp(24px,3vw,36px)] tracking-[-0.025em] text-so-ink max-w-[24ch]">
                            Everything that lands in your{" "}
                            <span className="so-serif italic">hands.</span>
                        </h2>
                        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {service.whatWeDeliver.map((item) => (
                                <StaggerItem key={item}>
                                    <div className="so-card p-5 flex items-start gap-4 h-full">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-so-ink text-so-bg shrink-0 mt-0.5">
                                            <Check className="w-3.5 h-3.5" />
                                        </span>
                                        <span className="text-[14.5px] leading-[1.6] text-so-ink-2">{item}</span>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </section>

                {/* ── Process ── */}
                <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                    <div className="so-container">
                        <FadeIn className="mb-12 flex justify-end">
                            <ProcessVisual slug={service.slug} />
                        </FadeIn>
                        <span className="so-eyebrow">Our process</span>
                        <h2 className="mt-5 mb-12 text-[clamp(24px,3vw,36px)] tracking-[-0.025em] text-so-ink max-w-[24ch]">
                            How we ship it,{" "}
                            <span className="so-serif italic">step by step.</span>
                        </h2>
                        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            {service.process.map((p) => (
                                <StaggerItem key={p.step} className="h-full">
                                    <div className="so-card p-7 h-full flex flex-col">
                                        <span className="font-mono text-[28px] font-semibold tracking-[-0.02em] text-so-ink-4 mb-4">
                                            {p.step}
                                        </span>
                                        <h3 className="text-[17px] font-semibold text-so-ink mb-2.5 tracking-[-0.01em]">
                                            {p.title}
                                        </h3>
                                        <p className="text-[13.5px] leading-[1.7] text-so-ink-2">
                                            {p.body}
                                        </p>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </section>

                {/* ── Use Cases ── */}
                <section className="relative z-[1] bg-so-surface so-section border-t border-so-line">
                    <div className="so-container">
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center mb-12">
                            <FadeIn>
                                <span className="so-eyebrow">Where it fits</span>
                                <h2 className="mt-5 mb-4 text-[clamp(24px,3vw,36px)] tracking-[-0.025em] text-so-ink max-w-[20ch]">
                                    Real scenarios this{" "}
                                    <span className="so-serif italic">unblocks.</span>
                                </h2>
                                <p className="text-[14.5px] leading-[1.7] text-so-ink-2 max-w-[46ch]">
                                    Most teams arrive with one of a handful of problems. Here are the ones we solve most often with {service.name.toLowerCase()} - and what changes once we do.
                                </p>
                            </FadeIn>
                            <FadeIn delay={0.1}>
                                <UseCaseVisual slug={service.slug} />
                            </FadeIn>
                        </div>
                        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {service.useCases.map((uc, i) => (
                                <StaggerItem key={uc.title} className="h-full">
                                    <div className="so-card p-7 h-full flex flex-col">
                                        <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-so-ink-4 mb-3">
                                            Case {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <h3 className="text-[17px] font-semibold text-so-ink mb-2.5 tracking-[-0.01em]">
                                            {uc.title}
                                        </h3>
                                        <p className="text-[13.5px] leading-[1.7] text-so-ink-2">
                                            {uc.body}
                                        </p>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </section>

                <SectionDivider />

                {/* ── Tech Stack ── */}
                <section className="relative z-[1] bg-so-surface so-section border-t border-so-line">
                    <div className="so-container">
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
                            <FadeIn>
                                <span className="so-eyebrow">Tech stack</span>
                                <h2 className="mt-5 mb-4 text-[clamp(24px,3vw,36px)] tracking-[-0.025em] text-so-ink max-w-[16ch]">
                                    The tools behind the{" "}
                                    <span className="so-serif italic">work.</span>
                                </h2>
                                <p className="text-[14.5px] leading-[1.7] text-so-ink-2 max-w-[42ch]">
                                    We pick proven, modern technology - not whatever is trending - so what we build stays maintainable long after launch.
                                </p>
                            </FadeIn>
                            <FadeIn delay={0.1}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {service.techGroups.map((g) => (
                                        <div key={g.group} className="so-card p-5">
                                            <h3 className="font-mono text-[11px] uppercase tracking-[0.1em] text-so-ink-4 mb-3">
                                                {g.group}
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {g.items.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="inline-flex items-center rounded-full border border-so-line bg-so-bg px-3 py-1.5 text-[12.5px] font-medium text-so-ink-2"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                <SectionDivider />

                {/* ── Outcomes ── */}
                <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                    <div className="so-container">
                        <span className="so-eyebrow">Outcomes</span>
                        <h2 className="mt-5 mb-12 text-[clamp(24px,3vw,36px)] tracking-[-0.025em] text-so-ink max-w-[22ch]">
                            What you can{" "}
                            <span className="so-serif italic">expect.</span>
                        </h2>
                        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            {service.outcomes.map((o) => (
                                <StaggerItem key={o.label}>
                                    <div className="so-card p-8 text-center h-full flex flex-col items-center justify-center">
                                        <span className="text-[clamp(34px,5vw,52px)] font-semibold tracking-[-0.03em] text-so-ink leading-none mb-3">
                                            {o.value}
                                        </span>
                                        <span className="text-[13.5px] leading-[1.5] text-so-ink-2 max-w-[18ch]">
                                            {o.label}
                                        </span>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </section>

                {/* ── Pricing ── */}
                <section className="relative z-[1] bg-so-surface so-section border-t border-so-line">
                    <div className="so-container">
                        <span className="so-eyebrow">Investment</span>
                        <h2 className="mt-5 mb-3 text-[clamp(24px,3vw,36px)] tracking-[-0.025em] text-so-ink max-w-[22ch]">
                            Transparent pricing,{" "}
                            <span className="so-serif italic">no quote walls.</span>
                        </h2>
                        <p className="text-[14.5px] leading-[1.7] text-so-ink-2 max-w-[52ch] mb-12">
                            {pricing
                                ? "Pick the tier that matches your stage. Final pricing depends on scope, complexity, and timeline - these are honest starting points in USD."
                                : "This capability is scoped per engagement. Tell us what you need and we'll put a concrete number on it."}
                        </p>

                        {pricing ? (
                            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {pricing.tiers.map((tier) => (
                                    <StaggerItem key={tier.name} className="h-full">
                                        <PricingCard tier={tier} />
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>
                        ) : (
                            <FadeIn className="so-card p-[clamp(28px,4vw,48px)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                                <div>
                                    <h3 className="text-[20px] font-semibold text-so-ink mb-2">Custom scope</h3>
                                    <p className="text-[14px] leading-[1.7] text-so-ink-2 max-w-[44ch]">
                                        Every engagement here is priced on its specifics. See our full rate card or request a tailored proposal.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                                    <Link href="/pricing" className="so-btn so-btn-primary justify-center">
                                        View pricing <ArrowRight size={13} />
                                    </Link>
                                    <Link href="/contactus" className="so-btn so-btn-ghost justify-center">
                                        Request proposal <ArrowRight size={13} />
                                    </Link>
                                </div>
                            </FadeIn>
                        )}

                        {pricing && (
                            <p className="mt-8 text-[13px] text-so-ink-4">
                                Need a different currency or a custom configuration?{" "}
                                <Link href="/pricing" className="text-so-ink-2 underline underline-offset-4 hover:text-so-ink transition-colors">
                                    See the full rate card
                                </Link>.
                            </p>
                        )}
                    </div>
                </section>

                {/* ── FAQ ── */}
                <section className="relative z-[1] bg-so-bg border-t border-so-line">
                    <PageFAQ
                        items={service.faqs}
                        eyebrow="FAQ"
                        title={`${service.name},`}
                        titleAccent="answered"
                        description={`Common questions about how we approach ${service.name.toLowerCase()}.`}
                    />
                </section>

                {/* ── CTA ── */}
                <section className="relative z-[1] bg-so-surface so-section border-t border-so-line">
                    <div className="so-container">
                        <FadeIn className="so-card p-[clamp(32px,5vw,64px)] text-center flex flex-col items-center">
                            <span className="so-eyebrow">Let&apos;s build it</span>
                            <h2 className="mt-5 mb-4 text-[clamp(28px,4vw,46px)] tracking-[-0.03em] text-so-ink max-w-[22ch]">
                                Ready to ship{" "}
                                <span className="so-serif italic">{service.name.toLowerCase()}?</span>
                            </h2>
                            <p className="text-[15px] leading-[1.7] text-so-ink-2 max-w-[52ch] mb-8">
                                One conversation is enough for us to scope your project and tell you exactly how we&apos;d deliver it.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-3">
                                <Link href="/contactus" className="so-btn so-btn-primary">
                                    Start a project <ArrowRight size={13} />
                                </Link>
                                <Link href="/services" className="so-btn so-btn-ghost">
                                    All services <ArrowRight size={13} />
                                </Link>
                            </div>
                        </FadeIn>
                    </div>
                </section>
            </main>
        </>
    )
}

/* ── Pricing card (server-rendered) ── */
function PricingCard({ tier }: { tier: PricingTier }) {
    const TierIcon = TIER_ICONS[tier.icon]
    return (
        <div
            className={
                "so-card p-7 h-full flex flex-col relative " +
                (tier.popular ? "ring-1 ring-so-ink/15 shadow-md" : "")
            }
        >
            {tier.popular && (
                <span className="absolute top-5 right-5 inline-flex items-center gap-1 rounded-full bg-so-ink text-so-bg px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em]">
                    <Sparkles className="w-3 h-3" /> Popular
                </span>
            )}
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-so-surface-2 text-so-ink mb-5">
                <TierIcon className="w-5 h-5" />
            </div>
            <h3 className="text-[18px] font-semibold text-so-ink tracking-[-0.01em]">{tier.name}</h3>
            <p className="text-[13px] leading-[1.6] text-so-ink-2 mt-1.5 mb-5">{tier.description}</p>
            <div className="mb-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-so-ink-4">{tier.suffix}</span>
                <div className="text-[32px] font-semibold tracking-[-0.02em] text-so-ink leading-none mt-1">
                    {formatPrice(tier.basePrice, "USD")}
                </div>
            </div>
            <ul className="grid gap-2.5 mb-7 flex-1">
                {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-so-ink-2">
                        <Check className="w-4 h-4 text-so-ink shrink-0 mt-0.5" />
                        <span className="text-[13.5px] leading-[1.5]">{f}</span>
                    </li>
                ))}
            </ul>
            <Link
                href="/contactus"
                className={
                    "so-btn w-full justify-center " + (tier.popular ? "so-btn-primary" : "so-btn-ghost")
                }
            >
                Select <ArrowRight size={13} />
            </Link>
        </div>
    )
}

/* ── Overview glyph: prefer the slug-keyed CardVisual (animated, from the shared
   library); fall back to the themed SVG card so no section is a wall of text even
   if a particular slug isn't covered. ── */
function ServiceGlyph({ slug, icon }: { slug: string; icon: ServiceIconKey }) {
    if (icon === "bot") return <StreamingChat />
    return (
        <div className="so-card relative overflow-hidden p-6 sm:p-8">
            <CardVisual name={slug} className="w-full" />
        </div>
    )
}

/* ── Process section visual: a CI/CD pipeline scan card for most services, a
   themed glyph card otherwise. ── */
function ProcessVisual({ slug }: { slug: string }) {
    if (slug === "ai-integration") return <ReportDraft className="max-w-[360px]" />
    if (slug === "ui-ux-systems") return <ExamCard className="max-w-[360px]" />
    return <VouchingScan className="max-w-[360px]" />
}

/* ── Use-case section visual: a slug-keyed CardVisual with an illustration
   fallback so the section is always visually anchored. ── */
function UseCaseVisual({ slug }: { slug: string }) {
    if (slug === "web-engineering" || slug === "cloud-architecture") {
        return (
            <div className="so-card p-6 sm:p-8 flex items-end gap-1.5 aspect-[4/3]">
                <MiniBarChart className="w-full" />
            </div>
        )
    }
    if (slug === "system-security") return <LangToggle className="so-card p-6 sm:p-8" />
    const svc = getServiceBySlug(slug)
    return <ThemedGlyphCard icon={svc?.icon ?? "globe"} />
}

/* ── Themed animated SVG card - a grid, a soft radial glow, and the service icon.
   Used as a guaranteed visual fallback. ── */
function ThemedGlyphCard({ icon }: { icon: ServiceIconKey }) {
    const Icon = ICONS[icon]
    return (
        <div className="so-card relative overflow-hidden p-10 aspect-[4/3] flex items-center justify-center">
            <svg
                aria-hidden
                className="absolute inset-0 h-full w-full text-so-ink/[0.04]"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern id={`grid-${icon}`} width="32" height="32" patternUnits="userSpaceOnUse">
                        <path d="M32 0H0V32" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#grid-${icon})`} />
            </svg>
            <div
                aria-hidden
                className="absolute inset-0 opacity-60"
                style={{
                    background:
                        "radial-gradient(60% 60% at 50% 40%, rgba(201,169,97,0.10) 0%, transparent 70%)",
                }}
            />
            <div className="relative flex items-center justify-center w-24 h-24 rounded-3xl bg-so-surface-2 text-so-ink border border-so-line">
                <Icon className="w-11 h-11" />
            </div>
        </div>
    )
}
