"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Truck, 
  Scale, 
  HeartPulse, 
  Cloud, 
  Factory, 
  Briefcase, 
  Search, 
  FileText, 
  Cpu, 
  Eye, 
  HelpCircle, 
  Database,
  BarChart3,
  Network,
  Users,
  ShieldCheck,
  Rocket,
  SlidersHorizontal,
  ChevronDown
} from "lucide-react";

export interface CaseStudyItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  service?: string;
  industry?: string;
  tags?: string[];
  technologies?: string[];
  metrics?: { value: string; label: string }[];
  visualType?: "dashboard" | "workflow" | "document" | "map";
}

const RICH_CASE_STUDIES: CaseStudyItem[] = [
  {
    id: "logistics-rag",
    title: "Enterprise Knowledge Search for Global Logistics Company",
    excerpt: "Built a secure, enterprise RAG system to unify and search across 100M+ freight documents, SOPs, FAQs, and regulations.",
    category: "ENTERPRISE RAG",
    service: "Enterprise RAG",
    industry: "Logistics",
    technologies: ["LangChain", "Pinecone", "FastAPI", "PostgreSQL", "Docker"],
    metrics: [
      { value: "70%", label: "Faster information retrieval" },
      { value: "60%", label: "Reduction in support tickets" },
      { value: "3.2x", label: "Increase in user productivity" }
    ],
    visualType: "dashboard"
  },
  {
    id: "saas-support",
    title: "AI Support Agent for SaaS Customer Support",
    excerpt: "Developed an autonomous AI support agent that resolves customer queries end-to-end via context, tools, and human escalation.",
    category: "AI AGENTS",
    service: "AI Agents",
    industry: "SaaS & Technology",
    technologies: ["LangGraph", "OpenAI", "Redis", "FastAPI", "Docker"],
    metrics: [
      { value: "45%", label: "Queries resolved automatically" },
      { value: "35%", label: "Reduced first response time" },
      { value: "90%", label: "Customer satisfaction score" }
    ],
    visualType: "workflow"
  },
  {
    id: "legal-doc-intel",
    title: "Legal Document Intelligence Platform",
    excerpt: "Automated contract analysis and Q&A across 100K+ legal documents with 95%+ accuracy using advanced RAG and OCR.",
    category: "ENTERPRISE RAG",
    service: "Enterprise RAG",
    industry: "Legal",
    technologies: ["LlamaIndex", "GitHub", "OCR", "ReactJS", "AWS"],
    metrics: [
      { value: "90%", label: "Time saved in analysis" },
      { value: "95%", label: "Extraction accuracy" },
      { value: "80%", label: "Fewer contract reviews" }
    ],
    visualType: "document"
  },
  {
    id: "logistics-planner",
    title: "Logistics Planner Agent for Global Supply Chain",
    excerpt: "AI agent that plans optimal routes, books shipments, and monitors disruptions in real-time.",
    category: "AI AGENTS",
    service: "AI Agents",
    industry: "Logistics",
    technologies: ["LangChain", "Google ADK", "PostgreSQL", "Maps API"],
    metrics: [
      { value: "28%", label: "Improved on-time delivery" },
      { value: "22%", label: "Lower logistics cost" },
      { value: "3.5x", label: "Faster planning cycle" }
    ],
    visualType: "map"
  }
];

