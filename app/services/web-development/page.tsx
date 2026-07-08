"use client";

import React from "react";
import { motion } from "framer-motion";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Globe, Layers, Code2, Cpu, Zap, ArrowRight, Gauge, Shield, Server, Compass, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const inter = Inter_Tight({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "900"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });

export default function WebDevelopmentPage() {
  return (
    <main className={`${inter.className} min-h-screen bg-[#050505] text-white pt-48 pb-24 px-6 md:px-10 lg:px-16 overflow-x-hidden`}>
      {/* Background Glow - Electric Cyan Theme */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#00FFE0]/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Top Split Layout: Header & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center gap-3 text-[#00FFE0] ${mono.className} text-xs tracking-widest mb-4`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFE0] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FFE0]" />
              </span>
              <span>ENGINE // HIGH_PERFORMANCE_WEB</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] uppercase"
            >
              Web Solutions & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE0] to-white">
                Edge Systems
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-xl mt-6"
            >
              We design web platforms with optimized code-splitting, custom database integration, and pre-rendered structures to maximize conversion and speed.
            </motion.p>
          </div>

          {/* Performance Dashboard Card on Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5 bg-white/[0.01] border border-white/5 p-8 rounded-3xl relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00FFE0]/5 blur-2xl rounded-full" />
            <h3 className={`${mono.className} text-xs text-[#00FFE0] uppercase tracking-widest mb-6`}>// AUDIT_METRICS</h3>
            
            {/* Lighthouse score visual */}
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 rounded-full border-4 border-[#00FFE0] flex items-center justify-center relative">
                <span className="text-2xl font-black text-white">100</span>
                <span className="absolute -bottom-2 px-2 py-0.5 bg-[#00FFE0] text-black text-[8px] font-bold uppercase rounded-full">Web</span>
              </div>
              <div>
                <h4 className="font-bold text-white uppercase text-sm">Perfect Performance</h4>
                <p className="text-gray-400 text-xs font-light">Verified by Google Lighthouse core web vitals parameters.</p>
              </div>
            </div>

            {/* Metrics List */}
            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6 font-mono text-xs text-gray-400">
              <div>
                <span>TTFB (Server response)</span>
                <p className="text-[#00FFE0] font-bold text-base mt-1">~35ms</p>
              </div>
              <div>
                <span>LCP (Page paint)</span>
                <p className="text-[#00FFE0] font-bold text-base mt-1">0.4s</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Speed Comparison Visualizer */}
        <div className="border-y border-white/5 py-16 mb-24">
          <h2 className="text-2xl md:text-4xl font-black uppercase mb-10 text-center md:text-left">
            Speed <span className="text-[#00FFE0] italic">Comparison</span>
          </h2>
          
          <div className="space-y-6 max-w-4xl">
            {/* Traditional Monolith */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-gray-500 uppercase">
                <span>Traditional Architecture (WordPress / Shopify Liquid)</span>
                <span>3.2s loading speed</span>
              </div>
              <div className="h-6 w-full bg-white/5 rounded-full overflow-hidden relative">
                <div className="h-full w-[80%] bg-red-500/20 border-r-2 border-red-500 rounded-full flex items-center px-4">
                  <span className="text-[10px] text-red-500 font-bold font-mono">Slow</span>
                </div>
              </div>
            </div>

            {/* Botmartz Stack */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-gray-400 uppercase">
                <span>Botmartz Web Stack (Next.js SSR + Edge CDN)</span>
                <span className="text-[#00FFE0] font-bold">0.4s loading speed</span>
              </div>
              <div className="h-6 w-full bg-white/5 rounded-full overflow-hidden relative">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "25%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#00FFE0]/20 to-[#00FFE0]/60 border-r-2 border-[#00FFE0] rounded-full flex items-center px-4 shadow-[0_0_15px_rgba(0,255,224,0.3)]"
                >
                  <span className="text-[10px] text-white font-bold font-mono">Optimal</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Capability Sections */}
        <div className="space-y-24 mb-24">
          {/* Capability 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="w-12 h-12 rounded-xl bg-[#00FFE0]/10 text-[#00FFE0] border border-[#00FFE0]/20 flex items-center justify-center mb-6">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 uppercase">Dynamic Server Rendering</h3>
              <p className="text-gray-400 leading-relaxed font-light mb-6">
                We design custom Next.js endpoints matching your database architectures. Instead of rendering pages on client devices, we compile raw HTML at the edge, protecting credentials and accelerating render times.
              </p>
              <div className="space-y-3 font-mono text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00FFE0]" />
                  <span>Optimized database pooling algorithms</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00FFE0]" />
                  <span>Pre-rendered static regeneration (ISR) configs</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 bg-white/[0.01] border border-white/5 p-8 rounded-3xl relative h-[250px] flex items-center justify-center overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#00FFE0]/5 blur-2xl rounded-full" />
              <div className="text-center z-10">
                <span className={`${mono.className} text-[10px] text-[#00FFE0] uppercase tracking-wider block mb-2`}>CDN latency status</span>
                <p className="text-5xl font-black text-white">~12ms</p>
                <span className="text-xs text-gray-500 font-mono block mt-2">Active Edge Node: Global Edge Cache</span>
              </div>
            </div>
          </div>

          {/* Capability 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl relative h-[250px] flex items-center justify-center overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#00FFE0]/5 blur-2xl rounded-full" />
              <div className="text-center z-10 space-y-4">
                <span className={`${mono.className} text-[10px] text-[#00FFE0] uppercase tracking-wider block`}>Stripe secure rails</span>
                <div className="inline-flex gap-2 items-center px-4 py-2 bg-white/5 rounded-full border border-white/10 text-xs font-mono text-gray-300">
                  <Shield className="w-4 h-4 text-[#00FFE0]" />
                  <span>PCI DSS Compliance Confirmed</span>
                </div>
              </div>
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#00FFE0]/10 text-[#00FFE0] border border-[#00FFE0]/20 flex items-center justify-center mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 uppercase">E-Commerce & SaaS Scale</h3>
              <p className="text-gray-400 leading-relaxed font-light mb-6">
                From luxury appliances to fashion marketplaces, we build checkouts designed to handle high transaction rates. Integrated directly with Stripe, ERPs, and inventory trackers.
              </p>
              <div className="space-y-3 font-mono text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00FFE0]" />
                  <span>Dynamic discount computation modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00FFE0]" />
                  <span>Custom webhooks handling cart syncing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="border-t border-white/10 pt-20 text-center">
          <h2 className="text-3xl md:text-6xl font-black uppercase mb-6">
            Ready for a web <span className="text-[#00FFE0]">Upgrade?</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-10 font-light">
            Book a strategy call to map your web platform requirements and get a detailed quote.
          </p>
          <Link href="/contact" className="inline-flex">
            <button className="px-10 py-4 bg-[#00FFE0] text-black font-black uppercase tracking-widest hover:scale-105 transition-all duration-300 flex items-center gap-3 rounded-full cursor-pointer shadow-[0_0_20px_rgba(0,255,224,0.3)]">
              <span>Scope Your Web Project</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
