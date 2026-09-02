"use client"

import { useEffect, type ReactNode } from "react"

/**
 * The platform's shared motion language.
 *
 * ## Why this is CSS and an IntersectionObserver rather than framer-motion
 *
 * The previous version drove every reveal through framer's `whileInView`, which animates on the
 * main thread via requestAnimationFrame. On a page carrying a WebGL mesh-gradient canvas, a Lenis
 * RAF loop and several hundred motion nodes, RAF starved: reveals stalled part-way and headlines
 * sat at `opacity: 0` indefinitely. A measured render showed `<h1>` still at opacity 0 five seconds
 * after mount on /solutions. Content that never appears is worse than content that never animates.
 *
 * So the reveal is now a compositor-only CSS transition (opacity + translate), triggered by a class
 * the observer toggles. Three properties of this design matter:
 *
 *  1. **It cannot stall.** Once `.is-in` lands the transition runs off the main thread. A busy CPU
 *     delays the *start*, never the finish.
 *  2. **It fails open.** Elements are visible in the HTML by default. The hidden state is applied
 *     only under `html.rv` - a class an inline script in the document head sets before first paint.
 *     No JS, a thrown error, a crawler, Reader Mode: the content is simply there.
 *  3. **There is a hard failsafe.** If the observer never fires within 2.5s (throttled tab, layout
 *     thrash), everything reveals anyway. Nothing can be permanently invisible.
 *
 * The component API is unchanged, so the ~130 existing call sites did not have to move.
 */

/** Expo-out. Fast to leave, long to settle - the reason the motion reads as calm rather than springy. */
export const EASE = [0.16, 1, 0.3, 1] as const
export const EASE_CSS = "cubic-bezier(0.16, 1, 0.3, 1)"

type Direction = "up" | "down" | "left" | "right" | "none"

/**
 * Mounts the observer once for the whole document and keeps it in sync with client navigation.
 *
 * A single observer for every reveal on the page costs one callback per intersection; the old
 * approach paid a separate framer subscription, style recalculation and RAF tick per element.
 */
export function RevealProvider() {
    useEffect(() => {
        const REVEALED = "is-in"

        const reveal = (el: Element) => el.classList.add(REVEALED)

        // Elements already above the fold reveal on the next frame rather than through the
        // observer, so the first screen never waits on an intersection that already happened.
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (!e.isIntersecting) continue
                    reveal(e.target)
                    io.unobserve(e.target)
                }
            },
            { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
        )

        const scan = () => {
            for (const el of document.querySelectorAll(`[data-rv]:not(.${REVEALED})`)) {
                io.observe(el)
            }
        }

        scan()

        // Sections mounted later (client navigation, lazy sections, tab panels) are picked up here.
        const mo = new MutationObserver(scan)
        mo.observe(document.body, { childList: true, subtree: true })

        // Failsafe: whatever happens, nothing stays invisible.
        const failsafe = window.setTimeout(() => {
            document.documentElement.classList.remove("rv")
        }, 2500)

        return () => {
            io.disconnect()
            mo.disconnect()
            window.clearTimeout(failsafe)
        }
    }, [])

    return null
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
    /** Seconds. */
    duration?: number
    /**
     * Accepted for source compatibility with the previous framer-based API. The observer uses a
     * single shared root margin now, so per-element values are ignored deliberately - one trigger
     * line across the site is what makes the scroll read as one document.
     */
    margin?: string
    /** Render as a semantic element instead of a div. */
    as?: "div" | "span" | "li"
}

const axisVar = (direction: Direction, distance: number) => {
    switch (direction) {
        case "up":
            return { "--rv-x": "0px", "--rv-y": `${distance}px` }
        case "down":
            return { "--rv-x": "0px", "--rv-y": `${-distance}px` }
        case "left":
            return { "--rv-x": `${distance}px`, "--rv-y": "0px" }
        case "right":
            return { "--rv-x": `${-distance}px`, "--rv-y": "0px" }
        default:
            return { "--rv-x": "0px", "--rv-y": "0px" }
    }
}

/** The workhorse. Fades and rises a block as it scrolls into view. */
export function Reveal({
    children,
    delay = 0,
    className = "",
    direction = "up",
    distance = 24,
    duration = 0.65,
    as = "div",
}: RevealProps) {
    const Tag = as
    return (
        <Tag
            data-rv=""
            className={`so-anim ${className}`}
            style={
                {
                    ...axisVar(direction, distance),
                    "--rv-delay": `${delay}s`,
                    "--rv-duration": `${duration}s`,
                } as React.CSSProperties
            }
        >
            {children}
        </Tag>
    )
}

export function FadeIn({
    children,
    delay = 0,
    className = "",
}: {
    children: ReactNode
    delay?: number
    className?: string
}) {
    return (
        <Reveal delay={delay} className={className} distance={18} duration={0.6}>
            {children}
        </Reveal>
    )
}

export function SlideUp({
    children,
    delay = 0,
    className = "",
}: {
    children: ReactNode
    delay?: number
    className?: string
}) {
    return (
        <Reveal delay={delay} className={className} distance={28} duration={0.7}>
            {children}
        </Reveal>
    )
}

/**
 * Wraps a grid or list so its children arrive one after another rather than all at once.
 *
 * The cascade is pure CSS (`nth-child` delay steps in globals.css), so it costs nothing at runtime
 * and works whether the children are `StaggerItem`s or plain elements.
 */
export function StaggerContainer({
    children,
    className = "",
    stagger = 0.07,
    delay = 0,
    as = "div",
}: {
    children: ReactNode
    className?: string
    /** Gap between consecutive children, in seconds. */
    stagger?: number
    /** Seconds before the first child starts. */
    delay?: number
    margin?: string
    /** Render as a real list when the content is one - motion should not cost semantics. */
    as?: "div" | "ul" | "ol"
}) {
    const Tag = as
    return (
        <Tag
            data-rv=""
            data-rv-group=""
            className={`so-anim ${className}`}
            style={
                {
                    "--rv-step": `${stagger}s`,
                    "--rv-delay": `${delay}s`,
                } as React.CSSProperties
            }
        >
            {children}
        </Tag>
    )
}

/**
 * A child of `StaggerContainer`. Carries no trigger of its own - it inherits the container's
 * revealed state and takes its turn from its position in the cascade.
 */
export function StaggerItem({
    children,
    className = "",
    as = "div",
}: {
    children: ReactNode
    className?: string
    as?: "div" | "li"
}) {
    const Tag = as
    return (
        <Tag data-rv-item="" className={`so-anim ${className}`}>
            {children}
        </Tag>
    )
}

/**
 * Mount-time reveal for content that is already on screen when the page loads - page heroes,
 * article headers. Reveals on the first frame after hydration rather than waiting on an
 * intersection that has already happened.
 */
export function Entrance({
    children,
    delay = 0,
    className = "",
    distance = 18,
    duration = 0.7,
}: {
    children: ReactNode
    delay?: number
    className?: string
    distance?: number
    duration?: number
}) {
    return (
        <div
            data-rv=""
            data-rv-mount=""
            className={`so-anim ${className}`}
            style={
                {
                    "--rv-x": "0px",
                    "--rv-y": `${distance}px`,
                    "--rv-delay": `${delay}s`,
                    "--rv-duration": `${duration}s`,
                } as React.CSSProperties
            }
        >
            {children}
        </div>
    )
}
