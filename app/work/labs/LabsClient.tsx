"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Github, ExternalLink, Code, Cpu, FlaskConical, Activity, Zap, Network } from "lucide-react";
import SpotlightCard from "@/app/_components/SpotlightCard";

export interface LabItem {
  id?: string;
  title: string;
  description?: string;
  desc?: string;
  category: string;
  tags?: string[];
  githubUrl?: string;
  demoUrl?: string;
  repoUrl?: string;
  stars?: number | string;
  forks?: number | string;
  badge?: string;
  isNew?: boolean;
  glyph?: string;
  status?: string;
  featured?: boolean;
}

const DEFAULT_LABS: LabItem[] = [
  { id: 'rag-starter', category: 'Enterprise RAG', title: 'Enterprise RAG Starter', desc: 'A production-ready RAG platform with hybrid search, reranking, and advanced evaluation.', tags: ['LangChain', 'FastAPI', 'Qdrant', 'Docker'], stars: '1.0k', forks: '320', isNew: true, glyph: 'RAG', githubUrl: 'https://github.com/botmartz' },
  { id: 'langgraph-agent', category: 'AI Agents', title: 'LangGraph Agent Framework', desc: 'A modular multi-agent framework built with LangGraph for complex reasoning and tool orchestration.', tags: ['LangGraph', 'Python', 'Redis', 'Docker'], stars: '2.3k', forks: '410', isNew: true, glyph: 'AG', githubUrl: 'https://github.com/botmartz' },
  { id: 'virtual-tryon', category: 'Computer Vision', title: 'Virtual Try-On Lab', desc: 'Realistic virtual try-on system using diffusion models and garment warping techniques.', tags: ['PyTorch', 'Diffusers', 'ONNX', 'Gradio'], stars: '980', forks: '210', isNew: true, glyph: 'CV', githubUrl: 'https://github.com/botmartz' },
  { id: 'ai-research', category: 'AI Agents', title: 'AI Research Agent', desc: 'Autonomous research agent that searches, reads, analyzes, and generates comprehensive reports.', tags: ['LangChain', 'OpenAI', 'Tavily', 'Pydantic'], stars: '1.4k', forks: '280', isNew: true, glyph: 'AG', githubUrl: 'https://github.com/botmartz' },
  { id: 'ai-sdr', category: 'AI Agents', title: 'AI SDR (Sales Dev Rep)', desc: 'An agent that researches prospects, personalizes outreach, and books meetings autonomously.', tags: ['LangGraph', 'OpenAI', 'HubSpot', 'PostgreSQL'], stars: '760', forks: '140', isNew: false, glyph: 'AG', githubUrl: 'https://github.com/botmartz' },
  { id: 'course-assistant', category: 'AI Agents', title: 'AI Course Assistant', desc: 'Intelligent assistant for courses that answers doubts, generates quizzes, and tracks progress.', tags: ['FastAPI', 'OpenAI', 'Chroma', 'Docker'], stars: '980', forks: '180', isNew: false, glyph: 'AG', githubUrl: 'https://github.com/botmartz' },
  { id: 'meeting-agent', category: 'AI Agents', title: 'Meeting Agent', desc: 'AI meeting assistant that transcribes, summarizes, and extracts action items automatically.', tags: ['Whisper', 'LangChain', 'PostgreSQL', 'AWS'], stars: '1.8k', forks: '200', isNew: false, glyph: 'AG', githubUrl: 'https://github.com/botmartz' },
  { id: 'legal-assistant', category: 'Enterprise RAG', title: 'Legal Assistant', desc: 'RAG-powered legal assistant for contract review, clause extraction, and risk analysis.', tags: ['LangChain', 'LlamaIndex', 'Qdrant', 'AWS'], stars: '1.3k', forks: '260', isNew: false, glyph: 'RAG', githubUrl: 'https://github.com/botmartz' },
];

const CATEGORIES = ['All Labs', 'Enterprise RAG', 'AI Agents', 'Computer Vision', 'Developer Tools', 'Infrastructure'];

