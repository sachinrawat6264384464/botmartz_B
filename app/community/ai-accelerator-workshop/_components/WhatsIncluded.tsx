"use client";

import { BookOpen, FolderArchive, Map, Award, Users } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: BookOpen,
    title: "AI Engineering Starter Kit",
    description: "A professionally designed PDF covering setup, AI workflow, development environment, LangChain, LangGraph, RAG fundamentals, deployment checklist, roadmap and recommended tools.",
  },
  {
    icon: FolderArchive,
    title: "AI Developer Resource Pack",
    description: "Downloadable ZIP containing starter templates, folder structures, prompt templates, README templates, FastAPI starter, Next.js starter, Docker template and reusable developer assets.",
  },
  {
    icon: Map,
    title: "AI Engineer Roadmap 2026",
    description: "Beautiful roadmap poster showing the complete path from beginner to production AI Engineer.",
  },
  {
    icon: Award,
    title: "Certificate of Completion",
    description: "Beautifully designed downloadable PDF certificate to showcase your engineering credential.",
  },
  {
    icon: Users,
    title: "Community Access",
    description: "Access to the exclusive Botmartz AI Engineering Community after registration. We will be hosting sessions on Zoom for interactive continuous learning.",
  },
];

export default function WhatsIncluded() {
  return (
    <section className="py-24 bg-[#050B14] text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0066FF]/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-[32px] md:text-[40px] font-bold tracking-tight mb-4 text-white">
            Every Registration Includes
          </h2>
          <p className="text-lg md:text-xl text-[#8A9EB0] max-w-2xl mx-auto font-medium">
            We provide everything you need to start building immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#0B1524]/80 backdrop-blur-md border border-[#1E293B] rounded-2xl p-8 hover:border-[#0066FF]/50 hover:bg-[#0B1524] transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-[#0066FF]/10 flex items-center justify-center text-[#0066FF] mb-6 border border-[#0066FF]/20 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-[#8A9EB0] leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