export function CaseStudiesListingSection({ initialStudies }: { initialStudies?: any[] }) {
  const [activeFilter, setActiveFilter] = useState<string>("All Case Studies");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedCapability, setSelectedCapability] = useState<string | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  const combinedStudies = useMemo(() => {
    const dynamic = (initialStudies || []).map(study => ({
      id: study.id,
      title: study.title,
      slug: study.slug || study.id,
      excerpt: study.excerpt || "",
      category: (study.category || "AI Implementations").toUpperCase(),
      service: study.category || "AI Implementations",
      industry: study.industry || "Technology",
      technologies: study.tags || study.technologies || [],
      metrics: study.metrics || [
        { value: "70%", label: "Faster information retrieval" },
        { value: "60%", label: "Reduction in support tickets" }
      ],
      visualType: study.visualType || "dashboard"
    }));

    const dynamicSlugs = new Set(dynamic.map(d => d.slug));
    const filteredStatic = RICH_CASE_STUDIES.filter(s => !dynamicSlugs.has(s.id));

    return [...dynamic, ...filteredStatic];
  }, [initialStudies]);

  const filteredStudies = useMemo(() => {
    return combinedStudies.filter(study => {
      // Top filter pills check
      if (activeFilter !== "All Case Studies" && activeFilter !== "Featured") {
        if (activeFilter === "Enterprise RAG" && study.service !== "Enterprise RAG") return false;
        if (activeFilter === "AI Agents" && study.service !== "AI Agents") return false;
        if (activeFilter === "AI Integrations" && study.service !== "AI Integrations") return false;
      }

      // Sidebar checks
      if (selectedService && study.service !== selectedService) return false;
      if (selectedIndustry && study.industry !== selectedIndustry) return false;

      return true;
    });
  }, [activeFilter, selectedService, selectedIndustry, selectedCapability, combinedStudies]);

  const handleTopFilterClick = (filter: string) => {
    setActiveFilter(filter);
    setSelectedService(null);
  };

  const toggleSidebarService = (svc: string) => {
    if (selectedService === svc) {
      setSelectedService(null);
      if (activeFilter === svc) setActiveFilter("All Case Studies");
    } else {
      setSelectedService(svc);
      setActiveFilter(svc);
    }
  };

  const toggleSidebarIndustry = (ind: string) => {
    setSelectedIndustry(prev => (prev === ind ? null : ind));
  };

  const toggleSidebarCapability = (cap: string) => {
    setSelectedCapability(prev => (prev === cap ? null : cap));
  };

  return (
    <section className="py-[60px] sm:py-[80px] bg-[#F8FAFC] text-[#0F172A]">
      <div className="wrap max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="lg:hidden w-full mb-6 flex items-center justify-between px-4.5 py-3.5 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] font-semibold text-[14px] shadow-sm hover:border-[#0066FF] transition-all"
        >
          <span className="flex items-center gap-2.5">
            <SlidersHorizontal className="w-4 h-4 text-[#0066FF]" />
            <span>Filter Case Studies <span className="text-[#64748B] font-normal">(Service, Industry, Capability)</span></span>
          </span>
          <ChevronDown className={`w-4 h-4 text-[#64748B] transition-transform duration-200 ${mobileSidebarOpen ? "rotate-180 text-[#0066FF]" : ""}`} />
        </button>

        {/* Main Grid: Left Sidebar + Right Case Studies Column */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-10 items-start">
          
          {/* ── LEFT SIDEBAR ── */}
          <aside className={`${mobileSidebarOpen ? "block" : "hidden"} lg:block bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-sm relative lg:sticky lg:top-28`}>
            <div className="font-mono text-[11px] font-bold tracking-[0.16em] text-[#0066FF] uppercase mb-6">
              ENTERPRISE AI STUDIOS
            </div>

            {/* By Service */}
            <div className="mb-7">
              <h3 className="text-[14px] font-bold text-[#0F172A] mb-3.5">By Service</h3>
              <ul className="space-y-2.5">
                {[
                  { label: "Enterprise RAG", active: selectedService === "Enterprise RAG" || activeFilter === "Enterprise RAG" },
                  { label: "AI Agents", active: selectedService === "AI Agents" || activeFilter === "AI Agents" },
                  { label: "AI Integrations", active: selectedService === "AI Integrations" || activeFilter === "AI Integrations" }
                ].map((item, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => toggleSidebarService(item.label)}
                      className={`w-full flex items-center gap-2.5 text-[13.5px] font-medium transition-colors text-left ${
                        item.active ? "text-[#0066FF] font-semibold" : "text-[#475569] hover:text-[#0F172A]"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                        item.active ? "border-[#0066FF] bg-[#EFF6FF]" : "border-[#CBD5E1]"
                      }`}>
                        {item.active && <div className="w-2 h-2 rounded-full bg-[#0066FF]" />}
                      </div>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* By Industry */}
            <div className="mb-7 pt-6 border-t border-[#F1F5F9]">
              <h3 className="text-[14px] font-bold text-[#0F172A] mb-3.5">By Industry</h3>
              <ul className="space-y-2.5">
                {[
                  { label: "Education", icon: BookOpen },
                  { label: "Logistics", icon: Truck },
                  { label: "Legal", icon: Scale },
                  { label: "Healthcare", icon: HeartPulse },
                  { label: "SaaS & Technology", icon: Cloud },
                  { label: "Manufacturing", icon: Factory },
                  { label: "Financial Services", icon: Briefcase }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = selectedIndustry === item.label;
                  return (
                    <li key={idx}>
                      <button
                        onClick={() => toggleSidebarIndustry(item.label)}
                        className={`w-full flex items-center gap-2.5 text-[13px] font-medium transition-colors text-left ${
                          isSelected ? "text-[#0066FF] font-semibold" : "text-[#475569] hover:text-[#0F172A]"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? "text-[#0066FF]" : "text-[#94A3B8]"}`} />
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* By Capability */}
            <div className="mb-7 pt-6 border-t border-[#F1F5F9]">
              <h3 className="text-[14px] font-bold text-[#0F172A] mb-3.5">By Capability</h3>
              <ul className="space-y-2.5">
                {[
                  { label: "Knowledge Search", icon: Search },
                  { label: "Document Intelligence", icon: FileText },
                  { label: "Process Automation", icon: Cpu },
                  { label: "Supply Chain Visibility", icon: Eye },
                  { label: "Support & Automation", icon: HelpCircle },
                  { label: "Data Extraction", icon: Database }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = selectedCapability === item.label;
                  return (
                    <li key={idx}>
                      <button
                        onClick={() => toggleSidebarCapability(item.label)}
                        className={`w-full flex items-center gap-2.5 text-[13px] font-medium transition-colors text-left ${
                          isSelected ? "text-[#0066FF] font-semibold" : "text-[#475569] hover:text-[#0F172A]"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? "text-[#0066FF]" : "text-[#94A3B8]"}`} />
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Have a challenge? Card */}
            <div className="pt-6 border-t border-[#F1F5F9]">
              <div className="bg-[#F8FAFC] rounded-xl p-4.5 border border-[#E2E8F0]">
                <h4 className="text-[14.5px] font-bold text-[#0066FF] mb-1.5">Have a challenge?</h4>
                <p className="text-[12.5px] text-[#475569] mb-4 leading-relaxed">
                  Let&apos;s build a custom solution for your business.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF] hover:text-white transition-all text-[13px] font-medium"
                >
                  Book a Discovery Call <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>

          {/* ── RIGHT COLUMN: FILTERS + CASE STUDY CARDS ── */}
          <div className="flex flex-col gap-8">
            
            {/* Top Filter Pills */}
            <div className="flex flex-wrap items-center gap-3">
              {["All Case Studies", "Enterprise RAG", "AI Agents", "AI Integrations", "Featured"].map((pill) => {
                const isActive = activeFilter === pill;
                return (
                  <button
                    key={pill}
                    onClick={() => handleTopFilterClick(pill)}
                    className={`px-5 py-2.5 rounded-xl text-[14px] font-medium transition-all ${
                      isActive
                        ? "bg-[#0066FF] text-white shadow-sm font-semibold"
                        : "bg-white border border-[#E2E8F0] text-[#475569] hover:border-[#0066FF] hover:text-[#0F172A]"
                    }`}
                  >
                    {pill}
                  </button>
                );
              })}
            </div>

            {/* Case Studies List */}
            <div className="space-y-8">
              {filteredStudies.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center text-[#64748B]">
                  <p className="text-[16px] font-medium">No case studies match the selected filters.</p>
                  <button
                    onClick={() => {
                      setActiveFilter("All Case Studies");
                      setSelectedService(null);
                      setSelectedIndustry(null);
                      setSelectedCapability(null);
                    }}
                    className="mt-4 text-[#0066FF] font-medium text-[14px] hover:underline"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                filteredStudies.map((study) => (
                  <article
                    key={study.id}
                    className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-[280px_1fr_210px] xl:grid-cols-[310px_1fr_230px] gap-6 sm:gap-8 items-center"
                  >
                    {/* Left: UI/Dashboard Mockup */}
                    <div className="h-[200px] sm:h-[230px] w-full rounded-xl overflow-hidden bg-[#0A111F] border border-[#1E293B] relative flex items-center justify-center p-3 sm:p-4 shadow-inner">
                      {study.visualType === "dashboard" && (
                        <div className="w-full h-full flex flex-col justify-between bg-[#060D1A] rounded-lg p-3 border border-[#1E2A42] text-white select-none">
                          <div className="flex items-center justify-between border-b border-[#1E2A42] pb-2">
                            <div className="flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-[#00B8F0]" />
                              <span className="text-[10px] font-mono text-[#8A9EB0]">Analytics Overview</span>
                            </div>
                            <BarChart3 className="w-3.5 h-3.5 text-[#0066FF]" />
                          </div>
                          <div className="flex gap-2 my-auto">
                            <div className="w-1/3 space-y-1.5 border-r border-[#1E2A42] pr-2">
                              <div className="h-2 w-full bg-[#1E2A42] rounded" />
                              <div className="h-2 w-4/5 bg-[#0066FF]/40 rounded" />
                              <div className="h-2 w-2/3 bg-[#00B8F0]/40 rounded" />
                              <div className="h-2 w-3/4 bg-[#1E2A42] rounded" />
                            </div>
                            <div className="w-2/3 flex items-end gap-1.5 pt-4">
                              <div className="w-1/5 bg-[#0066FF] h-[45%] rounded-t" />
                              <div className="w-1/5 bg-[#00B8F0] h-[65%] rounded-t" />
                              <div className="w-1/5 bg-[#0066FF] h-[40%] rounded-t" />
                              <div className="w-1/5 bg-[#00B8F0] h-[85%] rounded-t" />
                              <div className="w-1/5 bg-[#0066FF] h-[95%] rounded-t shadow-[0_0_8px_rgba(0,184,240,0.5)]" />
                            </div>
                          </div>
                          <div className="text-[9px] font-mono text-[#64748B] flex justify-between pt-1 border-t border-[#1E2A42]">
                            <span>Query Trends</span>
                            <span className="text-[#00B8F0]">+70% Speed</span>
                          </div>
                        </div>
                      )}

                      {study.visualType === "workflow" && (
                        <div className="w-full h-full flex flex-col justify-center items-center bg-[#060D1A] rounded-lg p-3 border border-[#1E2A42] text-white relative select-none">
                          <div className="flex items-center gap-3">
                            <div className="px-2.5 py-1 rounded bg-[#0066FF] text-[9px] font-mono font-medium shadow-[0_0_10px_rgba(0,102,255,0.4)]">User Query</div>
                            <div className="w-4 h-0.5 bg-[#00B8F0]" />
                            <div className="px-2.5 py-1 rounded bg-[#1E2A42] border border-[#00B8F0] text-[9px] font-mono text-[#00B8F0]">Intent Classifier</div>
                          </div>
                          <div className="h-4 w-0.5 bg-[#00B8F0] my-1" />
                          <div className="grid grid-cols-2 gap-2 w-full max-w-[200px]">
                            <div className="px-2 py-1 rounded bg-[#0A1628] border border-[#1E2A42] text-[8px] font-mono text-center text-[#94A3B8]">Knowledge Base</div>
                            <div className="px-2 py-1 rounded bg-[#0A1628] border border-[#1E2A42] text-[8px] font-mono text-center text-[#94A3B8]">Zendesk API</div>
                          </div>
                          <div className="mt-3 px-3 py-1 rounded-full bg-[#00B8F0]/20 border border-[#00B8F0]/40 text-[9px] font-mono text-[#00B8F0]">
                            ⚡ Autonomous Resolution
                          </div>
                        </div>
                      )}

                      {study.visualType === "document" && (
                        <div className="w-full h-full flex gap-2 bg-[#060D1A] rounded-lg p-3 border border-[#1E2A42] text-white select-none">
                          <div className="w-1/2 border border-[#1E2A42] rounded p-2 bg-[#0A1322] space-y-1.5">
                            <div className="text-[9px] font-bold text-[#94A3B8] border-b border-[#1E2A42] pb-1">Contract.pdf</div>
                            <div className="h-1.5 w-full bg-[#1E2A42] rounded" />
                            <div className="h-1.5 w-4/5 bg-[#1E2A42] rounded" />
                            <div className="h-2 w-full bg-[#00B8F0]/30 border border-[#00B8F0]/50 rounded" />
                            <div className="h-1.5 w-3/4 bg-[#1E2A42] rounded" />
                            <div className="h-1.5 w-full bg-[#1E2A42] rounded" />
                          </div>
                          <div className="w-1/2 border border-[#1E2A42] rounded p-2 bg-[#0A1322] flex flex-col justify-between">
                            <div>
                              <div className="text-[9px] font-bold text-[#00B8F0] mb-1">OCR Analysis</div>
                              <div className="text-[8px] text-[#94A3B8] space-y-1">
                                <p>• Risk: Low</p>
                                <p>• Liability: Verified</p>
                                <p>• Clauses: 42 Extracted</p>
                              </div>
                            </div>
                            <div className="text-[8px] font-mono text-[#0066FF] bg-[#0066FF]/10 px-1.5 py-0.5 rounded text-center">
                              95% Accuracy
                            </div>
                          </div>
                        </div>
                      )}

                      {study.visualType === "map" && (
                        <div className="w-full h-full flex flex-col justify-between bg-[#060D1A] rounded-lg p-3 border border-[#1E2A42] text-white relative overflow-hidden select-none">
                          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00B8F0_1px,transparent_1px)] [background-size:16px_16px]" />
                          <div className="flex items-center justify-between relative z-10">
                            <span className="text-[10px] font-mono text-[#00B8F0] font-bold">Route Planner</span>
                            <div className="px-1.5 py-0.5 rounded bg-[#0066FF]/20 border border-[#0066FF] text-[8px] font-mono text-[#0066FF]">Live Tracking</div>
                          </div>
                          <div className="relative z-10 my-auto flex items-center justify-around">
                            <div className="w-3 h-3 rounded-full bg-[#00B8F0] shadow-[0_0_8px_#00B8F0]" />
                            <div className="h-0.5 w-16 bg-gradient-to-r from-[#00B8F0] to-[#0066FF] border-t border-dashed border-[#00B8F0]" />
                            <div className="w-3 h-3 rounded-full bg-[#0066FF] shadow-[0_0_8px_#0066FF]" />
                          </div>
                          <div className="relative z-10 text-[9px] font-mono text-[#8A9EB0] flex justify-between bg-[#0A1322]/90 p-1.5 rounded border border-[#1E2A42]">
                            <span>New York ➔ Rotterdam</span>
                            <span className="text-[#00B8F0]">Optimized</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Middle: Content */}
                    <div className="flex flex-col justify-center">
                      <div className="font-mono text-[11px] font-bold text-[#0066FF] tracking-[0.12em] uppercase mb-2">
                        {study.category}
                      </div>
                      <h3 className="text-[20px] md:text-[22px] font-bold text-[#0F172A] mb-3 leading-snug">
                        {study.title}
                      </h3>
                      <p className="text-[14px] text-[#475569] mb-6 leading-relaxed">
                        {study.excerpt}
                      </p>

                      {/* Technologies */}
                      {study.technologies && study.technologies.length > 0 && (
                        <div>
                          <div className="font-mono text-[10px] font-bold text-[#0066FF] tracking-wider uppercase mb-2.5">
                            TECHNOLOGIES
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {study.technologies.map((tech, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center px-3 py-1 rounded bg-[#F1F5F9] border border-[#E2E8F0] text-[#334155] text-[12px] font-mono font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right: Metrics + Action */}
                    <div className="lg:border-l lg:border-[#E2E8F0] lg:pl-8 flex flex-col justify-between h-full pt-5 lg:pt-0 border-t lg:border-t-0 border-[#F1F5F9]">
                      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 lg:space-y-5 mb-6">
                        {study.metrics?.map((metric, i) => (
                          <div key={i}>
                            <div className="text-[24px] sm:text-[26px] xl:text-[28px] font-bold text-[#0066FF] leading-none mb-1">
                              {metric.value}
                            </div>
                            <div className="text-[12px] sm:text-[12.5px] text-[#475569] leading-tight">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      <Link
                        href={`/work/case-studies/${study.slug || study.id}`}
                        className="font-semibold text-[14px] text-[#0066FF] hover:underline flex items-center gap-1.5 mt-auto group/link"
                      >
                        View Case Study <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                ))
              )}
            </div>

          </div>
        </div>

        {/* ── IMPACT ACROSS OUR ENGAGEMENTS BANNER ── */}
        <div className="mt-14 sm:mt-20 bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 md:p-12 shadow-sm">
          <div className="text-center font-mono text-[11px] font-bold tracking-[0.16em] text-[#0066FF] uppercase mb-8 sm:mb-10">
            IMPACT ACROSS OUR ENGAGEMENTS
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 items-center">
            {[
              { icon: BarChart3, value: "20+", label: "Projects Delivered" },
              { icon: Users, value: "100+", label: "Enterprise Clients" },
              { icon: Network, value: "50M+", label: "Documents Processed" },
              { icon: ShieldCheck, value: "95%", label: "Client Satisfaction" },
              { icon: Rocket, value: "40-60%", label: "Operational Efficiency Gain" }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex flex-col items-center sm:items-start md:items-center text-center sm:text-left md:text-center">
                  <div className="w-12 h-12 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#0066FF] mb-4 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-[30px] md:text-[34px] font-bold text-[#0066FF] leading-tight mb-1">
                    {item.value}
                  </div>
                  <div className="text-[13px] text-[#475569] font-medium">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
