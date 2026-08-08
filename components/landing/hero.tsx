"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
    ChevronRight, Check, Boxes, GitMerge, Rocket, Activity,
    FileText, ShieldCheck, GitPullRequest, FlaskConical, History, Bell,
} from "lucide-react"
import { HeroShaderBg } from "./hero-shader-bg"

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: (d: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: d * 0.08 } }),
}

// The hero is a forced-light band sitting on the champagne shader, so the stage draws against a
// known palette rather than inheriting theme tokens that could flip underneath it.
const INK = "#1A1A18"
const MUTED = "#6E6F66"
const FAINT = "#C4C2B6"
const LINE = "#E5E2D7"

/* ────────────────────────────── stage primitives ────────────────────────────── */

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`rounded-xl border border-neutral-200/90 bg-white shadow-[0_1px_2px_rgba(26,26,24,0.05)] ${className}`}>
            {children}
        </div>
    )
}

function SatelliteHead({ icon: Icon, title, sub }: { icon: typeof GitMerge; title: string; sub: string }) {
    return (
        <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-neutral-100 text-neutral-900">
                <Icon className="h-3.5 w-3.5" strokeWidth={1.9} />
            </span>
            <div className="min-w-0 leading-tight">
                <p className="truncate text-[12.5px] font-semibold text-neutral-900">{title}</p>
                <p className="truncate text-[10.5px] text-neutral-400">{sub}</p>
            </div>
        </div>
    )
}

function Bar({ w, tone = "muted" }: { w: string; tone?: "muted" | "ink" }) {
    return <span className={`block h-1.5 rounded-full ${tone === "ink" ? "bg-neutral-800" : "bg-neutral-200"}`} style={{ width: w }} />
}

/**
 * The connector layer.
 *
 * A `pathLength` draw-on keyed to the scene, so it redraws every time the stage changes. It sits
 * BEHIND the panels (z-0) and is `pointer-events-none`, so it reads as wiring between the cards
 * rather than as a graphic of its own.
 */
function Connectors({ paths }: { paths: string[] }) {
    return (
        <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            {paths.map((d, i) => (
                <motion.path
                    key={i}
                    d={d}
                    fill="none"
                    stroke={INK}
                    strokeOpacity={0.14}
                    strokeWidth={0.22}
                    strokeDasharray="1.6 1.4"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.1, delay: 0.25 + i * 0.12, ease: EASE }}
                />
            ))}
        </svg>
    )
}

/* ────────────────────────────── scene artwork ──────────────────────────────
   One animated SVG per scene, each chosen so the motion IS the claim rather than
   decoration: a spec fanning into tickets, branches merging to trunk, a pulse
   travelling a pipeline, and a latency curve drawing itself.

   The hard numbers live in a DOM row underneath rather than inside the SVG. An
   SVG scales its text with the viewBox, so on a 320px-wide card the in-art labels
   drop to ~6px; real text reflows and stays legible at every width.
   -------------------------------------------------------------------------- */

function StatRow({ items }: { items: string[] }) {
    return (
        <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12px] text-neutral-500">
            {items.map((s, i) => (
                <span key={s} className="flex items-center gap-2.5">
                    {i > 0 && <span className="h-1 w-1 rounded-full bg-neutral-300" />}
                    {s}
                </span>
            ))}
        </div>
    )
}

/** Scope: one spec document fanning out into discrete, estimated tickets. */
function ScopeArt() {
    const tickets = ["Auth + RBAC", "Data model", "Payments"]
    return (
        <svg viewBox="0 0 480 132" className="w-full" aria-hidden>
            <rect x="8" y="20" width="120" height="94" rx="10" fill="#FAFAF7" stroke={LINE} />
            {[38, 54, 70, 86].map((y, i) => (
                <motion.rect
                    key={y}
                    x="24" y={y} height="6" rx="3" fill={i === 0 ? INK : FAINT}
                    initial={{ width: 0 }}
                    animate={{ width: i === 0 ? 60 : [88, 72, 80][i - 1] }}
                    transition={{ duration: 0.45, delay: 0.15 + i * 0.1, ease: EASE }}
                />
            ))}
            <text x="24" y="106" fontSize="12" fill={MUTED} fontFamily="inherit">scope.md</text>

            {[26, 66, 106].map((y, i) => (
                <motion.path
                    key={y}
                    d={`M 134 66 C 168 66, 168 ${y + 14}, 196 ${y + 14}`}
                    fill="none" stroke={INK} strokeOpacity={0.22} strokeWidth={1.4} strokeDasharray="3 3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.45 + i * 0.12, ease: EASE }}
                />
            ))}

            {tickets.map((t, i) => {
                const y = [12, 52, 92][i]!
                return (
                    <motion.g
                        key={t}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 + i * 0.12, ease: EASE }}
                    >
                        <rect x="200" y={y} width="272" height="30" rx="8" fill="#FFFFFF" stroke={LINE} />
                        <circle cx="216" cy={y + 15} r="4.5" fill={INK} />
                        <text x="230" y={y + 19} fontSize="13" fill={INK} fontFamily="inherit">{t}</text>
                        <text x="462" y={y + 19} textAnchor="end" fontSize="12" fill={MUTED} fontFamily="inherit">
                            {["5d", "8d", "6d"][i]}
                        </text>
                    </motion.g>
                )
            })}
        </svg>
    )
}

