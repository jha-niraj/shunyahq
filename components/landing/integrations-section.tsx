"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

/**
 * ## The stack, rebuilt
 *
 * This used to be a 260vh scroll-jacked orbit: twenty-four logo tiles rotating on an ellipse around
 * a caption, with a scroll listener recomputing every tile's transform on every frame. Three things
 * were wrong with it, and only the first is cosmetic:
 *
 *  1. **It read as a novelty, not a claim.** A ring of logos says "we know these tools"; it never
 *     showed what Shunya DOES with them, which is the actual selling point.
 *  2. **It cost two and a half viewports of scrolling** to deliver three sentences, in the middle of
 *     a page that is already long.
 *  3. **It fought the rest of the page.** Every other section speaks in still, composed cards with a
 *     drawn SVG inside. An orbiting carousel was the one element in a different language.
 *
 * So it is now the same language as the rest of the landing page: a composed card whose animation IS
 * the claim - every tool funnelling into one shipped system - with real brand tiles kept, because
 * recognising your own stack at a glance is what this section is for.
 */

type Item = { id: string; name: string; mark: ReactNode }

const EASE = [0.22, 1, 0.36, 1] as const

// Rounded brand tile with a centred glyph, in the style of each tool's own app icon.
function Tile({ bg, children }: { bg: string; children: ReactNode }) {
    return (
        <svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <rect width="40" height="40" rx="11" fill={bg} />
            {children}
        </svg>
    )
}

const T = (x: number, y: number, size: number, weight: string, extra: Record<string, string | number> = {}) => ({
    x, y, textAnchor: "middle" as const, fill: "#fff", fontFamily: "inherit",
    fontWeight: weight, fontSize: size, ...extra,
})

const NextLogo = () => (
    <Tile bg="#000000">
        <circle cx="20" cy="20" r="11.5" stroke="#fff" strokeOpacity="0.45" strokeWidth="1.4" fill="none" />
        <path d="M15 27 L15 13 L26 27 M24.5 13 L24.5 22" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Tile>
)
const ReactLogo = () => (
    <Tile bg="#087EA4">
        <circle cx="20" cy="20" r="2.6" fill="#fff" />
        <g stroke="#fff" strokeWidth="1.5" fill="none">
            <ellipse cx="20" cy="20" rx="11" ry="4.3" />
            <ellipse cx="20" cy="20" rx="11" ry="4.3" transform="rotate(60 20 20)" />
            <ellipse cx="20" cy="20" rx="11" ry="4.3" transform="rotate(120 20 20)" />
        </g>
    </Tile>
)
const TypeScriptLogo = () => (
    <Tile bg="#3178C6">
        <text {...T(20, 27, 16, "800")}>TS</text>
    </Tile>
)
const NodeLogo = () => (
    <Tile bg="#5FA04E">
        <path d="M20 7 L31 13.5 L31 26.5 L20 33 L9 26.5 L9 13.5 Z" stroke="#fff" strokeOpacity="0.45" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
        <path d="M16 25.5 L16 16 L24 25.5 L24 16" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Tile>
)
const PostgresLogo = () => (
    <Tile bg="#336791">
        <ellipse cx="20" cy="13" rx="9" ry="3.6" stroke="#fff" strokeWidth="1.8" fill="none" />
        <path d="M11 13 L11 27 C11 29 15 30.5 20 30.5 C25 30.5 29 29 29 27 L29 13" stroke="#fff" strokeWidth="1.8" fill="none" />
        <path d="M11 20 C11 22 15 23.5 20 23.5 C25 23.5 29 22 29 20" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.8" fill="none" />
    </Tile>
)
const AwsLogo = () => (
    <Tile bg="#FF9900">
        <text {...T(20, 22, 11, "800", { letterSpacing: "0.3" })}>aws</text>
        <path d="M11 27 C16 30.5 24 30.5 29 27" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M26.5 25.8 L29.8 26.5 L29 30" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Tile>
)
const KubernetesLogo = () => (
    <Tile bg="#326CE5">
        <path d="M20 8 L29.5 13.5 L29.5 24.5 L20 30 L10.5 24.5 L10.5 13.5 Z" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
        <circle cx="20" cy="19" r="2.8" fill="#fff" />
        <g stroke="#fff" strokeWidth="1.5" strokeLinecap="round">
            <line x1="20" y1="19" x2="20" y2="11.5" />
            <line x1="20" y1="19" x2="26.5" y2="23" />
            <line x1="20" y1="19" x2="13.5" y2="23" />
        </g>
    </Tile>
)
const OpenAiLogo = () => (
    <Tile bg="#0F0F0F">
        <g transform="translate(20,20)">
            {[0, 60, 120, 180, 240, 300].map((deg) => (
                <ellipse key={deg} cx="0" cy="-6.8" rx="2.7" ry="6.8" fill="#fff" opacity="0.9" transform={`rotate(${deg})`} />
            ))}
            <circle cx="0" cy="0" r="3.1" fill="#0F0F0F" />
        </g>
    </Tile>
)
const AnthropicLogo = () => (
    <Tile bg="#D97757">
        <path d="M12 30 L20 9 L28 30" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1="15.2" y1="23.5" x2="24.8" y2="23.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
    </Tile>
)
const StripeLogo = () => (
    <Tile bg="#635BFF">
        <text {...T(20, 28, 20, "800", { fontStyle: "italic" })}>S</text>
    </Tile>
)

