import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ExternalLink, Search, ChevronLeft, ChevronRight, Layout, Database, Network, Server, ShieldCheck, Code2, Users, Bot, Layers, ArrowRightCircle, Github } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Engineering Insights | Botmartz AI',
  description: 'Deep dives, technical tutorials, architecture breakdowns, and real-world lessons from building production AI systems.',
};

const ARTICLES = [
  {
    id: 1,
    title: "Building a Scalable Enterprise RAG System: Architecture, Components & Best Practices",
    category: "ENTERPRISE RAG",
    description: "A complete blueprint for building production-ready RAG systems that are secure, accurate, and scalable for enterprise workloads.",
    author: "Botmartz Engineering Team",
    date: "May 12, 2024",
    readTime: "12 min read",
    featured: true,
    icon: Network
  },
  {
    id: 2,
    title: "Inside AI Agents: From Reasoning to Real-World Action",
    category: "AI AGENTS",
    description: "Explore the core components of AI agents, including planning, tool calling, memory, and evaluation.",
    author: "Sagar S.",
    date: "May 8, 2024",
    readTime: "9 min read",
    featured: false,
    icon: Bot
  },
  {
    id: 3,
    title: "Microservices vs Monolith for AI Systems: What We Learned",
    category: "ARCHITECTURE",
    description: "A practical comparison based on real production deployments and scalability requirements.",
    author: "Pranav P.",
    date: "May 5, 2024",
    readTime: "7 min read",
    featured: false,
    icon: Layers
  },
  {
    id: 4,
    title: "Observability for LLM Applications: Metrics That Matter",
    category: "MLOPS",
    description: "Key metrics, dashboards and alerts to monitor LLM apps in production and ensure reliability.",
    author: "Harish D.",
    date: "Apr 28, 2024",
    readTime: "8 min read",
    featured: false,
    icon: Layout
  },
  {
    id: 5,
    title: "Advanced RAG Techniques: Hybrid Search, Reranking & Query Rewriting",
    category: "ENTERPRISE RAG",
    description: "Improve retrieval quality and accuracy with hybrid search, rerankers, and LLM-based query rewriting.",
    author: "Botmartz Engineering Team",
    date: "Apr 21, 2024",
    readTime: "10 min read",
    featured: false,
    icon: Search
  },
  {
    id: 6,
    title: "Build an AI Chatbot with LangGraph and OpenAI (Step-by-Step)",
    category: "TUTORIAL",
    description: "A hands-on tutorial to build a production-ready agent using LangGraph, FastAPI and OpenAI.",
    author: "Rohit R.",
    date: "Apr 15, 2024",
    readTime: "15 min read",
    featured: false,
    icon: Code2
  },
  {
    id: 7,
    title: "Open Source Projects from Botmartz Labs You Should Know",
    category: "OPEN SOURCE",
    description: "Explore our open source projects that power real-world AI systems and developer productivity.",
    author: "Botmartz Labs",
    date: "Apr 10, 2024",
    readTime: "6 min read",
    featured: false,
    icon: Server
  }
];

