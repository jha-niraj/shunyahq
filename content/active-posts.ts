// Publish ledger for the blog.
//
// This file is the publish gate. A post's MDX (content/posts/*.mdx) and metadata (content/blog.ts)
// can be complete and the page will still not be PUBLIC until its slug appears below. Everything
// not listed stays a real, working page - so internal links between posts never 404 - but is
// noindex, hidden from /blogs and the topic hubs, and absent from sitemap.xml and llms.txt.
//
// Why keep unpublished posts reachable at all? Because a published post routinely links to one
// that is still being written. A 404 on that link is a real defect; a `noindex, follow` page is
// not. Googlebot follows the link, crawls the target, finds noindex, and files it under
// "Crawled - currently not indexed" - which is the gate working, not a fault. On publication the
// slug enters sitemap.xml with a fresh lastmod and it gets indexed on the next crawl.
//
// To publish: add the slug here. To unpublish: remove it. Nothing else to change.

export const ACTIVE_BLOG_SLUGS: readonly string[] = [
	'signs-you-have-outgrown-your-current-system',
	'red-flags-in-a-software-quote',
	'questions-to-ask-in-a-software-demo',
	'fixed-price-vs-time-and-materials',
	'website-redesign-vs-rebuild',
	'nextjs-vs-wordpress-for-business-websites',
	'how-to-migrate-off-a-legacy-system',
	'how-to-scope-an-mvp',
	'what-is-technical-debt',
	'why-software-projects-fail',
	'software-development-contract-checklist',
	'why-your-website-is-slow',
	'managing-a-software-project-as-a-client',
	'what-happens-after-launch',
	'choosing-an-ecommerce-platform',
	'building-a-multi-language-website',
	'design-systems-for-business',
	'testing-software-before-launch',
	'adding-ai-features-to-your-product',
	'api-integration-for-businesses',
	'data-privacy-for-web-applications',
	'single-page-app-vs-server-rendered',
	'how-much-does-a-saas-platform-cost',
	'choosing-a-database',
	'web-application-security-checklist',
	'seo-for-web-applications',
	'core-web-vitals-for-business-owners',
	'web-accessibility-legal-requirements',
	'headless-cms-explained',
	// Buyer-intent cluster - the queries a client searches before they search for us.
	'web-application-development-cost',
	'how-to-choose-a-web-development-agency',
	'custom-software-vs-off-the-shelf',
	'how-long-does-it-take-to-build-a-web-app',
	'who-owns-the-code-web-development',
	'web-application-maintenance-cost',
	'agency-vs-freelancer-vs-in-house',
	'how-to-write-a-web-development-brief',
	'shipping-mvps-fast',
	'from-idea-to-mvp-in-6-weeks',
	'cost-of-cutting-corners',
	'full-stack-ownership',
	'choosing-your-stack',
	'mobile-vs-web-vs-pwa',
	'nextjs-15-server-components-in-production',
	'scaling-postgres-for-saas',
	'ci-cd-that-actually-ships',
	'rag-pipelines-explained',
	'designing-ai-agents-that-dont-hallucinate',
	'codrzai-case-study',
	'building-synchq-case-study',
]
