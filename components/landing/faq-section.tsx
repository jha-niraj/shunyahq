import { PageFAQ } from "./page-faq"
import { LANDING_FAQS } from "./faq-data"

/**
 * The landing page FAQ.
 *
 * This was a near-line-for-line copy of PageFAQ with the items hardcoded, which meant the "canonical"
 * FAQ design and the one every other page reuses could drift apart without anyone noticing. It is
 * now the same component with the landing items passed in, so the landing page and a blog post
 * render identical markup.
 *
 * Schema is off here because app/page.tsx already emits FAQPage JSON-LD built from the same list.
 */
export default function FAQSection() {
    return <PageFAQ items={LANDING_FAQS} withSchema={false} />
}
