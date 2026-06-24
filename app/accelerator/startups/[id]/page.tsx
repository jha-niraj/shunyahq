"use client"

import { useParams, notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Users, Calendar, MapPin, Building, Briefcase, Globe, Mail, Phone } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

// Sample data for startup submissions - same as in discover page
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
        team: [
            { name: "Rahul Sharma", role: "Founder & CEO", bio: "Ex-Siemens, 8 years in industrial IoT" },
            { name: "Priya Desai", role: "CTO", bio: "Ex-Microsoft, IoT specialist" },
            { name: "Amit Kumar", role: "Head of Hardware", bio: "10+ years in sensor technology" },
        ],
        milestones: [
            { date: "Jan 2022", title: "Company Founded" },
            { date: "Apr 2022", title: "First Prototype Developed" },
            { date: "Aug 2022", title: "First Pilot Customer" },
            { date: "Dec 2022", title: "Completed 3 Successful Pilots" },
            { date: "Mar 2023", title: "Selected for ShunyaTech Accelerator" },
        ],
        contact: {
            email: "info@ecotrack.in",
            phone: "+91 9876543210",
        },
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
        team: [
            { name: "Dr. Ananya Patel", role: "Founder & CEO", bio: "Former Head of Telemedicine at Apollo Hospitals" },
            { name: "Vikram Reddy", role: "CTO", bio: "Ex-Practo, built telemedicine solutions for 5+ years" },
            { name: "Dr. Rajesh Kumar", role: "Medical Director", bio: "20+ years in rural healthcare" },
        ],
        milestones: [
            { date: "Sep 2021", title: "Company Founded" },
            { date: "Dec 2021", title: "MVP Development Completed" },
            { date: "Feb 2022", title: "First Rural Clinic Partnership" },
            { date: "Jul 2022", title: "Angel Funding Secured" },
            { date: "Nov 2022", title: "Expanded to 5 Rural Clinics" },
            { date: "Jan 2023", title: "Joined ShunyaTech Accelerator" },
        ],
        contact: {
            email: "contact@mediconnect.in",
            phone: "+91 8765432109",
        },
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
        team: [
            {
                name: "Vikram Mehta",
                role: "Founder & CEO",
                bio: "Former investment banker, passionate about financial education",
            },
            { name: "Neha Singh", role: "Product Designer", bio: "UX specialist with background in educational apps" },
            { name: "Rohan Joshi", role: "Game Developer", bio: "Created 3 educational games with 1M+ downloads" },
        ],
        milestones: [
            { date: "Feb 2023", title: "Company Founded" },
            { date: "Apr 2023", title: "Concept Validation Completed" },
            { date: "Jun 2023", title: "Pre-seed Funding Secured" },
            { date: "Jul 2023", title: "Applied to ShunyaTech Accelerator" },
        ],
        contact: {
            email: "hello@finlit.app",
            phone: "+91 7654321098",
        },
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
        team: [
            { name: "Arjun Singh", role: "Founder & CEO", bio: "Third-generation farmer, MBA from IIM-A" },
            { name: "Meera Patil", role: "COO", bio: "Ex-BigBasket, supply chain expert" },
            { name: "Sanjay Sharma", role: "CTO", bio: "Former tech lead at Grofers" },
            { name: "Deepak Verma", role: "Head of Farmer Relations", bio: "15+ years in agricultural extension" },
        ],
        milestones: [
            { date: "Mar 2020", title: "Company Founded" },
            { date: "Aug 2020", title: "Seed Funding (₹1.5 Cr)" },
            { date: "Oct 2020", title: "Launched in Pune" },
            { date: "Apr 2021", title: "Expanded to Mumbai" },
            { date: "Sep 2021", title: "Expanded to Nashik" },
            { date: "Feb 2022", title: "Series A Funding (₹8 Cr)" },
            { date: "May 2022", title: "Reached 3,000+ Customers" },
            { date: "Nov 2022", title: "Joined ShunyaTech Accelerator" },
        ],
        contact: {
            email: "support@freshfarm.in",
            phone: "+91 9876543210",
        },
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
        team: [
            {
                name: "Neha Gupta",
                role: "Founder & CEO",
                bio: "Former educator with 10+ years experience, EdTech researcher",
            },
            { name: "Arun Sharma", role: "CTO", bio: "AI specialist, previously built ML systems at BYJU'S" },
            {
                name: "Dr. Kavita Rao",
                role: "Chief Learning Officer",
                bio: "PhD in Education Psychology, curriculum design expert",
            },
        ],
        milestones: [
            { date: "Apr 2022", title: "Company Founded" },
            { date: "Jul 2022", title: "Seed Funding Secured" },
            { date: "Oct 2022", title: "MVP Completed" },
            { date: "Dec 2022", title: "First School Pilot Launched" },
            { date: "Feb 2023", title: "Second School Pilot Launched" },
            { date: "Apr 2023", title: "Selected for ShunyaTech Accelerator" },
        ],
        contact: {
            email: "info@learnloop.in",
            phone: "+91 8765432109",
        },
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
        team: [
            { name: "Aditya Kapoor", role: "Founder & CEO", bio: "Blockchain specialist, previously at Polygon" },
            { name: "Riya Sharma", role: "CTO", bio: "Smart contract developer, built 3 blockchain platforms" },
            { name: "Vivek Malhotra", role: "Head of Business Development", bio: "15+ years in luxury retail" },
        ],
        milestones: [
            { date: "Jun 2022", title: "Company Founded" },
            { date: "Sep 2022", title: "Seed Funding Secured" },
            { date: "Dec 2022", title: "Prototype Completed" },
            { date: "Feb 2023", title: "First Brand Partnership" },
            { date: "Apr 2023", title: "Second Brand Partnership" },
            { date: "May 2023", title: "Joined ShunyaTech Accelerator" },
        ],
        contact: {
            email: "contact@securechain.io",
            phone: "+91 7654321098",
        },
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
        team: [
            { name: "Rajiv Patel", role: "Founder & CEO", bio: "Agricultural engineer, drone enthusiast" },
            {
                name: "Dr. Sunita Rao",
                role: "Chief Agricultural Scientist",
                bio: "PhD in Agronomy, 15+ years in crop research",
            },
            { name: "Karan Singh", role: "CTO", bio: "Computer vision specialist, previously at DJI" },
            { name: "Manish Kumar", role: "Head of Operations", bio: "Managed drone fleets for government surveys" },
        ],
        milestones: [
            { date: "Feb 2021", title: "Company Founded" },
            { date: "May 2021", title: "Seed Funding (₹1 Cr)" },
            { date: "Aug 2021", title: "First 10 Farm Clients" },
            { date: "Dec 2021", title: "Expanded to 50+ Farms" },
            { date: "Apr 2022", title: "Series A Funding (₹6 Cr)" },
            { date: "Jul 2022", title: "Reached 100+ Farm Clients" },
            { date: "Jan 2023", title: "Expanded to 200+ Farms" },
            { date: "Mar 2023", title: "Joined ShunyaTech Accelerator" },
        ],
        contact: {
            email: "info@droneagri.in",
            phone: "+91 9876543210",
        },
    },
]

