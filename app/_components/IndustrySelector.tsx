"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Scale, 
  Building2, 
  Plane, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Layers, 
  FileCheck,
  FileText,
  ShieldCheck
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
  legal: {
    slug: "legal",
    name: "Legal & Regulatory",
    badge: "CONTRACTS & STATUTES",
    headline: "Legal Document Intelligence & Statutory Clause Grounding",
    shortDescription: "Make extensive contract repositories, master filings, and regulatory playbooks searchable with sub-second cross-clause comparison and cryptographic citation grounding.",
    documents: [
      "Master Services Agreements (MSAs) & Statements of Work",
      "Statutory Regulatory Filings & Immigration Policy Updates",
      "Non-Disclosure & Intellectual Property Covenants",
      "Internal Negotiation Playbooks & Fallback Clauses",
    ],
    workflow: "Corporate counsel or immigration attorneys query statutory clauses across 5,000+ pages of filings. The hybrid BM25 + ColBERTv2 pipeline extracts exact statutory subsections (e.g. '14(b)(ii)'), cross-references internal risk matrices, and outputs court-defensible cited findings.",
    controls: [
      "Token-exact verbatim citation anchoring with SHA-256 chunk hashes",
      "Multi-tenant client matter isolation with zero telemetry leakage",
      "Version tracking across statutory amendments and historical redlines",
      "Mandatory attorney-in-the-loop sign-off before contract markups",
    ],
    evidenceStatus: "Verified Case Study",
    ctaLabel: "Explore Legal Architecture →",
  },
  realestate: {
    slug: "realestate",
    name: "Real Estate & Community Ops",
    badge: "HOA & ASSET OPERATIONS",
    headline: "Autonomous Community & Property Operations Intelligence",
    shortDescription: "Unify resident inquiries, maintenance vendor dispatch, and double-entry financial ledger operations within deterministic cyclical agent state machines.",
    documents: [
      "Bylaws, Architectural Guidelines & CC&Rs",
      "Vendor Contracts, SLAs & Work Order Histories",
      "Reserve Studies & Double-Entry Financial Ledgers",
      "Municipal Zoning & Compliance Directives",
    ],
    workflow: "A resident submits an urgent plumbing architectural modification request. An autonomous supervisor agent parses CC&R guidelines, validates architectural compliance, drafts vendor work orders, and queues board approval.",
    controls: [
      "Cyclical LangGraph state graphs with SQLite WAL persistence",
      "Deterministic board-approval gates on all financial ledger entries",
      "Role-based ACLs isolating board executives, owners, and contractors",
      "Complete cryptographic audit log of all vendor dispatches",
    ],
    evidenceStatus: "Verified Case Study",
    ctaLabel: "Explore Real Estate Architecture →",
  },
  aviation: {
    slug: "aviation",
    name: "Aerospace & Technical MRO",
    badge: "MAINTENANCE & AIRWORTHINESS",
    headline: "Aviation MRO & Technical Manual Diagnostics",
    shortDescription: "Enable licensed aircraft engineers to rapidly pinpoint maintenance procedures, service bulletins, and compliance mandates across massive airworthiness datasets.",
    documents: [
      "Aircraft Maintenance Manuals (AMM)",
      "Structural Repair Manuals (SRM)",
      "Airworthiness Directives (AD) & Service Bulletins (SB)",
      "Component Maintenance Manuals (CMM)",
    ],
    workflow: "An MRO technician investigates an engine casing crack tolerance. The system retrieves exact ATA-chapter specifications from the approved structural manual and outputs verified torque standards, part IDs, and repair limits.",
    controls: [
      "Traceable tail-number and airframe revision tracking",
      "Strict exclusion of superseded technical documentation",
      "Licensed engineer signature gate required for work-order sign-off",
      "FAA / EASA audit trail logging for all procedure lookups",
    ],
    evidenceStatus: "Active Laboratory Prototype",
    ctaLabel: "Explore Aerospace Architecture →",
  },
};

export default function IndustrySelector() {
  const [selectedKey, setSelectedKey] = useState<string>("legal");
  const industry = INDUSTRIES[selectedKey] || INDUSTRIES.legal;

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
