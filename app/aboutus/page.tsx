"use client"

import SmoothScroll from "@/components/smoothscroll"
import {
    ArrowUpRight, Linkedin, Twitter, Code2, Users, Globe, Zap
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {
    motion, useScroll, useTransform, Variants
} from "framer-motion"
import { useRef } from "react"
import { toast } from "sonner"

const values = [
    {
        icon: <Zap className="w-6 h-6" />,
        header: "01_INNOVATION",
        title: "Technical Velocity",
        description: "We don't just write code; we engineer velocity. Pushing boundaries with bleeding-edge stacks to solve complex problems.",
    },
    {
        icon: <Users className="w-6 h-6" />,
        header: "02_SYNERGY",
        title: "Collective Intelligence",
        description: "A hive-mind approach to development. Open communication loops between engineering, design, and product.",
    },
    {
        icon: <Code2 className="w-6 h-6" />,
        header: "03_PRECISION",
        title: "Pixel Perfection",
        description: "Zero compromise on quality. We obsess over the micro-interactions that define the macro experience.",
    },
    {
        icon: <Globe className="w-6 h-6" />,
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

// --- Animation Variants (Typed to fix TS Error) ---

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
    }
}

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

export default function AboutPage() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

    return (
        <SmoothScroll>
            <main ref={containerRef} className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 selection:bg-neutral-200 dark:selection:bg-neutral-800 selection:text-black dark:selection:text-white transition-colors duration-300">
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 dark:opacity-20" />
                </div>
                <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neutral-200/50 dark:bg-neutral-800/30 rounded-full blur-[120px] pointer-events-none" />

                    <div className="relative z-10 max-w-5xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md shadow-sm"
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 tracking-wider">SYSTEM STATUS: ONLINE</span>
                        </motion.div>
                        <motion.h1
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                            className="text-6xl md:text-8xl font-bold tracking-tighter mb-8"
                        >
                            <motion.span variants={fadeInUp} className="block text-neutral-400 dark:text-neutral-500">BUILT BY</motion.span>
                            <motion.span variants={fadeInUp} className="block text-neutral-900 dark:text-white">BUILDERS.</motion.span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed"
                        >
                            We are a team of engineers, designers, and product thinkers who care deeply
                            about what gets shipped — and how well it works once it does.
                        </motion.p>
                    </div>
                    <motion.div
                        style={{ y }}
                        className="absolute bottom-10 left-0 w-full flex justify-center text-neutral-400 dark:text-neutral-600"
                    >
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Scroll to Explore</span>
                            <div className="w-[1px] h-12 bg-gradient-to-b from-neutral-400 to-transparent dark:from-neutral-600" />
                        </div>
                    </motion.div>
                </section>
                <section className="py-24 md:py-32 px-6 relative z-10 border-t border-neutral-200 dark:border-neutral-900 bg-white/80 dark:bg-neutral-950/50 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-neutral-900 dark:text-white">
                                Built on <span className="text-neutral-400 dark:text-neutral-500">First Principles</span>.
                            </h2>
                            <div className="space-y-6 text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                                <p>
                                    At Shunya Tech, we reject the noise. We believe that great technology is silent—it works so well
                                    you don't notice the complexity behind it.
                                </p>
                                <p>
                                    What started as a small collective of obsessive developers has evolved into a powerhouse
                                    engineering firm. We don't just "build websites"; we architect digital ecosystems that
                                    scale, perform, and endure.
                                </p>
                                <div className="pt-8 flex gap-8 border-t border-neutral-200 dark:border-neutral-800 mt-8">
                                    <div>
                                        <h3 className="text-4xl font-bold text-neutral-900 dark:text-white mb-1">50+</h3>
                                        <p className="text-xs font-mono text-neutral-500 uppercase">Clients Since 2019</p>
                                    </div>
                                    <div className="w-[1px] h-full bg-neutral-200 dark:bg-neutral-800" />
                                    <div>
                                        <h3 className="text-4xl font-bold text-neutral-900 dark:text-white mb-1">99%</h3>
                                        <p className="text-xs font-mono text-neutral-500 uppercase">Client Retention</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-square md:aspect-video lg:aspect-square bg-neutral-100 dark:bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 group shadow-2xl shadow-neutral-200/50 dark:shadow-black/50"
                        >
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-80 dark:opacity-40 group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-xs font-mono text-neutral-300 mb-2">CURRENT MISSION</p>
                                        <h3 className="text-2xl font-bold">Redefining Digital Landscapes</h3>
                                    </div>
                                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-black/20 backdrop-blur-md hover:bg-white hover:text-black transition-all">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
                <section className="py-24 px-6 border-t border-neutral-200 dark:border-neutral-900">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-16">
                            <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-4">Our DNA</h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">The Code We Live By</h3>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {
                                values.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-white dark:hover:bg-neutral-900/50 transition-all duration-300 shadow-sm hover:shadow-md"
                                    >
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="p-3 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white transition-colors">
                                                {item.icon}
                                            </div>
                                            <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-500 transition-colors">
                                                {item.header}
                                            </span>
                                        </div>
                                        <h4 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">{item.title}</h4>
                                        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-light">
                                            {item.description}
                                        </p>
                                    </motion.div>
                                ))
                            }
                        </div>
                    </div>
                </section>
                <section id="team" className="py-24 px-6 border-t border-neutral-200 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-950">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                            <div>
                                <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-neutral-900 dark:text-white">The Architects</h2>
                                <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-xl">
                                    Meet the minds behind the machines. A collective of founders, engineers, and creators.
                                </p>
                            </div>
                            <button
                                onClick={() => toast.success("Career Page coming soon!!!")}
                                className="px-6 py-3 rounded-full border border-neutral-300 dark:border-neutral-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300 text-sm font-medium text-neutral-900 dark:text-white"
                            >
                                Join the Collective
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {
                                teamMembers.map((member, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className={`group relative overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 ${member.colSpan || ''} min-h-[560px]`}
                                    >
                                        <div className="absolute inset-0">
                                            {member.image ? (
                                                <Image
                                                    src={member.image}
                                                    alt={member.name}
                                                    fill
                                                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-950" />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                                        </div>
                                        <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                            <div className="relative z-10">
                                                <div className="inline-block mb-3 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                                                    <span className="text-[10px] font-mono uppercase tracking-wider text-white">
                                                        {member.role}
                                                    </span>
                                                </div>
                                                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                                                <div className="max-h-0 group-hover:max-h-44 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                                                    <p className="text-neutral-300 text-sm font-light leading-relaxed mb-4 pt-1">
                                                        {member.bio}
                                                    </p>
                                                    <div className="flex gap-4">
                                                        <Link href={member.linkedin} className="cursor-pointer text-white hover:text-neutral-400 transition-colors">
                                                            <Linkedin className="w-5 h-5" />
                                                        </Link>
                                                        <button className="cursor-pointer text-white hover:text-neutral-400 transition-colors">
                                                            <Twitter className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            }
                        </div>
                    </div>
                </section>
                <section className="py-24 px-6 border-t border-neutral-200 dark:border-neutral-900 bg-white dark:bg-neutral-950">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white">Execution Timeline</h2>
                        </div>
                        <div className="relative">
                            <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800" />
                            <div className="space-y-12">
                                {
                                milestones.map((milestone, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className={`flex flex-col md:flex-row gap-8 md:gap-0 items-start relative ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                    >
                                        <div className={`pl-12 md:pl-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                                            <div className="text-4xl font-bold text-neutral-100 dark:text-neutral-800/20 absolute -z-10 select-none transform translate-y-[-10px] md:translate-x-0">
                                                {milestone.year}
                                            </div>
                                            <span className="text-xs font-mono text-neutral-500 mb-2 block">{milestone.year}</span>
                                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{milestone.title}</h3>
                                            <p className="text-neutral-600 dark:text-neutral-400 text-sm">{milestone.description}</p>
                                        </div>
                                        <div className="absolute left-[11px] md:left-1/2 top-1.5 w-2 h-2 rounded-full bg-neutral-900 dark:bg-neutral-200 -translate-x-1/2 shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_rgba(255,255,255,0.5)]" />

                                        <div className="hidden md:block md:w-1/2" />
                                    </motion.div>
                                ))
                                }
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-32 px-6 border-t border-neutral-200 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-950">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-neutral-900 dark:text-white">
                            Ready to build<br />the impossible?
                        </h2>
                        <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-10 font-light">
                            We are looking for partners, not just clients. If you want to build the future, let's talk.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contactus" className="cursor-pointer px-8 py-4 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-black font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all text-lg shadow-lg hover:shadow-xl">
                                Start a Project
                            </Link>
                            <Link href="/projects" className="cursor-pointer px-8 py-4 rounded-2xl border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white font-medium hover:bg-neutral-200 dark:hover:bg-neutral-900 transition-all text-lg">
                                View Case Studies
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </SmoothScroll>
    )
}