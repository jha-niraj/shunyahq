"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import {
	ArrowRight, Globe, Smartphone, Database, Shield, Rocket, Code2, Terminal,
	Cpu, Quote, Zap, Layout, Server, GitBranch, Search, Sparkles, Clock, Users,
	CheckCircle, Orbit, Lightbulb, Settings, Clapperboard
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BackgroundPaths } from "@/components/backgroundpaths"
import { WordRotate } from "@/components/wordrotate"
import SmoothScroll from "@/components/smoothscroll"

// --- DATA: SERVICES (Expanded & Specific) ---
const services = [
	{
		title: "Web Engineering",
		desc: "Scalable SaaS platforms and complex web apps using Next.js 15 & React Server Components.",
		icon: Globe
	},
	{
		title: "Mobile Ecology",
		desc: "High-performance cross-platform apps (React Native/Flutter) with native module integration.",
		icon: Smartphone
	},
	{
		title: "Cloud Architecture",
		desc: "Serverless AWS/Azure infrastructure, Docker containerization, and Kubernetes orchestration.",
		icon: Database
	},
	{
		title: "AI Integration",
		desc: "Custom LLM agents, RAG pipelines, and predictive analytics models using Python/TensorFlow.",
		icon: Cpu
	},
	{
		title: "DevOps & CI/CD",
		desc: "Automated deployment pipelines, infrastructure as code (Terraform), and real-time monitoring.",
		icon: GitBranch
	},
	{
		title: "System Security",
		desc: "Penetration testing, OAuth implementation, and enterprise-grade data encryption standards.",
		icon: Shield
	},
	{
		title: "UI/UX Systems",
		desc: "Atomic design systems, high-fidelity prototyping, and micro-interaction engineering.",
		icon: Layout
	},
	{
		title: "Legacy Modernization",
		desc: "Refactoring monolithic architectures into scalable microservices without downtime.",
		icon: Server
	},
]

// --- DATA: WHY US ---
const whyUs = [
	{
		title: "We Ship Real Products",
		description: "Every project we take goes live. Not a prototype, not a Figma deck — a production system people actually use.",
		icon: Rocket
	},
	{
		title: "Full-Stack Ownership",
		description: "One team owns everything — frontend, backend, infra, and deployment. No handoffs, no finger-pointing.",
		icon: Sparkles
	},
	{
		title: "Speed Without Shortcuts",
		description: "Modern stacks (Next.js, tRPC, Prisma) let us move fast without creating technical debt you'll pay for later.",
		icon: Zap
	},
	{
		title: "Honest Timelines",
		description: "We scope in weeks, not quarters. Bi-weekly deployments mean you always see real working software — never just status updates.",
		icon: Clock
	}
]

// --- DATA: PROJECTS (Top 3) ---
const selectedProjects = [
	{
		title: "CodrzAI",
		category: "EdTech Platform",
		image: "/thecoderz.png",
		description: "AI-powered engineering suite for CS students — DSA, project scaffolding, and open-source bounties.",
		slug: "coderzai"
	},
	{
		title: "EventEye",
		category: "Event Management",
		image: "/eventeye.png",
		description: "Dual-sided event platform for college organizers and attendees. Ticket checkout in under 30 seconds.",
		slug: "eventeye"
	},
	{
		title: "M.P. Solutions",
		category: "Healthcare Tech",
		image: "/mpsolutions.png",
		description: "Real-time pharmaceutical inventory connecting pharmacies and distributors — no phone calls needed.",
		slug: "mp-solutions"
	}
]

const processSteps = [
	{
		title: "01. DISCOVERY",
		description: "Week 1–2: Requirements workshop, tech stack decision, architecture blueprint. You get a written spec doc before a single line is written.",
		icon: Lightbulb,
	},
	{
		title: "02. ENGINEERING",
		description: "Week 3–8: Agile sprints with bi-weekly deployments to staging. You always see real working software — never mockups, never status decks.",
		icon: Code2,
	},
	{
		title: "03. LAUNCH",
		description: "Final week: QA testing, security audit, production deployment — handed over with documentation and 30 days of post-launch support.",
		icon: Rocket,
	}
]

