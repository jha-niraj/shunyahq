"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
    LayoutDashboard, MessagesSquare, PanelLeftClose, PanelLeftOpen,
    LogOut, ExternalLink, Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/themetoggle"
import { adminLogout } from "@/actions/admin-auth.action"
import { EASE } from "@/components/landing/animations"

/**
 * Admin sidebar - a pared-back take on the SyncHQ app rail.
 *
 * The SyncHQ original carries org switching, permission-filtered navigation, pinning, drill panels,
 * notifications and credits. None of that has an equivalent here: this panel has one user and two
 * destinations. What is kept is the shape that makes the original feel like an application - a
 * collapsible rail that becomes icons with tooltips, a persistent active marker, and the footer
 * block for account-level controls.
 */

const NAV = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Inquiries", href: "/admin/contactinquiry", icon: MessagesSquare },
]

const COLLAPSE_KEY = "shq-admin-sidebar-collapsed"

function useIsActive() {
    const pathname = usePathname()
    return (href: string) =>
        href === "/admin" ? pathname === "/admin" : pathname === href || pathname.startsWith(`${href}/`)
}

function NavRow({
    item,
    collapsed,
    onNavigate,
}: {
    item: (typeof NAV)[number]
    collapsed: boolean
    onNavigate?: () => void
}) {
    const isActive = useIsActive()(item.href)
    const Icon = item.icon

    const row = (
        <Link
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={cn(
                "group relative flex items-center rounded-xl text-[14px] font-medium transition-colors duration-150",
                collapsed ? "justify-center px-0 py-2.5" : "gap-3 px-3 py-2.5",
                isActive
                    ? "bg-so-surface-2 text-so-ink"
                    : "text-so-ink-3 hover:bg-so-surface-2 hover:text-so-ink",
            )}
        >
            {/* One shared layoutId, so the marker slides between rows instead of cross-fading. */}
            {isActive && (
                <motion.span
                    layoutId="admin-nav-active"
                    aria-hidden
                    className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-so-ink"
                    transition={{ type: "spring", stiffness: 480, damping: 40, mass: 0.7 }}
                />
            )}
            <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} />
            {!collapsed && <span className="truncate">{item.name}</span>}
        </Link>
    )

    // A collapsed rail is unusable without labels on hover, so the tooltip is not decoration.
    if (!collapsed) return row
    return (
        <Tooltip>
            <TooltipTrigger asChild>{row}</TooltipTrigger>
            <TooltipContent side="right" sideOffset={10}>
                {item.name}
            </TooltipContent>
        </Tooltip>
    )
}

function SidebarBody({
    collapsed,
    onToggleCollapse,
    onNavigate,
    showCollapseButton = true,
}: {
    collapsed: boolean
    onToggleCollapse?: () => void
    onNavigate?: () => void
    showCollapseButton?: boolean
}) {
    const router = useRouter()
    const [signingOut, setSigningOut] = useState(false)

    async function signOut() {
        setSigningOut(true)
        await adminLogout()
        // refresh() so the layout re-runs its server-side check and the panel is gone from the
        // client cache, rather than the cookie being cleared while a stale render lingers.
        router.refresh()
        router.replace("/admin/login")
    }

    return (
        <div className="flex h-full flex-col">
            <div
                className={cn(
                    "flex h-[64px] shrink-0 items-center border-b border-so-line",
                    collapsed ? "justify-center px-2" : "justify-between px-4",
                )}
            >
                {
                    !collapsed && (
                        <div className="min-w-0">
                            <p className="truncate text-[15px] font-semibold tracking-[-0.01em] text-so-ink">
                                ShunyaHQ
                            </p>
                            <p className="so-mono text-[10.5px] uppercase tracking-[0.14em] text-so-ink-4">
                                Admin
                            </p>
                        </div>
                    )
                }
                {
                    showCollapseButton && onToggleCollapse && (
                        <button
                            type="button"
                            onClick={onToggleCollapse}
                            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                            className="flex cursor-pointer items-center justify-center rounded-lg p-1.5 text-so-ink-4 transition-colors hover:bg-so-surface-2 hover:text-so-ink"
                        >
                            {collapsed ? <PanelLeftOpen className="h-[18px] w-[18px]" /> : <PanelLeftClose className="h-[18px] w-[18px]" />}
                        </button>
                    )
                }
            </div>

            {/* min-h-0 so the nav yields height to the pinned header and footer and scrolls itself
                if the list ever outgrows the rail, rather than pushing sign-out off the bottom. */}
            <nav className={cn("flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto py-4", collapsed ? "px-2" : "px-3")}>
                {
                    !collapsed && (
                        <p className="mb-1 px-3 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-so-ink-4">
                            Panel
                        </p>
                    )
                }
                {NAV.map((item) => (
                    <NavRow key={item.href} item={item} collapsed={collapsed} onNavigate={onNavigate} />
                ))}
            </nav>

            <div className={cn("shrink-0 border-t border-so-line py-3", collapsed ? "px-2" : "px-3")}>
                <div className={cn("flex items-center gap-1", collapsed ? "flex-col" : "justify-between")}>
                    {
                        collapsed ? (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href="/"
                                        className="flex items-center justify-center rounded-xl px-0 py-2.5 text-so-ink-3 transition-colors hover:bg-so-surface-2 hover:text-so-ink"
                                    >
                                        <ExternalLink className="h-[18px] w-[18px]" strokeWidth={1.75} />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right" sideOffset={10}>View site</TooltipContent>
                            </Tooltip>
                        ) : (
                            <Link
                                href="/"
                                className="flex flex-1 items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium text-so-ink-3 transition-colors hover:bg-so-surface-2 hover:text-so-ink"
                            >
                                <ExternalLink className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} />
                                View site
                            </Link>
                        )
                    }
                    <ThemeToggle />
                </div>

                <button
                    type="button"
                    onClick={signOut}
                    disabled={signingOut}
                    className={cn(
                        "mt-1 flex w-full cursor-pointer items-center rounded-xl text-[14px] font-medium text-so-ink-3 transition-colors hover:bg-so-surface-2 hover:text-so-ink disabled:opacity-50",
                        collapsed ? "justify-center px-0 py-2.5" : "gap-3 px-3 py-2.5",
                    )}
                    aria-label="Sign out"
                >
                    <LogOut className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} />
                    {!collapsed && (signingOut ? "Signing out" : "Sign out")}
                </button>
            </div>
        </div>
    )
}

