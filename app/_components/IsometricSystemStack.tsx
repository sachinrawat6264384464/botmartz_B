"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Layers, Search, Cpu, Database, CheckCircle2, ArrowRight, 
  Sparkles, ShieldCheck, Activity, Terminal, Workflow, Zap, Lock
} from "lucide-react";

type LayerId = "knowledge" | "retrieval" | "intelligence";

interface LayerData {
  id: LayerId;
  index: string;
  name: string;
  badge: string;
  headline: string;
  plainEnglishHook: string;
  denseArchitecture: string;
  tags: string[];
  specs: { label: string; value: string }[];
  accentColor: string;
  tileItems: { title: string; subtitle: string; tag: string }[];
}

const LAYERS: LayerData[] = [
  {
    id: "knowledge",
    index: "01",
    name: "Knowledge Ingestion & Parsing",
    badge: "AST LAYOUT ENGINE",
    headline: "Transform Raw Enterprise Documents into High-Fidelity Proposition Chunks",
    plainEnglishHook: "Documents contain nested tables, footnotes, and multi-column layouts. We parse structure directly into abstract syntax trees so numbers and clauses are never split across chunks.",
    denseArchitecture: "Hierarchical layout analysis preserving table geometry, multi-level clause numbering, and document metadata with SHA-256 cryptographic provenance.",
    tags: ["AST Parsing", "Table Geometry", "Proposition Chunking", "Metadata Enrichment", "Tenant Isolation"],
    specs: [
      { label: "Token Loss", value: "0.0%" },
      { label: "Table Integrity", value: "100%" },
      { label: "Provenance Stamp", value: "SHA-256 Hashes" },
    ],
    accentColor: "#10B981",
    tileItems: [
      { title: "Multi-Format Ingestion", subtitle: "PDF, Word, Excel, SQL, REST APIs", tag: "RAW INGEST" },
      { title: "AST Layout Parser", subtitle: "Preserves table geometry & clause hierarchy", tag: "STRUCTURE" },
      { title: "Proposition Chunking", subtitle: "Extracts complete semantic statements", tag: "SEMANTIC" },
      { title: "Cryptographic Provenance", subtitle: "SHA-256 hash stamp on every chunk", tag: "TRACEABILITY" }
    ]
  },
  {
    id: "retrieval",
    index: "02",
    name: "Hybrid Retrieval & RRF Fusion",
    badge: "RECIPROCAL RANK FUSION",
    headline: "Parallel Sparse BM25 + Dense ANN Traversal + Cross-Encoder Reranking",
    plainEnglishHook: "Lexical search catches exact part numbers, contract IDs, and legal codes. Dense vector search catches intent and synonyms. Reciprocal Rank Fusion merges both streams before reranking.",
    denseArchitecture: "Dual-channel retrieval combining Lucene inverted indexes and HNSW vector graphs, merged via RRF (k=60) and re-scored with BGE Cross-Encoder.",
    tags: ["BM25 Sparse Search", "Qdrant / pgvector", "RRF Fusion (k=60)", "BGE Cross-Encoder", "Sub-120ms P99"],
    specs: [
      { label: "P99 Latency", value: "< 118ms" },
      { label: "RRF Constant (k)", value: "60" },
      { label: "Top-K Selection", value: "50 -> 5 Reranked" },
    ],
    accentColor: "#0284C7",
    tileItems: [
      { title: "Lucene BM25 Search", subtitle: "Exact alphanumeric codes & statutory references", tag: "LEXICAL" },
      { title: "Dense Vector Traversal", subtitle: "HNSW cosine similarity across semantic chunks", tag: "SEMANTIC" },
      { title: "Reciprocal Rank Fusion", subtitle: "Mathematical score merge with constant k=60", tag: "RRF FUSION" },
      { title: "BGE Cross-Encoder", subtitle: "Deep neural pair re-scoring of top-20 candidates", tag: "RERANKER" }
    ]
  },
  {
    id: "intelligence",
    index: "03",
    name: "Intelligence & Agent Execution",
    badge: "LANGGRAPH STATE MACHINE",
    headline: "Grounded Generation with Strict Human-in-the-Loop Review Gates",
    plainEnglishHook: "Outputs cite exact source paragraphs with verified hash references. Workflows that update databases or initiate actions enforce a human approval gate.",
    denseArchitecture: "Cyclical StateGraph nodes with Postgres WAL persistence, token citation grounding validators, and automated compensating transactions.",
    tags: ["LangGraph DAGs", "Postgres Checkpointer", "Citation Grounding", "HITL Review Gate", "Saga Compensation"],
    specs: [
      { label: "Citation Precision", value: "99.2%" },
      { label: "State Persistence", value: "Postgres WAL" },
      { label: "Safety Gate", value: "Strict Refusal" },
    ],
    accentColor: "#F59E0B",
    tileItems: [
      { title: "LangGraph State Machine", subtitle: "Deterministic cyclical execution with DAG branching", tag: "RUNTIME" },
      { title: "Postgres WAL Checkpoint", subtitle: "Zero state loss across process restarts", tag: "PERSISTENCE" },
      { title: "Verbatim Citation Gate", subtitle: "Validates every output token against source chunks", tag: "VERIFICATION" },
      { title: "Human Review Gate", subtitle: "1-click authorization required before database mutations", tag: "GOVERNANCE" }
    ]
  },
];

