"use client"

import type { ReactNode } from "react"
import { PageHeaderBg } from "./page-background"
import type { ShaderPalette } from "./shader-palettes"

interface PageHeroProps {
    eyebrow?: string
    title: ReactNode
    description?: string
    right?: ReactNode
    minHeight?: string
    palette?: ShaderPalette
}

export function PageHero({
    eyebrow,
    title,
    description,
    right,
    minHeight = "clamp(440px, 50vh, 620px)",
    palette = "goldNoir",
}: PageHeroProps) {
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
                                <span
                                    className="so-eyebrow"
                                    style={{
                                        color: "rgba(201,169,97,0.8)",
                                        borderColor: "rgba(201,169,97,0.2)",
                                        background: "rgba(201,169,97,0.06)",
                                    }}
                                >
                                    {eyebrow}
                                </span>
                            )
                        }
                        <div
                            className="mt-5"
                            style={{
                                fontSize: "clamp(34px, 5vw, 58px)",
                                lineHeight: 1.02,
                                fontWeight: 650,
                                letterSpacing: "-0.028em",
                                color: "#F5EFE0",
                            }}
                        >
                            {title}
                        </div>
                        {
                            description && (
                                <p
                                    style={{
                                        fontSize: "clamp(15px, 1.3vw, 17px)",
                                        lineHeight: 1.65,
                                        color: "rgba(245,239,224,0.55)",
                                        marginTop: 18,
                                        maxWidth: "50ch",
                                    }}
                                >
                                    {description}
                                </p>
                            )
                        }
                    </div>
                    {right && <div>{right}</div>}
                </div>
            </div>
        </section>
    )
}