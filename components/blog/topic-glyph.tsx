"use client"

import { motion } from "framer-motion"
import type { BlogCategory } from "@/content/blog"

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * One drawn glyph per blog topic.
 *
 * These exist to make the taxonomy legible at a glance - six hubs that are hard to tell apart from
 * their labels alone become six distinct shapes. Each animates by drawing itself rather than fading
 * in, so the motion shows what the topic IS: a scale weighing up, a path being walked, two columns
 * being compared, layers stacking, a spark radiating, a branch merging.
 *
 * `currentColor` throughout, so a glyph inherits whatever the surrounding text colour is and works
 * in both themes without a second palette.
 */

const draw = (delay = 0, duration = 0.9) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, amount: 0.6 },
    transition: { duration, delay, ease: EASE },
})

const pop = (delay = 0) => ({
    initial: { scale: 0, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    viewport: { once: true, amount: 0.6 },
    transition: { duration: 0.35, delay, ease: EASE },
})

function BuyingGuide() {
    // A balance: the buying decision, weighed.
    return (
        <>
            <motion.line x1="24" y1="10" x2="24" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...draw(0, 0.6)} />
            <motion.line x1="10" y1="17" x2="38" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...draw(0.2, 0.6)} />
            <motion.path d="M10 17 L5 28 A6 6 0 0 0 15 28 Z" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round" {...draw(0.45)} />
            <motion.path d="M38 17 L33 26 A5 5 0 0 0 43 26 Z" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round" {...draw(0.6)} />
            <motion.circle cx="24" cy="38" r="2.5" fill="currentColor" {...pop(0.85)} style={{ transformOrigin: "24px 38px" }} />
        </>
    )
}

function Guides() {
    // A route with a marker travelling it: a project, sequenced.
    return (
        <>
            <motion.path
                d="M8 34 C 16 34, 16 14, 24 14 C 32 14, 32 34, 40 34"
                stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="4 4"
                {...draw(0, 1.1)}
            />
            {[8, 24, 40].map((x, i) => (
                <motion.circle
                    key={x} cx={x} cy={i === 1 ? 14 : 34} r="3.2"
                    fill="currentColor" {...pop(0.5 + i * 0.15)}
                    style={{ transformOrigin: `${x}px ${i === 1 ? 14 : 34}px` }}
                />
            ))}
        </>
    )
}

function Comparisons() {
    // Two columns measured against each other.
    return (
        <>
            <motion.rect x="10" y="20" width="11" height="18" rx="2.5" stroke="currentColor" strokeWidth="2" fill="none" {...draw(0, 0.7)} />
            <motion.rect x="27" y="11" width="11" height="27" rx="2.5" stroke="currentColor" strokeWidth="2" fill="none" {...draw(0.25, 0.7)} />
            <motion.line x1="6" y1="41" x2="42" y2="41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...draw(0.5, 0.5)} />
            <motion.circle cx="32.5" cy="7" r="2.2" fill="currentColor" {...pop(0.8)} style={{ transformOrigin: "32.5px 7px" }} />
        </>
    )
}

function CaseStudies() {
    // Layers stacking: something built, tier by tier.
    return (
        <>
            {[30, 22, 14].map((y, i) => (
                <motion.path
                    key={y}
                    d={`M24 ${y - 6} L38 ${y} L24 ${y + 6} L10 ${y} Z`}
                    stroke="currentColor" strokeWidth="1.9" fill="none" strokeLinejoin="round"
                    {...draw(i * 0.22, 0.7)}
                />
            ))}
        </>
    )
}

function Insights() {
    // A spark radiating: the perspective piece.
    return (
        <>
            <motion.circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2" fill="none" {...draw(0, 0.6)} />
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <motion.line
                    key={deg}
                    x1="24" y1="13" x2="24" y2="8"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    transform={`rotate(${deg} 24 24)`}
                    {...draw(0.35 + i * 0.07, 0.4)}
                />
            ))}
        </>
    )
}

function Engineering() {
    // A branch diverging and merging: the technical corner.
    return (
        <>
            <motion.line x1="12" y1="8" x2="12" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...draw(0, 0.7)} />
            <motion.path
                d="M12 18 C 12 26, 34 22, 34 30"
                stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" {...draw(0.3, 0.7)}
            />
            {[[12, 8], [12, 40], [34, 30]].map(([x, y], i) => (
                <motion.circle
                    key={i} cx={x} cy={y} r="3.4" fill="var(--so-bg)" stroke="currentColor" strokeWidth="2"
                    {...pop(0.55 + i * 0.12)} style={{ transformOrigin: `${x}px ${y}px` }}
                />
            ))}
        </>
    )
}

const GLYPHS: Record<BlogCategory, () => React.ReactElement> = {
    "buying-guide": BuyingGuide,
    guides: Guides,
    comparisons: Comparisons,
    "case-studies": CaseStudies,
    insights: Insights,
    engineering: Engineering,
}

export function TopicGlyph({ topic, className }: { topic: BlogCategory; className?: string }) {
    const Glyph = GLYPHS[topic] ?? Guides
    return (
        <svg viewBox="0 0 48 48" className={className ?? "h-8 w-8"} fill="none" aria-hidden>
            <Glyph />
        </svg>
    )
}
