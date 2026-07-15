import Link from "next/link";
import { ArrowRight, BookOpen, Truck, Scale, HeartPulse, Factory, Cloud, ShieldCheck, Zap, Briefcase, FileText, CheckCircle2, TrendingUp, Users, Building, Building2, Landmark, Target, Calendar } from "lucide-react";

export default function IndustriesPage() {
  return (
    <main>
      {/* HERO SECTION */}
      <section className="relative pt-[80px] pb-0 bg-ink text-white overflow-hidden blueprint" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.08) 1px, transparent 1px)' }}>
        <div className="wrap relative z-10 flex flex-col lg:flex-row items-center gap-10 pb-16">
          <div className="flex-1 lg:max-w-[540px]">
            <div className="font-mono text-[11px] text-signal uppercase tracking-[0.12em] mb-4 flex items-center gap-2">
              <Link href="/" className="hover:text-white transition-colors">Home</Link> <span>/</span> <span className="text-white">Industries</span>
            </div>
            <h1 className="text-[clamp(32px,4.5vw,50px)] leading-[1.05] font-semibold mb-6">
              AI Solutions for Industries That <span className="text-brand">Move the World Forward.</span>
            </h1>
            <p className="text-[17px] text-[#9FB9C8] max-w-[500px] mb-8">
              We partner with organizations across key industries to build production AI systems that solve real-world problems, unlock knowledge, and drive measurable impact.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn btn-primary bg-brand text-white hover:bg-deep">Book a Discovery Call →</Link>
              <Link href="/work/case-studies" className="btn btn-ghost border-line text-white hover:border-brand hover:text-brand">Explore Case Studies ↗</Link>
            </div>
          </div>
          
          <div className="flex-1 w-full lg:block">
            {/* Industry Node Graphic */}
            <div className="w-full relative max-w-[600px] mx-auto ml-auto">
               <div className="flex justify-between items-center h-[300px] relative">
                 
                 {/* Left Integrations */}
                 <div className="flex flex-col gap-6 justify-center z-10">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col items-center gap-2 backdrop-blur-sm relative group hover:border-brand/50 transition-colors w-28">
                      <BookOpen className="text-[#8598A6] group-hover:text-brand w-6 h-6" />
                      <div className="font-semibold text-[13px]">Education</div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col items-center gap-2 backdrop-blur-sm relative group hover:border-brand/50 transition-colors w-28">
                      <Truck className="text-[#8598A6] group-hover:text-brand w-6 h-6" />
                      <div className="font-semibold text-[13px]">Logistics</div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col items-center gap-2 backdrop-blur-sm relative group hover:border-brand/50 transition-colors w-28">
                      <Scale className="text-[#8598A6] group-hover:text-brand w-6 h-6" />
                      <div className="font-semibold text-[13px]">Legal</div>
                    </div>
                 </div>

                 {/* Center Agent Node */}
                 <div className="w-32 h-32 bg-brand/20 rounded-xl flex items-center justify-center shadow-[0_0_60px_rgba(0,146,215,0.4)] z-10 transform rotate-45">
                   <div className="w-24 h-24 bg-gradient-to-br from-brand to-deep flex items-center justify-center shadow-lg border border-brand/50 relative">
                     <Target className="w-8 h-8 text-white -rotate-45" />
                   </div>
                 </div>

                 {/* Connecting lines */}
                 <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                    <path d="M 112 50 C 200 50, 200 150, 300 150" stroke="rgba(0,146,215,0.3)" strokeWidth="2" fill="none" className="animate-pulse" />
                    <path d="M 112 150 C 200 150, 200 150, 300 150" stroke="rgba(0,146,215,0.3)" strokeWidth="2" fill="none" className="animate-pulse" />
                    <path d="M 112 250 C 200 250, 200 150, 300 150" stroke="rgba(0,146,215,0.3)" strokeWidth="2" fill="none" className="animate-pulse" />
                    
                    <path d="M 488 50 C 400 50, 400 150, 300 150" stroke="rgba(0,146,215,0.3)" strokeWidth="2" fill="none" className="animate-pulse" />
                    <path d="M 488 150 C 400 150, 400 150, 300 150" stroke="rgba(0,146,215,0.3)" strokeWidth="2" fill="none" className="animate-pulse" />
                    <path d="M 488 250 C 400 250, 400 150, 300 150" stroke="rgba(0,146,215,0.3)" strokeWidth="2" fill="none" className="animate-pulse" />
                 </svg>

                 {/* Right Integrations */}
                 <div className="flex flex-col gap-6 justify-center z-10">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col items-center gap-2 backdrop-blur-sm relative group hover:border-brand/50 transition-colors w-28">
                      <HeartPulse className="text-[#8598A6] group-hover:text-brand w-6 h-6" />
                      <div className="font-semibold text-[13px]">Healthcare</div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col items-center gap-2 backdrop-blur-sm relative group hover:border-brand/50 transition-colors w-28">
                      <Factory className="text-[#8598A6] group-hover:text-brand w-6 h-6" />
                      <div className="font-semibold text-[13px]">Mfg.</div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col items-center gap-2 backdrop-blur-sm relative group hover:border-brand/50 transition-colors w-28">
                      <Cloud className="text-[#8598A6] group-hover:text-brand w-6 h-6" />
                      <div className="font-semibold text-[13px]">SaaS</div>
                    </div>
                 </div>

               </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES WE FOCUS ON */}
      <section className="section-pad">
        <div className="wrap text-center mb-[60px]">
          <div className="eyebrow justify-center">Industries We Focus On</div>
          <h2 className="text-[34px] font-semibold mb-4">Deep Expertise. Real Impact.</h2>
          <p className="text-[15.5px] text-ink-soft max-w-[500px] mx-auto">
            We focus on industries where Enterprise RAG and AI Agents create the highest value.
          </p>
        </div>
        
        <div className="wrap grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Education */}
          <div className="flex flex-col">
             <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded bg-grid-bg border border-line flex items-center justify-center shrink-0 text-brand shadow-sm">
                   <BookOpen className="w-7 h-7" />
                </div>
                <div>
                   <h3 className="text-[22px] font-semibold mb-2">Education</h3>
                   <p className="text-[14px] text-ink-soft">Empower educators, students, and institutions with intelligent systems that personalize learning and automate operations.</p>
                </div>
             </div>
             <div className="bg-white border border-line p-6 rounded flex-1">
                <div className="font-mono text-[10px] text-brand uppercase tracking-wider mb-4">Use Cases</div>
                <ul className="space-y-3 mb-6">
                  {['AI Course Assistant', 'Student Support Agent', 'Knowledge Base Search', 'Research & Content Generation', 'Administrative Automation'].map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-[14px] text-ink">
                      <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="font-mono text-[12.5px] text-brand flex items-center gap-2 hover:gap-3 transition-all">Learn more <ArrowRight className="w-3 h-3"/></Link>
             </div>
          </div>
          
          {/* Logistics */}
          <div className="flex flex-col">
             <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded bg-grid-bg border border-line flex items-center justify-center shrink-0 text-brand shadow-sm">
                   <Truck className="w-7 h-7" />
                </div>
                <div>
                   <h3 className="text-[22px] font-semibold mb-2">Logistics</h3>
                   <p className="text-[14px] text-ink-soft">Optimize operations, streamline communications, and improve decision-making with AI-powered agents and search.</p>
                </div>
             </div>
             <div className="bg-white border border-line p-6 rounded flex-1">
                <div className="font-mono text-[10px] text-brand uppercase tracking-wider mb-4">Use Cases</div>
                <ul className="space-y-3 mb-6">
                  {['Logistics Planner Agent', 'Shipment Tracking Assistant', 'Document & Invoice Intelligence', 'Operations Support Agent', 'Knowledge Search'].map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-[14px] text-ink">
                      <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="font-mono text-[12.5px] text-brand flex items-center gap-2 hover:gap-3 transition-all">Learn more <ArrowRight className="w-3 h-3"/></Link>
             </div>
          </div>
          
          {/* Legal */}
          <div className="flex flex-col">
             <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded bg-grid-bg border border-line flex items-center justify-center shrink-0 text-brand shadow-sm">
                   <Scale className="w-7 h-7" />
                </div>
                <div>
                   <h3 className="text-[22px] font-semibold mb-2">Legal</h3>
                   <p className="text-[14px] text-ink-soft">Accelerate legal workflows, automate document analysis, and deliver accurate insights with secure AI systems.</p>
                </div>
             </div>
             <div className="bg-white border border-line p-6 rounded flex-1">
                <div className="font-mono text-[10px] text-brand uppercase tracking-wider mb-4">Use Cases</div>
                <ul className="space-y-3 mb-6">
                  {['Legal Research Assistant', 'Contract Review & Analysis', 'Case Law Search', 'Document Intelligence', 'Litigation Support'].map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-[14px] text-ink">
                      <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="font-mono text-[12.5px] text-brand flex items-center gap-2 hover:gap-3 transition-all">Learn more <ArrowRight className="w-3 h-3"/></Link>
             </div>
          </div>
        </div>

        {/* OTHER INDUSTRIES STRIP */}
        <div className="wrap">
           <div className="text-center font-mono text-[11px] text-brand uppercase tracking-[0.1em] mb-6">Other Industries We Serve</div>
           <div className="flex flex-wrap justify-center sm:justify-between items-center gap-6 py-6 border-y border-line">
              {[
                { i: HeartPulse, l: 'Healthcare' },
                { i: Factory, l: 'Manufacturing' },
                { i: Cloud, l: 'SaaS & Technology' },
                { i: Briefcase, l: 'Financial Services' },
                { i: Building, l: 'Real Estate' },
                { i: Landmark, l: 'Government' }
              ].map((ind, i) => (
                <div key={i} className="flex items-center gap-2 text-[#5B6B7C]">
                  <ind.i className="w-5 h-5 text-brand/50" />
                  <span className="font-semibold text-[14px]">{ind.l}</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ENGINEERING EXCELLENCE & STATS */}
      <section className="bg-ink text-white py-[80px]">
        <div className="wrap">
           <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
              
              {/* Left text */}
              <div className="lg:w-1/3">
                 <div className="font-mono text-[11px] text-brand uppercase tracking-[0.12em] mb-4">Why Botmartz</div>
                 <h2 className="text-[36px] font-semibold leading-[1.1] mb-6">Industry Knowledge.<br/><span className="text-brand">Engineering Excellence.</span></h2>
                 <p className="text-[15px] text-[#9FB9C8]">
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
                       <feat.i className="w-5 h-5 text-brand" />
                     </div>
                     <div>
                       <h4 className="font-semibold text-[15px] mb-1.5">{feat.t}</h4>
                       <p className="text-[13px] text-[#9FB9C8]">{feat.d}</p>
                     </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Stats Strip */}
           <div className="mt-[80px] pt-[60px] border-t border-white/10">
              <div className="font-mono text-[11px] text-signal uppercase tracking-[0.1em] text-center mb-8">Our Impact Across Industries</div>
              <div className="flex flex-wrap justify-between items-center gap-8">
                 {[
                   { i: Building2, s: '20+', l: 'Industries Served' },
                   { i: Briefcase, s: '100+', l: 'Enterprise Clients' },
                   { i: FileText, s: '50M+', l: 'Documents Processed' },
                   { i: ShieldCheck, s: '95%', l: 'Client Satisfaction' },
                   { i: TrendingUp, s: '40-60%', l: 'Operational Efficiency Gain' },
                 ].map((stat, i) => (
                   <div key={i} className="flex flex-col items-center text-center">
                     <stat.i className="w-6 h-6 text-brand/50 mb-3" />
                     <div className="text-[32px] font-semibold text-white leading-none mb-2">{stat.s}</div>
                     <div className="text-[12px] text-[#9FB9C8] uppercase font-mono">{stat.l}</div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="section-pad bg-white">
        <div className="wrap flex justify-between items-end gap-6 mb-10">
          <div>
            <div className="font-mono text-[11px] text-brand uppercase tracking-[0.08em] mb-3">Case Studies</div>
            <h2 className="text-[34px] font-semibold">AI Solutions Driving Real Business Results.</h2>
          </div>
          <Link href="/work/case-studies" className="btn btn-ghost hidden md:inline-flex">View All Case Studies →</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 wrap">
            <div className="border border-line rounded-sm overflow-hidden group cursor-pointer hover:border-brand transition-colors flex flex-col">
              <div className="p-8 flex-1 flex flex-col">
                <div className="font-mono text-[10px] text-brand uppercase bg-brand/10 inline-block px-2 py-1 rounded mb-4 self-start">Education</div>
                <h4 className="text-[20px] font-semibold mb-3">AI Course Assistant for Online Learning Platform</h4>
                <p className="text-[14px] text-ink-soft mb-6">Built an AI assistant that answered student queries, reduced support tickets by 60%, and improved student engagement.</p>
                <div className="mt-auto font-mono text-[12px] text-brand flex items-center gap-2 group-hover:gap-3 transition-all">Read Case Study <ArrowRight className="w-3 h-3" /></div>
              </div>
            </div>
            
            <div className="border border-line rounded-sm overflow-hidden group cursor-pointer hover:border-brand transition-colors flex flex-col">
              <div className="p-8 flex-1 flex flex-col">
                <div className="font-mono text-[10px] text-brand uppercase bg-brand/10 inline-block px-2 py-1 rounded mb-4 self-start">Logistics</div>
                <h4 className="text-[20px] font-semibold mb-3">Logistics Planner Agent for Global Supply Chain</h4>
                <p className="text-[14px] text-ink-soft mb-6">Implemented an AI agent that optimized routes and scheduling, improving on-time delivery rate by 28%.</p>
                <div className="mt-auto font-mono text-[12px] text-brand flex items-center gap-2 group-hover:gap-3 transition-all">Read Case Study <ArrowRight className="w-3 h-3" /></div>
              </div>
            </div>
            
            <div className="border border-line rounded-sm overflow-hidden group cursor-pointer hover:border-brand transition-colors flex flex-col">
              <div className="p-8 flex-1 flex flex-col">
                <div className="font-mono text-[10px] text-brand uppercase bg-brand/10 inline-block px-2 py-1 rounded mb-4 self-start">Legal</div>
                <h4 className="text-[20px] font-semibold mb-3">Contract Intelligence for Legal Tech Company</h4>
                <p className="text-[14px] text-ink-soft mb-6">Automated contract analysis and risk extraction, reducing manual review time by 70% and improving accuracy.</p>
                <div className="mt-auto font-mono text-[12px] text-brand flex items-center gap-2 group-hover:gap-3 transition-all">Read Case Study <ArrowRight className="w-3 h-3" /></div>
              </div>
            </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-[80px]">
        <div className="wrap">
          <div className="bg-ink rounded-[24px] p-[40px] md:p-[60px] text-white flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden">
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            <div className="relative z-10 max-w-[480px]">
              <h2 className="text-[36px] font-semibold leading-[1.1] mb-4">Ready to <span className="text-signal">Transform Your Industry</span> with AI?</h2>
              <p className="text-[15px] text-[#9FB9C8] mb-8">Let's build AI solutions tailored to your industry challenges and business goals.</p>
              <Link href="/contact" className="btn btn-primary bg-brand hover:bg-deep">Book a Discovery Call →</Link>
            </div>

            <div className="relative z-10 flex flex-col gap-4 w-full max-w-[340px]">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-4 items-start">
                <div className="bg-white/10 p-2.5 rounded-lg text-white">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[15px] mb-1">Free Discovery Call</h4>
                  <p className="text-[13px] text-[#9FB9C8]">60-minute strategy session with our AI experts.</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-4 items-start">
                <div className="bg-white/10 p-2.5 rounded-lg text-white">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[15px] mb-1">Custom Solution Roadmap</h4>
                  <p className="text-[13px] text-[#9FB9C8]">Tailored plan & architecture for your use case.</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-4 items-start">
                <div className="bg-white/10 p-2.5 rounded-lg text-white">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[15px] mb-1">Proven Frameworks</h4>
                  <p className="text-[13px] text-[#9FB9C8]">Built on best practices and real-world experience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
