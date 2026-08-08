"use client";

import { Check, Star } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-20">
          <h2 className="text-[32px] md:text-[48px] font-bold text-[#0B1C2C] tracking-tight mb-4">
            Secure Your Spot
          </h2>
          <p className="text-lg md:text-xl text-[#475569] max-w-2xl mx-auto font-medium">
            Join the individual bootcamps or get the full AI Engineering Pass.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto items-stretch">
          
          {/* Individual Bootcamps */}
          {[
            { 
              id: 1, 
              title: "Series 1", 
              desc: "Build Your First AI Full-Stack App",
              date: "Aug 9, 2026",
              features: ["Cursor IDE & Setup", "LangChain & RAG", "Deploy AI App"] 
            },
            { 
              id: 2, 
              title: "Series 2", 
              desc: "Build Smarter AI Agents",
              date: "Aug 16, 2026",
              features: ["Single & Multi-Agent", "MCP & Tool Calling", "Agent Workflows"] 
            },
            { 
              id: 3, 
              title: "Series 3", 
              desc: "Build Production Ready AI Apps",
              date: "Aug 22, 2026",
              features: ["Modern LLM Arch", "Scaling Infrastructure", "Enterprise Practices"] 
            },
          ].map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-sm flex flex-col h-full"
            >
              <h3 className="text-xl font-bold text-[#0B1C2C] mb-1">{item.title}</h3>
              <div className="text-sm font-semibold text-[#0066FF] mb-2">{item.date}</div>
              <p className="text-[#475569] text-[13.5px] mb-4">{item.desc}</p>
              
              <ul className="space-y-2 mb-6 flex-1">
                {item.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-[#475569] text-[13px] leading-snug">
                    <Check className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="mb-6">
                <span className="text-3xl font-bold text-[#0B1C2C]">₹199</span>
              </div>
              <Link
                href={`/community/ai-accelerator-workshop/checkout?plan=bootcamp-${item.id}`}
                className="w-full py-3 px-4 rounded-xl border-2 border-[#E2E8F0] text-[#0B1C2C] font-semibold hover:border-[#0B1C2C] hover:bg-[#F8FAFC] transition-all text-center"
              >
                Register
              </Link>
            </motion.div>
          ))}

          {/* Featured Pass */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#0B1C2C] border border-[#1E293B] rounded-3xl p-8 shadow-xl flex flex-col h-full relative transform lg:-translate-y-2"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#0066FF] to-[#3B82F6] text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <Star className="w-3.5 h-3.5 fill-current" />
              Most Popular
            </div>

            <h3 className="text-2xl font-bold text-white mb-2 mt-2">AI Engineering Pass</h3>
            <p className="text-[#8A9EB0] text-sm mb-6">
              The complete journey from beginner to production.
            </p>

            <ul className="space-y-3 mb-6 flex-1">
              {["Includes Bootcamp 1", "Includes Bootcamp 2", "Includes Bootcamp 3", "Access to community", "Certification of completion"].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-white text-sm">
                  <Check className="w-4 h-4 text-[#0066FF]" />
                  {text}
                </li>
              ))}
            </ul>

            <div className="mb-6 flex items-end gap-3">
              <span className="text-4xl font-bold text-white">₹399</span>
              <span className="text-[#8A9EB0] text-sm line-through mb-1">₹597</span>
              <span className="text-[#00B8F0] text-sm font-semibold mb-1">Save ₹198</span>
            </div>

            <Link
              href={`/community/ai-accelerator-workshop/checkout?plan=bundle`}
              className="w-full py-4 px-4 rounded-xl bg-[#0066FF] text-white font-bold hover:bg-[#0052CC] transition-all text-center shadow-[0_4px_14px_rgba(0,102,255,0.35)] hover:shadow-[0_4px_20px_rgba(0,102,255,0.5)]"
            >
              Get The Full Pass
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
