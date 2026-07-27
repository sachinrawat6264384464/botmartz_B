import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy, limit, doc, getDoc } from "firebase/firestore";
import DynamicIcon from "@/app/_components/DynamicIcon";
import * as SiIcons from 'react-icons/si';
import * as LucideIcons from 'lucide-react';
import {
  Check,
  Layers,
  Bot,
  Blocks,
  Code2,
  ShieldCheck,
  FlaskConical,
  Network,
  UsersRound,
  Briefcase,
  Users,
  Star,
  MapPin,
  Calendar,
  Ticket,
  Database,
  Cloud
} from 'lucide-react';

function getTechColor(name: string, iconName: string): string {
  const nameLower = name.toLowerCase();
  if (nameLower.includes("milvus")) return "text-[#009688]";
  if (nameLower.includes("weaviate")) return "text-[#13B5C7]";
  if (nameLower.includes("openai")) return "text-white";
  if (nameLower.includes("pytorch")) return "text-[#EE4C2C]";
  if (nameLower.includes("google cloud")) return "text-[#4285F4]";
  if (nameLower.includes("fastapi")) return "text-[#009688]";
  if (nameLower.includes("tensorflow")) return "text-[#FF6F00]";
  if (nameLower.includes("docker")) return "text-[#2496ED]";
  if (nameLower.includes("postgresql")) return "text-[#336791]";
  if (nameLower.includes("azure")) return "text-[#0078D4]";
  if (nameLower.includes("aws")) return "text-white";
  
  if (iconName === "Database") return "text-[#009688]";
  if (iconName === "Cloud") return "text-[#0078D4]";
  return "text-white";
}

function DynamicTechIcon({ name, className }: { name: string; className?: string }) {
  if (name === "LangGraph") {
    return <span className="text-lg mr-1 shrink-0">🦜🕸️</span>;
  }
  if (name === "LangChain") {
    return <span className="text-lg mr-1 shrink-0">🦜🔗</span>;
  }
  
  if (name.startsWith("Si")) {
    const IconComponent = (SiIcons as any)[name];
    if (IconComponent) {
      return <IconComponent className={className} size={24} />;
    }
  }

  const IconComponent = (LucideIcons as any)[name];
  if (IconComponent) {
    return <IconComponent className={className} size={20} />;
  }

  return null;
}

async function getActiveLabs() {
  try {
    const q = query(
      collection(db, "labs"),
      where("status", "==", "active"),
      orderBy("createdAt", "desc"),
      limit(4)
    );
    const snap = await getDocs(q);
    const list: any[] = [];
    snap.forEach((d) => {
      list.push({ id: d.id, ...d.data() });
    });
    if (list.length > 0) return list;
  } catch (err) {
    try {
      const snap = await getDocs(collection(db, "labs"));
      const list: any[] = [];
      snap.forEach((d) => {
        const data = d.data();
        if (data.status === "active") list.push({ id: d.id, ...data });
      });
      if (list.length > 0) return list.slice(0, 4);
    } catch (e) {
      console.error("Error loading labs:", e);
    }
  }
  return [
    { title: "Virtual Try-On", description: "Computer vision pipeline for real-time garment fitting.", iconName: "PyTorch" },
    { title: "AI Research Agent", description: "An internal agent that runs first-pass research and drafts outreach.", iconName: "LangGraph" },
    { title: "Enterprise RAG Demo", description: "A reference implementation showing chunking, hybrid retrieval, and evaluation.", iconName: "FastAPI" },
  ];
}

interface HomePageConfig {
  hero?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    ctaText?: string;
    ctaLink?: string;
  };
  useCases?: { title: string; description: string; iconName: string }[];
  trustBar?: { name: string; iconName: string }[];
  stats?: { value: string; label: string; iconName: string }[];
  techStackItems?: { name: string; iconName: string }[];
}

async function getHomePageConfig(): Promise<HomePageConfig | null> {
  try {
    const docRef = doc(db, "dynamic_pages", "home");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data() as HomePageConfig;
  } catch (err) {
    console.error("Error loading home page config:", err);
  }
  return null;
}

export const revalidate = 3600;

