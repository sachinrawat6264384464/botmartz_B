import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, GraduationCap, Users, Layout, Zap, Database, ShieldCheck, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Solutions for Education | Botmartz AI',
  description: 'Empower educators, students, and institutions with intelligent AI systems. We build AI Course Assistants, Student Support Agents, and Knowledge Search for EdTech.',
  keywords: ['AI in Education', 'EdTech AI', 'AI Course Assistant', 'Student Support Agent', 'Knowledge Search EdTech', 'Generative AI Education'],
  openGraph: {
    title: 'AI Solutions for Education | Botmartz AI',
    description: 'Empower educators, students, and institutions with intelligent AI systems.',
    url: 'https://botmartz.com/industries/education',
    type: 'website',
  },
};

export default function EducationIndustryPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AI Solutions for Education",
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
              <Link href="/industries" className="hover:text-white transition-colors">Industries</Link> <span>/</span> <span className="text-white">Education</span>
            </div>
            <h1 className="text-[clamp(32px,4.5vw,50px)] leading-[1.05] font-semibold mb-6">
              AI Solutions for <span className="text-brand">Education & EdTech.</span>
            </h1>
            <p className="text-[17px] text-[#9FB9C8] mb-8">
              Empower educators, students, and institutions with intelligent systems that personalize learning, automate operations, and unlock institutional knowledge.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn btn-primary bg-brand text-white hover:bg-deep">Discuss Your Use Case →</Link>
            </div>
          </div>
          
          <div className="flex-1 w-full lg:block border-l border-white/10 lg:pl-12 flex flex-col justify-center">
             <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm relative">
                <BookOpen className="w-10 h-10 text-brand mb-4" />
                <h3 className="text-[20px] font-semibold mb-2">The Future of Learning is Personalized</h3>
                <p className="text-[14px] text-[#9FB9C8]">We build robust RAG systems and autonomous agents that transform how content is delivered and understood in educational environments.</p>
             </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="section-pad">
        <div className="wrap text-center mb-[60px]">
          <div className="eyebrow justify-center">Key Use Cases</div>
          <h2 className="text-[34px] font-semibold mb-4">Transforming Educational Experiences.</h2>
        </div>
        
        <div className="wrap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <div className="bg-white border border-line p-6 rounded shadow-sm hover:border-brand transition-colors">
              <GraduationCap className="w-8 h-8 text-brand mb-4" />
              <h4 className="font-semibold text-[18px] mb-2">AI Course Assistants</h4>
              <p className="text-[14px] text-ink-soft">24/7 AI tutors that understand course material, answer student questions, and explain complex concepts dynamically.</p>
           </div>
           
           <div className="bg-white border border-line p-6 rounded shadow-sm hover:border-brand transition-colors">
              <Users className="w-8 h-8 text-brand mb-4" />
              <h4 className="font-semibold text-[18px] mb-2">Student Support Agents</h4>
              <p className="text-[14px] text-ink-soft">Automate student onboarding, financial aid queries, and administrative support to improve student experience.</p>
           </div>
           
           <div className="bg-white border border-line p-6 rounded shadow-sm hover:border-brand transition-colors">
              <Database className="w-8 h-8 text-brand mb-4" />
              <h4 className="font-semibold text-[18px] mb-2">Knowledge Base Search</h4>
              <p className="text-[14px] text-ink-soft">Enterprise RAG systems that allow researchers and faculty to instantly query institutional archives and papers.</p>
           </div>
        </div>
      </section>

      {/* CASE STUDY HIGHLIGHT */}
      <section className="section-pad bg-paper border-t border-line">
        <div className="wrap flex flex-col md:flex-row items-center gap-12">
           <div className="md:w-1/2">
              <div className="font-mono text-[11px] text-brand uppercase tracking-[0.08em] mb-3">Featured Case Study</div>
              <h2 className="text-[30px] font-semibold mb-4">AI Course Assistant for Online Learning Platform</h2>
              <p className="text-[15px] text-ink-soft mb-6">
                We engineered a sophisticated RAG-powered course assistant capable of understanding thousands of hours of lecture transcripts and technical documentation. It provided students with instant, accurate, and context-aware answers, citing exact video timestamps and reading materials.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                 <div>
                    <div className="text-[24px] font-semibold text-brand mb-1">60%</div>
                    <div className="text-[12px] text-ink-soft">Reduction in support tickets</div>
                 </div>
                 <div>
                    <div className="text-[24px] font-semibold text-brand mb-1">98%</div>
                    <div className="text-[12px] text-ink-soft">Answer accuracy</div>
                 </div>
              </div>
              <Link href="/work/case-studies" className="font-mono text-[13px] text-brand flex items-center gap-2 hover:gap-3 transition-all">View All Case Studies <ArrowRight className="w-3.5 h-3.5" /></Link>
           </div>
           <div className="md:w-1/2 w-full">
              <div className="bg-white border border-line p-8 rounded shadow-sm w-full min-h-[300px] flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-grid-bg opacity-50"></div>
                 <div className="relative z-10 w-full max-w-[340px] bg-white border border-line rounded-lg shadow-xl overflow-hidden">
                    <div className="bg-brand text-white p-3 font-semibold text-[13px] flex items-center gap-2"><BookOpen className="w-4 h-4"/> Course Assistant</div>
                    <div className="p-4 bg-gray-50 flex flex-col gap-3">
                       <div className="bg-white border border-line rounded p-2.5 text-[12px] self-end max-w-[80%]">Can you explain backpropagation?</div>
                       <div className="bg-brand/5 border border-brand/20 rounded p-2.5 text-[12px] self-start max-w-[80%] text-ink">Backpropagation is a method used in artificial neural networks to calculate a gradient... <br/><br/><span className="text-brand font-mono text-[10px]">Source: Lecture 4, 15:30</span></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[80px] bg-white">
        <div className="wrap text-center max-w-[600px] mx-auto">
          <h2 className="text-[32px] font-semibold leading-[1.1] mb-4">Ready to upgrade your educational platform?</h2>
          <p className="text-[15px] text-ink-soft mb-8">Let's build secure, accurate AI solutions for your students and staff.</p>
          <Link href="/contact" className="btn btn-primary bg-brand hover:bg-deep">Book a Discovery Call →</Link>
        </div>
      </section>
    </main>
  );
}
