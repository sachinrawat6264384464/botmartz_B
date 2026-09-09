import React from "react";
import { Metadata } from "next";
import { 
  Building2,
  Users,
  Search,
  Bot,
  Workflow,
  Cpu,
  Database,
  ArrowRight,
  Sparkles,
  Server,
  Layers,
  MapPin,
  Calendar,
  Globe,
  MonitorCheck,
  Zap,
  Activity,
  Briefcase,
  CheckCircle2,
  FileCheck
} from "lucide-react";
import TrackedLink from "@/app/_components/TrackedLink";

export const metadata: Metadata = {
  title: "Partner Media Kit",
  description: "Explore Botmartz's Enterprise AI implementation capabilities, technical expertise, partnership models, markets, and AI systems engineering services.",
  alternates: {
    canonical: "https://www.botmartz.com/media-kit",
  },
};

const WHAT_WE_BUILD = [
  {
    icon: <Search size={24} className="text-[#0066FF]" />,
    title: "Enterprise AI Search",
    desc: "AI-powered search and retrieval experiences across organizational knowledge.",
  },
  {
    icon: <Database size={24} className="text-[#0066FF]" />,
    title: "RAG & Knowledge Systems",
    desc: "Production-oriented retrieval pipelines connecting enterprise data with AI models.",
  },
  {
    icon: <Workflow size={24} className="text-[#0066FF]" />,
    title: "AI Agents & Intelligent Workflows",
    desc: "Agentic systems that connect reasoning, tools, data, and business workflows.",
  },
  {
    icon: <Cpu size={24} className="text-[#0066FF]" />,
    title: "AI Engineering",
    desc: "Design and development of production-ready AI applications and services.",
  },
  {
    icon: <Layers size={24} className="text-[#0066FF]" />,
    title: "Data & Software Integration",
    desc: "Connecting AI systems with existing applications, APIs, databases, and organizational data.",
  },
  {
    icon: <Activity size={24} className="text-[#0066FF]" />,
    title: "Evaluation & Optimization",
    desc: "Improving retrieval quality, system reliability, relevance, performance, and production readiness.",
  }
];

const FRAMEWORK_STAGES = [
  { step: "01", title: "DISCOVER", desc: "Understand the business problem, data environment, workflows, users, and AI opportunity." },
  { step: "02", title: "ARCHITECT", desc: "Design the AI system architecture, retrieval strategy, integrations, models, evaluation approach, and deployment path." },
  { step: "03", title: "IMPLEMENT", desc: "Build and integrate the AI system with the required enterprise data, applications, APIs, and workflows." },
  { step: "04", title: "DEPLOY", desc: "Move the solution toward production with appropriate infrastructure, security, observability, evaluation, and operational readiness." },
  { step: "05", title: "OPTIMIZE", desc: "Continuously improve retrieval, relevance, agents, workflows, performance, and system quality." }
];

const PARTNER_FIT = [
  { title: "SYSTEM INTEGRATION", desc: "Integrate partner technologies into production AI systems and enterprise workflows." },
  { title: "IMPLEMENTATION", desc: "Help customers move from proof-of-concept to production deployments." },
  { title: "CONSULTING", desc: "Provide architecture, technical evaluation, implementation strategy, and AI engineering expertise." },
  { title: "AGENCY DELIVERY", desc: "Support software agencies, consultancies, and digital transformation firms as a specialist AI engineering and delivery partner." },
  { title: "REFERRALS", desc: "Identify relevant customer opportunities and introduce organizations where partner technology can solve a real business need." },
  { title: "TECHNICAL CONTENT & EDUCATION", desc: "Create practical technical content, demonstrations, workshops, and educational material around AI technologies and implementation patterns." }
];

const WHY_PARTNER = [
  { title: "Technical-first", desc: "Engineering-led implementation rather than purely commercial reselling." },
  { title: "Implementation-focused", desc: "Focused on turning AI technologies into working production systems." },
  { title: "Technology-agnostic", desc: "Selects infrastructure based on customer architecture and use case rather than forcing a single technology." },
  { title: "International focus", desc: "Commercial strategy focused on North America, Europe/EMEA, and APAC." },
  { title: "Flexible collaboration", desc: "Can work directly with technology vendors, agencies, consultancies, and end customers." }
];

