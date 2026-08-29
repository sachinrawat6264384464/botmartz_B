"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Github, ExternalLink, Code } from "lucide-react";
import SpotlightCard from "@/app/_components/SpotlightCard";

export type LabType = 'REFERENCE IMPLEMENTATION' | 'RESEARCH PROTOTYPE' | 'OPEN SOURCE PROJECT' | 'CLIENT CASE STUDY';

export interface LabItem {
  id?: string;
  title: string;
  description?: string;
  desc?: string;
  category: string;
  type?: LabType;
  tags?: string[];
  githubUrl?: string;
  demoUrl?: string;
  repoUrl?: string;
  badge?: string;
  isNew?: boolean;
  glyph?: string;
  status?: string;
  featured?: boolean;
  stars?: string | number;
  forks?: string | number;
}

const DEFAULT_LABS: LabItem[] = [
  { 
    id: 'insurance-intelligence', 
    category: 'Enterprise Knowledge', 
    type: 'REFERENCE IMPLEMENTATION',
    title: 'Insurance Intelligence Lab', 
    desc: 'Multi-document insurance policy comparison, clause variance extraction, and zero-hallucination citation enforcement.', 
    tags: ['Hybrid Search', 'BGE-Reranker', 'Pydantic', 'OpenSearch'], 
    isNew: true, 
    glyph: 'INS', 
    featured: true,
    demoUrl: '/work/labs/insurance-intelligence',
    githubUrl: 'https://github.com/botmartz' 
  },
  { 
    id: 'rag-starter', 
    category: 'Enterprise Knowledge', 
    type: 'REFERENCE IMPLEMENTATION',
    title: 'Enterprise Knowledge & Search', 
    desc: 'Production-ready RAG platform with hybrid vector/keyword search, cross-encoder reranking, and automated RAGAS evaluation.', 
    tags: ['Qdrant', 'FastAPI', 'LlamaIndex', 'RAGAS'], 
    isNew: true, 
    glyph: 'RAG', 
    githubUrl: 'https://github.com/botmartz' 
  },
  { 
    id: 'langgraph-agent', 
    category: 'AI Agents', 
    type: 'REFERENCE IMPLEMENTATION',
    title: 'Multi-Agent Workflow State Machine', 
    desc: 'Modular LangGraph state graph with deterministic routing, human-in-the-loop validation, and tool calling.', 
    tags: ['LangGraph', 'Python', 'Redis', 'Docker'], 
    isNew: true, 
    glyph: 'AG', 
    githubUrl: 'https://github.com/botmartz' 
  },
  { 
    id: 'opensearch-connector', 
    category: 'Open Source', 
    type: 'OPEN SOURCE PROJECT',
    title: 'OpenSearch Vector & RAG Tools', 
    desc: 'Open-source utilities and connectors for building hybrid vector and keyword search pipelines with OpenSearch.', 
    tags: ['OpenSearch', 'Python', 'BM25', 'RRF'], 
    isNew: true, 
    glyph: 'OSS', 
    githubUrl: 'https://github.com/botmartz' 
  },
  { 
    id: 'ecommerce-intelligence', 
    category: 'Ecommerce', 
    type: 'REFERENCE IMPLEMENTATION',
    title: 'Ecommerce Semantic Catalog Search', 
    desc: 'E-commerce catalog intelligence engine with multi-facet semantic filtering, attribute extraction, and real-time ranker.', 
    tags: ['Weaviate', 'FastAPI', 'Vector Search', 'Redis'], 
    isNew: false, 
    glyph: 'ECOM', 
    githubUrl: 'https://github.com/botmartz' 
  },
  { 
    id: 'virtual-tryon', 
    category: 'Research', 
    type: 'RESEARCH PROTOTYPE',
    title: 'Virtual Try-On Vision Lab', 
    desc: 'Experimental computer vision pipeline for garment deformation and realistic multi-pose virtual try-on.', 
    tags: ['PyTorch', 'Diffusers', 'ONNX', 'Gradio'], 
    isNew: false, 
    glyph: 'CV', 
    githubUrl: 'https://github.com/botmartz' 
  },
  { 
    id: 'meeting-agent', 
    category: 'AI Agents', 
    type: 'REFERENCE IMPLEMENTATION',
    title: 'Executive Meeting & Decision Extractor', 
    desc: 'Automated meeting transcription, structured decision extraction, and action item task generation in enterprise tools.', 
    tags: ['Whisper', 'LangChain', 'PostgreSQL', 'AWS'], 
    isNew: false, 
    glyph: 'AG', 
    githubUrl: 'https://github.com/botmartz' 
  },
  { 
    id: 'doc-intelligence-table', 
    category: 'Enterprise Knowledge', 
    type: 'REFERENCE IMPLEMENTATION',
    title: 'Layout-Aware Document Intelligence', 
    desc: 'Table extraction and multi-column parsing pipeline for high-density regulatory filings and financial disclosures.', 
    tags: ['FastAPI', 'OCR', 'Qdrant', 'Docker'], 
    isNew: false, 
    glyph: 'DOC', 
    githubUrl: 'https://github.com/botmartz' 
  },
];

