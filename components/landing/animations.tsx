"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import { ReactNode } from "react"

/**
 * The platform's shared motion language.
 *
 * Every public page reveals the same way: content rises a short distance and fades as it enters the
 * viewport, once, never replaying on scroll-back. One curve and one distance across the whole site
 * is the point - three different easings on three different pages reads as three different products.
 *
 * Every primitive here honours prefers-reduced-motion. When it is set the transform is dropped and
 * only a short fade remains, so the page still resolves rather than snapping, but nothing travels.
 */

// Expo-out. Fast to leave, long to settle - the reason the motion reads as calm rather than springy.
export const EASE = [0.16, 1, 0.3, 1] as const

type Direction = "up" | "down" | "left" | "right" | "none"

const AXIS: Record<Direction, { axis: "x" | "y"; sign: 1 | -1 } | null> = {
    up: { axis: "y", sign: 1 },
    down: { axis: "y", sign: -1 },
    left: { axis: "x", sign: 1 },
    right: { axis: "x", sign: -1 },
    none: null,
}

interface RevealProps {
    children: ReactNode
    /** Seconds to wait before this element starts. */
    delay?: number
    className?: string
    /** Where the element travels from. Defaults to rising from below. */
    direction?: Direction
    /** Travel distance in px. */
    distance?: number
    duration?: number
    /** Viewport root margin - how far up the fold the trigger sits. */
    margin?: string
}

/**
 * The workhorse. Fades and rises a block as it scrolls into view.
 *
 * `FadeIn` and `SlideUp` are thin wrappers kept so pages that already use them do not have to
 * change; new work should reach for `Reveal` directly.
 */
export function Reveal({
    children,
    delay = 0,
    className = "",
    direction = "up",
    distance = 24,
    duration = 0.65,
    margin = "-60px",
}: RevealProps) {
    const reduced = useReducedMotion()

    const axis = reduced ? null : AXIS[direction]
    const initial = axis
        ? { opacity: 0, [axis.axis]: axis.sign * distance }
        : { opacity: 0 }
    const target = axis ? { opacity: 1, [axis.axis]: 0 } : { opacity: 1 }

    return (
        <motion.div
            initial={initial}
            whileInView={target}
            viewport={{ once: true, margin }}
            transition={{ duration: reduced ? 0.25 : duration, delay: reduced ? 0 : delay, ease: EASE }}
            className={`so-anim ${className}`}
        >
            {children}
        </motion.div>
    )
}

export function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
    return (
        <Reveal delay={delay} className={className} distance={20} duration={0.6}>
            {children}
        </Reveal>
    )
}

export function SlideUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
    return (
        <Reveal delay={delay} className={className} distance={30} duration={0.7} margin="-80px">
            {children}
        </Reveal>
    )
}

/**
 * Wraps a grid or list so its children arrive one after another rather than all at once. Pair with
 * `StaggerItem` on each child - a plain element inside simply appears, since it has no variants to
 * inherit.
 */
export function StaggerContainer({
    children,
    className = "",
    /** Gap between consecutive children, in seconds. */
    stagger = 0.08,
    /** Seconds before the first child starts. */
    delay = 0,
    margin = "-60px",
    /** Render as a real list when the content is one - motion should not cost semantics. */
    as = "div",
}: {
    children: ReactNode
    className?: string
    stagger?: number
    delay?: number
    margin?: string
    as?: "div" | "ul" | "ol"
}) {
    const reduced = useReducedMotion()
    const Tag = as === "ul" ? motion.ul : as === "ol" ? motion.ol : motion.div

    return (
        <Tag
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: reduced ? 0 : stagger,
                        delayChildren: reduced ? 0 : delay,
                    },
                },
            }}
            className={`so-anim ${className}`}
        >
            {children}
        </Tag>
    )
}

export function StaggerItem({
    children,
    className = "",
    as = "div",
}: {
    children: ReactNode
    className?: string
    as?: "div" | "li"
}) {
    const reduced = useReducedMotion()
    const Tag = as === "li" ? motion.li : motion.div

    const variants: Variants = reduced
        ? {
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.25 } },
          }
        : {
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
          }

    return (
        <Tag variants={variants} className={`so-anim ${className}`}>
            {children}
        </Tag>
    )
}

/**
 * Mount-time reveal for content that is already on screen when the page loads - page heroes, article
 * headers. Uses `animate` rather than `whileInView` so it never waits on an intersection that has
 * already happened by the time the JS runs.
 */
export function Entrance({
    children,
    delay = 0,
    className = "",
    distance = 20,
    duration = 0.7,
}: {
    children: ReactNode
    delay?: number
    className?: string
    distance?: number
    duration?: number
}) {
    const reduced = useReducedMotion()

    return (
        <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : distance }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0.25 : duration, delay: reduced ? 0 : delay, ease: EASE }}
            className={`so-anim ${className}`}
        >
            {children}
        </motion.div>
    )
}
