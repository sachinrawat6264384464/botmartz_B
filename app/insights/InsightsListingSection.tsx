"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  id: number | string;
  title: string;
  category: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  slug?: string;
  featured?: boolean;
  visualType?: "rag-featured" | "agents-circle" | "microservices-blocks" | "mlops-dashboard" | "rag-hybrid" | "langgraph-flow" | "open-source-hub" | "prompt-blueprint" | "legal-doc-flow";
  featuredImage?: string;
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
    slug: "building-a-scalable-enterprise-rag-system-architecture-components-best-practices",
    visualType: "rag-featured",
    featuredImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Inside AI Agents: From Reasoning to Real-World Action",
    category: "AI AGENTS",
    description: "Explore the core components of AI agents, including planning, tool calling, memory, and evaluation.",
    author: "Soham Sharma",
    date: "May 8, 2024",
    readTime: "9 min read",
    slug: "inside-ai-agents-from-reasoning-to-real-world-action",
    visualType: "agents-circle",
    featuredImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    title: "Observability for LLM Applications: Metrics That Matter",
    category: "MLOPS",
    description: "Key metrics, dashboards and alerts to monitor LLM apps in production and ensure reliability.",
    author: "Harish R.",
    date: "Apr 30, 2024",
    readTime: "8 min read",
    slug: "observability-for-llm-applications-metrics-that-matter",
    visualType: "mlops-dashboard",
    featuredImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80"
  }
];

const CATEGORIES_LIST = [
  { name: "All Articles", count: 3, isAll: true },
  { name: "Enterprise RAG", count: 1, icon: Database },
  { name: "AI Agents", count: 1, icon: Bot },
  { name: "MLOps", count: 1, icon: BarChart3 },
];

const POPULAR_ARTICLES = [
  { id: 1, title: "Building a Scalable Enterprise RAG System", date: "May 12, 2024", visual: "rag" },
  { id: 2, title: "Inside AI Agents: From Reasoning to Real-World Action", date: "May 8, 2024", visual: "agents" },
  { id: 4, title: "Observability for LLM Applications: Metrics That Matter", date: "Apr 30, 2024", visual: "mlops" },
];

const generateSlugRaw = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

