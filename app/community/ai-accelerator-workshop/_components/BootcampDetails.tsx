"use client";

import { CheckCircle2, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const bootcamps = [
  {
    number: "01",
    title: "Build Your First AI Full-Stack Application",
    subtitle: "Build an AI-powered application from scratch using the latest AI tools.",
    topics: [
      "AI Development Environment",
      "ChatGPT, Claude, Gemini",
      "Cursor IDE",
      "LangChain & LangGraph",
      "AI Agents Fundamentals",
      "RAG (Retrieval-Augmented Generation)",
      "Deploy AI Application",
    ],
    outcome: "Students leave with a working AI application.",
    color: "from-[#0066FF] to-[#3B82F6]",
    date: "Aug 9, 2026",
    id: 1,
    price: 199,
  },
  {
    number: "02",
    title: "Build Smarter AI Agents",
    subtitle: "Learn how modern AI Agents think, plan and act.",
    topics: [
      "Single Agent & Multi-Agent",
      "Memory & Context Management",
      "Tool Calling & Execution",
      "MCP (Model Context Protocol)",
      "Google ADK",
      "LangGraph Deep Dive",
      "Agent Architecture & Workflow",
    ],
    outcome: "Students build intelligent AI Agents.",
    color: "from-[#0F172A] to-[#1E293B]",
    date: "Aug 16, 2026",
    id: 2,
    price: 199,
  },
  {
    number: "03",
    title: "Build Production Ready AI Applications",
    subtitle: "Scale and deploy robust systems to the real world.",
    topics: [
      "Transformer & Mamba Architecture",
      "Modern LLMs overview",
      "Inference & Optimization",
      "Deployment Strategies",
      "Scaling AI Infrastructure",
      "AI Engineering Best Practices",
    ],
    outcome: "Students understand how modern production AI systems are engineered. Note: Expect local/nginx-based deployments via tunneling, rather than full AWS/cloud deployments.",
    color: "from-[#009688] to-[#14B8A6]",
    date: "Aug 23, 2026",
    id: 3,
    price: 199,
  },
];

export default function BootcampDetails() {
  return (
    <section id="bootcamps" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-20">
          <h2 className="text-[32px] md:text-[48px] font-bold text-[#0B1C2C] tracking-tight mb-4">
            The Curriculum
          </h2>
          <p className="text-lg md:text-xl text-[#475569] max-w-2xl mx-auto font-medium">
            A comprehensive, step-by-step engineering curriculum designed for real-world application.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {bootcamps.map((bootcamp, idx) => (
            <motion.div
              key={bootcamp.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all flex flex-col h-full relative overflow-hidden group"
            >
              {/* Top accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${bootcamp.color}`} />

              <div className="mb-6">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#64748B] mb-2 flex items-center justify-between">
                  <span>Bootcamp {bootcamp.number}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {bootcamp.date}</span>
                </span>
                <h3 className="text-2xl font-bold text-[#0B1C2C] leading-tight mb-3">
                  {bootcamp.title}
                </h3>
                <p className="text-[#475569] font-medium leading-relaxed">
                  {bootcamp.subtitle}
                </p>
              </div>

              <div className="mb-8 flex-1">
                <h4 className="text-sm font-bold tracking-widest uppercase text-[#94A3B8] mb-4">
                  Core Topics
                </h4>
                <ul className="space-y-3">
                  {bootcamp.topics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#0066FF] flex-shrink-0 mt-0.5" />
                      <span className="text-[#334155] font-medium leading-snug">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-6 border-t border-[#E2E8F0]">
                <h4 className="text-sm font-bold tracking-widest uppercase text-[#94A3B8] mb-2">
                  Outcome
                </h4>
                <p className="text-[#0B1C2C] font-semibold mb-6">{bootcamp.outcome}</p>
                <div className="space-y-3">
                  <Link
                    href={`/community/ai-accelerator-workshop/checkout?plan=bootcamp-${bootcamp.id}`}
                    className="flex w-full justify-center items-center py-3 rounded-xl border-2 border-[#E2E8F0] text-[#0B1C2C] font-bold hover:border-[#0B1C2C] hover:bg-[#F8FAFC] transition-all"
                  >
                    Register for ₹{bootcamp.price}
                  </Link>
                  <Link
                    href="/community/ai-accelerator-workshop/checkout?plan=bundle"
                    className="flex w-full justify-center items-center py-3 rounded-xl bg-[#0066FF] text-white font-bold hover:bg-[#0052CC] transition-all shadow-sm"
                  >
                    Get Full Pass (₹399)
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Full Width Pass Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-3 mt-4"
          >
            <div className="bg-[#0B1C2C] border border-[#1E293B] rounded-3xl p-8 lg:p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group">
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#0066FF]/20 to-transparent blur-3xl rounded-full pointer-events-none group-hover:from-[#0066FF]/30 transition-all duration-700" />
              
              <div className="relative z-10 flex-1">
                <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#0066FF] to-[#3B82F6] text-white text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 shadow-sm">
                  Most Popular
                </div>
                <h3 className="text-[28px] md:text-[36px] font-extrabold text-white mb-2 leading-tight">
                  AI Engineering Pass
                </h3>
                <p className="text-[#8A9EB0] font-medium text-base md:text-lg max-w-2xl">
                  The complete journey from beginner to production. Get access to all 3 live engineering bootcamps, community access, and certificate of completion.
                </p>
              </div>

              <div className="relative z-10 flex flex-col items-center md:items-end flex-shrink-0 w-full md:w-auto border-t md:border-t-0 md:border-l border-[#1E293B] pt-6 md:pt-0 md:pl-10">
                <div className="flex items-end gap-3 mb-5">
                  <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">₹399</span>
                  <div className="flex flex-col items-start pb-1">
                    <span className="text-[#8A9EB0] text-sm line-through leading-none">₹597</span>
                    <span className="text-[#00B8F0] text-[13px] font-bold leading-none mt-1">Save ₹198</span>
                  </div>
                </div>
                <Link
                  href="/community/ai-accelerator-workshop/checkout?plan=bundle"
                  className="w-full md:w-auto px-10 py-4 rounded-xl bg-[#0066FF] text-white font-bold hover:bg-[#0052CC] transition-all text-center shadow-[0_4px_14px_rgba(0,102,255,0.35)] hover:shadow-[0_4px_20px_rgba(0,102,255,0.5)] text-[15px]"
                >
                  Get The Full Pass
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
