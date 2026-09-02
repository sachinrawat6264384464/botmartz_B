import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Building2, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Terminal, 
  Compass, 
  Boxes, 
  Rocket, 
  LineChart, 
  Lock, 
  Workflow, 
  Layers, 
  Sparkles 
} from 'lucide-react';
import TrackedLink from '@/app/_components/TrackedLink';

export const metadata: Metadata = {
  title: 'About Botmartz | AI Engineering & Implementation Practice',
  description: 'Botmartz helps organizations design, implement, integrate, and operate production-ready AI systems across knowledge, workflows, data, and software.',
  keywords: [
    'About Botmartz',
    'AI Engineering Practice',
    'Enterprise AI Implementation',
    'Production AI Systems',
    'Agentic Workflows',
    'Enterprise RAG Consulting'
  ],
  openGraph: {
    title: 'About Botmartz | AI Engineering & Implementation Practice',
    description: 'Botmartz helps organizations design, implement, integrate, and operate production-ready AI systems across knowledge, workflows, data, and software.',
    url: 'https://www.botmartz.com/about',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.botmartz.com/about',
  },
};

export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Botmartz AI Solutions",
    "description": "Botmartz helps organizations design, implement, integrate, and operate production-ready AI systems across knowledge, workflows, data, and software.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Botmartz AI Solutions",
      "url": "https://www.botmartz.com",
      "logo": "https://www.botmartz.com/icon.png",
      "sameAs": [
        "https://github.com/botmartz",
        "https://discord.gg/k75ZpEnzp"
      ]
    }
  };

  const steps = [
    {
      step: '01',
      title: 'Discover',
      tagline: 'Scope the real problem & constraints',
      desc: 'We analyze your data schemas, domain vocabularies, latency limits, and security constraints before writing a single line of model logic.'
    },
    {
      step: '02',
      title: 'Architect',
      tagline: 'Design retrieval & guardrail topology',
      desc: 'We blueprint chunking strategies, hybrid indexing (Dense + BM25), cross-encoder rerankers, structured output schemas, and refusal thresholds.'
    },
    {
      step: '03',
      title: 'Implement',
      tagline: 'Engineer hardened AI pipelines',
      desc: 'We build production-grade agentic loops, citation grounding engines, OCR & table extractors, and tool-calling orchestrations.'
    },
    {
      step: '04',
      title: 'Deploy',
      tagline: 'VPC & private infrastructure rollout',
      desc: 'We deploy directly into your cloud VPC or on-prem environment with end-to-end observability, tracing, latency budgets, and fallback routes.'
    },
    {
      step: '05',
      title: 'Optimize',
      tagline: 'Continuous eval & benchmark monitoring',
      desc: 'We monitor production traffic against ground-truth evaluation suites (RAGAS precision, recall, hallucination refusal) with automated regression tests.'
    }
  ];

  const principles = [
    {
      icon: ShieldCheck,
      title: 'Grounding Over Generation',
      desc: 'Every generated claim must be backed by an immutable source citation chunk. If evidence is lacking, the system deterministically abstains.'
    },
    {
      icon: Workflow,
      title: 'Deterministic Pipelines',
      desc: 'We enforce strict Pydantic schemas and typed tool calls. LLMs are used for reasoning over verified context, not as unstructured wildcards.'
    },
    {
      icon: LineChart,
      title: 'Measurable Pre-Launch Evals',
      desc: 'No system ships on subjective vibes. We establish quantitative metrics for retrieval recall@k, faithfulness scores, and latency SLAs before go-live.'
    },
    {
      icon: Lock,
      title: 'Security & Data Isolation by Default',
      desc: 'Client data is never used for foundation model training. All sensitive pipelines execute inside client-governed VPCs with least-privilege IAM.'
    },
    {
      icon: Layers,
      title: 'Production Readiness Over Demo Novelty',
      desc: 'We engineer for real-world failure modes: rate limits, API timeouts, malformed documents, out-of-distribution queries, and model deprecation.'
    },
    {
      icon: Sparkles,
      title: 'Dual Practice Focus',
      desc: 'We bridge hands-on enterprise implementation with active open-source research and community developer training across the AI ecosystem.'
    }
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ── 1. HERO SECTION (DARK THEME) ── */}
      <section className="relative pt-[130px] pb-[80px] overflow-hidden bg-[#050B14] text-white border-b border-white/10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/12 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0052FF]/15 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/30 text-[#00B8F0] text-xs font-mono font-bold uppercase tracking-wider mb-6 shadow-sm">
              <Building2 size={14} className="text-[#00B8F0]" />
              <span>ABOUT BOTMARTZ</span>
            </div>

            <h1 className="text-[clamp(34px,5vw,60px)] font-extrabold font-heading tracking-tight leading-[1.12] text-white mb-6">
              Engineering Production-Ready AI <br />
              <span className="bg-gradient-to-r from-[#00B8F0] via-[#0066FF] to-[#60A5FA] bg-clip-text text-transparent">
                Across Systems &amp; Workflows.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#8A9EB0] max-w-3xl leading-relaxed mb-10 font-normal">
              Botmartz helps organizations design, implement, integrate, and operate production-ready AI systems across knowledge, workflows, data, and software. We operate as a specialized AI engineering practice combining dedicated client delivery with ecosystem training and open-source innovation.
            </p>

            {/* Quick Practice Pillars Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full p-5 rounded-2xl bg-[#091222]/80 border border-white/10 backdrop-blur-md text-left">
              <div>
                <div className="text-[11px] font-mono text-[#00B8F0] uppercase tracking-wider font-bold">PRACTICE FOCUS</div>
                <div className="text-lg font-bold text-white mt-1">Enterprise AI</div>
                <div className="text-[12px] text-[#8A9EB0]">RAG &amp; Agent Systems</div>
              </div>
              <div>
                <div className="text-[11px] font-mono text-[#00B8F0] uppercase tracking-wider font-bold">DEPLOYMENT MODEL</div>
                <div className="text-lg font-bold text-white mt-1">Client VPC</div>
                <div className="text-[12px] text-[#8A9EB0]">Private &amp; Secure</div>
              </div>
              <div>
                <div className="text-[11px] font-mono text-[#00B8F0] uppercase tracking-wider font-bold">VERIFIABILITY</div>
                <div className="text-lg font-bold text-white mt-1">Grounding First</div>
                <div className="text-[12px] text-[#8A9EB0]">Exact Paragraph Citations</div>
              </div>
              <div>
                <div className="text-[11px] font-mono text-[#00B8F0] uppercase tracking-wider font-bold">ECOSYSTEM</div>
                <div className="text-lg font-bold text-white mt-1">Labs &amp; Open Source</div>
                <div className="text-[12px] text-[#8A9EB0]">Developer Community</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. HOW WE WORK: THE 5-STEP FRAMEWORK (LIGHT THEME) ── */}
      <section className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="font-mono text-xs text-[#0066FF] uppercase tracking-wider font-bold mb-2">
              METHODOLOGY &amp; LIFECYCLE
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight mb-4">
              How We Work
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              A disciplined, 5-stage engineering lifecycle from initial scoping to long-term benchmark maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((s) => (
              <div 
                key={s.step} 
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-[#0066FF]/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#0066FF] flex items-center justify-center font-mono font-bold text-sm mb-4">
                    {s.step}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading mb-1">{s.title}</h3>
                  <div className="text-xs font-semibold text-[#0066FF] mb-3">{s.tagline}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 3. ENGINEERING PRINCIPLES & QUALITY BENCHMARKS (LIGHT THEME) ── */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="font-mono text-xs text-[#0066FF] uppercase tracking-wider font-bold mb-2">
              CORE PRINCIPLES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight mb-4">
              Engineering Principles &amp; Quality Benchmarks
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              What separates production AI systems from experimental demos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-[#0066FF]/40 hover:shadow-sm transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 text-[#0066FF] flex items-center justify-center mb-4">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading mb-2">{p.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 4. LEADERSHIP (LIGHT THEME) ── */}
      <section className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10">
          
          <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-sm">
            <div className="font-mono text-xs text-[#0066FF] uppercase tracking-wider font-bold mb-2">
              PRACTICE LEADERSHIP
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading mb-4">
              Engineering Leadership &amp; Background
            </h2>
            <p className="text-slate-700 text-base leading-relaxed mb-6 font-normal">
              Botmartz is led by Soham Sharma — an AWS certified AI practitioner and GenAI instructor who has trained thousands of engineers across modern AI architectures and brings the rigorous, zero-tolerance discipline of aircraft maintenance engineering to software reliability and mission-critical AI delivery.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200 text-xs">
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <CheckCircle2 size={16} className="text-[#0066FF] shrink-0" />
                <span>AWS Certified Practitioner</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <CheckCircle2 size={16} className="text-[#0066FF] shrink-0" />
                <span>GenAI Instructor &amp; Mentor</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <CheckCircle2 size={16} className="text-[#0066FF] shrink-0" />
                <span>Mission-Critical Reliability Focus</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 5. PROFESSIONAL CONTACT PATH (LIGHT THEME) ── */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mb-4">
            Discuss Your AI Architecture With Us
          </h2>
          <p className="text-base text-slate-600 mb-8 leading-relaxed">
            Whether you are designing a new enterprise RAG platform, automating mission-critical workflows, or evaluating agentic architectures, our team is ready to assist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TrackedLink
              href="/contact?type=architecture-review"
              eventName="button_click"
              eventData={{ button_name: "about_book_architecture_review" }}
              className="inline-flex items-center justify-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(0,102,255,0.3)] transition-all"
            >
              Book an Architecture Review <ArrowRight size={16} />
            </TrackedLink>
            <a
              href="https://cal.com/botmartz-ai/20min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-700 bg-white hover:border-[#0066FF] hover:text-[#0066FF] font-semibold text-sm px-8 py-3.5 rounded-xl transition-all shadow-sm"
            >
              Schedule Scoping Call (Cal.com)
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}