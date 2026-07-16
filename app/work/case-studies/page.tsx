import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { adminDb } from '@/lib/firebase-admin';
import { ArrowRight, Terminal, Code2, Layout, BookOpen } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'AI Case Studies | Botmartz AI',
    description: 'Discover how we partner with leading organizations to deploy production-ready AI agents and RAG systems.',
  };
  
  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("case-studies").get();
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
      url: 'https://botmartz.com/work/case-studies',
      type: 'website',
    },
  };
}

const DEFAULT_INTRO = {
  hero: {
    badge: "Work / Case Studies",
    title: "Proven AI Implementations. Real Business Results.",
    subtitle: "Discover how we partner with leading organizations to deploy production-ready AI agents and RAG systems that drive operational efficiency and unlock new capabilities.",
    ctaText: "Start a Conversation →",
    ctaLink: "/contact",
  },
  cta: {
    title: "Want to see similar results in your organization?",
    subtitle: "Let's discuss how custom AI engineering can solve your specific business challenges.",
    buttonText: "Book a Discovery Call →"
  },
  structuredData: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AI Case Studies",
    "provider": {
      "@type": "Organization",
      "name": "Botmartz AI Solutions"
    }
  })
};

const DEFAULT_STUDIES = [
  {
    id: "logistics-rag",
    title: "Enterprise Knowledge Search for Global Logistics",
    excerpt: "We partnered with a Fortune 500 logistics provider to build a secure enterprise RAG system. The solution unified search across 500K+ internal documents, complex SOPs, and manuals, allowing operations teams to instantly query policy data and compliance standards without hallucinations.",
    clientName: "Global Logistics Company",
    category: "Logistics",
    tags: ["RAG", "Hybrid Search", "70%", "3.2x", "LangChain", "Pinecone", "FastAPI"],
    featuredImage: "",
    status: "published"
  },
  {
    id: "saas-support",
    title: "Autonomous Support Agent for SaaS Platform",
    excerpt: "Developed a context-aware AI support agent that integrates directly into the client's Zendesk and internal databases. The agent autonomously resolves Tier 1 and Tier 2 tickets, executes basic account actions via API, and seamlessly escalates complex issues to human agents with full context.",
    clientName: "SaaS Platform",
    category: "SaaS",
    tags: ["LangGraph", "OpenAI", "45%", "35%", "Redis", "FastAPI", "Docker"],
    featuredImage: "",
    status: "published"
  },
  {
    id: "legal-doc-intel",
    title: "Legal Document Intelligence & Extraction Platform",
    excerpt: "Built a highly specialized RAG pipeline featuring advanced OCR (Optical Character Recognition) to automate contract analysis. The system ingested over 100K dense legal documents, extracting key clauses, liabilities, and risks into structured data formats for immediate review.",
    clientName: "Legal Tech Company",
    category: "Legal",
    tags: ["RAG", "OCR", "90%", "95%", "LlamaIndex", "Qdrant", "PostgreSQL"],
    featuredImage: "",
    status: "published"
  }
];

