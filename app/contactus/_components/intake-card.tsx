import { Sparkles, MessageSquareText, Clock, FileCheck2 } from "lucide-react"

const POINTS = [
    {
        icon: MessageSquareText,
        title: "It asks the questions we would ask",
        body: "One topic at a time - who it is for, the core loop, the systems it must agree with, the edge cases.",
    },
    {
        icon: Sparkles,
        title: "An AI sits alongside you",
        body: "It follows up where an answer is thin and keeps digging until the picture is complete.",
    },
    {
        icon: Clock,
        title: "In your own time",
        body: "No call to schedule. Start it, stop halfway, come back tomorrow - it keeps your place.",
    },
    {
        icon: FileCheck2,
        title: "You get the write-up too",
        body: "A written brief you own - useful to us for a firm estimate, and to you regardless.",
    },
]

/**
 * The explanatory card inside the final consent step.
 *
 * A plain checkbox saying "send me an intake session" means nothing to someone who has never heard
 * of SyncHQ, so the card does the explaining and the checkbox only records the decision.
 */
export function IntakeCard() {
    return (
        <div>
            <div className="flex items-center gap-2.5">
                <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-so-ink px-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-so-bg">
                    <Sparkles className="h-3 w-3" />
                    SyncHQ
                </span>
                <span className="text-[12.5px] font-medium text-so-ink-3">our own product, free to use for this</span>
            </div>

            <p className="mt-3 text-[14.5px] leading-relaxed text-so-ink-2">
                A form asks a fixed set of questions and stops, so the thing that was obvious to you never
                gets said. <strong className="font-semibold text-so-ink">SyncHQ</strong> is a guided intake
                session that keeps asking until the shape of your product is clear - to you as much as to us.
            </p>

            {/* Two columns from sm up: four stacked rows made the checkbox - the actual action -
                fall below the fold on a 900px window. */}
            <ul className="mt-4 grid gap-x-5 gap-y-3 sm:grid-cols-2">
                {POINTS.map(({ icon: Icon, title, body }) => (
                    <li key={title} className="flex items-start gap-3">
                        <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-so-line bg-so-surface">
                            <Icon className="h-3.5 w-3.5 text-so-ink-2" strokeWidth={1.9} />
                        </span>
                        <div className="min-w-0">
                            <p className="text-[13.5px] font-semibold leading-snug text-so-ink">{title}</p>
                            <p className="mt-0.5 text-[13px] leading-relaxed text-so-ink-3">{body}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
