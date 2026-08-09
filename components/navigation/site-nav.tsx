"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
    ChevronDown, Menu, X, ArrowRight, Code2, Rocket, Building2, Users,
    Briefcase, Wallet, Compass, ArrowLeftRight, FolderOpen, Lightbulb,
    Terminal, Orbit, Calculator, Heart, GraduationCap, Layers, BookOpen,
    Cpu, Scale, CalendarDays, Package,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/themetoggle"
import {
    Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion"
import { SERVICES } from "@/content/services"
import { USE_CASE_SLUGS } from "@/content/use-cases"
import { PROJECTS } from "@/content/projects"
import { PRODUCT_TOOLS } from "@/app/tools/tools-meta"
import {
    BLOG_CATEGORIES, BLOG_CATEGORY_KEYS, getPublishedPosts, type BlogCategory,
} from "@/content/blog"

type Item = { title: string; href: string; description: string; icon: React.ElementType }

/**
 * ## Information architecture - what the five slots are, and why
 *
 * Checked against the navs of the studios a buyer actually shortlists alongside us (2026-08-09):
 *
 *  - **thoughtbot**: Services / Case studies / Industries / Resources / Our company / Hire us
 *  - **Basecamp** (product, but the same audience): Features / Customers / Pricing / Learn / About
 *  - **Intercom**: Product / Customers / Pricing / Resources / Contact sales
 *
 * Three patterns hold across all of them and this nav follows each:
 *
 *  1. **Proof gets a top-level slot.** For a studio, the portfolio IS the product. thoughtbot puts
 *     Case studies beside Services; product companies put Customers there. Ours is `Work`.
 *  2. **Pricing is a direct link, never nested.** Unusual for an agency and a genuine differentiator
 *     when you publish a rate card, which we do - burying it throws that away.
 *  3. **Reading material gets its own menu**, separate from the sales pages.
 *
 * The organising rule, which is the one the old nav got wrong: group by the question the visitor is
 * asking, not by our internal taxonomy.
 *
 * ### What was actually wrong before
 *
 *  - **`Tools` was mostly fiction.** Four of its seven entries were badged "Soon" and pointed at
 *    `/contactus` - a Deploy Monitor, an AI Code Reviewer and a Design System Kit that do not exist.
 *    A nav slot advertising three products we cannot deliver is worse than no slot, and it pushed
 *    the two tools that ARE live below four that are not.
 *  - **`Services` was not services.** It held Pricing, Our Work and Solutions alongside the one real
 *    service, because the menu kept its name after the studio narrowed to web engineering. Three of
 *    its four entries belonged at top level.
 *  - **`Company` was a junk drawer.** About, Blog, Accelerator and Contact share nothing except not
 *    fitting elsewhere. Blog is reading material, Accelerator is an offering, Contact is the CTA
 *    two inches to the right.
 *  - **Six `/blogs/topics/*` hubs had no nav entry.** Every one has published posts and none was
 *    reachable from the nav - the same defect on 50 posts' worth of content.
 *  - **The six project pages were unreachable** except through the `/projects` index, which is the
 *    proof a studio's buyer most wants and the hardest to find.
 *
 * ### The five slots
 *
 *  1. **Services** - "what can you build for me". The one service, plus the four audience pages,
 *     which on this site describe what we build for each kind of buyer. Mega, two groups.
 *  2. **Work** - "have you done this before". All six case studies, direct.
 *  3. **Pricing** - direct link.
 *  4. **Insights** - "help me decide". The six topic hubs, plus every article and the free tools.
 *  5. **Company** - "who are you". About, the accelerator, and its portfolio.
 *
 * Every href resolves against the real route tree - `/services/*` and `/solutions/*` from the
 * content layer, `/projects/*` from PROJECTS, `/blogs/topics/*` only for categories with published
 * posts. A nav that 404s is worse than one that is merely disorganised.
 */

const WEB_SERVICE = SERVICES[0]

// The audience pages carry a long `heroSubtitle`, which is a paragraph rather than a nav blurb.
// These are written for the row: one line, the problem that audience actually arrives with.
const SOLUTION_BLURBS: Record<(typeof USE_CASE_SLUGS)[number], string> = {
    startups: "An MVP in front of users, fast",
    businesses: "Replace what you outgrew",
    enterprises: "Capacity that meets your bar",
    "product-teams": "Extra hands, no hand-holding",
}

const SOLUTION_LABELS: Record<(typeof USE_CASE_SLUGS)[number], string> = {
    startups: "Startups & founders",
    businesses: "Growing businesses",
    enterprises: "Enterprises",
    "product-teams": "Product teams",
}

const SOLUTION_ICONS: Record<(typeof USE_CASE_SLUGS)[number], React.ElementType> = {
    startups: Rocket,
    businesses: Building2,
    enterprises: Briefcase,
    "product-teams": Users,
}

const SERVICE_ITEMS: Item[] = [
    {
        title: WEB_SERVICE.name,
        href: `/services/${WEB_SERVICE.slug}`,
        description: "SaaS platforms, dashboards, marketing sites",
        icon: Code2,
    },
    {
        title: "SyncHQ",
        href: "/synchq",
        description: "Our own product, for agencies",
        icon: Orbit,
    },
]

// The content layer prefixes every label with "For ". The group heading above the grid already says
// that, so carrying it four times down the column reads as a stutter - and two of the four labels
// wrap to a second line at this width, which is what makes a panel look untidy.
const SOLUTION_ITEMS: Item[] = USE_CASE_SLUGS.map((slug) => ({
    title: SOLUTION_LABELS[slug],
    href: `/solutions/${slug}`,
    description: SOLUTION_BLURBS[slug],
    icon: SOLUTION_ICONS[slug],
}))

const PROJECT_ICONS: Record<string, React.ElementType> = {
    buildrhq: Cpu,
    vidhica: Scale,
    synchq: Orbit,
    gurukul: GraduationCap,
    eventeye: CalendarDays,
    "mp-solutions": Package,
}
const WORK_LINKS: Item[] = PROJECTS.map((p) => ({
    title: p.title,
    href: `/projects/${p.slug}`,
    description: p.tagline,
    icon: PROJECT_ICONS[p.slug] ?? Layers,
}))

// Topic order is reading order rather than alphabetical: what it costs and how to choose, then how
// to run it, then the comparisons, then the proof, then the technical corner.
const TOPIC_ORDER: BlogCategory[] = [
    "buying-guide", "guides", "comparisons", "case-studies", "insights", "engineering",
]
const TOPIC_ICONS: Record<BlogCategory, React.ElementType> = {
    "buying-guide": Wallet,
    guides: Compass,
    comparisons: ArrowLeftRight,
    "case-studies": FolderOpen,
    insights: Lightbulb,
    engineering: Terminal,
}

// Built from BLOG_CATEGORY_KEYS and intersected with categories that actually have a published
// post, so a topic emptied in the content layer cannot leave a dead link here - `/blogs/topics/[t]`
// 404s a category with nothing in it.
const LIVE_CATEGORIES = new Set(getPublishedPosts().map((p) => p.category))
const TOPIC_LINKS: Item[] = TOPIC_ORDER
    .filter((k) => (BLOG_CATEGORY_KEYS as string[]).includes(k) && LIVE_CATEGORIES.has(k))
    .map((k) => ({ title: BLOG_CATEGORIES[k], href: `/blogs/topics/${k}`, description: "", icon: TOPIC_ICONS[k] }))

const TOOL_ICONS: Record<string, React.ElementType> = {
    synchq: Orbit,
    "budget-estimator": Calculator,
}
// Two of the four entries in PRODUCT_TOOLS carry an `href` override and have no detail page -
// `/tools/[tool]` only generates params for tools without one, so linking them by slug 404s. They
// are dropped here rather than redirected: `rate-card` is the pricing page, which is already a
// top-level slot, and `strategy-call` is an external booking link that does not belong in a menu
// of our own pages.
const TOOL_LINKS: Item[] = PRODUCT_TOOLS.filter((t) => !t.href).map((t) => ({
    title: t.name,
    href: `/tools/${t.slug}`,
    description: t.status,
    icon: TOOL_ICONS[t.slug] ?? Layers,
}))

const COMPANY_LINKS: Item[] = [
    { title: "About us", href: "/aboutus", description: "How we work, and who is behind it", icon: Heart },
    { title: "Accelerator", href: "/accelerator", description: "Equity-friendly builds for founders", icon: Rocket },
    { title: "Accelerator startups", href: "/accelerator/startups", description: "The companies in the programme", icon: GraduationCap },
]

const NAV_ITEMS: { name: string; href?: string }[] = [
    { name: "Services" },
    { name: "Work" },
    { name: "Pricing", href: "/pricing" },
    { name: "Insights" },
    { name: "Company" },
]

/**
 * ## The fused-tab navbar
 *
 * The detail that makes this read as designed rather than assembled: when a menu opens, the trigger
 * stops looking like a button and becomes a TAB continuous with the panel below it. Three things
 * must line up exactly or the illusion breaks and it just looks misaligned:
 *
 *  1. `PILL_PAD` is the pill's padding, the tab's downward bleed, and the panel's top offset - ONE
 *     number used three times, so the tab bleeds exactly to the pill's bottom edge and the panel
 *     starts exactly there. Three hardcoded values drift; one constant cannot.
 *  2. The button's z-index is set INLINE, not with a `z-*` class - framer-motion writes its own
 *     inline z-index onto a `layoutId` element while it animates, and inline beats any class.
 *  3. Tab and panel share ONE left edge via a real `border`, never a `ring`. A ring is an outset
 *     box-shadow sitting 1px outside the box, which puts the panel's visible edge 1px left of the
 *     tab's and makes the join read as a misaligned step.
 *
 * Motion: the tab carries a shared `layoutId`, so moving between menus SLIDES one tab rather than
 * cross-fading two. The panel springs its own size, so the 720px services mega and the 340px list
 * morph into one another instead of popping.
 */

/** Pill padding, tab bleed and panel offset are the same number. See above. */
const PILL_PAD = 8

/**
 * The one surface colour, shared by the pill, the tab and the panel.
 *
 * A constant because two different values for one continuous surface can never be right: a
 * translucent pill over an opaque panel cannot look like a single sheet of paper.
 *
 * `bg-so-surface` rather than `bg-so-bg`, because `--so-bg` IS the page background in both themes -
 * a panel painted in it would have no surface of its own to sit on. White over #F6F4EE in light and
 * #171717 over #0a0a0a in dark give the sheet the one step of lift it needs.
 */
const SURFACE = "bg-so-surface"

/** Hairline on the tab (left, top, right - never bottom, which is the seam) and around the panel. */
const HAIRLINE = "border-so-line"

/**
 * Corner radius for the tab and panel - ONE value, because they are one shape. The tab's top corners
 * and the panel's corners must match, or the join looks like two objects that touch. The pill stays
 * `rounded-full`: that contrast is part of why the tab reads as a distinct plane.
 */
const CORNER = 10

/** Row hover. Steps away from SURFACE in both themes - surface-2 is #FAF8F2 / #1f1f1f. */
const ROW_HOVER = "hover:bg-so-surface-2"

function DropdownRow({ item, onSelect }: { item: Item; onSelect: () => void }) {
    const Icon = item.icon
    return (
        <Link
            href={item.href}
            onClick={onSelect}
            className={cn("group flex items-start gap-3.5 rounded-xl px-3 py-2.5 transition-colors duration-150", ROW_HOVER)}
        >
            <Icon
                className="mt-[3px] h-[18px] w-[18px] shrink-0 text-so-ink-4 transition-colors duration-150 group-hover:text-so-ink"
                strokeWidth={1.75}
            />
            <div className="min-w-0">
                <p className="text-[14px] font-semibold text-so-ink">{item.title}</p>
                {item.description && (
                    <p className="mt-0.5 text-[12.5px] leading-snug text-so-ink-3">{item.description}</p>
                )}
            </div>
        </Link>
    )
}

/**
 * The panel's header band: a serif eyebrow with a full-width rule under it. The rule is what makes
 * the panel read as a sheet with a header rather than a floating list, so it spans the FULL panel
 * width - it is a sibling of the body, not something padded inside it.
 */
function PanelHeading({ children }: { children: React.ReactNode }) {
    return (
        <div className={cn("px-5 py-3.5", HAIRLINE)} style={{ borderStyle: "solid", borderBottomWidth: 1 }}>
            <p className="so-serif text-[15px] italic text-so-ink-3">{children}</p>
        </div>
    )
}

function GroupHeading({ children }: { children: React.ReactNode }) {
    return (
        <p className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-so-ink-4">
            {children}
        </p>
    )
}

function RailLink({ href, label, onSelect }: { href: string; label: string; onSelect: () => void }) {
    return (
        <Link
            href={href}
            onClick={onSelect}
            className={cn(
                "group flex items-center justify-between gap-2 rounded-xl border px-4 py-2.5 text-[13px] font-medium text-so-ink-2 transition-colors duration-150",
                HAIRLINE,
                ROW_HOVER,
            )}
        >
            {label}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
    )
}

function ServicesDropdown({ onSelect }: { onSelect: () => void }) {
    return (
        // The heading band is a SIBLING of the body so its rule spans the full width, side rail
        // included.
        <div className="w-[740px]">
            <PanelHeading>One team, the whole stack, shipped end to end</PanelHeading>
            <div className="flex">
                <div className="flex-1 p-3">
                    <GroupHeading>What we build</GroupHeading>
                    <div className="grid grid-cols-2 gap-x-2">
                        {SERVICE_ITEMS.map((item) => (
                            <DropdownRow key={item.href} item={item} onSelect={onSelect} />
                        ))}
                    </div>
                    <div className="mt-3">
                        <GroupHeading>Who we build for</GroupHeading>
                        <div className="grid grid-cols-2 gap-x-2">
                            {SOLUTION_ITEMS.map((item) => (
                                <DropdownRow key={item.href} item={item} onSelect={onSelect} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={cn("flex w-[248px] shrink-0 flex-col gap-3 border-l p-3", HAIRLINE)}>
                    <RailLink href="/pricing" label="See the rate card" onSelect={onSelect} />
                    {/* The conversion slot every nav in this segment reserves in its lead mega. */}
                    <div className="mt-auto rounded-2xl bg-so-ink p-5">
                        <p className="text-[13.5px] font-semibold leading-snug text-so-bg">
                            Tell us what you want to build. We will scope it properly before quoting.
                        </p>
                        <Link
                            href="/contactus"
                            onClick={onSelect}
                            className="group mt-4 inline-flex w-fit items-center gap-1.5 rounded-xl bg-so-bg px-4 py-2 text-[12.5px] font-semibold text-so-ink transition-colors duration-150 hover:bg-so-surface"
                        >
                            Start a project
                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

/**
 * Work: all six case studies, two columns.
 *
 * Two columns rather than one long list, because six stacked rows makes the panel taller than the
 * services mega and the size-morph between them lurches.
 */
function WorkDropdown({ onSelect }: { onSelect: () => void }) {
    const half = Math.ceil(WORK_LINKS.length / 2)
    const columns = [WORK_LINKS.slice(0, half), WORK_LINKS.slice(half)]
    return (
        <div className="w-[600px]">
            <PanelHeading>Products we designed, built and launched</PanelHeading>
            <div className="p-3">
                <div className="grid grid-cols-2 gap-x-2">
                    {columns.map((col, i) => (
                        <div key={i} className="flex flex-col">
                            {col.map((item) => (
                                <DropdownRow key={item.href} item={item} onSelect={onSelect} />
                            ))}
                        </div>
                    ))}
                </div>
                <div className="mt-2">
                    <RailLink href="/projects" label="See all work" onSelect={onSelect} />
                </div>
            </div>
        </div>
    )
}

/**
 * Insights: the blog entered whole, or by the topic someone arrived looking for, plus the two live
 * tools. The tools sit here rather than in their own slot because there are two of them - a
 * two-item menu is a worse experience than the links having a real home.
 */
function InsightsDropdown({ onSelect }: { onSelect: () => void }) {
    const half = Math.ceil(TOPIC_LINKS.length / 2)
    const columns = [TOPIC_LINKS.slice(0, half), TOPIC_LINKS.slice(half)]
    return (
        <div className="w-[540px]">
            <PanelHeading>Fifty guides for people who commission software</PanelHeading>
            <div className="p-3">
                <GroupHeading>Browse by topic</GroupHeading>
                <div className="grid grid-cols-2 gap-x-2">
                    {columns.map((col, i) => (
                        <div key={i} className="flex flex-col">
                            {col.map((item) => (
                                <DropdownRow key={item.href} item={item} onSelect={onSelect} />
                            ))}
                        </div>
                    ))}
                </div>
                {/* Two destinations, not one: the blog is for someone who wants to read, the tools
                    for someone who wants a number. Collapsing them into "Resources" is what made the
                    tools unreachable in the first place. */}
                <div className="mt-2 grid grid-cols-2 gap-2">
                    <RailLink href="/blogs" label="Read every article" onSelect={onSelect} />
                    <RailLink href="/tools" label="Free tools" onSelect={onSelect} />
                </div>
            </div>
        </div>
    )
}

/** Every non-mega menu, from one component, so a change to the panel is a change to all of them. */
function SimpleDropdown({ heading, items, onSelect }: { heading: string; items: Item[]; onSelect: () => void }) {
    return (
        <div className="w-[368px]">
            <PanelHeading>{heading}</PanelHeading>
            <div className="flex flex-col p-3">
                {items.map((item) => (
                    <DropdownRow key={item.href} item={item} onSelect={onSelect} />
                ))}
            </div>
        </div>
    )
}

// Mobile: items with `links` render as an accordion; items with `href` are plain links. Mobile nav
// failures cost conversions disproportionately here - buyers research on a phone long before they
// open a laptop - so this mirrors the desktop IA exactly rather than simplifying it.
type MobileNavItem =
    | { name: string; href: string }
    | { name: string; links: { title: string; href: string; icon: React.ElementType }[]; viewAll?: { name: string; href: string } }

const MOBILE_NAV: MobileNavItem[] = [
    {
        name: "Services",
        links: [...SERVICE_ITEMS, ...SOLUTION_ITEMS].map(({ title, href, icon }) => ({ title, href, icon })),
        viewAll: { name: "See the rate card", href: "/pricing" },
    },
    {
        name: "Work",
        links: WORK_LINKS.map(({ title, href, icon }) => ({ title, href, icon })),
        viewAll: { name: "See all work", href: "/projects" },
    },
    { name: "Pricing", href: "/pricing" },
    {
        // Tools are appended here rather than left to the desktop panel: the mobile accordion renders
        // `links` only, so a destination outside TOPIC_LINKS is simply unreachable on a phone
        // otherwise - which is where most of this audience does its first research.
        name: "Insights",
        links: [
            ...TOPIC_LINKS.map(({ title, href, icon }) => ({ title, href, icon })),
            ...TOOL_LINKS.map(({ title, href, icon }) => ({ title, href, icon })),
        ],
        viewAll: { name: "Read every article", href: "/blogs" },
    },
    { name: "Company", links: COMPANY_LINKS.map(({ title, href, icon }) => ({ title, href, icon })) },
]

export function SiteNav() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [openMenu, setOpenMenu] = useState<string | null>(null)
    const navRef = useRef<HTMLElement>(null)
    const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : ""
        return () => {
            document.body.style.overflow = ""
        }
    }, [menuOpen])

    // Close the mobile sheet on an outside click. The sheet is a child of the header, so clicks
    // inside it do not count as outside.
    useEffect(() => {
        if (!menuOpen) return
        const onDown = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) setMenuOpen(false)
        }
        document.addEventListener("mousedown", onDown)
        return () => document.removeEventListener("mousedown", onDown)
    }, [menuOpen])

    // A hover menu with no keyboard exit is a trap for anyone navigating without a mouse.
    useEffect(() => {
        if (!openMenu) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpenMenu(null)
        }
        document.addEventListener("keydown", onKey)
        return () => document.removeEventListener("keydown", onKey)
    }, [openMenu])

    const enter = (name: string) => {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current)
            closeTimeout.current = null
        }
        setOpenMenu(name)
    }
    // A short grace period, so crossing the gap between tab and panel does not close it.
    const leave = () => {
        closeTimeout.current = setTimeout(() => setOpenMenu(null), 120)
    }
    const close = () => setOpenMenu(null)

    // Drives the pill's opaque state - see the SURFACE note.
    const isAnyOpen = openMenu !== null && openMenu !== ""

    const renderDropdown = (name: string) => {
        if (name === "Services") return <ServicesDropdown onSelect={close} />
        if (name === "Work") return <WorkDropdown onSelect={close} />
        if (name === "Insights") return <InsightsDropdown onSelect={close} />
        if (name === "Company") return <SimpleDropdown heading="Who is behind this" items={COMPANY_LINKS} onSelect={close} />
        return null
    }

    return (
        <header
            ref={navRef}
            // z-40 keeps the navbar above page content but BELOW the modal layer (Sheet/Dialog are
            // z-50), so dialogs render over it. Do not raise this.
            className="fixed inset-x-0 top-3 z-40 px-3"
        >
            <div className="relative mx-auto flex max-w-7xl items-center justify-center">
                {/* The pill. `overflow-visible` is load-bearing - the open tab bleeds past its bottom
                    edge to meet the panel, and a clip here severs the join. */}
                <div
                    className={cn(
                        "relative flex w-full items-center gap-1 rounded-[28px] backdrop-blur-xl backdrop-saturate-150 lg:rounded-full",
                        "transition-[background-color,box-shadow] duration-300",
                        // No ring or border: an outline here reads as a hard box AND draws a stripe
                        // across the open tab. Depth comes from the shadow alone.
                        isAnyOpen
                            ? cn(SURFACE, "shadow-[0_12px_44px_-14px_rgba(26,26,24,0.26)]")
                            : scrolled
                                ? "bg-so-bg/90 shadow-[0_10px_40px_-12px_rgba(26,26,24,0.20)]"
                                : "bg-so-bg/65 shadow-[0_6px_28px_-14px_rgba(26,26,24,0.14)]",
                    )}
                    style={{ padding: PILL_PAD }}
                >
                    <Link href="/" className="flex shrink-0 items-center gap-2 px-2.5 py-1.5" aria-label="ShunyaHQ home">
                        <Image
                            src="/shunyahqmainlogo.png"
                            alt=""
                            width={28}
                            height={28}
                            priority
                            className="h-7 w-7 invert dark:invert-0"
                        />
                        <span className="text-[16px] font-semibold tracking-[-0.01em] text-so-ink">ShunyaHQ</span>
                    </Link>

                    <div className="mx-1 hidden h-6 w-px bg-so-line lg:block" />

                    <nav className="relative hidden items-center lg:flex" onMouseLeave={leave}>
                        {NAV_ITEMS.map((item) => {
                            const isOpen = openMenu === item.name

                            if (item.href) {
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onMouseEnter={() => enter("")}
                                        className="relative z-30 inline-flex items-center rounded-full px-3.5 py-2.5 text-[15px] font-medium text-so-ink-2 transition-colors duration-150 hover:text-so-ink"
                                    >
                                        {item.name}
                                    </Link>
                                )
                            }

                            return (
                                <div key={item.name} className="relative" onMouseEnter={() => enter(item.name)}>
                                    {/*
                                      THE TAB LAYER. `isolate` makes this a stacking context, which
                                      TRAPS whatever z-index framer-motion writes onto the `layoutId`
                                      element - it can no longer promote the tab above the button. The
                                      wrapper carries no z-index of its own, so the button (later in
                                      the DOM) always paints above it, and `pointer-events-none` stops
                                      the overlay eating the button's hover. Do not convert any of the
                                      three back to classes.
                                    */}
                                    <div className="pointer-events-none absolute inset-0 isolate" style={{ zIndex: 0 }}>
                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.span
                                                    layoutId="nav-tab"
                                                    aria-hidden
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0, transition: { duration: 0.12 } }}
                                                    transition={{ type: "spring", stiffness: 480, damping: 40, mass: 0.7 }}
                                                    className={cn("absolute inset-x-0 top-0", SURFACE, HAIRLINE)}
                                                    style={{
                                                        // Border width and style are INLINE, not
                                                        // `border-t`/`border-l` classes - the colour
                                                        // stays a class so it still follows the theme.
                                                        borderStyle: "solid",
                                                        borderTopWidth: 1,
                                                        borderLeftWidth: 1,
                                                        borderRightWidth: 1,
                                                        // Never a bottom border - that edge is the seam.
                                                        borderBottomWidth: 0,
                                                        // PILL_PAD + 1: the extra pixel punches through
                                                        // the pill's bottom edge so nothing draws a
                                                        // line across the join.
                                                        bottom: -(PILL_PAD + 1),
                                                        borderTopLeftRadius: CORNER,
                                                        borderTopRightRadius: CORNER,
                                                    }}
                                                />
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <button
                                        type="button"
                                        aria-expanded={isOpen}
                                        aria-haspopup="true"
                                        onClick={() => setOpenMenu(isOpen ? null : item.name)}
                                        // INLINE z-index, deliberately. framer-motion writes its own
                                        // inline z-index onto the `layoutId` tab while it animates, and
                                        // inline beats any class - so `z-*` classes lose and the label
                                        // disappears. Inline here makes it inline-vs-inline, and 2 wins.
                                        style={{ zIndex: 2 }}
                                        className={cn(
                                            "relative inline-flex cursor-pointer items-center gap-1.5 px-3.5 py-2.5 text-[15px] font-medium transition-colors duration-150",
                                            isOpen ? "text-so-ink" : "text-so-ink-2 hover:text-so-ink",
                                        )}
                                    >
                                        <span className="relative whitespace-nowrap">
                                            {item.name}
                                            {/* Underline under an open label, only as wide as the word,
                                                animated on scaleX so it wipes out from the centre. */}
                                            <motion.span
                                                aria-hidden
                                                className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-center rounded-full bg-so-ink"
                                                initial={false}
                                                animate={{ scaleX: isOpen ? 1 : 0, opacity: isOpen ? 1 : 0 }}
                                                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                                            />
                                        </span>
                                        <ChevronDown
                                            className={cn(
                                                "h-3.5 w-3.5 transition-transform duration-300",
                                                isOpen ? "rotate-180 opacity-90" : "rotate-0 opacity-50",
                                            )}
                                        />
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -6, scale: 0.985, transition: { duration: 0.14, ease: "easeIn" } }}
                                                transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.8 }}
                                                onMouseEnter={() => enter(item.name)}
                                                className={cn(
                                                    "absolute left-0 z-0 origin-top-left overflow-hidden",
                                                    SURFACE,
                                                    // A real `border`, not a `ring`. A ring sits 1px
                                                    // OUTSIDE the box, which puts the panel's visible
                                                    // left edge 1px left of the tab's and makes the join
                                                    // read as a misaligned step.
                                                    HAIRLINE,
                                                    "shadow-[0_24px_60px_-18px_rgba(26,26,24,0.22)]",
                                                )}
                                                style={{
                                                    borderStyle: "solid",
                                                    borderWidth: 1,
                                                    top: `calc(100% + ${PILL_PAD}px)`,
                                                    // Top-LEFT stays SQUARE: it sits directly beneath the
                                                    // tab's left edge, so any radius steps the two apart.
                                                    borderTopLeftRadius: 0,
                                                    borderTopRightRadius: CORNER,
                                                    borderBottomLeftRadius: CORNER,
                                                    borderBottomRightRadius: CORNER,
                                                }}
                                            >
                                                <motion.div layout="position" transition={{ duration: 0.2 }}>
                                                    {renderDropdown(item.name)}
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )
                        })}
                    </nav>

                    <div className="ml-auto hidden shrink-0 items-center gap-1.5 lg:flex">
                        <ThemeToggle />
                        <Link
                            href="/contactus"
                            className="group inline-flex items-center gap-1.5 rounded-full bg-so-ink px-4 py-2 text-[14px] font-semibold text-so-bg transition-opacity duration-150 hover:opacity-90"
                        >
                            Start a project
                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Link>
                    </div>

                    <div className="ml-auto flex items-center gap-1 lg:hidden">
                        <ThemeToggle />
                        <button
                            type="button"
                            onClick={() => setMenuOpen((v) => !v)}
                            aria-label="Toggle menu"
                            aria-expanded={menuOpen}
                            className="rounded-full p-2 text-so-ink"
                        >
                            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className={cn(
                                "absolute inset-x-0 top-[calc(100%+8px)] z-[90] overflow-hidden rounded-2xl border shadow-[0_24px_64px_-16px_rgba(26,26,24,0.28)] lg:hidden",
                                SURFACE,
                                HAIRLINE,
                            )}
                        >
                            <div data-lenis-prevent className="max-h-[calc(100dvh-5.5rem)] overflow-y-auto px-4 pb-4 pt-3">
                                {/* type="single" so only one section is open at a time. */}
                                <Accordion type="single" collapsible className="w-full">
                                    {MOBILE_NAV.map((item) =>
                                        "links" in item ? (
                                            <AccordionItem key={item.name} value={item.name} className="rounded-none border-b border-so-line bg-transparent">
                                                <AccordionTrigger className="py-3.5 text-[15px] font-medium text-so-ink hover:no-underline">
                                                    {item.name}
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="flex flex-col gap-0.5 pb-2">
                                                        {item.links.map((l) => {
                                                            const Icon = l.icon
                                                            return (
                                                                <Link
                                                                    key={l.href}
                                                                    href={l.href}
                                                                    onClick={() => setMenuOpen(false)}
                                                                    className={cn("flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-[14px] text-so-ink-2", ROW_HOVER)}
                                                                >
                                                                    <Icon className="h-[17px] w-[17px] shrink-0 text-so-ink-4" strokeWidth={1.75} />
                                                                    {l.title}
                                                                </Link>
                                                            )
                                                        })}
                                                        {item.viewAll && (
                                                            <Link
                                                                href={item.viewAll.href}
                                                                onClick={() => setMenuOpen(false)}
                                                                className={cn("mt-0.5 flex items-center gap-2 rounded-lg px-2.5 py-2.5 text-[14px] font-medium text-so-ink", ROW_HOVER)}
                                                            >
                                                                {item.viewAll.name}
                                                                <ArrowRight className="h-3.5 w-3.5 text-so-ink-4" />
                                                            </Link>
                                                        )}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ) : (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                onClick={() => setMenuOpen(false)}
                                                className="flex items-center border-b border-so-line py-3.5 text-[15px] font-medium text-so-ink"
                                            >
                                                {item.name}
                                            </Link>
                                        ),
                                    )}
                                </Accordion>
                                <div className="mt-3 flex flex-col gap-2.5 border-t border-so-line pt-4">
                                    <Link
                                        href="/contactus"
                                        onClick={() => setMenuOpen(false)}
                                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-so-ink py-2.5 text-center text-[15px] font-semibold text-so-bg"
                                    >
                                        Start a project
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                    <Link
                                        href="/blogs"
                                        onClick={() => setMenuOpen(false)}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-so-line py-2.5 text-center text-[15px] font-medium text-so-ink"
                                    >
                                        <BookOpen className="h-4 w-4 text-so-ink-4" />
                                        Read the guides
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    )
}

export default SiteNav
