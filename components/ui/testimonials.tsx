"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
    { text: "Vidhica cut our research time from hours to minutes. The citations are always accurate.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80", name: "Srijana Sharma", role: "CA · Kathmandu" },
    { text: "Finally, a tool that understands Nepal's tax laws. The Finance Act tracker is invaluable.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80", name: "Rajesh Adhikari", role: "Tax Consultant" },
    { text: "The Preeti decoder alone saved us weeks of manual work on legacy documents.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80", name: "Anita Poudel", role: "Legal Researcher" },
    { text: "Our firm switched from manual research to Vidhica. Productivity is at an all-time high.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80", name: "Bikash Thapa", role: "Partner · BSR" },
    { text: "The exam mode helped me pass CA Inter on my first attempt. Section-level explanations are gold.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80", name: "Priya Maharjan", role: "CA Student" },
    { text: "We needed bilingual access for our international clients. Vidhica delivers perfectly.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80", name: "Deepak Karki", role: "Managing Partner" },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);

const TestimonialCard = ({ data }: { data: typeof testimonials[0] }) => (
    <div className="p-6 rounded-[12px] border border-[var(--so-line)] bg-[var(--so-surface)] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <Quote className="w-4 h-4 text-[var(--so-ink-4)] mb-4" />
        <p className="text-[14px] text-[var(--so-ink-2)] leading-[1.65] mb-6 font-medium">
            &quot;{data.text}&quot;
        </p>
        <div className="flex items-center gap-3 pt-4 border-t border-[var(--so-line)]">
            <Image src={data.image} alt={data.name} width={32} height={32} className="h-8 w-8 rounded-full grayscale" />
            <div className="flex flex-col">
                <div className="font-[family-name:var(--font-mono)] text-[11px] font-bold text-[var(--so-ink)] uppercase tracking-[0.06em]">{data.name}</div>
                <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--so-ink-4)] uppercase tracking-[0.06em]">{data.role}</div>
            </div>
        </div>
    </div>
);

const TestimonialsColumn = ({ testimonials, duration, className }: { testimonials: typeof firstColumn, duration: number, className?: string }) => (
    <div className={className}>
        <motion.div
            animate={{ translateY: "-50%" }}
            transition={{ duration: duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
            className="flex flex-col gap-4 pb-4"
        >
            {[...new Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                    {testimonials.map((t, index) => <TestimonialCard key={index} data={t} />)}
                </React.Fragment>
            ))}
        </motion.div>
    </div>
);

const Testimonials = () => {
    return (
        <section className="bg-[var(--so-bg)] py-[clamp(80px,12vw,140px)] border-t border-[var(--so-line)]" id="testimonials">
            <div className="so-container text-center mb-12">
                <span className="so-eyebrow text-[var(--so-accent)]">Testimonials</span>
                <h2 className="mt-5">
                    Trusted by <span className="so-serif">professionals.</span>
                </h2>
            </div>

            <div className="relative flex justify-center gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[600px] overflow-hidden max-w-5xl mx-auto px-4">
                <TestimonialsColumn testimonials={firstColumn} duration={20} className="w-full md:w-1/2 lg:w-1/3" />
                <TestimonialsColumn testimonials={secondColumn} duration={25} className="hidden md:block w-full md:w-1/2 lg:w-1/3" />
                <TestimonialsColumn testimonials={firstColumn} duration={22} className="hidden lg:block w-full lg:w-1/3" />
            </div>
        </section>
    );
};

export default Testimonials;
