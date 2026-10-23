import React from "react";
import Link from "next/link";
import { getCachedDynamicPage } from "@/lib/fetch-helpers";
import { 
  ArrowRight, Database, Layout, Mail, MessageSquare, Calendar, 
  Globe, Server, ShieldCheck, Zap, Activity, Code, Briefcase, 
  FileSearch, HelpCircle, Users, Speaker, PieChart, Workflow, Lock, Settings 
} from "lucide-react";
import DynamicIcon from "@/app/_components/DynamicIcon";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const content = await getCachedDynamicPage(slug);
  if (!content) return { title: "Service Not Found | Botmartz" };

  const rawTitle = content.seoTitle || content.hero?.badge || content.title || "Enterprise AI Solutions";
  const title = rawTitle.includes("Botmartz") ? rawTitle : `${rawTitle} | Botmartz`;
  
  const rawDescription = content.seoDescription || content.hero?.subtitle || "Botmartz designs and deploys production-ready Enterprise RAG and autonomous AI agent systems.";
  const description = rawDescription.length > 155 ? rawDescription.substring(0, 152) + "..." : rawDescription;

  const url = `https://www.botmartz.com/services/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Botmartz",
      type: "website",
      images: [
        {
          url: "/BotmartznewBot.png",
          width: 1200,
          height: 630,
          alt: `${title} - Botmartz AI Solutions`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/BotmartznewBot.png"],
    },
  };
}

export default async function DynamicServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await getCachedDynamicPage(slug);

  if (!content) {
    return (
      <div className="min-h-screen bg-ink text-white flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold mb-4 font-mono">404 - Page Not Found</h1>
        <p className="text-ink-soft mb-8">The requested service page does not exist or has not been configured yet.</p>
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
          dangerouslySetInnerHTML={{
            __html: content.structuredData
          }}
        />
      )}

      {/* HERO SECTION */}
      <section className="relative pt-[120px] pb-16 bg-[#050B14] text-white overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="wrap relative z-10 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 lg:max-w-[620px]">
            <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-6 flex items-center gap-3 font-semibold">
              <span className="w-6 h-px bg-[#00B8F0]"></span>
              <Link href="/services" className="hover:text-white transition-colors">Services</Link> <span>/</span> <span className="text-white">{content.hero?.badge || content.title}</span>
            </div>
            <h1 className="text-[clamp(36px,4.5vw,56px)] leading-[1.1] font-semibold mb-6 tracking-tight text-white">
              {content.hero?.title || content.title}
            </h1>
            <p className="text-[17px] text-[#8A9EB0] max-w-[540px] mb-8 leading-relaxed">
              {content.hero?.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={content.hero?.ctaLink || "/contact"} className="btn btn-primary bg-brand text-white hover:bg-deep">
                {content.hero?.ctaText || "Get Started →"}
              </Link>
              <Link href="/work" className="btn btn-ghost border-line text-white hover:border-brand hover:text-brand">Explore Production Work ↗</Link>
            </div>
          </div>
          
          <div className="flex-1 w-full lg:block border-l border-white/10 lg:pl-12 flex flex-col justify-center">
             <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm relative">
                <Code className="w-10 h-10 text-brand mb-4" />
                <h3 className="text-[20px] font-semibold mb-2">Architecting the AI Era</h3>
                <p className="text-[14px] text-[#9FB9C8]">We deploy production-grade autonomous intelligence systems, custom agent configurations, and RAG systems tailored to optimize operations.</p>
             </div>
          </div>
        </div>
      </section>

      {/* AEO ANSWER SECTION */}
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
        <section className="section-pad bg-slate-50 border-y border-line text-slate-900">
          <div className="wrap text-center mb-[60px]">
            <div className="eyebrow justify-center">Offerings &amp; Capabilities</div>
            <h2 className="text-[34px] font-semibold mb-4 text-slate-900 font-heading">Core Focus Areas &amp; Use Cases</h2>
          </div>
          
          <div className="wrap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.useCases.map((item: any, i: number) => (
              <div key={i} className="bg-white border border-slate-200 p-6 rounded-xl hover:border-brand/60 transition-colors shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-brand mb-4">
                    <DynamicIcon name={item.iconName || "Briefcase"} className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-[18px] mb-2 text-slate-900">{item.title}</h3>
                  <p className="text-[14px] text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TECH STACK */}
      {content.techStack && content.techStack.length > 0 && (
        <section className="section-pad border-t border-line bg-paper">
          <div className="wrap max-w-4xl text-center">
            <div className="eyebrow justify-center mb-3">Integrations &amp; Tech Stack</div>
            <h2 className="text-[28px] font-semibold mb-8 text-ink">Built With Industry-Standard Tooling</h2>
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

      {/* CTA SECTION */}
      {content.cta && (
        <section className="section-pad bg-slate-50 border-t border-line text-slate-900 relative overflow-hidden">
          <div className="wrap relative z-10 text-center max-w-[720px] mx-auto">
            <h2 className="text-[clamp(28px,4vw,42px)] leading-tight font-semibold mb-4 text-slate-900 font-heading">
              {content.cta.title}
            </h2>
            <p className="text-[17px] text-slate-600 mb-8 max-w-[580px] mx-auto leading-relaxed">
              {content.cta.subtitle}
            </p>
            <Link href="/contact" className="btn btn-primary bg-[#0066FF] hover:bg-[#0052CC] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md inline-block">
              {content.cta.buttonText || "Schedule discovery call"}
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
