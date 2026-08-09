import { Scale } from "lucide-react"
import { LegalDocument, type LegalSection } from "@/components/legal/legal-document"

const SECTIONS: LegalSection[] = [
    {
        id: "agreement",
        label: "1. Agreement to these terms",
        content: `These Terms of Service govern your use of shunyahq.com and, where no separate signed contract exists, the engineering services provided by ShunyaHQ ("we", "us"). By using this site or engaging us for work, you agree to them.\n\nWhere we have signed a separate proposal, statement of work or master services agreement with you, **that document takes precedence** over these terms for anything the two disagree on. These terms fill the gaps it does not cover.\n\nIf you are agreeing on behalf of a company, you confirm you have the authority to bind that company.`,
        callout: "these are the default terms. A signed proposal or contract always wins where the two disagree.",
    },
    {
        id: "services",
        label: "2. The services we provide",
        content: `ShunyaHQ is a web engineering studio. We design, build, deploy and maintain custom web applications - SaaS platforms, internal dashboards, marketing sites and the infrastructure they run on.\n\nEvery engagement is defined by its own written scope, which sets out the deliverables, the timeline, the assumptions we are working from, and the price. Anything not written in that scope is not part of the engagement.\n\nWe do not provide legal, financial, tax or regulatory-compliance advice. Where a project touches a regulated area, you remain responsible for confirming that what we build satisfies your obligations.`,
    },
    {
        id: "scope-changes",
        label: "3. Scope, estimates & change requests",
        content: `Estimates are based on the requirements known at the time we write them, and on the assumptions we list alongside them. They are estimates, not fixed quotations, unless the scope explicitly says the price is fixed.\n\n**Changes to scope are handled in writing.** If you ask for work outside the agreed scope, we will tell you what it costs and what it does to the timeline before we start it. We will not silently absorb scope and we will not silently bill for it either.\n\nWhere a scope depends on something you owe us - content, designs, third-party access, a decision - and that thing is late, the timeline moves by at least the length of the delay. We will flag this at the time rather than at the end.`,
        callout: "we quote against a written scope. Anything outside it gets priced and agreed in writing before we build it.",
    },
    {
        id: "client-responsibilities",
        label: "4. Your responsibilities",
        content: `For a project to run on time, we need you to:\n\n• Give us a single named decision-maker who can approve work.\n• Provide content, assets, credentials and third-party access when the schedule calls for them.\n• Review and respond to deliverables within the agreed review window.\n• Make sure you own, or are licensed to use, everything you give us.\n• Keep your own accounts and credentials secure.\n\nYou are responsible for the accuracy and legality of the content and data you supply. We are not liable for delays caused by information or approvals we were waiting on.`,
    },
    {
        id: "fees",
        label: "5. Fees, invoicing & payment",
        content: `Fees, currency and the payment schedule are set out in the scope for your engagement. Unless it says otherwise:\n\n• Projects begin on receipt of the initial payment.\n• Invoices are payable within **14 days** of the invoice date.\n• Prices exclude taxes, duties and third-party costs such as hosting, domains, licences and paid APIs, which are billed at cost or paid directly by you.\n• Late payment may pause work. We will tell you before we pause anything.\n\nPublished rate-card prices on this website are indicative starting points, not offers, and the price for your project is the one in your written scope.`,
    },
    {
        id: "ip",
        label: "6. Intellectual property & ownership",
        content: `**You own what we build for you.** On full payment, all custom source code, designs and assets created specifically for your project transfer to you outright.\n\n**We keep what we brought with us.** Pre-existing tools, libraries, internal frameworks, boilerplate and general know-how remain ours. Where any of it is embedded in your deliverables, you get a perpetual, worldwide, royalty-free licence to use it as part of that work.\n\n**Third-party components** stay under their own licences, open-source or commercial. We will tell you what those are.\n\nUntil an invoice is paid in full, ownership of the associated deliverables stays with us.\n\nUnless you ask us in writing not to, we may name you as a client and show non-confidential visuals of the work in our portfolio and case studies.`,
        callout: "on full payment you own the custom work outright. We keep our own pre-existing tools and license them to you within it.",
    },
    {
        id: "confidentiality",
        label: "7. Confidentiality",
        content: `Each side will keep the other's confidential information confidential, use it only for the engagement, and protect it with at least reasonable care.\n\nConfidential information does not include anything that is already public, that the receiving party already knew without obligation, that it develops independently, or that it is legally compelled to disclose - and in that last case, it will tell the other side first where the law allows.\n\nThis obligation survives the end of the engagement.`,
    },
    {
        id: "warranties",
        label: "8. Warranties & disclaimers",
        content: `We warrant that the work will be performed with reasonable skill and care by suitably qualified people, and that deliverables will materially conform to the agreed scope.\n\nFor **30 days** after a deliverable is accepted, we will fix defects in our work at no charge. That warranty does not cover faults caused by changes made by you or a third party, by third-party services or infrastructure outside our control, or by use of the deliverable outside its documented purpose.\n\nBeyond that, and to the fullest extent the law allows, this website and its content are provided "as is" without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the site will be uninterrupted or error-free.`,
    },
    {
        id: "liability",
        label: "9. Limitation of liability",
        content: `To the fullest extent permitted by law, neither party is liable to the other for indirect, incidental, special, consequential or punitive damages, or for lost profits, lost revenue, lost data or business interruption, even if it was told such damages were possible.\n\nOur total aggregate liability arising out of or relating to an engagement is limited to the **total fees you paid us for that engagement in the twelve months before the claim arose**.\n\nNothing in these terms excludes liability for death or personal injury caused by negligence, for fraud or fraudulent misrepresentation, or for anything else that cannot lawfully be excluded.`,
        callout: "our liability is capped at what you paid us in the preceding twelve months, and neither side is liable for indirect or consequential loss.",
    },
    {
        id: "support",
        label: "10. Support & maintenance",
        content: `Post-launch support is included for the period stated in your scope. It covers defect fixes in our work and reasonable assistance with questions about what we delivered.\n\nSupport does not include new features, redesigns, third-party outages, or changes required by a platform or dependency updating underneath you. Those are new work and are quoted as such.\n\nOngoing maintenance - monitoring, dependency updates, security patching, incident response - is available as a separate retainer with its own response targets.`,
    },
    {
        id: "termination",
        label: "11. Termination",
        content: `Either side may end an engagement with **14 days** written notice. Either side may end it immediately if the other commits a material breach and fails to fix it within 14 days of being told about it.\n\nOn termination:\n\n• You pay for all work completed and all committed third-party costs up to the termination date.\n• We hand over the deliverables covered by invoices you have paid, in a usable form.\n• Each side returns or deletes the other's confidential information on request.\n• The clauses on intellectual property, confidentiality, liability and governing law survive.`,
    },
    {
        id: "governing-law",
        label: "12. Governing law & disputes",
        content: `These terms are governed by the laws of the State of New Jersey, United States, without regard to its conflict-of-laws rules. The courts of New Jersey have exclusive jurisdiction, and both parties submit to it.\n\nBefore starting formal proceedings, both sides agree to try in good faith to resolve the dispute by discussion between the named decision-makers on each side for at least 30 days.`,
    },
    {
        id: "changes",
        label: "13. Changes to these terms",
        content: `We may update these terms from time to time. The current version always lives at this URL with its "Last updated" date.\n\nChanges apply to engagements starting after the update. They do not retroactively change the terms of a signed scope already in progress. Continuing to use this website after an update means you accept the revised terms.`,
    },
    {
        id: "contact",
        label: "14. Contact us",
        content: `Questions about these terms, or about starting an engagement:\n\n• **Email:** contact@shunyatech.com\n• **Address:** 10 Green State, Unit 4 PMB 1058, Woodbridge, NJ 07095, United States`,
    },
]

export default function TermsPage() {
    return (
        <LegalDocument
            kind="Terms of Service"
            intro="The terms we work under: what we deliver, what it costs, who owns the code at the end, and how either side can walk away."
            effective="1 August 2026"
            lastUpdated="9 August 2026"
            badge={{ icon: <Scale className="h-3.5 w-3.5" />, text: "Terms & Conditions" }}
            contactEmail="contact@shunyatech.com"
            sections={SECTIONS}
        />
    )
}
