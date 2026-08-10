import type { BlogPostWithSlug } from '@/content/blog'
import { StaggerContainer, StaggerItem, Reveal } from '@/components/landing/animations'
import { PostCard } from './post-card'

/**
 * Related-articles strip at the foot of an article.
 *
 * Renders the same PostCard as /blogs and the topic hubs. It used to carry its own card - no cover
 * image, different padding, h3 instead of h2 - so the last thing you saw on a post looked nothing
 * like the grid you arrived from.
 */
export function RelatedPosts({ posts }: { posts: BlogPostWithSlug[] }) {
	if (!posts.length) return null

	return (
		<section className="mt-16" aria-labelledby="related-heading">
			<Reveal>
				<h2
					id="related-heading"
					className="text-[clamp(20px,2.5vw,28px)] so-serif text-so-ink tracking-[-0.015em] mb-6"
				>
					Related articles
				</h2>
			</Reveal>
			<StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{
					posts.map((post) => (
						<StaggerItem key={post.slug} className="h-full">
							<PostCard slug={post.slug} meta={post} headingLevel="h3" />
						</StaggerItem>
					))
				}
			</StaggerContainer>
		</section>
	)
}
