import type { Metadata } from "next"
import { SITE_URL, SITE_NAME } from "@/lib/site"

/**
 * Builds a COMPLETE, SEO-clean Metadata object for a marketing page.
 *
 * Why this exists: a child page that sets a partial `openGraph` (say `{ url }`) does NOT inherit
 * `type`, `siteName` or `locale` from the root layout - Next merges Open Graph field-by-field, so
 * the missing keys simply vanish and crawlers report "Open Graph tags incomplete". Routing every
 * page through this helper guarantees a full og:* + twitter:* set plus a self-referencing absolute
 * canonical.
 *
 * Titles are emitted as `{ absolute }` so the root layout's "%s | ShunyaHQ" template is NOT
 * re-applied - that template silently double-suffixes any title that already names the brand, which
 * is exactly how /blogs ended up as "Engineering & Product Blog - ShunyaHQ | ShunyaHQ".
 *
 * Images are deliberately left alone unless `ogImage` is passed. This app generates its OG cards
 * from `opengraph-image.tsx` route files, and Next only falls back to those when the metadata
 * object does not define `openGraph.images` itself. Setting a default here would silently disable
 * every generated card on the site.
 *
 * Keep `title` <= 60 chars and `description` between 110 and 160 for clean SERP rendering.
 */
export interface PageMetaInput {
    /** The <title> text, used verbatim (<= 60 chars). No " | ShunyaHQ" is appended. */
    title: string
    /** Meta description, 110-160 chars. */
    description: string
    /** Route path beginning with "/" (e.g. "/pricing"); "" or "/" for the homepage. */
    path: string
    keywords?: readonly string[]
    /** Defaults to `title`. */
    ogTitle?: string
    /** Defaults to `description`. */
    ogDescription?: string
    /** Only set this to override a route's generated opengraph-image. Path under /public. */
    ogImage?: string
    /** Alt text for an overridden OG image; defaults to `title`. */
    ogImageAlt?: string
    type?: "website" | "article"
    /** When true, emits robots noindex (still followable). */
    noindex?: boolean
}

export function pageMeta(o: PageMetaInput): Metadata {
    const path = o.path && o.path !== "/" ? o.path : ""
    const url = `${SITE_URL}${path}` || SITE_URL
    const ogTitle = o.ogTitle ?? o.title
    const ogDescription = o.ogDescription ?? o.description

    const image = o.ogImage
        ? (o.ogImage.startsWith("http") ? o.ogImage : `${SITE_URL}${o.ogImage}`)
        : undefined

    return {
        title: { absolute: o.title },
        description: o.description,
        ...(o.keywords?.length ? { keywords: [...o.keywords] } : {}),
        alternates: { canonical: url },
        openGraph: {
            title: ogTitle,
            description: ogDescription,
            url,
            siteName: SITE_NAME,
            locale: "en_US",
            type: o.type ?? "website",
            ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: o.ogImageAlt ?? o.title }] } : {}),
        },
        twitter: {
            card: "summary_large_image",
            title: ogTitle,
            description: ogDescription,
            ...(image ? { images: [image] } : {}),
        },
        ...(o.noindex ? { robots: { index: false, follow: true } } : {}),
    }
}
