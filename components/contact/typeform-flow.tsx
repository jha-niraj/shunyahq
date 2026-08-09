"use client"

import {
    useEffect, useRef, useCallback, useState, useMemo, type KeyboardEvent,
} from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowUp, Check, ChevronDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"

/**
 * A one-question-at-a-time flow, ported from the RakamHQ onboarding component and re-themed onto
 * Shunya's `--so-*` palette.
 *
 * Every colour here reads a CSS variable rather than a Tailwind class, which is what lets the same
 * component render correctly in light and dark without a `dark:` variant on every element. The vars
 * are set once on the root in THEME_VARS.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type FlowStepType =
    | "welcome"
    | "short_text"
    | "long_text"
    | "single_choice"
    | "multiple_choice"
    /** A searchable, keyboard-navigable dropdown - for lists too long to render as buttons. */
    | "select"
    | "email"
    | "phone"
    | "number"
    /** A single opt-in with a rich explanatory card. Answer is a boolean. */
    | "consent"

export interface FlowStep {
    id: string
    type: FlowStepType
    question: string
    description?: string
    placeholder?: string
    required?: boolean
    options?: string[]
    /** Choices computed from the answers so far. */
    dynamicOptions?: (answers: Record<string, unknown>) => string[]
    /** Hide this step entirely when it returns true. Skipped steps are jumped over on next/back
     *  and drop out of the side panel and the progress count. */
    skip?: (answers: Record<string, unknown>) => boolean
    /** Short label for the side-panel list. Falls back to `question`. */
    navLabel?: string
    /** One-line caption under the side-panel label. */
    navCaption?: string
    validate?: (value: unknown) => string | null
    // ── "consent" step config ──
    /** The label beside the checkbox. */
    consentLabel?: string
    /** Rendered inside the card above the checkbox. */
    consentBody?: React.ReactNode
    /** Small print under the checkbox. */
    consentFootnote?: string
}

/** Navigation state handed to the side panel so it can render and jump between steps. */
export interface FlowNav {
    realSteps: FlowStep[]
    /** Index within realSteps, or -1 on the welcome screen. */
    realIdx: number
    /** Furthest real step reached - forward jumps beyond this are refused. */
    maxRealIdx: number
    progress: number
    isDone: boolean
    goToRealStep: (realIndex: number) => void
    answers: Record<string, unknown>
    /** ids of every step that currently holds a usable answer. */
    answered: Set<string>
}

export interface TypeformFlowProps {
    steps: FlowStep[]
    onSubmit: (answers: Record<string, unknown>) => Promise<void> | void
    onClose?: () => void
    onStepChange?: (stepId: string, answers: Record<string, unknown>) => void
    /** Seed the answers map. Read once on mount; later changes do not re-seed a live flow. */
    initialAnswers?: Record<string, unknown>
    submitLabel?: string
    thankYouTitle?: string
    thankYouDesc?: string
    /** Rendered under the thank-you copy - somewhere to go next. */
    thankYouActions?: React.ReactNode
    renderSidePanel?: (nav: FlowNav) => React.ReactNode
    /** Rendered at the top-left, before the step counter. Used to keep the wordmark on screen at
     *  small widths, where the side panel that normally carries it is hidden. */
    headerLeft?: React.ReactNode
    /** Replaces the top-right close (X). */
    headerRight?: React.ReactNode
    hideClose?: boolean
    /** Show Back in the form's bottom bar even when a side panel is present. */
    showFormBack?: boolean
    /** Autosave answers and position to localStorage under this key. On return the flow resumes at
     *  the first unanswered required step. Cleared on submit. */
    persistKey?: string
}

