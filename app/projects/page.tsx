"use client"

import { Eye, FileText, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { PageHero } from "@/components/landing/page-hero"
import { PageBackground } from "@/components/landing/page-background"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/landing/animations"
import { TechBadge } from "@/components/landing/tech-icon"
import { PROJECTS } from "@/content/projects"

// Industries are derived from the data so only filters that have projects appear.
const INDUSTRIES = Array.from(new Set(PROJECTS.map((p) => p.industry)))

export default function ProjectsPage() {
    const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)

    const filteredProjects = useMemo(
        () =>
            selectedIndustry
                ? PROJECTS.filter((p) => p.industry === selectedIndustry)
                : PROJECTS,
        [selectedIndustry]
    )

    return (
        <main className="relative overflow-x-clip isolate">
            <PageBackground className="z-0" />
            <PageHero
                palette="goldNoir"
                eyebrow="Project Archive"
                title={
                    <>
                        Selected works,{" "}
                        <span className="so-serif italic">shipped.</span>
                    </>
                }
                description="A collection of high-performance digital systems engineered for scalability and impact - each one built, shipped, and running in production."
            />

            <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                <div className="so-container">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 border-b border-so-line pb-10">
                        <div className="max-w-2xl">
                            <span className="so-eyebrow">The work</span>
                            <h2 className="mt-5 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[24ch]">
                                Products engineered for{" "}
                                <span className="so-serif italic">real impact.</span>
                            </h2>
                        </div>
                        <div className="flex gap-10">
                            <div>
                                <div className="font-mono text-[32px] font-semibold tracking-[-0.02em] text-so-ink">
                                    {PROJECTS.length}
                                </div>
                                <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-so-ink-3 mt-1">
                                    Shipped
                                </div>
                            </div>
                            <div>
                                <div className="font-mono text-[32px] font-semibold tracking-[-0.02em] text-so-ink">
                                    {INDUSTRIES.length}
                                </div>
                                <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-so-ink-3 mt-1">
                                    Industries
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-10">
                        <button
                            onClick={() => setSelectedIndustry(null)}
                            className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all border ${selectedIndustry === null
                                ? 'bg-so-ink text-so-bg border-transparent'
                                : 'bg-transparent border-so-line text-so-ink-3 hover:text-so-ink hover:border-so-ink-4'}`}
                        >
                            All Systems
                        </button>
                        {
                            INDUSTRIES.map((industry) => (
                                <button
                                    key={industry}
                                    onClick={() => setSelectedIndustry(industry)}
                                    className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all border ${selectedIndustry === industry
                                        ? 'bg-so-ink text-so-bg border-transparent'
                                        : 'bg-transparent border-so-line text-so-ink-3 hover:text-so-ink hover:border-so-ink-4'}`}
                                >
                                    {industry}
                                </button>
                            ))
                        }
                    </div>

                    {/* key forces a remount on filter change so the `once:true` whileInView
                        animation re-fires and cards reliably reappear when returning to "All". */}
                    <StaggerContainer
                        key={selectedIndustry ?? "all"}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                    >
                        {
                            filteredProjects.map((project) => (
                                <StaggerItem key={project.slug} className="h-full">
                                    <div className="group so-card h-full flex flex-col overflow-hidden hover:shadow-md transition-all p-0">
                                        <div className="relative aspect-[16/10] overflow-hidden bg-so-surface-2 border-b border-so-line">
                                            <div className="absolute top-4 left-4 z-10">
                                                <span className="px-3 py-1 bg-so-bg/90 backdrop-blur-md border border-so-line rounded-full font-mono text-[10px] uppercase tracking-[0.1em] text-so-ink">
                                                    {project.industry}
                                                </span>
                                            </div>
                                            {
                                                project.image ? (
                                                    <Image
                                                        src={project.image}
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                                    />
                                                ) : (
                                                    <ProjectFallback title={project.title} />
                                                )
                                            }
                                        </div>
                                        <div className="p-6 flex flex-col flex-1">
                                            <h3 className="text-[20px] font-semibold text-so-ink mb-2 tracking-[-0.01em]">
                                                {project.title}
                                            </h3>
                                            <p className="text-[14px] leading-[1.7] text-so-ink-2 line-clamp-2 mb-5">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {
                                                    project.technologies.slice(0, 3).map((tech) => (
                                                        <TechBadge key={tech} name={tech} />
                                                    ))
                                                }
                                                {
                                                    project.technologies.length > 3 && (
                                                        <span className="inline-flex items-center rounded-lg border border-so-line bg-so-surface px-3 py-1.5 text-[12px] font-medium text-so-ink-3 transition-colors hover:text-so-ink">
                                                            +{project.technologies.length - 3}
                                                        </span>
                                                    )
                                                }
                                            </div>
                                            <div className="mt-auto grid grid-cols-2 gap-3">
                                                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="so-btn so-btn-ghost w-full justify-center text-[13px]">
                                                    <Eye className="w-4 h-4" /> Live
                                                </Link>
                                                <Link href={`/projects/${project.slug}`} className="so-btn so-btn-primary w-full justify-center text-[13px]">
                                                    <FileText className="w-4 h-4" /> Case Study
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </StaggerItem>
                            ))
                        }
                    </StaggerContainer>
                </div>
            </section>

            <section className="relative z-[1] bg-so-surface so-section border-t border-so-line">
                <div className="so-container">
                    <FadeIn className="so-card p-[clamp(32px,5vw,64px)] text-center flex flex-col items-center">
                        <span className="so-eyebrow">Have something in mind?</span>
                        <h2 className="mt-5 mb-4 text-[clamp(28px,4vw,46px)] tracking-[-0.03em] text-so-ink max-w-[20ch]">
                            Let&apos;s build your{" "}
                            <span className="so-serif italic">next one.</span>
                        </h2>
                        <p className="text-[15px] leading-[1.7] text-so-ink-2 max-w-[52ch] mb-8">
                            Every project here started as a single conversation. Tell us what you&apos;re building and we&apos;ll scope exactly how we&apos;d ship it.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                            <Link href="/contactus" className="so-btn so-btn-primary">
                                Start a project <ArrowRight size={13} />
                            </Link>
                            <Link href="/services" className="so-btn so-btn-ghost">
                                View services <ArrowRight size={13} />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    )
}

// Graceful branded tile for projects without a screenshot asset.
function ProjectFallback({ title }: { title: string }) {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-so-surface-2 via-so-surface to-so-surface-2">
            <div
                aria-hidden
                className="absolute inset-0 opacity-[0.4]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, var(--so-line, rgba(0,0,0,0.08)) 1px, transparent 0)",
                    backgroundSize: "22px 22px",
                }}
            />
            <span className="relative so-serif italic text-[64px] leading-none text-so-ink-3 select-none">
                {title.charAt(0)}
            </span>
        </div>
    )
}
