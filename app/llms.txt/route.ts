import { BLOG_POSTS, BLOG_CATEGORIES } from "@/content/blog"
import { USE_CASES, USE_CASE_SLUGS } from "@/content/use-cases"
import { PRODUCT_TOOLS } from "../tools/tools-meta"
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site"

// llms.txt - the emerging standard (llmstxt.org) that gives AI answer engines
// (ChatGPT, Claude, Perplexity, Google AI) a curated, plain-text map of the site
// and the canonical pages worth citing. Served at /llms.txt.
export const dynamic = "force-static"

export function GET() {
    const posts = Object.entries(BLOG_POSTS).sort(
        (a, b) => new Date(b[1].datePublished).getTime() - new Date(a[1].datePublished).getTime(),
    )

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
production-grade digital products - web apps, mobile apps, AI integrations, and cloud
infrastructure - with one team that owns everything from concept to launch. Every project
we take goes live: not a prototype, not a Figma deck, but a real production system people use.

## Key pages
- [Home](${SITE_URL}): Engineering intelligence for the digital age.
- [Services](${SITE_URL}/services): Web, mobile, AI, cloud, UI/UX, and security engineering.
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
