"use client";

import React from "react";
import { motion } from "framer-motion";
import { JetBrains_Mono } from "next/font/google";
import { Brain, Cpu, MessageSquare, Terminal, Zap, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

const inter = { className: "" };
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });

export default function AISolutionsClient() {
  return (
    <main className={`${inter.className} min-h-screen bg-[#050505] text-white pt-48 pb-20 px-6 md:px-10 lg:px-16 overflow-x-hidden`}>
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#D4AF37]/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Eyebrow & Title */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-3 text-[#D4AF37] ${mono.className} text-xs tracking-widest mb-4`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]" />
            </span>
            <span>SYSTEM_CAPABILITY // AI_ENGINEERING</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9] uppercase"
          >
            AI Solutions & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-white">
              Neural Systems
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mt-6"
          >
            We build production-grade AI agents, Retrieval-Augmented Generation (RAG) pipelines, and intelligent automation custom-trained on your company&apos;s data.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            {
              icon: <Brain className="w-6 h-6" />,
              title: "Agentic Workflows",
              desc: "Autonomous software agents capable of executing multi-step business logic, decision tree routing, and API transactions without manual oversight.",
            },
            {
              icon: <Cpu className="w-6 h-6" />,
              title: "Fine-Tuning & RAG",
              desc: "Context-aware LLM architectures utilizing advanced semantic search, vector indexing, and embedding parameters to guarantee zero-hallucination accuracy.",
            },
            {
              icon: <MessageSquare className="w-6 h-6" />,
              title: "Conversational AI",
              desc: "Custom-trained enterprise chatbots and voice assistants designed to resolve 80%+ of Tier-1 support volume with natural-sounding context recall.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-white/5 bg-white/[0.02] p-8 rounded-2xl hover:border-[#D4AF37]/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                {feature.icon}
              </div>
              <h2 className="text-xl font-bold text-white mb-3">{feature.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed font-light">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Technical Architecture Section */}
        <div className="border-t border-white/10 pt-20 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">
                Technical <span className="text-[#D4AF37] italic">Arsenal</span>
              </h2>
              <p className="text-gray-400 font-light leading-relaxed mb-6">
                We avoid generic prompt wraps. Our systems are engineered using production-grade open-source and proprietary frameworks, integrating directly into your databases.
              </p>
              
              {/* Checklist */}
              <div className="space-y-4 font-mono text-xs text-gray-300">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>LangChain / LlamaIndex orchestration</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Pinecone, FAISS, and Milvus vector DBs</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Fine-tuning Llama-3, Mistral, and custom parameters</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Enterprise authentication & data layer shielding</span>
                </div>
              </div>
            </div>

            {/* Simulated Code Panel */}
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 font-mono text-[10px] md:text-xs text-[#888] overflow-hidden shadow-2xl relative">
              <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="text-white text-xs font-semibold">rag_pipeline.py</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/25" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/25" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/25" />
                </div>
              </div>
              <pre className="text-left text-gray-400">
                <code>
{`import os
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.vector_stores.pinecone import PineconeVectorStore

# Initialize semantic neural RAG pipeline
def initialize_agent():
    vector_store = PineconeVectorStore(
        api_key=os.environ["PINECONE_API_KEY"],
        index_name="botmartz-knowledge-base"
    )
    
    reader = SimpleDirectoryReader(input_dir="./data")
    documents = reader.load_data()
    
    index = VectorStoreIndex.from_documents(
        documents, vector_store=vector_store
    )
    query_engine = index.as_query_engine(similarity_top_k=5)
    return query_engine

# Output: Neural pipeline ready. 99.9% Context Recall.
`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="border-t border-white/10 pt-20 text-center">
          <h2 className="text-3xl md:text-6xl font-black uppercase mb-6">
            Ready to integrate <span className="text-[#D4AF37]">Intelligence?</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-10 font-light">
            Book a scoping call to map your workflows and see how Generative AI can be applied to your business.
          </p>
          <Link href="/contact" className="inline-flex">
            <button className="px-10 py-4 bg-[#D4AF37] text-black font-black uppercase tracking-widest hover:scale-105 transition-all duration-300 flex items-center gap-3 rounded-full cursor-pointer">
              <span>Scope Your AI Project</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
