"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Download, FileText, Sparkles } from 'lucide-react';
import DynamicIcon from '@/app/_components/DynamicIcon';
import { TemplatePageProps } from './Template1Standard';

export default function Template4ResearchCaseStudy({ content }: TemplatePageProps) {
  const hero = content.hero || {};
  const useCases = content.useCases || [];
  const benchmarks = content.benchmarks || [
    { metric: 'Inference Latency (vLLM + H100)', baseline: '450ms', botmartz: '38ms', improvement: '11.8× Faster' },
    { metric: 'RAG Retrieval Accuracy (Multi-Hop)', baseline: '64.2%', botmartz: '94.8%', improvement: '+30.6% Net Gain' },
    { metric: 'Token Cost per 10k Queries', baseline: '$142.00', botmartz: '$18.50', improvement: '87% Cost Reduction' },
  ];
  const caseStudies = content.caseStudies || [
    { title: 'Clinical Documentation Automation', vertical: 'Healthcare', metric: '78% Time Saved', desc: 'HIPAA-compliant voice dictation & structurer.' },
    { title: 'Predictive Press Maintenance', vertical: 'Manufacturing', metric: '$3.8M Saved', desc: 'NVIDIA edge vision and thermal telemetry anomaly detection.' },
    { title: 'Multi-Tenant Financial Copilot', vertical: 'FinTech SaaS', metric: '4.2× Engagement', desc: 'In-app natural language query engine.' }
  ];
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
          <h1 className="text-[clamp(40px,6vw,64px)] leading-[1.05] font-semibold mb-6 tracking-tight text-white" dangerouslySetInnerHTML={{ __html: hero.title || 'Research Labs & Case Study Benchmarks' }} />
          <p className="text-[17px] sm:text-[19px] text-[#8A9EB0] mb-10 max-w-[660px] leading-relaxed font-light">{hero.subtitle}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={hero.ctaLink || 'https://cal.com/botmartz-ai/20min'} target="_blank" rel="noopener noreferrer" className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-8 py-3.5 rounded text-[15px] flex items-center gap-2 font-medium">
              {hero.ctaText || 'Review Technical Benchmarks →'}
            </a>
            <Link href="/work/case-studies" className="bg-[#0A111F] hover:bg-[#1E293B] border border-[#1E293B] text-white px-8 py-3.5 rounded text-[15px] font-medium transition-all">
              Explore All Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* TECHNICAL BENCHMARK TABLE (Template 4 Signature Block) */}
      <section className="py-[90px] bg-[#0A111F] border-y border-[#1E293B]">
        <div className="wrap max-w-[1000px] mx-auto">
          <div className="text-center mb-12">
            <div className="font-mono text-[11px] text-[#00B8F0] uppercase tracking-widest mb-2">Empirical Evaluations</div>
            <h2 className="text-[28px] md:text-[34px] font-semibold text-white">Production AI Benchmarks vs. Generic Baseline</h2>
          </div>
          <div className="bg-[#050B14] border border-[#1E293B] rounded-xl overflow-hidden shadow-2xl">
            <table className="w-full text-left font-mono text-sm">
              <thead className="bg-[#0A111F] border-b border-[#1E293B] text-xs text-[#8A9EB0] uppercase tracking-wider">
                <tr>
                  <th className="p-5">Evaluation Metric</th>
                  <th className="p-5">Generic LLM API Baseline</th>
                  <th className="p-5 text-[#00B8F0]">Botmartz Custom Architecture</th>
                  <th className="p-5 text-right">Net Improvement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]">
                {benchmarks.map((bm: any, i: number) => (
                  <tr key={i} className="hover:bg-[#0A111F]/50 transition-colors">
                    <td className="p-5 font-semibold text-white">{bm.metric}</td>
                    <td className="p-5 text-[#8A9EB0]">{bm.baseline}</td>
                    <td className="p-5 text-[#00B8F0] font-bold">{bm.botmartz}</td>
                    <td className="p-5 text-right font-semibold text-emerald-400 bg-emerald-500/5">{bm.improvement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* MULTI-CASE STUDY GRID */}
      <section className="py-[100px] bg-[#050B14]">
        <div className="wrap">
          <div className="text-center mb-16 max-w-[700px] mx-auto">
            <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-white mb-4">Empirical Case Studies</h2>
            <p className="text-[#8A9EB0] text-[17px]">Deep technical analyses of custom AI architectures deployed in production environments.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((cs: any, i: number) => (
              <div key={i} className="bg-[#0A111F] border border-[#1E293B] rounded-xl p-8 hover:border-[#00B8F0]/50 transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 bg-[#050B14] border border-[#1E293B] rounded-full text-xs font-mono text-[#00B8F0]">
                      {cs.vertical}
                    </span>
                    <span className="text-lg font-bold font-mono text-white">{cs.metric}</span>
                  </div>
                  <h3 className="text-[20px] font-semibold text-white mb-3 group-hover:text-[#00B8F0] transition-colors">{cs.title}</h3>
                  <p className="text-[14px] text-[#8A9EB0] leading-relaxed mb-6">{cs.desc}</p>
                </div>
                <Link href="/work/case-studies" className="inline-flex items-center gap-2 text-sm text-[#00B8F0] font-medium group-hover:underline">
                  Read full research brief <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[100px] bg-[#0A111F] border-t border-[#1E293B]">
        <div className="wrap">
          <div className="bg-gradient-to-br from-[#050B14] to-[#0A111F] border border-[#1E293B] rounded-2xl p-10 md:p-16 text-center max-w-[900px] mx-auto relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-white mb-6">{cta.title || 'Commission a Technical Feasibility Study'}</h2>
              <p className="text-[#8A9EB0] text-[17px] md:text-[19px] max-w-[600px] mx-auto mb-10 leading-relaxed font-light">{cta.subtitle || 'Connect with our research labs and systems architects today.'}</p>
              <a href="https://cal.com/botmartz-ai/20min" target="_blank" rel="noopener noreferrer" className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-8 py-4 rounded text-[15px] inline-flex items-center gap-2 font-medium">
                {cta.buttonText || 'Contact Engineering Labs →'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
