// Shader palette data lives in this PLAIN module (no "use client") on purpose.
// `hero-shader-bg.tsx` is a client component, and a server component that imports
// a data export from a client module receives a client-reference proxy, not the
// real object - so `SHADER_PALETTES.rose` would resolve to `undefined` during
// prerender and crash on `colors[0]`. Keeping the data here lets both server and
// client components import the real values.
//
// Each palette is 4 colors ordered light -> dark (light palettes) or
// near-black base -> bright accent (dark palettes).
export const SHADER_PALETTES = {
    // Light (flagship hero) - dark text on top
    champagne: ["#FBF8EF", "#EDE8D0", "#E4D4A6", "#C29B47"],
    // Light, warm cream blended with soft sky-blue - flagship hero
    daybreak: ["#FBF8EF", "#E7EFF8", "#E4D4A6", "#A7C8E6"],
    // Light mint (fintech hero) - dark text on top
    mint: ["#F2FBF6", "#DCF3E6", "#B3E6C8", "#5FB98A"],
    // Light sky (cool, airy) - dark text on top
    sky: ["#F4F8FE", "#E1ECF8", "#BFD8F0", "#6FA8DC"],
    // Dark palettes - white text on top, near-black base + bright accent
    emerald: ["#06100c", "#0a1f17", "#136046", "#34b481"],
    rose: ["#120a0d", "#251018", "#7e2a44", "#cf6587"],
    platinum: ["#0a0a0c", "#15151a", "#33333d", "#8a8a96"],
    goldNoir: ["#0a0a0a", "#161510", "#b89a4a", "#e8d39a"],
    jade: ["#04100e", "#08201d", "#0f5e52", "#2fc7a8"],
    crimson: ["#0d0707", "#1f0d0d", "#7a1f25", "#e0555b"],
    amber: ["#100b04", "#1f1608", "#9a6a18", "#f0b54a"],
    coral: ["#120a08", "#241310", "#8a3a28", "#f08a6a"],
    sage: ["#0a0e0a", "#161d14", "#3f5a36", "#8fbf72"],
    slate: ["#08090a", "#13161a", "#2c3742", "#6f8190"],
    olive: ["#0c0d05", "#1a1c0a", "#5c5e1f", "#b8bd4a"],
    // Dark sky/blue accent - white text on top
    azure: ["#070b12", "#0d1626", "#1f3f6e", "#5b9bd5"],
} as const

export type ShaderPalette = keyof typeof SHADER_PALETTES