/** Build: two feature branches diverging from main and merging back, drawn on. */
function BuildArt() {
    const trunkNodes = [40, 120, 300, 380, 448]
    const branchA = [188, 232, 276]
    const branchB = [250, 300]
    return (
        <svg viewBox="0 0 480 132" className="w-full" aria-hidden>
            <motion.path
                d="M 24 104 H 460" fill="none" stroke={INK} strokeOpacity={0.75} strokeWidth={2} strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease: EASE }}
            />
            <motion.path
                d="M 120 104 C 152 104, 152 62, 184 62 H 280 C 312 62, 312 104, 344 104"
                fill="none" stroke={INK} strokeOpacity={0.4} strokeWidth={1.8} strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.25, ease: EASE }}
            />
            <motion.path
                d="M 188 104 C 216 104, 216 24, 246 24 H 304 C 334 24, 334 104, 362 104"
                fill="none" stroke={INK} strokeOpacity={0.22} strokeWidth={1.8} strokeLinecap="round" strokeDasharray="4 4"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.45, ease: EASE }}
            />

            {trunkNodes.map((x, i) => (
                <motion.circle
                    key={`t${x}`} cx={x} cy="104" r="5" fill="#FFFFFF" stroke={INK} strokeWidth="2"
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 + i * 0.1, ease: EASE }}
                    style={{ transformOrigin: `${x}px 104px` }}
                />
            ))}
            {branchA.map((x, i) => (
                <motion.circle
                    key={`a${x}`} cx={x} cy="62" r="4.5" fill={INK}
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.55 + i * 0.1, ease: EASE }}
                    style={{ transformOrigin: `${x}px 62px` }}
                />
            ))}
            {branchB.map((x, i) => (
                <motion.circle
                    key={`b${x}`} cx={x} cy="24" r="4.5" fill={FAINT}
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.75 + i * 0.1, ease: EASE }}
                    style={{ transformOrigin: `${x}px 24px` }}
                />
            ))}

            <text x="24" y="92" fontSize="12" fill={MUTED} fontFamily="inherit">main</text>
            <text x="188" y="52" fontSize="12" fill={MUTED} fontFamily="inherit">feat/checkout</text>
            <text x="250" y="14" fontSize="12" fill={FAINT} fontFamily="inherit">fix/webhook-retry</text>
        </svg>
    )
}

/** Ship: a pulse travelling the deploy pipeline, stages filling as it passes. */
function ShipArt() {
    const stages = ["Build", "Test", "Preview", "Production"]
    const xs = [46, 186, 326, 442]
    return (
        <svg viewBox="0 0 480 132" className="w-full" aria-hidden>
            <line x1="46" y1="52" x2="442" y2="52" stroke={LINE} strokeWidth="3" strokeLinecap="round" />
            <motion.line
                x1="46" y1="52" x2="442" y2="52" stroke={INK} strokeWidth="3" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6 }}
            />
            <motion.circle
                cy="52" r="5" fill={INK}
                initial={{ cx: 46, opacity: 0 }}
                animate={{ cx: [46, 186, 326, 442], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6 }}
            />

            {xs.map((x, i) => (
                <motion.g
                    key={stages[i]}
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.14, ease: EASE }}
                >
                    <circle cx={x} cy="52" r="11" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
                    <motion.circle
                        cx={x} cy="52" r="5" fill={INK}
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 + i * 0.35, ease: EASE }}
                        style={{ transformOrigin: `${x}px 52px` }}
                    />
                    <text
                        x={x} y="84" textAnchor={i === xs.length - 1 ? "end" : i === 0 ? "start" : "middle"}
                        fontSize="13" fill={INK} fontFamily="inherit"
                    >
                        {stages[i]}
                    </text>
                    <text
                        x={x} y="100" textAnchor={i === xs.length - 1 ? "end" : i === 0 ? "start" : "middle"}
                        fontSize="12" fill={MUTED} fontFamily="inherit"
                    >
                        {["6s", "48s", "12s", "live"][i]}
                    </text>
                </motion.g>
            ))}
            <text x="46" y="24" fontSize="12" fill={MUTED} fontFamily="inherit">push to main</text>
            <text x="442" y="24" textAnchor="end" fontSize="12" fill={MUTED} fontFamily="inherit">zero downtime</text>
        </svg>
    )
}

