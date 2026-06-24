"use client"

import { useEffect, useRef, useState } from "react"
import { MeshGradient } from "@paper-design/shaders-react"
import { useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { SHADER_PALETTES } from "./shader-palettes"

// ── Performance cap ───────────────────────────────────────────────────────────
// A full-screen WebGL canvas at device-pixel-ratio renders millions of fragments
// per frame. These are soft, blurry gradients, so ~720p of pixels is visually
// indistinguishable from 4K but costs a fraction. maxPixelCount is the hard cap
// on total rendered pixels (after DPR); minPixelRatio floors the DPR.
const MAX_PIXELS = 1280 * 720

export function ShaderHeroBg({
    colors,
    light = false, // true => add a soft wash so DARK text stays legible on a light palette
    speed = 1,
    className,
}: {
    colors: readonly string[]
    light?: boolean
    speed?: number
    className?: string
}) {
    const reduced = useReducedMotion()
    const ref = useRef<HTMLDivElement>(null)
    // Gate the WebGL canvas on visibility: it mounts just before it scrolls into
    // view and unmounts once well past, so off-screen shaders cost zero GPU/CPU.
    const [active, setActive] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        if (typeof IntersectionObserver === "undefined") {
            setActive(true)
            return
        }
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) setActive(e.isIntersecting)
            },
            { rootMargin: "300px 0px" }, // mount slightly before entering, unmount after leaving
        )
        io.observe(el)
        return () => io.disconnect()
    }, [])

    return (
        <div
            ref={ref}
            aria-hidden
            className={cn("absolute inset-0 z-0 overflow-hidden", className)}
            style={{ background: colors[0] }} // (A) instant base color = no flash / SSR-safe
        >
            {active && (
                <MeshGradient
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} // (B) fill the parent
                    colors={colors as string[]}
                    distortion={0.8}
                    swirl={0.8}
                    grainMixer={0.35} // film grain is the most expensive knob - keep it light
                    grainOverlay={0}
                    speed={reduced ? 0 : speed} // (C) reduced-motion => frozen still gradient
                    scale={1.15}
                    rotation={0}
                    offsetX={-0.14}
                    offsetY={-0.13}
                    minPixelRatio={1} // (D) floor DPR at 1
                    maxPixelCount={MAX_PIXELS} // (E) hard cap total rendered pixels
                />
            )}
            {
                light && (
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(110% 90% at 18% 30%, rgba(255,253,247,0.55) 0%, transparent 55%)",
                        }}
                    />
                )
            }
        </div>
    )
}

// Convenience wrapper for the flagship light hero - warm champagne blended with
// a soft sky-blue so the mesh reads as a bright daybreak, not just gold.
export function HeroShaderBg() {
    return <ShaderHeroBg colors={SHADER_PALETTES.daybreak} light />
}
