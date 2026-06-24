import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BLOG_POSTS, BLOG_CATEGORIES, getRelatedPosts } from '@/content/blog'
import { AUTHORS } from '@/content/authors'
import { SITE_URL, SITE_NAME, SITE_LOGO } from '@/lib/site'
import { ShaderHeroBg } from '@/components/landing/hero-shader-bg'
import { SHADER_PALETTES } from '@/components/landing/shader-palettes'
import { FaqSection } from '../_components/faq-section'
import { RelatedPosts } from '../_components/related-posts'
import { KeyTakeaways } from '../_components/key-takeaways'
import { AuthorByline } from '../_components/author-byline'
import { formatBlogDate } from '../_components/format-date'

export function generateStaticParams() {
    return Object.keys(BLOG_POSTS).map((slug) => ({ slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const meta = BLOG_POSTS[slug]
    if (!meta) return {}

    return {
        title: meta.pageTitle,
        description: meta.description,
        keywords: [...meta.keywords],
        authors: [{ name: AUTHORS[meta.author].name }],
        alternates: {
            canonical: `${SITE_URL}/blogs/${slug}`,
        },
        openGraph: {
            title: meta.pageTitle,
            description: meta.description,
            url: `${SITE_URL}/blogs/${slug}`,
            type: 'article',
            publishedTime: meta.datePublished,
            modifiedTime: meta.dateModified,
            authors: [AUTHORS[meta.author].name],
            siteName: SITE_NAME,
        },
        twitter: {
            card: 'summary_large_image',
            title: meta.pageTitle,
            description: meta.description,
        },
    }
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const meta = BLOG_POSTS[slug]
    if (!meta) notFound()

    const author = AUTHORS[meta.author]

    // E-E-A-T: full Person object reused as the Article author and emitted as a
    // standalone Person node. jobTitle, knowsAbout, and sameAs are author-authority signals.
    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: author.name,
        jobTitle: author.role,
        description: author.bio,
        knowsAbout: [...author.knowsAbout],
        sameAs: [...author.sameAs],
        url: SITE_URL,
        ...(author.image ? { image: `${SITE_URL}${author.image}` } : {}),
    }

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: meta.pageTitle,
        description: meta.description,
        datePublished: meta.datePublished,
        dateModified: meta.dateModified,
        image: `${SITE_URL}${meta.ogImage}`,
        url: `${SITE_URL}/blogs/${slug}`,
        author: {
            '@type': 'Person',
            name: author.name,
            jobTitle: author.role,
            knowsAbout: [...author.knowsAbout],
            sameAs: [...author.sameAs],
            url: SITE_URL,
        },
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: { '@type': 'ImageObject', url: `${SITE_URL}${SITE_LOGO}` },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blogs/${slug}` },
        keywords: meta.keywords.join(', '),
    }

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blogs` },
            { '@type': 'ListItem', position: 3, name: meta.title, item: `${SITE_URL}/blogs/${slug}` },
        ],
    }

    const faqs = meta.faqs ?? []
    const faqSchema = faqs.length
        ? {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((faq) => ({
                  '@type': 'Question',
                  name: faq.q,
                  acceptedAnswer: { '@type': 'Answer', text: faq.a },
              })),
          }
        : null

    const relatedPosts = getRelatedPosts(slug, 3)

    const { default: Content } = await import(
        `@/content/posts/${slug}.mdx`
    ).catch(() => notFound())

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            {faqSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            )}

            <div className="bg-so-bg min-h-screen text-so-ink">
                {/* Shader header band - rose (blog family) */}
                <section className="dark relative isolate overflow-hidden bg-[#120a0d]">
                    <ShaderHeroBg colors={SHADER_PALETTES.rose} />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-neutral-950" />
                    <div className="relative z-10 max-w-[64rem] mx-auto pt-[calc(72px+3rem)] pb-14 px-6">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-[13px] text-white/45 mb-8">
                            <Link href="/" className="hover:text-white/80 transition-colors duration-150">Home</Link>
                            <span className="text-white/25">/</span>
                            <Link href="/blogs" className="hover:text-white/80 transition-colors duration-150">Blog</Link>
                            <span className="text-white/25">/</span>
                            <span className="text-white/70">{meta.title}</span>
                        </nav>

                        {/* Header */}
                        <header>
                            <div className="flex items-center gap-2.5 mb-4">
                                <Link
                                    href={`/blogs/topics/${meta.category}`}
                                    className="text-[12px] font-semibold px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white/85 backdrop-blur-sm transition-opacity duration-150 hover:opacity-80"
                                >
                                    {BLOG_CATEGORIES[meta.category]}
                                </Link>
                                <span className="so-mono text-[11px] text-white/50">{meta.readingTime} min read</span>
                            </div>
                            <h1 className="text-[clamp(26px,4vw,40px)] font-bold text-white tracking-[-0.025em] leading-[1.2] mb-4">
                                {meta.pageTitle}
                            </h1>
                            <p className="text-[15px] text-white/60">
                                By {author.name} ·{' '}
                                <time dateTime={meta.datePublished}>{formatBlogDate(meta.datePublished)}</time>
                            </p>
                            <p className="mt-2 text-[13px] text-white/40">
                                {author.role} · Last updated{' '}
                                <time dateTime={meta.dateModified}>{formatBlogDate(meta.dateModified)}</time>
                            </p>
                        </header>
                    </div>
                </section>

                <main className="max-w-[64rem] mx-auto px-6 pb-20 pt-12">
                    {/* Key takeaways (AEO) */}
                    {meta.keyTakeaways && meta.keyTakeaways.length > 0 && (
                        <KeyTakeaways takeaways={meta.keyTakeaways} />
                    )}

                    {/* MDX Content */}
                    <article className="prose-custom text-so-ink">
                        <Content />
                    </article>

                    {/* FAQ */}
                    {faqs.length > 0 && <FaqSection faqs={faqs} />}

                    {/* CTA */}
                    <div className="mt-16 p-7 rounded-2xl bg-so-surface border border-so-line">
                        <p className="text-[15px] font-[650] text-so-ink mb-1.5 tracking-[-0.01em]">
                            Have a product to build?
                        </p>
                        <p className="text-[14px] text-so-ink-2 leading-[1.65] mb-5">
                            Shunya ships production software - web, mobile, AI, and cloud - with one team
                            that owns the whole stack from concept to launch. Tell us what you want to build.
                        </p>
                        <div className="flex gap-2.5 flex-wrap">
                            <Link
                                href="/contactus"
                                className="inline-flex items-center gap-1.5 text-[14px] font-semibold bg-so-ink text-so-bg px-5 py-[9px] rounded-[10px] transition-opacity duration-150 hover:opacity-90"
                            >
                                Start a Project <ArrowRight size={14} />
                            </Link>
                            <Link
                                href="/projects"
                                className="inline-flex items-center text-[14px] font-[550] border border-so-line text-so-ink px-5 py-[9px] rounded-[10px] bg-so-surface-2 transition-colors duration-150"
                            >
                                See Our Work
                            </Link>
                        </div>
                    </div>

                    {/* Related */}
                    <RelatedPosts posts={relatedPosts} />

                    {/* Author */}
                    <AuthorByline authorKey={meta.author} dateModified={meta.dateModified} />
                </main>
            </div>
        </>
    )
}
