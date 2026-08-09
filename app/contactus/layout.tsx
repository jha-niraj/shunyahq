import type { Metadata } from "next"
import { pageMeta } from "@/lib/seo"

export const metadata: Metadata = pageMeta({
    title: "Contact ShunyaHQ - Start Your Web Project",
    description:
        "Tell us what you are building. We reply within one business day with a scoped estimate, a realistic timeline, and the questions we would need answered first.",
    path: "/contactus",
    keywords: [
        "hire web development agency",
        "custom web application quote",
        "contact web engineering studio",
    ],
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children
}
