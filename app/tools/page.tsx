import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site"
import { PageHero } from "@/components/landing/page-hero"
import { PageBackground } from "@/components/landing/page-background"
import { CardVisual } from "@/components/landing/card-visuals"
import { PRODUCT_TOOLS } from "./tools-meta"

const PAGE_URL = `${SITE_URL}/tools`

export const metadata: Metadata = {
    title: `Tools - ${SITE_NAME}`,
    description:
        "Products and utilities from Shunya - SyncOrbit for engineering teams, a transparent project budget estimator, our global rate card, and a free technical strategy call.",
    alternates: { canonical: PAGE_URL },
    openGraph: {
        title: `Tools - ${SITE_NAME}`,
        description: SITE_DESCRIPTION,
        url: PAGE_URL,
        type: "website",
        siteName: SITE_NAME,
    },
    twitter: {
        card: "summary_large_image",
        title: `Tools - ${SITE_NAME}`,
        description: SITE_DESCRIPTION,
    },
}

function StatusBadge({ status }: { status: string }) {
    const live = status === "Live"
    return (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-so-ink-3">
            <span
                className={`h-1.5 w-1.5 rounded-full ${live ? "bg-emerald-500 animate-pulse" : "bg-so-ink-4"}`}
            />
            {status}
        </span>
    )
}

export default function ToolsIndexPage() {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Tools", item: PAGE_URL },
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
                    eyebrow="Tools"
                    title={
                        <>
                            Products we build{" "}
                            <span className="so-serif italic">and share.</span>
                        </>
                    }
                    description="Beyond client work, we ship our own products and free utilities - from a real-time command center for engineering teams to transparent pricing you can use before you ever talk to us."
                />

                <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                    <div className="so-container">
                        <span className="so-eyebrow">What we offer</span>
                        <h2 className="mt-5 mb-12 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[24ch]">
                            Useful things, openly{" "}
                            <span className="so-serif italic">available.</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {PRODUCT_TOOLS.map((tool) => {
                                const isExternal = tool.href?.startsWith("http")
                                const linkHref = tool.href ?? `/tools/${tool.slug}`
                                return (
                                    <Link
                                        key={tool.slug}
                                        href={linkHref}
                                        target={isExternal ? "_blank" : undefined}
                                        rel={isExternal ? "noopener noreferrer" : undefined}
                                        className="group so-card h-full flex flex-col overflow-hidden hover:shadow-md transition-all"
                                    >
                                        <div className="relative">
                                            <CardVisual
                                                name={tool.slug}
                                                className="h-44 w-full border-b border-so-line transition-transform duration-500 group-hover:scale-[1.03]"
                                            />
                                            <span className="absolute top-3 left-3 so-eyebrow bg-so-bg/80 backdrop-blur px-2 py-1 rounded-md border border-so-line">
                                                {tool.eyebrow}
                                            </span>
                                            <span className="absolute top-3 right-3 bg-so-bg/80 backdrop-blur px-2 py-1 rounded-md border border-so-line">
                                                <StatusBadge status={tool.status} />
                                            </span>
                                        </div>
                                        <div className="p-7 flex flex-col flex-1">
                                            <h3 className="text-[20px] font-semibold text-so-ink mb-2 tracking-[-0.01em]">
                                                {tool.name}
                                            </h3>
                                            <p className="text-[14px] leading-[1.7] text-so-ink-2 mb-6 flex-1">
                                                {tool.tagline}
                                            </p>
                                            <span className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-so-ink-3 group-hover:text-so-ink transition-colors pt-4 border-t border-so-line">
                                                {isExternal ? "Open" : "Explore"}
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

                <section className="relative z-[1] bg-so-surface so-section border-t border-so-line">
                    <div className="so-container">
                        <div className="so-card p-[clamp(32px,5vw,64px)] text-center flex flex-col items-center">
                            <span className="so-eyebrow">Need something custom?</span>
                            <h2 className="mt-5 mb-4 text-[clamp(28px,4vw,46px)] tracking-[-0.03em] text-so-ink max-w-[20ch]">
                                We build the tools{" "}
                                <span className="so-serif italic">you need.</span>
                            </h2>
                            <p className="text-[15px] leading-[1.7] text-so-ink-2 max-w-[52ch] mb-8">
                                If you need a bespoke internal tool, dashboard, or automation, that&apos;s exactly the kind of thing we ship for clients every week.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-3">
                                <Link href="/contactus" className="so-btn so-btn-primary">
                                    Start a project <ArrowRight size={13} />
                                </Link>
                                <Link href="/services" className="so-btn so-btn-ghost">
                                    View services <ArrowRight size={13} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