const getAuthorInitials = (author?: string) => {
  if (!author) return "B";
  const parts = author.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export default function InsightsListingSection({ dbArticles = [] }: { dbArticles?: any[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All Articles");
  const [searchQuery, setSearchQuery] = useState<string>("" );
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const mergedArticles = useMemo(() => {
    const formattedDb = dbArticles
      .map((art: any) => ({
        id: art.id,
        title: art.title,
        category: art.category?.toUpperCase() || "AI ENGINEERING",
        description: art.excerpt || art.description || "",
        author: art.author || "Botmartz Team",
        date: art.createdAt ? new Date(art.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent",
        readTime: `${art.readTime || 8} min read`,
        slug: art.slug || generateSlugRaw(art.title),
        featured: !!art.featured,
        visualType: (art.visualType || "mlops-dashboard") as any,
        featuredImage: art.featuredImage || art.image || art.coverImage || "",
      }));

    // Only display articles actually published in the database (or fallback if DB is completely empty)
    if (formattedDb.length > 0) {
      return formattedDb;
    }

    return ARTICLES_DATA;
  }, [dbArticles]);

  const categoriesList = useMemo(() => {
    const counts: Record<string, number> = {};
    mergedArticles.forEach((a) => {
      const cat = (a.category || "AI ENGINEERING").trim().toUpperCase();
      counts[cat] = (counts[cat] || 0) + 1;
    });
    const list = Object.entries(counts).map(([name, count]) => ({
      name,
      count,
    }));
    return [
      { name: "All Articles", count: mergedArticles.length, isAll: true },
      ...list,
    ];
  }, [mergedArticles]);

  // Filter logic
  const filteredArticles = useMemo(() => {
    return mergedArticles.filter((item) => {
      const matchesCategory =
        activeCategory === "All Articles" ||
        item.category.toUpperCase() === activeCategory.toUpperCase();

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

  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 6;
  
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(gridArticles.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedGridArticles = useMemo(() => {
    return gridArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [gridArticles, startIndex]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const element = document.getElementById("articles");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getPaginationItems = () => {
    const items: Array<{ type: 'page' | 'ellipsis'; value: number | string; key: string }> = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        items.push({ type: 'page', value: i, key: `page-${i}` });
      }
    } else {
      items.push({ type: 'page', value: 1, key: 'page-1' });
      if (currentPage > 3) {
        items.push({ type: 'ellipsis', value: '...', key: 'ellipsis-start' });
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        items.push({ type: 'page', value: i, key: `page-${i}` });
      }
      
      if (currentPage < totalPages - 2) {
        items.push({ type: 'ellipsis', value: '...', key: 'ellipsis-end' });
      }
      items.push({ type: 'page', value: totalPages, key: `page-${totalPages}` });
    }

    // Deduplicate any keys defensively
    return items.filter((item, index, self) => 
      index === self.findIndex((t) => t.key === item.key)
    );
  };

  return (
    <div className="bg-white text-[#E2E8F0] min-h-screen">
      {/* FEATURED HERO CARD AT TOP OF LISTING */}
      {featuredArticle && (
        <section id="articles" className="py-12 bg-white border-b border-slate-200">
          <div className="wrap max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00B8F0] animate-pulse"></span>
              Featured Insight
            </div>
            <Link
              href={`/insights/${featuredArticle.slug || featuredArticle.id}`}
              className="group block bg-white border border-slate-200 hover:border-[#00B8F0] rounded-2xl overflow-hidden transition-all duration-300 shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 p-6 sm:p-10 items-center">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap mb-4">
                      <span className="bg-[#00B8F0]/10 border border-[#00B8F0]/30 text-[#00B8F0] font-mono text-[11px] font-semibold px-3 py-1 rounded-full uppercase">
                        {featuredArticle.category}
                      </span>
                      <span className="text-xs text-slate-600 font-mono">{featuredArticle.date}</span>
                      <span className="text-xs text-slate-600 font-mono">· {featuredArticle.readTime}</span>
                    </div>
                    <h2 className="text-[24px] sm:text-[32px] font-semibold leading-[1.25] text-slate-900 group-hover:text-[#00B8F0] transition-colors tracking-tight mb-4">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-[15px] sm:text-[16px] leading-[1.65] text-slate-600 mb-6">
                      {featuredArticle.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#007BFF] to-[#00C6FF] text-white flex items-center justify-center font-bold text-[11.5px] shadow-sm shrink-0">
                        {getAuthorInitials(featuredArticle.author)}
                      </div>
                      <span className="text-sm font-medium text-slate-900">{featuredArticle.author}</span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#00B8F0] group-hover:gap-3 transition-all">
                      Read Full Blueprint <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
                
                {/* Visual Preview Banner */}
                <div className={`bg-slate-50 border border-slate-200 rounded-xl h-full min-h-[280px] flex items-center justify-center relative overflow-hidden group-hover:border-[#00B8F0]/40 transition-colors ${featuredArticle.featuredImage ? '' : 'p-6'}`}>
                  {featuredArticle.featuredImage ? (
                    <div className="relative w-full h-full min-h-[280px] overflow-hidden">
                      <img
                        src={featuredArticle.featuredImage}
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                    </div>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,184,240,0.1),transparent_70%)] pointer-events-none" />
                      <div className="text-center relative z-10 p-4">
                        <Database className="w-12 h-12 text-[#00B8F0] mx-auto mb-3 opacity-80" />
                        <div className="font-mono text-xs text-slate-600 uppercase tracking-wider mb-1">Architecture Diagram</div>
                        <div className="font-semibold text-sm text-slate-900 max-w-[260px] mx-auto">{featuredArticle.title}</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* STICKY FILTER & SEARCH BAR */}
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
            {categoriesList.map((cat, idx) => {
              const isActive = activeCategory === cat.name;
              return (
                <button
                  key={`cat-pill-${cat.name}-${idx}`}
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
                  
                  {/* Left Graphic Block: RAG Schematic or Featured Image */}
                  <div className={`md:col-span-6 h-[240px] sm:h-[280px] bg-slate-50 rounded-xl relative overflow-hidden border border-slate-200 flex items-center justify-center shadow-inner select-none ${featuredArticle.featuredImage ? '' : 'p-4 sm:p-6'}`}>
                    <div className="absolute top-4 left-4 bg-[#0066FF] text-white font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-md z-20">
                      FEATURED
                    </div>
                    
                    {featuredArticle.featuredImage ? (
                      <div className="relative w-full h-full overflow-hidden">
                        <img
                          src={featuredArticle.featuredImage}
                          alt={featuredArticle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                      </div>
                    ) : (
                      /* Pipeline Mockup */
                      <div className="w-full max-w-[360px] flex flex-col gap-6 relative z-10 text-slate-900 font-mono text-[10px]">
                        {/* Top Row */}
                        <div className="grid grid-cols-3 gap-3 items-center">
                          <div className="bg-white border border-slate-200 rounded-lg p-3 flex flex-col items-center justify-center text-center gap-1.5 shadow">
                            <FileText className="w-5 h-5 text-[#00B8F0]" />
                            <span>Document<br/>Ingestion</span>
                          </div>
                          <div className="flex items-center justify-center relative">
                            <ArrowRight className="w-4 h-4 text-[#00B8F0] absolute -left-1" />
                            <div className="bg-white border border-slate-200 rounded-lg p-3 flex flex-col items-center justify-center text-center gap-1.5 shadow w-full">
                              <Network className="w-5 h-5 text-[#0066FF]" />
                              <span>Chunking &<br/>Embedding</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-center relative">
                            <ArrowRight className="w-4 h-4 text-[#00B8F0] absolute -left-1" />
                            <div className="bg-white border border-[#00B8F0]/40 rounded-lg p-3 flex flex-col items-center justify-center text-center gap-1.5 shadow w-full bg-[#00B8F0]/10">
                              <Database className="w-5 h-5 text-[#00B8F0]" />
                              <span>Vector DB</span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="grid grid-cols-4 gap-2 items-center pt-2 border-t border-slate-200/60">
                          <div className="bg-white border border-slate-200 rounded-md p-2 flex flex-col items-center text-center gap-1">
                            <Search className="w-4 h-4 text-slate-600" />
                            <span className="text-[9px]">Retrieval</span>
                          </div>
                          <div className="bg-white border border-slate-200 rounded-md p-2 flex flex-col items-center text-center gap-1 relative">
                            <ArrowRight className="w-3 h-3 text-[#64748B] absolute -left-1.5 top-1/2 -translate-y-1/2" />
                            <SlidersHorizontal className="w-4 h-4 text-[#00B8F0]" />
                            <span className="text-[9px]">Reranker</span>
                          </div>
                          <div className="bg-white border border-slate-200 rounded-md p-2 flex flex-col items-center text-center gap-1 relative">
                            <ArrowRight className="w-3 h-3 text-[#64748B] absolute -left-1.5 top-1/2 -translate-y-1/2" />
                            <Bot className="w-4 h-4 text-[#0066FF]" />
                            <span className="text-[9px]">LLM</span>
                          </div>
                          <div className="bg-[#0066FF] text-white rounded-md p-2 flex flex-col items-center text-center gap-1 relative shadow-md">
                            <ArrowRight className="w-3 h-3 text-[#64748B] absolute -left-1.5 top-1/2 -translate-y-1/2" />
                            <CheckCircle2 className="w-4 h-4 text-slate-900" />
                            <span className="text-[9px]">Answer</span>
                          </div>
                        </div>
                      </div>
                    )}
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
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#007BFF] to-[#00C6FF] text-white flex items-center justify-center font-bold text-[12px] shadow-sm shrink-0">
                        {getAuthorInitials(featuredArticle.author)}
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
            {paginatedGridArticles.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center text-[#64748B]">
                No articles match your current search or filter. Try clearing your filters or search query.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {paginatedGridArticles.map((art, idx) => (
                  <Link key={art.slug ? `article-${art.slug}` : `article-${art.id || idx}`} href={`/insights/${art.slug}`} className="block group h-full">
                    <article className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                      
                      {/* Top Graphic / Image Box */}
                      <div className={`h-[200px] bg-slate-50 rounded-xl border border-slate-200 relative overflow-hidden flex items-center justify-center shadow-inner select-none ${art.featuredImage ? '' : 'p-4'}`}>
                        {art.featuredImage ? (
                          <div className="relative w-full h-full overflow-hidden">
                            <img
                              src={art.featuredImage}
                              alt={art.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                          </div>
                        ) : (
                          <>
                            {/* Custom Visual Schematics based on visualType */}
                            {art.visualType === "agents-circle" && (
                              <div className="relative w-40 h-40 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full border border-dashed border-[#00B8F0]/40 animate-spin-slow" />
                                <div className="w-14 h-14 rounded-full bg-[#0066FF] border-2 border-white/20 flex items-center justify-center text-slate-900 shadow-lg z-10">
                                  <Bot className="w-7 h-7" />
                                </div>
                                {/* Surrounding Nodes */}
                                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#00B8F0]"><Users className="w-4 h-4"/></div>
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#00B8F0]"><Terminal className="w-4 h-4"/></div>
                                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#00B8F0]"><Database className="w-4 h-4"/></div>
                                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#00B8F0]"><CheckCircle2 className="w-4 h-4"/></div>
                              </div>
                            )}

                            {art.visualType === "microservices-blocks" && (
                              <div className="grid grid-cols-3 gap-2.5 w-full max-w-[220px]">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                  <div key={`microservice-block-${i}`} className={`h-12 rounded-lg border flex items-center justify-center ${i % 2 === 0 ? "bg-[#0066FF]/20 border-[#0066FF] text-[#00B8F0]" : "bg-white border-slate-200 text-slate-600"}`}>
                                    <Layers className="w-5 h-5" />
                                  </div>
                                ))}
                              </div>
                            )}

                            {art.visualType === "mlops-dashboard" && (
                              <div className="w-full h-full bg-white border border-slate-200 rounded-lg p-3.5 flex flex-col justify-between text-slate-900 font-mono text-[9px]">
                                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                                  <span className="text-[#00B8F0] font-bold">LLM OBSERVABILITY</span>
                                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">ONLINE</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 my-2">
                                  <div className="bg-slate-50 p-2 rounded border border-slate-200">
                                    <div className="text-[#64748B]">TELEMETRY</div>
                                    <div className="text-[12px] font-bold text-slate-900 mt-0.5 font-mono">TRACED</div>
                                  </div>
                                  <div className="bg-slate-50 p-2 rounded border border-slate-200">
                                    <div className="text-[#64748B]">GUARDRAILS</div>
                                    <div className="text-[12px] font-bold text-[#00B8F0] mt-0.5 font-mono">ACTIVE</div>
                                  </div>
                                </div>
                                {/* Bar mini chart */}
                                <div className="flex items-end gap-1.5 h-10 px-1 pt-1 border-t border-slate-200">
                                  <div className="w-full bg-[#0066FF] h-[60%] rounded-t-sm" />
                                  <div className="w-full bg-[#00B8F0] h-[90%] rounded-t-sm" />
                                  <div className="w-full bg-[#0066FF] h-[40%] rounded-t-sm" />
                                  <div className="w-full bg-[#00B8F0] h-[75%] rounded-t-sm" />
                                  <div className="w-full bg-[#0066FF] h-[100%] rounded-t-sm" />
                                </div>
                              </div>
                            )}

                            {art.visualType === "rag-hybrid" && (
                              <div className="flex flex-col gap-3 w-full max-w-[240px] text-slate-900 font-mono text-[10px]">
                                <div className="flex items-center justify-between gap-2">
                                  <div className="bg-white border border-slate-200 px-3 py-2 rounded text-center flex-1">Dense Vector</div>
                                  <div className="bg-white border border-slate-200 px-3 py-2 rounded text-center flex-1">Sparse BM25</div>
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
                              <div className="flex items-center gap-2.5 text-slate-900 font-mono text-[10px]">
                                <div className="bg-white border border-slate-200 p-3 rounded-lg flex flex-col items-center gap-1 shadow">
                                  <Bot className="w-5 h-5 text-[#00B8F0]" />
                                  <span>LangGraph</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-600" />
                                <div className="bg-white border border-[#00B8F0]/40 p-3 rounded-lg flex flex-col items-center gap-1 shadow bg-[#00B8F0]/10">
                                  <Code2 className="w-5 h-5 text-[#00B8F0]" />
                                  <span>Tool Node</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-600" />
                                <div className="bg-[#0066FF] text-white p-3 rounded-lg flex flex-col items-center gap-1 shadow">
                                  <CheckCircle2 className="w-5 h-5" />
                                  <span>Output</span>
                                </div>
                              </div>
                            )}

                            {art.visualType === "open-source-hub" && (
                              <div className="relative flex items-center justify-center w-full h-full">
                                <div className="w-20 h-20 rounded-full bg-white border border-[#00B8F0]/50 flex items-center justify-center text-[#00B8F0] shadow-[0_0_25px_rgba(0,184,240,0.25)] z-10">
                                  <GitBranch className="w-9 h-9" />
                                </div>
                                <div className="absolute inset-4 border border-dashed border-slate-200 rounded-full" />
                                <span className="absolute top-3 left-6 text-slate-900 font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200">botmartz/rag</span>
                                <span className="absolute bottom-3 right-6 text-[#00B8F0] font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200">botmartz/agent</span>
                              </div>
                            )}

                            {art.visualType === "prompt-blueprint" && (
                              <div className="w-full max-w-[220px] bg-white border border-slate-200 rounded-lg p-3 text-slate-900 font-mono text-[9.5px] space-y-1.5">
                                <div className="border-b border-slate-200 pb-1 text-[#00B8F0] font-bold">SYSTEM PROMPT</div>
                                <div className="bg-slate-50 p-1.5 rounded text-slate-600 flex items-center justify-between">
                                  <span>User Role Setup</span>
                                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                </div>
                                <div className="bg-slate-50 p-1.5 rounded text-slate-600 flex items-center justify-between">
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
                              <div className="flex items-center gap-2 text-slate-900 font-mono text-[10px]">
                                <div className="bg-white border border-slate-200 p-2.5 rounded flex flex-col items-center gap-1 text-center">
                                  <FileText className="w-5 h-5 text-slate-600" />
                                  <span className="text-[8.5px]">100K+ PDFs</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[#00B8F0]" />
                                <div className="bg-white border border-[#00B8F0]/40 p-2.5 rounded flex flex-col items-center gap-1 text-center bg-[#00B8F0]/10">
                                  <Cpu className="w-5 h-5 text-[#00B8F0]" />
                                  <span className="text-[8.5px]">Clause AI</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[#00B8F0]" />
                                <div className="bg-[#0066FF] p-2.5 rounded flex flex-col items-center gap-1 text-center text-slate-900 shadow">
                                  <BarChart3 className="w-5 h-5" />
                                  <span className="text-[8.5px]">Risk Report</span>
                                </div>
                              </div>
                            )}
                          </>
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
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#007BFF] to-[#00C6FF] text-white flex items-center justify-center font-bold text-[11.5px] shadow-sm shrink-0">
                            {getAuthorInitials(art.author)}
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
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-8 pt-8 border-t border-[#E2E8F0]">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`flex items-center gap-1.5 px-4 py-2 border rounded-lg font-medium text-[13.5px] shadow-sm transition-all ${
                    currentPage === 1
                      ? "border-[#E2E8F0] text-[#94A3B8] bg-white cursor-not-allowed"
                      : "border-[#E2E8F0] bg-white text-[#0F172A] hover:border-[#0066FF] hover:text-[#0066FF]"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                <div className="flex items-center gap-1.5">
                  {getPaginationItems().map((item) => {
                    if (item.type === 'ellipsis') {
                      return (
                        <span key={item.key} className="text-[#64748B] px-1 font-bold">
                          ...
                        </span>
                      );
                    }
                    const isCurrent = currentPage === item.value;
                    return (
                      <button
                        key={item.key}
                        onClick={() => handlePageChange(item.value as number)}
                        className={`w-9 h-9 rounded-lg border font-semibold text-[13.5px] flex items-center justify-center transition-all shadow-sm ${
                          isCurrent
                            ? "bg-[#0066FF] text-white border-[#0066FF]"
                            : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#0066FF] hover:text-[#0066FF]"
                        }`}
                      >
                        {item.value}
                      </button>
                    );
                  })}
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`flex items-center gap-1.5 px-4 py-2 border rounded-lg font-medium text-[13.5px] shadow-sm transition-all ${
                    currentPage === totalPages
                      ? "border-[#E2E8F0] text-[#94A3B8] bg-white cursor-not-allowed"
                      : "border-[#E2E8F0] bg-white text-[#0F172A] hover:border-[#0066FF] hover:text-[#0066FF]"
                  }`}
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

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
                    <Link key={`popular-art-${art.id}-${idx}`} href={href} className="flex items-center gap-4 group block">
                      <div className="w-14 h-12 rounded-lg bg-slate-50 border border-slate-200 relative flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                        <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-[#0066FF] text-white text-[9px] font-bold flex items-center justify-center shadow z-10">
                          {idx + 1}
                        </div>
                        {matchingArt?.featuredImage ? (
                          <img
                            src={matchingArt.featuredImage}
                            alt={art.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <Network className="w-5 h-5 text-slate-600 group-hover:text-[#00B8F0] transition-colors" />
                        )}
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
                    <li key={`cat-sidebar-${cat.name}-${idx}`}>
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
                  { label: "Engineering Handbook", icon: BookOpen, href: "/implementation" },
                  { label: "System Design Patterns", icon: Layers, href: "/work/case-studies" },
                  { label: "AI Engineering Roadmap", icon: Network, href: "/services/enterprise-rag" },
                  { label: "Open Source @ Botmartz", icon: Code2, href: "/work/open-source" },
                  { label: "YouTube Channel", icon: PlayCircle, href: "https://youtube.com/@botmartz" },
                ].map((res, i) => (
                  <li key={`resource-${res.label.toLowerCase().replace(/\s+/g, '-')}-${i}`}>
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
