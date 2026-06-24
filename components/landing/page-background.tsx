import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"
import { ShaderHeroBg } from "./hero-shader-bg"
import { SHADER_PALETTES, type ShaderPalette } from "./shader-palettes"

interface PageBackgroundProps {
    className?: string
    style?: CSSProperties
}

// Clean, professional page backdrop for public/marketing pages. The old
// featurestackbg photo was removed - instead we use a subtle neutral wash plus a
// faint top glow so pages read as crisp light/dark surfaces, not a busy image.
export function PageBackground({ className, style }: PageBackgroundProps) {
    return (
        <div
            aria-hidden
            className={cn(
                "pointer-events-none absolute inset-0 bg-white dark:bg-neutral-950",
                className,
            )}
            style={style}
        >
            <div
                className="absolute inset-0 opacity-[0.5] dark:opacity-[0.6]"
                style={{
                    background:
                        "radial-gradient(120% 80% at 50% -10%, rgba(201,169,97,0.06) 0%, transparent 55%)",
                }}
            />
        </div>
    )
}

// Animated mesh-gradient background for dark header bands (page hero strips).
// Each page passes a unique `palette` so every surface gets its own colour. A
// soft scrim keeps white header text legible and fades into the neutral-950 page
// body. Use this in place of a flat black/dark header background.
export function PageHeaderBg({
    className,
    palette = "goldNoir",
    subtle = false,
}: {
    className?: string
    palette?: ShaderPalette
    // subtle => a much gentler, lighter shader wash (used where the band should
    // whisper rather than shout, e.g. the consultants pages).
    subtle?: boolean
}) {
    return (
        <div aria-hidden className={cn("absolute inset-0 z-0 overflow-hidden", className)}>
            <ShaderHeroBg
                colors={SHADER_PALETTES[palette]}
                speed={subtle ? 0.5 : 1}
                className={subtle ? "opacity-50" : undefined}
            />
            {/* Soft scrim - keeps white header text readable while the shader shows through */}
            <div
                className={cn(
                    "absolute inset-0 bg-gradient-to-b",
                    subtle
                        ? "from-black/65 via-black/60 to-neutral-950"
                        : "from-black/45 via-black/35 to-neutral-950",
                )}
            />
        </div>
    )
}
