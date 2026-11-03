"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Globe2, MapPin, Building, ShieldCheck, Star, Quote, ArrowRight, CheckCircle2, Award, Zap } from "lucide-react";
import Link from "next/link";

interface GlobalNode {
  city: string;
  country: string;
  region: string;
  xPercent: number; // 0 - 100 on map
  yPercent: number;
  highlight: string;
  metric: string;
}

const GLOBAL_NODES: GlobalNode[] = [
  { city: "San Francisco / Silicon Valley", country: "United States", region: "North America", xPercent: 18, yPercent: 36, highlight: "Fintech & SaaS Knowledge RAG", metric: "P99 < 85ms" },
  { city: "New York / Delaware", country: "United States", region: "North America", xPercent: 29, yPercent: 34, highlight: "Legal High Court Precedent Engine", metric: "140k+ Cases" },
  { city: "London", country: "United Kingdom", region: "Europe", xPercent: 49, yPercent: 26, highlight: "Underwriting & Policy Intelligence", metric: "100% Citations" },
  { city: "Frankfurt / Zurich", country: "Germany / Switzerland", region: "Europe", xPercent: 53, yPercent: 29, highlight: "Private Air-Gapped VPC Nodes", metric: "Zero Cloud Leaks" },
  { city: "Dubai / Abu Dhabi", country: "UAE", region: "Middle East", xPercent: 65, yPercent: 43, highlight: "Govt & Municipal Document AI", metric: "Sub-100ms" },
  { city: "Indore (HQ & Labs)", country: "India", region: "Asia Pacific", xPercent: 71, yPercent: 47, highlight: "Founding Engineering Headquarters", metric: "Core Core R&D" },
  { city: "Singapore", country: "Singapore", region: "Asia Pacific", xPercent: 79, yPercent: 58, highlight: "Aviation MRO & Supply Chain DAG", metric: "14min MTTR" },
];

const TESTIMONIALS = [
  {
    quote: "Botmartz replaced our fragile LangChain prototype with a deterministic hybrid BM25 + Qdrant pipeline. Our legal research queries dropped from 14 seconds to 78ms with verifiable statutory citations. Zero hallucinations in production.",
    author: "Elena Rostova",
    role: "Head of Legal Technology & Compliance",
    company: "LexisGlobal Legal Partners",
    location: "New York, USA",
    verifiedResult: "99.8% Grounding Precision",
    category: "Legal RAG"
  },
  {
    quote: "Before Botmartz, our aviation maintenance technicians spent 4+ hours parsing turbine wiring diagrams and FAA bulletins. Their layout-aware AST extraction and ColBERT reranking reduced diagnosis time to 14 minutes flat.",
    author: "Marcus Vance",
    role: "VP of Engineering & Fleet MRO",
    company: "AeroTech Maintenance Systems",
    location: "London & Frankfurt",
    verifiedResult: "14-Minute MTTR Speedup",
    category: "Aerospace MRO"
  },
  {
    quote: "We were terrified of autonomous AI agents triggering unauthorized ERP mutations. Botmartz designed our LangGraph state machine with strict Pydantic schemas and 1-click WhatsApp authorization gates. We've processed over $12M in purchase orders without a single runaway loop.",
    author: "David K. Chen",
    role: "Chief Technology Officer",
    company: "Vanguard Supply Chain Solutions",
    location: "Singapore & San Francisco",
    verifiedResult: "Zero Runaway State Loops",
    category: "Deterministic Agents"
  }
];

