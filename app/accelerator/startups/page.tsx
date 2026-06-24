"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, Users, ArrowRight, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PageHero } from "@/components/landing/page-hero"
import { PageBackground } from "@/components/landing/page-background"

function stageBadgeClass(stage: string) {
    switch (stage) {
        case "Scaling Up":
            return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
        case "MVP":
            return "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300"
        case "Prototype Ready":
            return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
        default:
            return "bg-so-surface-2 text-so-ink-2"
    }
}

function StageBadge({ stage }: { stage: string }) {
    return (
        <span className={`inline-flex items-center text-[11.5px] font-medium px-2.5 py-1 rounded-full ${stageBadgeClass(stage)}`}>
            {stage}
        </span>
    )
}

function IndustryBadge({ industry }: { industry: string }) {
    return (
        <span className="inline-flex items-center text-[11.5px] font-medium px-2.5 py-1 rounded-full border border-so-line text-so-ink-2">
            {industry}
        </span>
    )
}

const STARTUP_SUBMISSIONS = [
    {
        id: "ecotrack",
        name: "EcoTrack",
        summary: "IoT-based solution for tracking and reducing carbon footprint in manufacturing",
        industry: "CleanTech",
        stage: "Prototype Ready",
        advisorsInterested: 7,
        description:
            "EcoTrack uses IoT sensors to monitor energy usage, emissions, and waste in real-time. Our AI-powered dashboard provides actionable insights to reduce environmental impact while saving costs. We've built a working prototype and tested it with 3 manufacturing companies with promising results.",
        logo: "/placeholder.svg?height=80&width=80",
        founder: "Rahul Sharma",
        foundedYear: 2022,
        location: "Bangalore, India",
        teamSize: 5,
        website: "#",
        funding: "Bootstrapped (₹50 Lakhs)",
        problem:
            "Manufacturing industries contribute significantly to carbon emissions and environmental degradation, yet many lack real-time visibility into their environmental impact.",
        solution:
            "Our IoT sensor network and AI analytics platform provide real-time monitoring and actionable insights to reduce environmental impact while optimizing operational efficiency.",
        traction:
            "3 pilot customers, 15% average reduction in energy costs, 20% reduction in carbon emissions for clients.",
        businessModel:
            "Hardware-as-a-Service (sensors) + SaaS subscription for analytics platform. ₹2.5 lakhs setup fee + ₹50,000 monthly subscription.",
    },
    {
        id: "mediconnect",
        name: "MediConnect",
        summary: "Telemedicine platform connecting rural patients with specialist doctors",
        industry: "HealthTech",
        stage: "MVP",
        advisorsInterested: 5,
        description:
            "MediConnect bridges the healthcare gap for rural communities by providing a simple, low-bandwidth telemedicine solution. Our platform includes appointment scheduling, video consultations, prescription management, and follow-up care coordination. We've completed our MVP and are running a pilot program in 5 rural clinics.",
        logo: "/placeholder.svg?height=80&width=80",
        founder: "Dr. Ananya Patel",
        foundedYear: 2021,
        location: "Hyderabad, India",
        teamSize: 8,
        website: "#",
        funding: "Angel Round (₹1.2 Cr)",
        problem:
            "Over 700 million Indians live in rural areas with limited access to specialist healthcare. Patients often travel 100+ km for specialist consultations.",
        solution:
            "Our low-bandwidth telemedicine platform connects rural patients with urban specialists through local healthcare centers, reducing travel time and improving healthcare access.",
        traction: "5 rural clinics onboarded, 500+ consultations completed, 92% patient satisfaction rate.",
        businessModel:
            "B2B2C model - we charge healthcare centers a monthly subscription (₹15,000) plus a per-consultation fee (₹100).",
    },
    {
        id: "finlit",
        name: "FinLit",
        summary: "Gamified financial literacy app for teenagers and young adults",
        industry: "FinTech",
        stage: "Idea Stage",
        advisorsInterested: 3,
        description:
            "FinLit makes learning about personal finance fun and engaging through interactive games, challenges, and rewards. The app covers budgeting, saving, investing, and credit management with age-appropriate content. We're looking for guidance on developing our prototype and go-to-market strategy.",
        logo: "/placeholder.svg?height=80&width=80",
        founder: "Vikram Mehta",
        foundedYear: 2023,
        location: "Mumbai, India",
        teamSize: 3,
        website: "#",
        funding: "Pre-seed (₹25 Lakhs)",
        problem:
            "Financial literacy among Indian youth is alarmingly low, with only 27% of adults being financially literate. Traditional financial education is boring and ineffective.",
        solution:
            "Our gamified app makes financial education engaging through interactive challenges, real-world simulations, and reward systems tailored to different age groups.",
        traction: "Concept validation with 200 students across 3 schools, 85% expressed interest in using the app.",
        businessModel:
            "Freemium model with basic financial education free and premium features (advanced modules, personalized coaching) at ₹199/month.",
    },
    {
        id: "freshfarm",
        name: "FreshFarm",
        summary: "Farm-to-table marketplace connecting local farmers directly with consumers",
        industry: "AgriTech",
        stage: "Scaling Up",
        advisorsInterested: 9,
        description:
            "FreshFarm eliminates middlemen by enabling farmers to sell produce directly to consumers through our platform. We handle logistics, quality control, and payments, ensuring farmers get fair prices and consumers get fresh, local produce. We've launched in 3 cities and are looking to expand nationwide.",
        logo: "/placeholder.svg?height=80&width=80",
        founder: "Arjun Singh",
        foundedYear: 2020,
        location: "Pune, India",
        teamSize: 22,
        website: "#",
        funding: "Series A (₹8 Cr)",
        problem:
            "Indian farmers receive only 20-30% of the final consumer price due to multiple intermediaries. Consumers pay high prices for produce that isn't fresh.",
        solution:
            "Our platform connects farmers directly with consumers, handling logistics and quality control, ensuring farmers get 70%+ of the final price while consumers get fresher produce.",
        traction:
            "3,500+ active customers, 450+ farmer partners, ₹1.2 Cr monthly GMV, operating in Pune, Mumbai, and Nashik.",
        businessModel:
            "Marketplace model with 15% commission on transactions + premium subscription for consumers (₹499/year) with free delivery and early access.",
    },
    {
        id: "learnloop",
        name: "LearnLoop",
        summary: "Adaptive learning platform for personalized K-12 education",
        industry: "EdTech",
        stage: "MVP",
        advisorsInterested: 6,
        description:
            "LearnLoop uses AI to create personalized learning paths for students based on their strengths, weaknesses, and learning style. Our platform integrates with school curricula and provides real-time feedback to teachers and parents. We've completed our MVP and are piloting with 2 schools.",
        logo: "/placeholder.svg?height=80&width=80",
        founder: "Neha Gupta",
        foundedYear: 2022,
        location: "Delhi, India",
        teamSize: 7,
        website: "#",
        funding: "Seed (₹2.5 Cr)",
        problem:
            "One-size-fits-all education fails to address individual learning needs, leaving many students behind while not challenging others enough.",
        solution:
            "Our AI-powered platform creates personalized learning paths based on each student's abilities, learning style, and progress, adapting in real-time to optimize learning outcomes.",
        traction: "2 school pilots with 500+ students, showing 22% improvement in test scores after 3 months of use.",
        businessModel:
            "B2B SaaS model charging schools ₹300 per student per year, with additional parent portal access at ₹999/year.",
    },
    {
        id: "securechain",
        name: "SecureChain",
        summary: "Blockchain-based supply chain verification for luxury goods",
        industry: "Blockchain",
        stage: "Prototype Ready",
        advisorsInterested: 4,
        description:
            "SecureChain provides end-to-end authentication and tracking for luxury products using blockchain technology. Our solution prevents counterfeiting and ensures ethical sourcing by recording every step of the supply chain. We've built a working prototype and are in talks with several luxury brands.",
        logo: "/placeholder.svg?height=80&width=80",
        founder: "Aditya Kapoor",
        foundedYear: 2022,
        location: "Bangalore, India",
        teamSize: 6,
        website: "#",
        funding: "Seed (₹1.8 Cr)",
        problem:
            "The luxury goods market loses ₹20,000+ Cr annually to counterfeiting in India alone. Consumers lack reliable ways to verify product authenticity and ethical sourcing.",
        solution:
            "Our blockchain platform creates an immutable record of each product's journey from raw materials to retail, accessible to consumers via QR codes or NFC tags on products.",
        traction: "Completed POC with 2 luxury brands, tracking 500+ products with 98% verification accuracy.",
        businessModel: "SaaS model with setup fee (₹5 lakhs) plus per-product tracking fee (₹200-500 depending on volume).",
    },
    {
        id: "droneagri",
        name: "DroneAgri",
        summary: "Drone-based crop monitoring and precision agriculture solutions",
        industry: "AgriTech",
        stage: "Scaling Up",
        advisorsInterested: 7,
        description:
            "DroneAgri uses drones equipped with multispectral cameras to monitor crop health, detect diseases early, and enable precision agriculture. Our AI algorithms analyze imagery to provide actionable insights to farmers, helping them optimize inputs and increase yields.",
        logo: "/placeholder.svg?height=80&width=80",
        founder: "Rajiv Patel",
        foundedYear: 2021,
        location: "Chandigarh, India",
        teamSize: 12,
        website: "#",
        funding: "Series A (₹6 Cr)",
        problem:
            "Indian farmers lose 15-25% of crops to diseases and pests annually. Traditional monitoring methods are labor-intensive and often detect issues too late.",
        solution:
            "Our drone-based monitoring system with AI analysis detects crop issues 7-10 days earlier than visual inspection, allowing timely intervention and reducing crop losses.",
        traction:
            "Serving 200+ farms covering 15,000+ acres across Punjab, Haryana, and UP. Average yield increase of 18% for client farms.",
        businessModel:
            "Service-based model charging ₹1,200 per acre per season with quarterly monitoring, plus additional on-demand flights.",
    },
]

