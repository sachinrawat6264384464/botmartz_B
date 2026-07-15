"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Code, Briefcase } from "lucide-react";
import DynamicIcon from "@/app/_components/DynamicIcon";

export default function DynamicIndustryPage({ params }: { params: any }) {
  const resolvedParams = params instanceof Promise ? use(params) : params;
  const slug = resolvedParams?.slug;

  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    async function fetchPageConfig() {
      try {
        const docRef = doc(db, "dynamic_pages", slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContent(docSnap.data());
        }
      } catch (err) {
        console.error("Error loading dynamic industry page:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPageConfig();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-zinc-700 border-t-brand rounded-full animate-spin" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-ink text-white flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold mb-4 font-mono">404 - Page Not Found</h1>
        <p className="text-[#9FB9C8] mb-8">This industry page has not been configured yet.</p>
        <Link href="/" className="btn btn-primary bg-brand px-6 py-2.5 rounded-xl font-semibold text-white hover:bg-deep">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <main>
      {/* Dynamic SEO JSON-LD injection */}
      {content.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: content.structuredData }}
        />
      )}

      {/* HERO SECTION */}
      <section
        className="relative pt-[120px] pb-16 bg-ink text-white overflow-hidden blueprint"
        style={{ backgroundImage: "linear-gradient(rgba(0,184,240,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.08) 1px, transparent 1px)" }}
      >
        <div className="wrap relative z-10 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 lg:max-w-[620px]">
            <div className="font-mono text-[11px] text-signal uppercase tracking-[0.12em] mb-4 flex items-center gap-2">
              <Link href="/industries" className="hover:text-white transition-colors">Industries</Link>{" "}
              <span>/</span>{" "}
              <span className="text-white">{content.hero?.badge || content.title}</span>
            </div>
            <h1 className="text-[clamp(32px,4.5vw,52px)] leading-[1.05] font-semibold mb-6">
              {content.hero?.title || content.title}
            </h1>
            <p className="text-[17px] text-[#9FB9C8] max-w-[540px] mb-8 leading-relaxed">
              {content.hero?.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={content.hero?.ctaLink || "/contact"} className="btn btn-primary bg-brand text-white hover:bg-deep">
                {content.hero?.ctaText || "Discuss Your Use Case →"}
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full lg:block border-l border-white/10 lg:pl-12 flex flex-col justify-center">
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
              <Code className="w-10 h-10 text-brand mb-4" />
              <h3 className="text-[20px] font-semibold mb-2">Purpose-Built AI for Your Industry</h3>
              <p className="text-[14px] text-[#9FB9C8]">
                Botmartz designs industry-specific AI systems that align with your operational context, compliance requirements, and business goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AEO BLOCK */}
      {content.aeoQuestion && content.aeoAnswer && (
        <section className="section-pad border-y border-line bg-paper">
          <div className="wrap max-w-[850px] mx-auto text-center">
            <h3 className="text-xs font-bold text-brand uppercase tracking-widest mb-3 font-mono">AI Answer Engine Block</h3>
            <h2 className="text-[24px] md:text-[28px] font-semibold text-ink mb-6 leading-tight">
              {content.aeoQuestion}
            </h2>
            <div className="text-[15px] md:text-[16px] text-ink-soft leading-relaxed text-left bg-white border border-line rounded-2xl p-6 md:p-8 shadow-sm">
              <span className="font-bold text-brand mr-2">Answer:</span>
              {content.aeoAnswer}
            </div>
          </div>
        </section>
      )}

      {/* USE CASES */}
      {content.useCases && content.useCases.length > 0 && (
        <section className="section-pad">
          <div className="wrap text-center mb-[60px]">
            <div className="eyebrow justify-center">Key Use Cases</div>
            <h2 className="text-[34px] font-semibold mb-4">Transforming {content.title} with AI</h2>
          </div>

          <div className="wrap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.useCases.map((item: any, i: number) => (
              <div
                key={i}
                className="bg-white border border-line p-6 rounded-xl shadow-sm hover:border-brand transition-colors"
              >
                <div className="text-brand mb-4">
                  <DynamicIcon name={item.iconName || "Briefcase"} className="w-8 h-8" />
                </div>
                <h4 className="font-semibold text-[18px] mb-2 text-ink">{item.title}</h4>
                <p className="text-[14px] text-ink-soft leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TECH STACK */}
      {content.techStack && content.techStack.length > 0 && (
        <section className="section-pad border-t border-line bg-paper">
          <div className="wrap max-w-4xl text-center">
            <div className="eyebrow justify-center mb-3">Tech Stack</div>
            <h2 className="text-[28px] font-semibold mb-8 text-ink">Built With Best-in-Class Tooling</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {content.techStack.map((tech: string, i: number) => (
                <span key={i} className="px-4 py-2 bg-white border border-line rounded-xl text-sm font-semibold text-ink-soft shadow-xs font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      {content.cta && (
        <section className="section-pad bg-brand text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-to-t from-deep/50 to-transparent" />
          <div className="wrap relative z-10 text-center max-w-[720px] mx-auto">
            <h2 className="text-[clamp(28px,4vw,42px)] leading-none font-semibold mb-4">
              {content.cta.title}
            </h2>
            <p className="text-[17px] opacity-80 mb-8 max-w-[580px] mx-auto leading-relaxed">
              {content.cta.subtitle}
            </p>
            <Link
              href="/contact"
              className="btn btn-primary bg-white text-brand hover:bg-neutral-50 px-8 py-3 rounded-xl font-bold transition-all shadow-md inline-block"
            >
              {content.cta.buttonText || "Schedule a Discovery Call →"}
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
