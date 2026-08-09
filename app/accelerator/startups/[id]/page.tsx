"use client"

import { useParams, notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Users, Calendar, MapPin, Building, Briefcase, Globe, Mail, Phone } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageBackground } from "@/components/landing/page-background"
import { STARTUP_SUBMISSIONS } from "@/content/accelerator-startups"

function stageBadgeClass(stage: string) {
    switch (stage) {
        case "Scaling Up":
            return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
        case "MVP":
            return "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300"
        case "Prototype Ready":
            return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
        default:
            return "bg-so-surface-2 text-so-ink-2"
    }
}


export default function StartupDetailPage() {
    const params = useParams()
    const startupId = params.id as string

    const startup = STARTUP_SUBMISSIONS.find((s) => s.id === startupId)

    if (!startup) {
        return notFound()
    }

    return (
        <main className="relative overflow-x-clip isolate bg-so-bg min-h-screen">
            <PageBackground className="z-0" />
            <div className="relative z-[1] so-container py-[clamp(80px,10vw,120px)]">
                <div className="mb-8">
                    <Link
                        href="/accelerator/startups"
                        className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-so-ink-3 hover:text-so-ink transition-colors"
                    >
                        <ArrowLeft size={15} />
                        Back to Discover
                    </Link>
                </div>
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="so-card p-[clamp(24px,4vw,40px)]">
                            <div className="flex flex-col md:flex-row md:items-center gap-5 mb-8 pb-8 border-b border-so-line">
                                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-so-surface-2 text-so-ink shrink-0">
                                    <Users size={26} />
                                </div>
                                <div>
                                    <h1 className="text-[clamp(26px,4vw,38px)] font-semibold text-so-ink tracking-[-0.025em] mb-2">
                                        {startup.name}
                                    </h1>
                                    <p className="text-[16px] leading-[1.6] text-so-ink-2 mb-4">{startup.summary}</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="inline-flex items-center text-[11.5px] font-medium px-2.5 py-1 rounded-full border border-so-line text-so-ink-2">
                                            {startup.industry}
                                        </span>
                                        <span className={`inline-flex items-center text-[11.5px] font-medium px-2.5 py-1 rounded-full ${stageBadgeClass(startup.stage)}`}>
                                            {startup.stage}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Tabs defaultValue="overview">
                                <TabsList className="mb-6">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="team">Team</TabsTrigger>
                                    <TabsTrigger value="milestones">Milestones</TabsTrigger>
                                </TabsList>
                                <TabsContent value="overview" className="space-y-7">
                                    {[
                                        { label: "Description", value: startup.description },
                                        { label: "Problem", value: startup.problem },
                                        { label: "Solution", value: startup.solution },
                                        { label: "Traction", value: startup.traction },
                                        { label: "Business Model", value: startup.businessModel },
                                    ].map((block) => (
                                        <div key={block.label}>
                                            <span className="so-eyebrow">{block.label}</span>
                                            <p className="mt-2.5 text-[15px] leading-[1.7] text-so-ink-2">{block.value}</p>
                                        </div>
                                    ))}
                                </TabsContent>
                                <TabsContent value="team" className="space-y-5">
                                    <span className="so-eyebrow">Team Members</span>
                                    <div className="grid gap-3">
                                        {startup.team?.map((member, index) => (
                                            <div key={index} className="flex items-start gap-4 p-5 rounded-xl border border-so-line bg-so-surface">
                                                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-so-surface-2 text-so-ink shrink-0">
                                                    <Users size={18} />
                                                </div>
                                                <div>
                                                    <h3 className="text-[15px] font-semibold text-so-ink">{member.name}</h3>
                                                    <p className="text-[13px] text-emerald-700 dark:text-emerald-400 mb-1">{member.role}</p>
                                                    <p className="text-[13.5px] leading-[1.6] text-so-ink-2">{member.bio}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>
                                <TabsContent value="milestones" className="space-y-5">
                                    <span className="so-eyebrow">Company Milestones</span>
                                    <div className="relative border-l border-so-line pl-6 ml-2 space-y-6">
                                        {startup.milestones?.map((milestone, index) => (
                                            <div key={index} className="relative">
                                                <div className="absolute -left-[31px] mt-1 h-3 w-3 rounded-full bg-emerald-600 dark:bg-emerald-400 ring-4 ring-so-bg" />
                                                <p className="text-[12.5px] uppercase tracking-[0.06em] text-so-ink-3">{milestone.date}</p>
                                                <h3 className="text-[15px] font-medium text-so-ink">{milestone.title}</h3>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                    <div className="space-y-5">
                        <div className="so-card p-7">
                            <span className="so-eyebrow">Company Info</span>
                            <div className="mt-5 space-y-4">
                                {[
                                    { icon: Calendar, label: "Founded", value: String(startup.foundedYear) },
                                    { icon: MapPin, label: "Location", value: startup.location },
                                    { icon: Users, label: "Team Size", value: `${startup.teamSize} employees` },
                                    { icon: Building, label: "Founder", value: startup.founder },
                                    { icon: Briefcase, label: "Funding", value: startup.funding },
                                ].map((item) => {
                                    const Icon = item.icon
                                    return (
                                        <div key={item.label} className="flex items-start gap-3">
                                            <Icon size={16} className="text-so-ink-3 mt-0.5 shrink-0" />
                                            <div>
                                                <p className="text-[12px] uppercase tracking-[0.06em] text-so-ink-3">{item.label}</p>
                                                <p className="text-[14px] text-so-ink">{item.value}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                                {startup.website && (
                                    <div className="flex items-start gap-3">
                                        <Globe size={16} className="text-so-ink-3 mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-[12px] uppercase tracking-[0.06em] text-so-ink-3">Website</p>
                                            <a href={startup.website} className="text-[14px] text-emerald-700 dark:text-emerald-400 hover:underline">
                                                Visit Website
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="so-card p-7">
                            <span className="so-eyebrow">Contact Information</span>
                            <div className="mt-5 space-y-4">
                                {startup.contact?.email && (
                                    <div className="flex items-start gap-3">
                                        <Mail size={16} className="text-so-ink-3 mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-[12px] uppercase tracking-[0.06em] text-so-ink-3">Email</p>
                                            <a href={`mailto:${startup.contact.email}`} className="text-[14px] text-emerald-700 dark:text-emerald-400 hover:underline break-all">
                                                {startup.contact.email}
                                            </a>
                                        </div>
                                    </div>
                                )}
                                {startup.contact?.phone && (
                                    <div className="flex items-start gap-3">
                                        <Phone size={16} className="text-so-ink-3 mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-[12px] uppercase tracking-[0.06em] text-so-ink-3">Phone</p>
                                            <a href={`tel:${startup.contact.phone}`} className="text-[14px] text-emerald-700 dark:text-emerald-400 hover:underline">
                                                {startup.contact.phone}
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <Link href="/contactus" className="so-btn so-btn-primary w-full justify-center">
                            Connect with Founder
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

