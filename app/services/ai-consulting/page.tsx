import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Briefcase, Search, Users, TrendingUp, Settings, MessageSquare, FileText, Lightbulb } from 'lucide-react';
import DynamicIcon from '@/app/_components/DynamicIcon';
import { adminDb } from '@/lib/firebase-admin';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'AI Consulting Services — Expert AI Guidance for Enterprises | Botmartz',
    description: 'Botmartz provides expert AI consulting for enterprises — from defining your AI vision and evaluating vendors to guiding implementation teams and measuring outcomes.',
  };
  try {
    const docSnap = await adminDb.collection('dynamic_pages').doc('ai-consulting').get();
    if (docSnap.exists) { const data = docSnap.data(); if (data?.metadata) meta = { ...meta, ...data.metadata }; }
  } catch (e) {}
  return { ...meta, openGraph: { title: meta.title, description: meta.description, url: 'https://botmartz.com/services/ai-consulting', type: 'website' }, alternates: { canonical: 'https://botmartz.com/services/ai-consulting' } };
}

const DEFAULT_CONTENT = {
  hero: {
    badge: 'Services / AI Consulting',
    title: 'Expert AI Guidance. Zero Fluff.',
    subtitle: 'We work alongside your team as AI consulting partners — helping you make the right technical decisions, avoid costly mistakes, and accelerate your AI initiatives from concept to production.',
    ctaText: 'Book a Consulting Session →',
    ctaLink: '/contact',
  },
  aeoQuestion: 'What does an AI consulting partner do?',
  aeoAnswer: 'An AI consulting partner works alongside your leadership and engineering teams to provide expert guidance on AI adoption, implementation, and optimization. This includes defining AI vision and strategy, selecting the right technology stack, evaluating vendors, guiding technical teams during implementation, establishing best practices, and measuring the business impact of AI investments. Unlike vendors who sell you software, AI consultants are objective advisors focused on your outcomes.',
  useCases: [
    { iconName: 'Search', title: 'AI Opportunity Discovery', description: 'We identify your highest-value AI opportunities through stakeholder interviews, data audits, and workflow analysis.' },
    { iconName: 'Briefcase', title: 'AI Program Leadership', description: 'Embedded AI leadership that guides your internal teams, coordinates vendors, and drives execution.' },
    { iconName: 'Users', title: 'Team Mentorship & Upskilling', description: 'Hands-on mentorship for your engineering teams on AI best practices, production patterns, and new tools.' },
    { iconName: 'Settings', title: 'Architecture Reviews', description: 'Deep technical reviews of your AI system design — identifying bottlenecks, risks, and optimization opportunities.' },
    { iconName: 'MessageSquare', title: 'Vendor Evaluation', description: 'Objective evaluation of AI vendors, models, and platforms — helping you choose what actually fits your needs.' },
    { iconName: 'TrendingUp', title: 'KPI & Measurement Design', description: 'Define the right AI metrics and measurement frameworks so you know exactly what success looks like.' },
    { iconName: 'FileText', title: 'AI Due Diligence', description: 'Technical due diligence for AI startups, acquisitions, or partnerships — from model evaluation to data provenance.' },
    { iconName: 'Lightbulb', title: 'Innovation Workshops', description: 'Facilitated AI ideation and design sprint sessions that surface new opportunities and align stakeholders.' },
  ],
  techStack: ['LangGraph', 'OpenAI', 'Anthropic', 'Google ADK', 'FastAPI', 'MLflow', 'Weights & Biases', 'dbt'],
  cta: {
    title: 'Ready to Work with an Expert AI Team?',
    subtitle: "Whether you're just starting your AI journey or scaling an existing program, we bring the expertise to move faster and make better decisions.",
    buttonText: 'Book a Consulting Session →',
  },
  structuredData: JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Consulting Services',
    provider: { '@type': 'Organization', name: 'Botmartz' },
    description: 'Expert AI consulting for enterprises including AI program leadership, architecture reviews, vendor evaluation, team mentorship, and KPI design.',
    serviceType: 'AI Consulting Services',
    areaServed: 'Worldwide',
  }),
};

export default async function AIConsultingPage() {
  let content = { ...DEFAULT_CONTENT };
  try {
    const docSnap = await adminDb.collection('dynamic_pages').doc('ai-consulting').get();
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

      {/* AEO */}
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
              <div className="space-y-6">
                {[
                  { label: 'Objective Guidance', value: 'No vendor bias — we recommend what works best for you' },
                  { label: 'Embedded Expertise', value: 'Work alongside your team, not just deliver a report' },
                  { label: 'Production Focus', value: 'We care about outcomes, not just architecture slides' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-[#00B8F0] mt-2 flex-shrink-0" />
                    <div>
                      <div className="text-white font-semibold mb-1">{label}</div>
                      <div className="text-[#8A9EB0] text-sm">{value}</div>
                    </div>
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
            <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-white mb-4">AI Consulting Services</h2>
            <p className="text-[#8A9EB0] text-[17px]">End-to-end consulting support across your entire AI journey — from strategy to scale.</p>
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
          <div className="font-mono text-[11px] text-[#8A9EB0] uppercase tracking-wider whitespace-nowrap shrink-0">We Work With</div>
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