const STACK_ITEMS = [
  { name: 'PyTorch', color: '#EE4C2C' },
  { name: 'LangChain', color: '#1C3C3C' },
  { name: 'LangGraph', color: '#1C3C3C' },
  { name: 'Google ADK', color: '#4285F4' },
  { name: 'FastAPI', color: '#009688' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'Redis', color: '#DC382D' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'AWS', color: '#FF9900' },
];

const PROCESS_STEPS = [
  { n: '1', title: 'Identify Real Problems', desc: 'We explore real-world challenges faced by businesses and developers.' },
  { n: '2', title: 'Build & Experiment', desc: 'Rapid prototyping with the latest models, frameworks, and infrastructure.' },
  { n: '3', title: 'Evaluate & Refine', desc: 'Rigorous testing, benchmarking, and iterative improvements for production readiness.' },
  { n: '4', title: 'Open Source & Share', desc: 'We open source our best work to give back to the AI engineering community.' },
];

function formatCount(n?: number | string): string {
  if (!n) return '0';
  if (typeof n === 'string') return n;
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(n);
}

function getGlyph(lab: LabItem): string {
  if (lab.glyph) return lab.glyph;
  const cat = lab.category || '';
  if (cat.toLowerCase().includes('rag')) return 'RAG';
  if (cat.toLowerCase().includes('agent')) return 'AG';
  if (cat.toLowerCase().includes('vision')) return 'CV';
  if (cat.toLowerCase().includes('tool') || cat.toLowerCase().includes('dev')) return 'DEV';
  if (cat.toLowerCase().includes('infra')) return 'INF';
  return cat.slice(0, 2).toUpperCase() || 'LB';
}

interface LabsClientProps {
  initialLabs?: LabItem[];
  heroContent?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
  };
  structuredData?: string;
  aeoQuestion?: string;
  aeoAnswer?: string;
}

