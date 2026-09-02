"use client"

import Link from "next/link"
import { useId, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { EASE } from "./animations"

export type FaqItem = { q: string; a: string }

interface PageFAQProps {
    items: FaqItem[]
    eyebrow?: string
    /** Plain part of the heading */
    title?: string
    /** Muted second line of the heading */
    titleAccent?: string
    description?: string
    /** When true, the section emits FAQPage JSON-LD. Turn OFF on pages that already emit their own. */
    withSchema?: boolean
    /** Anchor id. Only one element per page may own `faq`. */
    id?: string
    /**
     * Overrides the width/padding wrapper. The default is the full-bleed marketing measure; pass
     * something tighter when dropping this inside an existing column (e.g. an article body).
     */
    containerClassName?: string
    /** Hide the call-to-action pair under the heading. */
    showCta?: boolean
}

/**
 * The one FAQ on the platform.
 *
 * Sticky heading on the left, accordion on the right. The landing page, service pages, solution
 * pages, tools, pricing, the accelerator and blog posts all render THIS component with different
 * items and a different left-hand heading - there is deliberately no second FAQ implementation to
 * drift away from it.
 */
export function PageFAQ({
    items,
    eyebrow = "FAQ",
    title = "Questions,",
    titleAccent = "answered",
    description = "Everything you need to know before starting a project.",
    withSchema = true,
    id = "faq",
    containerClassName = "mx-auto max-w-6xl px-6 py-24 md:py-32",
    showCta = true,
}: PageFAQProps) {
    const [open, setOpen] = useState<number | null>(0)
    const reduced = useReducedMotion()
    // Panels need ids the buttons can point at, and this component can appear twice in one tree.
    const uid = useId()

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
    }

    if (!items.length) return null

    return (
        <section id={id} className="relative">
            {
                withSchema && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                    />
                )
            }
            <div className={containerClassName}>
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
                    <div
                        data-rv=""
                        style={{ "--rv-y": "20px" } as React.CSSProperties}
                        className="so-anim flex flex-col justify-start lg:sticky lg:top-24 lg:self-start"
                    >
                        <p className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-so-ink-4">
                            {eyebrow}
                        </p>
                        <h2 className="text-4xl font-bold leading-tight tracking-tight text-so-ink md:text-5xl">
                            {title}{" "}
                            <br />
                            <span className="text-so-ink-3">{titleAccent}</span>
                        </h2>
                        <p className="mt-6 max-w-sm text-base leading-relaxed text-so-ink-3">
                            {description}
                        </p>
                        {
                            showCta && (
                                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                                    <Link
                                        href="/contactus"
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-so-ink px-6 py-3 text-sm font-semibold text-so-bg transition-opacity hover:opacity-90"
                                    >
                                        Start a Project
                                    </Link>
                                    <Link
                                        href="/contactus"
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-so-line px-6 py-3 text-sm font-medium text-so-ink-2 transition-colors hover:bg-so-surface-2"
                                    >
                                        Contact Us
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                    <div>
                        {
                            items.map((faq, i) => {
                                const isOpen = open === i
                                const panelId = `${uid}-panel-${i}`
                                const buttonId = `${uid}-button-${i}`

                                return (
                                    <div
                                        key={faq.q}
                                        data-rv=""
                                        style={{ "--rv-y": "8px", "--rv-delay": `${i * 0.04}s`, "--rv-duration": "0.45s" } as React.CSSProperties}
                                        className="border-b border-so-line"
                                    >
                                        <button
                                            id={buttonId}
                                            type="button"
                                            aria-expanded={isOpen}
                                            aria-controls={panelId}
                                            onClick={() => setOpen(isOpen ? null : i)}
                                            className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
                                        >
                                            <span className="text-base font-medium text-so-ink">
                                                {faq.q}
                                            </span>
                                            <span
                                                className={cn(
                                                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors",
                                                    isOpen
                                                        ? "border-so-ink text-so-ink"
                                                        : "border-so-ink-5 text-so-ink-3",
                                                )}
                                            >
                                                {isOpen ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                                            </span>
                                        </button>
                                        <AnimatePresence initial={false}>
                                            {
                                                isOpen && (
                                                    <motion.div
                                                        id={panelId}
                                                        role="region"
                                                        aria-labelledby={buttonId}
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: reduced ? 0.01 : 0.28, ease: EASE }}
                                                        className="overflow-hidden"
                                                    >
                                                        <p className="pb-5 text-sm leading-relaxed text-so-ink-2 md:text-base">
                                                            {faq.a}
                                                        </p>
                                                    </motion.div>
                                                )
                                            }
                                        </AnimatePresence>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
