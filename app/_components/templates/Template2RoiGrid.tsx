"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BarChart, CheckCircle, Zap } from 'lucide-react';
import DynamicIcon from '@/app/_components/DynamicIcon';
import { TemplatePageProps } from './Template1Standard';

export default function Template2RoiGrid({ content }: TemplatePageProps) {
  const hero = content.hero || {};
  const useCases = content.useCases || [];
  const roiMetrics = content.roiMetrics || [];
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
          <h1 className="text-[clamp(40px,6vw,64px)] leading-[1.05] font-semibold mb-6 tracking-tight text-white" dangerouslySetInnerHTML={{ __html: hero.title || 'Quantitative Industrial AI Impact' }} />
          <p className="text-[17px] sm:text-[19px] text-[#8A9EB0] mb-10 max-w-[660px] leading-relaxed font-light">{hero.subtitle}</p>
          <Link href={hero.ctaLink || '/contact'} className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-8 py-3.5 rounded text-[15px] flex items-center gap-2 font-medium">
            {hero.ctaText || 'Explore ROI Architecture →'}
          </Link>
        </div>
      </section>

      {/* ROI METRICS GRID */}
      {roiMetrics.length > 0 && (
        <section className="py-[70px] bg-[#0A111F] border-y border-[#1E293B]">
          <div className="wrap">
            <div className="text-center mb-12">
              <div className="font-mono text-[11px] text-[#00B8F0] uppercase tracking-widest mb-2">Quantitative ROI Matrix</div>
              <h2 className="text-[28px] md:text-[34px] font-semibold text-white">Proven Quantitative Impact</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {roiMetrics.map((metric: any, i: number) => (
                <div key={i} className="bg-[#050B14] border border-[#1E293B] rounded-xl p-6 text-center hover:border-[#00B8F0]/40 transition-colors">
                  <div className="text-[38px] font-bold text-[#00B8F0] mb-1 font-mono">{metric.value}</div>
                  <div className="text-[14px] font-semibold text-white mb-2">{metric.label}</div>
                  <div className="text-[12px] text-[#8A9EB0] bg-[#0A111F] py-1 px-3 rounded-full border border-[#1E293B] inline-block">
                    {metric.highlight}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* USE CASES GRID */}
      {useCases.length > 0 && (
        <section className="py-[100px] bg-[#050B14]">
          <div className="wrap">
            <div className="text-center mb-16 max-w-[700px] mx-auto">
              <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-white mb-4">Core Workflows & Architecture</h2>
              <p className="text-[#8A9EB0] text-[17px]">End-to-end edge inference and enterprise integration workflows.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {useCases.map((uc, i) => (
                <div key={i} className="bg-[#0A111F] border border-[#1E293B] rounded-xl p-8 hover:border-[#00B8F0]/50 transition-all group">
                  <div className="w-14 h-14 rounded-lg bg-[#050B14] border border-[#1E293B] flex items-center justify-center mb-6 text-[#8A9EB0] group-hover:text-[#00B8F0] group-hover:border-[#00B8F0]/30 transition-colors">
                    <DynamicIcon name={uc.iconName || 'CheckCircle'} />
                  </div>
                  <h3 className="text-[20px] font-semibold text-white mb-4">{uc.title}</h3>
                  <p className="text-[15px] text-[#8A9EB0] leading-relaxed">{uc.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CASE STUDY */}
      {caseStudy && (
        <section className="py-[100px] bg-[#0A111F] border-y border-[#1E293B]">
          <div className="wrap">
            <div className="bg-[#050B14] border border-[#1E293B] rounded-2xl overflow-hidden flex flex-col lg:flex-row">
              <div className="p-10 lg:p-16 lg:w-3/5 flex flex-col justify-center">
                <div className="font-mono text-[11px] tracking-wider text-[#00B8F0] uppercase mb-4">Featured Case Study</div>
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
                  Read technical case study <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-[100px] bg-[#050B14]">
        <div className="wrap">
          <div className="bg-gradient-to-br from-[#0A111F] to-[#050B14] border border-[#1E293B] rounded-2xl p-10 md:p-16 text-center max-w-[900px] mx-auto relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-white mb-6">{cta.title || 'Deploy Quantitative Industrial AI'}</h2>
              <p className="text-[#8A9EB0] text-[17px] md:text-[19px] max-w-[600px] mx-auto mb-10 leading-relaxed font-light">{cta.subtitle || 'Connect with our systems architects today.'}</p>
              <Link href="/contact" className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-8 py-4 rounded text-[15px] inline-flex items-center gap-2 font-medium">
                {cta.buttonText || 'Book a Technical Discovery Call →'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
