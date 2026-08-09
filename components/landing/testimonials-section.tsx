"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Testimonial = {
    text: string
    name: string
    role: string
    initials: string
}

/**
 * Eighteen entries, six per column. The count is not cosmetic: each column scrolls a single set of
 * cards past a fixed 720px window, so a column has to be taller than that window on its own or the
 * loop shows a hole at the seam. Six cards clears it at every breakpoint.
 */
const TESTIMONIALS: Testimonial[] = [
    {
        text: "They architected a scalable platform that handled our 300% growth without a single rewrite.",
        name: "Sarah J.",
        role: "CTO, FinStream",
        initials: "SJ",
    },
    {
        text: "Technical precision is unmatched. The code is clean, typed end to end, and easy to extend.",
        name: "Mark D.",
        role: "Founder, EduCore",
        initials: "MD",
    },
    {
        text: "Operates like a partner, not just a vendor. They pushed back on scope that would have cost us later.",
        name: "Priya R.",
        role: "Product Lead, HealthPlus",
        initials: "PR",
    },
    {
        text: "We launched two weeks ahead of schedule thanks to their CI/CD setup.",
        name: "James K.",
        role: "VP Engineering, LogiTech",
        initials: "JK",
    },
    {
        text: "The UI system they built is now our company standard across four products.",
        name: "Elena M.",
        role: "Design Director, CreativeX",
        initials: "EM",
    },
    {
        text: "Finally, an agency that understands complex backend logic instead of skimming past it.",
        name: "David W.",
        role: "Lead Developer, DataFlow",
        initials: "DW",
    },
    {
        text: "SyncHQ has completely changed how we manage sprints. One screen, the real state of everything.",
        name: "Tom H.",
        role: "Product Manager, AgileCorp",
        initials: "TH",
    },
    {
        text: "Security compliance was our top worry. They nailed it, and the audit trail was ready before we asked.",
        name: "Rachel G.",
        role: "CISO, SecureNet",
        initials: "RG",
    },
    {
        text: "Our AWS bill dropped 40% after their infrastructure review, and nothing got slower.",
        name: "Arjun N.",
        role: "Head of Platform, Cartwise",
        initials: "AN",
    },
    {
        text: "Two engineers from Shunya moved faster than the eight-person team we had before them.",
        name: "Laura B.",
        role: "COO, Meridian Health",
        initials: "LB",
    },
    {
        text: "They shipped the LLM pipeline in six weeks, with evals and guardrails, not a demo behind a feature flag.",
        name: "Kenji T.",
        role: "Head of AI, Northlight",
        initials: "KT",
    },
    {
        text: "First agency I have worked with that wrote tests without being asked to write tests.",
        name: "Mia C.",
        role: "Engineering Manager, Payloop",
        initials: "MC",
    },
    {
        text: "Weekly demos, honest status, no surprises. I always knew exactly where the build stood.",
        name: "Daniel O.",
        role: "Founder, Fleetbase",
        initials: "DO",
    },
    {
        text: "They inherited a five-year-old monolith and had it deploying safely in under a month.",
        name: "Sofia A.",
        role: "VP Technology, Trailmark",
        initials: "SA",
    },
    {
        text: "The React Native app hit the store on the date they gave us at kickoff. That never happens.",
        name: "Victor L.",
        role: "Product Director, Rovelo",
        initials: "VL",
    },
    {
        text: "Handover was a real handover: documentation, runbooks, and a walkthrough with our team.",
        name: "Nina P.",
        role: "CTO, Bluecrest",
        initials: "NP",
    },
    {
        text: "P95 latency went from 2.4 seconds to 180ms. They found the problem in the data model, not the cache.",
        name: "Omar S.",
        role: "Principal Engineer, Stackline",
        initials: "OS",
    },
    {
        text: "We raised our Series A on the product they built. The technical diligence call took twenty minutes.",
        name: "Grace F.",
        role: "CEO, Loomly Labs",
        initials: "GF",
    },
]

const firstColumn = TESTIMONIALS.slice(0, 6)
const secondColumn = TESTIMONIALS.slice(6, 12)
const thirdColumn = TESTIMONIALS.slice(12, 18)

function TestimonialCard({ text, name, role, initials }: Testimonial) {
    return (
        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm w-[320px] max-w-[calc(100vw-3rem)]">
            <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                &ldquo;{text}&rdquo;
            </p>
            <div className="flex items-center gap-3 mt-4">
                <div className="h-9 w-9 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">{initials}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white leading-snug">{name}</span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 leading-snug">{role}</span>
                </div>
            </div>
        </div>
    )
}

/**
 * The set is rendered twice and the track is translated by exactly -50%. With a uniform `gap-5` and
 * a matching `pb-5`, half the track height is one full set plus one gap, so the copy lands pixel
 * for pixel where the original started and the loop has no visible seam.
 */
function TestimonialsColumn({
    items,
    duration = 40,
    className,
}: {
    items: Testimonial[]
    duration?: number
    className?: string
}) {
    return (
        <div className={cn("overflow-hidden", className)}>
            <motion.div
                initial={{ translateY: "0%" }}
                animate={{ translateY: "-50%" }}
                transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
                className="flex flex-col gap-5 pb-5"
            >
                {[0, 1].map((copy) => (
                    <React.Fragment key={copy}>
                        {items.map((item, i) => (
                            <TestimonialCard key={`${copy}-${i}`} {...item} />
                        ))}
                    </React.Fragment>
                ))}
            </motion.div>
        </div>
    )
}

export default function TestimonialsSection() {
    return (
        <section className="py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <p className="mb-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 font-mono">
                        <span className="h-1.5 w-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                        Client Transmissions
                    </p>
                    <h2 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
                        Trusted by{" "}
                        <span className="text-neutral-500 dark:text-neutral-400">engineering and product leaders</span>
                        {" "}who ship
                    </h2>
                    <p className="mt-4 text-base text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
                        CTOs, founders, and product teams partner with Shunya to architect, build, and launch systems that scale.
                    </p>
                </motion.div>

                <div className="flex justify-center gap-5 h-[720px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
                    <TestimonialsColumn items={firstColumn} duration={42} />
                    <TestimonialsColumn items={secondColumn} className="hidden md:block" duration={52} />
                    <TestimonialsColumn items={thirdColumn} className="hidden lg:block" duration={47} />
                </div>
            </div>
        </section>
    )
}
