"use client"

import { useRef, useState, useEffect } from "react"
import { useScroll, motion, AnimatePresence } from "framer-motion"
import {
    X, Check
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useSlideSnap } from "@/hooks/use-slide-snap"

interface Topic {
    id: string
    label: string
    beforeTitle: string
    afterTitle: string
    items: string[]
    afterSummary: string[]
    Illustration: React.FC<{ animKey: number }>
    BeforeIllustration: React.FC<{ animKey: number }>
}

function AfterResearchSVG({ animKey }: { animKey: number }) {
    return (
        <svg key={animKey} viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <style>{`
                .vra1{animation:vra-in 0.35s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.1s}
                .vra2{animation:vra-in 0.35s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.5s}
                .vra3{animation:vra-type 1.6s steps(32,end) both;animation-play-state:var(--anim-play,paused);animation-delay:0.8s}
                .vra4{animation:vra-pop 0.3s cubic-bezier(0.22,1,0.36,1) both;animation-play-state:var(--anim-play,paused);animation-delay:2.0s}
                .vra5{animation:vra-pop 0.3s cubic-bezier(0.22,1,0.36,1) both;animation-play-state:var(--anim-play,paused);animation-delay:2.2s}
                @keyframes vra-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
                @keyframes vra-pop{from{opacity:0;transform:scale(0.85)}to{opacity:1;transform:scale(1)}}
                @keyframes vra-type{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0% 0 0)}}
            `}</style>
            <rect x="8" y="8" width="324" height="184" rx="10" fill="var(--vi-surface)" stroke="var(--vi-line)" strokeWidth="1" />
            <rect x="8" y="8" width="324" height="28" rx="10" fill="var(--vi-bg2)" />
            <rect x="8" y="24" width="324" height="12" fill="var(--vi-bg2)" />
            <text x="170" y="26" textAnchor="middle" fontSize="8" fill="var(--vi-ink3)" fontFamily="monospace">eventeye.in</text>
            <g className="vra1">
                <rect x="130" y="44" width="192" height="20" rx="9" fill="var(--vi-bg2)" stroke="var(--vi-line)" strokeWidth="0.75" />
                <text x="226" y="57" textAnchor="middle" fontSize="8" fill="var(--vi-ink2)" fontFamily="system-ui">Find an event and grab a ticket</text>
            </g>
            <g className="vra2">
                <circle cx="22" cy="78" r="7" fill="var(--vi-bg2)" stroke="var(--vi-line)" strokeWidth="0.75" />
                <text x="22" y="82" textAnchor="middle" fontSize="9" fill="var(--vi-ink3)">S</text>
            </g>
            <text x="38" y="90" fontSize="7.5" fill="var(--vi-ink2)" fontFamily="system-ui" className="vra3">Discovery feed → event page → checkout in one flow.</text>
            <text x="38" y="102" fontSize="7.5" fill="var(--vi-ink2)" fontFamily="system-ui" className="vra3" style={{ clipPath: "inset(0 100% 0 0)", animationDelay: "1.1s" }}>One unified platform replaces five disconnected tools.</text>
            <g className="vra4">
                <rect x="38" y="112" width="80" height="14" rx="7" fill="var(--vi-bg2)" stroke="var(--vi-line)" strokeWidth="0.75" />
                <text x="78" y="122" textAnchor="middle" fontSize="7" fill="var(--vi-gold)" fontFamily="monospace">Discovery feed</text>
            </g>
            <g className="vra5">
                <rect x="126" y="112" width="96" height="14" rx="7" fill="var(--vi-bg2)" stroke="var(--vi-line)" strokeWidth="0.75" />
                <text x="174" y="122" textAnchor="middle" fontSize="7" fill="var(--vi-gold)" fontFamily="monospace">Checkout · Razorpay</text>
            </g>
            <rect x="238" y="112" width="56" height="14" rx="7" fill="var(--vi-ink)" className="vra5" opacity="0.9" />
            <text x="266" y="122" textAnchor="middle" fontSize="7" fill="var(--vi-bg)" fontFamily="monospace" style={{ animation: "vra-pop 0.3s cubic-bezier(0.22,1,0.36,1) 2.4s both", animationPlayState: "var(--anim-play,paused)" }}>28s ✓</text>
        </svg>
    )
}

function BeforeResearchSVG({ animKey }: { animKey: number }) {
    return (
        <svg key={animKey} viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <style>{`
                .vbr1{animation:vbr-in 0.5s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.1s}
                .vbr2{animation:vbr-in 0.5s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.5s}
                .vbr3{animation:vbr-blink 1.4s ease infinite;animation-play-state:var(--anim-play,paused)}
                @keyframes vbr-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
                @keyframes vbr-blink{0%,100%{opacity:0.3}50%{opacity:1}}
            `}</style>
            <g className="vbr1">
                <rect x="20" y="16" width="120" height="170" rx="6" fill="var(--vi-surface)" stroke="var(--vi-line)" strokeWidth="1.2" />
                <text x="80" y="30" textAnchor="middle" fontSize="8" fill="var(--vi-ink3)" fontFamily="monospace">WhatsApp group</text>
                <line x1="20" y1="36" x2="140" y2="36" stroke="var(--vi-line)" strokeWidth="0.75" />
                {
                    [44, 54, 64, 74, 84, 94, 104, 114, 124, 134, 144, 154].map(y => (
                        <rect key={y} x="30" y={y} width={60 + (y % 30)} height="4" rx="2" fill="var(--vi-line)" />
                    ))
                }
            </g>
            <g className="vbr2">
                <rect x="160" y="16" width="160" height="170" rx="6" fill="var(--vi-surface)" stroke="var(--vi-line)" strokeWidth="1.2" />
                <text x="240" y="30" textAnchor="middle" fontSize="8" fill="var(--vi-ink3)" fontFamily="monospace">registrations.xlsx</text>
                <line x1="160" y1="36" x2="320" y2="36" stroke="var(--vi-line)" strokeWidth="0.75" />
                {
                    [44, 54, 64, 74, 84, 94, 104, 114, 124, 134, 144, 154].map(y => (
                        <rect key={y} x="170" y={y} width={70 + (y % 24)} height="4" rx="2" fill="var(--vi-line)" />
                    ))
                }
            </g>
            <g className="vbr3">
                <circle cx="174" cy="178" r="7" fill="#c2553f" opacity="0.2" />
                <text x="174" y="182" textAnchor="middle" fontSize="9" fill="#c2553f" fontWeight="700">?</text>
            </g>
            <text x="204" y="182" fontSize="7" fill="#c2553f" fontFamily="system-ui">Five tools, every launch a scramble.</text>
        </svg>
    )
}

