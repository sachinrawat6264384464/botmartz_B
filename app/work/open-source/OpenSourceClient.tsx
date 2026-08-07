"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { FolderGit2, Star, Users, ShieldCheck, Github, GitPullRequest } from 'lucide-react';

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

const PROTOTYPE_REPOS: RepoItem[] = [
  { category: 'Enterprise RAG', license: 'MIT', name: 'enterprise-rag-starter', desc: 'A production-ready RAG platform with hybrid search, reranking, and advanced evaluation.', tags: ['LangChain', 'FastAPI', 'Qdrant'], stars: '1.0k', forks: '320', githubUrl: 'https://github.com/botmartz/enterprise-rag-starter' },
  { category: 'AI Agents', license: 'Apache-2.0', name: 'langgraph-agent-framework', desc: 'A modular multi-agent framework built with LangGraph for complex reasoning and orchestration.', tags: ['LangGraph', 'Python', 'Redis'], stars: '2.3k', forks: '410', githubUrl: 'https://github.com/botmartz/langgraph-agent-framework' },
  { category: 'Developer Tools', license: 'MIT', name: 'ai-eval-toolkit', desc: 'A lightweight evaluation harness for benchmarking LLM and RAG pipelines.', tags: ['Python', 'Pytest', 'CLI'], stars: '640', forks: '95', githubUrl: 'https://github.com/botmartz/ai-eval-toolkit' },
  { category: 'AI Agents', license: 'MIT', name: 'ai-research-agent', desc: 'Autonomous research agent that searches, reads, analyzes, and generates comprehensive reports.', tags: ['LangChain', 'OpenAI', 'Tavily'], stars: '1.4k', forks: '280', githubUrl: 'https://github.com/botmartz/ai-research-agent' },
  { category: 'Infrastructure', license: 'Apache-2.0', name: 'rag-eval-dashboard', desc: 'A self-hosted dashboard for tracking RAG evaluation metrics over time.', tags: ['Next.js', 'PostgreSQL', 'Docker'], stars: '410', forks: '60', githubUrl: 'https://github.com/botmartz/rag-eval-dashboard' },
  { category: 'Developer Tools', license: 'MIT', name: 'prompt-registry', desc: 'Version-controlled prompt management for teams shipping multiple AI products.', tags: ['TypeScript', 'Redis', 'Docker'], stars: '520', forks: '80', githubUrl: 'https://github.com/botmartz/prompt-registry' },
];

