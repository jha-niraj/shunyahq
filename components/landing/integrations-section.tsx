"use client"

import { useRef, useEffect } from "react"

interface IntegrationItem {
    id: string
    name: string
    category: string
    group: number
}

const INTEGRATIONS: IntegrationItem[] = [
    { id: "nextjs", name: "Next.js", category: "Framework", group: 0 },
    { id: "react", name: "React", category: "UI Library", group: 0 },
    { id: "typescript", name: "TypeScript", category: "Language", group: 0 },
    { id: "tailwind", name: "Tailwind", category: "Styling", group: 0 },
    { id: "node", name: "Node.js", category: "Runtime", group: 0 },
    { id: "python", name: "Python", category: "Language", group: 0 },
    { id: "aws", name: "AWS", category: "Cloud", group: 1 },
    { id: "azure", name: "Azure", category: "Cloud", group: 1 },
    { id: "gcp", name: "Google Cloud", category: "Cloud", group: 1 },
    { id: "docker", name: "Docker", category: "Containers", group: 1 },
    { id: "kubernetes", name: "Kubernetes", category: "Orchestration", group: 1 },
    { id: "terraform", name: "Terraform", category: "IaC", group: 1 },
    { id: "openai", name: "OpenAI", category: "AI Engine", group: 2 },
    { id: "anthropic", name: "Anthropic", category: "AI Engine", group: 2 },
    { id: "postgres", name: "PostgreSQL", category: "Database", group: 2 },
    { id: "prisma", name: "Prisma", category: "ORM", group: 2 },
    { id: "trpc", name: "tRPC", category: "API Layer", group: 2 },
    { id: "redis", name: "Redis", category: "Cache", group: 2 },
    { id: "stripe", name: "Stripe", category: "Payments", group: 2 },
    { id: "razorpay", name: "Razorpay", category: "Payments", group: 2 },
    { id: "vercel", name: "Vercel", category: "Deployment", group: 2 },
    { id: "reactnative", name: "React Native", category: "Mobile", group: 0 },
    { id: "flutter", name: "Flutter", category: "Mobile", group: 0 },
    { id: "figma", name: "Figma", category: "Design", group: 2 },
]

const CONTENT_GROUPS = [
    {
        eyebrow: "Frontend & Core",
        stat: "24+",
        title: "Next.js, React, TypeScript, and Tailwind - the modern foundation behind every product we ship.",
        description: "Type-safe, server-rendered interfaces built on React Server Components. Fast to build, fast to load, easy to maintain.",
    },
    {
        eyebrow: "Cloud & Infrastructure",
        stat: "Scale",
        title: "AWS, Azure, GCP, Docker, Kubernetes, and Terraform - infrastructure engineered for zero downtime.",
        description: "Serverless functions, container orchestration, and infrastructure as code so your systems scale on demand without surprises.",
    },
    {
        eyebrow: "AI, Data & Services",
        stat: "Wired in",
        title: "OpenAI, Anthropic, PostgreSQL, Prisma, tRPC, Stripe, and Vercel powering real features.",
        description: "Custom LLM agents, type-safe end-to-end APIs, relational data, payments, and global deployment - built in from day one.",
    },
]

