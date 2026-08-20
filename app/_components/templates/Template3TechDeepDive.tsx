"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Code, Terminal, Zap } from 'lucide-react';
import DynamicIcon from '@/app/_components/DynamicIcon';
import { TemplatePageProps } from './Template1Standard';

export default function Template3TechDeepDive({ content }: TemplatePageProps) {
  const hero = content.hero || {};
  const useCases = content.useCases || [];
  const codeHighlight = content.codeHighlight || {
    title: 'Developer Ready Integration',
    subtitle: 'Drop-in our production RAG and Agent endpoints.',
    codeSnippet: `// Botmartz SDK Hook\nimport { BotmartzClient } from '@botmartz/sdk';\nconst client = new BotmartzClient({ apiKey: process.env.API_KEY });`
  };
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
          <h1 className="text-[clamp(40px,6vw,64px)] leading-[1.05] font-semibold mb-6 tracking-tight text-white" dangerouslySetInnerHTML={{ __html: hero.title || 'Embedded Copilots & Tech Deep-Dive' }} />
          <p className="text-[17px] sm:text-[19px] text-[#8A9EB0] mb-10 max-w-[660px] leading-relaxed font-light">{hero.subtitle}</p>
          <a href={hero.ctaLink || 'https://cal.com/botmartz-ai/20min'} target="_blank" rel="noopener noreferrer" className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-8 py-3.5 rounded text-[15px] flex items-center gap-2 font-medium">
            {hero.ctaText || 'Explore SDKs & Integrations →'}
          </a>
        </div>
      </section>

      {/* CODE & TECHNICAL DEEP-DIVE */}
      <section className="py-[90px] bg-[#0A111F] border-y border-[#1E293B]">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#050B14] border border-[#1E293B] text-[12px] font-mono text-[#00B8F0] mb-6">
                <Terminal size={14} /> Developer Ready Endpoints
              </div>
              <h2 className="text-[32px] md:text-[38px] font-semibold text-white mb-4 tracking-tight">{codeHighlight.title}</h2>
              <p className="text-[17px] text-[#8A9EB0] leading-relaxed mb-8">{codeHighlight.subtitle}</p>
              <div className="space-y-4 font-mono text-sm">
                {[
                  'Multi-tenant isolated vector index architecture',
                  'Built-in streaming SSE and WebSocket hooks',
                  'Custom tool-calling definitions with strict schema verification',
                  'Sub-second vLLM & TensorRT-LLM inference'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[#8A9EB0]">
                    <span className="w-2 h-2 rounded-full bg-[#00B8F0]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#050B14] border border-[#1E293B] rounded-xl p-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1E293B] text-xs font-mono text-[#8A9EB0]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-white/80">botmartz-sdk.ts</span>
                </div>
                <span className="text-[#00B8F0]">TypeScript</span>
              </div>
              <pre className="font-mono text-[13px] leading-relaxed text-[#8A9EB0] overflow-x-auto p-2">
                <code>{codeHighlight.codeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES GRID */}
      {useCases.length > 0 && (
        <section className="py-[100px] bg-[#050B14]">
          <div className="wrap">
            <div className="text-center mb-16 max-w-[700px] mx-auto">
              <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-white mb-4">Core Technical Capabilities</h2>
              <p className="text-[#8A9EB0] text-[17px]">Production AI features engineered for seamless integration.</p>
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

      {/* CASE STUDY */}
      {caseStudy && (
        <section className="py-[100px] bg-[#0A111F] border-y border-[#1E293B]">
          <div className="wrap">
            <div className="bg-[#050B14] border border-[#1E293B] rounded-2xl overflow-hidden flex flex-col lg:flex-row">
              <div className="p-10 lg:p-16 lg:w-3/5 flex flex-col justify-center">
                <div className="font-mono text-[11px] tracking-wider text-[#00B8F0] uppercase mb-4">Featured Copilot Deployment</div>
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
                  Explore technical study <ArrowRight size={16} />
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
              <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-white mb-6">{cta.title || 'Turn Your Platform into an AI Leader'}</h2>
              <p className="text-[#8A9EB0] text-[17px] md:text-[19px] max-w-[600px] mx-auto mb-10 leading-relaxed font-light">{cta.subtitle || 'Connect with our systems architects today.'}</p>
              <a href="https://cal.com/botmartz-ai/20min" target="_blank" rel="noopener noreferrer" className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-8 py-4 rounded text-[15px] inline-flex items-center gap-2 font-medium">
                {cta.buttonText || 'Book an Architectural Briefing →'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
