"use client"

import {
    Linkedin, Twitter, Code2, Users, Globe, Zap, ArrowRight, ArrowUpRight
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"
import { PageHero } from "@/components/landing/page-hero"
import { PageBackground } from "@/components/landing/page-background"
import { PageFAQ } from "@/components/landing/page-faq"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/landing/animations"

const FAQS = [
    {
        q: "What kind of work does Shunya Tech take on?",
        a: "We architect and ship digital products end to end - web platforms, mobile apps, AI features, and the cloud infrastructure behind them. We work best on ambitious builds where engineering quality actually matters, not throwaway sites.",
    },
    {
        q: "Who will I actually be working with?",
        a: "The people who build your product. You talk to engineers and product thinkers directly, not a layer of account managers relaying messages. Our founders stay close to the work.",
    },
    {
        q: "How does an engagement start?",
        a: "It starts with a conversation. We pressure-test your idea, agree on scope and the right stack, and give you an honest read on timeline before any commitment. We'd rather scope it right than oversell it.",
    },
    {
        q: "What does your engagement model look like?",
        a: "We treat clients as partners. Most work runs as a focused project or an ongoing build relationship with a clear source of truth, regular shipping, and transparent progress - so you always know where things stand.",
    },
    {
        q: "Do you only build for clients, or your own products too?",
        a: "Both. We build and run our own products alongside client work, which keeps our engineering culture sharp and means the standards we hold ourselves to are the same ones we bring to your build.",
    },
    {
        q: "How do I get started?",
        a: "Reach out through the contact page or book a strategy call. Tell us what you want to build and we'll take it from there - no pressure, no sales script.",
    },
]

const values = [
    {
        icon: <Zap className="w-5 h-5" />,
        header: "01_INNOVATION",
        title: "Technical Velocity",
        description: "We don't just write code; we engineer velocity. Pushing boundaries with bleeding-edge stacks to solve complex problems.",
    },
    {
        icon: <Users className="w-5 h-5" />,
        header: "02_SYNERGY",
        title: "Collective Intelligence",
        description: "A hive-mind approach to development. Open communication loops between engineering, design, and product.",
    },
    {
        icon: <Code2 className="w-5 h-5" />,
        header: "03_PRECISION",
        title: "Pixel Perfection",
        description: "Zero compromise on quality. We obsess over the micro-interactions that define the macro experience.",
    },
    {
        icon: <Globe className="w-5 h-5" />,
        header: "04_IMPACT",
        title: "Global Scale",
        description: "Architecting systems designed to handle global traffic and deliver real-world impact from day one.",
    },
]

const milestones = [
    { year: "2019", title: "GENESIS", description: "Shunya Tech founded. The vision was simple: Code is art." },
    { year: "2020", title: "TRACTION", description: "Secured first 10 major enterprise contracts." },
    { year: "2021", title: "SCALING", description: "Launched internal product labs. Team grew to 15 engineers." },
    { year: "2023", title: "DOMINANCE", description: "150+ Projects delivered. Recognized for high-performance web systems." },
    { year: "2024", title: "GLOBAL", description: "Expanded operations to international markets." },
]

const teamMembers = [
    {
        name: "Kratik Singh",
        role: "CO-FOUNDER & CEO",
        bio: "Co-Founder & CEO of Shunya Tech. Focused on digital branding, product strategy, and helping businesses build a meaningful presence in the modern digital world.",
        image: "/teams/kartiksingh.png",
        linkedin: "#",
        colSpan: "md:col-span-2 lg:col-span-2"
    },
    {
        name: "Amandeep",
        role: "CO-FOUNDER & CFO",
        bio: "Co-Founder & CFO at Shunya Tech. Drives financial planning and strategic operations, building a stable foundation for the company's long-term growth.",
        image: "",
        linkedin: "#",
        colSpan: "md:col-span-1 lg:col-span-1"
    },
    {
        name: "Niraj Jha",
        role: "CO-FOUNDER & CTO",
        bio: "Co-Founder & CTO of Shunya Tech. Full-stack architect who sets the engineering culture and technical standards behind every product we ship.",
        image: "",
        linkedin: "https://linkedin.com/in/nirajjha",
        colSpan: "md:col-span-1 lg:col-span-1"
    },
    {
        name: "Harsh Pandey",
        role: "OPERATIONS ASSOCIATE",
        bio: "Operations Associate at Shunya Tech. Keeps daily operations running efficiently with strong organizational discipline and a proactive work ethic.",
        image: "",
        linkedin: "#",
        colSpan: "md:col-span-2 lg:col-span-2"
    },
]

export default function AboutPage() {
    return (
        <main className="relative overflow-x-clip isolate">
            <PageBackground className="z-0" />
            <PageHero
                palette="platinum"
                eyebrow="About us"
                title={
                    <>
                        Built by{" "}
                        <span className="so-serif italic">builders.</span>
                    </>
                }
                description="We are a team of engineers, designers, and product thinkers who care deeply about what gets shipped - and how well it works once it does."
            />

            {/* First principles + stats */}
            <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                <div className="so-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <FadeIn>
                            <span className="so-eyebrow">Our philosophy</span>
                            <h2 className="mt-5 mb-6 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[18ch]">
                                Built on first{" "}
                                <span className="so-serif italic">principles.</span>
                            </h2>
                            <div className="space-y-5 text-[15px] leading-[1.75] text-so-ink-2">
                                <p>
                                    At Shunya Tech, we reject the noise. We believe that great technology is silent-it works so well
                                    you don&apos;t notice the complexity behind it.
                                </p>
                                <p>
                                    What started as a small collective of obsessive developers has evolved into a powerhouse
                                    engineering firm. We don&apos;t just &quot;build websites&quot;; we architect digital ecosystems that
                                    scale, perform, and endure.
                                </p>
                            </div>
                            <div className="mt-8 pt-8 flex gap-10 border-t border-so-line">
                                <div>
                                    <h3 className="text-[clamp(32px,4vw,44px)] font-semibold text-so-ink mb-1 tracking-[-0.02em]">50+</h3>
                                    <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-so-ink-3">Clients Since 2019</p>
                                </div>
                                <div className="w-px self-stretch bg-so-line" />
                                <div>
                                    <h3 className="text-[clamp(32px,4vw,44px)] font-semibold text-so-ink mb-1 tracking-[-0.02em]">99%</h3>
                                    <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-so-ink-3">Client Retention</p>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.1}>
                            <div className="so-card relative aspect-square overflow-hidden p-0">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-90" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8 text-white">
                                    <div className="flex justify-between items-end gap-4">
                                        <div>
                                            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/60 mb-2">Current mission</p>
                                            <h3 className="text-[22px] font-semibold tracking-[-0.01em]">Redefining Digital Landscapes</h3>
                                        </div>
                                        <div className="w-11 h-11 shrink-0 rounded-full border border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-md">
                                            <ArrowUpRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="relative z-[1] bg-so-surface so-section border-t border-so-line">
                <div className="so-container">
                    <span className="so-eyebrow">Our DNA</span>
                    <h2 className="mt-5 mb-12 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink max-w-[24ch]">
                        The code we{" "}
                        <span className="so-serif italic">live by.</span>
                    </h2>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {values.map((item, index) => (
                            <StaggerItem key={index}>
                                <div className="group so-card p-8 h-full flex flex-col hover:shadow-md transition-all">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-so-surface-2 text-so-ink">
                                            {item.icon}
                                        </div>
                                        <span className="text-[10.5px] font-medium tracking-[0.08em] text-so-ink-4">
                                            {item.header}
                                        </span>
                                    </div>
                                    <h4 className="text-[18px] font-semibold mb-2 text-so-ink tracking-[-0.01em]">{item.title}</h4>
                                    <p className="text-[14px] leading-[1.7] text-so-ink-2">
                                        {item.description}
                                    </p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Team */}
            <section id="team" className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                <div className="so-container">
                    <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-12">
                        <div>
                            <span className="so-eyebrow">The team</span>
                            <h2 className="mt-5 mb-4 text-[clamp(26px,3.6vw,44px)] tracking-[-0.025em] text-so-ink">
                                The{" "}
                                <span className="so-serif italic">architects.</span>
                            </h2>
                            <p className="text-[15px] leading-[1.7] text-so-ink-2 max-w-[44ch]">
                                Meet the minds behind the machines. A collective of founders, engineers, and creators.
                            </p>
                        </div>
                        <button
                            onClick={() => toast.success("Career Page coming soon!!!")}
                            className="so-btn so-btn-ghost shrink-0"
                        >
                            Join the collective <ArrowRight size={13} />
                        </button>
                    </div>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {teamMembers.map((member, index) => (
                            <StaggerItem key={index} className={member.colSpan || ""}>
                                <div className="group relative overflow-hidden so-card p-0 min-h-[520px] h-full">
                                    <div className="absolute inset-0">
                                        {member.image ? (
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                fill
                                                className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-950" />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                                    </div>
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                        <div className="relative z-10">
                                            <div className="inline-block mb-3 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                                                <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-white">
                                                    {member.role}
                                                </span>
                                            </div>
                                            <h3 className="text-[22px] font-semibold text-white mb-2 tracking-[-0.01em]">{member.name}</h3>
                                            <div className="max-h-0 group-hover:max-h-44 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                                                <p className="text-white/75 text-[14px] leading-[1.7] mb-4 pt-1">
                                                    {member.bio}
                                                </p>
                                                <div className="flex gap-4">
                                                    <Link href={member.linkedin} className="cursor-pointer text-white hover:text-white/60 transition-colors">
                                                        <Linkedin className="w-5 h-5" />
                                                    </Link>
                                                    <button className="cursor-pointer text-white hover:text-white/60 transition-colors">
                                                        <Twitter className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Timeline */}
            <section className="relative z-[1] bg-so-surface so-section border-t border-so-line">
                <div className="so-container">
                    <div className="text-center mb-14">
                        <span className="so-eyebrow">Our journey</span>
                        <h2 className="mt-5 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] text-so-ink">
                            Execution{" "}
                            <span className="so-serif italic">timeline.</span>
                        </h2>
                    </div>
                    <div className="relative max-w-3xl mx-auto">
                        <div className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-px bg-so-line md:-translate-x-1/2" />
                        <div className="space-y-10">
                            {milestones.map((milestone, index) => (
                                <FadeIn
                                    key={index}
                                    className={`relative flex flex-col md:flex-row gap-6 md:gap-0 items-start ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                                >
                                    <div className={`pl-10 md:pl-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                                        <span className="text-[12px] font-medium tracking-[0.08em] text-so-ink-3 mb-2 block">{milestone.year}</span>
                                        <h3 className="text-[18px] font-semibold text-so-ink mb-1.5 tracking-[-0.01em]">{milestone.title}</h3>
                                        <p className="text-[14px] leading-[1.7] text-so-ink-2">{milestone.description}</p>
                                    </div>
                                    <div className="absolute left-[3px] md:left-1/2 top-1.5 w-2.5 h-2.5 rounded-full bg-so-ink ring-4 ring-so-surface md:-translate-x-1/2" />
                                    <div className="hidden md:block md:w-1/2" />
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="relative z-[1] bg-so-bg border-t border-so-line">
                <PageFAQ
                    items={FAQS}
                    eyebrow="FAQ"
                    title="Working with"
                    titleAccent="Shunya Tech"
                    description="A few things founders and teams usually want to know before we start."
                />
            </section>

            {/* CTA */}
            <section className="relative z-[1] bg-so-surface so-section border-t border-so-line">
                <div className="so-container">
                    <div className="so-card p-[clamp(32px,5vw,64px)] text-center flex flex-col items-center">
                        <span className="so-eyebrow">Let&apos;s talk</span>
                        <h2 className="mt-5 mb-4 text-[clamp(28px,4vw,46px)] tracking-[-0.03em] text-so-ink max-w-[18ch]">
                            Ready to build the{" "}
                            <span className="so-serif italic">impossible?</span>
                        </h2>
                        <p className="text-[15px] leading-[1.7] text-so-ink-2 max-w-[52ch] mb-8">
                            We are looking for partners, not just clients. If you want to build the future, let&apos;s talk.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                            <Link href="/contactus" className="so-btn so-btn-primary">
                                Start a project <ArrowRight size={13} />
                            </Link>
                            <Link href="/projects" className="so-btn so-btn-ghost">
                                View case studies <ArrowRight size={13} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