/** Scale: the p95 latency curve drawing itself under a filled area. */
function ScaleArt() {
    const pts = [[24, 96], [80, 82], [136, 88], [192, 62], [248, 70], [304, 44], [360, 50], [416, 30], [456, 34]] as const
    const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ")
    const area = `${line} L 456 116 L 24 116 Z`
    return (
        <svg viewBox="0 0 480 132" className="w-full" aria-hidden>
            {[36, 60, 84, 108].map((y) => (
                <line key={y} x1="24" y1={y} x2="456" y2={y} stroke={LINE} strokeWidth="1" strokeDasharray="3 5" />
            ))}
            <motion.path
                d={area} fill={INK} fillOpacity={0.07}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
            />
            <motion.path
                d={line} fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 1.3, delay: 0.2, ease: EASE }}
            />
            <motion.circle
                cx="456" cy="34" r="5" fill={INK}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ duration: 0.35, delay: 1.4, ease: EASE }}
                style={{ transformOrigin: "456px 34px" }}
            />
            <motion.circle
                cx="456" cy="34" r="5" fill="none" stroke={INK} strokeWidth="1.5"
                initial={{ scale: 1, opacity: 0.6 }} animate={{ scale: 2.6, opacity: 0 }}
                transition={{ duration: 1.6, delay: 1.5, repeat: Infinity, ease: "easeOut" }}
                style={{ transformOrigin: "456px 34px" }}
            />
            <text x="24" y="20" fontSize="12" fill={MUTED} fontFamily="inherit">p95 latency, last 24h</text>
            <text x="456" y="20" textAnchor="end" fontSize="12" fill={INK} fontFamily="inherit">180ms</text>
        </svg>
    )
}

/* ────────────────────────────── the four scenes ────────────────────────────── */

type Scene = {
    key: string
    Icon: typeof GitMerge
    tag: string
    title: string
    main: React.ReactNode
    left: React.ReactNode
    right: React.ReactNode
    paths: string[]
}

