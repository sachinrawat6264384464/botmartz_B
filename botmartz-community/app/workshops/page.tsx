"use client";

import React from "react";
import Link from "next/link";
import { Terminal, Award, CheckCircle2, Calendar, Clock, ArrowRight, ShieldCheck, Cpu } from "lucide-react";

const BOOTCAMPS = [
  {
    id: "ai-agent-accelerator",
    title: "Hands-on AI Agent Accelerator",
    badge: "Intensive 2-Day Cohort",
    desc: "Build production LangGraph state machines, Pydantic schema validators, tool calling pipelines, and automated RAGAS evaluation harnesses.",
    duration: "2 Days (Weekend Live)",
    format: "Live Interactive Coding + Code Review",
    curriculum: [
      "Deterministic State Machine Architecture with LangGraph",
      "Human-in-the-Loop (HITL) checkpointers & approval queues",
      "Safe tool-calling against PostgreSQL & external REST APIs",
      "Production deployment via FastAPI and Docker containers"
    ],
    price: "₹1,999",
    status: "Enrollment Open"
  },
  {
    id: "enterprise-rag-mastery",
    title: "Enterprise RAG & Hybrid Retrieval Bootcamp",
    badge: "Weekend Deep Dive",
    desc: "Master layout-aware PDF extraction, hybrid dense/sparse vector search with OpenSearch and Qdrant, cross-encoder rerankers, and citation provenance.",
    duration: "2 Days (Live Coding)",
    format: "Hands-on Labs + Python Notebooks",
    curriculum: [
      "Table extraction & chunking strategies over complex PDFs",
      "Hybrid vector + BM25 indexing in OpenSearch & Qdrant",
      "Cross-encoder reranking (BGE) for contextual precision",
      "Automated evaluation harnesses measuring faithfulness"
    ],
    price: "₹1,999",
    status: "Upcoming Cohort"
  }
];

export default async function WorkshopsPage() {
  return (
    <div className="bg-[#050B14] min-h-screen text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/30 text-[#00B8F0] font-mono text-xs uppercase tracking-widest mb-4 font-semibold">
            <Terminal size={14} /> Practical AI Engineering
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            AI Accelerator Bootcamps
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Practical, zero-fluff live cohorts where you build and ship production-ready RAG pipelines and autonomous agent state machines.
          </p>
        </div>

        {/* Bootcamps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {BOOTCAMPS.map((b) => (
            <div
              key={b.id}
              className="bg-[#0B1524] border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col justify-between hover:border-[#00B8F0]/50 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#0066FF]/20 text-[#60A5FA] font-mono text-xs font-bold uppercase">
                    {b.badge}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">{b.status}</span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-3">{b.title}</h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">{b.desc}</p>

                <div className="space-y-2.5 text-xs text-slate-400 font-mono mb-8 p-4 rounded-2xl bg-[#050B14] border border-white/5">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-[#00B8F0]" />
                    <span>{b.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={14} className="text-[#00B8F0]" />
                    <span>Includes Official Verified Certificate</span>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="text-xs font-mono text-slate-400 uppercase font-semibold mb-3">
                    What You Will Build:
                  </div>
                  <div className="space-y-2">
                    {b.curriculum.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 size={14} className="text-[#00B8F0] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono text-slate-500 uppercase">Cohort Tuition</div>
                  <div className="text-2xl font-bold font-mono text-white">{b.price}</div>
                </div>
                <button
                  onClick={() => alert(`Enrolling in ${b.title}... Proceeding to Razorpay checkout / payment gateway.`)}
                  className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Enroll Now →
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
