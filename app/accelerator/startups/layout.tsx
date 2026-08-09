import type { Metadata } from "next"
import { pageMeta } from "@/lib/seo"

export const metadata: Metadata = pageMeta({
    title: "Accelerator Startups - ShunyaHQ",
    description:
        "The founders and early-stage teams building with the ShunyaHQ accelerator, what they are working on, and how far each product has come so far.",
    path: "/accelerator/startups",
    // Next does not inherit the root opengraph-image into this segment; name it explicitly.
    ogImage: "/opengraph-image",
})

export default function AcceleratorStartupsLayout({ children }: { children: React.ReactNode }) {
    return children
}
