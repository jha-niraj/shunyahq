"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { PageHeaderBg } from "./page-background"
import { EASE } from "./animations"
import type { ShaderPalette } from "./shader-palettes"

interface PageHeroProps {
    eyebrow?: string
    title: ReactNode
    description?: string
    right?: ReactNode
    minHeight?: string
    palette?: ShaderPalette
}

/**
 * The shared hero band for every public page.
 *
 * The entrance is a mount animation rather than a scroll reveal - this content is above the fold on
 * arrival, so waiting on an intersection would mean waiting on something that already happened. The
 * eyebrow, headline, lede and right-hand slot come in on a short ladder so the eye is walked down
 * the hero in reading order rather than having the whole band appear at once. Route changes remount
 * this, so navigating between pages replays it.
 */
export function PageHero({
    eyebrow,
    title,
    description,
    right,
    minHeight = "clamp(440px, 50vh, 620px)",
    palette = "goldNoir",
}: PageHeroProps) {
    const reduced = useReducedMotion()

    // One ladder shared by every element in the hero, so the rhythm is identical on every page.
    const step = (delay: number) => ({
        initial: { opacity: 0, y: reduced ? 0 : 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: reduced ? 0.25 : 0.7, delay: reduced ? 0 : delay, ease: EASE },
    })

    return (
        <section
            className="dark"
            style={{
                position: "relative",
                overflow: "hidden",
                background: "#0a0a0a",
                isolation: "isolate",
                minHeight,
                display: "flex",
                alignItems: "flex-end",
                paddingBottom: "clamp(40px, 5vw, 64px)",
            }}
        >
            <PageHeaderBg palette={palette} />
            <div
                className="so-container"
                style={{
                    position: "relative",
                    zIndex: 2,
                    paddingTop: "clamp(100px, 13vw, 150px)",
                    width: "100%",
                }}
            >
                <div className={right ? "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center" : ""}>
                    <div>
                        {
                            eyebrow && (
                                <motion.span
                                    className="so-anim so-eyebrow"
                                    style={{
                                        display: "inline-block",
                                        color: "rgba(201,169,97,0.8)",
                                        borderColor: "rgba(201,169,97,0.2)",
                                        background: "rgba(201,169,97,0.06)",
                                    }}
                                    {...step(0)}
                                >
                                    {eyebrow}
                                </motion.span>
                            )
                        }
                        {/* An <h1>, not a styled <div>. Every page built on this hero - services,
                            projects, solutions, blog hubs, legal - was shipping with zero h1
                            elements, which is the single strongest on-page relevance signal. */}
                        <motion.h1
                            className="so-anim mt-5"
                            style={{
                                fontSize: "clamp(34px, 5vw, 58px)",
                                lineHeight: 1.02,
                                fontWeight: 650,
                                letterSpacing: "-0.028em",
                                color: "#F5EFE0",
                            }}
                            {...step(0.08)}
                        >
                            {title}
                        </motion.h1>
                        {
                            description && (
                                <motion.p
                                    className="so-anim"
                                    style={{
                                        fontSize: "clamp(15px, 1.3vw, 17px)",
                                        lineHeight: 1.65,
                                        color: "rgba(245,239,224,0.55)",
                                        marginTop: 18,
                                        maxWidth: "50ch",
                                    }}
                                    {...step(0.16)}
                                >
                                    {description}
                                </motion.p>
                            )
                        }
                    </div>
                    {
                        right && (
                            <motion.div
                                className="so-anim"
                                initial={{ opacity: 0, y: reduced ? 0 : 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: reduced ? 0.25 : 0.8, delay: reduced ? 0 : 0.24, ease: EASE }}
                            >
                                {right}
                            </motion.div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}
