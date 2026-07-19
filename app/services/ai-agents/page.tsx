import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowRight, Database, Layout, Mail, MessageSquare, Calendar, 
  Globe, Server, ShieldCheck, Zap, Activity, Code, Briefcase, 
  FileSearch, HelpCircle, Users, Speaker, PieChart, Workflow, Lock, Settings 
} from "lucide-react";
import DynamicIcon from "@/app/_components/DynamicIcon";
import SchemaMarkup from "@/app/_components/SchemaMarkup";
import { adminDb } from '@/lib/firebase-admin';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Intelligent AI Agents for Business',
    description: 'We build production-ready AI agents that reason, plan, take action, and deliver real business outcomes across your tools, data, and workflows.',
  };
  
  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("ai-agents").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      if (data?.metadata) {
        meta = { ...meta, ...data.metadata };
      }
    }
  } catch (e) {}

  return {
    ...meta,
    openGraph: {
      title: `${meta.title} | Botmartz`,
      description: meta.description,
      url: 'https://www.botmartz.com/services/ai-agents',
      type: 'website',
    },
    alternates: {
      canonical: 'https://www.botmartz.com/services/ai-agents',
    },
  };
}

const DEFAULT_CONTENT = {
  hero: {
    badge: "Services / AI Agents",
    title: "Intelligent AI Agents That Get Things Done.",
    subtitle: "We build production-ready AI agents that reason, plan, take action, and deliver real business outcomes across your tools, data, and workflows.",
    ctaText: "Book an AI Strategy Session →",
    ctaLink: "/contact",
  },
  aeoQuestion: "What are AI agents for business?",
  aeoAnswer: "AI agents for business are autonomous software systems that can plan, reason, and take action to solve complex workflows. Unlike traditional chatbots that only answer questions, enterprise AI agents connect to your internal tools (like CRM, databases, and email) to execute multi-step tasks such as customer support, sales research, and data analysis.",
  useCases: [
    { iconName: "Briefcase", title: "Sales Agents", description: "Qualify leads, research prospects, and draft personalized outreach that converts." },
    { iconName: "HelpCircle", title: "Support Agents", description: "Resolve tickets, find answers, and take actions across your systems." },
    { iconName: "FileSearch", title: "Research Agents", description: "Deep research, data synthesis, and insight reports in minutes, not hours." },
    { iconName: "Speaker", title: "Marketing Agents", description: "Create content, run campaigns, analyze performance, and optimize results." },
    { iconName: "Users", title: "HR Agents", description: "Screen resumes, answer employee queries, and streamline HR workflows." },
    { iconName: "Settings", title: "Ops Agents", description: "Monitor systems, trigger workflows, and ensure smooth operations." },
    { iconName: "Code", title: "Dev Agents", description: "Write code, review PRs, generate tests, and accelerate engineering velocity." },
    { iconName: "PieChart", title: "Finance Agents", description: "Reconcile data, flag anomalies, and generate financial reports." },
  ],
  techStack: ["LangGraph", "Google ADK", "OpenAI", "Anthropic", "FastAPI", "Pydantic", "PostgreSQL", "Redis"],
  cta: {
    title: "Ready to Deploy Intelligent AI Agents in Your Organization?",
    subtitle: "Let's design and build AI agents that automate work, enhance productivity, and drive real business outcomes.",
    buttonText: "Book an AI Strategy Session →"
  },
  structuredData: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Enterprise AI Agents Development",
    "provider": {
      "@type": "Organization",
      "name": "Botmartz"
    },
    "description": "AI agents for business are autonomous software systems that can plan, reason, and take action to solve complex workflows. We build enterprise AI agents that connect to your internal tools.",
    "serviceType": "AI Engineering Services"
  })
};