const testimonials = [
	{ text: "They architected a scalable platform that handled our 300% growth.", author: "Sarah J.", role: "CTO, FinStream" },
	{ text: "Technical precision is unmatched. The code is clean and scalable.", author: "Mark D.", role: "Founder, EduCore" },
	{ text: "Operates like a partner, not just a vendor.", author: "Priya R.", role: "Product Lead, HealthPlus" },
	{ text: "We launched 2 weeks ahead of schedule thanks to their CI/CD setup.", author: "James K.", role: "VP Eng, LogiTech" },
	{ text: "The UI system they built is now our company standard.", author: "Elena M.", role: "Design Dir, CreativeX" },
	{ text: "Finally, an agency that understands complex backend logic.", author: "David W.", role: "Lead Dev, DataFlow" },
	{ text: "SyncOrbit has completely changed how we manage sprints.", author: "Tom H.", role: "PM, AgileCorp" },
	{ text: "Security compliance was our top worry, they nailed it.", author: "Rachel G.", role: "CISO, SecureNet" },
]

const MarqueeCard = ({ item }: { item: typeof testimonials[0] }) => (
	<div className="w-[350px] mx-4 p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex-shrink-0">
		<Quote className="w-6 h-6 text-neutral-300 dark:text-neutral-700 mb-4" />
		<p className="text-sm font-light leading-relaxed mb-4 text-neutral-600 dark:text-neutral-300">"{item.text}"</p>
		<div>
			<div className="font-bold text-sm text-neutral-900 dark:text-white">{item.author}</div>
			<div className="text-xs text-neutral-500">{item.role}</div>
		</div>
	</div>
)

