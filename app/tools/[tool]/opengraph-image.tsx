import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og"
import { PRODUCT_TOOLS, getToolBySlug } from "../tools-meta"

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = "Shunya - Tools"

export function generateStaticParams() {
    return PRODUCT_TOOLS.filter((t) => !t.href).map((t) => ({ tool: t.slug }))
}

export default async function Image({ params }: { params: Promise<{ tool: string }> }) {
    const { tool: slug } = await params
    const tool = getToolBySlug(slug)
    return ogImage({
        eyebrow: tool ? `${tool.eyebrow} · ${tool.status}` : "Tools",
        title: tool ? tool.heroTitle : "Tools by Shunya",
    })
}
