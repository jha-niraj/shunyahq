import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check } from "lucide-react"
import { SITE_URL, SITE_NAME } from "@/lib/site"
import { PageHero } from "@/components/landing/page-hero"
import { PageBackground } from "@/components/landing/page-background"
import { PageFAQ } from "@/components/landing/page-faq"
import { PRODUCT_TOOLS, getToolBySlug } from "../tools-meta"
import { ToolDemo } from "../_components/tool-demos"

export function generateStaticParams() {
    // Only tools that resolve to a detail page (no external/internal href override).
    return PRODUCT_TOOLS.filter((t) => !t.href).map((t) => ({ tool: t.slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ tool: string }>
}): Promise<Metadata> {
    const { tool: slug } = await params
    const tool = getToolBySlug(slug)
    if (!tool) return {}
    const url = `${SITE_URL}/tools/${tool.slug}`
    return {
        title: tool.seoTitle,
        description: tool.seoDescription,
        alternates: { canonical: url },
        openGraph: {
            title: tool.seoTitle,
            description: tool.seoDescription,
            url,
            type: "website",
            siteName: SITE_NAME,
        },
        twitter: {
            card: "summary_large_image",
            title: tool.seoTitle,
            description: tool.seoDescription,
        },
    }
}

export default async function ToolDetailPage({
    params,
}: {
    params: Promise<{ tool: string }>
}) {
    const { tool: slug } = await params
    const tool = getToolBySlug(slug)
    if (!tool || tool.href) notFound()

    const url = `${SITE_URL}/tools/${tool.slug}`
    const isLive = tool.status === "Live"

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
            { "@type": "ListItem", position: 3, name: tool.name, item: url },
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
                    palette={tool.palette}
                    eyebrow={`${tool.eyebrow} · ${tool.status}`}
                    title={tool.heroTitle}
                    description={tool.heroDescription}
                />

                {/* Summary + demo */}
                <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                    <div className="so-container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="so-eyebrow">Overview</span>
                            <p className="mt-5 text-[16px] leading-[1.8] text-so-ink-2">
                                {tool.summary}
                            </p>
                        </div>
                        <div>
                            <ToolDemo slug={tool.slug} variant="detail" />
                        </div>
                    </div>
                </section>

                {/* How it works */}
                <section className="relative z-[1] bg-so-surface so-section border-t border-so-line">
                    <div className="so-container">
                        <span className="so-eyebrow">How it works</span>
                        <h2 className="mt-5 mb-12 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[22ch]">
                            Three steps to{" "}
                            <span className="so-serif italic">value.</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {tool.howItWorks.map((step) => (
                                <div key={step.step} className="so-card p-7 h-full">
                                    <span className="so-mono text-[13px] text-so-ink-3">{step.step}</span>
                                    <h3 className="mt-4 mb-2 text-[18px] font-semibold text-so-ink tracking-[-0.01em]">
                                        {step.title}
                                    </h3>
                                    <p className="text-[14px] leading-[1.7] text-so-ink-2">{step.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                    <div className="so-container">
                        <span className="so-eyebrow">What you get</span>
                        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 max-w-3xl">
                            {tool.features.map((f) => (
                                <li key={f} className="flex items-start gap-3 text-[15px] text-so-ink-2">
                                    <Check size={18} className="mt-0.5 shrink-0 text-emerald-600" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* FAQ */}
                {tool.faqs && tool.faqs.length > 0 && (
                    <section className="relative z-[1] bg-so-bg border-t border-so-line">
                        <PageFAQ
                            items={tool.faqs}
                            eyebrow="FAQ"
                            title={`${tool.name},`}
                            titleAccent="answered"
                            description={`Common questions about ${tool.name} and how it fits into your workflow.`}
                        />
                    </section>
                )}

                {/* CTA */}
                <section className="relative z-[1] bg-so-surface so-section border-t border-so-line">
                    <div className="so-container">
                        <div className="so-card p-[clamp(32px,5vw,64px)] text-center flex flex-col items-center">
                            <h2 className="mb-4 text-[clamp(28px,4vw,46px)] tracking-[-0.03em] text-so-ink max-w-[20ch]">
                                {isLive ? (
                                    <>Ready to <span className="so-serif italic">try it?</span></>
                                ) : (
                                    <>Want <span className="so-serif italic">early access?</span></>
                                )}
                            </h2>
                            <p className="text-[15px] leading-[1.7] text-so-ink-2 max-w-[52ch] mb-8">
                                {isLive
                                    ? "Get started in minutes - or talk to us about how it fits your team."
                                    : "We're shipping this now. Tell us about your team and we'll get you in first."}
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-3">
                                <Link href="/contactus" className="so-btn so-btn-primary">
                                    {isLive ? "Get started" : "Join the beta"} <ArrowRight size={13} />
                                </Link>
                                <Link href="/tools" className="so-btn so-btn-ghost">
                                    All tools <ArrowRight size={13} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
