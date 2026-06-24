"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

/**
 * CardVisual renders a small, calm, looping animated SVG "scene" keyed by name,
 * sitting on a media panel with a subtle dot grid. Used as the top media area of
 * the cards on /services, /solutions, and /tools.
 *
 * Colors stay within the design tokens (text-so-ink and friends) and strokes use
 * currentColor where possible. Motion respects prefers-reduced-motion.
 */

type SceneProps = { reduced: boolean }

function Stage({ children }: { children: ReactNode }) {
    return (
        <svg
            viewBox="0 0 160 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
            aria-hidden="true"
        >
            {children}
        </svg>
    )
}

// Shared, calm transition presets.
const loop = (duration: number, delay = 0) => ({
    duration,
    delay,
    repeat: Infinity,
    ease: "easeInOut" as const,
})

/* ───────────────────────── Services ───────────────────────── */

function WebEngineering({ reduced }: SceneProps) {
    const lines = [
        { y: 44, w: 40, d: 0 },
        { y: 54, w: 64, d: 0.3 },
        { y: 64, w: 28, d: 0.6 },
    ]
    return (
        <Stage>
            <rect x="34" y="26" width="92" height="56" rx="6" className="stroke-so-ink-4" strokeWidth="1.5" />
            <line x1="34" y1="38" x2="126" y2="38" className="stroke-so-ink-4" strokeWidth="1.5" />
            <circle cx="41" cy="32" r="1.6" className="fill-so-ink-4" />
            <circle cx="47" cy="32" r="1.6" className="fill-so-ink-4" />
            <circle cx="53" cy="32" r="1.6" className="fill-so-ink-4" />
            {lines.map((l, i) => (
                <motion.rect
                    key={i}
                    x="42"
                    y={l.y}
                    height="3.5"
                    rx="1.75"
                    className="fill-so-ink-3"
                    initial={reduced ? { width: l.w, opacity: 1 } : { width: 0, opacity: 0.4 }}
                    animate={reduced ? { width: l.w, opacity: 1 } : { width: [0, l.w, l.w, 0], opacity: [0.4, 1, 1, 0.4] }}
                    transition={reduced ? undefined : loop(4.5, l.d)}
                />
            ))}
            <motion.rect
                x="42"
                y="73"
                width="2"
                height="4"
                className="fill-so-ink"
                animate={reduced ? undefined : { opacity: [1, 0, 1] }}
                transition={reduced ? undefined : loop(1.1)}
            />
        </Stage>
    )
}

function MobileEcology({ reduced }: SceneProps) {
    return (
        <Stage>
            <rect x="62" y="20" width="36" height="60" rx="7" className="stroke-so-ink-4" strokeWidth="1.5" />
            <rect x="66" y="26" width="28" height="44" rx="2" className="stroke-so-line" strokeWidth="1" />
            <line x1="74" y1="74" x2="86" y2="74" className="stroke-so-ink-4" strokeWidth="1.5" strokeLinecap="round" />
            <clipPath id="phone-clip">
                <rect x="66" y="26" width="28" height="44" rx="2" />
            </clipPath>
            <g clipPath="url(#phone-clip)">
                <motion.g
                    animate={reduced ? undefined : { x: [0, -28, -56, 0] }}
                    transition={reduced ? undefined : { ...loop(7.5), times: [0, 0.33, 0.66, 1] }}
                >
                    {[0, 1, 2].map((i) => (
                        <g key={i} transform={`translate(${i * 28} 0)`}>
                            <rect x="70" y="31" width="20" height="9" rx="2" className="fill-so-accent-soft" />
                            <rect x="70" y="44" width="13" height="3" rx="1.5" className="fill-so-ink-4" />
                            <rect x="70" y="50" width="20" height="3" rx="1.5" className="fill-so-ink-5" />
                            <rect x="70" y="56" width="16" height="3" rx="1.5" className="fill-so-ink-5" />
                        </g>
                    ))}
                </motion.g>
            </g>
        </Stage>
    )
}

