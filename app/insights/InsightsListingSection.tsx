"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Layout, 
  Database, 
  Network, 
  Server, 
  ShieldCheck, 
  Code2, 
  Users, 
  Bot, 
  Layers, 
  BookOpen, 
  FileText, 
  BarChart3, 
  Cpu, 
  SlidersHorizontal, 
  ChevronDown, 
  PlayCircle,
  GitBranch,
  Terminal,
  CheckCircle2,
  Share2,
  Bookmark
} from "lucide-react";

export interface InsightArticle {
  id: number;
  title: string;
  category: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  slug?: string;
  featured?: boolean;
  visualType: "rag-featured" | "agents-circle" | "microservices-blocks" | "mlops-dashboard" | "rag-hybrid" | "langgraph-flow" | "open-source-hub" | "prompt-blueprint" | "legal-doc-flow";
}

const ARTICLES_DATA: InsightArticle[] = [
  {
    id: 1,
    title: "Building a Scalable Enterprise RAG System: Architecture, Components & Best Practices",
    category: "ENTERPRISE RAG",
    description: "A complete blueprint for building production-ready RAG systems that are secure, accurate, and scalable for enterprise workloads.",
    author: "Botmartz Engineering Team",
    date: "May 12, 2024",
    readTime: "12 min read",
    featured: true,
    visualType: "rag-featured"
  },
  {
    id: 2,
    title: "Inside AI Agents: From Reasoning to Real-World Action",
    category: "AI AGENTS",
    description: "Explore the core components of AI agents, including planning, tool calling, memory, and evaluation.",
    author: "Soham Sharma",
    date: "May 8, 2024",
    readTime: "9 min read",
    visualType: "agents-circle"
  },
  {
    id: 3,
    title: "Microservices vs Monolith for AI Systems: What We Learned",
    category: "ARCHITECTURE",
    description: "A practical comparison based on real production deployments and scalability requirements.",
    author: "Renee D.",
    date: "May 5, 2024",
    readTime: "7 min read",
    visualType: "microservices-blocks"
  },
  {
    id: 4,
    title: "Observability for LLM Applications: Metrics That Matter",
    category: "MLOPS",
    description: "Key metrics, dashboards and alerts to monitor LLM apps in production and ensure reliability.",
    author: "Harish R.",
    date: "Apr 30, 2024",
    readTime: "8 min read",
    visualType: "mlops-dashboard"
  },
  {
    id: 5,
    title: "Advanced RAG Techniques: Hybrid Search, Reranking & Query Rewriting",
    category: "ENTERPRISE RAG",
    description: "Improve retrieval accuracy and reduce hallucinations with hybrid search, rerankers, and LLM-based query rewriting.",
    author: "Botmartz Engineering Team",
    date: "Apr 25, 2024",
    readTime: "10 min read",
    visualType: "rag-hybrid"
  },
  {
    id: 6,
    title: "Build an AI Chatbot with LangGraph and OpenAI (Step-by-Step)",
    category: "TUTORIALS",
    description: "A hands-on tutorial to build a production-ready agentic AI using LangGraph, FastAPI and OpenAI.",
    author: "Rohit K.",
    date: "Apr 15, 2024",
    readTime: "15 min read",
    visualType: "langgraph-flow"
  },
  {
    id: 7,
    title: "Open Source Projects from Botmartz Labs You Should Know",
    category: "OPEN SOURCE",
    description: "Explore our open-source projects that power real-world AI systems and developer productivity.",
    author: "Botmartz Labs",
    date: "Apr 10, 2024",
    readTime: "6 min read",
    visualType: "open-source-hub"
  },
  {
    id: 8,
    title: "Prompt Engineering Patterns That Actually Work in Production",
    category: "AI ENGINEERING",
    description: "Reusable prompt patterns to write for improved reliability, consistency and performance.",
    author: "Ritesh K.",
    date: "Apr 2, 2024",
    readTime: "7 min read",
    visualType: "prompt-blueprint"
  },
  {
    id: 9,
    title: "How We Built a Legal Document Intelligence System for 100K+ Docs",
    category: "CASE STUDIES",
    description: "Architecture, challenges, and lessons learned from building an end-to-end legal AI solution.",
    author: "Team Botmartz",
    date: "Mar 28, 2024",
    readTime: "8 min read",
    visualType: "legal-doc-flow"
  }
];

