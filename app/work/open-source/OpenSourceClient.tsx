"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface RepoItem {
  id?: string;
  category: string;
  license: string;
  name: string;
  desc: string;
  tags: string[];
  stars: string;
  forks: string;
  githubUrl?: string;
}

const PROTOTYPE_REPOS: RepoItem[] = [];

export default function OpenSourceClient({ 
  initialRepos,
  heroContent = {
    badge: "Open Source",
    title: "Open Source Is<br />in Our <span class=\"text-[#00C6FF]\">DNA</span>",
    subtitle: "We believe sharing knowledge and code accelerates innovation for everyone. Every lab we're proud of eventually ships as an open-source repo.",
    ctaText: "View GitHub Org →",
    ctaLink: "https://github.com/botmartz",
  },
  structuredData,
  aeoQuestion,
  aeoAnswer
}: { 
  initialRepos: any[];
  heroContent?: any;
  structuredData?: string;
  aeoQuestion?: string;
  aeoAnswer?: string;
}) {
  const [filter, setFilter] = useState('All Repos');

  const categoryList = ['All Repos', 'Enterprise RAG', 'AI Agents', 'Developer Tools', 'Infrastructure'];

  const steps = [
    { n: '1', title: 'Pick an Issue', desc: 'Browse good-first-issues across our repos on GitHub.' },
    { n: '2', title: 'Fork & Build', desc: 'Fork the repo, make your change, and test it locally.' },
    { n: '3', title: 'Open a PR', desc: 'Submit a pull request — maintainers review within days.' },
    { n: '4', title: 'Get Recognized', desc: 'Contributors are featured in our newsletter and community.' },
  ];

  const repos: RepoItem[] = useMemo(() => {
    if (initialRepos && initialRepos.length > 0) {
      return initialRepos.map(r => ({
        id: r.id,
        category: r.category || 'Enterprise RAG',
        license: r.license || 'MIT',
        name: r.name || r.title || 'open-source-project',
        desc: r.desc || r.description || 'Open source tool maintained by Botmartz.',
        tags: (Array.isArray(r.tags) ? r.tags : ['Python', 'AI']) as string[],
        stars: r.stars || '0',
        forks: r.forks || '0',
        githubUrl: r.githubUrl || r.url || 'https://github.com/botmartz'
      }));
    }
    return [];
  }, [initialRepos]);

  const visibleRepos = useMemo(() => {
    if (filter === 'All Repos') return repos;
    return repos.filter(r => r.category.toLowerCase() === filter.toLowerCase() || r.category.toLowerCase().includes(filter.toLowerCase()));
  }, [filter, repos]);

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Botmartz Open Source Repositories & AI Labs",
    "description": "Production RAG frameworks, LangGraph agent toolkits, and evaluation harnesses open-sourced under MIT and Apache-2.0 licenses.",
    "url": "https://www.botmartz.com/work/open-source",
  };

  return (
    <div className="bg-[#F5F8FC] min-h-screen font-sans text-[#0B1220]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredData ? structuredData : JSON.stringify(defaultSchema)
        }}
      />
      {/* ── HERO SECTION ── */}
      <div className="bg-[#060C1F] relative overflow-hidden pt-24 pb-16 px-6 sm:px-10 lg:pt-28 lg:pb-20">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,198,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,198,255,0.06) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 65% 30%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 65% 30%, black, transparent)'
          }}
        />
        <div className="relative max-w-[1240px] mx-auto">
          <div className="font-semibold text-[12.5px] text-[#5B6B85] mb-6 tracking-wide flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <Link href="/work" className="hover:text-white transition-colors">Work</Link>
            <span>›</span>
            <span className="text-[#00C6FF]">Open Source</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div>
              <div className="font-bold text-[12px] tracking-[0.1em] text-[#00C6FF] uppercase">
                {heroContent.badge || "Open Source"}
              </div>
              <h1 
                className="font-extrabold text-[clamp(32px,4.5vw,44px)] leading-[1.15] text-white mt-4"
                dangerouslySetInnerHTML={{ __html: heroContent.title || 'Open Source Is<br />in Our <span class="text-[#00C6FF]">DNA</span>' }}
              />
              <p className="font-medium text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#8FA3C4] mt-4.5 max-w-[480px]">
                {heroContent.subtitle || "We believe sharing knowledge and code accelerates innovation for everyone. Every lab we're proud of eventually ships as an open-source repo."}
              </p>
              <div className="flex flex-wrap gap-3.5 mt-7">
                <a 
                  href="https://github.com/botmartz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#007BFF] hover:bg-[#0069DB] text-white font-bold text-[14px] px-6 py-3.5 rounded-[9px] shadow-[0_8px_24px_rgba(0,123,255,0.35)] transition-all"
                >
                  View GitHub Org ⌥
                </a>
              </div>
            </div>

            <div className="bg-white/[0.04] border border-white/10 rounded-[18px] p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#00C6FF] animate-pulse" />
                <span className="text-xs font-mono font-bold text-[#00C6FF] uppercase tracking-wider">Release Roadmap</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-3">
                First Releases in Q4 2026
              </h2>
              <p className="text-sm leading-relaxed text-[#8FA3C4] mt-3">
                We are packaging our internal evaluation harnesses, hybrid retrieval utilities, and LangGraph agent blueprints for public distribution under MIT and Apache-2.0 licenses.
              </p>
              <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-mono text-[#5B6B85]">
                <span className="text-[#8FA3C4]">License: MIT / Apache-2.0</span>
                <span>•</span>
                <span className="text-[#8FA3C4]">Host: GitHub /botmartz</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── REPOSITORIES SECTION ── */}
      <div id="repos" className="max-w-[1240px] mx-auto pt-16 px-6 sm:px-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="font-bold text-[12px] tracking-[0.1em] text-[#007BFF] uppercase">
              Repositories
            </div>
            <div className="font-extrabold text-[26px] sm:text-[30px] text-[#0B1220] mt-2">
              Open Source Toolkits &amp; Repos
            </div>
          </div>

          {repos.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {categoryList.map((cat) => {
                const active = filter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`font-bold text-[12.5px] px-4 py-2.5 rounded-[8px] border transition-all ${
                      active
                        ? 'bg-[#007BFF] border-[#007BFF] text-white shadow-sm'
                        : 'bg-white border-[#E2E8F0] text-[#3A4459] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {repos.length > 0 ? (
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleRepos.map((repo, idx) => (
              <div 
                key={idx}
                className="bg-white border border-[#E7ECF3] rounded-[14px] p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-all hover:border-[#007BFF]/40"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[10px] tracking-[0.05em] text-[#007BFF] bg-[#E8F2FF] px-2.5 py-1 rounded-[5px] uppercase">
                    {repo.category}
                  </span>
                  <span className="font-semibold text-[11px] text-[#8A97AC]">
                    {repo.license}
                  </span>
                </div>

                <a 
                  href={repo.githubUrl || `https://github.com/botmartz/${repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[16px] text-[#0B1220] hover:text-[#007BFF] flex items-center gap-2 transition-colors mt-1"
                >
                  <span>⌥</span>
                  <span>{repo.name}</span>
                </a>

                <div className="font-medium text-[13px] leading-[1.6] text-[#5B6B85] flex-1">
                  {repo.desc}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {repo.tags.map((tag: string, tIdx: number) => (
                    <span key={tIdx} className="font-semibold text-[11px] text-[#5B6B85] bg-[#F1F4F9] px-2 py-0.5 rounded-[5px]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 bg-white border border-[#E2E8F0] rounded-[16px] p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-full bg-[#E8F2FF] text-[#007BFF] flex items-center justify-center mx-auto text-2xl font-mono mb-4">
              ⌥
            </div>
            <h3 className="text-xl font-bold text-[#0B1220] mb-2 font-heading">
              First Public Releases Scheduled for Q4 2026
            </h3>
            <p className="text-sm text-[#5B6B85] leading-relaxed max-w-md mx-auto mb-6">
              Our open-source repositories are undergoing final packaging and licensing preparation. Star and follow our GitHub organization to get notified upon release.
            </p>
            <a
              href="https://github.com/botmartz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#007BFF] hover:bg-[#0069DB] text-white font-bold text-[13.5px] px-6 py-3 rounded-lg shadow-sm transition-all"
            >
              Follow github.com/botmartz →
            </a>
          </div>
        )}
      </div>

      {/* ── GET INVOLVED STEPS (LIGHT THEME) ── */}
      <div className="max-w-[1240px] mx-auto mt-16 px-6 sm:px-10">
        <div className="bg-white border border-slate-200 rounded-[18px] p-8 sm:p-11 relative overflow-hidden shadow-sm text-slate-900">
          <div className="relative z-10">
            <div className="font-bold text-[11.5px] tracking-[0.08em] text-[#0066FF] uppercase">
              Get Involved
            </div>
            <div className="font-extrabold text-[26px] sm:text-[28px] text-slate-900 mt-2.5 font-heading">
              How to Contribute
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-4 border-t border-slate-200">
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-full border border-blue-200 bg-blue-50 flex items-center justify-center font-bold text-[13px] text-[#0066FF]">
                    {step.n}
                  </div>
                  <div className="font-bold text-[14.5px] text-slate-900 font-heading">
                    {step.title}
                  </div>
                  <div className="font-medium text-[12.5px] leading-[1.55] text-slate-600">
                    {step.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── JOIN OPEN SOURCE NIGHT CTA ── */}
      <div className="max-w-[1240px] mx-auto my-14 pb-22 px-6 sm:px-10">
        <div className="bg-white border border-[#E7ECF3] rounded-[16px] p-7 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-[64px] h-[64px] rounded-full bg-[#E8F2FF] flex items-center justify-center font-bold text-[22px] text-[#007BFF] shrink-0">
              ⌥
            </div>
            <div>
              <div className="font-bold text-[18px] text-[#0B1220]">
                Join Open Source Night
              </div>
              <div className="font-medium text-[13.5px] leading-[1.6] text-[#5B6B85] mt-1.5">
                A monthly community session for hands-on contribution to our repos and others.
              </div>
            </div>
          </div>
          <Link 
            href="https://community.botmartz.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[13.5px] text-white bg-[#007BFF] hover:bg-[#0069DB] px-6 py-3.5 rounded-[9px] shrink-0 transition-colors text-center shadow-md"
          >
            See Next Session →
          </Link>
        </div>
      </div>
    </div>
  );
}
