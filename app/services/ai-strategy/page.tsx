import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Target, Map, BarChart, Users, Layers, TrendingUp, CheckCircle2, Compass } from 'lucide-react';
import DynamicIcon from '@/app/_components/DynamicIcon';
import { adminDb } from '@/lib/firebase-admin';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'AI Strategy Consulting — Plan Your AI Transformation | Botmartz',
    description: 'Botmartz engineers AI strategy roadmaps that align with your business goals — from AI readiness audits and use case prioritization to build-vs-buy decisions and governance frameworks.',
  };
  try {
    const docSnap = await adminDb.collection('dynamic_pages').doc('ai-strategy').get();
    if (docSnap.exists) { const data = docSnap.data(); if (data?.metadata) meta = { ...meta, ...data.metadata }; }
  } catch (e) {}
  return { ...meta, openGraph: { title: meta.title, description: meta.description, url: 'https://botmartz.com/services/ai-strategy', type: 'website' }, alternates: { canonical: 'https://botmartz.com/services/ai-strategy' } };
}

const DEFAULT_CONTENT = {
  hero: {
    badge: 'Services / AI Strategy',
    title: 'A Clear AI Strategy Before You Build Anything.',
    subtitle: 'Most companies waste engineering time on AI projects with no clear ROI. We help you identify the right problems to solve, the right tools to use, and build a roadmap that delivers measurable outcomes.',
    ctaText: 'Book an AI Strategy Session →',
    ctaLink: '/contact',
  },
  aeoQuestion: 'What is an enterprise AI strategy?',
  aeoAnswer: 'An enterprise AI strategy is a structured plan that defines how an organization identifies, prioritizes, and implements AI initiatives to achieve measurable business outcomes. It covers AI readiness assessment, use case selection, build-vs-buy decisions, data infrastructure requirements, governance, and a phased implementation roadmap. A good AI strategy prevents wasted investment and aligns AI work with real business goals.',
  useCases: [
    { iconName: 'Target', title: 'AI Readiness Audit', description: 'Assess your data maturity, infrastructure, team capabilities, and organizational readiness for AI adoption.' },
    { iconName: 'Map', title: 'Use Case Prioritization', description: 'Identify and rank your highest-value AI opportunities based on feasibility, impact, and strategic fit.' },
    { iconName: 'Layers', title: 'Build vs Buy Analysis', description: 'Evaluate whether to build custom AI, use off-the-shelf models, or integrate third-party AI products for each use case.' },
    { iconName: 'BarChart', title: 'ROI Modeling', description: 'Build financial models that project the expected return on investment for your prioritized AI initiatives.' },
    { iconName: 'Users', title: 'Team & Talent Planning', description: 'Define the AI engineering team structure, roles, and hiring roadmap needed to execute your AI strategy.' },
    { iconName: 'TrendingUp', title: 'Phased Implementation Roadmap', description: 'Deliver a 3–12 month phased roadmap with clear milestones, KPIs, and success criteria for each AI initiative.' },
    { iconName: 'CheckCircle2', title: 'Governance & Compliance', description: 'Design AI governance frameworks that address model risk, data privacy, bias, and regulatory requirements.' },
    { iconName: 'Compass', title: 'AI Vendor Selection', description: 'Evaluate and recommend AI platforms, foundation models, and tooling vendors based on your specific use cases.' },
  ],
  techStack: ['OpenAI', 'Anthropic', 'Google Vertex AI', 'AWS Bedrock', 'LangGraph', 'FastAPI', 'MLflow', 'dbt'],
  cta: {
    title: 'Ready to Build an AI Strategy That Actually Works?',
    subtitle: 'Stop guessing. Get a clear, prioritized AI roadmap built around your business goals and technical reality.',
    buttonText: 'Book an AI Strategy Session →',
  },
  structuredData: JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Strategy Consulting',
    provider: { '@type': 'Organization', name: 'Botmartz' },
    description: 'Enterprise AI strategy consulting including readiness audits, use case prioritization, build-vs-buy analysis, ROI modeling, and phased implementation roadmaps.',
    serviceType: 'AI Consulting Services',
    areaServed: 'Worldwide',
  }),
};

