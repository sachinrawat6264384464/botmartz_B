"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Cpu, Globe, Layers, Code2, Database, Shield, Terminal, Boxes } from "lucide-react";

const ACCENT = "#D4AF37";

const SERVICES = [
  {
    id: "01",
    title: "Workflow Automation",
    desc: "Eliminate bottlenecks with intelligent process automation across your entire operation — from lead capture to invoice generation.",
    icon: <Zap />,
    tag: "Most Popular",
    colSpan: 2, rowSpan: 1,
  },
  {
    id: "02",
    title: "AI Solutions",
    desc: "Production-ready LLM agents, chatbots & predictive models built specifically for your industry and data.",
    icon: <Cpu />,
    colSpan: 1, rowSpan: 1,
  },
  {
    id: "03",
    title: "High-Performance Web",
    desc: "Sub-second load times with edge rendering, Next.js 15, and global CDN — SEO-optimised from day one.",
    icon: <Globe />,
    colSpan: 1, rowSpan: 2,
  },
  {
    id: "04",
    title: "Scalable SaaS",
    desc: "Multi-tenant cloud infrastructure designed for enterprise-grade traffic spikes without a single point of failure.",
    icon: <Layers />,
    tag: "Enterprise",
    colSpan: 2, rowSpan: 1,
  },
  {
    id: "05",
    title: "API Integration",
    desc: "Unified middleware connecting your CRM, ERP, payment gateways, and 500+ third-party platforms seamlessly.",
    icon: <Code2 />,
    colSpan: 1, rowSpan: 1,
  },
  {
    id: "06",
    title: "Data Analytics",
    desc: "Real-time dashboards and ML pipelines that transform raw data into actionable business intelligence.",
    icon: <Database />,
    colSpan: 1, rowSpan: 1,
  },
  {
    id: "07",
    title: "Enterprise Security",
    desc: "Zero-trust architecture, SOC 2 compliance, and end-to-end encryption — securing every layer of your stack.",
    icon: <Shield />,
    tag: "SOC 2",
    colSpan: 2, rowSpan: 1,
  },
  {
    id: "08",
    title: "DevOps & CI/CD",
    desc: "Fully automated deployment pipelines with zero-downtime releases, infrastructure-as-code, and 24/7 monitoring.",
    icon: <Terminal />,
    colSpan: 1, rowSpan: 1,
  },
];

