"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ArrowRight, Scale, Search, FileText, FileSearch, ShieldCheck, Database, Landmark } from "lucide-react";
import DynamicIcon from "@/app/_components/DynamicIcon";

// Fallback Default Content
const DEFAULT_CONTENT = {
  hero: {
    badge: "Industries / Legal",
    title: "AI Solutions for Legal Practice.",
    subtitle: "Accelerate legal workflows, automate document analysis, and deliver accurate insights with secure, context-aware AI systems built for compliance.",
    ctaText: "Discuss Your Use Case →",
    ctaLink: "/contact",
  },
  useCases: [
    { iconName: "FileSearch", title: "Contract Review & Analysis", description: "Automate the extraction of key clauses, liabilities, and risks from massive volumes of contracts using advanced NLP." },
    { iconName: "Landmark", title: "Case Law Search (RAG)", description: "Chat with your internal repository of case files and legal precedents to build arguments faster and more comprehensively." },
    { iconName: "FileText", title: "Litigation Support", description: "Synthesize discovery documents, flag relevant evidence, and generate summaries to support litigation strategy." },
  ],
  featuredCaseStudy: {
    title: "Contract Intelligence for Legal Tech Company",
    description: "We developed a highly specialized RAG pipeline featuring advanced OCR (Optical Character Recognition) to automate contract analysis and Q&A across 100K+ legal documents with 95% accuracy.",
    statValue1: "90%",
    statLabel1: "Time saved in analysis",
    statValue2: "95%",
    statLabel2: "Extraction accuracy",
    link: "/work/case-studies"
  },
  cta: {
    title: "Ready to automate your legal workflows?",
    subtitle: "Let's build secure, accurate AI solutions for your firm or legal department.",
    buttonText: "Book a Discovery Call →"
  },
  structuredData: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AI Solutions for Legal",
    "provider": {
      "@type": "Organization",
      "name": "Botmartz AI Solutions"
    }
  })
};

export default function LegalIndustryPage() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPageConfig() {
      try {
        const docRef = doc(db, "dynamic_pages", "legal");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setContent({
            hero: data.hero || DEFAULT_CONTENT.hero,
            useCases: data.useCases || DEFAULT_CONTENT.useCases,
            featuredCaseStudy: data.featuredCaseStudy || DEFAULT_CONTENT.featuredCaseStudy,
            cta: data.cta || DEFAULT_CONTENT.cta,
            structuredData: data.structuredData || DEFAULT_CONTENT.structuredData
          });
        }
      } catch (err) {
        console.error("Error loading dynamic content for Legal industry:", err);
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
      <section className="relative pt-[80px] pb-[60px] bg-ink text-white overflow-hidden blueprint" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.08) 1px, transparent 1px)' }}>
        <div className="wrap relative z-10 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 lg:max-w-[600px]">
            <div className="font-mono text-[11px] text-signal uppercase tracking-[0.12em] mb-4 flex items-center gap-2">
              <Link href="/industries" className="hover:text-white transition-colors">Industries</Link> <span>/</span> <span className="text-white">{content.hero.badge || "Legal"}</span>
            </div>
            <h1 className="text-[clamp(32px,4.5vw,50px)] leading-[1.05] font-semibold mb-6">
              {content.hero.title}
            </h1>
            <p className="text-[17px] text-[#9FB9C8] mb-8">
              {content.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={content.hero.ctaLink || "/contact"} className="btn btn-primary bg-brand text-white hover:bg-deep">
                {content.hero.ctaText}
              </Link>
            </div>
          </div>
          
          <div className="flex-1 w-full lg:block border-l border-white/10 lg:pl-12 flex flex-col justify-center">
             <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm relative">
                <Scale className="w-10 h-10 text-brand mb-4" />
                <h3 className="text-[20px] font-semibold mb-2">Accuracy Meets Security</h3>
                <p className="text-[14px] text-[#9FB9C8]">Legal practice demands precision. We engineer AI solutions that parse dense contracts and case law without hallucinations, keeping your data private.</p>
             </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="section-pad">
        <div className="wrap text-center mb-[60px]">
          <div className="eyebrow justify-center">Key Use Cases</div>
          <h2 className="text-[34px] font-semibold mb-4">Empowering Legal Teams.</h2>
        </div>
        
        <div className="wrap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.useCases.map((item, i) => (
             <div key={i} className="bg-white border border-line p-6 rounded shadow-sm hover:border-brand transition-colors">
                <div className="text-brand mb-4">
                  <DynamicIcon name={item.iconName} className="w-8 h-8" />
                </div>
                <h4 className="font-semibold text-[18px] mb-2">{item.title}</h4>
                <p className="text-[14px] text-ink-soft">{item.description}</p>
             </div>
          ))}
        </div>
      </section>

      {/* CASE STUDY HIGHLIGHT */}
      <section className="section-pad bg-paper border-t border-line">
        <div className="wrap flex flex-col md:flex-row items-center gap-12">
           <div className="md:w-1/2">
              <div className="font-mono text-[11px] text-brand uppercase tracking-[0.08em] mb-3">Featured Case Study</div>
              <h2 className="text-[30px] font-semibold mb-4">{content.featuredCaseStudy.title}</h2>
              <p className="text-[15px] text-ink-soft mb-6">
                {content.featuredCaseStudy.description}
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                 <div>
                    <div className="text-[24px] font-semibold text-brand mb-1">{content.featuredCaseStudy.statValue1}</div>
                    <div className="text-[12px] text-ink-soft">{content.featuredCaseStudy.statLabel1}</div>
                 </div>
                 <div>
                    <div className="text-[24px] font-semibold text-brand mb-1">{content.featuredCaseStudy.statValue2}</div>
                    <div className="text-[12px] text-ink-soft">{content.featuredCaseStudy.statLabel2}</div>
                 </div>
              </div>
              <Link href={content.featuredCaseStudy.link || "/work/case-studies"} className="font-mono text-[13px] text-brand flex items-center gap-2 hover:gap-3 transition-all">View All Case Studies <ArrowRight className="w-3.5 h-3.5" /></Link>
           </div>
           <div className="md:w-1/2 w-full">
              <div className="bg-white border border-line p-8 rounded shadow-sm w-full min-h-[300px] flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-grid-bg opacity-50"></div>
                 <div className="relative z-10 w-full max-w-[340px] bg-white border border-line rounded-lg shadow-xl overflow-hidden">
                    <div className="bg-brand text-white p-3 font-semibold text-[13px] flex items-center gap-2"><Scale className="w-4 h-4"/> Contract Analyst</div>
                    <div className="p-4 bg-gray-50 flex flex-col gap-3">
                       <div className="bg-white border border-line rounded p-2.5 text-[12px] self-end max-w-[80%]">Extract all limitation of liability clauses from the vendor agreements.</div>
                       <div className="bg-brand/5 border border-brand/20 rounded p-2.5 text-[12px] self-start max-w-[80%] text-ink">Found 3 limitation clauses. Vendor A caps liability at $1M... <br/><br/><span className="text-brand font-mono text-[10px]">Source: Vendor_Agreements_2024.pdf</span></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[80px] bg-white">
        <div className="wrap text-center max-w-[600px] mx-auto">
          <h2 className="text-[32px] font-semibold leading-[1.1] mb-4">
            {content.cta.title}
          </h2>
          <p className="text-[15px] text-ink-soft mb-8">
            {content.cta.subtitle}
          </p>
          <Link href="/contact" className="btn btn-primary bg-brand hover:bg-deep">
            {content.cta.buttonText}
          </Link>
        </div>
      </section>
    </main>
  );
}