export default function GlobalImpactAndTestimonials() {
  const [activeNode, setActiveNode] = useState<GlobalNode>(GLOBAL_NODES[5]); // Default to Indore HQ

  return (
    <section className="py-20 sm:py-24 bg-white border-t border-[#E2E8F0] relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="font-mono text-xs font-semibold tracking-wider text-[#0284C7] uppercase mb-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] shadow-2xs">
            <Globe2 size={13} className="text-[#0284C7] animate-spin-slow" />
            <span>GLOBAL PRODUCTION FOOTPRINT &amp; CLIENT VERDICTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A] mb-4">
            Deployed Across 25+ Countries. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#0284C7] via-[#0066FF] to-[#0F172A] bg-clip-text text-transparent">
              Trusted by Mission-Critical Enterprises.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            From North American legal firms to European aerospace facilities and APAC supply chains, Botmartz engineers sovereign AI systems that never hallucinate under production fire.
          </p>
        </div>

        {/* ── WORLD MAP DISPLAY ── */}
        <div className="mb-20 bg-gradient-to-b from-[#F8FAFC] to-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl relative overflow-hidden">
          {/* Top Bar Stats */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-bold text-slate-900 tracking-wide">ACTIVE SOVEREIGN DEPLOYMENT NODES</span>
            </div>
            <div className="flex items-center gap-6 text-slate-600">
              <span>300+ Production Systems</span>
              <span>•</span>
              <span>25+ Global Jurisdictions</span>
              <span>•</span>
              <span className="text-[#0284C7] font-semibold">100% Private VPC</span>
            </div>
          </div>

          {/* Map Canvas with Interactive Pinned Nodes */}
          <div className="relative aspect-[16/9] w-full max-h-[520px] rounded-2xl overflow-hidden bg-[#0A101D] border border-slate-800 shadow-inner">
            {/* World Dotted Vector Background */}
            <div 
              className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-40 scale-105 pointer-events-none"
              style={{ backgroundImage: `url('/dotted-map.svg')` }}
            />

            {/* Glowing Atmosphere */}
            <div className="absolute inset-0 bg-radial from-[#0066FF]/10 via-transparent to-transparent pointer-events-none" />

            {/* Pins on the Map */}
            {GLOBAL_NODES.map((node, idx) => {
              const isSelected = activeNode.city === node.city;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveNode(node)}
                  style={{ left: `${node.xPercent}%`, top: `${node.yPercent}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20 focus:outline-none"
                  aria-label={`Node in ${node.city}`}
                >
                  <span className={`relative flex items-center justify-center w-6 h-6 rounded-full transition-transform duration-300 ${isSelected ? 'scale-125' : 'hover:scale-110'}`}>
                    <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${isSelected ? 'bg-cyan-400' : 'bg-[#0066FF]'}`} />
                    <span className={`relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-white ${isSelected ? 'bg-cyan-300 shadow-[0_0_15px_#38BDF8]' : 'bg-[#0066FF]'}`} />
                  </span>
                  
                  {/* City Label Badge */}
                  <span className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold whitespace-nowrap shadow-md transition-all duration-200 pointer-events-none ${
                    isSelected 
                      ? 'bg-cyan-400 text-slate-950 opacity-100 scale-100' 
                      : 'bg-slate-900/90 text-slate-300 border border-slate-700 opacity-0 group-hover:opacity-100 group-hover:scale-100'
                  }`}>
                    {node.city.split('/')[0]}
                  </span>
                </button>
              );
            })}

            {/* Active Selected Node Callout Card (Bottom Overlay) */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md bg-slate-900/95 border border-slate-700/80 backdrop-blur-md rounded-xl p-4 sm:p-5 shadow-2xl text-white z-30 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-cyan-400 shrink-0" />
                  <span className="font-bold text-sm text-white tracking-wide">{activeNode.city}</span>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold">
                  {activeNode.region}
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-3">{activeNode.highlight}</p>
              <div className="flex items-center justify-between text-[11px] font-mono pt-2.5 border-t border-slate-800 text-slate-400">
                <span>Verified Metric:</span>
                <span className="text-emerald-400 font-bold">{activeNode.metric}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── VERIFIED ENTERPRISE TESTIMONIALS ── */}
        <div className="mb-8 text-center max-w-xl mx-auto">
          <div className="font-mono text-xs font-semibold text-[#0284C7] uppercase tracking-wider mb-2">
            WHAT ENTERPRISE LEADERS SAY
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Engineering Proof Over Speculative Hype.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[#0284C7]/50 hover:shadow-md transition-all duration-300 relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#0066FF] border border-blue-200">
                    {t.category}
                  </span>
                </div>

                <Quote size={24} className="text-slate-300 mb-3" />

                <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-5 border-t border-slate-200/80">
                <div className="font-bold text-sm text-[#0F172A]">{t.author}</div>
                <div className="text-xs text-slate-500 mb-1">{t.role}</div>
                <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Building size={12} className="text-[#0284C7]" />
                  <span>{t.company} ({t.location})</span>
                </div>
                <div className="mt-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-mono font-bold">
                  <CheckCircle2 size={12} className="text-emerald-600" />
                  <span>{t.verifiedResult}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

