import { Metadata } from 'next';
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Briefcase, FileText, Layout, Terminal, Code2, Code, ShieldCheck, Zap, Layers, Star, GitFork, Calendar, CheckSquare, ExternalLink } from "lucide-react";
import { adminDb } from '@/lib/firebase-admin';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Work | Botmartz AI',
    description: 'We partner with organizations to design, build, and deploy production AI systems that solve complex business problems and deliver measurable outcomes.',
  };
  
  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("work").get();
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
      title: meta.title,
      description: meta.description,
      url: 'https://botmartz.com/work',
      type: 'website',
    },
  };
}

export default async function WorkPage() {
  let heroData = {
    badge: "Our Work",
    title: "Engineering Impact.<br/><span className=\"text-[#00B8F0]\">Real Results.</span>",
    subtitle: "We partner with organizations to design, build, and deploy production AI systems that solve complex business problems and deliver measurable outcomes."
  };

  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("work").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      if (data?.hero) {
        heroData = { ...heroData, ...data.hero };
      }
    }
  } catch (e) {}

  return (
    <main className="bg-[#050B14] min-h-screen text-white">
      {/* HERO SECTION */}
      <section className="relative pt-[120px] pb-[80px] bg-[#050B14] text-white overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="wrap relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[13.5px] font-medium mb-6">
            <Link href="/" className="text-[#00B8F0] hover:underline">Home</Link>
            <span className="text-[#8A9EB0]">{'>'}</span>
            <span className="text-[#8A9EB0]">Work</span>
          </div>

          {/* 3-Column Hero Layout */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 xl:gap-14 pb-8">
            {/* Left Column: Text & CTA */}
            <div className="w-full lg:w-[42%] xl:max-w-[480px] shrink-0">
              <div className="font-mono text-[12px] tracking-[0.15em] text-[#00B8F0] font-bold uppercase mb-4">
                {heroData.badge}
              </div>
              <h1 
                className="text-[clamp(36px,4.5vw,56px)] leading-[1.1] font-bold mb-6 tracking-tight text-white"
                dangerouslySetInnerHTML={{ __html: heroData.title }}
              />
              <p className="text-[16px] text-[#8A9EB0] leading-relaxed mb-8">
                {heroData.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/contact" className="btn bg-[#0066FF] hover:bg-[#0052CC] text-white px-6 py-3.5 rounded-lg font-semibold text-[14px] flex items-center gap-2 shadow-[0_4px_16px_rgba(0,102,255,0.3)] transition-all">
                  Book a Discovery Call <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="#projects" className="btn border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all text-white px-6 py-3.5 rounded-lg text-[14px] font-medium flex items-center gap-2.5">
                  Discuss Your Project <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Center Column: Hero Illustration /case-studies2.png */}
            <div className="flex-1 flex justify-center items-center relative my-6 lg:my-0">
              <div className="relative w-full max-w-[440px] xl:max-w-[500px] flex justify-center items-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0066FF]/20 via-[#00B8F0]/25 to-transparent blur-[80px] rounded-full pointer-events-none" />
                <Image
                  src="/case-studies2.png"
                  alt="AI Engineering Impact Illustration"
                  width={520}
                  height={420}
                  className="w-full h-auto object-contain relative z-10 drop-shadow-[0_0_35px_rgba(0,184,240,0.25)]"
                  priority
                />
              </div>
            </div>

            {/* Right Column: Stacked Stats */}
            <div className="w-full lg:w-[240px] xl:w-[260px] shrink-0 flex flex-col justify-center gap-6 border-l border-white/10 lg:border-l-0 pl-6 lg:pl-0">
              <div className="border-b border-white/10 pb-6">
                <div className="flex items-center gap-3 mb-1">
                  <Layers className="w-5 h-5 text-[#8A9EB0]" />
                  <span className="text-[28px] sm:text-[32px] font-bold text-[#00B8F0] leading-none">20+</span>
                </div>
                <div className="text-[13.5px] text-[#8A9EB0] font-medium">Projects Delivered</div>
              </div>

              <div className="border-b border-white/10 pb-6">
                <div className="flex items-center gap-3 mb-1">
                  <Briefcase className="w-5 h-5 text-[#8A9EB0]" />
                  <span className="text-[28px] sm:text-[32px] font-bold text-[#00B8F0] leading-none">100+</span>
                </div>
                <div className="text-[13.5px] text-[#8A9EB0] font-medium">Enterprise Clients</div>
              </div>

              <div className="border-b border-white/10 pb-6">
                <div className="flex items-center gap-3 mb-1">
                  <FileText className="w-5 h-5 text-[#8A9EB0]" />
                  <span className="text-[28px] sm:text-[32px] font-bold text-[#00B8F0] leading-none">50M+</span>
                </div>
                <div className="text-[13.5px] text-[#8A9EB0] font-medium">Documents Processed</div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-1">
                  <ShieldCheck className="w-5 h-5 text-[#8A9EB0]" />
                  <span className="text-[28px] sm:text-[32px] font-bold text-[#00B8F0] leading-none">95%</span>
                </div>
                <div className="text-[13.5px] text-[#8A9EB0] font-medium">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER & PROJECTS SECTION */}
      <section id="projects" className="py-16 bg-[#F8FAFC] text-[#0B1C2C] border-y border-gray-200/80">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col lg:flex-row gap-10 lg:gap-12">
          
          {/* LEFT SIDEBAR: FILTERS */}
          <div className="w-full lg:w-[280px] shrink-0">
             <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm mb-6">
               <div className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#0066FF] border-b border-gray-100 pb-3 mb-6">
                 Filter Projects
               </div>
               
               {/* Service Filter */}
               <div className="mb-7">
                 <h4 className="font-semibold text-[14px] mb-3 text-[#0B1C2C]">Service</h4>
                 <ul className="space-y-2.5">
                   {['Enterprise RAG', 'AI Agents', 'AI Integrations'].map((f) => (
                     <li key={f} className="flex items-center gap-3">
                       <input 
                         type="checkbox" 
                         defaultChecked={f === 'Enterprise RAG' || f === 'AI Agents'}
                         id={`chk-srv-${f}`}
                         className="w-4 h-4 rounded border-gray-300 text-[#0066FF] focus:ring-[#0066FF] cursor-pointer"
                       />
                       <label htmlFor={`chk-srv-${f}`} className="text-[13.5px] text-[#475569] select-none cursor-pointer hover:text-[#0B1C2C] font-medium transition-colors">
                         {f}
                       </label>
                     </li>
                   ))}
                 </ul>
               </div>

               {/* Industry Filter */}
               <div className="mb-7 border-t border-gray-100 pt-6">
                 <h4 className="font-semibold text-[14px] mb-3 text-[#0B1C2C]">Industry</h4>
                 <ul className="space-y-2.5">
                   {['Education', 'Logistics', 'Legal', 'Healthcare', 'SaaS & Technology', 'Manufacturing', 'Financial Services'].map((f) => (
                     <li key={f} className="flex items-center gap-3">
                       <input 
                         type="checkbox" 
                         defaultChecked={['Logistics', 'Legal', 'SaaS & Technology'].includes(f)}
                         id={`chk-ind-${f}`}
                         className="w-4 h-4 rounded border-gray-300 text-[#0066FF] focus:ring-[#0066FF] cursor-pointer"
                       />
                       <label htmlFor={`chk-ind-${f}`} className="text-[13.5px] text-[#475569] select-none cursor-pointer hover:text-[#0B1C2C] font-medium transition-colors">
                         {f}
                       </label>
                     </li>
                   ))}
                 </ul>
               </div>

               {/* Tag Filter */}
               <div className="border-t border-gray-100 pt-6">
                 <h4 className="font-semibold text-[14px] mb-3 text-[#0B1C2C]">Tag / Capability</h4>
                 <ul className="space-y-2.5">
                   <li className="flex items-center gap-3">
                     <input 
                       type="checkbox" 
                       defaultChecked={true}
                       id="chk-tag-all"
                       className="w-4 h-4 rounded border-gray-300 text-[#0066FF] focus:ring-[#0066FF] cursor-pointer"
                     />
                     <label htmlFor="chk-tag-all" className="text-[13.5px] text-[#0B1C2C] font-bold select-none cursor-pointer">
                       All
                     </label>
                   </li>
                   {['Knowledge Search', 'Document Intelligence', 'Multi-Agent Systems', 'Workflow Automation', 'LLM Integration', 'Computer Vision', 'Data Engineering'].map((f) => (
                     <li key={f} className="flex items-center gap-3">
                       <input 
                         type="checkbox" 
                         defaultChecked={['Knowledge Search', 'Document Intelligence', 'Multi-Agent Systems'].includes(f)}
                         id={`chk-tag-${f}`}
                         className="w-4 h-4 rounded border-gray-300 text-[#0066FF] focus:ring-[#0066FF] cursor-pointer"
                       />
                       <label htmlFor={`chk-tag-${f}`} className="text-[13.5px] text-[#475569] select-none cursor-pointer hover:text-[#0B1C2C] font-medium transition-colors">
                         {f}
                       </label>
                     </li>
                   ))}
                 </ul>
               </div>
             </div>

             {/* Sidebar CTA */}
             <div className="bg-white border border-gray-200/80 rounded-2xl p-6 text-center shadow-sm flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0066FF] mb-3">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="font-bold text-[15px] mb-1.5 text-[#0B1C2C]">Have a similar challenge?</div>
                <p className="text-[13px] text-[#64748B] mb-5 leading-relaxed">Let&apos;s build a custom AI engineering solution tailored to your business goals.</p>
                <Link href="/contact" className="btn bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-[13px] px-5 py-3 rounded-xl transition-all shadow-[0_4px_12px_rgba(0,102,255,0.2)] w-full">
                  Book a Discovery Call →
                </Link>
             </div>
          </div>

          {/* RIGHT SIDEBAR: CONTENT */}
          <div className="flex-1">
             {/* Tab Navigation */}
             <div className="flex flex-wrap gap-2.5 mb-8">
                <div className="bg-[#0066FF] text-white font-semibold text-[13px] px-5 py-2.5 rounded-xl cursor-pointer shadow-sm transition-all">All Projects</div>
                <div className="bg-white border border-gray-200 hover:border-[#0066FF]/40 text-[#475569] font-medium text-[13px] px-5 py-2.5 rounded-xl cursor-pointer transition-colors shadow-sm">Featured</div>
                <div className="bg-white border border-gray-200 hover:border-[#0066FF]/40 text-[#475569] font-medium text-[13px] px-5 py-2.5 rounded-xl cursor-pointer transition-colors shadow-sm">Enterprise RAG</div>
                <div className="bg-white border border-gray-200 hover:border-[#0066FF]/40 text-[#475569] font-medium text-[13px] px-5 py-2.5 rounded-xl cursor-pointer transition-colors shadow-sm">AI Agents</div>
                <div className="bg-white border border-gray-200 hover:border-[#0066FF]/40 text-[#475569] font-medium text-[13px] px-5 py-2.5 rounded-xl cursor-pointer transition-colors shadow-sm">AI Integrations</div>
                <div className="bg-white border border-gray-200 hover:border-[#0066FF]/40 text-[#475569] font-medium text-[13px] px-5 py-2.5 rounded-xl cursor-pointer transition-colors shadow-sm">Open Source &amp; Labs</div>
             </div>

             {/* Project List */}
             <div className="flex flex-col gap-8">
                
                {/* Project 1 */}
                <div className="bg-white border border-gray-200/80 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all overflow-hidden p-6 sm:p-8 flex flex-col xl:flex-row gap-8 items-stretch group">
                   <div className="w-full xl:w-[38%] bg-[#0B1C2C] rounded-xl overflow-hidden relative min-h-[240px] border border-gray-800 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/20 via-transparent to-[#00B8F0]/10 opacity-60"></div>
                      <div className="relative z-10 w-4/5 bg-gray-900/90 border border-gray-700/80 rounded-lg p-4 shadow-2xl space-y-3">
                         <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                            <div className="flex gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70"></div>
                              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></div>
                              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70"></div>
                            </div>
                            <span className="font-mono text-[10px] text-gray-400">RAG Knowledge Base</span>
                         </div>
                         <div className="space-y-2">
                            <div className="h-3 w-3/4 bg-blue-500/30 rounded"></div>
                            <div className="h-2 w-full bg-gray-700 rounded"></div>
                            <div className="h-2 w-5/6 bg-gray-700 rounded"></div>
                            <div className="h-8 bg-gray-800 rounded border border-gray-700 mt-3 p-2 flex items-center justify-between">
                              <span className="text-[10px] text-gray-300 font-mono">Query: Logistics SOPs</span>
                              <span className="text-[9px] text-green-400 font-mono">0.12s</span>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="flex-1 flex flex-col justify-between">
                      <div>
                         <div className="font-mono text-[11px] font-bold text-[#0066FF] uppercase bg-blue-50 border border-blue-100/80 inline-block px-3 py-1 rounded-md mb-3">
                           Enterprise RAG
                         </div>
                         <h3 className="text-[22px] sm:text-[24px] font-bold mb-3 group-hover:text-[#0066FF] transition-colors text-[#0B1C2C]">
                           Enterprise Knowledge Search for Global Logistics Company
                         </h3>
                         <p className="text-[14.5px] text-[#475569] leading-relaxed mb-6">
                           Built a secure enterprise RAG system to unify and search across 500K+ internal documents, policies, SOPs, and shipping manuals.
                         </p>
                         
                         {/* Tech Tags */}
                         <div className="flex flex-wrap gap-2 mb-6">
                            {['RAG', 'Hybrid Search', 'LangChain', 'Pinecone', 'FastAPI'].map(t => (
                              <span key={t} className="font-mono text-[11px] bg-gray-100 border border-gray-200/80 text-[#334155] px-2.5 py-1 rounded-md font-medium">{t}</span>
                            ))}
                         </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-gray-100 pt-6">
                         <div className="flex flex-wrap gap-6">
                           <div>
                              <div className="text-[22px] font-extrabold leading-none mb-1 text-[#0B1C2C]">70%</div>
                              <div className="text-[12px] text-[#64748B] font-medium">Faster information retrieval</div>
                           </div>
                           <div className="border-l border-gray-200 pl-6">
                              <div className="text-[22px] font-extrabold leading-none mb-1 text-[#0B1C2C]">60%</div>
                              <div className="text-[12px] text-[#64748B] font-medium">Reduction in support tickets</div>
                           </div>
                           <div className="border-l border-gray-200 pl-6 hidden sm:block">
                              <div className="text-[22px] font-extrabold leading-none mb-1 text-[#0B1C2C]">3.2x</div>
                              <div className="text-[12px] text-[#64748B] font-medium">Increase in team productivity</div>
                           </div>
                         </div>
                         <Link href="/work/case-studies" className="font-mono text-[13px] font-bold text-[#0066FF] flex items-center gap-2 group-hover:gap-3 transition-all hover:underline whitespace-nowrap">
                           View Case Study: Logistics Knowledge Search →
                         </Link>
                      </div>
                   </div>
                </div>

                {/* Project 2 */}
                <div className="bg-white border border-gray-200/80 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all overflow-hidden p-6 sm:p-8 flex flex-col xl:flex-row gap-8 items-stretch group">
                   <div className="w-full xl:w-[38%] bg-[#0B1C2C] rounded-xl overflow-hidden relative min-h-[240px] border border-gray-800 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00B8F0]/20 via-transparent to-[#0066FF]/20 opacity-60"></div>
                      <div className="relative z-10 w-4/5 bg-gray-900/90 border border-gray-700/80 rounded-lg p-4 shadow-2xl space-y-3">
                         <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                            <span className="font-mono text-[10px] text-blue-400 font-bold">Autonomous Support Agent</span>
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                         </div>
                         <div className="space-y-2 font-mono text-[10px]">
                            <div className="bg-gray-800 p-2 rounded border border-gray-700 text-gray-300">User: How do I upgrade my team plan API tier?</div>
                            <div className="bg-[#0066FF]/20 p-2 rounded border border-[#0066FF]/40 text-blue-200">Agent: Checked billing quota. Executing upgrade flow... ✓</div>
                         </div>
                      </div>
                   </div>

                   <div className="flex-1 flex flex-col justify-between">
                      <div>
                         <div className="font-mono text-[11px] font-bold text-[#0066FF] uppercase bg-blue-50 border border-blue-100/80 inline-block px-3 py-1 rounded-md mb-3">
                           AI Agents
                         </div>
                         <h3 className="text-[22px] sm:text-[24px] font-bold mb-3 group-hover:text-[#0066FF] transition-colors text-[#0B1C2C]">
                           AI Support Agent for SaaS Customer Support
                         </h3>
                         <p className="text-[14.5px] text-[#475569] leading-relaxed mb-6">
                           Developed an autonomous AI support agent that resolves customer queries end-to-end with deep context, API tools, and human escalation.
                         </p>
                         
                         {/* Tech Tags */}
                         <div className="flex flex-wrap gap-2 mb-6">
                            {['LangGraph', 'OpenAI', 'Redis', 'FastAPI', 'Docker'].map(t => (
                              <span key={t} className="font-mono text-[11px] bg-gray-100 border border-gray-200/80 text-[#334155] px-2.5 py-1 rounded-md font-medium">{t}</span>
                            ))}
                         </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-gray-100 pt-6">
                         <div className="flex flex-wrap gap-6">
                           <div>
                              <div className="text-[22px] font-extrabold leading-none mb-1 text-[#0B1C2C]">45%</div>
                              <div className="text-[12px] text-[#64748B] font-medium">Queries resolved automatically</div>
                           </div>
                           <div className="border-l border-gray-200 pl-6">
                              <div className="text-[22px] font-extrabold leading-none mb-1 text-[#0B1C2C]">35%</div>
                              <div className="text-[12px] text-[#64748B] font-medium">Reduced first response time</div>
                           </div>
                           <div className="border-l border-gray-200 pl-6 hidden sm:block">
                              <div className="text-[22px] font-extrabold leading-none mb-1 text-[#0B1C2C]">90%</div>
                              <div className="text-[12px] text-[#64748B] font-medium">Customer satisfaction score</div>
                           </div>
                         </div>
                         <Link href="/work/case-studies" className="font-mono text-[13px] font-bold text-[#0066FF] flex items-center gap-2 group-hover:gap-3 transition-all hover:underline whitespace-nowrap">
                           View Case Study: AI Support Agent →
                         </Link>
                      </div>
                   </div>
                </div>

                {/* Project 3 */}
                <div className="bg-white border border-gray-200/80 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all overflow-hidden p-6 sm:p-8 flex flex-col xl:flex-row gap-8 items-stretch group">
                   <div className="w-full xl:w-[38%] bg-[#0B1C2C] rounded-xl overflow-hidden relative min-h-[240px] border border-gray-800 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/20 via-transparent to-purple-600/20 opacity-60"></div>
                      <div className="relative z-10 w-4/5 bg-gray-900/90 border border-gray-700/80 rounded-lg p-4 shadow-2xl space-y-3">
                         <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                            <span className="font-mono text-[10px] text-purple-400 font-bold">Document Intelligence OCR</span>
                            <span className="font-mono text-[9px] text-green-400">Accuracy: 95.8%</span>
                         </div>
                         <div className="space-y-2">
                            <div className="h-3 w-full bg-purple-500/20 rounded border border-purple-500/40 p-1 flex items-center justify-between text-[8px] text-purple-200 font-mono">
                              <span>Clause 14.2: Indemnification</span>
                              <span className="text-green-300">EXTRACTED</span>
                            </div>
                            <div className="h-2 w-3/4 bg-gray-700 rounded"></div>
                            <div className="h-2 w-full bg-gray-700 rounded"></div>
                         </div>
                      </div>
                   </div>

                   <div className="flex-1 flex flex-col justify-between">
                      <div>
                         <div className="font-mono text-[11px] font-bold text-[#0066FF] uppercase bg-blue-50 border border-blue-100/80 inline-block px-3 py-1 rounded-md mb-3">
                           Enterprise RAG
                         </div>
                         <h3 className="text-[22px] sm:text-[24px] font-bold mb-3 group-hover:text-[#0066FF] transition-colors text-[#0B1C2C]">
                           Legal Document Intelligence Platform
                         </h3>
                         <p className="text-[14.5px] text-[#475569] leading-relaxed mb-6">
                           Automated contract analysis and risk review across 100K+ legal documents with 95% accuracy using advanced hybrid RAG and custom OCR.
                         </p>
                         
                         {/* Tech Tags */}
                         <div className="flex flex-wrap gap-2 mb-6">
                            {['RAG', 'OCR', 'LlamaIndex', 'Qdrant', 'PostgreSQL'].map(t => (
                              <span key={t} className="font-mono text-[11px] bg-gray-100 border border-gray-200/80 text-[#334155] px-2.5 py-1 rounded-md font-medium">{t}</span>
                            ))}
                         </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-gray-100 pt-6">
                         <div className="flex flex-wrap gap-6">
                           <div>
                              <div className="text-[22px] font-extrabold leading-none mb-1 text-[#0B1C2C]">90%</div>
                              <div className="text-[12px] text-[#64748B] font-medium">Time saved in analysis</div>
                           </div>
                           <div className="border-l border-gray-200 pl-6">
                              <div className="text-[22px] font-extrabold leading-none mb-1 text-[#0B1C2C]">95%</div>
                              <div className="text-[12px] text-[#64748B] font-medium">Extraction accuracy</div>
                           </div>
                           <div className="border-l border-gray-200 pl-6 hidden sm:block">
                              <div className="text-[22px] font-extrabold leading-none mb-1 text-[#0B1C2C]">80%</div>
                              <div className="text-[12px] text-[#64748B] font-medium">Faster contract review</div>
                           </div>
                         </div>
                         <Link href="/work/case-studies" className="font-mono text-[13px] font-bold text-[#0066FF] flex items-center gap-2 group-hover:gap-3 transition-all hover:underline whitespace-nowrap">
                           View Case Study: Legal Document Intelligence →
                         </Link>
                      </div>
                   </div>
                </div>

                {/* Project 4 */}
                <div className="bg-white border border-gray-200/80 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all overflow-hidden p-6 sm:p-8 flex flex-col xl:flex-row gap-8 items-stretch group">
                   <div className="w-full xl:w-[38%] bg-[#0B1C2C] rounded-xl overflow-hidden relative min-h-[240px] border border-gray-800 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-[#0066FF]/20 opacity-60"></div>
                      <div className="relative z-10 w-4/5 bg-gray-900/90 border border-gray-700/80 rounded-lg p-4 shadow-2xl space-y-3">
                         <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                            <span className="font-mono text-[10px] text-emerald-400 font-bold">Supply Chain Optimizer Agent</span>
                            <span className="font-mono text-[9px] text-gray-400">Active Routing</span>
                         </div>
                         <div className="space-y-2">
                            <div className="h-3 w-full bg-emerald-500/20 rounded border border-emerald-500/40 p-1 flex items-center justify-between text-[8px] text-emerald-200 font-mono">
                              <span>Shipment #IN-9082: Route Re-calculated</span>
                              <span className="text-emerald-300">-4.2 hrs</span>
                            </div>
                            <div className="h-2 w-5/6 bg-gray-700 rounded"></div>
                            <div className="h-2 w-full bg-gray-700 rounded"></div>
                         </div>
                      </div>
                   </div>

                   <div className="flex-1 flex flex-col justify-between">
                      <div>
                         <div className="font-mono text-[11px] font-bold text-[#0066FF] uppercase bg-blue-50 border border-blue-100/80 inline-block px-3 py-1 rounded-md mb-3">
                           AI Agents
                         </div>
                         <h3 className="text-[22px] sm:text-[24px] font-bold mb-3 group-hover:text-[#0066FF] transition-colors text-[#0B1C2C]">
                           Logistics Planner Agent for Global Supply Chain
                         </h3>
                         <p className="text-[14.5px] text-[#475569] leading-relaxed mb-6">
                           Engineered a multi-agent logistics planning engine that predicts delays and re-routes high-value shipments in real time across global supply networks.
                         </p>
                         
                         {/* Tech Tags */}
                         <div className="flex flex-wrap gap-2 mb-6">
                            {['LangGraph', 'vLLM', 'Milvus', 'PostgreSQL', 'Docker'].map(t => (
                              <span key={t} className="font-mono text-[11px] bg-gray-100 border border-gray-200/80 text-[#334155] px-2.5 py-1 rounded-md font-medium">{t}</span>
                            ))}
                         </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-gray-100 pt-6">
                         <div className="flex flex-wrap gap-6">
                           <div>
                              <div className="text-[22px] font-extrabold leading-none mb-1 text-[#0B1C2C]">28%</div>
                              <div className="text-[12px] text-[#64748B] font-medium">Improved on-time delivery</div>
                           </div>
                           <div className="border-l border-gray-200 pl-6">
                              <div className="text-[22px] font-extrabold leading-none mb-1 text-[#0B1C2C]">22%</div>
                              <div className="text-[12px] text-[#64748B] font-medium">Lower logistics cost</div>
                           </div>
                           <div className="border-l border-gray-200 pl-6 hidden sm:block">
                              <div className="text-[22px] font-extrabold leading-none mb-1 text-[#0B1C2C]">3.5x</div>
                              <div className="text-[12px] text-[#64748B] font-medium">Faster planning cycle</div>
                           </div>
                         </div>
                         <Link href="/work/case-studies" className="font-mono text-[13px] font-bold text-[#0066FF] flex items-center gap-2 group-hover:gap-3 transition-all hover:underline whitespace-nowrap">
                           View Case Study: Logistics Planner Agent →
                         </Link>
                      </div>
                   </div>
                </div>

             </div>
          </div>
        </div>
      </section>

      {/* OPEN SOURCE & LABS */}
      <section className="section-pad bg-[#0A111F] border-y border-[#1E293B]">
        <div className="wrap flex justify-between items-end gap-6 mb-10">
          <div>
            <div className="font-mono text-[11px] text-[#00B8F0] uppercase tracking-[0.08em] mb-3">Open Source & Labs</div>
            <h2 className="text-[34px] font-semibold mb-2 text-white">Building the Future. In Public.</h2>
            <p className="text-[15px] text-[#8A9EB0]">We build open source projects and labs that push the boundaries of AI engineering.</p>
          </div>
          <Link href="/community" className="font-mono text-[12.5px] border border-[#1E293B] bg-[#050B14] hover:border-[#00B8F0] hover:text-[#00B8F0] transition-colors px-5 py-2.5 rounded-sm text-white hidden md:inline-flex items-center gap-2">Explore All Projects →</Link>
        </div>

        <div className="wrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {[
             { i: Code, n: 'enterprise-rag-starter', d: 'Production-ready RAG starter kit with chunking and eval.', s: '1.8k', f: '320' },
             { i: GitFork, n: 'langgraph-agent-framework', d: 'Multi-agent framework with examples and tool connectors.', s: '2.3k', f: '410' },
             { i: Zap, n: 'fastapi-ai-template', d: 'AI-ready FastAPI boilerplate with auth and streaming.', s: '1.2k', f: '240' },
             { i: FileText, n: 'doc-parser', d: 'High-performance document parser for complex PDFs.', s: '980', f: '180' },
             { i: Layout, n: 'vision-tryon-lab', d: 'Virtual try-on pipeline with diffusion models and ControlNet.', s: '1.6k', f: '300' },
             { i: Terminal, n: 'ai-research-agent', d: 'Autonomous research agent with web browsing tools.', s: '1.9k', f: '350' },
           ].map((lab, i) => (
             <div key={i} className="bg-[#050B14] border border-[#1E293B] rounded-sm p-6 hover:border-[#00B8F0] hover:shadow-md transition-all cursor-pointer flex flex-col">
               <div className="w-10 h-10 border border-[#1E293B] rounded flex items-center justify-center text-[#00B8F0] bg-[#0A111F] mb-4">
                 <lab.i className="w-5 h-5" />
               </div>
               <h4 className="font-mono text-[14px] font-bold mb-2 text-white">{lab.n}</h4>
               <p className="text-[13px] text-[#8A9EB0] mb-6 flex-1">{lab.d}</p>
               <div className="flex items-center gap-4 text-[12px] font-mono text-[#8A9EB0]">
                  <div className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5" /> {lab.s}</div>
                  <div className="flex items-center gap-1.5"><GitFork className="w-3.5 h-3.5" /> {lab.f}</div>
               </div>
             </div>
           ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-[80px] bg-[#050B14]">
        <div className="wrap">
          <div className="bg-[#0A111F] border border-[#1E293B] rounded-[24px] p-[40px] md:p-[60px] text-white flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden">
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            <div className="relative z-10 max-w-[480px]">
              <div className="font-mono text-[11px] text-[#00B8F0] uppercase tracking-[0.12em] mb-3">Have a Project in mind?</div>
              <h2 className="text-[36px] font-semibold leading-[1.1] mb-6">Let's Build AI Solutions That <span className="text-[#FF3366]">Drive Real Impact.</span></h2>
              <Link href="/contact" className="btn btn-primary bg-[#00B8F0] hover:bg-[#0096C7] px-6 py-3 rounded text-[14px]">Book a Discovery Call →</Link>
            </div>

            <div className="relative z-10 flex flex-col gap-4 w-full max-w-[340px]">
              <div className="bg-[#050B14] border border-[#1E293B] rounded-xl p-5 flex gap-4 items-start">
                <div className="bg-[#00B8F0]/10 border border-[#00B8F0]/20 p-2.5 rounded-lg text-white">
                  <Calendar className="w-5 h-5 text-[#00B8F0]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[15px] mb-1 text-white">Free Discovery Call</h4>
                  <p className="text-[13px] text-[#8A9EB0]">60-minute strategy session with our AI experts.</p>
                </div>
              </div>
              <div className="bg-[#050B14] border border-[#1E293B] rounded-xl p-5 flex gap-4 items-start">
                <div className="bg-[#00B8F0]/10 border border-[#00B8F0]/20 p-2.5 rounded-lg text-white">
                  <Terminal className="w-5 h-5 text-[#00B8F0]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[15px] mb-1 text-white">Custom Solution Roadmap</h4>
                  <p className="text-[13px] text-[#8A9EB0]">Tailored plan & architecture for your use case.</p>
                </div>
              </div>
              <div className="bg-[#050B14] border border-[#1E293B] rounded-xl p-5 flex gap-4 items-start">
                <div className="bg-[#00B8F0]/10 border border-[#00B8F0]/20 p-2.5 rounded-lg text-white">
                  <Layers className="w-5 h-5 text-[#00B8F0]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[15px] mb-1 text-white">Proven Delivery</h4>
                  <p className="text-[13px] text-[#8A9EB0]">Production-ready solutions with measurable outcomes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}