/**
 * Ten rails, in the order the funnel below draws them. The count is load-bearing: the funnel
 * geometry assumes ten evenly spaced columns, so adding an eleventh means editing both.
 */
const ITEMS: Item[] = [
    { id: "nextjs", name: "Next.js", mark: <NextLogo /> },
    { id: "react", name: "React", mark: <ReactLogo /> },
    { id: "typescript", name: "TypeScript", mark: <TypeScriptLogo /> },
    { id: "node", name: "Node.js", mark: <NodeLogo /> },
    { id: "postgres", name: "PostgreSQL", mark: <PostgresLogo /> },
    { id: "aws", name: "AWS", mark: <AwsLogo /> },
    { id: "kubernetes", name: "Kubernetes", mark: <KubernetesLogo /> },
    { id: "openai", name: "OpenAI", mark: <OpenAiLogo /> },
    { id: "anthropic", name: "Anthropic", mark: <AnthropicLogo /> },
    { id: "stripe", name: "Stripe", mark: <StripeLogo /> },
]

/**
 * The funnel: ten rails, one system.
 *
 * `preserveAspectRatio="none"` with a 0-100 x-axis so each line's start point stays aligned with the
 * tile grid above at every width - the grid is a CSS grid and the SVG is a separate box, so the only
 * way the two can agree across breakpoints is for both to be proportional.
 */
function Funnel() {
    return (
        <svg
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            className="h-[68px] w-full text-neutral-900 sm:h-[84px] dark:text-neutral-100"
            aria-hidden
        >
            {Array.from({ length: ITEMS.length }, (_, i) => {
                // Centre of column i in a 10-column grid, in percent.
                const x = (i + 0.5) * 10
                return (
                    <motion.path
                        key={i}
                        d={`M ${x} 0 C ${x} 20, 50 20, 50 40`}
                        fill="none"
                        stroke="currentColor"
                        strokeOpacity={0.22}
                        strokeWidth={1}
                        vectorEffect="non-scaling-stroke"
                        strokeDasharray="3 3"
                        initial={{ strokeDashoffset: 0 }}
                        whileInView={{ strokeDashoffset: -24 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 1.4, delay: i * 0.06, repeat: Infinity, ease: "linear" }}
                    />
                )
            })}
        </svg>
    )
}

const PROOF = [
    {
        stat: "24+ tools",
        title: "One integrated stack",
        body: "Next.js, React, TypeScript, AWS, Kubernetes and the rest - wired together on day one, not bolted on at the end.",
    },
    {
        stat: "1 team",
        title: "Concept to launch",
        body: "Frontend, backend, infrastructure and deployment owned by one accountable group. No handoffs, no finger pointing.",
    },
    {
        stat: "99.9%",
        title: "The uptime we design for",
        body: "Monitoring, backups and observability ship with the first release - not after the first incident.",
    },
]

