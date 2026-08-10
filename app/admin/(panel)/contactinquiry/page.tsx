"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
    ArrowLeft, Search, Loader2, Inbox, Trash2, X, Mail, ChevronLeft, ChevronRight, Sparkles,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { deleteContactInquiry, getContactInquiries, getInquiryTypes, type InquiryRow } from "@/actions/admin.action"
import { EASE, Entrance } from "@/components/landing/animations"

// Sized so a full-height list is actually full on a typical laptop; the ScrollArea takes over
// on anything shorter.
const PAGE_SIZE = 12

export default function ContactInquiryPage() {
    const [rows, setRows] = useState<InquiryRow[]>([])
    const [total, setTotal] = useState(0)
    const [pageCount, setPageCount] = useState(1)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [types, setTypes] = useState<string[]>([])
    const [typeFilter, setTypeFilter] = useState("")
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState<InquiryRow | null>(null)
    const [pendingDelete, setPendingDelete] = useState<InquiryRow | null>(null)
    const [deleting, setDeleting] = useState(false)

    // Debounced, because the query runs on the server now - firing one per keystroke would put a
    // COUNT and an OFFSET query on the database for every letter typed.
    useEffect(() => {
        const id = setTimeout(() => setDebouncedSearch(search), 280)
        return () => clearTimeout(id)
    }, [search])

    // Any change to the filters invalidates the current page number: page 4 of an unfiltered list
    // is usually past the end of a filtered one, which would show an empty page rather than results.
    useEffect(() => {
        setPage(1)
    }, [debouncedSearch, typeFilter])

    const load = useCallback(async () => {
        setLoading(true)
        try {
            const result = await getContactInquiries({
                page,
                pageSize: PAGE_SIZE,
                search: debouncedSearch,
                inquiryType: typeFilter,
            })
            if (result.success) {
                setRows(result.data.rows)
                setTotal(result.data.total)
                setPageCount(result.data.pageCount)
            } else {
                toast.error(result.error)
            }
        } catch (error) {
            console.error("Failed to fetch inquiries:", error)
            toast.error("Failed to load inquiries")
        } finally {
            setLoading(false)
        }
    }, [page, debouncedSearch, typeFilter])

    useEffect(() => {
        void load()
    }, [load])

    useEffect(() => {
        getInquiryTypes()
            .then((r) => r.success && setTypes(r.data))
            .catch(() => { /* the filter is optional - a failure here should not break the page */ })
    }, [])

    async function confirmDelete() {
        if (!pendingDelete) return
        setDeleting(true)
        try {
            const result = await deleteContactInquiry(pendingDelete.id)
            if (result.success) {
                toast.success("Inquiry deleted")
                if (selected?.id === pendingDelete.id) setSelected(null)
                setPendingDelete(null)
                // Deleting the only row on the last page would strand the user on an empty page.
                if (rows.length === 1 && page > 1) setPage((p) => p - 1)
                else await load()
            } else {
                toast.error(result.error)
            }
        } finally {
            setDeleting(false)
        }
    }

    const formatDate = (value: Date | string) =>
        new Date(value).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })

    const rangeStart = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
    const rangeEnd = Math.min(page * PAGE_SIZE, total)

    return (
        // Unlike the dashboard, this pane does NOT scroll as a column. The header and filters stay
        // put and the table takes whatever height is left, so the list is always as tall as the
        // window allows instead of a fixed 560px box with dead space under it.
        <div className="flex h-full flex-col px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col">
                <Entrance className="shrink-0">
                    <Link
                        href="/admin"
                        className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-so-ink-3 transition-colors hover:text-so-ink"
                    >
                        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                        Overview
                    </Link>
                    <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="so-eyebrow">Inbox</p>
                            <h1 className="mt-2.5 text-[clamp(26px,3vw,34px)] font-semibold tracking-[-0.025em] text-so-ink">
                                Contact inquiries
                            </h1>
                            <p className="mt-1.5 text-[14px] text-so-ink-3">
                                {total} {total === 1 ? "inquiry" : "inquiries"}
                                {(debouncedSearch || typeFilter) && " matching your filters"}
                            </p>
                        </div>
                    </div>
                </Entrance>

                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
                    className="mt-7 flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center"
                >
                    <div className="relative flex-1">
                        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-so-ink-4" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search name, email or message"
                            className="h-11 w-full rounded-xl border border-so-line bg-so-surface pl-10 pr-4 text-[14px] text-so-ink outline-none transition-colors placeholder:text-so-ink-4 focus:border-so-ink-4"
                        />
                    </div>
                    {
                        types.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                <button
                                    type="button"
                                    onClick={() => setTypeFilter("")}
                                    className={cn(
                                        "cursor-pointer rounded-full border px-3.5 py-2 text-[12.5px] font-medium transition-colors",
                                        typeFilter === ""
                                            ? "border-so-ink bg-so-ink text-so-bg"
                                            : "border-so-line bg-so-surface text-so-ink-3 hover:text-so-ink",
                                    )}
                                >
                                    All
                                </button>
                                {
                                    types.map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setTypeFilter(type)}
                                            className={cn(
                                                "cursor-pointer rounded-full border px-3.5 py-2 text-[12.5px] font-medium transition-colors",
                                                typeFilter === type
                                                    ? "border-so-ink bg-so-ink text-so-bg"
                                                    : "border-so-line bg-so-surface text-so-ink-3 hover:text-so-ink",
                                            )}
                                        >
                                            {type}
                                        </button>
                                    ))
                                }
                            </div>
                        )
                    }
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
                    className="mt-5 flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-so-line bg-so-surface"
                >
                    {/* flex-1 + min-h-0: the card takes the remaining height and the ScrollArea
                        fills it, so the list grows with the window. The loading and empty states
                        use h-full for the same reason - a hardcoded height here would leave a gap
                        under them on a tall screen and clip them on a short one. */}
                    <ScrollArea className="min-h-0 flex-1">
                        {
                            loading ? (
                                <div className="flex h-full min-h-[240px] items-center justify-center">
                                    <Loader2 className="h-5 w-5 animate-spin text-so-ink-4" />
                                </div>
                            ) : rows.length === 0 ? (
                                <div className="flex h-full min-h-[240px] flex-col items-center justify-center">
                                    <Inbox className="mb-3 h-8 w-8 text-so-ink-5" strokeWidth={1.5} />
                                    <p className="text-[14.5px] font-medium text-so-ink-2">No inquiries found</p>
                                    <p className="mt-1 text-[13px] text-so-ink-4">
                                        {debouncedSearch || typeFilter
                                            ? "Try a different search or filter."
                                            : "Submissions from the contact flow land here."}
                                    </p>
                                </div>
                            ) : (
                                <ul className="divide-y divide-so-line">
                                    {
                                        rows.map((row, i) => (
                                            <motion.li
                                                key={row.id}
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.35, delay: Math.min(i, 8) * 0.03, ease: EASE }}
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => setSelected(row)}
                                                    className="w-full cursor-pointer px-5 py-4 text-left transition-colors hover:bg-so-surface-2"
                                                >
                                                    <div className="flex items-baseline justify-between gap-3">
                                                        <div className="flex min-w-0 items-center gap-2.5">
                                                            <p className="truncate text-[14.5px] font-semibold text-so-ink">
                                                                {row.name}
                                                            </p>
                                                            <span className="shrink-0 rounded-full border border-so-line bg-so-surface-2 px-2 py-0.5 text-[11px] font-medium text-so-ink-2">
                                                                {row.inquiryType}
                                                            </span>
                                                            {row.intakeOptIn && (
                                                                <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-so-ink-3">
                                                                    <Sparkles className="h-3 w-3" />
                                                                    Intake
                                                                </span>
                                                            )}
                                                        </div>
                                                        <time className="so-mono shrink-0 text-[11.5px] text-so-ink-4">
                                                            {formatDate(row.createdAt)}
                                                        </time>
                                                    </div>
                                                    <p className="mt-0.5 truncate text-[12.5px] text-so-ink-3">{row.email}</p>
                                                    <p className="mt-1.5 line-clamp-2 text-[13px] leading-[1.6] text-so-ink-2">
                                                        {row.message}
                                                    </p>
                                                </button>
                                            </motion.li>
                                        ))
                                    }
                                </ul>
                            )
                        }
                    </ScrollArea>

                    {/* shrink-0 pins the pager to the bottom of the card; without it the flex row
                        would give up its own height to the scrolling list above. */}
                    <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-so-line px-5 py-3.5">
                        <p className="so-mono text-[12px] text-so-ink-4">
                            {rangeStart}-{rangeEnd} of {total}
                        </p>
                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page <= 1 || loading}
                                className="inline-flex h-9 cursor-pointer items-center gap-1 rounded-lg border border-so-line px-3 text-[13px] font-medium text-so-ink-2 transition-colors hover:bg-so-surface-2 hover:text-so-ink disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ChevronLeft className="h-3.5 w-3.5" />
                                Prev
                            </button>
                            <span className="so-mono px-2 text-[12.5px] text-so-ink-3">
                                {page} / {pageCount}
                            </span>
                            <button
                                type="button"
                                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                                disabled={page >= pageCount || loading}
                                className="inline-flex h-9 cursor-pointer items-center gap-1 rounded-lg border border-so-line px-3 text-[13px] font-medium text-so-ink-2 transition-colors hover:bg-so-surface-2 hover:text-so-ink disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Next
                                <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Detail panel */}
            <AnimatePresence>
                {
                    selected && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => setSelected(null)}
                                className="fixed inset-0 z-40 bg-black/35 backdrop-blur-[2px]"
                            />
                            <motion.aside
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "spring", stiffness: 380, damping: 38, mass: 0.9 }}
                                className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[460px] flex-col border-l border-so-line bg-so-surface"
                            >
                                <div className="flex items-start justify-between gap-4 border-b border-so-line px-6 py-5">
                                    <div className="min-w-0">
                                        <p className="so-eyebrow">Inquiry</p>
                                        <h2 className="mt-2 truncate text-[20px] font-semibold tracking-[-0.015em] text-so-ink">
                                            {selected.name}
                                        </h2>
                                        <a
                                            href={`mailto:${selected.email}`}
                                            className="mt-1 inline-flex items-center gap-1.5 text-[13px] text-so-ink-3 transition-colors hover:text-so-ink"
                                        >
                                            <Mail className="h-3.5 w-3.5" />
                                            {selected.email}
                                        </a>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSelected(null)}
                                        aria-label="Close"
                                        className="cursor-pointer rounded-lg p-1.5 text-so-ink-4 transition-colors hover:bg-so-surface-2 hover:text-so-ink"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>

                                <ScrollArea className="min-h-0 flex-1">
                                    <div className="px-6 py-5">
                                        <dl className="grid grid-cols-2 gap-4">
                                            <div>
                                                <dt className="text-[11px] uppercase tracking-[0.1em] text-so-ink-4">Type</dt>
                                                <dd className="mt-1 text-[13.5px] text-so-ink">{selected.inquiryType}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-[11px] uppercase tracking-[0.1em] text-so-ink-4">Received</dt>
                                                <dd className="mt-1 text-[13.5px] text-so-ink">{formatDate(selected.createdAt)}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-[11px] uppercase tracking-[0.1em] text-so-ink-4">Intake session</dt>
                                                <dd className="mt-1 text-[13.5px] text-so-ink">
                                                    {/* null is "never asked", false is "asked, declined" - they are
                                                        different facts and the panel should not flatten them. */}
                                                    {selected.intakeOptIn === null
                                                        ? "Not asked"
                                                        : selected.intakeOptIn
                                                            ? "Opted in"
                                                            : "Declined"}
                                                </dd>
                                            </div>
                                        </dl>

                                        <div className="mt-6">
                                            <p className="text-[11px] uppercase tracking-[0.1em] text-so-ink-4">Message</p>
                                            <p className="mt-2 whitespace-pre-wrap text-[14px] leading-[1.75] text-so-ink-2">
                                                {selected.message}
                                            </p>
                                        </div>
                                    </div>
                                </ScrollArea>

                                <div className="flex items-center gap-2.5 border-t border-so-line px-6 py-4">
                                    <a
                                        href={`mailto:${selected.email}`}
                                        className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-so-ink text-[13.5px] font-semibold text-so-bg transition-opacity hover:opacity-90"
                                    >
                                        <Mail className="h-4 w-4" />
                                        Reply
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => setPendingDelete(selected)}
                                        className="inline-flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-so-line px-4 text-[13.5px] font-medium text-so-warn transition-colors hover:bg-so-surface-2"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Delete
                                    </button>
                                </div>
                            </motion.aside>
                        </>
                    )
                }
            </AnimatePresence>

            {/* Deleting is irreversible, so it is confirmed rather than fired from the row. */}
            <AlertDialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete this inquiry?</AlertDialogTitle>
                        <AlertDialogDescription>
                            {pendingDelete?.name}&apos;s message will be removed permanently. This cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => {
                                e.preventDefault()
                                void confirmDelete()
                            }}
                            disabled={deleting}
                        >
                            {deleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