function AfterComplianceSVG({ animKey }: { animKey: number }) {
    return (
        <svg key={animKey} viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <style>{`
                .vac1{animation:vac-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.1s}
                .vac2{animation:vac-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.3s}
                .vac3{animation:vac-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.5s}
                .vac4{animation:vac-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.7s}
                .vac-bell{animation:vac-bell 2s ease 1.2s infinite;animation-play-state:var(--anim-play,paused)}
                @keyframes vac-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
                @keyframes vac-bell{0%,100%{transform:rotate(0deg)}20%{transform:rotate(15deg)}40%{transform:rotate(-10deg)}60%{transform:rotate(6deg)}80%{transform:rotate(-4deg)}}
            `}</style>
            <rect x="8" y="8" width="324" height="184" rx="10" fill="var(--vi-surface)" stroke="var(--vi-line)" strokeWidth="1" />
            <text x="20" y="30" fontSize="10" fontWeight="700" fill="var(--vi-ink)">CI/CD Pipeline</text>
            <rect x="280" y="18" width="40" height="16" rx="8" fill="var(--vi-ink)" />
            <text x="300" y="29" textAnchor="middle" fontSize="7.5" fill="var(--vi-bg)">passing</text>
            <line x1="8" y1="38" x2="332" y2="38" stroke="var(--vi-line)" strokeWidth="0.75" />
            {
                [
                    { y: 52, label: "Lint & Type Check", date: "stage: ci", days: "✓", urgent: false },
                    { y: 78, label: "Unit & E2E Tests", date: "stage: test", days: "✓", urgent: false },
                    { y: 104, label: "Build & Bundle", date: "stage: build", days: "✓", urgent: false },
                    { y: 130, label: "Deploy to Staging", date: "bi-weekly", days: "→", urgent: true },
                ].map(({ y, label, date, days, urgent }, i) => (
                    <g key={y} className={`vac${i < 4 ? i + 1 : 4}`}>
                        <rect x="12" y={y - 10} width="316" height="20" rx="5" fill={urgent ? "rgba(194,85,63,0.06)" : "transparent"} />
                        {urgent && <rect x="12" y={y - 10} width="3" height="20" rx="1.5" fill="#c2553f" />}
                        <text x={urgent ? "20" : "16"} y={y + 3} fontSize="8.5" fill="var(--vi-ink)" fontFamily="system-ui">{label}</text>
                        <text x="200" y={y + 3} fontSize="8" fill="var(--vi-ink3)" fontFamily="monospace">{date}</text>
                        <text x="280" y={y + 3} fontSize="10" fontWeight="700" fill={urgent ? "#c2553f" : "var(--vi-ink)"} fontFamily="monospace">{days}</text>
                    </g>
                ))
            }
            <line x1="8" y1="152" x2="332" y2="152" stroke="var(--vi-line)" strokeWidth="0.75" />
            <g className="vac-bell" style={{ transformOrigin: "24px 170px" }}>
                <path d="M24 162 c0 0 -8 6 -8 10 l16 0 c0 -4 -8 -10 -8 -10 Z" fill="var(--vi-ink)" opacity="0.3" />
                <circle cx="24" cy="162" r="2" fill="var(--vi-ink)" opacity="0.5" />
            </g>
            <text x="38" y="172" fontSize="7.5" fill="var(--vi-ink3)" fontFamily="monospace">Automated on every push · always working software</text>
        </svg>
    )
}

function BeforeComplianceSVG({ animKey }: { animKey: number }) {
    return (
        <svg key={animKey} viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <style>{`
                .vbc1{animation:vbc-in 0.5s ease both;animation-play-state:var(--anim-play,paused)}
                .vbc2{animation:vbc-in 0.5s ease 0.4s both;animation-play-state:var(--anim-play,paused)}
                .vbc3{animation:vbc-blink 1.2s ease 0.6s infinite;animation-play-state:var(--anim-play,paused)}
                @keyframes vbc-in{from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}
                @keyframes vbc-blink{0%,100%{opacity:0.3}50%{opacity:1}}
            `}</style>
            <g className="vbc1">
                <rect x="20" y="16" width="180" height="168" rx="8" fill="var(--vi-surface)" stroke="var(--vi-line)" strokeWidth="1.2" />
                <text x="110" y="32" textAnchor="middle" fontSize="9" fill="var(--vi-ink3)">deploy.sh (manual)</text>
                <line x1="20" y1="40" x2="200" y2="40" stroke="var(--vi-line)" />
                {
                    [50, 72, 94, 116, 138, 160].map((y, i) => (
                        <g key={y}>
                            <rect x="30" y={y - 8} width="140" height="16" rx="3" fill={i === 2 ? "rgba(194,85,63,0.12)" : "var(--vi-bg2)"} />
                            {i === 2 && <text x="100" y={y + 3} textAnchor="middle" fontSize="7" fill="#c2553f" fontFamily="monospace">FAILED!</text>}
                            {i !== 2 && <rect x="38" y={y - 4} width={70 + (y % 20)} height="4" rx="2" fill="var(--vi-line)" />}
                        </g>
                    ))
                }
            </g>
            <g className="vbc2">
                <rect x="214" y="60" width="108" height="52" rx="8" fill="var(--vi-surface)" stroke="#c2553f" strokeWidth="1.2" />
                <text x="268" y="78" textAnchor="middle" fontSize="8" fill="#c2553f" fontWeight="700">PROD DOWN</text>
                <text x="268" y="92" textAnchor="middle" fontSize="13" fill="#c2553f" fontWeight="700">500</text>
                <text x="268" y="104" textAnchor="middle" fontSize="7" fill="var(--vi-ink3)">broke on release</text>
            </g>
            <g className="vbc3">
                <text x="214" y="145" fontSize="7.5" fill="var(--vi-ink4)" fontFamily="system-ui">Release broke in production</text>
                <text x="214" y="158" fontSize="7.5" fill="var(--vi-ink4)" fontFamily="system-ui">because there was no pipeline.</text>
            </g>
        </svg>
    )
}