export default function IntegrationsSection() {
    return (
        <section className="py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <p className="mb-4 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                        Our stack
                    </p>
                    <h2 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl dark:text-white">
                        Every tool, pulling in{" "}
                        <span className="text-neutral-400 dark:text-neutral-500">one direction.</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-lg text-base text-neutral-600 dark:text-neutral-400">
                        Battle-tested tools, wired together by one team. Nothing here is a pilot - this is the stack your
                        product ships on.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                    className="relative mt-14 overflow-hidden rounded-3xl border border-neutral-200 bg-white/60 px-4 py-10 backdrop-blur-sm sm:px-8 sm:py-12 dark:border-neutral-800 dark:bg-neutral-900/40"
                >
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.25]"
                        style={{
                            backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
                            backgroundSize: "22px 22px",
                            color: "rgb(163 163 163 / 0.5)",
                        }}
                    />

                    <div className="relative">
                        {/* A 5-column grid on small screens becomes the 10-column row the funnel is
                            drawn against, so the lines only claim to line up with the tiles at the
                            width where they actually do. */}
                        <div className="grid grid-cols-5 gap-x-2 gap-y-6 lg:grid-cols-10">
                            {ITEMS.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <span className="grid h-[58px] w-[58px] place-items-center rounded-[18px] border border-neutral-200 bg-white shadow-[0_10px_28px_-16px_rgba(0,0,0,0.35)] dark:border-neutral-700/70 dark:bg-neutral-900">
                                        {item.mark}
                                    </span>
                                    <span className="whitespace-nowrap text-center font-mono text-[10px] tracking-tight text-neutral-500 dark:text-neutral-400">
                                        {item.name}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Only drawn at lg, where the tile grid is the single 10-column row the
                            funnel geometry assumes. Below that the tiles wrap to two rows and the
                            lines would point at nothing. */}
                        <div className="hidden lg:block">
                            <Funnel />
                        </div>

                        <div className="mt-8 flex justify-center lg:mt-0">
                            <div className="w-full max-w-[420px] rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_30px_60px_-40px_rgba(0,0,0,0.35)] dark:border-neutral-700/70 dark:bg-neutral-900">
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] font-semibold text-neutral-900 dark:text-white">
                                        One production system
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
                                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Live
                                    </span>
                                </div>
                                <svg viewBox="0 0 380 40" className="mt-4 w-full text-neutral-900 dark:text-neutral-100" aria-hidden>
                                    <motion.rect
                                        x={0}
                                        y={8}
                                        height={10}
                                        rx={5}
                                        fill="currentColor"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: 380 }}
                                        viewport={{ once: false, amount: 0.4 }}
                                        transition={{ duration: 1.1, ease: EASE, repeat: Infinity, repeatDelay: 3 }}
                                    />
                                    <text x={0} y={36} fontSize={11} fill="currentColor" fillOpacity={0.45} fontFamily="inherit">
                                        one team, from concept to launch
                                    </text>
                                </svg>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {PROOF.map((p, i) => (
                        <motion.div
                            key={p.stat}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                            className="rounded-2xl border border-neutral-200 bg-white/60 p-6 dark:border-neutral-800 dark:bg-neutral-900/40"
                        >
                            <p className="text-[30px] font-semibold leading-none tracking-[-0.03em] text-neutral-900 dark:text-white">
                                {p.stat}
                            </p>
                            <p className="mt-4 text-[15px] font-semibold text-neutral-900 dark:text-white">{p.title}</p>
                            <p className="mt-2 text-[13.5px] leading-relaxed text-neutral-500 dark:text-neutral-400">{p.body}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 flex justify-center">
                    <Link
                        href="/services/web-engineering"
                        className="group inline-flex items-center gap-2 text-[14px] font-semibold text-neutral-900 dark:text-white"
                    >
                        See how we build with it
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
