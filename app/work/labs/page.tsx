import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Github, ExternalLink, Search, Code, LineChart, Box, Star, GitFork, Lightbulb, Zap, Target } from 'lucide-react';
import { SiPytorch, SiGooglecloud, SiFastapi, SiPostgresql, SiRedis, SiDocker, SiAmazon } from 'react-icons/si';

export const metadata: Metadata = {
  title: 'Open Source & AI Labs | Botmartz AI',
  description: 'Explore our open source projects and AI labs. We build and share enterprise RAG starters, LangGraph agent frameworks, and advanced AI boilerplates.',
};

export default function LabsPage() {
  return (
    <main className="bg-paper min-h-screen">
      
      {/* HERO SECTION (DARK) */}
      <section className="relative pt-[80px] pb-[80px] bg-ink text-white overflow-hidden blueprint" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.08) 1px, transparent 1px)' }}>
        <div className="wrap relative z-10 flex flex-col lg:flex-row items-center gap-12">
          
          <div className="flex-1 lg:max-w-[600px]">
            <div className="font-mono text-[11px] text-brand uppercase tracking-[0.12em] mb-4">BOTMARTZ LABS</div>
            <h1 className="text-[clamp(40px,5vw,60px)] leading-[1.05] font-semibold mb-6">
              Building Today.<br/><span className="text-[#9FB9C8]">Engineering</span> Tomorrow.
            </h1>
            <p className="text-[17px] text-[#9FB9C8] mb-8 max-w-[500px]">
              Our labs is where we experiment, build, and open source production-ready AI systems that solve real problems. Every project is built with a focus on performance, scalability, and real-world impact.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#projects" className="btn btn-primary bg-brand text-white hover:bg-deep flex items-center gap-2">Explore All Projects <ArrowRight className="w-4 h-4" /></Link>
              <a href="https://github.com/botmartz" target="_blank" rel="noopener noreferrer" className="btn border border-white/20 hover:border-white transition-colors text-[13px] px-6 py-2.5 rounded flex items-center gap-2">
                View on GitHub <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex-1 w-full h-[400px] relative hidden lg:flex items-center justify-center">
             {/* Abstract 3D Cube CSS Graphic */}
             <div className="relative w-[300px] h-[300px] flex items-center justify-center">
                {/* Glowing Base */}
                <div className="absolute bottom-0 w-[400px] h-[100px] bg-brand/20 blur-[60px] rounded-[100%]"></div>
                {/* Isometric Platform */}
                <div className="absolute bottom-10 w-[240px] h-[120px] border border-brand/40 bg-brand/10 transform rotate-x-[60deg] rotate-z-45"></div>
                <div className="absolute bottom-12 w-[200px] h-[100px] border border-brand/60 bg-brand/20 transform rotate-x-[60deg] rotate-z-45"></div>
                
                {/* The Cube */}
                <div className="absolute w-[120px] h-[120px] bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-brand/50 rounded-xl shadow-[0_0_50px_rgba(0,184,240,0.3)] flex items-center justify-center -translate-y-4 z-10 backdrop-blur-md">
                   <div className="text-center">
                      <div className="font-mono text-brand font-bold text-[18px] tracking-widest">LABS</div>
                      <div className="w-8 h-8 mx-auto mt-2 text-brand"><Code className="w-full h-full" /></div>
                   </div>
                </div>

                {/* Floating Badges */}
                <div className="absolute top-4 left-0 bg-ink border border-white/10 px-4 py-2 rounded-full font-mono text-[10px] text-white flex items-center gap-2 z-20 shadow-xl">
                   <span className="w-1.5 h-1.5 rounded-full bg-brand"></span> Experiment
                </div>
                <div className="absolute top-12 right-0 bg-ink border border-white/10 px-4 py-2 rounded-full font-mono text-[10px] text-white flex items-center gap-2 z-20 shadow-xl">
                   <span className="w-1.5 h-1.5 rounded-full bg-brand"></span> Evaluate
                </div>
                <div className="absolute bottom-24 left-4 bg-ink border border-white/10 px-4 py-2 rounded-full font-mono text-[10px] text-white flex items-center gap-2 z-20 shadow-xl">
                   <span className="w-1.5 h-1.5 rounded-full bg-brand"></span> Engineer
                </div>
                <div className="absolute bottom-32 right-[-20px] bg-ink border border-white/10 px-4 py-2 rounded-full font-mono text-[10px] text-white flex items-center gap-2 z-20 shadow-xl">
                   <span className="w-1.5 h-1.5 rounded-full bg-brand"></span> Open Source
                </div>
                <div className="absolute bottom-10 right-4 bg-ink border border-white/10 px-4 py-2 rounded-full font-mono text-[10px] text-white flex items-center gap-2 z-20 shadow-xl">
                   <span className="w-1.5 h-1.5 rounded-full bg-brand"></span> Impact
                </div>

                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                   <line x1="150" y1="150" x2="60" y2="40" stroke="rgba(0,184,240,0.3)" strokeWidth="1" strokeDasharray="4 4" />
                   <line x1="150" y1="150" x2="250" y2="80" stroke="rgba(0,184,240,0.3)" strokeWidth="1" strokeDasharray="4 4" />
                   <line x1="150" y1="150" x2="80" y2="200" stroke="rgba(0,184,240,0.3)" strokeWidth="1" strokeDasharray="4 4" />
                   <line x1="150" y1="150" x2="260" y2="260" stroke="rgba(0,184,240,0.3)" strokeWidth="1" strokeDasharray="4 4" />
                </svg>
             </div>
          </div>

        </div>
      </section>

      {/* FILTER BAR */}
      <section className="py-6 border-b border-line bg-white sticky top-[60px] z-40" id="projects">
         <div className="wrap flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 hide-scrollbar w-full md:w-auto">
               <button className="whitespace-nowrap px-4 py-1.5 bg-brand text-white text-[13px] font-semibold rounded-sm">All Labs</button>
               <button className="whitespace-nowrap px-4 py-1.5 border border-line text-ink-soft hover:border-brand hover:text-brand text-[13px] font-semibold rounded-sm transition-colors">Enterprise RAG</button>
               <button className="whitespace-nowrap px-4 py-1.5 border border-line text-ink-soft hover:border-brand hover:text-brand text-[13px] font-semibold rounded-sm transition-colors">AI Agents</button>
               <button className="whitespace-nowrap px-4 py-1.5 border border-line text-ink-soft hover:border-brand hover:text-brand text-[13px] font-semibold rounded-sm transition-colors">Computer Vision</button>
               <button className="whitespace-nowrap px-4 py-1.5 border border-line text-ink-soft hover:border-brand hover:text-brand text-[13px] font-semibold rounded-sm transition-colors">Developer Tools</button>
               <button className="whitespace-nowrap px-4 py-1.5 border border-line text-ink-soft hover:border-brand hover:text-brand text-[13px] font-semibold rounded-sm transition-colors">Infrastructure</button>
            </div>
            <div className="flex items-center gap-2 border border-line px-3 py-1.5 rounded-sm shrink-0 w-full md:w-auto cursor-pointer hover:border-brand transition-colors">
               <span className="text-[13px] text-ink-soft">Sort by:</span>
               <span className="text-[13px] font-semibold text-ink flex items-center gap-1">Latest <ArrowRight className="w-3 h-3 rotate-90" /></span>
            </div>
         </div>
      </section>

      {/* LABS GRID */}
      <section className="py-[60px]">
        <div className="wrap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           
           {/* Card 1 */}
           <div className="bg-white border border-line rounded-md overflow-hidden hover:border-brand hover:shadow-lg transition-all group flex flex-col">
              <div className="h-[180px] bg-ink relative overflow-hidden flex items-center justify-center p-4 blueprint">
                 <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent"></div>
                 {/* Abstract UI Representation */}
                 <div className="w-full h-full border border-white/20 rounded bg-white/5 flex gap-2 p-2">
                    <div className="w-1/4 h-full border border-white/10 rounded-sm"></div>
                    <div className="flex-1 h-full flex flex-col gap-2">
                       <div className="h-1/3 border border-brand/40 bg-brand/10 rounded-sm"></div>
                       <div className="flex-1 border border-white/10 rounded-sm"></div>
                    </div>
                 </div>
                 <div className="absolute top-3 right-3 bg-emerald-500 text-white font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow-sm">New</div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                 <div className="font-mono text-[10px] text-brand uppercase tracking-wider mb-2 font-semibold">ENTERPRISE RAG</div>
                 <h3 className="text-[20px] font-semibold mb-2 group-hover:text-brand transition-colors">Enterprise RAG Starter</h3>
                 <p className="text-[14px] text-ink-soft mb-5 flex-1 leading-relaxed">
                   A production-ready RAG platform built with hybrid search, reranking, and advanced evaluation.
                 </p>
                 <div className="flex flex-wrap gap-2 mb-6">
                    {['LangChain', 'FastAPI', 'Qdrant', 'Docker'].map(t => (
                      <span key={t} className="font-mono text-[10px] text-ink-soft border border-line px-2 py-0.5 rounded-sm">{t}</span>
                    ))}
                 </div>
                 <div className="flex items-center justify-between border-t border-line pt-4 text-[12px] text-ink-soft font-medium">
                    <a href="https://github.com/botmartz" className="flex items-center gap-1.5 hover:text-brand transition-colors"><Github className="w-4 h-4"/> GitHub <ArrowRight className="w-3 h-3 -rotate-45"/></a>
                    <div className="flex items-center gap-4">
                       <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400" /> 1.8k</span>
                       <span className="flex items-center gap-1"><GitFork className="w-4 h-4" /> 320</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Card 2 */}
           <div className="bg-white border border-line rounded-md overflow-hidden hover:border-brand hover:shadow-lg transition-all group flex flex-col">
              <div className="h-[180px] bg-ink relative overflow-hidden flex items-center justify-center p-4 blueprint">
                 <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent"></div>
                 {/* Abstract UI Representation */}
                 <div className="w-full h-full relative">
                    <div className="absolute top-1/2 left-4 w-6 h-6 border border-brand/50 rounded-full flex items-center justify-center -translate-y-1/2 bg-brand/10 text-brand"><Code className="w-3 h-3"/></div>
                    <div className="absolute top-1/4 left-1/2 w-8 h-8 border border-white/50 rounded flex items-center justify-center -translate-x-1/2 bg-white/10"><Box className="w-4 h-4 text-white"/></div>
                    <div className="absolute bottom-1/4 left-1/2 w-8 h-8 border border-white/50 rounded flex items-center justify-center -translate-x-1/2 bg-white/10"><Box className="w-4 h-4 text-white"/></div>
                    <div className="absolute top-1/2 right-4 w-6 h-6 border border-brand/50 rounded-full flex items-center justify-center -translate-y-1/2 bg-brand/10 text-brand"><LineChart className="w-3 h-3"/></div>
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                       <path d="M40 90 L150 45" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 4" fill="none"/>
                       <path d="M40 90 L150 135" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 4" fill="none"/>
                       <path d="M150 45 L260 90" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 4" fill="none"/>
                       <path d="M150 135 L260 90" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 4" fill="none"/>
                    </svg>
                 </div>
                 <div className="absolute top-3 right-3 bg-emerald-500 text-white font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow-sm">New</div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                 <div className="font-mono text-[10px] text-brand uppercase tracking-wider mb-2 font-semibold">AI AGENTS</div>
                 <h3 className="text-[20px] font-semibold mb-2 group-hover:text-brand transition-colors">LangGraph Agent Framework</h3>
                 <p className="text-[14px] text-ink-soft mb-5 flex-1 leading-relaxed">
                   A modular multi-agent framework built with LangGraph for complex reasoning and tool orchestration.
                 </p>
                 <div className="flex flex-wrap gap-2 mb-6">
                    {['LangGraph', 'Python', 'Redis', 'Docker'].map(t => (
                      <span key={t} className="font-mono text-[10px] text-ink-soft border border-line px-2 py-0.5 rounded-sm">{t}</span>
                    ))}
                 </div>
                 <div className="flex items-center justify-between border-t border-line pt-4 text-[12px] text-ink-soft font-medium">
                    <a href="https://github.com/botmartz" className="flex items-center gap-1.5 hover:text-brand transition-colors"><Github className="w-4 h-4"/> GitHub <ArrowRight className="w-3 h-3 -rotate-45"/></a>
                    <div className="flex items-center gap-4">
                       <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400" /> 2.3k</span>
                       <span className="flex items-center gap-1"><GitFork className="w-4 h-4" /> 410</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Card 3 */}
           <div className="bg-white border border-line rounded-md overflow-hidden hover:border-brand hover:shadow-lg transition-all group flex flex-col">
              <div className="h-[180px] bg-ink relative overflow-hidden flex items-center justify-center p-4 blueprint">
                 <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent"></div>
                 {/* Abstract UI Representation */}
                 <div className="flex gap-4">
                    <div className="w-12 h-20 border border-white/20 rounded bg-white/5 flex flex-col items-center p-1"><div className="w-6 h-6 rounded-full border border-white/30 mb-2"></div><div className="flex-1 w-full border border-white/30 rounded-sm"></div></div>
                    <ArrowRight className="w-4 h-4 text-brand self-center" />
                    <div className="w-12 h-20 border border-brand/50 rounded bg-brand/10 flex flex-col items-center p-1"><div className="w-6 h-6 rounded-full border border-brand mb-2"></div><div className="flex-1 w-full border border-brand bg-brand/20 rounded-sm"></div></div>
                 </div>
                 <div className="absolute top-3 right-3 bg-emerald-500 text-white font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow-sm">New</div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                 <div className="font-mono text-[10px] text-brand uppercase tracking-wider mb-2 font-semibold">COMPUTER VISION</div>
                 <h3 className="text-[20px] font-semibold mb-2 group-hover:text-brand transition-colors">Virtual Try-On Lab</h3>
                 <p className="text-[14px] text-ink-soft mb-5 flex-1 leading-relaxed">
                   Realistic virtual try-on system using diffusion models and garment warping techniques.
                 </p>
                 <div className="flex flex-wrap gap-2 mb-6">
                    {['PyTorch', 'Diffusers', 'ONNX', 'Gradio'].map(t => (
                      <span key={t} className="font-mono text-[10px] text-ink-soft border border-line px-2 py-0.5 rounded-sm">{t}</span>
                    ))}
                 </div>
                 <div className="flex items-center justify-between border-t border-line pt-4 text-[12px] text-ink-soft font-medium">
                    <div className="flex items-center gap-4">
                       <a href="https://github.com/botmartz" className="flex items-center gap-1.5 hover:text-brand transition-colors"><Github className="w-4 h-4"/> GitHub</a>
                       <a href="#" className="flex items-center gap-1.5 hover:text-brand text-brand transition-colors">Demo <ArrowRight className="w-3 h-3"/></a>
                    </div>
                 </div>
              </div>
           </div>
           
           {/* Card 4 */}
           <div className="bg-white border border-line rounded-md overflow-hidden hover:border-brand hover:shadow-lg transition-all group flex flex-col">
              <div className="h-[180px] bg-ink relative overflow-hidden flex items-center justify-center p-4 blueprint">
                 <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent"></div>
                 <div className="w-[200px] h-full border border-white/20 rounded bg-white/5 flex flex-col p-2">
                    <div className="h-4 border-b border-white/10 w-full mb-2"></div>
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-sm"></div>
                 </div>
                 <div className="absolute top-3 right-3 bg-emerald-500 text-white font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow-sm">New</div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                 <div className="font-mono text-[10px] text-brand uppercase tracking-wider mb-2 font-semibold">AI AGENTS</div>
                 <h3 className="text-[20px] font-semibold mb-2 group-hover:text-brand transition-colors">AI Research Agent</h3>
                 <p className="text-[14px] text-ink-soft mb-5 flex-1 leading-relaxed">
                   Autonomous research agent that searches, reads, analyzes, and generates comprehensive reports.
                 </p>
                 <div className="flex flex-wrap gap-2 mb-6">
                    {['LangChain', 'OpenAI', 'Tavily', 'Pydantic'].map(t => (
                      <span key={t} className="font-mono text-[10px] text-ink-soft border border-line px-2 py-0.5 rounded-sm">{t}</span>
                    ))}
                 </div>
                 <div className="flex items-center justify-between border-t border-line pt-4 text-[12px] text-ink-soft font-medium">
                    <a href="https://github.com/botmartz" className="flex items-center gap-1.5 hover:text-brand transition-colors"><Github className="w-4 h-4"/> GitHub <ArrowRight className="w-3 h-3 -rotate-45"/></a>
                    <div className="flex items-center gap-4">
                       <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400" /> 1.4k</span>
                       <span className="flex items-center gap-1"><GitFork className="w-4 h-4" /> 280</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Card 5 */}
           <div className="bg-white border border-line rounded-md overflow-hidden hover:border-brand hover:shadow-lg transition-all group flex flex-col">
              <div className="h-[180px] bg-ink relative overflow-hidden flex items-center justify-center p-4 blueprint">
                 <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent"></div>
                 <div className="w-[180px] h-full border border-white/20 rounded bg-white/5 flex flex-col items-center justify-center gap-2 p-2">
                    <div className="w-10 h-10 border border-brand/50 rounded-full flex items-center justify-center text-brand"><Search className="w-5 h-5"/></div>
                    <div className="w-3/4 h-2 bg-brand/30 rounded-sm"></div>
                 </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                 <div className="font-mono text-[10px] text-brand uppercase tracking-wider mb-2 font-semibold">AI AGENTS</div>
                 <h3 className="text-[20px] font-semibold mb-2 group-hover:text-brand transition-colors">AI Course Assistant</h3>
                 <p className="text-[14px] text-ink-soft mb-5 flex-1 leading-relaxed">
                   Intelligent assistant for courses that answers doubts, generates quizzes, and tracks progress.
                 </p>
                 <div className="flex flex-wrap gap-2 mb-6">
                    {['FastAPI', 'OpenAI', 'Chroma', 'Docker'].map(t => (
                      <span key={t} className="font-mono text-[10px] text-ink-soft border border-line px-2 py-0.5 rounded-sm">{t}</span>
                    ))}
                 </div>
                 <div className="flex items-center justify-between border-t border-line pt-4 text-[12px] text-ink-soft font-medium">
                    <a href="https://github.com/botmartz" className="flex items-center gap-1.5 hover:text-brand transition-colors"><Github className="w-4 h-4"/> GitHub <ArrowRight className="w-3 h-3 -rotate-45"/></a>
                    <div className="flex items-center gap-4">
                       <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400" /> 980</span>
                       <span className="flex items-center gap-1"><GitFork className="w-4 h-4" /> 180</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Card 6 */}
           <div className="bg-white border border-line rounded-md overflow-hidden hover:border-brand hover:shadow-lg transition-all group flex flex-col">
              <div className="h-[180px] bg-ink relative overflow-hidden flex items-center justify-center p-4 blueprint">
                 <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent"></div>
                 <div className="w-[200px] h-full flex items-center justify-center gap-4">
                    <div className="w-20 h-full border border-white/20 rounded bg-white/5 flex flex-col p-2 gap-2"><div className="h-4 bg-white/10 rounded-sm w-full"></div><div className="h-4 bg-white/10 rounded-sm w-3/4"></div></div>
                    <div className="w-20 h-full border border-brand/50 rounded bg-brand/10 flex flex-col p-2 gap-2"><div className="h-4 bg-brand/30 rounded-sm w-full"></div><div className="h-4 bg-brand/30 rounded-sm w-3/4"></div></div>
                 </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                 <div className="font-mono text-[10px] text-brand uppercase tracking-wider mb-2 font-semibold">ENTERPRISE RAG</div>
                 <h3 className="text-[20px] font-semibold mb-2 group-hover:text-brand transition-colors">Legal Assistant</h3>
                 <p className="text-[14px] text-ink-soft mb-5 flex-1 leading-relaxed">
                   RAG-powered legal assistant for contract review, clause extraction, and risk analysis.
                 </p>
                 <div className="flex flex-wrap gap-2 mb-6">
                    {['LangChain', 'LlamaIndex', 'Qdrant', 'AWS'].map(t => (
                      <span key={t} className="font-mono text-[10px] text-ink-soft border border-line px-2 py-0.5 rounded-sm">{t}</span>
                    ))}
                 </div>
                 <div className="flex items-center justify-between border-t border-line pt-4 text-[12px] text-ink-soft font-medium">
                    <a href="https://github.com/botmartz" className="flex items-center gap-1.5 hover:text-brand transition-colors"><Github className="w-4 h-4"/> GitHub <ArrowRight className="w-3 h-3 -rotate-45"/></a>
                    <div className="flex items-center gap-4">
                       <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400" /> 1.3k</span>
                       <span className="flex items-center gap-1"><GitFork className="w-4 h-4" /> 260</span>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </section>

      {/* WHY OUR LABS MATTER (DARK) */}
      <section className="bg-ink text-white py-[80px] my-10 mx-auto max-w-[1400px] rounded-xl blueprint relative overflow-hidden" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.08) 1px, transparent 1px)' }}>
         <div className="absolute inset-0 bg-gradient-to-r from-ink via-transparent to-ink z-0"></div>
         <div className="wrap relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            
            <div className="lg:w-1/3">
               <div className="font-mono text-[11px] text-brand uppercase tracking-[0.12em] mb-4 font-semibold">WHY OUR LABS MATTER</div>
               <h2 className="text-[clamp(28px,4vw,36px)] leading-[1.1] font-semibold mb-4">
                 From Experiment to <span className="text-[#9FB9C8]">Enterprise.</span>
               </h2>
               <p className="text-[15px] text-[#9FB9C8] leading-relaxed">
                 Our labs follow a rigorous engineering approach to turn innovative ideas into reliable, open-source solutions.
               </p>
            </div>

            <div className="lg:w-2/3 w-full relative">
               {/* Connecting Dashed Line */}
               <div className="absolute top-8 left-10 right-10 h-px border-t border-dashed border-brand/30 hidden md:block z-0"></div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center relative z-10">
                     <div className="w-16 h-16 rounded-full border border-brand/50 bg-ink flex items-center justify-center text-brand mb-4 shadow-[0_0_20px_rgba(0,184,240,0.2)]"><Search className="w-6 h-6" /></div>
                     <h4 className="font-semibold text-[15px] mb-2">Identify Real Problems</h4>
                     <p className="text-[13px] text-[#9FB9C8] leading-relaxed">We explore real-world challenges faced by businesses and developers.</p>
                  </div>
                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center relative z-10">
                     <div className="w-16 h-16 rounded-full border border-white/20 bg-ink flex items-center justify-center text-white mb-4"><Code className="w-6 h-6" /></div>
                     <h4 className="font-semibold text-[15px] mb-2">Build & Experiment</h4>
                     <p className="text-[13px] text-[#9FB9C8] leading-relaxed">Rapid prototyping with the latest models, frameworks, and infrastructure.</p>
                  </div>
                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center relative z-10">
                     <div className="w-16 h-16 rounded-full border border-white/20 bg-ink flex items-center justify-center text-white mb-4"><LineChart className="w-6 h-6" /></div>
                     <h4 className="font-semibold text-[15px] mb-2">Evaluate & Refine</h4>
                     <p className="text-[13px] text-[#9FB9C8] leading-relaxed">Rigorous testing, benchmarking, and iterative improvements for production readiness.</p>
                  </div>
                  {/* Step 4 */}
                  <div className="flex flex-col items-center text-center relative z-10">
                     <div className="w-16 h-16 rounded-full border border-white/20 bg-ink flex items-center justify-center text-white mb-4"><Box className="w-6 h-6" /></div>
                     <h4 className="font-semibold text-[15px] mb-2">Open Source & Share</h4>
                     <p className="text-[13px] text-[#9FB9C8] leading-relaxed">We open source our best work to give back to the AI engineering community.</p>
                  </div>
               </div>
            </div>

         </div>
      </section>

      {/* TECH STACK SECTION */}
      <section className="py-[60px] bg-white border-b border-line text-center">
         <div className="font-mono text-[11px] text-brand uppercase tracking-[0.12em] mb-10 font-semibold">BUILT WITH MODERN AI ENGINEERING STACK</div>
         <div className="wrap flex flex-wrap justify-center items-center gap-x-12 gap-y-8 text-ink-soft grayscale opacity-70">
            <div className="flex items-center gap-2 font-semibold text-[16px]"><SiPytorch className="w-6 h-6"/> PyTorch</div>
            <div className="flex items-center gap-2 font-semibold text-[16px]">🦜🔗 LangChain</div>
            <div className="flex items-center gap-2 font-semibold text-[16px]">🦜🕸️ LangGraph</div>
            <div className="flex items-center gap-2 font-semibold text-[16px]"><SiGooglecloud className="w-6 h-6"/> Google ADK</div>
            <div className="flex items-center gap-2 font-semibold text-[16px]"><SiFastapi className="w-6 h-6"/> FastAPI</div>
            <div className="flex items-center gap-2 font-semibold text-[16px]"><SiPostgresql className="w-6 h-6"/> PostgreSQL</div>
            <div className="flex items-center gap-2 font-semibold text-[16px]"><SiRedis className="w-6 h-6"/> Redis</div>
            <div className="flex items-center gap-2 font-semibold text-[16px]"><SiDocker className="w-6 h-6"/> Docker</div>
            <div className="flex items-center gap-2 font-semibold text-[16px]"><SiAmazon className="w-6 h-6"/> AWS</div>
         </div>
      </section>

      {/* OPEN SOURCE BANNER */}
      <section className="py-[60px] bg-paper">
         <div className="wrap max-w-[1000px] mx-auto bg-white border border-line rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-sm">
            <div className="w-24 h-24 rounded-full bg-[#f6f8fa] flex items-center justify-center shrink-0">
               <Github className="w-12 h-12 text-brand" />
            </div>
            <div className="flex-1 text-center md:text-left">
               <h2 className="text-[28px] font-semibold mb-3">Open Source is in Our DNA.</h2>
               <p className="text-[15px] text-ink-soft mb-0">We believe sharing knowledge and code accelerates innovation for everyone. Explore our GitHub organization to see all our open-source projects.</p>
            </div>
            <div className="shrink-0 mt-4 md:mt-0">
               <a href="https://github.com/botmartz" className="btn border border-line hover:border-brand text-ink transition-colors px-6 py-2.5 rounded flex items-center gap-2 text-[14px] font-medium">View on GitHub <ArrowRight className="w-4 h-4"/></a>
            </div>
         </div>
      </section>

      {/* FOOTER CTA BANNER */}
      <section className="bg-[#040C18] text-white py-[60px] mt-10 relative overflow-hidden border-t border-brand/20">
         <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-transparent"></div>
         <div className="wrap relative z-10 flex flex-col md:flex-row items-center gap-12 justify-between">
            <div className="md:w-1/3 text-center md:text-left">
               <h2 className="text-[32px] font-semibold leading-[1.1] mb-4">
                 Have an <span className="text-brand">Idea</span> Worth Building?
               </h2>
               <p className="text-[14px] text-[#9FB9C8]">
                 Let's build the next lab together. We collaborate with founders, researchers, and engineers to build impactful AI systems.
               </p>
            </div>
            <div className="md:w-2/3 w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
               <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="w-12 h-12 rounded bg-brand/10 border border-brand/30 flex items-center justify-center text-brand mb-4"><Lightbulb className="w-5 h-5"/></div>
                  <h4 className="font-semibold text-[15px] mb-2">Collaborate</h4>
                  <p className="text-[13px] text-[#9FB9C8]">Partner with our engineering team and build together.</p>
               </div>
               <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="w-12 h-12 rounded bg-brand/10 border border-brand/30 flex items-center justify-center text-brand mb-4"><Zap className="w-5 h-5"/></div>
                  <h4 className="font-semibold text-[15px] mb-2">Accelerate</h4>
                  <p className="text-[13px] text-[#9FB9C8]">Leverage our expertise to ship faster and smarter.</p>
               </div>
               <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="w-12 h-12 rounded bg-brand/10 border border-brand/30 flex items-center justify-center text-brand mb-4"><Target className="w-5 h-5"/></div>
                  <h4 className="font-semibold text-[15px] mb-2">Make Impact</h4>
                  <p className="text-[13px] text-[#9FB9C8]">Solve real problems and create meaningful change.</p>
               </div>
               <div className="sm:col-span-3 mt-4 flex justify-center sm:justify-start">
                  <Link href="/contact" className="btn btn-primary bg-brand text-white hover:bg-deep flex items-center gap-2 px-8 py-3 w-full sm:w-auto">Start a Conversation <ArrowRight className="w-4 h-4"/></Link>
               </div>
            </div>
         </div>
      </section>

    </main>
  );
}
