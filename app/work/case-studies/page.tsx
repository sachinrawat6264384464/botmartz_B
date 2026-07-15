import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Terminal, Code2, Layout } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Case Studies & Success Stories | Botmartz AI',
  description: 'Explore our AI case studies across Education, Logistics, Legal, and SaaS. See how we deliver real business impact through Enterprise RAG and AI Agents.',
  keywords: ['AI Case Studies', 'Enterprise AI Success Stories', 'AI Agents Case Study', 'RAG Case Study', 'Botmartz Impact'],
  openGraph: {
    title: 'AI Case Studies & Success Stories | Botmartz AI',
    description: 'Explore how we deliver real business impact through Enterprise RAG and AI Agents.',
    url: 'https://botmartz.com/work/case-studies',
    type: 'website',
  },
};

export default function CaseStudiesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AI Case Studies",
    "description": metadata.description,
    "provider": {
      "@type": "Organization",
      "name": "Botmartz AI Solutions"
    }
  };

  return (
    <main className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* HERO SECTION */}
      <section className="relative pt-[80px] pb-[60px] bg-ink text-white overflow-hidden blueprint" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.08) 1px, transparent 1px)' }}>
        <div className="wrap relative z-10 flex flex-col items-center text-center max-w-[800px] mx-auto">
          <div className="font-mono text-[11px] text-signal uppercase tracking-[0.12em] mb-4 flex items-center gap-2 justify-center">
            <Link href="/work" className="hover:text-white transition-colors">Work</Link> <span>/</span> <span className="text-white">Case Studies</span>
          </div>
          <h1 className="text-[clamp(32px,4.5vw,50px)] leading-[1.05] font-semibold mb-6">
            Proven AI Implementations.<br/><span className="text-brand">Real Business Results.</span>
          </h1>
          <p className="text-[17px] text-[#9FB9C8] mb-8 max-w-[600px] mx-auto">
            Discover how we partner with leading organizations to deploy production-ready AI agents and RAG systems that drive operational efficiency and unlock new capabilities.
          </p>
        </div>
      </section>

      {/* CASE STUDIES GRID */}
      <section className="py-[60px] bg-white">
        <div className="wrap flex flex-col gap-10">
           
           {/* Project 1 */}
           <div className="flex flex-col md:flex-row gap-8 items-stretch pb-10 border-b border-line group">
              <div className="w-full md:w-[45%] lg:w-[40%] bg-ink rounded border border-line overflow-hidden relative min-h-[260px]">
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
                    <div className="font-mono text-[10px] text-brand uppercase bg-brand/10 inline-block px-2 py-1 rounded mb-3">Logistics • Enterprise RAG</div>
                    <h3 className="text-[24px] font-semibold mb-3 group-hover:text-brand transition-colors">Enterprise Knowledge Search for Global Logistics</h3>
                    <p className="text-[15px] text-ink-soft mb-6">
                      We partnered with a Fortune 500 logistics provider to build a secure enterprise RAG system. The solution unified search across 500K+ internal documents, complex SOPs, and manuals, allowing operations teams to instantly query policy data and compliance standards without hallucinations.
                    </p>
                    
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
                       <div className="text-[12px] text-ink-soft">Faster retrieval</div>
                    </div>
                    <div>
                       <div className="text-[20px] font-semibold leading-none mb-1 text-brand">3.2x</div>
                       <div className="text-[12px] text-ink-soft">Productivity increase</div>
                    </div>
                    <Link href="/contact" className="ml-auto font-mono text-[13px] text-brand flex items-center gap-2 group-hover:gap-3 transition-all">Discuss a similar project <ArrowRight className="w-3.5 h-3.5" /></Link>
                 </div>
              </div>
           </div>

           {/* Project 2 */}
           <div className="flex flex-col md:flex-row gap-8 items-stretch pb-10 border-b border-line group">
              <div className="w-full md:w-[45%] lg:w-[40%] bg-grid-bg rounded border border-line overflow-hidden relative min-h-[260px]">
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
                    <div className="font-mono text-[10px] text-brand uppercase bg-brand/10 inline-block px-2 py-1 rounded mb-3">SaaS • AI Agents</div>
                    <h3 className="text-[24px] font-semibold mb-3 group-hover:text-brand transition-colors">Autonomous Support Agent for SaaS Platform</h3>
                    <p className="text-[15px] text-ink-soft mb-6">
                      Developed a context-aware AI support agent that integrates directly into the client's Zendesk and internal databases. The agent autonomously resolves Tier 1 and Tier 2 tickets, executes basic account actions via API, and seamlessly escalates complex issues to human agents with full context.
                    </p>
                    
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
                       <div className="text-[12px] text-ink-soft">Tickets automated</div>
                    </div>
                    <div>
                       <div className="text-[20px] font-semibold leading-none mb-1 text-brand">35%</div>
                       <div className="text-[12px] text-ink-soft">Faster response</div>
                    </div>
                    <Link href="/contact" className="ml-auto font-mono text-[13px] text-brand flex items-center gap-2 group-hover:gap-3 transition-all hidden sm:flex">Discuss a similar project <ArrowRight className="w-3.5 h-3.5" /></Link>
                 </div>
              </div>
           </div>

           {/* Project 3 */}
           <div className="flex flex-col md:flex-row gap-8 items-stretch group">
              <div className="w-full md:w-[45%] lg:w-[40%] bg-grid-bg rounded border border-line overflow-hidden relative min-h-[260px]">
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
                    <div className="font-mono text-[10px] text-brand uppercase bg-brand/10 inline-block px-2 py-1 rounded mb-3">Legal • Document Intelligence</div>
                    <h3 className="text-[24px] font-semibold mb-3 group-hover:text-brand transition-colors">Legal Document Intelligence & Extraction Platform</h3>
                    <p className="text-[15px] text-ink-soft mb-6">
                      Built a highly specialized RAG pipeline featuring advanced OCR (Optical Character Recognition) to automate contract analysis. The system ingested over 100K dense legal documents, extracting key clauses, liabilities, and risks into structured data formats for immediate review.
                    </p>
                    
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
                       <div className="text-[12px] text-ink-soft">Time saved</div>
                    </div>
                    <div>
                       <div className="text-[20px] font-semibold leading-none mb-1 text-brand">95%</div>
                       <div className="text-[12px] text-ink-soft">Accuracy rate</div>
                    </div>
                    <Link href="/contact" className="ml-auto font-mono text-[13px] text-brand flex items-center gap-2 group-hover:gap-3 transition-all hidden sm:flex">Discuss a similar project <ArrowRight className="w-3.5 h-3.5" /></Link>
                 </div>
              </div>
           </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-[80px] bg-white border-t border-line">
        <div className="wrap text-center max-w-[600px] mx-auto">
          <h2 className="text-[32px] font-semibold leading-[1.1] mb-4">Want to see similar results in your organization?</h2>
          <p className="text-[15px] text-ink-soft mb-8">Let's discuss how custom AI engineering can solve your specific business challenges.</p>
          <Link href="/contact" className="btn btn-primary bg-brand hover:bg-deep">Book a Discovery Call →</Link>
        </div>
      </section>
    </main>
  );
}
