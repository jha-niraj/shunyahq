import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"
import { ShaderHeroBg } from "./hero-shader-bg"
import { SHADER_PALETTES, type ShaderPalette } from "./shader-palettes"

interface PageBackgroundProps {
    className?: string
    style?: CSSProperties
}

/**
 * Page body backdrop. A near-flat surface with one faint warm bloom at the top, so the page reads
 * as paper rather than as a busy image.
 */
export function PageBackground({ className, style }: PageBackgroundProps) {
    return (
        <div
            aria-hidden
            className={cn("pointer-events-none absolute inset-0 bg-so-bg", className)}
            style={style}
        >
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(120% 70% at 50% -10%, var(--so-gold-softer) 0%, transparent 60%)",
                }}
            />
        </div>
    )
}

/**
 * The dark band behind a page hero.
 *
 * Each page passes a `palette` so every surface gets its own colourway, and the scrim resolves the
 * band into the cream page body so the seam reads as one continuous document rather than two
 * stacked blocks. See `hero-shader-bg.tsx` for why this is CSS rather than WebGL.
 */
export function PageHeaderBg({
    className,
    palette = "goldNoir",
    subtle = false,
}: {
    className?: string
    palette?: ShaderPalette
    /** A gentler wash, for bands that should whisper rather than shout. */
    subtle?: boolean
}) {
    return (
        <div aria-hidden className={cn("absolute inset-0 z-0 overflow-hidden", className)}>
            <ShaderHeroBg
                colors={SHADER_PALETTES[palette]}
                className={subtle ? "opacity-60" : undefined}
            />
            <div
                className="so-mesh-scrim"
                style={subtle ? { filter: "brightness(0.85)" } : undefined}
            />
        </div>
    )
}
