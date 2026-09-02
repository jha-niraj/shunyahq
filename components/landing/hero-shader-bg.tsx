import { cn } from "@/lib/utils"
import { SHADER_PALETTES } from "./shader-palettes"

/**
 * The hero backdrop.
 *
 * ## Why this is CSS and no longer WebGL
 *
 * This used to mount a `@paper-design/shaders-react` `MeshGradient` - a full-bleed WebGL canvas
 * re-rendering roughly a million fragments per frame, on every page hero on the site. Stacked with
 * the Lenis RAF loop and several hundred framer-motion nodes it saturated the main thread: a
 * one-second `requestAnimationFrame` probe on /solutions never returned inside 45 seconds, and hero
 * headlines were measured still sitting at `opacity: 0` five seconds after mount.
 *
 * At this blur radius the four layered radials in `.so-mesh` are visually indistinguishable from
 * the shader, and they cost the compositor one paint plus an off-thread transform. The grain layer
 * is what keeps it from reading as a cheap CSS blur - it breaks the gradient banding the way the
 * shader's film grain did.
 *
 * The component is now a server component (no "use client", no hooks, no canvas), so hero
 * backdrops render in the initial HTML instead of waiting on hydration.
 *
 * The palette contract is unchanged: four colours, ordered base -> accent.
 */
export function ShaderHeroBg({
    colors,
    light = false,
    className,
}: {
    colors: readonly string[]
    /** true => add a soft wash so DARK text stays legible on a light palette. */
    light?: boolean
    /** Accepted for source compatibility with the old shader API; the CSS drift has one tempo. */
    speed?: number
    className?: string
}) {
    const [m1, m2, m3, m4] = colors

    return (
        <div aria-hidden className={cn("absolute inset-0 z-0 overflow-hidden", className)}>
            <div
                className="so-mesh"
                style={
                    {
                        "--m1": m1,
                        "--m2": m2,
                        "--m3": m3,
                        "--m4": m4,
                    } as React.CSSProperties
                }
            >
                <div className="so-mesh-grain" />
            </div>
            {light && (
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(110% 90% at 18% 30%, rgba(255,253,247,0.55) 0%, transparent 55%)",
                    }}
                />
            )}
        </div>
    )
}

/** Convenience wrapper for the flagship light hero. */
export function HeroShaderBg() {
    return <ShaderHeroBg colors={SHADER_PALETTES.daybreak} light />
}
