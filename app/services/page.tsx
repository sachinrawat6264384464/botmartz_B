import Link from "next/link";
import { ArrowRight, Calendar, FileText } from "lucide-react";

export default function ServicesIndexPage() {
  return (
    <main>
      {/* HERO SECTION */}
      <section className="relative pt-[80px] pb-[70px] bg-ink text-white overflow-hidden blueprint" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.08) 1px, transparent 1px)' }}>
        <div className="wrap relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <div className="font-mono text-[11px] text-signal uppercase tracking-[0.12em] mb-4">AI Engineering Services</div>
            <h1 className="text-[clamp(32px,5vw,56px)] leading-[1.1] font-semibold mb-6">
              We Engineer Production <span className="text-brand">AI Systems</span> That Deliver Real Business Impact.
            </h1>
            <p className="text-[17px] text-[#9FB9C8] max-w-[540px] mb-8">
              We design, build, and deploy secure, scalable, and production-ready Enterprise RAG systems and AI Agents that help organizations automate knowledge, streamline workflows, and drive growth.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn btn-primary bg-brand text-white hover:bg-deep">Book a Discovery Call →</Link>
              <Link href="/work/case-studies" className="btn btn-ghost border-line text-white hover:border-brand hover:text-brand">Explore Case Studies ↗</Link>
            </div>
          </div>
          <div className="flex-1 hidden lg:block">
            {/* Abstract AI Graphic Placeholder */}
            <div className="w-full aspect-square max-w-[500px] ml-auto relative">
               <div className="absolute inset-0 flex items-center justify-center">
                 {/* Decorative circles representing nodes */}
                 <div className="w-64 h-64 border border-brand/30 rounded-full absolute animate-[spin_20s_linear_infinite]" />
                 <div className="w-48 h-48 border border-signal/40 rounded-full absolute animate-[spin_15s_linear_infinite_reverse]" />
                 <div className="w-32 h-32 bg-gradient-to-br from-brand to-deep rounded-2xl rotate-12 flex items-center justify-center shadow-[0_0_40px_rgba(0,146,215,0.4)]">
                   <div className="w-16 h-16 bg-white/10 rounded-xl backdrop-blur-sm" />
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <div className="bg-ink border-b border-line border-opacity-10 py-6">
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
          <div className="eyebrow justify-center">Our Core Services</div>
          <h2 className="text-[34px] font-semibold mb-4">AI Solutions Built for Production.</h2>
          <p className="text-[15.5px] text-ink-soft max-w-[500px] mx-auto">
            We focus on solving real business problems with two core capabilities backed by robust engineering and seamless integrations.
          </p>
        </div>
        
        <div className="wrap grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Service 1 */}
          <div className="bg-white border border-line p-8 transition-colors hover:border-brand">
            <div className="w-12 h-12 bg-grid-bg rounded-lg flex items-center justify-center mb-6 border border-line">
              <div className="w-6 h-6 bg-brand/20 rounded" />
            </div>
            <h3 className="text-[20px] font-semibold mb-3">Enterprise RAG</h3>
            <p className="text-[14px] text-ink-soft mb-6">Transform enterprise knowledge into actionable intelligence.</p>
            <ul className="space-y-2.5 mb-8">
              {['Knowledge Search', 'Document Intelligence', 'PDF AI & Q&A', 'Enterprise Search', 'Support AI Copilots'].map(i => (
                <li key={i} className="flex items-center gap-2 text-[13.5px] text-ink-soft">
                  <span className="text-brand">✓</span> {i}
                </li>
              ))}
            </ul>
            <Link href="/services/enterprise-rag" className="font-mono text-[12px] text-brand">Learn more →</Link>
          </div>
          
          {/* Service 2 */}
          <div className="bg-white border border-line p-8 transition-colors hover:border-brand relative overflow-hidden">
             {/* Subtle gradient glow */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-3xl rounded-full" />
            <div className="w-12 h-12 bg-grid-bg rounded-lg flex items-center justify-center mb-6 border border-line relative z-10">
              <div className="w-6 h-6 bg-signal/20 rounded-full" />
            </div>
            <h3 className="text-[20px] font-semibold mb-3 relative z-10">AI Agents</h3>
            <p className="text-[14px] text-ink-soft mb-6 relative z-10">Build intelligent agents that automate complex tasks and workflows.</p>
            <ul className="space-y-2.5 mb-8 relative z-10">
              {['Customer Support Agents', 'Research & Analysis Agents', 'Sales & SDR Agents', 'Workflow Automation', 'Internal AI Assistants'].map(i => (
                <li key={i} className="flex items-center gap-2 text-[13.5px] text-ink-soft">
                  <span className="text-brand">✓</span> {i}
                </li>
              ))}
            </ul>
            <Link href="/services/ai-agents" className="font-mono text-[12px] text-brand relative z-10">Learn more →</Link>
          </div>

          {/* Service 3 */}
          <div className="bg-white border border-line p-8 transition-colors hover:border-brand">
            <div className="w-12 h-12 bg-grid-bg rounded-lg flex items-center justify-center mb-6 border border-line">
              <div className="w-6 h-6 border-2 border-deep rounded-sm" />
            </div>
            <h3 className="text-[20px] font-semibold mb-3">AI Integrations</h3>
            <p className="text-[14px] text-ink-soft mb-6">Seamlessly integrate AI capabilities into your existing systems.</p>
            <ul className="space-y-2.5 mb-8">
              {['Model Integration', 'API Development', 'Custom Workflows', 'LLM Fine-tuning', 'System Modernization'].map(i => (
                <li key={i} className="flex items-center gap-2 text-[13.5px] text-ink-soft">
                  <span className="text-brand">✓</span> {i}
                </li>
              ))}
            </ul>
            <Link href="/services" className="font-mono text-[12px] text-brand">Learn more →</Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE BOTMARTZ */}
      <section className="section-pad section-alt">
        <div className="wrap text-center mb-12">
          <div className="eyebrow justify-center">Why Choose Botmartz</div>
          <h2 className="text-[30px] font-semibold mb-4">Engineering Excellence. Built for the Real World.</h2>
          <p className="text-[15px] text-ink-soft max-w-[600px] mx-auto">
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
              <div className="w-10 h-10 bg-white border border-line rounded-full flex items-center justify-center mb-4 text-brand font-mono text-[14px]">0{i+1}</div>
              <h4 className="text-[15px] font-semibold mb-2">{item.t}</h4>
              <p className="text-[13px] text-ink-soft leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STACK */}
      <section className="border-b border-line bg-white">
        <div className="wrap flex flex-col md:flex-row items-center">
          <div className="font-mono text-[11px] text-brand uppercase tracking-[0.08em] py-4 pr-8 border-b md:border-b-0 md:border-r border-line w-full md:w-auto text-center md:text-left">Powered By Modern AI Engineering Stack</div>
          <div className="flex flex-wrap flex-1">
            {['PyTorch', 'LangGraph', 'LangChain', 'FastAPI', 'Google ADK', 'TensorFlow'].map((tech, i) => (
              <div key={tech} className="flex-1 min-w-[120px] p-[16px_10px] font-mono text-[12px] text-ink-soft text-center border-r border-line last:border-r-0">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS IN ACTION */}
      <section className="section-pad bg-white">
        <div className="wrap">
          <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
            <div>
              <div className="eyebrow">Solutions in Action</div>
              <h2 className="text-[34px] font-semibold">Real Problems. Real Impact.</h2>
              <p className="text-[15.5px] text-ink-soft mt-2">Explore how we've helped organizations unlock the power of AI.</p>
            </div>
            <Link href="/work/case-studies" className="btn btn-ghost">View All Case Studies →</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-line rounded-sm overflow-hidden group cursor-pointer hover:border-brand transition-colors">
              <div className="h-[180px] bg-grid-bg border-b border-line p-6 relative">
                 <div className="absolute inset-x-6 bottom-0 h-32 bg-white rounded-t-lg shadow-[0_-5px_20px_rgba(0,0,0,0.05)] border border-b-0 border-line"></div>
              </div>
              <div className="p-6">
                <div className="font-mono text-[10px] text-brand uppercase bg-brand/10 inline-block px-2 py-1 rounded mb-3">Enterprise RAG</div>
                <h4 className="text-[18px] font-semibold mb-2">Enterprise Knowledge Search</h4>
                <p className="text-[13.5px] text-ink-soft mb-4">Built a secure RAG system to unify search across 50K+ internal documents.</p>
                <div className="font-mono text-[12px] text-brand flex items-center gap-2 group-hover:gap-3 transition-all">Read Case Study <ArrowRight className="w-3 h-3" /></div>
              </div>
            </div>
            <div className="border border-line rounded-sm overflow-hidden group cursor-pointer hover:border-brand transition-colors">
              <div className="h-[180px] bg-grid-bg border-b border-line p-6 relative">
                 <div className="absolute right-6 top-6 bottom-0 w-32 bg-white rounded-t-lg shadow-[0_-5px_20px_rgba(0,0,0,0.05)] border border-b-0 border-line"></div>
              </div>
              <div className="p-6">
                <div className="font-mono text-[10px] text-brand uppercase bg-brand/10 inline-block px-2 py-1 rounded mb-3">AI Agents</div>
                <h4 className="text-[18px] font-semibold mb-2">AI Support Agent</h4>
                <p className="text-[13.5px] text-ink-soft mb-4">Developed an AI support agent that resolved 70% of queries automatically.</p>
                <div className="font-mono text-[12px] text-brand flex items-center gap-2 group-hover:gap-3 transition-all">Read Case Study <ArrowRight className="w-3 h-3" /></div>
              </div>
            </div>
            <div className="border border-line rounded-sm overflow-hidden group cursor-pointer hover:border-brand transition-colors">
              <div className="h-[180px] bg-grid-bg border-b border-line p-6 relative">
                 <div className="absolute inset-6 bg-white rounded-lg shadow-[0_5px_20px_rgba(0,0,0,0.05)] border border-line"></div>
              </div>
              <div className="p-6">
                <div className="font-mono text-[10px] text-brand uppercase bg-brand/10 inline-block px-2 py-1 rounded mb-3">AI Automation</div>
                <h4 className="text-[18px] font-semibold mb-2">AI SDR for Outreach</h4>
                <p className="text-[13.5px] text-ink-soft mb-4">Built an autonomous SDR agent that personalizes outreach and books 3X more meetings.</p>
                <div className="font-mono text-[12px] text-brand flex items-center gap-2 group-hover:gap-3 transition-all">Read Case Study <ArrowRight className="w-3 h-3" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-[80px]">
        <div className="wrap">
          <div className="bg-ink rounded-[24px] p-[40px] md:p-[60px] text-white flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden">
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            <div className="relative z-10 max-w-[480px]">
              <div className="font-mono text-[11px] text-brand uppercase tracking-[0.12em] mb-3">Ready to build together?</div>
              <h2 className="text-[36px] font-semibold leading-[1.1] mb-4">Let's Engineer AI Solutions That <span className="text-signal">Drive Real Results.</span></h2>
              <p className="text-[15px] text-[#9FB9C8] mb-8">Book a free discovery call and let's discuss how we can solve your most critical challenges with AI.</p>
              <Link href="/contact" className="btn btn-primary bg-brand hover:bg-deep">Book a Discovery Call →</Link>
            </div>

            <div className="relative z-10 flex flex-col gap-4 w-full max-w-[340px]">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-4 items-start">
                <div className="bg-white/10 p-2.5 rounded-lg text-white">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[15px] mb-1">Free Discovery Call</h4>
                  <p className="text-[13px] text-[#9FB9C8]">60-minute strategy session with our AI engineering experts.</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-4 items-start">
                <div className="bg-white/10 p-2.5 rounded-lg text-white">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[15px] mb-1">Custom AI Roadmap</h4>
                  <p className="text-[13px] text-[#9FB9C8]">Get a tailored roadmap and project estimation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}