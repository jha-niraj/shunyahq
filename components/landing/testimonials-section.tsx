"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const testimonials = [
    {
        text: "They architected a scalable platform that handled our 300% growth.",
        name: "Sarah J.",
        role: "CTO, FinStream",
        initials: "SJ",
    },
    {
        text: "Technical precision is unmatched. The code is clean and scalable.",
        name: "Mark D.",
        role: "Founder, EduCore",
        initials: "MD",
    },
    {
        text: "Operates like a partner, not just a vendor.",
        name: "Priya R.",
        role: "Product Lead, HealthPlus",
        initials: "PR",
    },
    {
        text: "We launched 2 weeks ahead of schedule thanks to their CI/CD setup.",
        name: "James K.",
        role: "VP Eng, LogiTech",
        initials: "JK",
    },
    {
        text: "The UI system they built is now our company standard.",
        name: "Elena M.",
        role: "Design Dir, CreativeX",
        initials: "EM",
    },
    {
        text: "Finally, an agency that understands complex backend logic.",
        name: "David W.",
        role: "Lead Dev, DataFlow",
        initials: "DW",
    },
    {
        text: "SyncOrbit has completely changed how we manage sprints.",
        name: "Tom H.",
        role: "PM, AgileCorp",
        initials: "TH",
    },
    {
        text: "Security compliance was our top worry, they nailed it.",
        name: "Rachel G.",
        role: "CISO, SecureNet",
        initials: "RG",
    },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 8)

function TestimonialsColumn({
    items,
    duration = 18,
    className,
}: {
    items: typeof testimonials
    duration?: number
    className?: string
}) {
    return (
        <div className={cn("overflow-hidden", className)}>
            <motion.div
                animate={{ translateY: "-50%" }}
                transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
                className="flex flex-col gap-5 pb-5"
            >
                {
                    [...Array(2)].map((_, colIdx) => (
                        <React.Fragment key={colIdx}>
                            {
                                items.map(({ text, name, role, initials }, i) => (
                                    <div
                                        key={i}
                                        className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm max-w-xs w-full"
                                    >
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
                                ))
                            }
                        </React.Fragment>
                    ))
                }
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

                <div className="flex justify-center gap-5 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[720px] overflow-hidden">
                    <TestimonialsColumn items={firstColumn} duration={18} />
                    <TestimonialsColumn items={secondColumn} className="hidden md:block" duration={22} />
                    <TestimonialsColumn items={thirdColumn} className="hidden lg:block" duration={20} />
                </div>
            </div>
        </section>
    )
}