"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { CitationAnswer, ExamCard, VouchingScan, ReportDraft } from "./illustrations"

export default function CTASection() {
    return (
        <section id="cta" className="relative overflow-hidden py-28 md:py-40 px-6">
            {/* Faded card wall behind the CTA - product cards drifting at the edges. */}
            <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute left-0 top-1/2 hidden -translate-y-1/2 -translate-x-1/4 -rotate-6 space-y-5 opacity-40 blur-[1px] lg:block">
                    <CitationAnswer className="w-[240px]" />
                    <ExamCard className="w-[240px]" />
                </div>
                <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/4 rotate-6 space-y-5 opacity-40 blur-[1px] lg:block">
                    <VouchingScan className="w-[240px]" />
                    <ReportDraft className="w-[240px]" />
                </div>
                {/* Wash so the cards never compete with the headline */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-white dark:from-neutral-950 dark:via-neutral-950/80 dark:to-neutral-950" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-transparent to-white dark:from-neutral-950/0 dark:to-neutral-950" />
            </div>

            <div className="relative z-10 mx-auto max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                >
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-white/10 bg-neutral-100/50 dark:bg-white/5 px-4 py-2 text-xs text-neutral-600 dark:text-white/50 backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                        Engineering intelligence for the digital age
                    </div>

                    <h2 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-white md:text-7xl text-balance">
                        Ready to build
                        <br />
                        <span className="text-neutral-400 dark:text-neutral-500">the future?</span>
                    </h2>
                    <p className="mx-auto mb-12 max-w-xl text-lg leading-relaxed text-neutral-600 dark:text-white/40">
                        Deploy your vision with a team that understands engineering at scale.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="/contactus"
                            className="group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-neutral-900 dark:bg-white px-10 py-4 text-[15px] font-semibold text-white dark:text-neutral-900 shadow-lg transition-all duration-300 hover:bg-neutral-800 dark:hover:bg-white/95 hover:-translate-y-0.5"
                        >
                            Start a Project
                            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                        <Link
                            href="https://cal.com/niraj-jha/30min"
                            className="inline-flex cursor-pointer items-center rounded-xl border border-neutral-300 dark:border-white/15 bg-neutral-100/50 dark:bg-white/5 px-10 py-4 text-[15px] font-medium text-neutral-700 dark:text-white backdrop-blur-sm transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-white/10"
                        >
                            Book a Strategy Call
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