function AfterFinanceActSVG({ animKey }: { animKey: number }) {
    return (
        <svg key={animKey} viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <style>{`
                .vfa1{animation:vfa-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.1s}
                .vfa2{animation:vfa-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.35s}
                .vfa3{animation:vfa-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.6s}
                .vfa4{animation:vfa-pop 0.3s cubic-bezier(0.22,1,0.36,1) both;animation-play-state:var(--anim-play,paused);animation-delay:0.9s}
                @keyframes vfa-in{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
                @keyframes vfa-pop{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}
            `}</style>
            <rect x="8" y="8" width="324" height="184" rx="10" fill="var(--vi-surface)" stroke="var(--vi-line)" strokeWidth="1" />
            <text x="20" y="28" fontSize="9.5" fontWeight="700" fill="var(--vi-ink)">Inventory Dashboard</text>
            <text x="250" y="28" fontSize="7.5" fill="var(--vi-ink4)" fontFamily="monospace">live · realtime</text>
            <line x1="8" y1="34" x2="332" y2="34" stroke="var(--vi-line)" strokeWidth="0.75" />
            {
                [
                    { y: 50, date: "stock", change: "Paracetamol 500mg - 1,240 units in stock", tag: "OK" },
                    { y: 78, date: "stock", change: "Amoxicillin 250mg - reorder alert triggered", tag: "Reorder" },
                    { y: 106, date: "stock", change: "Ibuprofen 400mg - 18 units, below threshold", tag: "LOW" },
                    { y: 134, date: "stock", change: "Cetirizine 10mg - auto-reorder placed", tag: "LOW" },
                ].map(({ y, change, tag }, i) => (
                    <g key={y} className={`vfa${i < 3 ? i + 1 : 3}`}>
                        <rect x="12" y={y - 12} width="316" height="22" rx="5" fill="var(--vi-bg2)" />
                        <text x="20" y={y + 2} fontSize="7.5" fill="var(--vi-ink)" fontFamily="system-ui">{change}</text>
                        <rect x={270} y={y - 9} width={50} height={14} rx="7" fill={tag === "LOW" ? "var(--vi-ink)" : "var(--vi-bg2)"} stroke={tag === "OK" ? "var(--vi-line)" : "none"} />
                        <text x={295} y={y + 2} textAnchor="middle" fontSize="7" fill={tag === "LOW" ? "var(--vi-bg)" : "var(--vi-ink3)"} fontFamily="monospace">{tag}</text>
                    </g>
                ))
            }
            <g className="vfa4">
                <rect x="12" y="158" width="316" height="22" rx="7" fill="var(--vi-ink)" />
                <text x="170" y="172" textAnchor="middle" fontSize="8.5" fill="var(--vi-bg)" fontWeight="600" fontFamily="system-ui">100% network visibility · automated reorder alerts</text>
            </g>
        </svg>
    )
}

function BeforeFinanceActSVG({ animKey }: { animKey: number }) {
    return (
        <svg key={animKey} viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <style>{`
                .vbf1{animation:vbf-in 0.5s ease both;animation-play-state:var(--anim-play,paused)}
                .vbf2{animation:vbf-in 0.5s ease 0.35s both;animation-play-state:var(--anim-play,paused)}
                @keyframes vbf-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
            `}</style>
            <g className="vbf1">
                <rect x="20" y="16" width="180" height="168" rx="6" fill="var(--vi-bg2)" stroke="var(--vi-line)" strokeWidth="1" transform="rotate(-3 110 100)" />
                <rect x="28" y="10" width="180" height="168" rx="6" fill="var(--vi-surface)" stroke="var(--vi-line)" strokeWidth="1.2" />
                <text x="118" y="28" textAnchor="middle" fontSize="8.5" fill="var(--vi-ink3)">Stock Notebook</text>
                <text x="118" y="40" textAnchor="middle" fontSize="7" fill="var(--vi-ink4)">(updated last week)</text>
                <line x1="38" y1="46" x2="198" y2="46" stroke="var(--vi-line)" />
                {
                    [58, 74, 90, 106, 122, 138, 154].map(y => (
                        <rect key={y} x="42" y={y} width={100 + (y % 36)} height="5" rx="2" fill="var(--vi-line)" />
                    ))
                }
            </g>
            <g className="vbf2">
                <path d="M210 60 Q240 56 256 80 Q272 104 260 130" stroke="#c2553f" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
                <rect x="220" y="138" width="96" height="40" rx="8" fill="var(--vi-surface)" stroke="#c2553f" strokeWidth="1.2" />
                <text x="268" y="155" textAnchor="middle" fontSize="8" fill="#c2553f" fontWeight="700">Stockout again!</text>
                <text x="268" y="168" textAnchor="middle" fontSize="7" fill="var(--vi-ink3)">No data, just memory</text>
            </g>
        </svg>
    )
}

