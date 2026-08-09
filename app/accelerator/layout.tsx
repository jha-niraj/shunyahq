import type { Metadata } from "next"
import { pageMeta } from "@/lib/seo"

export const metadata: Metadata = pageMeta({
    title: "ShunyaHQ Accelerator - Build With Us",
    description:
        "Our accelerator for early-stage founders: engineering support, product review, and a route to a shipped web product without hiring a full team first.",
    path: "/accelerator",
    // Next does not inherit the root opengraph-image into this segment; name it explicitly.
    ogImage: "/opengraph-image",
    keywords: ["startup accelerator", "founder engineering support", "MVP accelerator"],
})

export default function AcceleratorLayout({ children }: { children: React.ReactNode }) {
    return children
}
