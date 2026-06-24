import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Compass, Layers, GaugeCircle, ShieldCheck } from "lucide-react"
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site"
import { PageHero } from "@/components/landing/page-hero"
import { PageBackground } from "@/components/landing/page-background"
import { CardVisual } from "@/components/landing/card-visuals"
import { USE_CASES, USE_CASE_SLUGS } from "@/content/use-cases"

const PAGE_URL = `${SITE_URL}/solutions`

export const metadata: Metadata = {
    title: `Solutions - ${SITE_NAME}`,
    description:
        "Whether you're a founder shipping an MVP, a business modernizing legacy systems, an enterprise scaling secure distributed systems, or a product team chasing velocity - Shunya is the engineering team that owns it end to end.",
    alternates: { canonical: PAGE_URL },
    openGraph: {
        title: `Solutions - ${SITE_NAME}`,
        description: SITE_DESCRIPTION,
        url: PAGE_URL,
        type: "website",
        siteName: SITE_NAME,
    },
    twitter: {
        card: "summary_large_image",
        title: `Solutions - ${SITE_NAME}`,
        description: SITE_DESCRIPTION,
    },
}

const APPROACH = [
    {
        icon: Compass,
        title: "We start with your stage, not a template",
        body: "A pre-seed MVP and a regulated enterprise platform need different things. We scope to where you actually are, then design the shortest credible path to where you want to be.",
    },
    {
        icon: Layers,
        title: "One team owns the whole stack",
        body: "Design, frontend, backend, infrastructure, and deployment sit with a single accountable team. No vendor handoffs, no finger-pointing when something breaks at 2am.",
    },
    {
        icon: GaugeCircle,
        title: "You see working software every sprint",
        body: "We ship to a real, deployable build every two weeks. You steer with feedback on software you can click, not a status deck or a roadmap that lives in someone's head.",
    },
    {
        icon: ShieldCheck,
        title: "Production-grade from day one",
        body: "Monitoring, CI/CD, security, and documentation are built in, not bolted on. Whatever we ship is ready for real users and a clean handoff to your team.",
    },
]

const STATS = [
    { value: "4-8 wks", label: "From kickoff to a live MVP" },
    { value: "1 team", label: "Owns design, build, and deploy" },
    { value: "4", label: "Domains: web, mobile, AI, cloud" },
    { value: "30 days", label: "Post-launch support included" },
]

