"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Stethoscope, 
  Scale, 
  Plane, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Layers, 
  FileCheck 
} from "lucide-react";

export interface IndustryData {
  slug: string;
  name: string;
  badge: string;
  headline: string;
  shortDescription: string;
  documents: string[];
  workflow: string;
  controls: string[];
  evidenceStatus: "Illustrative Reference Architecture" | "Active Laboratory Prototype" | "Verified Case Study";
  ctaLabel: string;
}

const INDUSTRIES: Record<string, IndustryData> = {
  insurance: {
    slug: "insurance",
    name: "Insurance",
    badge: "POLICY & UNDERWRITING",
    headline: "Insurance Knowledge & Policy Retrieval Systems",
    shortDescription: "Help underwriting and claims teams locate exact policy wording, riders, and supporting documentation across multi-decade policy libraries.",
    documents: [
      "Commercial General Liability (CGL) Forms",
      "Underwriting Guidelines & Appetite Matrices",
      "Claims Incident Reports & FNOL Logs",
      "Reinsurance Treaty Endorsements",
    ],
    workflow: "A claims specialist queries complex exclusion criteria. The hybrid retrieval pipeline isolates applicable clauses across 400-page policy manuals, reranks via cross-encoder token alignment, and returns an evidence-cited answer.",
    controls: [
      "Strict paragraph-level source attribution",
      "Document revision and effective-date validation",
      "Role-based permission filtering (adjuster vs. underwriter)",
      "Mandatory human review for coverage determination",
    ],
    evidenceStatus: "Illustrative Reference Architecture",
    ctaLabel: "Explore Insurance Architecture →",
  },
  healthcare: {
    slug: "healthcare",
    name: "Healthcare",
    badge: "CLINICAL PROTOCOLS",
    headline: "Healthcare Protocol & Clinical Knowledge Systems",
    shortDescription: "Connect medical teams to institutional guidelines, administrative protocols, and clinical literature while preserving patient privacy and scope boundaries.",
    documents: [
      "Hospital Formulary & Dosage Protocols",
      "Institutional Clinical Care Pathways",
      "Accreditation & Compliance SOPs (Joint Commission)",
      "Administrative Billing & ICD-10 Codification Guides",
    ],
    workflow: "A clinician searches dosage pathways for specialized co-morbidities. The system retrieves verified internal guidance from accredited institutional records and generates a sourced summary for qualified review.",
    controls: [
      "Zero autonomous diagnostic claims — strict decision support",
      "Temporal freshness verification on clinical protocols",
      "HIPAA-compliant private cloud environment with no training retention",
      "Auditable clinician verification sign-off gates",
    ],
    evidenceStatus: "Illustrative Reference Architecture",
    ctaLabel: "Explore Healthcare Architecture →",
  },
  legal: {
    slug: "legal",
    name: "Legal",
    badge: "CONTRACTS & LITIGATION",
    headline: "Legal Document Intelligence & Clause Comparison",
    shortDescription: "Make extensive contract repositories, matter filings, and internal playbooks instantly searchable with cross-clause comparison and version history.",
    documents: [
      "Master Services Agreements (MSAs) & Statements of Work",
      "Non-Disclosure & Intellectual Property Covenants",
      "Matter Filings, Briefs & Discovery Transcripts",
      "Internal Negotiation Playbooks & Fallback Clauses",
    ],
    workflow: "Corporate counsel compares indemnification clauses across 25 vendor agreements. The system extracts specific legal obligations, cross-references internal risk playbooks, and presents a side-by-side comparison.",
    controls: [
      "Token-exact verbatim citation anchoring",
      "Multi-tenant client matter isolation and strict confidentiality",
      "Version tracking across redlines and amendments",
      "Human legal oversight checkpoint prior to contract markup",
    ],
    evidenceStatus: "Illustrative Reference Architecture",
    ctaLabel: "Explore Legal Architecture →",
  },
  aviation: {
    slug: "aviation",
    name: "Aviation MRO",
    badge: "MAINTENANCE & COMPLIANCE",
    headline: "Aviation MRO & Technical Manual Intelligence",
    shortDescription: "Enable licensed aircraft engineers to rapidly pinpoint maintenance procedures, service bulletins, and compliance mandates across massive airworthiness datasets.",
    documents: [
      "Aircraft Maintenance Manuals (AMM)",
      "Structural Repair Manuals (SRM)",
      "Airworthiness Directives (AD) & Service Bulletins (SB)",
      "Component Maintenance Manuals (CMM)",
    ],
    workflow: "An MRO technician investigates an engine casing crack tolerance. The system retrieves exact ATA-chapter specifications from the approved structural manual and outputs verified torque standards and repair limits.",
    controls: [
      "Traceable tail-number and airframe revision tracking",
      "Strict exclusion of superseded technical documentation",
      "Licensed engineer signature gate required for work-order sign-off",
      "FAA / EASA audit trail logging for all procedure lookups",
    ],
    evidenceStatus: "Illustrative Reference Architecture",
    ctaLabel: "Explore Aviation MRO Architecture →",
  },
  operations: {
    slug: "operations",
    name: "Document-Heavy Ops",
    badge: "COMPLIANCE & ENTERPRISE SOPS",
    headline: "Enterprise Document Intelligence & Operational Search",
    shortDescription: "Turn fragmented operating procedures, safety standards, and supply chain manuals into an intelligent, inspectable enterprise knowledge layer.",
    documents: [
      "Standard Operating Procedures (SOPs)",
      "Health, Safety & Environment (HSE) Directives",
      "Global Supply Chain Logistics & Tariff Schedules",
      "Vendor Audit & ESG Compliance Filings",
    ],
    workflow: "An operations lead audits factory safety compliance across overseas facilities. The pipeline parses multilingual SOPs, normalizes safety standards, and outputs a compliant procedural checklist.",
    controls: [
      "Hierarchical metadata partitioning by geography and facility",
      "Automated regression testing against golden question benchmarks",
      "Continuous hallucination scoring via RAGAS metrics",
      "Supervised action execution into ERP/ticketing software",
    ],
    evidenceStatus: "Illustrative Reference Architecture",
    ctaLabel: "Explore Operations Architecture →",
  },
};