function AfterDocumentSVG({ animKey }: { animKey: number }) {
    return (
        <svg key={animKey} viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <style>{`
                .vad1{animation:vad-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.1s}
                .vad2{animation:vad-hl 0.5s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.6s}
                .vad3{animation:vad-hl 0.5s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.9s}
                .vad4{animation:vad-pop 0.35s cubic-bezier(0.22,1,0.36,1) both;animation-play-state:var(--anim-play,paused);animation-delay:1.3s}
                @keyframes vad-in{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}
                @keyframes vad-hl{from{opacity:0}to{opacity:1}}
                @keyframes vad-pop{from{opacity:0;transform:translateX(10px)}to{opacity:1;transform:translateX(0)}}
            `}</style>
            <g className="vad1">
                <rect x="16" y="8" width="148" height="184" rx="8" fill="var(--vi-bg)" stroke="var(--vi-line)" strokeWidth="1.2" />
                <line x1="16" y1="26" x2="164" y2="26" stroke="var(--vi-line)" strokeWidth="0.75" />
                <text x="90" y="20" textAnchor="middle" fontSize="7.5" fill="var(--vi-ink3)" fontFamily="monospace">app.production</text>
                <rect x="26" y="34" width="100" height="4" rx="2" fill="var(--vi-line)" />
                <rect x="26" y="44" width="124" height="4" rx="2" fill="var(--vi-line)" />
                <rect x="26" y="54" width="110" height="4" rx="2" fill="var(--vi-line)" />
            </g>
            <g className="vad2">
                <rect x="24" y="62" width="136" height="16" rx="3" fill="var(--vi-gold)" opacity="0.2" />
                <rect x="24" y="62" width="136" height="16" rx="3" stroke="var(--vi-gold)" strokeWidth="0.8" />
                <text x="30" y="73" fontSize="7.5" fill="var(--vi-ink)" fontFamily="system-ui">Status: Live in production</text>
            </g>
            <rect x="26" y="84" width="114" height="4" rx="2" fill="var(--vi-line)" className="vad1" />
            <rect x="26" y="94" width="130" height="4" rx="2" fill="var(--vi-line)" className="vad1" />
            <g className="vad3">
                <rect x="24" y="102" width="136" height="16" rx="3" fill="var(--vi-bg2)" stroke="var(--vi-line)" strokeWidth="0.8" />
                <rect x="24" y="102" width="3" height="16" rx="1.5" fill="var(--vi-ink4)" />
                <text x="32" y="113" fontSize="7.5" fill="var(--vi-ink3)" fontFamily="system-ui">Active users: real people</text>
            </g>
            <rect x="26" y="124" width="120" height="4" rx="2" fill="var(--vi-line)" className="vad1" />
            <rect x="26" y="134" width="98" height="4" rx="2" fill="var(--vi-line)" className="vad1" />
            <g className="vad4">
                <rect x="176" y="8" width="148" height="72" rx="8" fill="var(--vi-surface)" stroke="var(--vi-gold)" strokeWidth="1" />
                <text x="186" y="24" fontSize="7.5" fill="var(--vi-gold)" fontFamily="monospace" fontWeight="600">SHIPPED · LIVE</text>
                <text x="186" y="38" fontSize="7.5" fill="var(--vi-ink2)" fontFamily="system-ui">A system people</text>
                <text x="186" y="50" fontSize="7.5" fill="var(--vi-ink2)" fontFamily="system-ui">actually use every day.</text>
                <rect x="186" y="58" width="106" height="14" rx="4" fill="var(--vi-ink)" />
                <text x="239" y="68" textAnchor="middle" fontSize="7" fill="var(--vi-bg)" fontFamily="system-ui" fontWeight="600">View Live Site →</text>
            </g>
        </svg>
    )
}

function BeforeDocumentSVG({ animKey }: { animKey: number }) {
    return (
        <svg key={animKey} viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <style>{`
                .vbd1{animation:vbd-in 0.5s ease both;animation-play-state:var(--anim-play,paused)}
                .vbd-spin{transform-origin:282px 100px;animation:vbd-spin 3s linear infinite;animation-play-state:var(--anim-play,paused)}
                @keyframes vbd-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
                @keyframes vbd-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
            `}</style>
            <g className="vbd1">
                <rect x="20" y="16" width="180" height="168" rx="6" fill="var(--vi-surface)" stroke="var(--vi-line)" strokeWidth="1.5" transform="rotate(-2 110 100)" />
                <rect x="26" y="10" width="180" height="168" rx="6" fill="var(--vi-surface)" stroke="var(--vi-line)" strokeWidth="1.2" />
                <text x="116" y="26" textAnchor="middle" fontSize="7.5" fill="var(--vi-ink3)" fontFamily="system-ui">prototype_final_v3.fig</text>
                <line x1="36" y1="34" x2="196" y2="34" stroke="var(--vi-line)" />
                {
                    [44, 54, 64, 74, 84, 94, 104, 114, 124, 134, 144, 154, 164].map(y => (
                        <rect key={y} x="40" y={y} width={80 + (y % 28)} height="5" rx="2" fill="var(--vi-line)" />
                    ))
                }
            </g>
            <circle cx="282" cy="100" r="30" fill="var(--vi-bg2)" stroke="var(--vi-line)" strokeWidth="1.5" />
            <line x1="282" y1="100" x2="282" y2="78" stroke="var(--vi-ink2)" strokeWidth="2.2" strokeLinecap="round" className="vbd-spin" />
            <text x="282" y="150" textAnchor="middle" fontSize="7" fill="var(--vi-ink3)" fontFamily="system-ui">never reaches</text>
            <text x="282" y="162" textAnchor="middle" fontSize="7" fill="var(--vi-ink3)" fontFamily="system-ui">real users</text>
        </svg>
    )
}

