import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BLOG_POSTS, BLOG_CATEGORIES, BLOG_CATEGORY_KEYS } from "@/content/blog"
import { SITE_URL, SITE_NAME } from "@/lib/site"
import { PageHero } from "@/components/landing/page-hero"
import { PageBackground } from "@/components/landing/page-background"
import { formatBlogDate } from "./_components/format-date"

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blogs` },
    ],
}

export const metadata: Metadata = {
    title: `Engineering & Product Blog - ${SITE_NAME}`,
    description:
        "How Shunya architects, builds, and ships production software - engineering deep dives, AI guides, product thinking, and real case studies from the team that owns the whole stack.",
    alternates: { canonical: `${SITE_URL}/blogs` },
    openGraph: {
        title: `Engineering & Product Blog - ${SITE_NAME}`,
        description:
            "Engineering deep dives, AI guides, product thinking, and real case studies from the Shunya team.",
        url: `${SITE_URL}/blogs`,
        type: "website",
    },
}

const CATEGORY_BADGE =
    "bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700"

export default function BlogPage() {
    const posts = Object.entries(BLOG_POSTS).sort(
        (a, b) => new Date(b[1].datePublished).getTime() - new Date(a[1].datePublished).getTime(),
    )

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
                                                    backgroundImage: `url(${featured[1].ogImage})`,
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
                            <div className="flex flex-wrap gap-3">
                                {
                                    BLOG_CATEGORY_KEYS.map((key) => (
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
                        </div>
                    </section>

                    <section className="pb-[clamp(56px,7vw,88px)]">
                        <div className="so-container">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {
                                    rest.map(([slug, meta]) => (
                                        <Link
                                            key={slug}
                                            href={`/blogs/${slug}`}
                                            className="group so-card overflow-hidden flex flex-col hover:shadow-md transition-all"
                                        >
                                            <div
                                                className="aspect-[16/9] bg-cover bg-center bg-so-accent-soft"
                                                style={{ backgroundImage: `url(${meta.ogImage})` }}
                                            />
                                            <div className="p-5 flex flex-col flex-1">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span
                                                        className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${CATEGORY_BADGE}`}
                                                    >
                                                        {BLOG_CATEGORIES[meta.category]}
                                                    </span>
                                                    <span className="text-[11px] text-so-ink-3">
                                                        {meta.readingTime} min
                                                    </span>
                                                </div>
                                                <h2 className="text-[16px] font-semibold leading-snug mb-2 group-hover:opacity-80 transition-opacity text-so-ink">
                                                    {meta.title}
                                                </h2>
                                                <p className="text-[13px] leading-relaxed line-clamp-2 flex-1 text-so-ink-2">
                                                    {meta.description}
                                                </p>
                                                <time
                                                    dateTime={meta.datePublished}
                                                    className="mt-4 text-[11.5px] so-mono text-so-ink-4"
                                                >
                                                    {formatBlogDate(meta.datePublished)}
                                                </time>
                                            </div>
                                        </Link>
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
