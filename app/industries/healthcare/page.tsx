import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Heart, Stethoscope, Database, Shield, FileText, Users, Zap, Activity } from 'lucide-react';
import DynamicIcon from '@/app/_components/DynamicIcon';
import { adminDb } from '@/lib/firebase-admin';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'AI Solutions for Healthcare & MedTech',
    description: 'Botmartz engineers secure AI systems for healthcare, including clinical documentation automation, diagnostic support, and medical RAG pipelines.',
  };
  try {
    const docSnap = await adminDb.collection('dynamic_pages').doc('healthcare').get();
    if (docSnap.exists) { 
      const data = docSnap.data(); 
      if (data?.metadata) {
        meta = { ...meta, ...data.metadata }; 
        if (meta.description && meta.description.length > 155) {
          meta.description = meta.description.substring(0, 152) + '...';
        }
      }
    }
  } catch (e) {}
  return { ...meta, openGraph: { title: `${meta.title} | Botmartz`, description: meta.description, url: 'https://www.botmartz.com/industries/healthcare', type: 'website' }, alternates: { canonical: 'https://www.botmartz.com/industries/healthcare' } };
}

const DEFAULT_CONTENT = {
  hero: {
    badge: 'Industries / Healthcare',
    title: 'AI Solutions for Healthcare & MedTech.',
    subtitle: 'We build HIPAA-aware AI systems that help clinicians, administrators, and patients — reducing documentation burden, accelerating decisions, and improving care outcomes.',
    ctaText: 'Discuss Your Use Case →',
    ctaLink: '/contact',
  },
  useCases: [
    { iconName: 'FileText', title: 'Clinical Documentation AI', description: 'Automate clinical note-taking, discharge summaries, and prior authorization letters — freeing clinicians from administrative burden.' },
    { iconName: 'Stethoscope', title: 'Diagnostic Support Systems', description: 'RAG-powered systems that surface relevant clinical evidence and guidelines to support diagnostic workflows.' },
    { iconName: 'Database', title: 'Medical Knowledge Retrieval', description: 'Enterprise RAG over clinical literature, protocols, formularies, and internal hospital guidelines for instant, accurate answers.' },
    { iconName: 'Heart', title: 'Patient Engagement Agents', description: 'AI agents that handle appointment scheduling, medication reminders, and FAQs — improving patient experience at scale.' },
    { iconName: 'Shield', title: 'Compliance & Audit Automation', description: 'Automate regulatory reporting, audit preparation, and compliance documentation across complex healthcare workflows.' },
    { iconName: 'Activity', title: 'Clinical Data Intelligence', description: 'AI pipelines that structure, clean, and analyze unstructured EMR data to surface operational and clinical insights.' },
  ],
  featuredCaseStudy: {
    title: 'Clinical Documentation Automation for a Hospital Network',
    description: 'We built a HIPAA-aware AI system that automatically generates clinical documentation from physician dictation and structured EMR inputs. The system reduced documentation time per patient from 18 minutes to under 4 minutes, with physician review and edit time included.',
    statValue1: '78%',
    statLabel1: 'Reduction in documentation time',
    statValue2: '96%',
    statLabel2: 'Clinical accuracy rate',
    link: '/work/case-studies',
  },
  cta: {
    title: 'Ready to build AI into your healthcare workflows?',
    subtitle: 'We build healthcare AI that is accurate, compliant, and designed for real clinical environments.',
    buttonText: 'Book a Discovery Call →',
  },
  structuredData: JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AI Solutions for Healthcare',
    provider: { '@type': 'Organization', name: 'Botmartz AI Solutions' },
    description: 'Enterprise AI systems for healthcare including clinical documentation automation, medical RAG, patient engagement AI, and compliance automation.',
  }),
};

