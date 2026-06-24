"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { PageHero } from "@/components/landing/page-hero"
import { PageBackground } from "@/components/landing/page-background"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/landing/animations"
import { CardVisual } from "@/components/landing/card-visuals"
import { SERVICES } from "@/content/services"
import { startingPrice, formatPrice } from "@/content/pricing"

export default function ServicesPage() {
    return (
        <main className="relative overflow-x-clip isolate">
            <PageBackground className="z-0" />
            <PageHero
                palette="jade"
                eyebrow="Capabilities Manifest"
                title={
                    <>
                        Technical engineering,{" "}
                        <span className="so-serif italic">end to end.</span>
                    </>
                }
                description="We deliver complete solutions across the stack. Choose a capability to explore its deliverables, process, tech stack, and starting investment in full detail."
            />

            <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                <div className="so-container">
                    <span className="so-eyebrow">What we build</span>
                    <h2 className="mt-5 mb-12 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[24ch]">
                        Six engineering capabilities,{" "}
                        <span className="so-serif italic">one team.</span>
                    </h2>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {SERVICES.map((service, index) => {
                            const from = service.pricingKey ? startingPrice(service.pricingKey) : 0
                            return (
                                <StaggerItem key={service.slug} className="h-full">
                                    <Link
                                        href={`/services/${service.slug}`}
                                        className="group so-card h-full w-full text-left flex flex-col overflow-hidden hover:shadow-md transition-all"
                                    >
                                        <div className="relative">
                                            <CardVisual
                                                name={service.slug}
                                                className="h-40 w-full border-b border-so-line transition-transform duration-500 group-hover:scale-[1.03]"
                                            />
                                            <span className="absolute top-3 left-3 so-eyebrow bg-so-bg/80 backdrop-blur px-2 py-1 rounded-md border border-so-line">
                                                {service.eyebrow}
                                            </span>
                                            <span className="absolute top-3 right-3 font-mono text-[12px] text-so-ink-4 tabular-nums bg-so-bg/80 backdrop-blur px-1.5 py-0.5 rounded-md">
                                                0{index + 1}
                                            </span>
                                        </div>
                                        <div className="p-7 flex flex-col flex-1">
                                            <h3 className="text-[20px] font-semibold text-so-ink mb-2 tracking-[-0.01em]">
                                                {service.name}
                                            </h3>
                                            <p className="text-[14px] leading-[1.7] text-so-ink-2 mb-6 flex-1">
                                                {service.tagline}
                                            </p>
                                            <div className="flex items-center justify-between pt-4 border-t border-so-line">
                                                <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-so-ink-3">
                                                    {from > 0 ? `From ${formatPrice(from, "USD")}` : "Custom scope"}
                                                </span>
                                                <span className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-so-ink-3 group-hover:text-so-ink transition-colors">
                                                    Explore
                                                    <ArrowRight
                                                        size={14}
                                                        className="group-hover:translate-x-0.5 transition-transform"
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </StaggerItem>
                            )
                        })}
                    </StaggerContainer>
                </div>
            </section>

            <section className="relative z-[1] bg-so-surface so-section border-t border-so-line">
                <div className="so-container">
                    <FadeIn className="so-card p-[clamp(32px,5vw,64px)] text-center flex flex-col items-center">
                        <span className="so-eyebrow">Ready to scope it?</span>
                        <h2 className="mt-5 mb-4 text-[clamp(28px,4vw,46px)] tracking-[-0.03em] text-so-ink max-w-[20ch]">
                            Tell us what you&apos;re{" "}
                            <span className="so-serif italic">building.</span>
                        </h2>
                        <p className="text-[15px] leading-[1.7] text-so-ink-2 max-w-[52ch] mb-8">
                            Whatever capability you need, one conversation is enough for us to scope it and tell you exactly how we&apos;d ship it.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                            <Link href="/contactus" className="so-btn so-btn-primary">
                                Start a project <ArrowRight size={13} />
                            </Link>
                            <Link href="/projects" className="so-btn so-btn-ghost">
                                See our work <ArrowRight size={13} />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    )
}