export function ServicesGrid() {
  return (
    <section className="relative py-20 md:py-40 px-4 md:px-12 max-w-[1700px] mx-auto bg-[#050505] overflow-hidden">

      <NeuralNetworkCanvas />

      {/* Header */}
      <div className="relative z-10 mb-12 md:mb-20 flex flex-col items-start border-l-2 border-[#D4AF37]/30 pl-6 md:pl-8 ml-2 md:ml-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-3 font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase"
        >
          <Boxes className="w-4 h-4" />
          <span>Core_Capabilities</span>
        </motion.div>

        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-white uppercase mb-4">
          System <br />
          <motion.span
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-[#D4AF37] drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]"
          >
            Modules
          </motion.span>
        </h2>

        <p className="text-gray-500 max-w-md leading-relaxed font-light text-sm md:text-base">
          Robust digital architecture.{" "}
          <span className="text-[#D4AF37]">Engineered for scale.</span>
        </p>
      </div>

      {/* Desktop Bento Grid */}
      <div className="relative z-10 hidden md:grid grid-cols-4 auto-rows-[260px] gap-5 px-12">
        {SERVICES.map((service, i) => (
          <BentoCard key={i} service={service} index={i} />
        ))}
      </div>

      {/* Mobile Grid — 2 columns, featured cards full-width */}
      <div className="relative z-10 md:hidden grid grid-cols-2 gap-3 px-2">
        {SERVICES.map((service, i) => (
          <MobileCard key={i} service={service} index={i} />
        ))}
      </div>

    </section>
  );
}

// Desktop Card
function BentoCard({ service, index }: { service: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={[
        "group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0A0A0A]/90 backdrop-blur-md",
        "hover:border-[#D4AF37]/40 transition-all duration-500",
        service.colSpan === 2 ? "col-span-2" : "col-span-1",
        service.rowSpan === 2 ? "row-span-2" : "",
      ].join(" ")}
    >
      {/* Subtle gold pulse */}
      <div className="absolute inset-0 bg-[#D4AF37] opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700 z-0" />

      {/* Corner accents */}
      <svg className="absolute top-0 right-0 w-8 h-8 opacity-20 group-hover:opacity-60 transition-opacity duration-300 z-0">
        <path d="M0 0 H 32 V 32" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-8 h-8 opacity-20 group-hover:opacity-60 transition-opacity duration-300 z-0">
        <path d="M32 32 H 0 V 0" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
      </svg>

      <div className="relative z-10 p-7 h-full flex flex-col justify-between">
        {/* Top row */}
        <div className="flex justify-between items-start">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300">
            {React.cloneElement(service.icon, { size: 22, strokeWidth: 1.5 })}
          </div>
          <div className="flex items-center gap-2">
            {service.tag && (
              <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-2 py-0.5 rounded-full uppercase">
                {service.tag}
              </span>
            )}
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            />
          </div>
        </div>

        {/* Bottom content */}
        <div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-[10px] font-mono text-white/20">{service.id}</span>
            <h3 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors duration-300 leading-tight">
              {service.title}
            </h3>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
            {service.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Mobile Card — compact, 2-column, featured = full width
function MobileCard({ service, index }: { service: any; index: number }) {
  const isFeatured = service.colSpan === 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={[
        "relative overflow-hidden rounded-xl border bg-[#0A0A0A]",
        isFeatured
          ? "col-span-2 border-[#D4AF37]/25 shadow-[0_0_20px_rgba(212,175,55,0.08)]"
          : "col-span-1 border-white/5",
      ].join(" ")}
    >
      {/* Gold left accent for featured */}
      {isFeatured && (
        <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-linear-to-b from-transparent via-[#D4AF37] to-transparent" />
      )}

      <div className={["p-4 flex flex-col gap-3", isFeatured ? "pl-5" : ""].join(" ")}>
        {/* Icon + status */}
        <div className="flex items-center justify-between">
          <div className={[
            "p-2 rounded-lg text-[#D4AF37]",
            isFeatured ? "bg-[#D4AF37]/10" : "bg-white/5",
          ].join(" ")}>
            {React.cloneElement(service.icon, { size: 18, strokeWidth: 1.5 })}
          </div>
          <div className="flex items-center gap-1.5">
            {service.tag && (
              <span className="text-[8px] font-mono tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-1.5 py-0.5 rounded-full uppercase">
                {service.tag}
              </span>
            )}
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-80" />
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="text-[9px] font-mono text-white/20 mb-0.5">{service.id}</p>
          <h3 className={[
            "font-bold text-white leading-tight",
            isFeatured ? "text-base" : "text-sm",
          ].join(" ")}>
            {service.title}
          </h3>
          <p className={[
            "text-gray-500 leading-relaxed mt-1.5",
            isFeatured ? "text-xs" : "text-[11px]",
          ].join(" ")}>
            {service.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Neural network canvas — stable RAF loop
function NeuralNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapperRef, { amount: 0.1 });
  const activeRef = useRef(false);

  useEffect(() => { activeRef.current = isInView; }, [isInView]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const isMobile = w < 768;
    const nodeCount = isMobile ? 12 : 30;

    type Node = { x: number; y: number; vx: number; vy: number };
    const nodes: Node[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));

    let animId: number;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      if (!activeRef.current) return;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = ACCENT;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const o = nodes[j];
          const dx = n.x - o.x, dy = n.y - o.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = `rgba(212,175,55,${(1 - dist / 160) * 0.15})`;
            ctx.stroke();
          }
        }
      }
    };

    animId = requestAnimationFrame(draw);
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize, { passive: true });
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <div ref={wrapperRef} className="absolute inset-0 pointer-events-none opacity-40">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
