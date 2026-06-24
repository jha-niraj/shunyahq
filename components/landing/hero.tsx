"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { HeroShaderBg } from "./hero-shader-bg"
import { CitationAnswer, ExamCard, VouchingScan, ReportDraft } from "./illustrations"

const ROTATE_WORDS = ["architect", "engineer", "accelerate", "scale"]

// Headline stats shown just above the marquee
const HERO_STATS = [
    { value: "150+", label: "Projects shipped" },
    { value: "50+", label: "Clients since 2019" },
    { value: "99%", label: "Client retention" },
    { value: "12", label: "Industries" },
    { value: "10+", label: "Products built" },
    { value: "20+", label: "Engineers" },
]


const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
}
const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

// One floating card: positioned, drifts away on scroll, gentle idle float.
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
    // As the hero scrolls out (0 -> 1) the card drifts outward and fades.
    const x = useTransform(progress, [0, 1], [0, fromX])
    const y = useTransform(progress, [0, 1], [0, fromY])
    const opacity = useTransform(progress, [0, 0.55], [1, 0])
    return (
        <motion.div
            style={{ x, y, opacity, rotate: `${rotate}deg` }}
            className={`pointer-events-none absolute z-[5] hidden lg:block ${className}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            <div style={{ animation: `hero-bob ${6 + delay}s ease-in-out ${delay}s infinite` }}>
                {children}
            </div>
        </motion.div>
    )
}

// Client logo marks for the hero "trusted by" marquee. Simple monochrome
// geometric glyphs (currentColor) so they read as a clean logo wall.
function ClientLogo({ name, className }: { name: string; className?: string }) {
    const c = className ?? "h-7 w-7"
    switch (name) {
        case "FinStream":
            return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9c3 0 3-3 6-3s3 3 6 3 3-3 6-3M3 15c3 0 3-3 6-3s3 3 6 3 3-3 6-3" /></svg>
        case "EduCore":
            return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M12 4 2 9l10 5 10-5-10-5Z" /><path d="M6 11v4c0 1.5 3 3 6 3s6-1.5 6-3v-4" /></svg>
        case "HealthPlus":
            return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="5" /><path d="M12 8v8M8 12h8" /></svg>
        case "LogiTech":
            return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="m3 7 9-4 9 4-9 4-9-4Z" /><path d="M3 7v10l9 4 9-4V7M12 11v10" /></svg>
        case "CreativeX":
            return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 5l14 14M19 5 5 19" /><circle cx="12" cy="12" r="9" /></svg>
        case "DataFlow":
            return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2"><circle cx="5" cy="6" r="2" /><circle cx="19" cy="6" r="2" /><circle cx="12" cy="18" r="2" /><path d="M7 6h10M6 8l5 8M18 8l-5 8" /></svg>
        case "AgileCorp":
            return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v4h-4" /></svg>
        case "SecureNet":
            return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M12 3 5 6v5c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg>
        default:
            return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /></svg>
    }
}

const HERO_CLIENTS = [
    "FinStream", "EduCore", "HealthPlus", "LogiTech",
    "CreativeX", "DataFlow", "AgileCorp", "SecureNet",
]

export function Hero() {
    const heroRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })

    const [wordIdx, setWordIdx] = useState(0)
    const [wordVis, setWordVis] = useState(true)

    useEffect(() => {
        const t = setInterval(() => {
            setWordVis(false)
            setTimeout(() => { setWordIdx(i => (i + 1) % ROTATE_WORDS.length); setWordVis(true) }, 260)
        }, 2600)
        return () => clearInterval(t)
    }, [])

    return (
        <section
            ref={heroRef}
            className="relative h-screen min-h-[640px] overflow-hidden bg-[#FBF8EF] flex flex-col"
            style={{ isolation: "isolate", fontFamily: "var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif" }}
        >
            {/* Animated champagne mesh-gradient - stays at the back. */}
            <HeroShaderBg />

            {/* Floating product cards - real Shunya capabilities. They drift off-screen on scroll. */}
            <FloatCard progress={scrollYProgress} className="left-[3%] top-[20%]" fromX={-120} fromY={-60} rotate={-6} delay={0.35}>
                <ExamCard className="w-[230px]" />
            </FloatCard>
            <FloatCard progress={scrollYProgress} className="left-[5%] top-[54%]" fromX={-140} fromY={40} rotate={5} delay={0.55}>
                <VouchingScan className="w-[230px]" />
            </FloatCard>
            <FloatCard progress={scrollYProgress} className="right-[3%] top-[22%]" fromX={130} fromY={-50} rotate={6} delay={0.45}>
                <CitationAnswer className="w-[220px]" />
            </FloatCard>
            <FloatCard progress={scrollYProgress} className="right-[4%] top-[52%]" fromX={150} fromY={50} rotate={-5} delay={0.65}>
                <ReportDraft className="w-[230px]" />
            </FloatCard>

            {/* Centered content - calm and confident */}
            <motion.div
                variants={container} initial="hidden" animate="show"
                className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-6"
            >
                <motion.div variants={item} className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-900/10 bg-white/55 px-4 py-1.5 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-[11px] font-medium uppercase tracking-widest text-neutral-600">We</span>
                    <span
                        className="min-w-[76px] text-left text-[11px] font-semibold uppercase tracking-widest text-neutral-900"
                        style={{ opacity: wordVis ? 1 : 0, filter: wordVis ? "blur(0)" : "blur(4px)", transition: "opacity 200ms, filter 200ms" }}
                    >
                        {ROTATE_WORDS[wordIdx]}
                    </span>
                </motion.div>

                <motion.h1 variants={item} className="text-[clamp(40px,7vw,88px)] font-bold leading-[1.02] tracking-[-2.5px] text-neutral-900">
                    We build the
                    <br />
                    <span className="text-neutral-900/45">future.</span>
                </motion.h1>

                <motion.p variants={item} className="mt-6 max-w-[54ch] text-[clamp(14px,1.15vw,17px)] leading-relaxed text-neutral-600">
                    We are builders who ship. From concept to production - we architect digital products that scale, perform, and actually get used.
                </motion.p>

                <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-3">
                    <Link href="/contactus" className="group inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-8 py-3.5 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-neutral-800">
                        Start a Project <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <Link href="/projects" className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-900/15 bg-white/55 px-8 py-3.5 text-[14px] font-medium text-neutral-700 backdrop-blur-sm transition-all hover:bg-white/75">
                        See Our Work <span className="text-neutral-400">→</span>
                    </Link>
                </motion.div>

                <motion.p variants={item} className="mt-5 text-[11px] text-neutral-500 tracking-wide">
                    Production systems, shipped · Trusted by 50+ teams
                </motion.p>
            </motion.div>

            {/* Headline stats */}
            <div className="relative z-10 shrink-0 px-6">
                <div className="mx-auto grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-neutral-900/10 bg-neutral-900/10 backdrop-blur-sm sm:grid-cols-3 lg:grid-cols-6">
                    {
                        HERO_STATS.map((s) => (
                            <div key={s.label} className="flex flex-col items-center gap-0.5 bg-white/55 px-4 py-4">
                                <span className="text-[26px] font-bold leading-none tracking-tight text-neutral-900">{s.value}</span>
                                <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-500 text-center">{s.label}</span>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Trusted-by logo marquee - bottom of the hero, below the stats */}
            <div className="relative z-10 shrink-0 pt-9 pb-7 overflow-hidden">
                <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{ background: "linear-gradient(to right, #FBF8EF 0%, transparent 160px, transparent calc(100% - 160px), #FBF8EF 100%)" }}
                />
                <div className="flex w-max gap-12" style={{ animation: "hero-logo-marquee 36s linear infinite" }}>
                    {
                        [...HERO_CLIENTS, ...HERO_CLIENTS].map((name, i) => (
                            <span key={i} className="shrink-0 inline-flex items-center gap-3 whitespace-nowrap text-neutral-500 transition-colors">
                                <ClientLogo name={name} className="h-8 w-8 shrink-0" />
                                <span className="text-[20px] font-semibold tracking-tight">{name}</span>
                            </span>
                        ))
                    }
                </div>
            </div>

            <style>{`
                @keyframes hero-logo-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
                @keyframes hero-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-12px) } }
            `}</style>
        </section>
    )
}
