import type { Metadata } from "next"
import { pageMeta } from "@/lib/seo"

export const metadata: Metadata = pageMeta({
    title: "About ShunyaHQ - A Web Engineering Studio",
    description:
        "Who we are and how we work. A small senior team that owns your web product end to end - architecture, build, launch, and the months of support after it.",
    path: "/aboutus",
    keywords: [
        "web engineering studio",
        "web development agency",
        "custom software team",
        "about ShunyaHQ",
    ],
})

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children
}
