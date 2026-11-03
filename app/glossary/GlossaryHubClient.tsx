"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, BookOpen, Layers, ShieldCheck, Database, Workflow, Terminal, 
  ArrowRight, Filter, Sparkles, Brain, Cpu, Activity, CheckCircle2,
  ChevronRight, ExternalLink, Code2, Lock, ChevronLeft, SlidersHorizontal,
  RotateCcw, Check, Sparkle
} from 'lucide-react';
import { GLOSSARY_CATEGORIES, GlossaryCategory, GlossaryTerm, DifficultyLevel } from '@/lib/glossary/types';
import { MASTER_GLOSSARY_TERMS } from '@/lib/glossary/data';
import MathFormula from '@/app/_components/MathFormula';

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const ITEMS_PER_PAGE = 24;

export default function GlossaryHubClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedLetter, setSelectedLetter] = useState<string>("all");
  const [onlyWithDedicatedGuide, setOnlyWithDedicatedGuide] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Filtered terms
  const filteredTerms = useMemo(() => {
    return MASTER_GLOSSARY_TERMS.filter((term) => {
      // Search text query
      const matchesSearch = 
        searchQuery === "" ||
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.shortDefinition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.aliases?.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategory = 
        selectedCategory === "all" || term.category === selectedCategory;

      // Difficulty filter
      const matchesDifficulty = 
        selectedDifficulty === "all" || term.difficulty === selectedDifficulty;

      // Letter filter
      const matchesLetter = 
        selectedLetter === "all" || term.letter.toUpperCase() === selectedLetter.toUpperCase();

      // Dedicated Guide filter
      const matchesDedicated = !onlyWithDedicatedGuide || term.hasDedicatedPage;

      return matchesSearch && matchesCategory && matchesDifficulty && matchesLetter && matchesDedicated;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedLetter, onlyWithDedicatedGuide]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredTerms.length / ITEMS_PER_PAGE) || 1;
  const paginatedTerms = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTerms.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTerms, currentPage]);

  const activeCategoryObj = GLOSSARY_CATEGORIES.find(c => c.slug === selectedCategory);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedDifficulty("all");
    setSelectedLetter("all");
    setOnlyWithDedicatedGuide(false);
    setCurrentPage(1);
  };

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    setCurrentPage(1);
  };

  const handleDifficultySelect = (diff: string) => {
    setSelectedDifficulty(diff);
    setCurrentPage(1);
  };

  const handleLetterSelect = (letter: string) => {
    setSelectedLetter(letter);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased pt-[104px] pb-24">
      
      {/* ── HERO HEADER ── */}
      <section className="bg-white border-b border-[#E2E8F0] pt-12 pb-14">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] font-mono text-xs font-semibold text-[#0284C7] uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
              <span>THE ENTERPRISE AI A–Z KNOWLEDGE HUB</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] mb-4">
              AI Engineering &amp; Systems Architecture Glossary
            </h1>
            
            <p className="text-base sm:text-lg text-[#475569] leading-relaxed mb-6">
              Browse over <strong className="text-slate-900 font-bold">{MASTER_GLOSSARY_TERMS.length}</strong> enterprise AI terms, algorithms, and architectures across 12 knowledge areas. Grounded mathematical models, production code, and trade-offs.
            </p>

            {/* Quick Stats Strip */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>{MASTER_GLOSSARY_TERMS.length} Master Concepts</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>12 Subject Domains</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Research Papers</span>
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ── TOP SEARCH & ALPHABET BAR ── */}
      <section className="bg-white border-b border-[#E2E8F0] sticky top-[72px] z-20 shadow-xs">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            
            {/* Live Search Input */}
            <div className="relative w-full lg:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search 475+ terms (e.g. RAG, HNSW, BM25, LangGraph)..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:bg-white transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs font-mono text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* A-Z Alphabet Filter */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none font-mono text-xs">
              <button
                onClick={() => handleLetterSelect("all")}
                className={`px-2.5 py-1 rounded-md transition-all shrink-0 ${
                  selectedLetter === "all"
                    ? "bg-[#0F172A] text-white font-bold"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                ALL
              </button>
              {ALPHABET.map((char) => {
                const count = MASTER_GLOSSARY_TERMS.filter(t => t.letter.toUpperCase() === char).length;
                const isSelected = selectedLetter === char;
                return (
                  <button
                    key={char}
                    disabled={count === 0}
                    onClick={() => handleLetterSelect(char)}
                    title={`${count} terms starting with ${char}`}
                    className={`px-2 py-1 rounded-md transition-all shrink-0 ${
                      isSelected
                        ? "bg-[#0284C7] text-white font-bold"
                        : count > 0
                        ? "text-slate-700 hover:bg-slate-100 font-medium"
                        : "text-slate-300 cursor-not-allowed"
                    }`}
                  >
                    {char}
                  </button>
                );
              })}
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-300 bg-slate-50 text-xs font-mono font-medium text-slate-700"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Filter Categories ({filteredTerms.length})</span>
            </button>

          </div>

        </div>
      </section>

      {/* ── MAIN 2-COLUMN E-COMMERCE LAYOUT (SIDEBAR FILTERS + MAIN FEED) ── */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ══════════════════════════════════════════════════════════════
              LEFT SIDEBAR: E-COMMERCE STYLE FILTERS
          ══════════════════════════════════════════════════════════════ */}
          <aside className={`lg:col-span-3 lg:block ${mobileFilterOpen ? 'block' : 'hidden'} bg-white border border-slate-200 rounded-2xl p-5 shadow-xs sticky top-[138px]`}>
            
            {/* Sidebar Header & Reset */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-900 uppercase tracking-wider">
                <SlidersHorizontal className="w-4 h-4 text-[#0284C7]" />
                <span>Filter Knowledge</span>
              </div>
              {(selectedCategory !== "all" || selectedDifficulty !== "all" || selectedLetter !== "all" || searchQuery || onlyWithDedicatedGuide) && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-[11px] font-mono text-rose-600 hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            {/* Filter Section 1: Subject Area Radio/Checkbox List */}
            <div className="mb-6">
              <div className="text-[11px] font-mono uppercase font-bold text-slate-400 mb-3 tracking-wider flex items-center justify-between">
                <span>Knowledge Area</span>
                <span className="text-[10px] text-slate-400">12 DOMAINS</span>
              </div>
              <div className="space-y-1 max-h-[300px] overflow-y-auto pr-1 text-xs">
                <button
                  onClick={() => handleCategorySelect("all")}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                    selectedCategory === "all"
                      ? "bg-[#0F172A] text-white font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span>All 12 Subject Areas</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${selectedCategory === "all" ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-500"}`}>
                    {MASTER_GLOSSARY_TERMS.length}
                  </span>
                </button>

                {GLOSSARY_CATEGORIES.map((cat) => {
                  const count = MASTER_GLOSSARY_TERMS.filter(t => t.category === cat.slug).length;
                  const isSelected = selectedCategory === cat.slug;
                  return (
                    <button
                      key={cat.slug}
                      onClick={() => handleCategorySelect(cat.slug)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                        isSelected
                          ? "bg-[#0284C7] text-white font-semibold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span className="truncate pr-2">{cat.name}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0 ${isSelected ? "bg-[#0369A1] text-white" : "bg-slate-100 text-slate-500"}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Section 2: Technical Depth / Difficulty */}
            <div className="mb-6 pt-5 border-t border-slate-100">
              <div className="text-[11px] font-mono uppercase font-bold text-slate-400 mb-3 tracking-wider">
                Technical Depth
              </div>
              <div className="space-y-1 text-xs">
                {[
                  { id: "all", label: "All Difficulty Levels" },
                  { id: "beginner", label: "Beginner / Foundational" },
                  { id: "intermediate", label: "Intermediate / Systems" },
                  { id: "advanced", label: "Advanced / Algorithmic" },
                  { id: "architecture", label: "Production Architecture" }
                ].map((diff) => {
                  const count = diff.id === "all" 
                    ? MASTER_GLOSSARY_TERMS.length 
                    : MASTER_GLOSSARY_TERMS.filter(t => t.difficulty === diff.id).length;
                  const isSelected = selectedDifficulty === diff.id;
                  return (
                    <button
                      key={diff.id}
                      onClick={() => handleDifficultySelect(diff.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                        isSelected
                          ? "bg-slate-900 text-white font-semibold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span>{diff.label}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isSelected ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-500"}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Section 3: Deep Architecture Guide Available */}
            <div className="pt-5 border-t border-slate-100">
              <label className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyWithDedicatedGuide}
                  onChange={(e) => {
                    setOnlyWithDedicatedGuide(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="rounded text-[#0284C7] focus:ring-[#0284C7] h-4 w-4 border-slate-300"
                />
                <span>Dedicated Spec Page Only</span>
              </label>
              <p className="text-[11px] text-slate-400 mt-1 pl-6">
                Filters to Tier-1 concepts featuring complete LaTeX proofs &amp; code examples.
              </p>
            </div>

            {/* Quick Consultation Plug in Sidebar */}
            <div className="mt-8 pt-5 border-t border-slate-100 bg-slate-50 -mx-5 -mb-5 p-5 rounded-b-2xl">
              <div className="text-xs font-bold text-slate-900 mb-1">Architecture Review</div>
              <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
                Need help scoping an enterprise RAG or deterministic agent pipeline?
              </p>
              <Link
                href="/contact"
                className="block text-center w-full py-2 px-3 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-mono font-semibold transition-colors"
              >
                Schedule Scoping Session →
              </Link>
            </div>

          </aside>

          {/* ══════════════════════════════════════════════════════════════
              RIGHT COLUMN: GLOSSARY TERMS GRID & PAGINATION
          ══════════════════════════════════════════════════════════════ */}
          <main className="lg:col-span-9">
            
            {/* Header: Results Count & Active Filter Pills */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div className="text-xs sm:text-sm font-medium text-slate-700">
                Found <span className="font-bold text-slate-900">{filteredTerms.length}</span> technical term{filteredTerms.length === 1 ? '' : 's'}
                {activeCategoryObj && (
                  <span> in <span className="text-[#0284C7] font-semibold">{activeCategoryObj.name}</span></span>
                )}
                {selectedLetter !== "all" && (
                  <span> starting with <span className="font-mono font-bold text-slate-900">'{selectedLetter}'</span></span>
                )}
                <span className="text-slate-400 text-xs ml-2">
                  (Page {currentPage} of {totalPages})
                </span>
              </div>

              {/* Reset shortcut */}
              {(selectedCategory !== "all" || selectedDifficulty !== "all" || selectedLetter !== "all" || searchQuery || onlyWithDedicatedGuide) && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-mono text-rose-600 hover:underline cursor-pointer"
                >
                  Clear active filters
                </button>
              )}
            </div>

            {/* Empty State */}
            {filteredTerms.length === 0 ? (
              <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl p-8">
                <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800 mb-1">No matching concepts found</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                  Try adjusting your search criteria or resetting filters to browse all 475+ AI engineering terms.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-mono font-semibold"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                {/* 2-Column Responsive Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {paginatedTerms.map((term) => {
                    const catObj = GLOSSARY_CATEGORIES.find(c => c.slug === term.category);
                    return (
                      <div 
                        key={term.slug}
                        className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs hover:border-[#0284C7]/50 hover:shadow-md transition-all flex flex-col justify-between group"
                      >
                        <div>
                          {/* Card Top Meta Strip */}
                          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2.5 pb-2.5 border-b border-slate-100">
                            <div className="flex items-center gap-1.5">
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${catObj?.badgeBg} ${catObj?.badgeText}`}>
                                {catObj?.name || term.category}
                              </span>
                              <span className="text-[10px] uppercase font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                {term.difficulty}
                              </span>
                            </div>
                            <span className="font-mono text-xs font-bold text-slate-400">
                              #{term.letter}
                            </span>
                          </div>

                          {/* Term Title */}
                          {term.hasDedicatedPage ? (
                            <Link href={`/glossary/${term.slug}`} className="block group-hover:text-[#0284C7] transition-colors">
                              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 flex items-center justify-between">
                                <span>{term.term}</span>
                                <ArrowRight className="w-4 h-4 text-[#0284C7] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                              </h2>
                            </Link>
                          ) : (
                            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                              {term.term}
                            </h2>
                          )}

                          {/* Short Definition */}
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                            {term.shortDefinition}
                          </p>

                          {/* Formulation Preview rendered with KaTeX */}
                          {term.mathematicalOrAlgorithmicModel && (
                            <MathFormula
                              formula={term.mathematicalOrAlgorithmicModel.formula}
                              label={term.mathematicalOrAlgorithmicModel.label}
                              className="mb-4"
                            />
                          )}
                        </div>

                        {/* Card Action Link */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                          {term.hasDedicatedPage ? (
                            <Link
                              href={`/glossary/${term.slug}`}
                              className="font-bold text-[#0284C7] hover:underline flex items-center gap-1"
                            >
                              <span>Read Architecture Guide</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                          ) : (
                            <span className="text-slate-400 font-medium text-[11px]">
                              Standard Reference Index
                            </span>
                          )}

                          {term.commercialPathway && (
                            <Link
                              href={term.commercialPathway.serviceLink}
                              className="text-slate-500 hover:text-slate-900 truncate max-w-[150px]"
                            >
                              {term.commercialPathway.serviceLabel}
                            </Link>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>

                {/* ══════════════════════════════════════════════════════════
                    PAGINATION CONTROLLER
                ══════════════════════════════════════════════════════════ */}
                {totalPages > 1 && (
                  <div className="mt-10 bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
                    
                    <button
                      disabled={currentPage === 1}
                      onClick={() => {
                        setCurrentPage(p => Math.max(1, p - 1));
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                        currentPage === 1
                          ? "text-slate-300 border border-slate-200 cursor-not-allowed"
                          : "text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Previous</span>
                    </button>

                    {/* Numeric Page Buttons */}
                    <div className="flex items-center gap-1 font-mono text-xs">
                      {Array.from({ length: totalPages }).map((_, idx) => {
                        const pageNum = idx + 1;
                        // Show first, last, and window around current page
                        if (
                          pageNum === 1 || 
                          pageNum === totalPages || 
                          (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
                        ) {
                          const isActive = pageNum === currentPage;
                          return (
                            <button
                              key={pageNum}
                              onClick={() => {
                                setCurrentPage(pageNum);
                                window.scrollTo({ top: 300, behavior: 'smooth' });
                              }}
                              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                                isActive
                                  ? "bg-[#0284C7] text-white font-bold"
                                  : "text-slate-600 hover:bg-slate-100"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        } else if (
                          pageNum === currentPage - 3 || 
                          pageNum === currentPage + 3
                        ) {
                          return <span key={pageNum} className="px-1 text-slate-400">...</span>;
                        }
                        return null;
                      })}
                    </div>

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => {
                        setCurrentPage(p => Math.min(totalPages, p + 1));
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                        currentPage === totalPages
                          ? "text-slate-300 border border-slate-200 cursor-not-allowed"
                          : "text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span>Next</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                  </div>
                )}
              </>
            )}

          </main>

        </div>

      </div>

    </div>
  );
}