function AfterBookingSVG({ animKey }: { animKey: number }) {
    return (
        <svg key={animKey} viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <style>{`
                .vab1{animation:vab-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.1s}
                .vab2{animation:vab-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.35s}
                .vab3{animation:vab-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.6s}
                .vab4{animation:vab-pop 0.45s cubic-bezier(0.22,1,0.36,1) both;animation-play-state:var(--anim-play,paused);animation-delay:1.1s}
                .vab5{animation:vab-pop 0.45s cubic-bezier(0.22,1,0.36,1) both;animation-play-state:var(--anim-play,paused);animation-delay:1.4s}
                @keyframes vab-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
                @keyframes vab-pop{from{opacity:0;transform:scale(0.85)}to{opacity:1;transform:scale(1)}}
            `}</style>
            <rect x="8" y="8" width="324" height="184" rx="10" fill="var(--vi-surface)" stroke="var(--vi-line)" strokeWidth="1" />
            <text x="20" y="30" fontSize="10" fontWeight="700" fill="var(--vi-ink)">Modern Stack · Type-safe</text>
            <line x1="8" y1="38" x2="332" y2="38" stroke="var(--vi-line)" strokeWidth="0.75" />

            <g className="vab1">
                <rect x="16" y="48" width="140" height="72" rx="8" fill="var(--vi-bg2)" stroke="var(--vi-line)" strokeWidth="0.75" />
                <circle cx="40" cy="70" r="14" fill="var(--vi-line)" />
                <text x="40" y="75" textAnchor="middle" fontSize="11" fill="var(--vi-ink3)" fontWeight="700">TS</text>
                <text x="64" y="65" fontSize="8.5" fontWeight="600" fill="var(--vi-ink)">Next.js · tRPC</text>
                <text x="64" y="77" fontSize="7.5" fill="var(--vi-ink3)">Prisma · PostgreSQL</text>
                <rect x="64" y="84" width="52" height="10" rx="3" fill="var(--vi-ink)" opacity="0.08" />
                <text x="90" y="91" textAnchor="middle" fontSize="6.5" fill="var(--vi-ink3)">type-safe</text>
                <text x="24" y="108" fontSize="7.5" fill="var(--vi-ink3)">end to end - no runtime drift</text>
            </g>

            <g className="vab2">
                <text x="168" y="58" fontSize="8" fontWeight="600" fill="var(--vi-ink)">Build times</text>
                {
                    [
                        { t: "lint  0.4s", y: 68, active: false },
                        { t: "build 6s", y: 86, active: true },
                        { t: "deploy ✓", y: 104, active: false },
                    ].map(slot => (
                        <g key={slot.t}>
                            <rect x="168" y={slot.y} width="80" height="13" rx="4"
                                fill={slot.active ? "var(--vi-ink)" : "var(--vi-bg2)"}
                                stroke={slot.active ? "var(--vi-ink)" : "var(--vi-line)"} strokeWidth="0.75" />
                            <text x="208" y={slot.y + 9} textAnchor="middle" fontSize="7.5"
                                fill={slot.active ? "var(--vi-bg)" : "var(--vi-ink3)"} fontFamily="monospace">{slot.t}</text>
                        </g>
                    ))
                }
            </g>
            <g className="vab3">
                <rect x="168" y="122" width="80" height="16" rx="5" fill="var(--vi-gold)" opacity="0.85" />
                <text x="208" y="132" textAnchor="middle" fontSize="7.5" fill="var(--vi-bg)" fontWeight="700">Ship it</text>
            </g>
            <g className="vab4">
                <rect x="16" y="128" width="138" height="52" rx="8" fill="var(--vi-surface)" stroke="var(--vi-gold)" strokeWidth="1" />
                <circle cx="36" cy="148" r="8" fill="var(--vi-gold)" opacity="0.2" />
                <text x="36" y="152" textAnchor="middle" fontSize="10" fill="var(--vi-gold)">✓</text>
                <text x="54" y="144" fontSize="8" fontWeight="600" fill="var(--vi-ink)">Fast & maintainable</text>
                <text x="54" y="156" fontSize="7" fill="var(--vi-ink3)">No technical debt to repay</text>
                <text x="54" y="168" fontSize="7" fill="var(--vi-ink3)">Builds in seconds, not minutes</text>
            </g>
            <g className="vab5">
                <rect x="260" y="48" width="64" height="22" rx="6" fill="var(--vi-ink)" opacity="0.9" />
                <text x="292" y="62" textAnchor="middle" fontSize="8" fill="var(--vi-bg)" fontFamily="monospace">6s build</text>
            </g>
        </svg>
    )
}

function BeforeBookingSVG({ animKey }: { animKey: number }) {
    return (
        <svg key={animKey} viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <style>{`
                .vbb1{animation:vbb-in 0.5s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.1s}
                .vbb2{animation:vbb-in 0.5s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.45s}
                .vbb3{animation:vbb-blink 1.8s ease infinite;animation-play-state:var(--anim-play,paused)}
                @keyframes vbb-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
                @keyframes vbb-blink{0%,100%{opacity:0.3}50%{opacity:1}}
            `}</style>
            <g className="vbb1">
                <rect x="16" y="12" width="120" height="96" rx="12" fill="var(--vi-surface)" stroke="var(--vi-line)" strokeWidth="1.2" />
                <text x="76" y="32" textAnchor="middle" fontSize="8" fill="var(--vi-ink3)">Building monolith...</text>
                <circle cx="76" cy="64" r="18" fill="var(--vi-line)" opacity="0.4" />
                <text x="76" y="69" textAnchor="middle" fontSize="18" fill="var(--vi-ink4)">⏳</text>
                <text x="76" y="96" textAnchor="middle" fontSize="7.5" fill="#c2553f">Still building - 4 min</text>
            </g>
            <g className="vbb2">
                <rect x="152" y="12" width="172" height="130" rx="10" fill="var(--vi-surface)" stroke="var(--vi-line)" strokeWidth="1" />
                <text x="163" y="28" fontSize="7.5" fill="var(--vi-ink3)" fontWeight="600">build.log</text>
                <line x1="152" y1="34" x2="324" y2="34" stroke="var(--vi-line)" strokeWidth="0.5" />
                {
                    [
                        { msg: "compiling 1,840 modules...", y: 48, r: false },
                        { msg: "type error in legacy/util.js", y: 66, r: false },
                        { msg: "rebuild from scratch?", y: 84, r: true },
                        { msg: "wait for it to finish", y: 102, r: false },
                        { msg: "breaks on every change...", y: 120, r: false },
                    ].map(m => (
                        <g key={m.y}>
                            <rect x={m.r ? 240 : 160} y={m.y} width={80} height={12} rx={4}
                                fill={m.r ? "var(--vi-ink)" : "var(--vi-bg2)"} opacity={m.r ? 0.85 : 1} />
                            <text x={m.r ? 280 : 200} y={m.y + 8} textAnchor="middle" fontSize={6.5}
                                fill={m.r ? "var(--vi-bg)" : "var(--vi-ink3)"}>{m.msg}</text>
                        </g>
                    ))
                }
            </g>
            <g className="vbb3">
                <rect x="16" y="120" width="120" height="32" rx="6" fill="#c2553f" fillOpacity="0.08" stroke="#c2553f" strokeWidth="0.8" />
                <text x="76" y="136" textAnchor="middle" fontSize="8" fill="#c2553f" fontWeight="600">Slow, brittle stack</text>
                <text x="76" y="146" textAnchor="middle" fontSize="7" fill="var(--vi-ink3)">minutes per build</text>
            </g>
        </svg>
    )
}

