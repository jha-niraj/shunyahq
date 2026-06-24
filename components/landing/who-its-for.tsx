"use client"

import { motion } from "framer-motion"
import {
    Layers, Rocket, Gauge
} from "lucide-react"

const PROFILES = [
    {
        icon: Layers,
        role: "Full-Stack Ownership",
        subtitle: "One team, end to end",
        points: [
            "We own frontend, backend, infra, and deployment as one team",
            "No handoffs between siloed vendors - no finger-pointing",
            "A single point of accountability from kickoff to launch",
            "Architecture decisions made by the people who ship them",
        ],
        tag: "How we work",
    },
    {
        icon: Rocket,
        role: "We Ship Real Products",
        subtitle: "Production, not prototypes",
        points: [
            "Every project we take goes live - not a Figma deck",
            "Production systems people actually use, day one",
            "Bi-weekly deployments to staging you can click through",
            "Handed over with documentation and post-launch support",
        ],
        tag: null,
    },
    {
        icon: Gauge,
        role: "Speed Without Shortcuts",
        subtitle: "Fast, with no technical debt",
        points: [
            "Modern stacks - Next.js, tRPC, Prisma - let us move fast",
            "Velocity that doesn't create debt you'll pay for later",
            "Honest timelines scoped in weeks, not quarters",
            "You always see real working software, never status decks",
        ],
        tag: null,
    },
]

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
}

export function WhoItsFor() {
    return (
        <section className="py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.1 }}
                    className="text-center mb-16"
                >
                    <motion.p
                        variants={fadeUp}
                        transition={{ duration: 0.5 }}
                        className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 mb-4"
                    >
                        How we operate
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white"
                    >
                        Built{" "}
                        <span className="text-neutral-400 dark:text-neutral-500">Different.</span>
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        transition={{ duration: 0.5 }}
                        className="mt-4 text-base text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto"
                    >
                        We don&apos;t manage projects - we own them. Here&apos;s what that actually means in practice.
                    </motion.p>
                </motion.div>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.12 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {
                        PROFILES.map((profile) => {
                            const Icon = profile.icon
                            return (
                                <motion.div
                                    key={profile.role}
                                    variants={fadeUp}
                                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                    className="relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 p-7 flex flex-col"
                                >
                                    {profile.tag && (
                                        <span className="absolute top-5 right-5 text-[10px] font-semibold font-mono uppercase tracking-widest text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full px-2.5 py-1">
                                            {profile.tag}
                                        </span>
                                    )}

                                    <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center mb-5 text-neutral-700 dark:text-neutral-300">
                                        <Icon className="w-5 h-5" />
                                    </div>

                                    <h3 className="text-[17px] font-bold text-neutral-900 dark:text-white mb-1 leading-snug">
                                        {profile.role}
                                    </h3>
                                    <p className="text-[12px] font-mono text-neutral-400 dark:text-neutral-500 mb-5">
                                        {profile.subtitle}
                                    </p>

                                    <ul className="space-y-3 mt-auto">
                                        {
                                            profile.points.map((point) => (
                                                <li key={point} className="flex items-start gap-2.5">
                                                    <span className="mt-[3px] w-4 h-4 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center shrink-0">
                                                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                            <path d="M1.5 4L3.5 6L6.5 2" stroke={undefined} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="stroke-white dark:stroke-neutral-900" />
                                                        </svg>
                                                    </span>
                                                    <span className="text-[13px] text-neutral-600 dark:text-neutral-400 leading-snug">{point}</span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </motion.div>
                            )
                        })
                    }
                </motion.div>
            </div>
        </section>
    )
}