export default function IsometricSystemStack() {
  const [activeLayer, setActiveLayer] = useState<LayerId>("retrieval");

  const currentLayerData = LAYERS.find((l) => l.id === activeLayer) || LAYERS[1];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      id="architecture" 
      className="w-full bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] overflow-hidden"
    >
      
      {/* ── TOP CONTROLLER BAR ── */}
      <div className="bg-[#F8FAFC] px-6 py-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4">
        
        {/* Layer Selector Tabs */}
        <div className="flex items-center gap-2">
          {LAYERS.map((layer) => {
            const isActive = layer.id === activeLayer;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#0F172A] text-white shadow-sm font-semibold scale-[1.02]"
                    : "bg-white text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] border border-[#E2E8F0]"
                }`}
              >
                <span className="text-[11px] opacity-75">{layer.index}</span>
                <span>{layer.name.split(" ")[0]}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeTabBadge"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full bg-[#0284C7]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Live System Signal */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="font-semibold text-slate-700">PRODUCTION SYSTEM ACTIVE</span>
        </div>

      </div>

      {/* ── MAIN CONTENT (2-COL LAYOUT) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: Interactive Layer Details (5 cols) */}
        <div className="lg:col-span-5 p-8 sm:p-10 bg-white border-b lg:border-b-0 lg:border-r border-[#E2E8F0] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLayerData.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F1F5F9] text-[#475569] font-mono text-[10px] font-semibold uppercase tracking-wider mb-4 border border-[#E2E8F0]">
                <span>LAYER {currentLayerData.index}</span>
                <span>·</span>
                <span className="text-[#0284C7]">{currentLayerData.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mb-3">
                {currentLayerData.name}
              </h3>

              {/* Direct Professional Design Principle */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-sans text-slate-700 leading-relaxed mb-4 shadow-2xs">
                <span className="font-bold text-slate-900 block mb-1">Architectural Principle:</span>
                {currentLayerData.plainEnglishHook}
              </div>

              <p className="text-xs text-[#475569] leading-relaxed mb-6 font-normal">
                {currentLayerData.denseArchitecture}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-8">
                {currentLayerData.tags.map((tag, idx) => (
                  <motion.span
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="font-mono text-[11px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] px-2.5 py-1 rounded-md font-medium cursor-default transition-colors hover:border-[#0284C7]/40 hover:text-[#0284C7]"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Hard Technical Specifications */}
          <div className="pt-6 border-t border-[#E2E8F0]">
            <div className="text-[10px] font-mono font-semibold text-[#94A3B8] uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>VERIFIED BENCHMARKS</span>
              <span className="text-emerald-600 font-bold">100% CI GATED</span>
            </div>
            <div className="grid grid-cols-3 gap-2.5 font-mono">
              {currentLayerData.specs.map((spec, idx) => (
                <div key={idx} className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] hover:border-[#0284C7]/30 transition-all">
                  <div className="text-[9px] text-[#94A3B8] truncate">{spec.label}</div>
                  <div className="text-xs font-bold text-[#0F172A] mt-1">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Hyper-Realistic 3D Exploded Architecture Visual & Dynamic Modules (7 cols) */}
        <div className="lg:col-span-7 bg-[#F8FAFC] p-6 sm:p-8 flex flex-col justify-between">
          
          {/* Hyper-Realistic 3D Isometric View */}
          <motion.div 
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.4 }}
            className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-md border border-[#E2E8F0] bg-slate-950 group mb-6 cursor-pointer"
          >
            <Image
              src="/images/architecture/system-stack-3d.png"
              alt="Botmartz 3-Layer 3D Isometric Exploded AI Architecture"
              fill
              priority
              className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            />
            {/* Holographic Glowing Glass Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            
            {/* Live Interactive Node Badges on Top of Image */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-slate-700 text-[10px] font-mono font-semibold text-white shadow-lg">
                <Sparkles className="w-3 h-3 text-[#38BDF8]" />
                <span>3D ISOMETRIC EXPLODED VIEW</span>
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
                <span className="text-[11px] font-medium text-slate-200 drop-shadow">
                  Layer {currentLayerData.index}: {currentLayerData.name}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 bg-slate-900/80 backdrop-blur-xs px-2 py-0.5 rounded border border-slate-800">
                8K Photorealistic Schematic
              </span>
            </div>
          </motion.div>

          {/* Active Layer 4-Module Component Matrix with Staggered Motion */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentLayerData.id}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08 }
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono"
            >
              {currentLayerData.tileItems.map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -3, borderColor: "#0284C7" }}
                  transition={{ duration: 0.2 }}
                  className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between cursor-default group"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-bold text-[#0F172A] font-sans group-hover:text-[#0284C7] transition-colors">{item.title}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#F1F5F9] text-[#64748B] font-semibold">{item.tag}</span>
                  </div>
                  <div className="text-[10px] text-[#64748B] font-sans leading-relaxed">
                    {item.subtitle}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 flex items-center justify-between text-xs font-mono text-[#64748B]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
              <span>Click 01 · 02 · 03 above to inspect each system layer</span>
            </span>
            <span className="text-[#0284C7] font-semibold flex items-center gap-1">
              <span>Interactive 3-Layer Stack</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

        </div>

      </div>

    </motion.div>
  );
}
