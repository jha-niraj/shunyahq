"use client"

import { useMemo } from "react"
import {
    Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts"

/**
 * Inquiries per day.
 *
 * Single series, so it is drawn in ink rather than a colour: a hue here would be decoration
 * carrying no information, and the panel deliberately has no palette beyond the so-* tokens. The
 * fill is a low-opacity gradient of the same ink, which reads as volume without introducing a
 * second colour.
 *
 * Colours are read from CSS custom properties via `currentColor` and token classes where possible;
 * where recharts demands a literal (axis ticks, grid), the neutral values are chosen to sit
 * correctly in both themes.
 */

type Point = { date: string; value: number }

function formatDay(iso: string) {
    const d = new Date(`${iso}T00:00:00`)
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export function InquiriesChart({ data }: { data: Point[] }) {
    const total = useMemo(() => data.reduce((sum, d) => sum + d.value, 0), [data])
    // A flat all-zero series makes recharts pick a 0-0 domain and draw the line through the axis.
    // Forcing a minimum ceiling keeps an empty chart looking empty rather than broken.
    const max = useMemo(() => Math.max(4, ...data.map((d) => d.value)), [data])

    return (
        <div className="h-[260px] w-full">
            {
                total === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-so-line">
                        <p className="text-[14px] font-medium text-so-ink-3">No inquiries in this window</p>
                        <p className="mt-1 text-[13px] text-so-ink-4">New submissions will appear here.</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                            <defs>
                                <linearGradient id="inquiryFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="currentColor" stopOpacity={0.18} />
                                    <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                className="text-so-line"
                                stroke="currentColor"
                            />
                            <XAxis
                                dataKey="date"
                                tickFormatter={formatDay}
                                tickLine={false}
                                axisLine={false}
                                minTickGap={28}
                                tick={{ fontSize: 11 }}
                                className="text-so-ink-4"
                                stroke="currentColor"
                            />
                            <YAxis
                                allowDecimals={false}
                                domain={[0, max]}
                                tickLine={false}
                                axisLine={false}
                                width={44}
                                tick={{ fontSize: 11 }}
                                className="text-so-ink-4"
                                stroke="currentColor"
                            />
                            <Tooltip
                                cursor={{ stroke: "currentColor", strokeOpacity: 0.25 }}
                                content={({ active, payload, label }) => {
                                    if (!active || !payload?.length) return null
                                    return (
                                        <div className="rounded-xl border border-so-line bg-so-surface px-3 py-2 shadow-lg">
                                            <p className="text-[11px] uppercase tracking-[0.1em] text-so-ink-4">
                                                {formatDay(String(label))}
                                            </p>
                                            <p className="mt-0.5 text-[15px] font-semibold text-so-ink">
                                                {payload[0].value} {Number(payload[0].value) === 1 ? "inquiry" : "inquiries"}
                                            </p>
                                        </div>
                                    )
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                className="text-so-ink"
                                stroke="currentColor"
                                strokeWidth={2}
                                fill="url(#inquiryFill)"
                                dot={false}
                                activeDot={{ r: 4, strokeWidth: 0 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )
            }
        </div>
    )
}
