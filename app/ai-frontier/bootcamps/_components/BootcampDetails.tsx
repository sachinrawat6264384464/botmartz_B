"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

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
    outcome: "Students understand how modern production AI systems are engineered.",
    color: "from-[#009688] to-[#14B8A6]",
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
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#64748B] mb-2 block">
                  Bootcamp {bootcamp.number}
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
                <p className="text-[#0B1C2C] font-semibold">{bootcamp.outcome}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
