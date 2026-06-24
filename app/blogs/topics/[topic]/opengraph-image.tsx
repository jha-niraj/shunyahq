import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'
import { BLOG_CATEGORIES, BLOG_CATEGORY_KEYS, type BlogCategory } from '@/content/blog'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
    return BLOG_CATEGORY_KEYS.map((topic) => ({ topic }))
}

function isBlogCategory(value: string): value is BlogCategory {
    return (BLOG_CATEGORY_KEYS as string[]).includes(value)
}

// Dynamic branded OG image per topic hub, rendered via ImageResponse (Satori).
export default async function Image({
    params,
}: {
    params: Promise<{ topic: string }>
}) {
    const { topic } = await params

    if (!isBlogCategory(topic)) {
        return ogImage({
            eyebrow: 'Shunya Blog',
            title: 'Engineering & Product',
        })
    }

    return ogImage({
        eyebrow: 'Shunya Blog',
        title: `${BLOG_CATEGORIES[topic]} Guides`,
    })
}