function AfterBilingualSVG({ animKey }: { animKey: number }) {
    return (
        <svg key={animKey} viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <style>{`
                .vbi1{animation:vbi-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.1s}
                .vbi2{animation:vbi-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.4s}
                .vbi3{animation:vbi-slide 0.5s cubic-bezier(0.22,1,0.36,1) both;animation-play-state:var(--anim-play,paused);animation-delay:0.7s}
                .vbi4{animation:vbi-slide 0.5s cubic-bezier(0.22,1,0.36,1) both;animation-play-state:var(--anim-play,paused);animation-delay:0.95s}
                .vbi5{animation:vbi-slide 0.5s cubic-bezier(0.22,1,0.36,1) both;animation-play-state:var(--anim-play,paused);animation-delay:1.2s}
                @keyframes vbi-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
                @keyframes vbi-slide{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
            `}</style>
            <rect x="8" y="8" width="324" height="184" rx="10" fill="var(--vi-surface)" stroke="var(--vi-line)" strokeWidth="1" />
            <text x="20" y="28" fontSize="10" fontWeight="700" fill="var(--vi-ink)">CodrzAI · Engineering OS</text>

            <g className="vbi1">
                <rect x="16" y="36" width="240" height="22" rx="8" fill="var(--vi-bg2)" stroke="var(--vi-line)" strokeWidth="0.75" />
                <text x="26" y="51" fontSize="9" fill="var(--vi-ink2)" fontFamily="system-ui">Scaffold a full-stack project for me</text>
                <rect x="264" y="36" width="52" height="22" rx="8" fill="var(--vi-ink)" opacity="0.9" />
                <text x="290" y="51" textAnchor="middle" fontSize="8" fill="var(--vi-bg)">Build</text>
            </g>
            <g className="vbi2">
                <rect x="16" y="65" width="90" height="14" rx="4" fill="var(--vi-bg2)" stroke="var(--vi-line)" strokeWidth="0.5" />
                <rect x="16" y="65" width="44" height="14" rx="4" fill="var(--vi-ink)" opacity="0.85" />
                <text x="38" y="75" textAnchor="middle" fontSize="7" fill="var(--vi-bg)" fontWeight="600">Learn</text>
                <text x="84" y="75" textAnchor="middle" fontSize="7" fill="var(--vi-ink3)">Build</text>
            </g>

            {
                [
                    { y: 86, src: "AI Agent · DSA Coach", result: "Roadmap + guided practice", en: "6 specialized agents", gold: true },
                    { y: 118, src: "Project Foundry", result: "Full-stack codebase generated", en: "from a prompt", gold: false },
                    { y: 150, src: "Open-Source Bounties", result: "Verifiable portfolio of real work", en: "proof you can ship", gold: false },
                ].map((r, i) => (
                    <g key={i} className={i === 0 ? "vbi3" : i === 1 ? "vbi4" : "vbi5"}>
                        <rect x="16" y={r.y} width="308" height="26" rx="6"
                            fill={r.gold ? "var(--vi-gold)" : "var(--vi-bg2)"}
                            fillOpacity={r.gold ? 0.1 : 1}
                            stroke={r.gold ? "var(--vi-gold)" : "var(--vi-line)"} strokeWidth="0.75" />
                        <text x="26" y={r.y + 10} fontSize="7.5" fill={r.gold ? "var(--vi-gold)" : "var(--vi-ink3)"} fontFamily="monospace">{r.src}</text>
                        <text x="26" y={r.y + 20} fontSize="8" fill="var(--vi-ink)" fontFamily="system-ui" fontWeight="500">{r.result}</text>
                        <text x="200" y={r.y + 20} fontSize="7" fill="var(--vi-ink3)" fontFamily="system-ui">{r.en}</text>
                    </g>
                ))
            }
        </svg>
    )
}

function BeforeBilingualSVG({ animKey }: { animKey: number }) {
    return (
        <svg key={animKey} viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <style>{`
                .vbb21{animation:vbb2-in 0.5s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.1s}
                .vbb22{animation:vbb2-in 0.5s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.4s}
                .vbb2-err{animation:vbb2-shake 0.5s ease 0.9s both;animation-play-state:var(--anim-play,paused)}
                @keyframes vbb2-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
                @keyframes vbb2-shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-4px)}40%,80%{transform:translateX(4px)}}
            `}</style>

            <g className="vbb21">
                <rect x="8" y="8" width="200" height="130" rx="8" fill="var(--vi-surface)" stroke="var(--vi-line)" strokeWidth="1.2" />
                <rect x="8" y="8" width="200" height="22" rx="8" fill="var(--vi-bg2)" />
                <rect x="8" y="20" width="200" height="10" fill="var(--vi-bg2)" />
                <text x="108" y="22" textAnchor="middle" fontSize="7" fill="var(--vi-ink4)">5 disconnected tabs open</text>
                <text x="24" y="44" fontSize="8" fill="var(--vi-ink3)">LeetCode · GitHub · YouTube...</text>
                {
                    [54, 64, 74, 84, 94, 104, 114].map(y => (
                        <g key={y}>
                            <rect x="20" y={y} width={60 + (y % 30)} height="5" rx="2" fill="var(--vi-line)" />
                            <text x="24" y={y + 4} fontSize="5.5" fill="#c2553f" opacity="0.6">
                                {y % 2 === 0 ? "Discord · ChatGPT" : "no shared context"}
                            </text>
                        </g>
                    ))
                }
                <text x="108" y="136" textAnchor="middle" fontSize="7.5" fill="#c2553f">Learning in isolation</text>
            </g>

            <g className="vbb22 vbb2-err">
                <rect x="224" y="8" width="108" height="80" rx="8" fill="var(--vi-surface)" stroke="#c2553f" strokeWidth="1" />
                <text x="278" y="26" textAnchor="middle" fontSize="7.5" fill="#c2553f" fontWeight="700">No Proof</text>
                <text x="278" y="40" textAnchor="middle" fontSize="7" fill="var(--vi-ink3)">Nothing to show</text>
                <text x="278" y="52" textAnchor="middle" fontSize="7" fill="var(--vi-ink3)">for what you can</text>
                <text x="278" y="64" textAnchor="middle" fontSize="7" fill="var(--vi-ink3)">actually build.</text>
                <text x="278" y="79" textAnchor="middle" fontSize="7" fill="var(--vi-ink4)">Just a transcript</text>
            </g>

            <text x="170" y="164" textAnchor="middle" fontSize="7.5" fill="var(--vi-ink3)">Students piece together five tools with no shared context.</text>
            <text x="170" y="176" textAnchor="middle" fontSize="7.5" fill="var(--vi-ink3)">They graduate with no verifiable record of what they built.</text>
        </svg>
    )
}

