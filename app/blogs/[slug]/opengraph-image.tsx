import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'
import { BLOG_POSTS, BLOG_CATEGORIES } from '@/content/blog'
import { AUTHORS } from '@/content/authors'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
    return Object.keys(BLOG_POSTS).map((slug) => ({ slug }))
}

// Dynamic branded OG image per blog post, rendered via ImageResponse (Satori).
// Next auto-uses this file-based image for the post's og:image and twitter:image.
export default async function Image({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const meta = BLOG_POSTS[slug]

    if (!meta) {
        return ogImage({
            eyebrow: 'Shunya Blog',
            title: 'Engineering & Product',
        })
    }

    return ogImage({
        eyebrow: BLOG_CATEGORIES[meta.category],
        title: meta.title,
        footer: AUTHORS[meta.author].name,
    })
}
