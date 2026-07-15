"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { 
  ArrowRight, Database, FileText, Search, ShieldCheck, Zap, 
  Layers, RefreshCw, BarChart, Server, LayoutTemplate, Briefcase, 
  FileSearch, HelpCircle, Calendar 
} from "lucide-react";
import DynamicIcon from "@/app/_components/DynamicIcon";

// Fallback Default Content
const DEFAULT_CONTENT = {
  hero: {
    badge: "Services / Enterprise RAG",
    title: "Turn Your Enterprise Knowledge Into Actionable Intelligence.",
    subtitle: "Our Enterprise RAG solutions help organizations securely connect, retrieve, and reason over their data—delivering accurate answers and insights from documents, databases, and internal systems.",
    ctaText: "Book a Discovery Call →",
    ctaLink: "/contact",
  },
  aeoQuestion: "What is enterprise RAG?",
  aeoAnswer: "Enterprise RAG (Retrieval-Augmented Generation) is an AI architecture that connects large language models securely to a company's internal data. Unlike public chatbots, enterprise RAG systems use advanced chunking, hybrid search, and strict access controls to ensure the AI generates accurate, verifiable answers based exclusively on proprietary business knowledge.",
  useCases: [
    { iconName: "Search", title: "Knowledge Search", description: "Find answers instantly across manuals, policies, and internal docs." },
    { iconName: "FileText", title: "Document Intelligence", description: "Extract insights and summaries from contracts, reports, and PDFs." },
    { iconName: "HelpCircle", title: "PDF AI & Q&A", description: "Ask questions and get accurate answers from complex documents." },
    { iconName: "Server", title: "Enterprise Search", description: "Go beyond keyword search with semantic understanding of your data." },
    { iconName: "RefreshCw", title: "Support AI", description: "Empower support teams with instant, accurate responses." },
    { iconName: "FileSearch", title: "Research Copilot", description: "Accelerate research with contextual insights from multiple sources." },
  ],
  techStack: ["PyTorch", "LangChain", "LangGraph", "FastAPI", "Chroma", "PostgreSQL", "Docker", "AWS"],
  cta: {
    title: "Ready to Unlock the Power of Your Enterprise Data?",
    subtitle: "Book a free discovery call and let's explore how Enterprise RAG can drive real impact for your business.",
    buttonText: "Book a Discovery Call →"
  },
  structuredData: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Enterprise RAG Development",
    "provider": {
      "@type": "Organization",
      "name": "Botmartz"
    },
    "description": "Enterprise RAG (Retrieval-Augmented Generation) is an AI architecture that connects large language models securely to a company's internal data. We build RAG systems using advanced chunking, hybrid search, and strict access controls.",
    "serviceType": "AI Engineering Services"
  })
};

