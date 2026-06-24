"use client"

import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Plus, X
} from "lucide-react"
import { LANDING_FAQS as FAQS } from "./faq-data"

export default function FAQSection() {
    const [open, setOpen] = useState<number | null>(0)

    return (
        <section id="faq" className="relative">
            <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.4fr]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col justify-start lg:sticky lg:top-24 lg:self-start"
                    >
                        <p className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
                            FAQ
                        </p>
                        <h2 className="text-4xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-white md:text-5xl">
                            Questions,{" "}
                            <br />
                            <span className="text-neutral-500 dark:text-neutral-400">answered</span>
                        </h2>
                        <p className="mt-6 max-w-sm text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
                            Everything you need to know before starting a project.
                        </p>
                        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/contactus"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all"
                            >
                                Start a Project
                            </Link>
                            <Link
                                href="/contactus"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>
                    <div>
                        {
                            FAQS.map((faq, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.04 }}
                                    className="border-b border-neutral-200 dark:border-neutral-800"
                                >
                                    <button
                                        onClick={() => setOpen(open === i ? null : i)}
                                        className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
                                    >
                                        <span className="text-base font-medium text-neutral-900 dark:text-white">
                                            {faq.q}
                                        </span>
                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-600 text-neutral-500 dark:text-neutral-400 transition-all">
                                            {open === i ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                                        </span>
                                    </button>
                                    <AnimatePresence>
                                        {
                                            open === i && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="pb-5 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 md:text-base">
                                                        {faq.a}
                                                    </p>
                                                </motion.div>
                                            )
                                        }
                                    </AnimatePresence>
                                </motion.div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}