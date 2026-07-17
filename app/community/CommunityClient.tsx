"use client";

import React from 'react';
import Link from 'next/link';

export default function CommunityClient() {
  const heroStats = [
    { value: '5', label: 'Community Pillars' },
    { value: '2026', label: 'Community Launch' },
    { value: '6+', label: 'Events / Year' },
    { value: '100+', label: 'Members & Growing' },
  ];

  const pillars = [
    { tag: 'MU', title: 'Monthly Meetups', desc: 'In-person sessions in Indore for engineers to share projects and production lessons.', cta: 'See meetups', href: '/community/events' },
    { tag: 'DC', title: 'Discord', desc: 'The daily home for questions, job posts, and project feedback.', cta: 'Join server', href: 'https://discord.gg/botmartz' },
    { tag: 'GH', title: 'Open-Source GitHub Org', desc: 'Community-maintained tools and starter kits for AI engineers.', cta: 'View org', href: 'https://github.com/botmartz' },
    { tag: 'RC', title: 'Reading Club', desc: 'A biweekly deep dive into papers and posts shaping AI engineering.', cta: 'Read along', href: '/community/events' },
    { tag: 'HK', title: 'Hackathons', desc: 'Weekend build sprints turning ideas into shipped agents and RAG systems.', cta: 'See hackathons', href: '/community/events' },
    { tag: 'NL', title: 'Newsletter', desc: 'A monthly roundup of community highlights, jobs and events.', cta: 'Subscribe', href: '#newsletter' },
  ];

  const scorecards = [
    { title: 'Community', desc: 'Satisfaction, repeat attendance, and steady member growth.' },
    { title: 'Brand', desc: 'Reach, followers, traffic, GitHub activity, and speaker relationships.' },
    { title: 'Commercial', desc: 'Discovery calls, follow-up meetings, pilots and partnerships — over time.' },
  ];

  return (
    <div className="bg-[#F5F8FC] min-h-screen font-sans text-[#0B1220]">
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
            <span className="text-[#00C6FF]">Community</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div>
              <div className="font-bold text-[12px] tracking-[0.1em] text-[#00C6FF] uppercase">
                Botmartz AI Engineering Community
              </div>
              <h1 className="font-extrabold text-[clamp(32px,4.5vw,44px)] leading-[1.15] text-white mt-4">
                One Community.<br />
                <span className="text-[#00C6FF]">Many Ways</span> to Build.
              </h1>
              <p className="font-medium text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#8FA3C4] mt-4.5 max-w-[480px]">
                Launched at AI Frontier 2026 — meetups, a Discord, an open-source GitHub org, a reading club and hackathons, all in one place for engineers who want to build, not just watch.
              </p>
              <div className="flex flex-wrap gap-3.5 mt-7">
                <a 
                  href="https://discord.gg/botmartz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#007BFF] hover:bg-[#0069DB] text-white font-bold text-[14px] px-6 py-3.5 rounded-[9px] shadow-[0_8px_24px_rgba(0,123,255,0.35)] transition-all"
                >
                  Join the Discord →
                </a>
                <Link 
                  href="/community/events" 
                  className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold text-[14px] px-6 py-3.5 rounded-[9px] transition-all"
                >
                  See Upcoming Events
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {heroStats.map((s, idx) => (
                <div 
                  key={idx}
                  className="bg-white/[0.04] border border-white/10 rounded-[14px] p-5 backdrop-blur-sm"
                >
                  <div className="font-extrabold text-[26px] sm:text-[30px] text-[#00C6FF] leading-none">
                    {s.value}
                  </div>
                  <div className="font-semibold text-[12px] sm:text-[13px] text-[#8FA3C4] mt-1.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SIX PILLARS ── */}
      <div className="max-w-[1240px] mx-auto pt-16 px-6 sm:px-10">
        <div className="text-center max-w-[640px] mx-auto mb-10">
          <div className="font-bold text-[12px] tracking-[0.1em] text-[#007BFF] uppercase">
            Six Pillars
          </div>
          <h2 className="font-extrabold text-[28px] sm:text-[32px] leading-[1.3] text-[#0B1220] mt-3">
            Everything Under One Roof
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((p, idx) => (
            <div 
              key={idx}
              className="bg-white border border-[#E7ECF3] rounded-[14px] p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-all hover:border-[#007BFF]/40"
            >
              <div className="w-[38px] h-[38px] rounded-[10px] bg-[#E8F2FF] flex items-center justify-center font-bold text-[11px] text-[#007BFF]">
                {p.tag}
              </div>
              <div className="font-bold text-[16px] text-[#0B1220]">
                {p.title}
              </div>
              <div className="font-medium text-[13px] leading-[1.6] text-[#5B6B85] flex-1">
                {p.desc}
              </div>
              <Link 
                href={p.href}
                className="font-bold text-[12.5px] text-[#007BFF] hover:text-[#0069DB] mt-1 inline-flex items-center gap-1 transition-colors"
              >
                {p.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ── COMMUNITY SCORECARD ── */}
      <div className="max-w-[1240px] mx-auto mt-16 px-6 sm:px-10">
        <div className="bg-[#060C1F] rounded-[18px] p-8 sm:p-11 relative overflow-hidden shadow-xl">
          <div 
            className="absolute w-[300px] h-[300px] rounded-full right-[-70px] top-[-100px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0,123,255,0.2), transparent 70%)' }}
          />
          <div className="relative z-10">
            <div className="font-bold text-[11.5px] tracking-[0.08em] text-[#00C6FF] uppercase">
              Community Scorecard
            </div>
            <div className="font-extrabold text-[26px] sm:text-[28px] text-white mt-2.5">
              How We Measure Success
            </div>
            <p className="font-medium text-[13px] leading-[1.6] text-[#8FA3C4] max-w-[520px] mt-2.5">
              We track this community on three separate scorecards — never just the commercial one.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-7 pt-4 border-t border-white/10">
              {scorecards.map((s, idx) => (
                <div key={idx} className="flex flex-col gap-2.5">
                  <div className="font-bold text-[15px] text-white">
                    {s.title}
                  </div>
                  <div className="font-medium text-[12.5px] leading-[1.55] text-[#7C8CAD]">
                    {s.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── NOT ON DISCORD YET CTA ── */}
      <div id="newsletter" className="max-w-[1240px] mx-auto my-14 pb-22 px-6 sm:px-10">
        <div className="bg-white border border-[#E7ECF3] rounded-[16px] p-7 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-[64px] h-[64px] rounded-full bg-[#E8F2FF] flex items-center justify-center font-bold text-[20px] text-[#007BFF] shrink-0">
              ◈
            </div>
            <div>
              <div className="font-bold text-[18px] text-[#0B1220]">
                Not on Discord Yet?
              </div>
              <div className="font-medium text-[13.5px] leading-[1.6] text-[#5B6B85] mt-1.5">
                Join hundreds of AI engineers already sharing projects, jobs and ideas.
              </div>
            </div>
          </div>
          <a 
            href="https://discord.gg/botmartz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-bold text-[13.5px] text-white bg-[#007BFF] hover:bg-[#0069DB] px-6 py-3.5 rounded-[9px] shrink-0 transition-colors text-center shadow-md"
          >
            Join the Discord →
          </a>
        </div>
      </div>
    </div>
  );
}