export default function DiscoverPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [industryFilter, setIndustryFilter] = useState("")
    const [stageFilter, setStageFilter] = useState("")
    const [selectedStartup, setSelectedStartup] = useState<(typeof STARTUP_SUBMISSIONS)[0] | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    // Filter startups based on search and filters
    const filteredStartups = STARTUP_SUBMISSIONS.filter((startup) => {
        const matchesSearch =
            searchTerm === "" ||
            startup?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            startup?.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
            startup?.industry.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesIndustry = industryFilter === "all" || industryFilter === "" || startup.industry === industryFilter
        const matchesStage = stageFilter === "all" || stageFilter === "" || startup.stage === stageFilter

        return matchesSearch && matchesIndustry && matchesStage
    })

    const handleStartupClick = (startup: (typeof STARTUP_SUBMISSIONS)[0]) => {
        setSelectedStartup(startup)
        setIsDialogOpen(true)
    }

    return (
        <main className="relative overflow-x-clip isolate">
            <PageBackground className="z-0" />
            <PageHero
                palette="emerald"
                eyebrow="Discover startups"
                title={
                    <>
                        Startup ideas from our{" "}
                        <span className="so-serif italic">community.</span>
                    </>
                }
                description="Explore innovative startup ideas from our community of student founders and connect with the people building them."
            />

            <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                <div className="so-container">
                    {/* Search + filters */}
                    <div className="flex flex-col md:flex-row gap-3 mb-10">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-so-ink-3" />
                            <Input
                                placeholder="Search by name, industry, or keywords..."
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-3">
                            <Select value={industryFilter} onValueChange={setIndustryFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <div className="flex items-center">
                                        <Filter className="mr-2 h-4 w-4" />
                                        <SelectValue placeholder="Industry" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Industries</SelectItem>
                                    <SelectItem value="CleanTech">CleanTech</SelectItem>
                                    <SelectItem value="HealthTech">HealthTech</SelectItem>
                                    <SelectItem value="FinTech">FinTech</SelectItem>
                                    <SelectItem value="AgriTech">AgriTech</SelectItem>
                                    <SelectItem value="EdTech">EdTech</SelectItem>
                                    <SelectItem value="Blockchain">Blockchain</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={stageFilter} onValueChange={setStageFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <div className="flex items-center">
                                        <Filter className="mr-2 h-4 w-4" />
                                        <SelectValue placeholder="Stage" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Stages</SelectItem>
                                    <SelectItem value="Idea Stage">Idea Stage</SelectItem>
                                    <SelectItem value="Prototype Ready">Prototype Ready</SelectItem>
                                    <SelectItem value="MVP">MVP</SelectItem>
                                    <SelectItem value="Scaling Up">Scaling Up</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredStartups.map((startup) => (
                            <div
                                key={startup.id}
                                className="so-card p-7 flex flex-col cursor-pointer hover:shadow-md transition-all"
                                onClick={() => handleStartupClick(startup)}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-so-surface-2 text-so-ink shrink-0">
                                        <Users size={18} />
                                    </div>
                                    <div>
                                        <h3 className="text-[18px] font-semibold text-so-ink tracking-[-0.01em]">{startup.name}</h3>
                                        <p className="text-[13px] text-so-ink-3">{startup.founder}</p>
                                    </div>
                                </div>
                                <p className="text-[14px] leading-[1.7] text-so-ink-2 mb-5 flex-1">{startup.summary}</p>
                                <div className="flex flex-wrap gap-2 mb-5">
                                    <IndustryBadge industry={startup.industry} />
                                    <StageBadge stage={startup.stage} />
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-so-line">
                                    <div className="flex items-center gap-1.5 text-[13px] text-so-ink-3">
                                        <Users size={14} />
                                        <span>{startup.advisorsInterested} Advisors Interested</span>
                                    </div>
                                    <Link
                                        href={`/startups/${startup.id}`}
                                        onClick={(e) => e.stopPropagation()}
                                        className="inline-flex items-center gap-1 text-[13px] font-medium text-so-ink-3 hover:text-so-ink transition-colors"
                                    >
                                        View details <ArrowRight size={13} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredStartups.length === 0 && (
                        <div className="so-card p-12 text-center flex flex-col items-center">
                            <p className="text-[15px] text-so-ink-2 mb-5">No startups match your search criteria.</p>
                            <button
                                className="so-btn so-btn-ghost"
                                onClick={() => {
                                    setSearchTerm("")
                                    setIndustryFilter("")
                                    setStageFilter("")
                                }}
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <section className="relative z-[1] bg-so-surface so-section border-t border-so-line">
                <div className="so-container">
                    <div className="so-card p-[clamp(32px,5vw,64px)] text-center flex flex-col items-center">
                        <span className="so-eyebrow">Have a startup idea?</span>
                        <h2 className="mt-5 mb-4 text-[clamp(28px,4vw,46px)] tracking-[-0.03em] text-so-ink max-w-[20ch]">
                            Submit your{" "}
                            <span className="so-serif italic">idea.</span>
                        </h2>
                        <p className="text-[15px] leading-[1.7] text-so-ink-2 max-w-[52ch] mb-8">
                            Tell us what you&apos;re building and the areas you need help with-we&apos;ll take it from there.
                        </p>
                        <Link href="/submit" className="so-btn so-btn-primary">
                            Submit your idea <ArrowRight size={13} />
                        </Link>
                    </div>
                </div>
            </section>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                {selectedStartup && (
                    <DialogContent className="max-w-3xl">
                        <DialogHeader>
                            <DialogTitle className="text-[24px] tracking-[-0.015em] text-so-ink">{selectedStartup.name}</DialogTitle>
                            <DialogDescription className="text-[15px] mt-2 text-so-ink-2">{selectedStartup.summary}</DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-wrap gap-2 mb-2">
                            <IndustryBadge industry={selectedStartup.industry} />
                            <StageBadge stage={selectedStartup.stage} />
                        </div>
                        <div className="space-y-4">
                            <p className="text-[14px] leading-[1.7] text-so-ink-2">{selectedStartup.description}</p>
                            <div className="grid grid-cols-2 gap-4 text-[13.5px] text-so-ink-2">
                                <div>
                                    <span className="font-medium text-so-ink">Founded:</span> {selectedStartup.foundedYear}
                                </div>
                                <div>
                                    <span className="font-medium text-so-ink">Location:</span> {selectedStartup.location}
                                </div>
                                <div>
                                    <span className="font-medium text-so-ink">Team Size:</span> {selectedStartup.teamSize}
                                </div>
                                <div>
                                    <span className="font-medium text-so-ink">Funding:</span> {selectedStartup.funding}
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-[13.5px] text-so-ink-3">
                                <Users size={14} />
                                <span>{selectedStartup.advisorsInterested} Advisors Interested</span>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Close
                            </Button>
                            <Link href={`/startups/${selectedStartup.id}`} className="so-btn so-btn-primary">
                                <ExternalLink size={14} />
                                View full details
                            </Link>
                        </div>
                    </DialogContent>
                )}
            </Dialog>
        </main>
    )
}