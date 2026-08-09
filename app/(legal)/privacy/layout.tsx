import type { Metadata } from "next"
import { pageMeta } from "@/lib/seo"

export const metadata: Metadata = pageMeta({
    title: "Privacy Policy - ShunyaHQ",
    description:
        "How ShunyaHQ collects, uses, stores and protects your data - what we record when you contact us, how long we keep it, and the rights you have over it.",
    path: "/privacy",
    // Next does not inherit the root opengraph-image into this segment, so it is named
    // explicitly - without it this page ships with no og:image at all.
    ogImage: "/opengraph-image",
})

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
    return children
}
