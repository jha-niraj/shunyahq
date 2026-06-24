import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og"
import { USE_CASES, USE_CASE_SLUGS, type UseCaseSlug } from "@/content/use-cases"

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
    return USE_CASE_SLUGS.map((audience) => ({ audience }))
}

function isUseCaseSlug(value: string): value is UseCaseSlug {
    return (USE_CASE_SLUGS as string[]).includes(value)
}

export default async function Image({
    params,
}: {
    params: Promise<{ audience: string }>
}) {
    const { audience } = await params

    if (!isUseCaseSlug(audience)) {
        return ogImage({
            eyebrow: "Shunya Solutions",
            title: "Engineering intelligence for the digital age",
        })
    }

    const useCase = USE_CASES[audience]
    return ogImage({
        eyebrow: useCase.eyebrow,
        title: `${useCase.heroTitle} ${useCase.heroEmphasis}`,
    })
}
