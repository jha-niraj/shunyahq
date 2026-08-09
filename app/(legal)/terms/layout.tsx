import type { Metadata } from "next"
import { pageMeta } from "@/lib/seo"

export const metadata: Metadata = pageMeta({
    title: "Terms of Service - ShunyaHQ",
    description:
        "The terms that govern engagements with ShunyaHQ - scope, deliverables, payment, intellectual property ownership, and how either side can end a project.",
    path: "/terms",
    // Next does not inherit the root opengraph-image into this segment, so it is named
    // explicitly - without it this page ships with no og:image at all.
    ogImage: "/opengraph-image",
})

export default function TermsLayout({ children }: { children: React.ReactNode }) {
    return children
}