export default function IndustrySelector() {
  const [selectedKey, setSelectedKey] = useState<string>("insurance");
  const industry = INDUSTRIES[selectedKey] || INDUSTRIES.insurance;

  return (
    <div className="w-full">
      {/* 5 Industry Selector Tabs */}
      <div 
        className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#C9DCE9] scrollbar-none"
        role="tablist"
        aria-label="Industry Solutions"
      >
        {Object.entries(INDUSTRIES).map(([key, ind]) => {
          const isActive = selectedKey === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedKey(key)}
              role="tab"
              aria-selected={isActive}
              className={`px-5 py-3 rounded-xl font-mono text-xs font-bold transition-all shrink-0 flex items-center gap-2 border ${
                isActive
                  ? "bg-[#0B1C2C] text-white border-[#0B1C2C] shadow-md"
                  : "bg-white text-[#4B6175] border-[#C9DCE9] hover:border-[#0092D7] hover:text-[#0B1C2C]"
              }`}
            >
              <span>{ind.name}</span>
              <span className={`text-[10px] ${isActive ? "text-[#00B8F0]" : "text-slate-400"}`}>
                ↗
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Detail Card */}
      <div className="bg-white border border-[#C9DCE9] rounded-3xl p-6 sm:p-10 shadow-[0_12px_40px_rgba(11,28,44,0.06)] relative overflow-hidden">
        {/* Subtle Brand Watermark Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EFF5FA] border border-[#C9DCE9] font-mono text-[11px] font-bold text-[#0678BE]">
            <span>VERTICAL SPECIFICATION:</span>
            <span className="text-[#0B1C2C]">{industry.badge}</span>
          </div>

          <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>{industry.evidenceStatus}</span>
          </div>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C2C] tracking-tight mb-4">
          {industry.headline}
        </h3>
        
        <p className="text-sm sm:text-base text-[#4B6175] leading-relaxed max-w-3xl mb-8">
          {industry.shortDescription}
        </p>

        {/* 3-Column Specifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t border-[#C9DCE9]">
          
          {/* Col 1: Example Documents */}
          <div className="p-5 rounded-2xl bg-[#F8FAFD] border border-[#C9DCE9]/80">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0B1C2C] uppercase tracking-wider mb-4">
              <FileText size={15} className="text-[#0092D7]" />
              <span>Target Corpus &amp; Schemas</span>
            </div>
            <ul className="space-y-2.5 text-xs text-[#4B6175]">
              {industry.documents.map((doc, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#0092D7] font-bold">›</span>
                  <span className="font-medium text-[#0B1C2C]">{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Illustrative Workflow */}
          <div className="p-5 rounded-2xl bg-[#F8FAFD] border border-[#C9DCE9]/80">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0B1C2C] uppercase tracking-wider mb-4">
              <Layers size={15} className="text-[#0092D7]" />
              <span>Engineered Workflow</span>
            </div>
            <p className="text-xs text-[#4B6175] leading-relaxed">
              {industry.workflow}
            </p>
          </div>

          {/* Col 3: Critical Governance Controls */}
          <div className="p-5 rounded-2xl bg-[#F8FAFD] border border-[#C9DCE9]/80">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0B1C2C] uppercase tracking-wider mb-4">
              <ShieldCheck size={15} className="text-[#0092D7]" />
              <span>Governance &amp; Controls</span>
            </div>
            <ul className="space-y-2.5 text-xs text-[#4B6175]">
              {industry.controls.map((ctrl, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>{ctrl}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* CTA Bar */}
        <div className="mt-8 pt-6 border-t border-[#C9DCE9] flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-500 font-mono">
            Requires custom document audit and permission mapping.
          </div>
          <Link
            href="/contact?type=architecture-review"
            className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-6 py-3 rounded-xl font-bold text-xs transition-all shadow-sm"
          >
            <span>{industry.ctaLabel}</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
