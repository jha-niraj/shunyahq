import { ImageResponse } from "next/og"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { SITE_NAME, SITE_DOMAIN } from "@/lib/site"

// Shared 1200x630 branded Open Graph image, rendered via ImageResponse (Satori).
// Used by the homepage, blog posts, and topic hubs so every social/AI card is
// on-brand with the Vidhica mark - the VC monogram in a white tile on the dark
// brand gradient.

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = "image/png"

// Read the brand mark once at module scope as a base64 data URI so Satori can
// embed it. Falls back to the drawn mark if the file cannot be read.
const LOGO = (() => {
    try {
        return "data:image/png;base64," + readFileSync(join(process.cwd(), "public/shunya-mark.png")).toString("base64")
    } catch {
        return null
    }
})()

interface OgOptions {
    title: string
    eyebrow?: string
    footer?: string
}

export function ogImage({ title, eyebrow, footer }: OgOptions): ImageResponse {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "72px 80px",
                    background: "linear-gradient(135deg, #1A1A18 0%, #0C0B0A 100%)",
                    color: "#FAF8F2",
                    fontFamily: "sans-serif",
                }}
            >
                {/* Brand row */}
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    {
                        LOGO ? (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 112,
                                    height: 112,
                                    borderRadius: 22,
                                    background: "#FFFFFF",
                                    padding: 8,
                                }}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={LOGO} width={96} height={96} alt={SITE_NAME} style={{ borderRadius: 14 }} />
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 64,
                                    height: 64,
                                    borderRadius: 16,
                                    background: "#FAF8F2",
                                    color: "#1A1A18",
                                    fontSize: 42,
                                    fontWeight: 800,
                                }}
                            >
                                S
                            </div>
                        )
                    }
                    <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em" }}>{SITE_NAME}</div>
                </div>

                {/* Title block */}
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {eyebrow ? (
                        <div
                            style={{
                                fontSize: 22,
                                fontWeight: 600,
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                color: "#D9A441",
                            }}
                        >
                            {eyebrow}
                        </div>
                    ) : null}
                    <div
                        style={{
                            fontSize: title.length > 70 ? 52 : 60,
                            fontWeight: 700,
                            lineHeight: 1.12,
                            letterSpacing: "-0.02em",
                            maxWidth: 1000,
                        }}
                    >
                        {title}
                    </div>
                </div>

                {/* Footer row */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: 22,
                        color: "rgba(250,248,242,0.6)",
                    }}
                >
                    <div>{footer ?? "Engineering intelligence for the digital age"}</div>
                    <div style={{ color: "rgba(250,248,242,0.45)" }}>{SITE_DOMAIN}</div>
                </div>
            </div>
        ),
        { ...OG_SIZE },
    )
}