function AiIntegration({ reduced }: SceneProps) {
    const nodes = [
        { cx: 80, cy: 50, r: 5 },
        { cx: 50, cy: 32, r: 3.5 },
        { cx: 50, cy: 68, r: 3.5 },
        { cx: 110, cy: 32, r: 3.5 },
        { cx: 110, cy: 68, r: 3.5 },
        { cx: 36, cy: 50, r: 3 },
        { cx: 124, cy: 50, r: 3 },
    ]
    const edges = [
        [0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [2, 5], [3, 6], [4, 6],
    ]
    return (
        <Stage>
            {edges.map(([a, b], i) => (
                <motion.line
                    key={i}
                    x1={nodes[a].cx}
                    y1={nodes[a].cy}
                    x2={nodes[b].cx}
                    y2={nodes[b].cy}
                    className="stroke-so-ink-5"
                    strokeWidth="1"
                    animate={reduced ? undefined : { opacity: [0.3, 1, 0.3] }}
                    transition={reduced ? undefined : loop(3.5, i * 0.25)}
                />
            ))}
            {nodes.map((n, i) => (
                <motion.circle
                    key={i}
                    cx={n.cx}
                    cy={n.cy}
                    r={n.r}
                    className={i === 0 ? "fill-so-accent" : "fill-so-ink-3"}
                    animate={reduced ? undefined : { scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
                    transition={reduced ? undefined : loop(3, i * 0.3)}
                    style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
                />
            ))}
        </Stage>
    )
}

function CloudArchitecture({ reduced }: SceneProps) {
    return (
        <Stage>
            <path
                d="M52 56a13 13 0 0 1 25-4 10 10 0 0 1 17 3 11 11 0 0 1-3 21H56a12 12 0 0 1-4-23z"
                className="stroke-so-ink-4 fill-so-surface"
                strokeWidth="1.5"
            />
            {[0, 1, 2].map((row) => (
                <rect
                    key={row}
                    x="104"
                    y={42 + row * 13}
                    width="24"
                    height="9"
                    rx="2"
                    className="stroke-so-ink-4 fill-so-surface"
                    strokeWidth="1.2"
                />
            ))}
            {[0, 1, 2].map((row) => (
                <circle key={row} cx="109" cy={46.5 + row * 13} r="1.3" className="fill-so-ink-4" />
            ))}
            {[0, 1, 2].map((i) => (
                <motion.circle
                    key={i}
                    r="2"
                    cy="55"
                    className="fill-so-accent"
                    animate={reduced ? { cx: 96, opacity: 0.8 } : { cx: [78, 104], opacity: [0, 1, 0] }}
                    transition={reduced ? undefined : loop(2.4, i * 0.8)}
                />
            ))}
        </Stage>
    )
}

function UiUxSystems({ reduced }: SceneProps) {
    const cells = [
        { x: 50, y: 30 }, { x: 74, y: 30 }, { x: 98, y: 30 },
        { x: 50, y: 54 }, { x: 74, y: 54 }, { x: 98, y: 54 },
    ]
    return (
        <Stage>
            {cells.map((c, i) => (
                <motion.rect
                    key={i}
                    x={c.x}
                    y={c.y}
                    width="18"
                    height="18"
                    rx={i % 2 === 0 ? 3 : 9}
                    className={i % 3 === 0 ? "fill-so-accent-soft stroke-so-ink-4" : "stroke-so-ink-4"}
                    strokeWidth="1.3"
                    animate={
                        reduced
                            ? undefined
                            : { rx: i % 2 === 0 ? [3, 9, 3] : [9, 3, 9], opacity: [0.55, 1, 0.55] }
                    }
                    transition={reduced ? undefined : loop(4, i * 0.35)}
                />
            ))}
        </Stage>
    )
}

function SystemSecurity({ reduced }: SceneProps) {
    return (
        <Stage>
            <path
                d="M80 24l22 8v16c0 14-9 24-22 28-13-4-22-14-22-28V32z"
                className="stroke-so-ink-4 fill-so-surface"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
            <rect x="73" y="50" width="14" height="11" rx="2" className="stroke-so-ink-3" strokeWidth="1.3" />
            <path d="M76 50v-3a4 4 0 0 1 8 0v3" className="stroke-so-ink-3" strokeWidth="1.3" />
            <motion.line
                x1="58"
                x2="102"
                className="stroke-so-accent"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={reduced ? { y1: 50, y2: 50, opacity: 0.6 } : { y1: [30, 78, 30], y2: [30, 78, 30], opacity: [0, 0.9, 0] }}
                transition={reduced ? undefined : loop(3.2)}
            />
        </Stage>
    )
}

/* ───────────────────────── Solutions ───────────────────────── */

function Startups({ reduced }: SceneProps) {
    return (
        <Stage>
            <motion.path
                d="M40 78C60 64 70 42 96 26"
                className="stroke-so-ink-5"
                strokeWidth="1.5"
                strokeDasharray="3 4"
                strokeLinecap="round"
                animate={reduced ? undefined : { strokeDashoffset: [0, -28] }}
                transition={reduced ? undefined : { ...loop(3), ease: "linear" }}
            />
            <motion.g
                animate={reduced ? undefined : { y: [0, -4, 0] }}
                transition={reduced ? undefined : loop(2.6)}
            >
                <path
                    d="M96 26c8 0 16 6 18 18-12 4-20 0-24-6 0-6 2-10 6-12z"
                    className="stroke-so-ink-4 fill-so-surface"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />
                <circle cx="103" cy="35" r="3" className="fill-so-accent-soft stroke-so-ink-4" strokeWidth="1.2" />
                <motion.path
                    d="M92 44c-3 3-4 7-3 10 3 1 7 0 10-3"
                    className="stroke-so-accent fill-none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    animate={reduced ? undefined : { opacity: [0.3, 1, 0.3] }}
                    transition={reduced ? undefined : loop(0.9)}
                />
            </motion.g>
        </Stage>
    )
}

function Businesses({ reduced }: SceneProps) {
    const bars = [
        { x: 48, h: 16 }, { x: 64, h: 26 }, { x: 80, h: 22 }, { x: 96, h: 36 }, { x: 112, h: 46 },
    ]
    return (
        <Stage>
            <line x1="42" y1="78" x2="124" y2="78" className="stroke-so-ink-4" strokeWidth="1.3" />
            {bars.map((b, i) => (
                <motion.rect
                    key={i}
                    x={b.x}
                    width="9"
                    rx="2"
                    className={i === bars.length - 1 ? "fill-so-accent" : "fill-so-ink-4"}
                    initial={reduced ? { y: 78 - b.h, height: b.h } : { y: 78, height: 0 }}
                    animate={reduced ? { y: 78 - b.h, height: b.h } : { y: [78, 78 - b.h], height: [0, b.h] }}
                    transition={reduced ? undefined : { ...loop(4), repeatType: "reverse", delay: i * 0.18 }}
                />
            ))}
            <motion.path
                d="M52 60 68 50 84 54 100 40 116 30"
                className="stroke-so-ink fill-none"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="120"
                animate={reduced ? { strokeDashoffset: 0 } : { strokeDashoffset: [120, 0] }}
                transition={reduced ? undefined : { ...loop(4), repeatType: "reverse" }}
            />
        </Stage>
    )
}

function Enterprises({ reduced }: SceneProps) {
    const blocks = [
        { x: 58, y: 60 }, { x: 80, y: 60 }, { x: 102, y: 60 },
        { x: 69, y: 44 }, { x: 91, y: 44 },
        { x: 80, y: 28 },
    ]
    return (
        <Stage>
            {blocks.map((b, i) => (
                <motion.rect
                    key={i}
                    x={b.x}
                    y={b.y}
                    width="18"
                    height="14"
                    rx="2"
                    className={i === blocks.length - 1 ? "fill-so-accent-soft stroke-so-ink-4" : "stroke-so-ink-4 fill-so-surface"}
                    strokeWidth="1.3"
                    initial={reduced ? { opacity: 1, y: b.y } : { opacity: 0, y: b.y + 6 }}
                    animate={reduced ? { opacity: 1, y: b.y } : { opacity: [0, 1, 1, 0], y: [b.y + 6, b.y, b.y, b.y + 6] }}
                    transition={reduced ? undefined : loop(5, i * 0.4)}
                />
            ))}
        </Stage>
    )
}

function ProductTeams({ reduced }: SceneProps) {
    const cols = [44, 70, 96]
    return (
        <Stage>
            {cols.map((x, ci) => (
                <g key={ci}>
                    <rect x={x} y="26" width="20" height="50" rx="3" className="stroke-so-line" strokeWidth="1" />
                    <rect x={x + 3} y="30" width="9" height="2.5" rx="1.25" className="fill-so-ink-4" />
                </g>
            ))}
            {[0, 1, 2].map((i) => (
                <motion.rect
                    key={i}
                    width="14"
                    height="9"
                    rx="2"
                    x={cols[0] + 3}
                    className={i === 1 ? "fill-so-accent-soft stroke-so-ink-4" : "fill-so-surface stroke-so-ink-4"}
                    strokeWidth="1.1"
                    animate={
                        reduced
                            ? { x: cols[1] + 3, y: 38 + i * 12 }
                            : { x: [cols[0] + 3, cols[1] + 3, cols[2] + 3, cols[0] + 3], y: 38 + i * 12 }
                    }
                    transition={reduced ? undefined : { ...loop(6, i * 0.7), times: [0, 0.33, 0.66, 1] }}
                />
            ))}
        </Stage>
    )
}

/* ───────────────────────── Tools ───────────────────────── */

function SyncOrbit({ reduced }: SceneProps) {
    const orbits = [
        { rx: 26, ry: 12, dur: 6, dot: "fill-so-accent" },
        { rx: 38, ry: 18, dur: 9, dot: "fill-so-ink-3" },
    ]
    return (
        <Stage>
            <circle cx="80" cy="50" r="6" className="fill-so-accent-soft stroke-so-ink-4" strokeWidth="1.3" />
            {orbits.map((o, i) => (
                <g key={i} transform={`rotate(${i === 0 ? -18 : 22} 80 50)`}>
                    <ellipse cx="80" cy="50" rx={o.rx} ry={o.ry} className="stroke-so-ink-5" strokeWidth="1" />
                    <motion.g
                        style={{ transformOrigin: "80px 50px" }}
                        animate={reduced ? undefined : { rotate: 360 }}
                        transition={reduced ? undefined : { duration: o.dur, repeat: Infinity, ease: "linear" }}
                    >
                        <circle cx={80 + o.rx} cy="50" r="2.6" className={o.dot} />
                    </motion.g>
                </g>
            ))}
        </Stage>
    )
}

function BudgetEstimator({ reduced }: SceneProps) {
    const coins = [
        { y: 70, w: 30 }, { y: 62, w: 26 }, { y: 54, w: 22 },
    ]
    return (
        <Stage>
            <rect x="44" y="26" width="34" height="52" rx="5" className="stroke-so-ink-4 fill-so-surface" strokeWidth="1.5" />
            <rect x="49" y="31" width="24" height="9" rx="2" className="fill-so-accent-soft stroke-so-ink-5" strokeWidth="1" />
            {[0, 1, 2].map((r) =>
                [0, 1, 2].map((c) => (
                    <rect key={`${r}-${c}`} x={50 + c * 8} y={44 + r * 8} width="5" height="5" rx="1.2" className="fill-so-ink-5" />
                ))
            )}
            {coins.map((coin, i) => (
                <motion.g
                    key={i}
                    initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                    animate={reduced ? { opacity: 1, y: 0 } : { opacity: [0, 1, 1, 0], y: [-8, 0, 0, -8] }}
                    transition={reduced ? undefined : loop(4.5, i * 0.5)}
                >
                    <ellipse cx="106" cy={coin.y} rx={coin.w / 2} ry="4" className="fill-so-surface stroke-so-ink-4" strokeWidth="1.2" />
                </motion.g>
            ))}
        </Stage>
    )
}

function RateCard({ reduced }: SceneProps) {
    return (
        <Stage>
            <motion.g
                style={{ transformOrigin: "80px 50px" }}
                animate={reduced ? undefined : { rotate: [-4, 4, -4] }}
                transition={reduced ? undefined : loop(4)}
            >
                <path
                    d="M62 34h24l24 24-26 26-24-24V34z"
                    className="stroke-so-ink-4 fill-so-surface"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />
                <circle cx="72" cy="44" r="3.2" className="stroke-so-ink-3" strokeWidth="1.3" />
            </motion.g>
            {["$", "€"].map((sym, i) => (
                <motion.text
                    key={sym}
                    x="92"
                    y="64"
                    textAnchor="middle"
                    className="fill-so-accent"
                    style={{ fontSize: 14, fontWeight: 600 }}
                    animate={reduced ? { opacity: i === 0 ? 1 : 0 } : { opacity: i === 0 ? [1, 1, 0, 0] : [0, 0, 1, 1] }}
                    transition={reduced ? undefined : { ...loop(4.5), times: [0, 0.45, 0.5, 1] }}
                >
                    {sym}
                </motion.text>
            ))}
        </Stage>
    )
}

function StrategyCall({ reduced }: SceneProps) {
    const bars = [
        { x: 66, h: 8 }, { x: 71, h: 16 }, { x: 76, h: 22 }, { x: 81, h: 14 }, { x: 86, h: 20 }, { x: 91, h: 10 },
    ]
    return (
        <Stage>
            <path
                d="M44 32h44a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6H58l-10 9V62a6 6 0 0 1-4-6V38a6 6 0 0 1 0-6z"
                className="stroke-so-ink-4 fill-so-surface"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
            {bars.map((b, i) => (
                <motion.rect
                    key={i}
                    x={b.x}
                    width="2.4"
                    rx="1.2"
                    className="fill-so-accent"
                    initial={reduced ? { y: 47 - b.h / 2, height: b.h } : { y: 47, height: 3 }}
                    animate={reduced ? { y: 47 - b.h / 2, height: b.h } : { y: [47 - 3 / 2, 47 - b.h / 2, 47 - 3 / 2], height: [3, b.h, 3] }}
                    transition={reduced ? undefined : loop(1.4, i * 0.12)}
                />
            ))}
            <motion.g
                animate={reduced ? undefined : { opacity: [0, 1, 1, 0], y: [4, 0, 0, 4] }}
                transition={reduced ? undefined : loop(4)}
            >
                <rect x="104" y="60" width="22" height="14" rx="5" className="stroke-so-ink-4 fill-so-surface" strokeWidth="1.3" />
                <path d="M110 74l-2 5 6-5z" className="fill-so-surface stroke-so-ink-4" strokeWidth="1.3" />
                <circle cx="111" cy="67" r="1.3" className="fill-so-ink-4" />
                <circle cx="115" cy="67" r="1.3" className="fill-so-ink-4" />
                <circle cx="119" cy="67" r="1.3" className="fill-so-ink-4" />
            </motion.g>
        </Stage>
    )
}

/* ───────────────────────── Default fallback ───────────────────────── */

function DefaultScene({ reduced }: SceneProps) {
    return (
        <Stage>
            <motion.circle
                cx="80"
                cy="50"
                r="20"
                className="stroke-so-ink-4 fill-none"
                strokeWidth="1.5"
                animate={reduced ? undefined : { scale: [1, 1.12, 1], opacity: [0.5, 1, 0.5] }}
                transition={reduced ? undefined : loop(3.5)}
                style={{ transformOrigin: "80px 50px" }}
            />
            <motion.circle
                cx="80"
                cy="50"
                r="6"
                className="fill-so-accent"
                animate={reduced ? undefined : { scale: [1, 1.3, 1] }}
                transition={reduced ? undefined : loop(2.4)}
                style={{ transformOrigin: "80px 50px" }}
            />
        </Stage>
    )
}

const SCENES: Record<string, (p: SceneProps) => ReactNode> = {
    // Services
    "web-engineering": WebEngineering,
    "mobile-ecology": MobileEcology,
    "ai-integration": AiIntegration,
    "cloud-architecture": CloudArchitecture,
    "ui-ux-systems": UiUxSystems,
    "system-security": SystemSecurity,
    // Solutions
    startups: Startups,
    businesses: Businesses,
    enterprises: Enterprises,
    "product-teams": ProductTeams,
    // Tools
    syncorbit: SyncOrbit,
    "budget-estimator": BudgetEstimator,
    "rate-card": RateCard,
    "strategy-call": StrategyCall,
}

export function CardVisual({ name, className = "" }: { name: string; className?: string }) {
    const prefersReduced = useReducedMotion()
    const reduced = !!prefersReduced
    const Scene = SCENES[name] ?? DefaultScene

    return (
        <div
            className={`relative overflow-hidden bg-so-surface-2 so-dot-bg ${className}`}
        >
            {/* soft radial glow to lift the scene off the dot grid */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(circle at 50% 45%, var(--so-surface) 0%, transparent 62%)",
                }}
            />
            <div className="relative h-full w-full text-so-ink">
                <Scene reduced={reduced} />
            </div>
        </div>
    )
}
