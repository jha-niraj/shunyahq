"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Mail, Phone, MapPin, Loader2, Send, ArrowRight, Calculator
} from "lucide-react"
import { useState } from "react"
import {
    submitContactForm, type ContactFormData
} from "@/actions/contact.action"
import { toast } from "sonner"
import { PageHero } from "@/components/landing/page-hero"
import { PageBackground } from "@/components/landing/page-background"
import { FadeIn } from "@/components/landing/animations"

const CONTACT_INFO = [
    { icon: Mail, title: "Email", value: "contact@shunyatech.com" },
    { icon: Phone, title: "Direct line", value: "+91 (123) 456-7890" },
    { icon: MapPin, title: "Office", value: "10 Green State, Unit 4 PMB 1058 Woodbridge, NJ 07095, United States" },
]

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            toast.error("Please fill in all required fields");
            return;
        }

        if (formData.message.length < 10) {
            toast.error("Message must be at least 10 characters long");
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await submitContactForm(formData);

            if (result.success) {
                toast.success(result.message);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    message: ""
                });
            } else {
                if (result.errors) {
                    result.errors.forEach((error: { message: string }) => {
                        toast.error(error.message);
                    });
                } else {
                    toast.error(result.message);
                }
            }
        } catch (error) {
            console.error("Form submission error:", error);
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="relative overflow-x-clip isolate">
            <PageBackground className="z-0" />
            <PageHero
                palette="jade"
                eyebrow="Contact"
                title={
                    <>
                        Let&apos;s build{" "}
                        <span className="so-serif italic">something.</span>
                    </>
                }
                description="Ready to engineer something remarkable? Tell us your project parameters and we'll get back to you with a clear plan for how we'd ship it."
            />

            <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                <div className="so-container">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-8 items-start">
                        {/* Form */}
                        <FadeIn>
                            <div className="so-card p-[clamp(24px,4vw,40px)]">
                                <span className="so-eyebrow">Start a conversation</span>
                                <h2 className="mt-5 mb-8 text-[clamp(22px,2.6vw,30px)] tracking-[-0.02em] text-so-ink">
                                    Tell us about your{" "}
                                    <span className="so-serif italic">project.</span>
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="block text-[12.5px] font-medium text-so-ink-2">Name</label>
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="h-12 bg-so-surface-2 border-so-line text-so-ink placeholder:text-so-ink-4 focus-visible:ring-1 focus-visible:ring-so-ink rounded-[var(--so-radius)]"
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="phone" className="block text-[12.5px] font-medium text-so-ink-2">Phone <span className="text-so-ink-4">(optional)</span></label>
                                            <Input
                                                id="phone"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="h-12 bg-so-surface-2 border-so-line text-so-ink placeholder:text-so-ink-4 focus-visible:ring-1 focus-visible:ring-so-ink rounded-[var(--so-radius)]"
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-[12.5px] font-medium text-so-ink-2">Email address</label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="h-12 bg-so-surface-2 border-so-line text-so-ink placeholder:text-so-ink-4 focus-visible:ring-1 focus-visible:ring-so-ink rounded-[var(--so-radius)]"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="block text-[12.5px] font-medium text-so-ink-2">Project parameters</label>
                                        <Textarea
                                            id="message"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="min-h-[150px] bg-so-surface-2 border-so-line text-so-ink placeholder:text-so-ink-4 focus-visible:ring-1 focus-visible:ring-so-ink rounded-[var(--so-radius)] resize-none p-4"
                                            placeholder="Describe your requirements..."
                                            required
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="so-btn so-btn-primary w-full h-12 text-[14px]"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <>Send message <Send className="w-4 h-4" /></>
                                        )}
                                    </Button>
                                </form>
                            </div>
                        </FadeIn>

                        {/* Contact info + estimator */}
                        <FadeIn delay={0.1} className="space-y-5">
                            <div className="so-card p-[clamp(20px,3vw,32px)]">
                                <span className="so-eyebrow">Reach us directly</span>
                                <div className="mt-6 space-y-2">
                                    {CONTACT_INFO.map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-4 p-4 rounded-[var(--so-radius)] hover:bg-so-surface-2 transition-colors"
                                        >
                                            <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-so-surface-2 text-so-ink">
                                                <item.icon className="w-[18px] h-[18px]" />
                                            </div>
                                            <div>
                                                <h3 className="text-[12px] font-medium uppercase tracking-[0.1em] text-so-ink-3 mb-1">{item.title}</h3>
                                                <p className="text-[14.5px] leading-[1.55] text-so-ink">{item.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="so-card p-[clamp(24px,3vw,32px)] bg-so-surface-2">
                                <div className="flex items-center justify-center w-11 h-11 mb-5 rounded-xl bg-so-surface text-so-ink border border-so-line">
                                    <Calculator size={20} />
                                </div>
                                <h3 className="text-[19px] font-semibold text-so-ink mb-2 tracking-[-0.01em]">Need a budget estimate?</h3>
                                <p className="text-[14px] leading-[1.7] text-so-ink-2 mb-6">
                                    Use our AI-powered calculator to get a rough estimate for your project.
                                </p>
                                <Button variant="outline" className="so-btn so-btn-ghost w-full">
                                    Launch calculator <ArrowRight size={13} />
                                </Button>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>
        </main>
    )
}
