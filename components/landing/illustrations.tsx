"use client"

/**
 * Reusable, theme-responsive framer-motion illustrations used across the landing
 * and marketing pages. Each one shows a *real* Shunya Tech capability:
 *   - StreamingChat / CitationAnswer  -> AI coding assistant + deploy status
 *   - ExamCard                        -> SyncOrbit kanban / sprint task card
 *   - VouchingScan                    -> CI/CD pipeline build scan (Build->Test->Deploy)
 *   - ReportDraft                     -> live client analytics dashboard
 *   - MiniBarChart / LangToggle       -> dashboards + environment switcher
 *   - FloatingCard                    -> hero glass card (tilt + idle float)
 *
 * Animations run on whileInView (once) so they replay nicely as the user scrolls.
 */

import { type ReactNode, useId } from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import {
    GitBranch, CheckCircle2, AlertTriangle, Sparkles, Quote,
    Star, BadgeCheck, CalendarClock, Activity, Terminal,
} from "lucide-react"

const EASE = [0.22, 1, 0.36, 1] as const

// Shared glass card chrome - works in both themes.
const cardChrome =
    "rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/80 dark:bg-neutral-900/70 backdrop-blur-xl shadow-[0_10px_40px_-18px_rgba(0,0,0,0.25)] dark:shadow-[0_10px_40px_-18px_rgba(0,0,0,0.7)]"

function WindowDots() {
    return (
        <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            <span className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            <span className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
        </span>
    )
}

/* ------------------------------------------------------------------ */
/* 1. Streaming AI coding assistant - "Scaffold a Next.js dashboard"   */
/* ------------------------------------------------------------------ */

const chatContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.5, delayChildren: 0.15 } },
}
const bubbleIn: Variants = {
    hidden: { opacity: 0, y: 12, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
}

export function StreamingChat({ className }: { className?: string }) {
    return (
        <motion.div
            variants={chatContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className={cn(cardChrome, "w-full p-4 sm:p-5", className)}
        >
            <div className="mb-4 flex items-center justify-between">
                <WindowDots />
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                    Shunya AI
                </span>
            </div>

            <motion.div variants={bubbleIn} className="mb-3 flex justify-end">
                <p className="max-w-[80%] rounded-2xl rounded-br-md bg-neutral-900 px-3.5 py-2 text-[12.5px] leading-snug text-white dark:bg-white dark:text-neutral-900">
                    Scaffold a Next.js 15 dashboard with auth and a Prisma schema.
                </p>
            </motion.div>

            <motion.div variants={bubbleIn} className="flex gap-2.5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Sparkles className="h-3.5 w-3.5" />
                </span>
                <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-neutral-200/70 bg-neutral-50 px-3.5 py-2.5 dark:border-white/10 dark:bg-neutral-800/60">
                    <p className="text-[12.5px] leading-relaxed text-neutral-700 dark:text-neutral-200">
                        Scaffolding <span className="font-semibold text-neutral-900 dark:text-white">App Router</span> with
                        {" "}<span className="font-mono text-[11.5px] text-amber-600 dark:text-amber-400">Auth.js</span> + Prisma. Generated <span className="font-semibold text-neutral-900 dark:text-white">12 files</span> in 3.1s.
                    </p>
                    <motion.div
                        variants={bubbleIn}
                        className="mt-2.5 flex flex-wrap gap-1.5"
                    >
                        {["app/layout.tsx", "lib/auth.ts", "prisma/schema.prisma"].map((c) => (
                            <span key={c} className="rounded-full border border-neutral-200 bg-white px-2 py-0.5 font-mono text-[10px] text-neutral-500 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-400">
                                {c}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    )
}

/* ------------------------------------------------------------------ */
/* 2. Compact deploy-status card (hero float)                         */
/* ------------------------------------------------------------------ */

export function CitationAnswer({ className }: { className?: string }) {
    return (
        <div className={cn(cardChrome, "w-full p-4", className)}>
            <p className="mb-2 text-[11px] font-medium text-neutral-400 dark:text-neutral-500">
                Deployment · production
            </p>
            <p className="text-[13px] font-semibold leading-snug text-neutral-900 dark:text-white">
                Deploy succeeded
            </p>
            <div className="mt-3 flex items-center justify-between">
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] text-amber-600 dark:text-amber-400">
                    main@a1f9c2e
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" /> 42s
                </span>
            </div>
        </div>
    )
}

/* ------------------------------------------------------------------ */
/* 3. SyncOrbit kanban / sprint task card                            */
/* ------------------------------------------------------------------ */

export function ExamCard({ className }: { className?: string }) {
    const columns = [
        { k: "Backlog", t: "Backlog", ok: false },
        { k: "In progress", t: "In Progress", ok: true },
        { k: "Done", t: "Done", ok: false },
    ]
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={chatContainer}
            className={cn(cardChrome, "w-full p-4", className)}
        >
            <div className="mb-2 flex items-center gap-2">
                <span className="rounded-md bg-neutral-900 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-white dark:bg-white dark:text-neutral-900">
                    SYNCORBIT
                </span>
                <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500">Sprint 4 · SHU-218</span>
            </div>
            <p className="mb-3 text-[12px] font-medium leading-snug text-neutral-700 dark:text-neutral-200">
                Build real-time Kanban with Git integration
            </p>
            <div className="space-y-1.5">
                {columns.map((o) => (
                    <motion.div
                        key={o.k}
                        variants={bubbleIn}
                        className={cn(
                            "flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-[11.5px]",
                            o.ok
                                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                                : "border-neutral-200/70 text-neutral-500 dark:border-white/10 dark:text-neutral-400",
                        )}
                    >
                        <span className="font-mono text-[10px] opacity-70">NJ</span>
                        {o.t}
                        {o.ok && <CheckCircle2 className="ml-auto h-3.5 w-3.5" />}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

/* ------------------------------------------------------------------ */
/* 4. CI/CD pipeline build scan (Build -> Test -> Deploy)             */
/* ------------------------------------------------------------------ */

export function VouchingScan({ className }: { className?: string }) {
    const reduced = useReducedMotion()
    return (
        <div className={cn(cardChrome, "relative w-full overflow-hidden p-4", className)}>
            <div className="mb-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                    <GitBranch className="h-3.5 w-3.5" /> Pipeline
                </span>
                <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500">CI/CD</span>
            </div>

            <div className="relative rounded-lg border border-neutral-200/70 bg-neutral-50 p-3 dark:border-white/10 dark:bg-neutral-800/50">
                {/* pipeline stages */}
                <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-semibold text-neutral-700 dark:text-neutral-200">#1284</span>
                    <Terminal className="h-3.5 w-3.5 text-neutral-400" />
                </div>
                <div className="mt-2.5 space-y-1.5">
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] w-12 text-neutral-500 dark:text-neutral-400">Build</span>
                        <div className="h-1.5 flex-1 rounded-full bg-emerald-400/70" />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] w-12 text-neutral-500 dark:text-neutral-400">Test</span>
                        <div className="h-1.5 flex-1 rounded-full bg-emerald-400/70" />
                    </div>
                    <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2 flex-1">
                            <span className="font-mono text-[10px] w-12 text-neutral-500 dark:text-neutral-400">Deploy</span>
                            <div className="h-1.5 w-1/3 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                        </div>
                        <span className="font-mono text-[10px] font-semibold text-neutral-700 dark:text-neutral-200">running</span>
                    </div>
                </div>

                {/* scanning line */}
                {!reduced && (
                    <motion.div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 h-8 bg-gradient-to-b from-emerald-400/0 via-emerald-400/30 to-emerald-400/0"
                        initial={{ top: "0%" }}
                        whileInView={{ top: ["0%", "85%", "0%"] }}
                        viewport={{ once: true }}
                        transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6 }}
                    />
                )}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1, duration: 0.4, ease: EASE }}
                className="mt-3 flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-1.5"
            >
                <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-rose-500" />
                <span className="text-[11px] leading-snug text-rose-700 dark:text-rose-300">
                    Lint warning flagged - 2 unused imports
                </span>
            </motion.div>
        </div>
    )
}

/* ------------------------------------------------------------------ */
/* 5. Live client analytics dashboard                                 */
/* ------------------------------------------------------------------ */

export function ReportDraft({ className }: { className?: string }) {
    const lines = [
        { w: "w-full", cite: false },
        { w: "w-[88%]", cite: false },
        { w: "w-[60%]", cite: true },
        { w: "w-[92%]", cite: false },
        { w: "w-[70%]", cite: false },
    ]
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={chatContainer}
            className={cn(cardChrome, "w-full p-4", className)}
        >
            <div className="mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                    <Activity className="h-3.5 w-3.5" />
                </span>
                <p className="text-[12px] font-semibold text-neutral-900 dark:text-white">Client analytics - live report</p>
            </div>
            <div className="space-y-2">
                {lines.map((l, i) => (
                    <motion.div key={i} variants={bubbleIn} className="flex items-center gap-2">
                        <span className={cn("h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-700", l.w)} />
                        {l.cite && (
                            <span className="shrink-0 rounded-full border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 font-mono text-[9px] text-amber-600 dark:text-amber-400">
                                +18% MoM
                            </span>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

/* ------------------------------------------------------------------ */
/* 6. Animated mini bar chart (dashboards)                            */
/* ------------------------------------------------------------------ */

export function MiniBarChart({ className }: { className?: string }) {
    const bars = [42, 60, 38, 75, 55, 88, 64, 96]
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ staggerChildren: 0.08 }}
            className={cn("flex h-full items-end gap-1.5", className)}
        >
            {bars.map((h, i) => (
                <motion.div
                    key={i}
                    variants={{ hidden: { height: 0, opacity: 0 }, visible: { height: `${h}%`, opacity: 1 } }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className={cn(
                        "w-full rounded-t-sm",
                        i === bars.length - 1 ? "bg-neutral-900 dark:bg-white" : "bg-neutral-300 dark:bg-neutral-700",
                    )}
                />
            ))}
        </motion.div>
    )
}

/* ------------------------------------------------------------------ */
/* 7. Environment / stack switcher                                    */
/* ------------------------------------------------------------------ */

export function LangToggle({ className }: { className?: string }) {
    const envs = ["Dev", "Staging", "Production"]
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.6 }}
            className={cn("flex flex-col gap-1.5", className)}
        >
            {envs.map((l, i) => (
                <motion.div
                    key={l}
                    variants={{ hidden: { opacity: 0.4 }, visible: { opacity: 1 } }}
                    className={cn(
                        "flex items-center justify-between rounded-lg border px-3 py-2 text-[12px]",
                        i === 2
                            ? "border-neutral-900/15 bg-neutral-900/5 font-semibold text-neutral-900 dark:border-white/20 dark:bg-white/10 dark:text-white"
                            : "border-neutral-200/70 text-neutral-500 dark:border-white/10 dark:text-neutral-400",
                    )}
                >
                    {l}
                    {i === 2 && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
                </motion.div>
            ))}
        </motion.div>
    )
}

/* ------------------------------------------------------------------ */
/* 8. Floating quote card (testimonial hero)                          */
/* ------------------------------------------------------------------ */

export function QuoteCard({
    name, role, quote, className,
}: { name: string; role: string; quote: string; className?: string }) {
    return (
        <div className={cn(cardChrome, "w-[260px] p-4", className)}>
            <Quote className="mb-2 h-4 w-4 text-neutral-300 dark:text-neutral-600" />
            <p className="text-[12.5px] leading-relaxed text-neutral-700 dark:text-neutral-200">{quote}</p>
            <div className="mt-3 flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-[11px] font-semibold text-white dark:bg-white dark:text-neutral-900">
                    {name.charAt(0)}
                </span>
                <div>
                    <p className="text-[12px] font-semibold leading-none text-neutral-900 dark:text-white">{name}</p>
                    <p className="mt-1 text-[10.5px] leading-none text-neutral-400 dark:text-neutral-500">{role}</p>
                </div>
            </div>
        </div>
    )
}

/* ------------------------------------------------------------------ */
/* 9. Performance / SaaS metric card (hero)                           */
/* ------------------------------------------------------------------ */

export function MetricCard({
    label, value, sub, accent, className,
}: { label: string; value: string; sub?: string; accent?: "emerald" | "amber" | "neutral"; className?: string }) {
    const dot =
        accent === "emerald" ? "bg-emerald-500" : accent === "amber" ? "bg-amber-500" : "bg-neutral-400"
    return (
        <div className={cn(cardChrome, "w-[200px] p-4", className)}>
            <div className="mb-2 flex items-center gap-2">
                <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />
                <span className="text-[10.5px] font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">{label}</span>
            </div>
            <p className="font-mono text-[22px] font-bold leading-none tracking-tight text-neutral-900 dark:text-white">{value}</p>
            {sub && <p className="mt-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">{sub}</p>}
        </div>
    )
}

/* ------------------------------------------------------------------ */
/* 10. Strategy call / team-member booking card                       */
/* ------------------------------------------------------------------ */

export function ConsultCard({ className }: { className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: EASE }}
            className={cn(cardChrome, "w-full p-4", className)}
        >
            <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-[14px] font-semibold text-white dark:bg-white dark:text-neutral-900">
                    NJ
                </span>
                <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                        <p className="truncate text-[13px] font-semibold text-neutral-900 dark:text-white">Niraj Jha</p>
                        <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    </div>
                    <p className="text-[11px] text-neutral-400 dark:text-neutral-500">Co-Founder &amp; CTO · Shunya Tech</p>
                </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-500">
                    <Star className="h-3 w-3 fill-current" /> 4.9
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Available today
                </span>
            </div>
            <button type="button" className="mt-3 w-full rounded-lg bg-neutral-900 py-2 text-[12px] font-semibold text-white dark:bg-white dark:text-neutral-900">
                Book a strategy call
            </button>
        </motion.div>
    )
}

/* ------------------------------------------------------------------ */
/* 11. Sprint / milestone card                                        */
/* ------------------------------------------------------------------ */

export function DeadlineCard({ className }: { className?: string }) {
    const rows = [
        { label: "Sprint 4 ships", date: "Staging deploy", days: "3", urgent: true },
        { label: "Sprint 5 planning", date: "Bi-weekly cycle", days: "18", urgent: false },
        { label: "v1.0 Production", date: "Final QA + audit", days: "49", urgent: false },
    ]
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={chatContainer}
            className={cn(cardChrome, "w-full p-4", className)}
        >
            <div className="mb-3 flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-neutral-400" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500">Sprint roadmap</span>
            </div>
            <div className="space-y-1.5">
                {rows.map((r) => (
                    <motion.div
                        key={r.label}
                        variants={bubbleIn}
                        className="flex items-center justify-between rounded-lg border border-neutral-200/70 px-2.5 py-1.5 dark:border-white/10"
                    >
                        <div>
                            <p className="text-[12px] font-medium text-neutral-700 dark:text-neutral-200">{r.label}</p>
                            <p className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500">{r.date}</p>
                        </div>
                        <span
                            className={cn(
                                "rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold",
                                r.urgent
                                    ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                                    : "bg-neutral-100 text-neutral-500 dark:bg-white/10 dark:text-neutral-400",
                            )}
                        >
                            {r.days}d
                        </span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

/* ------------------------------------------------------------------ */
/* 12. FloatingCard - hero glass card: tilt + gentle idle float       */
/* ------------------------------------------------------------------ */

export function FloatingCard({
    children, className, delay = 0, rotate = 0, floatRange = 14, duration = 6,
}: {
    children: ReactNode
    className?: string
    delay?: number
    rotate?: number
    floatRange?: number
    duration?: number
}) {
    const reduced = useReducedMotion()
    const id = useId().replace(/:/g, "")
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay, ease: EASE }}
            className={cn("absolute", className)}
            style={{ rotate: `${rotate}deg` }}
        >
            <div
                style={
                    reduced
                        ? undefined
                        : { animation: `vi-float-${id} ${duration}s ease-in-out ${delay}s infinite` }
                }
            >
                {children}
            </div>
            {!reduced && (
                <style>{`@keyframes vi-float-${id}{0%,100%{transform:translateY(0)}50%{transform:translateY(-${floatRange}px)}}`}</style>
            )}
        </motion.div>
    )
}