// ─── Animation ────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const stepVariants = {
    enter: (dir: number) => ({ y: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { y: 0, opacity: 1, transition: { duration: 0.3, ease: EASE } },
    exit: (dir: number) => ({ y: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.25, ease: EASE } }),
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

/**
 * The palette, as CSS variables on the root.
 *
 * Set from the `--so-*` tokens rather than hardcoded hexes, so the flow follows the site's theme
 * automatically and a change to the design system reaches it without an edit here.
 */
const THEME_VARS = {
    "--tf-accent": "var(--so-ink)",
    "--tf-accent-ink": "var(--so-bg)",
    "--tf-accent-tint": "color-mix(in srgb, var(--so-ink) 8%, transparent)",
    "--tf-surface": "var(--so-surface)",
    "--tf-bg": "var(--so-bg)",
    "--tf-text": "var(--so-ink)",
    "--tf-text-dim": "var(--so-ink-3)",
    "--tf-border": "var(--so-line)",
} as React.CSSProperties

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isValidEmail(val: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
}

function resolveOptions(step: FlowStep, answers: Record<string, unknown>): string[] {
    if (step.dynamicOptions) return step.dynamicOptions(answers)
    return step.options ?? []
}

export function isStepAnswered(step: FlowStep, answers: Record<string, unknown>): boolean {
    const v = answers[step.id]
    if (step.type === "welcome") return true
    if (step.type === "multiple_choice") return Array.isArray(v) && v.length > 0
    // A consent step has no wrong answer: leaving it unticked is a decision. Treat a required one
    // as answered only when affirmatively ticked, and an optional one as always satisfied.
    if (step.type === "consent") return step.required ? v === true : true
    return typeof v === "string" ? v.trim() !== "" : v != null
}

// ─── Main component ───────────────────────────────────────────────────────────

export function TypeformFlow({
    steps,
    onSubmit,
    onClose,
    onStepChange,
    initialAnswers,
    submitLabel = "Submit",
    thankYouTitle = "You're all set",
    thankYouDesc = "We'll be in touch shortly.",
    thankYouActions,
    renderSidePanel,
    headerLeft,
    headerRight,
    hideClose = false,
    showFormBack = false,
    persistKey,
}: TypeformFlowProps) {
    const [currentIdx, setCurrentIdx] = useState(0)
    const [answers, setAnswers] = useState<Record<string, unknown>>(initialAnswers ?? {})
    const [maxIdx, setMaxIdx] = useState(0)
    const [direction, setDirection] = useState(1)
    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDone, setIsDone] = useState(false)
    // Gate the content until any draft has been read, so the welcome screen does not flash before
    // we jump to the resumed step.
    const [restored, setRestored] = useState(!persistKey)

    // Ref mirror so validation and auto-advance never read a stale closure. Without it, picking a
    // single_choice and immediately advancing reads the pre-select answers and throws "required".
    const answersRef = useRef(answers)
    const initialAnswersRef = useRef(initialAnswers)
    initialAnswersRef.current = initialAnswers
    const stepsRef = useRef(steps)
    stepsRef.current = steps
    const inputRef = useRef<HTMLInputElement | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const currentStep = steps[currentIdx]
    const isStepSkipped = useCallback(
        (s: FlowStep | undefined) => !!(s && s.skip && s.skip(answersRef.current)),
        [],
    )
    const nextVisibleIdx = useCallback((from: number) => {
        for (let i = from + 1; i < steps.length; i++) if (!isStepSkipped(steps[i])) return i
        return -1
    }, [steps, isStepSkipped])
    const prevVisibleIdx = useCallback((from: number) => {
        for (let i = from - 1; i >= 0; i--) if (!isStepSkipped(steps[i])) return i
        return -1
    }, [steps, isStepSkipped])

    const realSteps = useMemo(
        () => steps.filter((s) => s.type !== "welcome" && !(s.skip && s.skip(answers))),
        [steps, answers],
    )
    const isLastVisible = useMemo(() => {
        for (let i = currentIdx + 1; i < steps.length; i++) {
            const s = steps[i]
            if (!(s?.skip && s.skip(answers))) return false
        }
        return true
    }, [currentIdx, steps, answers])
    const realIdx = realSteps.findIndex((s) => s.id === currentStep?.id)
    const totalReal = realSteps.length
    const maxRealIdx = useMemo(() => {
        const maxStep = steps[maxIdx]
        if (!maxStep) return realSteps.length - 1
        const i = realSteps.findIndex((s) => s.id === maxStep.id)
        if (i !== -1) return i
        // The furthest step is the welcome screen or has since become skipped. Count the real steps
        // at or before it rather than unlocking the whole list.
        let reached = 0
        for (let j = 0; j <= maxIdx && j < steps.length; j++) {
            if (realSteps.some((r) => r.id === steps[j]!.id)) reached++
        }
        return reached - 1
    }, [maxIdx, steps, realSteps])

    // ── Restore a draft on mount ─────────────────────────────────────────────
    useEffect(() => {
        if (!persistKey) return
        try {
            const raw = window.localStorage.getItem(persistKey)
            if (raw) {
                const saved = JSON.parse(raw) as { answers?: Record<string, unknown> }
                if (saved.answers && typeof saved.answers === "object") {
                    const merged = { ...saved.answers, ...(initialAnswersRef.current ?? {}) }
                    setAnswers(merged)
                    answersRef.current = merged
                    const list = stepsRef.current
                    let target = -1
                    for (let i = 0; i < list.length; i++) {
                        const s = list[i]
                        if (!s || s.type === "welcome") continue
                        if (s.skip && s.skip(merged)) continue
                        if (s.required && !isStepAnswered(s, merged)) { target = i; break }
                    }
                    if (target > 0) { setCurrentIdx(target); setMaxIdx(target) }
                }
            }
        } catch {
            // A corrupt or unreadable draft must never stop the form loading.
        }
        setRestored(true)
    }, [persistKey])

    // ── Autosave ─────────────────────────────────────────────────────────────
    useEffect(() => {
        if (!persistKey || !restored) return
        if (isDone) { try { window.localStorage.removeItem(persistKey) } catch { } ; return }
        try {
            window.localStorage.setItem(persistKey, JSON.stringify({ answers }))
        } catch { /* quota or private mode - losing the draft is acceptable */ }
    }, [answers, persistKey, restored, isDone])

    useEffect(() => () => { if (errorTimerRef.current) clearTimeout(errorTimerRef.current) }, [])

    const showError = useCallback((msg: string) => {
        setError(msg)
        if (errorTimerRef.current) clearTimeout(errorTimerRef.current)
        errorTimerRef.current = setTimeout(() => setError(null), 2500)
    }, [])

    const setAnswer = useCallback((id: string, value: unknown) => {
        setAnswers((prev) => {
            const next = { ...prev, [id]: value }
            answersRef.current = next
            return next
        })
        setError(null)
    }, [])

    const toggleMultiAnswer = useCallback((id: string, opt: string) => {
        setAnswers((prev) => {
            const cur = (prev[id] as string[]) ?? []
            const updated = cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt]
            const next = { ...prev, [id]: updated }
            answersRef.current = next
            return next
        })
    }, [])

    const validateCurrent = useCallback((): boolean => {
        if (!currentStep) return true
        const val = answersRef.current[currentStep.id]

        if (currentStep.required && currentStep.type !== "consent") {
            if (val === undefined || val === null || (typeof val === "string" && val.trim() === "")) {
                showError("This one is required.")
                return false
            }
            if (currentStep.type === "multiple_choice" && (!Array.isArray(val) || val.length === 0)) {
                showError("Pick at least one.")
                return false
            }
        }
        if (currentStep.required && currentStep.type === "consent" && val !== true) {
            showError("Tick the box to continue, or go back and change an earlier answer.")
            return false
        }
        if (currentStep.type === "email" && val && !isValidEmail(String(val))) {
            showError("That does not look like a valid email address.")
            return false
        }
        if (currentStep.validate) {
            const msg = currentStep.validate(val)
            if (msg) { showError(msg); return false }
        }
        return true
    }, [currentStep, showError])

    const goNext = useCallback(async () => {
        if (!currentStep) return
        if (!validateCurrent()) return

        const nextIdx = nextVisibleIdx(currentIdx)
        if (nextIdx === -1) {
            setIsSubmitting(true)
            try {
                await onSubmit(answersRef.current)
                setIsDone(true)
            } catch {
                showError("Something went wrong. Please try again.")
            } finally {
                setIsSubmitting(false)
            }
            return
        }
        setDirection(1)
        setCurrentIdx(nextIdx)
        setMaxIdx((m) => Math.max(m, nextIdx))
        const nextStep = steps[nextIdx]
        if (nextStep) onStepChange?.(nextStep.id, answersRef.current)
    }, [currentStep, currentIdx, steps, validateCurrent, onSubmit, onStepChange, showError, nextVisibleIdx])

    const goBack = useCallback(() => {
        const prevIdx = prevVisibleIdx(currentIdx)
        if (prevIdx < 0) return
        setDirection(-1)
        setCurrentIdx(prevIdx)
        setError(null)
    }, [currentIdx, prevVisibleIdx])

    const goToRealStep = useCallback((realIndex: number) => {
        const target = realSteps[realIndex]
        if (!target) return
        const absIdx = steps.findIndex((s) => s.id === target.id)
        if (absIdx === -1 || absIdx > maxIdx) return // never jump past the furthest reached step
        setDirection(absIdx >= currentIdx ? 1 : -1)
        setCurrentIdx(absIdx)
        setError(null)
    }, [realSteps, steps, maxIdx, currentIdx])

    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
        if (isDone || !currentStep) return

        if (currentStep.type === "single_choice" || currentStep.type === "multiple_choice") {
            const opts = resolveOptions(currentStep, answersRef.current)
            const letterIdx = LETTERS.indexOf(e.key.toUpperCase())
            if (letterIdx !== -1 && letterIdx < opts.length && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault()
                const opt = opts[letterIdx]
                if (opt === undefined) return
                if (currentStep.type === "single_choice") {
                    setAnswer(currentStep.id, opt)
                    setTimeout(() => void goNext(), 320)
                } else {
                    toggleMultiAnswer(currentStep.id, opt)
                }
                return
            }
        }

        if (e.key === "Enter") {
            if (currentStep.type === "long_text") {
                // Plain Enter is a newline in a textarea; only the modifier advances.
                if (e.ctrlKey || e.metaKey) { e.preventDefault(); void goNext() }
                return
            }
            if (e.shiftKey) { e.preventDefault(); goBack(); return }
            e.preventDefault()
            void goNext()
            return
        }

        if (e.key === "Backspace") {
            const val = answersRef.current[currentStep.id]
            if ((val === undefined || val === "" || val === null)
                && currentStep.type !== "long_text" && currentStep.type !== "select") {
                goBack()
            }
        }
    }, [isDone, currentStep, goNext, goBack, setAnswer, toggleMultiAnswer])

    const progressCount = realIdx + 1
    const progress = isDone ? 1 : totalReal > 0 ? progressCount / totalReal : 0
    const hasSidePanel = !!renderSidePanel

    const answered = useMemo(
        () => new Set(realSteps.filter((st) => isStepAnswered(st, answers)).map((st) => st.id)),
        [realSteps, answers],
    )
    const nav: FlowNav = { realSteps, realIdx, maxRealIdx, progress, isDone, goToRealStep, answers, answered }

    return (
        <div
            className="fixed inset-0 z-[60]"
            onKeyDown={handleKeyDown}
            tabIndex={-1}
            style={{ outline: "none", ...THEME_VARS }}
        >
            <div className="absolute inset-0 flex" style={{ backgroundColor: "var(--tf-bg)" }}>
                {hasSidePanel && (
                    <aside className="hidden w-1/3 max-w-[440px] shrink-0 lg:block">
                        {renderSidePanel(nav)}
                    </aside>
                )}

                <div className="relative flex min-w-0 flex-1 flex-col" style={{ backgroundColor: "var(--tf-surface)" }}>
                    {/* Progress bar */}
                    <div className="absolute left-0 right-0 top-0 z-10 h-0.5" style={{ backgroundColor: "var(--tf-accent-tint)" }}>
                        <motion.div
                            className="h-full origin-left"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: progress }}
                            transition={{ duration: 0.4, ease: EASE }}
                            style={{ transformOrigin: "left", backgroundColor: "var(--tf-accent)" }}
                        />
                    </div>

                    {/* Top bar */}
                    <div className="relative z-10 flex shrink-0 items-center justify-between px-6 pb-4 pt-6">
                        <div className="flex min-w-[60px] items-center gap-3">
                            {headerLeft}
                            {!isDone && currentStep?.type !== "welcome" && (
                                <span className={cn("text-sm tabular-nums", hasSidePanel && "lg:hidden")} style={{ color: "var(--tf-text-dim)" }}>
                                    <span className="font-semibold" style={{ color: "var(--tf-text)" }}>{progressCount}</span>
                                    {" / "}{totalReal}
                                </span>
                            )}
                        </div>
                        {headerRight ? (
                            <div className="ml-auto">{headerRight}</div>
                        ) : !hideClose && onClose ? (
                            <button
                                onClick={onClose}
                                className="ml-auto flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl transition-colors hover:bg-so-surface-2"
                                style={{ color: "var(--tf-text-dim)" }}
                                aria-label="Close"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        ) : null}
                    </div>

                    {/* Content */}
                    {/* `items-center` on the scroll container clips a step that is taller than the
                        viewport at BOTH ends and makes the top unreachable, because the overflow is
                        split above and below the centred child. Centring on an inner `min-h-full`
                        wrapper instead keeps short steps centred and lets tall ones scroll normally. */}
                    <div className="relative z-10 flex-1 overflow-y-auto">
                        <div className="mx-auto flex min-h-full w-full max-w-xl items-center px-6 py-8">
                            <AnimatePresence mode="wait" custom={direction}>
                                {!restored ? null : isDone ? (
                                    <ThankYouScreen key="done" title={thankYouTitle} desc={thankYouDesc} actions={thankYouActions} />
                                ) : currentStep ? (
                                    <motion.div
                                        key={currentStep.id}
                                        custom={direction}
                                        variants={stepVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className="w-full"
                                    >
                                        <StepContent
                                            step={currentStep}
                                            answers={answers}
                                            value={answers[currentStep.id]}
                                            onChange={(val) => setAnswer(currentStep.id, val)}
                                            onToggleMulti={(opt) => toggleMultiAnswer(currentStep.id, opt)}
                                            onNext={goNext}
                                            inputRef={inputRef}
                                            textareaRef={textareaRef}
                                            isSubmitting={isSubmitting}
                                            error={error}
                                        />
                                    </motion.div>
                                ) : null}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    {!isDone && (
                        <div className="relative z-10 flex shrink-0 items-center justify-between px-6 py-5">
                            <div>
                                {currentIdx > 0 && (
                                    <button
                                        onClick={goBack}
                                        className={cn(
                                            "flex cursor-pointer items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80",
                                            hasSidePanel && !showFormBack && "lg:hidden",
                                        )}
                                        style={{ color: "var(--tf-text-dim)" }}
                                    >
                                        <ArrowUp className="h-4 w-4" />
                                        Back
                                    </button>
                                )}
                            </div>
                            {currentStep?.type !== "welcome" && (
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => void goNext()}
                                        disabled={isSubmitting}
                                        className="cursor-pointer rounded-xl px-6 py-2.5 text-sm font-semibold shadow-sm transition-all active:scale-95 disabled:opacity-60"
                                        style={{ backgroundColor: "var(--tf-accent)", color: "var(--tf-accent-ink)" }}
                                    >
                                        {isSubmitting ? "Sending..." : isLastVisible ? submitLabel : "OK"}
                                    </button>
                                    {currentStep?.type !== "single_choice" && (
                                        <span className="hidden text-xs sm:block" style={{ color: "var(--tf-text-dim)" }}>
                                            press{" "}
                                            <kbd className="rounded border px-1.5 py-0.5 text-xs" style={{ borderColor: "var(--tf-border)", color: "var(--tf-text-dim)" }}>
                                                {currentStep?.type === "long_text" ? "Ctrl + Enter" : "Enter"}
                                            </kbd>
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// ─── Thank you ────────────────────────────────────────────────────────────────

function ThankYouScreen({ title, desc, actions }: { title: string; desc: string; actions?: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="py-4 text-center"
        >
            <SuccessAnimation />
            <h2 className="mt-6 text-3xl font-bold leading-tight md:text-4xl" style={{ color: "var(--tf-text)" }}>{title}</h2>
            <p className="mx-auto mt-3 max-w-md text-lg leading-relaxed" style={{ color: "var(--tf-text-dim)" }}>{desc}</p>
            {actions && <div className="mt-8 flex flex-wrap items-center justify-center gap-3">{actions}</div>}
        </motion.div>
    )
}

/** A ring draws closed, a checkmark writes itself, haloes pulse outward. */
function SuccessAnimation() {
    const accent = "var(--tf-accent)"
    const sparks = Array.from({ length: 6 }, (_, i) => (i / 6) * Math.PI * 2)
    return (
        <div className="mx-auto h-28 w-28">
            <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible">
                {[0, 1].map((i) => (
                    <motion.circle
                        key={`halo-${i}`}
                        cx="100" cy="100" r="62" fill="none" stroke={accent} strokeWidth="1.5"
                        initial={{ scale: 0.7, opacity: 0.5 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 2.2, ease: "easeOut", repeat: Infinity, delay: 0.6 + i * 1.1 }}
                        style={{ transformOrigin: "100px 100px" }}
                    />
                ))}
                <motion.circle
                    cx="100" cy="100" r="60" fill={accent} fillOpacity={0.08}
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 140, damping: 14 }}
                    style={{ transformOrigin: "100px 100px" }}
                />
                <motion.circle
                    cx="100" cy="100" r="60" fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ delay: 0.15, duration: 0.9, ease: EASE }}
                    style={{ transformOrigin: "100px 100px", rotate: -90 }}
                />
                <motion.path
                    d="M74 102 L92 120 L128 78" fill="none" stroke={accent} strokeWidth="7"
                    strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ delay: 1.0, duration: 0.5, ease: EASE }}
                />
                <motion.g
                    initial={{ rotate: 0 }} animate={{ rotate: 360 }}
                    transition={{ duration: 9, ease: "linear", repeat: Infinity }}
                    style={{ transformOrigin: "100px 100px" }}
                >
                    {sparks.map((a, i) => (
                        <motion.circle
                            key={`spark-${i}`}
                            cx={100 + Math.cos(a) * 84} cy={100 + Math.sin(a) * 84} r="3" fill={accent}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: [0, 1, 0.4], scale: 1 }}
                            transition={{ delay: 1.15 + i * 0.06, duration: 0.6, ease: EASE }}
                        />
                    ))}
                </motion.g>
            </svg>
        </div>
    )
}

