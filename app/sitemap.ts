import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import { BLOG_POSTS, BLOG_CATEGORY_KEYS } from "@/content/blog"
import { USE_CASE_SLUGS } from "@/content/use-cases"
import { PRODUCT_TOOLS } from "./tools/tools-meta"

const PROJECT_SLUGS = ["coderzai", "eventeye", "mp-solutions"]

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date()

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
        { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${SITE_URL}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${SITE_URL}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${SITE_URL}/solutions`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${SITE_URL}/tools`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE_URL}/blogs`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${SITE_URL}/aboutus`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE_URL}/contactus`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE_URL}/accelerator`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${SITE_URL}/accelerator/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
        { url: `${SITE_URL}/accelerator/startups`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
        { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
        { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    ]

    const projectRoutes: MetadataRoute.Sitemap = PROJECT_SLUGS.map((slug) => ({
        url: `${SITE_URL}/projects/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
    }))

    const solutionRoutes: MetadataRoute.Sitemap = USE_CASE_SLUGS.map((slug) => ({
        url: `${SITE_URL}/solutions/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
    }))

    const toolRoutes: MetadataRoute.Sitemap = PRODUCT_TOOLS.filter((t) => !t.href).map((t) => ({
        url: `${SITE_URL}/tools/${t.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
    }))

    const blogPostRoutes: MetadataRoute.Sitemap = Object.entries(BLOG_POSTS).map(([slug, meta]) => ({
        url: `${SITE_URL}/blogs/${slug}`,
        lastModified: new Date(meta.dateModified ?? meta.datePublished),
        changeFrequency: "monthly",
        priority: 0.7,
    }))

    const blogTopicRoutes: MetadataRoute.Sitemap = BLOG_CATEGORY_KEYS.map((key) => ({
        url: `${SITE_URL}/blogs/topics/${key}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
    }))

    return [
        ...staticRoutes,
        ...projectRoutes,
        ...solutionRoutes,
        ...toolRoutes,
        ...blogPostRoutes,
        ...blogTopicRoutes,
    ]
}
