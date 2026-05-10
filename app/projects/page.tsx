"use client"

import { motion } from "framer-motion"
import {
    Eye, FileText
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import SmoothScroll from "@/components/smoothscroll"

const projectData = [
    {
        id: 1,
        slug: "coderzai",
        title: "CodrzAI",
        description: "AI-powered engineering intelligence suite for CS students — DSA prep, AI mentors, full-stack project scaffolding, and open-source bounties in one platform.",
        image: "/thecoderz.png",
        link: "https://coderzai.xyz",
        industry: "Education",
        technologies: ["Next.js", "Node.js", "MongoDB", "OpenAI"]
    },
    {
        id: 2,
        slug: "eventeye",
        title: "EventEye",
        description: "End-to-end event management platform connecting organizers and attendees across colleges and institutions — from discovery to ticket checkout in under 30 seconds.",
        image: "/eventeye.png",
        link: "https://eventeye.in",
        industry: "Events",
        technologies: ["React", "Node.js", "PostgreSQL", "Razorpay"]
    },
    {
        id: 3,
        slug: "mp-solutions",
        title: "M.P. Solutions",
        description: "Real-time pharmaceutical inventory system connecting local pharmacies with distributors — eliminating stockouts and manual reorder calls across the supply chain.",
        image: "/mpsolutions.png",
        link: "https://mpsolutions.vercel.app/",
        industry: "Healthcare",
        technologies: ["Next.js", "Prisma", "PostgreSQL", "tRPC"]
    },
];

const industries = Array.from(new Set(projectData.map(project => project.industry)));

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function ProjectsPage() {
    const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

    const filteredProjects = selectedIndustry
        ? projectData.filter(project => project.industry === selectedIndustry)
        : projectData;

    return (
        <SmoothScroll>
            <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 selection:bg-neutral-200 dark:selection:bg-neutral-800">
                <section className="relative pt-32 px-6 pb-12">
                    <div className="relative max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-12"
                        >
                            <div className="max-w-3xl">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-1 px-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
                                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Project Archive</span>
                                    </div>
                                    <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
                                </div>
                                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-neutral-900 dark:text-white mb-6">
                                    Selected Works
                                </h1>
                                <p className="text-xl text-neutral-800 dark:text-neutral-300 font-light max-w-xl">
                                    A collection of high-performance digital systems engineered for scalability and impact.
                                </p>
                            </div>
                            <div className="flex gap-8">
                                <div>
                                    <div className="text-3xl font-bold font-mono">150+</div>
                                    <div className="text-xs text-neutral-500 uppercase tracking-widest mt-1">Deployed</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold font-mono">12</div>
                                    <div className="text-xs text-neutral-500 uppercase tracking-widest mt-1">Industries</div>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-wrap gap-2 mb-12"
                        >
                            <button
                                onClick={() => setSelectedIndustry(null)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${selectedIndustry === null
                                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-black border-transparent'
                                    : 'bg-transparent border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:border-neutral-400'}`}
                            >
                                All Systems
                            </button>
                            {
                                industries.map((industry) => (
                                    <button
                                        key={industry}
                                        onClick={() => setSelectedIndustry(industry)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${selectedIndustry === industry
                                            ? 'bg-neutral-900 dark:bg-white text-white dark:text-black border-transparent'
                                            : 'bg-transparent border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:border-neutral-400'}`}
                                    >
                                        {industry}
                                    </button>
                                ))
                            }
                        </motion.div>
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {
                                filteredProjects.map((project) => (
                                    <motion.div
                                        key={project.id}
                                        variants={item}
                                        className="group flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 shadow-sm hover:shadow-xl"
                                    >
                                        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                                            <div className="absolute top-4 left-4 z-10">
                                                <div className="px-3 py-1 bg-white/90 dark:bg-black/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 rounded-full text-[10px] font-mono uppercase tracking-wider text-neutral-900 dark:text-white">
                                                    {project.industry}
                                                </div>
                                            </div>
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                                            />
                                        </div>
                                        <div className="p-6 flex flex-col flex-1">
                                            <div className="mb-4">
                                                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                                                    {project.title}
                                                </h3>
                                                <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
                                                    {project.description}
                                                </p>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {
                                                    project.technologies.slice(0, 3).map((tech) => (
                                                        <span key={tech} className="text-[10px] font-mono text-neutral-500 border border-neutral-200 dark:border-neutral-800 px-2 py-1 rounded-md">
                                                            {tech}
                                                        </span>
                                                    ))
                                                }
                                                {
                                                    project.technologies.length > 3 && (
                                                        <span className="text-[10px] font-mono text-neutral-500 border border-neutral-200 dark:border-neutral-800 px-2 py-1 rounded-md">
                                                            +{project.technologies.length - 3}
                                                        </span>
                                                    )
                                                }
                                            </div>
                                            <div className="mt-auto grid grid-cols-2 gap-3">
                                                <Link href={project.link} target="_blank" className="w-full">
                                                    <button className="cursor-pointer w-full py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-sm font-medium transition-colors flex items-center justify-center gap-2">
                                                        <Eye className="w-4 h-4" /> Live Demo
                                                    </button>
                                                </Link>
                                                <Link href={`/projects/${project.slug}`} className="w-full">
                                                    <button className="cursor-pointer w-full py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black hover:opacity-90 text-sm font-bold transition-opacity flex items-center justify-center gap-2">
                                                        <FileText className="w-4 h-4" /> Case Study
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            }
                        </motion.div>
                    </div>
                </section>
            </div>
        </SmoothScroll>
    )
}