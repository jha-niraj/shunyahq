"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion"
import {
    BookOpen, Smartphone, FileSearch, Users, Search, ArrowRight, Shield, Clock,
    Bell, BarChart3, Zap, MessageSquare, Cloud, Layout, Cpu, Globe, GitBranch
} from "lucide-react"

type BulletItem = { icon: React.ElementType; text: string }

type Feature = {
    id: string
    href: string
    label: string
    eyebrow: string
    bigStat: string
    title: string
    description: string
    bullets: BulletItem[]
    accentMetric: string
    accentLabel: string
    extraBadge?: string
    illustration: React.ReactNode
}

function WebEngineeringIllustration() {
    return (
        <svg viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <style>{`
                .ar1{animation:ar-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.1s}
                .ar2{animation:ar-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.5s}
                .ar3{animation:ar-type 1.8s steps(38,end) both;animation-play-state:var(--anim-play,paused);animation-delay:0.8s}
                .ar4{animation:ar-in 0.3s ease both;animation-play-state:var(--anim-play,paused);animation-delay:1.9s}
                .ar5{animation:ar-pop 0.35s cubic-bezier(0.22,1,0.36,1) both;animation-play-state:var(--anim-play,paused);animation-delay:2.1s}
                .ar6{animation:ar-pop 0.35s cubic-bezier(0.22,1,0.36,1) both;animation-play-state:var(--anim-play,paused);animation-delay:2.3s}
                .ar-cursor{animation:ar-blink 0.8s ease infinite;animation-play-state:var(--anim-play,paused);animation-delay:0.8s}
                @keyframes ar-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
                @keyframes ar-pop{from{opacity:0;transform:scale(0.85)}to{opacity:1;transform:scale(1)}}
                @keyframes ar-blink{0%,100%{opacity:0}50%{opacity:1}}
                @keyframes ar-type{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0% 0 0)}}
            `}</style>
            <rect x="8" y="8" width="324" height="184" rx="12" fill="var(--vi-surface)" stroke="var(--vi-line)" strokeWidth="1" />
            <rect x="8" y="8" width="324" height="30" rx="12" fill="var(--vi-bg2)" />
            <rect x="8" y="26" width="324" height="12" fill="var(--vi-bg2)" />
            <circle cx="22" cy="22" r="4" fill="var(--vi-line)" />
            <circle cx="36" cy="22" r="4" fill="var(--vi-line)" />
            <circle cx="50" cy="22" r="4" fill="var(--vi-line)" />
            <text x="170" y="26" textAnchor="middle" fontSize="8" fill="var(--vi-ink3)" fontFamily="inherit">app/page.tsx - Next.js 15</text>

            <g className="ar1">
                <rect x="140" y="44" width="180" height="22" rx="10" fill="var(--vi-bg2)" stroke="var(--vi-line)" strokeWidth="0.75" />
                <text x="230" y="59" textAnchor="middle" fontSize="8.5" fill="var(--vi-ink2)" fontFamily="inherit">export default async function Page() {"{"}</text>
            </g>

            <g className="ar2">
                <circle cx="24" cy="82" r="7" fill="var(--vi-bg2)" stroke="var(--vi-line)" strokeWidth="0.75" />
                <path d="M21 79 L24 85 L27 79" fill="none" stroke="var(--vi-ink3)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            <text x="38" y="94" fontSize="8" fill="var(--vi-ink2)" fontFamily="inherit" className="ar3" style={{ clipPath: "inset(0 100% 0 0)" }}>
                const data = await fetch(api, {"{"} next: {"{"} revalidate: 60 {"}"} {"}"})
            </text>
            <text x="38" y="107" fontSize="8" fill="var(--vi-ink2)" fontFamily="inherit" className="ar3" style={{ clipPath: "inset(0 100% 0 0)", animationDelay: "1.0s" }}>
                return &lt;Dashboard data={"{"}data{"}"} /&gt; // React Server Component
            </text>
            <rect x="39" y="88" width="4" height="10" rx="1" fill="var(--vi-ink)" className="ar-cursor" />

            <g className="ar4">
                <line x1="38" y1="115" x2="300" y2="115" stroke="var(--vi-line)" strokeWidth="0.75" />
                <text x="38" y="126" fontSize="7.5" fill="var(--vi-ink3)" fontFamily="inherit" letterSpacing="0.06em">CORE WEB VITALS</text>
            </g>

            <g className="ar5">
                <rect x="38" y="132" width="88" height="16" rx="8" fill="var(--vi-bg2)" stroke="var(--vi-line)" strokeWidth="0.75" />
                <text x="82" y="143" textAnchor="middle" fontSize="7.5" fill="var(--vi-gold)" fontFamily="inherit">LCP 0.9s</text>
            </g>
            <g className="ar6">
                <rect x="134" y="132" width="104" height="16" rx="8" fill="var(--vi-bg2)" stroke="var(--vi-line)" strokeWidth="0.75" />
                <text x="186" y="143" textAnchor="middle" fontSize="7.5" fill="var(--vi-gold)" fontFamily="inherit">Lighthouse · SEO 100</text>
            </g>

            <g className="ar4">
                <rect x="248" y="132" width="64" height="16" rx="8" fill="var(--vi-ink)" opacity="0.9" />
                <text x="280" y="143" textAnchor="middle" fontSize="7" fill="var(--vi-bg)" fontFamily="inherit">Deploy ✓</text>
            </g>
        </svg>
    )
}