const SCENES: Scene[] = [
    {
        key: "scope",
        Icon: Boxes,
        tag: "Step 1 · Scope",
        title: "Every requirement, mapped",
        paths: ["M 16 40 C 28 40, 30 50, 40 50", "M 84 62 C 72 62, 70 52, 60 52"],
        main: <><ScopeArt /><StatRow items={["3 tracks", "19 days to first release", "fixed price"]} /></>,
        left: (
            <>
                <SatelliteHead icon={FileText} title="Architecture doc" sub="reviewed · 24 pages" />
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                    <motion.div
                        initial={{ width: 0 }} animate={{ width: "100%" }}
                        transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
                        className="h-full rounded-full bg-neutral-900"
                    />
                </div>
                <p className="mt-2 text-[10.5px] text-neutral-400">Signed off before line one</p>
            </>
        ),
        right: (
            <>
                <SatelliteHead icon={ShieldCheck} title="Estimate locked" sub="fixed scope, fixed price" />
                <p className="mt-3 text-[12.5px] text-neutral-600">
                    <span className="font-semibold text-neutral-900">19 days</span> to first release
                </p>
                <p className="mt-1.5 text-[10.5px] text-neutral-400">No change-order roulette</p>
            </>
        ),
    },
    {
        key: "build",
        Icon: GitMerge,
        tag: "Step 2 · Build",
        title: "Every commit, reviewed",
        paths: ["M 18 34 C 30 34, 32 46, 42 46", "M 82 68 C 70 68, 68 56, 58 56"],
        main: <><BuildArt /><StatRow items={["213 commits", "46 PRs", "0 direct to main"]} /></>,
        left: (
            <>
                <SatelliteHead icon={GitPullRequest} title="PR #482" sub="typed end to end" />
                <div className="mt-3 space-y-1.5">
                    <Bar w="82%" tone="ink" />
                    <Bar w="54%" />
                </div>
                <p className="mt-2.5 text-[10.5px] font-semibold text-neutral-900">2 approvals · 0 to main</p>
            </>
        ),
        right: (
            <>
                <SatelliteHead icon={FlaskConical} title="Test suite" sub="every push" />
                <div className="mt-3 grid grid-cols-4 gap-1">
                    {[0, 1, 2, 3].map((i) => (
                        <motion.span
                            key={i}
                            initial={{ scaleY: 0.2, opacity: 0.3 }} animate={{ scaleY: 1, opacity: 1 }}
                            transition={{ delay: 0.35 + i * 0.09, ease: EASE }}
                            className="h-8 origin-bottom rounded bg-neutral-900/85"
                        />
                    ))}
                </div>
                <p className="mt-2.5 text-[10.5px] text-neutral-400">1,204 passing</p>
            </>
        ),
    },
    {
        key: "ship",
        Icon: Rocket,
        tag: "Step 3 · Ship",
        title: "Every deploy, automated",
        paths: ["M 17 58 C 29 58, 31 48, 41 48", "M 83 36 C 71 36, 69 46, 59 46"],
        main: <><ShipArt /><StatRow items={["6s build", "42s deploy", "zero downtime"]} /></>,
        left: (
            <>
                <SatelliteHead icon={Rocket} title="main@8a1f9c2e" sub="deploy succeeded" />
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                    <motion.div
                        initial={{ width: 0 }} animate={{ width: "100%" }}
                        transition={{ duration: 1, delay: 0.25, ease: EASE }}
                        className="h-full rounded-full bg-neutral-900"
                    />
                </div>
                <p className="mt-2 text-[10.5px] text-neutral-400">42s · no maintenance window</p>
            </>
        ),
        right: (
            <>
                <SatelliteHead icon={History} title="Rollback ready" sub="any revision" />
                <p className="mt-3 text-[12.5px] text-neutral-600">
                    One command, <span className="font-semibold text-neutral-900">under a minute</span>
                </p>
                <p className="mt-1.5 text-[10.5px] text-neutral-400">Every build is an artifact</p>
            </>
        ),
    },
    {
        key: "scale",
        Icon: Activity,
        tag: "Step 4 · Scale",
        title: "Every system, observable",
        paths: ["M 16 44 C 28 44, 30 50, 40 50", "M 84 58 C 72 58, 70 52, 60 52"],
        main: <><ScaleArt /><StatRow items={["180ms p95", "99.9% uptime", "autoscaled"]} /></>,
        left: (
            <>
                <SatelliteHead icon={Bell} title="Alerting" sub="paged before you notice" />
                <div className="mt-3 space-y-1.5">
                    <Bar w="90%" tone="ink" />
                    <Bar w="58%" />
                </div>
                <p className="mt-2.5 text-[10.5px] text-neutral-400">99.9% uptime</p>
            </>
        ),
        right: (
            <>
                <SatelliteHead icon={Check} title="Autoscaled" sub="traffic-aware" />
                <p className="mt-3 text-[12.5px] text-neutral-600">
                    <span className="font-semibold text-neutral-900">3 → 11 pods</span> on the spike
                </p>
                <p className="mt-1.5 text-[10.5px] text-neutral-400">Back down when it passes</p>
            </>
        ),
    },
]

/**
 * ## The stage
 *
 * The product visual is a full-width panel BELOW the copy rather than a right-hand column: the
 * visual gets the site's whole width, and the headline gets the whole measure instead of competing
 * with a card on the same horizontal band.
 *
 * Each scene is a centre panel plus two satellites overlapping its edges at different depths, wired
 * by the drawn-on connector layer. Scenes cross-fade on a shared key, so moving between them is one
 * continuous dissolve rather than four cards appearing in turn.
 */
