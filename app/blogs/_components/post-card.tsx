import Link from "next/link"
import { BLOG_CATEGORIES, type BlogMeta } from "@/content/blog"
import { formatBlogDate } from "./format-date"

/**
 * The grid card used for a blog post - on /blogs, on every topic hub, and in the related-articles
 * strip at the foot of an article.
 *
 * Shared rather than duplicated because it already drifted twice: the topic hubs once had a copy
 * without the cover image, and related-articles had a copy with a different heading level and
 * padding, so the same post looked like a different kind of thing depending on where you found it.
 * One component means the next change reaches every grid at once.
 *
 * Why there is no visible title: the cover IS the post's OG card, and that image already sets the
 * title in large type. Printing it again underneath said the same thing twice and squeezed the
 * description down to a truncated fragment. The heading is kept in the DOM but visually hidden, so
 * the link still has proper anchor text and the document still has a heading per card - the title
 * is not gone, it has just moved up into the artwork.
 */

export const CATEGORY_BADGE =
    "border-so-line bg-so-surface-2 text-so-ink-2"

export function PostCard({
    slug,
    meta,
    headingLevel: Heading = "h2",
}: {
    slug: string
    meta: BlogMeta
    headingLevel?: "h2" | "h3"
}) {
    return (
        <Link
            href={`/blogs/${slug}`}
            className="group so-card flex h-full flex-col overflow-hidden transition-all hover:shadow-md"
        >
            {/* The cover is the route's own OG image, so a post never needs a separate asset and the
                card can never point at a file that was not generated. */}
            <div className="overflow-hidden">
                <div
                    className="aspect-[16/9] bg-so-accent-soft bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    style={{ backgroundImage: `url(/blogs/${slug}/opengraph-image)` }}
                />
            </div>
            <div className="flex flex-1 flex-col p-5">
                <Heading className="sr-only">{meta.title}</Heading>
                <div className="mb-3 flex items-center gap-2">
                    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${CATEGORY_BADGE}`}>
                        {BLOG_CATEGORIES[meta.category]}
                    </span>
                    <span className="text-[11px] text-so-ink-3">{meta.readingTime} min</span>
                </div>
                <p className="line-clamp-4 flex-1 text-[13.5px] leading-[1.65] text-so-ink-2">
                    {meta.description}
                </p>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-so-line pt-3.5">
                    <time dateTime={meta.datePublished} className="so-mono text-[11.5px] text-so-ink-4">
                        {formatBlogDate(meta.datePublished)}
                    </time>
                    <span className="text-[12px] font-medium text-so-ink-3 transition-colors group-hover:text-so-ink">
                        Read
                    </span>
                </div>
            </div>
        </Link>
    )
}
