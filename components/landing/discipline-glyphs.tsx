/**
 * Animated glyphs for the six disciplines on the service page.
 *
 * ## Why these exist
 *
 * The service page had become a wall of prose: a 157-word overview, ten deliverable cards, six
 * discipline blocks each carrying a paragraph plus a four-item checklist, then process, use cases,
 * stack, outcomes and pricing. Every one of them a text box. Nothing on the page showed what the
 * work looks like; it only described it.
 *
 * Each glyph below states its discipline in a picture, so the copy beside it can be one line
 * instead of six.
 *
 * ## Why CSS keyframes rather than framer-motion
 *
 * These are decorative loops on a long page. Driving a dozen of them through a JS animation library
 * puts a dozen more subscriptions on the main thread, and RAF-driven motion is exactly what left
 * this site's content stuck part-way through a transition. CSS keyframes run on the compositor,
 * cost nothing to schedule, and cannot be starved. They also render identically in the server HTML.
 *
 * Everything is `currentColor` plus one gold accent token, so the glyphs inherit light and dark
 * mode without a second palette.
 */

const VB = "0 0 200 116"

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
    return (
        <svg
            viewBox={VB}
            role="img"
            aria-label={label}
            className="dg h-auto w-full"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {children}
        </svg>
    )
}

/** Shared keyframes. One <style> for the whole set rather than one per glyph. */
export function DisciplineGlyphStyles() {
    return (
        <style>{`
            .dg { color: var(--so-ink-4); }
            .dg .s { stroke: currentColor; stroke-width: 1.25; }
            .dg .s-soft { stroke: currentColor; stroke-width: 1.25; opacity: .38; }
            .dg .f-soft { fill: currentColor; opacity: .1; }
            .dg .gold { stroke: var(--so-gold); stroke-width: 1.5; }
            .dg .gold-f { fill: var(--so-gold); }

            /* A bar wiping in, used for "content streaming into a frame". */
            @keyframes dg-wipe { 0%,8% { transform: scaleX(0) } 34%,92% { transform: scaleX(1) } 100% { transform: scaleX(0) } }
            .dg .wipe { transform-origin: left center; animation: dg-wipe 5.2s ease-in-out infinite; }

            /* A dot travelling along a path. */
            @keyframes dg-travel { 0% { transform: translateX(0); opacity: 0 } 12% { opacity: 1 } 88% { opacity: 1 } 100% { transform: translateX(var(--dg-dx, 56px)); opacity: 0 } }
            .dg .travel { animation: dg-travel 3.4s cubic-bezier(.5,0,.5,1) infinite; }

            /* A stroke drawing itself. */
            @keyframes dg-draw { 0% { stroke-dashoffset: var(--dg-len, 120) } 45%,100% { stroke-dashoffset: 0 } }
            .dg .draw { stroke-dasharray: var(--dg-len, 120); animation: dg-draw 4.6s ease-in-out infinite; }

            /* A soft pulse for nodes coming online. */
            @keyframes dg-pulse { 0%,100% { opacity: .25; transform: scale(.82) } 50% { opacity: 1; transform: scale(1) } }
            .dg .pulse { transform-box: fill-box; transform-origin: center; animation: dg-pulse 2.8s ease-in-out infinite; }

            /* A scanning band. */
            @keyframes dg-scan { 0% { transform: translateY(0) } 50% { transform: translateY(38px) } 100% { transform: translateY(0) } }
            .dg .scan { animation: dg-scan 3.6s ease-in-out infinite; }

            /* A tick appearing after the scan has passed. */
            @keyframes dg-tick { 0%,55% { opacity: 0; transform: scale(.6) } 70%,100% { opacity: 1; transform: scale(1) } }
            .dg .tick { transform-box: fill-box; transform-origin: center; animation: dg-tick 3.6s ease-in-out infinite; }

            @media (prefers-reduced-motion: reduce) {
                .dg .wipe, .dg .travel, .dg .draw, .dg .pulse, .dg .scan, .dg .tick {
                    animation: none;
                    stroke-dashoffset: 0;
                    transform: none;
                    opacity: 1;
                }
            }
        `}</style>
    )
}

