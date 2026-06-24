"use client"

import { motion } from "framer-motion"

// The teams we've shipped with and the industries we build for - the signals
// behind every product Shunya Tech puts into production.
const SOURCES = [
    "FinStream",
    "EduCore",
    "HealthPlus",
    "LogiTech",
    "CreativeX",
    "DataFlow",
    "AgileCorp",
    "SecureNet",
    "EdTech",
    "HealthTech",
    "FinTech",
    "Events",
]

export default function TrustedBy() {
    const doubled = [...SOURCES, ...SOURCES]
    return (
        <section className="border-y border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-950 py-14">
            <div className="mx-auto max-w-6xl px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center text-2xl md:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-500"
                >
                    Trusted by teams that ship
                </motion.h2>
                <p className="mt-3 text-center text-sm text-neutral-500 dark:text-neutral-400">
                    Built for forward-thinking companies across EdTech, HealthTech, FinTech, and more.
                </p>

                <div className="relative mt-10 overflow-hidden">
                    <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-neutral-50 to-transparent dark:from-neutral-950" />
                    <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-neutral-50 to-transparent dark:from-neutral-950" />
                    <div className="flex w-max gap-10" style={{ animation: "tb-marquee 40s linear infinite" }}>
                        {
                            doubled.map((s, i) => (
                                <span key={i} className="shrink-0 whitespace-nowrap text-[15px] font-semibold tracking-tight text-neutral-400 dark:text-neutral-500">
                                    {s}
                                </span>
                            ))
                        }
                    </div>
                </div>
            </div>
            <style>{`@keyframes tb-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
        </section>
    )
}