export default async function CaseStudiesPage() {
  let intro = { ...DEFAULT_INTRO };
  let studies: any[] = [];

  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("case-studies").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      intro = {
        hero: data?.hero || DEFAULT_INTRO.hero,
        cta: data?.cta || DEFAULT_INTRO.cta,
        structuredData: data?.structuredData || DEFAULT_INTRO.structuredData
      };
    }
  } catch (e) {}

  try {
    const querySnapshot = await adminDb
      .collection("case-studies")
      .where("status", "==", "published")
      .orderBy("createdAt", "desc")
      .get();
      
    if (querySnapshot.empty) {
      studies = DEFAULT_STUDIES;
    } else {
      studies = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
  } catch (e) {
    try {
      const fallbackSnapshot = await adminDb.collection("case-studies").get();
      studies = fallbackSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter((d: any) => d.status === "published");
      if (studies.length === 0) studies = DEFAULT_STUDIES;
    } catch (err) {
      studies = DEFAULT_STUDIES;
    }
  }

  return (
    <main className="bg-[#050B14] min-h-screen text-white">
      {intro.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: intro.structuredData }}
        />
      )}
      
      {/* HERO SECTION (DARK CENTERED) */}
      <section className="relative pt-[120px] pb-[80px] bg-[#050B14] text-white overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="wrap relative z-10 flex flex-col items-center text-center max-w-[800px] mx-auto">
          <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-6 flex items-center justify-center gap-3 font-semibold">
            <span className="w-6 h-px bg-[#00B8F0]"></span>
            {intro.hero.badge || "Case Studies"}
            <span className="w-6 h-px bg-[#00B8F0]"></span>
          </div>
          <h1 
            className="text-[clamp(40px,6vw,64px)] leading-[1.05] font-semibold mb-6 tracking-tight text-white"
            dangerouslySetInnerHTML={{ __html: intro.hero.title }}
          />
          <p className="text-[17px] sm:text-[19px] text-[#8A9EB0] mb-10 max-w-[600px] leading-relaxed font-light">
            {intro.hero.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={intro.hero.ctaLink || "/contact"} className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-8 py-3.5 rounded text-[15px] flex items-center gap-2">
              {intro.hero.ctaText || "Start a Conversation →"}
            </Link>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-16 relative w-full flex justify-center min-h-[400px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#0066FF]/20 blur-[100px] rounded-full pointer-events-none z-0" />
          <Image
            src="/case-studies2.png"
            alt="Case Studies"
            width={600}
            height={400}
            className="object-contain w-full max-w-[600px] h-auto relative z-10 drop-shadow-[0_0_30px_rgba(0,184,240,0.15)]"
            priority
          />
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* SECTION 1: WHAT WE BUILD */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <section className="py-[140px] bg-white">
        <div className="wrap">
          <div className="text-center mb-[100px]">
            <h2 className="text-[48px] md:text-[56px] font-semibold text-[#050B14] leading-tight tracking-tight">
              What We Build
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Enterprise RAG",
                desc: "Production-grade retrieval-augmented generation systems",
                features: ["Hybrid search", "Vector optimization", "Multi-source indexing", "Zero hallucinations", "Real-time updates"]
              },
              {
                title: "AI Agents",
                desc: "Autonomous agents that solve complex workflows",
                features: ["Multi-step reasoning", "Tool integration", "Error recovery", "Context awareness", "Human handoff"]
              },
              {
                title: "AI Integrations",
                desc: "Seamless AI capabilities into existing systems",
                features: ["API abstraction", "Legacy compatibility", "Fine-tuning", "Custom models", "Monitoring"]
              }
            ].map((item, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-[24px] border border-[#E6EEF7] bg-white hover:border-[#00B8F0]/40 hover:shadow-[0_24px_48px_rgba(0,184,240,0.08)] transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-[16px] bg-gradient-to-br from-[#00B8F0]/10 to-[#0066FF]/10 border border-[#00B8F0]/20 flex items-center justify-center mb-6 group-hover:shadow-[0_0_24px_rgba(0,184,240,0.2)] transition-all">
                  <svg className="w-7 h-7 text-[#00B8F0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>

                <h3 className="text-[22px] font-semibold text-[#050B14] mb-3">
                  {item.title}
                </h3>
                <p className="text-[15px] text-[#6B7280] mb-8 leading-relaxed">
                  {item.desc}
                </p>

                <ul className="space-y-3 mb-8">
                  {item.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-3 text-[14px] text-[#374151]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00B8F0]"></div>
                      {feat}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-[14px] font-medium text-[#00B8F0] hover:text-[#0052FF] transition-colors"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* SECTION 2: ENGINEERING EXCELLENCE */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <section className="py-[140px] bg-[#F7FAFD]">
        <div className="wrap">
          <div className="text-center mb-[100px]">
            <h2 className="text-[48px] md:text-[56px] font-semibold text-[#050B14] leading-tight">
              Engineering Excellence.<br />Real World Impact.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: "⚙️", title: "Engineering First", desc: "Production-grade code from day one with comprehensive testing and observability." },
              { icon: "🚀", title: "Production Ready", desc: "Enterprise-scale infrastructure built for reliability, performance, and compliance." },
              { icon: "🔬", title: "Research Driven", desc: "Grounded in cutting-edge AI research with peer-reviewed methodologies." },
              { icon: "🤝", title: "Open & Collaborative", desc: "Transparent development with open-source contributions and knowledge sharing." },
              { icon: "🛡️", title: "End-to-End Partner", desc: "Full lifecycle support from strategy through deployment and ongoing optimization." }
            ].map((item, i) => (
              <div
                key={i}
                className="group p-8 rounded-[24px] border border-[#E6EEF7] bg-white hover:shadow-[0_24px_48px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-[18px] font-semibold text-[#050B14] mb-3">
                  {item.title}
                </h3>
                <p className="text-[14px] text-[#6B7280] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* SECTION 3: FEATURED PROJECTS & LABS */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <section className="py-[140px] bg-white">
        <div className="wrap">
          <div className="text-center mb-[100px]">
            <h2 className="text-[48px] md:text-[56px] font-semibold text-[#050B14] leading-tight">
              Featured Projects & Labs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {studies.slice(0, 4).map((study, idx) => (
              <Link
                key={study.id}
                href="/work/case-studies"
                className="group overflow-hidden rounded-[24px] border border-[#E6EEF7] bg-white hover:border-[#00B8F0]/40 hover:shadow-[0_24px_48px_rgba(0,184,240,0.08)] transition-all duration-300"
              >
                {/* Image Placeholder */}
                <div className="w-full h-[240px] bg-gradient-to-br from-[#F7FAFD] to-[#EDF5FF] border-b border-[#E6EEF7] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <svg viewBox="0 0 400 300" className="w-full h-full">
                      <defs>
                        <pattern id={`grid-${idx}`} width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00B8F0" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="400" height="300" fill={`url(#grid-${idx})`} />
                      <circle cx="200" cy="150" r="60" fill="none" stroke="#00B8F0" strokeWidth="1" opacity="0.3" />
                      <circle cx="200" cy="150" r="40" fill="none" stroke="#0066FF" strokeWidth="1" opacity="0.2" />
                    </svg>
                  </div>
                  <div className="relative z-10 text-center">
                    <div className="text-5xl mb-2">📊</div>
                    <p className="text-[13px] text-[#6B7280] font-medium">Enterprise Dashboard</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[11px] font-mono font-semibold text-[#00B8F0] bg-[#00B8F0]/10 px-3 py-1 rounded-full">
                      {study.category}
                    </span>
                  </div>
                  <h3 className="text-[20px] font-semibold text-[#050B14] mb-2 group-hover:text-[#00B8F0] transition-colors line-clamp-2">
                    {study.title}
                  </h3>
                  <p className="text-[14px] text-[#6B7280] mb-6 line-clamp-2">
                    {study.excerpt}
                  </p>
                  <div className="flex items-center text-[#00B8F0] text-[14px] font-medium group-hover:gap-3 gap-2 transition-all">
                    Read Case Study <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* SECTION 4: ENGINEERING STACK */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <section className="py-[140px] bg-[#F7FAFD]">
        <div className="wrap">
          <div className="text-center mb-[100px]">
            <h2 className="text-[48px] md:text-[56px] font-semibold text-[#050B14] leading-tight">
              Built With Modern<br />AI Engineering Stack
            </h2>
          </div>

          <div className="flex items-center justify-center flex-wrap gap-8 md:gap-12">
            {["PyTorch", "LangGraph", "LangChain", "FastAPI", "TensorFlow", "Docker", "AWS", "PostgreSQL", "Redis", "Pinecone"].map((tech, i) => (
              <div
                key={i}
                className="flex items-center justify-center px-4 py-2 text-[14px] font-medium text-[#6B7280] hover:text-[#00B8F0] transition-colors"
              >
                <span className="opacity-70">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* SECTION 5: LATEST ENGINEERING INSIGHTS */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <section className="py-[140px] bg-white">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Blog cards */}
            <div className="lg:col-span-2">
              <h2 className="text-[48px] md:text-[56px] font-semibold text-[#050B14] leading-tight mb-[80px]">
                Latest Engineering Insights
              </h2>

              <div className="space-y-8">
                {[
                  { title: "Building Production RAG Systems", date: "Jan 15, 2025", read: "12 min" },
                  { title: "Multi-Agent Orchestration Patterns", date: "Jan 12, 2025", read: "15 min" },
                  { title: "Evaluating LLM Performance at Scale", date: "Jan 10, 2025", read: "10 min" }
                ].map((article, i) => (
                  <Link
                    key={i}
                    href="/insights"
                    className="group block p-6 rounded-[20px] border border-[#E6EEF7] hover:border-[#00B8F0]/40 hover:bg-[#F7FAFD] transition-all"
                  >
                    <div className="mb-4 h-[160px] rounded-[16px] bg-gradient-to-br from-[#1A2340] to-[#0A111F] flex items-center justify-center">
                      <div className="text-4xl">📝</div>
                    </div>
                    <div className="flex items-center gap-2 mb-3 text-[12px] text-[#6B7280]">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.read} read</span>
                    </div>
                    <h3 className="text-[18px] font-semibold text-[#050B14] group-hover:text-[#00B8F0] transition-colors mb-2">
                      {article.title}
                    </h3>
                    <p className="text-[14px] text-[#6B7280]">
                      Deep dive into production AI systems and engineering best practices.
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Sidebar */}
            <div className="flex flex-col gap-8">
              {/* Featured Article */}
              <Link
                href="/insights"
                className="group block p-8 rounded-[24px] bg-[#1A2340] text-white border border-[#1E293B]/40 hover:border-[#00B8F0]/40 hover:shadow-[0_24px_48px_rgba(0,184,240,0.1)] transition-all"
              >
                <div className="text-5xl mb-4">✨</div>
                <h3 className="text-[20px] font-semibold mb-3 group-hover:text-[#00B8F0] transition-colors">
                  Featured Insight
                </h3>
                <p className="text-[13px] text-[#8A9EB0] mb-6 leading-relaxed">
                  How we scaled AI systems from 100K to 10M documents without losing reliability.
                </p>
                <div className="flex items-center text-[#00B8F0] text-[14px] font-medium group-hover:gap-2 gap-1 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </div>
              </Link>

              {/* Newsletter */}
              <div className="p-8 rounded-[24px] border border-[#E6EEF7] bg-white">
                <h4 className="text-[16px] font-semibold text-[#050B14] mb-2">
                  Stay Updated
                </h4>
                <p className="text-[13px] text-[#6B7280] mb-6">
                  Get weekly engineering insights and AI best practices.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2.5 rounded-[12px] border border-[#E6EEF7] text-[14px] placeholder-[#9CA3AF] focus:outline-none focus:border-[#00B8F0] transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2.5 rounded-[12px] bg-[#00B8F0] text-white font-medium text-[14px] hover:bg-[#0096C7] transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* SECTION 6: COMMUNITY & ECOSYSTEM */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <section className="py-[140px] bg-[#F7FAFD]">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <h2 className="text-[48px] md:text-[56px] font-semibold text-[#050B14] leading-tight mb-12">
                Join Our AI Engineering Community
              </h2>

              <div className="space-y-6">
                {["Monthly Meetups", "Reading Club", "Hack Nights", "AI Frontier 2026", "Discord", "Open Source"].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-[#00B8F0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="text-[16px] font-medium text-[#050B14]">{item}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="p-8 rounded-[24px] border border-[#E6EEF7] bg-white shadow-[0_24px_48px_rgba(0,0,0,0.04)]">
              <div className="text-[12px] font-mono uppercase tracking-wider text-[#00B8F0] mb-4">Event</div>
              <h3 className="text-[32px] font-semibold text-[#050B14] mb-2">AI Frontier 2026</h3>
              <p className="text-[14px] text-[#6B7280] mb-8 leading-relaxed">
                The premier conference for AI engineering professionals. Three days of talks, workshops, and networking with industry leaders.
              </p>
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[#E6EEF7]">
                <div className="w-12 h-12 rounded-full bg-[#00B8F0]/10 flex items-center justify-center">📅</div>
                <div>
                  <p className="text-[13px] text-[#6B7280]">Coming Soon</p>
                  <p className="text-[15px] font-semibold text-[#050B14]">June 2026</p>
                </div>
              </div>
              <Link
                href="/community/events/ai-frontier-2026"
                className="inline-flex items-center gap-2 text-[14px] font-medium text-[#00B8F0] hover:text-[#0052FF] transition-colors"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* SECTION 7: OPEN SOURCE */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <section className="py-[140px] bg-[#F7FAFD] border-t border-[#E6EEF7]">
        <div className="wrap">
          <div className="text-center mb-[100px]">
            <div className="mb-6 flex justify-center">
              <svg className="w-16 h-16 text-[#050B14]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
            <h2 className="text-[48px] md:text-[56px] font-semibold text-[#050B14] leading-tight mb-6">
              Open Source is<br />in Our DNA
            </h2>
            <p className="text-[18px] text-[#6B7280] max-w-[600px] mx-auto">
              We believe in building with the community. Check out our projects and contribute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: "Repositories", value: "12" },
              { label: "Stars", value: "8.2K" },
              { label: "Contributors", value: "150+" },
              { label: "Downloads", value: "2.1M" }
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-[20px] border border-[#E6EEF7] bg-white text-center hover:border-[#00B8F0]/40 transition-colors">
                <div className="text-[32px] font-semibold text-[#00B8F0] mb-2">{stat.value}</div>
                <div className="text-[14px] text-[#6B7280]">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="https://github.com/botmartz"
              target="_blank"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[12px] bg-[#00B8F0] text-white font-medium hover:bg-[#0096C7] transition-colors"
            >
              Explore GitHub <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* SECTION 8: ENGINEERING PROCESS */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <section className="py-[140px] bg-white">
        <div className="wrap">
          <div className="text-center mb-[100px]">
            <h2 className="text-[48px] md:text-[56px] font-semibold text-[#050B14] leading-tight">
              How We Build<br />Production AI
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 max-w-[1200px] mx-auto">
            {["Research", "Architecture", "Development", "Evaluation", "Deployment", "Monitoring"].map((step, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-[16px] border-2 border-[#E6EEF7] bg-white flex items-center justify-center mb-4 hover:border-[#00B8F0]/40 hover:shadow-[0_0_24px_rgba(0,184,240,0.15)] transition-all group">
                  <div className="text-4xl">{["🔬", "🏗️", "⚡", "📊", "🚀", "👀"][i]}</div>
                </div>
                <div className="text-center">
                  <h4 className="text-[16px] font-semibold text-[#050B14] mb-2">{step}</h4>
                  <p className="text-[13px] text-[#6B7280]">Production-grade standards</p>
                </div>
                {i < 5 && (
                  <div className="hidden md:block absolute left-[calc(50%+80px)] w-12 h-0.5 bg-gradient-to-r from-[#00B8F0]/40 to-transparent mt-[-88px]"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* SECTION 9: CLIENT SUCCESS METRICS */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <section className="py-[140px] bg-[#F7FAFD]">
        <div className="wrap">
          <div className="text-center mb-[100px]">
            <h2 className="text-[48px] md:text-[56px] font-semibold text-[#050B14] leading-tight">
              Impact Across Our Engagements
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { value: "20+", label: "Projects Delivered" },
              { value: "100+", label: "Enterprise Clients" },
              { value: "50M+", label: "Documents Processed" },
              { value: "95%", label: "Client Satisfaction" },
              { value: "99.9%", label: "Uptime" }
            ].map((metric, i) => (
              <div key={i} className="p-8 rounded-[24px] border border-[#E6EEF7] bg-white text-center hover:shadow-[0_24px_48px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-1">
                <div className="text-[48px] font-semibold text-[#00B8F0] mb-3">{metric.value}</div>
                <div className="text-[15px] text-[#6B7280]">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* SECTION 10: FINAL CTA */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <section className="py-[140px] bg-[#050B14] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg viewBox="0 0 1200 600" className="w-full h-full">
            <defs>
              <pattern id="blueprint" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#00B8F0" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="1200" height="600" fill="url(#blueprint)" />
          </svg>
        </div>

        <div className="wrap relative z-10 text-center">
          <h2 className="text-[56px] md:text-[64px] font-semibold leading-tight mb-6 max-w-[900px] mx-auto">
            Ready to Engineer<br />the Future?
          </h2>
          <p className="text-[18px] text-[#8A9EB0] max-w-[600px] mx-auto mb-12 leading-relaxed">
            Partner with us to build production-grade AI systems that drive real business impact and scale.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[12px] bg-[#00B8F0] text-[#050B14] font-semibold hover:bg-white transition-colors"
            >
              Book a Discovery Call <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/work/case-studies"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[12px] border-2 border-[#00B8F0] text-white font-semibold hover:bg-[#00B8F0]/10 transition-colors"
            >
              Explore Our Work <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