function HeroStage() {
    const [i, setI] = useState(0)
    const [paused, setPaused] = useState(false)

    useEffect(() => {
        if (paused) return
        const t = setInterval(() => setI((v) => (v + 1) % SCENES.length), 4600)
        return () => clearInterval(t)
    }, [paused])

    const scene = SCENES[i]!
    const SceneIcon = scene.Icon

    return (
        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div className="relative overflow-hidden rounded-[26px] border border-neutral-900/10 bg-[#F5F2E9]/70 backdrop-blur-sm">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-50"
                    style={{
                        backgroundImage: `radial-gradient(${FAINT} 1px, transparent 1px)`,
                        backgroundSize: "22px 22px",
                    }}
                />

                {/* A DEFINITE height, not min-h + padding: the satellites are positioned by
                    percentage, and percentages against a min-height parent resolve to auto. A fixed
                    height also centres the panel so the leftover room splits evenly above and below
                    it, which is exactly the band the satellites occupy. */}
                <div className="relative h-[368px] px-4 sm:h-[420px] sm:px-8 lg:h-[470px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={scene.key}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.28, ease: "easeIn" } }}
                            transition={{ duration: 0.5, ease: EASE }}
                            className="absolute inset-0"
                        >
                            <Connectors paths={scene.paths} />

                            <motion.div
                                initial={{ opacity: 0, y: 16, scale: 0.985 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.55, ease: EASE }}
                                className="absolute left-1/2 top-1/2 z-10 w-[calc(100%-2rem)] max-w-[580px] -translate-x-1/2 -translate-y-1/2"
                            >
                                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_2px_4px_rgba(26,26,24,0.05),0_40px_80px_-38px_rgba(26,26,24,0.35)]">
                                    <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-3.5">
                                        <span className="inline-flex items-center gap-2 text-[12.5px] font-medium text-neutral-600">
                                            <span className="grid h-6 w-6 place-items-center rounded-md bg-neutral-900 text-white">
                                                <SceneIcon className="h-3.5 w-3.5" strokeWidth={2.2} />
                                            </span>
                                            {scene.tag}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Live
                                        </span>
                                    </div>
                                    <div className="p-5 sm:p-6">
                                        <h2 className="mb-4 text-[19px] font-semibold tracking-[-0.015em] text-neutral-900">{scene.title}</h2>
                                        {scene.main}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Satellites - hidden below lg, where the stage is too narrow to hold
                                three overlapping planes without them colliding. */}
                            <motion.div
                                initial={{ opacity: 0, y: 22, rotate: -1.5 }}
                                animate={{ opacity: 1, y: 0, rotate: -1.5 }}
                                transition={{ duration: 0.55, delay: 0.12, ease: EASE }}
                                className="absolute left-0 top-[11%] z-20 hidden w-[228px] lg:block xl:left-[3%]"
                            >
                                <Panel className="p-4">{scene.left}</Panel>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 22, rotate: 1.5 }}
                                animate={{ opacity: 1, y: 0, rotate: 1.5 }}
                                transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
                                className="absolute bottom-[11%] right-0 z-20 hidden w-[228px] lg:block xl:right-[3%]"
                            >
                                <Panel className="p-4">{scene.right}</Panel>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2">
                {SCENES.map((s, idx) => (
                    <button
                        key={s.key}
                        onClick={() => setI(idx)}
                        aria-label={`Show ${s.tag}`}
                        aria-current={idx === i}
                        className="h-1.5 rounded-full transition-all duration-300"
                        style={{ width: idx === i ? 30 : 9, background: idx === i ? INK : "#CBC9C2" }}
                    />
                ))}
            </div>
        </div>
    )
}

/* ────────────────────────────── the ticker ────────────────────────────── */

function ClientLogo({ name, className }: { name: string; className?: string }) {
    const c = className ?? "h-6 w-6"
    switch (name) {
        case "FinStream":
            return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9c3 0 3-3 6-3s3 3 6 3 3-3 6-3M3 15c3 0 3-3 6-3s3 3 6 3 3-3 6-3" /></svg>
        case "EduCore":
            return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M12 4 2 9l10 5 10-5-10-5Z" /><path d="M6 11v4c0 1.5 3 3 6 3s6-1.5 6-3v-4" /></svg>
        case "HealthPlus":
            return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="5" /><path d="M12 8v8M8 12h8" /></svg>
        case "LogiTech":
            return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="m3 7 9-4 9 4-9 4-9-4Z" /><path d="M3 7v10l9 4 9-4V7M12 11v10" /></svg>
        case "CreativeX":
            return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 5l14 14M19 5 5 19" /><circle cx="12" cy="12" r="9" /></svg>
        case "DataFlow":
            return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2"><circle cx="5" cy="6" r="2" /><circle cx="19" cy="6" r="2" /><circle cx="12" cy="18" r="2" /><path d="M7 6h10M6 8l5 8M18 8l-5 8" /></svg>
        case "AgileCorp":
            return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v4h-4" /></svg>
        case "SecureNet":
            return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M12 3 5 6v5c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg>
        default:
            return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /></svg>
    }
}

