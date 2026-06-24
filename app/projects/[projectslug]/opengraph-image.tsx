import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og"
import { PROJECTS, getProjectBySlug } from "@/content/projects"

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
    return PROJECTS.map((p) => ({ projectslug: p.slug }))
}

export default async function Image({
    params,
}: {
    params: Promise<{ projectslug: string }>
}) {
    const { projectslug } = await params
    const project = getProjectBySlug(projectslug)

    if (!project) {
        return ogImage({
            eyebrow: "Case Study",
            title: "Selected works, shipped.",
            footer: "Shunya · Projects",
        })
    }

    return ogImage({
        eyebrow: `Case Study · ${project.industry}`,
        title: `${project.title} - ${project.tagline}`,
        footer: `Shipped in ${project.timeline} · ${project.year}`,
    })
}
