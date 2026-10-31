import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PROJECTS, type Project } from "@/content/projects"

/**
 * The homepage proof section. It only ever renders `content/projects.ts`, so nothing here can claim
 * more than the case studies behind it (see the credibility rule in CLAUDE.md). This replaced a wall
 * of invented testimonials - do not bring quotes back unless a real client gave them.
 *
 * Cards link to our own case studies rather than `liveUrl`, so a product's hosting lapsing can never
 * leave a dead link on the homepage.
 */
function ProjectCard({ project }: { project: Project }) {
    return (
        <Link
            href={`/projects/${project.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-so-line bg-so-surface transition-colors hover:border-so-gold-line"
        >
            <div className="relative aspect-[16/10] overflow-hidden border-b border-so-line bg-so-surface-2">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                ) : (
                    <div className="absolute inset-0 grid place-items-center">
                        <div
                            aria-hidden
                            className="absolute inset-0 opacity-40"
                            style={{
                                backgroundImage: "radial-gradient(circle at 1px 1px, var(--so-line) 1px, transparent 0)",
                                backgroundSize: "22px 22px",
                            }}
                        />
                        <span className="relative text-[32px] font-semibold tracking-[-0.03em] text-so-ink-3">
                            {project.title}
                        </span>
                    </div>
                )}
                <span className="absolute left-3 top-3 rounded-full border border-so-line bg-so-bg/90 px-2.5 py-1 text-[11px] font-medium text-so-ink-2 backdrop-blur-sm">
                    {project.industry}
                </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
                <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-so-ink">{project.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-so-ink-2">{project.tagline}</p>
                <p className="mt-4 text-[12.5px] text-so-ink-3">
                    {project.technologies.slice(0, 3).join(" · ")}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13.5px] font-semibold text-so-ink">
                    Read the case study
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
            </div>
        </Link>
    )
}

export function ShippedWork() {
    return (
        <section className="py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <div data-rv className="mx-auto max-w-2xl text-center">
                    <p className="mb-4 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                        Shipped work
                    </p>
                    <h2 className="text-4xl font-bold tracking-tight text-so-ink md:text-5xl">
                        Judge us on{" "}
                        <span className="text-neutral-400 dark:text-neutral-500">what we shipped.</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-lg text-base text-so-ink-2">
                        Six products across EdTech, LegalTech, SaaS, Events and Healthcare. Each one has a full
                        case study covering the problem, the architecture and how it was delivered.
                    </p>
                </div>

                <ul data-rv="" data-rv-group="" className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {PROJECTS.map((project) => (
                        <li key={project.slug}>
                            <ProjectCard project={project} />
                        </li>
                    ))}
                </ul>

                <div className="mt-8 flex justify-center">
                    <Link
                        href="/projects"
                        className="group inline-flex items-center gap-2 text-[14px] font-semibold text-so-ink"
                    >
                        See all our work
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
