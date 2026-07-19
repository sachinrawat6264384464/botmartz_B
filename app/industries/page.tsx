import { Metadata } from 'next';
import Link from "next/link";
import { ArrowRight, BookOpen, Truck, Scale, HeartPulse, Factory, Cloud, ShieldCheck, Zap, Briefcase, FileText, CheckCircle2, TrendingUp, Users, Building, Building2, Landmark, Target, Calendar } from "lucide-react";
import { getCachedDynamicPage } from '@/lib/fetch-helpers';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Industries',
    description: 'We partner with key industry leaders to build production AI and RAG systems that solve complex problems, unlock knowledge, and drive measurable impact.',
    keywords: ['AI in Education', 'AI in Logistics', 'AI in Healthcare', 'Industry AI Solutions'],
  };
  
  try {
    const data = await getCachedDynamicPage("industries");
    if (data?.metadata) {
      meta = { ...meta, ...data.metadata };
    }
  } catch (e) {}

  return {
    ...meta,
    openGraph: {
      title: `${meta.title} | Botmartz`,
      description: meta.description,
      url: 'https://www.botmartz.com/industries',
      type: 'website',
    },
    alternates: {
      canonical: 'https://www.botmartz.com/industries',
    },
  };
}

export default async function IndustriesPage() {
  let heroData = {
    badge: "Industries",
    title: "AI Solutions for Industries That <span className=\"text-[#00B8F0]\">Move the World Forward.</span>",
    subtitle: "We partner with organizations across key industries to build production AI systems that solve real-world problems, unlock knowledge, and drive measurable impact."
  };

  try {
    const data = await getCachedDynamicPage("industries");
    if (data?.hero) {
      heroData = { ...heroData, ...data.hero };
    }
  } catch (e) {}

  return (
    <main className="bg-[#050B14] min-h-screen text-white">
      {/* HERO SECTION */}
      <section className="relative pt-[120px] pb-[80px] bg-[#050B14] text-white overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="wrap relative z-10 flex flex-col lg:flex-row items-center gap-10 pb-16">
          <div className="flex-1 lg:max-w-[540px]">
            <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-6 flex items-center gap-3 font-semibold">
              <span className="w-6 h-px bg-[#00B8F0]"></span>
              <Link href="/" className="hover:text-white transition-colors">Home</Link> <span>/</span> <span className="text-white">{heroData.badge}</span>
            </div>
            <h1 
              className="text-[clamp(36px,4.5vw,56px)] leading-[1.1] font-semibold mb-6 tracking-tight text-white"
              dangerouslySetInnerHTML={{ __html: heroData.title }}
            />
            <p className="text-[17px] text-[#8A9EB0] max-w-[500px] mb-8">
              {heroData.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-6 py-3 rounded text-[14px]">Book a Discovery Call →</Link>
              <Link href="/work/case-studies" className="btn btn-ghost border border-[#1E293B] text-white hover:border-[#00B8F0] hover:text-[#00B8F0] px-6 py-3 rounded text-[14px] transition-colors">Explore Case Studies ↗</Link>
            </div>
          </div>
          
          <div className="flex-1 w-full lg:block">
            {/* Industry Node Graphic */}
            <div className="w-full relative max-w-[600px] mx-auto ml-auto min-h-[300px] aspect-[2/1]">
               <div className="flex justify-between items-center h-[300px] relative w-full">
                 
                 {/* Left Integrations */}
                 <div className="flex flex-col gap-6 justify-center z-10">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col items-center gap-2 backdrop-blur-sm relative group hover:border-[#00B8F0]/50 transition-colors w-28">
                      <BookOpen className="text-[#8598A6] group-hover:text-[#00B8F0] w-6 h-6" />
                      <div className="font-semibold text-[13px] text-white">Education</div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col items-center gap-2 backdrop-blur-sm relative group hover:border-[#00B8F0]/50 transition-colors w-28">
                      <Truck className="text-[#8598A6] group-hover:text-[#00B8F0] w-6 h-6" />
                      <div className="font-semibold text-[13px] text-white">Logistics</div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col items-center gap-2 backdrop-blur-sm relative group hover:border-[#00B8F0]/50 transition-colors w-28">
                      <Scale className="text-[#8598A6] group-hover:text-[#00B8F0] w-6 h-6" />
                      <div className="font-semibold text-[13px] text-white">Legal</div>
                    </div>
                 </div>

                 {/* Center Agent Node */}
                 <div className="w-32 h-32 bg-[#00B8F0]/20 rounded-xl flex items-center justify-center shadow-[0_0_60px_rgba(0,184,240,0.4)] z-10 transform rotate-45">
                   <div className="w-24 h-24 bg-gradient-to-br from-[#00B8F0] to-[#0A111F] flex items-center justify-center shadow-lg border border-[#00B8F0]/50 relative">
                     <Target className="w-8 h-8 text-white -rotate-45" />
                   </div>
                 </div>

                 {/* Connecting lines */}
                 <svg className="absolute inset-0 w-full h-full" width="600" height="300" viewBox="0 0 600 300" style={{ zIndex: 0 }}>
                    <path d="M 112 50 C 200 50, 200 150, 300 150" stroke="rgba(0,184,240,0.3)" strokeWidth="2" fill="none" className="animate-pulse" />
                    <path d="M 112 150 C 200 150, 200 150, 300 150" stroke="rgba(0,184,240,0.3)" strokeWidth="2" fill="none" className="animate-pulse" />
                    <path d="M 112 250 C 200 250, 200 150, 300 150" stroke="rgba(0,184,240,0.3)" strokeWidth="2" fill="none" className="animate-pulse" />
                    
                    <path d="M 488 50 C 400 50, 400 150, 300 150" stroke="rgba(0,184,240,0.3)" strokeWidth="2" fill="none" className="animate-pulse" />
                    <path d="M 488 150 C 400 150, 400 150, 300 150" stroke="rgba(0,184,240,0.3)" strokeWidth="2" fill="none" className="animate-pulse" />
                    <path d="M 488 250 C 400 250, 400 150, 300 150" stroke="rgba(0,184,240,0.3)" strokeWidth="2" fill="none" className="animate-pulse" />
                 </svg>

                 {/* Right Integrations */}
                 <div className="flex flex-col gap-6 justify-center z-10">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col items-center gap-2 backdrop-blur-sm relative group hover:border-[#00B8F0]/50 transition-colors w-28">
                      <HeartPulse className="text-[#8598A6] group-hover:text-[#00B8F0] w-6 h-6" />
                      <div className="font-semibold text-[13px] text-white">Healthcare</div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col items-center gap-2 backdrop-blur-sm relative group hover:border-[#00B8F0]/50 transition-colors w-28">
                      <BookOpen className="text-[#8598A6] group-hover:text-[#00B8F0] w-6 h-6" />
                      <div className="font-semibold text-[13px] text-white">Education</div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col items-center gap-2 backdrop-blur-sm relative group hover:border-[#00B8F0]/50 transition-colors w-28">
                      <Truck className="text-[#8598A6] group-hover:text-[#00B8F0] w-6 h-6" />
                      <div className="font-semibold text-[13px] text-white">Logistics</div>
                    </div>
                 </div>

               </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES WE FOCUS ON */}
      <section className="section-pad bg-[#050B14]">
        <div className="wrap text-center mb-[60px]">
          <div className="font-mono text-[11px] text-[#00B8F0] uppercase tracking-[0.1em] mb-4 flex justify-center items-center gap-3">Industries We Focus On</div>
          <h2 className="text-[34px] font-semibold mb-4 text-white">Deep Expertise. Real Impact.</h2>
          <p className="text-[15.5px] text-[#8A9EB0] max-w-[500px] mx-auto">
            We focus on industries where Enterprise RAG and AI Agents create the highest value.
          </p>
        </div>
        
        <div className="wrap grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Education */}
          <div className="flex flex-col">
             <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded bg-[#0A111F] border border-[#1E293B] flex items-center justify-center shrink-0 text-[#00B8F0] shadow-sm">
                   <BookOpen className="w-7 h-7" />
                </div>
                <div>
                   <h3 className="text-[22px] font-semibold mb-2 text-white">Education</h3>
                   <p className="text-[14px] text-[#8A9EB0]">Empower educators, students, and institutions with intelligent systems that personalize learning and automate operations.</p>
                </div>
             </div>
             <div className="bg-[#0A111F] border border-[#1E293B] p-6 rounded flex-1">
                <div className="font-mono text-[10px] text-[#00B8F0] uppercase tracking-wider mb-4">Use Cases</div>
                <ul className="space-y-3 mb-6">
                  {['AI Course Assistant', 'Student Support Agent', 'Knowledge Base Search', 'Research & Content Generation', 'Administrative Automation'].map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-[14px] text-white">
                      <CheckCircle2 className="w-4 h-4 text-[#00B8F0] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/industries/education" className="font-mono text-[12.5px] text-[#00B8F0] flex items-center gap-2 hover:gap-3 transition-all hover:underline">Learn more <ArrowRight className="w-3 h-3"/></Link>
             </div>
          </div>
          
          {/* Logistics */}
          <div className="flex flex-col">
             <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded bg-[#0A111F] border border-[#1E293B] flex items-center justify-center shrink-0 text-[#00B8F0] shadow-sm">
                   <Truck className="w-7 h-7" />
                </div>
                <div>
                   <h3 className="text-[22px] font-semibold mb-2 text-white">Logistics</h3>
                   <p className="text-[14px] text-[#8A9EB0]">Optimize operations, streamline communications, and improve decision-making with AI-powered agents and search.</p>
                </div>
             </div>
             <div className="bg-[#0A111F] border border-[#1E293B] p-6 rounded flex-1">
                <div className="font-mono text-[10px] text-[#00B8F0] uppercase tracking-wider mb-4">Use Cases</div>
                <ul className="space-y-3 mb-6">
                  {['Logistics Planner Agent', 'Shipment Tracking Assistant', 'Document & Invoice Intelligence', 'Operations Support Agent', 'Knowledge Search'].map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-[14px] text-white">
                      <CheckCircle2 className="w-4 h-4 text-[#00B8F0] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/industries/logistics" className="font-mono text-[12.5px] text-[#00B8F0] flex items-center gap-2 hover:gap-3 transition-all hover:underline">Learn more <ArrowRight className="w-3 h-3"/></Link>
             </div>
          </div>
          
          {/* Healthcare */}
          <div className="flex flex-col">
             <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded bg-[#0A111F] border border-[#1E293B] flex items-center justify-center shrink-0 text-[#00B8F0] shadow-sm">
                   <HeartPulse className="w-7 h-7" />
                </div>
                <div>
                   <h3 className="text-[22px] font-semibold mb-2 text-white">Healthcare</h3>
                   <p className="text-[14px] text-[#8A9EB0]">Enhance clinical workflows, automate medical documentation, and improve patient support with secure, HIPAA-compliant AI systems.</p>
                </div>
             </div>
             <div className="bg-[#0A111F] border border-[#1E293B] p-6 rounded flex-1">
                <div className="font-mono text-[10px] text-[#00B8F0] uppercase tracking-wider mb-4">Use Cases</div>
                <ul className="space-y-3 mb-6">
                  {['Clinical Documentation Assistant', 'Medical Knowledge Base RAG', 'Patient Support Copilot', 'Automated Triage & Scheduling', 'Research Literature Analysis'].map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-[14px] text-white">
                      <CheckCircle2 className="w-4 h-4 text-[#00B8F0] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/industries/healthcare" className="font-mono text-[12.5px] text-[#00B8F0] flex items-center gap-2 hover:gap-3 transition-all hover:underline">Learn more <ArrowRight className="w-3 h-3"/></Link>
             </div>
          </div>
        </div>

        {/* OTHER INDUSTRIES STRIP */}
        <div className="wrap">
           <div className="text-center font-mono text-[11px] text-[#00B8F0] uppercase tracking-[0.1em] mb-6">Other Industries We Serve</div>
           <div className="flex flex-wrap justify-center sm:justify-between items-center gap-6 py-6 border-y border-[#1E293B]">
              {[
                { i: Briefcase, l: 'Financial Services' },
                { i: Building, l: 'Real Estate' },
                { i: Landmark, l: 'Government' },
                { i: TrendingUp, l: 'Retail & E-Commerce' },
                { i: Zap, l: 'Energy & Utilities' },
                { i: Users, l: 'Professional Services' }
              ].map((ind, i) => (
                <div key={i} className="flex items-center gap-2 text-[#8A9EB0]">
                  <ind.i className="w-5 h-5 text-[#00B8F0]/50" />
                  <span className="font-semibold text-[14px] text-white">{ind.l}</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ENGINEERING EXCELLENCE & STATS */}
      <section className="bg-[#0A111F] text-white py-[80px] border-t border-[#1E293B]">
        <div className="wrap">
           <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
              
              {/* Left text */}
              <div className="lg:w-1/3">
                 <div className="font-mono text-[11px] text-[#00B8F0] uppercase tracking-[0.12em] mb-4">Why Botmartz</div>
                 <h2 className="text-[36px] font-semibold leading-[1.1] mb-6">Industry Knowledge.<br/><span className="text-[#00B8F0]">Engineering Excellence.</span></h2>
                 <p className="text-[15px] text-[#8A9EB0]">
                   We combine deep domain understanding with AI engineering expertise to deliver solutions that are secure, scalable, and built for production.
                 </p>
              </div>
              
              {/* Right Grid */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                 {[
                   { i: Building2, t: 'Domain Expertise', d: 'We understand your industry challenges and workflows.' },
                   { i: Target, t: 'Measurable Impact', d: 'AI solutions that deliver real business outcomes.' },
                   { i: Zap, t: 'Production Ready', d: 'Enterprise-grade architecture built for reliability and scale.' },
                   { i: TrendingUp, t: 'Rapid Time to Value', d: 'Accelerated delivery with proven frameworks.' },
                   { i: ShieldCheck, t: 'Secure & Compliant', d: 'Best practices for security, privacy, and compliance.' },
                   { i: Users, t: 'Ongoing Partnership', d: 'Long-term support, iteration, and optimization.' },
                 ].map((feat, i) => (
                   <div key={i} className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                       <feat.i className="w-5 h-5 text-[#00B8F0]" />
                     </div>
                     <div>
                       <h3 className="font-semibold text-[15px] mb-1.5 text-white">{feat.t}</h3>
                       <p className="text-[13px] text-[#8A9EB0]">{feat.d}</p>
                     </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Stats Strip */}
           <div className="mt-[80px] pt-[60px] border-t border-[#1E293B]">
              <div className="font-mono text-[11px] text-[#FF3366] uppercase tracking-[0.1em] text-center mb-8">Our Impact Across Industries</div>
              <div className="flex flex-wrap justify-between items-center gap-8">
                 {[
                   { i: Building2, s: '20+', l: 'Systems Shipped' },
                   { i: Briefcase, s: '4', l: 'Core Industries' },
                   { i: FileText, s: '99%+', l: 'Production Uptime' },
                   { i: ShieldCheck, s: '100%', l: 'Grounded Output Goal' },
                   { i: TrendingUp, s: '40-70%', l: 'Efficiency Gain' },
                 ].map((stat, i) => (
                   <div key={i} className="flex flex-col items-center text-center">
                     <stat.i className="w-6 h-6 text-[#00B8F0]/50 mb-3" />
                     <div className="text-[32px] font-semibold text-white leading-none mb-2">{stat.s}</div>
                     <div className="text-[12px] text-[#8A9EB0] uppercase font-mono">{stat.l}</div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="section-pad bg-[#050B14]">
        <div className="wrap flex justify-between items-end gap-6 mb-10">
          <div>
            <div className="font-mono text-[11px] text-[#00B8F0] uppercase tracking-[0.08em] mb-3">Case Studies</div>
            <h2 className="text-[34px] font-semibold text-white">AI Solutions Driving Real Business Results.</h2>
          </div>
          <Link href="/work/case-studies" className="btn btn-ghost border border-[#1E293B] text-white hover:border-[#00B8F0] px-6 py-2 rounded text-[14px] transition-colors hidden md:inline-flex">View All Case Studies →</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 wrap">
            <div className="border border-[#1E293B] rounded-sm overflow-hidden group cursor-pointer hover:border-[#00B8F0] transition-colors flex flex-col bg-[#0A111F]">
              <div className="p-8 flex-1 flex flex-col">
                <div className="font-mono text-[10px] text-[#00B8F0] uppercase bg-[#00B8F0]/10 inline-block px-2 py-1 rounded mb-4 self-start">Education</div>
                <h3 className="text-[20px] font-semibold mb-3 text-white">AI Course Assistant for Online Learning Platform</h3>
                <p className="text-[14px] text-[#8A9EB0] mb-6">Built an AI assistant that answered student queries, reduced support tickets by 60%, and improved student engagement.</p>
                <div className="mt-auto font-mono text-[12px] text-[#00B8F0] flex items-center gap-2 group-hover:gap-3 transition-all">Read Case Study <ArrowRight className="w-3 h-3" /></div>
              </div>
            </div>
            
            <div className="border border-[#1E293B] rounded-sm overflow-hidden group cursor-pointer hover:border-[#00B8F0] transition-colors flex flex-col bg-[#0A111F]">
              <div className="p-8 flex-1 flex flex-col">
                <div className="font-mono text-[10px] text-[#00B8F0] uppercase bg-[#00B8F0]/10 inline-block px-2 py-1 rounded mb-4 self-start">Logistics</div>
                <h3 className="text-[20px] font-semibold mb-3 text-white">Logistics Planner Agent for Global Supply Chain</h3>
                <p className="text-[14px] text-[#8A9EB0] mb-6">Implemented an AI agent that optimized routes and scheduling, improving on-time delivery rate by 28%.</p>
                <div className="mt-auto font-mono text-[12px] text-[#00B8F0] flex items-center gap-2 group-hover:gap-3 transition-all">Read Case Study <ArrowRight className="w-3 h-3" /></div>
              </div>
            </div>
            
            <div className="border border-[#1E293B] rounded-sm overflow-hidden group cursor-pointer hover:border-[#00B8F0] transition-colors flex flex-col bg-[#0A111F]">
              <div className="p-8 flex-1 flex flex-col">
                <div className="font-mono text-[10px] text-[#00B8F0] uppercase bg-[#00B8F0]/10 inline-block px-2 py-1 rounded mb-4 self-start">Legal</div>
                <h3 className="text-[20px] font-semibold mb-3 text-white">Contract Intelligence for Legal Tech Company</h3>
                <p className="text-[14px] text-[#8A9EB0] mb-6">Automated contract analysis and risk extraction, reducing manual review time by 70% and improving accuracy.</p>
                <div className="mt-auto font-mono text-[12px] text-[#00B8F0] flex items-center gap-2 group-hover:gap-3 transition-all">Read Case Study <ArrowRight className="w-3 h-3" /></div>
              </div>
            </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-[80px] bg-[#050B14]">
        <div className="wrap">
          <div className="bg-[#0A111F] border border-[#1E293B] rounded-[24px] p-[40px] md:p-[60px] text-white flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden">
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            <div className="relative z-10 max-w-[480px]">
              <h2 className="text-[36px] font-semibold leading-[1.1] mb-4">Ready to <span className="text-[#FF3366]">Transform Your Industry</span> with AI?</h2>
              <p className="text-[15px] text-[#8A9EB0] mb-8">Let's build AI solutions tailored to your industry challenges and business goals.</p>
              <Link href="/contact" className="btn btn-primary bg-[#00B8F0] hover:bg-[#0096C7] px-6 py-3 rounded text-[14px]">Book a Discovery Call →</Link>
            </div>

            <div className="relative z-10 flex flex-col gap-4 w-full max-w-[340px]">
              <div className="bg-[#050B14] border border-[#1E293B] rounded-xl p-5 flex gap-4 items-start">
                <div className="bg-[#00B8F0]/10 border border-[#00B8F0]/20 p-2.5 rounded-lg text-[#00B8F0]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[15px] mb-1 text-white">Free Discovery Call</h3>
                  <p className="text-[13px] text-[#8A9EB0]">60-minute strategy session with our AI experts.</p>
                </div>
              </div>
              <div className="bg-[#050B14] border border-[#1E293B] rounded-xl p-5 flex gap-4 items-start">
                <div className="bg-[#00B8F0]/10 border border-[#00B8F0]/20 p-2.5 rounded-lg text-[#00B8F0]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[15px] mb-1 text-white">Custom Solution Roadmap</h3>
                  <p className="text-[13px] text-[#8A9EB0]">Tailored plan & architecture for your use case.</p>
                </div>
              </div>
              <div className="bg-[#050B14] border border-[#1E293B] rounded-xl p-5 flex gap-4 items-start">
                <div className="bg-[#00B8F0]/10 border border-[#00B8F0]/20 p-2.5 rounded-lg text-[#00B8F0]">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[15px] mb-1 text-white">Proven Frameworks</h3>
                  <p className="text-[13px] text-[#8A9EB0]">Built on best practices and real-world experience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
