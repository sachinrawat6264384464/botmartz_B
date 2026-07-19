import { Metadata } from 'next';
import Link from "next/link";
import { ArrowRight, Calendar, FileText } from "lucide-react";
import { getCachedDynamicPage } from '@/lib/fetch-helpers';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'AI Engineering Services',
    description: 'We design, build, and deploy secure, scalable, and production-ready Enterprise RAG systems and AI Agents that deliver real business impact.',
    keywords: ['AI Engineering Services', 'Enterprise RAG', 'AI Agents', 'LLM Integration'],
  };
  
  try {
    const data = await getCachedDynamicPage("services");
    if (data?.metadata) {
      meta = { ...meta, ...data.metadata };
    }
  } catch (e) {}

  return {
    ...meta,
    openGraph: {
      title: `${meta.title} | Botmartz`,
      description: meta.description,
      url: 'https://www.botmartz.com/services',
      type: 'website',
    },
    alternates: {
      canonical: 'https://www.botmartz.com/services',
    },
  };
}

export default async function ServicesIndexPage() {
  let heroData = {
    badge: "AI Engineering Services",
    title: "We Engineer Production <span className=\"text-[#00B8F0]\">AI Systems</span> That Deliver Real Business Impact.",
    subtitle: "We design, build, and deploy secure, scalable, and production-ready Enterprise RAG systems and AI Agents that help organizations automate knowledge, streamline workflows, and drive growth."
  };

  try {
    const data = await getCachedDynamicPage("services");
    if (data?.hero) {
      heroData = { ...heroData, ...data.hero };
    }
  } catch (e) {}

  return (
    <main className="bg-[#050B14] min-h-screen text-white">
      {/* HERO SECTION */}
      <section className="relative pt-[120px] pb-[80px] bg-[#050B14] text-white overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="wrap relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-6 flex items-center gap-3 font-semibold">
              <span className="w-6 h-px bg-[#00B8F0]"></span>
              {heroData.badge}
            </div>
            <h1 
              className="text-[clamp(36px,5vw,56px)] leading-[1.1] font-semibold mb-6 tracking-tight text-white"
              dangerouslySetInnerHTML={{ __html: heroData.title }}
            />
            <p className="text-[17px] text-[#8A9EB0] max-w-[540px] mb-8">
              {heroData.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-6 py-3 rounded text-[14px]">Book a Discovery Call →</Link>
              <Link href="/work/case-studies" className="btn btn-ghost border border-[#1E293B] text-white hover:border-[#00B8F0] hover:text-[#00B8F0] px-6 py-3 rounded text-[14px] transition-colors">Explore Case Studies ↗</Link>
            </div>
          </div>
          <div className="flex-1 hidden lg:block">
            {/* Abstract AI Graphic Placeholder */}
            <div className="w-full aspect-square max-w-[500px] ml-auto relative">
               <div className="absolute inset-0 flex items-center justify-center">
                 {/* Decorative circles representing nodes */}
                 <div className="w-64 h-64 border border-[#00B8F0]/30 rounded-full absolute animate-[spin_20s_linear_infinite]" />
                 <div className="w-48 h-48 border border-[#FF3366]/40 rounded-full absolute animate-[spin_15s_linear_infinite_reverse]" />
                 <div className="w-32 h-32 bg-gradient-to-br from-[#00B8F0] to-[#0A111F] rounded-2xl rotate-12 flex items-center justify-center shadow-[0_0_40px_rgba(0,184,240,0.4)]">
                   <div className="w-16 h-16 bg-white/10 rounded-xl backdrop-blur-sm" />
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <div className="bg-[#0A111F] border-b border-[#1E293B] py-6">
        <div className="wrap flex flex-wrap items-center justify-between gap-6 text-[#5B6B7C] font-mono text-[12px] uppercase tracking-wider">
          <span>Trusted by Innovative Companies</span>
          <div className="flex flex-wrap gap-8 opacity-70">
            <span>EduBridge</span>
            <span>ShipSure</span>
            <span>LexIntell</span>
            <span>DataKraft</span>
            <span>NextLearn</span>
          </div>
        </div>
      </div>

      {/* CORE SERVICES */}
      <section className="section-pad">
        <div className="wrap text-center mb-[50px]">
          <div className="font-mono text-[11px] text-[#00B8F0] uppercase tracking-[0.1em] mb-4 flex justify-center items-center gap-3">Our Core Services</div>
          <h2 className="text-[34px] font-semibold mb-4 text-white">AI Solutions Built for Production.</h2>
          <p className="text-[15.5px] text-[#8A9EB0] max-w-[500px] mx-auto">
            We focus on solving real business problems with two core capabilities backed by robust engineering and seamless integrations.
          </p>
        </div>
        
        <div className="wrap grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[960px] mx-auto">
          {/* Service 1 */}
          <div className="bg-[#0A111F] border border-[#1E293B] p-8 transition-colors hover:border-[#00B8F0] rounded-sm">
            <div className="w-12 h-12 bg-[#050B14] rounded-lg flex items-center justify-center mb-6 border border-[#1E293B]">
              <div className="w-6 h-6 bg-[#00B8F0]/20 rounded" />
            </div>
            <h3 className="text-[20px] font-semibold mb-3 text-white">Enterprise RAG</h3>
            <p className="text-[14px] text-[#8A9EB0] mb-6">Transform enterprise knowledge into actionable intelligence.</p>
            <ul className="space-y-2.5 mb-8">
              {['Knowledge Search', 'Document Intelligence', 'PDF AI & Q&A', 'Enterprise Search', 'Support AI Copilots'].map(i => (
                <li key={i} className="flex items-center gap-2 text-[13.5px] text-[#8A9EB0]">
                  <span className="text-[#00B8F0]">✓</span> {i}
                </li>
              ))}
            </ul>
            <Link href="/services/enterprise-rag" className="font-mono text-[12px] text-[#00B8F0] hover:underline">Learn more →</Link>
          </div>
          
          {/* Service 2 */}
          <div className="bg-[#0A111F] border border-[#1E293B] p-8 transition-colors hover:border-[#00B8F0] relative overflow-hidden rounded-sm">
             {/* Subtle gradient glow */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#00B8F0]/5 blur-3xl rounded-full" />
            <div className="w-12 h-12 bg-[#050B14] rounded-lg flex items-center justify-center mb-6 border border-[#1E293B] relative z-10">
              <div className="w-6 h-6 bg-[#FF3366]/20 rounded-full" />
            </div>
            <h3 className="text-[20px] font-semibold mb-3 relative z-10 text-white">AI Agents</h3>
            <p className="text-[14px] text-[#8A9EB0] mb-6 relative z-10">Build intelligent agents that automate complex tasks and workflows.</p>
            <ul className="space-y-2.5 mb-8 relative z-10">
              {['Customer Support Agents', 'Research & Analysis Agents', 'Sales & SDR Agents', 'Workflow Automation', 'Internal AI Assistants'].map(i => (
                <li key={i} className="flex items-center gap-2 text-[13.5px] text-[#8A9EB0]">
                  <span className="text-[#00B8F0]">✓</span> {i}
                </li>
              ))}
            </ul>
            <Link href="/services/ai-agents" className="font-mono text-[12px] text-[#00B8F0] relative z-10 hover:underline">Learn more →</Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE BOTMARTZ */}
      <section className="section-pad bg-[#050B14]">
        <div className="wrap text-center mb-12">
          <div className="font-mono text-[11px] text-[#00B8F0] uppercase tracking-[0.1em] mb-4 flex justify-center items-center gap-3">Why Choose Botmartz</div>
          <h2 className="text-[30px] font-semibold mb-4 text-white">Engineering Excellence. Built for the Real World.</h2>
          <p className="text-[15px] text-[#8A9EB0] max-w-[600px] mx-auto">
            We combine deep engineering expertise with a production-first mindset to deliver AI systems that scale.
          </p>
        </div>
        <div className="wrap grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {[
            { t: 'Production-First', d: 'Secure, reliable, monitored, and ready for real-world usage.' },
            { t: 'Modern Architecture', d: 'Clean, modular, and scalable architectures built for maintainability.' },
            { t: 'Research-Driven', d: 'We stay at the frontier of AI through experiments and learning.' },
            { t: 'Secure & Compliant', d: 'Security and privacy built in at every layer of the lifecycle.' },
            { t: 'Collaborative Partner', d: 'We work as an extension of your team for long-term success.' },
            { t: 'End-to-End Delivery', d: 'From strategy and design to deployment and support.' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-10 h-10 bg-[#0A111F] border border-[#1E293B] rounded-full flex items-center justify-center mb-4 text-[#00B8F0] font-mono text-[14px]">0{i+1}</div>
              <h3 className="text-[15px] font-semibold mb-2 text-white">{item.t}</h3>
              <p className="text-[13px] text-[#8A9EB0] leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STACK */}
      <section className="border-b border-t border-[#1E293B] bg-[#0A111F]">
        <div className="wrap flex flex-col md:flex-row items-center">
          <div className="font-mono text-[11px] text-[#00B8F0] uppercase tracking-[0.08em] py-4 pr-8 border-b md:border-b-0 md:border-r border-[#1E293B] w-full md:w-auto text-center md:text-left">Powered By Modern AI Engineering Stack</div>
          <div className="flex flex-wrap flex-1">
            {['PyTorch', 'LangGraph', 'LangChain', 'FastAPI', 'Google ADK', 'TensorFlow'].map((tech, i) => (
              <div key={tech} className="flex-1 min-w-[120px] p-[16px_10px] font-mono text-[12px] text-[#8A9EB0] text-center border-r border-[#1E293B] last:border-r-0">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS IN ACTION */}
      <section className="section-pad bg-[#050B14]">
        <div className="wrap">
          <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
            <div>
              <div className="font-mono text-[11px] text-[#00B8F0] uppercase tracking-[0.1em] mb-4 flex items-center gap-3">Solutions in Action</div>
              <h2 className="text-[34px] font-semibold text-white">Real Problems. Real Impact.</h2>
              <p className="text-[15.5px] text-[#8A9EB0] mt-2">Explore how we've helped organizations unlock the power of AI.</p>
            </div>
            <Link href="/work/case-studies" className="btn btn-ghost border border-[#1E293B] text-white hover:border-[#00B8F0] px-6 py-2 rounded text-[14px] transition-colors">View All Case Studies →</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-[#1E293B] rounded-sm overflow-hidden group cursor-pointer hover:border-[#00B8F0] transition-colors">
              <div className="h-[180px] bg-[#0A111F] border-b border-[#1E293B] p-6 relative">
                 <div className="absolute inset-x-6 bottom-0 h-32 bg-[#050B14] rounded-t-lg border border-b-0 border-[#1E293B]"></div>
              </div>
              <div className="p-6 bg-[#0A111F]">
                <div className="font-mono text-[10px] text-[#00B8F0] uppercase bg-[#00B8F0]/10 inline-block px-2 py-1 rounded mb-3">Enterprise RAG</div>
                <h3 className="text-[18px] font-semibold mb-2 text-white">Enterprise Knowledge Search</h3>
                <p className="text-[13.5px] text-[#8A9EB0] mb-4">Built a secure RAG system to unify search across 50K+ internal documents.</p>
                <div className="font-mono text-[12px] text-[#00B8F0] flex items-center gap-2 group-hover:gap-3 transition-all">Read Case Study <ArrowRight className="w-3 h-3" /></div>
              </div>
            </div>
            <div className="border border-[#1E293B] rounded-sm overflow-hidden group cursor-pointer hover:border-[#00B8F0] transition-colors">
              <div className="h-[180px] bg-[#0A111F] border-b border-[#1E293B] p-6 relative">
                 <div className="absolute right-6 top-6 bottom-0 w-32 bg-[#050B14] rounded-t-lg border border-b-0 border-[#1E293B]"></div>
              </div>
              <div className="p-6 bg-[#0A111F]">
                <div className="font-mono text-[10px] text-[#00B8F0] uppercase bg-[#00B8F0]/10 inline-block px-2 py-1 rounded mb-3">AI Agents</div>
                <h3 className="text-[18px] font-semibold mb-2 text-white">AI Support Agent</h3>
                <p className="text-[13.5px] text-[#8A9EB0] mb-4">Developed an AI support agent that resolved 70% of queries automatically.</p>
                <div className="font-mono text-[12px] text-[#00B8F0] flex items-center gap-2 group-hover:gap-3 transition-all">Read Case Study <ArrowRight className="w-3 h-3" /></div>
              </div>
            </div>
            <div className="border border-[#1E293B] rounded-sm overflow-hidden group cursor-pointer hover:border-[#00B8F0] transition-colors">
              <div className="h-[180px] bg-[#0A111F] border-b border-[#1E293B] p-6 relative">
                 <div className="absolute inset-6 bg-[#050B14] rounded-lg border border-[#1E293B]"></div>
              </div>
              <div className="p-6 bg-[#0A111F]">
                <div className="font-mono text-[10px] text-[#00B8F0] uppercase bg-[#00B8F0]/10 inline-block px-2 py-1 rounded mb-3">AI Automation</div>
                <h3 className="text-[18px] font-semibold mb-2 text-white">AI SDR for Outreach</h3>
                <p className="text-[13.5px] text-[#8A9EB0] mb-4">Built an autonomous SDR agent that personalizes outreach and books 3X more meetings.</p>
                <div className="font-mono text-[12px] text-[#00B8F0] flex items-center gap-2 group-hover:gap-3 transition-all">Read Case Study <ArrowRight className="w-3 h-3" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-[80px]">
        <div className="wrap">
          <div className="bg-[#0A111F] border border-[#1E293B] rounded-[24px] p-[40px] md:p-[60px] text-white flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden">
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            <div className="relative z-10 max-w-[480px]">
              <div className="font-mono text-[11px] text-[#00B8F0] uppercase tracking-[0.12em] mb-3">Ready to build together?</div>
              <h2 className="text-[36px] font-semibold leading-[1.1] mb-4">Let's Engineer AI Solutions That <span className="text-[#FF3366]">Drive Real Results.</span></h2>
              <p className="text-[15px] text-[#8A9EB0] mb-8">Book a free discovery call and let's discuss how we can solve your most critical challenges with AI.</p>
              <Link href="/contact" className="btn btn-primary bg-[#00B8F0] hover:bg-[#0096C7] px-6 py-3 rounded text-[14px]">Book a Discovery Call →</Link>
            </div>

            <div className="relative z-10 flex flex-col gap-4 w-full max-w-[340px]">
              <div className="bg-[#050B14] border border-[#1E293B] rounded-xl p-5 flex gap-4 items-start">
                <div className="bg-[#00B8F0]/10 border border-[#00B8F0]/20 p-2.5 rounded-lg text-[#00B8F0]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[15px] mb-1 text-white">Free Discovery Call</h3>
                  <p className="text-[13px] text-[#8A9EB0]">60-minute strategy session with our AI engineering experts.</p>
                </div>
              </div>
              <div className="bg-[#050B14] border border-[#1E293B] rounded-xl p-5 flex gap-4 items-start">
                <div className="bg-[#00B8F0]/10 border border-[#00B8F0]/20 p-2.5 rounded-lg text-[#00B8F0]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[15px] mb-1 text-white">Custom AI Roadmap</h3>
                  <p className="text-[13px] text-[#8A9EB0]">Get a tailored roadmap and project estimation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}