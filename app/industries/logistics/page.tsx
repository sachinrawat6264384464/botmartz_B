import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Truck, Map, Package, Activity, BarChart, Database, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Solutions for Logistics & Supply Chain | Botmartz AI',
  description: 'Optimize operations, streamline communications, and improve decision-making with AI-powered logistics planners and intelligent search.',
  keywords: ['AI in Logistics', 'Supply Chain AI', 'Logistics Planner Agent', 'Shipment Tracking Assistant', 'Document Extraction AI', 'Generative AI Logistics'],
  openGraph: {
    title: 'AI Solutions for Logistics & Supply Chain | Botmartz AI',
    description: 'Optimize operations, streamline communications, and improve decision-making with AI.',
    url: 'https://botmartz.com/industries/logistics',
    type: 'website',
  },
};

export default function LogisticsIndustryPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AI Solutions for Logistics",
    "description": metadata.description,
    "provider": {
      "@type": "Organization",
      "name": "Botmartz AI Solutions"
    }
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* HERO SECTION */}
      <section className="relative pt-[80px] pb-[60px] bg-ink text-white overflow-hidden blueprint" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.08) 1px, transparent 1px)' }}>
        <div className="wrap relative z-10 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 lg:max-w-[600px]">
            <div className="font-mono text-[11px] text-signal uppercase tracking-[0.12em] mb-4 flex items-center gap-2">
              <Link href="/industries" className="hover:text-white transition-colors">Industries</Link> <span>/</span> <span className="text-white">Logistics</span>
            </div>
            <h1 className="text-[clamp(32px,4.5vw,50px)] leading-[1.05] font-semibold mb-6">
              AI Solutions for <span className="text-brand">Global Logistics.</span>
            </h1>
            <p className="text-[17px] text-[#9FB9C8] mb-8">
              Optimize operations, streamline communications, and improve decision-making with AI-powered agents and intelligent enterprise search.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn btn-primary bg-brand text-white hover:bg-deep">Discuss Your Use Case →</Link>
            </div>
          </div>
          
          <div className="flex-1 w-full lg:block border-l border-white/10 lg:pl-12 flex flex-col justify-center">
             <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm relative">
                <Truck className="w-10 h-10 text-brand mb-4" />
                <h3 className="text-[20px] font-semibold mb-2">Visibility & Optimization at Scale</h3>
                <p className="text-[14px] text-[#9FB9C8]">We deploy intelligent systems that ingest unstructured logistics data (emails, PDFs, invoices) and transform them into actionable operations.</p>
             </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="section-pad">
        <div className="wrap text-center mb-[60px]">
          <div className="eyebrow justify-center">Key Use Cases</div>
          <h2 className="text-[34px] font-semibold mb-4">Driving Supply Chain Efficiency.</h2>
        </div>
        
        <div className="wrap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <div className="bg-white border border-line p-6 rounded shadow-sm hover:border-brand transition-colors">
              <Map className="w-8 h-8 text-brand mb-4" />
              <h4 className="font-semibold text-[18px] mb-2">Logistics Planner Agents</h4>
              <p className="text-[14px] text-ink-soft">Autonomous agents that analyze traffic, weather, and shipment data to recommend optimal routes and preempt delays.</p>
           </div>
           
           <div className="bg-white border border-line p-6 rounded shadow-sm hover:border-brand transition-colors">
              <Package className="w-8 h-8 text-brand mb-4" />
              <h4 className="font-semibold text-[18px] mb-2">Document & Invoice Intelligence</h4>
              <p className="text-[14px] text-ink-soft">Automatically extract structured data from unstructured bills of lading, customs documents, and invoices.</p>
           </div>
           
           <div className="bg-white border border-line p-6 rounded shadow-sm hover:border-brand transition-colors">
              <Activity className="w-8 h-8 text-brand mb-4" />
              <h4 className="font-semibold text-[18px] mb-2">Shipment Tracking Assistants</h4>
              <p className="text-[14px] text-ink-soft">Customer-facing AI that provides real-time, conversational updates on cargo status and resolves support queries.</p>
           </div>
        </div>
      </section>

      {/* CASE STUDY HIGHLIGHT */}
      <section className="section-pad bg-paper border-t border-line">
        <div className="wrap flex flex-col md:flex-row items-center gap-12">
           <div className="md:w-1/2">
              <div className="font-mono text-[11px] text-brand uppercase tracking-[0.08em] mb-3">Featured Case Study</div>
              <h2 className="text-[30px] font-semibold mb-4">Enterprise Knowledge Search for Global Logistics</h2>
              <p className="text-[15px] text-ink-soft mb-6">
                We built a secure enterprise RAG system to unify and search across 500K+ internal documents, complex Standard Operating Procedures (SOPs), and manuals, enabling operations teams to find answers instantly.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                 <div>
                    <div className="text-[24px] font-semibold text-brand mb-1">70%</div>
                    <div className="text-[12px] text-ink-soft">Faster information retrieval</div>
                 </div>
                 <div>
                    <div className="text-[24px] font-semibold text-brand mb-1">3.2x</div>
                    <div className="text-[12px] text-ink-soft">Increase in team productivity</div>
                 </div>
              </div>
              <Link href="/work/case-studies" className="font-mono text-[13px] text-brand flex items-center gap-2 hover:gap-3 transition-all">View All Case Studies <ArrowRight className="w-3.5 h-3.5" /></Link>
           </div>
           <div className="md:w-1/2 w-full">
              <div className="bg-white border border-line p-8 rounded shadow-sm w-full min-h-[300px] flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-grid-bg opacity-50"></div>
                 <div className="relative z-10 w-full max-w-[340px] bg-white border border-line rounded-lg shadow-xl overflow-hidden">
                    <div className="bg-brand text-white p-3 font-semibold text-[13px] flex items-center gap-2"><MapPin className="w-4 h-4"/> Ops Agent</div>
                    <div className="p-4 bg-gray-50 flex flex-col gap-3">
                       <div className="bg-white border border-line rounded p-2.5 text-[12px] self-end max-w-[80%]">What is the SOP for hazardous material handling in port 4?</div>
                       <div className="bg-brand/5 border border-brand/20 rounded p-2.5 text-[12px] self-start max-w-[80%] text-ink">For Port 4, Hazmat requires Form 82-B clearance prior to arrival... <br/><br/><span className="text-brand font-mono text-[10px]">Source: Safety_Manual_v2.pdf</span></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[80px] bg-white">
        <div className="wrap text-center max-w-[600px] mx-auto">
          <h2 className="text-[32px] font-semibold leading-[1.1] mb-4">Ready to optimize your supply chain?</h2>
          <p className="text-[15px] text-ink-soft mb-8">Let's build secure, accurate AI solutions for your logistics operations.</p>
          <Link href="/contact" className="btn btn-primary bg-brand hover:bg-deep">Book a Discovery Call →</Link>
        </div>
      </section>
    </main>
  );
}