export default function OpenSourceClient({ 
  initialRepos,
  heroContent = {
    badge: "Open Source",
    title: "Open Source Is<br />in Our <span class=\"text-[#00C6FF]\">DNA</span>",
    subtitle: "We believe sharing knowledge and code accelerates innovation for everyone. Every lab we're proud of eventually ships as an open-source repo.",
    ctaText: "Browse Repositories →",
    ctaLink: "#repos",
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

  const heroStats = [
    { value: '15+', label: 'Public Repos', icon: FolderGit2, color: '#00C6FF' },
    { value: '6.5k+', label: 'Combined Stars', icon: Star, color: '#F59E0B' },
    { value: '40+', label: 'Contributors', icon: Users, color: '#0E9F6E' },
    { value: 'MIT/Apache', label: 'Licenses', icon: ShieldCheck, color: '#8B5CF6' },
  ];

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
        stars: r.stars || '100+',
        forks: r.forks || '20+',
        githubUrl: r.githubUrl || r.url || 'https://github.com/botmartz'
      }));
    }
    return PROTOTYPE_REPOS;
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
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": repos.map((r, i) => ({
        "@type": "SoftwareSourceCode",
        "name": r.name,
        "description": r.desc,
        "license": r.license.toLowerCase().includes('mit') ? "https://opensource.org/licenses/MIT" : "https://opensource.org/licenses/Apache-2.0",
        "codeRepository": r.githubUrl,
        "programmingLanguage": r.tags
      }))
    }
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
                  href={heroContent.ctaLink || "#repos"} 
                  className="inline-flex items-center gap-2 bg-[#007BFF] hover:bg-[#0069DB] text-white font-bold text-[14px] px-6 py-3.5 rounded-[9px] shadow-[0_8px_24px_rgba(0,123,255,0.35)] transition-all"
                >
                  {heroContent.ctaText || "Browse Repositories →"}
                </a>
                <a 
                  href="https://github.com/botmartz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold text-[14px] px-6 py-3.5 rounded-[9px] transition-all"
                >
                  View GitHub Org ⌥
                </a>
              </div>
            </div>

            {/* Right Column: Open Source Floating Graphic */}
            <div className="relative h-[400px] w-full max-w-[480px] mx-auto lg:ml-auto flex items-center justify-center mt-12 lg:mt-0 overflow-visible" suppressHydrationWarning>
              {/* Scale wrapper for mobile */}
              <div className="relative w-[360px] h-[360px] scale-[0.85] sm:scale-100 flex-shrink-0">
                {/* Background ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(0,198,255,0.1)_0%,transparent_60%)] animate-pulse pointer-events-none"></div>

                {/* Orbiting rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] border border-[#00C6FF]/25 rounded-full animate-spin-slow pointer-events-none" style={{ animationDuration: '25s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] border border-[#00C6FF]/35 rounded-full animate-spin-slow pointer-events-none" style={{ animationDuration: '18s', animationDirection: 'reverse' }}></div>

                {/* Central Core: Open Source Engine */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full bg-[#060C1F]/90 border border-[#00C6FF]/60 backdrop-blur-xl shadow-[0_0_50px_rgba(0,198,255,0.4)] z-10 flex flex-col items-center justify-center">
                  <div className="absolute inset-0 bg-[#00C6FF]/20 blur-xl rounded-full animate-pulse"></div>
                  <Github className="w-9 h-9 text-[#00C6FF] mb-1 relative z-10 drop-shadow-md" />
                  <span className="font-black text-[12px] tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00C6FF] relative z-10 text-center leading-tight">OPEN<br/>SOURCE</span>
                </div>

                {/* Floating Element: Repositories (Outer Ring Top Left -135deg) */}
                <div className="absolute z-20" style={{ top: '53px', left: '53px', transform: 'translate(-50%, -50%)' }}>
                  <div className="animate-float" style={{ animationDelay: '0s' }}>
                    <div className="flex items-center gap-3 bg-[#0A1630]/90 border border-[#00C6FF]/40 px-4 py-2.5 rounded-2xl shadow-xl backdrop-blur-md">
                      <div className="w-8 h-8 rounded-full bg-[#00C6FF]/10 flex items-center justify-center shrink-0 border border-[#00C6FF]/20">
                        <FolderGit2 className="w-4 h-4 text-[#00C6FF]" />
                      </div>
                      <div className="font-extrabold text-[12px] text-white tracking-widest uppercase whitespace-nowrap">Public Repos</div>
                    </div>
                  </div>
                </div>

                {/* Floating Element: Community (Outer Ring Top Right -45deg) */}
                <div className="absolute z-20" style={{ top: '53px', left: '307px', transform: 'translate(-50%, -50%)' }}>
                  <div className="animate-float" style={{ animationDelay: '1s' }}>
                    <div className="flex items-center gap-3 bg-[#0A1630]/90 border border-[#0E9F6E]/40 px-4 py-2.5 rounded-2xl shadow-xl backdrop-blur-md">
                      <div className="w-8 h-8 rounded-full bg-[#0E9F6E]/10 flex items-center justify-center shrink-0 border border-[#0E9F6E]/20">
                        <Users className="w-4 h-4 text-[#0E9F6E]" />
                      </div>
                      <div className="font-extrabold text-[12px] text-white tracking-widest uppercase whitespace-nowrap">Community</div>
                    </div>
                  </div>
                </div>

                {/* Floating Element: Pull Requests (Inner Ring Top -90deg) */}
                <div className="absolute z-20" style={{ top: '50px', left: '180px', transform: 'translate(-50%, -50%)' }}>
                  <div className="animate-float" style={{ animationDelay: '2.5s' }}>
                    <div className="flex items-center gap-3 bg-[#0A1630]/90 border border-[#EC4899]/40 px-4 py-2.5 rounded-2xl shadow-xl backdrop-blur-md">
                      <div className="w-8 h-8 rounded-full bg-[#EC4899]/10 flex items-center justify-center shrink-0 border border-[#EC4899]/20">
                        <GitPullRequest className="w-4 h-4 text-[#EC4899]" />
                      </div>
                      <div className="font-extrabold text-[12px] text-white tracking-widest uppercase whitespace-nowrap">Pull Requests</div>
                    </div>
                  </div>
                </div>

                {/* Floating Element: Global Stars (Outer Ring Bottom Right 45deg) */}
                <div className="absolute z-20" style={{ top: '307px', left: '307px', transform: 'translate(-50%, -50%)' }}>
                  <div className="animate-float" style={{ animationDelay: '1.5s' }}>
                    <div className="flex items-center gap-3 bg-[#0A1630]/90 border border-[#F59E0B]/40 px-4 py-2.5 rounded-2xl shadow-xl backdrop-blur-md">
                      <div className="w-8 h-8 rounded-full bg-[#F59E0B]/10 flex items-center justify-center shrink-0 border border-[#F59E0B]/20">
                        <Star className="w-4 h-4 text-[#F59E0B]" />
                      </div>
                      <div className="font-extrabold text-[12px] text-white tracking-widest uppercase whitespace-nowrap">Global Stars</div>
                    </div>
                  </div>
                </div>

                {/* Floating Element: Licenses (Outer Ring Bottom Left 135deg) */}
                <div className="absolute z-20" style={{ top: '307px', left: '53px', transform: 'translate(-50%, -50%)' }}>
                  <div className="animate-float" style={{ animationDelay: '0.8s' }}>
                    <div className="flex items-center gap-3 bg-[#0A1630]/90 border border-[#8B5CF6]/40 px-4 py-2.5 rounded-2xl shadow-xl backdrop-blur-md">
                      <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center shrink-0 border border-[#8B5CF6]/20">
                        <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
                      </div>
                      <div className="font-extrabold text-[12px] text-white tracking-widest uppercase whitespace-nowrap">MIT/Apache</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── REPOSITORIES FILTER HEADER ── */}
      <div id="repos" className="max-w-[1240px] mx-auto pt-16 px-6 sm:px-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="font-bold text-[12px] tracking-[0.1em] text-[#007BFF] uppercase">
            Repositories
          </div>
          <div className="font-extrabold text-[26px] sm:text-[30px] text-[#0B1220] mt-2">
            Explore Our Open Source Work
          </div>
        </div>

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
      </div>

      {/* ── REPOSITORIES GRID ── */}
      <div className="max-w-[1240px] mx-auto pt-6 px-6 sm:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

            <div className="flex items-center gap-4 mt-2 pt-3 border-t border-[#EEF1F6] font-semibold text-[12px] text-[#8A97AC]">
              <span>★ {repo.stars}</span>
              <span>⑂ {repo.forks}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── GET INVOLVED STEPS ── */}
      <div className="max-w-[1240px] mx-auto mt-16 px-6 sm:px-10">
        <div className="bg-[#060C1F] rounded-[18px] p-8 sm:p-11 relative overflow-hidden shadow-xl">
          <div 
            className="absolute w-[300px] h-[300px] rounded-full right-[-70px] top-[-100px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0,123,255,0.2), transparent 70%)' }}
          />
          <div className="relative z-10">
            <div className="font-bold text-[11.5px] tracking-[0.08em] text-[#00C6FF] uppercase">
              Get Involved
            </div>
            <div className="font-extrabold text-[26px] sm:text-[28px] text-white mt-2.5">
              How to Contribute
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-4 border-t border-white/10">
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-full border border-[#00C6FF]/40 bg-[#00C6FF]/10 flex items-center justify-center font-bold text-[13px] text-[#00C6FF]">
                    {step.n}
                  </div>
                  <div className="font-bold text-[14.5px] text-white">
                    {step.title}
                  </div>
                  <div className="font-medium text-[12.5px] leading-[1.55] text-[#7C8CAD]">
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
            href="/community/events" 
            className="font-bold text-[13.5px] text-white bg-[#007BFF] hover:bg-[#0069DB] px-6 py-3.5 rounded-[9px] shrink-0 transition-colors text-center shadow-md"
          >
            See Next Session →
          </Link>
        </div>
      </div>
    </div>
  );
}
