import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Zap, Globe, Cpu, Users, Building, Terminal, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Botmartz AI Solutions',
  description: 'Botmartz is a premium AI engineering firm specializing in Enterprise RAG and Autonomous Agents. Founded by Soham Sharma.',
  keywords: ['About Botmartz AI', 'AI Engineering Firm', 'Soham Sharma', 'Enterprise AI Company', 'Generative AI Consultants'],
  openGraph: {
    title: 'About Us | Botmartz AI Solutions',
    description: 'Botmartz is a premium AI engineering firm specializing in Enterprise RAG and Autonomous Agents.',
    url: 'https://botmartz.com/about',
    type: 'website',
  },
};

export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Botmartz AI Solutions",
    "description": metadata.description,
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
    <main className="bg-paper min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* HERO SECTION */}
      <section className="relative pt-[80px] pb-[60px] bg-ink text-white overflow-hidden blueprint" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.08) 1px, transparent 1px)' }}>
        <div className="wrap relative z-10 flex flex-col items-center text-center max-w-[800px] mx-auto">
          <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mb-6">
            <Building className="w-8 h-8 text-brand" />
          </div>
          <div className="font-mono text-[11px] text-signal uppercase tracking-[0.12em] mb-4">About Botmartz</div>
          <h1 className="text-[clamp(32px,4.5vw,50px)] leading-[1.05] font-semibold mb-6">
            Engineering the Future.<br/><span className="text-brand">Delivering Impact.</span>
          </h1>
          <p className="text-[17px] text-[#9FB9C8] mb-8 max-w-[600px] mx-auto">
            We are a premium AI engineering firm dedicated to helping enterprises navigate the complexity of Generative AI. We build secure, reliable, and highly scalable AI systems that drive operational efficiency.
          </p>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-[80px] bg-white border-b border-line">
        <div className="wrap">
           <div className="text-center font-mono text-[11px] text-brand uppercase tracking-[0.1em] mb-12">Our Engineering Principles</div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-grid-bg border border-line rounded p-8 flex flex-col items-center text-center">
                 <ShieldCheck className="w-10 h-10 text-brand mb-4" />
                 <h3 className="font-semibold text-[18px] mb-3">Security & Privacy First</h3>
                 <p className="text-[14px] text-ink-soft">We design architectures that prioritize data sovereignty, compliance, and strict access controls above all else.</p>
              </div>
              <div className="bg-grid-bg border border-line rounded p-8 flex flex-col items-center text-center">
                 <Zap className="w-10 h-10 text-brand mb-4" />
                 <h3 className="font-semibold text-[18px] mb-3">Production Readiness</h3>
                 <p className="text-[14px] text-ink-soft">We don't just build prototypes. We engineer systems with comprehensive observability, evaluation, and CI/CD pipelines.</p>
              </div>
              <div className="bg-grid-bg border border-line rounded p-8 flex flex-col items-center text-center">
                 <Target className="w-10 h-10 text-brand mb-4" />
                 <h3 className="font-semibold text-[18px] mb-3">Measurable ROI</h3>
                 <p className="text-[14px] text-ink-soft">AI for the sake of AI is a waste. We focus strictly on solving high-impact business problems that deliver clear returns.</p>
              </div>
           </div>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="py-[80px] bg-paper">
        <div className="wrap flex flex-col lg:flex-row items-center gap-16">
           <div className="lg:w-1/2 w-full">
              <div className="relative w-full aspect-square max-w-[500px] mx-auto">
                 <div className="absolute inset-4 bg-brand/10 border border-brand/20 rounded-full translate-x-4 translate-y-4"></div>
                 <div className="absolute inset-0 bg-ink rounded-full overflow-hidden border border-line shadow-xl">
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
              <div className="font-mono text-[11px] text-brand uppercase tracking-[0.12em] mb-4">Leadership</div>
              <h2 className="text-[36px] font-semibold mb-2">Soham Sharma</h2>
              <p className="text-[16px] text-ink-soft mb-6 font-medium">Founder & GenAI Architect</p>
              
              <p className="text-[15px] text-ink-soft mb-6 leading-relaxed">
                With over a decade of experience spanning product architecture, deep learning, and cloud infrastructure, Soham founded Botmartz to bridge the gap between experimental AI models and production-ready enterprise systems.
              </p>
              <p className="text-[15px] text-ink-soft mb-8 leading-relaxed">
                His expertise lies in designing robust RAG architectures, multi-agent frameworks, and ensuring that AI implementations are secure, compliant, and highly performant. Based in Indore, India, Soham has trained over 15,000 professionals and partnered with 20+ enterprise clients globally.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="flex items-center gap-3">
                    <Terminal className="w-5 h-5 text-brand" />
                    <div>
                       <div className="text-[18px] font-semibold">11+</div>
                       <div className="text-[11px] text-ink-soft font-mono uppercase">Years AI Exp</div>
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-brand" />
                    <div>
                       <div className="text-[18px] font-semibold">20+</div>
                       <div className="text-[11px] text-ink-soft font-mono uppercase">Clients</div>
                    </div>
                 </div>
              </div>
              
              <Link href="/contact" className="btn border border-line hover:border-brand text-ink transition-colors px-6 py-2 rounded-sm text-[13px]">Connect with Soham</Link>
           </div>
        </div>
      </section>
    </main>
  );
}