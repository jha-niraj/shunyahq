import type { Metadata } from "next"
import { pageMeta } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-jsonld"

export const metadata: Metadata = pageMeta({
    title: "Our Work - Web Application Case Studies",
    description:
        "Real products we designed, built and shipped - the problem, the architecture, and what changed after launch. SaaS platforms, dashboards, and web apps.",
    path: "/projects",
    keywords: [
        "web development case studies",
        "SaaS platform case study",
        "custom web application portfolio",
        "web app projects",
    ],
})

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* /blogs, /solutions and /tools all emit one; /projects was the odd listing out. */}
            <BreadcrumbJsonLd items={[{ name: "Home", path: "" }, { name: "Work", path: "/projects" }]} />
            {children}
        </>
    )
}
