"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  SlidersHorizontal, 
  ChevronDown, 
  BookOpen, 
  Code, 
  Github, 
  Terminal, 
  ExternalLink,
  Bot, 
  Users, 
  Database, 
  Layers, 
  CheckCircle2,
  FileText
} from "lucide-react";

interface ArticleItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  slug: string;
  author: string;
  createdAt: string;
  readTime: number;
  featuredImage?: string;
  colabLink?: string;
  githubLink?: string;
  failureModes?: number;
  codeSnippets?: number;
  runnableNotebooks?: number;
  tags?: string[];
  visualType?: string;
}

const STATIC_FALLBACK_ARTICLES: ArticleItem[] = [
  {
    id: "building-a-scalable-enterprise-rag-system-architecture-components-best-practices",
    slug: "building-a-scalable-enterprise-rag-system-architecture-components-best-practices",
    title: "Building a Scalable Enterprise RAG System: Architecture, Components & Best Practices",
    category: "Enterprise RAG",
    excerpt: "A complete blueprint for building production-ready RAG systems that are secure, accurate, and scalable for enterprise workloads.",
    author: "Botmartz Engineering Team",
    createdAt: "2024-05-12T00:00:00.000Z",
    readTime: 12,
    failureModes: 5,
    codeSnippets: 3,
    runnableNotebooks: 1,
    colabLink: "https://colab.research.google.com/",
    githubLink: "https://github.com/botmartz",
    tags: ["RAG", "Production AI", "LangChain", "Evaluation"],
    visualType: "rag-featured"
  },
  {
    id: "inside-ai-agents-from-reasoning-to-real-world-action",
    slug: "inside-ai-agents-from-reasoning-to-real-world-action",
    title: "Inside AI Agents: From Reasoning to Real-World Action",
    category: "AI Agents",
    excerpt: "Explore the core components of AI agents, including planning, tool calling, memory, and evaluation.",
    author: "Soham Sharma",
    createdAt: "2024-05-08T00:00:00.000Z",
    readTime: 9,
    failureModes: 3,
    codeSnippets: 2,
    runnableNotebooks: 0,
    colabLink: "",
    githubLink: "https://github.com/botmartz",
    tags: ["AI Agents", "LangGraph", "Reasoning"],
    visualType: "agents-circle"
  },
  {
    id: "microservices-vs-monolith-for-ai-systems-what-we-learned",
    slug: "microservices-vs-monolith-for-ai-systems-what-we-learned",
    title: "Microservices vs Monolith for AI Systems: What We Learned",
    category: "Architecture",
    excerpt: "A practical comparison based on real production deployments and scalability requirements.",
    author: "Renee D.",
    createdAt: "2024-05-05T00:00:00.000Z",
    readTime: 7,
    failureModes: 0,
    codeSnippets: 0,
    runnableNotebooks: 0,
    tags: ["Microservices", "Architecture", "MLOps"],
    visualType: "microservices-blocks"
  },
  {
    id: "observability-for-llm-applications-metrics-that-matter",
    slug: "observability-for-llm-applications-metrics-that-matter",
    title: "Observability for LLM Applications: Metrics That Matter",
    category: "MLOps",
    excerpt: "Key metrics, dashboards and alerts to monitor LLM apps in production and ensure reliability.",
    author: "Harish R.",
    createdAt: "2024-04-30T00:00:00.000Z",
    readTime: 8,
    failureModes: 4,
    codeSnippets: 1,
    runnableNotebooks: 0,
    tags: ["MLOps", "Observability", "Monitoring"],
    visualType: "mlops-dashboard"
  },
  {
    id: "advanced-rag-techniques-hybrid-search-reranking-query-rewriting",
    slug: "advanced-rag-techniques-hybrid-search-reranking-query-rewriting",
    title: "Advanced RAG Techniques: Hybrid Search, Reranking & Query Rewriting",
    category: "Enterprise RAG",
    excerpt: "Improve retrieval accuracy and reduce hallucinations with hybrid search, rerankers, and LLM-based query rewriting.",
    author: "Botmartz Team",
    createdAt: "2024-04-25T00:00:00.000Z",
    readTime: 10,
    failureModes: 6,
    codeSnippets: 4,
    runnableNotebooks: 1,
    colabLink: "https://colab.research.google.com/",
    tags: ["RAG", "Reranker", "BM25"],
    visualType: "rag-hybrid"
  }
];