const CATEGORIES_LIST = [
  { name: "All Articles", count: 148, isAll: true },
  { name: "AI Engineering", count: 24, icon: Cpu },
  { name: "Enterprise RAG", count: 18, icon: Database },
  { name: "AI Agents", count: 16, icon: Bot },
  { name: "MLOps", count: 14, icon: BarChart3 },
  { name: "Architecture", count: 12, icon: Layers },
  { name: "Tutorials", count: 20, icon: BookOpen },
  { name: "Open Source", count: 15, icon: Code2 },
  { name: "Case Studies", count: 10, icon: FileText }
];

const POPULAR_ARTICLES = [
  { id: 1, title: "Building a Scalable Enterprise RAG System", date: "May 12, 2024", visual: "rag" },
  { id: 2, title: "Inside AI Agents: From Reasoning to Real-World Action", date: "May 8, 2024", visual: "agents" },
  { id: 3, title: "Observability for LLM Applications", date: "Apr 30, 2024", visual: "mlops" },
  { id: 4, title: "Advanced RAG Techniques for Better Accuracy", date: "Apr 25, 2024", visual: "hybrid" },
  { id: 5, title: "Prompt Engineering Patterns That Work", date: "Apr 2, 2024", visual: "prompt" }
];

const generateSlugRaw = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

