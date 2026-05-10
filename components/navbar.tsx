'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import {
    ArrowUpRight, Menu, Mail, Briefcase
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import {
    Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose
} from '@/components/ui/sheet'
import Image from 'next/image'
import { ThemeToggle } from './ui/themetoggle'

const menuItems = [
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/aboutus' },
    { name: 'Team', href: '/aboutus#team' },
]

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleNavigation = (href: string, e?: React.MouseEvent) => {
        if (!href.includes('#')) {
            router.push(href);
            return;
        }

        e?.preventDefault();
        const [path, hash] = href.split('#');
        const targetId = `#${hash}`;

        if (pathname === path) {
            const element = document.querySelector(targetId);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        } else {
            router.push(`${path}${targetId}`);
        }
    };

    return (
        <header>
            <nav className="fixed top-0 left-0 w-full z-50 px-4 pt-4">
                <div className={cn(
                    'mx-auto max-w-7xl transition-all duration-300 rounded-2xl border',
                    isScrolled
                        ? 'bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-neutral-200 dark:border-neutral-800 shadow-sm py-3 px-6'
                        : 'bg-transparent border-transparent py-4 px-4'
                )}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => router.push('/')}>
                            <div className="relative">
                                <Image
                                    src="/shunyatech.png"
                                    alt="Shunya"
                                    width={32}
                                    height={32}
                                    className="rounded-full bg-neutral-900 border border-neutral-200 dark:border-neutral-700"
                                />
                                <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-lg tracking-tight leading-none text-neutral-900 dark:text-white group-hover:tracking-normal transition-all">SHUNYA</span>
                                <span className="text-[9px] font-mono text-neutral-500 dark:text-neutral-400 tracking-widest uppercase">Technologies</span>
                            </div>
                        </div>
                        <div className="hidden lg:flex items-center bg-neutral-100/50 dark:bg-neutral-900/50 rounded-full px-6 py-2 border border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-sm">
                            <ul className="flex gap-8">
                                {
                                    menuItems.map((item, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={(e) => handleNavigation(item.href, e)}
                                                className="text-sm font-medium cursor-pointer text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors uppercase tracking-wide flex items-center gap-1"
                                            >
                                                <span className="text-[10px] font-mono text-neutral-300 dark:text-neutral-700">0{index + 1}</span>
                                                {item.name}
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="hidden lg:flex items-center gap-3">
                            <ThemeToggle />
                            <div className="h-8 w-[1px] bg-neutral-200 dark:bg-neutral-800 mx-1" />
                            <Link href="/contactus">
                                <button className="cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all text-sm font-medium">
                                    <Mail className="w-4 h-4" />
                                    <span>Contact</span>
                                </button>
                            </Link>
                            <Link href="/projects">
                                <button className="cursor-pointer group flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-full border border-neutral-900 dark:border-white text-sm font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all shadow-sm">
                                    <Briefcase className="w-4 h-4" />
                                    <span>Work</span>
                                    <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </button>
                            </Link>
                        </div>
                        <Sheet>
                            <SheetTrigger asChild>
                                <button className="lg:hidden p-2 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 rounded-md">
                                    <Menu className="w-5 h-5" />
                                </button>
                            </SheetTrigger>
                            <SheetContent side="top" className="w-full bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
                                <SheetHeader>
                                    <SheetTitle className="text-left font-mono text-xs text-neutral-400 uppercase tracking-widest border-b border-neutral-100 dark:border-neutral-800 pb-4">
                                        System Navigation
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col space-y-2 mt-6">
                                    {
                                        menuItems.map((item, index) => (
                                            <SheetClose asChild key={index}>
                                                <button
                                                    onClick={(e) => handleNavigation(item.href, e)}
                                                    className="flex items-center gap-4 text-3xl font-light text-neutral-900 dark:text-white hover:pl-4 transition-all duration-300 text-left py-2"
                                                >
                                                    <span className="font-mono text-sm text-neutral-400 mt-2">0{index + 1}</span>
                                                    {item.name}
                                                </button>
                                            </SheetClose>
                                        ))
                                    }
                                    <div className="pt-8 mt-4 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-2 gap-4">
                                        <SheetClose asChild>
                                            <Link href="/contactus" className="w-full">
                                                <button className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border border-neutral-200 dark:border-neutral-800 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900">
                                                    <Mail className="w-4 h-4" /> Contact
                                                </button>
                                            </Link>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Link href="/projects" className="w-full">
                                                <button className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black font-medium">
                                                    <Briefcase className="w-4 h-4" /> Work
                                                </button>
                                            </Link>
                                        </SheetClose>
                                    </div>
                                    <ThemeToggle />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;