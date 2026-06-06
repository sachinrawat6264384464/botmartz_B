"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Zap, Cpu, Globe, Layers, Code2, Database, Shield, Terminal, ArrowUpRight,
} from "lucide-react";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";

// ── Fonts (mirrors ProcessTimeline exactly) ───────────────────────────────
const inter = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
  preload: true,
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: true,
});

// ── Shared gold token ─────────────────────────────────────────────────────
const GOLD = "#C9A84C";

const SERVICES = [
  {
    id: "01",
    title: "Workflow Automation",
    headline: "Kill the manual work. Keep the momentum.",
    desc: "We map, rebuild, and automate your critical business processes — from lead intake to invoice dispatch — so your team stops firefighting and starts scaling.",
    icon: <Zap />,
    badge: "Most Requested",
    colSpan: 2,
    accent: true,
  },
  {
    id: "02",
    title: "AI & LLM Engineering",
    headline: "Intelligence built for your business, not the demo reel.",
    desc: "Production-grade agents, fine-tuned models, and RAG pipelines trained on your data — not generic prompts.",
    icon: <Cpu />,
    colSpan: 1,
  },
  {
    id: "03",
    title: "High-Performance Web",
    headline: "First impressions load in 800ms.",
    desc: "Edge-rendered Next.js architecture, global CDN delivery, and Core Web Vitals scores that outrank your competition before a single ad spend.",
    icon: <Globe />,
    colSpan: 1,
    rowSpan: 2,
  },
  {
    id: "04",
    title: "SaaS Infrastructure",
    headline: "Multi-tenant. Battle-tested. Ready for your Series B.",
    desc: "Cloud architecture designed to absorb 10× traffic spikes, support multiple client tiers, and never hand your ops team a pager incident at 2am.",
    icon: <Layers />,
    badge: "Enterprise",
    colSpan: 2,
    accent: true,
  },
  {
    id: "05",
    title: "API & Integration Layer",
    headline: "One source of truth across every tool you run.",
    desc: "Custom middleware that connects your CRM, ERP, payment rails, and 500+ third-party platforms into a single coherent data layer.",
    icon: <Code2 />,
    colSpan: 1,
  },
  {
    id: "06",
    title: "Data & Analytics",
    headline: "Your data should answer questions, not raise them.",
    desc: "Real-time dashboards, ML inference pipelines, and event tracking — purpose-built so decision-makers get the signal, not the noise.",
    icon: <Database />,
    colSpan: 1,
  },
  {
    id: "07",
    title: "Security & Compliance",
    headline: "Zero-trust isn't a buzzword. It's the baseline.",
    desc: "SOC 2-aligned architecture, end-to-end encryption, and threat modelling baked into every layer — not bolted on after launch.",
    icon: <Shield />,
    badge: "SOC 2",
    colSpan: 2,
    accent: true,
  },
  {
    id: "08",
    title: "DevOps & Delivery",
    headline: "Ship faster. Break nothing.",
    desc: "Fully automated CI/CD pipelines, infrastructure-as-code, and zero-downtime deployments backed by observability and on-call runbooks.",
    icon: <Terminal />,
    colSpan: 1,
  },
];

