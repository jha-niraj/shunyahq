"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
    ChevronRight, ChevronDown, Menu, X, ArrowRight, Code2, Smartphone, BrainCircuit,
    Cloud, Palette, ShieldCheck, Heart, BookOpen, Rocket, Mail,
    Orbit, Calculator, Wallet, PhoneCall, Activity, ScanSearch, Component
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/themetoggle"
import { cn } from "@/lib/utils"

interface FeatureItem {
    title: string
    href: string
    description: string
    icon: React.ElementType
}

interface CompanyItem {
    title: string
    href: string
    description: string
    icon: React.ElementType
}

const SERVICES: FeatureItem[] = [
    {
        title: "Web Engineering",
        href: "/services/web-engineering",
        description: "High-performance web apps built to scale",
        icon: Code2,
    },
    {
        title: "Mobile Ecology",
        href: "/services/mobile-ecology",
        description: "Native and cross-platform mobile systems",
        icon: Smartphone,
    },
    {
        title: "AI Integration",
        href: "/services/ai-integration",
        description: "Intelligent features wired into your product",
        icon: BrainCircuit,
    },
    {
        title: "Cloud Architecture",
        href: "/services/cloud-architecture",
        description: "Resilient infrastructure that just works",
        icon: Cloud,
    },
    {
        title: "UI/UX Systems",
        href: "/services/ui-ux-systems",
        description: "Design systems users actually love",
        icon: Palette,
    },
    {
        title: "System Security",
        href: "/services/system-security",
        description: "Hardened, audited, production-ready systems",
        icon: ShieldCheck,
    },
]

const COMPANY: CompanyItem[] = [
    {
        title: "About Us",
        href: "/aboutus",
        description: "Our story, our team, and how we build",
        icon: Heart,
    },
    {
        title: "Blog",
        href: "/blogs",
        description: "Engineering notes and product thinking",
        icon: BookOpen,
    },
    {
        title: "Accelerator",
        href: "/accelerator",
        description: "We help startups go from idea to launch",
        icon: Rocket,
    },
    {
        title: "Contact",
        href: "/contactus",
        description: "Tell us what you want to build",
        icon: Mail,
    },
]

type ToolBadge = "Live" | "Beta" | "Soon"

interface ToolItem {
    title: string
    href?: string
    description: string
    icon: React.ElementType
    badge: ToolBadge
}

const TOOLS: ToolItem[] = [
    {
        title: "SyncOrbit",
        href: "/tools/syncorbit",
        description: "Real-time command center for engineering teams",
        icon: Orbit,
        badge: "Beta",
    },
    {
        title: "Project Budget Estimator",
        href: "/tools/budget-estimator",
        description: "Instant, transparent project cost estimates",
        icon: Calculator,
        badge: "Live",
    },
    {
        title: "Global Rate Card",
        href: "/pricing",
        description: "Transparent pricing in 4 currencies",
        icon: Wallet,
        badge: "Live",
    },
    {
        title: "Free Strategy Call",
        href: "https://cal.com/niraj-jha/30min",
        description: "30-min technical discovery call",
        icon: PhoneCall,
        badge: "Live",
    },
    {
        title: "Deploy Monitor",
        href: "/contactus",
        description: "Live uptime & CI/CD status dashboards",
        icon: Activity,
        badge: "Soon",
    },
    {
        title: "AI Code Reviewer",
        href: "/contactus",
        description: "Automated PR review agent",
        icon: ScanSearch,
        badge: "Soon",
    },
    {
        title: "Design System Kit",
        href: "/contactus",
        description: "Shunya's component library",
        icon: Component,
        badge: "Soon",
    },
]

const MOBILE_LINKS = [
    { label: "Services", href: "/services" },
    { label: "Solutions", href: "/solutions" },
    { label: "Work", href: "/projects" },
    { label: "Pricing", href: "/pricing" },
    { label: "About Us", href: "/aboutus" },
    { label: "Blog", href: "/blogs" },
    { label: "Accelerator", href: "/accelerator" },
    { label: "Contact", href: "/contactus" },
]

function IconChip({ icon: Icon }: { icon: React.ElementType }) {
    return (
        <span className="w-[34px] h-[34px] rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center shrink-0 text-neutral-700 dark:text-neutral-300">
            <Icon className="w-[15px] h-[15px]" />
        </span>
    )
}

