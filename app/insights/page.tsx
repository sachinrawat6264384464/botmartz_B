import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { adminDb } from '@/lib/firebase-admin';
import InsightsListingSection from './InsightsListingSection';
import WriterRegistrationModal from './_components/WriterRegistrationModal';
import OpenWriterModalButton from './_components/OpenWriterModalButton';

import { getAllLocalBlogs } from '@/lib/localBlogs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Engineering Insights',
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
      title: `${meta.title} | Botmartz`,
      description: meta.description,
      url: 'https://www.botmartz.com/insights',
      type: 'website',
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
    console.error("Error loading blog posts:", err);
  }

  // Load all 86 local markdown blogs
  const localArticles = getAllLocalBlogs();
  const dbSlugs = new Set(dbArticles.map((a: any) => a.slug));
  const combinedArticles = [
    ...dbArticles,
    ...localArticles.filter((la) => !dbSlugs.has(la.slug)),
  ];

  const sanitizedArticles = JSON.parse(JSON.stringify(combinedArticles));

  return (
    <main className="bg-white min-h-screen">
      <WriterRegistrationModal />
      
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
            <p className="text-[17px] text-slate-300 mb-8 max-w-[500px] leading-relaxed">
              {heroData.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="#articles" className="btn btn-primary bg-[#00B8F0] text-slate-950 font-semibold hover:bg-[#0096C7] px-6 py-3 rounded text-[14px] flex items-center gap-2 transition-all">
                Explore All Articles <ArrowRight className="w-4 h-4" />
              </Link>
              <OpenWriterModalButton />
              <a href="#" className="btn border border-slate-700 hover:border-[#00B8F0] hover:text-[#00B8F0] transition-colors text-slate-300 px-6 py-3 rounded text-[14px] flex items-center gap-2">
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
              sizes="(max-width: 1024px) 1px, 700px"
              className="object-contain w-full h-auto max-w-[700px] relative z-10 drop-shadow-[0_0_20px_rgba(0,184,240,0.15)]"
            />
          </div>

        </div>
      </section>

      {/* MAIN BODY CONTENT (EXACT SCREENSHOT DESIGN) */}
      <InsightsListingSection dbArticles={sanitizedArticles} />

    </main>
  );
}
