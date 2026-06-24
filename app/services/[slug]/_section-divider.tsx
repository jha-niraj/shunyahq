"use client"

import { motion, useReducedMotion } from "framer-motion"

/**
 * A slim, animated SVG divider used between content sections on the service
 * detail page so no two text blocks ever sit flush against each other. The line
 * draws itself in on scroll and a node pulses along it - decorative only.
 */
export function SectionDivider({ className = "" }: { className?: string }) {
    const reduced = useReducedMotion()
    return (
        <div className={"relative z-[1] bg-so-bg border-t border-so-line " + className} aria-hidden>
            <div className="so-container py-10 sm:py-14">
                <svg viewBox="0 0 1200 40" fill="none" className="w-full h-8 text-so-ink/30">
                    <motion.path
                        d="M0 20 H520 q20 0 30 -12 q10 -12 30 -12 h40 q20 0 30 12 q10 12 30 12 H1200"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, ease: "easeInOut" }}
                    />
                    <motion.circle
                        cx="600"
                        cy="8"
                        r="4"
                        fill="currentColor"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: reduced ? 1 : [0, 1.4, 1], opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
                    />
                    {[120, 360, 840, 1080].map((cx) => (
                        <motion.circle
                            key={cx}
                            cx={cx}
                            cy="20"
                            r="2.5"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.6 + cx / 4000 }}
                        />
                    ))}
                </svg>
            </div>
        </div>
    )
}
