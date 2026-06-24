"use client"

import Link from "next/link";
import { motion } from "framer-motion";
import SmoothScroll from "@/components/smoothscroll";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <SmoothScroll>
            <div className="min-h-screen bg-white dark:bg-neutral-950 py-24 px-4 sm:px-6 lg:px-8">
                <div className="fixed inset-0 z-0 pointer-events-none opacity-20 dark:opacity-10">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                </div>
                <motion.div
                    className="relative z-10 max-w-4xl mx-auto bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl p-8 sm:p-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center mb-12">
                        <Badge variant="outline" className="px-4 py-2 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 backdrop-blur-xl mb-4">
                            <ShieldAlert className="w-4 h-4 text-neutral-500 mr-2" />
                            <span className="text-neutral-700 dark:text-neutral-300">Data Protection Protocol</span>
                        </Badge>
                        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">Privacy Policy</h1>
                        <p className="mt-4 text-lg text-neutral-500">Effective Date: {new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="prose dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-300 leading-relaxed space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">1. Introduction</h2>
                            <p>
                                At ShunyaTech, we treat data privacy as a fundamental engineering principle. This Privacy Policy outlines our protocols for collecting, processing, and securing your information.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">2. Information Collection</h2>
                            <h3 className="text-lg font-semibold mb-2 text-neutral-800 dark:text-neutral-200">2.1 Personal Data</h3>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Identity Data (Name, Username)</li>
                                <li>Contact Data (Email, Phone Number)</li>
                                <li>Professional Data (Job Title, Company)</li>
                            </ul>
                            <h3 className="text-lg font-semibold mb-2 text-neutral-800 dark:text-neutral-200">2.2 Telemetry & Usage</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Device Fingerprinting (Browser, OS)</li>
                                <li>Network Data (IP Address, Location)</li>
                                <li>Session Analytics (Interaction heatmaps)</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">3. Data Usage Protocol</h2>
                            <p className="mb-4">We utilize collected data to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Authenticate and authorize user access.</li>
                                <li>Optimize system performance and latency.</li>
                                <li>Deploy personalized feature updates.</li>
                                <li>Maintain legal compliance and audit logs.</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">4. Security Infrastructure</h2>
                            <p className="mb-4">
                                Our security stack includes:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>AES-256 Encryption for data at rest.</li>
                                <li>TLS 1.3 for data in transit.</li>
                                <li>Role-Based Access Control (RBAC).</li>
                                <li>Regular penetration testing and vulnerability scanning.</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">5. User Rights</h2>
                            <p className="mb-4">You retain full sovereignty over your data:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Right to Access (Subject Access Request)</li>
                                <li>Right to Rectification</li>
                                <li>Right to Erasure (&quot;Right to be Forgotten&quot;)</li>
                                <li>Right to Portability</li>
                            </ul>
                        </section>
                    </div>
                    <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 text-center">
                        <p className="text-sm text-neutral-500 mb-4">
                            For data privacy inquiries, initiate a secure channel at{" "}
                            <Link href="mailto:privacy@shunyatech.com" className="text-neutral-900 dark:text-white font-medium hover:underline cursor-pointer">
                                privacy@shunyatech.com
                            </Link>
                        </p>
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