export default async function HealthcareIndustryPage() {
  let content = { ...DEFAULT_CONTENT };
  try {
    const docSnap = await adminDb.collection('dynamic_pages').doc('healthcare').get();
    if (docSnap.exists) {
      const data = docSnap.data();
      content = { hero: data?.hero || DEFAULT_CONTENT.hero, useCases: data?.useCases || DEFAULT_CONTENT.useCases, featuredCaseStudy: data?.featuredCaseStudy || DEFAULT_CONTENT.featuredCaseStudy, cta: data?.cta || DEFAULT_CONTENT.cta, structuredData: data?.structuredData || DEFAULT_CONTENT.structuredData };
    }
  } catch (e) {}

  return (
    <main className="bg-[#050B14] min-h-screen text-white">
      {content.structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: content.structuredData }} />}

      {/* HERO */}
      <section className="relative pt-[120px] pb-[80px] bg-[#050B14] text-white overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="wrap relative z-10 flex flex-col items-center text-center max-w-[800px] mx-auto">
          <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-6 flex items-center justify-center gap-3 font-semibold">
            <span className="w-6 h-px bg-[#00B8F0]" />{content.hero.badge}<span className="w-6 h-px bg-[#00B8F0]" />
          </div>
          <h1 className="text-[clamp(40px,6vw,64px)] leading-[1.05] font-semibold mb-6 tracking-tight text-white" dangerouslySetInnerHTML={{ __html: content.hero.title }} />
          <p className="text-[17px] sm:text-[19px] text-[#8A9EB0] mb-10 max-w-[600px] leading-relaxed font-light">{content.hero.subtitle}</p>
          <Link href={content.hero.ctaLink} className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-8 py-3.5 rounded text-[15px] flex items-center gap-2">
            {content.hero.ctaText}
          </Link>
        </div>
        <div className="mt-20 relative max-w-[1000px] mx-auto hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050B14] z-10" />
          <div className="grid grid-cols-5 gap-4 opacity-30">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="h-16 border border-[#1E293B] rounded bg-[#0A111F]/50 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#00B8F0]/30 animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-[100px] bg-[#0A111F] border-y border-[#1E293B]">
        <div className="wrap">
          <div className="text-center mb-16 max-w-[700px] mx-auto">
            <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-white mb-4">Core Use Cases</h2>
            <p className="text-[#8A9EB0] text-[17px]">We build specialized AI for the highest-value, highest-complexity workflows in healthcare.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.useCases.map((uc: any, i: number) => (
              <div key={i} className="bg-[#050B14] border border-[#1E293B] rounded-xl p-8 hover:border-[#00B8F0]/50 hover:shadow-[0_0_30px_rgba(0,184,240,0.05)] transition-all group">
                <div className="w-14 h-14 rounded-lg bg-[#0A111F] border border-[#1E293B] flex items-center justify-center mb-6 text-[#8A9EB0] group-hover:text-[#00B8F0] group-hover:border-[#00B8F0]/30 transition-colors">
                  <DynamicIcon name={uc.iconName} />
                </div>
                <h3 className="text-[20px] font-semibold text-white mb-4">{uc.title}</h3>
                <p className="text-[15px] text-[#8A9EB0] leading-relaxed">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="py-[100px] bg-[#050B14]">
        <div className="wrap">
          <div className="bg-[#0A111F] border border-[#1E293B] rounded-2xl overflow-hidden flex flex-col lg:flex-row">
            <div className="p-10 lg:p-16 lg:w-3/5 flex flex-col justify-center">
              <div className="font-mono text-[11px] tracking-wider text-[#00B8F0] uppercase mb-4">Featured Case Study</div>
              <h3 className="text-[28px] md:text-[32px] font-semibold text-white mb-6 leading-tight">{content.featuredCaseStudy.title}</h3>
              <p className="text-[#8A9EB0] text-[17px] leading-relaxed mb-10">{content.featuredCaseStudy.description}</p>
              <div className="grid grid-cols-2 gap-8 mb-10 border-t border-[#1E293B] pt-8">
                <div>
                  <div className="text-[36px] font-semibold text-white mb-1">{content.featuredCaseStudy.statValue1}</div>
                  <div className="text-[13px] text-[#8A9EB0]">{content.featuredCaseStudy.statLabel1}</div>
                </div>
                <div>
                  <div className="text-[36px] font-semibold text-white mb-1">{content.featuredCaseStudy.statValue2}</div>
                  <div className="text-[13px] text-[#8A9EB0]">{content.featuredCaseStudy.statLabel2}</div>
                </div>
              </div>
              <Link href={content.featuredCaseStudy.link || '/work/case-studies'} className="inline-flex items-center gap-2 text-[#00B8F0] hover:text-white transition-colors font-medium text-[15px]">
                Read full case study <ArrowRight size={16} />
              </Link>
            </div>
            <div className="lg:w-2/5 relative bg-[#050B14] min-h-[300px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-[#1E293B] p-10 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00B8F0]/10 via-transparent to-transparent" />
              <div className="relative z-10 text-center">
                <Heart className="w-16 h-16 text-[#00B8F0]/40 mx-auto mb-4" />
                <div className="text-[#8A9EB0] text-sm font-mono uppercase tracking-widest">Healthcare AI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[100px] bg-[#0A111F] border-t border-[#1E293B]">
        <div className="wrap">
          <div className="bg-gradient-to-br from-[#0A111F] to-[#050B14] border border-[#1E293B] rounded-2xl p-10 md:p-16 text-center max-w-[900px] mx-auto relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00B8F0]/10 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-white mb-6">{content.cta.title}</h2>
              <p className="text-[#8A9EB0] text-[17px] md:text-[19px] max-w-[600px] mx-auto mb-10 leading-relaxed font-light">{content.cta.subtitle}</p>
              <Link href="/contact" className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-8 py-4 rounded text-[15px] inline-flex items-center gap-2 font-medium">
                {content.cta.buttonText}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
