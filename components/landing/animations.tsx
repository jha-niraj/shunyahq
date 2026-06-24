"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

export function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay, ease: [0.2, 0.6, 0.2, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function SlideUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay, ease: [0.2, 0.6, 0.2, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function StaggerContainer({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.6, 0.2, 1] } } }}
            className={className}
        >
            {children}
        </motion.div>
    )
}