function MobileEcologyIllustration() {
    return (
        <svg viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <style>{`
                .ld1{animation:ld-down 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.1s}
                .ld2{animation:ld-in 0.35s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.35s}
                .ld3{animation:ld-in 0.35s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.55s}
                .ld4{animation:ld-in 0.35s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.75s}
                .ld5{animation:ld-in 0.35s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.95s}
                .ld6{animation:ld-in 0.35s ease both;animation-play-state:var(--anim-play,paused);animation-delay:1.15s}
                .ld-hl{animation:ld-pulse 1.6s ease 1.3s infinite;animation-play-state:var(--anim-play,paused)}
                @keyframes ld-down{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
                @keyframes ld-in{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
                @keyframes ld-pulse{0%,100%{opacity:0.7}50%{opacity:1}}
            `}</style>
            <rect x="8" y="8" width="324" height="184" rx="12" fill="var(--vi-surface)" stroke="var(--vi-line)" strokeWidth="1" />

            <g className="ld1">
                <rect x="16" y="14" width="308" height="26" rx="8" fill="var(--vi-bg2)" stroke="var(--vi-line)" strokeWidth="0.75" />
                <circle cx="30" cy="27" r="5" stroke="var(--vi-ink3)" strokeWidth="1.2" fill="none" />
                <line x1="34" y1="31" x2="37" y2="34" stroke="var(--vi-ink3)" strokeWidth="1.2" strokeLinecap="round" />
                <text x="44" y="31" fontSize="8.5" fill="var(--vi-ink3)" fontFamily="inherit">expo build - react native</text>
                <text x="304" y="31" textAnchor="end" fontSize="7.5" fill="var(--vi-gold)" fontFamily="inherit">1 codebase</text>
            </g>

            <text x="16" y="56" fontSize="7.5" fill="var(--vi-ink4)" fontFamily="inherit" letterSpacing="0.06em">BUILD MATRIX - 4 targets from one source</text>

            {
                [
                    { y: 64, act: "iOS - App Store", section: "Signed .ipa · arm64", match: "build passed" },
                    { y: 95, act: "Android - Play Store", section: "Signed .aab · universal", match: "build passed" },
                    { y: 126, act: "Offline-first cache", section: "SQLite · sync queue", match: "ready" },
                    { y: 157, act: "Push notifications", section: "FCM · APNs bridged", match: "configured" },
                ].map(({ y, act, section, match }, i) => (
                    <g key={y} className={`ld${i + 2}`}>
                        <rect x="16" y={y} width="308" height="26" rx="6" fill={i === 0 ? "var(--vi-bg2)" : "transparent"} stroke={i === 0 ? "var(--vi-line)" : "none"} strokeWidth="0.75" />
                        {i === 0 && <rect x="16" y={y} width="3" height="26" rx="1.5" fill="var(--vi-ink)" className="ld-hl" />}
                        <text x="28" y={y + 11} fontSize="7.5" fill="var(--vi-ink)" fontFamily="inherit" fontWeight="600">{act}</text>
                        <text x="28" y={y + 22} fontSize="7.5" fill="var(--vi-ink3)" fontFamily="inherit">{section}</text>
                        <text x="308" y={y + 11} textAnchor="end" fontSize="7" fill="var(--vi-ink4)" fontFamily="inherit">{match}</text>
                    </g>
                ))
            }
        </svg>
    )
}

