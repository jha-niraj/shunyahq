import { BLOG_CATEGORIES, getPublishedPosts } from "@/content/blog"
import { USE_CASES, USE_CASE_SLUGS } from "@/content/use-cases"
import { PRODUCT_TOOLS } from "../tools/tools-meta"
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site"

// llms.txt - the emerging standard (llmstxt.org) that gives AI answer engines
// (ChatGPT, Claude, Perplexity, Google AI) a curated, plain-text map of the site
// and the canonical pages worth citing. Served at /llms.txt.
export const dynamic = "force-static"

export function GET() {
    const posts = getPublishedPosts().map((p) => [p.slug, p] as const)

    const topicLines = Object.entries(BLOG_CATEGORIES)
        .map(([slug, label]) => `- [${label}](${SITE_URL}/blogs/topics/${slug}): Guides on ${label.toLowerCase()} from the Shunya engineering team.`)
        .join("\n")

    const guideLines = posts
        .map(([slug, meta]) => `- [${meta.title}](${SITE_URL}/blogs/${slug}): ${meta.description}`)
        .join("\n")

    const solutionLines = USE_CASE_SLUGS
        .map((slug) => `- [${USE_CASES[slug].label}](${SITE_URL}/solutions/${slug})`)
        .join("\n")

    const toolLines = PRODUCT_TOOLS
        .map((t) => `- [${t.name}](${t.href ?? `${SITE_URL}/tools/${t.slug}`}): ${t.tagline}`)
        .join("\n")

    const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

Shunya (Shunya Tech) is a software engineering studio. We architect, build, and scale
production-grade web applications - SaaS platforms, dashboards, internal tools and
infrastructure - with one team that owns everything from concept to launch. Every project
we take goes live: not a prototype, not a Figma deck, but a real production system people use.

## Key pages
- [Home](${SITE_URL}): Engineering intelligence for the digital age.
- [Web Engineering](${SITE_URL}/services/web-engineering): Custom web applications built on Next.js and React Server Components.
- [Work](${SITE_URL}/projects): Selected production systems we've shipped.
- [Pricing](${SITE_URL}/pricing): Transparent rate cards across four currencies.
- [About](${SITE_URL}/aboutus): The team and how we work.
- [Accelerator](${SITE_URL}/accelerator): Practical, affordable support for student founders.
- [Contact](${SITE_URL}/contactus): Start a project or book a strategy call.
- [Blog](${SITE_URL}/blogs): Engineering and product guides.

## Solutions
${solutionLines}

## Tools
${toolLines}

## Topics
${topicLines}

## Guides
${guideLines}
`

    return new Response(body, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
        },
    })
}
