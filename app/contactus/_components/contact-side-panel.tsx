"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef } from "react"
import { Check, Lock, ArrowLeft, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import type { FlowNav } from "@/components/contact/typeform-flow"
import { SITE_ORG } from "@/lib/site"
import { ThemeToggle } from "@/components/themetoggle"


/**
 * The left rail. It owns navigation on lg+ - the form's own Back and counter hide there - and it is
 * also the only branding on the page, since the site nav is deliberately not rendered on this route.
 */
export function ContactSidePanel({ nav, prefilled }: { nav: FlowNav; prefilled?: string }) {
    // The step list can outgrow the panel, so keep the current row in view.
    const currentRef = useRef<HTMLLIElement>(null)
    useEffect(() => {
        currentRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" })
    }, [nav.realIdx])

    return (
        <div className="relative h-full overflow-hidden border-r border-so-line bg-so-bg">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                    backgroundImage: "radial-gradient(color-mix(in srgb, var(--so-ink) 12%, transparent) 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                    maskImage: "radial-gradient(120% 60% at 50% 0%, #000 10%, transparent 70%)",
                    WebkitMaskImage: "radial-gradient(120% 60% at 50% 0%, #000 10%, transparent 70%)",
                }}
            />

            <div
                data-rv=""
                data-rv-group=""
                data-rv-mount=""
                className="relative z-10 flex h-full flex-col p-8 xl:p-10"
                style={{ "--rv-step": "0.09s", "--rv-delay": "0.06s" } as React.CSSProperties}
            >
                <div className="flex items-center justify-between gap-3">
                    <Link href="/" className="inline-flex items-center gap-2.5" aria-label="ShunyaHQ home">
                        <Image src="/shunyahqmainlogo.png" alt="" width={32} height={32} className="h-8 w-8 invert dark:invert-0" />
                        <span className="text-lg font-semibold tracking-[-0.01em] text-so-ink">ShunyaHQ</span>
                    </Link>
                    <ThemeToggle />
                </div>

                <div className="mt-8">
                    <h2 className="text-[26px] font-bold leading-tight tracking-[-0.02em] text-so-ink">
                        Tell us what you want to build
                    </h2>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-so-ink-3">
                        A few questions so the first reply is useful rather than a request for more information.
                        We answer within one business day with a scoped estimate and a realistic timeline.
                    </p>
                    {prefilled && (
                        <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-so-line bg-so-surface px-3 py-1.5 text-[12.5px] font-medium text-so-ink-2">
                            <Check className="h-3.5 w-3.5" />
                            Carried over from pricing: {prefilled}
                        </p>
                    )}
                </div>

                {/* min-h-0 is load-bearing: a flex child defaults to min-height:auto, so without it this
                    nav grows to fit every step instead of scrolling, and the overflow is clipped. */}
                <nav className="mt-7 min-h-0 flex-1 overflow-y-auto">
                    <ol className="space-y-1">
                        {nav.realSteps.map((step, i) => {
                            const isCurrent = i === nav.realIdx
                            // Answered, not merely "behind the cursor" - otherwise stepping back up
                            // the list drops the tick from steps that are still filled in.
                            const isDone = nav.answered.has(step.id) || (nav.isDone && i <= nav.maxRealIdx)
                            const isReachable = i <= nav.maxRealIdx && !nav.isDone
                            return (
                                <li key={step.id} ref={isCurrent ? currentRef : undefined}>
                                    <button
                                        type="button"
                                        onClick={() => isReachable && nav.goToRealStep(i)}
                                        disabled={!isReachable}
                                        aria-current={isCurrent ? "step" : undefined}
                                        className={cn(
                                            "group flex w-full items-start gap-3 rounded-xl px-3 py-2 text-left transition-colors",
                                            isReachable ? "cursor-pointer" : "cursor-default",
                                            isCurrent ? "bg-so-surface-2" : isReachable ? "hover:bg-so-surface-2" : "",
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold tabular-nums transition-colors",
                                                isCurrent
                                                    ? "border-so-ink text-so-ink"
                                                    : isDone
                                                        ? "border-so-ink bg-so-ink text-so-bg"
                                                        : "border-so-line text-so-ink-4",
                                            )}
                                        >
                                            {isDone && !isCurrent ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className={cn("block text-sm font-semibold leading-snug", isCurrent || isDone || isReachable ? "text-so-ink" : "text-so-ink-4")}>
                                                {step.navLabel ?? step.question}
                                            </span>
                                            {step.navCaption && (
                                                <span className={cn("mt-0.5 block truncate text-xs", isCurrent ? "text-so-ink-3" : "text-so-ink-4")}>
                                                    {step.navCaption}
                                                </span>
                                            )}
                                        </span>
                                        {!isReachable && !isDone && !isCurrent && <Lock className="mt-1 h-3 w-3 shrink-0 text-so-ink-4" />}
                                    </button>
                                </li>
                            )
                        })}
                    </ol>
                </nav>

                {/* The old contact page offered a plain email address. A form is a worse experience
                    for someone who just wants to send one line, so that route stays available. */}
                <div className="mt-4 rounded-xl border border-so-line bg-so-surface p-4">
                    <p className="text-[12.5px] font-semibold text-so-ink">Would rather just email?</p>
                    <a
                        href={`mailto:${SITE_ORG.email}`}
                        className="mt-1 inline-flex items-center gap-1.5 text-[13px] font-medium text-so-ink-2 underline decoration-so-line underline-offset-4 transition-colors hover:text-so-ink"
                    >
                        <Mail className="h-3.5 w-3.5" />
                        {SITE_ORG.email}
                    </a>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-so-line pt-5">
                    <span className="text-xs font-medium text-so-ink-3">
                        {/* realIdx is -1 on the welcome screen, which would read as "Step 0 of 8". */}
                        Step {Math.min(Math.max(nav.realIdx + 1, 1), nav.realSteps.length)} of {nav.realSteps.length}
                    </span>
                    <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-so-ink-3 transition-colors hover:text-so-ink">
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Back to site
                    </Link>
                </div>
            </div>
        </div>
    )
}
