import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import { BLOG_CATEGORY_KEYS, getPublishedPosts } from "@/content/blog"
import { USE_CASE_SLUGS } from "@/content/use-cases"
import { SERVICE_SLUGS } from "@/content/services"
import { PROJECTS } from "@/content/projects"
import { PRODUCT_TOOLS } from "./tools/tools-meta"

/**
 * Stable "last meaningfully updated" date for the static marketing pages.
 *
 * It is a FIXED date, not `new Date()`, on purpose. If every URL reported lastmod = build time,
 * each deploy would tell crawlers "every page on this site changed just now" - Google treats that
 * as an unreliable signal and then ignores lastmod for the whole domain, which also throws away
 * the accurate per-post blog dates below. Bump this only on a real content revamp of the static
 * pages. Date-only (no time) is valid W3C.
 */
const STATIC_LAST_MODIFIED = "2026-08-09"

export default function sitemap(): MetadataRoute.Sitemap {
    // path -> [priority, changeFrequency]
    const routes: Record<string, [number, MetadataRoute.Sitemap[number]["changeFrequency"]]> = {
        "": [1.0, "weekly"],
        pricing: [0.9, "weekly"],
        // Our own product, and a page we actively want ranking - same tier as pricing.
        synchq: [0.9, "monthly"],
        projects: [0.9, "monthly"],
        solutions: [0.8, "monthly"],
        blogs: [0.8, "weekly"],
        tools: [0.7, "monthly"],
        aboutus: [0.7, "monthly"],
        contactus: [0.7, "monthly"],
        privacy: [0.2, "yearly"],
        terms: [0.2, "yearly"],
    }

    // Published posts only - drafts stay noindex and unlisted until their slug enters the ledger.
    const posts = getPublishedPosts()

    // /blogs is the one "static" route whose content genuinely changes on a schedule: a new card
    // appears every time a post is published. Reporting the frozen date there would claim the
    // listing never changes while we add to it, so it reports the newest post's date instead.
    const newestPostModified =
        posts.map((p) => p.dateModified ?? p.datePublished).sort().at(-1) ?? STATIC_LAST_MODIFIED

    const staticEntries: MetadataRoute.Sitemap = Object.entries(routes).map(([path, [priority, changeFrequency]]) => ({
        url: path ? `${SITE_URL}/${path}` : SITE_URL,
        lastModified: path === "blogs" ? newestPostModified : STATIC_LAST_MODIFIED,
        changeFrequency,
        priority,
    }))

    // Every list below is DERIVED from its content module rather than retyped here. The previous
    // version hardcoded three project slugs, two of which no longer matched content/projects.ts -
    // so the sitemap advertised /projects/coderzai (a 404, reported against the whole domain) while
    // four real case studies were missing from it entirely.
    const serviceEntries: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
        url: `${SITE_URL}/services/${slug}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.95,
    }))

    const projectEntries: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
        url: `${SITE_URL}/projects/${p.slug}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.7,
    }))

    const solutionEntries: MetadataRoute.Sitemap = USE_CASE_SLUGS.map((slug) => ({
        url: `${SITE_URL}/solutions/${slug}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.7,
    }))

    const toolEntries: MetadataRoute.Sitemap = PRODUCT_TOOLS.filter((t) => !t.href).map((t) => ({
        url: `${SITE_URL}/tools/${t.slug}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.6,
    }))

    const blogPostEntries: MetadataRoute.Sitemap = posts.map((p) => ({
        url: `${SITE_URL}/blogs/${p.slug}`,
        lastModified: p.dateModified ?? p.datePublished,
        changeFrequency: "monthly",
        priority: 0.7,
    }))

    const blogTopicEntries: MetadataRoute.Sitemap = BLOG_CATEGORY_KEYS.map((key) => ({
        url: `${SITE_URL}/blogs/topics/${key}`,
        lastModified: newestPostModified,
        changeFrequency: "weekly",
        priority: 0.6,
    }))

    return [
        ...staticEntries,
        ...serviceEntries,
        ...projectEntries,
        ...solutionEntries,
        ...toolEntries,
        ...blogPostEntries,
        ...blogTopicEntries,
    ]
}
