import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Zap, Globe, Cpu, Users, Building, Terminal, Target } from 'lucide-react';
import { adminDb } from '@/lib/firebase-admin';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'About Us | Botmartz AI Solutions',
    description: 'Botmartz is a premium AI engineering firm specializing in Enterprise RAG and Autonomous Agents. Founded by Soham Sharma.',
    keywords: ['About Botmartz AI', 'AI Engineering Firm', 'Soham Sharma', 'Enterprise AI Company', 'Generative AI Consultants'],
  };
  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("about").get();
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
      url: 'https://botmartz.com/about',
      type: 'website',
    },
  };
}

export default async function AboutPage() {
  let metaDesc = 'Botmartz is a premium AI engineering firm specializing in Enterprise RAG and Autonomous Agents. Founded by Soham Sharma.';
  let heroData = {
    badge: "About Botmartz",
    title: "Engineering the Future.<br/><span className=\"text-[#00B8F0]\">Delivering Impact.</span>",
    subtitle: "We are a premium AI engineering firm dedicated to helping enterprises navigate the complexity of Generative AI. We build secure, reliable, and highly scalable AI systems that drive operational efficiency."
  };

  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("about").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      if (data?.metadata?.description) metaDesc = data.metadata.description;
      if (data?.hero) heroData = { ...heroData, ...data.hero };
    }
  } catch (e) {}

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Botmartz AI Solutions",
    "description": metaDesc,
    "mainEntity": {
      "@type": "Organization",
      "name": "Botmartz AI Solutions",
      "founder": {
        "@type": "Person",
        "name": "Soham Sharma",
        "jobTitle": "GenAI Architect & Founder"
      },
      "foundingLocation": {
        "@type": "Place",
        "name": "Indore, India"
      }
    }
  };

  return (
    <main className="bg-[#050B14] min-h-screen text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* HERO SECTION */}
      <section className="relative pt-[120px] pb-[80px] bg-[#050B14] text-white overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="wrap relative z-10 flex flex-col items-center text-center max-w-[800px] mx-auto">
          <div className="w-16 h-16 bg-[#00B8F0]/10 border border-[#00B8F0]/30 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,184,240,0.2)]">
            <Building className="w-8 h-8 text-[#00B8F0]" />
          </div>
          <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-4 flex items-center gap-3 font-semibold justify-center">
            <span className="w-6 h-px bg-[#00B8F0]"></span>
            {heroData.badge}
            <span className="w-6 h-px bg-[#00B8F0]"></span>
          </div>
          <h1 
            className="text-[clamp(36px,4.5vw,56px)] leading-[1.1] font-semibold mb-6 tracking-tight text-white"
            dangerouslySetInnerHTML={{ __html: heroData.title }}
          />
          <p className="text-[17px] text-[#8A9EB0] mb-8 max-w-[600px] mx-auto">
            {heroData.subtitle}
          </p>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-[80px] bg-[#0A111F] border-b border-[#1E293B]">
        <div className="wrap">
           <div className="text-center font-mono text-[11px] text-[#00B8F0] uppercase tracking-[0.1em] mb-12">Our Engineering Principles</div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#050B14] border border-[#1E293B] rounded p-8 flex flex-col items-center text-center">
                 <ShieldCheck className="w-10 h-10 text-[#00B8F0] mb-4" />
                 <h3 className="font-semibold text-[18px] mb-3 text-white">Security & Privacy First</h3>
                 <p className="text-[14px] text-[#8A9EB0]">We design architectures that prioritize data sovereignty, compliance, and strict access controls above all else.</p>
              </div>
              <div className="bg-[#050B14] border border-[#1E293B] rounded p-8 flex flex-col items-center text-center">
                 <Zap className="w-10 h-10 text-[#00B8F0] mb-4" />
                 <h3 className="font-semibold text-[18px] mb-3 text-white">Production Readiness</h3>
                 <p className="text-[14px] text-[#8A9EB0]">We don't just build prototypes. We engineer systems with comprehensive observability, evaluation, and CI/CD pipelines.</p>
              </div>
              <div className="bg-[#050B14] border border-[#1E293B] rounded p-8 flex flex-col items-center text-center">
                 <Target className="w-10 h-10 text-[#00B8F0] mb-4" />
                 <h3 className="font-semibold text-[18px] mb-3 text-white">Measurable ROI</h3>
                 <p className="text-[14px] text-[#8A9EB0]">AI for the sake of AI is a waste. We focus strictly on solving high-impact business problems that deliver clear returns.</p>
              </div>
           </div>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="py-[80px] bg-[#050B14]">
        <div className="wrap flex flex-col lg:flex-row items-center gap-16">
           <div className="lg:w-1/2 w-full">
              <div className="relative w-full aspect-square max-w-[500px] mx-auto">
                 <div className="absolute inset-4 bg-[#00B8F0]/10 border border-[#00B8F0]/20 rounded-full translate-x-4 translate-y-4"></div>
                 <div className="absolute inset-0 bg-[#0A111F] rounded-full overflow-hidden border border-[#1E293B] shadow-xl">
                    <Image 
                      src="/Sohamsharma2.jpeg" 
                      alt="Soham Sharma - Founder & GenAI Architect" 
                      fill 
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                    />
                 </div>
              </div>
           </div>
           
           <div className="lg:w-1/2">
              <div className="font-mono text-[11px] text-[#00B8F0] uppercase tracking-[0.12em] mb-4">Leadership</div>
              <h2 className="text-[36px] font-semibold mb-2 text-white">Soham Sharma</h2>
              <p className="text-[16px] text-[#8A9EB0] mb-6 font-medium">Founder & GenAI Architect</p>
              
              <p className="text-[15px] text-[#8A9EB0] mb-6 leading-relaxed">
                With a deep background in product architecture, machine learning, and cloud infrastructure, Soham founded Botmartz to bridge the gap between experimental AI prototypes and production-ready enterprise systems.
              </p>
              <p className="text-[15px] text-[#8A9EB0] mb-8 leading-relaxed">
                His practice focuses strictly on designing robust RAG architectures, multi-agent workflows, and rigorous evaluation pipelines that ensure AI implementations remain grounded, secure, and performant under production workloads.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                 <div className="bg-[#0A111F] border border-[#1E293B] rounded-lg p-4 flex flex-col justify-center">
                    <div className="text-[20px] font-bold text-[#00B8F0]">Production</div>
                    <div className="text-[11px] text-[#8A9EB0] font-mono uppercase mt-1">Systems Shipped</div>
                 </div>
                 <div className="bg-[#0A111F] border border-[#1E293B] rounded-lg p-4 flex flex-col justify-center">
                    <div className="text-[20px] font-bold text-[#00B8F0]">Grounded</div>
                    <div className="text-[11px] text-[#8A9EB0] font-mono uppercase mt-1">Zero Hallucination</div>
                 </div>
                 <div className="bg-[#0A111F] border border-[#1E293B] rounded-lg p-4 flex flex-col justify-center">
                    <div className="text-[20px] font-bold text-[#00B8F0]">99%+</div>
                    <div className="text-[11px] text-[#8A9EB0] font-mono uppercase mt-1">Reliability Target</div>
                 </div>
              </div>
              
              <Link href="/contact" className="btn border border-[#1E293B] hover:border-[#00B8F0] text-white transition-colors px-6 py-2 rounded-sm text-[13px]">Connect with Soham</Link>
           </div>
        </div>
      </section>
    </main>
  );
}