import { SITE_URL } from "@/lib/site"

/**
 * Emits BreadcrumbList structured data for a nested page.
 *
 * `path` is relative and begins with "/" (use "" for the site root). Google uses this to render
 * the breadcrumb trail in place of the raw URL in search results, so every detail page - blog
 * posts, topic hubs, services, projects, solutions - should carry one.
 */
export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: it.name,
            item: `${SITE_URL}${it.path}`,
        })),
    }
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
