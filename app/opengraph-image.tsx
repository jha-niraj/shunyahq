import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og"

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = "Shunya - Software Engineering Studio"

export default function Image() {
    return ogImage({
        eyebrow: "Software Engineering Studio",
        title: "We build the future. From concept to production, shipped.",
    })
}