function CloudArchitectureIllustration() {
    return (
        <svg viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <style>{`
                .cc1{animation:cc-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.1s}
                .cc2{animation:cc-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.3s}
                .cc3{animation:cc-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.5s}
                .cc4{animation:cc-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.7s}
                .cc-pulse{animation:cc-pulse 1.8s ease 1s infinite;animation-play-state:var(--anim-play,paused)}
                .cc-ring{animation:cc-ring 2s ease 1.2s infinite;animation-play-state:var(--anim-play,paused)}
                @keyframes cc-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
                @keyframes cc-pulse{0%,100%{opacity:0.5}50%{opacity:1}}
                @keyframes cc-ring{0%{r:5;opacity:0.6}100%{r:12;opacity:0}}
            `}</style>
            <rect x="8" y="8" width="324" height="184" rx="12" fill="var(--vi-surface)" stroke="var(--vi-line)" strokeWidth="1" />
            <rect x="8" y="8" width="324" height="30" rx="12" fill="var(--vi-bg2)" />
            <rect x="8" y="26" width="324" height="12" fill="var(--vi-bg2)" />
            <text x="20" y="27" fontSize="9.5" fontWeight="600" fill="var(--vi-ink)">CI/CD Pipeline · production</text>
            <circle cx="310" cy="22" r="6" fill="var(--vi-ink)" />
            <circle cx="310" cy="22" r="6" fill="transparent" stroke="var(--vi-ink)" strokeWidth="0.5" className="cc-ring" />
            <text x="310" y="26" textAnchor="middle" fontSize="7" fill="var(--vi-bg)" fontWeight="700">4</text>

            <text x="20" y="52" fontSize="7.5" fill="var(--vi-ink4)" fontFamily="inherit" letterSpacing="0.08em">STAGE</text>
            <text x="148" y="52" fontSize="7.5" fill="var(--vi-ink4)" fontFamily="inherit" letterSpacing="0.08em">PROVIDER</text>
            <text x="230" y="52" fontSize="7.5" fill="var(--vi-ink4)" fontFamily="inherit" letterSpacing="0.08em">DURATION</text>
            <text x="290" y="52" fontSize="7.5" fill="var(--vi-ink4)" fontFamily="inherit" letterSpacing="0.08em">STATE</text>
            <line x1="12" y1="56" x2="328" y2="56" stroke="var(--vi-line)" strokeWidth="0.75" />

            {
                [
                    { y: 68, label: "Build & Test", date: "GitHub", days: "42s", dayColor: "var(--vi-ink)", tag: "OK", urgent: false },
                    { y: 89, label: "Terraform Apply", date: "AWS", days: "1m08", dayColor: "var(--vi-ink)", tag: "OK", urgent: false },
                    { y: 110, label: "Docker → Registry", date: "ECR", days: "55s", dayColor: "var(--vi-ink)", tag: "OK", urgent: false },
                    { y: 131, label: "Rolling Deploy - K8s", date: "EKS", days: "0s", dayColor: "#16a34a", tag: "LIVE", urgent: true },
                ].map(({ y, label, date, days, dayColor, tag, urgent }, i) => (
                    <g key={y} className={`cc${i + 1}`}>
                        <rect x="12" y={y - 9} width="316" height="18" rx="5" fill={urgent ? "rgba(22,163,74,0.08)" : "transparent"} />
                        {urgent && <rect x="12" y={y - 9} width="3" height="18" rx="1.5" fill="#16a34a" />}
                        <text x={urgent ? "20" : "16"} y={y + 3} fontSize="8.5" fill="var(--vi-ink)" fontFamily="inherit">{label}</text>
                        <text x="148" y={y + 3} fontSize="8" fill="var(--vi-ink3)" fontFamily="inherit">{date}</text>
                        <text x="230" y={y + 3} fontSize="10" fontWeight="700" fill={dayColor} fontFamily="inherit">{days}</text>
                        <rect x="286" y={y - 7} width="30" height="13" rx="5" fill="var(--vi-bg2)" />
                        <text x="301" y={y + 2} textAnchor="middle" fontSize="7.5" fill="var(--vi-ink3)" fontFamily="inherit">{tag}</text>
                    </g>
                ))
            }

            <line x1="12" y1="150" x2="328" y2="150" stroke="var(--vi-line)" strokeWidth="0.75" />
            <g className="cc4">
                <circle cx="22" cy="164" r="4" fill="#16a34a" opacity="0.8" className="cc-pulse" />
                <text x="32" y="168" fontSize="7.5" fill="var(--vi-ink3)" fontFamily="inherit" letterSpacing="0.04em">Zero-downtime rollout · Auto-scaling enabled · IaC managed by Terraform</text>
            </g>
        </svg>
    )
}

function AIIntegrationIllustration() {
    return (
        <svg viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <style>{`
                .da1{animation:da-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.1s}
                .da2{animation:da-hl 0.5s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.6s}
                .da3{animation:da-hl 0.5s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.9s}
                .da4{animation:da-pop 0.4s cubic-bezier(0.22,1,0.36,1) both;animation-play-state:var(--anim-play,paused);animation-delay:1.2s}
                .da5{animation:da-pop 0.4s cubic-bezier(0.22,1,0.36,1) both;animation-play-state:var(--anim-play,paused);animation-delay:1.5s}
                .da6{animation:da-pop 0.4s cubic-bezier(0.22,1,0.36,1) both;animation-play-state:var(--anim-play,paused);animation-delay:1.8s}
                @keyframes da-in{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}
                @keyframes da-hl{from{opacity:0;scaleX:0}to{opacity:1;scaleX:1}}
                @keyframes da-pop{from{opacity:0;transform:translateX(12px)}to{opacity:1;transform:translateX(0)}}
            `}</style>

            <g className="da1">
                <rect x="20" y="10" width="160" height="180" rx="8" fill="var(--vi-bg)" stroke="var(--vi-line)" strokeWidth="1.2" />
                <line x1="20" y1="30" x2="180" y2="30" stroke="var(--vi-line)" strokeWidth="0.75" />
                <text x="32" y="24" fontSize="7.5" fill="var(--vi-ink3)" fontFamily="inherit">knowledge-base.md</text>
                <rect x="28" y="36" width="100" height="4" rx="2" fill="var(--vi-line)" />
                <rect x="28" y="46" width="130" height="4" rx="2" fill="var(--vi-line)" />
                <rect x="28" y="56" width="120" height="4" rx="2" fill="var(--vi-line)" />
            </g>

            <g className="da2">
                <rect x="28" y="68" width="144" height="16" rx="3" fill="var(--vi-gold)" opacity="0.18" />
                <rect x="28" y="68" width="144" height="16" rx="3" stroke="var(--vi-gold)" strokeWidth="0.8" />
                <text x="32" y="79.5" fontSize="7.5" fill="var(--vi-ink)" fontFamily="inherit">chunk → embed → vector store</text>
            </g>

            <rect x="28" y="92" width="110" height="4" rx="2" fill="var(--vi-line)" className="da1" />
            <rect x="28" y="102" width="135" height="4" rx="2" fill="var(--vi-line)" className="da1" />

            <g className="da3">
                <rect x="28" y="112" width="144" height="16" rx="3" fill="var(--vi-bg2)" stroke="var(--vi-line)" strokeWidth="0.8" />
                <text x="32" y="123.5" fontSize="7.5" fill="var(--vi-ink3)" fontFamily="inherit">retrieved top-k: 5 passages</text>
                <rect x="28" y="112" width="3" height="16" rx="1.5" fill="var(--vi-ink4)" />
            </g>

            <rect x="28" y="136" width="125" height="4" rx="2" fill="var(--vi-line)" className="da1" />
            <rect x="28" y="146" width="100" height="4" rx="2" fill="var(--vi-line)" className="da1" />
            <rect x="28" y="156" width="135" height="4" rx="2" fill="var(--vi-line)" className="da1" />

            <g className="da4">
                <rect x="190" y="10" width="142" height="52" rx="8" fill="var(--vi-surface)" stroke="var(--vi-gold)" strokeWidth="1" />
                <text x="200" y="24" fontSize="7.5" fill="var(--vi-gold)" fontFamily="inherit" fontWeight="600">AGENT RESPONSE</text>
                <text x="200" y="37" fontSize="7.5" fill="var(--vi-ink2)" fontFamily="inherit">Grounded answer generated</text>
                <text x="200" y="49" fontSize="7.5" fill="var(--vi-ink2)" fontFamily="inherit">with inline source citations.</text>
            </g>
            <g className="da5">
                <rect x="190" y="72" width="142" height="40" rx="8" fill="var(--vi-surface)" stroke="var(--vi-line)" strokeWidth="1" />
                <text x="200" y="86" fontSize="7.5" fill="var(--vi-ink3)" fontFamily="inherit">MODEL</text>
                <text x="200" y="100" fontSize="7.5" fill="var(--vi-ink2)" fontFamily="inherit">Claude / GPT-4o · tools enabled</text>
                <text x="200" y="109" fontSize="7.5" fill="var(--vi-ink3)" fontFamily="inherit">temperature 0.2 · streamed</text>
            </g>
            <g className="da6">
                <rect x="190" y="122" width="142" height="28" rx="8" fill="var(--vi-ink)" />
                <text x="261" y="140" textAnchor="middle" fontSize="8.5" fill="var(--vi-bg)" fontWeight="600" fontFamily="inherit">Open Chatbot UI →</text>
            </g>
        </svg>
    )
}