export default function PartnerMediaKitPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      
      {/* ── 1. HERO SECTION (DARK THEME) ── */}
      <section className="relative pt-[130px] pb-[90px] overflow-hidden bg-[#050B14] text-white border-b border-white/10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0052FF]/15 blur-[160px] rounded-full pointer-events-none" />
        
        {/* Blueprint Grid */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,184,240,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/30 text-[#00B8F0] font-mono text-xs uppercase tracking-widest mb-6">
            <Sparkles size={13} /> BOTMARTZ PARTNER MEDIA KIT
          </div>

          <h1 className="text-[clamp(36px,5vw,62px)] font-bold font-heading tracking-tight leading-[1.1] max-w-4xl mb-6 text-white">
            Enterprise AI Implementation, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#00B8F0] via-[#0066FF] to-[#60A5FA] bg-clip-text text-transparent">
              Built for Production.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#8A9EB0] max-w-3xl leading-relaxed mb-6">
            Botmartz helps organizations design, integrate, deploy, and optimize AI systems across enterprise knowledge, search, retrieval, workflows, data, and software.
          </p>

          <p className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-10">
            Implementation • Integration • AI Engineering • Consulting
          </p>

          <div className="flex flex-wrap gap-4 items-center justify-center">
            <a
              href="mailto:soham@botmartz.com?subject=Partnership Inquiry"
              className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-all shadow-[0_4px_20px_rgba(0,102,255,0.4)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Partner With Botmartz <ArrowRight className="w-4 h-4" />
            </a>
            <TrackedLink
              href="#capabilities"
              eventName="button_click"
              eventData={{ button_name: "media_kit_hero_explore" }}
              className="inline-flex items-center gap-2 border border-slate-700 text-white hover:border-[#00B8F0] hover:text-[#00B8F0] px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-all hover:bg-white/5"
            >
              Explore Capabilities ↓
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ── 2. COMPANY SNAPSHOT (LIGHT THEME) ── */}
      <section className="py-24 bg-[#F8FAFC] relative border-b border-slate-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4 text-slate-900">
              About Botmartz
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Botmartz AI Solutions Pvt Ltd is an Enterprise AI &amp; Intelligent Systems Implementation company headquartered in Indore, India, with an international commercial focus.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2 text-[#0066FF]">
                <Calendar size={20} />
                <h3 className="font-bold text-slate-900">Founded</h3>
              </div>
              <p className="text-slate-600 font-medium text-sm">11 May 2026</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2 text-[#0066FF]">
                <MapPin size={20} />
                <h3 className="font-bold text-slate-900">Headquarters</h3>
              </div>
              <p className="text-slate-600 font-medium text-sm">Indore, Madhya Pradesh, India</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2 text-[#0066FF]">
                <Users size={20} />
                <h3 className="font-bold text-slate-900">Engineering</h3>
              </div>
              <p className="text-slate-600 font-medium text-sm">3-person engineering team</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2 text-[#0066FF]">
                <Globe size={20} />
                <h3 className="font-bold text-slate-900">Commercial Focus</h3>
              </div>
              <p className="text-slate-600 font-medium text-sm">North America • Europe/EMEA • APAC</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2 text-[#0066FF]">
                <Workflow size={20} />
                <h3 className="font-bold text-slate-900">AI Implementation Direction</h3>
              </div>
              <p className="text-slate-600 font-medium text-sm">5–6 specialized projects/year</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2 text-[#0066FF]">
                <Briefcase size={20} />
                <h3 className="font-bold text-slate-900">Current Software Activity</h3>
              </div>
              <p className="text-slate-600 font-medium text-sm">10–15 projects, several incorporating AI capabilities</p>
            </div>
          </div>
          <p className="text-center text-xs text-slate-400 mt-8 max-w-2xl mx-auto">
            These figures describe our current operating stage and developing specialization as an emerging implementation specialist.
          </p>
        </div>
      </section>

      {/* ── 3. WHAT WE DO (LIGHT THEME) ── */}
      <section id="capabilities" className="py-24 bg-white relative border-b border-slate-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4 text-slate-900">
              What We Build
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHAT_WE_BUILD.map((item, idx) => (
              <div key={idx} className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-8 hover:border-[#0066FF]/40 transition-all duration-300 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. HOW WE WORK (DARK THEME) ── */}
      <section className="py-24 bg-[#050B14] relative border-b border-white/10 text-white">
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,184,240,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
              From AI Opportunity to Production System
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {FRAMEWORK_STAGES.map((stage, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                <div className="text-[#00B8F0] font-mono text-xl font-black mb-4">{stage.step}</div>
                <h3 className="text-lg font-bold mb-3">{stage.title}</h3>
                <p className="text-[#8A9EB0] text-sm leading-relaxed">{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PARTNER FIT (LIGHT THEME) ── */}
      <section className="py-24 bg-[#F8FAFC] relative border-b border-slate-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4 text-slate-900">
              How We Work With Technology Companies
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Botmartz is interested in building long-term relationships with AI and B2B SaaS technology companies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PARTNER_FIT.map((fit, idx) => (
              <div key={idx} className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
                <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">{fit.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{fit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. TECHNOLOGY ECOSYSTEM (DARK THEME) ── */}
      <section className="py-24 bg-[#050B14] relative border-b border-white/10 text-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
              Technology Ecosystem
            </h2>
            <p className="text-[#8A9EB0] text-base sm:text-lg">
              Botmartz takes a technology-agnostic implementation approach and develops deep expertise across the infrastructure and application technologies required to build production AI systems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
              <h3 className="text-[#00B8F0] font-bold text-sm uppercase tracking-wider mb-3">Retrieval &amp; Vector Infrastructure</h3>
              <p className="text-[#8A9EB0] text-sm">Pinecone • Qdrant • Weaviate</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
              <h3 className="text-[#00B8F0] font-bold text-sm uppercase tracking-wider mb-3">Enterprise AI &amp; Search</h3>
              <p className="text-[#8A9EB0] text-sm">Glean and enterprise knowledge/search platforms</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
              <h3 className="text-[#00B8F0] font-bold text-sm uppercase tracking-wider mb-3">AI Application Frameworks</h3>
              <p className="text-[#8A9EB0] text-sm">LangChain and related AI application tooling</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
              <h3 className="text-[#00B8F0] font-bold text-sm uppercase tracking-wider mb-3">Models &amp; AI Platforms</h3>
              <p className="text-[#8A9EB0] text-sm">Leading foundation-model and AI platform ecosystems</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
              <h3 className="text-[#00B8F0] font-bold text-sm uppercase tracking-wider mb-3">Data &amp; Cloud</h3>
              <p className="text-[#8A9EB0] text-sm">Cloud platforms, databases, APIs, and enterprise data environments</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. MARKETS & CUSTOMER PROFILE (LIGHT THEME) ── */}
      <section className="py-24 bg-white relative border-b border-slate-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4 text-slate-900">
              Built for Global Organizations
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><Globe className="text-[#0066FF]"/> Commercial Markets</h3>
              <ul className="space-y-4 text-slate-700 font-medium">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-[#00B8F0] shrink-0" size={18}/> North America</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-[#00B8F0] shrink-0" size={18}/> Europe / EMEA</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-[#00B8F0] shrink-0" size={18}/> APAC</li>
              </ul>
              <p className="text-sm text-slate-500 mt-6 border-t border-slate-100 pt-4">
                Engineering and delivery operations are currently based in India, while Botmartz's commercial strategy is focused on international markets.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><Building2 className="text-[#0066FF]"/> Customer Profiles</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-700 text-sm">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"/> B2B technology companies</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"/> SaaS companies</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"/> Software companies</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"/> Mid-market organizations</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"/> Enterprises</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"/> Agencies and consulting firms</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"/> Organizations building AI-powered products or internal AI systems</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. TECHNICAL EDUCATION & COMMUNITY (LIGHT THEME) ── */}
      <section className="py-24 bg-[#F8FAFC] relative border-b border-slate-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
            <h2 className="text-3xl font-bold font-heading mb-6 text-slate-900 text-center">
              Technical Education &amp; AI Community
            </h2>
            <p className="text-slate-600 text-base sm:text-lg text-center mb-10 leading-relaxed">
              Alongside implementation work, Botmartz is actively involved in AI education and technical community initiatives, including workshops and learning programs with colleges and institutions in India.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center font-bold text-slate-700 text-sm">AI &amp; Generative AI</div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center font-bold text-slate-700 text-sm">RAG Systems</div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center font-bold text-slate-700 text-sm">AI Agents</div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center font-bold text-slate-700 text-sm">AI Engineering</div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center font-bold text-slate-700 text-sm md:col-span-2">Practical Implementation</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. WHY PARTNER WITH BOTMARTZ (DARK THEME) ── */}
      <section className="py-24 bg-[#050B14] relative border-b border-white/10 text-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
              Why Technology Companies Work With Implementation Specialists
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center">
            {WHY_PARTNER.map((point, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col justify-center">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-[#00B8F0]"/> {point.title}
                </h3>
                <p className="text-[#8A9EB0] text-sm leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. CURRENT PARTNERING INTEREST (LIGHT THEME) ── */}
      <section className="py-24 bg-white relative border-b border-slate-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-6 text-slate-900">
              Partnerships We're Exploring
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
              Botmartz is actively developing relationships with technology companies and ecosystem partners across AI infrastructure, enterprise search, retrieval, AI application development, cloud, and data platforms.
            </p>
            <p className="text-slate-600 text-base font-medium">
              We are particularly interested in long-term relationships where Botmartz can contribute technical implementation capability, customer delivery, education, and ecosystem growth.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 bg-blue-50 text-[#0066FF] rounded-full font-bold text-sm border border-blue-200 shadow-sm">Implementation Partnerships</div>
            <div className="px-6 py-3 bg-blue-50 text-[#0066FF] rounded-full font-bold text-sm border border-blue-200 shadow-sm">Referral Partnerships</div>
            <div className="px-6 py-3 bg-blue-50 text-[#0066FF] rounded-full font-bold text-sm border border-blue-200 shadow-sm">Agency / Delivery Partnerships</div>
            <div className="px-6 py-3 bg-blue-50 text-[#0066FF] rounded-full font-bold text-sm border border-blue-200 shadow-sm">Technical Content Partnerships</div>
            <div className="px-6 py-3 bg-blue-50 text-[#0066FF] rounded-full font-bold text-sm border border-blue-200 shadow-sm">AI Education Partnerships</div>
          </div>
        </div>
      </section>

      {/* ── 11. FOUNDER (LIGHT THEME) ── */}
      <section className="py-16 bg-[#F8FAFC] relative border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold font-heading mb-6 text-slate-900">
            Leadership
          </h2>
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm inline-block text-left max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-slate-900">Soham Sharma</h3>
            <p className="text-sm font-mono text-[#0066FF] uppercase tracking-wider mb-4 font-bold">Founder &amp; CEO</p>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xl">
              Soham leads Botmartz's Enterprise AI implementation practice, with 4–5 years of hands-on experience working with AI and experience teaching AI since 2022. His focus is on applying AI technologies to practical software, knowledge, retrieval, and intelligent-system use cases.
            </p>
          </div>
        </div>
      </section>

      {/* ── 12. CONTACT / PARTNER CTA (DARK THEME) ── */}
      <section className="py-24 bg-[#050B14] relative text-center text-white">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0066FF]/10 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-heading">
            Build Something With Us
          </h2>
          <p className="text-base sm:text-lg text-[#8A9EB0] mb-10 leading-relaxed max-w-2xl mx-auto">
            Interested in implementation, referral, technical collaboration, or ecosystem partnerships? Let's explore where Botmartz can contribute.
          </p>
          <div className="flex flex-col items-center gap-6">
            <a
              href="mailto:soham@botmartz.com?subject=Partnership Inquiry"
              className="inline-flex items-center justify-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-base px-8 py-4 rounded-xl shadow-[0_4px_20px_rgba(0,102,255,0.3)] transition-all"
            >
              Start a Partnership Conversation <ArrowRight size={16} />
            </a>
            <div className="flex flex-wrap gap-4 text-sm text-[#8A9EB0] justify-center mt-2">
              <a href="mailto:soham@botmartz.com" className="hover:text-white transition-colors">soham@botmartz.com</a>
              <span>•</span>
              <a href="https://www.botmartz.com" className="hover:text-white transition-colors">https://www.botmartz.com</a>
              <span>•</span>
              <a href="https://www.linkedin.com/company/botmartz/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
