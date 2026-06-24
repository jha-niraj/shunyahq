"use client"

import { useState } from "react"
import { ChevronsUpDown } from "lucide-react"
import { cn } from "../../lib/utils"

export interface Country { code: string; name: string; dial: string; flag: string }

export const COUNTRIES: Country[] = [
    { code: "NP", name: "Nepal", dial: "+977", flag: "🇳🇵" },
    { code: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
    { code: "AE", name: "UAE", dial: "+971", flag: "🇦🇪" },
    { code: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
    { code: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
    { code: "AU", name: "Australia", dial: "+61", flag: "🇦🇺" },
    { code: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
    { code: "QA", name: "Qatar", dial: "+974", flag: "🇶🇦" },
    { code: "SA", name: "Saudi Arabia", dial: "+966", flag: "🇸🇦" },
    { code: "MY", name: "Malaysia", dial: "+60", flag: "🇲🇾" },
    { code: "SG", name: "Singapore", dial: "+65", flag: "🇸🇬" },
    { code: "BD", name: "Bangladesh", dial: "+880", flag: "🇧🇩" },
    { code: "PK", name: "Pakistan", dial: "+92", flag: "🇵🇰" },
    { code: "DE", name: "Germany", dial: "+49", flag: "🇩🇪" },
    { code: "JP", name: "Japan", dial: "+81", flag: "🇯🇵" },
]

export function getDefaultCountry(): Country { return COUNTRIES[0]! }
export function buildE164(country: Country, local: string): string {
    const digits = local.replace(/\D/g, "")
    return digits ? `${country.dial}${digits}` : ""
}

interface CountryPhoneInputProps {
    value?: string
    onChange?: (e164: string) => void
    placeholder?: string
    disabled?: boolean
    className?: string
}

export function CountryPhoneInput({ value, onChange, placeholder = "98XXXXXXXX", disabled, className }: CountryPhoneInputProps) {
    const [country, setCountry] = useState<Country>(getDefaultCountry())
    const [local, setLocal] = useState(value?.startsWith(country.dial) ? value.slice(country.dial.length) : value ?? "")
    const [open, setOpen] = useState(false)

    const handleCountry = (c: Country) => { setCountry(c); setOpen(false); onChange?.(buildE164(c, local)) }
    const handleNumber = (raw: string) => { const cleaned = raw.replace(/[^\d]/g, ""); setLocal(cleaned); onChange?.(buildE164(country, cleaned)) }

    return (
        <div className={cn("flex gap-2", className)}>
            <div className="relative">
                <button type="button" disabled={disabled} onClick={() => setOpen(!open)} className="flex h-11 items-center gap-1.5 rounded-xl px-3 text-sm transition-colors border border-[var(--so-line)] bg-[var(--so-surface-2)] text-[var(--so-ink)]">
                    <span className="text-base">{country.flag}</span>
                    <span className="so-mono text-[13px]">{country.dial}</span>
                    <ChevronsUpDown className="h-3 w-3 text-[var(--so-ink-4)]" />
                </button>
                {open && (
                    <div className="absolute top-full left-0 mt-1 z-50 w-56 max-h-60 overflow-y-auto rounded-xl p-1 shadow-lg bg-[var(--so-surface)] border border-[var(--so-line)]">
                        {COUNTRIES.map(c => (
                            <button key={c.code} type="button" onClick={() => handleCountry(c)} className="flex w-full items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-[var(--so-bg-2)] text-[var(--so-ink)]">
                                <span>{c.flag}</span><span className="flex-1 text-left">{c.name}</span><span className="so-mono text-[11px] text-[var(--so-ink-4)]">{c.dial}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <input type="tel" value={local} onChange={e => handleNumber(e.target.value)} placeholder={placeholder} disabled={disabled} className="flex-1 h-11 rounded-xl text-[14px] px-3.5 outline-none transition-all bg-[var(--so-surface-2)] border border-[var(--so-line)] text-[var(--so-ink)]" />
        </div>
    )
}
