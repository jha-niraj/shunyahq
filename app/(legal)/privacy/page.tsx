import { Lock } from "lucide-react"
import { LegalDocument, type LegalSection } from "@/components/legal/legal-document"

const SECTIONS: LegalSection[] = [
    {
        id: "introduction",
        label: "1. Introduction",
        content: `ShunyaHQ is a web engineering studio. We design, build and ship custom web applications for our clients, and we run this website to explain that work and to let people get in touch about it. This Privacy Policy explains what information we collect through both of those activities, why we collect it, how we protect it, and the choices you have.\n\nIt covers two distinct relationships, and the difference matters. For **our own website and enquiries**, we are the **data controller** - we decide what is collected and why. For **data inside systems we build or maintain for a client**, the client is the data controller and we act as a **data processor**, handling that data only on their documented instructions and under the contract we have signed with them.\n\nThroughout this policy, "we", "us" and "ShunyaHQ" refer to Shunya Tech, the entity operating shunyahq.com, and "you" refers to any person who visits this site, contacts us, or works with us. If you do not agree with any part of this policy, please stop using the site.`,
        callout: "we collect only what we need to answer your enquiry and run this site, we never sell your data, and you can ask us to delete it at any time.",
    },
    {
        id: "information-we-collect",
        label: "2. Information we collect",
        content: `**Information you give us.** When you submit the contact form, request an estimate, or email us, we receive your name, email address, phone number if you provide one, your company, and whatever you write in the message. When you subscribe to updates, we receive your email address.\n\n**Project information.** During an engagement we receive whatever you share with us so we can do the work: requirements, designs, brand assets, existing documentation, and - where the project needs it - credentials or access tokens for your own systems.\n\n**Automatically collected data.** Standard server and analytics data such as browser and device type, IP address, approximate location derived from that address, referring page, and which pages you viewed. This is aggregate usage measurement, not individual profiling.\n\n**What we do not collect.** We do not collect card or bank details through this website. We do not run third-party advertising trackers. We do not buy contact lists or enrich your record with data bought from data brokers.`,
    },
    {
        id: "how-we-use",
        label: "3. How we use your information",
        content: `We use the information we collect only for purposes connected to running the studio:\n\n• To reply to your enquiry and prepare a scope, estimate or proposal.\n• To deliver, support and maintain the work you have engaged us for.\n• To send transactional messages such as invoices, project updates, and security notices.\n• To send occasional updates, but only if you asked for them, and every one carries an unsubscribe link.\n• To understand which pages of this site are useful so we can improve them.\n• To detect and prevent spam, fraud and abuse.\n• To meet our legal, tax and accounting obligations.\n\nWe do not use client project data or the contents of your enquiry to train machine-learning models, and we do not sell or rent your information to anyone.`,
    },
    {
        id: "client-data",
        label: "4. Client project data & confidentiality",
        content: `Anything you share with us for a project - source code, databases, designs, customer records, business plans, credentials - is treated as confidential. It is used solely to perform the work, shared only with the specific people on your team's engagement, and never disclosed to another client.\n\nWhere we are handling personal data that belongs to **your** users, you remain the controller and we act on your instructions. We will not use that data for our own purposes, will help you respond to requests from your users where we reasonably can, and will tell you without undue delay if we become aware of a breach affecting it.\n\nAccess to client systems is granted per person and per project, uses your own access-control tooling wherever possible, and is revoked when the engagement ends or when the person leaves the project. We ask for the least privilege that gets the job done, and we will push back on being given broader access than the work requires.`,
        callout: "your code, data and business information are confidential, used only for your project, and never shown to another client.",
    },
    {
        id: "sharing",
        label: "5. Who else sees your data",
        content: `We do **not** sell, rent or trade your personal information. We share it only in these limited situations:\n\n• **With service providers** - the vendors that run our infrastructure, email and analytics, each engaged under terms that require confidentiality and appropriate security. These are listed in section 10.\n• **Within your own engagement** - with the specific ShunyaHQ engineers and designers assigned to your project.\n• **For legal compliance** - when required by a valid court order, law, or government request.\n• **Business transfers** - in connection with a merger, acquisition or asset sale, in which case we will tell you before your data becomes subject to a different privacy policy.\n\nIn every case, recipients may use the data only for the specific purpose it was shared for.`,
    },
    {
        id: "storage-security",
        label: "6. Data storage & security",
        content: `We apply the same standards to our own systems that we build into our clients':\n\n• TLS for all data in transit.\n• Encryption at rest for databases and file storage.\n• Role-based access control, so each person sees only what their role needs.\n• Secrets held in a managed secret store, never in source control.\n• Two-factor authentication required on every account that touches client systems.\n• Dependency and vulnerability scanning wired into our pipelines.\n\nNo system is perfectly secure. If a breach ever occurs that is likely to affect your data, we will notify you without undue delay and tell you what happened, what we know, and what we are doing about it.`,
        callout: "encrypted in transit and at rest, least-privilege access, secrets in a managed store, and 2FA on every account that can reach client systems.",
    },
    {
        id: "retention",
        label: "7. Data retention",
        content: `We keep enquiry data for as long as it takes to answer you and for a reasonable period afterwards in case you come back to the conversation, then delete it.\n\nProject data is retained for the life of the engagement. After a project ends we keep a copy for **90 days** so you can request a handover or a re-export, after which it is deleted from our systems unless you have asked us in writing to retain it for ongoing support, or unless we are required to keep it by law.\n\nInvoices and accounting records are kept for as long as tax law requires. Anonymised, aggregated analytics that cannot identify anyone may be kept indefinitely.`,
    },
    {
        id: "your-rights",
        label: "8. Your rights & choices",
        content: `Depending on where you live, you may have the right to:\n\n• **Access** - ask for a copy of the personal data we hold about you.\n• **Correction** - ask us to fix data that is wrong or incomplete.\n• **Deletion** - ask us to delete your data, subject to legal and accounting retention requirements.\n• **Portability** - ask for an export in a portable format.\n• **Objection** - object to particular processing activities.\n• **Withdraw consent** - where processing relies on consent, withdraw it at any time without affecting what happened before.\n\nTo exercise any of these, email us using the address in the final section. We will respond within 30 days and we will not charge you, unless a request is clearly unfounded or excessive.\n\nIf your data sits inside a system we run **for a client**, send your request to that client - they are the controller, and we will support them in answering it.`,
        callout: "you can access, correct, export or delete your data by emailing us, and we respond within 30 days.",
    },
    {
        id: "international-transfers",
        label: "9. International data transfers",
        content: `We work with clients in several countries and our infrastructure providers operate globally, so your data may be processed on servers outside the country you live in.\n\nWhere data crosses a border, we rely on contractual safeguards with our providers requiring them to keep it confidential and secure to a standard consistent with this policy. If a project has a specific data-residency requirement, tell us before we start and we will architect for it rather than retrofit it.`,
    },
    {
        id: "cookies",
        label: "10. Cookies & analytics",
        content: `This site uses a small number of first-party cookies and similar technologies:\n\n• **Essential** - required for the site to function and to remember your theme preference.\n• **Analytics** - anonymised, aggregated measurement of which pages get used.\n\nWe do not use third-party advertising trackers that follow you across the web, and our analytics are configured to measure usage in aggregate rather than to build a profile of you. You can clear or block cookies in your browser settings; blocking essential cookies may break parts of the site.`,
    },
    {
        id: "third-party-providers",
        label: "11. Third-party service providers",
        content: `To run the studio we rely on a small set of sub-processors, each engaged under terms requiring appropriate security and confidentiality. These typically include:\n\n• **Cloud hosting and databases** - to run this site and the systems we build.\n• **File and object storage** - for assets, documents and generated reports.\n• **Email and notification providers** - to deliver replies, invoices and alerts.\n• **Version control and CI** - to hold source code and run automated pipelines.\n• **Analytics** - anonymised usage measurement for this website.\n\nThese providers may process data only on our instructions and only to support the service. We review them periodically and update our practices as our infrastructure changes.`,
    },
    {
        id: "changes",
        label: "12. Changes to this policy",
        content: `We may update this Privacy Policy from time to time. When we make a material change we will post the updated policy here and refresh the "Last updated" date, and where the change meaningfully affects you we will tell you by email.\n\nYour continued use of the site after an update takes effect means you accept the revised policy.`,
    },
    {
        id: "contact",
        label: "13. Contact us",
        content: `If you have a question about this policy or about how we handle your data:\n\n• **Email:** contact@shunyatech.com\n• **Address:** 10 Green State, Unit 4 PMB 1058, Woodbridge, NJ 07095, United States\n\nWe respond to data-related requests within 30 days.`,
    },
]

export default function PrivacyPolicyPage() {
    return (
        <LegalDocument
            kind="Privacy Policy"
            intro="We build systems that handle other people's data for a living, so we hold our own to the same standard. Here is exactly what we collect and why."
            effective="1 August 2026"
            lastUpdated="9 August 2026"
            badge={{ icon: <Lock className="h-3.5 w-3.5" />, text: "Privacy & Security" }}
            contactEmail="contact@shunyatech.com"
            sections={SECTIONS}
        />
    )
}
