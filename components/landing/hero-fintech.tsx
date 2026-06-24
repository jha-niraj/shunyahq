"use client"

import { useRef } from "react"
import Link from "next/link"
import { ChevronRight, ScanLine } from "lucide-react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { ShaderHeroBg } from "./hero-shader-bg"
import { SHADER_PALETTES, type ShaderPalette } from "./shader-palettes"
import { MetricCard } from "./illustrations"

function FloatCard({
    progress, className, fromX, fromY, rotate, delay, children,
}: {
    progress: MotionValue<number>
    className: string
    fromX: number
    fromY: number
    rotate: number
    delay: number
    children: React.ReactNode
}) {
    const x = useTransform(progress, [0, 1], [0, fromX])
    const y = useTransform(progress, [0, 1], [0, fromY])
    const opacity = useTransform(progress, [0, 0.6], [1, 0])
    return (
        <motion.div
            style={{ x, y, opacity, rotate: `${rotate}deg` }}
            className={`pointer-events-none absolute z-[5] hidden lg:block ${className}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            <div style={{ animation: `fin-bob ${6 + delay}s ease-in-out ${delay}s infinite` }}>{children}</div>
        </motion.div>
    )
}

export function HeroFintech({
    eyebrow = "Audit automation portal",
    title,
    subtitle,
    palette = "mint",
    primary = { label: "Get started", href: "/signup" },
}: {
    eyebrow?: string
    title: React.ReactNode
    subtitle?: string
    palette?: ShaderPalette
    primary?: { label: string; href: string }
}) {
    const ref = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })

    return (
        <section
            ref={ref}
            className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-[#F2FBF6] px-6"
            style={{ isolation: "isolate" }}
        >
            <ShaderHeroBg colors={SHADER_PALETTES[palette]} light />

            <FloatCard progress={scrollYProgress} className="left-[5%] top-[22%]" fromX={-140} fromY={-50} rotate={-7} delay={0.35}>
                <MetricCard label="TDS deducted" value="NPR 6,000" sub="on NPR 60k rent · §88(1)" accent="emerald" />
            </FloatCard>
            <FloatCard progress={scrollYProgress} className="left-[7%] top-[58%]" fromX={-160} fromY={50} rotate={6} delay={0.55}>
                <div className="w-[210px] rounded-2xl border border-neutral-200/80 bg-white/85 p-4 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.25)] backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/70">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                        <ScanLine className="h-3.5 w-3.5" /> How AI reads your file
                    </span>
                    <div className="mt-2.5 space-y-1.5">
                        <div className="h-1.5 w-3/4 rounded-full bg-neutral-200" />
                        <div className="h-1.5 w-1/2 rounded-full bg-neutral-200" />
                        <div className="h-1.5 w-2/3 rounded-full bg-emerald-300" />
                    </div>
                </div>
            </FloatCard>
            <FloatCard progress={scrollYProgress} className="right-[5%] top-[24%]" fromX={150} fromY={-50} rotate={7} delay={0.45}>
                <MetricCard label="Total balance" value="NPR 4,53,224" sub="Income · Expenses reconciled" accent="amber" />
            </FloatCard>
            <FloatCard progress={scrollYProgress} className="right-[7%] top-[60%]" fromX={170} fromY={50} rotate={-6} delay={0.65}>
                <MetricCard label="Compliance" value="100%" sub="0 missed IRD deadlines" accent="emerald" />
            </FloatCard>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 max-w-2xl text-center"
            >
                {eyebrow && (
                    <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-600/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest text-emerald-700">
                        {eyebrow}
                    </span>
                )}
                <h1 className="text-[clamp(38px,6.5vw,76px)] font-bold leading-[1.02] tracking-[-2.2px] text-neutral-900">
                    {title}
                </h1>
                {subtitle && (
                    <p className="mx-auto mt-6 max-w-[48ch] text-[clamp(14px,1.2vw,17px)] leading-relaxed text-neutral-600">
                        {subtitle}
                    </p>
                )}
                <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                    <Link href={primary.href} className="group inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-8 py-3.5 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-neutral-800">
                        {primary.label} <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </motion.div>

            <style>{`@keyframes fin-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-12px) } }`}</style>
        </section>
    )
}