/* ── 01 Web engineering: a frame filling with server-rendered content ───────── */
export function WebGlyph() {
    return (
        <Frame label="A browser frame filling with server-rendered content">
            <rect x="18" y="16" width="164" height="84" rx="8" className="s-soft" />
            <path d="M18 32h164" className="s-soft" />
            <circle cx="29" cy="24" r="2" className="f-soft" fill="currentColor" />
            <circle cx="37" cy="24" r="2" className="f-soft" fill="currentColor" />
            <circle cx="45" cy="24" r="2" className="f-soft" fill="currentColor" />

            <g className="gold-f">
                <rect x="32" y="44" width="72" height="5" rx="2.5" className="wipe" style={{ animationDelay: "0s" }} />
            </g>
            <g fill="currentColor" opacity=".45">
                <rect x="32" y="57" width="112" height="4" rx="2" className="wipe" style={{ animationDelay: ".25s" }} />
                <rect x="32" y="68" width="94" height="4" rx="2" className="wipe" style={{ animationDelay: ".5s" }} />
                <rect x="32" y="79" width="56" height="4" rx="2" className="wipe" style={{ animationDelay: ".75s" }} />
            </g>
        </Frame>
    )
}

/* ── 02 Mobile: one codebase, two devices ──────────────────────────────────── */
export function MobileGlyph() {
    return (
        <Frame label="One codebase branching into two devices">
            <rect x="10" y="44" width="40" height="28" rx="5" className="s-soft" />
            <path d="M18 54h24M18 62h16" className="s-soft" />

            <path d="M52 58h22c6 0 6-20 12-20" className="s draw" style={{ ["--dg-len" as string]: "60" }} />
            <path d="M52 58h22c6 0 6 20 12 20" className="s draw" style={{ ["--dg-len" as string]: "60", animationDelay: ".3s" }} />

            <rect x="90" y="14" width="42" height="34" rx="6" className="gold" />
            <path d="M90 22h42" className="gold" opacity=".5" />
            <rect x="150" y="14" width="26" height="34" rx="6" className="s" />
            <path d="M150 22h26" className="s-soft" />

            <rect x="90" y="68" width="42" height="34" rx="6" className="s" />
            <path d="M90 76h42" className="s-soft" />
            <rect x="150" y="68" width="26" height="34" rx="6" className="gold" />
            <path d="M150 76h26" className="gold" opacity=".5" />

            <circle cx="111" cy="31" r="3" className="gold-f pulse" />
            <circle cx="163" cy="85" r="3" className="gold-f pulse" style={{ animationDelay: "1.4s" }} />
        </Frame>
    )
}

/* ── 03 AI integration: a query retrieved from a corpus, answered with a citation ── */
export function AiGlyph() {
    return (
        <Frame label="A query retrieved from a document corpus and answered with a citation">
            <g className="s-soft">
                <rect x="14" y="26" width="30" height="20" rx="3" />
                <rect x="14" y="52" width="30" height="20" rx="3" />
                <rect x="14" y="78" width="30" height="20" rx="3" />
            </g>
            <g className="gold-f">
                <circle cx="29" cy="36" r="2.5" className="pulse" />
                <circle cx="29" cy="62" r="2.5" className="pulse" style={{ animationDelay: ".9s" }} />
                <circle cx="29" cy="88" r="2.5" className="pulse" style={{ animationDelay: "1.8s" }} />
            </g>

            <path d="M48 36c22 0 24 22 34 22" className="s-soft" />
            <path d="M48 62h34" className="s-soft" />
            <path d="M48 88c22 0 24-22 34-22" className="s-soft" />

            <circle cx="96" cy="58" r="13" className="s" />
            <path d="M90 58h12M96 52v12" className="gold" />

            <path d="M110 58h18" className="s-soft" />
            <circle r="3" cx="112" cy="58" className="gold-f travel" style={{ ["--dg-dx" as string]: "16px" }} />

            <rect x="132" y="34" width="52" height="48" rx="6" className="s" />
            <g fill="currentColor" opacity=".4">
                <rect x="140" y="46" width="36" height="3.5" rx="1.75" className="wipe" style={{ animationDelay: ".4s" }} />
                <rect x="140" y="55" width="28" height="3.5" rx="1.75" className="wipe" style={{ animationDelay: ".6s" }} />
            </g>
            <rect x="140" y="66" width="18" height="6" rx="3" className="gold-f wipe" style={{ animationDelay: ".9s" }} />
        </Frame>
    )
}