function LogoSVG({ item }: { item: IntegrationItem }) {
    switch (item.id) {
        case "nextjs":
            return (
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <rect width="32" height="32" rx="8" fill="#1a1a1a" />
                    <circle cx="16" cy="16" r="9" stroke="white" strokeWidth="1.4" fill="none" opacity="0.5" />
                    <path d="M12 22 L12 10 L21 22 M20 10 L20 18" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
            )
        case "react":
            return (
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <rect width="32" height="32" rx="8" fill="#1a1a1a" />
                    <circle cx="16" cy="16" r="2.2" fill="white" />
                    <g stroke="white" strokeWidth="1.4" fill="none" opacity="0.9">
                        <ellipse cx="16" cy="16" rx="9" ry="3.6" />
                        <ellipse cx="16" cy="16" rx="9" ry="3.6" transform="rotate(60 16 16)" />
                        <ellipse cx="16" cy="16" rx="9" ry="3.6" transform="rotate(120 16 16)" />
                    </g>
                </svg>
            )
        case "typescript":
            return (
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <rect width="32" height="32" rx="8" fill="#1a1a1a" />
                    <text x="16" y="22" textAnchor="middle" fill="white" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="13">TS</text>
                </svg>
            )
        case "tailwind":
            return (
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <rect width="32" height="32" rx="8" fill="#1a1a1a" />
                    <path d="M11 15 C12 11.5 14 10 17 10 C21 10 21.5 13 23 13.8 C24 14.3 25 14 26 13 C25 16.5 23 18 20 18 C16 18 15.5 15 14 14.2 C13 13.7 12 14 11 15 Z" fill="white" opacity="0.6" />
                    <path d="M6 21 C7 17.5 9 16 12 16 C16 16 16.5 19 18 19.8 C19 20.3 20 20 21 19 C20 22.5 18 24 15 24 C11 24 10.5 21 9 20.2 C8 19.7 7 20 6 21 Z" fill="white" />
                </svg>
            )
        case "node":
            return (
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <rect width="32" height="32" rx="8" fill="#1a1a1a" />
                    <path d="M16 6 L25 11 L25 21 L16 26 L7 21 L7 11 Z" stroke="white" strokeWidth="1.4" strokeLinejoin="round" fill="none" opacity="0.55" />
                    <path d="M13 20 L13 13 L19 20 L19 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
            )
        case "python":
            return (
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <rect width="32" height="32" rx="8" fill="#1a1a1a" />
                    <path d="M16 7 C12 7 12 9 12 11 L18 11 L18 12 L10 12 C8 12 7 13.5 7 16 C7 18.5 8 20 10 20 L12 20 L12 17 C12 15 13 14 15 14 L19 14 C20.5 14 21 13 21 11.5 L21 11 C21 9 21 7 16 7 Z M14 9 A1 1 0 1 1 14 9.01" fill="white" opacity="0.85" />
                    <path d="M16 25 C20 25 20 23 20 21 L14 21 L14 20 L22 20 C24 20 25 18.5 25 16 C25 13.5 24 12 22 12 L20 12 L20 15 C20 17 19 18 17 18 L13 18 C11.5 18 11 19 11 20.5 L11 21 C11 23 11 25 16 25 Z M18 23 A1 1 0 1 1 18 23.01" fill="white" />
                </svg>
            )
        case "aws":
            return (
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <rect width="32" height="32" rx="8" fill="#1a1a1a" />
                    <text x="16" y="18" textAnchor="middle" fill="white" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="9">aws</text>
                    <path d="M9 22 C13 24.5 19 24.5 23 22" stroke="white" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                    <path d="M21 21 L23.5 21.5 L23 24" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
            )
        case "azure":
            return (
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <rect width="32" height="32" rx="8" fill="#1a1a1a" />
                    <path d="M14 8 L20 8 L25 24 L17 24 L21 17 L13 18 Z M14 8 L7 24 L13 24 Z" fill="white" opacity="0.9" />
                </svg>
            )
        case "gcp":
            return (
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <rect width="32" height="32" rx="8" fill="#1a1a1a" />
                    <path d="M11 20 C8.5 20 7 18.5 7 16.5 C7 14.5 8.5 13 10.5 13 C11 10.5 13.5 9 16 9 C19 9 21 11 21.5 13.2 C24 13.5 25 15.5 25 17 C25 18.7 23.7 20 22 20 Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
                    <circle cx="16" cy="15.5" r="2" fill="white" />
                </svg>
            )
        case "docker":
            return (
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <rect width="32" height="32" rx="8" fill="#1a1a1a" />
                    <g fill="white" opacity="0.95">
                        <rect x="9" y="16" width="3" height="3" rx="0.5" />
                        <rect x="13" y="16" width="3" height="3" rx="0.5" />
                        <rect x="17" y="16" width="3" height="3" rx="0.5" />
                        <rect x="13" y="12" width="3" height="3" rx="0.5" />
                        <rect x="17" y="12" width="3" height="3" rx="0.5" />
                    </g>
                    <path d="M8 19 C8 22 11 24 16 24 C21 24 24 21 24.5 18 C25.5 18.3 26 17.5 26 17 C25 16.5 24 17 23.5 17.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
            )
        case "kubernetes":
            return (
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <rect width="32" height="32" rx="8" fill="#1a1a1a" />
                    <path d="M16 7 L23 11 L23 19 L16 23 L9 19 L9 11 Z" stroke="white" strokeWidth="1.4" strokeLinejoin="round" fill="none" opacity="0.55" />
                    <circle cx="16" cy="15" r="2.2" fill="white" />
                    <g stroke="white" strokeWidth="1.3" strokeLinecap="round">
                        <line x1="16" y1="15" x2="16" y2="9" />
                        <line x1="16" y1="15" x2="21" y2="18" />
                        <line x1="16" y1="15" x2="11" y2="18" />
                    </g>
                </svg>
            )
        case "terraform":
            return (
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <rect width="32" height="32" rx="8" fill="#1a1a1a" />
                    <g fill="white" opacity="0.95">
                        <path d="M14 9 L18 11.3 L18 16 L14 13.7 Z" />
                        <path d="M19 12 L23 14.3 L23 19 L19 16.7 Z" />
                        <path d="M14 14.5 L18 16.8 L18 21.5 L14 19.2 Z" />
                    </g>
                </svg>
            )
        case "openai":
            return (
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <rect width="32" height="32" rx="8" fill="#1a1a1a" />
                    <g transform="translate(16,16)">
                        {
                            [0, 60, 120, 180, 240, 300].map((deg, i) => (
                                <ellipse key={i} cx="0" cy="-5.5" rx="2.2" ry="5.5" fill="white" opacity="0.88" transform={`rotate(${deg})`} />
                            ))
                        }
                        <circle cx="0" cy="0" r="2.5" fill="#1a1a1a" />
                    </g>
                </svg>
            )
        case "anthropic":
            return (
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <rect width="32" height="32" rx="8" fill="#1a1a1a" />
                    <path d="M10 24 L16 8 L22 24" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <line x1="12.5" y1="19" x2="19.5" y2="19" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
            )
        case "postgres":
            return (
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <rect width="32" height="32" rx="8" fill="#1a1a1a" />
                    <ellipse cx="16" cy="11" rx="7" ry="3" stroke="white" strokeWidth="1.6" fill="none" />
                    <path d="M9 11 L9 21 C9 22.7 12 24 16 24 C20 24 23 22.7 23 21 L23 11" stroke="white" strokeWidth="1.6" fill="none" />
                    <path d="M9 16 C9 17.7 12 19 16 19 C20 19 23 17.7 23 16" stroke="white" strokeWidth="1.6" fill="none" opacity="0.6" />
                </svg>
            )
        case "prisma":
            return (
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <rect width="32" height="32" rx="8" fill="#1a1a1a" />
                    <path d="M14 7 L23 22 C23.4 22.7 23 23.5 22.2 23.7 L11 26.5 C10.2 26.7 9.5 26 9.7 25.2 L13 8 C13.2 7 14 6.5 14 7 Z" fill="white" opacity="0.92" />
                    <path d="M14 9 L21 21 L12 23.5 Z" fill="#1a1a1a" opacity="0.5" />
                </svg>
            )
        case "trpc":
            return (
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <rect width="32" height="32" rx="8" fill="#1a1a1a" />
                    <rect x="8" y="8" width="16" height="16" rx="5" stroke="white" strokeWidth="1.6" fill="none" />
                    <text x="16" y="19.5" textAnchor="middle" fill="white" fontFamily="monospace" fontWeight="700" fontSize="8">tRPC</text>
                </svg>
            )
        case "redis":
            return (
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <rect width="32" height="32" rx="8" fill="#1a1a1a" />
                    <g stroke="white" strokeWidth="1.6" fill="none">
                        <path d="M8 12 C8 13.3 11.6 14.5 16 14.5 C20.4 14.5 24 13.3 24 12" />
                        <path d="M8 16 C8 17.3 11.6 18.5 16 18.5 C20.4 18.5 24 17.3 24 16" opacity="0.7" />
                        <path d="M8 20 C8 21.3 11.6 22.5 16 22.5 C20.4 22.5 24 21.3 24 20" opacity="0.5" />
                        <ellipse cx="16" cy="11" rx="8" ry="2.5" />
                    </g>
                </svg>
            )
        case "stripe":
            return (
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <rect width="32" height="32" rx="8" fill="#1a1a1a" />
                    <text x="16" y="21" textAnchor="middle" fill="white" fontFamily="Arial Black, sans-serif" fontStyle="italic" fontWeight="900" fontSize="13">S</text>
                </svg>
            )
        case "razorpay":
            return (
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <rect width="32" height="32" rx="8" fill="#1a1a1a" />
                    <path d="M13 8 L21 8 L15 24 L11 24 L13 16 L10 16 Z" fill="white" opacity="0.9" />
                </svg>
            )
        case "vercel":
            return (
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <rect width="32" height="32" rx="8" fill="#1a1a1a" />
                    <path d="M16 9 L24 23 L8 23 Z" fill="white" />
                </svg>
            )
        case "reactnative":
            return (
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <rect width="32" height="32" rx="8" fill="#1a1a1a" />
                    <rect x="11" y="6" width="10" height="20" rx="2.5" stroke="white" strokeWidth="1.4" fill="none" opacity="0.55" />
                    <circle cx="16" cy="16" r="1.8" fill="white" />
                    <g stroke="white" strokeWidth="1.1" fill="none">
                        <ellipse cx="16" cy="16" rx="6" ry="2.4" />
                        <ellipse cx="16" cy="16" rx="6" ry="2.4" transform="rotate(60 16 16)" />
                        <ellipse cx="16" cy="16" rx="6" ry="2.4" transform="rotate(120 16 16)" />
                    </g>
                </svg>
            )
        case "flutter":
            return (
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <rect width="32" height="32" rx="8" fill="#1a1a1a" />
                    <path d="M20 7 L11 16 L14 19 L23 10 Z" fill="white" opacity="0.95" />
                    <path d="M20 15 L15 20 L20 25 L23 22 L18 17 Z" fill="white" opacity="0.7" />
                </svg>
            )
        case "figma":
            return (
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <rect width="32" height="32" rx="8" fill="#1a1a1a" />
                    <g fill="white">
                        <circle cx="19" cy="16" r="2.6" opacity="0.85" />
                        <path d="M13.5 8 L16 8 L16 13 L13.5 13 A2.5 2.5 0 0 1 13.5 8 Z" opacity="0.95" />
                        <path d="M16 8 L18.5 8 A2.5 2.5 0 0 1 18.5 13 L16 13 Z" opacity="0.7" />
                        <path d="M13.5 13 L16 13 L16 18 L13.5 18 A2.5 2.5 0 0 1 13.5 13 Z" opacity="0.8" />
                        <path d="M13.5 18 L16 18 L16 21 A2.5 2.5 0 1 1 13.5 18 Z" opacity="0.6" />
                    </g>
                </svg>
            )
        default:
            return (
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <rect width="32" height="32" rx="8" fill="#1a1a1a" />
                    <text x="16" y="21" textAnchor="middle" fill="white" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="12">
                        {item.name.charAt(0)}
                    </text>
                </svg>
            )
    }
}