export default async function Home() {
  const [labs, pageConfig] = await Promise.all([getActiveLabs(), getHomePageConfig()]);

  const hero = pageConfig?.hero || {
    badge: "AI Engineering Company",
    title: 'We Engineer <br /> Production <span class="text-[#00B8F0]">AI Systems</span>',
    subtitle: "Enterprise RAG. AI Agents. Real Impact.",
    description: "Botmartz designs, builds, and deploys secure, scalable, and production-ready AI systems for forward-thinking organizations.",
    ctaText: "Book a Discovery Call →",
    ctaLink: "/contact",
  };

  const heroUseCases: { title: string; description: string; iconName: string }[] =
    pageConfig?.useCases?.length
      ? pageConfig.useCases
      : [
          { title: "Enterprise RAG", description: "Connect, retrieve, and reason over your enterprise knowledge.", iconName: "Layers" },
          { title: "AI Agents", description: "Autonomous agents that plan, act and deliver outcomes.", iconName: "Bot" },
          { title: "Production Ready", description: "Secure, scalable and monitored systems that run in the real world.", iconName: "ShieldCheck" },
          { title: "AI Engineering", description: "Modern stack. Clean architecture. Reliable engineering.", iconName: "Code2" },
        ];

  const trustClients: { name: string; iconName: string }[] =
    pageConfig?.trustBar?.length
      ? pageConfig.trustBar
      : [
          { name: "Enterprise RAG", iconName: "Layers" },
          { name: "Autonomous Agents", iconName: "Bot" },
          { name: "HIPAA Compliant", iconName: "ShieldCheck" },
          { name: "LLM Observability", iconName: "Code2" },
          { name: "Production AI", iconName: "Network" },
        ];

  const heroStats: { value: string; label: string; iconName: string }[] =
    pageConfig?.stats?.length
      ? pageConfig.stats
      : [
          { value: "20+", label: "Systems Shipped", iconName: "Briefcase" },
          { value: "99%+", label: "Production Uptime", iconName: "ShieldCheck" },
          { value: "Zero", label: "Hallucination Target", iconName: "Check" },
          { value: "4", label: "Core Industries", iconName: "Layers" },
        ];

  const techStackItems: { name: string; iconName: string }[] =
    pageConfig?.techStackItems?.length
      ? pageConfig.techStackItems
      : [
          { name: "OpenAI", iconName: "SiOpenai" },
          { name: "Milvus", iconName: "Database" },
          { name: "Weaviate", iconName: "Database" },
          { name: "PostgreSQL", iconName: "SiPostgresql" },
          { name: "Azure", iconName: "Cloud" },
          { name: "Google Cloud", iconName: "SiGooglecloud" },
          { name: "PyTorch", iconName: "SiPytorch" },
          { name: "LangGraph", iconName: "LangGraph" },
          { name: "LangChain", iconName: "LangChain" },
          { name: "FastAPI", iconName: "SiFastapi" },
          { name: "TensorFlow", iconName: "SiTensorflow" },
          { name: "Docker", iconName: "SiDocker" },
          { name: "AWS", iconName: "SiAmazonwebservices" },
        ];

  const calloutPositions = [
    "top-[5%] left-[-5%]",
    "top-[5%] right-[-5%]",
    "top-[65%] left-[-5%]",
    "top-[65%] right-[-5%]",
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative pt-[100px] pb-[80px] bg-[#050B14] text-white overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="wrap relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-8">

            {/* Left Content */}
            <div className="flex-1 w-full lg:max-w-[720px] pt-8">
              <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-6 flex items-center gap-3 font-semibold">
                <span className="w-6 h-px bg-[#00B8F0]"></span>
                {hero.badge}
              </div>
              <h1
                className="text-[clamp(34px,7vw,64px)] leading-[1.08] font-semibold mb-5 tracking-tight text-white"
                dangerouslySetInnerHTML={{ __html: hero.title ?? "" }}
              />
              <p className="text-[16px] sm:text-[18px] text-white font-medium mb-6 leading-tight">
                {hero.subtitle}
              </p>
              {hero.description && (
                <p className="text-[15px] sm:text-[15.5px] text-[#8A9EB0] max-w-[540px] mb-10 leading-[1.6]">
                  {hero.description}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-4 mb-[60px] w-full sm:w-auto">
                <Link href={hero.ctaLink || "/contact"} className="btn bg-[#0066FF] text-white hover:bg-[#0052CC] border-none font-semibold px-8 rounded-lg shadow-[0_0_15px_rgba(0,102,255,0.4)] w-full sm:w-auto text-center justify-center">
                  {hero.ctaText || "Book a Discovery Call →"}
                </Link>
                <Link href="/work" className="inline-flex items-center justify-center font-mono text-[13px] uppercase tracking-wider px-8 py-3.5 rounded-lg border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all w-full sm:w-auto text-center">
                  Explore Our Work
                </Link>
              </div>

              {/* Trust Bar — dynamic */}
              <div className="pt-8 border-t border-line/20">
                <p className="text-[11.5px] font-mono text-[#768C9E] uppercase tracking-wider mb-4">Trusted by teams building the future</p>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
                  {trustClients.map((client, i) => (
                    <span key={i} className="font-semibold tracking-wide flex items-center gap-1.5">
                      <DynamicIcon name={client.iconName} size={18} />
                      {client.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Graphic */}
            <div className="flex-1 w-full relative min-h-[500px] hidden lg:block">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[500px] h-[500px] z-10 flex items-center justify-center pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050B14]/90 z-10 pointer-events-none" />
                <Image src="/robot2.png" alt="Botmartz AI Core" width={500} height={500} sizes="(max-width: 1023px) 1px, 500px" className="w-full h-full object-contain animate-float" />
              </div>
              {heroUseCases.slice(0, 4).map((uc, index) => (
                <div
                  key={index}
                  className={`absolute bg-[#0B1524]/80 backdrop-blur-md border border-[#00B8F0]/50 p-5 rounded-xl w-[250px] z-20 shadow-[0_0_25px_rgba(0,184,240,0.2)] ${calloutPositions[index]}`}
                >
                  <h4 className="text-white font-semibold text-[14px] mb-2 flex items-center gap-2">
                    <DynamicIcon name={uc.iconName} size={16} className="text-[#00B8F0]" />
                    {uc.title}
                  </h4>
                  <p className="text-[#8A9EB0] text-[12px] leading-relaxed">{uc.description}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Stats Bar — dynamic */}
          <div className="mt-[60px] sm:mt-[80px] pt-[20px] pb-[40px]">
            <div className="bg-[#050B14]/80 backdrop-blur-md border border-[#00B8F0]/20 rounded-2xl p-6 sm:p-8 lg:px-12 lg:py-10 shadow-[0_0_40px_rgba(0,184,240,0.08)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                {heroStats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-4 sm:gap-5">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#00B8F0]/10 border border-[#00B8F0]/30 flex items-center justify-center text-[#00B8F0] shadow-[0_0_20px_rgba(0,184,240,0.2)] flex-shrink-0">
                      <DynamicIcon name={stat.iconName} className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <div>
                      <div className="text-[28px] sm:text-[32px] font-semibold text-white leading-none mb-1">{stat.value}</div>
                      <div className="text-[13px] sm:text-[14px] text-[#8A9EB0]">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section id="services" className="section-pad bg-[#FCFDFE]">
        <div className="wrap">
          <div className="text-center mb-16">
            <div className="font-mono text-[11px] tracking-[0.14em] text-[#0066FF] uppercase mb-4 font-semibold inline-block">WHAT WE BUILD</div>
            <h2 className="text-[clamp(28px,4vw,38px)] font-semibold mb-4 text-[#0B1C2C]">AI Solutions That Drive Business Forward</h2>
            <p className="text-base text-[#475569] max-w-[600px] mx-auto">
              We focus on building production AI systems that solve real business problems.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                iconName: "Layers",
                title: "Enterprise RAG",
                desc: "Transform your enterprise data into AI-powered knowledge systems.",
                items: ['Knowledge Search', 'Document Intelligence', 'PDF AI & Q&A', 'Enterprise Search', 'Support AI'],
                href: "/services/enterprise-rag"
              },
              {
                iconName: "Bot",
                title: "AI Agents",
                desc: "Build intelligent agents that automate complex tasks and workflows.",
                items: ['Customer Support Agents', 'Research & Analysis Agents', 'Sales & SDR Agents', 'Workflow Automation', 'Internal AI Assistants'],
                href: "/services/ai-agents"
              },
              {
                iconName: "Blocks",
                title: "AI Integrations",
                desc: "Seamlessly integrate AI capabilities into your existing systems.",
                items: ['Model Integration', 'API Development', 'Custom Workflows', 'LLM Fine-tuning', 'System Modernization'],
                href: "/services/integrations"
              },
            ].map((card, i) => (
              <div key={i} suppressHydrationWarning className="bg-white border border-[#E2E8F0] p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,102,255,0.08)] hover:border-[#0066FF]/30 group relative overflow-hidden flex flex-col h-full min-h-[460px]">
                <div suppressHydrationWarning className="absolute top-0 right-0 p-4 opacity-[0.03] transition-opacity group-hover:opacity-[0.06] text-[#0066FF]">
                  <DynamicIcon name={card.iconName} size={100} />
                </div>
                <div className="w-14 h-14 bg-[#EFF8FF] rounded-xl flex items-center justify-center text-[#0066FF] mb-6 border border-[#D0EBFB] shadow-sm">
                  <DynamicIcon name={card.iconName} size={26} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#0B1C2C]">{card.title}</h3>
                <p className="text-base text-[#475569] mb-8 leading-relaxed">{card.desc}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {card.items.map(t => (
                    <li key={t} className="flex items-center gap-2.5 text-base text-[#334155]">
                      <Check size={16} className="text-[#0066FF] flex-shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <Link href={card.href} className="inline-flex items-center gap-2 font-mono text-[13px] text-[#0066FF] font-semibold group-hover:text-[#004CBE] transition-colors mt-auto">
                  Learn more <span className="transform transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY BOTMARTZ */}
      <section className="section-pad bg-white border-t border-line/50">
        <div className="wrap">
          <div className="text-center mb-16">
            <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-4 font-semibold inline-block">Why Botmartz</div>
            <h2 className="text-[clamp(28px,4vw,38px)] font-semibold mb-4 text-ink">Engineering Excellence. Real World Impact.</h2>
            <p className="text-lg text-[#475569] max-w-[600px] mx-auto">
              We combine deep engineering expertise with cutting-edge AI to deliver solutions that scale.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { iconName: "Code2", title: "Engineering First", desc: "We are engineers, not marketers. Code quality, architecture, and reliability come first." },
              { iconName: "ShieldCheck", title: "Production Focused", desc: "We build systems that are secure, scalable, monitored, and ready for real-world usage." },
              { iconName: "FlaskConical", title: "Research Driven", desc: "We stay at the frontier of AI through research, experiments, and continuous learning." },
              { iconName: "Network", title: "Open & Collaborative", desc: "We believe in open source, community knowledge sharing, and lifting others as we grow." },
              { iconName: "UsersRound", title: "End-to-End Partner", desc: "From strategy and design to deployment and support, we are with you at every step." },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/20 flex items-center justify-center text-[#00B8F0] mb-5">
                  <DynamicIcon name={item.iconName} size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-ink">{item.title}</h3>
                <p className="text-base text-[#475569] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK / LABS */}
      <section id="work" className="section-pad bg-white">
        <div className="wrap">
          <div className="flex flex-wrap justify-between items-end gap-6 mb-12">
            <div>
              <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-3 font-semibold">Featured Projects & Labs</div>
              <h2 className="text-[clamp(26px,3vw,34px)] font-semibold text-ink">Building In Public. Sharing Knowledge.</h2>
              <p className="text-lg text-[#475569] max-w-[500px] mt-3">Explore some of our recent builds and experiments.</p>
            </div>
            <Link href="/work" className="btn btn-ghost text-[#00B8F0] font-semibold border-[#00B8F0]/30 hover:bg-[#00B8F0]/10">
              View All Labs →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {labs.slice(0, 4).map((lab: any, idx: number) => {
              const bgGradients = ["from-[#1E293B] to-[#0F172A]", "from-[#0F172A] to-[#1E3A8A]", "from-[#172554] to-[#020617]", "from-[#312E81] to-[#1E1B4B]"];
              const IconsList = [Code2, Bot, Layers, UsersRound];
              const Icon = IconsList[idx % IconsList.length];
              const tagsArray = Array.isArray(lab.tags) ? lab.tags : (lab.iconName ? lab.iconName.split(",").map((t: string) => t.trim()) : []);
              const techTag = tagsArray[0] || "AI Lab";
              return (
                <div key={idx} className="bg-white rounded-xl overflow-hidden border border-line hover:border-[#00B8F0]/40 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full min-h-[400px]">
                  <div className="h-[180px] relative bg-ink flex items-center justify-center overflow-hidden flex-shrink-0">
                    <div className={`absolute inset-0 bg-gradient-to-tr ${bgGradients[idx % 4]} opacity-90`} />
                    <div className="relative text-white/50 text-[50px] transform group-hover:scale-110 transition-transform duration-500"><Icon /></div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="font-mono text-[10px] uppercase text-[#00B8F0] tracking-wider bg-[#00B8F0]/10 px-2 py-1 rounded-sm inline-block mb-3 self-start">{techTag}</div>
                    <h3 className="text-xl font-semibold mb-2 text-ink">{lab.title}</h3>
                    <p className="text-base text-[#475569] mb-6 line-clamp-3 flex-grow">{lab.description}</p>
                    <Link href={`/work/${lab.slug || 'lab'}`} className="font-mono text-[13px] text-[#00B8F0] font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                      View Project →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STACK LIST */}
      <section className="py-16 bg-white border-b border-line">
        <div className="wrap">
          <div className="text-center mb-8">
            <div className="font-mono text-[11px] tracking-[0.14em] text-[#475569] uppercase font-semibold">Engineering Stack</div>
            <h3 className="text-[22px] font-semibold text-ink mt-2">Built With Modern AI Engineering Stack</h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 opacity-80 max-w-5xl mx-auto">
            {techStackItems.map((tech, i) => (
              <div key={i} className="flex items-center gap-2 text-base font-semibold text-ink">
                <DynamicTechIcon name={tech.iconName} className={`${getTechColor(tech.name, tech.iconName)}`} />
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSIGHTS & COMMUNITY */}
      <section className="section-pad bg-white">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left: Insights */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap justify-between items-end gap-4 mb-8 border-b border-line pb-4">
                <div>
                  <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-2 font-semibold">Engineering Insights</div>
                  <h2 className="text-[26px] font-semibold text-ink">Latest Engineering Insights</h2>
                  <p className="text-base text-[#475569] mt-1">Deep dives, tutorials and technical articles from our engineers.</p>
                </div>
                <Link href="/insights" className="font-mono text-[13px] text-[#00B8F0] font-semibold hover:text-ink transition-colors">View All Insights →</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[
                  { date: "May 25, 2026", read: "5 min read", title: "Hybrid Search for Enterprise RAG: BM25 + Vector Done Right", gradient: "from-[#1E293B] to-transparent" },
                  { date: "May 18, 2026", read: "10 min read", title: "LangGraph vs Google ADK: Choosing the Right Agent Framework", gradient: "from-[#1E3A8A] to-transparent" },
                  { date: "May 10, 2026", read: "8 min read", title: "Evaluating RAG Systems: Beyond Accuracy to Reliability", gradient: "from-[#0F172A] to-transparent" },
                  { date: "May 2, 2026", read: "6 min read", title: "Fine-Tuning Llama 3 for Domain-Specific Code Generation", gradient: "from-[#0F766E] to-transparent" },
                  { date: "April 28, 2026", read: "7 min read", title: "Deploying Vector Databases at Scale: A Kubernetes Guide", gradient: "from-[#9333EA] to-transparent" },
                  { date: "April 15, 2026", read: "12 min read", title: "Securing LLM Endpoints: Rate Limiting & Prompt Injection Defense", gradient: "from-[#B91C1C] to-transparent" },
                ].map((article, i) => (
                  <div key={i} className="group cursor-pointer flex flex-col">
                    <div className="h-[140px] bg-[#050B14] border border-line rounded-xl mb-4 overflow-hidden relative">
                      <div className={`absolute inset-0 bg-gradient-to-tr ${article.gradient} opacity-80`} />
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono text-[#475569] mb-3">
                      <span>{article.date}</span>
                      <span className="w-1 h-1 rounded-full bg-ink/20 block" />
                      <span>{article.read}</span>
                    </div>
                    <h3 className="text-[15px] font-semibold leading-snug mb-2 text-ink group-hover:text-[#00B8F0] transition-colors">{article.title}</h3>
                    <p className="font-mono text-xs text-[#00B8F0] font-semibold mt-auto pt-2">Read More →</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Community */}
            <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-line pt-10 lg:pt-0 lg:pl-12">
              <div className="mb-8">
                <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-2 font-semibold">Community & Events</div>
                <h2 className="text-[26px] font-semibold text-ink">Join the AI Engineering Community</h2>
                <p className="text-base text-[#475569] mt-2">Meetups, workshops, reading clubs and our annual flagship event.</p>
              </div>
              <div className="space-y-6 mb-8">
                {[
                  { iconName: "Ticket", title: "AI Frontier 2026", desc: "The Future of AI Engineering" },
                  { iconName: "MapPin", title: "Monthly Meetups", desc: "Connect. Learn. Build." },
                  { iconName: "Calendar", title: "Reading Club", desc: "Deep-reads. Better engineers." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#00B8F0]/10 border border-[#00B8F0]/20 flex items-center justify-center text-[#00B8F0] flex-shrink-0 shadow-sm">
                      <DynamicIcon name={item.iconName} size={18} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold mb-1 text-ink">{item.title}</h3>
                      <p className="text-sm text-[#475569]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/community" className="font-mono text-[13px] text-[#00B8F0] font-semibold hover:text-ink inline-block mb-10 transition-colors">Explore Community →</Link>
              <div className="bg-[#050B14] border border-[#00B8F0]/20 rounded-xl p-8 relative overflow-hidden text-white shadow-[0_0_30px_rgba(0,184,240,0.1)]">
                <div className="absolute inset-0 blueprint opacity-10 pointer-events-none" />
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#0066FF]/30 blur-3xl rounded-full" />
                <h3 className="text-[22px] font-bold mb-2 relative z-10 tracking-tight">AI FRONTIER<br />2026</h3>
                <p className="text-sm text-[#8A9EB0] mb-6 relative z-10 max-w-[200px]">The Future of<br />AI Engineering</p>
                <Link href="/community" className="btn bg-[#0066FF] hover:bg-[#0052CC] border-none text-white shadow-[0_0_15px_rgba(0,102,255,0.4)] text-[12px] px-5 py-2.5 relative z-10 rounded-lg">
                  Learn More →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="bg-[#050B14] text-white relative py-[100px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050B14] z-0 pointer-events-none" />
        <div className="absolute bottom-[-50%] left-1/2 -translate-x-1/2 w-[100%] h-[100%] bg-[#00B8F0]/10 blur-[150px] rounded-[100%] pointer-events-none" />
        <div className="wrap text-center relative z-10">
          <div className="w-16 h-16 mx-auto mb-8 bg-gradient-to-b from-[#00B8F0] to-[#0066FF] p-[2px] rounded-full shadow-[0_0_30px_rgba(0,184,240,0.3)]">
            <div className="w-full h-full bg-[#050B14] rounded-full flex items-center justify-center">
              <Bot size={28} className="text-[#00B8F0]" />
            </div>
          </div>
          <h2 className="text-[clamp(32px,5vw,48px)] font-semibold mb-4 text-white">Let's Build AI That Makes An Impact</h2>
          <p className="text-[#8A9EB0] max-w-[500px] mx-auto mb-10 text-lg">
            Have a project in mind? Let's discuss how we can help you build it.
          </p>
          <Link href="/contact" className="btn bg-[#0066FF] hover:bg-[#0052CC] border-none text-white shadow-[0_0_15px_rgba(0,102,255,0.4)] font-semibold px-8 py-4 rounded-xl">
            Book a Discovery Call →
          </Link>
        </div>
      </section>
    </>
  );
}