const TOPICS: Topic[] = [
    {
        id: "fragmented-tooling",
        label: "Fragmented Tooling",
        beforeTitle: "Five disconnected tools, every launch a scramble",
        afterTitle: "One unified platform, checkout in under 30 seconds",
        items: [
            "Five disconnected tools - WhatsApp, Google Forms, spreadsheets, manual tracking",
            "Registrations scattered across forms and chat threads with no single source of truth",
            "Attendees can't discover events outside their own campus",
            "Organizers have zero real-time visibility into who is attending",
            "Every event launch is a logistical scramble with no infrastructure to support it",
        ],
        afterSummary: [
            "One unified platform - discovery to checkout in under 30 seconds (EventEye)",
            "Dual-sided experience: a discovery feed for attendees, a dashboard for organizers",
            "Real-time attendance, analytics, and community tools in one codebase",
        ],
        Illustration: AfterResearchSVG,
        BeforeIllustration: BeforeResearchSVG,
    },
    {
        id: "manual-deploys",
        label: "Manual Deploys",
        beforeTitle: "Hand-rolled deploys, releases that break in production",
        afterTitle: "Automated CI/CD, always working software",
        items: [
            "Hand-rolled deploys with no pipeline - a script someone runs by hand",
            "Releases that break in production because nothing was tested first",
            "No staging environment to catch regressions before users do",
            "Every release is a gamble nobody on the team is confident about",
            "Downtime and 500s discovered by customers, not by the team",
        ],
        afterSummary: [
            "Automated CI/CD with lint, type-check, and tests on every push",
            "Bi-weekly deployments to staging - you always see real working software",
            "Never mockups, never status decks - only software that actually runs",
        ],
        Illustration: AfterComplianceSVG,
        BeforeIllustration: BeforeComplianceSVG,
    },
    {
        id: "no-visibility",
        label: "No Visibility",
        beforeTitle: "Inventory on phone calls and memory, weekly stockouts",
        afterTitle: "Real-time dashboards, 100% network visibility",
        items: [
            "Inventory run on phone calls and WhatsApp messages across the network",
            "Weekly stockouts while surplus sits unsold somewhere else",
            "Zero data on demand patterns - the business runs on memory and goodwill",
            "Reorders delayed because no one has a single source of truth for stock",
            "No way to know what is in stock, where, until someone phones to ask",
        ],
        afterSummary: [
            "Real-time dashboards with 100% network visibility (M.P. Solutions)",
            "Automated reorder alerts the moment stock drops below threshold",
            "Live demand patterns and a complete order audit trail - zero phone calls",
        ],
        Illustration: AfterFinanceActSVG,
        BeforeIllustration: BeforeFinanceActSVG,
    },
    {
        id: "prototype-never-ships",
        label: "Prototype That Never Ships",
        beforeTitle: "A Figma deck and a prototype that never reaches users",
        afterTitle: "A production system people actually use",
        items: [
            "A Figma deck and a prototype that never reaches a single real user",
            "Months of mockups with nothing deployed behind them",
            "Endless iteration on screens no one can actually click in production",
            "Handoffs and finger-pointing between design, frontend, and backend",
            "Status updates instead of working software you can open and use",
        ],
        afterSummary: [
            "A production system people actually use - every project goes live",
            "One team owns frontend, backend, infra, and deployment end to end",
            "Not a prototype, not a Figma deck - a real system in production",
        ],
        Illustration: AfterDocumentSVG,
        BeforeIllustration: BeforeDocumentSVG,
    },
    {
        id: "slow-stack",
        label: "Slow, Brittle Stack",
        beforeTitle: "Monolith that takes minutes to build and breaks on every change",
        afterTitle: "Modern stack - type-safe end to end, fast and maintainable",
        items: [
            "Monolith that takes minutes to build before you can test anything",
            "Breaks on every change because nothing is type-safe across boundaries",
            "Runtime errors that should have been caught at compile time",
            "Technical debt that compounds with each release you ship",
            "Slow feedback loops that grind developer velocity to a crawl",
        ],
        afterSummary: [
            "Modern stack (Next.js, tRPC, Prisma) - type-safe from database to UI",
            "Builds in seconds, not minutes - fast feedback on every change",
            "Maintainable by design: predictable layers, no debt to pay back later",
        ],
        Illustration: AfterBookingSVG,
        BeforeIllustration: BeforeBookingSVG,
    },
    {
        id: "learning-isolation",
        label: "Learning in Isolation",
        beforeTitle: "Five tools, no proof of what students can build",
        afterTitle: "One engineering OS with AI agents and a verifiable portfolio",
        items: [
            "Students piece together five tools - LeetCode, GitHub, YouTube, Discord, ChatGPT",
            "No single platform connecting their learning, projects, and community",
            "No AI that understands their specific academic and career context",
            "No way to build verifiable, real-world project experience before graduating",
            "Learning in isolation with no proof of what they can actually ship",
        ],
        afterSummary: [
            "One engineering OS with six specialized AI agents (CodrzAI)",
            "A Project Foundry that scaffolds full-stack codebases from a prompt",
            "Open-source bounties build a verifiable portfolio - proof, not just a transcript",
        ],
        Illustration: AfterBilingualSVG,
        BeforeIllustration: BeforeBilingualSVG,
    },
]

const FADE = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
}

