import Link from "next/link";
import { ArrowRight, Briefcase, FileText, Layout, Terminal, Code2, Code, ShieldCheck, Zap, Layers, Star, GitFork, Calendar, CheckSquare } from "lucide-react";

export default function WorkPage() {
  return (
    <main className="bg-paper">
      {/* HERO SECTION */}
      <section className="relative pt-[80px] pb-0 bg-ink text-white overflow-hidden blueprint" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.08) 1px, transparent 1px)' }}>
        <div className="wrap relative z-10 flex flex-col lg:flex-row items-center gap-12 pb-[60px]">
          <div className="flex-1 lg:max-w-[500px]">
            <div className="font-mono text-[11px] text-signal uppercase tracking-[0.12em] mb-4">Our Work</div>
            <h1 className="text-[clamp(32px,4.5vw,50px)] leading-[1.05] font-semibold mb-6">
              Engineering Impact.<br/><span className="text-brand">Real Results.</span>
            </h1>
            <p className="text-[17px] text-[#9FB9C8] mb-8">
              We partner with organizations to design, build, and deploy production AI systems that solve complex business problems and deliver measurable outcomes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn btn-primary bg-brand text-white hover:bg-deep">Book a Discovery Call →</Link>
              <Link href="#projects" className="btn border border-white/20 hover:border-brand hover:text-brand transition-colors text-white px-6 py-2 rounded-sm text-[13px] font-mono">Discuss Your Project</Link>
            </div>
          </div>
          
          <div className="flex-1 w-full lg:block border-l border-white/10 lg:pl-12 flex flex-col justify-center">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-y-10 gap-x-6 max-w-[400px]">
               <div className="flex gap-4">
                  <Layers className="w-6 h-6 text-brand shrink-0" />
                  <div>
                     <div className="text-[24px] font-bold leading-none mb-1 text-white">20+</div>
                     <div className="font-mono text-[11px] text-[#8598A6] uppercase tracking-wider">Projects Delivered</div>
                  </div>
               </div>
               <div className="flex gap-4">
                  <Briefcase className="w-6 h-6 text-brand shrink-0" />
                  <div>
                     <div className="text-[24px] font-bold leading-none mb-1 text-white">100+</div>
                     <div className="font-mono text-[11px] text-[#8598A6] uppercase tracking-wider">Enterprise Clients</div>
                  </div>
               </div>
               <div className="flex gap-4">
                  <FileText className="w-6 h-6 text-brand shrink-0" />
                  <div>
                     <div className="text-[24px] font-bold leading-none mb-1 text-white">50M+</div>
                     <div className="font-mono text-[11px] text-[#8598A6] uppercase tracking-wider">Documents Processed</div>
                  </div>
               </div>
               <div className="flex gap-4">
                  <ShieldCheck className="w-6 h-6 text-brand shrink-0" />
                  <div>
                     <div className="text-[24px] font-bold leading-none mb-1 text-white">95%</div>
                     <div className="font-mono text-[11px] text-[#8598A6] uppercase tracking-wider">Client Satisfaction</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER & PROJECTS SECTION */}
      <section id="projects" className="py-[60px] bg-white">
        <div className="wrap flex flex-col lg:flex-row gap-10 lg:gap-14">
          
          {/* LEFT SIDEBAR: FILTERS */}
          <div className="w-full lg:w-[260px] shrink-0">
             <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-brand border-b border-line pb-3 mb-6">Filter Projects</div>
             
             {/* Service Filter */}
             <div className="mb-8">
               <h4 className="font-semibold text-[14px] mb-3">Service</h4>
               <ul className="space-y-2">
                 {['Enterprise RAG', 'AI Agents', 'AI Integrations'].map((f) => (
                   <li key={f} className="flex items-center gap-3">
                     <div className="w-4 h-4 border border-line rounded-sm flex items-center justify-center text-transparent hover:border-brand cursor-pointer transition-colors" />
                     <span className="text-[13.5px] text-ink-soft select-none cursor-pointer hover:text-ink transition-colors">{f}</span>
                   </li>
                 ))}
               </ul>
             </div>

             {/* Industry Filter */}
             <div className="mb-8">
               <h4 className="font-semibold text-[14px] mb-3">Industry</h4>
               <ul className="space-y-2">
                 {['Education', 'Logistics', 'Legal', 'Healthcare', 'SaaS & Technology', 'Manufacturing', 'Financial Services'].map((f) => (
                   <li key={f} className="flex items-center gap-3">
                     <div className="w-4 h-4 border border-line rounded-sm flex items-center justify-center text-transparent hover:border-brand cursor-pointer transition-colors" />
                     <span className="text-[13.5px] text-ink-soft select-none cursor-pointer hover:text-ink transition-colors">{f}</span>
                   </li>
                 ))}
               </ul>
             </div>

             {/* Tag Filter */}
             <div className="mb-8">
               <h4 className="font-semibold text-[14px] mb-3">Tag / Capability</h4>
               <ul className="space-y-2">
                 <li className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-brand border border-brand rounded-sm flex items-center justify-center text-white cursor-pointer transition-colors">
                      <CheckSquare className="w-3 h-3" />
                    </div>
                    <span className="text-[13.5px] text-ink font-medium select-none cursor-pointer">All</span>
                 </li>
                 {['Knowledge Search', 'Document Intelligence', 'Multi-Agent Systems', 'Workflow Automation', 'LLM Integration', 'Computer Vision', 'Data Engineering'].map((f) => (
                   <li key={f} className="flex items-center gap-3">
                     <div className="w-4 h-4 border border-line rounded-sm flex items-center justify-center text-transparent hover:border-brand cursor-pointer transition-colors" />
                     <span className="text-[13.5px] text-ink-soft select-none cursor-pointer hover:text-ink transition-colors">{f}</span>
                   </li>
                 ))}
               </ul>
             </div>

             {/* Sidebar CTA */}
             <div className="bg-grid-bg border border-line rounded p-5 text-center flex flex-col items-center">
                <div className="font-semibold text-[14px] mb-2 text-brand">Have a similar challenge?</div>
                <p className="text-[12.5px] text-ink-soft mb-4">Let's build a solution tailored to your business.</p>
                <Link href="/contact" className="font-mono text-[11px] border border-line px-4 py-2 hover:border-brand hover:text-brand transition-colors rounded-sm text-ink w-full">Book a Discovery Call →</Link>
             </div>
          </div>

          {/* RIGHT SIDEBAR: CONTENT */}
          <div className="flex-1">
             {/* Tab Navigation */}
             <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8">
                <div className="bg-brand text-white font-mono text-[12px] px-5 py-2 rounded cursor-pointer whitespace-nowrap">All Projects</div>
                <div className="bg-white border border-line hover:border-brand/50 text-ink-soft font-mono text-[12px] px-5 py-2 rounded cursor-pointer transition-colors whitespace-nowrap">Featured</div>
                <div className="bg-white border border-line hover:border-brand/50 text-ink-soft font-mono text-[12px] px-5 py-2 rounded cursor-pointer transition-colors whitespace-nowrap">Enterprise RAG</div>
                <div className="bg-white border border-line hover:border-brand/50 text-ink-soft font-mono text-[12px] px-5 py-2 rounded cursor-pointer transition-colors whitespace-nowrap">AI Agents</div>
                <div className="bg-white border border-line hover:border-brand/50 text-ink-soft font-mono text-[12px] px-5 py-2 rounded cursor-pointer transition-colors whitespace-nowrap">AI Integrations</div>
                <div className="bg-white border border-line hover:border-brand/50 text-ink-soft font-mono text-[12px] px-5 py-2 rounded cursor-pointer transition-colors whitespace-nowrap">Open Source & Labs</div>
             </div>

             {/* Project List */}
             <div className="flex flex-col gap-10">
                
                {/* Project 1 */}
                <div className="flex flex-col md:flex-row gap-8 items-stretch pb-10 border-b border-line group">
                   <div className="w-full md:w-[45%] lg:w-[40%] bg-ink rounded border border-line overflow-hidden relative min-h-[220px]">
                      {/* Image Placeholder */}
                      <div className="absolute inset-0 blueprint opacity-20"></div>
                      <div className="absolute inset-4 bg-white/5 border border-white/10 rounded backdrop-blur flex items-center justify-center p-4">
                        <div className="w-full h-full bg-grid-bg border border-line rounded flex flex-col opacity-50 overflow-hidden">
                           <div className="h-4 border-b border-line w-full"></div>
                           <div className="flex-1 flex gap-2 p-2">
                             <div className="w-1/3 h-full border border-line rounded-sm"></div>
                             <div className="flex-1 h-full border border-line rounded-sm flex flex-col gap-2 p-2">
                                <div className="h-2 w-full bg-line rounded"></div>
                                <div className="h-2 w-2/3 bg-line rounded"></div>
                             </div>
                           </div>
                        </div>
                      </div>
                   </div>
                   <div className="flex-1 flex flex-col justify-between">
                      <div>
                         <div className="font-mono text-[10px] text-brand uppercase bg-brand/10 inline-block px-2 py-1 rounded mb-3">Enterprise RAG</div>
                         <h3 className="text-[22px] font-semibold mb-3 group-hover:text-brand transition-colors">Enterprise Knowledge Search for Global Logistics Company</h3>
                         <p className="text-[14px] text-ink-soft mb-6">Built a secure enterprise RAG system to unify and search across 500K+ internal documents, policies, SOPs, and manuals.</p>
                         
                         {/* Tech Tags */}
                         <div className="flex flex-wrap gap-2 mb-6">
                            {['RAG', 'Hybrid Search', 'LangChain', 'Pinecone', 'FastAPI'].map(t => (
                              <span key={t} className="font-mono text-[10.5px] border border-line text-ink-soft px-2 py-1 rounded-sm">{t}</span>
                            ))}
                         </div>
                      </div>
                      
                      <div className="flex items-center gap-8 border-t border-line pt-4">
                         <div>
                            <div className="text-[20px] font-semibold leading-none mb-1 text-brand">70%</div>
                            <div className="text-[12px] text-ink-soft">Faster information retrieval</div>
                         </div>
                         <Link href="/contact" className="ml-auto font-mono text-[12px] text-brand flex items-center gap-2 group-hover:gap-3 transition-all">View Case Study <ArrowRight className="w-3 h-3" /></Link>
                      </div>
                   </div>
                </div>

                {/* Project 2 */}
                <div className="flex flex-col md:flex-row gap-8 items-stretch pb-10 border-b border-line group">
                   <div className="w-full md:w-[45%] lg:w-[40%] bg-grid-bg rounded border border-line overflow-hidden relative min-h-[220px]">
                      {/* Image Placeholder */}
                      <div className="absolute inset-6 bg-white border border-line rounded shadow-lg flex items-center justify-center p-4">
                         <div className="flex items-center justify-center w-full h-full relative">
                           <div className="w-10 h-10 border border-brand/50 rounded-full flex items-center justify-center absolute left-4 text-brand bg-brand/10 z-10"><Terminal className="w-5 h-5"/></div>
                           <div className="h-px bg-brand/30 w-full absolute top-1/2 -translate-y-1/2"></div>
                           <div className="w-12 h-12 border-2 border-brand rounded flex items-center justify-center absolute bg-white z-10"><Code2 className="w-6 h-6 text-brand"/></div>
                           <div className="w-10 h-10 border border-brand/50 rounded flex items-center justify-center absolute right-4 text-brand bg-brand/10 z-10"><Layout className="w-5 h-5"/></div>
                         </div>
                      </div>
                   </div>
                   <div className="flex-1 flex flex-col justify-between">
                      <div>
                         <div className="font-mono text-[10px] text-brand uppercase bg-brand/10 inline-block px-2 py-1 rounded mb-3">AI Agents</div>
                         <h3 className="text-[22px] font-semibold mb-3 group-hover:text-brand transition-colors">AI Support Agent for SaaS Customer Support</h3>
                         <p className="text-[14px] text-ink-soft mb-6">Developed an autonomous AI support agent that resolves customer queries end-to-end with context, tools, and human escalation.</p>
                         
                         {/* Tech Tags */}
                         <div className="flex flex-wrap gap-2 mb-6">
                            {['LangGraph', 'OpenAI', 'Redis', 'FastAPI', 'Docker'].map(t => (
                              <span key={t} className="font-mono text-[10.5px] border border-line text-ink-soft px-2 py-1 rounded-sm">{t}</span>
                            ))}
                         </div>
                      </div>
                      
                      <div className="flex items-center gap-8 border-t border-line pt-4">
                         <div>
                            <div className="text-[20px] font-semibold leading-none mb-1 text-brand">45%</div>
                            <div className="text-[12px] text-ink-soft">Queries resolved automatically</div>
                         </div>
                         <div>
                            <div className="text-[20px] font-semibold leading-none mb-1 text-brand">35%</div>
                            <div className="text-[12px] text-ink-soft">Reduced first response time</div>
                         </div>
                         <Link href="/contact" className="ml-auto font-mono text-[12px] text-brand flex items-center gap-2 group-hover:gap-3 transition-all hidden sm:flex">View Case Study <ArrowRight className="w-3 h-3" /></Link>
                      </div>
                   </div>
                </div>

                {/* Project 3 */}
                <div className="flex flex-col md:flex-row gap-8 items-stretch group">
                   <div className="w-full md:w-[45%] lg:w-[40%] bg-grid-bg rounded border border-line overflow-hidden relative min-h-[220px]">
                      {/* Image Placeholder */}
                      <div className="absolute inset-4 bg-white border border-line rounded flex flex-col shadow-sm">
                         <div className="h-6 border-b border-line bg-gray-50 rounded-t flex items-center px-2"><div className="w-2 h-2 rounded-full bg-line mx-1"></div><div className="w-2 h-2 rounded-full bg-line mx-1"></div></div>
                         <div className="flex-1 flex gap-2 p-3">
                           <div className="w-1/2 h-full flex flex-col gap-2">
                             <div className="w-full h-3 bg-brand/10 rounded-sm"></div>
                             <div className="w-full h-2 bg-line rounded-sm"></div>
                             <div className="w-full h-2 bg-line rounded-sm"></div>
                             <div className="w-full h-2 bg-line rounded-sm"></div>
                             <div className="w-4/5 h-2 bg-line rounded-sm"></div>
                             <div className="w-full h-2 bg-brand/20 mt-4 rounded-sm"></div>
                           </div>
                           <div className="w-1/2 h-full border border-brand/20 bg-brand/5 rounded-sm p-2 flex flex-col gap-2">
                              <div className="text-[8px] font-mono text-brand mb-1">JSON EXTRACT</div>
                              <div className="w-full h-2 bg-white rounded-sm"></div>
                              <div className="w-5/6 h-2 bg-white rounded-sm"></div>
                              <div className="w-full h-2 bg-white rounded-sm"></div>
                           </div>
                         </div>
                      </div>
                   </div>
                   <div className="flex-1 flex flex-col justify-between">
                      <div>
                         <div className="font-mono text-[10px] text-brand uppercase bg-brand/10 inline-block px-2 py-1 rounded mb-3">Document Intelligence</div>
                         <h3 className="text-[22px] font-semibold mb-3 group-hover:text-brand transition-colors">Legal Document Intelligence Platform</h3>
                         <p className="text-[14px] text-ink-soft mb-6">Automated contract analysis and Q&A across 100K+ legal documents with 95% accuracy using advanced RAG and OCR.</p>
                         
                         {/* Tech Tags */}
                         <div className="flex flex-wrap gap-2 mb-6">
                            {['RAG', 'OCR', 'LlamaIndex', 'Qdrant', 'PostgreSQL'].map(t => (
                              <span key={t} className="font-mono text-[10.5px] border border-line text-ink-soft px-2 py-1 rounded-sm">{t}</span>
                            ))}
                         </div>
                      </div>
                      
                      <div className="flex items-center gap-8 border-t border-line pt-4">
                         <div>
                            <div className="text-[20px] font-semibold leading-none mb-1 text-brand">90%</div>
                            <div className="text-[12px] text-ink-soft">Time saved in analysis</div>
                         </div>
                         <div>
                            <div className="text-[20px] font-semibold leading-none mb-1 text-brand">95%</div>
                            <div className="text-[12px] text-ink-soft">Extraction accuracy</div>
                         </div>
                         <Link href="/contact" className="ml-auto font-mono text-[12px] text-brand flex items-center gap-2 group-hover:gap-3 transition-all hidden sm:flex">View Case Study <ArrowRight className="w-3 h-3" /></Link>
                      </div>
                   </div>
                </div>

             </div>
          </div>
        </div>
      </section>

      {/* OPEN SOURCE & LABS */}
      <section className="section-pad bg-paper border-y border-line">
        <div className="wrap flex justify-between items-end gap-6 mb-10">
          <div>
            <div className="font-mono text-[11px] text-brand uppercase tracking-[0.08em] mb-3">Open Source & Labs</div>
            <h2 className="text-[34px] font-semibold mb-2">Building the Future. In Public.</h2>
            <p className="text-[15px] text-ink-soft">We build open source projects and labs that push the boundaries of AI engineering.</p>
          </div>
          <Link href="/community" className="font-mono text-[12.5px] border border-line bg-white hover:border-brand hover:text-brand transition-colors px-5 py-2.5 rounded-sm text-ink hidden md:inline-flex items-center gap-2">Explore All Projects →</Link>
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
             <div key={i} className="bg-white border border-line rounded-sm p-6 hover:border-brand hover:shadow-md transition-all cursor-pointer flex flex-col">
               <div className="w-10 h-10 border border-line rounded flex items-center justify-center text-brand bg-grid-bg mb-4">
                 <lab.i className="w-5 h-5" />
               </div>
               <h4 className="font-mono text-[14px] font-bold mb-2">{lab.n}</h4>
               <p className="text-[13px] text-ink-soft mb-6 flex-1">{lab.d}</p>
               <div className="flex items-center gap-4 text-[12px] font-mono text-[#8598A6]">
                  <div className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5" /> {lab.s}</div>
                  <div className="flex items-center gap-1.5"><GitFork className="w-3.5 h-3.5" /> {lab.f}</div>
               </div>
             </div>
           ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-[80px] bg-white">
        <div className="wrap">
          <div className="bg-ink rounded-[24px] p-[40px] md:p-[60px] text-white flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden">
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            <div className="relative z-10 max-w-[480px]">
              <div className="font-mono text-[11px] text-brand uppercase tracking-[0.12em] mb-3">Have a Project in mind?</div>
              <h2 className="text-[36px] font-semibold leading-[1.1] mb-6">Let's Build AI Solutions That <span className="text-signal">Drive Real Impact.</span></h2>
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
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[15px] mb-1">Custom Solution Roadmap</h4>
                  <p className="text-[13px] text-[#9FB9C8]">Tailored plan & architecture for your use case.</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-4 items-start">
                <div className="bg-white/10 p-2.5 rounded-lg text-white">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[15px] mb-1">Proven Delivery</h4>
                  <p className="text-[13px] text-[#9FB9C8]">Production-ready solutions with measurable outcomes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}