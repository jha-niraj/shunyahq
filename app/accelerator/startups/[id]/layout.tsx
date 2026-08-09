import type { Metadata } from "next"
import { pageMeta } from "@/lib/seo"
import { STARTUP_SUBMISSIONS } from "@/content/accelerator-startups"

/**
 * Per-startup metadata.
 *
 * Without this every /accelerator/startups/[id] page inherited the listing layout's metadata: ten
 * pages sharing one title, one description, and - worst of all - a canonical pointing at the
 * LISTING page. A canonical that names a different URL is an instruction not to index the page it
 * sits on, so the whole set was telling Google to drop it.
 *
 * The detail page itself is a client component (tabs, `useParams`), so the metadata has to live in
 * a route layout, which still receives the dynamic params.
 */
export async function generateMetadata(
    { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
    const { id } = await params
    const startup = STARTUP_SUBMISSIONS.find((s) => s.id === id)

    if (!startup) {
        // Unknown id renders the not-found boundary; keep it out of the index.
        return pageMeta({
            title: "Startup Not Found - ShunyaHQ Accelerator",
            description:
                "The accelerator startup you are looking for does not exist or has been removed. Browse the current portfolio instead.",
            path: `/accelerator/startups/${id}`,
            noindex: true,
        })
    }

    // The summary alone is 70-90 chars - under the 110 floor for a useful SERP snippet. Extend it
    // with the record's own facts so each description stays unique and specific rather than padded
    // with boilerplate, then clamp the long end.
    const tail = [startup.industry, startup.stage, startup.location]
        .filter(Boolean)
        .join(" · ")
    const base = `${startup.name} - ${startup.summary}.${tail ? ` ${tail}.` : ""} In the ShunyaHQ accelerator portfolio.`
    const description = base.length > 157 ? `${base.slice(0, 154).trimEnd()}...` : base

    return pageMeta({
        title: `${startup.name} - ShunyaHQ Accelerator`.slice(0, 60),
        description,
        path: `/accelerator/startups/${id}`,
        ogImage: "/opengraph-image",
    })
}

export default function StartupDetailLayout({ children }: { children: React.ReactNode }) {
    return children
}
