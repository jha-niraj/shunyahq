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
        rules: [
            { userAgent: "*", allow: "/", disallow },

            // Search
            { userAgent: "Googlebot", allow: "/" },
            { userAgent: "Googlebot-Image", allow: "/" },
            { userAgent: "Bingbot", allow: "/" },

            // Answer engines / LLM crawlers
            { userAgent: "GPTBot", allow: "/" },
            { userAgent: "OAI-SearchBot", allow: "/" },
            { userAgent: "ChatGPT-User", allow: "/" },
            { userAgent: "ClaudeBot", allow: "/" },
            { userAgent: "Claude-Web", allow: "/" },
            { userAgent: "PerplexityBot", allow: "/" },
            { userAgent: "Google-Extended", allow: "/" },
            { userAgent: "Amazonbot", allow: "/" },
            { userAgent: "Applebot", allow: "/" },
            { userAgent: "Applebot-Extended", allow: "/" },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    }
}