export default function LandingPage() {
	const [billingCycle, setBillingCycle] = useState<"project" | "retainer">("project")

	return (
		<SmoothScroll>
			<main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 selection:bg-neutral-200 dark:selection:bg-neutral-800 overflow-x-hidden">
				<div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden border-b border-neutral-200 dark:border-neutral-800">
					<BackgroundPaths />

					<div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20 text-center">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
						>
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.2 }}
								className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 mb-8"
							>
								<span className="relative flex h-2 w-2">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
									<span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
								</span>
								<span className="text-xs font-mono font-medium tracking-wider text-neutral-600 dark:text-neutral-400 uppercase">
									System Status: Operational
								</span>
							</motion.div>
							<h1 className="text-5xl sm:text-7xl md:text-9xl font-bold tracking-tighter text-neutral-900 dark:text-white mb-8">
								<span className="block">WE</span>
								<WordRotate
									words={["ARCHITECT", "ENGINEER", "ACCELERATE", "SCALE"]}
									duration={2500}
									className="text-neutral-400 dark:text-neutral-600"
								/>
								<span className="block">THE FUTURE.</span>
							</h1>
							<p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light mb-12">
								We are builders who ship. From concept to production — we architect digital
								products that scale, perform, and actually get used.
							</p>
							<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
								<Link href="/contactus">
									<Button className="h-14 px-8 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 text-lg font-bold shadow-lg hover:shadow-xl transition-all">
										Start a Project <ArrowRight className="ml-2 w-5 h-5" />
									</Button>
								</Link>
								<Link href="/projects">
									<Button variant="outline" className="h-14 px-8 rounded-full border-2 border-neutral-200 dark:border-neutral-800 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900 text-lg font-medium">
										See Our Work <Terminal className="ml-2 w-5 h-5" />
									</Button>
								</Link>
							</div>
						</motion.div>
					</div>
				</div>
				<section className="py-24 px-6 bg-neutral-50 dark:bg-neutral-950">
					<div className="max-w-7xl mx-auto">
						<div className="text-center mb-16">
							<Badge variant="outline" className="mb-4 bg-white dark:bg-black">How We Work</Badge>
							<h2 className="text-4xl md:text-5xl font-bold tracking-tight">Built Different.</h2>
							<p className="text-neutral-500 mt-4 max-w-2xl mx-auto">
								We don't manage projects — we own them. Here's what that actually means in practice.
							</p>
						</div>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
							{
								whyUs.map((item, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1 }}
										viewport={{ once: true }}
										className="group p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 hover:shadow-xl dark:hover:shadow-none"
									>
										<div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-6 text-neutral-900 dark:text-white group-hover:scale-110 transition-transform duration-300">
											<item.icon className="w-6 h-6" />
										</div>
										<h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">{item.title}</h3>
										<p className="text-neutral-500 text-sm leading-relaxed font-light">
											{item.description}
										</p>
									</motion.div>
								))
							}
						</div>
					</div>
				</section>
				<section className="py-32 px-6 bg-neutral-950 text-white relative overflow-hidden border-y border-neutral-900">
					<div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-blue-500/10 rounded-full opacity-100 animate-[spin_60s_linear_infinite] pointer-events-none border-dashed" />
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-purple-500/10 rounded-full opacity-100 animate-[spin_40s_linear_infinite_reverse] pointer-events-none border-dashed" />

					<div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
					<div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-20 items-center">
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className="relative"
						>
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 mb-8 backdrop-blur-md">
								<span className="relative flex h-2 w-2">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
									<span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
								</span>
								<span className="text-xs font-mono text-blue-400 uppercase tracking-widest">Now in Beta — Request Access</span>
							</div>
							<h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 leading-none">
								Sync<span className="text-neutral-700">Orbit</span>
							</h2>
							<p className="text-xl text-neutral-400 font-light mb-8 leading-relaxed max-w-lg">
								The centralized command center for high-velocity engineering teams.
								Unify code, tasks, and client communication in one <span className="text-white font-medium">real-time interface</span>.
							</p>
							<ul className="space-y-4 mb-10">
								{
									[
										'Real-time Kanban with Git Integration',
										'Automated Sprint Reporting',
										'Client "View-Only" Portals',
										'CI/CD Pipeline Visualization'
									].map((feat, i) => (
										<li key={i} className="flex items-center gap-4 text-neutral-300 group">
											<div className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
												<CheckCircle className="w-3 h-3 text-blue-500" />
											</div>
											<span className="font-light">{feat}</span>
										</li>
									))
								}
							</ul>
							<div className="flex flex-wrap gap-4">
								<Button className="h-14 px-8 rounded-full bg-white text-black hover:bg-neutral-200 font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-shadow">
									Request Access
								</Button>
								<Button variant="outline" className="h-14 px-8 rounded-full border-neutral-800 text-white bg-transparent hover:bg-neutral-900 hover:text-white hover:border-neutral-700">
									View Product Demo
								</Button>
							</div>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
							whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8 }}
							className="relative perspective-1000"
						>
							<div className="relative aspect-square md:aspect-[4/3] bg-neutral-900 rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden group">
								<div className="absolute top-0 left-0 right-0 h-12 bg-neutral-900 border-b border-neutral-800 flex items-center px-4 justify-between z-20">
									<div className="flex gap-2">
										<div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
										<div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
										<div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
									</div>
									<div className="h-6 w-1/3 bg-neutral-800/50 rounded-full flex items-center px-3 gap-2">
										<Search className="w-3 h-3 text-neutral-600" />
										<div className="w-full h-1 bg-neutral-800 rounded-full" />
									</div>
								</div>
								<div className="absolute top-12 left-0 bottom-0 w-16 bg-neutral-900 border-r border-neutral-800 flex flex-col items-center py-4 gap-4 z-10">
									{
										[Layout, GitBranch, Terminal, Users, Settings].map((Icon, i) => (
											<div key={i} className={`p-2 rounded-lg ${i === 0 ? 'bg-blue-500/10 text-blue-500' : 'text-neutral-600 hover:text-neutral-400'}`}>
												<Icon className="w-5 h-5" />
											</div>
										))
									}
								</div>
								<div className="absolute top-12 left-16 right-0 bottom-0 bg-neutral-950 p-6 overflow-hidden">
									<div className="flex justify-between items-center mb-6">
										<h3 className="text-sm font-bold text-white">Sprint 24-B</h3>
										<div className="flex -space-x-2">
											{
												[1, 2, 3].map(i => (
													<div key={i} className="w-6 h-6 rounded-full bg-neutral-800 border border-neutral-950" />
												))
											}
										</div>
									</div>
									<div className="grid grid-cols-3 gap-4 h-full">
										<div className="bg-neutral-900/50 rounded-xl p-3 border border-neutral-800/50">
											<div className="flex justify-between mb-3 text-xs text-neutral-500 font-mono">
												<span>TODO</span>
												<span>3</span>
											</div>
											<div className="space-y-3">
												{
													[1, 2].map(i => (
														<div key={i} className="bg-neutral-900 p-3 rounded-lg border border-neutral-800 shadow-sm group-hover:translate-y-[-2px] transition-transform duration-300">
															<div className="w-12 h-2 bg-blue-500/20 rounded-full mb-2" />
															<div className="w-full h-2 bg-neutral-800 rounded-full mb-1" />
															<div className="w-2/3 h-2 bg-neutral-800 rounded-full" />
														</div>
													))
												}
											</div>
										</div>
										<div className="bg-neutral-900/50 rounded-xl p-3 border border-neutral-800/50">
											<div className="flex justify-between mb-3 text-xs text-neutral-500 font-mono">
												<span>IN PROGRESS</span>
												<span>1</span>
											</div>
											<div className="bg-neutral-900 p-3 rounded-lg border border-neutral-800 shadow-sm border-l-2 border-l-blue-500 relative">
												<div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
												<div className="w-16 h-2 bg-purple-500/20 rounded-full mb-2" />
												<div className="w-full h-2 bg-neutral-800 rounded-full mb-1" />
												<div className="w-full h-2 bg-neutral-800 rounded-full mb-1" />
											</div>
										</div>
										<div className="bg-neutral-900/50 rounded-xl p-3 border border-neutral-800/50">
											<div className="flex justify-between mb-3 text-xs text-neutral-500 font-mono">
												<span>DEPLOYED</span>
												<span>12</span>
											</div>
											<div className="bg-neutral-900/30 p-3 rounded-lg border border-neutral-800/50 opacity-50">
												<div className="w-10 h-2 bg-green-500/20 rounded-full mb-2" />
												<div className="w-full h-2 bg-neutral-800 rounded-full" />
											</div>
										</div>
									</div>
								</div>
								<div className="absolute bottom-6 right-6 z-30">
									<div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/50">
										<Orbit className="w-6 h-6 text-white animate-spin-slow" />
									</div>
								</div>

							</div>
							<div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-2xl -z-10 rounded-[3rem]" />
						</motion.div>
					</div>
				</section>
				<section className="py-24 px-6">
					<div className="max-w-7xl mx-auto">
						<div className="text-center mb-16">
							<h2 className="text-4xl font-bold tracking-tight mb-4">The Protocol</h2>
							<p className="text-neutral-500">How we turn chaos into code.</p>
						</div>
						<div className="grid md:grid-cols-3 gap-12 relative">
							<div className="hidden md:block absolute top-12 left-0 w-full h-px bg-neutral-200 dark:border-neutral-800 border-t border-dashed border-neutral-300 dark:border-neutral-700 -z-10" />

							{
								processSteps.map((step, i) => (
									<div key={i} className="relative pt-8">
										<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-neutral-900 dark:bg-white ring-4 ring-white dark:ring-neutral-950" />
										<div className="text-center p-8 rounded-2xl border border-neutral-100 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-600 bg-white dark:bg-neutral-950 transition-all">
											<step.icon className="w-10 h-10 mx-auto mb-6 text-neutral-900 dark:text-white" />
											<h3 className="text-lg font-bold font-mono mb-2">{step.title}</h3>
											<p className="text-neutral-500 text-sm leading-relaxed">{step.description}</p>
										</div>
									</div>
								))
							}
						</div>
					</div>
				</section>
				<section className="py-24 px-6 bg-white dark:bg-neutral-950">
					<div className="max-w-7xl mx-auto">
						<div className="flex justify-between items-end mb-16">
							<div>
								<h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-4">/ Capabilities</h2>
								<h3 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">Full-Spectrum Engineering</h3>
							</div>
							<Link href="/services" className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all font-medium text-sm">
								View All Services <ArrowRight className="w-4 h-4" />
							</Link>
						</div>
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
							{
								services.map((service, i) => (
									<motion.div
										key={i}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ delay: i * 0.05 }}
										viewport={{ once: true }}
										className="group p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300"
									>
										<div className="w-10 h-10 rounded-lg bg-white dark:bg-neutral-800 flex items-center justify-center mb-4 text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
											<service.icon className="w-5 h-5" />
										</div>
										<h4 className="text-lg font-bold mb-2">{service.title}</h4>
										<p className="text-xs text-neutral-500 leading-relaxed">
											{service.desc}
										</p>
									</motion.div>
								))
							}
						</div>
					</div>
				</section>
				<section className="py-24 px-6 border-t border-neutral-200 dark:border-neutral-800">
					<div className="max-w-7xl mx-auto">
						<div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
							<div>
								<h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Selected Works</h2>
								<p className="text-neutral-500 max-w-xl">
									A glimpse into our production database. Real systems solving real problems.
								</p>
							</div>
							<Link href="/projects">
								<Button className="rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black">
									View All Projects
								</Button>
							</Link>
						</div>
						<div className="grid md:grid-cols-3 gap-8">
							{
								selectedProjects.map((project, i) => (
									<Link href={`/projects/${project.slug}`} key={i} className="group block">
										<div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 mb-6">
											<Image
												src={project.image}
												alt={project.title}
												fill
												className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
											/>
											<div className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-black/90 backdrop-blur rounded text-xs font-mono uppercase tracking-wider border border-neutral-200 dark:border-neutral-800">
												{project.category}
											</div>
										</div>
										<h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
											{project.title}
											<ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
										</h3>
										<p className="text-neutral-500 text-sm">{project.description}</p>
									</Link>
								))
							}
						</div>
					</div>
				</section>
				<section className="py-24 border-t border-neutral-200 dark:border-neutral-800 overflow-hidden bg-neutral-50 dark:bg-neutral-950">
					<div className="max-w-7xl mx-auto px-6 mb-12 text-center">
						<h2 className="text-3xl font-bold">Client Transmissions</h2>
					</div>
					<div className="flex mb-8 overflow-hidden group">
						<motion.div
							className="flex animate-marquee group-hover:[animation-play-state:paused]"
							animate={{ x: [0, -1000] }}
							transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
						>
							{
								[...testimonials, ...testimonials].map((item, i) => (
									<MarqueeCard key={i} item={item} />
								))
							}
						</motion.div>
					</div>
					<div className="flex overflow-hidden group">
						<motion.div
							className="flex animate-marquee-reverse group-hover:[animation-play-state:paused]"
							animate={{ x: [-1000, 0] }}
							transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
						>
							{
								[...testimonials, ...testimonials].reverse().map((item, i) => (
									<MarqueeCard key={i} item={item} />
								))
							}
						</motion.div>
					</div>
				</section>
				<section className="py-24 px-6 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/50">
					<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
						<div>
							<Badge variant="outline" className="mb-6 bg-white dark:bg-black">Transparent Protocol</Badge>
							<h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
								Investment Clarity.<br />Global Standards.
							</h2>
							<p className="text-lg text-neutral-500 mb-8 leading-relaxed">
								We believe in transparent pricing structures. No hidden fees, no "contact for quote" walls for standard projects.
								View our standardized rate cards across 4 global currencies.
							</p>
							<div className="space-y-4 mb-8">
								<div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
									<div className="flex items-center gap-3">
										<Globe className="w-5 h-5 text-neutral-400" />
										<span className="font-medium">Web Engineering</span>
									</div>
									<span className="text-sm font-mono text-neutral-500">starts at $1,599</span>
								</div>
								<div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
									<div className="flex items-center gap-3">
										<Smartphone className="w-5 h-5 text-neutral-400" />
										<span className="font-medium">Mobile Ecosystem</span>
									</div>
									<span className="text-sm font-mono text-neutral-500">starts at $2,599</span>
								</div>
								<div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
									<div className="flex items-center gap-3">
										<Clapperboard className="w-5 h-5 text-neutral-400" />
										<span className="font-medium">Visual Narrative</span>
									</div>
									<span className="text-sm font-mono text-neutral-500">starts at $599</span>
								</div>
							</div>
							<Link href="/pricing">
								<Button className="h-12 px-8 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black font-bold">
									View Full Rate Card
								</Button>
							</Link>
						</div>
						<div className="relative aspect-square md:aspect-[4/3] bg-neutral-900 rounded-3xl border border-neutral-800 overflow-hidden flex items-center justify-center p-8">
							<div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
							<div className="w-full max-w-sm bg-neutral-950 rounded-2xl border border-neutral-800 shadow-2xl p-6 relative z-10">
								<div className="flex justify-between items-center mb-6">
									<div className="flex gap-2">
										<div className="w-3 h-3 rounded-full bg-red-500/20" />
										<div className="w-3 h-3 rounded-full bg-yellow-500/20" />
										<div className="w-3 h-3 rounded-full bg-green-500/20" />
									</div>
									<div className="text-xs font-mono text-neutral-600">ESTIMATOR.EXE</div>
								</div>
								<div className="space-y-3">
									<div className="h-8 bg-neutral-900 rounded w-3/4 animate-pulse" />
									<div className="h-8 bg-neutral-900 rounded w-1/2 animate-pulse delay-75" />
									<div className="h-24 bg-neutral-900 rounded w-full animate-pulse delay-150" />
									<div className="flex justify-end pt-4">
										<div className="h-10 bg-blue-600/20 rounded w-1/3" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="py-32 px-6">
					<div className="max-w-5xl mx-auto bg-neutral-900 dark:bg-white rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
						<div className="absolute inset-0 bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />

						<div className="relative z-10">
							<h2 className="text-4xl md:text-7xl font-bold text-white dark:text-black mb-8 tracking-tighter">
								READY TO<br />BUILD THE FUTURE?
							</h2>
							<p className="text-lg text-neutral-400 dark:text-neutral-600 mb-12 max-w-xl mx-auto">
								Deploy your vision with a team that understands engineering at scale.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Link href="/contactus">
									<Button className="h-14 px-8 rounded-full bg-white dark:bg-black text-black dark:text-white hover:scale-105 transition-transform font-bold text-lg">
										Start Project
									</Button>
								</Link>
								<Link href="https://cal.com/niraj-jha/30min" target="_blank">
									<Button variant="outline" className="h-14 px-8 rounded-full border-neutral-700 text-white dark:text-black dark:border-neutral-300 hover:bg-white/10 dark:hover:bg-black/10 text-lg">
										Book Strategy Call
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</section>
			</main>
		</SmoothScroll>
	)
}