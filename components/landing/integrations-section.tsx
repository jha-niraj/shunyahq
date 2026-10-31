"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { STACK_LOGOS, type StackLogo } from "./stack-logos"

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

const EASE = [0.22, 1, 0.36, 1] as const

// Rounded tile in the style of each tool's own app icon, carrying its official mark.
function LogoTile({ logo }: { logo: StackLogo }) {
    const offset = (40 - logo.size) / 2
    return (
        <svg viewBox="0 0 40 40" width="40" height="40" className="rounded-[11px]" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <rect width="40" height="40" fill={logo.bg} />
            <path d={logo.d} fill={logo.fill} transform={`translate(${offset} ${offset}) scale(${logo.size / 24})`} />
        </svg>
    )
}

/**
 * The count is load-bearing: the funnel geometry assumes ten evenly spaced columns in this order,
 * so adding an eleventh means editing both.
 */
const ITEMS = STACK_LOGOS

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
        stat: "10 core tools",
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
                <div data-rv=""
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
                </div>

                <div data-rv=""
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
                        <div data-rv="" data-rv-group="" className="grid grid-cols-5 gap-x-2 gap-y-6 lg:grid-cols-10">
                            {ITEMS.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <span className="grid h-[58px] w-[58px] place-items-center rounded-[18px] border border-neutral-200 bg-white shadow-[0_10px_28px_-16px_rgba(0,0,0,0.35)] dark:border-neutral-700/70 dark:bg-neutral-900">
                                        <LogoTile logo={item} />
                                    </span>
                                    <span className="whitespace-nowrap text-center font-mono text-[10px] tracking-tight text-neutral-500 dark:text-neutral-400">
                                        {item.name}
                                    </span>
                                </div>
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
                </div>

                <div data-rv="" data-rv-group="" className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {PROOF.map((p) => (
                        <div
                            key={p.stat}
                            className="rounded-2xl border border-neutral-200 bg-white/60 p-6 dark:border-neutral-800 dark:bg-neutral-900/40"
                        >
                            <p className="text-[30px] font-semibold leading-none tracking-[-0.03em] text-neutral-900 dark:text-white">
                                {p.stat}
                            </p>
                            <p className="mt-4 text-[15px] font-semibold text-neutral-900 dark:text-white">{p.title}</p>
                            <p className="mt-2 text-[13.5px] leading-relaxed text-neutral-500 dark:text-neutral-400">{p.body}</p>
                        </div>
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
