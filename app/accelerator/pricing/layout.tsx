import type { Metadata } from "next"
import { pageMeta } from "@/lib/seo"

export const metadata: Metadata = pageMeta({
    title: "Accelerator Pricing - ShunyaHQ",
    description:
        "What the ShunyaHQ accelerator costs and what each tier includes - engineering hours, product review, and the support that gets a first version shipped.",
    path: "/accelerator/pricing",
    // Next does not inherit the root opengraph-image into this segment; name it explicitly.
    ogImage: "/opengraph-image",
})

export default function AcceleratorPricingLayout({ children }: { children: React.ReactNode }) {
    return children
}
