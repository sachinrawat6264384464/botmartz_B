import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ExternalLink, Search, ChevronLeft, ChevronRight, Layout, Database, Network, Server, ShieldCheck, Code2, Users, Bot, Layers, ArrowRightCircle, Github } from 'lucide-react';
import { adminDb } from '@/lib/firebase-admin';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Engineering Insights | Botmartz AI',
    description: 'Deep dives, technical tutorials, architecture breakdowns, and real-world lessons from building production AI systems.',
  };
  
  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("insights").get();
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
      url: 'https://botmartz.com/insights',
      type: 'website',
    },
  };
}

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

export default async function InsightsPage() {
  const featuredArticle = ARTICLES.find(a => a.featured);
  const regularArticles = ARTICLES.filter(a => !a.featured);

  let heroData = {
    badge: "ENGINEERING INSIGHTS",
    title: "Ideas. Architecture.<br/>Insights that <span className=\"text-[#00B8F0]\">Build the Future.</span>",
    subtitle: "Deep dives, technical tutorials, architecture breakdowns, and real-world lessons from building production AI systems."
  };

  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("insights").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      if (data?.hero) {
        heroData = { ...heroData, ...data.hero };
      }
    }
  } catch (e) {}

  return (
    <main className="bg-[#050B14] min-h-screen text-white">
      
      {/* HERO SECTION (DARK) */}
      <section className="relative pt-[120px] pb-[80px] bg-[#050B14] text-white overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="wrap relative z-10 flex flex-col lg:flex-row items-center gap-12">
          
          <div className="flex-1 lg:max-w-[600px]">
            <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-6 flex items-center gap-3 font-semibold">
              <span className="w-6 h-px bg-[#00B8F0]"></span>
              {heroData.badge}
            </div>
            <h1 
              className="text-[clamp(36px,5vw,56px)] leading-[1.1] font-semibold mb-6 tracking-tight text-white"
              dangerouslySetInnerHTML={{ __html: heroData.title }}
            />
            <p className="text-[17px] text-[#8A9EB0] mb-8 max-w-[500px]">
              {heroData.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#articles" className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-6 py-3 rounded text-[14px] flex items-center gap-2">Explore All Articles <ArrowRight className="w-4 h-4" /></Link>
              <a href="#" className="btn border border-[#1E293B] hover:border-[#00B8F0] hover:text-[#00B8F0] transition-colors text-white px-6 py-3 rounded text-[14px] flex items-center gap-2">
                Subscribe to Newsletter <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex-1 w-full relative hidden lg:flex items-center justify-center min-h-[500px]">
            {/* Constellation / Network Background */}
            <div className="absolute inset-0 z-0 opacity-30" style={{ 
              backgroundImage: 'radial-gradient(circle at center, #00B8F0 1.5px, transparent 1.5px), radial-gradient(circle at center, #0066FF 1px, transparent 1px)', 
              backgroundSize: '40px 40px, 60px 60px',
              backgroundPosition: '0 0, 20px 20px'
            }} />
            
            {/* Strong central glow behind the podium */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#0066FF]/30 blur-[100px] rounded-full pointer-events-none z-0" />
            <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[200px] h-[100px] bg-[#00B8F0]/40 blur-[60px] rounded-full pointer-events-none z-0" />

            <Image 
              src="/eng-i-removebg-preview.png"
              alt="Engineering Insights"
              width={700}
              height={500}
              className="object-contain w-full h-auto max-w-[700px] relative z-10 drop-shadow-[0_0_20px_rgba(0,184,240,0.15)]"
              priority
            />
          </div>

        </div>
      </section>

      {/* FILTER BAR */}
      <section className="py-6 border-y border-[#1E293B] bg-[#0A111F] sticky top-[60px] z-40" id="articles">
         <div className="wrap flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex overflow-x-auto gap-2 pb-2 lg:pb-0 hide-scrollbar w-full lg:w-auto">
               <button className="whitespace-nowrap px-4 py-1.5 bg-[#00B8F0] text-white text-[13px] font-semibold rounded-sm">All Articles</button>
               <button className="whitespace-nowrap px-4 py-1.5 border border-[#1E293B] text-[#8A9EB0] hover:border-[#00B8F0] hover:text-white text-[13px] font-semibold rounded-sm transition-colors">AI Engineering</button>
               <button className="whitespace-nowrap px-4 py-1.5 border border-[#1E293B] text-[#8A9EB0] hover:border-[#00B8F0] hover:text-white text-[13px] font-semibold rounded-sm transition-colors">Enterprise RAG</button>
               <button className="whitespace-nowrap px-4 py-1.5 border border-[#1E293B] text-[#8A9EB0] hover:border-[#00B8F0] hover:text-white text-[13px] font-semibold rounded-sm transition-colors">AI Agents</button>
               <button className="whitespace-nowrap px-4 py-1.5 border border-[#1E293B] text-[#8A9EB0] hover:border-[#00B8F0] hover:text-white text-[13px] font-semibold rounded-sm transition-colors">MLOps</button>
               <button className="whitespace-nowrap px-4 py-1.5 border border-[#1E293B] text-[#8A9EB0] hover:border-[#00B8F0] hover:text-white text-[13px] font-semibold rounded-sm transition-colors">Architecture</button>
               <button className="whitespace-nowrap px-4 py-1.5 border border-[#1E293B] text-[#8A9EB0] hover:border-[#00B8F0] hover:text-white text-[13px] font-semibold rounded-sm transition-colors">Tutorials</button>
               <button className="whitespace-nowrap px-4 py-1.5 border border-[#1E293B] text-[#8A9EB0] hover:border-[#00B8F0] hover:text-white text-[13px] font-semibold rounded-sm transition-colors">Open Source</button>
               <button className="whitespace-nowrap px-4 py-1.5 border border-[#1E293B] text-[#8A9EB0] hover:border-[#00B8F0] hover:text-white text-[13px] font-semibold rounded-sm transition-colors">Case Studies</button>
            </div>
            <div className="relative w-full lg:w-[250px] shrink-0">
               <input type="text" placeholder="Search articles..." className="w-full border border-[#1E293B] bg-[#050B14] text-white rounded-sm pl-10 pr-4 py-2 text-[13px] focus:outline-none focus:border-[#00B8F0] placeholder-[#8A9EB0]" />
               <Search className="w-4 h-4 text-[#8A9EB0] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
         </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="py-[60px] bg-[#050B14]">
        <div className="wrap flex flex-col lg:flex-row gap-12 items-start">
           
           {/* LEFT: ARTICLES FEED */}
           <div className="w-full lg:w-[70%] flex flex-col gap-10">
              
              {/* Featured Article */}
              {featuredArticle && (
                <div className="flex flex-col bg-[#0A111F] border border-[#1E293B] rounded-md overflow-hidden group cursor-pointer hover:border-[#00B8F0] transition-colors">
                   <div className="h-[260px] sm:h-[320px] bg-[#050B14] relative blueprint flex items-center justify-center p-6 border-b border-[#1E293B]">
                      <div className="absolute top-4 left-4 bg-[#00B8F0] text-white font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm z-20">FEATURED</div>
                      
                      {/* Abstract RAG Diagram */}
                      <div className="flex flex-col gap-6 w-full max-w-[500px] z-10">
                         <div className="flex items-center justify-between">
                            <div className="flex flex-col items-center gap-2"><div className="w-14 h-14 border border-[#00B8F0]/50 rounded flex items-center justify-center text-[#00B8F0] bg-[#00B8F0]/10"><Layout className="w-6 h-6"/></div><span className="text-[10px] text-[#8A9EB0] font-mono">Document Sources</span></div>
                            <ArrowRight className="w-4 h-4 text-[#00B8F0]/50" />
                            <div className="flex flex-col items-center gap-2"><div className="w-14 h-14 border border-[#00B8F0]/50 rounded flex items-center justify-center text-[#00B8F0] bg-[#00B8F0]/10"><ArrowRightCircle className="w-6 h-6"/></div><span className="text-[10px] text-[#8A9EB0] font-mono">Ingestion</span></div>
                            <ArrowRight className="w-4 h-4 text-[#00B8F0]/50" />
                            <div className="flex flex-col items-center gap-2"><div className="w-14 h-14 border border-[#00B8F0]/50 rounded flex items-center justify-center text-[#00B8F0] bg-[#00B8F0]/10"><Network className="w-6 h-6"/></div><span className="text-[10px] text-[#8A9EB0] font-mono">Embedding</span></div>
                            <ArrowRight className="w-4 h-4 text-[#00B8F0]/50" />
                            <div className="flex flex-col items-center gap-2"><div className="w-14 h-14 border border-[#00B8F0]/50 rounded flex items-center justify-center text-[#00B8F0] bg-[#00B8F0]/10"><Database className="w-6 h-6"/></div><span className="text-[10px] text-[#8A9EB0] font-mono">Vector DB</span></div>
                         </div>
                         <div className="flex items-center justify-between">
                            <div className="flex flex-col items-center gap-2"><div className="w-14 h-14 border border-white/20 rounded flex items-center justify-center text-white"><Search className="w-6 h-6"/></div><span className="text-[10px] text-[#8A9EB0] font-mono">Retriever</span></div>
                            <ArrowRight className="w-4 h-4 text-[#00B8F0]/50" />
                            <div className="flex flex-col items-center gap-2"><div className="w-14 h-14 border border-white/20 rounded flex items-center justify-center text-white"><Layers className="w-6 h-6"/></div><span className="text-[10px] text-[#8A9EB0] font-mono">Reranker</span></div>
                            <ArrowRight className="w-4 h-4 text-[#00B8F0]/50" />
                            <div className="flex flex-col items-center gap-2"><div className="w-14 h-14 border border-white/20 rounded flex items-center justify-center text-white"><Bot className="w-6 h-6"/></div><span className="text-[10px] text-[#8A9EB0] font-mono">LLM</span></div>
                            <ArrowRight className="w-4 h-4 text-[#00B8F0]/50" />
                            <div className="flex flex-col items-center gap-2"><div className="w-14 h-14 border border-[#00B8F0] bg-[#00B8F0] text-white rounded flex items-center justify-center"><Layout className="w-6 h-6"/></div><span className="text-[10px] text-[#8A9EB0] font-mono">Answer</span></div>
                         </div>
                      </div>
                   </div>
                   
                   <div className="p-8 flex flex-col md:flex-row gap-8">
                      <div className="flex-1">
                         <div className="font-mono text-[10px] text-[#00B8F0] uppercase tracking-wider mb-2 font-semibold">{featuredArticle.category}</div>
                         <h3 className="text-[24px] font-semibold mb-3 group-hover:text-[#00B8F0] transition-colors leading-snug text-white">{featuredArticle.title}</h3>
                         <p className="text-[15px] text-[#8A9EB0] leading-relaxed">{featuredArticle.description}</p>
                      </div>
                      <div className="md:w-[200px] flex md:flex-col items-center md:items-start gap-4 md:border-l border-[#1E293B] md:pl-6 shrink-0">
                         <div className="w-10 h-10 bg-[#050B14] rounded-full flex items-center justify-center text-white font-bold text-[14px]">B</div>
                         <div>
                            <div className="text-[14px] font-semibold text-white">{featuredArticle.author}</div>
                            <div className="text-[12px] text-[#8A9EB0] mt-1">{featuredArticle.date}</div>
                            <div className="text-[12px] text-[#8A9EB0]">• {featuredArticle.readTime}</div>
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
                     <div key={article.id} className="bg-[#0A111F] border border-[#1E293B] rounded-md overflow-hidden group cursor-pointer hover:border-[#00B8F0] transition-colors flex flex-col">
                        <div className="h-[180px] bg-[#050B14] border-b border-[#1E293B] relative blueprint flex items-center justify-center">
                           <div className="w-16 h-16 rounded border border-white/20 flex items-center justify-center bg-white/5 text-[#8A9EB0] group-hover:text-[#00B8F0] transition-colors">
                              <Icon className="w-8 h-8" />
                           </div>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                           <div className="font-mono text-[10px] text-[#00B8F0] uppercase tracking-wider mb-2 font-semibold">{article.category}</div>
                           <h3 className="text-[18px] font-semibold mb-3 group-hover:text-[#00B8F0] transition-colors leading-snug text-white">{article.title}</h3>
                           <p className="text-[14px] text-[#8A9EB0] leading-relaxed mb-6 flex-1">{article.description}</p>
                           
                           <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[#1E293B]">
                              <div className="w-8 h-8 bg-[#050B14] rounded-full flex items-center justify-center text-white font-bold text-[12px] shrink-0">
                                 {article.author.charAt(0)}
                              </div>
                              <div className="flex-1">
                                 <div className="text-[13px] font-semibold text-white">{article.author}</div>
                                 <div className="text-[11px] text-[#8A9EB0]">{article.date} • {article.readTime}</div>
                              </div>
                           </div>
                        </div>
                     </div>
                   );
                 })}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between border-t border-[#1E293B] pt-6 mt-4">
                 <button className="flex items-center gap-2 text-[13px] text-[#8A9EB0] hover:text-[#00B8F0] font-semibold transition-colors"><ChevronLeft className="w-4 h-4"/> Previous</button>
                 <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded bg-[#00B8F0] text-white flex items-center justify-center text-[13px] font-bold">1</button>
                    <button className="w-8 h-8 rounded text-[#8A9EB0] hover:bg-[#1E293B] hover:text-white flex items-center justify-center text-[13px] font-bold transition-colors">2</button>
                    <button className="w-8 h-8 rounded text-[#8A9EB0] hover:bg-[#1E293B] hover:text-white flex items-center justify-center text-[13px] font-bold transition-colors">3</button>
                    <button className="w-8 h-8 rounded text-[#8A9EB0] hover:bg-[#1E293B] hover:text-white flex items-center justify-center text-[13px] font-bold transition-colors hidden sm:flex">4</button>
                    <button className="w-8 h-8 rounded text-[#8A9EB0] hover:bg-[#1E293B] hover:text-white flex items-center justify-center text-[13px] font-bold transition-colors hidden sm:flex">5</button>
                    <span className="text-[#8A9EB0] px-1">...</span>
                    <button className="w-8 h-8 rounded text-[#8A9EB0] hover:bg-[#1E293B] hover:text-white flex items-center justify-center text-[13px] font-bold transition-colors">12</button>
                 </div>
                 <button className="flex items-center gap-2 text-[13px] text-[#8A9EB0] hover:text-[#00B8F0] font-semibold transition-colors">Next <ChevronRight className="w-4 h-4"/></button>
              </div>

           </div>

           {/* RIGHT: SIDEBAR */}
           <div className="w-full lg:w-[30%] flex flex-col gap-10">
              
              {/* Popular Articles */}
              <div>
                 <div className="font-mono text-[11px] text-[#00B8F0] uppercase tracking-wider font-semibold mb-6">POPULAR ARTICLES</div>
                 <div className="flex flex-col gap-4">
                    {[
                      { t: "Building a Scalable Enterprise RAG System", d: "May 12, 2024", i: Network },
                      { t: "Inside AI Agents: From Reasoning to Real-World Action", d: "May 8, 2024", i: Bot },
                      { t: "Observability for LLM Applications", d: "Apr 28, 2024", i: Layout },
                      { t: "Advanced RAG Techniques for Better Accuracy", d: "Apr 21, 2024", i: Search },
                      { t: "Prompt Engineering Patterns That Work", d: "Apr 3, 2024", i: Code2 },
                    ].map((art, i) => (
                      <div key={i} className="flex gap-4 group cursor-pointer">
                         <div className="w-[80px] h-[60px] bg-[#0A111F] border border-[#1E293B] rounded blueprint shrink-0 flex items-center justify-center">
                            <art.i className="w-5 h-5 text-[#8A9EB0] group-hover:text-[#00B8F0] transition-colors" />
                         </div>
                         <div>
                            <h4 className="text-[13px] font-semibold text-white group-hover:text-[#00B8F0] transition-colors leading-snug mb-1">{art.t}</h4>
                            <div className="text-[11px] text-[#8A9EB0]">{art.d}</div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Categories */}
              <div>
                 <div className="font-mono text-[11px] text-[#00B8F0] uppercase tracking-wider font-semibold mb-6">CATEGORIES</div>
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
                      <li key={i} className="flex items-center justify-between py-3 border-b border-[#1E293B] last:border-0 cursor-pointer group">
                         <span className="text-[14px] text-[#8A9EB0] group-hover:text-white transition-colors">{cat.n}</span>
                         <span className="text-[12px] font-mono text-[#8A9EB0] group-hover:text-white transition-colors">{cat.c}</span>
                      </li>
                    ))}
                 </ul>
              </div>

              {/* Stay in the Loop */}
              <div className="bg-[#0A111F] border border-[#1E293B] rounded p-6 text-center">
                 <div className="font-mono text-[11px] text-[#00B8F0] uppercase tracking-wider font-semibold mb-3">STAY IN THE LOOP</div>
                 <p className="text-[13px] text-[#8A9EB0] mb-4 leading-relaxed">Get the latest engineering insights, tutorials, and updates from our labs.</p>
                 <input type="email" placeholder="Enter your email" className="w-full border border-[#1E293B] bg-[#050B14] text-white rounded-sm px-3 py-2 text-[13px] focus:outline-none focus:border-[#00B8F0] mb-3 placeholder-[#8A9EB0]" />
                 <button className="w-full bg-[#00B8F0] text-white text-[13px] font-semibold py-2 rounded-sm hover:bg-[#0096C7] transition-colors mb-3">Subscribe</button>
                 <div className="text-[10px] text-[#8A9EB0] italic">No spam. Unsubscribe anytime.</div>
              </div>

              {/* Resources */}
              <div>
                 <div className="font-mono text-[11px] text-[#00B8F0] uppercase tracking-wider font-semibold mb-4">RESOURCES</div>
                 <ul className="flex flex-col gap-3">
                    {[
                      { n: "Engineering Handbook", i: Layout },
                      { n: "System Design Patterns", i: Layers },
                      { n: "AI Engineering Roadmap", i: Network },
                      { n: "Open Source @ Botmartz", i: Github },
                      { n: "YouTube Channel", i: Search },
                    ].map((res, i) => (
                      <li key={i}>
                         <a href="#" className="flex items-center justify-between p-3 bg-[#0A111F] border border-[#1E293B] rounded hover:border-[#00B8F0] transition-colors group">
                            <span className="flex items-center gap-3 text-[13px] font-medium text-white group-hover:text-[#00B8F0] transition-colors"><res.i className="w-4 h-4 text-[#8A9EB0] group-hover:text-[#00B8F0]" /> {res.n}</span>
                            <ArrowRight className="w-4 h-4 text-[#8A9EB0] group-hover:text-[#00B8F0] transition-colors" />
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
