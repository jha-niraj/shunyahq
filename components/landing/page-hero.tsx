import type { ReactNode } from "react"
import { PageHeaderBg } from "./page-background"
import type { ShaderPalette } from "./shader-palettes"

interface PageHeroProps {
    eyebrow?: string
    title: ReactNode
    description?: string
    /** Optional companion content - stats, a card, a form. Occupies the right column. */
    right?: ReactNode
    /**
     * Short label/value pairs rendered as a meta rail when there is no `right` slot. Keeps the
     * right column earning its space instead of sitting empty.
     */
    meta?: { label: string; value: string }[]
    /** Rendered under the lede - buttons, links. */
    actions?: ReactNode
    minHeight?: string
    palette?: ShaderPalette
}

/**
 * The shared hero band for every public page.
 *
 * ## What changed and why
 *
 * The previous version bottom-aligned a single left column inside a 440-620px band with up to
 * 150px of top padding. On every page with no `right` slot - solutions, pricing, blog, tools - that
 * left roughly half the band empty and stacked ~200px of dead space above the eyebrow. Measured on
 * /solutions, the visible content occupied the bottom third of a 390px band.
 *
 * Three fixes:
 *
 *  1. **The headline widens when there is nothing beside it.** No right slot and no meta rail means
 *     the title spans 10 of 12 columns rather than 6, so the composition has no hole in it.
 *  2. **The band is centred, not bottom-pinned**, and its padding is symmetric, which removes the
 *     dead strip under the nav.
 *  3. **The lede is legible.** It was rgba(245,239,224,0.55) - roughly 3.4:1 on this ground, under
 *     the 4.5:1 floor. It is now 0.72.
 *
 * The entrance is CSS (see the reveal system in globals.css): the old framer mount animation left
 * `<h1>` at opacity 0 whenever the main thread was busy, which on this site was always.
 */
export function PageHero({
    eyebrow,
    title,
    description,
    right,
    meta,
    actions,
    minHeight = "clamp(380px, 46vh, 540px)",
    palette = "goldNoir",
}: PageHeroProps) {
    const hasAside = Boolean(right) || Boolean(meta?.length)

    return (
        <section
            data-hero-dark=""
            className="dark relative isolate flex items-center overflow-hidden"
            style={{ minHeight, background: "#0a0a0a" }}
        >
            <PageHeaderBg palette={palette} />

            <div
                className="so-container relative z-[2] w-full"
                style={{ paddingTop: "clamp(112px, 11vw, 148px)", paddingBottom: "clamp(48px, 6vw, 76px)" }}
            >
                <div className="grid grid-cols-1 items-end gap-x-12 gap-y-10 lg:grid-cols-12">
                    <div className={hasAside ? "lg:col-span-7" : "lg:col-span-10"}>
                        {eyebrow && (
                            <div
                                data-rv=""
                                data-rv-mount=""
                                className="so-anim so-eyebrow"
                                style={{ "--rv-y": "14px", "--rv-duration": "0.6s", color: "var(--so-gold-bright)" } as React.CSSProperties}
                            >
                                {eyebrow}
                            </div>
                        )}

                        {/* An <h1>, not a styled <div>. Every page built on this hero was shipping
                            with zero h1 elements, which is the strongest on-page relevance signal
                            there is. */}
                        <h1
                            data-rv=""
                            data-rv-mount=""
                            className="so-anim mt-6"
                            style={
                                {
                                    "--rv-y": "18px",
                                    "--rv-delay": "0.06s",
                                    "--rv-duration": "0.75s",
                                    fontSize: "clamp(38px, 5.6vw, 72px)",
                                    lineHeight: 1.0,
                                    fontWeight: 500,
                                    letterSpacing: "-0.035em",
                                    color: "#F7F2E6",
                                    textWrap: "balance",
                                } as React.CSSProperties
                            }
                        >
                            {title}
                        </h1>

                        {description && (
                            <p
                                data-rv=""
                                data-rv-mount=""
                                className="so-anim mt-6"
                                style={
                                    {
                                        "--rv-y": "16px",
                                        "--rv-delay": "0.13s",
                                        fontSize: "clamp(16px, 1.25vw, 18px)",
                                        lineHeight: 1.6,
                                        color: "rgba(247,242,230,0.72)",
                                        maxWidth: "54ch",
                                    } as React.CSSProperties
                                }
                            >
                                {description}
                            </p>
                        )}

                        {actions && (
                            <div
                                data-rv=""
                                data-rv-mount=""
                                className="so-anim mt-9 flex flex-wrap items-center gap-3"
                                style={{ "--rv-y": "14px", "--rv-delay": "0.2s" } as React.CSSProperties}
                            >
                                {actions}
                            </div>
                        )}
                    </div>

                    {right && (
                        <div
                            data-rv=""
                            data-rv-mount=""
                            className="so-anim lg:col-span-5"
                            style={{ "--rv-y": "22px", "--rv-delay": "0.24s", "--rv-duration": "0.8s" } as React.CSSProperties}
                        >
                            {right}
                        </div>
                    )}

                    {!right && meta && meta.length > 0 && (
                        <dl
                            data-rv=""
                            data-rv-group=""
                            data-rv-mount=""
                            className="so-anim grid grid-cols-2 gap-x-8 gap-y-7 lg:col-span-5 lg:justify-items-end"
                            style={{ "--rv-delay": "0.22s", "--rv-step": "0.06s" } as React.CSSProperties}
                        >
                            {meta.map((m) => (
                                <div key={m.label} className="lg:text-right">
                                    <dt
                                        className="so-eyebrow"
                                        style={{ color: "rgba(247,242,230,0.42)" }}
                                    >
                                        {m.label}
                                    </dt>
                                    <dd
                                        className="so-num mt-2"
                                        style={{
                                            fontSize: "clamp(22px, 2vw, 28px)",
                                            fontWeight: 500,
                                            color: "#F7F2E6",
                                        }}
                                    >
                                        {m.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    )}
                </div>
            </div>

            {/* Hairline where the band meets the page body - the seam should be deliberate. */}
            <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 z-[3] h-px"
                style={{ background: "var(--so-gold-line)" }}
            />
        </section>
    )
}