const HERO_CLIENTS = [
    "FinStream", "EduCore", "HealthPlus", "LogiTech",
    "CreativeX", "DataFlow", "AgileCorp", "SecureNet",
]

function HeroTicker() {
    const Track = () => (
        <div className="flex shrink-0 items-center gap-10 pr-10">
            {HERO_CLIENTS.map((name) => (
                <span key={name} className="flex items-center gap-2.5 whitespace-nowrap text-[15px] font-medium text-neutral-500">
                    <ClientLogo name={name} className="h-5 w-5 shrink-0" />
                    {name}
                </span>
            ))}
        </div>
    )
    return (
        // `mt-auto` pins the ticker to the BOTTOM of the hero rather than merely following the
        // stage. On a tall viewport where the hero's min-height exceeds its content, the spare room
        // opens up above the ticker, so it always sits on the hero's bottom edge as its closing rule.
        <div className="relative z-[2] mt-auto border-t border-neutral-900/10 bg-white/60 backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-4 sm:px-7">
                <span className="hidden shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400 sm:block">
                    Trusted by
                </span>
                <div className="relative min-w-0 flex-1 overflow-hidden">
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#FBF8EF] to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#FBF8EF] to-transparent" />
                    <div className="flex w-max" style={{ animation: "hero-ticker 32s linear infinite" }}>
                        <Track />
                        <Track />
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Hero() {
    return (
        <section
            className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#FBF8EF]"
            style={{ isolation: "isolate" }}
        >
            {/* Animated champagne mesh-gradient - stays at the back. */}
            <HeroShaderBg />

            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[1] opacity-50"
                style={{
                    backgroundImage: `radial-gradient(${FAINT} 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                    maskImage: "radial-gradient(120% 70% at 50% 0%, #000 20%, transparent 75%)",
                    WebkitMaskImage: "radial-gradient(120% 70% at 50% 0%, #000 20%, transparent 75%)",
                }}
            />

            <div className="relative z-[2] mx-auto w-full max-w-7xl px-5 pb-6 pt-[clamp(96px,11vh,124px)] sm:px-7">
                {/* Copy block. Left-aligned and capped at ~3xl so the headline breaks where it
                    should, while the stage below runs the full width. */}
                <div className="max-w-3xl">
                    <motion.span
                        variants={fadeUp} initial="hidden" animate="show" custom={1}
                        className="inline-flex h-7 items-center gap-2 rounded-full border border-neutral-900/10 bg-white/80 px-3 text-[12.5px] font-medium text-neutral-700 backdrop-blur"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />
                        Software engineering studio
                    </motion.span>

                    <motion.h1
                        variants={fadeUp} initial="hidden" animate="show" custom={2}
                        className="mt-6 text-[clamp(40px,6.6vw,76px)] font-bold leading-[0.99] tracking-[-0.04em] text-neutral-900 text-balance"
                    >
                        We build the <span className="text-neutral-900/40">future.</span>
                    </motion.h1>

                    <motion.div
                        variants={fadeUp} initial="hidden" animate="show" custom={4}
                        className="mt-8 flex flex-wrap items-center gap-3"
                    >
                        <Link
                            href="/contactus"
                            className="group inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-7 py-3.5 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-neutral-800"
                        >
                            Start a Project
                            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-900/15 bg-white/60 px-7 py-3.5 text-[14px] font-medium text-neutral-700 backdrop-blur-sm transition-all hover:bg-white/80"
                        >
                            See Our Work <span className="text-neutral-400">→</span>
                        </Link>
                    </motion.div>
                </div>

                <motion.div variants={fadeUp} initial="hidden" animate="show" custom={6} className="mt-9">
                    <HeroStage />
                </motion.div>
            </div>

            <HeroTicker />

            <style>{`
                @keyframes hero-ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
            `}</style>
        </section>
    )
}
