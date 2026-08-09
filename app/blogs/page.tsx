import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BLOG_CATEGORIES, BLOG_CATEGORY_KEYS, getPublishedPosts } from "@/content/blog"
import { SITE_URL } from "@/lib/site"
import { PageHero } from "@/components/landing/page-hero"
import { PageBackground } from "@/components/landing/page-background"
import { PostCard, CATEGORY_BADGE } from "./_components/post-card"
import { pageMeta } from "@/lib/seo"
import { TopicGlyph } from "@/components/blog/topic-glyph"

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blogs` },
    ],
}

export const metadata: Metadata = pageMeta({
    title: "Web Development Guides & Case Studies",
    description:
        "Practical guides on planning, budgeting and building custom web applications - plus engineering deep dives and case studies from products we have shipped.",
    path: "/blogs",
    // Next does not inherit the root opengraph-image into this segment, so it is named
    // explicitly - without it this page ships with no og:image at all.
    ogImage: "/opengraph-image",
})

export default function BlogPage() {
    // Published only - the ledger in content/active-posts.ts is the gate.
    const posts = getPublishedPosts().map((p) => [p.slug, p] as const)

    const featured = posts[0]
    const rest = posts.slice(1)

    const totalPosts = posts.length
    const avgReadTime = Math.round(
        posts.reduce((sum, [, meta]) => sum + meta.readingTime, 0) / totalPosts,
    )
    const topicCount = new Set(posts.map(([, meta]) => meta.category)).size

    const statsCard = (
        <div className="bg-[rgba(245,239,224,0.04)] border border-[rgba(245,239,224,0.1)] rounded-2xl p-[clamp(24px,3vw,36px)] grid grid-cols-3 gap-4">
            {
                [
                    { value: totalPosts, label: "Articles" },
                    { value: `${avgReadTime} min`, label: "Avg read time" },
                    { value: topicCount, label: "Topics" },
                ].map(({ value, label }) => (
                    <div key={label} className="text-center">
                        <div className="text-[clamp(28px,3.5vw,42px)] font-semibold text-[#C9A961] tracking-[-0.03em] leading-none">
                            {value}
                        </div>
                        <div className="text-[clamp(11px,0.9vw,13px)] mt-1.5 text-[rgba(245,239,224,0.45)] tracking-[0.02em]">
                            {label}
                        </div>
                    </div>
                ))
            }
        </div>
    )

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <div>
                <main className="relative overflow-x-clip isolate">
                    <PageBackground className="z-0" />
                    <PageHero
                        palette="rose"
                        eyebrow="Engineering & Product"
                        title={
                            <>
                                The Shunya{" "}
                                <span className="so-serif italic">Blog</span>
                            </>
                        }
                        description="How we architect, build, and ship production software - engineering deep dives, AI guides, product thinking, and real case studies from the team that owns the whole stack."
                        right={statsCard}
                    />

                    {
                        featured && (
                            <section className="pt-[clamp(36px,4.5vw,56px)] pb-[clamp(20px,2.5vw,28px)]">
                                <div className="so-container">
                                    <Link
                                        href={`/blogs/${featured[0]}`}
                                        className="group block rounded-2xl overflow-hidden so-card hover:shadow-lg transition-all"
                                    >
                                        <div className="grid grid-cols-1 lg:grid-cols-2">
                                            <div
                                                className="aspect-video lg:aspect-auto lg:min-h-[280px] bg-cover bg-center bg-so-accent-soft"
                                                style={{
                                                    backgroundImage: `url(/blogs/${featured[0]}/opengraph-image)`,
                                                }}
                                            />
                                            <div className="p-8 lg:p-10 flex flex-col justify-center">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span
                                                        className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${CATEGORY_BADGE}`}
                                                    >
                                                        {BLOG_CATEGORIES[featured[1].category]}
                                                    </span>
                                                    <span className="text-[12px] text-so-ink-3">
                                                        {featured[1].readingTime} min read
                                                    </span>
                                                </div>
                                                <h2 className="so-serif text-balance group-hover:opacity-80 transition-opacity text-[clamp(20px,2.5vw,28px)] text-so-ink tracking-[-0.015em]">
                                                    {featured[1].title}
                                                </h2>
                                                <p className="mt-3 text-[14px] leading-relaxed line-clamp-3 text-so-ink-2">
                                                    {featured[1].description}
                                                </p>
                                                <div className="mt-5 flex items-center gap-2 text-[13px] font-medium text-so-accent">
                                                    Read article <ArrowRight size={13} />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </section>
                        )
                    }

                    <section className="pb-[clamp(20px,2.5vw,28px)]">
                        <div className="so-container">
                            <h2 className="text-[clamp(18px,2vw,24px)] so-serif text-so-ink tracking-[-0.015em] mb-1.5">
                                Browse by topic
                            </h2>
                            <p className="text-[14px] text-so-ink-2 mb-6">
                                Jump into a topic hub for deeper coverage of a single area.
                            </p>
                            {/* Each hub carries a drawn glyph so six similarly-worded labels read as
                                six distinct places rather than a row of pills. */}
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                                {
                                    BLOG_CATEGORY_KEYS.map((key) => (
                                        <Link
                                            key={key}
                                            href={`/blogs/topics/${key}`}
                                            className="group so-card flex flex-col items-start gap-3 p-4 transition-all hover:shadow-md"
                                        >
                                            <TopicGlyph topic={key} className="h-9 w-9 text-so-ink" />
                                            <span className="text-[13px] font-medium leading-snug text-so-ink">
                                                {BLOG_CATEGORIES[key]}
                                            </span>
                                            <ArrowRight size={13} className="mt-auto text-so-accent transition-transform group-hover:translate-x-0.5" />
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </section>

                    <section className="pb-[clamp(56px,7vw,88px)]">
                        <div className="so-container">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {
                                    rest.map(([slug, meta]) => (
                                        <PostCard key={slug} slug={slug} meta={meta} />
                                    ))
                                }
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    )
}
