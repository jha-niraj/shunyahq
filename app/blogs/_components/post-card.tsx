import Link from "next/link"
import { BLOG_CATEGORIES, type BlogMeta } from "@/content/blog"
import { formatBlogDate } from "./format-date"

/**
 * The grid card used for a blog post.
 *
 * Shared rather than duplicated because it already drifted once: the topic hubs had a copy without
 * the cover image, so the same post looked like a different kind of thing depending on which page
 * you found it from. One component means the next change reaches every grid at once.
 */

export const CATEGORY_BADGE =
    "bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700"

export function PostCard({ slug, meta }: { slug: string; meta: BlogMeta }) {
    return (
        <Link
            href={`/blogs/${slug}`}
            className="group so-card flex flex-col overflow-hidden transition-all hover:shadow-md"
        >
            {/* The cover is the route's own OG image, so a post never needs a separate asset and the
                card can never point at a file that was not generated. */}
            <div
                className="aspect-[16/9] bg-so-accent-soft bg-cover bg-center"
                style={{ backgroundImage: `url(/blogs/${slug}/opengraph-image)` }}
            />
            <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-center gap-2">
                    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${CATEGORY_BADGE}`}>
                        {BLOG_CATEGORIES[meta.category]}
                    </span>
                    <span className="text-[11px] text-so-ink-3">{meta.readingTime} min</span>
                </div>
                <h2 className="mb-2 text-[16px] font-semibold leading-snug text-so-ink transition-opacity group-hover:opacity-80">
                    {meta.title}
                </h2>
                <p className="line-clamp-2 flex-1 text-[13px] leading-relaxed text-so-ink-2">
                    {meta.description}
                </p>
                <time dateTime={meta.datePublished} className="so-mono mt-4 text-[11.5px] text-so-ink-4">
                    {formatBlogDate(meta.datePublished)}
                </time>
            </div>
        </Link>
    )
}
