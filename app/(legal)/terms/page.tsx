"use client"

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Scale } from "lucide-react";
import SmoothScroll from "@/components/smoothscroll";

export default function TermsPage() {
    return (
        <SmoothScroll>
            <div className="min-h-screen bg-white dark:bg-neutral-950 py-24 px-4 sm:px-6 lg:px-8">
                <div className="fixed inset-0 z-0 pointer-events-none opacity-20 dark:opacity-10">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                </div>
                <motion.div
                    className="relative z-10 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center mb-12">
                        <Badge variant="outline" className="px-4 py-2 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 backdrop-blur-xl mb-4">
                            <Scale className="w-4 h-4 text-neutral-500 mr-2" />
                            <span className="text-neutral-700 dark:text-neutral-300">Terms of Engagement</span>
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">Terms of Service</h1>
                        <p className="mt-4 text-lg text-neutral-500">
                            Operational protocols governing the use of ShunyaTech systems.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl p-8 sm:p-12 space-y-10">
                        <section>
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">1. Acceptance of Protocol</h2>
                            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                By initiating a connection to ShunyaTech services, you acknowledge full compliance with these Terms. Deviation from these protocols may result in immediate termination of service access.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">2. Service Scope</h2>
                            <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                                ShunyaTech delivers engineering solutions including:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-neutral-600 dark:text-neutral-300">
                                <li>Full-stack Web Engineering</li>
                                <li>Mobile Application Ecology</li>
                                <li>Cloud Infrastructure Architecture</li>
                                <li>Digital Transformation Consulting</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">3. User Obligations</h2>
                            <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                                Authorized users agree to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-neutral-600 dark:text-neutral-300">
                                <li>Provide accurate entity information during onboarding.</li>
                                <li>Maintain rigorous security regarding account credentials.</li>
                                <li>Utilize services strictly within legal jurisdictions.</li>
                                <li>Refrain from reverse-engineering proprietary code.</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">4. Intellectual Property</h2>
                            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                All architectural patterns, source code (unless open-sourced), and visual assets remain the intellectual property of ShunyaTech until final handover protocols are executed as per specific client contracts.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">5. Liability Protocol</h2>
                            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                ShunyaTech operates on a &quot;best effort&quot; basis. We are not liable for indirect or consequential damages arising from system downtime, API deprecations by third parties, or force majeure events.
                            </p>
                        </section>
                        <div className="pt-8 mt-8 border-t border-neutral-200 dark:border-neutral-800 text-center">
                            <p className="text-sm text-neutral-500 mb-4">
                                Legal correspondence channel:{" "}
                                <Link href="mailto:legal@shunyatech.com" className="text-neutral-900 dark:text-white font-medium hover:underline cursor-pointer">
                                    legal@shunyatech.com
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="mt-12 text-center">
                        <Link
                            href="/"
                            className="inline-block px-6 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                        >
                            Return to System Root
                        </Link>
                    </div>
                </motion.div>
            </div>
        </SmoothScroll>
    );
}