export default function InsightsUpdatesClient({ initialArticles }: { initialArticles?: any[] }) {
  const [activeFilter, setActiveFilter] = useState<string>("All Updates");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const combinedArticles = useMemo(() => {
    const dynamic: ArticleItem[] = (initialArticles || []).map(art => ({
      id: art.id,
      title: art.title,
      slug: art.slug || art.id,
      excerpt: art.excerpt || "",
      category: art.category || "Technology",
      author: art.author || "AI Team",
      createdAt: art.createdAt || new Date().toISOString(),
      readTime: art.readTime || 5,
      featuredImage: art.featuredImage || "",
      colabLink: art.colabLink || "",
      githubLink: art.githubLink || "",
      failureModes: art.failureModes || 0,
      codeSnippets: art.codeSnippets || 0,
      runnableNotebooks: art.runnableNotebooks || 0,
      tags: art.tags || [],
      visualType: art.visualType || "rag-featured"
    }));

    const dynamicSlugs = new Set(dynamic.map(d => d.slug));
    const filteredStatic = STATIC_FALLBACK_ARTICLES.filter(s => !dynamicSlugs.has(s.slug));

    return [...dynamic, ...filteredStatic];
  }, [initialArticles]);

  // Extract all unique categories
  const categoriesList = useMemo(() => {
    const list = new Set(combinedArticles.map(a => a.category));
    return ["All Updates", ...Array.from(list)];
  }, [combinedArticles]);

  // Extract all unique tags
  const tagsList = useMemo(() => {
    const list = new Set<string>();
    combinedArticles.forEach(a => {
      if (Array.isArray(a.tags)) {
        a.tags.forEach(t => list.add(t));
      }
    });
    return Array.from(list);
  }, [combinedArticles]);

  const filteredArticles = useMemo(() => {
    return combinedArticles.filter(art => {
      // Category filter check
      if (activeFilter !== "All Updates") {
        if (art.category.toUpperCase() !== activeFilter.toUpperCase()) return false;
      }

      // Sidebar tag filter check
      if (selectedTag && (!art.tags || !art.tags.includes(selectedTag))) return false;

      // Search match check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = art.title.toLowerCase().includes(query);
        const matchesExcerpt = art.excerpt.toLowerCase().includes(query);
        const matchesAuthor = art.author.toLowerCase().includes(query);
        const matchesCategory = art.category.toLowerCase().includes(query);
        
        if (!matchesTitle && !matchesExcerpt && !matchesAuthor && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  }, [activeFilter, selectedTag, searchQuery, combinedArticles]);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    } catch {
      return "N/A";
    }
  };

  const renderVisual = (visualType?: string) => {
    switch (visualType) {
      case "agents-circle":
        return (
          <div className="relative w-36 h-36 flex items-center justify-center scale-90">
            <div className="absolute inset-0 rounded-full border border-dashed border-[#00B8F0]/40 animate-spin-slow" />
            <div className="w-12 h-12 rounded-full bg-[#0066FF] border border-white/15 flex items-center justify-center text-white shadow-lg z-10">
              <Bot className="w-6 h-6" />
            </div>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#0A111F] border border-[#1E293B] flex items-center justify-center text-[#00B8F0]"><Users className="w-3.5 h-3.5"/></div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#0A111F] border border-[#1E293B] flex items-center justify-center text-[#00B8F0]"><Terminal className="w-3.5 h-3.5"/></div>
            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-7 h-7 rounded-full bg-[#0A111F] border border-[#1E293B] flex items-center justify-center text-[#00B8F0]"><Database className="w-3.5 h-3.5"/></div>
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-7 h-7 rounded-full bg-[#0A111F] border border-[#1E293B] flex items-center justify-center text-[#00B8F0]"><CheckCircle2 className="w-3.5 h-3.5"/></div>
          </div>
        );
      case "microservices-blocks":
        return (
          <div className="grid grid-cols-3 gap-2 w-full max-w-[200px] scale-95">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`h-10 rounded-lg border flex items-center justify-center ${i % 2 === 0 ? "bg-[#0066FF]/20 border-[#0066FF] text-[#00B8F0]" : "bg-[#0A111F] border-[#1E293B] text-[#8A9EB0]"}`}>
                <Layers className="w-4 h-4" />
              </div>
            ))}
          </div>
        );
      case "mlops-dashboard":
        return (
          <div className="w-full h-full max-h-[160px] bg-[#0A111F] border border-[#1E293B] rounded-lg p-3 flex flex-col justify-between text-white font-mono text-[8px] scale-95">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-1.5">
              <span className="text-[#00B8F0] font-bold">OBSERVABILITY</span>
              <span className="px-1 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[7px]">ACTIVE</span>
            </div>
            <div className="grid grid-cols-2 gap-2 my-1.5">
              <div className="bg-[#060D1A] p-1.5 rounded border border-[#1E293B]">
                <div className="text-[#64748B] text-[7px]">LATENCY</div>
                <div className="text-[11px] font-bold text-white mt-0.5">142ms</div>
              </div>
              <div className="bg-[#060D1A] p-1.5 rounded border border-[#1E293B]">
                <div className="text-[#64748B] text-[7px]">ACCURACY</div>
                <div className="text-[11px] font-bold text-[#00B8F0] mt-0.5">98.4%</div>
              </div>
            </div>
            <div className="flex items-end gap-1 h-8 pt-1 border-t border-[#1E293B]">
              <div className="w-full bg-[#0066FF] h-[60%] rounded-t-sm" />
              <div className="w-full bg-[#00B8F0] h-[90%] rounded-t-sm" />
              <div className="w-full bg-[#0066FF] h-[40%] rounded-t-sm" />
              <div className="w-full bg-[#00B8F0] h-[75%] rounded-t-sm" />
            </div>
          </div>
        );
      case "rag-hybrid":
        return (
          <div className="flex flex-col gap-2 w-full max-w-[200px] text-white font-mono text-[8.5px] scale-95">
            <div className="flex items-center justify-between gap-1.5">
              <div className="bg-[#0A111F] border border-[#1E293B] py-1 rounded text-center flex-1">Dense Vector</div>
              <div className="bg-[#0A111F] border border-[#1E293B] py-1 rounded text-center flex-1">BM25</div>
            </div>
            <div className="flex justify-center text-slate-500">↓</div>
            <div className="bg-[#0066FF] text-white py-1.5 rounded font-bold text-center shadow-md">
              Reranker
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full max-w-[320px] flex flex-col gap-5 text-white font-mono text-[8.5px] scale-90">
            <div className="grid grid-cols-3 gap-2 items-center">
              <div className="bg-[#0A111F] border border-[#1E293B] rounded-lg p-2.5 flex flex-col items-center justify-center text-center gap-1 shadow">
                <FileText className="w-4 h-4 text-[#00B8F0]" />
                <span>Ingestion</span>
              </div>
              <div className="bg-[#0A111F] border border-[#1E293B] rounded-lg p-2.5 flex flex-col items-center justify-center text-center gap-1 shadow relative">
                <ArrowRight className="w-3 h-3 text-[#00B8F0] absolute -left-1.5 top-1/2 -translate-y-1/2" />
                <Layers className="w-4 h-4 text-[#0066FF]" />
                <span>Chunking</span>
              </div>
              <div className="bg-[#0A111F] border border-[#00B8F0]/40 rounded-lg p-2.5 flex flex-col items-center justify-center text-center gap-1 shadow bg-[#00B8F0]/10 relative">
                <ArrowRight className="w-3 h-3 text-[#00B8F0] absolute -left-1.5 top-1/2 -translate-y-1/2" />
                <Database className="w-4 h-4 text-[#00B8F0]" />
                <span>Vector DB</span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="bg-[#050B14] min-h-screen text-white">
      {/* HERO SECTION */}
      <section className="relative pt-[110px] pb-[90px] bg-[#050B14] text-white overflow-hidden border-b border-white/5">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-5%] w-[60%] h-[60%] bg-[#0066FF]/15 blur-[160px] rounded-full pointer-events-none" />

        <div className="wrap relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[13px] font-mono mb-12 text-[#8A9EB0]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/40">&gt;</span>
            <Link href="/insights" className="hover:text-white transition-colors">Insights</Link>
            <span className="text-white/40">&gt;</span>
            <span className="text-white font-medium">New Updates</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <div className="font-mono text-[12px] tracking-[0.16em] text-[#00B8F0] uppercase font-bold mb-5">
                TECHNICAL UPDATES
              </div>
              <h1 className="text-[34px] sm:text-[48px] lg:text-[54px] leading-[1.08] font-bold mb-6 tracking-tight text-white">
                Engineering Logs.<br />
                <span className="text-[#0088FF]">Real-Time</span> Updates.
              </h1>
              <p className="text-[16px] sm:text-[18px] text-[#8A9EB0] mb-9 max-w-[500px] leading-relaxed font-normal">
                Explore our latest releases, technical guides, system changes, and AI development updates straight from our engineering team.
              </p>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#0066FF]/25 blur-[120px] rounded-full pointer-events-none z-0" />
              <div className="w-full max-w-[550px] bg-[#0A111F]/60 border border-white/10 rounded-2xl p-6 relative z-10 backdrop-blur-md shadow-2xl flex flex-col gap-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[#00B8F0] font-bold">RELEASE CONTROL</span>
                  <span className="text-emerald-400 animate-pulse">● LIVE UPDATES</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-[#8A9EB0]">
                    <span>Total Logs:</span>
                    <span className="text-white font-bold">{combinedArticles.length} Articles</span>
                  </div>
                  <div className="flex justify-between text-[#8A9EB0]">
                    <span>Pipeline Status:</span>
                    <span className="text-emerald-400">Green / Building</span>
                  </div>
                  <div className="flex justify-between text-[#8A9EB0]">
                    <span>Observability Level:</span>
                    <span className="text-white">Enterprise RAG / Agents</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* SECTION 2: ARTICLES INTERACTIVE LISTING */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <section className="py-[60px] sm:py-[80px] bg-[#F8FAFC] text-[#0F172A]">
        <div className="wrap max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden w-full mb-6 flex items-center justify-between px-4.5 py-3.5 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] font-semibold text-[14px] shadow-sm hover:border-[#0066FF] transition-all"
          >
            <span className="flex items-center gap-2.5">
              <SlidersHorizontal className="w-4 h-4 text-[#0066FF]" />
              <span>Filter Articles <span className="text-[#64748B] font-normal">(Category & Tags)</span></span>
            </span>
            <ChevronDown className={`w-4 h-4 text-[#64748B] transition-transform duration-200 ${mobileSidebarOpen ? "rotate-180 text-[#0066FF]" : ""}`} />
          </button>

          {/* Main Grid: Left Sidebar + Right Articles Column */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-10 items-start">
            
            {/* ── LEFT SIDEBAR ── */}
            <aside className={`${mobileSidebarOpen ? "block" : "hidden"} lg:block bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-sm relative lg:sticky lg:top-28 z-20`}>
              <div className="font-mono text-[11px] font-bold tracking-[0.16em] text-[#0066FF] uppercase mb-6">
                FILTERS
              </div>

              {/* By Category */}
              <div className="mb-7">
                <h3 className="text-[14px] font-bold text-[#0F172A] mb-3.5">Category</h3>
                <ul className="space-y-2.5">
                  {categoriesList.map((cat, idx) => {
                    const isActive = activeFilter === cat;
                    return (
                      <li key={idx}>
                        <button
                          onClick={() => {
                            setActiveFilter(cat);
                            setSelectedTag(null);
                          }}
                          className={`w-full flex items-center gap-2.5 text-[13.5px] font-medium transition-colors text-left ${
                            isActive ? "text-[#0066FF] font-semibold" : "text-[#475569] hover:text-[#0F172A]"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                            isActive ? "border-[#0066FF] bg-[#EFF6FF]" : "border-[#CBD5E1]"
                          }`}>
                            {isActive && <div className="w-2 h-2 rounded-full bg-[#0066FF]" />}
                          </div>
                          {cat}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* By Tags */}
              <div className="mb-7 pt-6 border-t border-[#F1F5F9]">
                <h3 className="text-[14px] font-bold text-[#0F172A] mb-3.5">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tagsList.map((tag, idx) => {
                    const isSelected = selectedTag === tag;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedTag(prev => prev === tag ? null : tag)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                          isSelected 
                            ? "bg-[#0066FF] border-[#0066FF] text-white" 
                            : "bg-slate-50 border-[#E2E8F0] text-[#475569] hover:border-[#0066FF] hover:text-[#0066FF]"
                        }`}
                      >
                        #{tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* ── RIGHT COLUMN: SEARCH + CARDS GRID ── */}
            <div className="flex flex-col gap-6">
              
              {/* Search Bar */}
              <div className="relative w-full">
                <Search className="w-4.5 h-4.5 text-[#94A3B8] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search articles by title, content details, author, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl pl-12 pr-5 py-3.5 text-[14.5px] text-[#0F172A] focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]/20 placeholder:text-[#94A3B8] shadow-sm transition-all"
                />
              </div>

              {/* Grid Layout of Cards */}
              {filteredArticles.length === 0 ? (
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-16 text-center text-[#64748B]">
                  <BookOpen className="w-10 h-10 mx-auto text-[#CBD5E1] mb-4" />
                  <p className="font-semibold text-lg text-[#334155] mb-1">No Articles Found</p>
                  <p className="text-sm">Try adjusting your filters or search query.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {filteredArticles.map((art) => (
                    <article key={art.id} className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full group">
                      
                      {/* Top Visual Panel */}
                      <div className="h-[180px] bg-[#060D1A] flex items-center justify-center p-4 relative overflow-hidden select-none border-b border-[#E2E8F0]">
                        <div className="absolute top-3 left-3 bg-[#0066FF] text-white font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm z-10">
                          {art.category}
                        </div>
                        {renderVisual(art.visualType)}
                      </div>

                      {/* Content Panel */}
                      <div className="p-5 sm:p-6 flex flex-col flex-1">
                        
                        {/* Meta Row */}
                        <div className="flex items-center gap-3 text-xs text-[#64748B] mb-3 font-semibold font-mono">
                          <span>{art.author}</span>
                          <span>•</span>
                          <span>{formatDate(art.createdAt)}</span>
                          <span>•</span>
                          <span>{art.readTime} min read</span>
                        </div>

                        {/* Title and Excerpt */}
                        <Link href={`/insights/${art.slug}`} className="block group-hover:text-[#0066FF] transition-colors">
                          <h2 className="text-[17px] sm:text-[19px] font-bold text-[#0F172A] mb-3 leading-snug group-hover:text-[#0066FF] transition-colors">
                            {art.title}
                          </h2>
                        </Link>
                        <p className="text-[13.5px] text-[#475569] leading-relaxed mb-5 line-clamp-3">
                          {art.excerpt}
                        </p>

                        {/* Dynamic Metrics Row */}
                        {(art.failureModes !== undefined && art.failureModes > 0 || 
                          art.codeSnippets !== undefined && art.codeSnippets > 0 || 
                          art.runnableNotebooks !== undefined && art.runnableNotebooks > 0) && (
                          <div className="grid grid-cols-3 gap-2.5 py-4 border-y border-[#F1F5F9] my-4 text-center">
                            {art.failureModes !== undefined && art.failureModes > 0 && (
                              <div className="bg-[#EFF6FF] border border-[#BFDBFE]/40 rounded-xl p-2.5">
                                <p className="text-[15px] font-extrabold text-[#0066FF]">{art.failureModes}</p>
                                <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider mt-0.5">Failure Modes</p>
                              </div>
                            )}
                            {art.codeSnippets !== undefined && art.codeSnippets > 0 && (
                              <div className="bg-slate-50 border border-[#E2E8F0]/80 rounded-xl p-2.5">
                                <p className="text-[15px] font-extrabold text-[#334155]">{art.codeSnippets}</p>
                                <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider mt-0.5">Code Snippets</p>
                              </div>
                            )}
                            {art.runnableNotebooks !== undefined && art.runnableNotebooks > 0 && (
                              <div className="bg-emerald-50/60 border border-[#A7F3D0]/40 rounded-xl p-2.5">
                                <p className="text-[15px] font-extrabold text-[#059669]">{art.runnableNotebooks}</p>
                                <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider mt-0.5">Colab Notebooks</p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Tags list */}
                        {Array.isArray(art.tags) && art.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {art.tags.slice(0, 4).map((tag, tIdx) => (
                              <span key={tIdx} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-semibold">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Actions Row */}
                        <div className="mt-auto pt-4 border-t border-[#F1F5F9] flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            {art.githubLink && (
                              <a 
                                href={art.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-[#0066FF]/10 hover:text-[#0066FF] transition-all flex items-center justify-center text-[#475569]"
                                title="View GitHub Code"
                              >
                                <Github className="w-4 h-4" />
                              </a>
                            )}
                            {art.colabLink && (
                              <a 
                                href={art.colabLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-[#FFF7ED] hover:bg-orange-500/10 hover:text-orange-500 transition-all flex items-center justify-center text-orange-600 font-mono text-[9px] font-bold"
                                title="Run Google Colab"
                              >
                                Colab
                              </a>
                            )}
                          </div>

                          <Link 
                            href={`/insights/${art.slug}`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066FF] hover:text-[#0052CC] transition-colors"
                          >
                            Read Article <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>

                      </div>
                    </article>
                  ))}
                </div>
              )}

            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