function UIUXSystemsIllustration() {
    return (
        <svg viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <style>{`
                .cn1{animation:cn-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.1s}
                .cn2{animation:cn-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.35s}
                .cn3{animation:cn-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.55s}
                .cn4{animation:cn-pop 0.4s cubic-bezier(0.22,1,0.36,1) both;animation-play-state:var(--anim-play,paused);animation-delay:0.8s}
                .cn5{animation:cn-pop 0.4s cubic-bezier(0.22,1,0.36,1) both;animation-play-state:var(--anim-play,paused);animation-delay:1.1s}
                .cn6{animation:cn-pop 0.4s cubic-bezier(0.22,1,0.36,1) both;animation-play-state:var(--anim-play,paused);animation-delay:1.4s}
                .cn-badge{animation:cn-shine 2s ease 1.6s infinite;animation-play-state:var(--anim-play,paused)}
                @keyframes cn-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
                @keyframes cn-pop{from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}
                @keyframes cn-shine{0%,100%{opacity:0.8}50%{opacity:1}}
            `}</style>

            <rect x="8" y="8" width="324" height="184" rx="12" fill="var(--vi-surface)" stroke="var(--vi-line)" strokeWidth="1" />

            <g className="cn1">
                <rect x="29" y="29" width="52" height="52" rx="12" fill="var(--vi-bg2)" stroke="var(--vi-line)" strokeWidth="1" />
                <text x="55" y="61" textAnchor="middle" fontSize="18" fill="var(--vi-ink3)" fontFamily="inherit" fontWeight="600">Aa</text>
            </g>

            <g className="cn2">
                <text x="95" y="42" fontSize="13" fontWeight="700" fill="var(--vi-ink)" fontFamily="inherit">Design System</text>
                <text x="95" y="56" fontSize="8.5" fill="var(--vi-ink3)" fontFamily="inherit">Atomic tokens · 64 components</text>
                <text x="95" y="68" fontSize="8" fill="var(--vi-ink4)" fontFamily="inherit">Figma · documented · pixel perfect</text>
            </g>

            <g className="cn3">
                <rect x="95" y="76" width="48" height="14" rx="7" fill="var(--vi-bg2)" stroke="var(--vi-line)" strokeWidth="0.75" />
                <text x="119" y="86" textAnchor="middle" fontSize="7" fill="var(--vi-ink3)" fontFamily="inherit">Tokens</text>
                <rect x="150" y="76" width="32" height="14" rx="7" fill="var(--vi-bg2)" stroke="var(--vi-line)" strokeWidth="0.75" />
                <text x="166" y="86" textAnchor="middle" fontSize="7" fill="var(--vi-ink3)" fontFamily="inherit">Grid</text>
                <rect x="189" y="76" width="36" height="14" rx="7" fill="var(--vi-bg2)" stroke="var(--vi-line)" strokeWidth="0.75" />
                <text x="207" y="86" textAnchor="middle" fontSize="7" fill="var(--vi-ink3)" fontFamily="inherit">WCAG</text>
            </g>

            <line x1="12" y1="100" x2="328" y2="100" stroke="var(--vi-line)" strokeWidth="0.75" />

            <g className="cn4">
                <text x="20" y="118" fontSize="8" fill="var(--vi-ink3)" fontFamily="inherit" letterSpacing="0.08em">COMPONENTS</text>
                {
                    [
                        { x: 20, label: "Button" },
                        { x: 90, label: "Input" },
                        { x: 160, label: "Modal" },
                    ].map(({ x, label }) => (
                        <g key={x}>
                            <rect x={x} y="124" width="60" height="20" rx="6" fill="var(--vi-bg2)" stroke="var(--vi-line)" strokeWidth="0.75" />
                            <text x={x + 30} y="137" textAnchor="middle" fontSize="8" fill="var(--vi-ink2)" fontFamily="inherit">{label}</text>
                        </g>
                    ))
                }
            </g>

            <g className="cn5">
                <text x="20" y="162" fontSize="8" fill="var(--vi-ink3)" fontFamily="inherit" letterSpacing="0.08em">CONTRAST RATIO</text>
                <text x="20" y="176" fontSize="16" fontWeight="700" fill="var(--vi-ink)" fontFamily="inherit">AAA</text>
                <text x="68" y="176" fontSize="8.5" fill="var(--vi-ink4)" fontFamily="inherit">/ accessible</text>
            </g>

            <g className="cn6">
                <rect x="220" y="155" width="100" height="28" rx="8" fill="var(--vi-ink)" />
                <text x="270" y="173" textAnchor="middle" fontSize="9" fill="var(--vi-bg)" fontWeight="600" fontFamily="inherit">Open in Figma →</text>
            </g>

            <g className="cn-badge">
                <rect x="248" y="14" width="72" height="18" rx="9" fill="var(--vi-bg2)" stroke="var(--vi-gold)" strokeWidth="1" />
                <text x="284" y="26" textAnchor="middle" fontSize="7.5" fill="var(--vi-gold)" fontFamily="inherit" fontWeight="600">Prototype ✓</text>
            </g>
        </svg>
    )
}

