"use client"

import { StreamingChat, VouchingScan, ReportDraft } from "./illustrations"

const CAPABILITIES = [
    {
        demo: <StreamingChat />,
        title: "AI-assisted engineering",
        body: "We pair modern stacks with AI tooling - codegen, review, and agents - to ship production features faster without trading away code quality.",
    },
    {
        demo: <VouchingScan />,
        title: "Automated CI/CD pipelines",
        body: "Every commit runs through automated tests, builds, and deploys. Bi-weekly releases to staging mean you always see real working software.",
    },
    {
        demo: <ReportDraft />,
        title: "Real-time client dashboards",
        body: "Live visibility into sprints, deployments, and progress - view-only portals that turn status updates into software you can actually click through.",
    },
]

export function CapabilitiesGrid() {
    return (
        <section className="py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <div data-rv="" data-rv-group=""
                    className="mb-16 text-center"
                >
                    <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
                        What we build with
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
                        Full-Spectrum{" "}
                        <span className="text-neutral-400 dark:text-neutral-500">Engineering.</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-base text-neutral-500 dark:text-neutral-400">
                        One team owning the whole stack - from AI-assisted development to automated pipelines and live client visibility. The same engineers design, build, and ship it.
                    </p>
                </div>

                <div data-rv="" data-rv-group=""
                    className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-neutral-200 dark:border-white/10 bg-neutral-200 dark:bg-white/10 md:grid-cols-3"
                >
                    {
                        CAPABILITIES.map((c) => (
                            <div
                                key={c.title}
                                className="flex flex-col bg-white p-8 dark:bg-neutral-950"
                            >
                                <div className="mb-8 flex h-[200px] items-center justify-center">
                                    {c.demo}
                                </div>
                                <h3 className="mb-2 text-[18px] font-bold leading-snug text-neutral-900 dark:text-white">
                                    {c.title}
                                </h3>
                                <p className="text-[14px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                                    {c.body}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
