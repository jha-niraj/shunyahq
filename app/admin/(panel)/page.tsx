"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
    MessagesSquare, TrendingUp, CalendarDays, Sparkles, ArrowRight, Loader2, Inbox,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getContactStats } from "@/actions/admin.action"
import { EASE, Entrance } from "@/components/landing/animations"
import { InquiriesChart } from "../_components/inquiries-chart"

type Stats = NonNullable<Awaited<ReturnType<typeof getContactStats>>["data"]>

const RANGES = [
    { label: "14d", days: 14 },
    { label: "30d", days: 30 },
    { label: "90d", days: 90 },
] as const

function StatTile({
    label,
    value,
    hint,
    icon: Icon,
    delay,
    loading,
}: {
    label: string
    value: string | number
    hint: string
    icon: React.ElementType
    delay: number
    loading: boolean
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay, ease: EASE }}
            className="rounded-2xl border border-so-line bg-so-surface p-5"
        >
            <div className="flex items-start justify-between">
                <p className="text-[12.5px] font-medium text-so-ink-3">{label}</p>
                <Icon className="h-[18px] w-[18px] text-so-ink-4" strokeWidth={1.75} />
            </div>
            <p className="mt-4 text-[30px] font-semibold leading-none tracking-[-0.03em] text-so-ink">
                {loading ? <span className="text-so-ink-5">--</span> : value}
            </p>
            <p className="mt-2 text-[12.5px] text-so-ink-4">{hint}</p>
        </motion.div>
    )
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null)
    const [loading, setLoading] = useState(true)
    const [days, setDays] = useState<number>(30)

    useEffect(() => {
        let cancelled = false
        setLoading(true)

        getContactStats(days)
            .then((result) => {
                if (cancelled) return
                if (result.success) setStats(result.data)
            })
            .catch((error) => console.error("Failed to load stats:", error))
            .finally(() => {
                if (!cancelled) setLoading(false)
            })

        // The range buttons can be clicked faster than a query returns, so a stale response must
        // not be allowed to overwrite a newer one.
        return () => {
            cancelled = true
        }
    }, [days])

    const formatDate = (value: Date | string) =>
        new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

    return (
        // The shell does not scroll, so this pane owns its own overflow. The dashboard is genuinely
        // taller than a viewport, so it scrolls as one column.
        <div className="h-full overflow-y-auto px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div className="mx-auto max-w-6xl">
                <Entrance>
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="so-eyebrow">Dashboard</p>
                            <h1 className="mt-2.5 text-[clamp(26px,3vw,34px)] font-semibold tracking-[-0.025em] text-so-ink">
                                Overview
                            </h1>
                            <p className="mt-1.5 text-[14px] text-so-ink-3">
                                Everything coming in through the contact flow.
                            </p>
                        </div>
                        <p className="so-mono text-[12.5px] text-so-ink-4">
                            {new Date().toLocaleDateString("en-US", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                </Entrance>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatTile
                        label="Total inquiries"
                        value={stats?.total ?? 0}
                        hint="All time"
                        icon={MessagesSquare}
                        delay={0.05}
                        loading={loading}
                    />
                    <StatTile
                        label="This week"
                        value={stats?.thisWeek ?? 0}
                        hint="Last 7 days"
                        icon={TrendingUp}
                        delay={0.1}
                        loading={loading}
                    />
                    <StatTile
                        label="This month"
                        value={stats?.thisMonth ?? 0}
                        hint="Last 30 days"
                        icon={CalendarDays}
                        delay={0.15}
                        loading={loading}
                    />
                    <StatTile
                        label="Intake opt-ins"
                        value={stats?.intakeOptIns ?? 0}
                        hint="Chose the SyncHQ session"
                        icon={Sparkles}
                        delay={0.2}
                        loading={loading}
                    />
                </div>

                <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.25, ease: EASE }}
                    className="mt-6 rounded-2xl border border-so-line bg-so-surface p-5 sm:p-6"
                >
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="text-[16px] font-semibold tracking-[-0.01em] text-so-ink">
                                Inquiries over time
                            </h2>
                            <p className="mt-0.5 text-[13px] text-so-ink-3">Submissions per day.</p>
                        </div>
                        <div className="inline-flex rounded-full border border-so-line bg-so-bg p-1">
                            {
                                RANGES.map((range) => (
                                    <button
                                        key={range.days}
                                        type="button"
                                        onClick={() => setDays(range.days)}
                                        className={`so-mono cursor-pointer rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
                                            days === range.days
                                                ? "bg-so-ink text-so-bg"
                                                : "text-so-ink-3 hover:text-so-ink"
                                        }`}
                                    >
                                        {range.label}
                                    </button>
                                ))
                            }
                        </div>
                    </div>

                    {
                        loading && !stats ? (
                            <div className="flex h-[260px] items-center justify-center">
                                <Loader2 className="h-5 w-5 animate-spin text-so-ink-4" />
                            </div>
                        ) : (
                            <InquiriesChart data={stats?.series ?? []} />
                        )
                    }
                </motion.section>

                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
                    <motion.section
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.3, ease: EASE }}
                        className="rounded-2xl border border-so-line bg-so-surface"
                    >
                        <div className="flex items-center justify-between border-b border-so-line px-5 py-4">
                            <h2 className="text-[16px] font-semibold tracking-[-0.01em] text-so-ink">
                                Recent inquiries
                            </h2>
                            <Link
                                href="/admin/contactinquiry"
                                className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-so-ink-3 transition-colors hover:text-so-ink"
                            >
                                View all
                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </div>

                        {/* Scroll area rather than a growing card, so the dashboard's height does not
                            depend on how busy the week was. */}
                        <ScrollArea className="h-[320px]">
                            <div className="divide-y divide-so-line">
                                {
                                    loading && !stats ? (
                                        <div className="flex h-[320px] items-center justify-center">
                                            <Loader2 className="h-5 w-5 animate-spin text-so-ink-4" />
                                        </div>
                                    ) : stats?.recent.length ? (
                                        stats.recent.map((inquiry) => (
                                            <div key={inquiry.id} className="px-5 py-3.5">
                                                <div className="flex items-baseline justify-between gap-3">
                                                    <p className="truncate text-[14px] font-semibold text-so-ink">
                                                        {inquiry.name}
                                                    </p>
                                                    <time className="so-mono shrink-0 text-[11.5px] text-so-ink-4">
                                                        {formatDate(inquiry.createdAt)}
                                                    </time>
                                                </div>
                                                <p className="truncate text-[12.5px] text-so-ink-3">{inquiry.email}</p>
                                                <p className="mt-1.5 line-clamp-2 text-[13px] leading-[1.6] text-so-ink-2">
                                                    {inquiry.message}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex h-[320px] flex-col items-center justify-center">
                                            <Inbox className="mb-3 h-7 w-7 text-so-ink-5" strokeWidth={1.5} />
                                            <p className="text-[14px] text-so-ink-3">No inquiries yet</p>
                                        </div>
                                    )
                                }
                            </div>
                        </ScrollArea>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.35, ease: EASE }}
                        className="rounded-2xl border border-so-line bg-so-surface"
                    >
                        <div className="border-b border-so-line px-5 py-4">
                            <h2 className="text-[16px] font-semibold tracking-[-0.01em] text-so-ink">
                                By inquiry type
                            </h2>
                        </div>
                        <div className="p-5">
                            {
                                stats?.byType.length ? (
                                    <ul className="flex flex-col gap-3.5">
                                        {
                                            stats.byType.map((row) => {
                                                const share = stats.total ? Math.round((row.value / stats.total) * 100) : 0
                                                return (
                                                    <li key={row.type}>
                                                        <div className="mb-1.5 flex items-baseline justify-between gap-3">
                                                            <span className="truncate text-[13px] font-medium text-so-ink">
                                                                {row.type}
                                                            </span>
                                                            <span className="so-mono shrink-0 text-[12px] text-so-ink-3">
                                                                {row.value} · {share}%
                                                            </span>
                                                        </div>
                                                        {/* Ink on surface-2, not a colour ramp - the
                                                            share is the information, the hue never was. */}
                                                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-so-surface-2">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${share}%` }}
                                                                transition={{ duration: 0.7, ease: EASE }}
                                                                className="h-full rounded-full bg-so-ink"
                                                            />
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                ) : (
                                    <p className="py-8 text-center text-[13.5px] text-so-ink-4">
                                        Nothing to break down yet.
                                    </p>
                                )
                            }
                        </div>
                    </motion.section>
                </div>
            </div>
        </div>
    )
}
