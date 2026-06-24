"use client"

import { ExamCard, ReportDraft, MetricCard, StreamingChat } from "@/components/landing/illustrations"

// Lightweight animated mock shown on each tool's detail page. Reuses the
// landing illustration cards so the visual language stays consistent.
export function ToolDemo({ slug }: { slug: string; variant?: "card" | "detail" }) {
    switch (slug) {
        case "syncorbit":
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                    <ExamCard className="w-full" />
                    <ReportDraft className="w-full" />
                </div>
            )
        case "budget-estimator":
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                    <MetricCard className="w-full" label="Estimated cost" value="$3,499" sub="Scale / Business · web" accent="emerald" />
                    <StreamingChat className="w-full" />
                </div>
            )
        default:
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                    <ReportDraft className="w-full" />
                    <MetricCard className="w-full" label="Starting at" value="$1,599" sub="Transparent rate card" accent="neutral" />
                </div>
            )
    }
}
