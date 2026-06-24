"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    MessageSquare, TrendingUp, Users, Clock,
    Eye, ArrowRight, Calendar, Mail
} from "lucide-react"
import { getContactStats } from "@/actions/admin.action"

interface ContactStats {
    total: number
    thisWeek: number
    thisMonth: number
    recent: Array<{
        id: string
        name: string
        email: string
        createdAt: string
        message: string
    }>
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<ContactStats>({
        total: 0,
        thisWeek: 0,
        thisMonth: 0,
        recent: []
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Fetch contact stats
        const fetchStats = async () => {
            try {
                const result = await getContactStats()
                if (result.success && result.data) {
                    setStats({
                        total: result.data.total,
                        thisWeek: result.data.thisWeek,
                        thisMonth: result.data.thisMonth,
                        recent: result.data.recent.map(r => ({
                            ...r,
                            createdAt: r.createdAt.toISOString()
                        }))
                    })
                }
            } catch (error) {
                console.error('Failed to fetch stats:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const truncateMessage = (message: string, maxLength: number = 100) => {
        return message.length > maxLength ? message.substring(0, maxLength) + '...' : message
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-black dark:to-slate-900 py-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                                Welcome back! Here&apos;s what&apos;s happening with your business.
                            </p>
                        </div>
                        <Badge className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0">
                            <Calendar className="w-4 h-4 mr-2" />
                            {
                                new Date().toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                            }
                        </Badge>
                    </div>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <Card className="bg-white/50 dark:bg-black/50 backdrop-blur-xl border border-blue-200/30 dark:border-blue-800/30">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Total Inquiries
                                </CardTitle>
                                <MessageSquare className="h-4 w-4 text-blue-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {loading ? '...' : stats.total}
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    All time inquiries
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className="bg-white/50 dark:bg-black/50 backdrop-blur-xl border border-emerald-200/30 dark:border-emerald-800/30">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    This Week
                                </CardTitle>
                                <TrendingUp className="h-4 w-4 text-emerald-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {loading ? '...' : stats.thisWeek}
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    New this week
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Card className="bg-white/50 dark:bg-black/50 backdrop-blur-xl border border-purple-200/30 dark:border-purple-800/30">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    This Month
                                </CardTitle>
                                <Users className="h-4 w-4 text-purple-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {loading ? '...' : stats.thisMonth}
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    New this month
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Card className="bg-white/50 dark:bg-black/50 backdrop-blur-xl border border-orange-200/30 dark:border-orange-800/30">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Response Time
                                </CardTitle>
                                <Clock className="h-4 w-4 text-orange-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    2.4h
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Average response
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <Card className="bg-white/50 dark:bg-black/50 backdrop-blur-xl border border-gray-200/30 dark:border-gray-800/30">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Recent Inquiries
                                </CardTitle>
                                <Button asChild variant="outline" size="sm">
                                    <Link href="/admin/contactusinquiry" className="flex items-center gap-2">
                                        <Eye className="h-4 w-4" />
                                        View All
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {
                                loading ? (
                                    <div className="space-y-4">
                                        {
                                            [...Array(3)].map((_, i) => (
                                                <div key={i} className="flex items-center space-x-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse">
                                                    <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                                                    <div className="flex-1 space-y-2">
                                                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
                                                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ) : stats.recent.length > 0 ? (
                                    <div className="space-y-4">
                                        {
                                            stats.recent.map((inquiry, index) => (
                                                <motion.div
                                                    key={inquiry.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                                    className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                                >
                                                    <div className="flex-shrink-0">
                                                        <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                            <Mail className="h-5 w-5 text-white" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                                    {inquiry.name}
                                                                </p>
                                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                    {inquiry.email}
                                                                </p>
                                                            </div>
                                                            <div className="text-xs text-gray-400 dark:text-gray-500">
                                                                {formatDate(inquiry.createdAt)}
                                                            </div>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                                            {truncateMessage(inquiry.message)}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            ))
                                        }
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-500 dark:text-gray-400">No inquiries yet</p>
                                    </div>
                                )
                            }
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-8"
                >
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Button asChild size="lg" className="h-auto p-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                            <Link href="/admin/contactusinquiry" className="flex flex-col items-center space-y-2">
                                <MessageSquare className="h-8 w-8" />
                                <span>Manage Inquiries</span>
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="h-auto p-6">
                            <Link href="/" className="flex flex-col items-center space-y-2">
                                <Eye className="h-8 w-8" />
                                <span>View Website</span>
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="h-auto p-6">
                            <Link href="/contactus" className="flex flex-col items-center space-y-2">
                                <Mail className="h-8 w-8" />
                                <span>Contact Page</span>
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}