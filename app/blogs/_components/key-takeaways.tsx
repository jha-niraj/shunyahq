import { Check } from 'lucide-react'

// AEO: server-rendered "Key takeaways" box. Sits near the top of the article so
// AI answer engines and readers can extract the core facts at a glance. Styled
// with the so-* design tokens to match the rest of the blog.
export function KeyTakeaways({ takeaways }: { takeaways: string[] }) {
	if (!takeaways.length) return null

	return (
		<section
			className="mb-10 rounded-2xl border border-so-line bg-so-surface p-6 sm:p-7"
			aria-labelledby="key-takeaways-heading"
		>
			<h2
				id="key-takeaways-heading"
				className="text-[13px] font-semibold uppercase tracking-[0.12em] text-so-accent mb-4"
			>
				Key takeaways
			</h2>
			<ul className="flex flex-col gap-3">
				{
					takeaways.map((point) => (
						<li key={point} className="flex items-start gap-3">
							<Check
								size={16}
								className="mt-[3px] shrink-0 text-so-accent"
								aria-hidden="true"
							/>
							<span className="text-[15px] leading-[1.6] text-so-ink-2">{point}</span>
						</li>
					))
				}
			</ul>
		</section>
	)
}