function DevOpsSecurityIllustration() {
    return (
        <svg viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <style>{`
                .ds1{animation:ds-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.1s}
                .ds2{animation:ds-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.35s}
                .ds3{animation:ds-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.55s}
                .ds4{animation:ds-in 0.4s ease both;animation-play-state:var(--anim-play,paused);animation-delay:0.75s}
                .ds5{animation:ds-pop 0.35s cubic-bezier(0.22,1,0.36,1) both;animation-play-state:var(--anim-play,paused);animation-delay:1s}
                .ds-pulse{animation:ds-pulse 1.8s ease 1.2s infinite;animation-play-state:var(--anim-play,paused)}
                @keyframes ds-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
                @keyframes ds-pop{from{opacity:0;transform:scale(0.85)}to{opacity:1;transform:scale(1)}}
                @keyframes ds-pulse{0%,100%{opacity:0.5}50%{opacity:1}}
            `}</style>
            <rect x="8" y="8" width="324" height="184" rx="12" fill="var(--vi-surface)" stroke="var(--vi-line)" strokeWidth="1" />
            <rect x="8" y="8" width="324" height="30" rx="12" fill="var(--vi-bg2)" />
            <rect x="8" y="26" width="324" height="12" fill="var(--vi-bg2)" />
            <text x="20" y="27" fontSize="9.5" fontWeight="600" fill="var(--vi-ink)">Security & Monitoring</text>
            <g className="ds5">
                <rect x="248" y="14" width="72" height="18" rx="9" fill="var(--vi-bg2)" stroke="var(--vi-gold)" strokeWidth="1" />
                <text x="284" y="26" textAnchor="middle" fontSize="7.5" fill="var(--vi-gold)" fontFamily="inherit" fontWeight="600">Hardened ✓</text>
            </g>

            <text x="20" y="56" fontSize="7.5" fill="var(--vi-ink4)" fontFamily="inherit" letterSpacing="0.08em">CONTROL</text>
            <text x="200" y="56" fontSize="7.5" fill="var(--vi-ink4)" fontFamily="inherit" letterSpacing="0.08em">STATUS</text>
            <line x1="12" y1="60" x2="328" y2="60" stroke="var(--vi-line)" strokeWidth="0.75" />

            {
                [
                    { y: 72, label: "Penetration test", status: "0 critical", cls: "ds1" },
                    { y: 95, label: "OAuth 2.0 + RBAC", status: "enforced", cls: "ds2" },
                    { y: 118, label: "AES-256 / TLS 1.3", status: "encrypted", cls: "ds3" },
                    { y: 141, label: "Uptime monitor", status: "99.99%", cls: "ds4" },
                ].map(({ y, label, status, cls }) => (
                    <g key={y} className={cls}>
                        <rect x="12" y={y - 11} width="316" height="20" rx="6" fill="var(--vi-bg2)" stroke="var(--vi-line)" strokeWidth="0.5" />
                        <circle cx="24" cy={y - 1} r="3.5" fill="#16a34a" opacity="0.85" />
                        <text x="36" y={y + 2} fontSize="8.5" fill="var(--vi-ink)" fontFamily="inherit">{label}</text>
                        <text x="316" y={y + 2} textAnchor="end" fontSize="8" fill="var(--vi-gold)" fontFamily="inherit">{status}</text>
                    </g>
                ))
            }

            <line x1="12" y1="158" x2="328" y2="158" stroke="var(--vi-line)" strokeWidth="0.75" />
            <g className="ds4">
                <circle cx="22" cy="172" r="4" fill="#16a34a" opacity="0.8" className="ds-pulse" />
                <text x="32" y="176" fontSize="7.5" fill="var(--vi-ink3)" fontFamily="inherit" letterSpacing="0.04em">Real-time alerting · automated incident response · 24/7 monitoring</text>
            </g>
        </svg>
    )
}