export function ServicesGrid() {
  return (
    <section className="relative py-24 md:py-44 bg-[#050505] overflow-hidden">
      <NeuralCanvas />

      {/* Background textures — mirrors ProcessTimeline */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(201,168,76,0.01)_10px,rgba(201,168,76,0.01)_20px)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.05),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <div className="mb-16 md:mb-24 max-w-3xl">

          {/* Eyebrow — animated ping dot + mono caps: identical to ProcessTimeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`flex items-center gap-3 text-[#C9A84C] ${mono.className} text-xs tracking-widest mb-4`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A84C] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9A84C]" />
            </span>
            CAPABILITIES: ACTIVE
          </motion.div>

          {/* Headline — gradient from-[#C9A84C] to-white, matching ProcessTimeline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-bold leading-tight text-white uppercase mb-6"
          >
            WHAT WE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] to-white">
              BUILD
            </span>
          </motion.h2>

          {/* Sub-copy — Inter_Tight, gray-400, matches ProcessTimeline body */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className={`${inter.className} text-xl text-gray-400 leading-relaxed max-w-md`}
          >
            Eight integrated service lines. One studio accountable for the outcome —{" "}
            <span className="text-[#C9A84C] font-medium">
              from architecture decisions to production deploy.
            </span>
          </motion.p>
        </div>

        {/* ── Desktop Bento Grid ── */}
        <div className="hidden md:grid grid-cols-4 auto-rows-[280px] gap-4">
          {SERVICES.map((service, i) => (
            <BentoCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* ── Mobile Grid ── */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {SERVICES.map((service, i) => (
            <MobileCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* ── Footer CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 md:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/5 pt-10"
        >
          <p className={`${inter.className} text-gray-500 text-sm font-light`}>
            Not sure which services fit your stage?{" "}
            <span className="text-white font-medium">We scope it in a free 30-min call.</span>
          </p>
          <button className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/5 hover:bg-[#C9A84C]/10 hover:border-[#C9A84C]/60 transition-all duration-300 text-[#C9A84C] text-sm font-medium">
            <span className={mono.className}>Book a Scoping Call</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}

/* ─── Desktop Bento Card ─────────────────────────────────────────────────── */
function BentoCard({ service, index }: { service: any; index: number }) {
  const colClass = service.colSpan === 2 ? "col-span-2" : "col-span-1";
  const rowClass = service.rowSpan === 2 ? "row-span-2" : "";

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-xl border transition-all duration-500 cursor-pointer
        ${service.accent ? "border-[#C9A84C]/20 bg-white/2" : "border-white/5 bg-white/2"}
        hover:border-[#C9A84C]/40 hover:bg-white/4 hover:shadow-[0_0_40px_-15px_rgba(201,168,76,0.2)]
        ${colClass} ${rowClass}`}
    >
      {/* Hover radial glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top_left,rgba(201,168,76,0.04),transparent_60%)]" />

      {/* Top edge gold line on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#C9A84C]/0 via-[#C9A84C]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 p-7 h-full flex flex-col justify-between gap-4">

        {/* Top row: icon + badge + status dot */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Icon — mirrors ProcessTimeline icon block */}
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20 group-hover:bg-[#C9A84C] group-hover:text-black transition-all duration-300">
              {React.cloneElement(service.icon, { size: 22, strokeWidth: 1.5 })}
            </div>
            <span className={`${mono.className} text-[10px] text-white/15 tracking-widest`}>
              {service.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {service.badge && (
              <span className={`${mono.className} text-[8px] tracking-[0.18em] uppercase px-2 py-0.5 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C]`}>
                {service.badge}
              </span>
            )}
            {/* Ping dot — same as ProcessTimeline eyebrow */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1.5">
          <p className={`${inter.className} text-[#C9A84C]/60 text-xs font-light italic leading-snug group-hover:text-[#C9A84C]/80 transition-colors duration-300 line-clamp-1`}>
            {service.headline}
          </p>
          <h3 className="text-xl font-bold text-white leading-tight group-hover:text-[#C9A84C] transition-colors duration-300">
            {service.title}
          </h3>
          <p className={`${inter.className} text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300`}>
            {service.desc}
          </p>
        </div>

        {/* Bottom reveal CTA */}
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          <span className={`${mono.className} text-[#C9A84C] text-xs tracking-wide`}>Learn more</span>
          <ArrowUpRight size={12} className="text-[#C9A84C]" />
        </div>
      </div>

      {/* Industrial corner brackets — mirrors ProcessTimeline card */}
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#C9A84C]/50 opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#C9A84C]/50 opacity-0 group-hover:opacity-100 transition-all duration-500" />
    </motion.div>
  );
}

/* ─── Mobile Card ────────────────────────────────────────────────────────── */
function MobileCard({ service, index }: { service: any; index: number }) {
  const isFeatured = service.colSpan === 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-xl border bg-white/[0.02]
        ${isFeatured ? "col-span-2 border-[#C9A84C]/20" : "col-span-1 border-white/5"}`}
    >
      {isFeatured && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
      )}

      <div className="p-4 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20">
            {React.cloneElement(service.icon, { size: 16, strokeWidth: 1.5 })}
          </div>
          <div className="flex items-center gap-1.5">
            {service.badge && (
              <span className={`${mono.className} text-[7px] tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-[#C9A84C]/10 text-[#C9A84C]`}>
                {service.badge}
              </span>
            )}
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
          </div>
        </div>

        <div>
          <span className={`${mono.className} text-[8px] text-white/15 tracking-widest block mb-0.5`}>
            {service.id}
          </span>
          <h3 className={`font-bold text-white leading-tight ${isFeatured ? "text-sm" : "text-xs"}`}>
            {service.title}
          </h3>
          {isFeatured && (
            <p className={`${inter.className} text-[#C9A84C]/60 text-[10px] italic mt-0.5 leading-snug line-clamp-1`}>
              {service.headline}
            </p>
          )}
          <p className={`${inter.className} text-gray-500 leading-relaxed mt-1 ${isFeatured ? "text-xs" : "text-[10px]"}`}>
            {service.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Neural background canvas ───────────────────────────────────────────── */
function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapperRef, { amount: 0.1 });
  const activeRef = useRef(false);

  useEffect(() => { activeRef.current = isInView; }, [isInView]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const count = w < 768 ? 14 : 32;

    type N = { x: number; y: number; vx: number; vy: number };
    const nodes: N[] = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));

    let raf: number;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!activeRef.current) return;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(201,168,76,0.5)";
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const o = nodes[j];
          const dx = n.x - o.x, dy = n.y - o.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 180) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = `rgba(201,168,76,${(1 - d / 180) * 0.1})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    };

    raf = requestAnimationFrame(draw);
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <div ref={wrapperRef} className="absolute inset-0 pointer-events-none opacity-35">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}