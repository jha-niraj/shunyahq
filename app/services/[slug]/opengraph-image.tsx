import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og"
import { SERVICE_SLUGS, getServiceBySlug } from "@/content/services"

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
    return SERVICE_SLUGS.map((slug) => ({ slug }))
}

export default async function Image({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const service = getServiceBySlug(slug)

    if (!service) {
        return ogImage({
            eyebrow: "Shunya Services",
            title: "Engineering intelligence for the digital age",
        })
    }

    return ogImage({
        eyebrow: service.eyebrow,
        title: service.heroTitle,
    })
}