export default function SolutionsIndexPage() {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Solutions", item: PAGE_URL },
        ],
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <main className="relative overflow-x-clip isolate">
                <PageBackground className="z-0" />
                <PageHero
                    palette="jade"
                    eyebrow="Solutions"
                    title={
                        <>
                            Built for where you{" "}
                            <span className="so-serif italic">are.</span>
                        </>
                    }
                    description="One engineering team that architects, builds, and scales production-grade products - matched to whatever you're trying to ship. Find your starting point."
                />

                <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                    <div className="so-container">
                        <div className="grid lg:grid-cols-[1fr_auto] gap-x-16 gap-y-10 items-start">
                            <div>
                                <span className="so-eyebrow">How we think about it</span>
                                <h2 className="mt-5 mb-5 text-[clamp(24px,3vw,36px)] tracking-[-0.025em] text-so-ink max-w-[20ch]">
                                    Same team, shaped to{" "}
                                    <span className="so-serif italic">your stage.</span>
                                </h2>
                                <p className="text-[15px] leading-[1.8] text-so-ink-2 max-w-[58ch]">
                                    Most agencies sell you a fixed package and bend your problem to fit it. We do the opposite. Whether you are a founder racing a runway, a business modernizing systems that growth has outgrown, an enterprise evolving distributed platforms under real compliance pressure, or a product team fighting for velocity, the engineering is the same caliber. What changes is how we scope, what we prioritize, and how we measure done. Pick the path that matches where you are today and you will see exactly how we would work with you.
                                </p>
                            </div>
                            <dl className="grid grid-cols-2 gap-px bg-so-line rounded-xl overflow-hidden border border-so-line w-full lg:w-[320px]">
                                {STATS.map((s) => (
                                    <div key={s.label} className="bg-so-bg p-5">
                                        <dt className="text-[clamp(22px,3vw,28px)] font-semibold tracking-[-0.02em] text-so-ink">
                                            {s.value}
                                        </dt>
                                        <dd className="mt-1 text-[12.5px] leading-[1.5] text-so-ink-3">
                                            {s.label}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </section>

                <section className="relative z-[1] bg-so-surface so-section border-t border-so-line">
                    <div className="so-container">
                        <span className="so-eyebrow">Who we build for</span>
                        <h2 className="mt-5 mb-12 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[24ch]">
                            Pick the path that fits{" "}
                            <span className="so-serif italic">your stage.</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {USE_CASE_SLUGS.map((slug) => {
                                const useCase = USE_CASES[slug]
                                return (
                                    <Link
                                        key={slug}
                                        href={`/solutions/${slug}`}
                                        className="group so-card h-full flex flex-col overflow-hidden hover:shadow-md transition-all"
                                    >
                                        <div className="relative">
                                            <CardVisual
                                                name={slug}
                                                className="h-44 w-full border-b border-so-line transition-transform duration-500 group-hover:scale-[1.03]"
                                            />
                                            <span className="absolute top-3 left-3 so-eyebrow bg-so-bg/80 backdrop-blur px-2 py-1 rounded-md border border-so-line">
                                                {useCase.eyebrow}
                                            </span>
                                        </div>
                                        <div className="p-7 flex flex-col flex-1">
                                            <h3 className="text-[20px] font-semibold text-so-ink mb-2 tracking-[-0.01em]">
                                                {useCase.label}
                                            </h3>
                                            <p className="text-[14px] leading-[1.7] text-so-ink-2 mb-6 flex-1 line-clamp-4">
                                                {useCase.heroSubtitle}
                                            </p>
                                            <span className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-so-ink-3 group-hover:text-so-ink transition-colors pt-4 border-t border-so-line">
                                                Explore
                                                <ArrowRight
                                                    size={14}
                                                    className="group-hover:translate-x-0.5 transition-transform"
                                                />
                                            </span>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </section>

                <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                    <div className="so-container">
                        <span className="so-eyebrow">How we approach solutions</span>
                        <h2 className="mt-5 mb-12 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[26ch]">
                            Four principles behind{" "}
                            <span className="so-serif italic">every engagement.</span>
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-so-line rounded-xl overflow-hidden border border-so-line">
                            {APPROACH.map((item) => {
                                const Icon = item.icon
                                return (
                                    <div key={item.title} className="bg-so-bg p-7 sm:p-8">
                                        <div className="flex items-center justify-center w-11 h-11 mb-5 rounded-xl bg-so-surface-2 text-so-ink">
                                            <Icon size={20} />
                                        </div>
                                        <h3 className="text-[17px] font-semibold text-so-ink mb-2 tracking-[-0.01em]">
                                            {item.title}
                                        </h3>
                                        <p className="text-[14px] leading-[1.7] text-so-ink-2">
                                            {item.body}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                <section className="relative z-[1] bg-so-surface so-section border-t border-so-line">
                    <div className="so-container">
                        <div className="so-card p-[clamp(32px,5vw,64px)] text-center flex flex-col items-center">
                            <span className="so-eyebrow">Not sure where you fit?</span>
                            <h2 className="mt-5 mb-4 text-[clamp(28px,4vw,46px)] tracking-[-0.03em] text-so-ink max-w-[20ch]">
                                Tell us what you&apos;re{" "}
                                <span className="so-serif italic">building.</span>
                            </h2>
                            <p className="text-[15px] leading-[1.7] text-so-ink-2 max-w-[52ch] mb-8">
                                Whatever your stage, one conversation is enough for us to scope it and tell you exactly how we&apos;d ship it.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-3">
                                <Link href="/contactus" className="so-btn so-btn-primary">
                                    Start a project <ArrowRight size={13} />
                                </Link>
                                <Link href="/projects" className="so-btn so-btn-ghost">
                                    See our work <ArrowRight size={13} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
