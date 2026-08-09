"use client"

import { useState } from "react"
import { motion } from "framer-motion"

/**
 * The four scene illustrations for /synchq.
 *
 * Each one animates on first view and then stops, rather than looping forever - a page with four
 * perpetually moving diagrams is exhausting to read past. The pattern is the same one the landing
 * page uses: `--anim-play` starts at `paused` and flips to `running` when the card enters the
 * viewport, so a CSS animation with `fill-mode: both` holds its first frame until then.
 *
 * `preserveAspectRatio` is deliberately left at its default on every svg here. Setting it to `none`
 * scales x and y independently, which turns every circle into an ellipse - a mistake worth not
 * repeating.
 */

const INK = "#1A1A18"
const INK_3 = "#6E6F66"
const LINE = "#E5E2D7"
const OK = "#4F7A55"
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Wraps a scene so its animations only run once it has been seen. */
export function SceneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const [play, setPlay] = useState(false)
    return (
        <motion.div
            onViewportEnter={() => setPlay(true)}
            onMouseEnter={() => setPlay(true)}
            viewport={{ once: true, amount: 0.3 }}
            initial={false}
            style={{ ["--anim-play" as string]: play ? "running" : "paused" }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

/* ─── 1. Intake ──────────────────────────────────────────────────────────────
   A blank brief fills itself in as the assistant asks follow-ups. The point of the
   picture: questions on the left produce structure on the right. */

export function IntakeScene() {
    const rows = [
        { y: 60, w: 118, delay: 0.5 },
        { y: 82, w: 96, delay: 1.0 },
        { y: 104, w: 132, delay: 1.5 },
        { y: 126, w: 78, delay: 2.0 },
    ]
    const bubbles = [
        { y: 46, w: 104, mine: false, delay: 0.2 },
        { y: 74, w: 78, mine: true, delay: 0.7 },
        { y: 102, w: 116, mine: false, delay: 1.2 },
        { y: 130, w: 68, mine: true, delay: 1.7 },
    ]
    return (
        <svg viewBox="0 0 420 200" className="h-full w-full" role="img" aria-label="An intake conversation on the left filling in a structured brief on the right">
            {/* conversation */}
            <rect x="8" y="26" width="176" height="150" rx="12" fill="#FFFFFF" stroke={LINE} />
            <text x="20" y="44" fontSize="9" fill={INK_3} fontWeight="600" letterSpacing="1">INTAKE SESSION</text>
            {bubbles.map((b, i) => (
                <motion.g
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: b.delay, duration: 0.4, ease: EASE }}
                >
                    <rect
                        x={b.mine ? 176 - 12 - b.w : 20}
                        y={b.y}
                        width={b.w}
                        height="18"
                        rx="9"
                        fill={b.mine ? INK : "#F6F4EE"}
                        stroke={b.mine ? "none" : LINE}
                    />
                </motion.g>
            ))}

            {/* the flow of structure from left to right */}
            <motion.path
                d="M188 100 C 210 100, 214 100, 232 100"
                fill="none"
                stroke={LINE}
                strokeWidth="1.5"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
            />

            {/* the brief */}
            <rect x="236" y="26" width="176" height="150" rx="12" fill="#FFFFFF" stroke={LINE} />
            <text x="248" y="44" fontSize="9" fill={INK_3} fontWeight="600" letterSpacing="1">SCOPE BRIEF</text>
            {rows.map((r, i) => (
                <g key={i}>
                    <motion.rect
                        x="248" y={r.y} height="7" rx="3.5" fill="#E9E6DA"
                        initial={{ width: 0 }} animate={{ width: r.w }}
                        transition={{ delay: r.delay, duration: 0.5, ease: EASE }}
                    />
                    <motion.circle
                        cx="396" cy={r.y + 3.5} r="5" fill={OK}
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ delay: r.delay + 0.35, type: "spring", stiffness: 320, damping: 18 }}
                    />
                </g>
            ))}
        </svg>
    )
}

/* ─── 2. Delivery ────────────────────────────────────────────────────────────
   Cards move across a board and a progress rule fills as they land. */

export function DeliveryScene() {
    const cols = [
        { x: 14, label: "TODO", n: 2 },
        { x: 148, label: "ACTIVE", n: 3 },
        { x: 282, label: "SHIPPED", n: 2 },
    ]
    return (
        <svg viewBox="0 0 420 200" className="h-full w-full" role="img" aria-label="A task board with cards moving from todo to shipped">
            {cols.map((c) => (
                <g key={c.label}>
                    <rect x={c.x} y="20" width="124" height="160" rx="12" fill="#FBF9F3" stroke={LINE} />
                    <text x={c.x + 12} y="38" fontSize="8.5" fill={INK_3} fontWeight="700" letterSpacing="1.2">{c.label}</text>
                    {Array.from({ length: c.n }).map((_, i) => (
                        <motion.g
                            key={i}
                            initial={{ opacity: 0, x: -18 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 + i * 0.18 + cols.indexOf(c) * 0.3, duration: 0.45, ease: EASE }}
                        >
                            <rect x={c.x + 12} y={48 + i * 36} width="100" height="28" rx="7" fill="#FFFFFF" stroke={LINE} />
                            <rect x={c.x + 22} y={58 + i * 36} width={56 - i * 8} height="5" rx="2.5" fill="#E9E6DA" />
                            <circle cx={c.x + 100} cy={62 + i * 36} r="4.5" fill={c.label === "SHIPPED" ? OK : "#DAD6C8"} />
                        </motion.g>
                    ))}
                </g>
            ))}
        </svg>
    )
}

