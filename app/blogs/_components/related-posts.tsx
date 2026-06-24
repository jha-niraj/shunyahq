import Link from 'next/link'
import { BLOG_CATEGORIES, type BlogPostWithSlug } from '@/content/blog'
import { formatBlogDate } from './format-date'

// Related-articles grid. Card styling matches the blog index grid cards.
export function RelatedPosts({ posts }: { posts: BlogPostWithSlug[] }) {
	if (!posts.length) return null

	return (
		<section className="mt-16" aria-labelledby="related-heading">
			<h2
				id="related-heading"
				className="text-[clamp(20px,2.5vw,28px)] so-serif text-so-ink tracking-[-0.015em] mb-6"
			>
				Related articles
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{
					posts.map((post) => (
						<Link
							key={post.slug}
							href={`/blogs/${post.slug}`}
							className="group so-card p-6 flex flex-col hover:shadow-md transition-all"
						>
							<div className="flex items-center gap-2 mb-4">
								<span className="px-2.5 py-1 rounded-full text-[11px] font-medium border bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700">
									{BLOG_CATEGORIES[post.category]}
								</span>
								<span className="text-[11px] text-so-ink-3">{post.readingTime} min</span>
							</div>
							<h3 className="text-[16px] font-semibold leading-snug mb-2 group-hover:opacity-80 transition-opacity text-so-ink">
								{post.title}
							</h3>
							<p className="text-[13px] leading-relaxed line-clamp-2 flex-1 text-so-ink-2">
								{post.description}
							</p>
							<time
								dateTime={post.datePublished}
								className="mt-4 text-[11.5px] so-mono text-so-ink-4"
							>
								{formatBlogDate(post.datePublished)}
							</time>
						</Link>
					))
				}
			</div>
		</section>
	)
}
