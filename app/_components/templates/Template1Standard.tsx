"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Code } from 'lucide-react';
import DynamicIcon from '@/app/_components/DynamicIcon';

export interface TemplatePageProps {
  content: {
    hero?: {
      badge?: string;
      title?: string;
      subtitle?: string;
      ctaText?: string;
      ctaLink?: string;
    };
    aeoQuestion?: string;
    aeoAnswer?: string;
    useCases?: Array<{
      iconName?: string;
      title: string;
      description: string;
    }>;
    techStack?: string[];
    featuredCaseStudy?: {
      title: string;
      description: string;
      statValue1?: string;
      statLabel1?: string;
      statValue2?: string;
      statLabel2?: string;
      link?: string;
    };
    cta?: {
      title?: string;
      subtitle?: string;
      buttonText?: string;
    };
    [key: string]: any;
  };
}

export default function Template1Standard({ content }: TemplatePageProps) {
  const hero = content.hero || {};
  const useCases = content.useCases || [];
  const techStack = content.techStack || [];
  const caseStudy = content.featuredCaseStudy;
  const cta = content.cta || {};

  return (
    <div className="bg-[#050B14] min-h-screen text-white">
      {/* HERO */}
      <section className="relative pt-[120px] pb-[80px] bg-[#050B14] text-white overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="wrap relative z-10 flex flex-col items-center text-center max-w-[850px] mx-auto">
          {hero.badge && (
            <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-6 flex items-center justify-center gap-3 font-semibold">
              <span className="w-6 h-px bg-[#00B8F0]" />{hero.badge}<span className="w-6 h-px bg-[#00B8F0]" />
            </div>
          )}
          <h1 className="text-[clamp(40px,6vw,64px)] leading-[1.05] font-semibold mb-6 tracking-tight text-white" dangerouslySetInnerHTML={{ __html: hero.title || 'Enterprise AI Solutions' }} />
          <p className="text-[17px] sm:text-[19px] text-[#8A9EB0] mb-10 max-w-[660px] leading-relaxed font-light">{hero.subtitle}</p>
          <Link href={hero.ctaLink || '/contact'} className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-8 py-3.5 rounded text-[15px] flex items-center gap-2 font-medium">
            {hero.ctaText || 'Discuss Your Project →'}
          </Link>
        </div>
      </section>

      {/* AEO BLOCK (if present) */}
      {content.aeoQuestion && (
        <section className="py-[80px] bg-[#0A111F] border-y border-[#1E293B]">
          <div className="wrap flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#050B14] border border-[#1E293B] text-[13px] text-[#8A9EB0] mb-6 font-mono">
                <span className="w-2 h-2 rounded-full bg-[#00B8F0] animate-pulse" />AEO Optimized Context
              </div>
              <h2 className="text-[32px] md:text-[40px] font-semibold mb-6 tracking-tight text-white">{content.aeoQuestion}</h2>
              <p className="text-[17px] text-[#8A9EB0] leading-relaxed">{content.aeoAnswer}</p>
            </div>
            <div className="w-full md:w-1/2">
              <div className="bg-[#050B14] border border-[#1E293B] rounded-xl p-8">
                <div className="font-mono text-[11px] text-[#8A9EB0] uppercase tracking-widest mb-6">Domain Impact Summary</div>
                <div className="space-y-3 text-sm text-[#8A9EB0]">
                  <p>Our tailored systems deliver immediate accuracy gains, cost optimization, and full compliance integration.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* USE CASES GRID */}
      {useCases.length > 0 && (
        <section className="py-[100px] bg-[#050B14]">
          <div className="wrap">
            <div className="text-center mb-16 max-w-[700px] mx-auto">
              <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-white mb-4">Core Capabilities</h2>
              <p className="text-[#8A9EB0] text-[17px]">Specialized AI models engineered for your operational workflows.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {useCases.map((uc, i) => (
                <div key={i} className="bg-[#0A111F] border border-[#1E293B] rounded-xl p-8 hover:border-[#00B8F0]/50 transition-all group">
                  <div className="w-14 h-14 rounded-lg bg-[#050B14] border border-[#1E293B] flex items-center justify-center mb-6 text-[#8A9EB0] group-hover:text-[#00B8F0] group-hover:border-[#00B8F0]/30 transition-colors">
                    <DynamicIcon name={uc.iconName || 'Code'} />
                  </div>
                  <h3 className="text-[20px] font-semibold text-white mb-4">{uc.title}</h3>
                  <p className="text-[15px] text-[#8A9EB0] leading-relaxed">{uc.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FEATURED CASE STUDY */}
      {caseStudy && (
        <section className="py-[100px] bg-[#0A111F] border-y border-[#1E293B]">
          <div className="wrap">
            <div className="bg-[#050B14] border border-[#1E293B] rounded-2xl overflow-hidden flex flex-col lg:flex-row">
              <div className="p-10 lg:p-16 lg:w-3/5 flex flex-col justify-center">
                <div className="font-mono text-[11px] tracking-wider text-[#00B8F0] uppercase mb-4">Featured Deployment</div>
                <h3 className="text-[28px] md:text-[32px] font-semibold text-white mb-6 leading-tight">{caseStudy.title}</h3>
                <p className="text-[#8A9EB0] text-[17px] leading-relaxed mb-10">{caseStudy.description}</p>
                <div className="grid grid-cols-2 gap-8 mb-10 border-t border-[#1E293B] pt-8">
                  <div>
                    <div className="text-[36px] font-semibold text-[#00B8F0] mb-1 font-mono">{caseStudy.statValue1}</div>
                    <div className="text-[13px] text-[#8A9EB0]">{caseStudy.statLabel1}</div>
                  </div>
                  <div>
                    <div className="text-[36px] font-semibold text-white mb-1 font-mono">{caseStudy.statValue2}</div>
                    <div className="text-[13px] text-[#8A9EB0]">{caseStudy.statLabel2}</div>
                  </div>
                </div>
                <Link href={caseStudy.link || '/work/case-studies'} className="inline-flex items-center gap-2 text-[#00B8F0] hover:text-white transition-colors font-medium text-[15px]">
                  Read full case study <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TECH STACK BAR */}
      {techStack.length > 0 && (
        <section className="py-12 border-y border-[#1E293B] bg-[#0A111F] overflow-hidden">
          <div className="wrap flex items-center gap-8">
            <div className="font-mono text-[11px] text-[#8A9EB0] uppercase tracking-wider whitespace-nowrap shrink-0">Stack</div>
            <div className="flex-1 flex gap-8 md:gap-16 items-center overflow-x-auto text-white font-mono text-[14px]">
              {techStack.map((tech, i) => (
                <span key={i} className="whitespace-nowrap flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00B8F0]" />{tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-[100px] bg-[#050B14]">
        <div className="wrap">
          <div className="bg-gradient-to-br from-[#0A111F] to-[#050B14] border border-[#1E293B] rounded-2xl p-10 md:p-16 text-center max-w-[900px] mx-auto relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-white mb-6">{cta.title || 'Ready to Build Custom AI Systems?'}</h2>
              <p className="text-[#8A9EB0] text-[17px] md:text-[19px] max-w-[600px] mx-auto mb-10 leading-relaxed font-light">{cta.subtitle || 'Connect with our engineering architects today.'}</p>
              <Link href="/contact" className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-8 py-4 rounded text-[15px] inline-flex items-center gap-2 font-medium">
                {cta.buttonText || 'Book a Discovery Call →'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
