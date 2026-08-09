import type { Metadata } from "next"
import { TopicGlyph } from "@/components/blog/topic-glyph"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowLeft } from "lucide-react"
import {
    BLOG_CATEGORIES,
    BLOG_CATEGORY_KEYS,
    BLOG_TOPIC_INTROS,
    getPostsByCategory,
    type BlogCategory,
} from "@/content/blog"
import { SITE_URL, SITE_NAME } from "@/lib/site"
import { PageHero } from "@/components/landing/page-hero"
import { PageBackground } from "@/components/landing/page-background"
import { PostCard } from "../../_components/post-card"

function isBlogCategory(value: string): value is BlogCategory {
    return (BLOG_CATEGORY_KEYS as string[]).includes(value)
}

const TOPIC_META: Record<BlogCategory, { title: string; description: string }> = {
    "buying-guide": {
        title: "Web Development Buying Guide",
        description:
            "What a custom web application costs, how to tell a good engineering partner from a bad one, and what to ask before you sign anything.",
    },
    guides: {
        title: "Web Project Guides",
        description:
            "Step-by-step guides to planning and running a web build - scoping it, sequencing it, and knowing what finished actually looks like.",
    },
    comparisons: {
        title: "Comparisons",
        description:
            "Custom against off-the-shelf, web against native, and the stack choices that decide what your product costs to maintain over time.",
    },
    "case-studies": {
        title: "Case Studies",
        description:
            "Deep dives into real products we have designed, built and launched - the problem, the architecture, and what changed after launch.",
    },
    insights: {
        title: "Insights",
        description:
            "Why software projects succeed or fail - ownership, scope discipline, and the compounding cost of decisions that looked cheap early.",
    },
    engineering: {
        title: "Engineering Guides",
        description:
            "The technical corner - how we architect, build and ship production systems, written for engineers who want the detail not the summary.",
    },
}

export function generateStaticParams() {
    return BLOG_CATEGORY_KEYS.map((topic) => ({ topic }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ topic: string }>
}): Promise<Metadata> {
    const { topic } = await params
    if (!isBlogCategory(topic)) return {}

    const meta = TOPIC_META[topic]
    const url = `${SITE_URL}/blogs/topics/${topic}`

    return {
        title: `${meta.title} - ${SITE_NAME}`,
        description: meta.description,
        alternates: { canonical: url },
        openGraph: {
            title: `${meta.title} - ${SITE_NAME}`,
            description: meta.description,
            url,
            type: "website",
        },
    }
}

export default async function TopicHubPage({
    params,
}: {
    params: Promise<{ topic: string }>
}) {
    const { topic } = await params
    if (!isBlogCategory(topic)) notFound()

    const posts = getPostsByCategory(topic)
    const topicMeta = TOPIC_META[topic]
    const intro = BLOG_TOPIC_INTROS[topic]
    const otherTopics = BLOG_CATEGORY_KEYS.filter((key) => key !== topic)
    const url = `${SITE_URL}/blogs/topics/${topic}`

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blogs` },
            { "@type": "ListItem", position: 3, name: BLOG_CATEGORIES[topic], item: url },
        ],
    }

    const collectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: topicMeta.title,
        description: topicMeta.description,
        url,
        mainEntity: {
            "@type": "ItemList",
            itemListElement: posts.map((post, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `${SITE_URL}/blogs/${post.slug}`,
                name: post.title,
            })),
        },
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

            <div>
                <main className="relative overflow-x-clip isolate">
                    <PageBackground className="z-0" />
                    <PageHero
                        palette="rose"
                        eyebrow="Topic Hub"
                        title={
                            <>
                                {BLOG_CATEGORIES[topic]}{" "}
                                <span className="so-serif italic">Guides</span>
                            </>
                        }
                        description={topicMeta.description}
                        right={
                            <div className="flex items-center justify-center">
                                <TopicGlyph topic={topic} className="h-40 w-40 text-[rgba(245,239,224,0.55)]" />
                            </div>
                        }
                    />

                    <section className="so-section bg-so-surface">
                        <div className="so-container">
                            {/* Breadcrumb */}
                            <nav className="flex items-center gap-2 text-[13px] text-so-ink-4 mb-8">
                                <Link href="/" className="transition-colors duration-150">Home</Link>
                                <span className="text-so-line">/</span>
                                <Link href="/blogs" className="transition-colors duration-150">Blog</Link>
                                <span className="text-so-line">/</span>
                                <span className="text-so-ink-3">{BLOG_CATEGORIES[topic]}</span>
                            </nav>

                            <p className="max-w-[68ch] text-[15px] leading-[1.7] text-so-ink-2">
                                {intro}
                            </p>

                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {
                                    posts.map((post) => (
                                        <PostCard key={post.slug} slug={post.slug} meta={post} />
                                    ))
                                }
                            </div>
                        </div>
                    </section>

                    <section className="so-section bg-so-bg pt-0">
                        <div className="so-container">
                            <h2 className="text-[clamp(18px,2vw,24px)] so-serif text-so-ink tracking-[-0.015em] mb-1.5">
                                Explore other topics
                            </h2>
                            <p className="text-[14px] text-so-ink-2 mb-6">
                                Browse the rest of the Shunya engineering and product hubs.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {
                                    otherTopics.map((key) => (
                                        <Link
                                            key={key}
                                            href={`/blogs/topics/${key}`}
                                            className="group inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full so-card text-[13px] font-medium text-so-ink hover:shadow-md transition-all"
                                        >
                                            {BLOG_CATEGORIES[key]}
                                            <ArrowRight size={13} className="text-so-accent" />
                                        </Link>
                                    ))
                                }
                            </div>

                            <div className="mt-10">
                                <Link
                                    href="/blogs"
                                    className="inline-flex items-center gap-2 text-[14px] font-semibold text-so-accent transition-opacity duration-150 hover:opacity-80"
                                >
                                    <ArrowLeft size={14} /> Back to all articles
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    )
}
