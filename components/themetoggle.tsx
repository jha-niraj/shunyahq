"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
    className?: string
}

/**
 * The theme switch.
 *
 * ## The mount gate is load-bearing
 *
 * `resolvedTheme` is undefined on the server and on the first client render - next-themes can only
 * read the stored preference once it is in the browser. Rendering the light branch during that pass
 * and the dark branch immediately after produced a hydration mismatch on every page load for anyone
 * whose theme is dark:
 *
 *     - <circle cx="12" cy="12" r="4">        (server: sun)
 *     + <path d="M20.985 12.486a9 9 0 1 1..."> (client: moon)
 *
 * React's response to a mismatch is to throw away the server HTML for that subtree and re-render
 * the whole thing on the client, which is a real cost paid on a page this size - and it logged an
 * error to the console on every visit.
 *
 * So until mounted we render the track with no thumb content. Identical box, identical dimensions,
 * nothing that depends on the theme - so the server and client agree, and there is no layout shift
 * when the icons arrive a frame later.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    const isDark = mounted && resolvedTheme === "dark"

    return (
        <div
            className={cn(
                "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300",
                isDark
                    ? "bg-zinc-950 border border-zinc-800"
                    : "bg-white border border-zinc-200",
                className
            )}
            onClick={() => mounted && setTheme(isDark ? "light" : "dark")}
            role="button"
            tabIndex={0}
            aria-label="Toggle theme"
        >
            <div className="flex justify-between items-center w-full">
                <div
                    className={cn(
                        "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
                        isDark
                            ? "transform translate-x-0 bg-zinc-800"
                            : "transform translate-x-8 bg-gray-200"
                    )}
                >
                    {mounted && (isDark ? (
                        <Moon className="w-4 h-4 text-white" strokeWidth={1.5} />
                    ) : (
                        <Sun className="w-4 h-4 text-gray-700" strokeWidth={1.5} />
                    ))}
                </div>
                <div
                    className={cn(
                        "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
                        isDark
                            ? "bg-transparent"
                            : "transform -translate-x-8"
                    )}
                >
                    {mounted && (isDark ? (
                        <Sun className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                    ) : (
                        <Moon className="w-4 h-4 text-black" strokeWidth={1.5} />
                    ))}
                </div>
            </div>
        </div>
    )
}
