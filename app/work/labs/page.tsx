"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { ArrowRight, Github, ExternalLink, Search, Code, LineChart, Box, Lightbulb, Zap, Target, Star, GitFork } from "lucide-react";
import { SiPytorch, SiGooglecloud, SiFastapi, SiPostgresql, SiRedis, SiDocker, SiAmazon } from "react-icons/si";

interface LabItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  repoUrl?: string;
  stars?: number;
  forks?: number;
  badge?: "" | "New" | "Live" | "Beta";
  status: "active" | "inactive";
  featured?: boolean;
}

const CATEGORY_COLORS: Record<string, { text: string; bg: string }> = {
  "Enterprise RAG":  { text: "text-sky-400",    bg: "bg-sky-400/10" },
  "AI Agents":       { text: "text-purple-400",  bg: "bg-purple-400/10" },
  "Computer Vision": { text: "text-emerald-400", bg: "bg-emerald-400/10" },
  "Developer Tools": { text: "text-amber-400",   bg: "bg-amber-400/10" },
  "Infrastructure":  { text: "text-rose-400",    bg: "bg-rose-400/10" },
  "Other":           { text: "text-zinc-400",    bg: "bg-zinc-400/10" },
};

const BADGE_STYLES: Record<string, string> = {
  New:  "bg-emerald-500 text-white",
  Live: "bg-brand text-white",
  Beta: "bg-amber-500 text-white",
};

