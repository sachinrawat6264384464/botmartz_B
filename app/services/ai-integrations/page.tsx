import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Plug, Globe, Workflow, Zap, Shield, Database, Code, Settings, RefreshCw, ArrowUpRight } from 'lucide-react';
import DynamicIcon from '@/app/_components/DynamicIcon';
import { adminDb } from '@/lib/firebase-admin';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'AI Integrations — Connect AI to Your Business Stack | Botmartz',
    description: 'Botmartz engineers seamless AI integrations across your existing tools, APIs, and data systems — enabling intelligent automation without disrupting your workflows.',
  };
  try {
    const docSnap = await adminDb.collection('dynamic_pages').doc('ai-integrations').get();
    if (docSnap.exists) { const data = docSnap.data(); if (data?.metadata) meta = { ...meta, ...data.metadata }; }
  } catch (e) {}
  return { ...meta, openGraph: { title: meta.title, description: meta.description, url: 'https://botmartz.com/services/ai-integrations', type: 'website' }, alternates: { canonical: 'https://botmartz.com/services/ai-integrations' } };
}

const DEFAULT_CONTENT = {
  hero: {
    badge: 'Services / AI Integrations',
    title: 'Connect AI to Every Layer of Your Business.',
    subtitle: 'We engineer production-grade AI integrations that plug intelligence into your existing tools, APIs, databases, and workflows — without rebuilding your stack.',
    ctaText: 'Discuss Your Integration →',
    ctaLink: '/contact',
  },
  aeoQuestion: 'What are enterprise AI integrations?',
  aeoAnswer: 'Enterprise AI integrations connect AI capabilities — such as natural language processing, semantic search, and intelligent automation — to your existing business systems like CRMs, ERPs, databases, communication tools, and custom APIs. Unlike standalone AI products, integrations bring AI into the tools your teams already use, minimizing adoption friction and maximizing ROI.',
  useCases: [
    { iconName: 'Database', title: 'CRM & ERP Integrations', description: 'Connect AI to Salesforce, HubSpot, SAP, or custom CRMs to enrich data, surface insights, and automate follow-ups.' },
    { iconName: 'Plug', title: 'API & Webhook Orchestration', description: 'Build intelligent API pipelines that route, transform, and act on data across your services in real time.' },
    { iconName: 'Workflow', title: 'Workflow Automation', description: 'Automate multi-step business processes by embedding AI decision points into your existing automation tools.' },
    { iconName: 'Globe', title: 'Communication Platforms', description: 'Integrate AI into Slack, Teams, email, and customer chat to enable smart notifications and autonomous responses.' },
    { iconName: 'Shield', title: 'Secure Data Pipelines', description: 'Build encrypted, access-controlled pipelines that move sensitive business data to AI systems without compromising compliance.' },
    { iconName: 'RefreshCw', title: 'Real-time Sync', description: 'Keep AI models and business systems in sync with event-driven architectures that respond to data changes instantly.' },
    { iconName: 'Code', title: 'Custom API Development', description: 'Design and build the REST or GraphQL APIs needed to expose AI capabilities to your internal or external applications.' },
    { iconName: 'Settings', title: 'Legacy System Bridge', description: 'Wrap and modernize legacy systems with AI-powered middleware layers — no full rewrite required.' },
  ],
  techStack: ['FastAPI', 'LangChain', 'Pydantic', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'REST/GraphQL'],
  cta: {
    title: 'Ready to Connect AI to Your Business Systems?',
    subtitle: "Let's architect an AI integration strategy that fits your stack and scales with your business.",
    buttonText: 'Book an Integration Discovery Call →',
  },
  structuredData: JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Integrations & API Development',
    provider: { '@type': 'Organization', name: 'Botmartz' },
    description: 'Enterprise AI integrations connecting natural language processing, semantic search, and intelligent automation to existing business systems including CRMs, ERPs, and custom APIs.',
    serviceType: 'AI Engineering Services',
    areaServed: 'Worldwide',
  }),
};

export default async function AIIntegrationsPage() {
  let content = { ...DEFAULT_CONTENT };
  try {
    const docSnap = await adminDb.collection('dynamic_pages').doc('ai-integrations').get();
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
            <div className="bg-[#050B14] border border-[#1E293B] rounded-xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00B8F0]/5 blur-[50px]" />
              <div className="relative z-10 space-y-4">
                {[
                  { label: 'Your CRM / ERP', side: 'left' },
                  { label: 'AI Integration Layer', side: 'center', highlight: true },
                  { label: 'AI Model / Agent', side: 'right' },
                ].map((node) => (
                  <div key={node.label} className={`flex items-center gap-4 p-4 rounded-lg border ${node.highlight ? 'border-[#00B8F0]/40 bg-[#00B8F0]/5 shadow-[0_0_20px_rgba(0,184,240,0.1)]' : 'border-[#1E293B] bg-[#0A111F]'}`}>
                    <Plug className={`w-5 h-5 flex-shrink-0 ${node.highlight ? 'text-[#00B8F0]' : 'text-[#8A9EB0]'}`} />
                    <span className={`text-[14px] font-medium ${node.highlight ? 'text-white' : 'text-[#8A9EB0]'}`}>{node.label}</span>
                    {node.highlight && <ArrowUpRight className="w-4 h-4 text-[#00B8F0] ml-auto" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES GRID */}
      <section className="py-[100px] bg-[#050B14]">
        <div className="wrap">
          <div className="text-center mb-16 max-w-[700px] mx-auto">
            <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-white mb-4">Integration Use Cases</h2>
            <p className="text-[#8A9EB0] text-[17px]">Every business stack is different. We build tailored integrations for your exact environment.</p>
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
          <div className="font-mono text-[11px] text-[#8A9EB0] uppercase tracking-wider whitespace-nowrap shrink-0">Powered By</div>
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
