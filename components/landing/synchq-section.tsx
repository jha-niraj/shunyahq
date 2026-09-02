"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"

/**
 * The SyncHQ block on the landing page.
 *
 * Deliberately the only place on the home page that talks about a product rather than the studio,
 * so it reads as an aside - "here is the thing we built for ourselves" - rather than a second
 * pitch competing with the service. The full story lives at /synchq.
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const LINE = "#E5E2D7"
const INK = "#1A1A18"
const OK = "#4F7A55"

const STEPS = [
    { k: "Intake", d: "A guided session that finds out what the client actually wants." },
    { k: "Delivery", d: "The scope becomes the board, and the board is also the timesheet." },
    { k: "Portal", d: "Clients watch the same records live, so nobody writes a status update." },
    { k: "Invoice", d: "Assembled from the hours and milestones already recorded." },
]

/** One record travelling through the four stages, drawn as a single continuous rail. */
function LoopDiagram() {
    const [play, setPlay] = useState(false)
    const xs = [58, 158, 258, 358]
    return (
        <motion.div
            onViewportEnter={() => setPlay(true)}
            viewport={{ once: true, amount: 0.4 }}
            initial={false}
            className="w-full"
        >
            <svg viewBox="0 0 416 120" className="h-full w-full" role="img" aria-label="One record moving through intake, delivery, portal and invoice">
                <line x1="58" y1="52" x2="358" y2="52" stroke={LINE} strokeWidth="1.5" />
                <motion.line
                    x1="58" y1="52" x2="358" y2="52" stroke={INK} strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={play ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 1.5, ease: EASE, delay: 0.2 }}
                />
                {xs.map((x, i) => (
                    <g key={i}>
                        <motion.circle
                            cx={x} cy="52" r="13" fill="#FFFFFF" stroke={LINE} strokeWidth="1.5"
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={play ? { scale: 1, opacity: 1 } : {}}
                            transition={{ delay: 0.25 + i * 0.32, type: "spring", stiffness: 300, damping: 18 }}
                        />
                        <motion.circle
                            cx={x} cy="52" r="4.5" fill={i === 3 ? OK : INK}
                            initial={{ scale: 0 }}
                            animate={play ? { scale: 1 } : {}}
                            transition={{ delay: 0.45 + i * 0.32, type: "spring", stiffness: 340, damping: 16 }}
                        />
                        {/* Opacity only. Animating `y` on an SVG <text> makes framer-motion write a
                            CSS translateY rather than the y attribute, so the label lands at
                            82 + 88 = 170 - outside this 120-tall viewBox - and never appears. */}
                        <motion.text
                            x={x} y="82" textAnchor="middle" fontSize="10.5" fontWeight="600" fill={INK}
                            initial={{ opacity: 0 }}
                            animate={play ? { opacity: 1 } : {}}
                            transition={{ delay: 0.5 + i * 0.32, duration: 0.35, ease: EASE }}
                        >
                            {STEPS[i]!.k}
                        </motion.text>
                    </g>
                ))}
                <motion.text
                    x="208" y="24" textAnchor="middle" fontSize="9" fill="#9A9B91" fontWeight="600" letterSpacing="1.4"
                    initial={{ opacity: 0 }} animate={play ? { opacity: 1 } : {}} transition={{ delay: 1.5, duration: 0.4 }}
                >
                    ONE RECORD, NEVER RETYPED
                </motion.text>
            </svg>
        </motion.div>
    )
}

export function SyncHQSection() {
    return (
        <section className="so-section relative border-t border-so-line">
            <div className="so-container">
                <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
                    <div data-rv="" className="so-anim" style={{ "--rv-y": "18px", "--rv-duration": "0.55s" } as React.CSSProperties}>
                        <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-so-ink px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-so-bg">
                            <Sparkles className="h-3 w-3" />
                            Our own product
                        </span>

                        <h2 className="so-serif mt-5 text-[clamp(26px,3.6vw,42px)] font-bold leading-[1.06] tracking-[-0.03em] text-so-ink">
                            We got tired of running a studio out of six tools. So we built{" "}
                            <span className="text-so-ink-4">SyncHQ.</span>
                        </h2>

                        <p className="so-lede mt-5 max-w-xl">
                            Client intake, delivery, the client portal and the invoicing in one system. The
                            intake becomes the scope, the scope becomes the board, the board becomes the
                            timesheet, and the timesheet becomes the invoice - with nobody retyping anything
                            in between.
                        </p>

                        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-so-ink-3">
                            Every project on this site was delivered through it. That is the only endorsement
                            we can honestly give a product this young, and it is the one we would want to hear.
                        </p>

                        <div className="mt-7 flex flex-wrap items-center gap-3">
                            <Link href="/synchq" className="so-btn so-btn-primary">
                                See what it does <ArrowRight size={14} />
                            </Link>
                            <Link href="/projects/synchq" className="so-btn so-btn-ghost">
                                How we built it
                            </Link>
                        </div>
                    </div>

                    <div data-rv="" className="so-anim" style={{ "--rv-y": "18px", "--rv-duration": "0.55s", "--rv-delay": "0.08s" } as React.CSSProperties}>
                        <div className="so-card p-6 sm:p-8">
                            <LoopDiagram />
                            <ul className="mt-6 grid gap-4 border-t border-so-line pt-6 sm:grid-cols-2">
                                {STEPS.map((s) => (
                                    <li key={s.k}>
                                        <p className="text-[14px] font-semibold text-so-ink">{s.k}</p>
                                        <p className="mt-1 text-[13.5px] leading-relaxed text-so-ink-3">{s.d}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