const CATEGORIES = ['All Labs', 'Enterprise Knowledge', 'AI Agents', 'Open Source', 'Ecommerce', 'Research'];

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

            {/* Right Column: Orbiting Pill Graphic */}
            <div className="relative h-[300px] flex items-center justify-center">
              <div className="w-[150px] h-[150px] bg-gradient-to-br from-[#0F1E3D] to-[#0A1630] border border-[#00C6FF]/35 rounded-2xl flex items-center justify-center shadow-[0_0_60px_rgba(0,123,255,0.35)] relative z-10">
                <span className="font-extrabold text-[13px] tracking-[0.08em] text-[#00C6FF]">LABS</span>
              </div>
              <div className="absolute top-[18px] left-0 sm:left-[20px] font-bold text-[11.5px] text-[#C7D6EE] bg-white/[0.05] border border-white/[0.14] px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-xs">Engineer</div>
              <div className="absolute top-0 right-[30px] sm:right-[60px] font-bold text-[11.5px] text-[#C7D6EE] bg-white/[0.05] border border-white/[0.14] px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-xs">Experiment</div>
              <div className="absolute top-[60px] right-0 sm:right-[10px] font-bold text-[11.5px] text-[#C7D6EE] bg-white/[0.05] border border-white/[0.14] px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-xs">Evaluate</div>
              <div className="absolute bottom-[60px] right-0 sm:right-[0px] font-bold text-[11.5px] text-[#C7D6EE] bg-white/[0.05] border border-white/[0.14] px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-xs">Open Source</div>
              <div className="absolute bottom-[20px] right-[40px] sm:right-[60px] font-bold text-[11.5px] text-[#C7D6EE] bg-white/[0.05] border border-white/[0.14] px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-xs">Impact</div>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════ FILTER BAR & SORT ══════════ */}
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

      {/* ══════════ LABS GRID ══════════ */}
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 pt-2 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {visibleLabs.map((lab, index) => (
          <SpotlightCard 
            key={lab.id || index}
            spotlightColor="rgba(0, 123, 255, 0.14)"
            className="!bg-white border border-[#E7ECF3] rounded-[14px] overflow-hidden flex flex-col hover:shadow-xl hover:border-[#007BFF]/50 transition-all duration-300 group"
          >
            {/* Top Graphic Header */}
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

            {/* Card Content */}
            <div className="p-4.5 flex flex-col gap-2 flex-1">
              <div className="flex items-center justify-between gap-1 flex-wrap">
                <span className="font-bold text-[10px] tracking-[0.05em] text-[#007BFF] uppercase">
                  {lab.category}
                </span>
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                  lab.type === 'REFERENCE IMPLEMENTATION'
                    ? 'bg-[#00B8F0]/10 text-[#0084B4] border border-[#00B8F0]/30'
                    : lab.type === 'OPEN SOURCE PROJECT'
                    ? 'bg-purple-50 text-purple-700 border border-purple-200'
                    : lab.type === 'RESEARCH PROTOTYPE'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {lab.type || 'REFERENCE IMPLEMENTATION'}
                </span>
              </div>
              <div className="font-bold text-[15px] text-[#0B1220] group-hover:text-[#007BFF] transition-colors leading-snug">
                {lab.title}
              </div>
              <div className="font-medium text-[12px] leading-[1.55] text-[#5B6B85] flex-1">
                {lab.desc}
              </div>

              {/* Tags */}
              <div className="flex gap-1.5 flex-wrap mt-1">
                {(lab.tags || []).map(tag => (
                  <span key={tag} className="font-semibold text-[10.5px] text-[#5B6B85] bg-[#F1F4F9] px-2 py-[3px] rounded-[5px]">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between mt-2 pt-3 border-t border-[#EEF1F6]">
                <div className="flex items-center gap-3">
                  <a 
                    href={lab.githubUrl || lab.repoUrl || "https://github.com/botmartz"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-semibold text-[11.5px] text-[#3A4459] hover:text-[#007BFF] flex items-center gap-1 transition-colors"
                  >
                    <span>⌥</span> Code
                  </a>
                  {lab.demoUrl && (
                    <Link 
                      href={lab.demoUrl} 
                      className="font-bold text-[11.5px] text-[#007BFF] hover:text-[#0052CC] flex items-center gap-1 transition-colors"
                    >
                      <span>⚡</span> Live Lab
                    </Link>
                  )}
                </div>
                <span className="font-mono text-[10.5px] text-[#8A97AC]">
                  Verified
                </span>
              </div>
            </div>
          </SpotlightCard>
        ))}
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
