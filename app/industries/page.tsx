import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { 
  ShieldCheck,
  Building2,
  ShoppingCart,
  Scale,
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  FileCheck,
  Workflow,
  Search,
  Lock
} from "lucide-react";
import TrackedLink from "@/app/_components/TrackedLink";

export const metadata: Metadata = {
  title: "Industry Verticals & Specialized Solutions",
  description: "How Botmartz applies production search, RAG, and agent architectures to Insurance, Financial Services, Enterprise Operations, and Ecommerce.",
  openGraph: {
    title: "Industry Verticals & Specialized Solutions",
    description: "Tailored enterprise AI implementation for Insurance, Financial Services, Enterprise Operations, and Ecommerce.",
    url: "https://www.botmartz.com/industries",
    type: "website",
  },
  alternates: { canonical: "https://www.botmartz.com/industries" },
};

const VERTICALS = [
  {
    id: "insurance",
    icon: ShieldCheck,
    title: "Insurance & Underwriting Intelligence",
    tagline: "Policy comparison, endorsement discrepancy detection, and clause extraction with verifiable citation grounding.",
    problem: "Underwriters, brokers, and claims adjusters spend dozens of hours every week manually cross-referencing dense policy schedules, state regulatory filings, and multi-page endorsement riders.",
    solution: "A layout-aware document intelligence and hybrid search pipeline that indexes full policy archives, detects clause variances, and returns exact page and paragraph citations for every coverage finding.",
    applications: [
      "Side-by-side policy form & endorsement comparison",
      "Coverage exclusion extraction & flood/water/cyber risk audits",
      "Claims precedent retrieval across historical claim files",
      "Regulatory filing compliance & statutory disclosure verification"
    ],
    badge: "Flagship Vertical",
    labLink: "/work/labs/insurance-intelligence",
    labText: "Explore Live Insurance Lab →"
  },
  {
    id: "financial-services",
    icon: Building2,
    title: "Financial Services & Banking",
    tagline: "Credit policy discovery, regulatory memo synthesis, and wealth management knowledge systems.",
    problem: "Financial analysts and compliance officers navigate thousands of internal credit circulars, KYC/AML directives, and audit memos scattered across disconnected internal portals.",
    solution: "Permission-aware hybrid search (OpenSearch / Qdrant) with strict zero-hallucination refusal when regulatory evidence is absent.",
    applications: [
      "Credit risk policy & circular search with verifiable citations",
      "Quarterly earnings & 10-K/10-Q multi-table financial extraction",
      "AML / KYC regulatory guideline comparison",
      "Internal research analyst brief synthesis"
    ],
    badge: "High Precision",
    labLink: "/services/enterprise-rag",
    labText: "View Knowledge Systems →"
  },
  {
    id: "enterprise-operations",
    icon: Workflow,
    title: "Enterprise Operations & Logistics",
    tagline: "Standard Operating Procedure (SOP) discovery, vendor contract intelligence, and multi-system workflows.",
    problem: "Operational teams lose hours locating technical operating procedures or manually transferring discrepancy data between ERP, CRM, and ticketing systems.",
    solution: "Constrained LangGraph agent state machines and hybrid RAG over internal manuals with mandatory human-in-the-loop checkpoints.",
    applications: [
      "Engineering & factory floor SOP retrieval with technical diagrams",
      "Vendor Master Services Agreement (MSA) clause extraction",
      "Support ticket triage and automated resolution drafts",
      "Multi-system workflow automation between ERP & ticketing"
    ],
    badge: "Operational ROI",
    labLink: "/services/ai-agents",
    labText: "View Agent Workflows →"
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "Ecommerce & Retail Intelligence",
    tagline: "Semantic catalog search, automated attribute enrichment, and product knowledge retrieval.",
    problem: "Traditional lexical search fails when customers search with vague intent, multi-attribute queries, or non-standard terminology.",
    solution: "High-throughput vector search (Weaviate / Qdrant) combined with BM25 keyword matching for semantic product discovery and catalog enrichment.",
    applications: [
      "Semantic product discovery with multi-facet filtering",
      "Automated product attribute extraction from supplier spec sheets",
      "Customer support product query deflection with verified specs",
      "Catalog discrepancy & duplicate detection"
    ],
    badge: "High Throughput",
    labLink: "/work/labs",
    labText: "View Labs →"
  }
];

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      
      {/* ── HERO (DARK THEME) ── */}
      <section className="relative pt-[130px] pb-[90px] overflow-hidden bg-[#050B14] text-white border-b border-white/10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0052FF]/15 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/30 text-[#00B8F0] font-mono text-xs uppercase tracking-widest mb-6 font-semibold">
            <Sparkles size={13} /> Domain Specialization
          </div>

          <h1 className="text-[clamp(36px,5vw,60px)] font-bold font-heading tracking-tight leading-[1.1] max-w-4xl mb-6 text-white">
            Industry Solutions Built for <br />
            <span className="bg-gradient-to-r from-[#00B8F0] via-[#0066FF] to-[#60A5FA] bg-clip-text text-transparent">
              High-Stakes Operations.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#8A9EB0] max-w-3xl leading-relaxed mb-10">
            We do not sell generic template chatbots. We engineer vertical-specific Knowledge AI Systems and agentic workflows tailored to the exact document complexity, precision, and compliance requirements of high-stakes organizations.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <TrackedLink
              href="/contact?type=architecture-review"
              eventName="button_click"
              eventData={{ button_name: "industries_hero_book_review" }}
              className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-all shadow-[0_4px_20px_rgba(0,102,255,0.4)]"
            >
              Book an Architecture Review <ArrowRight className="w-4 h-4" />
            </TrackedLink>
            <TrackedLink
              href="/work/labs/insurance-intelligence"
              eventName="button_click"
              eventData={{ button_name: "industries_hero_view_insurance_lab" }}
              className="inline-flex items-center gap-2 border border-slate-700 text-white hover:border-[#00B8F0] hover:text-[#00B8F0] px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-all hover:bg-white/5"
            >
              See Insurance Reference Lab ↗
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ── VERTICALS LIST (LIGHT THEME) ── */}
      <section className="py-24 bg-[#F8FAFC] relative border-b border-slate-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {VERTICALS.map((v) => (
            <div
              key={v.id}
              id={v.id}
              className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-md hover:border-[#0066FF]/40 transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-[#0066FF] flex items-center justify-center shrink-0">
                    <v.icon size={28} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#0066FF] uppercase tracking-wider font-bold block mb-1">
                      {v.badge}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
                      {v.title}
                    </h2>
                  </div>
                </div>

                <TrackedLink
                  href={v.labLink}
                  eventName="button_click"
                  eventData={{ button_name: `industries_${v.id}_lab_link` }}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0066FF] hover:text-[#0052CC] transition-colors self-start sm:self-center"
                >
                  <span>{v.labText}</span>
                </TrackedLink>
              </div>

              <p className="text-sm sm:text-base text-slate-600 mb-8 leading-relaxed">
                {v.tagline}
              </p>

              {/* Problem vs Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-200 mb-8">
                <div>
                  <div className="text-xs font-mono text-rose-600 uppercase tracking-wider font-bold mb-2">
                    The Industry Challenge:
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {v.problem}
                  </p>
                </div>
                <div>
                  <div className="text-xs font-mono text-[#0066FF] uppercase tracking-wider font-bold mb-2">
                    The Botmartz Architecture:
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {v.solution}
                  </p>
                </div>
              </div>

              {/* Applications */}
              <div>
                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3 font-bold">
                  Core Implementation Applications:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {v.applications.map((app, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 size={15} className="text-[#0066FF] shrink-0" />
                      <span>{app}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}

        </div>
      </section>

      {/* ── CTA (LIGHT THEME) ── */}
      <section className="py-20 bg-white text-center border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 font-heading">
            Discuss Your Industry Workflow
          </h2>
          <p className="text-base text-slate-600 mb-8 leading-relaxed">
            Let's evaluate your domain documents, compliance constraints, and operational goals during a dedicated technical architecture review.
          </p>
          <TrackedLink
            href="/contact?type=architecture-review"
            eventName="button_click"
            eventData={{ button_name: "industries_bottom_book_review" }}
            className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm px-8 py-4 rounded-xl shadow-[0_4px_20px_rgba(0,102,255,0.3)] transition-all"
          >
            Book an Architecture Review <ArrowRight size={16} />
          </TrackedLink>
        </div>
      </section>

    </div>
  );
}
