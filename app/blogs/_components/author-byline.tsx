import { AUTHORS, type AuthorKey } from '@/content/authors'
import { formatBlogDate } from './format-date'

// Author byline shown at the end of an article. E-E-A-T: surfaces the author's
// name, role, bio, and "last updated" date as visible authority + freshness
// signals. Image is optional - falls back to an initials monogram.
export function AuthorByline({
	authorKey,
	dateModified,
}: {
	authorKey: AuthorKey
	dateModified?: string
}) {
	const author = AUTHORS[authorKey]
	if (!author) return null

	const initials = author.name
		.split(' ')
		.map((part) => part[0])
		.slice(0, 2)
		.join('')

	return (
		<section className="mt-16 pt-8 border-t border-so-line">
			<div className="flex items-start gap-4">
				{
					author.image ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={author.image}
							alt={author.name}
							width={56}
							height={56}
							className="h-14 w-14 rounded-full object-cover shrink-0 border border-so-line"
						/>
					) : (
						<div className="h-14 w-14 rounded-full shrink-0 bg-so-surface-2 border border-so-line flex items-center justify-center text-[16px] font-semibold text-so-accent">
							{initials}
						</div>
					)
				}
				<div className="min-w-0">
					<p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-so-accent mb-1">
						Written by
					</p>
					<p className="text-[16px] font-[650] text-so-ink tracking-[-0.01em]">
						{author.name}
					</p>
					<p className="text-[13px] text-so-ink-3 mb-2">{author.role}</p>
					<p className="text-[14px] leading-[1.65] text-so-ink-2 max-w-[60ch]">
						{author.bio}
					</p>
					{dateModified && (
						<p className="mt-3 text-[12px] so-mono text-so-ink-4">
							Last updated{' '}
							<time dateTime={dateModified}>{formatBlogDate(dateModified)}</time>
						</p>
					)}
				</div>
			</div>
		</section>
	)
}
