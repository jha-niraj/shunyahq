import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/",     // API routes (not indexable)
                    "/admin/",   // Internal admin panel
                    "/_next/",   // Next.js internals
                ],
            },
            // Allow AI crawlers - beneficial for GEO (Generative Engine Optimisation)
            { userAgent: "GPTBot", allow: "/" },
            { userAgent: "ClaudeBot", allow: "/" },
            { userAgent: "PerplexityBot", allow: "/" },
            { userAgent: "Google-Extended", allow: "/" },
            { userAgent: "Amazonbot", allow: "/" },
            { userAgent: "Applebot", allow: "/" },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    }
}
