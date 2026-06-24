"use client"

import { motion } from "framer-motion"

const TECH_TERMS = [
    "Next.js 15", "React Server Components", "TypeScript", "Node.js",
    "AWS", "Kubernetes", "Docker", "Terraform",
    "AI Integration", "RAG Pipelines", "CI/CD", "Design Systems",
    "Prisma", "tRPC", "PostgreSQL", "React Native",
    "Serverless", "Microservices", "OAuth 2.0", "WebSockets",
]

function Marquee({ reverse = false }: { reverse?: boolean }) {
    const doubled = [...TECH_TERMS, ...TECH_TERMS]
    return (
        <div className="overflow-hidden">
            <div className="flex gap-3 w-max" style={{ animation: `st-marquee${reverse ? "-r" : ""} 55s linear infinite` }}>
                {
                    doubled.map((name, i) => (
                        <span key={i} className="shrink-0 rounded-full border border-neutral-200/70 dark:border-neutral-700/60 bg-white/50 dark:bg-neutral-900/50 px-4 py-1.5 text-[12.5px] font-medium text-neutral-500 dark:text-neutral-400 backdrop-blur-sm whitespace-nowrap">
                            {name}
                        </span>
                    ))
                }
            </div>
        </div>
    )
}

const POINTS = [
    {
        n: "01",
        title: "Prototypes that never ship",
        body: "Most agencies hand off a Figma deck and call it done. We ship production systems people actually use - every project we take goes live, not a mockup, not a slide.",
        svg: (
            <svg viewBox="0 0 280 140" fill="none" className="w-full">
                <style>{`.pe1{animation:pe-in 0.5s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.1s}.pe2{animation:pe-in 0.5s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.4s}.pe3{animation:pe-in 0.5s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.7s}@keyframes pe-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>
                <g className="pe1">
                    <rect x="8" y="10" width="124" height="58" rx="8" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
                    <text x="16" y="26" fontSize="8" fill="currentColor" fillOpacity="0.4" fontFamily="monospace">Figma deck (static)</text>
                    <text x="16" y="44" fontSize="10" fill="#c2553f" fillOpacity="0.7" fontFamily="monospace">mockup.fig</text>
                    <text x="16" y="58" fontSize="10" fill="#c2553f" fillOpacity="0.7" fontFamily="monospace">never deployed...</text>
                </g>
                <g className="pe2">
                    <text x="148" y="44" fontSize="18" textAnchor="middle" fill="currentColor" fillOpacity="0.25">→</text>
                </g>
                <g className="pe3">
                    <rect x="164" y="10" width="108" height="58" rx="8" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
                    <text x="172" y="26" fontSize="8" fill="currentColor" fillOpacity="0.4" fontFamily="monospace">Shunya in production</text>
                    <text x="172" y="42" fontSize="9" fill="currentColor" fillOpacity="0.7" fontFamily="system-ui">app.live ✓ 200 OK</text>
                    <text x="172" y="58" fontSize="9" fill="currentColor" fillOpacity="0.5" fontFamily="system-ui">Uptime: 99.9%</text>
                </g>
                <text x="8" y="96" fontSize="10" fill="currentColor" fillOpacity="0.3" fontFamily="monospace">Concept to production -</text>
                <text x="8" y="110" fontSize="10" fill="currentColor" fillOpacity="0.3" fontFamily="monospace">software that actually gets used</text>
            </svg>
        ),
    },
    {
        n: "02",
        title: "Handoff hell",
        body: "Fragmented teams point fingers when something breaks. One team owns everything - frontend, backend, infra, and deployment. No handoffs, no blame, one accountable group from kickoff to launch.",
        svg: (
            <svg viewBox="0 0 280 140" fill="none" className="w-full">
                <style>{`.fa1{animation:fa-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.1s}.fa2{animation:fa-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.3s}.fa3{animation:fa-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.5s}.fa4{animation:fa-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.7s}.fa5{animation:fa-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.9s}@keyframes fa-in{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}`}</style>
                {
                    [
                        { y: 14, label: "Frontend", note: "owned" },
                        { y: 38, label: "Backend", note: "owned" },
                        { y: 62, label: "Infrastructure", note: "owned" },
                        { y: 86, label: "Deployment", note: "owned" },
                        { y: 110, label: "One accountable team", note: "no handoffs ✓", highlight: true },
                    ].map((row, i) => (
                        <g key={i} className={`fa${i + 1}`}>
                            <rect x="8" y={row.y} width="8" height="18" rx="2" fill="currentColor" fillOpacity={row.highlight ? 0.7 : 0.15} />
                            <text x="24" y={row.y + 12} fontSize="9.5" fill="currentColor" fillOpacity={row.highlight ? 0.9 : 0.5} fontFamily="monospace">{row.label}</text>
                            <text x="160" y={row.y + 12} fontSize="9.5" fill="currentColor" fillOpacity={row.highlight ? 0.9 : 0.35} fontFamily="system-ui">{row.note}</text>
                        </g>
                    ))
                }
            </svg>
        ),
    },
    {
        n: "03",
        title: "Slow, brittle stacks",
        body: "Legacy monoliths slow you down and rack up technical debt you pay for later. Modern stacks - Next.js, tRPC, Prisma - let us move fast without cutting corners or compromising on quality.",
        svg: (
            <svg viewBox="0 0 280 140" fill="none" className="w-full">
                <style>{`.ca1{animation:ca-pop 0.4s cubic-bezier(0.22,1,0.36,1) both;animation-play-state:var(--anim-play,paused)}.ca2{animation:ca-pop 0.4s cubic-bezier(0.22,1,0.36,1) both;animation-play-state:var(--anim-play,paused);animation-delay:0.15s}.ca3{animation:ca-pop 0.4s cubic-bezier(0.22,1,0.36,1) both;animation-play-state:var(--anim-play,paused);animation-delay:0.3s}.ca4{animation:ca-pop 0.4s cubic-bezier(0.22,1,0.36,1) both;animation-play-state:var(--anim-play,paused);animation-delay:0.45s}.ca5{animation:ca-pop 0.4s cubic-bezier(0.22,1,0.36,1) both;animation-play-state:var(--anim-play,paused);animation-delay:0.6s}.ca6{animation:ca-pop 0.4s cubic-bezier(0.22,1,0.36,1) both;animation-play-state:var(--anim-play,paused);animation-delay:0.75s}@keyframes ca-pop{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}`}</style>
                {
                    [
                        { x: 30, y: 28, label: "Next.js", cls: "ca1" },
                        { x: 100, y: 18, label: "tRPC", cls: "ca2" },
                        { x: 175, y: 28, label: "Prisma", cls: "ca3" },
                        { x: 240, y: 18, label: "AWS", cls: "ca4" },
                        { x: 55, y: 80, label: "Docker", cls: "ca5" },
                        { x: 155, y: 80, label: "CI/CD", cls: "ca6" },
                    ].map(({ x, y, label, cls }) => (
                        <g key={label} className={cls}>
                            <rect x={x - 24} y={y} width="56" height="22" rx="6" fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeOpacity="0.2" strokeWidth="0.8" />
                            <text x={x + 4} y={y + 14} textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity="0.5" fontFamily="system-ui">{label}</text>
                        </g>
                    ))
                }
                <text x="140" y="125" textAnchor="middle" fontSize="10" fill="currentColor" fillOpacity="0.3" fontFamily="monospace">Modern stacks - fast, with zero debt</text>
            </svg>
        ),
    },
]

const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0 },
}

export function StatsTicker() {
    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            <style>{`
                @keyframes st-marquee   { from { transform: translateX(0) }    to { transform: translateX(-50%) } }
                @keyframes st-marquee-r { from { transform: translateX(-50%) } to { transform: translateX(0) }    }
            `}</style>

            <div className="mx-auto max-w-6xl px-6">
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    transition={{ staggerChildren: 0.1 }}
                    className="mb-16 text-center"
                >
                    <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
                        className="text-[11px] font-mono font-semibold uppercase tracking-[0.22em] text-neutral-400 dark:text-neutral-500 mb-4">
                        Why it matters
                    </motion.p>
                    <motion.h2 variants={fadeUp} transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
                        Most agency engagements{" "}
                        <span className="text-neutral-400 dark:text-neutral-500">fall apart.</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
                        className="mt-3 text-[15px] text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto">
                        Three structural problems that stall product teams every single day - and exactly what Shunya does differently.
                    </motion.p>
                </motion.div>
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    transition={{ staggerChildren: 0.13 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14"
                >
                    {
                        POINTS.map((p) => (
                            <motion.div
                                key={p.n}
                                variants={fadeUp}
                                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-sm p-7 flex flex-col text-neutral-900 dark:text-white"
                                onMouseEnter={(e) => (e.currentTarget as HTMLDivElement).style.setProperty("--anim-play", "running")}
                            >
                                <span className="font-mono text-[11px] font-semibold tracking-[0.16em] text-neutral-400 dark:text-neutral-600 mb-4">{p.n}</span>
                                <div className="mb-5 opacity-80">{p.svg}</div>
                                <h3 className="text-[17px] font-bold mb-2 leading-snug">{p.title}</h3>
                                <p className="text-[13.5px] text-neutral-500 dark:text-neutral-400 leading-relaxed">{p.body}</p>
                            </motion.div>
                        ))
                    }
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-3 overflow-hidden relative"
                >
                    <div aria-hidden className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
                        style={{ background: "linear-gradient(to right, var(--tw-gradient-from, white), transparent)" }} />
                    <div aria-hidden className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
                        style={{ background: "linear-gradient(to left, var(--tw-gradient-from, white), transparent)" }} />
                    <Marquee />
                    <Marquee reverse />
                </motion.div>
            </div>
        </section>
    )
}