export default function StartupDetailPage() {
    const params = useParams()
    const startupId = params.id as string

    const startup = STARTUP_SUBMISSIONS.find((s) => s.id === startupId)

    if (!startup) {
        return notFound()
    }

    return (
        <main className="relative overflow-x-clip isolate bg-so-bg min-h-screen">
            <PageBackground className="z-0" />
            <div className="relative z-[1] so-container py-[clamp(80px,10vw,120px)]">
                <div className="mb-8">
                    <Link
                        href="/discover"
                        className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-so-ink-3 hover:text-so-ink transition-colors"
                    >
                        <ArrowLeft size={15} />
                        Back to Discover
                    </Link>
                </div>
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="so-card p-[clamp(24px,4vw,40px)]">
                            <div className="flex flex-col md:flex-row md:items-center gap-5 mb-8 pb-8 border-b border-so-line">
                                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-so-surface-2 text-so-ink shrink-0">
                                    <Users size={26} />
                                </div>
                                <div>
                                    <h1 className="text-[clamp(26px,4vw,38px)] font-semibold text-so-ink tracking-[-0.025em] mb-2">
                                        {startup.name}
                                    </h1>
                                    <p className="text-[16px] leading-[1.6] text-so-ink-2 mb-4">{startup.summary}</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="inline-flex items-center text-[11.5px] font-medium px-2.5 py-1 rounded-full border border-so-line text-so-ink-2">
                                            {startup.industry}
                                        </span>
                                        <span className={`inline-flex items-center text-[11.5px] font-medium px-2.5 py-1 rounded-full ${stageBadgeClass(startup.stage)}`}>
                                            {startup.stage}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Tabs defaultValue="overview">
                                <TabsList className="mb-6">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="team">Team</TabsTrigger>
                                    <TabsTrigger value="milestones">Milestones</TabsTrigger>
                                </TabsList>
                                <TabsContent value="overview" className="space-y-7">
                                    {[
                                        { label: "Description", value: startup.description },
                                        { label: "Problem", value: startup.problem },
                                        { label: "Solution", value: startup.solution },
                                        { label: "Traction", value: startup.traction },
                                        { label: "Business Model", value: startup.businessModel },
                                    ].map((block) => (
                                        <div key={block.label}>
                                            <span className="so-eyebrow">{block.label}</span>
                                            <p className="mt-2.5 text-[15px] leading-[1.7] text-so-ink-2">{block.value}</p>
                                        </div>
                                    ))}
                                </TabsContent>
                                <TabsContent value="team" className="space-y-5">
                                    <span className="so-eyebrow">Team Members</span>
                                    <div className="grid gap-3">
                                        {startup.team?.map((member, index) => (
                                            <div key={index} className="flex items-start gap-4 p-5 rounded-xl border border-so-line bg-so-surface">
                                                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-so-surface-2 text-so-ink shrink-0">
                                                    <Users size={18} />
                                                </div>
                                                <div>
                                                    <h3 className="text-[15px] font-semibold text-so-ink">{member.name}</h3>
                                                    <p className="text-[13px] text-emerald-700 dark:text-emerald-400 mb-1">{member.role}</p>
                                                    <p className="text-[13.5px] leading-[1.6] text-so-ink-2">{member.bio}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>
                                <TabsContent value="milestones" className="space-y-5">
                                    <span className="so-eyebrow">Company Milestones</span>
                                    <div className="relative border-l border-so-line pl-6 ml-2 space-y-6">
                                        {startup.milestones?.map((milestone, index) => (
                                            <div key={index} className="relative">
                                                <div className="absolute -left-[31px] mt-1 h-3 w-3 rounded-full bg-emerald-600 dark:bg-emerald-400 ring-4 ring-so-bg" />
                                                <p className="text-[12.5px] uppercase tracking-[0.06em] text-so-ink-3">{milestone.date}</p>
                                                <h3 className="text-[15px] font-medium text-so-ink">{milestone.title}</h3>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                    <div className="space-y-5">
                        <div className="so-card p-7">
                            <span className="so-eyebrow">Company Info</span>
                            <div className="mt-5 space-y-4">
                                {[
                                    { icon: Calendar, label: "Founded", value: String(startup.foundedYear) },
                                    { icon: MapPin, label: "Location", value: startup.location },
                                    { icon: Users, label: "Team Size", value: `${startup.teamSize} employees` },
                                    { icon: Building, label: "Founder", value: startup.founder },
                                    { icon: Briefcase, label: "Funding", value: startup.funding },
                                ].map((item) => {
                                    const Icon = item.icon
                                    return (
                                        <div key={item.label} className="flex items-start gap-3">
                                            <Icon size={16} className="text-so-ink-3 mt-0.5 shrink-0" />
                                            <div>
                                                <p className="text-[12px] uppercase tracking-[0.06em] text-so-ink-3">{item.label}</p>
                                                <p className="text-[14px] text-so-ink">{item.value}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                                {startup.website && (
                                    <div className="flex items-start gap-3">
                                        <Globe size={16} className="text-so-ink-3 mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-[12px] uppercase tracking-[0.06em] text-so-ink-3">Website</p>
                                            <a href={startup.website} className="text-[14px] text-emerald-700 dark:text-emerald-400 hover:underline">
                                                Visit Website
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="so-card p-7">
                            <span className="so-eyebrow">Contact Information</span>
                            <div className="mt-5 space-y-4">
                                {startup.contact?.email && (
                                    <div className="flex items-start gap-3">
                                        <Mail size={16} className="text-so-ink-3 mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-[12px] uppercase tracking-[0.06em] text-so-ink-3">Email</p>
                                            <a href={`mailto:${startup.contact.email}`} className="text-[14px] text-emerald-700 dark:text-emerald-400 hover:underline break-all">
                                                {startup.contact.email}
                                            </a>
                                        </div>
                                    </div>
                                )}
                                {startup.contact?.phone && (
                                    <div className="flex items-start gap-3">
                                        <Phone size={16} className="text-so-ink-3 mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-[12px] uppercase tracking-[0.06em] text-so-ink-3">Phone</p>
                                            <a href={`tel:${startup.contact.phone}`} className="text-[14px] text-emerald-700 dark:text-emerald-400 hover:underline">
                                                {startup.contact.phone}
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <Link href="/contactus" className="so-btn so-btn-primary w-full justify-center">
                            Connect with Founder
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

