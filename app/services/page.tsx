import { Metadata } from 'next';
import Link from "next/link";
import { ArrowRight, Calendar, FileText, Database, Bot, Zap, Shield, Code2, Layers, CheckCircle, TrendingUp, Users, Star } from "lucide-react";
import { getCachedDynamicPage } from '@/lib/fetch-helpers';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'AI Engineering Services',
    description: 'We design, build, and deploy secure, scalable, and production-ready Enterprise RAG systems and AI Agents that deliver real business impact.',
    keywords: ['AI Engineering Services', 'Enterprise RAG', 'AI Agents', 'LLM Integration'],
  };
  try {
    const data = await getCachedDynamicPage("services");
    if (data?.metadata) meta = { ...meta, ...data.metadata };
  } catch (e) {}
  return {
    ...meta,
    openGraph: {
      title: `${meta.title} | Botmartz`,
      description: meta.description,
      url: 'https://www.botmartz.com/services',
      type: 'website',
    },
    alternates: { canonical: 'https://www.botmartz.com/services' },
  };
}

const stats = [
  { value: "50+", label: "AI Systems Deployed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "6-8wk", label: "Avg. MVP Timeline" },
  { value: "3x", label: "Avg. ROI Delivered" },
];

const whyUs = [
  { icon: Shield, title: 'Production-First', desc: 'Secure, reliable, monitored, and ready for real-world enterprise usage from day one.' },
  { icon: Layers, title: 'Modern Architecture', desc: 'Clean, modular, scalable architectures built for long-term maintainability.' },
  { icon: Code2, title: 'Research-Driven', desc: 'We stay at the frontier of AI through continuous experiments and applied research.' },
  { icon: Users, title: 'Collaborative Partner', desc: 'We work as an extension of your team for long-term, iterative success.' },
  { icon: TrendingUp, title: 'End-to-End Delivery', desc: 'From strategy and design to deployment, monitoring, and ongoing support.' },
  { icon: Zap, title: 'Secure & Compliant', desc: 'Security and data privacy built in at every layer of the AI lifecycle.' },
];

const caseStudies = [
  {
    tag: "Enterprise RAG",
    tagColor: "from-[#0066FF] to-[#00B8F0]",
    title: "Enterprise Knowledge Search",
    desc: "Built a secure RAG system to unify search across 50K+ internal documents, cutting research time by 80%.",
    metric: "80% faster",
    metricLabel: "Document Retrieval",
    gradient: "from-[#0066FF]/10 to-[#00B8F0]/5",
    border: "border-[#0066FF]/20",
  },
  {
    tag: "AI Agents",
    tagColor: "from-[#7C3AED] to-[#A78BFA]",
    title: "AI Customer Support Agent",
    desc: "Developed an AI support agent that automatically resolved 70% of support queries, reducing human workload.",
    metric: "70% resolved",
    metricLabel: "Auto-handled queries",
    gradient: "from-[#7C3AED]/10 to-[#A78BFA]/5",
    border: "border-[#7C3AED]/20",
  },
  {
    tag: "AI Automation",
    tagColor: "from-[#0066FF] to-[#7C3AED]",
    title: "AI SDR for Outreach",
    desc: "Built an autonomous SDR agent that personalizes outreach at scale and books 3x more qualified meetings.",
    metric: "3x meetings",
    metricLabel: "Booked per month",
    gradient: "from-[#0066FF]/10 to-[#7C3AED]/5",
    border: "border-[#0066FF]/20",
  },
];

export default async function ServicesIndexPage() {
  let heroData = {
    badge: "AI Engineering Services",
    title: "We Engineer Production <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-[#00B8F0] to-[#0066FF]\">AI Systems</span> That Deliver Real Business Impact.",
    subtitle: "We design, build, and deploy secure, scalable, and production-ready Enterprise RAG systems and AI Agents that help organizations automate knowledge, streamline workflows, and drive growth.",
  };
  try {
    const data = await getCachedDynamicPage("services");
    if (data?.hero) heroData = { ...heroData, ...data.hero };
  } catch (e) {}

  return (
    <main className="bg-white min-h-screen">

      {/* ═══════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════ */}
      <section className="relative pt-[130px] pb-[100px] bg-[#050B14] text-white overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,184,240,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,0.05) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)',
          }}
        />
        {/* Glow orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[55%] h-[55%] bg-[#00B8F0]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/12 blur-[160px] rounded-full pointer-events-none" />

        <div className="wrap relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#00B8F0]/10 border border-[#00B8F0]/30 text-[#00B8F0] text-[11px] font-mono font-bold uppercase tracking-widest px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B8F0] animate-pulse" />
              {heroData.badge}
            </div>
          </div>

          {/* Title */}
          <h1
            className="text-center text-[clamp(36px,5vw,68px)] leading-[1.08] font-bold mb-6 tracking-tight max-w-[900px] mx-auto"
            dangerouslySetInnerHTML={{ __html: heroData.title }}
          />

          {/* Subtitle */}
          <p className="text-center text-[17px] md:text-[19px] text-[#8A9EB0] max-w-[620px] mx-auto mb-10 leading-relaxed">
            {heroData.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-[#0066FF] to-[#00B8F0] text-white px-8 py-3.5 rounded-xl text-[15px] font-semibold flex items-center gap-2 shadow-[0_0_30px_rgba(0,102,255,0.4)] hover:shadow-[0_0_40px_rgba(0,102,255,0.6)] hover:scale-[1.03] transition-all"
            >
              Book a Discovery Call <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/work/case-studies"
              className="border border-white/20 text-white hover:border-[#00B8F0]/60 hover:text-[#00B8F0] px-8 py-3.5 rounded-xl text-[15px] font-semibold transition-all backdrop-blur-sm"
            >
              Explore Case Studies ↗
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10 max-w-[800px] mx-auto">
            {stats.map((s, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm px-6 py-5 text-center hover:bg-white/10 transition-colors">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-[12px] text-[#8A9EB0] font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CORE SERVICES
      ═══════════════════════════════════════ */}
      <section className="py-[100px] bg-white">
        <div className="wrap">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-[#0066FF] text-[11px] font-mono font-bold uppercase tracking-widest mb-4">
              <span className="w-5 h-px bg-[#0066FF]" /> Our Core Services <span className="w-5 h-px bg-[#0066FF]" />
            </div>
            <h2 className="text-[34px] md:text-[44px] font-bold text-[#0B1C2C] tracking-tight mb-4">
              Two Core Capabilities. Infinite Impact.
            </h2>
            <p className="text-[16px] text-slate-600 max-w-[520px] mx-auto leading-relaxed">
              We focus on solving real business problems with two core AI engineering capabilities, backed by robust systems and seamless integrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[980px] mx-auto">
            {/* Enterprise RAG Card */}
            <div className="group relative bg-gradient-to-br from-[#F0F7FF] to-white border border-[#0066FF]/20 rounded-3xl p-8 hover:border-[#0066FF]/50 hover:shadow-[0_20px_60px_rgba(0,102,255,0.12)] transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#0066FF]/10 to-transparent rounded-full blur-2xl pointer-events-none group-hover:from-[#0066FF]/20 transition-all duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-[#0066FF] to-[#00B8F0] rounded-2xl flex items-center justify-center mb-6 shadow-[0_8px_20px_rgba(0,102,255,0.3)] group-hover:scale-110 transition-transform">
                  <Database className="w-7 h-7 text-white" />
                </div>
                <div className="inline-flex items-center gap-1.5 bg-[#0066FF]/10 text-[#0066FF] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4">
                  Enterprise Service
                </div>
                <h3 className="text-[24px] font-bold text-[#0B1C2C] mb-3">Enterprise RAG</h3>
                <p className="text-[15px] text-slate-600 mb-6 leading-relaxed">
                  Transform enterprise knowledge into actionable intelligence. Connect, retrieve, and reason over your entire knowledge base with production-grade accuracy.
                </p>
                <ul className="space-y-2.5 mb-8">
                  {['Knowledge Search & Retrieval', 'Document Intelligence', 'PDF AI & Q&A Systems', 'Enterprise Search Copilots', 'Support AI Automation'].map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-[14px] text-slate-700">
                      <CheckCircle className="w-4 h-4 text-[#0066FF] shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/services/enterprise-rag"
                  className="inline-flex items-center gap-2 text-[#0066FF] font-semibold text-[14px] hover:gap-3 transition-all group/link"
                >
                  Explore Enterprise RAG <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* AI Agents Card */}
            <div className="group relative bg-gradient-to-br from-[#F5F0FF] to-white border border-[#7C3AED]/20 rounded-3xl p-8 hover:border-[#7C3AED]/50 hover:shadow-[0_20px_60px_rgba(124,58,237,0.12)] transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#7C3AED]/10 to-transparent rounded-full blur-2xl pointer-events-none group-hover:from-[#7C3AED]/20 transition-all duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] rounded-2xl flex items-center justify-center mb-6 shadow-[0_8px_20px_rgba(124,58,237,0.3)] group-hover:scale-110 transition-transform">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <div className="inline-flex items-center gap-1.5 bg-[#7C3AED]/10 text-[#7C3AED] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4">
                  Enterprise Service
                </div>
                <h3 className="text-[24px] font-bold text-[#0B1C2C] mb-3">AI Agents</h3>
                <p className="text-[15px] text-slate-600 mb-6 leading-relaxed">
                  Build intelligent autonomous agents that plan, act, and deliver outcomes. Automate complex multi-step workflows with reliability and full observability.
                </p>
                <ul className="space-y-2.5 mb-8">
                  {['Customer Support Agents', 'Research & Analysis Agents', 'Sales & SDR Agents', 'Workflow Automation', 'Internal AI Assistants'].map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-[14px] text-slate-700">
                      <CheckCircle className="w-4 h-4 text-[#7C3AED] shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/services/ai-agents"
                  className="inline-flex items-center gap-2 text-[#7C3AED] font-semibold text-[14px] hover:gap-3 transition-all group/link"
                >
                  Explore AI Agents <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHY CHOOSE BOTMARTZ
      ═══════════════════════════════════════ */}
      <section className="py-[100px] bg-[#050B14] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(0,184,240,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-px bg-gradient-to-r from-transparent via-[#00B8F0]/40 to-transparent" />

        <div className="wrap relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-[#00B8F0] text-[11px] font-mono font-bold uppercase tracking-widest mb-4">
              <span className="w-5 h-px bg-[#00B8F0]" /> Why Choose Botmartz <span className="w-5 h-px bg-[#00B8F0]" />
            </div>
            <h2 className="text-[34px] md:text-[44px] font-bold text-white tracking-tight mb-4">
              Engineering Excellence.<br />Built for the Real World.
            </h2>
            <p className="text-[16px] text-[#8A9EB0] max-w-[520px] mx-auto leading-relaxed">
              We combine deep engineering expertise with a production-first mindset to deliver AI systems that truly scale.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, i) => (
              <div
                key={i}
                className="group bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:border-[#00B8F0]/30 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00B8F0]/20 to-[#0066FF]/10 border border-[#00B8F0]/20 flex items-center justify-center text-[#00B8F0] mb-5 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-[17px] font-bold text-white mb-2">{item.title}</h3>
                <p className="text-[14px] text-[#8A9EB0] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TECH STACK
      ═══════════════════════════════════════ */}
      <section className="py-10 bg-slate-50 border-y border-slate-200 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10" />
        <div className="wrap flex items-center gap-8">
          <div className="font-mono text-[11px] text-[#0066FF] font-bold uppercase tracking-widest whitespace-nowrap shrink-0">
            Powered By
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 flex-1">
            {['PyTorch', 'LangGraph', 'LangChain', 'FastAPI', 'Google ADK', 'TensorFlow', 'Milvus', 'Weaviate', 'OpenAI'].map(tech => (
              <span key={tech} className="font-mono text-[13px] text-slate-500 font-semibold flex items-center gap-2 hover:text-[#0066FF] transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]/40" />{tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SOLUTIONS IN ACTION
      ═══════════════════════════════════════ */}
      <section className="py-[100px] bg-white">
        <div className="wrap">
          <div className="flex flex-wrap justify-between items-end gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-[#0066FF] text-[11px] font-mono font-bold uppercase tracking-widest mb-4">
                <span className="w-5 h-px bg-[#0066FF]" /> Solutions in Action
              </div>
              <h2 className="text-[32px] md:text-[40px] font-bold text-[#0B1C2C] tracking-tight">Real Problems. Real Impact.</h2>
              <p className="text-[16px] text-slate-600 mt-2">How we've helped organizations unlock the power of AI.</p>
            </div>
            <Link
              href="/work/case-studies"
              className="border border-slate-200 text-slate-700 hover:border-[#0066FF] hover:text-[#0066FF] px-6 py-2.5 rounded-xl text-[14px] font-semibold transition-all inline-flex items-center gap-2"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <div
                key={i}
                className={`group relative bg-gradient-to-br ${cs.gradient} border ${cs.border} rounded-2xl p-7 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden cursor-pointer`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-2xl rounded-full pointer-events-none" />
                <div className="relative z-10">
                  <div className={`inline-flex items-center gap-1.5 bg-gradient-to-r ${cs.tagColor} text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-5`}>
                    {cs.tag}
                  </div>
                  <h3 className="text-[19px] font-bold text-[#0B1C2C] mb-3">{cs.title}</h3>
                  <p className="text-[14px] text-slate-600 mb-6 leading-relaxed">{cs.desc}</p>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-[26px] font-bold text-[#0B1C2C]">{cs.metric}</div>
                      <div className="text-[12px] text-slate-500 font-medium">{cs.metricLabel}</div>
                    </div>
                    <div className="text-[13px] text-[#0066FF] font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      Read More <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════════ */}
      <section className="py-[80px] bg-slate-50 border-t border-slate-200">
        <div className="wrap">
          <div className="relative bg-gradient-to-br from-[#050B14] to-[#0B1C2C] rounded-3xl p-[48px] md:p-[64px] overflow-hidden">
            {/* Grid */}
            <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{
              backgroundImage: 'linear-gradient(rgba(0,184,240,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,0.05) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }} />
            {/* Glows */}
            <div className="absolute top-[-30%] left-[-10%] w-[50%] h-[200%] bg-[#0066FF]/15 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-30%] right-[-10%] w-[40%] h-[200%] bg-[#00B8F0]/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-[500px]">
                <div className="inline-flex items-center gap-2 text-[#00B8F0] text-[11px] font-mono font-bold uppercase tracking-widest mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00B8F0] animate-pulse" /> Ready to build together?
                </div>
                <h2 className="text-[32px] md:text-[44px] font-bold text-white leading-[1.15] mb-4 tracking-tight">
                  Let's Engineer AI That<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B8F0] to-[#0066FF]">Drives Real Results.</span>
                </h2>
                <p className="text-[15px] text-[#8A9EB0] mb-8 leading-relaxed">
                  Book a free discovery call and let's discuss how we can solve your most critical challenges with AI engineering.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0066FF] to-[#00B8F0] text-white px-8 py-4 rounded-xl text-[15px] font-bold shadow-[0_0_30px_rgba(0,102,255,0.4)] hover:shadow-[0_0_40px_rgba(0,102,255,0.6)] hover:scale-[1.03] transition-all"
                >
                  Book a Discovery Call <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="flex flex-col gap-4 w-full max-w-[340px]">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex gap-4 items-start backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#0066FF]/20 border border-[#0066FF]/30 flex items-center justify-center text-[#00B8F0] shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[15px] text-white mb-1">Free Discovery Call</h3>
                    <p className="text-[13px] text-[#8A9EB0]">30-minute strategy session to explore your AI use case and feasibility.</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex gap-4 items-start backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center text-[#A78BFA] shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[15px] text-white mb-1">Proof of Concept</h3>
                    <p className="text-[13px] text-[#8A9EB0]">We can build a rapid, working prototype in just 2-4 weeks.</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex gap-4 items-start backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#00B8F0]/20 border border-[#00B8F0]/30 flex items-center justify-center text-[#00B8F0] shrink-0">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[15px] text-white mb-1">No Lock-In</h3>
                    <p className="text-[13px] text-[#8A9EB0]">Flexible engagement models. You own every line of code we write.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}