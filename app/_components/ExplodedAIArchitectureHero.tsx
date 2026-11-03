"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Database,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  Play,
  RotateCcw,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  Layers,
  Cpu,
  ArrowRight
} from "lucide-react";

export type LayerId = "knowledge" | "retrieval" | "intelligence";

export default function ExplodedAIArchitectureHero() {
  const [simState, setSimState] = useState<"idle" | "ingesting" | "retrieving" | "ranking" | "generating" | "verified">("idle");
  const [activeSimStep, setActiveSimStep] = useState<number>(0);

  // Trigger interactive "Run Pipeline" data flow animation
  const handleStartSimulation = () => {
    setSimState("ingesting");
    setActiveSimStep(1);

    setTimeout(() => {
      setSimState("retrieving");
      setActiveSimStep(2);
    }, 1200);

    setTimeout(() => {
      setSimState("ranking");
      setActiveSimStep(3);
    }, 2400);

    setTimeout(() => {
      setSimState("generating");
      setActiveSimStep(4);
    }, 3600);

    setTimeout(() => {
      setSimState("verified");
      setActiveSimStep(5);
    }, 4800);
  };

  const handleReset = () => {
    setSimState("idle");
    setActiveSimStep(0);
  };

  return (
    <section 
      className="relative w-full overflow-hidden bg-white border-b border-[#E2E8F0] pt-14 sm:pt-20 pb-16 sm:pb-24 text-center"
      aria-label="Botmartz AI Architecture Hero"
    >
      {/* ── SUBTLE AMBIENT GRADIENTS & ARCHITECTURAL GRID ── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[360px] bg-gradient-to-b from-[#0284C7]/10 via-[#38BDF8]/5 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0F172A06_1px,transparent_1px),linear-gradient(to_bottom,#0F172A06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* Kinetic Eyebrow Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] mb-8 shadow-2xs"
        >
          <span className="w-2 h-2 rounded-full bg-[#0284C7] shadow-[0_0_8px_#0284C7] animate-pulse" />
          <span className="font-mono text-[11px] font-bold tracking-wider text-[#0284C7] uppercase">
            ENTERPRISE AI SYSTEMS ENGINEERING
          </span>
        </motion.div>

        {/* 1. Kinetic Typography Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[40px] sm:text-[56px] lg:text-[70px] font-extrabold tracking-[-0.03em] leading-[1.06] mb-7 font-sans max-w-4xl mx-auto"
        >
          <span className="text-[#0F172A] block">Your data holds the answers.</span>
          <span className="text-[#0284C7] block mt-1">We engineer the intelligence to find them.</span>
        </motion.h1>

        {/* 2. Staggered Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-[16px] sm:text-[18px] text-[#475569] leading-[1.65] mb-10 max-w-2xl mx-auto font-normal"
        >
          Production-grade enterprise RAG pipelines, deterministic LangGraph agent state machines, and private VPC infrastructure with verified source citations.
        </motion.p>

        {/* 3. Primary CTAs with Micro-Interactions */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-[15px] font-semibold transition-all shadow-[0_10px_25px_-5px_rgba(2,132,199,0.35)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Schedule Technical Scoping</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </Link>

          <a
            href="#system"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white border border-slate-300 hover:border-[#0284C7] text-[#0F172A] hover:bg-slate-50 text-[15px] font-semibold transition-all shadow-2xs hover:-translate-y-0.5"
          >
            <span className="w-5 h-5 rounded-full bg-[#0284C7]/10 flex items-center justify-center text-[#0284C7]">
              <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
            </span>
            <span>Inspect 3D Architecture ↓</span>
          </a>
        </motion.div>

        {/* 4. Interactive Living Pipeline Simulator (Stage 1 to 5) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="w-full max-w-3xl bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 mb-12 shadow-sm text-left"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 mb-4">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-700">
              <span className={`w-2.5 h-2.5 rounded-full ${simState === 'idle' ? 'bg-slate-400' : 'bg-emerald-500 animate-ping'}`} />
              <span className="uppercase">Interactive Pipeline Flow</span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              {simState === "idle" ? (
                <button
                  onClick={handleStartSimulation}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold transition-all cursor-pointer shadow-xs"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Simulate Query Trace</span>
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition-all cursor-pointer font-semibold"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Trace</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Steps Visual Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
            
            {/* Step 1: AST Chunking */}
            <div className={`p-3 rounded-xl border transition-all ${
              activeSimStep >= 1 ? 'bg-white border-[#0284C7] shadow-xs' : 'bg-white/60 border-slate-200 opacity-60'
            }`}>
              <div className="text-[10px] text-slate-400 font-bold mb-1">01 / INGESTION</div>
              <div className="font-semibold text-slate-900 font-sans text-xs flex items-center justify-between">
                <span>AST Parser</span>
                {activeSimStep >= 1 && <span className="text-emerald-600 font-bold">✓</span>}
              </div>
              <div className="text-[10px] text-slate-500 mt-1 font-sans">Tables &amp; PDFs parsed</div>
            </div>

            {/* Step 2: Hybrid Search */}
            <div className={`p-3 rounded-xl border transition-all ${
              activeSimStep >= 2 ? 'bg-white border-[#0284C7] shadow-xs' : 'bg-white/60 border-slate-200 opacity-60'
            }`}>
              <div className="text-[10px] text-slate-400 font-bold mb-1">02 / RETRIEVAL</div>
              <div className="font-semibold text-slate-900 font-sans text-xs flex items-center justify-between">
                <span>BM25 + HNSW</span>
                {activeSimStep >= 2 && <span className="text-emerald-600 font-bold">✓</span>}
              </div>
              <div className="text-[10px] text-slate-500 mt-1 font-sans">Dual parallel search</div>
            </div>

            {/* Step 3: Reranker */}
            <div className={`p-3 rounded-xl border transition-all ${
              activeSimStep >= 3 ? 'bg-white border-[#0284C7] shadow-xs' : 'bg-white/60 border-slate-200 opacity-60'
            }`}>
              <div className="text-[10px] text-slate-400 font-bold mb-1">03 / RERANKING</div>
              <div className="font-semibold text-slate-900 font-sans text-xs flex items-center justify-between">
                <span>Cross-Encoder</span>
                {activeSimStep >= 3 && <span className="text-emerald-600 font-bold">✓</span>}
              </div>
              <div className="text-[10px] text-slate-500 mt-1 font-sans">Top 50 → Top 5 candidates</div>
            </div>

            {/* Step 4: Verification */}
            <div className={`p-3 rounded-xl border transition-all ${
              activeSimStep >= 4 ? 'bg-white border-[#0284C7] shadow-xs' : 'bg-white/60 border-slate-200 opacity-60'
            }`}>
              <div className="text-[10px] text-slate-400 font-bold mb-1">04 / EVIDENCE</div>
              <div className="font-semibold text-slate-900 font-sans text-xs flex items-center justify-between">
                <span>SHA-256 Citations</span>
                {activeSimStep >= 4 && <span className="text-emerald-600 font-bold">✓</span>}
              </div>
              <div className="text-[10px] text-slate-500 mt-1 font-sans">99.2% token grounding</div>
            </div>

          </div>

          {/* Live Status Toast inside Simulator */}
          <div className="mt-3 text-[11px] font-mono text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${simState === 'verified' ? 'bg-emerald-500' : simState === 'idle' ? 'bg-slate-400' : 'bg-[#0284C7] animate-pulse'}`} />
              <span>
                {simState === "idle" && "System ready for live trace simulation."}
                {simState === "ingesting" && "Extracting proposition chunks from document corpus..."}
                {simState === "retrieving" && "Executing parallel BM25 lexical and HNSW vector traversal..."}
                {simState === "ranking" && "Applying BGE cross-encoder reranking (P99 < 118ms)..."}
                {simState === "generating" && "Grounded LLM context generation with citation gates..."}
                {simState === "verified" && "Output verified: Verbatim source citations grounded with zero hallucination."}
              </span>
            </span>
            <span className="text-[#0284C7] font-semibold">
              {simState === "verified" ? "Status: VERIFIED (100%)" : simState === "idle" ? "Ready" : "Tracing..."}
            </span>
          </div>
        </motion.div>

        {/* 5. Metrics Row */}
        <div className="pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 w-full max-w-3xl mx-auto">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-mono">300+</div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1 font-mono">Projects Delivered</div>
          </div>
          <div className="sm:border-l sm:border-slate-200 sm:pl-12">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-mono">25+</div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1 font-mono">Global Jurisdictions</div>
          </div>
          <div className="sm:border-l sm:border-slate-200 sm:pl-12">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-mono">8–12 Wks</div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1 font-mono">Production Runway</div>
          </div>
        </div>

      </div>
    </section>
  );
}
