"use server"

import { db } from "@/lib/db"
import { contact } from "@/lib/db/schema"
import { count, desc, eq, gte } from "drizzle-orm"

export async function getContactStats() {
    try {
        // Get total count
        const [{ value: total }] = await db
            .select({ value: count() })
            .from(contact)

        // Get this week's count
        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
        const [{ value: thisWeek }] = await db
            .select({ value: count() })
            .from(contact)
            .where(gte(contact.createdAt, oneWeekAgo))

        // Get this month's count
        const oneMonthAgo = new Date()
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
        const [{ value: thisMonth }] = await db
            .select({ value: count() })
            .from(contact)
            .where(gte(contact.createdAt, oneMonthAgo))

        // Get recent inquiries (last 5)
        const recent = await db
            .select({
                id: contact.id,
                name: contact.name,
                email: contact.email,
                message: contact.message,
                createdAt: contact.createdAt,
            })
            .from(contact)
            .orderBy(desc(contact.createdAt))
            .limit(5)

        return {
            success: true,
            data: {
                total,
                thisWeek,
                thisMonth,
                recent
            }
        }
    } catch (error) {
        console.error('Failed to fetch contact stats:', error)
        return {
            success: false,
            error: 'Failed to fetch contact stats'
        }
    }
}

export async function getAllContactInquiries() {
    try {
        const inquiries = await db
            .select({
                id: contact.id,
                name: contact.name,
                email: contact.email,
                message: contact.message,
                inquiryType: contact.inquiryType,
                createdAt: contact.createdAt,
                updatedAt: contact.updatedAt,
            })
            .from(contact)
            .orderBy(desc(contact.createdAt))

        return {
            success: true,
            data: inquiries
        }
    } catch (error) {
        console.error('Failed to fetch contact inquiries:', error)
        return {
            success: false,
            error: 'Failed to fetch contact inquiries'
        }
    }
}

export async function getContactInquiry(id: string) {
    try {
        const [inquiry] = await db
            .select()
            .from(contact)
            .where(eq(contact.id, id))
            .limit(1)

        if (!inquiry) {
            return {
                success: false,
                error: 'Contact inquiry not found'
            }
        }

        return {
            success: true,
            data: inquiry
        }
    } catch (error) {
        console.error('Failed to fetch contact inquiry:', error)
        return {
            success: false,
            error: 'Failed to fetch contact inquiry'
        }
    }
}

export async function deleteContactInquiry(id: string) {
    try {
        await db.delete(contact).where(eq(contact.id, id))

        return {
            success: true,
            message: 'Contact inquiry deleted successfully'
        }
    } catch (error) {
        console.error('Failed to delete contact inquiry:', error)
        return {
            success: false,
            error: 'Failed to delete contact inquiry'
        }
    }
}
