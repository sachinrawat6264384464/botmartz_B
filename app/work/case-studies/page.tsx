"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs, doc, getDoc } from "firebase/firestore";
import { CaseStudy } from "@/types/admin";
import { ArrowRight, Terminal, Code2, Layout, BookOpen } from "lucide-react";

// Fallback Default Intro Content
const DEFAULT_INTRO = {
  hero: {
    badge: "Work / Case Studies",
    title: "Proven AI Implementations. Real Business Results.",
    subtitle: "Discover how we partner with leading organizations to deploy production-ready AI agents and RAG systems that drive operational efficiency and unlock new capabilities.",
    ctaText: "Start a Conversation →",
    ctaLink: "/contact",
  },
  cta: {
    title: "Want to see similar results in your organization?",
    subtitle: "Let's discuss how custom AI engineering can solve your specific business challenges.",
    buttonText: "Book a Discovery Call →"
  },
  structuredData: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AI Case Studies",
    "provider": {
      "@type": "Organization",
      "name": "Botmartz AI Solutions"
    }
  })
};

// Fallback Default Case Studies (in case firestore is empty)
const DEFAULT_STUDIES = [
  {
    id: "logistics-rag",
    title: "Enterprise Knowledge Search for Global Logistics",
    excerpt: "We partnered with a Fortune 500 logistics provider to build a secure enterprise RAG system. The solution unified search across 500K+ internal documents, complex SOPs, and manuals, allowing operations teams to instantly query policy data and compliance standards without hallucinations.",
    clientName: "Global Logistics Company",
    category: "Logistics",
    tags: ["RAG", "Hybrid Search", "70%", "3.2x", "LangChain", "Pinecone", "FastAPI"],
    featuredImage: "",
    status: "published"
  },
  {
    id: "saas-support",
    title: "Autonomous Support Agent for SaaS Platform",
    excerpt: "Developed a context-aware AI support agent that integrates directly into the client's Zendesk and internal databases. The agent autonomously resolves Tier 1 and Tier 2 tickets, executes basic account actions via API, and seamlessly escalates complex issues to human agents with full context.",
    clientName: "SaaS Platform",
    category: "SaaS",
    tags: ["LangGraph", "OpenAI", "45%", "35%", "Redis", "FastAPI", "Docker"],
    featuredImage: "",
    status: "published"
  },
  {
    id: "legal-doc-intel",
    title: "Legal Document Intelligence & Extraction Platform",
    excerpt: "Built a highly specialized RAG pipeline featuring advanced OCR (Optical Character Recognition) to automate contract analysis. The system ingested over 100K dense legal documents, extracting key clauses, liabilities, and risks into structured data formats for immediate review.",
    clientName: "Legal Tech Company",
    category: "Legal",
    tags: ["RAG", "OCR", "90%", "95%", "LlamaIndex", "Qdrant", "PostgreSQL"],
    featuredImage: "",
    status: "published"
  }
];