function IntegrationCard({ item }: { item: IntegrationItem }) {
    return (
        <div className="flex flex-col items-center gap-2" style={{ userSelect: "none" }}>
            <div className="w-[88px] h-[88px] rounded-[22px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700/70 shadow-[0_12px_36px_rgba(0,0,0,0.12)] flex items-center justify-center">
                <div className="scale-[1.8] opacity-90">
                    <LogoSVG item={item} />
                </div>
            </div>
            <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 tracking-wide whitespace-nowrap">
                {item.name}
            </span>
        </div>
    )
}

export default function IntegrationsSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const orbRefs = useRef<(HTMLDivElement | null)[]>([])
    const groupRefs = useRef<(HTMLDivElement | null)[]>([])
    const dotRefs = useRef<(HTMLDivElement | null)[]>([])
    const activeRef = useRef<number>(-1)

    useEffect(() => {
        const handler = () => {
            const section = sectionRef.current
            if (!section) return
            const vh = window.innerHeight
            const rect = section.getBoundingClientRect()
            const rel = -rect.top
            const sectionH = section.offsetHeight - vh
            if (sectionH <= 0) return
            const progress = Math.max(0, Math.min(1, rel / sectionH))

            const rx = Math.min(window.innerWidth * 0.36, 520)
            const ry = Math.min(window.innerHeight * 0.3, 300)
            const orbitAngle = progress * Math.PI * 0.8

            orbRefs.current.forEach((el, i) => {
                if (!el) return
                const startAngle = (i / INTEGRATIONS.length) * Math.PI * 2 - Math.PI / 2
                const angle = startAngle + orbitAngle
                const x = Math.cos(angle) * rx
                const y = Math.sin(angle) * ry
                const depth = 0.85 + 0.16 * (1 - (y + ry) / (2 * ry))
                el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${depth})`
                el.style.zIndex = String(Math.round(((y + ry) / (2 * ry)) * 8) + 1)
            })

            const activeGroup = Math.min(2, Math.floor(progress * 3 + 0.0001))
            if (activeGroup !== activeRef.current) {
                activeRef.current = activeGroup
                groupRefs.current.forEach((el, i) => {
                    if (!el) return
                    el.style.opacity = i === activeGroup ? "1" : "0"
                    el.style.transform = i === activeGroup ? "translateY(0)" : `translateY(${i < activeGroup ? "-12px" : "12px"})`
                })
                dotRefs.current.forEach((el, i) => {
                    if (!el) return
                    el.style.transform = i === activeGroup ? "scale(1.4)" : "scale(1)"
                    el.style.background = i === activeGroup ? "#171717" : "#d4d4d4"
                })
            }
        }

        window.addEventListener("scroll", handler, { passive: true })
        handler()
        return () => window.removeEventListener("scroll", handler)
    }, [])

    return (
        <section ref={sectionRef} className="relative" style={{ height: "260vh" }}>
            <div className="max-w-7xl mx-auto px-6 pt-24 pb-6 text-center">
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 mb-3">
                    Our stack
                </p>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    The stack we{" "}
                    <span className="text-neutral-400 dark:text-neutral-500">build on</span>
                </h2>
                <p className="mt-4 text-base text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">
                    Battle-tested tools, wired together. Next.js, React, AWS, Kubernetes, and more - production-ready from day one.
                </p>
            </div>
            <div className="sticky top-0 overflow-hidden" style={{ height: "100vh" }}>
                <div style={{ position: "absolute", top: 26, left: "50%", transform: "translateX(-50%)", zIndex: 20, pointerEvents: "none" }}>
                    <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-neutral-400 dark:text-neutral-600 whitespace-nowrap">
                        Engineering stack
                    </p>
                </div>
                <div className="absolute inset-0 z-[2]">
                    {
                        INTEGRATIONS.map((item, i) => (
                            <div
                                key={item.id}
                                ref={el => { orbRefs.current[i] = el }}
                                style={{ position: "absolute", left: "50%", top: "50%", willChange: "transform", zIndex: 2 }}
                            >
                                <IntegrationCard item={item} />
                            </div>
                        ))
                    }
                </div>
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 20,
                        pointerEvents: "none",
                        width: "min(480px, 90vw)",
                    }}
                >
                    {
                        CONTENT_GROUPS.map((group, i) => (
                            <div
                                key={i}
                                ref={el => { groupRefs.current[i] = el }}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    opacity: 0,
                                    transform: "translateY(12px)",
                                    transition: "opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)",
                                    textAlign: "center",
                                }}
                            >
                                <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "#a3a3a3", marginBottom: 8 }}>
                                    {group.eyebrow}
                                </p>
                                <p
                                    className="dark:!text-white"
                                    style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "clamp(38px,4vw,64px)", color: "#171717", lineHeight: 1, letterSpacing: "-0.02em" }}
                                >
                                    {group.stat}
                                </p>
                                <p
                                    className="dark:!text-neutral-300"
                                    style={{ fontSize: "clamp(14px,1.2vw,17px)", color: "#404040", lineHeight: 1.45, margin: "10px auto 0", maxWidth: 320 }}
                                >
                                    {group.title}
                                </p>
                                <p
                                    className="dark:!text-neutral-500"
                                    style={{ fontSize: 12, color: "#737373", lineHeight: 1.5, margin: "8px auto 0", maxWidth: 280 }}
                                >
                                    {group.description}
                                </p>
                            </div>
                        ))
                    }
                </div>
                <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 10, zIndex: 20 }}>
                    {
                        [0, 1, 2].map(i => (
                            <div
                                key={i}
                                ref={el => { dotRefs.current[i] = el }}
                                style={{ width: 7, height: 7, borderRadius: "50%", background: "#e5e5e5", transition: "transform 0.35s, background 0.35s" }}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}