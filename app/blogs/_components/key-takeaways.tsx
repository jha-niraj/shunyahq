import { Check } from 'lucide-react'
import { Reveal, StaggerContainer, StaggerItem } from '@/components/landing/animations'

// AEO: server-rendered "Key takeaways" box. Sits near the top of the article so
// AI answer engines and readers can extract the core facts at a glance. Styled
// with the so-* design tokens to match the rest of the blog.
export function KeyTakeaways({ takeaways }: { takeaways: string[] }) {
	if (!takeaways.length) return null

	return (
		<Reveal className="mb-10" distance={18}>
			<section
				className="rounded-2xl border border-so-line bg-so-surface p-6 sm:p-7"
				aria-labelledby="key-takeaways-heading"
			>
				<h2
					id="key-takeaways-heading"
					className="text-[13px] font-semibold uppercase tracking-[0.12em] text-so-accent mb-4"
				>
					Key takeaways
				</h2>
				{/* Ticked one after another rather than all at once - the box reads as a list being
				    checked off, which is what it is. */}
				<StaggerContainer as="ul" className="flex flex-col gap-3" stagger={0.07} delay={0.1}>
					{
						takeaways.map((point) => (
							<StaggerItem as="li" key={point} className="flex items-start gap-3">
								<Check
									size={16}
									className="mt-[3px] shrink-0 text-so-accent"
									aria-hidden="true"
								/>
								<span className="text-[15px] leading-[1.6] text-so-ink-2">{point}</span>
							</StaggerItem>
						))
					}
				</StaggerContainer>
			</section>
		</Reveal>
	)
}
