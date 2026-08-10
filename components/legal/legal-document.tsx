"use client"

import { useState, useEffect, type ReactNode } from "react"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShaderHeroBg } from "@/components/landing/hero-shader-bg"
import { SHADER_PALETTES } from "@/components/landing/shader-palettes"
import { Entrance, Reveal } from "@/components/landing/animations"

export interface LegalSection {
    id: string
    label: string
    content: string
    /** One-sentence plain-English summary, rendered as "The short version" above the clauses. */
    callout?: string
}

interface LegalDocumentProps {
    kind: string
    /** Short intro shown over the media panel. */
    intro: string
    lastUpdated: string
    effective?: string
    badge: { icon: ReactNode; text: string }
    contactEmail: string
    sections: LegalSection[]
    /**
     * Optional looping background video for the left panel. When absent the panel falls back to
     * the site's own animated shader, so the page never depends on an external media host.
     */
    videoUrl?: string
}

// Renders the light-markdown content: `\n\n` paragraphs, `•`/`-` bullet blocks,
// `**bold**` spans, and single `\n` line breaks.
function renderContent(content: string) {
    return content.split("\n\n").map((para, i) => {
        const trimmed = para.trimStart()
        if (trimmed.startsWith("• ") || trimmed.startsWith("- ")) {
            const items = para.split("\n").filter((l) => l.trim().length > 0)
            return (
                <ul key={i} className="mt-3 space-y-2 pl-5 list-disc marker:text-[#c9a961]">
                    {items.map((item, j) => (
                        <li
                            key={j}
                            dangerouslySetInnerHTML={{
                                __html: item
                                    .replace(/^[•-]\s*/, "")
                                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-neutral-900 dark:text-white">$1</strong>'),
                            }}
                        />
                    ))}
                </ul>
            )
        }
        return (
            <p
                key={i}
                dangerouslySetInnerHTML={{
                    __html: para
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-neutral-900 dark:text-white">$1</strong>')
                        .replace(/\n/g, "<br/>"),
                }}
            />
        )
    })
}

function LegalTOC({ sections }: { sections: LegalSection[] }) {
    const [active, setActive] = useState(sections[0]?.id)

    useEffect(() => {
        const onScroll = () => {
            let cur = sections[0]?.id
            for (const s of sections) {
                const el = document.getElementById(s.id)
                if (el && el.getBoundingClientRect().top < 160) cur = s.id
            }
            setActive(cur)
        }
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [sections])

    return (
        <div className="mt-8 flex min-h-0 flex-1 flex-col">
            <span className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/40">
                On this page
            </span>
            <ScrollArea className="min-h-0 flex-1 pr-1">
                <nav className="flex flex-col gap-0.5">
                    {sections.map((s) => (
                        <Link
                            key={s.id}
                            href={`#${s.id}`}
                            className={
                                "border-l-2 py-1.5 pl-3 text-sm transition-colors " +
                                (active === s.id
                                    ? "border-[#EDE8D0] font-medium text-white"
                                    : "border-white/10 text-white/55 hover:border-white/30 hover:text-white/80")
                            }
                        >
                            {s.label}
                        </Link>
                    ))}
                </nav>
            </ScrollArea>
        </div>
    )
}

export function LegalDocument({
    kind, intro, lastUpdated, effective, badge, contactEmail, sections, videoUrl,
}: LegalDocumentProps) {
    return (
        <div className="mx-auto flex min-h-screen w-full max-w-7xl">
            {/* ── LEFT: sticky media panel with the on-page index ── */}
            <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] shrink-0 self-start overflow-hidden rounded-3xl lg:flex lg:w-[36%] lg:flex-col xl:w-[34%]">
                {videoUrl ? (
                    <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover" src={videoUrl} />
                ) : (
                    // The reference design runs a looping video here. Rather than hotlink another
                    // product's media, the panel uses the studio's own animated shader - same
                    // effect, no external host, and it is already the site's motion language.
                    <div className="absolute inset-0">
                        <ShaderHeroBg colors={SHADER_PALETTES.slate} speed={0.4} />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/75 to-black/60" />
                <div className="relative z-10 flex h-full flex-col p-10">
                    {/* Entrances, not scroll reveals - this panel is above the fold on arrival. The
                        <aside> itself is deliberately left unwrapped: a motion wrapper around it
                        would become the offset parent and the panel would stop sticking. */}
                    <Entrance className="mb-5 w-fit" distance={12}>
                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/60">
                            {badge.icon} {badge.text}
                        </div>
                    </Entrance>
                    <Entrance delay={0.08}>
                        <h2 className="text-3xl font-bold leading-[1.1] text-white">{kind}</h2>
                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">{intro}</p>
                        <p className="mt-3 text-sm text-white/35">Last updated: {lastUpdated}</p>
                    </Entrance>

                    <LegalTOC sections={sections} />

                    <div className="mt-6 shrink-0 border-t border-white/10 pt-5">
                        <p className="text-sm text-white/30">
                            Questions?{" "}
                            <a href={`mailto:${contactEmail}`} className="text-[#EDE8D0]/70 hover:text-[#EDE8D0]">
                                {contactEmail}
                            </a>
                        </p>
                    </div>
                </div>
            </aside>

            {/* ── RIGHT: content ── */}
            <div className="min-w-0 flex-1 px-6 pb-24 pt-28 lg:px-12 lg:pt-28">
                {/* Mobile header - the sticky panel is hidden below lg, so its title has to reappear here. */}
                <Entrance className="mb-10 lg:hidden">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-neutral-50 px-4 py-1.5 text-sm font-medium text-neutral-700 dark:border-neutral-700/80 dark:bg-neutral-900 dark:text-neutral-300">
                        {badge.icon} {badge.text}
                    </div>
                    <h1 className="text-4xl font-bold text-neutral-950 dark:text-white">{kind}</h1>
                    <p className="mt-2 text-neutral-600 dark:text-neutral-300">Last updated: {lastUpdated}</p>
                </Entrance>

                <div className="mx-auto max-w-3xl space-y-12">
                    {effective && (
                        <p className="hidden text-sm text-neutral-500 dark:text-neutral-400 lg:block">
                            Effective {effective} · Last updated {lastUpdated}
                        </p>
                    )}
                    {sections.map((s) => (
                        <Reveal key={s.id} distance={16}>
                        <section id={s.id} className="scroll-mt-28">
                            <h2 className="mb-4 text-xl font-bold text-neutral-900 dark:text-white">{s.label}</h2>
                            {s.callout && (
                                <div className="mb-4 rounded-2xl border border-[#EDE8D0] bg-[#EDE8D0]/60 p-4 text-sm leading-relaxed text-neutral-800 dark:border-[#EDE8D0]/30 dark:bg-[#EDE8D0]/10 dark:text-neutral-200">
                                    <strong className="font-semibold text-neutral-900 dark:text-white">The short version: </strong>
                                    {s.callout}
                                </div>
                            )}
                            <div className="space-y-3 text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
                                {renderContent(s.content)}
                            </div>
                        </section>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    )
}
