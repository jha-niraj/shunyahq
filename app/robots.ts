import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"

// Marketing site - fully crawlable. AI/answer-engine crawlers are welcomed explicitly, because a
// bare `User-agent: *` rule is not enough for several of them: OpenAI splits training (GPTBot),
// search indexing (OAI-SearchBot) and live retrieval (ChatGPT-User) across three separate agents,
// and Anthropic uses both ClaudeBot and Claude-Web. Naming each one is what makes the site eligible
// to be cited in generated answers rather than merely crawled.
export default function robots(): MetadataRoute.Robots {
    const disallow = [
        "/api/",    // API routes (not indexable)
        "/admin/",  // Internal admin panel
        "/_next/",  // Next.js internals
    ]

    return {
        // Every rule repeats `disallow`. A named agent takes the block that names it and ignores
        // `User-agent: *` entirely, so a bare `allow: "/"` here did not inherit the exclusions - it
        // granted Googlebot and every listed answer engine the run of /admin and /api.
        rules: [
            { userAgent: "*", allow: "/", disallow },

            // Search
            { userAgent: "Googlebot", allow: "/", disallow },
            { userAgent: "Googlebot-Image", allow: "/", disallow },
            { userAgent: "Bingbot", allow: "/", disallow },

            // Answer engines / LLM crawlers
            { userAgent: "GPTBot", allow: "/", disallow },
            { userAgent: "OAI-SearchBot", allow: "/", disallow },
            { userAgent: "ChatGPT-User", allow: "/", disallow },
            { userAgent: "ClaudeBot", allow: "/", disallow },
            { userAgent: "Claude-Web", allow: "/", disallow },
            { userAgent: "PerplexityBot", allow: "/", disallow },
            { userAgent: "Google-Extended", allow: "/", disallow },
            { userAgent: "Amazonbot", allow: "/", disallow },
            { userAgent: "Applebot", allow: "/", disallow },
            { userAgent: "Applebot-Extended", allow: "/", disallow },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    }
}