const FEATURES: Feature[] = [
    {
        id: "web-engineering",
        href: "/services/web-engineering",
        label: "Web Engineering",
        eyebrow: "Web Engineering",
        bigStat: "90+",
        title: "Scalable SaaS platforms and complex web apps.",
        description: "We architect SEO-optimized, globally distributed web systems on Next.js 15 and React Server Components. From marketing sites to multi-tenant dashboards, we obsess over Core Web Vitals, maintainability, and clean architecture.",
        bullets: [
            { icon: Globe, text: "Next.js 15 architecture with React Server Components" },
            { icon: Search, text: "SEO-optimized and tuned for Core Web Vitals" },
            { icon: BookOpen, text: "Headless CMS integration for content teams" },
            { icon: BarChart3, text: "Continuous performance auditing on every release" },
        ],
        accentMetric: "Core Web Vitals",
        accentLabel: "tuned green on every page",
        illustration: <WebEngineeringIllustration />,
    },
    {
        id: "mobile-ecology",
        href: "/services/mobile-ecology",
        label: "Mobile Ecology",
        eyebrow: "Mobile Ecology",
        bigStat: "1",
        title: "High-performance cross-platform mobile apps.",
        description: "Reach users on iOS and Android from a single codebase without compromising native capabilities. We handle the full lifecycle - from native module bridging to App Store and Play Store submission.",
        bullets: [
            { icon: Smartphone, text: "iOS & Android builds from one React Native / Flutter codebase" },
            { icon: Clock, text: "Offline-first architecture with reliable data sync" },
            { icon: Bell, text: "Push notifications wired through FCM and APNs" },
            { icon: Zap, text: "Native module bridging for camera, biometrics, and more" },
        ],
        accentMetric: "iOS + Android",
        accentLabel: "shipped from a single source",
        illustration: <MobileEcologyIllustration />,
    },
    {
        id: "ai-integration",
        href: "/services/ai-integration",
        label: "AI Integration",
        eyebrow: "AI Integration",
        bigStat: "Custom",
        title: "Custom LLM agents and intelligent automation.",
        description: "We build retrieval-augmented generation pipelines, agentic workflows, and chatbot interfaces on OpenAI, Anthropic, or open-source models - grounded in your data, with citations you can trust.",
        bullets: [
            { icon: Cpu, text: "RAG pipelines backed by a vector store over your data" },
            { icon: MessageSquare, text: "Production chatbot UI with streaming responses" },
            { icon: FileSearch, text: "Prompt engineering and evaluation harnesses" },
            { icon: Shield, text: "OpenAI / Anthropic integration in your own infra" },
        ],
        accentMetric: "Grounded",
        accentLabel: "answers with inline source citations",
        extraBadge: "AI-powered",
        illustration: <AIIntegrationIllustration />,
    },
    {
        id: "cloud-architecture",
        href: "/services/cloud-architecture",
        label: "Cloud Architecture",
        eyebrow: "Cloud Architecture",
        bigStat: "0",
        title: "Cloud infrastructure that scales with zero downtime.",
        description: "We design serverless functions, container orchestration, and database strategies that handle high-traffic loads. Everything is codified with Terraform and shipped through automated CI/CD pipelines.",
        bullets: [
            { icon: GitBranch, text: "Automated CI/CD pipelines from commit to production" },
            { icon: Cloud, text: "Infrastructure as Code with Terraform" },
            { icon: BarChart3, text: "Auto-scaling rules tuned to real traffic" },
            { icon: Zap, text: "Zero-downtime rolling deployments" },
        ],
        accentMetric: "Terraform",
        accentLabel: "every resource codified and reproducible",
        illustration: <CloudArchitectureIllustration />,
    },
    {
        id: "uiux-systems",
        href: "/services/ui-ux-systems",
        label: "UI/UX Systems",
        eyebrow: "UI/UX Systems",
        bigStat: "Pixel",
        title: "Design systems engineered down to the pixel.",
        description: "We don't just design screens; we build comprehensive, documented design systems. The focus is usability, accessibility, and a delightful journey that turns visitors into customers.",
        bullets: [
            { icon: Layout, text: "Figma design files and reusable atomic components" },
            { icon: BookOpen, text: "Living design-system documentation for your team" },
            { icon: Shield, text: "Accessibility audited to WCAG standards" },
            { icon: ArrowRight, text: "Interactive high-fidelity prototypes before a line of code" },
        ],
        accentMetric: "WCAG AAA",
        accentLabel: "accessible contrast across the system",
        illustration: <UIUXSystemsIllustration />,
    },
    {
        id: "devops-security",
        href: "/services/system-security",
        label: "DevOps & Security",
        eyebrow: "DevOps & Security",
        bigStat: "24/7",
        title: "Automated pipelines and enterprise-grade security.",
        description: "Security is not an afterthought. We ship automated deployment pipelines, infrastructure as code, and real-time monitoring - backed by penetration testing, OAuth, and encryption at rest and in transit.",
        bullets: [
            { icon: Shield, text: "Penetration testing and vulnerability scanning" },
            { icon: Users, text: "OAuth 2.0 authentication and role-based access" },
            { icon: BookOpen, text: "AES-256 encryption at rest, TLS 1.3 in transit" },
            { icon: BarChart3, text: "Real-time monitoring and incident response" },
        ],
        accentMetric: "Real-time",
        accentLabel: "monitoring and alerting baked in",
        illustration: <DevOpsSecurityIllustration />,
    },
]

