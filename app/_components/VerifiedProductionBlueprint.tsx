"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, Scale, Plane, Database, ArrowRight, ShieldCheck, 
  Terminal, Sparkles, Activity, Cpu, Layers, ExternalLink, Clock
} from "lucide-react";

interface SystemPod {
  id: string;
  badge: string;
  title: string;
  summary: string;
  benchmark: string;
  p99: string;
  tags: string[];
  icon: any;
  accent: string;
  borderHover: string;
  bgGlow: string;
}

const SYSTEM_PODS: SystemPod[] = [
  {
    id: "legal",
    badge: "PRODUCTION RAG",
    title: "Legal Statutory Intelligence",
    summary: "Parsed 140,000+ pages of high court precedents and statutory codes with zero token loss and verified clause-level citations.",
    benchmark: "99.8% Citation Precision",
    p99: "78ms P99",
    tags: ["Milvus HNSW", "BM25 Lexical", "Verified Provenance"],
    icon: Scale,
    accent: "#0284C7",
    borderHover: "hover:border-[#0284C7]/60",
    bgGlow: "from-[#0284C7]/10"
  },
  {
    id: "aerospace",
    badge: "MISSION CRITICAL",
    title: "Aerospace MRO Diagnostics",
    summary: "Instant turbine fault isolation across complex wiring schematics, FAA Part-145 maintenance manuals, and service bulletins.",
    benchmark: "4.2h → 14min MTTR",
    p99: "Sub-120ms",
    tags: ["ColBERT v2", "Table Parser", "Air-Gapped"],
    icon: Plane,
    accent: "#0D9488",
    borderHover: "hover:border-[#0D9488]/60",
    bgGlow: "from-[#0D9488]/10"
  },
  {
    id: "erp",
    badge: "DETERMINISTIC AGENTS",
    title: "SAP / NetSuite Agent DAG",
    summary: "Triages purchase orders, checks ledger balances, and gates all state mutations through explicit human 1-click approvals.",
    benchmark: "Zero Runaway Loops",
    p99: "100% HITL Gated",
    tags: ["LangGraph DAG", "Postgres WAL", "RBAC Audit"],
    icon: Database,
    accent: "#F59E0B",
    borderHover: "hover:border-[#F59E0B]/60",
    bgGlow: "from-[#F59E0B]/10"
  }
];

const LIFECYCLE_STAGES = [
  { n: "01", title: "Discovery", desc: "Corpus & SLA Audit", duration: "Days 1–5" },
  { n: "02", title: "Prototype", desc: "Working Hybrid POC", duration: "Weeks 2–3" },
  { n: "03", title: "Harden", desc: "RAGAS Eval Harness", duration: "Weeks 4–6" },
  { n: "04", title: "Secure", desc: "VPC & RBAC Bounds", duration: "Weeks 7–8" },
  { n: "05", title: "Rollout", desc: "Canary Traffic Release", duration: "Weeks 9–10" },
  { n: "06", title: "Monitored", desc: "SLA Drift Guarantee", duration: "Ongoing" },
];

export default function VerifiedProductionBlueprint() {
  const [activePod, setActivePod] = useState<string>("legal");

  return (
    <div className="w-full bg-white rounded-3xl p-6 sm:p-10 shadow-[0_12px_45px_rgba(0,0,0,0.05)] border border-slate-200">
      
      {/* ── TOP HEADER BAR ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-[#0284C7] uppercase mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
            <span>DELIVERY INFRASTRUCTURE &amp; REFERENCE CASES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Verified Enterprise Production Blueprint
          </h2>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-xs font-semibold shadow-2xs">
          <CheckCircle2 size={15} className="text-emerald-600" />
          <span>300+ Deployments Shipped</span>
        </div>
      </div>

      {/* ── 3D PHOTOREALISTIC SYSTEM COMMAND CONSOLE GRAPHIC ── */}
      <motion.div 
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.4 }}
        className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-950 group mb-8 cursor-pointer"
      >
        <Image
          src="/images/architecture/work-delivery-matrix-3d.png"
          alt="Botmartz 3D Enterprise Production Delivery Matrix &amp; Systems Architecture"
          fill
          priority
          className="object-cover object-center group-hover:scale-[1.025] transition-transform duration-700 ease-out"
        />
        
        {/* Holographic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

        {/* Floating Interactive Badge Overlays */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-slate-700 text-[11px] font-mono font-semibold text-white shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>3D SYSTEMS COMMAND MATRIX</span>
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-medium text-slate-200 drop-shadow">
              Active Production Blueprint: Multi-Jurisdictional Architecture
            </span>
          </div>
          <span className="hidden sm:inline-block text-[10px] text-slate-400 bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded border border-slate-800 font-mono">
            Octane Ray-Traced Schematic · 100% Client Owned
          </span>
        </div>
      </motion.div>

      {/* ── 3 PROVEN SYSTEM PODS (INTERACTIVE TILES) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {SYSTEM_PODS.map((pod) => {
          const Icon = pod.icon;
          const isSelected = activePod === pod.id;
          return (
            <motion.div
              key={pod.id}
              onClick={() => setActivePod(pod.id)}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected 
                  ? "bg-slate-50/80 border-[#0284C7] shadow-md ring-1 ring-[#0284C7]/20" 
                  : "bg-white border-slate-200 hover:border-slate-300 shadow-2xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      {pod.badge}
                    </span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 font-sans">
                  {pod.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {pod.summary}
                </p>

                {/* Benchmark Strip */}
                <div className="p-3 rounded-xl bg-white border border-slate-200/80 mb-4 shadow-2xs">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Verified Metric</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5 flex items-center justify-between">
                    <span>{pod.benchmark}</span>
                    <span className="font-mono text-[11px] text-[#0284C7]">{pod.p99}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 font-mono text-[10px]">
                {pod.tags.map((tag, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── 6-STAGE PRODUCTION ENGINEERING LIFECYCLE ── */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-7 mb-8">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700">
            The 6-Stage Production Engineering Lifecycle (Weeks 1–12)
          </div>
          <span className="text-[11px] font-mono text-slate-400">Guaranteed Milestones</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
          {LIFECYCLE_STAGES.map((st, i) => (
            <div key={i} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-bold text-[#0284C7] mb-1">{st.n} / STAGE</div>
                <div className="font-bold text-slate-900 font-sans text-xs">{st.title}</div>
                <div className="text-[11px] text-slate-500 font-sans mt-1 leading-snug">{st.desc}</div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                {st.duration}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTER KPI SUMMARY STRIP ── */}
      <div className="bg-[#0F172A] text-white rounded-2xl p-6 grid grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-center sm:text-left">
        <div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 font-semibold">Global Deployments</div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#38BDF8]">300+ Shipped</div>
        </div>
        <div className="lg:border-l lg:border-slate-800 lg:pl-6">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 font-semibold">Jurisdictions Served</div>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">25+ Global</div>
        </div>
        <div className="lg:border-l lg:border-slate-800 lg:pl-6">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 font-semibold">Average Runway</div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#38BDF8]">8–12 Weeks</div>
        </div>
        <div className="lg:border-l lg:border-slate-800 lg:pl-6">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 font-semibold">Codebase Ownership</div>
          <div className="text-xl sm:text-2xl font-extrabold text-white">100% Client Owned</div>
        </div>
      </div>

    </div>
  );
}