export default function InsightsPage() {
  const featuredArticle = ARTICLES.find(a => a.featured);
  const regularArticles = ARTICLES.filter(a => !a.featured);

  return (
    <main className="bg-paper min-h-screen">
      
      {/* HERO SECTION (DARK) */}
      <section className="relative pt-[80px] pb-[80px] bg-ink text-white overflow-hidden blueprint" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.08) 1px, transparent 1px)' }}>
        <div className="wrap relative z-10 flex flex-col lg:flex-row items-center gap-12">
          
          <div className="flex-1 lg:max-w-[600px]">
            <div className="font-mono text-[11px] text-brand uppercase tracking-[0.12em] mb-4">ENGINEERING INSIGHTS</div>
            <h1 className="text-[clamp(40px,5vw,60px)] leading-[1.05] font-semibold mb-6">
              Ideas. Architecture.<br/>Insights that <span className="text-[#9FB9C8]">Build the Future.</span>
            </h1>
            <p className="text-[17px] text-[#9FB9C8] mb-8 max-w-[500px]">
              Deep dives, technical tutorials, architecture breakdowns, and real-world lessons from building production AI systems.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#articles" className="btn btn-primary bg-brand text-white hover:bg-deep flex items-center gap-2">Explore All Articles <ArrowRight className="w-4 h-4" /></Link>
              <a href="#" className="btn border border-white/20 hover:border-white transition-colors text-[13px] px-6 py-2.5 rounded flex items-center gap-2">
                Subscribe to Newsletter <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex-1 w-full h-[400px] relative hidden lg:flex items-center justify-center">
             {/* Abstract UI Graphic */}
             <div className="relative w-full max-w-[450px] h-[350px] flex items-center justify-center">
                {/* Glowing Base */}
                <div className="absolute bottom-[-20px] w-full h-[150px] bg-brand/20 blur-[60px] rounded-[100%] z-0"></div>
                
                {/* Central Document/Screen */}
                <div className="relative w-[220px] h-[300px] bg-gradient-to-b from-[#0f172a] to-[#050505] border border-brand/50 rounded-lg shadow-[0_0_40px_rgba(0,184,240,0.2)] flex flex-col items-center justify-start pt-8 pb-4 px-4 z-10 overflow-hidden transform perspective-1000 rotate-y-[-10deg]">
                   <div className="absolute top-0 left-0 w-full h-1 bg-brand"></div>
                   <div className="w-full h-[2px] bg-brand/30 mb-2"></div>
                   <div className="w-3/4 h-[2px] bg-brand/30 mb-8 self-start"></div>
                   
                   {/* Abstract diagram inside screen */}
                   <div className="w-full flex-1 border border-brand/20 rounded bg-brand/5 flex flex-col p-3 gap-3">
                      <div className="flex items-center gap-2">
                         <div className="w-6 h-6 rounded bg-brand/20"></div>
                         <div className="flex-1 h-2 bg-brand/30 rounded-sm"></div>
                      </div>
                      <div className="w-full h-px bg-brand/10"></div>
                      <div className="flex items-center gap-2">
                         <div className="w-6 h-6 rounded bg-brand/20"></div>
                         <div className="flex-1 h-2 bg-brand/30 rounded-sm"></div>
                      </div>
                   </div>
                </div>

                {/* Floating Tags (Left) */}
                <div className="absolute left-[-20px] top-[10%] flex flex-col gap-8 z-20">
                   <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full border border-white/20 bg-ink flex items-center justify-center text-white"><Search className="w-4 h-4"/></div>
                      <span className="font-mono text-[9px] text-white">Research</span>
                   </div>
                   <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full border border-white/20 bg-ink flex items-center justify-center text-white"><Code2 className="w-4 h-4"/></div>
                      <span className="font-mono text-[9px] text-white">Engineering</span>
                   </div>
                   <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full border border-white/20 bg-ink flex items-center justify-center text-white"><Layers className="w-4 h-4"/></div>
                      <span className="font-mono text-[9px] text-white">Architecture</span>
                   </div>
                </div>

                {/* Floating Tags (Right) */}
                <div className="absolute right-[-20px] top-[10%] flex flex-col gap-8 z-20">
                   <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full border border-white/20 bg-ink flex items-center justify-center text-white"><Network className="w-4 h-4"/></div>
                      <span className="font-mono text-[9px] text-white">AI Systems</span>
                   </div>
                   <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full border border-white/20 bg-ink flex items-center justify-center text-white"><ShieldCheck className="w-4 h-4"/></div>
                      <span className="font-mono text-[9px] text-white">Best Practices</span>
                   </div>
                   <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full border border-white/20 bg-ink flex items-center justify-center text-white"><Github className="w-4 h-4"/></div>
                      <span className="font-mono text-[9px] text-white">Open Source</span>
                   </div>
                </div>
                
                {/* Connecting lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                   <path d="M 60 80 C 120 80, 150 120, 180 150" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
                   <path d="M 60 175 C 120 175, 150 175, 180 175" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
                   <path d="M 60 270 C 120 270, 150 230, 180 200" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
                   
                   <path d="M 390 80 C 330 80, 300 120, 270 150" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
                   <path d="M 390 175 C 330 175, 300 175, 270 175" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
                   <path d="M 390 270 C 330 270, 300 230, 270 200" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
                </svg>
             </div>
          </div>

        </div>
      </section>

      {/* FILTER BAR */}
      <section className="py-6 border-b border-line bg-white sticky top-[60px] z-40" id="articles">
         <div className="wrap flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex overflow-x-auto gap-2 pb-2 lg:pb-0 hide-scrollbar w-full lg:w-auto">
               <button className="whitespace-nowrap px-4 py-1.5 bg-brand text-white text-[13px] font-semibold rounded-sm">All Articles</button>
               <button className="whitespace-nowrap px-4 py-1.5 border border-line text-ink-soft hover:border-brand hover:text-brand text-[13px] font-semibold rounded-sm transition-colors">AI Engineering</button>
               <button className="whitespace-nowrap px-4 py-1.5 border border-line text-ink-soft hover:border-brand hover:text-brand text-[13px] font-semibold rounded-sm transition-colors">Enterprise RAG</button>
               <button className="whitespace-nowrap px-4 py-1.5 border border-line text-ink-soft hover:border-brand hover:text-brand text-[13px] font-semibold rounded-sm transition-colors">AI Agents</button>
               <button className="whitespace-nowrap px-4 py-1.5 border border-line text-ink-soft hover:border-brand hover:text-brand text-[13px] font-semibold rounded-sm transition-colors">MLOps</button>
               <button className="whitespace-nowrap px-4 py-1.5 border border-line text-ink-soft hover:border-brand hover:text-brand text-[13px] font-semibold rounded-sm transition-colors">Architecture</button>
               <button className="whitespace-nowrap px-4 py-1.5 border border-line text-ink-soft hover:border-brand hover:text-brand text-[13px] font-semibold rounded-sm transition-colors">Tutorials</button>
               <button className="whitespace-nowrap px-4 py-1.5 border border-line text-ink-soft hover:border-brand hover:text-brand text-[13px] font-semibold rounded-sm transition-colors">Open Source</button>
               <button className="whitespace-nowrap px-4 py-1.5 border border-line text-ink-soft hover:border-brand hover:text-brand text-[13px] font-semibold rounded-sm transition-colors">Case Studies</button>
            </div>
            <div className="relative w-full lg:w-[250px] shrink-0">
               <input type="text" placeholder="Search articles..." className="w-full border border-line rounded-sm pl-10 pr-4 py-2 text-[13px] focus:outline-none focus:border-brand" />
               <Search className="w-4 h-4 text-ink-soft absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
         </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="py-[60px]">
        <div className="wrap flex flex-col lg:flex-row gap-12 items-start">
           
           {/* LEFT: ARTICLES FEED */}
           <div className="w-full lg:w-[70%] flex flex-col gap-10">
              
              {/* Featured Article */}
              {featuredArticle && (
                <div className="flex flex-col bg-white border border-line rounded-md overflow-hidden group cursor-pointer hover:border-brand transition-colors">
                   <div className="h-[260px] sm:h-[320px] bg-ink relative blueprint flex items-center justify-center p-6">
                      <div className="absolute top-4 left-4 bg-brand text-white font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm z-20">FEATURED</div>
                      
                      {/* Abstract RAG Diagram */}
                      <div className="flex flex-col gap-6 w-full max-w-[500px] z-10">
                         <div className="flex items-center justify-between">
                            <div className="flex flex-col items-center gap-2"><div className="w-14 h-14 border border-brand/50 rounded flex items-center justify-center text-brand bg-brand/10"><Layout className="w-6 h-6"/></div><span className="text-[10px] text-white font-mono">Document Sources</span></div>
                            <ArrowRight className="w-4 h-4 text-brand/50" />
                            <div className="flex flex-col items-center gap-2"><div className="w-14 h-14 border border-brand/50 rounded flex items-center justify-center text-brand bg-brand/10"><ArrowRightCircle className="w-6 h-6"/></div><span className="text-[10px] text-white font-mono">Ingestion</span></div>
                            <ArrowRight className="w-4 h-4 text-brand/50" />
                            <div className="flex flex-col items-center gap-2"><div className="w-14 h-14 border border-brand/50 rounded flex items-center justify-center text-brand bg-brand/10"><Network className="w-6 h-6"/></div><span className="text-[10px] text-white font-mono">Embedding</span></div>
                            <ArrowRight className="w-4 h-4 text-brand/50" />
                            <div className="flex flex-col items-center gap-2"><div className="w-14 h-14 border border-brand/50 rounded flex items-center justify-center text-brand bg-brand/10"><Database className="w-6 h-6"/></div><span className="text-[10px] text-white font-mono">Vector DB</span></div>
                         </div>
                         <div className="flex items-center justify-between">
                            <div className="flex flex-col items-center gap-2"><div className="w-14 h-14 border border-white/20 rounded flex items-center justify-center text-white"><Search className="w-6 h-6"/></div><span className="text-[10px] text-white font-mono">Retriever</span></div>
                            <ArrowRight className="w-4 h-4 text-brand/50" />
                            <div className="flex flex-col items-center gap-2"><div className="w-14 h-14 border border-white/20 rounded flex items-center justify-center text-white"><Layers className="w-6 h-6"/></div><span className="text-[10px] text-white font-mono">Reranker</span></div>
                            <ArrowRight className="w-4 h-4 text-brand/50" />
                            <div className="flex flex-col items-center gap-2"><div className="w-14 h-14 border border-white/20 rounded flex items-center justify-center text-white"><Bot className="w-6 h-6"/></div><span className="text-[10px] text-white font-mono">LLM</span></div>
                            <ArrowRight className="w-4 h-4 text-brand/50" />
                            <div className="flex flex-col items-center gap-2"><div className="w-14 h-14 border border-brand bg-brand text-white rounded flex items-center justify-center"><Layout className="w-6 h-6"/></div><span className="text-[10px] text-white font-mono">Answer</span></div>
                         </div>
                      </div>
                   </div>
                   
                   <div className="p-8 flex flex-col md:flex-row gap-8">
                      <div className="flex-1">
                         <div className="font-mono text-[10px] text-brand uppercase tracking-wider mb-2 font-semibold">{featuredArticle.category}</div>
                         <h3 className="text-[24px] font-semibold mb-3 group-hover:text-brand transition-colors leading-snug">{featuredArticle.title}</h3>
                         <p className="text-[15px] text-ink-soft leading-relaxed">{featuredArticle.description}</p>
                      </div>
                      <div className="md:w-[200px] flex md:flex-col items-center md:items-start gap-4 md:border-l border-line md:pl-6 shrink-0">
                         <div className="w-10 h-10 bg-ink rounded-full flex items-center justify-center text-white font-bold text-[14px]">B</div>
                         <div>
                            <div className="text-[14px] font-semibold text-ink">{featuredArticle.author}</div>
                            <div className="text-[12px] text-ink-soft mt-1">{featuredArticle.date}</div>
                            <div className="text-[12px] text-ink-soft">• {featuredArticle.readTime}</div>
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {/* Grid of Articles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {regularArticles.map((article) => {
                   const Icon = article.icon;
                   return (
                     <div key={article.id} className="bg-white border border-line rounded-md overflow-hidden group cursor-pointer hover:border-brand transition-colors flex flex-col">
                        <div className="h-[180px] bg-ink relative blueprint flex items-center justify-center">
                           <div className="w-16 h-16 rounded border border-white/20 flex items-center justify-center bg-white/5 text-white group-hover:text-brand transition-colors">
                              <Icon className="w-8 h-8" />
                           </div>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                           <div className="font-mono text-[10px] text-brand uppercase tracking-wider mb-2 font-semibold">{article.category}</div>
                           <h3 className="text-[18px] font-semibold mb-3 group-hover:text-brand transition-colors leading-snug">{article.title}</h3>
                           <p className="text-[14px] text-ink-soft leading-relaxed mb-6 flex-1">{article.description}</p>
                           
                           <div className="flex items-center gap-3 mt-auto pt-4 border-t border-line">
                              <div className="w-8 h-8 bg-ink rounded-full flex items-center justify-center text-white font-bold text-[12px] shrink-0">
                                 {article.author.charAt(0)}
                              </div>
                              <div className="flex-1">
                                 <div className="text-[13px] font-semibold text-ink">{article.author}</div>
                                 <div className="text-[11px] text-ink-soft">{article.date} • {article.readTime}</div>
                              </div>
                           </div>
                        </div>
                     </div>
                   );
                 })}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between border-t border-line pt-6 mt-4">
                 <button className="flex items-center gap-2 text-[13px] text-ink-soft hover:text-brand font-semibold transition-colors"><ChevronLeft className="w-4 h-4"/> Previous</button>
                 <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded bg-brand text-white flex items-center justify-center text-[13px] font-bold">1</button>
                    <button className="w-8 h-8 rounded text-ink-soft hover:bg-gray-100 flex items-center justify-center text-[13px] font-bold transition-colors">2</button>
                    <button className="w-8 h-8 rounded text-ink-soft hover:bg-gray-100 flex items-center justify-center text-[13px] font-bold transition-colors">3</button>
                    <button className="w-8 h-8 rounded text-ink-soft hover:bg-gray-100 flex items-center justify-center text-[13px] font-bold transition-colors hidden sm:flex">4</button>
                    <button className="w-8 h-8 rounded text-ink-soft hover:bg-gray-100 flex items-center justify-center text-[13px] font-bold transition-colors hidden sm:flex">5</button>
                    <span className="text-ink-soft px-1">...</span>
                    <button className="w-8 h-8 rounded text-ink-soft hover:bg-gray-100 flex items-center justify-center text-[13px] font-bold transition-colors">12</button>
                 </div>
                 <button className="flex items-center gap-2 text-[13px] text-ink-soft hover:text-brand font-semibold transition-colors">Next <ChevronRight className="w-4 h-4"/></button>
              </div>

           </div>

           {/* RIGHT: SIDEBAR */}
           <div className="w-full lg:w-[30%] flex flex-col gap-10">
              
              {/* Popular Articles */}
              <div>
                 <div className="font-mono text-[11px] text-brand uppercase tracking-wider font-semibold mb-6">POPULAR ARTICLES</div>
                 <div className="flex flex-col gap-4">
                    {[
                      { t: "Building a Scalable Enterprise RAG System", d: "May 12, 2024", i: Network },
                      { t: "Inside AI Agents: From Reasoning to Real-World Action", d: "May 8, 2024", i: Bot },
                      { t: "Observability for LLM Applications", d: "Apr 28, 2024", i: Layout },
                      { t: "Advanced RAG Techniques for Better Accuracy", d: "Apr 21, 2024", i: Search },
                      { t: "Prompt Engineering Patterns That Work", d: "Apr 3, 2024", i: Code2 },
                    ].map((art, i) => (
                      <div key={i} className="flex gap-4 group cursor-pointer">
                         <div className="w-[80px] h-[60px] bg-ink rounded blueprint shrink-0 flex items-center justify-center">
                            <art.i className="w-5 h-5 text-white group-hover:text-brand transition-colors" />
                         </div>
                         <div>
                            <h4 className="text-[13px] font-semibold text-ink group-hover:text-brand transition-colors leading-snug mb-1">{art.t}</h4>
                            <div className="text-[11px] text-ink-soft">{art.d}</div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Categories */}
              <div>
                 <div className="font-mono text-[11px] text-brand uppercase tracking-wider font-semibold mb-6">CATEGORIES</div>
                 <ul className="flex flex-col">
                    {[
                      { n: "AI Engineering", c: 24 },
                      { n: "Enterprise RAG", c: 18 },
                      { n: "AI Agents", c: 16 },
                      { n: "MLOps", c: 14 },
                      { n: "Architecture", c: 12 },
                      { n: "Tutorials", c: 20 },
                      { n: "Open Source", c: 15 },
                      { n: "Case Studies", c: 10 },
                    ].map((cat, i) => (
                      <li key={i} className="flex items-center justify-between py-3 border-b border-line last:border-0 cursor-pointer group">
                         <span className="text-[14px] text-ink-soft group-hover:text-brand transition-colors">{cat.n}</span>
                         <span className="text-[12px] font-mono text-ink-soft">{cat.c}</span>
                      </li>
                    ))}
                 </ul>
              </div>

              {/* Stay in the Loop */}
              <div className="bg-grid-bg border border-line rounded p-6 text-center">
                 <div className="font-mono text-[11px] text-brand uppercase tracking-wider font-semibold mb-3">STAY IN THE LOOP</div>
                 <p className="text-[13px] text-ink-soft mb-4 leading-relaxed">Get the latest engineering insights, tutorials, and updates from our labs.</p>
                 <input type="email" placeholder="Enter your email" className="w-full border border-line rounded-sm px-3 py-2 text-[13px] focus:outline-none focus:border-brand mb-3" />
                 <button className="w-full bg-brand text-white text-[13px] font-semibold py-2 rounded-sm hover:bg-deep transition-colors mb-3">Subscribe</button>
                 <div className="text-[10px] text-ink-soft italic">No spam. Unsubscribe anytime.</div>
              </div>

              {/* Resources */}
              <div>
                 <div className="font-mono text-[11px] text-brand uppercase tracking-wider font-semibold mb-4">RESOURCES</div>
                 <ul className="flex flex-col gap-3">
                    {[
                      { n: "Engineering Handbook", i: Layout },
                      { n: "System Design Patterns", i: Layers },
                      { n: "AI Engineering Roadmap", i: Network },
                      { n: "Open Source @ Botmartz", i: Github },
                      { n: "YouTube Channel", i: Search },
                    ].map((res, i) => (
                      <li key={i}>
                         <a href="#" className="flex items-center justify-between p-3 bg-white border border-line rounded hover:border-brand transition-colors group">
                            <span className="flex items-center gap-3 text-[13px] font-medium text-ink group-hover:text-brand transition-colors"><res.i className="w-4 h-4 text-ink-soft group-hover:text-brand" /> {res.n}</span>
                            <ArrowRight className="w-4 h-4 text-ink-soft group-hover:text-brand transition-colors" />
                         </a>
                      </li>
                    ))}
                 </ul>
              </div>

           </div>

        </div>
      </section>

    </main>
  );
}