function formatCount(n: number): string {
  if (!n) return "0";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

const CATEGORIES = ["All Labs", "Enterprise RAG", "AI Agents", "Computer Vision", "Developer Tools", "Infrastructure"];

export default function LabsPage() {
  const [labs, setLabs] = useState<LabItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Labs");

  useEffect(() => {
    async function fetchLabs() {
      try {
        const q = query(
          collection(db, "labs"),
          where("status", "==", "active"),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);
        const list: LabItem[] = [];
        snap.forEach((d) => list.push({ id: d.id, ...d.data() } as LabItem));
        setLabs(list);
      } catch {
        try {
          const snap = await getDocs(collection(db, "labs"));
          const list: LabItem[] = [];
          snap.forEach((d) => {
            const data = d.data();
            if (data.status === "active") list.push({ id: d.id, ...data } as LabItem);
          });
          setLabs(list);
        } catch (e) {
          console.error("Error loading labs:", e);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchLabs();
  }, []);

  const filteredLabs = activeCategory === "All Labs"
    ? labs
    : labs.filter((l) => l.category === activeCategory);

  return (
    <main className="bg-paper min-h-screen">

      {/* ── HERO ── */}
      <section
        className="relative pt-[80px] pb-[80px] bg-ink text-white overflow-hidden"
        style={{ backgroundImage: "linear-gradient(rgba(0,184,240,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.06) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
      >
        <div className="wrap relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 lg:max-w-[580px]">
            <div className="font-mono text-[11px] text-brand uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block" />
              BOTMARTZ LABS
            </div>
            <h1 className="text-[clamp(38px,5vw,64px)] leading-[1.04] font-bold mb-6">
              Building Today.<br />
              <span className="text-brand">Engineering</span> Tomorrow.
            </h1>
            <p className="text-[16px] text-[#9FB9C8] mb-8 max-w-[480px] leading-relaxed">
              Our labs is where we experiment, build, and open source production-ready AI systems that solve real problems.
              Every project is built with a focus on performance, scalability, and real-world impact.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="btn btn-primary bg-brand text-white hover:bg-deep flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-[14px]">
                Explore All Projects <ArrowRight className="w-4 h-4" />
              </a>
              <a href="https://github.com/botmartz" target="_blank" rel="noopener noreferrer" className="btn border border-white/20 hover:border-white transition-colors text-[14px] px-6 py-3 rounded-lg flex items-center gap-2 font-semibold">
                View on GitHub <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 3D Hero Visual */}
          <div className="flex-1 w-full hidden lg:flex items-center justify-center">
            <div className="relative w-[440px] h-[380px] flex items-center justify-center">

              {/* Glow base */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[300px] h-[80px] bg-brand/30 blur-[60px] rounded-[100%]" />

              {/* Circuit platform */}
              <div className="absolute bottom-[60px] left-1/2 -translate-x-1/2 w-[200px] h-[20px] bg-brand/20 border border-brand/40 rounded-sm shadow-[0_0_30px_rgba(0,184,240,0.4)]" />
              <div className="absolute bottom-[64px] left-1/2 -translate-x-1/2 w-[160px] h-[14px] bg-brand/30 border border-brand/60 rounded-sm" />

              {/* Cube body */}
              <div className="absolute bottom-[80px] left-1/2 -translate-x-1/2 w-[140px] h-[140px] rounded-2xl border border-brand/70 bg-gradient-to-br from-[#0a1628] via-[#061020] to-[#040C18] shadow-[0_0_50px_rgba(0,184,240,0.5),inset_0_0_30px_rgba(0,184,240,0.1)] flex items-center justify-center flex-col gap-1 z-10">
                <div className="absolute inset-0 rounded-2xl border border-brand/30 m-2" />
                <span className="text-brand font-mono font-black text-[22px] tracking-[0.2em]">LABS</span>
                <div className="w-8 h-8 rounded-full border border-brand/50 bg-brand/10 flex items-center justify-center">
                  <span className="text-brand text-[16px]">🤖</span>
                </div>
              </div>

              {/* Floating labels */}
              {[
                { label: "Experiment",  style: "top-[30px] left-[20px]" },
                { label: "Evaluate",    style: "top-[30px] right-[20px]" },
                { label: "Engineer",    style: "top-[160px] left-[10px]" },
                { label: "Open Source", style: "top-[160px] right-[0px]" },
                { label: "Impact",      style: "bottom-[30px] right-[40px]" },
              ].map(({ label, style }) => (
                <div key={label} className={`absolute ${style} bg-[#0d1117]/90 border border-white/15 backdrop-blur-sm px-3.5 py-1.5 rounded-full font-mono text-[10px] text-white/80 flex items-center gap-2 shadow-lg`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                  {label}
                </div>
              ))}

              {/* Dashed connector lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                <line x1="110" y1="55"  x2="210" y2="155" stroke="rgba(0,184,240,0.25)" strokeWidth="1" strokeDasharray="5 5" />
                <line x1="330" y1="55"  x2="230" y2="155" stroke="rgba(0,184,240,0.25)" strokeWidth="1" strokeDasharray="5 5" />
                <line x1="70"  y1="175" x2="180" y2="190" stroke="rgba(0,184,240,0.25)" strokeWidth="1" strokeDasharray="5 5" />
                <line x1="370" y1="175" x2="260" y2="190" stroke="rgba(0,184,240,0.25)" strokeWidth="1" strokeDasharray="5 5" />
                <line x1="340" y1="340" x2="250" y2="240" stroke="rgba(0,184,240,0.25)" strokeWidth="1" strokeDasharray="5 5" />
              </svg>

            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <section className="py-5 border-b border-line bg-white sticky top-[60px] z-40" id="projects">
        <div className="wrap flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex overflow-x-auto gap-1.5 pb-1 md:pb-0 hide-scrollbar w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 text-[13px] font-semibold rounded-sm transition-colors ${
                  activeCategory === cat
                    ? "bg-brand text-white"
                    : "border border-line text-ink-soft hover:border-brand hover:text-brand"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 border border-line px-3 py-1.5 rounded-sm shrink-0 text-[13px] text-ink-soft">
            Sort by: <span className="font-semibold text-ink ml-1">Latest</span>
          </div>
        </div>
      </section>

      {/* ── LABS GRID ── */}
      <section className="py-[60px] bg-[#f7f8fa]">
        {loading ? (
          <div className="wrap flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-line border-t-brand rounded-full animate-spin" />
          </div>
        ) : filteredLabs.length === 0 ? (
          <div className="wrap text-center py-24 text-ink-soft">
            <Code className="w-10 h-10 mx-auto mb-4 opacity-30" />
            <p className="text-[18px] font-semibold mb-2">No labs found</p>
            <p className="text-[14px]">Check back soon — we&apos;re always building.</p>
          </div>
        ) : (
          <div className="wrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredLabs.map((lab, idx) => {
              const catStyle = CATEGORY_COLORS[lab.category] || CATEGORY_COLORS["Other"];
              const badgeStyle = lab.badge ? BADGE_STYLES[lab.badge] : null;

              return (
                <div
                  key={lab.id}
                  className="bg-[#0d1117] border border-[#30363d] rounded-xl overflow-hidden hover:border-brand hover:shadow-[0_0_24px_rgba(0,184,240,0.15)] transition-all group flex flex-col"
                >
                  {/* ── Thumbnail ── */}
                  <div
                    className="h-[160px] relative overflow-hidden flex items-center justify-center p-4"
                    style={{ backgroundImage: "linear-gradient(rgba(0,184,240,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.06) 1px, transparent 1px)", backgroundSize: "24px 24px", backgroundColor: "#0d1117" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-brand/15 via-transparent to-transparent" />

                    {/* Rotating thumbnail visuals */}
                    {idx % 4 === 0 && (
                      <div className="w-full h-full border border-white/10 rounded bg-white/5 flex gap-2 p-3">
                        <div className="w-1/4 h-full border border-white/10 rounded-sm" />
                        <div className="flex-1 h-full flex flex-col gap-2">
                          <div className="h-1/3 border border-brand/40 bg-brand/10 rounded-sm" />
                          <div className="flex-1 border border-white/10 rounded-sm" />
                        </div>
                      </div>
                    )}
                    {idx % 4 === 1 && (
                      <div className="w-full h-full relative">
                        <div className="absolute top-1/2 left-3 w-6 h-6 border border-brand/50 rounded-full -translate-y-1/2 bg-brand/10 flex items-center justify-center text-brand"><Code className="w-3 h-3" /></div>
                        <div className="absolute top-1/4 left-1/2 w-8 h-8 border border-white/40 rounded -translate-x-1/2 bg-white/10 flex items-center justify-center"><Box className="w-4 h-4 text-white" /></div>
                        <div className="absolute bottom-1/4 left-1/2 w-8 h-8 border border-white/40 rounded -translate-x-1/2 bg-white/10 flex items-center justify-center"><Box className="w-4 h-4 text-white" /></div>
                        <div className="absolute top-1/2 right-3 w-6 h-6 border border-brand/50 rounded-full -translate-y-1/2 bg-brand/10 flex items-center justify-center text-brand"><LineChart className="w-3 h-3" /></div>
                      </div>
                    )}
                    {idx % 4 === 2 && (
                      <div className="w-full h-full flex items-center justify-center gap-4">
                        <div className="w-12 h-16 border border-white/20 rounded bg-white/5 flex flex-col items-center p-1">
                          <div className="w-5 h-5 rounded-full border border-white/30 mb-2" />
                          <div className="flex-1 w-full border border-white/30 rounded-sm" />
                        </div>
                        <ArrowRight className="w-4 h-4 text-brand" />
                        <div className="w-12 h-16 border border-brand/50 rounded bg-brand/10 flex flex-col items-center p-1">
                          <div className="w-5 h-5 rounded-full border border-brand mb-2" />
                          <div className="flex-1 w-full border border-brand bg-brand/20 rounded-sm" />
                        </div>
                      </div>
                    )}
                    {idx % 4 === 3 && (
                      <div className="w-full h-full grid grid-cols-3 gap-1.5 p-3">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className={`rounded border ${i === 4 ? "border-brand/60 bg-brand/20" : "border-white/10 bg-white/5"}`} />
                        ))}
                      </div>
                    )}

                    {/* FIG label */}
                    <div className="absolute top-2.5 left-3 font-mono text-[9px] text-[#7FB9D6] uppercase tracking-wider">
                      FIG. {String(idx + 1).padStart(2, "0")}
                    </div>

                    {/* Badge */}
                    {badgeStyle && (
                      <div className={`absolute top-2.5 right-3 font-mono text-[10px] font-bold px-2 py-0.5 rounded shadow-sm ${badgeStyle}`}>
                        {lab.badge}
                      </div>
                    )}
                  </div>

                  {/* ── Content ── */}
                  <div className="p-4 flex flex-col flex-1">
                    {/* Category */}
                    <div className={`font-mono text-[10px] uppercase tracking-wider mb-1.5 font-bold ${catStyle.text}`}>
                      {lab.category}
                    </div>

                    {/* Title */}
                    <h3 className="text-[15px] font-bold text-white mb-1.5 group-hover:text-brand transition-colors leading-snug">
                      {lab.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[12px] text-[#8b949e] mb-4 flex-1 leading-relaxed line-clamp-3">
                      {lab.description}
                    </p>

                    {/* Tags */}
                    {lab.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {lab.tags.slice(0, 4).map((t) => (
                          <span key={t} className="font-mono text-[10px] text-[#8b949e] border border-[#30363d] bg-[#161b22] px-2 py-0.5 rounded-sm">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-[#30363d] pt-3 mt-auto">
                      <div className="flex items-center gap-3 text-[11px] text-[#8b949e]">
                        {lab.githubUrl ? (
                          <a href={lab.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-brand transition-colors">
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span className="opacity-30"><Github className="w-3.5 h-3.5" /></span>
                        )}
                        {(lab.stars !== undefined && lab.stars > 0) && (
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3" /> {formatCount(lab.stars)}
                          </span>
                        )}
                        {(lab.forks !== undefined && lab.forks > 0) && (
                          <span className="flex items-center gap-1">
                            <GitFork className="w-3 h-3" /> {formatCount(lab.forks)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px]">
                        {lab.githubUrl && (
                          <a href={lab.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[#8b949e] hover:text-brand transition-colors flex items-center gap-1">
                            GitHub <ArrowRight className="w-2.5 h-2.5" />
                          </a>
                        )}
                        {lab.demoUrl && (
                          <a href={lab.demoUrl} target="_blank" rel="noopener noreferrer" className="text-brand flex items-center gap-1 font-semibold">
                            Demo <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── WHY OUR LABS MATTER ── */}
      <section className="bg-ink text-white py-[80px] my-10 mx-auto max-w-[1400px] rounded-xl relative overflow-hidden" style={{ backgroundImage: "linear-gradient(rgba(0,184,240,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.07) 1px, transparent 1px)", backgroundSize: "40px 40px" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-transparent to-ink z-0" />
        <div className="wrap relative z-10 flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/3">
            <div className="font-mono text-[11px] text-brand uppercase tracking-[0.15em] mb-4 font-semibold">WHY OUR LABS MATTER</div>
            <h2 className="text-[clamp(26px,4vw,36px)] leading-[1.1] font-bold mb-4">
              From Experiment to <span className="text-[#9FB9C8]">Enterprise.</span>
            </h2>
            <p className="text-[15px] text-[#9FB9C8] leading-relaxed">
              Our labs follow a rigorous engineering approach to turn innovative ideas into reliable, open-source solutions.
            </p>
          </div>
          <div className="lg:w-2/3 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Search, label: "Identify Real Problems", desc: "We explore real-world challenges faced by businesses and developers." },
                { icon: Code,   label: "Build & Experiment",    desc: "Rapid prototyping with the latest models, frameworks, and infrastructure." },
                { icon: LineChart, label: "Evaluate & Refine",  desc: "Rigorous testing, benchmarking, and iterative improvements." },
                { icon: Box,    label: "Open Source & Share",   desc: "We open-source our best work to give back to the AI community." },
              ].map(({ icon: Icon, label, desc }, i) => (
                <div key={label} className="flex flex-col items-center text-center">
                  <div className={`w-14 h-14 rounded-full border ${i === 0 ? "border-brand/50 bg-ink shadow-[0_0_20px_rgba(0,184,240,0.2)]" : "border-white/20 bg-ink"} flex items-center justify-center ${i === 0 ? "text-brand" : "text-white"} mb-4`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-[14px] mb-2">{label}</h4>
                  <p className="text-[12px] text-[#9FB9C8] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="py-[60px] bg-white border-b border-line text-center">
        <div className="font-mono text-[11px] text-brand uppercase tracking-[0.15em] mb-10 font-semibold">BUILT WITH MODERN AI ENGINEERING STACK</div>
        <div className="wrap flex flex-wrap justify-center items-center gap-x-12 gap-y-6 text-ink-soft grayscale opacity-70">
          {[
            { icon: <SiPytorch className="w-6 h-6" />, label: "PyTorch" },
            { icon: <span className="text-xl">🦜🔗</span>, label: "LangChain" },
            { icon: <span className="text-xl">🦜🕸️</span>, label: "LangGraph" },
            { icon: <SiGooglecloud className="w-6 h-6" />, label: "Google ADK" },
            { icon: <SiFastapi className="w-6 h-6" />, label: "FastAPI" },
            { icon: <SiPostgresql className="w-6 h-6" />, label: "PostgreSQL" },
            { icon: <SiRedis className="w-6 h-6" />, label: "Redis" },
            { icon: <SiDocker className="w-6 h-6" />, label: "Docker" },
            { icon: <SiAmazon className="w-6 h-6" />, label: "AWS" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2 font-semibold text-[15px]">
              {icon} {label}
            </div>
          ))}
        </div>
      </section>

      {/* ── OPEN SOURCE BANNER ── */}
      <section className="py-[60px] bg-paper">
        <div className="wrap max-w-[1000px] mx-auto bg-white border border-line rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="w-24 h-24 rounded-full bg-[#f6f8fa] flex items-center justify-center shrink-0">
            <Github className="w-12 h-12 text-brand" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-[26px] font-bold mb-3">Open Source is in Our DNA.</h2>
            <p className="text-[15px] text-ink-soft">We believe sharing knowledge and code accelerates innovation for everyone. Explore our GitHub to see all our open-source projects.</p>
          </div>
          <div className="shrink-0">
            <a href="https://github.com/botmartz" target="_blank" rel="noopener noreferrer" className="btn border border-line hover:border-brand text-ink transition-colors px-6 py-2.5 rounded-lg flex items-center gap-2 text-[14px] font-semibold">
              View on GitHub <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="bg-[#040C18] text-white py-[60px] mt-10 relative overflow-hidden border-t border-brand/20">
        <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-transparent" />
        <div className="wrap relative z-10 flex flex-col md:flex-row items-center gap-12 justify-between">
          <div className="md:w-1/3 text-center md:text-left">
            <h2 className="text-[30px] font-bold leading-[1.1] mb-4">Have an <span className="text-brand">Idea</span> Worth Building?</h2>
            <p className="text-[14px] text-[#9FB9C8]">
              Let&apos;s build the next lab together. We collaborate with founders, researchers, and engineers to build impactful AI systems.
            </p>
          </div>
          <div className="md:w-2/3 w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Lightbulb, label: "Collaborate", desc: "Partner with our engineering team and build together." },
              { icon: Zap,       label: "Accelerate",  desc: "Leverage our expertise to ship faster and smarter." },
              { icon: Target,    label: "Make Impact",  desc: "Solve real problems and create meaningful change." },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="w-12 h-12 rounded bg-brand/10 border border-brand/30 flex items-center justify-center text-brand mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-[15px] mb-2">{label}</h4>
                <p className="text-[13px] text-[#9FB9C8]">{desc}</p>
              </div>
            ))}
            <div className="sm:col-span-3 mt-4 flex justify-center sm:justify-start">
              <Link href="/contact" className="btn btn-primary bg-brand text-white hover:bg-deep flex items-center gap-2 px-8 py-3 rounded-lg font-semibold w-full sm:w-auto justify-center">
                Start a Conversation →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
