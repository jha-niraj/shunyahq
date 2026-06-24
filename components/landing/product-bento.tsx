"use client"

import { type ReactNode } from "react"
import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    StreamingChat, VouchingScan, ReportDraft, ExamCard, LangToggle, MiniBarChart,
} from "./illustrations"

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
}

function Tile({
    title, body, children, className, contentClassName,
}: {
    title: string
    body: string
    children: ReactNode
    className?: string
    contentClassName?: string
}) {
    return (
        <motion.div
            variants={fadeUp}
            transition={{ duration: 0.55, ease: EASE }}
            className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-300 dark:border-white/10 dark:bg-neutral-900/40 dark:hover:border-white/20",
                className,
            )}
        >
            <div className={cn("mb-5 flex flex-1 items-center justify-center", contentClassName)}>
                {children}
            </div>
            <div className="mt-auto">
                <h3 className="text-[15px] font-bold leading-snug text-neutral-900 dark:text-white">{title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-400">{body}</p>
            </div>
        </motion.div>
    )
}

export default function ProductBento() {
    return (
        <section className="py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.1 }}
                    className="mb-14 text-center"
                >
                    <motion.p variants={fadeUp} transition={{ duration: 0.5 }} className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
                        Experience SyncOrbit in action
                    </motion.p>
                    <motion.h2 variants={fadeUp} transition={{ duration: 0.5 }} className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
                        The command center for high-velocity{" "}
                        <span className="text-neutral-400 dark:text-neutral-500">engineering teams.</span>
                    </motion.h2>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.1 }}
                    className="grid auto-rows-[minmax(190px,auto)] grid-cols-1 gap-4 md:grid-cols-3"
                >
                    <Tile
                        title="Real-time Kanban with Git integration"
                        body="Boards that sync with your repo - commits, branches, and PRs move cards as the code moves."
                        className="md:col-span-2 md:row-span-2"
                        contentClassName="items-start"
                    >
                        <StreamingChat className="max-w-md" />
                    </Tile>

                    <Tile title="Full-stack ownership" body="One team owns frontend, backend, and infra - no handoffs.">
                        <LangToggle className="w-full max-w-[200px]" />
                    </Tile>

                    <Tile title="Production-grade systems" body="Every project goes live - real software people actually use.">
                        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                            <ShieldCheck className="h-7 w-7" />
                        </span>
                    </Tile>

                    <Tile title="CI/CD pipeline visualization" body="See builds, tests, and deploys flow through every stage live." className="md:col-span-2">
                        <VouchingScan className="max-w-sm" />
                    </Tile>

                    <Tile title="Automated sprint reporting" body="Velocity and progress summarized automatically each cycle.">
                        <ExamCard className="w-full max-w-[230px]" />
                    </Tile>

                    <Tile title="Client view-only portals" body="Stakeholders watch real progress - never just status decks.">
                        <ReportDraft className="w-full max-w-[260px]" />
                    </Tile>

                    <Tile title="Bi-weekly deployment cadence" body="Working software shipped to staging every two weeks, tracked end to end." className="md:col-span-2">
                        <div className="flex h-full w-full max-w-md items-end gap-1.5 pt-4">
                            <MiniBarChart className="h-24 w-full" />
                        </div>
                    </Tile>
                </motion.div>
            </div>
        </section>
    )
}