export default function LabsClient({ initialLabs = [], heroContent, structuredData, aeoQuestion, aeoAnswer }: LabsClientProps) {
  const [activeCategory, setActiveCategory] = useState('All Labs');

  // Use initialLabs if populated, otherwise use DEFAULT_LABS
  const labsData = initialLabs && initialLabs.length > 0
    ? initialLabs.map((lab, i) => ({
        ...lab,
        desc: lab.desc || lab.description || 'A production-ready AI engineering lab.',
        glyph: getGlyph(lab),
        stars: formatCount(lab.stars || '1.1k'),
        forks: formatCount(lab.forks || '230'),
        isNew: lab.isNew || lab.badge === 'New' || i < 3,
        tags: lab.tags && lab.tags.length > 0 ? lab.tags : ['Python', 'AI', 'Docker'],
      }))
    : DEFAULT_LABS;

  const visibleLabs = activeCategory === 'All Labs'
    ? labsData
    : labsData.filter(l => l.category === activeCategory);

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Botmartz AI Engineering Labs",
    "description": "Where we experiment, build, and open source production-ready AI systems that solve real problems.",
    "url": "https://www.botmartz.com/work/labs",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": labsData.map((l, i) => ({
        "@type": "SoftwareSourceCode",
        "name": l.title,
        "description": l.desc,
        "codeRepository": l.githubUrl || "https://github.com/botmartz"
      }))
    }
  };

  return (
    <div className="bg-[#F5F8FC] min-h-screen text-[#0B1220] font-sans pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredData ? structuredData : JSON.stringify(defaultSchema)
        }}
      />
      {/* ══════════ HERO (DARK BACKGROUND #060C1F) ══════════ */}
      <section className="bg-[#060C1F] relative overflow-hidden pt-20 pb-16 px-6 sm:px-10 border-b border-[#1E293B]">
        {/* Background Grid & Mask */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,198,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,198,255,0.06) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 65% 30%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 65% 30%, black, transparent)'
          }}
        />

        <div className="max-w-[1240px] mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="font-semibold text-[12.5px] text-[#5B6B85] mb-5.5">
            <Link href="/" className="hover:text-[#00C6FF] transition-colors">Home</Link>
            <span className="mx-2.5">›</span>
            <Link href="/work" className="hover:text-[#00C6FF] transition-colors">Work</Link>
            <span className="mx-2.5">›</span>
            <span className="text-[#00C6FF]">Labs</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            {/* Left Column */}
            <div>
              <div className="font-bold text-[12px] tracking-[0.1em] text-[#00C6FF] uppercase">
                {heroContent?.badge || 'Botmartz Labs'}
              </div>
              <h1 
                className="font-extrabold text-4xl sm:text-[44px] text-white mt-4 leading-[1.15]"
                dangerouslySetInnerHTML={{
                  __html: heroContent?.title || 'Building Today.<br /><span class="text-[#00C6FF]">Engineering</span> Tomorrow.'
                }}
              />
              <p className="font-medium text-[14.5px] leading-[1.7] text-[#8FA3C4] mt-4.5 max-w-[480px]">
                {heroContent?.subtitle || 'Our labs is where we experiment, build, and open source production-ready AI systems that solve real problems. Every project is built with a focus on performance, scalability, and real-world impact.'}
              </p>
              
              <div className="flex flex-wrap gap-3.5 mt-7">
                <a 
                  href={heroContent?.ctaLink || '#labs-grid'} 
                  className="inline-flex items-center gap-2 bg-[#007BFF] hover:bg-[#0069DB] text-white font-bold text-[14px] px-6 py-3.5 rounded-[9px] shadow-[0_8px_24px_rgba(0,123,255,0.35)] transition-all"
                >
                  {heroContent?.ctaText || 'Explore All Projects →'}
                </a>
                <a 
                  href="https://github.com/botmartz" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.18] text-white font-bold text-[14px] px-6 py-3.5 rounded-[9px] transition-all"
                >
                  View on GitHub ⌥
                </a>
              </div>
            </div>

            {/* Right Column: Premium Bento AI Graphic */}
            <div className="relative w-full max-w-[460px] mx-auto lg:ml-auto flex flex-col gap-3.5 mt-8 lg:mt-0">
              
              {/* Background ambient glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#00C6FF]/20 blur-[80px] rounded-full pointer-events-none"></div>

              {/* Top Row */}
              <div className="grid grid-cols-[1fr_1.2fr] gap-3.5 relative z-10">
                {/* Engineer */}
                <div className="bg-[#0A1630]/70 border border-[#00C6FF]/20 p-4 rounded-[16px] shadow-lg backdrop-blur-md hover:border-[#00C6FF]/50 transition-colors group">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-[#00C6FF]/10 flex items-center justify-center">
                      <Cpu className="w-3.5 h-3.5 text-[#00C6FF]" />
                    </div>
                    <span className="font-bold text-[10.5px] text-[#00C6FF] tracking-widest uppercase">System</span>
                  </div>
                  <div className="font-extrabold text-[15px] text-white group-hover:text-[#00C6FF] transition-colors">Engineer</div>
                </div>

                {/* Experiment */}
                <div className="bg-[#0A1630]/70 border border-[#0E9F6E]/20 p-4 rounded-[16px] shadow-lg backdrop-blur-md hover:border-[#0E9F6E]/50 transition-colors group">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-[#0E9F6E]/10 flex items-center justify-center">
                      <FlaskConical className="w-3.5 h-3.5 text-[#0E9F6E]" />
                    </div>
                    <span className="font-bold text-[10.5px] text-[#0E9F6E] tracking-widest uppercase">Research</span>
                  </div>
                  <div className="font-extrabold text-[15px] text-white group-hover:text-[#0E9F6E] transition-colors">Experiment</div>
                </div>
              </div>

              {/* Middle Row */}
              <div className="grid grid-cols-[1.2fr_1fr] gap-3.5 relative z-10">
                {/* Central LABS Core */}
                <div className="relative bg-gradient-to-br from-[#060C1F]/90 to-[#0A1630]/90 border border-[#00C6FF]/40 p-6 rounded-[16px] shadow-[0_0_30px_rgba(0,198,255,0.15)] backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[#00C6FF]/10 animate-pulse" style={{ animationDuration: '3s' }}></div>
                  <Code className="w-8 h-8 text-[#00C6FF] mb-2 relative z-10" />
                  <span className="font-black text-[18px] tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00C6FF] relative z-10">LABS</span>
                </div>

                <div className="flex flex-col gap-3.5">
                  {/* Evaluate */}
                  <div className="bg-[#0A1630]/70 border border-[#8B5CF6]/20 p-4 rounded-[16px] shadow-lg backdrop-blur-md hover:border-[#8B5CF6]/50 transition-colors flex-1 group">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center">
                        <Activity className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      </div>
                      <span className="font-bold text-[10px] text-[#8B5CF6] tracking-widest uppercase">Metrics</span>
                    </div>
                    <div className="font-extrabold text-[14px] text-white group-hover:text-[#8B5CF6] transition-colors">Evaluate</div>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-[1fr_1fr] gap-3.5 relative z-10">
                {/* Open Source */}
                <div className="bg-[#0A1630]/70 border border-[#F59E0B]/20 p-4 rounded-[16px] shadow-lg backdrop-blur-md hover:border-[#F59E0B]/50 transition-colors group">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
                      <Github className="w-3.5 h-3.5 text-[#F59E0B]" />
                    </div>
                    <span className="font-bold text-[10px] text-[#F59E0B] tracking-widest uppercase">Community</span>
                  </div>
                  <div className="font-extrabold text-[14px] text-white group-hover:text-[#F59E0B] transition-colors">Open Source</div>
                </div>

                {/* Impact */}
                <div className="bg-[#0A1630]/70 border border-[#EC4899]/20 p-4 rounded-[16px] shadow-lg backdrop-blur-md hover:border-[#EC4899]/50 transition-colors group">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-[#EC4899]/10 flex items-center justify-center">
                      <Zap className="w-3.5 h-3.5 text-[#EC4899]" />
                    </div>
                    <span className="font-bold text-[10px] text-[#EC4899] tracking-widest uppercase">Outcome</span>
                  </div>
                  <div className="font-extrabold text-[14px] text-white group-hover:text-[#EC4899] transition-colors">Impact</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════ FILTER BAR & SORT (CURRENTLY COMMENTED OUT) ══════════ 
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 pt-9 pb-5 flex items-center justify-between flex-wrap gap-4" id="labs-grid">
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(label => {
            const isActive = label === activeCategory;
            return (
              <button
                key={label}
                onClick={() => setActiveCategory(label)}
                className={`font-bold text-[12.5px] px-4 py-2.2 rounded-lg cursor-pointer transition-all shadow-2xs ${
                  isActive
                    ? 'bg-[#007BFF] border border-[#007BFF] text-white'
                    : 'bg-white border border-[#E2E8F0] text-[#3A4459] hover:border-[#007BFF] hover:text-[#007BFF]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        <div className="font-semibold text-[12.5px] text-[#5B6B85] flex items-center gap-1.5">
          Sort by: <span className="text-[#0B1220] font-bold cursor-pointer">Latest ▾</span>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 pt-2 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {visibleLabs.map((lab, index) => (
          <SpotlightCard 
            key={lab.id || index}
            spotlightColor="rgba(0, 123, 255, 0.14)"
            className="!bg-white border border-[#E7ECF3] rounded-[14px] overflow-hidden flex flex-col hover:shadow-xl hover:border-[#007BFF]/50 transition-all duration-300 group"
          >
            <div className="relative h-[120px] bg-gradient-to-br from-[#0A1630] to-[#060C1F] flex items-center justify-center p-4 overflow-hidden">
              <div className="w-[34px] h-[34px] rounded-[9px] bg-[#00C6FF]/14 border border-[#00C6FF]/25 flex items-center justify-center font-bold text-[11px] text-[#00C6FF] group-hover:scale-110 transition-transform duration-300">
                {lab.glyph || getGlyph(lab)}
              </div>
              {lab.isNew && (
                <span className="absolute top-[10px] right-[10px] bg-[#0E9F6E] text-white font-bold text-[9.5px] px-2 py-[3px] rounded-[5px] shadow-xs">
                  New
                </span>
              )}
            </div>

            <div className="p-4.5 flex flex-col gap-2 flex-1">
              <span className="font-bold text-[10px] tracking-[0.05em] text-[#007BFF] uppercase">
                {lab.category}
              </span>
              <div className="font-bold text-[15px] text-[#0B1220] group-hover:text-[#007BFF] transition-colors leading-snug">
                {lab.title}
              </div>
              <div className="font-medium text-[12px] leading-[1.55] text-[#5B6B85] flex-1">
                {lab.desc}
              </div>

              <div className="flex gap-1.5 flex-wrap mt-1">
                {(lab.tags || []).map(tag => (
                  <span key={tag} className="font-semibold text-[10.5px] text-[#5B6B85] bg-[#F1F4F9] px-2 py-[3px] rounded-[5px]">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-2 pt-3 border-t border-[#EEF1F6]">
                <a 
                  href={lab.githubUrl || lab.repoUrl || "https://github.com/botmartz"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-semibold text-[11.5px] text-[#3A4459] hover:text-[#007BFF] flex items-center gap-1.5 transition-colors"
                >
                  <span>⌥</span> GitHub
                </a>
                <span className="font-semibold text-[11.5px] text-[#8A97AC] flex items-center gap-2.5">
                  <span>★ {lab.stars}</span>
                  <span>⑂ {lab.forks}</span>
                </span>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
      */}

      {/* ══════════ LABS GRID (COMING SOON) ══════════ */}
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 pt-16 pb-16" id="labs-grid">
        <div className="flex flex-col items-center text-center justify-center py-24 bg-white rounded-[24px] border border-dashed border-[#C7D6EE] shadow-sm">
          <div className="w-20 h-20 bg-[#007BFF]/10 rounded-full flex items-center justify-center mb-6">
            <Code className="w-10 h-10 text-[#007BFF]" />
          </div>
          <h2 className="font-extrabold text-[28px] sm:text-[32px] text-[#0B1220] mb-4 tracking-tight">Our Labs Are Evolving</h2>
          <p className="font-medium text-[15px] text-[#5B6B85] max-w-[540px] leading-relaxed">
            We are currently upgrading our lab infrastructure and adding new open-source projects. 
            Check back shortly to explore our latest AI engineering experiments.
          </p>
          <div className="mt-8 font-bold text-[12.5px] text-[#007BFF] tracking-widest uppercase bg-[#007BFF]/10 px-5 py-2.5 rounded-full border border-[#007BFF]/20">
            Coming Soon
          </div>
        </div>
      </div>

      {/* ══════════ WHY OUR LABS MATTER Box ══════════ */}
      <div className="max-w-[1240px] mx-auto mt-4 px-6 sm:px-10">
        <div className="bg-[#060C1F] rounded-[18px] p-8 sm:p-11 relative overflow-hidden text-white shadow-xl">
          <div className="absolute w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(0,123,255,0.2),transparent_70%)] right-[-60px] top-[-100px] pointer-events-none" />
          <div className="relative z-10">
            <div className="font-bold text-[11.5px] tracking-[0.08em] text-[#00C6FF] uppercase">
              Why Our Labs Matter
            </div>
            <h2 className="font-extrabold text-2xl sm:text-[26px] text-white mt-2.5 mb-7">
              From Experiment to <span className="text-[#00C6FF]">Enterprise.</span>
            </h2>
            <p className="font-medium text-[13px] leading-[1.6] text-[#8FA3C4] max-w-[460px] mt-2.5">
              Our labs follow a rigorous engineering approach to turn innovative ideas into reliable, open-source solutions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {PROCESS_STEPS.map((step) => (
                <div key={step.n} className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-full border border-[#00C6FF]/40 bg-[#00C6FF]/[0.08] flex items-center justify-center font-bold text-[13px] text-[#00C6FF]">
                    {step.n}
                  </div>
                  <div className="font-bold text-[13.5px] text-white mt-1">
                    {step.title}
                  </div>
                  <div className="font-medium text-[12px] leading-[1.55] text-[#7C8CAD]">
                    {step.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ MODERN AI ENGINEERING STACK ══════════ */}
      <div className="max-w-[1240px] mx-auto pt-14 px-6 sm:px-10 text-center">
        <div className="font-bold text-[11.5px] tracking-[0.08em] text-[#007BFF] uppercase">
          Built With a Modern AI Engineering Stack
        </div>
        <div className="flex justify-center gap-4 sm:gap-7 flex-wrap mt-5.5">
          {STACK_ITEMS.map((s) => (
            <span 
              key={s.name} 
              className="font-bold text-[13px] text-[#3A4459] flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-[#E7ECF3] shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
              {s.name}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════ OPEN SOURCE BANNER ══════════ */}
      <div className="max-w-[1240px] mx-auto mt-14 px-6 sm:px-10">
        <div className="bg-white border border-[#E7ECF3] rounded-2xl p-7 sm:p-8 flex items-center justify-between gap-6 flex-wrap shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#E8F2FF] flex items-center justify-center font-bold text-[22px] text-[#007BFF] shrink-0">
            ⌥
          </div>
          <div className="flex-1 min-w-[260px]">
            <h3 className="font-bold text-[17px] text-[#0B1220]">Open Source is in Our DNA.</h3>
            <p className="font-medium text-[13px] leading-[1.6] text-[#5B6B85] mt-1.5">
              We believe sharing knowledge and code accelerates innovation for everyone. Explore our GitHub organization to see all our open-source projects.
            </p>
          </div>
          <a 
            href="https://github.com/botmartz" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-bold text-[13px] text-white bg-[#0B1220] hover:bg-[#1A2333] px-5 py-3 rounded-[9px] shrink-0 transition-colors shadow-sm"
          >
            View on GitHub ⌥
          </a>
        </div>
      </div>

      {/* ══════════ HAVE AN IDEA WORTH BUILDING? CTA Box ══════════ */}
      <div className="max-w-[1240px] mx-auto mt-6 mb-22 px-6 sm:px-10">
        <div className="bg-[#060C1F] rounded-[18px] p-8 sm:p-11 relative overflow-hidden text-white shadow-xl">
          <div className="absolute w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,rgba(0,123,255,0.2),transparent_70%)] right-[-70px] bottom-[-120px] pointer-events-none" />
          
          <div className="relative z-10 flex items-start justify-between gap-8 flex-wrap">
            <div className="max-w-[480px]">
              <h2 className="font-extrabold text-2xl sm:text-[26px] leading-[1.3] text-white">
                Have an <span className="text-[#00C6FF]">Idea</span> Worth Building?
              </h2>
              <p className="font-medium text-[13.5px] leading-[1.65] text-[#8FA3C4] mt-3">
                Let&apos;s build the next lab together. We collaborate with founders, researchers, and engineers to build impactful AI systems.
              </p>
            </div>
            <Link 
              href="/contact" 
              className="font-bold text-[13.5px] text-white bg-[#007BFF] hover:bg-[#0069DB] px-6 py-3.5 rounded-[9px] whitespace-nowrap shadow-[0_8px_24px_rgba(0,123,255,0.35)] shrink-0 transition-all"
            >
              Start a Conversation →
            </Link>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mt-9 pt-7 border-t border-white/10">
            <div className="flex items-start gap-3">
              <div className="w-[34px] h-[34px] shrink-0 rounded-[9px] bg-[#00C6FF]/12 flex items-center justify-center font-bold text-[10px] text-[#00C6FF]">
                CO
              </div>
              <div>
                <div className="font-bold text-[13px] text-white">Collaborate</div>
                <div className="font-medium text-[11.5px] leading-[1.5] text-[#7C8CAD] mt-0.5">Partner with our engineering team</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-[34px] h-[34px] shrink-0 rounded-[9px] bg-[#00C6FF]/12 flex items-center justify-center font-bold text-[10px] text-[#00C6FF]">
                AC
              </div>
              <div>
                <div className="font-bold text-[13px] text-white">Accelerate</div>
                <div className="font-medium text-[11.5px] leading-[1.5] text-[#7C8CAD] mt-0.5">Ship faster and smarter</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-[34px] h-[34px] shrink-0 rounded-[9px] bg-[#00C6FF]/12 flex items-center justify-center font-bold text-[10px] text-[#00C6FF]">
                MI
              </div>
              <div>
                <div className="font-bold text-[13px] text-white">Make Impact</div>
                <div className="font-medium text-[11.5px] leading-[1.5] text-[#7C8CAD] mt-0.5">Solve real problems that matter</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
