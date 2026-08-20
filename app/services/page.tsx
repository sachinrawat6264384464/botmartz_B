import { Metadata } from 'next';
import Link from "next/link";
import { ArrowRight, Calendar, FileText, Zap, Shield, Clock, BarChart3, Database, Bot, CheckCircle, ChevronRight, Layers, Cpu, Award } from "lucide-react";
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

export default async function ServicesIndexPage() {
  let heroData = {
    badge: "AI Engineering Services",
    title: "We Engineer Production <span class=\"text-[#00B8F0]\">AI Systems</span> That Deliver Real Business Impact.",
    subtitle: "We design, build, and deploy secure, scalable, and production-ready Enterprise RAG systems and AI Agents that help organizations automate knowledge, streamline workflows, and drive growth."
  };
  try {
    const data = await getCachedDynamicPage("services");
    if (data?.hero) heroData = { ...heroData, ...data.hero };
  } catch (e) {}

  return (
    <main className="bg-white min-h-screen text-slate-900">

      {/* ═══════════════════════════════════════════
          1. HERO SECTION (Dark theme - original palette)
      ═══════════════════════════════════════════ */}
      <section className="relative pt-[130px] pb-[100px] bg-[#050B14] text-white overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,184,240,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,0.08) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />

        <div className="wrap relative z-10 max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left Content */}
            <div className="flex-1 text-left">
              <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-6 flex items-center gap-3 font-semibold">
                <span className="w-6 h-px bg-[#00B8F0]"></span>
                {heroData.badge}
              </div>

              <h1 
                className="text-[clamp(36px,4.5vw,56px)] leading-[1.12] font-extrabold mb-6 tracking-tight text-white"
                dangerouslySetInnerHTML={{ __html: heroData.title }}
              />

              <p className="text-[17px] md:text-[18px] text-[#8A9EB0] max-w-[580px] mb-8 font-normal leading-relaxed">
                {heroData.subtitle}
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <a 
                  href="https://cal.com/botmartz-ai/20min" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#00B8F0] hover:bg-[#0096C7] text-white px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-all shadow-[0_4px_20px_rgba(0,184,240,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  Book a Discovery Call <ArrowRight className="w-4 h-4" />
                </a>
                <Link 
                  href="/work/case-studies" 
                  className="inline-flex items-center gap-2 border border-slate-700 text-white hover:border-[#00B8F0] hover:text-[#00B8F0] px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-all hover:bg-white/5"
                >
                  Explore Case Studies ↗
                </Link>
              </div>
            </div>

            {/* Right Interactive Node Graphic */}
            <div className="flex-1 hidden lg:block">
              <div className="w-full aspect-square max-w-[460px] ml-auto relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-72 h-72 border border-[#00B8F0]/30 rounded-full absolute animate-[spin_24s_linear_infinite]" />
                  <div className="w-52 h-52 border border-[#0066FF]/40 rounded-full absolute animate-[spin_18s_linear_infinite_reverse]" />
                  <div className="w-36 h-36 bg-gradient-to-br from-[#00B8F0] to-[#0A111F] rounded-3xl rotate-12 flex items-center justify-center shadow-[0_0_50px_rgba(0,184,240,0.35)] border border-[#00B8F0]/40">
                    <Cpu className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. CORE SERVICES SECTION (Light theme - original palette)
      ═══════════════════════════════════════════ */}
      <section className="py-[100px] bg-white">
        <div className="wrap max-w-[1200px] mx-auto px-4 md:px-6">
          
          <div className="text-center mb-16 max-w-[640px] mx-auto">
            <div className="font-mono text-[11px] text-[#00B8F0] uppercase tracking-[0.14em] mb-3 font-semibold flex items-center justify-center gap-2">
              <span className="w-5 h-px bg-[#00B8F0]"></span>
              Our Core Services
              <span className="w-5 h-px bg-[#00B8F0]"></span>
            </div>
            <h2 className="text-[32px] md:text-[40px] font-bold text-slate-900 mb-4 tracking-tight">
              AI Solutions Built for Production.
            </h2>
            <p className="text-[16px] text-slate-600 font-normal leading-relaxed">
              We focus on solving real business problems with two core capabilities backed by robust engineering and seamless integrations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1050px] mx-auto">

            {/* Service 1: Enterprise RAG */}
            <div className="bg-slate-50 border border-slate-200 p-8 md:p-10 rounded-2xl transition-all duration-300 hover:border-[#00B8F0] hover:shadow-[0_8px_30px_rgba(0,184,240,0.12)] flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 border border-slate-200 shadow-sm text-[#00B8F0] group-hover:border-[#00B8F0]/40 transition-colors">
                  <Database className="w-7 h-7" />
                </div>
                <div className="font-mono text-[11px] text-[#00B8F0] uppercase tracking-wider font-bold mb-2">Capabilities 01</div>
                <h3 className="text-[24px] font-bold mb-3 text-slate-900">Enterprise RAG</h3>
                <p className="text-[15px] text-slate-600 mb-6 leading-relaxed">
                  Transform enterprise knowledge into actionable intelligence with secure, grounded retrieval pipelines.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Knowledge Search & Discovery', 'Document Intelligence & Extraction', 'PDF AI & Multi-format Q&A', 'Enterprise Vector Search', 'Support AI Copilots'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-[14px] text-slate-700 font-medium">
                      <CheckCircle className="w-4 h-4 text-[#00B8F0] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link 
                href="/services/enterprise-rag" 
                className="font-mono text-[13px] text-[#00B8F0] font-bold inline-flex items-center gap-2 hover:underline pt-4 border-t border-slate-200/80"
              >
                Learn details about Enterprise RAG <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* Service 2: AI Agents */}
            <div className="bg-slate-50 border border-slate-200 p-8 md:p-10 rounded-2xl transition-all duration-300 hover:border-[#00B8F0] hover:shadow-[0_8px_30px_rgba(0,184,240,0.12)] relative overflow-hidden flex flex-col justify-between group">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#00B8F0]/5 blur-3xl rounded-full pointer-events-none" />
              <div>
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 border border-slate-200 shadow-sm text-[#00B8F0] group-hover:border-[#00B8F0]/40 transition-colors relative z-10">
                  <Bot className="w-7 h-7" />
                </div>
                <div className="font-mono text-[11px] text-[#00B8F0] uppercase tracking-wider font-bold mb-2 relative z-10">Capabilities 02</div>
                <h3 className="text-[24px] font-bold mb-3 text-slate-900 relative z-10">AI Agents</h3>
                <p className="text-[15px] text-slate-600 mb-6 leading-relaxed relative z-10">
                  Build autonomous intelligent agents that execute multi-step workflows, tool calling, and complex business logic.
                </p>
                <ul className="space-y-3 mb-8 relative z-10">
                  {['Customer Support Autonomous Agents', 'Research & Analysis AI Workflows', 'Sales & SDR Outreach Agents', 'System & API Workflow Automation', 'Internal Corporate AI Assistants'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-[14px] text-slate-700 font-medium">
                      <CheckCircle className="w-4 h-4 text-[#00B8F0] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link 
                href="/services/ai-agents" 
                className="font-mono text-[13px] text-[#00B8F0] font-bold inline-flex items-center gap-2 hover:underline pt-4 border-t border-slate-200/80 relative z-10"
              >
                Learn details about AI Agents <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. WHY CHOOSE BOTMARTZ (Light slate theme - original palette)
      ═══════════════════════════════════════════ */}
      <section className="py-[90px] bg-slate-50 border-y border-slate-200">
        <div className="wrap max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="text-center mb-14 max-w-[650px] mx-auto">
            <div className="font-mono text-[11px] text-[#00B8F0] uppercase tracking-[0.14em] mb-3 font-semibold">Why Choose Botmartz</div>
            <h2 className="text-[30px] md:text-[36px] font-bold text-slate-900 mb-4 tracking-tight">
              Engineering Excellence. Built for the Real World.
            </h2>
            <p className="text-[15.5px] text-slate-600 font-normal">
              We combine deep engineering expertise with a production-first mindset to deliver AI systems that scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: 'Production-First', d: 'Secure, reliable, monitored, and fully ready for real-world production usage.', icon: Zap },
              { t: 'Modern Architecture', d: 'Clean, modular, and scalable architectures built for long-term maintainability.', icon: Layers },
              { t: 'Research-Driven', d: 'We stay at the frontier of AI through continuous engineering experiments.', icon: Award },
              { t: 'Secure & Compliant', d: 'Security and data privacy built in at every layer of the software lifecycle.', icon: Shield },
              { t: 'Collaborative Partner', d: 'We work directly as an extension of your core engineering team.', icon: Clock },
              { t: 'End-to-End Delivery', d: 'From initial strategy and POC design to full cloud deployment and support.', icon: BarChart3 }
            ].map((item, i) => {
              const IconComponent = item.icon;
              return (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-7 hover:border-[#00B8F0]/50 hover:shadow-md transition-all">
                  <div className="w-10 h-10 bg-[#00B8F0]/10 border border-[#00B8F0]/20 rounded-lg flex items-center justify-center mb-4 text-[#00B8F0]">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-[17px] font-bold mb-2 text-slate-900">{item.t}</h3>
                  <p className="text-[14px] text-slate-600 leading-relaxed font-normal">{item.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. TECH STACK TICKER (Original light style)
      ═══════════════════════════════════════════ */}
      <section className="border-b border-slate-200 bg-white py-4 overflow-hidden relative">
        <div className="wrap flex flex-col md:flex-row items-center gap-4 max-w-[1200px] mx-auto px-4">
          <div className="font-mono text-[11px] text-[#00B8F0] uppercase tracking-[0.08em] pr-6 md:border-r border-slate-200 shrink-0 font-bold">
            Powered By Stack
          </div>
          <div className="flex flex-wrap flex-1 justify-around items-center gap-6">
            {['PyTorch', 'LangGraph', 'LangChain', 'FastAPI', 'Google ADK', 'TensorFlow', 'Milvus', 'Weaviate'].map((tech) => (
              <span key={tech} className="font-mono text-[13px] text-slate-600 font-semibold hover:text-[#00B8F0] transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. SOLUTIONS IN ACTION (Original light style)
      ═══════════════════════════════════════════ */}
      <section className="py-[90px] bg-white">
        <div className="wrap max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div>
              <div className="font-mono text-[11px] text-[#00B8F0] uppercase tracking-[0.1em] mb-2 font-semibold">Solutions in Action</div>
              <h2 className="text-[32px] font-bold text-slate-900 tracking-tight">Real Problems. Real Impact.</h2>
              <p className="text-[15px] text-slate-600 mt-1">Explore how we've helped organizations unlock the power of AI.</p>
            </div>
            <Link 
              href="/work/case-studies" 
              className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 hover:border-[#00B8F0] hover:text-[#00B8F0] px-5 py-2.5 rounded-lg text-[13.5px] font-semibold transition-all"
            >
              View All Case Studies →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden group cursor-pointer hover:border-[#00B8F0] transition-all hover:shadow-md">
              <div className="p-6">
                <div className="font-mono text-[10px] text-[#00B8F0] uppercase bg-[#00B8F0]/10 border border-[#00B8F0]/20 inline-block px-2.5 py-1 rounded font-bold mb-3">
                  Enterprise RAG
                </div>
                <h3 className="text-[18px] font-bold mb-2 text-slate-900 group-hover:text-[#00B8F0] transition-colors">
                  Enterprise Knowledge Search
                </h3>
                <p className="text-[14px] text-slate-600 mb-4 leading-relaxed">
                  Built a secure RAG system to unify search across 50K+ internal enterprise documents.
                </p>
                <div className="font-mono text-[12px] text-[#00B8F0] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read Case Study <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden group cursor-pointer hover:border-[#00B8F0] transition-all hover:shadow-md">
              <div className="p-6">
                <div className="font-mono text-[10px] text-[#00B8F0] uppercase bg-[#00B8F0]/10 border border-[#00B8F0]/20 inline-block px-2.5 py-1 rounded font-bold mb-3">
                  AI Agents
                </div>
                <h3 className="text-[18px] font-bold mb-2 text-slate-900 group-hover:text-[#00B8F0] transition-colors">
                  AI Support Agent
                </h3>
                <p className="text-[14px] text-slate-600 mb-4 leading-relaxed">
                  Developed an AI support agent that resolved 70% of customer support queries automatically.
                </p>
                <div className="font-mono text-[12px] text-[#00B8F0] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read Case Study <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden group cursor-pointer hover:border-[#00B8F0] transition-all hover:shadow-md">
              <div className="p-6">
                <div className="font-mono text-[10px] text-[#00B8F0] uppercase bg-[#00B8F0]/10 border border-[#00B8F0]/20 inline-block px-2.5 py-1 rounded font-bold mb-3">
                  AI Automation
                </div>
                <h3 className="text-[18px] font-bold mb-2 text-slate-900 group-hover:text-[#00B8F0] transition-colors">
                  AI SDR for Outreach
                </h3>
                <p className="text-[14px] text-slate-600 mb-4 leading-relaxed">
                  Built an autonomous SDR agent that personalizes outreach and books 3X more meetings.
                </p>
                <div className="font-mono text-[12px] text-[#00B8F0] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read Case Study <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. CTA BANNER (Original light style)
      ═══════════════════════════════════════════ */}
      <section className="py-[80px] bg-slate-50 border-t border-slate-200">
        <div className="wrap max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-sm">
            
            <div className="max-w-[500px]">
              <div className="font-mono text-[11px] text-[#00B8F0] uppercase tracking-[0.12em] mb-3 font-semibold">Ready to build together?</div>
              <h2 className="text-[32px] md:text-[36px] font-bold leading-[1.15] mb-4 text-slate-900 tracking-tight">
                Let's Engineer AI Solutions That <span className="text-[#00B8F0]">Drive Real Results.</span>
              </h2>
              <p className="text-[15px] text-slate-600 mb-6 leading-relaxed">
                Book a free discovery call and let's discuss how we can solve your most critical challenges with AI.
              </p>
              <a 
                href="https://cal.com/botmartz-ai/20min" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#00B8F0] hover:bg-[#0096C7] text-white px-7 py-3.5 rounded-xl text-[14px] font-semibold transition-all shadow-md shadow-[#00B8F0]/20"
              >
                Book a Discovery Call →
              </a>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-[340px]">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex gap-4 items-start">
                <div className="bg-[#00B8F0]/10 border border-[#00B8F0]/20 p-2.5 rounded-lg text-[#00B8F0] shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[15px] mb-1 text-slate-900">Free Discovery Call</h3>
                  <p className="text-[13px] text-slate-600 font-normal">30-minute introductory call to explore your use case.</p>
                </div>
              </div>
              
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex gap-4 items-start">
                <div className="bg-[#00B8F0]/10 border border-[#00B8F0]/20 p-2.5 rounded-lg text-[#00B8F0] shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[15px] mb-1 text-slate-900">Proof of Concept</h3>
                  <p className="text-[13px] text-slate-600 font-normal">We can build a rapid prototype in 2-4 weeks.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}