export function AdminSidebar() {
    // Starts expanded and reads the stored preference after mount. Reading localStorage during
    // render would make the server and client markup disagree and blow up hydration.
    const [collapsed, setCollapsed] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        try {
            setCollapsed(localStorage.getItem(COLLAPSE_KEY) === "1")
        } catch {
            /* private mode - the default is fine */
        }
    }, [])

    useEffect(() => {
        setMobileOpen(false)
    }, [pathname])

    const toggle = () => {
        setCollapsed((prev) => {
            const next = !prev
            try {
                localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0")
            } catch {
                /* ignore */
            }
            return next
        })
    }

    return (
        <TooltipProvider delayDuration={100}>
            {/* A flex CHILD rather than a fixed overlay. Fixed positioning would take the rail out
                of flow and leave the page to mirror its animated width with a spacer - two numbers
                to keep in sync, which is the kind of pair that drifts. In flow, the content column
                simply reflows as the rail animates.
                `h-full`, not `h-screen`: the parent shell is already exactly one viewport tall, so
                the rail fills it. Asking for h-screen inside a fixed-height parent is how a rail
                ends up one scrollbar taller than the thing containing it. */}
            <motion.aside
                initial={false}
                animate={{ width: collapsed ? 68 : 244 }}
                transition={{ duration: 0.28, ease: EASE }}
                className="hidden h-full shrink-0 overflow-hidden border-r border-so-line bg-so-surface lg:block"
            >
                <SidebarBody collapsed={collapsed} onToggleCollapse={toggle} />
            </motion.aside>

            {/* Mobile: a top bar that opens the same body in a sheet. */}
            <div className="fixed inset-x-0 top-0 z-30 flex h-[60px] items-center justify-between border-b border-so-line bg-so-surface px-4 lg:hidden">
                <button
                    type="button"
                    onClick={() => setMobileOpen(true)}
                    aria-label="Open menu"
                    className="flex cursor-pointer items-center justify-center rounded-lg p-2 text-so-ink"
                >
                    <Menu className="h-5 w-5" />
                </button>
                <p className="text-[15px] font-semibold tracking-[-0.01em] text-so-ink">ShunyaHQ Admin</p>
                <ThemeToggle />
            </div>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetContent side="left" className="w-[280px] border-so-line bg-so-surface p-0">
                    <SheetTitle className="sr-only">Admin navigation</SheetTitle>
                    <SidebarBody collapsed={false} showCollapseButton={false} onNavigate={() => setMobileOpen(false)} />
                </SheetContent>
            </Sheet>
        </TooltipProvider>
    )
}
