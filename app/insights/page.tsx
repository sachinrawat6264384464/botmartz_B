import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { adminDb } from '@/lib/firebase-admin';
import InsightsListingSection from './InsightsListingSection';
import WriterRegistrationModal from './_components/WriterRegistrationModal';
import OpenWriterModalButton from './_components/OpenWriterModalButton';


export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'AI Engineering Insights & Architecture Deep Dives | Botmartz',
    description: 'Deep dives, technical tutorials, and architecture breakdowns on enterprise RAG, LangGraph multi-agent systems, and production model serving.',
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
      title: `${meta.title} | Botmartz`,
      description: meta.description,
      url: 'https://www.botmartz.com/insights',
      type: 'website',
      images: [{
        url: 'https://www.botmartz.com/images/insights/microservices-vs-monolith-ai-systems.jpg',
        width: 1200,
        height: 630,
        alt: 'Botmartz Engineering Insights and Systems Architecture',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${meta.title} | Botmartz`,
      description: meta.description,
      images: ['https://www.botmartz.com/images/insights/microservices-vs-monolith-ai-systems.jpg'],
    },
    alternates: {
      canonical: 'https://www.botmartz.com/insights',
    },
  };
}

export default async function InsightsPage() {
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

  let dbArticles: any[] = [];
  try {
    const snapshot = await adminDb.collection("blog-posts")
      .where("status", "==", "published")
      .orderBy("createdAt", "desc")
      .get();
    dbArticles = snapshot.docs.map(doc => {
        const data = doc.data();
        const formatTimestamp = (ts: any) => {
          if (!ts) return null;
          if (typeof ts.toDate === 'function') {
            return new Date(ts.toDate()).toISOString();
          }
          return new Date(ts).toISOString();
        };
        return {
          id: doc.id,
          ...data,
          createdAt: formatTimestamp(data.createdAt),
        };
    });
  } catch (err) {
    console.error("Error loading blog posts from firestore:", err);
  }

  // Only display articles strictly published in Firestore
  const sanitizedArticles = JSON.parse(JSON.stringify(dbArticles));

  return (
    <main className="bg-white min-h-screen">
      {/* HERO SECTION (ARCHITECTURAL LIGHT CANVAS) */}
      <section className="relative pt-[120px] pb-[70px] bg-white text-slate-900 border-b border-slate-200/80 overflow-hidden">
        {/* Subtle architectural grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />
        {/* Luminous ambient accents */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="wrap relative z-10 flex flex-col lg:flex-row items-center gap-12">
          
          <div className="flex-1 lg:max-w-[600px]">
            <div className="font-mono text-[11px] tracking-[0.14em] text-[#0284C7] uppercase mb-4 flex items-center gap-3 font-semibold">
              <span className="w-6 h-px bg-[#0284C7]"></span>
              {heroData.badge}
            </div>
            <h1 
              className="text-[clamp(36px,5vw,54px)] leading-[1.1] font-bold mb-6 tracking-tight text-slate-950"
              dangerouslySetInnerHTML={{ __html: heroData.title.replace('text-white', 'text-slate-950') }}
            />
            <p className="text-[17px] text-slate-600 mb-8 max-w-[500px] leading-relaxed">
              {heroData.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="#articles" className="btn bg-slate-950 text-white font-semibold hover:bg-slate-800 px-6 py-3 rounded-lg text-[14px] flex items-center gap-2 transition-all shadow-sm">
                Explore All Articles <ArrowRight className="w-4 h-4 text-[#00B8F0]" />
              </Link>
              <OpenWriterModalButton />
            </div>
          </div>

          <div className="flex-1 w-full relative hidden lg:flex items-center justify-center min-h-[440px]">
            {/* Architectural Blueprint Network */}
            <div className="absolute inset-0 z-0 opacity-15" style={{ 
              backgroundImage: 'radial-gradient(circle at center, #0284C7 1.5px, transparent 1.5px)', 
              backgroundSize: '36px 36px',
            }} />
            
            <Image 
              src="/eng-i-removebg-preview.png"
              alt="Engineering Insights"
              width={640}
              height={440}
              priority
              className="object-contain w-full h-auto max-w-[620px] relative z-10 drop-shadow-[0_12px_30px_rgba(0,184,240,0.12)]"
            />
          </div>

        </div>
      </section>

      {/* MAIN BODY CONTENT (EXACT SCREENSHOT DESIGN) */}
      <InsightsListingSection dbArticles={sanitizedArticles} />

    </main>
  );
}