export default function InsightsListingSection({ dbArticles = [] }: { dbArticles?: any[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All Articles");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const mergedArticles = useMemo(() => {
    const formattedDb = dbArticles.map((art) => ({
      id: art.id,
      title: art.title,
      category: art.category?.toUpperCase() || "AI ENGINEERING",
      description: art.excerpt || art.description || "",
      author: art.author || "Botmartz Team",
      date: art.createdAt ? new Date(art.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent",
      readTime: `${art.readTime || 5} min read`,
      slug: art.slug || generateSlugRaw(art.title),
      visualType: (art.visualType || "mlops-dashboard") as any
    }));

    return [...formattedDb, ...ARTICLES_DATA.map(art => ({ ...art, slug: art.slug || generateSlugRaw(art.title) }))];
  }, [dbArticles]);

  // Filter logic
  const filteredArticles = useMemo(() => {
    return mergedArticles.filter((item) => {
      // Check category match
      const matchesCategory =
        activeCategory === "All Articles" ||
        item.category.toUpperCase() === activeCategory.toUpperCase() ||
        (activeCategory === "Tutorials" && item.category === "TUTORIALS") ||
        (activeCategory === "Case Studies" && item.category === "CASE STUDIES");

      // Check search match
      const matchesSearch =
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [mergedArticles, activeCategory, searchQuery]);

  const featuredArticle = filteredArticles.find((a) => a.featured) || filteredArticles[0] || ARTICLES_DATA[0];
  const gridArticles = filteredArticles.filter((a) => a.id !== featuredArticle?.id);

  return (
    <div className="bg-[#F8FAFC] text-[#0F172A]" id="articles">
      {/* ── TOP FILTER & SEARCH BAR ── */}
      <section className="bg-white border-y border-[#E2E8F0] sticky top-[60px] z-30 shadow-sm py-4">
        <div className="wrap max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Mobile Filter Toggle Button */}
          <div className="w-full lg:hidden flex items-center justify-between gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="flex-1 flex items-center justify-between px-4 py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-[13.5px] font-semibold text-[#0F172A]"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#0066FF]" />
                <span>Category: <span className="text-[#0066FF]">{activeCategory}</span></span>
              </span>
              <ChevronDown className={`w-4 h-4 text-[#64748B] transition-transform ${mobileFilterOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Desktop Filter Pills / Collapsible Mobile Pills */}
          <div className={`${mobileFilterOpen ? "flex" : "hidden"} lg:flex flex-wrap items-center gap-2 w-full lg:w-auto`}>
            {CATEGORIES_LIST.map((cat) => {
              const isActive = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => {
                    setActiveCategory(cat.name);
                    setMobileFilterOpen(false);
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold text-[13px] sm:text-[13.5px] transition-all whitespace-nowrap shadow-sm ${
                    isActive
                      ? "bg-[#0066FF] text-white shadow-[0_2px_10px_rgba(0,102,255,0.3)]"
                      : "bg-white border border-[#E2E8F0] text-[#475569] hover:border-[#0066FF] hover:text-[#0066FF]"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full lg:w-[260px] shrink-0">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-[#E2E8F0] bg-white text-[#0F172A] rounded-lg pl-3.5 pr-10 py-2 text-[13.5px] focus:outline-none focus:border-[#0066FF] placeholder:text-[#94A3B8] shadow-sm transition-colors"
            />
            <Search className="w-4 h-4 text-[#94A3B8] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

        </div>
      </section>

      {/* ── MAIN BODY CONTENT AREA ── */}
      <section className="py-12 sm:py-16">
        <div className="wrap max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-start">
          
          {/* ════ LEFT COLUMN: FEATURED + GRID + PAGINATION ════ */}
          <div className="flex flex-col gap-8 w-full min-w-0">
            
            {/* FEATURED ARTICLE CARD (If showing all or if featured matches) */}
            {featuredArticle && (
              <Link href={`/insights/${featuredArticle.slug}`} className="block group">
                <article className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
                  
                  {/* Left Graphic Block: RAG Schematic */}
                  <div className="md:col-span-6 h-[240px] sm:h-[280px] bg-[#060D1A] rounded-xl relative overflow-hidden border border-[#1E293B] flex items-center justify-center p-4 sm:p-6 shadow-inner select-none">
                    <div className="absolute top-4 left-4 bg-[#0066FF] text-white font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-md z-20">
                      FEATURED
                    </div>
                    
                    {/* Pipeline Mockup */}
                    <div className="w-full max-w-[360px] flex flex-col gap-6 relative z-10 text-white font-mono text-[10px]">
                      {/* Top Row */}
                      <div className="grid grid-cols-3 gap-3 items-center">
                        <div className="bg-[#0A111F] border border-[#1E293B] rounded-lg p-3 flex flex-col items-center justify-center text-center gap-1.5 shadow">
                          <FileText className="w-5 h-5 text-[#00B8F0]" />
                          <span>Document<br/>Ingestion</span>
                        </div>
                        <div className="flex items-center justify-center relative">
                          <ArrowRight className="w-4 h-4 text-[#00B8F0] absolute -left-1" />
                          <div className="bg-[#0A111F] border border-[#1E293B] rounded-lg p-3 flex flex-col items-center justify-center text-center gap-1.5 shadow w-full">
                            <Network className="w-5 h-5 text-[#0066FF]" />
                            <span>Chunking &<br/>Embedding</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-center relative">
                          <ArrowRight className="w-4 h-4 text-[#00B8F0] absolute -left-1" />
                          <div className="bg-[#0A111F] border border-[#00B8F0]/40 rounded-lg p-3 flex flex-col items-center justify-center text-center gap-1.5 shadow w-full bg-[#00B8F0]/10">
                            <Database className="w-5 h-5 text-[#00B8F0]" />
                            <span>Vector DB</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Row */}
                      <div className="grid grid-cols-4 gap-2 items-center pt-2 border-t border-[#1E293B]/60">
                        <div className="bg-[#0A111F] border border-[#1E293B] rounded-md p-2 flex flex-col items-center text-center gap-1">
                          <Search className="w-4 h-4 text-[#8A9EB0]" />
                          <span className="text-[9px]">Retrieval</span>
                        </div>
                        <div className="bg-[#0A111F] border border-[#1E293B] rounded-md p-2 flex flex-col items-center text-center gap-1 relative">
                          <ArrowRight className="w-3 h-3 text-[#64748B] absolute -left-1.5 top-1/2 -translate-y-1/2" />
                          <SlidersHorizontal className="w-4 h-4 text-[#00B8F0]" />
                          <span className="text-[9px]">Reranker</span>
                        </div>
                        <div className="bg-[#0A111F] border border-[#1E293B] rounded-md p-2 flex flex-col items-center text-center gap-1 relative">
                          <ArrowRight className="w-3 h-3 text-[#64748B] absolute -left-1.5 top-1/2 -translate-y-1/2" />
                          <Bot className="w-4 h-4 text-[#0066FF]" />
                          <span className="text-[9px]">LLM</span>
                        </div>
                        <div className="bg-[#0066FF] text-white rounded-md p-2 flex flex-col items-center text-center gap-1 relative shadow-md">
                          <ArrowRight className="w-3 h-3 text-[#64748B] absolute -left-1.5 top-1/2 -translate-y-1/2" />
                          <CheckCircle2 className="w-4 h-4 text-white" />
                          <span className="text-[9px]">Answer</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Content Block */}
                  <div className="md:col-span-6 flex flex-col justify-between h-full">
                    <div>
                      <div className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#0066FF] mb-2.5">
                        {featuredArticle.category}
                      </div>
                      <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#0F172A] group-hover:text-[#0066FF] transition-colors leading-snug mb-3">
                        {featuredArticle.title}
                      </h2>
                      <p className="text-[14px] sm:text-[14.5px] text-[#475569] leading-relaxed mb-6">
                        {featuredArticle.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-[#F1F5F9] mt-auto">
                      <div className="w-9 h-9 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold text-[13px] shadow-sm">
                        B
                      </div>
                      <div>
                        <div className="font-semibold text-[13.5px] text-[#0F172A]">
                          {featuredArticle.author}
                        </div>
                        <div className="text-[12px] text-[#64748B]">
                          {featuredArticle.date} · {featuredArticle.readTime}
                        </div>
                      </div>
                    </div>
                  </div>

                </article>
              </Link>
            )}

            {/* 2-COLUMN GRID OF ARTICLES */}
            {gridArticles.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center text-[#64748B]">
                No articles match your current search or filter. Try clearing your filters or search query.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {gridArticles.map((art) => (
                  <Link key={art.id} href={`/insights/${art.slug}`} className="block group h-full">
                    <article className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                      
                      {/* Top Dark Graphic Box */}
                      <div className="h-[200px] bg-[#060D1A] rounded-xl border border-[#1E293B] relative overflow-hidden p-4 flex items-center justify-center shadow-inner select-none">
                        
                        {/* Custom Visual Schematics based on visualType */}
                        {art.visualType === "agents-circle" && (
                          <div className="relative w-40 h-40 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border border-dashed border-[#00B8F0]/40 animate-spin-slow" />
                            <div className="w-14 h-14 rounded-full bg-[#0066FF] border-2 border-white/20 flex items-center justify-center text-white shadow-lg z-10">
                              <Bot className="w-7 h-7" />
                            </div>
                            {/* Surrounding Nodes */}
                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0A111F] border border-[#1E293B] flex items-center justify-center text-[#00B8F0]"><Users className="w-4 h-4"/></div>
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0A111F] border border-[#1E293B] flex items-center justify-center text-[#00B8F0]"><Terminal className="w-4 h-4"/></div>
                            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0A111F] border border-[#1E293B] flex items-center justify-center text-[#00B8F0]"><Database className="w-4 h-4"/></div>
                            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0A111F] border border-[#1E293B] flex items-center justify-center text-[#00B8F0]"><CheckCircle2 className="w-4 h-4"/></div>
                          </div>
                        )}

                        {art.visualType === "microservices-blocks" && (
                          <div className="grid grid-cols-3 gap-2.5 w-full max-w-[220px]">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                              <div key={i} className={`h-12 rounded-lg border flex items-center justify-center ${i % 2 === 0 ? "bg-[#0066FF]/20 border-[#0066FF] text-[#00B8F0]" : "bg-[#0A111F] border-[#1E293B] text-[#8A9EB0]"}`}>
                                <Layers className="w-5 h-5" />
                              </div>
                            ))}
                          </div>
                        )}

                        {art.visualType === "mlops-dashboard" && (
                          <div className="w-full h-full bg-[#0A111F] border border-[#1E293B] rounded-lg p-3.5 flex flex-col justify-between text-white font-mono text-[9px]">
                            <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
                              <span className="text-[#00B8F0] font-bold">LLM OBSERVABILITY</span>
                              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">ONLINE</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 my-2">
                              <div className="bg-[#060D1A] p-2 rounded border border-[#1E293B]">
                                <div className="text-[#64748B]">LATENCY</div>
                                <div className="text-[14px] font-bold text-white mt-0.5">142ms</div>
                              </div>
                              <div className="bg-[#060D1A] p-2 rounded border border-[#1E293B]">
                                <div className="text-[#64748B]">ACCURACY</div>
                                <div className="text-[14px] font-bold text-[#00B8F0] mt-0.5">98.4%</div>
                              </div>
                            </div>
                            {/* Bar mini chart */}
                            <div className="flex items-end gap-1.5 h-10 px-1 pt-1 border-t border-[#1E293B]">
                              <div className="w-full bg-[#0066FF] h-[60%] rounded-t-sm" />
                              <div className="w-full bg-[#00B8F0] h-[90%] rounded-t-sm" />
                              <div className="w-full bg-[#0066FF] h-[40%] rounded-t-sm" />
                              <div className="w-full bg-[#00B8F0] h-[75%] rounded-t-sm" />
                              <div className="w-full bg-[#0066FF] h-[100%] rounded-t-sm" />
                            </div>
                          </div>
                        )}

                        {art.visualType === "rag-hybrid" && (
                          <div className="flex flex-col gap-3 w-full max-w-[240px] text-white font-mono text-[10px]">
                            <div className="flex items-center justify-between gap-2">
                              <div className="bg-[#0A111F] border border-[#1E293B] px-3 py-2 rounded text-center flex-1">Dense Vector</div>
                              <div className="bg-[#0A111F] border border-[#1E293B] px-3 py-2 rounded text-center flex-1">Sparse BM25</div>
                            </div>
                            <div className="flex items-center justify-center">
                              <ArrowDownIcon className="w-4 h-4 text-[#00B8F0]" />
                            </div>
                            <div className="bg-[#0066FF] text-white py-2 rounded font-bold text-center shadow-md">
                              Cross-Encoder Reranker
                            </div>
                          </div>
                        )}

                        {art.visualType === "langgraph-flow" && (
                          <div className="flex items-center gap-2.5 text-white font-mono text-[10px]">
                            <div className="bg-[#0A111F] border border-[#1E293B] p-3 rounded-lg flex flex-col items-center gap-1 shadow">
                              <Bot className="w-5 h-5 text-[#00B8F0]" />
                              <span>LangGraph</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#8A9EB0]" />
                            <div className="bg-[#0A111F] border border-[#00B8F0]/40 p-3 rounded-lg flex flex-col items-center gap-1 shadow bg-[#00B8F0]/10">
                              <Code2 className="w-5 h-5 text-[#00B8F0]" />
                              <span>Tool Node</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#8A9EB0]" />
                            <div className="bg-[#0066FF] text-white p-3 rounded-lg flex flex-col items-center gap-1 shadow">
                              <CheckCircle2 className="w-5 h-5" />
                              <span>Output</span>
                            </div>
                          </div>
                        )}

                        {art.visualType === "open-source-hub" && (
                          <div className="relative flex items-center justify-center w-full h-full">
                            <div className="w-20 h-20 rounded-full bg-[#0A111F] border border-[#00B8F0]/50 flex items-center justify-center text-[#00B8F0] shadow-[0_0_25px_rgba(0,184,240,0.25)] z-10">
                              <GitBranch className="w-9 h-9" />
                            </div>
                            <div className="absolute inset-4 border border-dashed border-[#1E293B] rounded-full" />
                            <span className="absolute top-3 left-6 text-white font-mono text-[10px] bg-[#0A111F] px-2 py-0.5 rounded border border-[#1E293B]">botmartz/rag</span>
                            <span className="absolute bottom-3 right-6 text-[#00B8F0] font-mono text-[10px] bg-[#0A111F] px-2 py-0.5 rounded border border-[#1E293B]">botmartz/agent</span>
                          </div>
                        )}

                        {art.visualType === "prompt-blueprint" && (
                          <div className="w-full max-w-[220px] bg-[#0A111F] border border-[#1E293B] rounded-lg p-3 text-white font-mono text-[9.5px] space-y-1.5">
                            <div className="border-b border-[#1E293B] pb-1 text-[#00B8F0] font-bold">SYSTEM PROMPT</div>
                            <div className="bg-[#060D1A] p-1.5 rounded text-[#8A9EB0] flex items-center justify-between">
                              <span>User Role Setup</span>
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            </div>
                            <div className="bg-[#060D1A] p-1.5 rounded text-[#8A9EB0] flex items-center justify-between">
                              <span>Structured Guardrails</span>
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            </div>
                            <div className="bg-[#0066FF]/20 border border-[#0066FF]/40 p-1.5 rounded text-[#00B8F0] flex items-center justify-between font-semibold">
                              <span>JSON Schema Output</span>
                              <CheckCircle2 className="w-3 h-3 text-[#00B8F0]" />
                            </div>
                          </div>
                        )}

                        {art.visualType === "legal-doc-flow" && (
                          <div className="flex items-center gap-2 text-white font-mono text-[10px]">
                            <div className="bg-[#0A111F] border border-[#1E293B] p-2.5 rounded flex flex-col items-center gap-1 text-center">
                              <FileText className="w-5 h-5 text-[#8A9EB0]" />
                              <span className="text-[8.5px]">100K+ PDFs</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#00B8F0]" />
                            <div className="bg-[#0A111F] border border-[#00B8F0]/40 p-2.5 rounded flex flex-col items-center gap-1 text-center bg-[#00B8F0]/10">
                              <Cpu className="w-5 h-5 text-[#00B8F0]" />
                              <span className="text-[8.5px]">Clause AI</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#00B8F0]" />
                            <div className="bg-[#0066FF] p-2.5 rounded flex flex-col items-center gap-1 text-center text-white shadow">
                              <BarChart3 className="w-5 h-5" />
                              <span className="text-[8.5px]">Risk Report</span>
                            </div>
                          </div>
                        )}

                      </div>

                      {/* Bottom Content */}
                      <div className="pt-5 flex flex-col flex-1">
                        <div className="font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#0066FF] mb-1.5">
                          {art.category}
                        </div>
                        <h3 className="text-[18px] font-bold text-[#0F172A] mb-2.5 leading-snug group-hover:text-[#0066FF] transition-colors line-clamp-2">
                          {art.title}
                        </h3>
                        <p className="text-[13.5px] text-[#475569] mb-5 leading-relaxed line-clamp-3 flex-1">
                          {art.description}
                        </p>

                        {/* Author Footer */}
                        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[#F1F5F9]">
                          <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold text-[12px] shrink-0">
                            {art.author.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-semibold text-[#0F172A] truncate">
                              {art.author}
                            </div>
                            <div className="text-[11.5px] text-[#64748B]">
                              {art.date} · {art.readTime}
                            </div>
                          </div>
                        </div>
                      </div>

                    </article>
                  </Link>
                ))}
              </div>
            )}

            {/* PAGINATION BAR */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-[#E2E8F0]">
              <button
                disabled
                className="flex items-center gap-1.5 px-4 py-2 border border-[#E2E8F0] rounded-lg text-[#94A3B8] font-medium text-[13.5px] bg-white cursor-not-allowed shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <div className="flex items-center gap-1.5">
                <button className="w-9 h-9 rounded-lg bg-[#0066FF] text-white font-bold text-[13.5px] flex items-center justify-center shadow-sm">
                  1
                </button>
                <button className="w-9 h-9 rounded-lg border border-[#E2E8F0] bg-white text-[#475569] hover:border-[#0066FF] hover:text-[#0066FF] font-semibold text-[13.5px] flex items-center justify-center transition-all shadow-sm">
                  2
                </button>
                <button className="w-9 h-9 rounded-lg border border-[#E2E8F0] bg-white text-[#475569] hover:border-[#0066FF] hover:text-[#0066FF] font-semibold text-[13.5px] flex items-center justify-center transition-all shadow-sm hidden sm:flex">
                  3
                </button>
                <button className="w-9 h-9 rounded-lg border border-[#E2E8F0] bg-white text-[#475569] hover:border-[#0066FF] hover:text-[#0066FF] font-semibold text-[13.5px] flex items-center justify-center transition-all shadow-sm hidden sm:flex">
                  4
                </button>
                <button className="w-9 h-9 rounded-lg border border-[#E2E8F0] bg-white text-[#475569] hover:border-[#0066FF] hover:text-[#0066FF] font-semibold text-[13.5px] flex items-center justify-center transition-all shadow-sm hidden md:flex">
                  5
                </button>
                <span className="text-[#64748B] px-1 font-bold">...</span>
                <button className="w-9 h-9 rounded-lg border border-[#E2E8F0] bg-white text-[#475569] hover:border-[#0066FF] hover:text-[#0066FF] font-semibold text-[13.5px] flex items-center justify-center transition-all shadow-sm">
                  12
                </button>
              </div>

              <button className="flex items-center gap-1.5 px-4 py-2 border border-[#E2E8F0] rounded-lg text-[#0F172A] hover:border-[#0066FF] hover:text-[#0066FF] font-medium text-[13.5px] bg-white transition-all shadow-sm">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* ════ RIGHT COLUMN: SIDEBAR WIDGETS ════ */}
          <aside className="w-full lg:w-[340px] shrink-0 space-y-6 lg:sticky lg:top-28">
            
            {/* WIDGET 1: POPULAR ARTICLES */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
              <div className="font-mono text-[11px] font-bold tracking-[0.16em] text-[#0066FF] uppercase mb-6">
                POPULAR ARTICLES
              </div>
              <div className="space-y-5">
                {POPULAR_ARTICLES.map((art, idx) => {
                  const matchingArt = mergedArticles.find(m => m.title.includes(art.title) || m.id === art.id);
                  const href = matchingArt ? `/insights/${matchingArt.slug}` : "/contact";
                  return (
                    <Link key={art.id} href={href} className="flex items-center gap-4 group block">
                      <div className="w-14 h-12 rounded-lg bg-[#060D1A] border border-[#1E293B] relative flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                        <div className="absolute top-1 left-1 w-4.5 h-4.5 rounded-full bg-[#0066FF] text-white text-[10px] font-bold flex items-center justify-center shadow z-10">
                          {idx + 1}
                        </div>
                        <Network className="w-5 h-5 text-[#8A9EB0] group-hover:text-[#00B8F0] transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-[13.5px] text-[#0F172A] group-hover:text-[#0066FF] transition-colors leading-snug line-clamp-2">
                          {art.title}
                        </h4>
                        <div className="text-[12px] text-[#64748B] mt-1">
                          {art.date}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* WIDGET 2: CATEGORIES */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
              <div className="font-mono text-[11px] font-bold tracking-[0.16em] text-[#0066FF] uppercase mb-5">
                CATEGORIES
              </div>
              <ul className="space-y-1">
                {CATEGORIES_LIST.filter(c => !c.isAll).map((cat, idx) => {
                  const IconComponent = cat.icon || BookOpen;
                  return (
                    <li key={idx}>
                      <button
                        onClick={() => setActiveCategory(cat.name)}
                        className="w-full flex items-center justify-between py-2.5 px-2 rounded-lg text-[13.5px] text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0066FF] transition-all group border-b border-[#F1F5F9] last:border-0"
                      >
                        <span className="flex items-center gap-2.5 font-medium">
                          <IconComponent className="w-4 h-4 text-[#64748B] group-hover:text-[#0066FF] transition-colors" />
                          {cat.name}
                        </span>
                        <span className="font-mono text-[13px] text-[#64748B] group-hover:text-[#0066FF] font-semibold">
                          {cat.count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* WIDGET 3: STAY IN THE LOOP */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
              <div className="font-mono text-[11px] font-bold tracking-[0.16em] text-[#0066FF] uppercase mb-3">
                STAY IN THE LOOP
              </div>
              <p className="text-[13px] text-[#475569] mb-4 leading-relaxed">
                Get the latest engineering insights, tutorials, and updates from our lab.
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-[13.5px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0066FF] mb-3 shadow-sm transition-colors"
              />
              <button className="w-full py-2.5 rounded-xl bg-[#0066FF] text-white font-semibold text-[13.5px] hover:bg-[#0052CC] transition-colors shadow-sm">
                Subscribe
              </button>
              <div className="text-[11px] text-[#64748B] text-center mt-2.5">
                No spam. Unsubscribe anytime.
              </div>
            </div>

            {/* WIDGET 4: RESOURCES */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
              <div className="font-mono text-[11px] font-bold tracking-[0.16em] text-[#0066FF] uppercase mb-4">
                RESOURCES
              </div>
              <ul className="space-y-3">
                {[
                  { label: "Engineering Handbook", icon: BookOpen, href: "/contact" },
                  { label: "System Design Patterns", icon: Layers, href: "/contact" },
                  { label: "AI Engineering Roadmap", icon: Network, href: "/contact" },
                  { label: "Open Source @ Botmartz", icon: Code2, href: "/contact" },
                  { label: "YouTube Channel", icon: PlayCircle, href: "/contact" },
                ].map((res, i) => (
                  <li key={i}>
                    <Link
                      href={res.href}
                      className="flex items-center justify-between p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#0066FF] hover:bg-white transition-all group shadow-sm"
                    >
                      <span className="flex items-center gap-2.5 text-[13.5px] font-semibold text-[#0F172A] group-hover:text-[#0066FF] transition-colors">
                        <res.icon className="w-4 h-4 text-[#64748B] group-hover:text-[#0066FF] transition-colors" />
                        {res.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-[#0066FF] group-hover:translate-x-1 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </aside>

        </div>
      </section>
    </div>
  );
}

function ArrowDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}