/**
 * ## The stack
 *
 * The section header stays pinned for the whole stack, so the reader never loses the frame the
 * cards belong to. Two numbers make that work, and they have to agree with each other:
 *
 *  - `NAV_BOTTOM` is where the floating navbar's bottom edge lands (`top-2` + the pill's height).
 *    The pinned bar sits below it with clear air, so it reads as its own object rather than as part
 *    of the navbar's shadow.
 *  - `STACK_TOP` is that plus the bar's own height, and it is where the CARDS pin. Deriving it
 *    rather than writing a third number is the point: if the bar's height changes, the cards follow
 *    it instead of sliding underneath it.
 */
const NAV_BOTTOM = 112
const BAR_H = 56
const STACK_TOP = NAV_BOTTOM + BAR_H

/** How far each earlier card lifts above the active one, so its header strip stays visible. */
const STACK_STEP = 18
/** The gap we actually want between the pinned bar and the top of the stack. */
const STACK_GAP = 24

/**
 * Every card pins in its own viewport. As the next card scrolls up it settles on top while the
 * previous one shrinks and lifts slightly behind it, so its title strip stays visible. The active
 * card is always full-size, so the last one is never pushed below anything.
 */
function StackCard({
    feature, i, n, progress, play,
}: {
    feature: Feature
    i: number
    n: number
    progress: MotionValue<number>
    play: boolean
}) {
    const targetScale = 1 - (n - 1 - i) * 0.045
    const scale = useTransform(progress, [i / n, 1], [1, targetScale])
    // Earlier cards lift above centre so their header strips peek; the newest sits at rest.
    const offset = -(n - 1 - i) * STACK_STEP

    // `items-start`, not `items-center`. Centring splits the box's leftover height evenly, which
    // puts a different gap between the pinned bar and every card depending on how tall that card
    // happens to be. Anchoring to the top makes that distance a number we choose (STACK_GAP), so
    // every card starts at exactly the same place under the header.
    return (
        <div
            className="sticky flex items-start justify-center px-5 pb-10 sm:px-7"
            style={{
                top: STACK_TOP,
                minHeight: `calc(100svh - ${STACK_TOP}px)`,
                // DERIVED, not a guess. The first card lifts `(n-1) * STACK_STEP` above its flow
                // position to expose the peeking strips, so a hand-picked padding smaller than that
                // lift would send the top of the stack straight through the pinned bar and under
                // the navbar. Adding the lift back means the gap below the bar is exactly
                // STACK_GAP, and it stays exactly that if a seventh feature is added.
                paddingTop: (n - 1) * STACK_STEP + STACK_GAP,
                ["--anim-play" as string]: play ? "running" : "paused",
            }}
        >
            <motion.div
                style={{ scale, top: offset }}
                className="relative w-full max-w-7xl overflow-hidden rounded-[28px] border border-[var(--vi-line)] bg-[var(--vi-bg)] shadow-[0_40px_90px_-46px_rgba(0,0,0,0.4)]"
            >
                {/* Header strip - stays visible as the next card stacks on top of this one. */}
                <div className="flex items-center gap-3 border-b border-[var(--vi-line)] bg-[var(--vi-surface)] px-5 py-4 sm:px-8">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[var(--vi-ink)] text-[12.5px] font-semibold tabular-nums text-[var(--vi-bg)]">
                        {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate text-[15px] font-semibold tracking-[-0.01em] text-[var(--vi-ink)] sm:text-[16px]">
                        {feature.label}
                    </span>
                    <span className="hidden shrink-0 rounded-full border border-[var(--vi-line)] bg-[var(--vi-bg2)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--vi-ink3)] sm:inline">
                        {feature.bigStat}
                    </span>
                    {feature.extraBadge && (
                        <span className="hidden shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--vi-ink4)] lg:inline">
                            {feature.extraBadge}
                        </span>
                    )}
                    <Link
                        href={feature.href}
                        className="group ml-auto inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-[var(--vi-ink)]"
                    >
                        Explore
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>

                {/* Body */}
                <div className="grid grid-cols-1 items-center gap-7 p-6 sm:gap-9 sm:p-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:p-10">
                    <div className="min-w-0">
                        <h3 className="text-[clamp(22px,3vw,36px)] font-bold leading-[1.07] tracking-[-0.025em] text-[var(--vi-ink)] text-balance">
                            {feature.title}
                        </h3>
                        <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-[var(--vi-ink2)]">
                            {feature.description}
                        </p>
                        <ul className="mt-6 hidden gap-x-6 gap-y-2.5 sm:grid sm:grid-cols-2">
                            {feature.bullets.map((b, bi) => (
                                <li key={bi} className="flex items-start gap-2.5">
                                    <b.icon size={15} strokeWidth={2} className="mt-[2px] shrink-0 text-[var(--vi-ink3)]" />
                                    <span className="text-[13.5px] leading-snug text-[var(--vi-ink2)]">{b.text}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 flex items-center gap-3">
                            <span className="h-7 w-px shrink-0 bg-[var(--vi-gold)]" />
                            <span className="shrink-0 text-[16px] font-bold tracking-tight text-[var(--vi-ink)]">
                                {feature.accentMetric}
                            </span>
                            <span className="text-[12.5px] leading-snug text-[var(--vi-ink3)]">{feature.accentLabel}</span>
                        </div>
                    </div>

                    <div className="min-w-0">
                        <div className="flex items-center justify-center rounded-2xl border border-[var(--vi-line)] bg-[var(--vi-surface)] p-4 shadow-[0_24px_50px_-34px_rgba(0,0,0,0.28)] sm:p-6">
                            {feature.illustration}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export function FeatureStack() {
    const container = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] })
    const n = FEATURES.length

    // Which card is on top right now. Read from scroll rather than from an observer on each card,
    // because the cards are all pinned at the same offset - they never leave the viewport, so there
    // is no intersection to observe.
    const [active, setActive] = useState(0)
    // Latched high-water mark: the card illustrations animate with fill-mode `both`, so once a card
    // has been reached its animation should stay running rather than re-pausing on the way back up.
    const [seen, setSeen] = useState(0)

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        const idx = Math.min(n - 1, Math.max(0, Math.floor(v * n)))
        setActive(idx)
        setSeen((s) => (idx > s ? idx : s))
    })

    return (
        <section className="vi-fs relative">
            <style>{`
                .vi-fs {
                    --vi-bg: #ffffff; --vi-surface: #fafafa; --vi-bg2: #f3f4f6;
                    --vi-ink: #171717; --vi-ink2: #404040; --vi-ink3: #737373;
                    --vi-ink4: #a3a3a3; --vi-ink5: #d4d4d4; --vi-line: #e5e5e5;
                    --vi-gold: #9a8a6a; --anim-play: paused;
                }
                .dark .vi-fs {
                    --vi-bg: #0a0a0a; --vi-surface: #111111; --vi-bg2: #1a1a1a;
                    --vi-ink: #fafafa; --vi-ink2: #e5e5e5; --vi-ink3: #a3a3a3;
                    --vi-ink4: #525252; --vi-ink5: #262626; --vi-line: #262626;
                    --vi-gold: #c9a961;
                }
            `}</style>

            <div className="mx-auto max-w-6xl px-6 pt-24 sm:pt-28">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="mb-4 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                        Full-spectrum engineering
                    </p>
                    <h2 className="text-[clamp(30px,4.6vw,52px)] font-bold leading-[1.04] tracking-[-0.03em] text-neutral-900 text-balance dark:text-white">
                        One team for every layer of the product.
                    </h2>
                </div>
            </div>

            <div ref={container} className="relative mt-10">
                {/*
                  The pinned header. It carries the section's title in condensed form plus a step
                  readout, and it is INSIDE the scroll container so it unpins the moment the stack
                  ends - a bar pinned to the whole page would follow the reader into the next
                  section.

                  It needs a near-opaque ground: cards pass directly underneath it, and a
                  transparent bar would let card content show through the title.
                */}
                <div
                    className="sticky z-30 border-y border-[var(--vi-line)] bg-white/85 backdrop-blur-md dark:bg-neutral-950/85"
                    style={{ top: NAV_BOTTOM, height: BAR_H }}
                >
                    <div className="mx-auto flex h-full max-w-7xl items-center gap-4 px-5 sm:px-7">
                        <span className="hidden shrink-0 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--vi-ink4)] sm:inline-flex">
                            <span className="h-1 w-1 rounded-full bg-[var(--vi-ink)]" />
                            Full-spectrum engineering
                        </span>
                        <span className="truncate text-[14px] font-semibold tracking-[-0.01em] text-[var(--vi-ink)] sm:text-[15px]">
                            One team for every layer of the product.
                        </span>

                        {/* Step readout + progress ticks, so a six-card stack tells you where you
                            are in it instead of feeling unbounded. */}
                        <span className="ml-auto flex shrink-0 items-center gap-3">
                            <span className="hidden items-center gap-1.5 sm:flex">
                                {FEATURES.map((f, i) => (
                                    <span
                                        key={f.id}
                                        className="h-1 rounded-full transition-all duration-300"
                                        style={{
                                            width: i === active ? 20 : 8,
                                            background: i <= active ? "var(--vi-ink)" : "var(--vi-ink5)",
                                        }}
                                    />
                                ))}
                            </span>
                            <span className="text-[12px] font-semibold tabular-nums text-[var(--vi-ink3)]">
                                {String(active + 1).padStart(2, "0")}
                                <span className="text-[var(--vi-ink4)]">/{String(n).padStart(2, "0")}</span>
                            </span>
                        </span>
                    </div>
                </div>

                {FEATURES.map((f, i) => (
                    <StackCard key={f.id} feature={f} i={i} n={n} progress={scrollYProgress} play={i <= seen} />
                ))}
            </div>
        </section>
    )
}