// ─── Step content ─────────────────────────────────────────────────────────────

interface StepContentProps {
    step: FlowStep
    answers: Record<string, unknown>
    value: unknown
    onChange: (val: unknown) => void
    onToggleMulti: (opt: string) => void
    onNext: () => void
    inputRef: React.RefObject<HTMLInputElement | null>
    textareaRef: React.RefObject<HTMLTextAreaElement | null>
    isSubmitting: boolean
    error: string | null
}

function StepContent({
    step, answers, value, onChange, onToggleMulti, onNext, inputRef, textareaRef, isSubmitting, error,
}: StepContentProps) {
    const [focused, setFocused] = useState(false)

    // Focus on mount rather than on a timer in the parent: AnimatePresence mode="wait" only mounts
    // this after the previous step has finished exiting, so a timed focus in the parent fires while
    // the field still does not exist. `step.id` in the deps covers the case where the same content
    // component is reused across steps of the same type.
    useEffect(() => {
        const el = inputRef.current ?? textareaRef.current
        if (!el) return
        // rAF so focus lands after the entering element has been positioned, which stops the
        // browser scrolling the flex column to chase a still-animating target.
        const r = requestAnimationFrame(() => el.focus({ preventScroll: true }))
        return () => cancelAnimationFrame(r)
    }, [step.id, inputRef, textareaRef])

    const header = (
        <div className="mb-8">
            {step.type !== "welcome" && (
                <div className="mb-3 flex items-baseline gap-2">
                    <span className="text-base font-bold" style={{ color: "var(--tf-accent)" }}>↗</span>
                </div>
            )}
            <h2 className="text-3xl font-bold leading-tight tracking-[-0.02em] md:text-4xl" style={{ color: "var(--tf-text)" }}>
                {step.question}
            </h2>
            {step.description && (
                <p className="mt-3 text-lg leading-relaxed" style={{ color: "var(--tf-text-dim)" }}>{step.description}</p>
            )}
        </div>
    )

    const inputBaseCls =
        "w-full bg-transparent border-0 border-b-2 outline-none text-2xl md:text-3xl pb-3 pt-1 transition-colors duration-200"
    const inputBorderStyle = {
        borderColor: focused ? "var(--tf-accent)" : "var(--tf-border)",
        color: "var(--tf-text)",
    }

    if (step.type === "welcome") {
        return (
            <div className="py-4">
                {header}
                <button
                    onClick={onNext}
                    disabled={isSubmitting}
                    className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold shadow-sm transition-all active:scale-95"
                    style={{ backgroundColor: "var(--tf-accent)", color: "var(--tf-accent-ink)" }}
                >
                    Start <span aria-hidden>→</span>
                </button>
                <p className="mt-4 text-sm" style={{ color: "var(--tf-text-dim)" }}>
                    Takes about two minutes. Press{" "}
                    <kbd className="rounded border px-1.5 py-0.5 text-xs" style={{ borderColor: "var(--tf-border)" }}>Enter</kbd>{" "}
                    to move on at any point.
                </p>
            </div>
        )
    }

    if (step.type === "short_text" || step.type === "email" || step.type === "number" || step.type === "phone") {
        return (
            <div className="py-4">
                {header}
                <input
                    ref={inputRef}
                    type={step.type === "email" ? "email" : step.type === "phone" ? "tel" : "text"}
                    inputMode={step.type === "number" ? "numeric" : step.type === "phone" ? "tel" : undefined}
                    value={(value as string) ?? ""}
                    onChange={(e) => onChange(step.type === "number" ? e.target.value.replace(/[^0-9]/g, "") : e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder={step.placeholder ?? "Type your answer here..."}
                    className={`${inputBaseCls} placeholder:opacity-40`}
                    style={inputBorderStyle}
                    autoComplete={step.type === "email" ? "email" : step.type === "phone" ? "tel" : "off"}
                    spellCheck={false}
                />
                <ErrorMessage error={error} />
            </div>
        )
    }

    if (step.type === "long_text") {
        return (
            <div className="py-4">
                {header}
                <textarea
                    ref={textareaRef}
                    value={(value as string) ?? ""}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder={step.placeholder ?? "Type your answer here..."}
                    rows={4}
                    className="w-full resize-none border-0 border-b-2 bg-transparent pb-3 pt-1 text-xl leading-relaxed outline-none transition-colors duration-200 placeholder:opacity-40 md:text-2xl"
                    style={inputBorderStyle}
                />
                <p className="mt-2 text-sm" style={{ color: "var(--tf-text-dim)" }}>
                    Press{" "}
                    <kbd className="rounded border px-1.5 py-0.5 text-xs" style={{ borderColor: "var(--tf-border)" }}>Ctrl + Enter</kbd>{" "}
                    to continue
                </p>
                <ErrorMessage error={error} />
            </div>
        )
    }

    if (step.type === "single_choice" || step.type === "multiple_choice") {
        const opts = resolveOptions(step, answers)
        const isMulti = step.type === "multiple_choice"
        const selected = isMulti ? ((value as string[]) ?? []) : ((value as string) ?? "")

        return (
            <div className="py-4">
                {header}
                <div className="space-y-2.5">
                    {opts.map((opt, i) => {
                        const letter = LETTERS[i] ?? String(i + 1)
                        const isSelected = isMulti ? (selected as string[]).includes(opt) : selected === opt
                        return (
                            <button
                                key={opt}
                                type="button"
                                onClick={() => {
                                    if (isMulti) onToggleMulti(opt)
                                    else { onChange(opt); setTimeout(() => onNext(), 320) }
                                }}
                                className="group flex w-full cursor-pointer items-center gap-4 rounded-xl border-2 px-4 py-3.5 text-left transition-all duration-200"
                                style={{
                                    borderColor: isSelected ? "var(--tf-accent)" : "var(--tf-border)",
                                    backgroundColor: isSelected ? "var(--tf-accent-tint)" : "var(--tf-surface)",
                                    transform: isSelected ? "scale(1.01)" : undefined,
                                }}
                            >
                                <span
                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold tabular-nums transition-all duration-200"
                                    style={{
                                        backgroundColor: isSelected ? "var(--tf-accent)" : "var(--tf-accent-tint)",
                                        color: isSelected ? "var(--tf-accent-ink)" : "var(--tf-text-dim)",
                                    }}
                                >
                                    {isSelected && isMulti ? <Check className="h-4 w-4" strokeWidth={2.5} /> : letter}
                                </span>
                                <span className="text-base font-medium" style={{ color: "var(--tf-text)" }}>{opt}</span>
                            </button>
                        )
                    })}
                </div>
                {isMulti && (
                    <p className="mt-3 text-sm" style={{ color: "var(--tf-text-dim)" }}>Choose as many as apply.</p>
                )}
                <ErrorMessage error={error} />
            </div>
        )
    }

    if (step.type === "consent") {
        const checked = value === true
        return (
            <div className="py-4">
                {header}
                <div
                    className="rounded-2xl border-2 p-5 transition-colors duration-200"
                    style={{
                        borderColor: checked ? "var(--tf-accent)" : "var(--tf-border)",
                        backgroundColor: checked ? "var(--tf-accent-tint)" : "var(--tf-surface)",
                    }}
                >
                    {step.consentBody}

                    {/* The whole row is the hit target, not just the 16px box. */}
                    <label
                        className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors"
                        style={{ borderColor: checked ? "var(--tf-accent)" : "var(--tf-border)", backgroundColor: "var(--tf-surface)" }}
                    >
                        <Checkbox
                            checked={checked}
                            onCheckedChange={(v) => onChange(v === true)}
                            className="mt-0.5 size-5 rounded-[6px] border-2 data-[state=checked]:border-so-ink data-[state=checked]:bg-so-ink data-[state=checked]:text-so-bg"
                        />
                        <span className="text-[14.5px] font-medium leading-snug" style={{ color: "var(--tf-text)" }}>
                            {step.consentLabel}
                        </span>
                    </label>

                    {step.consentFootnote && (
                        <p className="mt-3 text-[12.5px] leading-relaxed" style={{ color: "var(--tf-text-dim)" }}>
                            {step.consentFootnote}
                        </p>
                    )}
                </div>
                <ErrorMessage error={error} />
            </div>
        )
    }

    // select
    const opts = resolveOptions(step, answers)
    return (
        <div className="py-4">
            {header}
            <div className="mt-5 max-w-md">
                <InlineSelect
                    placeholder={step.placeholder ?? "Select an option"}
                    options={opts}
                    value={(value as string) ?? ""}
                    onChange={(v) => onChange(v)}
                />
            </div>
            <ErrorMessage error={error} />
        </div>
    )
}

function ErrorMessage({ error }: { error: string | null }) {
    return (
        <AnimatePresence>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="mt-4 text-sm font-medium text-red-600 dark:text-red-400"
                    role="alert"
                >
                    {error}
                </motion.p>
            )}
        </AnimatePresence>
    )
}