export default function BeforeAfter() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: containerRef })
    useSlideSnap(containerRef, TOPICS.length)
    const [activeTab, setActiveTab] = useState(0)
    const [tabProgress, setTabProgress] = useState(0)
    const [animKey, setAnimKey] = useState(0)

    useEffect(() => {
        return scrollYProgress.on("change", (v) => {
            const floatIdx = v * TOPICS.length
            const idx = Math.min(Math.floor(floatIdx), TOPICS.length - 1)
            setActiveTab((prev) => {
                if (prev !== idx) setAnimKey((k) => k + 1)
                return idx
            })
            setTabProgress(floatIdx - Math.floor(floatIdx))
        })
    }, [scrollYProgress])

    useEffect(() => {
        containerRef.current?.style.setProperty("--anim-play", "running")
    }, [animKey])

    const topic = TOPICS[activeTab]!
    const { Illustration, BeforeIllustration } = topic

    return (
        <div
            ref={containerRef}
            style={{ height: `${TOPICS.length * 46 + 80}vh` }}
            className="vi-ba"
        >
            <style>{`
                .vi-ba {
                    --vi-surface: #ffffff; --vi-bg: #fafafa; --vi-bg2: #f3f4f6;
                    --vi-ink: #171717; --vi-ink2: #404040; --vi-ink3: #737373;
                    --vi-ink4: #a3a3a3; --vi-line: #e5e5e5; --vi-gold: #9a8a6a;
                    --anim-play: paused;
                }
                .dark .vi-ba {
                    --vi-surface: #111111; --vi-bg: #0a0a0a; --vi-bg2: #1a1a1a;
                    --vi-ink: #fafafa; --vi-ink2: #e5e5e5; --vi-ink3: #a3a3a3;
                    --vi-ink4: #525252; --vi-line: #262626; --vi-gold: #c9a961;
                }
            `}</style>

            <div className="sticky top-0 h-screen flex flex-col">
                <div className="relative z-[1] flex flex-col h-full w-full max-w-7xl mx-auto px-4 md:px-8">
                    <div className="shrink-0 pt-16 pb-0 lg:pt-20">
                        <p className="mb-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--vi-ink3)]">
                            Before &amp; After Shunya
                        </p>
                        <h2 className="text-3xl font-bold text-[var(--vi-ink)] md:text-[2.1rem] leading-tight">
                            The way teams used to{" "}
                            <span className="text-[var(--vi-ink4)]">ship software.</span>
                        </h2>
                        <p className="mt-1.5 text-[15px] text-[var(--vi-ink3)]">
                            Shunya replaces fragmented tooling, manual deploys, and prototypes-that-never-ship with production systems people actually use.
                        </p>
                    </div>
                    <div className="shrink-0 mt-4 flex border-b border-[var(--vi-line)] overflow-x-auto scrollbar-hide">
                        {
                            TOPICS.map((t, i) => {
                                const isActive = activeTab === i
                                return (
                                    <div
                                        key={t.id}
                                        className={cn(
                                            "relative shrink-0 px-5 py-3 text-[15px] font-medium transition-colors cursor-default select-none",
                                            isActive ? "text-[var(--vi-ink)]" : "text-[var(--vi-ink4)]",
                                        )}
                                    >
                                        {t.label}
                                        {
                                            isActive && (
                                                <motion.div
                                                    className="absolute bottom-0 left-0 h-[2px] bg-[var(--vi-ink)] origin-left"
                                                    style={{ width: "100%", scaleX: tabProgress }}
                                                    transition={{ duration: 0 }}
                                                />
                                            )
                                        }
                                        {
                                            i < activeTab && (
                                                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[var(--vi-line)]" />
                                            )
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="flex-1 min-h-0 py-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={topic.id}
                                {...FADE}
                                className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-7"
                            >
                                <div className="flex flex-col min-h-0 rounded-2xl border border-[var(--vi-line)] bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
                                    <div className="shrink-0 flex items-start gap-3 px-5 pt-4 pb-3 border-b border-[var(--vi-line)]">
                                        <div className="h-7 w-7 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(194,85,63,0.12)" }}>
                                            <X className="h-3.5 w-3.5" style={{ color: "#c2553f" }} />
                                        </div>
                                        <p className="text-[16px] font-semibold leading-snug" style={{ color: "#c2553f" }}>Before · {topic.beforeTitle}</p>
                                    </div>
                                    <div className="flex-[1.25] min-h-[150px] px-4 pt-4 pb-2">
                                        <BeforeIllustration animKey={animKey} />
                                    </div>
                                    <div className="flex-1 min-h-0 overflow-y-auto px-5 pb-4 space-y-2.5 scrollbar-hide">
                                        {
                                            topic.items.map((item, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -8 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.05, duration: 0.3 }}
                                                    className="flex items-start gap-2.5"
                                                >
                                                    <X className="h-[15px] w-[15px] shrink-0 mt-[3px]" style={{ color: "rgba(194,85,63,0.8)" }} />
                                                    <span className="text-[16px] text-[var(--vi-ink2)] leading-relaxed">{item}</span>
                                                </motion.div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-col min-h-0 rounded-2xl border border-[var(--vi-line)] bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
                                    <div className="shrink-0 flex items-start gap-3 px-5 pt-4 pb-3 border-b border-[var(--vi-line)]">
                                        <div className="h-7 w-7 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center shrink-0 mt-0.5">
                                            <Check className="h-3.5 w-3.5 text-white dark:text-neutral-900" />
                                        </div>
                                        <p className="text-[16px] font-semibold text-[var(--vi-ink)] leading-snug">After · {topic.afterTitle}</p>
                                    </div>
                                    <div className="flex-[1.25] min-h-[150px] px-4 pt-4 pb-2">
                                        <Illustration animKey={animKey} />
                                    </div>
                                    <div className="flex-1 min-h-0 overflow-y-auto px-5 pb-4 pt-3 space-y-2.5 border-t border-[var(--vi-line)] scrollbar-hide">
                                        {
                                            topic.afterSummary.map((item, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: 8 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.06 + 0.1, duration: 0.3 }}
                                                    className="flex items-start gap-2.5"
                                                >
                                                    <Check className="h-[15px] w-[15px] text-[var(--vi-ink)] shrink-0 mt-[3px]" />
                                                    <span className="text-[16px] text-[var(--vi-ink2)] leading-relaxed">{item}</span>
                                                </motion.div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <div className="shrink-0 flex items-center justify-center gap-2 py-3 border-t border-[var(--vi-line)] bg-white/60 dark:bg-neutral-950/60 backdrop-blur-sm">
                        <div className="flex gap-1">
                            {
                                TOPICS.map((_, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "h-1 rounded-full transition-all duration-300",
                                            i === activeTab ? "w-4 bg-[var(--vi-ink)]" : "w-1 bg-[var(--vi-line)]",
                                        )}
                                    />
                                ))
                            }
                        </div>
                        <span className="text-[10px] text-[var(--vi-ink4)] ml-1">Scroll to explore</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