/* ── 04 Cloud architecture: a pipeline that scales out under load ──────────── */
export function CloudGlyph() {
    return (
        <Frame label="A deployment pipeline scaling out to parallel instances">
            <rect x="12" y="48" width="34" height="22" rx="4" className="s" />
            <path d="M20 59h18" className="s-soft" />

            <path d="M50 59h26" className="s draw" style={{ ["--dg-len" as string]: "30" }} />

            <path d="M80 59c8 0 8-30 18-30M80 59h18M80 59c8 0 8 30 18 30" className="s-soft" />

            <g>
                <rect x="102" y="18" width="34" height="22" rx="4" className="gold pulse" />
                <rect x="102" y="48" width="34" height="22" rx="4" className="gold pulse" style={{ animationDelay: ".7s" }} />
                <rect x="102" y="78" width="34" height="22" rx="4" className="gold pulse" style={{ animationDelay: "1.4s" }} />
            </g>

            <path d="M140 29c10 0 12 30 22 30M140 59h22M140 89c10 0 12-30 22-30" className="s-soft" />
            <circle cx="174" cy="59" r="10" className="s" />
            <path d="M169.5 59l3.5 3.5 6-7" className="gold tick" />
        </Frame>
    )
}

/* ── 05 Design systems: tokens composing into a component ──────────────────── */
export function DesignGlyph() {
    return (
        <Frame label="Design tokens composing into a reusable component">
            <g className="s-soft">
                <rect x="14" y="22" width="18" height="18" rx="4" />
                <rect x="14" y="49" width="18" height="18" rx="4" />
                <rect x="14" y="76" width="18" height="18" rx="4" />
            </g>
            <circle cx="23" cy="31" r="4" className="gold-f pulse" />
            <rect x="18" y="55" width="10" height="3" rx="1.5" className="gold-f pulse" style={{ animationDelay: ".8s" }} />
            <rect x="18" y="82" width="10" height="6" rx="3" className="gold-f pulse" style={{ animationDelay: "1.6s" }} />

            <path d="M38 31c16 0 18 27 30 27M38 58h30M38 85c16 0 18-27 30-27" className="s-soft" />

            <rect x="74" y="24" width="112" height="68" rx="8" className="s" />
            <path d="M74 40h112" className="s-soft" />
            <rect x="84" y="30" width="22" height="4" rx="2" className="gold-f" />

            <rect x="84" y="50" width="44" height="4" rx="2" className="wipe" fill="currentColor" opacity=".45" style={{ animationDelay: ".2s" }} />
            <rect x="84" y="60" width="66" height="4" rx="2" className="wipe" fill="currentColor" opacity=".3" style={{ animationDelay: ".4s" }} />
            <rect x="84" y="74" width="34" height="10" rx="5" className="gold" />
            <rect x="128" y="74" width="34" height="10" rx="5" className="s-soft" />
        </Frame>
    )
}

/* ── 06 Security & DevOps: a shield under a scan that resolves to a pass ───── */
export function SecurityGlyph() {
    return (
        <Frame label="A security scan passing over a shield and resolving to a pass">
            <path
                d="M100 14l40 14v26c0 26-18 42-40 48-22-6-40-22-40-48V28l40-14z"
                className="s"
            />
            <path
                d="M100 26l28 10v19c0 18-12 30-28 35-16-5-28-17-28-35V36l28-10z"
                className="s-soft"
            />

            {/* the scan band */}
            <g className="scan">
                <rect x="56" y="34" width="88" height="2.5" rx="1.25" className="gold-f" opacity=".85" />
                <rect x="56" y="30" width="88" height="10" rx="5" className="gold-f" opacity=".12" />
            </g>

            <path d="M88 62l9 9 17-19" className="gold tick" strokeWidth="2" />

            <g className="s-soft">
                <path d="M16 40h26M16 52h18M16 64h22" />
                <path d="M158 40h26M166 52h18M162 64h22" />
            </g>
        </Frame>
    )
}

export const DISCIPLINE_GLYPHS = {
    web: WebGlyph,
    mobile: MobileGlyph,
    ai: AiGlyph,
    cloud: CloudGlyph,
    design: DesignGlyph,
    security: SecurityGlyph,
} as const

export type DisciplineGlyphKey = keyof typeof DISCIPLINE_GLYPHS
