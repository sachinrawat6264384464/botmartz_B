import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { adminDb } from '@/lib/firebase-admin';
import LabsClient from './LabsClient';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Botmartz Labs | AI Experiments & Open Source',
    description: 'Our labs is where we experiment, build, and open source production-ready AI systems that solve real problems.',
  };
  
  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("labs").get();
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
      url: 'https://botmartz.com/work/labs',
      type: 'website',
    },
  };
}

export default async function LabsPage() {
  let initialLabs: any[] = [];
  try {
    const labsRef = adminDb.collection("labs");
    const snapshot = await labsRef.where("status", "==", "active").orderBy("createdAt", "desc").get();
    initialLabs = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt ? new Date(data.createdAt.toDate()).toISOString() : null,
        updatedAt: data.updatedAt ? new Date(data.updatedAt.toDate()).toISOString() : null,
      };
    });
  } catch (e) {
    try {
      const fallbackSnapshot = await adminDb.collection("labs").get();
      initialLabs = fallbackSnapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt ? new Date(data.createdAt.toDate()).toISOString() : null,
            updatedAt: data.updatedAt ? new Date(data.updatedAt.toDate()).toISOString() : null,
          };
        })
        .filter((d: any) => d.status === "active");
    } catch (err) {
      console.error("Error fetching labs:", err);
    }
  }

  let heroContent = {
    badge: "BOTMARTZ LABS",
    title: "Building Today.<br /><span class=\"text-[#00B8F0]\">Engineering</span> Tomorrow.",
    subtitle: "Our labs is where we experiment, build, and open source production-ready AI systems that solve real problems. Every project is built with a focus on performance, scalability, and real-world impact.",
    ctaText: "Explore All Projects",
    ctaLink: "#projects"
  };

  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("labs").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      if (data?.hero) {
        heroContent = { ...heroContent, ...data.hero };
      }
    }
  } catch (e) {}

  return (
    <main className="bg-[#050B14] min-h-screen">
      {/* ── HERO ── */}
      <section className="relative pt-[120px] pb-[80px] bg-[#050B14] text-white overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="wrap relative z-10 flex flex-col items-center text-center max-w-[900px] mx-auto">
          <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-6 flex items-center justify-center gap-3 font-semibold">
            <span className="w-6 h-px bg-[#00B8F0]"></span>
            {heroContent.badge}
            <span className="w-6 h-px bg-[#00B8F0]"></span>
          </div>
          
          <h1 
            className="text-[clamp(40px,6vw,64px)] leading-[1.05] font-semibold mb-6 tracking-tight text-white"
            dangerouslySetInnerHTML={{ __html: heroContent.title }}
          />
          <p className="text-[17px] sm:text-[19px] text-[#8A9EB0] mb-10 max-w-[650px] leading-relaxed font-light">
            {heroContent.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={heroContent.ctaLink || "#projects"} className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-8 py-3.5 rounded text-[15px] flex items-center gap-2 font-medium">
              {heroContent.ctaText || "Explore All Projects"}
            </Link>
          </div>
        </div>

        {/* 3D Hero Visual Centered Below Text */}
        <div className="mt-16 relative w-full flex justify-center min-h-[400px]">
          {/* Constellation / Network Background */}
          <div className="absolute inset-0 z-0 opacity-20" style={{ 
            backgroundImage: 'radial-gradient(circle at center, #00B8F0 1.5px, transparent 1.5px), radial-gradient(circle at center, #0066FF 1px, transparent 1px)', 
            backgroundSize: '40px 40px, 60px 60px',
            backgroundPosition: '0 0, 20px 20px'
          }} />
          
          {/* Strong central glow behind the image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#0066FF]/20 blur-[100px] rounded-full pointer-events-none z-0" />
          
          <Image 
            src="/labs-hero.png"
            alt="Botmartz Labs"
            width={800}
            height={500}
            className="object-contain w-full max-w-[800px] h-auto relative z-10 drop-shadow-[0_0_30px_rgba(0,184,240,0.15)]"
            priority
          />
        </div>
      </section>

      <LabsClient initialLabs={initialLabs} />
    </main>
  );
}