/* ─── 3. Client portal ───────────────────────────────────────────────────────
   One shared view: the studio's side and the client's side showing the same truth. */

export function PortalScene() {
    return (
        <svg viewBox="0 0 420 200" className="h-full w-full" role="img" aria-label="A studio view and a client portal showing the same live status">
            {[{ x: 10, label: "YOUR WORKSPACE" }, { x: 226, label: "CLIENT PORTAL" }].map((side, s) => (
                <g key={side.label}>
                    <rect x={side.x} y="24" width="184" height="152" rx="12" fill="#FFFFFF" stroke={LINE} />
                    <text x={side.x + 14} y="42" fontSize="8.5" fill={INK_3} fontWeight="700" letterSpacing="1.1">{side.label}</text>
                    <rect x={side.x + 14} y="54" width="156" height="1" fill={LINE} />
                    {[0, 1, 2].map((i) => (
                        <motion.g
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 + i * 0.22 + s * 0.12, duration: 0.4 }}
                        >
                            <rect x={side.x + 14} y={66 + i * 32} width="156" height="24" rx="7" fill="#FBF9F3" />
                            <circle cx={side.x + 26} cy={78 + i * 32} r="4" fill={i === 0 ? OK : "#DAD6C8"} />
                            <rect x={side.x + 38} y={75 + i * 32} width={i === 1 ? 62 : 84} height="5" rx="2.5" fill="#E4E0D2" />
                            {s === 0 && <rect x={side.x + 132} y={74 + i * 32} width="26" height="8" rx="4" fill="#EFEBDD" />}
                        </motion.g>
                    ))}
                    <text x={side.x + 14} y="166" fontSize="7.5" fill={INK_3}>
                        {s === 0 ? "edit, assign, invoice" : "read-only, always current"}
                    </text>
                </g>
            ))}
            {/* the sync line between them */}
            <motion.path
                d="M196 100 L 224 100"
                stroke={INK} strokeWidth="1.5" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ delay: 0.9, duration: 0.5, ease: EASE }}
            />
            <motion.circle
                cx="210" cy="100" r="9" fill="#FFFFFF" stroke={INK} strokeWidth="1.5"
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: 1.15, type: "spring", stiffness: 300, damping: 16 }}
            />
            <motion.path
                d="M206 100 l3 3 l5 -6"
                fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ delay: 1.35, duration: 0.3 }}
            />
        </svg>
    )
}

/* ─── 4. Money ───────────────────────────────────────────────────────────────
   Tracked hours become an invoice line by line, then the total settles. */

export function MoneyScene() {
    const lines = [
        { label: 42, amount: 34, delay: 0.4 },
        { label: 56, amount: 30, delay: 0.75 },
        { label: 38, amount: 36, delay: 1.1 },
    ]
    return (
        <svg viewBox="0 0 420 200" className="h-full w-full" role="img" aria-label="Tracked time turning into invoice lines and a settled total">
            {/* timesheet */}
            <rect x="10" y="26" width="150" height="150" rx="12" fill="#FBF9F3" stroke={LINE} />
            <text x="22" y="44" fontSize="8.5" fill={INK_3} fontWeight="700" letterSpacing="1.1">TRACKED TIME</text>
            {lines.map((l, i) => (
                <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: l.delay - 0.25, duration: 0.35 }}>
                    <rect x="22" y={58 + i * 26} width={l.label} height="6" rx="3" fill="#E4E0D2" />
                    <rect x="118" y={58 + i * 26} width="28" height="6" rx="3" fill="#DAD6C8" />
                </motion.g>
            ))}

            {/* the lines travelling to the invoice */}
            {lines.map((l, i) => (
                <motion.path
                    key={i}
                    d={`M162 ${61 + i * 26} C 196 ${61 + i * 26}, 200 ${72 + i * 24}, 236 ${72 + i * 24}`}
                    fill="none" stroke={LINE} strokeWidth="1.4" strokeDasharray="3 3"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ delay: l.delay, duration: 0.55, ease: EASE }}
                />
            ))}

            {/* invoice */}
            <rect x="240" y="26" width="170" height="150" rx="12" fill="#FFFFFF" stroke={LINE} />
            <text x="254" y="44" fontSize="8.5" fill={INK_3} fontWeight="700" letterSpacing="1.1">INVOICE</text>
            {lines.map((l, i) => (
                <motion.g key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: l.delay + 0.45, duration: 0.35 }}>
                    <rect x="254" y={68 + i * 24} width={l.label + 10} height="6" rx="3" fill="#E9E6DA" />
                    <rect x={396 - l.amount} y={68 + i * 24} width={l.amount} height="6" rx="3" fill="#CFCABA" />
                </motion.g>
            ))}
            <motion.line
                x1="254" y1="146" x2="396" y2="146" stroke={LINE}
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.6, duration: 0.4 }}
            />
            <motion.g initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 0.4, ease: EASE }}>
                <rect x="254" y="154" width="46" height="8" rx="4" fill="#E9E6DA" />
                <rect x="344" y="152" width="52" height="12" rx="6" fill={INK} />
            </motion.g>
        </svg>
    )
}