/** A searchable dropdown for lists too long to render as letter-keyed buttons. */
function InlineSelect({
    placeholder, options, value, onChange,
}: {
    placeholder: string
    options: string[]
    value: string
    onChange: (v: string) => void
}) {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    const wrapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!open) return
        const handler = (e: MouseEvent) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [open])

    const filtered = useMemo(
        () => (query ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase())) : options),
        [options, query],
    )

    return (
        <div ref={wrapRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl border-2 px-4 py-3.5 text-left text-base transition-colors"
                style={{ borderColor: open ? "var(--tf-accent)" : "var(--tf-border)", backgroundColor: "var(--tf-surface)", color: value ? "var(--tf-text)" : "var(--tf-text-dim)" }}
            >
                {value || placeholder}
                <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", open && "rotate-180")} style={{ color: "var(--tf-text-dim)" }} />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 right-0 z-20 mt-2 overflow-hidden rounded-xl border shadow-lg"
                        style={{ borderColor: "var(--tf-border)", backgroundColor: "var(--tf-surface)" }}
                    >
                        <div className="flex items-center gap-2 border-b px-3 py-2.5" style={{ borderColor: "var(--tf-border)" }}>
                            <Search className="h-4 w-4 shrink-0" style={{ color: "var(--tf-text-dim)" }} />
                            <input
                                autoFocus
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search"
                                className="w-full bg-transparent text-sm outline-none"
                                style={{ color: "var(--tf-text)" }}
                            />
                        </div>
                        <ScrollArea className="max-h-56">
                            <div className="p-1.5">
                                {filtered.length === 0 && (
                                    <p className="px-3 py-4 text-sm" style={{ color: "var(--tf-text-dim)" }}>No matches.</p>
                                )}
                                {filtered.map((opt) => (
                                    <button
                                        key={opt}
                                        type="button"
                                        onClick={() => { onChange(opt); setOpen(false); setQuery("") }}
                                        className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-so-surface-2"
                                        style={{ color: "var(--tf-text)" }}
                                    >
                                        {opt}
                                        {value === opt && <Check className="h-4 w-4" style={{ color: "var(--tf-accent)" }} />}
                                    </button>
                                ))}
                            </div>
                        </ScrollArea>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
