"use client"

import { motion } from "framer-motion"

const STEPS = [
    {
        n: "01",
        title: "Discovery",
        body: "Week 1-2: Requirements workshop, tech stack decision, architecture blueprint. You get a written spec before a single line is written.",
        detail: "Requirements workshop - Tech stack decision - Architecture blueprint - Written spec",
        icon: (
            <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                <rect width="40" height="40" rx="10" fill="currentColor" fillOpacity="0.08" />
                <rect x="8" y="14" width="24" height="3" rx="1.5" fill="currentColor" fillOpacity="0.3" />
                <rect x="8" y="20" width="18" height="3" rx="1.5" fill="currentColor" fillOpacity="0.6" />
                <rect x="8" y="26" width="21" height="3" rx="1.5" fill="currentColor" fillOpacity="0.3" />
                <circle cx="32" cy="27" r="5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />
                <path d="M30 27h4M32 25v4" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        n: "02",
        title: "Engineering",
        body: "Week 3-8: Agile sprints with bi-weekly deployments to staging. You always see real working software - never mockups.",
        detail: "Agile sprints - Bi-weekly staging deployments - Real working software, never mockups",
        icon: (
            <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                <rect width="40" height="40" rx="10" fill="currentColor" fillOpacity="0.08" />
                <circle cx="20" cy="20" r="10" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2" strokeDasharray="2 2" />
                <circle cx="20" cy="20" r="5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.2" />
                <circle cx="20" cy="20" r="2" fill="currentColor" fillOpacity="0.8" />
                <path d="M10 20h4M26 20h4M20 10v4M20 26v4" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        n: "03",
        title: "Launch",
        body: "Final week: QA, security audit, production deployment - handed over with documentation and 30 days of support.",
        detail: "QA testing - Security audit - Production deployment - Docs + 30 days of support",
        icon: (
            <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                <rect width="40" height="40" rx="10" fill="currentColor" fillOpacity="0.08" />
                <rect x="10" y="10" width="20" height="22" rx="3" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.2" />
                <rect x="14" y="16" width="12" height="2" rx="1" fill="currentColor" fillOpacity="0.35" />
                <rect x="14" y="20" width="8" height="2" rx="1" fill="currentColor" fillOpacity="0.5" />
                <rect x="14" y="24" width="10" height="2" rx="1" fill="currentColor" fillOpacity="0.35" />
                <circle cx="29" cy="29" r="6" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />
                <path d="M26.5 29L28.5 31L31.5 27" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
]

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
}

export function HowItWorks() {
    return (
        <section className="py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.1 }}
                    className="mb-16"
                >
                    <motion.p
                        variants={fadeUp}
                        transition={{ duration: 0.5 }}
                        className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 mb-4"
                    >
                        The Protocol
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white max-w-xl"
                    >
                        How we turn chaos{" "}
                        <span className="text-neutral-400 dark:text-neutral-500">into code.</span>
                    </motion.h2>
                </motion.div>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.14 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 dark:bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800"
                >
                    {
                        STEPS.map((step, i) => (
                            <motion.div
                                key={step.n}
                                variants={fadeUp}
                                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                className="bg-white dark:bg-neutral-900 p-8 flex flex-col relative"
                            >
                                <span className="font-mono text-[11px] font-semibold tracking-[0.16em] text-neutral-400 dark:text-neutral-600 mb-5">
                                    {step.n}
                                </span>
                                <div className="text-neutral-900 dark:text-white mb-5">
                                    {step.icon}
                                </div>

                                <h3 className="text-[18px] font-bold text-neutral-900 dark:text-white mb-3 leading-snug">
                                    {step.title}
                                </h3>

                                <p className="text-[14px] text-neutral-500 dark:text-neutral-400 leading-relaxed mb-5">
                                    {step.body}
                                </p>
                                <div className="mt-auto rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/50 px-4 py-3">
                                    <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 leading-relaxed">
                                        {step.detail}
                                    </p>
                                </div>

                                {
                                    i < STEPS.length - 1 && (
                                        <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 items-center justify-center bg-white dark:bg-neutral-900 rounded-full border border-neutral-200 dark:border-neutral-800 z-10">
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400 dark:text-neutral-600" />
                                            </svg>
                                        </div>
                                    )
                                }
                            </motion.div>
                        ))
                    }
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3"
                >
                    {
                        [
                            "Bi-weekly deployments to staging - you always see real working software",
                            "Full-stack ownership - one team, no handoffs",
                            "Every launch ships with documentation and 30 days of support",
                        ].map((note) => (
                            <div key={note} className="flex items-center gap-2">
                                <span className="w-4 h-4 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center shrink-0">
                                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                        <path d="M1.5 4L3.5 6L6.5 2" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="stroke-white dark:stroke-neutral-900" />
                                    </svg>
                                </span>
                                <span className="text-[12.5px] text-neutral-500 dark:text-neutral-400">{note}</span>
                            </div>
                        ))
                    }
                </motion.div>
            </div>
        </section>
    )
}