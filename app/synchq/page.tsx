import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { pageMeta } from "@/lib/seo"
import { PageHero } from "@/components/landing/page-hero"
import { PageBackground } from "@/components/landing/page-background"
import { PageFAQ } from "@/components/landing/page-faq"
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-jsonld"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/landing/animations"
import { SYNCHQ_FAQS, PILLARS, MODULES, LOOP, PROOF } from "./_components/synchq-content"
import { SceneFrame, IntakeScene, DeliveryScene, PortalScene, MoneyScene } from "./_components/synchq-scenes"

export const metadata: Metadata = pageMeta({
    title: "SyncHQ - The Operating System for Agencies",
    description:
        "Client intake, delivery, the client portal and billing in one system. SyncHQ is the platform we built to run our own studio - now open to yours.",
    path: "/synchq",
    keywords: [
        "agency management software",
        "client intake software",
        "agency project management",
        "white label client portal",
        "AI client intake",
    ],
})

const SCENES = { intake: IntakeScene, delivery: DeliveryScene, portal: PortalScene, money: MoneyScene } as const

export default function SyncHQPage() {
    return (
        <main className="relative isolate overflow-x-clip">
            <PageBackground className="z-0" />
            <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "SyncHQ", path: "/synchq" }]} />

            <PageHero
                palette="jade"
                eyebrow="Our own product"
                title={
                    <>
                        SyncHQ. The calm{" "}
                        <span className="text-white/45">operating system</span> for agencies.
                    </>
                }
                description="Client intake, project delivery, the client portal and the invoicing all in one place. We built it to run Shunya, we run Shunya on it every day, and it is now open to other studios."
            />

            {/* ── Why it exists ─────────────────────────────────────────────── */}
            <section className="so-section relative z-[1]">
                <div className="so-container">
                    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
                        <FadeIn>
                            <p className="so-eyebrow">Why it exists</p>
                            <h2 className="so-serif mt-3 text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.08] tracking-[-0.03em] text-so-ink">
                                We were running a studio out of six tools that did not know about each other.
                            </h2>
                        </FadeIn>
                        <FadeIn delay={0.08}>
                            <div className="space-y-4 text-[15.5px] leading-relaxed text-so-ink-2">
                                <p>
                                    A board for tasks. A spreadsheet for time. A folder for briefs. A separate
                                    tool for invoices. A chat thread per client. Every Friday somebody spent an
                                    afternoon copying numbers between them so a status update could be written by
                                    hand.
                                </p>
                                <p>
                                    None of those tools was bad. The cost was in the gaps between them - the hours
                                    spent moving the same fact from one place to another, and the decisions made
                                    on a figure that was already three days old.
                                </p>
                                <p className="font-medium text-so-ink">
                                    SyncHQ is what we built instead. One system where the intake becomes the scope,
                                    the scope becomes the tasks, the tasks become the timesheet, and the timesheet
                                    becomes the invoice - without anyone retyping anything.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ── The four pillars, each with a scene ───────────────────────── */}
            <section className="so-section relative z-[1] border-t border-so-line">
                <div className="so-container">
                    <FadeIn>
                        <p className="so-eyebrow">End to end</p>
                        <h2 className="so-serif mt-3 max-w-3xl text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.08] tracking-[-0.03em] text-so-ink">
                            Four things a studio does over and over. SyncHQ joins them up.
                        </h2>
                    </FadeIn>

                    <div className="mt-14 space-y-16 lg:space-y-24">
                        {PILLARS.map((p, i) => {
                            const Scene = SCENES[p.scene]
                            const flip = i % 2 === 1
                            return (
                                <div
                                    key={p.id}
                                    className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
                                >
                                    <FadeIn className={flip ? "lg:order-2" : ""}>
                                        <span className="so-mono text-[12px] font-semibold tracking-[0.14em] text-so-ink-4">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <h3 className="mt-3 text-[clamp(21px,2.4vw,28px)] font-bold leading-tight tracking-[-0.02em] text-so-ink">
                                            {p.title}
                                        </h3>
                                        <p className="mt-3 text-[15.5px] leading-relaxed text-so-ink-2">{p.body}</p>
                                        <ul className="mt-5 space-y-2.5">
                                            {p.points.map((pt) => (
                                                <li key={pt} className="flex items-start gap-2.5 text-[14.5px] leading-snug text-so-ink-2">
                                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-so-ok" strokeWidth={2.4} />
                                                    {pt}
                                                </li>
                                            ))}
                                        </ul>
                                    </FadeIn>

                                    <SceneFrame className={flip ? "lg:order-1" : ""}>
                                        <div className="so-card overflow-hidden p-4 sm:p-6">
                                            <div className="aspect-[420/200] w-full">
                                                <Scene />
                                            </div>
                                        </div>
                                    </SceneFrame>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ── The loop ──────────────────────────────────────────────────── */}
            <section className="so-section relative z-[1] border-t border-so-line">
                <div className="so-container">
                    <FadeIn>
                        <p className="so-eyebrow">The loop</p>
                        <h2 className="so-serif mt-3 max-w-2xl text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.08] tracking-[-0.03em] text-so-ink">
                            One record, followed from the first email to the paid invoice.
                        </h2>
                        <p className="so-lede mt-4 max-w-2xl">
                            Nothing here is re-entered. Each step reads what the last one produced, which is the
                            whole reason the numbers agree with each other.
                        </p>
                    </FadeIn>

                    <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {LOOP.map((s, i) => (
                            <StaggerItem key={s.title}>
                                <div className="so-card h-full p-6">
                                    <div className="flex items-center gap-3">
                                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-so-ink text-[12px] font-bold tabular-nums text-so-bg">
                                            {i + 1}
                                        </span>
                                        <h3 className="text-[16px] font-semibold text-so-ink">{s.title}</h3>
                                    </div>
                                    <p className="mt-3 text-[14.5px] leading-relaxed text-so-ink-3">{s.body}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* ── Everything in it ──────────────────────────────────────────── */}
            <section className="so-section relative z-[1] border-t border-so-line">
                <div className="so-container">
                    <FadeIn>
                        <p className="so-eyebrow">What is in it</p>
                        <h2 className="so-serif mt-3 max-w-2xl text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.08] tracking-[-0.03em] text-so-ink">
                            The whole surface, in plain terms.
                        </h2>
                    </FadeIn>
                    <StaggerContainer className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                        {MODULES.map((m) => (
                            <StaggerItem key={m.title}>
                                <h3 className="text-[15px] font-semibold text-so-ink">{m.title}</h3>
                                <p className="mt-1.5 text-[14px] leading-relaxed text-so-ink-3">{m.body}</p>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* ── Proof ─────────────────────────────────────────────────────── */}
            <section className="so-section relative z-[1] border-t border-so-line">
                <div className="so-container">
                    <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
                        <FadeIn>
                            <p className="so-eyebrow">We use it ourselves</p>
                            <h2 className="so-serif mt-3 text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.08] tracking-[-0.03em] text-so-ink">
                                Shunya runs on SyncHQ. Every project on this site was delivered through it.
                            </h2>
                            <p className="mt-4 text-[15.5px] leading-relaxed text-so-ink-2">
                                That is the only endorsement we can honestly give a product this young, and it is
                                the one we would want. When something in it is annoying, we feel it on a Tuesday
                                like everybody else, and it gets fixed.
                            </p>
                            <div className="mt-7 flex flex-wrap gap-3">
                                <Link href="/contactus" className="so-btn so-btn-primary">
                                    Ask for access <ArrowRight size={14} />
                                </Link>
                                <Link href="/projects/synchq" className="so-btn so-btn-ghost">
                                    Read how we built it
                                </Link>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.08}>
                            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--so-radius)] border border-so-line bg-so-line">
                                {PROOF.map((s) => (
                                    <div key={s.label} className="bg-so-surface p-6">
                                        <dt className="so-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-so-ink-4">
                                            {s.label}
                                        </dt>
                                        <dd className="mt-2 text-[clamp(22px,2.6vw,30px)] font-bold leading-none tracking-[-0.02em] text-so-ink">
                                            {s.value}
                                        </dd>
                                        <p className="mt-2 text-[13px] leading-snug text-so-ink-3">{s.note}</p>
                                    </div>
                                ))}
                            </dl>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ── Honest limits ─────────────────────────────────────────────── */}
            <section className="so-section relative z-[1] border-t border-so-line">
                <div className="so-container">
                    <FadeIn>
                        <div className="so-card mx-auto max-w-3xl p-8 sm:p-10">
                            <p className="so-eyebrow">Where it is not right</p>
                            <h2 className="mt-3 text-[clamp(20px,2.3vw,26px)] font-bold leading-tight tracking-[-0.02em] text-so-ink">
                                It is built for studios that deliver client work. If that is not you, it will
                                feel like the wrong shape.
                            </h2>
                            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-so-ink-2">
                                <li>
                                    <strong className="font-semibold text-so-ink">A product team with no clients</strong>{" "}
                                    will not use half of it. The intake, the portal and the invoicing all assume
                                    somebody on the other side is paying you.
                                </li>
                                <li>
                                    <strong className="font-semibold text-so-ink">A team of one or two</strong> can
                                    probably hold all of this in their head, and a lighter tool will annoy them less.
                                </li>
                                <li>
                                    <strong className="font-semibold text-so-ink">An agency past a hundred people</strong>{" "}
                                    has procurement requirements we do not meet yet. Ask, and we will tell you
                                    honestly whether we are there.
                                </li>
                            </ul>
                            <p className="mt-6 text-[14.5px] leading-relaxed text-so-ink-3">
                                It is in active use and still early. We onboard studios in small batches so that the
                                next structural mistake gets found by eight teams rather than eight hundred.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <PageFAQ
                items={SYNCHQ_FAQS}
                eyebrow="SyncHQ"
                title="Questions"
                titleAccent="worth asking"
                description="The things studios ask before they move their operations into something new."
            />
        </main>
    )
}