function ServicesDropdown({ onClose }: { onClose: () => void }) {
    return (
        <div
            className={cn(
                "rounded-2xl border border-neutral-200 dark:border-neutral-800",
                "bg-white dark:bg-neutral-950",
                "shadow-[0_16px_48px_-12px_rgba(0,0,0,0.18)]",
                "flex overflow-hidden",
                "min-w-[660px]",
            )}
        >
            <div className="flex-1 p-4 grid grid-cols-2 gap-1">
                {
                    SERVICES.map((item, i) => (
                        <Link
                            key={`${item.title}-${i}`}
                            href={item.href}
                            onClick={onClose}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors group"
                        >
                            <IconChip icon={item.icon} />
                            <div className="min-w-0">
                                <p className="text-[13px] font-semibold text-neutral-900 dark:text-white leading-snug group-hover:text-neutral-700 dark:group-hover:text-neutral-200">
                                    {item.title}
                                </p>
                                <p className="text-[12px] text-neutral-500 dark:text-neutral-400 leading-snug mt-0.5">
                                    {item.description}
                                </p>
                            </div>
                        </Link>
                    ))
                }
            </div>
            <div className="w-[240px] shrink-0 border-l border-neutral-100 dark:border-neutral-800/70 p-4 flex flex-col gap-3">
                <Link
                    href="/services"
                    onClick={onClose}
                    className="inline-flex items-center gap-1 text-[12px] font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                    View all services
                    <ArrowRight className="w-3 h-3" />
                </Link>
                <div className="mt-auto rounded-xl bg-neutral-900 dark:bg-neutral-800 p-4 flex flex-col gap-3">
                    <p className="text-[13px] font-semibold text-white leading-snug">
                        Have a project in mind? Let&apos;s build it.
                    </p>
                    <Link
                        href="/contactus"
                        onClick={onClose}
                        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-neutral-900 bg-white px-3 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors w-fit"
                    >
                        Start a Project
                        <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

function CompanyDropdown({ onClose }: { onClose: () => void }) {
    return (
        <div
            className={cn(
                "rounded-2xl border border-neutral-200 dark:border-neutral-800",
                "bg-white dark:bg-neutral-950",
                "shadow-[0_16px_48px_-12px_rgba(0,0,0,0.18)]",
                "w-[400px] p-2",
            )}
        >
            {
                COMPANY.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors group"
                    >
                        <IconChip icon={item.icon} />
                        <div className="min-w-0">
                            <p className="text-[13px] font-semibold text-neutral-900 dark:text-white leading-snug group-hover:text-neutral-700 dark:group-hover:text-neutral-200">
                                {item.title}
                            </p>
                            <p className="text-[12px] text-neutral-500 dark:text-neutral-400 leading-snug mt-0.5">
                                {item.description}
                            </p>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

function StatusChip({ badge }: { badge: ToolBadge }) {
    return (
        <span
            className={cn(
                "shrink-0 text-[10px] font-semibold leading-none uppercase tracking-wide px-1.5 py-1 rounded-full border",
                badge === "Live" &&
                    "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20",
                badge === "Beta" &&
                    "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20",
                badge === "Soon" &&
                    "text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700",
            )}
        >
            {badge}
        </span>
    )
}

function ToolsDropdown({ onClose }: { onClose: () => void }) {
    return (
        <div
            className={cn(
                "rounded-2xl border border-neutral-200 dark:border-neutral-800",
                "bg-white dark:bg-neutral-950",
                "shadow-[0_16px_48px_-12px_rgba(0,0,0,0.18)]",
                "flex overflow-hidden",
                "min-w-[660px]",
            )}
        >
            <div className="flex-1 p-4 grid grid-cols-2 gap-1">
                {
                    TOOLS.map((item, i) => {
                        const isSoon = item.badge === "Soon"
                        const content = (
                            <>
                                <IconChip icon={item.icon} />
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-1.5">
                                        <p className="text-[13px] font-semibold text-neutral-900 dark:text-white leading-snug group-hover:text-neutral-700 dark:group-hover:text-neutral-200 truncate">
                                            {item.title}
                                        </p>
                                        <StatusChip badge={item.badge} />
                                    </div>
                                    <p className="text-[12px] text-neutral-500 dark:text-neutral-400 leading-snug mt-0.5">
                                        {item.description}
                                    </p>
                                </div>
                            </>
                        )
                        const baseClass =
                            "flex items-start gap-3 p-3 rounded-xl transition-colors group"
                        if (!item.href) {
                            return (
                                <div
                                    key={`${item.title}-${i}`}
                                    className={cn(baseClass, "opacity-60 cursor-default")}
                                >
                                    {content}
                                </div>
                            )
                        }
                        return (
                            <Link
                                key={`${item.title}-${i}`}
                                href={item.href}
                                onClick={onClose}
                                className={cn(
                                    baseClass,
                                    "hover:bg-neutral-50 dark:hover:bg-neutral-900",
                                    isSoon && "opacity-60",
                                )}
                            >
                                {content}
                            </Link>
                        )
                    })
                }
            </div>
            <div className="w-[240px] shrink-0 border-l border-neutral-100 dark:border-neutral-800/70 p-4 flex flex-col gap-3">
                <Link
                    href="/tools"
                    onClick={onClose}
                    className="inline-flex items-center gap-1 text-[12px] font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                    Explore all tools
                    <ArrowRight className="w-3 h-3" />
                </Link>
                <div className="mt-auto rounded-xl bg-neutral-900 dark:bg-neutral-800 p-4 flex flex-col gap-3">
                    <p className="text-[13px] font-semibold text-white leading-snug">
                        Free, transparent tools - no signup required.
                    </p>
                    <Link
                        href="/tools"
                        onClick={onClose}
                        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-neutral-900 bg-white px-3 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors w-fit"
                    >
                        Browse Tools
                        <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

interface DropdownTriggerProps {
    label: string
    isOpen: boolean
    onMouseEnter: () => void
    active?: boolean
}

function DropdownTrigger({ label, isOpen, onMouseEnter, active }: DropdownTriggerProps) {
    return (
        <button
            type="button"
            onMouseEnter={onMouseEnter}
            className={cn(
                "inline-flex items-center gap-0.5 text-[15px] font-medium px-3.5 py-2 rounded-lg transition-colors duration-150 cursor-default select-none",
                isOpen || active
                    ? "text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800"
                    : "text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60",
            )}
        >
            {label}
            <ChevronDown
                className={cn(
                    "w-3.5 h-3.5 transition-transform duration-150",
                    isOpen ? "rotate-180" : "rotate-0",
                )}
            />
        </button>
    )
}

interface NavbarProps {
    active?: string
    light?: boolean
}

// Derive the active nav key from the current path so shared layouts can render
// <Navbar /> without every page passing an `active` prop. An explicit `active`
// prop still wins when provided.
function activeFromPath(pathname: string | null): string | undefined {
    if (!pathname) return undefined
    if (pathname.startsWith("/services")) return "services"
    if (pathname.startsWith("/solutions")) return "solutions"
    if (pathname.startsWith("/tools")) return "tools"
    if (pathname.startsWith("/projects")) return "projects"
    if (pathname.startsWith("/pricing")) return "pricing"
    if (pathname.startsWith("/aboutus")) return "aboutus"
    if (pathname.startsWith("/blogs")) return "blogs"
    if (pathname.startsWith("/accelerator")) return "accelerator"
    if (pathname.startsWith("/contactus")) return "contactus"
    return undefined
}

export function Navbar({ active: activeProp }: NavbarProps) {
    const pathname = usePathname()
    const active = activeProp ?? activeFromPath(pathname)
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [openMenu, setOpenMenu] = useState<string | null>(null)
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 8)
        fn()
        window.addEventListener("scroll", fn, { passive: true })
        return () => window.removeEventListener("scroll", fn)
    }, [])

    const handleEnter = (name: string) => {
        if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null }
        setOpenMenu(name)
    }
    const handleLeave = () => {
        closeTimerRef.current = setTimeout(() => setOpenMenu(null), 120)
    }
    const closeDropdown = () => setOpenMenu(null)

    useEffect(() => () => { if (closeTimerRef.current) clearTimeout(closeTimerRef.current) }, [])

    return (
        <header className="fixed top-3 left-0 right-0 z-[100] w-full px-4">
            <div
                className={cn(
                    'max-w-7xl mx-auto rounded-3xl fixed top-2 left-0 right-0 z-[100] px-4 py-3 border ring-1 backdrop-blur-2xl backdrop-saturate-200 transition-[background,box-shadow] duration-300',
                    scrolled
                        ? 'bg-white/65 dark:bg-neutral-950/70 border-white/60 dark:border-white/10 ring-black/[0.04] dark:ring-white/[0.06] shadow-[0_14px_44px_-16px_rgba(0,0,0,0.32)]'
                        : 'bg-white/50 dark:bg-neutral-950/60 border-white/50 dark:border-white/10 ring-black/[0.03] dark:ring-white/[0.08] shadow-[0_10px_34px_-18px_rgba(0,0,0,0.24)]',
                )}
            >
                <div className="flex items-center justify-between gap-6">
                    <Link href="/" className="flex items-center gap-2 shrink-0 text-neutral-900 dark:text-white">
                        <Image src="/shunya-mark.png" alt="Shunya" width={30} height={30} className="h-7 w-7 dark:invert" />
                        <span className="font-bold tracking-tight text-lg leading-none">Shunya</span>
                        <span className="hidden sm:block text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400 leading-none">
                            Tech
                        </span>
                    </Link>
                    <nav className="hidden lg:flex items-center gap-0.5 relative" onMouseLeave={handleLeave}>
                        <div className="relative" onMouseEnter={() => handleEnter("services")}>
                            <DropdownTrigger
                                label="Services"
                                isOpen={openMenu === "services"}
                                onMouseEnter={() => handleEnter("services")}
                                active={active === "services"}
                            />
                            <AnimatePresence>
                                {
                                    openMenu === "services" && (
                                        <motion.div
                                            key="services-wrap"
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -4 }}
                                            transition={{ duration: 0.13, ease: "easeOut" }}
                                            onMouseEnter={() => handleEnter("services")}
                                            className="absolute top-full left-1/2 -translate-x-1/2 mt-1 z-[200]"
                                        >
                                            <ServicesDropdown onClose={closeDropdown} />
                                        </motion.div>
                                    )
                                }
                            </AnimatePresence>
                        </div>
                        <Link
                            href="/solutions"
                            onMouseEnter={() => handleEnter("")}
                            className={cn(
                                "text-[15px] font-medium px-3.5 py-2 rounded-lg transition-colors duration-150",
                                active === "solutions"
                                    ? "text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800"
                                    : "text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60",
                            )}
                        >
                            Solutions
                        </Link>
                        <div className="relative" onMouseEnter={() => handleEnter("tools")}>
                            <DropdownTrigger
                                label="Tools"
                                isOpen={openMenu === "tools"}
                                onMouseEnter={() => handleEnter("tools")}
                                active={active === "tools"}
                            />
                            <AnimatePresence>
                                {
                                    openMenu === "tools" && (
                                        <motion.div
                                            key="tools-wrap"
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -4 }}
                                            transition={{ duration: 0.13, ease: "easeOut" }}
                                            onMouseEnter={() => handleEnter("tools")}
                                            className="absolute top-full left-1/2 -translate-x-1/2 mt-1 z-[200]"
                                        >
                                            <ToolsDropdown onClose={closeDropdown} />
                                        </motion.div>
                                    )
                                }
                            </AnimatePresence>
                        </div>
                        <Link
                            href="/projects"
                            onMouseEnter={() => handleEnter("")}
                            className={cn(
                                "text-[15px] font-medium px-3.5 py-2 rounded-lg transition-colors duration-150",
                                active === "projects"
                                    ? "text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800"
                                    : "text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60",
                            )}
                        >
                            Work
                        </Link>
                        <Link
                            href="/pricing"
                            onMouseEnter={() => handleEnter("")}
                            className={cn(
                                "text-[15px] font-medium px-3.5 py-2 rounded-lg transition-colors duration-150",
                                active === "pricing"
                                    ? "text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800"
                                    : "text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60",
                            )}
                        >
                            Pricing
                        </Link>
                        <div className="relative" onMouseEnter={() => handleEnter("company")}>
                            <DropdownTrigger
                                label="Company"
                                isOpen={openMenu === "company"}
                                onMouseEnter={() => handleEnter("company")}
                                active={["aboutus", "blogs", "accelerator", "contactus"].includes(active ?? "")}
                            />
                            <AnimatePresence>
                                {
                                    openMenu === "company" && (
                                        <motion.div
                                            key="company-wrap"
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -4 }}
                                            transition={{ duration: 0.13, ease: "easeOut" }}
                                            onMouseEnter={() => handleEnter("company")}
                                            className="absolute top-full left-1/2 -translate-x-1/2 mt-1 z-[200]"
                                        >
                                            <CompanyDropdown onClose={closeDropdown} />
                                        </motion.div>
                                    )
                                }
                            </AnimatePresence>
                        </div>
                    </nav>
                    <div className="hidden lg:flex items-center gap-1.5 shrink-0">
                        <ThemeToggle />
                        <div className="w-px h-5 bg-neutral-200 dark:bg-neutral-800 mx-1" />
                        <Link
                            href="/contactus"
                            className="text-[14px] font-medium text-neutral-600 dark:text-neutral-300 px-3.5 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        >
                            Contact
                        </Link>
                        <Link
                            href="/contactus"
                            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 px-4 py-2 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
                        >
                            Start a Project <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                    <div className="flex lg:hidden items-center gap-1.5">
                        <ThemeToggle />
                        <button
                            type="button"
                            onClick={() => setMobileOpen((v) => !v)}
                            aria-label="Toggle menu"
                            className="p-1.5 text-neutral-700 dark:text-neutral-300 cursor-pointer"
                        >
                            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {
                    mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="mt-1.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-xl px-4 py-4"
                        >
                            <div className="flex flex-col">
                                {
                                    MOBILE_LINKS.map((l) => (
                                        <Link
                                            key={l.href}
                                            href={l.href}
                                            onClick={() => setMobileOpen(false)}
                                            className={cn(
                                                "py-3 text-[15px] transition-colors border-b border-neutral-100 dark:border-neutral-800/70",
                                                active === l.href.replace("/", "")
                                                    ? "text-neutral-900 dark:text-white font-medium"
                                                    : "text-neutral-600 dark:text-neutral-300",
                                            )}
                                        >
                                            {l.label}
                                        </Link>
                                    ))
                                }
                            </div>
                            <div className="mt-4">
                                <Link
                                    href="/tools"
                                    onClick={() => setMobileOpen(false)}
                                    className={cn(
                                        "flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] mb-1",
                                        active === "tools"
                                            ? "text-neutral-900 dark:text-white"
                                            : "text-neutral-500 dark:text-neutral-400",
                                    )}
                                >
                                    Tools
                                    <ArrowRight className="w-3 h-3" />
                                </Link>
                                <div className="flex flex-col">
                                    {
                                        TOOLS.map((t, i) => {
                                            const inner = (
                                                <>
                                                    <span className="min-w-0">
                                                        <span className="block text-[14px] text-neutral-700 dark:text-neutral-200 truncate">
                                                            {t.title}
                                                        </span>
                                                        <span className="block text-[12px] text-neutral-500 dark:text-neutral-400 truncate">
                                                            {t.description}
                                                        </span>
                                                    </span>
                                                    <StatusChip badge={t.badge} />
                                                </>
                                            )
                                            const rowClass = cn(
                                                "flex items-center justify-between gap-3 py-2.5",
                                                i < TOOLS.length - 1 && "border-b border-neutral-100 dark:border-neutral-800/70",
                                            )
                                            if (!t.href) {
                                                return (
                                                    <div key={t.title} className={cn(rowClass, "opacity-60")}>
                                                        {inner}
                                                    </div>
                                                )
                                            }
                                            return (
                                                <Link
                                                    key={t.title}
                                                    href={t.href}
                                                    onClick={() => setMobileOpen(false)}
                                                    className={cn(rowClass, t.badge === "Soon" && "opacity-60")}
                                                >
                                                    {inner}
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col gap-2.5 mt-4">
                                <Link
                                    href="/contactus"
                                    onClick={() => setMobileOpen(false)}
                                    className="block text-center py-2.5 text-[14px] font-semibold text-white dark:text-neutral-900 bg-neutral-900 dark:bg-white rounded-xl"
                                >
                                    Start a Project
                                </Link>
                                <Link
                                    href="/projects"
                                    onClick={() => setMobileOpen(false)}
                                    className="block text-center py-2.5 text-[14px] font-medium text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 rounded-xl"
                                >
                                    See Our Work
                                </Link>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </header>
    )
}

export default Navbar