export default function EnterpriseRAGPage() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPageConfig() {
      try {
        const docRef = doc(db, "dynamic_pages", "enterprise-rag");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setContent({
            hero: data.hero || DEFAULT_CONTENT.hero,
            aeoQuestion: data.aeoQuestion || DEFAULT_CONTENT.aeoQuestion,
            aeoAnswer: data.aeoAnswer || DEFAULT_CONTENT.aeoAnswer,
            useCases: data.useCases || DEFAULT_CONTENT.useCases,
            techStack: data.techStack || DEFAULT_CONTENT.techStack,
            cta: data.cta || DEFAULT_CONTENT.cta,
            structuredData: data.structuredData || DEFAULT_CONTENT.structuredData
          });
        }
      } catch (err) {
        console.error("Error loading dynamic content for Enterprise RAG:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPageConfig();
  }, []);

  return (
    <main>
      {content.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: content.structuredData
          }}
        />
      )}

      {/* HERO SECTION */}
      <section className="relative pt-[80px] pb-0 bg-ink text-white overflow-hidden blueprint" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.08) 1px, transparent 1px)' }}>
        <div className="wrap relative z-10 flex flex-col md:flex-row items-center gap-10 pb-16">
          <div className="flex-1">
            <div className="font-mono text-[11px] text-signal uppercase tracking-[0.12em] mb-4 flex items-center gap-2">
              <Link href="/services" className="hover:text-white transition-colors">Services</Link> <span>/</span> <span className="text-white">{content.hero.badge || "Enterprise RAG"}</span>
            </div>
            <h1 className="text-[clamp(32px,4.5vw,50px)] leading-[1.1] font-semibold mb-6">
              {content.hero.title}
            </h1>
            <p className="text-[17px] text-[#9FB9C8] max-w-[540px] mb-8">
              {content.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={content.hero.ctaLink || "/contact"} className="btn btn-primary bg-brand text-white hover:bg-deep">
                {content.hero.ctaText}
              </Link>
              <Link href="/work/case-studies" className="btn btn-ghost border-line text-white hover:border-brand hover:text-brand">Explore Case Studies ↗</Link>
            </div>
          </div>
          <div className="flex-1 hidden lg:block">
            {/* Abstract Graphics */}
            <div className="w-full aspect-video max-w-[500px] ml-auto relative">
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full border border-brand/20 rounded-xl relative overflow-hidden bg-white/5 backdrop-blur-sm p-6 flex flex-col gap-4 shadow-[0_20px_60px_rgba(0,146,215,0.15)]">
                    <div className="flex justify-between items-center text-signal/50 font-mono text-[10px]">
                      <span>QUERY_INPUT</span>
                      <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/> LIVE</span>
                    </div>
                    <div className="h-6 w-3/4 bg-white/10 rounded-sm"></div>
                    <div className="flex-1 flex gap-4">
                      <div className="w-1/3 border border-white/10 rounded-sm bg-white/5 p-3 flex flex-col gap-2">
                        <div className="h-2 w-full bg-white/10 rounded-sm"></div>
                        <div className="h-2 w-4/5 bg-white/10 rounded-sm"></div>
                        <div className="h-2 w-full bg-white/10 rounded-sm"></div>
                        <div className="mt-auto pt-2 border-t border-white/10 font-mono text-[8px] text-brand">VECTOR_DB</div>
                      </div>
                      <div className="flex-1 border border-brand/30 rounded-sm bg-brand/10 p-3 shadow-[inset_0_0_20px_rgba(0,146,215,0.2)]">
                        <div className="font-mono text-[10px] text-white mb-2">SYNTHESIZING...</div>
                        <div className="h-2 w-full bg-brand/40 rounded-sm mb-2"></div>
                        <div className="h-2 w-5/6 bg-brand/40 rounded-sm mb-2"></div>
                        <div className="h-2 w-full bg-brand/40 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Feature strip at bottom of hero */}
        <div className="border-t border-white/10 bg-white/5 backdrop-blur-md relative z-10">
          <div className="wrap grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { t: 'Accurate Answers', i: Search },
              { t: 'Secure & Privacy-First', i: ShieldCheck },
              { t: 'Scalable for Enterprise', i: Layers },
              { t: 'Built for Production', i: Zap }
            ].map((f, i) => (
              <div key={i} className="py-5 px-4 flex items-center justify-center gap-3 text-center md:text-left">
                <f.i className="w-5 h-5 text-brand" />
                <span className="font-mono text-[11px] text-[#9FB9C8] uppercase tracking-wider">{f.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT IS ENTERPRISE RAG - AEO ANSWER BLOCK */}
      <section className="section-pad">
        <div className="wrap mb-12 flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-1/2">
            <h2 className="text-[30px] font-semibold mb-4">{content.aeoQuestion}</h2>
            <p className="text-[16px] text-ink leading-relaxed">
              {content.aeoAnswer}
            </p>
          </div>
          <div className="md:w-1/2 bg-paper p-8 border border-line rounded-sm">
             <blockquote className="text-[15px] italic text-ink-soft border-l-2 border-brand pl-4 mb-4">
               "In the production RAG systems we've built, chunking strategy and retrieval quality account for roughly 70% of the system's success or failure. The LLM is just the presentation layer."
             </blockquote>
             <cite className="text-[13px] font-semibold font-mono text-brand not-italic">— Soham Sharma, Founder at Botmartz</cite>
          </div>
        </div>
        
        {/* Core RAG Benefits */}
        <div className="wrap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Search, title: 'Unified Knowledge Access', desc: 'Connect siloed data across documents, databases, and apps into one intelligent interface.' },
            { icon: ShieldCheck, title: 'Accurate & Verifiable', desc: 'Ground responses in your data with source citations you can trust.' },
            { icon: Database, title: 'Secure by Design', desc: 'Enterprise-grade security, access control, and strict data isolation.' },
            { icon: Layers, title: 'Scalable & Reliable', desc: 'Built to handle thousands of users and millions of documents.' },
            { icon: LayoutTemplate, title: 'Domain-Aware', desc: 'Fine-tuned retrieval and reasoning for your industry and specific use cases.' },
            { icon: Zap, title: 'Faster Time to Value', desc: 'Proven frameworks, accelerators, and best practices for rapid deployment.' }
          ].map((item, i) => (
            <div key={i} className="bg-grid-bg border border-line p-8 rounded-sm hover:border-brand transition-colors">
              <div className="w-10 h-10 rounded-full bg-white border border-line flex items-center justify-center mb-4 text-brand">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="text-[18px] font-semibold mb-2">{item.title}</h3>
              <p className="text-[14px] text-ink-soft">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RAG ARCHITECTURE DIAGRAM */}
      <section className="section-pad section-alt border-y border-line">
        <div className="wrap text-center mb-[50px]">
          <div className="eyebrow justify-center">Our RAG Architecture</div>
          <h2 className="text-[34px] font-semibold mb-4">Production-Grade. Secure. Scalable.</h2>
          <p className="text-[15.5px] text-ink-soft max-w-[500px] mx-auto">
            A robust architecture that ensures quality, speed, and accuracy at every step of the pipeline.
          </p>
        </div>

        {/* Diagram Built in React/Tailwind */}
        <div className="wrap max-w-[1000px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch justify-center relative">
            
            {/* Step 1 */}
            <div className="flex-1 bg-white border border-line p-5 rounded-sm shadow-sm relative z-10 text-center flex flex-col justify-center">
              <div className="font-mono text-[10px] text-brand mb-2">1. INGEST</div>
              <div className="font-semibold text-[14px] mb-1">Data Sources</div>
              <p className="text-[12px] text-ink-soft">PDFs, SQL, Notion, APIs</p>
            </div>
            
            <div className="hidden lg:flex items-center justify-center text-line"><ArrowRight /></div>

            {/* Step 2 */}
            <div className="flex-1 bg-white border border-line p-5 rounded-sm shadow-sm relative z-10 text-center flex flex-col justify-center">
              <div className="font-mono text-[10px] text-brand mb-2">2. PREPROCESS</div>
              <div className="font-semibold text-[14px] mb-1">Chunking & Parsing</div>
              <p className="text-[12px] text-ink-soft">Semantic splitting, metadata</p>
            </div>

            <div className="hidden lg:flex items-center justify-center text-line"><ArrowRight /></div>

            {/* Step 3 */}
            <div className="flex-1 bg-white border border-line border-brand/50 p-5 rounded-sm shadow-[0_0_20px_rgba(0,146,215,0.1)] relative z-10 text-center flex flex-col justify-center">
              <div className="font-mono text-[10px] text-brand mb-2">3. RETRIEVAL</div>
              <div className="font-semibold text-[14px] mb-1">Hybrid Search</div>
              <p className="text-[12px] text-ink-soft">Vector + Keyword search</p>
            </div>

            <div className="hidden lg:flex items-center justify-center text-line"><ArrowRight /></div>

            {/* Step 4 */}
            <div className="flex-1 bg-white border border-line p-5 rounded-sm shadow-sm relative z-10 text-center flex flex-col justify-center">
              <div className="font-mono text-[10px] text-brand mb-2">4. GENERATION</div>
              <div className="font-semibold text-[14px] mb-1">LLM Synthesis</div>
              <p className="text-[12px] text-ink-soft">Prompting, Citations, Guardrails</p>
            </div>

          </div>

          {/* Bottom Security Strip */}
          <div className="mt-8 border border-line bg-white py-4 px-6 rounded-sm flex flex-wrap justify-between items-center gap-4">
            {[
              { t: 'Security & Compliance' },
              { t: 'Access Control' },
              { t: 'Audit Logs' },
              { t: 'Data Isolation' },
              { t: 'Enterprise Ready' },
            ].map((f, i) => (
               <div key={i} className="flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4 text-[#8598A6]" />
                 <span className="font-mono text-[11px] text-ink-soft uppercase">{f.t}</span>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="section-pad">
        <div className="wrap text-center mb-[40px]">
          <div className="eyebrow justify-center">Use Cases</div>
          <h2 className="text-[30px] font-semibold">Where Enterprise RAG Delivers Value.</h2>
        </div>
        <div className="wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {content.useCases.map((item, i) => (
            <div key={i} className="bg-white border border-line p-6 hover:shadow-lg transition-shadow">
              <div className="text-brand mb-4">
                <DynamicIcon name={item.iconName} className="w-6 h-6" />
              </div>
              <h4 className="text-[17px] font-semibold mb-2">{item.title}</h4>
              <p className="text-[14px] text-ink-soft leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STACK */}
      <section className="border-y border-line bg-white">
        <div className="wrap flex flex-col md:flex-row items-center">
          <div className="font-mono text-[11px] text-brand uppercase tracking-[0.08em] py-4 pr-8 border-b md:border-b-0 md:border-r border-line w-full md:w-auto text-center md:text-left">Built With Modern AI Engineering Stack</div>
          <div className="flex flex-wrap flex-1">
            {content.techStack.map((tech, i) => (
              <div key={tech} className="flex-1 min-w-[100px] p-[16px_10px] font-mono text-[12px] text-ink-soft text-center border-r border-line last:border-r-0">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-[80px]">
        <div className="wrap">
          <div className="bg-ink rounded-[24px] p-[40px] md:p-[60px] text-white flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden">
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            <div className="relative z-10 max-w-[480px]">
              <h2 className="text-[36px] font-semibold leading-[1.1] mb-4">
                {content.cta.title}
              </h2>
              <p className="text-[15px] text-[#9FB9C8] mb-8">
                {content.cta.subtitle}
              </p>
              <Link href="/contact" className="btn btn-primary bg-brand hover:bg-deep">
                {content.cta.buttonText}
              </Link>
            </div>

            <div className="relative z-10 flex flex-col gap-4 w-full max-w-[340px]">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-4 items-start">
                <div className="bg-white/10 p-2.5 rounded-lg text-white">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[15px] mb-1">Free Discovery Call</h4>
                  <p className="text-[13px] text-[#9FB9C8]">60-minute strategy session with our AI engineers.</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-4 items-start">
                <div className="bg-white/10 p-2.5 rounded-lg text-white">
                  <BarChart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[15px] mb-1">Tailored Use Case Review</h4>
                  <p className="text-[13px] text-[#9FB9C8]">We analyze your data and challenges.</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-4 items-start">
                <div className="bg-white/10 p-2.5 rounded-lg text-white">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[15px] mb-1">Actionable Roadmap</h4>
                  <p className="text-[13px] text-[#9FB9C8]">Get a clear plan and project estimation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
