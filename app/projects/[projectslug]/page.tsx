import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
    ArrowLeft,
    ArrowRight,
    ExternalLink,
    CheckCircle2,
    Calendar,
    Clock,
    UserCircle,
    Activity,
} from "lucide-react"
import { PageHero } from "@/components/landing/page-hero"
import { PageBackground } from "@/components/landing/page-background"
import { PageFAQ } from "@/components/landing/page-faq"
import { Reveal, StaggerContainer, StaggerItem } from "@/components/landing/animations"
import { TechBadge } from "@/components/landing/tech-icon"
import { ProjectApproach } from "@/components/projects/project-approach"
import { PROJECTS, getProjectBySlug } from "@/content/projects"
import { SITE_URL, SITE_NAME } from "@/lib/site"

export function generateStaticParams() {
    return PROJECTS.map((p) => ({ projectslug: p.slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ projectslug: string }>
}): Promise<Metadata> {
    const { projectslug } = await params
    const project = getProjectBySlug(projectslug)
    if (!project) return {}

    const title = project.seoTitle
    const url = `${SITE_URL}/projects/${project.slug}`

    return {
        title,
        description: project.seoDescription,
        keywords: [project.title, project.industry, ...project.technologies, "case study", "Shunya"],
        alternates: { canonical: url },
        openGraph: {
            title,
            description: project.seoDescription,
            url,
            type: "article",
            siteName: SITE_NAME,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: project.seoDescription,
        },
    }
}

export default async function ProjectCaseStudyPage({
    params,
}: {
    params: Promise<{ projectslug: string }>
}) {
    const { projectslug } = await params
    const project = getProjectBySlug(projectslug)
    if (!project) notFound()

    const url = `${SITE_URL}/projects/${project.slug}`

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: `${project.title} - ${project.tagline}`,
        description: project.seoDescription,
        url,
        ...(project.image ? { image: `${SITE_URL}${project.image}` } : {}),
        author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        about: project.industry,
        keywords: project.technologies.join(", "),
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
            { "@type": "ListItem", position: 3, name: project.title, item: url },
        ],
    }

    const metaItems = [
        { icon: Calendar, label: "Year", value: String(project.year) },
        { icon: Clock, label: "Timeline", value: project.timeline },
        { icon: UserCircle, label: "Role", value: project.role },
        { icon: Activity, label: "Status", value: project.status },
    ]

    return (
        <main className="relative overflow-x-clip isolate">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <PageBackground className="z-0" />
            <PageHero
                palette="goldNoir"
                eyebrow={`Case Study · ${project.industry}`}
                title={<>{project.title}</>}
                description={project.tagline}
            />

            <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                <div className="so-container">
                    {/* Back link */}
                    <Reveal distance={12} className="mb-10">
                    <Link
                        href="/projects"
                        className="group inline-flex items-center gap-2 text-[13.5px] text-so-ink-3 hover:text-so-ink transition-colors mb-10"
                    >
                        <span className="flex items-center justify-center p-2 rounded-full border border-so-line group-hover:border-so-ink-4 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </span>
                        All work
                    </Link>
                    </Reveal>

                    {/* Meta strip + live link */}
                    <Reveal delay={0.06} className="so-card p-6 mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 flex-1">
                            {metaItems.map(({ icon: Icon, label, value }) => (
                                <div key={label} className="flex items-start gap-3">
                                    <Icon className="w-4 h-4 text-so-ink-3 mt-0.5 shrink-0" />
                                    <div>
                                        <div className="so-eyebrow mb-1">{label}</div>
                                        <div className="text-[14px] font-semibold text-so-ink leading-snug">
                                            {value}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="so-btn so-btn-primary justify-center shrink-0"
                        >
                            Visit live site <ExternalLink className="w-4 h-4" />
                        </Link>
                    </Reveal>

                    {/* Hero visual: screenshot or branded SVG panel */}
                    {project.image ? (
                        <Reveal delay={0.12} className="relative aspect-video w-full overflow-hidden rounded-[var(--so-radius-lg)] border border-so-line bg-so-surface-2 mb-16">
                            <Image
                                src={project.image}
                                alt={`${project.title} - product screenshot`}
                                fill
                                className="object-cover"
                                priority
                            />
                        </Reveal>
                    ) : (
                        <BrandedPanel title={project.title} tagline={project.tagline} />
                    )}

                    {/* Overview */}
                    <Reveal className="max-w-3xl mb-16">
                        <section>
                        <span className="so-eyebrow">Overview</span>
                        <h2 className="mt-5 text-[clamp(22px,2.6vw,30px)] tracking-[-0.02em] text-so-ink leading-[1.25]">
                            {project.description}
                        </h2>
                        </section>
                    </Reveal>

                    {/* Challenge + What we built */}
                    <StaggerContainer className="grid lg:grid-cols-2 gap-10 lg:gap-14 mb-20">
                        <StaggerItem>
                            <section className="so-card p-7 lg:p-9 h-full">
                                <span className="so-eyebrow">The Challenge</span>
                                <p className="mt-5 text-[15.5px] leading-[1.8] text-so-ink-2">
                                    {project.challenge}
                                </p>
                            </section>
                        </StaggerItem>
                        <StaggerItem>
                            <section className="so-card p-7 lg:p-9 h-full">
                                <span className="so-eyebrow">What We Built</span>
                                <p className="mt-5 text-[15.5px] leading-[1.8] text-so-ink-2">
                                    {project.whatWeBuilt}
                                </p>
                            </section>
                        </StaggerItem>
                    </StaggerContainer>

                    <ProjectApproach steps={project.approach} />

                    {/* Key capabilities */}
                    <section className="mb-20">
                        <Reveal>
                            <div className="flex items-center gap-4 mb-8">
                                <span className="so-eyebrow shrink-0">Key Capabilities</span>
                                <span className="h-px flex-1 bg-so-line" />
                            </div>
                        </Reveal>
                        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {project.keyCapabilities.map((cap) => (
                                <StaggerItem key={cap.title} className="so-card p-6 h-full flex flex-col">
                                    <CheckCircle2 className="w-5 h-5 text-so-ink mb-4" />
                                    <h3 className="text-[16px] font-semibold text-so-ink mb-2 tracking-[-0.01em]">
                                        {cap.title}
                                    </h3>
                                    <p className="text-[14px] leading-[1.7] text-so-ink-2">{cap.body}</p>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </section>

                    {/* Outcomes */}
                    <section className="mb-20">
                        <Reveal>
                            <div className="flex items-center gap-4 mb-8">
                                <span className="so-eyebrow shrink-0">Outcomes</span>
                                <span className="h-px flex-1 bg-so-line" />
                            </div>
                        </Reveal>
                        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {project.outcomes.map((o) => (
                                <StaggerItem
                                    key={o.label}
                                    className="so-card p-7 text-center flex flex-col items-center justify-center"
                                >
                                    <div className="text-[clamp(28px,3.4vw,40px)] font-semibold tracking-[-0.03em] text-so-ink leading-none">
                                        {o.value}
                                    </div>
                                    <div className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-so-ink-3 mt-3 leading-snug">
                                        {o.label}
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </section>

                    {/* Tech stack */}
                    <section className="mb-4">
                        <Reveal>
                            <div className="flex items-center gap-4 mb-8">
                                <span className="so-eyebrow shrink-0">Tech Stack</span>
                                <span className="h-px flex-1 bg-so-line" />
                            </div>
                        </Reveal>
                        <StaggerContainer className="flex flex-wrap gap-2.5" stagger={0.04}>
                            {project.technologies.map((tech) => (
                                <StaggerItem key={tech}>
                                    <TechBadge name={tech} className="px-4 py-2 text-[13px]" />
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </section>
                </div>
            </section>

            {/* Project FAQ */}
            <section className="relative z-[1] bg-so-surface border-t border-so-line">
                <PageFAQ
                    items={project.faqs}
                    eyebrow="Project FAQ"
                    title="About this"
                    titleAccent="build"
                    description={`Common questions about how we approached and shipped ${project.title}.`}
                />
            </section>

            {/* CTA */}
            <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                <div className="so-container">
                    <Reveal className="so-card p-[clamp(32px,5vw,64px)] text-center flex flex-col items-center">
                        <span className="so-eyebrow">Like what you see?</span>
                        <h2 className="mt-5 mb-4 text-[clamp(28px,4vw,46px)] tracking-[-0.03em] text-so-ink max-w-[22ch]">
                            Let&apos;s ship something{" "}
                            <span className="so-serif italic">like this.</span>
                        </h2>
                        <p className="text-[15px] leading-[1.7] text-so-ink-2 max-w-[52ch] mb-8">
                            {project.title} went from concept to production in {project.timeline}. Tell us
                            what you&apos;re building and we&apos;ll scope exactly how we&apos;d ship it.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                            <Link href="/contactus" className="so-btn so-btn-primary">
                                Start a project <ArrowRight size={13} />
                            </Link>
                            <Link href="/projects" className="so-btn so-btn-ghost">
                                All work <ArrowRight size={13} />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </main>
    )
}

// Branded decorative panel rendered when a project has no screenshot asset.
function BrandedPanel({ title, tagline }: { title: string; tagline: string }) {
    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-[var(--so-radius-lg)] border border-so-line bg-so-surface-2 mb-16 flex items-center justify-center">
            <svg
                aria-hidden
                className="absolute inset-0 h-full w-full text-so-line"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <pattern id={`grid-${title}`} width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M40 0H0V40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                    </pattern>
                    <radialGradient id={`glow-${title}`} cx="50%" cy="45%" r="60%">
                        <stop offset="0%" stopColor="rgba(201,169,97,0.18)" />
                        <stop offset="100%" stopColor="rgba(201,169,97,0)" />
                    </radialGradient>
                </defs>
                <rect width="100%" height="100%" fill={`url(#grid-${title})`} />
                <rect width="100%" height="100%" fill={`url(#glow-${title})`} />
            </svg>
            <div className="relative text-center px-8">
                <div className="so-serif italic text-[clamp(48px,9vw,96px)] leading-none text-so-ink select-none">
                    {title}
                </div>
                <p className="mt-4 text-[14px] text-so-ink-3 max-w-[40ch] mx-auto">{tagline}</p>
            </div>
        </div>
    )
}
