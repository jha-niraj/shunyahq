"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { ShaderHeroBg } from "./hero-shader-bg"
import { SHADER_PALETTES, type ShaderPalette } from "./shader-palettes"
import { QuoteCard } from "./illustrations"

type FloatingQuote = {
    name: string
    role: string
    quote: string
    className: string
    rotate: number
    fromX: number
    fromY: number
    delay: number
}

const QUOTES: FloatingQuote[] = [
    { name: "Manu Arora", role: "CA, Kathmandu", quote: "Cites the exact section every time. I stopped second-guessing TDS rates.", className: "left-[4%] top-[16%]", rotate: -8, fromX: -160, fromY: -80, delay: 0.3 },
    { name: "Sita Pradhan", role: "Audit Partner", quote: "Vouching that used to take a day now flags disallowed bills in minutes.", className: "left-[6%] top-[58%]", rotate: 6, fromX: -180, fromY: 70, delay: 0.5 },
    { name: "Alok Sharma", role: "Tax Consultant", quote: "It answers like a senior colleague - with the law and court rulings attached.", className: "right-[4%] top-[18%]", rotate: 7, fromX: 170, fromY: -70, delay: 0.4 },
    { name: "Cathy Lee", role: "CFO, FMCG", quote: "Audit-ready answers with primary citations. Our compliance reviews got faster.", className: "right-[5%] top-[56%]", rotate: -6, fromX: 190, fromY: 80, delay: 0.6 },
]

function ScatterCard({ q, progress }: { q: FloatingQuote; progress: MotionValue<number> }) {
    const x = useTransform(progress, [0, 1], [0, q.fromX])
    const y = useTransform(progress, [0, 1], [0, q.fromY])
    const opacity = useTransform(progress, [0, 0.6], [1, 0])
    return (
        <motion.div
            style={{ x, y, opacity, rotate: `${q.rotate}deg` }}
            className={`pointer-events-none absolute z-[5] hidden lg:block ${q.className}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: q.delay, ease: [0.22, 1, 0.36, 1] }}
        >
            <QuoteCard name={q.name} role={q.role} quote={q.quote} />
        </motion.div>
    )
}

export function HeroTestimonials({
    eyebrow = "Trusted by Nepal's CAs and auditors",
    title,
    subtitle,
    palette = "platinum",
    primary = { label: "Start free", href: "/signup" },
    secondary = { label: "Browse consultants", href: "/consultants" },
}: {
    eyebrow?: string
    title: React.ReactNode
    subtitle?: string
    palette?: ShaderPalette
    primary?: { label: string; href: string }
    secondary?: { label: string; href: string }
}) {
    const ref = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })

    return (
        <section
            ref={ref}
            className="dark relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-[#0a0a0c] px-6"
            style={{ isolation: "isolate" }}
        >
            <ShaderHeroBg colors={SHADER_PALETTES[palette]} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

            {QUOTES.map((q) => (
                <ScatterCard key={q.name} q={q} progress={scrollYProgress} />
            ))}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 max-w-2xl text-center"
            >
                {eyebrow && (
                    <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest text-white/70">
                        {eyebrow}
                    </span>
                )}
                <h1 className="text-[clamp(36px,6vw,72px)] font-bold leading-[1.03] tracking-[-2px] text-white">
                    {title}
                </h1>
                {subtitle && (
                    <p className="mx-auto mt-6 max-w-[48ch] text-[clamp(14px,1.2vw,17px)] leading-relaxed text-white/55">
                        {subtitle}
                    </p>
                )}
                <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                    <Link href={primary.href} className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-[14px] font-semibold text-neutral-900 transition-all hover:-translate-y-0.5 hover:bg-white/90">
                        {primary.label}
                    </Link>
                    <Link href={secondary.href} className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 text-[14px] font-medium text-white/80 backdrop-blur-sm transition-all hover:bg-white/10">
                        {secondary.label} <span className="text-white/40">→</span>
                    </Link>
                </div>
            </motion.div>
        </section>
    )
}
