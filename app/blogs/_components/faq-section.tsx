import { Plus } from 'lucide-react'

type Faq = { q: string; a: string }

// Server-rendered FAQ list using native details/summary so answers are in the DOM
// and crawlable. Styled with the so-* design tokens.
export function FaqSection({ faqs }: { faqs: Faq[] }) {
	if (!faqs.length) return null

	return (
		<section className="mt-16" aria-labelledby="faq-heading">
			<h2
				id="faq-heading"
				className="text-[clamp(20px,2.5vw,28px)] so-serif text-so-ink tracking-[-0.015em] mb-6"
			>
				Frequently asked questions
			</h2>
			<div className="rounded-2xl border border-so-line bg-so-surface divide-y divide-so-line overflow-hidden">
				{
					faqs.map((faq) => (
						<details key={faq.q} className="group">
							<summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 text-[15px] font-[650] text-so-ink tracking-[-0.01em]">
								{faq.q}
								<Plus
									size={16}
									className="shrink-0 text-so-accent transition-transform duration-200 group-open:rotate-45"
								/>
							</summary>
							<div className="px-6 pb-5 -mt-1 text-[14px] leading-[1.65] text-so-ink-2">
								{faq.a}
							</div>
						</details>
					))
				}
			</div>
		</section>
	)
}