export default async function AIAgentsPage() {
  let content = { ...DEFAULT_CONTENT };

  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("ai-agents").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      content = {
        hero: data?.hero || DEFAULT_CONTENT.hero,
        aeoQuestion: data?.aeoQuestion || DEFAULT_CONTENT.aeoQuestion,
        aeoAnswer: data?.aeoAnswer || DEFAULT_CONTENT.aeoAnswer,
        useCases: data?.useCases || DEFAULT_CONTENT.useCases,
        techStack: data?.techStack || DEFAULT_CONTENT.techStack,
        cta: data?.cta || DEFAULT_CONTENT.cta,
        structuredData: data?.structuredData || DEFAULT_CONTENT.structuredData
      };
    }
  } catch (e) {}

  return (
    <main className="bg-[#050B14] min-h-screen text-white">
      {/* Dynamic SEO JSON-LD injection */}
      {content.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: content.structuredData
          }}
        />
      )}

      {/* HERO SECTION (DARK) */}
      <section className="relative pt-[120px] pb-[80px] bg-[#050B14] text-white overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="wrap relative z-10 flex flex-col items-center text-center max-w-[800px] mx-auto">
          <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-6 flex items-center justify-center gap-3 font-semibold">
            <span className="w-6 h-px bg-[#00B8F0]"></span>
            {content.hero.badge}
            <span className="w-6 h-px bg-[#00B8F0]"></span>
          </div>
          <h1 
            className="text-[clamp(40px,6vw,64px)] leading-[1.05] font-semibold mb-6 tracking-tight text-white"
            dangerouslySetInnerHTML={{ __html: content.hero.title }}
          />
          <p className="text-[17px] sm:text-[19px] text-[#8A9EB0] mb-10 max-w-[600px] leading-relaxed font-light">
            {content.hero.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={content.hero.ctaLink} className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-8 py-3.5 rounded text-[15px] flex items-center gap-2">
              {content.hero.ctaText}
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="mt-20 relative max-w-[1000px] mx-auto hidden md:block">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050B14] z-10"></div>
           <div className="grid grid-cols-5 gap-4 opacity-30">
              {Array.from({length: 15}).map((_, i) => (
                 <div key={i} className="h-16 border border-[#1E293B] rounded bg-[#0A111F]/50 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#00B8F0]/30 animate-pulse" style={{ animationDelay: `${i * 150}ms`}}></div>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* AEO / WHAT IS THIS SECTION */}
      <section className="py-[100px] bg-[#0A111F] border-y border-[#1E293B]">
        <div className="wrap flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#050B14] border border-[#1E293B] text-[13px] text-[#8A9EB0] mb-6 font-mono">
              <span className="w-2 h-2 rounded-full bg-[#00B8F0] animate-pulse"></span>
              AEO Optimized Context
            </div>
            <h2 className="text-[32px] md:text-[40px] font-semibold mb-6 tracking-tight text-white">{content.aeoQuestion}</h2>
            <p className="text-[17px] text-[#8A9EB0] leading-relaxed">
              {content.aeoAnswer}
            </p>
          </div>
          <div className="w-full md:w-1/2">
             <div className="blueprint rounded-xl p-8 bg-[#050B14] border border-[#1E293B] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00B8F0]/5 blur-[50px]"></div>
                
                {/* Visual Representation of Agent Workflow */}
                <div className="flex flex-col gap-6 relative z-10">
                   <div className="flex items-center gap-4 bg-[#0A111F] p-4 rounded-lg border border-[#1E293B]">
                      <div className="w-10 h-10 rounded bg-[#00B8F0]/10 flex items-center justify-center text-[#00B8F0]">
                         <MessageSquare className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                         <div className="text-[10px] font-mono text-[#8A9EB0] uppercase tracking-wider mb-1">Trigger</div>
                         <div className="text-[14px] font-medium text-white">Incoming Support Ticket (Zendesk)</div>
                      </div>
                   </div>

                   <div className="flex justify-center -my-2 z-0 relative">
                      <div className="w-px h-8 bg-gradient-to-b from-[#1E293B] to-[#00B8F0]"></div>
                      <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[#00B8F0] bg-[#050B14] z-10 flex items-center justify-center">
                         <ArrowRight className="w-2 h-2 text-[#00B8F0] rotate-90" />
                      </div>
                   </div>

                   <div className="flex items-center gap-4 bg-[#00B8F0]/10 p-4 rounded-lg border border-[#00B8F0]/30 shadow-[0_0_20px_rgba(0,184,240,0.1)]">
                      <div className="w-10 h-10 rounded bg-[#00B8F0] flex items-center justify-center text-white">
                         <Workflow className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                         <div className="text-[10px] font-mono text-[#00B8F0] uppercase tracking-wider mb-1">Reasoning Engine</div>
                         <div className="text-[14px] font-medium text-white">Agent Analyzes Request & Plans Actions</div>
                      </div>
                   </div>

                   <div className="flex justify-between px-12 -my-2 z-0 relative">
                      <div className="w-px h-8 bg-gradient-to-b from-[#00B8F0] to-[#1E293B]"></div>
                      <div className="w-px h-8 bg-gradient-to-b from-[#00B8F0] to-[#1E293B]"></div>
                   </div>

                   <div className="flex gap-4">
                      <div className="flex-1 flex flex-col items-center gap-3 bg-[#0A111F] p-4 rounded-lg border border-[#1E293B] text-center">
                         <Database className="w-5 h-5 text-[#8A9EB0]" />
                         <div>
                            <div className="text-[10px] font-mono text-[#8A9EB0] uppercase tracking-wider mb-1">Action 1</div>
                            <div className="text-[12px] text-white">Query Order DB</div>
                         </div>
                      </div>
                      <div className="flex-1 flex flex-col items-center gap-3 bg-[#0A111F] p-4 rounded-lg border border-[#1E293B] text-center">
                         <Layout className="w-5 h-5 text-[#8A9EB0]" />
                         <div>
                            <div className="text-[10px] font-mono text-[#8A9EB0] uppercase tracking-wider mb-1">Action 2</div>
                            <div className="text-[12px] text-white">Process Refund</div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* USE CASES GRID */}
      <section className="py-[100px] bg-[#050B14]">
        <div className="wrap">
          <div className="text-center mb-16 max-w-[700px] mx-auto">
             <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-white mb-4">Enterprise Agent Use Cases</h2>
             <p className="text-[#8A9EB0] text-[17px]">We build specialized agents to automate high-value workflows across your organization.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.useCases.map((uc: any, i: number) => (
              <div key={i} className="bg-[#0A111F] border border-[#1E293B] rounded-xl p-6 hover:border-[#00B8F0]/50 hover:shadow-[0_0_30px_rgba(0,184,240,0.05)] transition-all group">
                <div className="w-12 h-12 rounded-lg bg-[#050B14] border border-[#1E293B] flex items-center justify-center mb-6 text-[#8A9EB0] group-hover:text-[#00B8F0] group-hover:border-[#00B8F0]/30 transition-colors">
                  <DynamicIcon name={uc.iconName} />
                </div>
                <h3 className="text-[18px] font-semibold text-white mb-3">{uc.title}</h3>
                <p className="text-[14px] text-[#8A9EB0] leading-relaxed">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK TICKER */}
      <section className="py-12 border-y border-[#1E293B] bg-[#0A111F] overflow-hidden">
         <div className="wrap flex items-center gap-8">
            <div className="font-mono text-[11px] text-[#8A9EB0] uppercase tracking-wider whitespace-nowrap shrink-0">Powered By</div>
            <div className="flex-1 flex gap-8 md:gap-16 items-center overflow-x-auto hide-scrollbar text-white font-mono text-[14px]">
               {content.techStack.map((tech: string, i: number) => (
                 <span key={i} className="whitespace-nowrap flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00B8F0]"></span>
                    {tech}
                 </span>
               ))}
            </div>
         </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-[100px] bg-[#050B14]">
        <div className="wrap">
          <div className="bg-gradient-to-br from-[#0A111F] to-[#050B14] border border-[#1E293B] rounded-2xl p-10 md:p-16 text-center max-w-[900px] mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00B8F0]/10 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-white mb-6">
                {content.cta.title}
              </h2>
              <p className="text-[#8A9EB0] text-[17px] md:text-[19px] max-w-[600px] mx-auto mb-10 leading-relaxed font-light">
                {content.cta.subtitle}
              </p>
              <Link href="/contact" className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-8 py-4 rounded text-[15px] inline-flex items-center gap-2 font-medium">
                {content.cta.buttonText}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
