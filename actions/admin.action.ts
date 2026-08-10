"use server"

import { db } from "@/lib/db"
import { contact } from "@/lib/db/schema"
import { and, count, desc, eq, gte, ilike, or, sql, type SQL } from "drizzle-orm"
import { requireAdmin } from "@/lib/admin/auth"

/**
 * Admin data access.
 *
 * EVERY export here calls `requireAdmin()` first. Server actions are POST endpoints reachable by
 * anyone who can guess their id - middleware turns away page navigations, but it is not what stops
 * a direct call, so the guard belongs in the action itself. Adding a new export without that first
 * line hands the contact database to the internet.
 */

export type InquiryRow = {
    id: string
    name: string
    email: string
    message: string
    inquiryType: string
    intakeOptIn: boolean | null
    createdAt: Date
}

/** Dashboard headline numbers, the recent list, and the series behind the chart. */
export async function getContactStats(days = 30) {
    await requireAdmin()

    try {
        const [{ value: total }] = await db.select({ value: count() }).from(contact)

        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
        const [{ value: thisWeek }] = await db
            .select({ value: count() })
            .from(contact)
            .where(gte(contact.createdAt, oneWeekAgo))

        const oneMonthAgo = new Date()
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
        const [{ value: thisMonth }] = await db
            .select({ value: count() })
            .from(contact)
            .where(gte(contact.createdAt, oneMonthAgo))

        const [{ value: intakeOptIns }] = await db
            .select({ value: count() })
            .from(contact)
            .where(eq(contact.intakeOptIn, true))

        const recent = await db
            .select({
                id: contact.id,
                name: contact.name,
                email: contact.email,
                message: contact.message,
                inquiryType: contact.inquiryType,
                createdAt: contact.createdAt,
            })
            .from(contact)
            .orderBy(desc(contact.createdAt))
            .limit(6)

        return {
            success: true as const,
            data: {
                total,
                thisWeek,
                thisMonth,
                intakeOptIns,
                recent,
                series: await getDailySeries(days),
                byType: await getCountsByType(),
            },
        }
    } catch (error) {
        console.error("Failed to fetch contact stats:", error)
        return { success: false as const, error: "Failed to fetch contact stats" }
    }
}

/**
 * Inquiries per day for the last `days` days.
 *
 * The database groups only the days that HAVE rows, so the gaps are filled in here before the data
 * reaches the chart. Plotting a sparse series makes a quiet week look like a straight line between
 * two peaks rather than the flat stretch it actually was.
 */
async function getDailySeries(days: number) {
    const since = new Date()
    since.setHours(0, 0, 0, 0)
    since.setDate(since.getDate() - (days - 1))

    const rows = await db
        .select({
            day: sql<string>`to_char(date_trunc('day', ${contact.createdAt}), 'YYYY-MM-DD')`,
            value: count(),
        })
        .from(contact)
        .where(gte(contact.createdAt, since))
        .groupBy(sql`date_trunc('day', ${contact.createdAt})`)

    const counts = new Map(rows.map((r) => [r.day, Number(r.value)]))

    return Array.from({ length: days }, (_, i) => {
        const date = new Date(since)
        date.setDate(since.getDate() + i)
        const key = date.toISOString().slice(0, 10)
        return { date: key, value: counts.get(key) ?? 0 }
    })
}

async function getCountsByType() {
    const rows = await db
        .select({ inquiryType: contact.inquiryType, value: count() })
        .from(contact)
        .groupBy(contact.inquiryType)
        .orderBy(desc(count()))

    return rows.map((r) => ({ type: r.inquiryType, value: Number(r.value) }))
}

/**
 * One page of inquiries.
 *
 * Paginated and filtered in SQL rather than by shipping every row to the browser and slicing it
 * there - the previous version fetched the whole table on every visit, which is fine at fifty rows
 * and a problem at fifty thousand.
 */
export async function getContactInquiries({
    page = 1,
    pageSize = 10,
    search = "",
    inquiryType = "",
}: {
    page?: number
    pageSize?: number
    search?: string
    inquiryType?: string
} = {}) {
    await requireAdmin()

    try {
        const safePage = Math.max(1, Math.floor(page))
        const safePageSize = Math.min(50, Math.max(5, Math.floor(pageSize)))

        const filters: SQL[] = []
        const term = search.trim()
        if (term) {
            // ilike with the term as a PARAMETER - drizzle binds it, so `%` in user input is a
            // literal wildcard at worst and never breaks out of the query.
            const like = `%${term}%`
            const matches = or(
                ilike(contact.name, like),
                ilike(contact.email, like),
                ilike(contact.message, like),
            )
            if (matches) filters.push(matches)
        }
        if (inquiryType) filters.push(eq(contact.inquiryType, inquiryType))

        const where = filters.length ? and(...filters) : undefined

        const [{ value: total }] = await db
            .select({ value: count() })
            .from(contact)
            .where(where)

        const rows = await db
            .select({
                id: contact.id,
                name: contact.name,
                email: contact.email,
                message: contact.message,
                inquiryType: contact.inquiryType,
                intakeOptIn: contact.intakeOptIn,
                createdAt: contact.createdAt,
            })
            .from(contact)
            .where(where)
            .orderBy(desc(contact.createdAt))
            .limit(safePageSize)
            .offset((safePage - 1) * safePageSize)

        return {
            success: true as const,
            data: {
                rows,
                total,
                page: safePage,
                pageSize: safePageSize,
                pageCount: Math.max(1, Math.ceil(total / safePageSize)),
            },
        }
    } catch (error) {
        console.error("Failed to fetch contact inquiries:", error)
        return { success: false as const, error: "Failed to fetch contact inquiries" }
    }
}

/** The distinct inquiry types actually present, for the filter control. */
export async function getInquiryTypes() {
    await requireAdmin()

    try {
        const rows = await db
            .selectDistinct({ inquiryType: contact.inquiryType })
            .from(contact)
            .orderBy(contact.inquiryType)

        return { success: true as const, data: rows.map((r) => r.inquiryType) }
    } catch (error) {
        console.error("Failed to fetch inquiry types:", error)
        return { success: false as const, error: "Failed to fetch inquiry types" }
    }
}

export async function deleteContactInquiry(id: string) {
    await requireAdmin()

    try {
        if (typeof id !== "string" || !id) {
            return { success: false as const, error: "Invalid id" }
        }

        await db.delete(contact).where(eq(contact.id, id))
        return { success: true as const, message: "Inquiry deleted" }
    } catch (error) {
        console.error("Failed to delete contact inquiry:", error)
        return { success: false as const, error: "Failed to delete inquiry" }
    }
}