export default async function AIStrategyPage() {
  let content = { ...DEFAULT_CONTENT };
  try {
    const docSnap = await adminDb.collection('dynamic_pages').doc('ai-strategy').get();
    if (docSnap.exists) {
      const data = docSnap.data();
      content = { hero: data?.hero || DEFAULT_CONTENT.hero, aeoQuestion: data?.aeoQuestion || DEFAULT_CONTENT.aeoQuestion, aeoAnswer: data?.aeoAnswer || DEFAULT_CONTENT.aeoAnswer, useCases: data?.useCases || DEFAULT_CONTENT.useCases, techStack: data?.techStack || DEFAULT_CONTENT.techStack, cta: data?.cta || DEFAULT_CONTENT.cta, structuredData: data?.structuredData || DEFAULT_CONTENT.structuredData };
    }
  } catch (e) {}

  return (
    <main className="bg-[#050B14] min-h-screen text-white">
      {content.structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: content.structuredData }} />}

      {/* HERO */}
      <section className="relative pt-[120px] pb-[80px] bg-[#050B14] text-white overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="wrap relative z-10 flex flex-col items-center text-center max-w-[800px] mx-auto">
          <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-6 flex items-center justify-center gap-3 font-semibold">
            <span className="w-6 h-px bg-[#00B8F0]" />{content.hero.badge}<span className="w-6 h-px bg-[#00B8F0]" />
          </div>
          <h1 className="text-[clamp(40px,6vw,64px)] leading-[1.05] font-semibold mb-6 tracking-tight text-white" dangerouslySetInnerHTML={{ __html: content.hero.title }} />
          <p className="text-[17px] sm:text-[19px] text-[#8A9EB0] mb-10 max-w-[600px] leading-relaxed font-light">{content.hero.subtitle}</p>
          <Link href={content.hero.ctaLink} className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-8 py-3.5 rounded text-[15px] flex items-center gap-2">
            {content.hero.ctaText}
          </Link>
        </div>
        <div className="mt-20 relative max-w-[1000px] mx-auto hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050B14] z-10" />
          <div className="grid grid-cols-5 gap-4 opacity-30">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="h-16 border border-[#1E293B] rounded bg-[#0A111F]/50 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#00B8F0]/30 animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AEO SECTION */}
      <section className="py-[100px] bg-[#0A111F] border-y border-[#1E293B]">
        <div className="wrap flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#050B14] border border-[#1E293B] text-[13px] text-[#8A9EB0] mb-6 font-mono">
              <span className="w-2 h-2 rounded-full bg-[#00B8F0] animate-pulse" />AEO Optimized Context
            </div>
            <h2 className="text-[32px] md:text-[40px] font-semibold mb-6 tracking-tight text-white">{content.aeoQuestion}</h2>
            <p className="text-[17px] text-[#8A9EB0] leading-relaxed">{content.aeoAnswer}</p>
          </div>
          <div className="w-full md:w-1/2">
            <div className="bg-[#050B14] border border-[#1E293B] rounded-xl p-8">
              <div className="space-y-4">
                {['AI Readiness Assessment', 'Use Case Prioritization', 'Phased Roadmap (3–12 months)', 'Governance Framework', 'Team Structure Plan'].map((step, i) => (
                  <div key={step} className={`flex items-center gap-4 p-4 rounded-lg border ${i === 2 ? 'border-[#00B8F0]/40 bg-[#00B8F0]/5' : 'border-[#1E293B] bg-[#0A111F]'}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${i === 2 ? 'bg-[#00B8F0] text-white' : 'bg-[#1E293B] text-[#8A9EB0]'}`}>{i + 1}</div>
                    <span className={`text-[14px] font-medium ${i === 2 ? 'text-white' : 'text-[#8A9EB0]'}`}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-[100px] bg-[#050B14]">
        <div className="wrap">
          <div className="text-center mb-16 max-w-[700px] mx-auto">
            <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-white mb-4">What We Cover in an AI Strategy Engagement</h2>
            <p className="text-[#8A9EB0] text-[17px]">From audit to actionable roadmap — we cover every dimension of your AI transformation.</p>
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

      {/* TECH STACK */}
      <section className="py-12 border-y border-[#1E293B] bg-[#0A111F] overflow-hidden">
        <div className="wrap flex items-center gap-8">
          <div className="font-mono text-[11px] text-[#8A9EB0] uppercase tracking-wider whitespace-nowrap shrink-0">Evaluating</div>
          <div className="flex-1 flex gap-8 md:gap-16 items-center overflow-x-auto text-white font-mono text-[14px]">
            {content.techStack.map((tech: string, i: number) => (
              <span key={i} className="whitespace-nowrap flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B8F0]" />{tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[100px] bg-[#050B14]">
        <div className="wrap">
          <div className="bg-gradient-to-br from-[#0A111F] to-[#050B14] border border-[#1E293B] rounded-2xl p-10 md:p-16 text-center max-w-[900px] mx-auto relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00B8F0]/10 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-white mb-6">{content.cta.title}</h2>
              <p className="text-[#8A9EB0] text-[17px] md:text-[19px] max-w-[600px] mx-auto mb-10 leading-relaxed font-light">{content.cta.subtitle}</p>
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