export default function CaseStudiesPage() {
  const [intro, setIntro] = useState(DEFAULT_INTRO);
  const [studies, setStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // 1. Fetch Intro configuration
        const introRef = doc(db, "dynamic_pages", "case-studies");
        const introSnap = await getDoc(introRef);
        if (introSnap.exists()) {
          const introData = introSnap.data();
          setIntro({
            hero: introData.hero || DEFAULT_INTRO.hero,
            cta: introData.cta || DEFAULT_INTRO.cta,
            structuredData: introData.structuredData || DEFAULT_INTRO.structuredData
          });
        }

        // 2. Fetch published Case Studies from collection
        const q = query(
          collection(db, "case-studies"),
          where("status", "==", "published"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          setStudies(DEFAULT_STUDIES);
        } else {
          const items: any[] = [];
          querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
          });
          setStudies(items);
        }
      } catch (err) {
        console.error("Error loading case studies content:", err);
        // Fallback to defaults on error
        setStudies(DEFAULT_STUDIES);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <main className="bg-paper">
      {intro.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: intro.structuredData }}
        />
      )}
      
      {/* HERO SECTION */}
      <section className="relative pt-[80px] pb-[60px] bg-ink text-white overflow-hidden blueprint" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.08) 1px, transparent 1px)' }}>
        <div className="wrap relative z-10 flex flex-col items-center text-center max-w-[800px] mx-auto">
          <div className="font-mono text-[11px] text-signal uppercase tracking-[0.12em] mb-4 flex items-center gap-2 justify-center">
            <Link href="/work" className="hover:text-white transition-colors">Work</Link> <span>/</span> <span className="text-white">{intro.hero.badge || "Case Studies"}</span>
          </div>
          <h1 className="text-[clamp(32px,4.5vw,50px)] leading-[1.05] font-semibold mb-6">
            {intro.hero.title}
          </h1>
          <p className="text-[17px] text-[#9FB9C8] mb-8 max-w-[600px] mx-auto">
            {intro.hero.subtitle}
          </p>
        </div>
      </section>

      {/* CASE STUDIES GRID */}
      <section className="py-[60px] bg-white">
        <div className="wrap flex flex-col gap-10">
           
           {studies.map((study, idx) => {
             // Parse metrics and tags dynamically from study.tags
             const tagsList = study.tags || [];
             const metrics = tagsList.filter((t: string) => t.includes("%") || /^\d+(\.\d+)?x$/.test(t));
             const otherTags = tagsList.filter((t: string) => !t.includes("%") && !/^\d+(\.\d+)?x$/.test(t));

             return (
               <div key={study.id} className="flex flex-col md:flex-row gap-8 items-stretch pb-10 border-b border-line group last:border-b-0">
                  {/* Left Thumbnail visual placeholder */}
                  <div className="w-full md:w-[45%] lg:w-[40%] bg-ink rounded border border-line overflow-hidden relative min-h-[260px]">
                     {study.featuredImage ? (
                       <img 
                         src={study.featuredImage} 
                         alt={study.title} 
                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                       />
                     ) : (
                       <>
                         <div className="absolute inset-0 blueprint opacity-20"></div>
                         <div className="absolute inset-4 bg-white/5 border border-white/10 rounded backdrop-blur flex items-center justify-center p-4">
                           <div className="w-full h-full bg-grid-bg border border-line rounded flex flex-col opacity-50 overflow-hidden">
                              <div className="h-4 border-b border-line w-full"></div>
                              <div className="flex-1 flex gap-2 p-2">
                                <div className="w-1/3 h-full border border-line rounded-sm"></div>
                                <div className="flex-1 h-full border border-line rounded-sm flex flex-col gap-2 p-2">
                                   <div className="h-2 w-full bg-line rounded"></div>
                                   <div className="h-2 w-2/3 bg-line rounded"></div>
                                </div>
                              </div>
                           </div>
                         </div>
                       </>
                     )}
                  </div>
                  
                  {/* Right Details */}
                  <div className="flex-1 flex flex-col justify-between">
                     <div>
                        <div className="font-mono text-[10px] text-brand uppercase bg-brand/10 inline-block px-2 py-1 rounded mb-3">
                          {study.clientName || "Client"} • {study.category || "AI engineering"}
                        </div>
                        <h3 className="text-[24px] font-semibold mb-3 group-hover:text-brand transition-colors">
                          {study.title}
                        </h3>
                        <p className="text-[15px] text-ink-soft mb-6">
                          {study.excerpt}
                        </p>
                        
                        {/* Tech Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                           {otherTags.map((t: string) => (
                             <span key={t} className="font-mono text-[10.5px] border border-line text-ink-soft px-2 py-1 rounded-sm">{t}</span>
                           ))}
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-8 border-t border-line pt-4">
                        {metrics.map((m: string, mIdx: number) => (
                          <div key={mIdx}>
                             <div className="text-[20px] font-semibold leading-none mb-1 text-brand">{m}</div>
                             <div className="text-[12px] text-ink-soft">
                               {mIdx === 0 ? (m.includes("%") ? "Performance Gain" : "Scale Boost") : (m.includes("%") ? "Efficiency rate" : "Productivity factor")}
                             </div>
                          </div>
                        ))}
                        {metrics.length === 0 && (
                          <div>
                            <div className="text-[20px] font-semibold leading-none mb-1 text-brand">Deploy</div>
                            <div className="text-[12px] text-ink-soft">Production status</div>
                          </div>
                        )}
                        <Link href="/contact" className="ml-auto font-mono text-[13px] text-brand flex items-center gap-2 group-hover:gap-3 transition-all">
                          Discuss a similar project <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                     </div>
                  </div>
               </div>
             );
           })}

        </div>
      </section>

      {/* CTA */}
      <section className="py-[80px] bg-white border-t border-line">
        <div className="wrap text-center max-w-[600px] mx-auto">
          <h2 className="text-[32px] font-semibold leading-[1.1] mb-4">
            {intro.cta.title}
          </h2>
          <p className="text-[15px] text-ink-soft mb-8">
            {intro.cta.subtitle}
          </p>
          <Link href="/contact" className="btn btn-primary bg-brand hover:bg-deep">
            {intro.cta.buttonText}
          </Link>
        </div>
      </section>
    </main>
  );
}
