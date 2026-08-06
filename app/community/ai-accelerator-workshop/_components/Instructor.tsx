"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Instructor() {
  return (
    <section className="py-24 bg-white border-y border-[#E2E8F0]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[#F8FAFC] shadow-xl flex-shrink-0 bg-[#E2E8F0]"
          >
            {/* Placeholder for real image */}
            <img src="/Sohamsharma.jpeg" alt="Soham Sharma" className="w-full h-full object-cover object-[center_top]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center md:text-left flex-1"
          >
            <div className="text-xs font-bold tracking-widest uppercase text-[#0066FF] mb-2">
              Lead Instructor
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C2C] mb-2">
              Soham Sharma
            </h2>
            <p className="text-[#64748B] font-medium mb-6 text-lg">
              Founder & AI Engineer, Botmartz AI Solutions
            </p>
            <p className="text-[#475569] leading-relaxed mb-8">
              Soham is an AI Engineer and Architect specializing in Enterprise RAG, agentic workflows, and deploying LLMs into production. He has trained hundreds of developers and works daily on the frontier of applied AI. He brings real-world production engineering experience directly to the classroom.
            </p>
            
            <div className="flex items-center justify-center md:justify-start gap-4">
              <Link href="https://linkedin.com/in/soham-sharma" target="_blank" className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#0F172A] hover:bg-[#E2E8F0] hover:text-[#0066FF] transition-all">
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link href="https://twitter.com/sohamsharma" target="_blank" className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#0F172A] hover:bg-[#E2E8F0] hover:text-[#0066FF] transition-all">
                <Twitter className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
