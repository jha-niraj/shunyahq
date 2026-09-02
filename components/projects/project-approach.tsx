"use client"

import { motion } from "framer-motion"
import type { ProjectApproachStep } from "@/content/projects"

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * The delivery spine.
 *
 * DOM rather than one stretched SVG on purpose. A `preserveAspectRatio="none"` viewBox is the usual
 * trick for keeping marks aligned to a CSS grid at any width, but it scales x and y independently -
 * so every `circle` on it renders as a squashed ellipse. Drawing the rail as a scaled div and the
 * nodes as percentage-positioned elements keeps the nodes perfectly round at every breakpoint and
 * still lines them up with the columns below.
 */
function Spine({ count }: { count: number }) {
    const xs = Array.from({ length: count }, (_, i) => ((i + 0.5) / count) * 100)
    return (
        <div className="relative hidden h-11 w-full lg:block" aria-hidden>
            {/* Rail: full width behind the nodes, faint. */}
            <span
                className="absolute top-1/2 h-px -translate-y-1/2 bg-so-line"
                style={{ left: `${xs[0]}%`, right: `${100 - xs[count - 1]!}%` }}
            />
            {/* Rail: drawn on scroll, in ink. */}
            <motion.span
                className="absolute top-1/2 block h-px origin-left -translate-y-1/2 bg-so-ink/45"
                style={{ left: `${xs[0]}%`, right: `${100 - xs[count - 1]!}%` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.1, ease: EASE }}
            />
            {xs.map((x, i) => (
                <motion.span
                    key={i}
                    className="absolute top-1/2 grid h-4 w-4 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-so-ink bg-so-bg"
                    style={{ left: `${x}%` }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.35, delay: 0.25 + i * 0.28, ease: EASE }}
                >
                    <motion.span
                        className="block h-1.5 w-1.5 rounded-full bg-so-ink"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.3, delay: 0.45 + i * 0.28, ease: EASE }}
                    />
                </motion.span>
            ))}
        </div>
    )
}

export function ProjectApproach({ steps }: { steps: ProjectApproachStep[] }) {
    if (steps.length === 0) return null

    return (
        <section className="mb-20">
            <div className="mb-8 flex items-center gap-4">
                <span className="so-eyebrow shrink-0">How We Built It</span>
                <span className="h-px flex-1 bg-so-line" />
            </div>

            <Spine count={steps.length} />

            <div className="grid gap-5 lg:mt-2 lg:grid-cols-3">
                {steps.map((s, i) => (
                    <div
                        key={s.phase}
                        data-rv=""
                        style={{ "--rv-y": "14px", "--rv-duration": "0.5s", "--rv-delay": `${i * 0.12}s` } as React.CSSProperties}
                        className="so-anim so-card flex h-full flex-col p-6"
                    >
                        <span className="so-mono text-[11px] uppercase tracking-[0.16em] text-so-ink-4">
                            {String(i + 1).padStart(2, "0")} · {s.phase}
                        </span>
                        <h3 className="mt-3 text-[16px] font-semibold tracking-[-0.01em] text-so-ink">{s.title}</h3>
                        <p className="mt-2.5 text-[14px] leading-[1.7] text-so-ink-2">{s.body}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
