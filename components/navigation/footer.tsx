"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
    ArrowRight, ArrowUp, MapPin, Mail
} from "lucide-react"
import { PageBackground } from "@/components/landing/page-background"

const XIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
)

const LinkedInIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
)

const GitHubIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
)

const InstagramIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
)

const LINK_GROUPS = [
    {
        heading: "Services",
        links: [
            { label: "Web Engineering", href: "/services" },
            { label: "Mobile", href: "/services" },
            { label: "AI Integration", href: "/services" },
            { label: "Cloud Infra", href: "/services" },
        ],
    },
    {
        heading: "Company",
        links: [
            { label: "About Us", href: "/aboutus" },
            { label: "Projects", href: "/projects" },
            { label: "Pricing", href: "/pricing" },
            { label: "Contact", href: "/contactus" },
        ],
    },
    {
        heading: "Resources",
        links: [
            { label: "Blog", href: "/blogs" },
            { label: "Tools", href: "/tools" },
            { label: "Solutions", href: "/solutions" },
            { label: "Accelerator", href: "/accelerator" },
        ],
    },
    {
        heading: "Legal",
        links: [
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
        ],
    },
]

function SocialIcon({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-white/40 hover:bg-neutral-200 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-white transition-all duration-200"
        >
            {icon}
        </a>
    )
}

export function Footer() {
    const [email, setEmail] = useState("")
    const year = new Date().getFullYear()

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

    return (
        <footer className="relative text-neutral-900 dark:text-white dark:bg-neutral-950 overflow-hidden pt-24 pb-10 border-t border-neutral-200 dark:border-white/5">
            <PageBackground />

            <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
                    <div className="md:col-span-3 space-y-8">
                        <div className="space-y-5">
                            <Link href="/" className="inline-flex items-center gap-2 text-neutral-900 dark:text-white">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/shunya-mark.png" alt="Shunya" width={32} height={32} className="h-8 w-8 dark:invert" />
                                <span className="font-bold tracking-tight text-lg">Shunya</span>
                                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-white/40">Tech</span>
                            </Link>
                            <p className="text-neutral-600 dark:text-white/50 text-sm leading-relaxed max-w-xs">
                                Engineering intelligence for the digital age. We build high-performance systems for forward-thinking companies.
                            </p>
                            <div className="flex gap-3 pt-1">
                                <SocialIcon icon={<XIcon />} href="https://x.com/shunyagroups" label="X (Twitter)" />
                                <SocialIcon icon={<LinkedInIcon />} href="https://www.linkedin.com/company/shunya-tech" label="LinkedIn" />
                                <SocialIcon icon={<GitHubIcon />} href="https://github.com/Shunya-Tech-Agency" label="GitHub" />
                                <SocialIcon icon={<InstagramIcon />} href="https://instagram.com/shunyatechofficial" label="Instagram" />
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-white/40 mb-4">Get in Touch</h4>
                            <ul className="space-y-3 mb-5">
                                <li>
                                    <a
                                        href="mailto:contact@shunyatech.com"
                                        className="inline-flex items-start gap-2.5 text-sm text-neutral-600 dark:text-white/50 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200"
                                    >
                                        <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                                        contact@shunyatech.com
                                    </a>
                                </li>
                                <li className="flex items-start gap-2.5 text-sm text-neutral-600 dark:text-white/50 leading-relaxed">
                                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                                    <span>10 Green State, Unit 4 PMB 1058, Woodbridge, NJ 07095, United States</span>
                                </li>
                            </ul>
                            <form className="relative max-w-xs" onSubmit={(e) => { e.preventDefault() }}>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full h-11 bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-lg pl-4 pr-12 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-white/30 focus:outline-none focus:border-neutral-400 dark:focus:border-white/30 transition-colors"
                                />
                                <button
                                    type="submit"
                                    className="cursor-pointer absolute right-2 top-1.5 h-8 w-8 bg-neutral-200 dark:bg-white/10 rounded-md flex items-center justify-center hover:bg-neutral-900 hover:text-white dark:hover:bg-white/20 transition-all"
                                >
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="md:col-span-9">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {
                                LINK_GROUPS.map(({ heading, links }) => (
                                    <div key={heading}>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-white/40 mb-5">{heading}</h4>
                                        <ul className="space-y-3.5">
                                            {
                                                links.map(({ label, href }) => (
                                                    <li key={`${heading}-${label}`}>
                                                        <Link href={href} className="text-sm text-neutral-600 dark:text-white/50 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200">
                                                            {label}
                                                        </Link>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="border-t border-neutral-200 dark:border-white/10 py-7 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500 dark:text-white/40">
                    <div className="flex items-center gap-4">
                        <span className="text-xs">&copy; {year} Shunya Tech</span>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                            </span>
                            All Systems Operational
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="text-xs hover:text-neutral-900 dark:hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="text-xs hover:text-neutral-900 dark:hover:text-white transition-colors">Terms</Link>
                        <button
                            type="button"
                            onClick={scrollToTop}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-white/10 px-3 py-1.5 text-xs font-medium hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5 transition-all cursor-pointer"
                        >
                            <ArrowUp className="h-3 w-3" />
                            Back to top
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
