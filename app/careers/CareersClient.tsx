"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';

interface JobRole {
  id?: string;
  slug?: string;
  dept: string;
  department?: string;
  location: string;
  title: string;
  desc: string;
  shortDescription?: string;
}

const PROTOTYPE_ROLES: JobRole[] = [
  { id: 'intern-1', dept: 'Community', location: 'Remote · Part-Time', title: 'Community Management Intern', desc: 'Help us build and grow the Botmartz AI Engineering Community of AI engineers, developers and students.' },
  { id: '1', dept: 'Engineering', location: 'Indore, India · On-site', title: 'AI Engineer — Enterprise RAG', desc: 'Design and ship production RAG systems for enterprise clients, from retrieval to evaluation.' },
  { id: '2', dept: 'Engineering', location: 'Remote', title: 'Agent Systems Engineer', desc: 'Build multi-agent workflows with LangGraph for real business processes, not demos.' },
  { id: '3', dept: 'Research', location: 'Remote', title: 'AI/ML Research Engineer', desc: 'Explore new techniques in evaluation, fine-tuning and responsible AI, and bring them to production.' },
  { id: '4', dept: 'Community', location: 'Indore, India', title: 'Community & Events Lead', desc: 'Run AI Frontier, monthly meetups, and the Botmartz AI Engineering Community end-to-end.' },
  { id: '5', dept: 'Design', location: 'Remote', title: 'Product Designer', desc: 'Design interfaces for AI-native products used by engineers and enterprise teams.' },
];

export default function CareersClient({ 
  initialJobs,
  heroContent = {
    badge: "Careers at Botmartz",
    title: "Build the Future of<br /><span class=\"text-[#00C6FF]\">AI Engineering</span> With Us",
    subtitle: "We're a small team of engineers shipping production AI systems and building the community around them. If you'd rather build than talk about building, you'll fit right in.",
    ctaText: "View Open Roles →",
    ctaLink: "#roles",
  },
  structuredData,
  aeoQuestion,
  aeoAnswer
}: { 
  initialJobs: any[];
  heroContent?: any;
  structuredData?: string;
  aeoQuestion?: string;
  aeoAnswer?: string;
}) {
  const [filter, setFilter] = useState('All Roles');
  const [selectedRoleForApply, setSelectedRoleForApply] = useState<JobRole | null>(null);
  const [applyForm, setApplyForm] = useState({ name: '', email: '', phone: '', linkedinOrResume: '', note: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const roles: JobRole[] = useMemo(() => {
    if (Array.isArray(initialJobs) && initialJobs.length > 0) {
      return initialJobs.map(j => ({
        id: j.id,
        slug: j.slug,
        dept: j.department || j.dept || 'Engineering',
        location: j.location || 'Remote',
        title: j.title || 'AI Engineer',
        desc: j.shortDescription || j.desc || j.responsibilities || 'Build and deploy advanced AI solutions.'
      }));
    }
    return PROTOTYPE_ROLES;
  }, [initialJobs]);

  const departments = useMemo(() => {
    const set = new Set<string>();
    roles.forEach(r => {
      if (r.dept) set.add(r.dept);
    });
    const defaultDepts = ['Engineering', 'Research', 'Community', 'Design'];
    defaultDepts.forEach(d => set.add(d));
    return ['All Roles', ...Array.from(set)];
  }, [roles]);

  const heroStats = useMemo(() => [
    { value: roles.length.toString(), label: 'Open Roles' },
    { value: '100%', label: 'Remote-Friendly' },
    { value: '2026', label: 'Team Founded' },
    { value: '4.8', label: 'Team Rating' },
  ], [roles]);

  const values = [
    { tag: 'SH', title: 'Ship Real Systems', desc: 'We build production AI, not proof-of-concepts that never leave the lab.' },
    { tag: 'OS', title: 'Open by Default', desc: 'We open source what we can and share what we learn with the community.' },
    { tag: 'OW', title: 'High Ownership', desc: 'Small team, real autonomy — you own projects end to end.' },
    { tag: 'GR', title: 'Always Learning', desc: 'The field moves fast; we set aside real time to learn and experiment.' },
  ];

  const visibleRoles: JobRole[] = useMemo(() => {
    if (filter === 'All Roles') return roles;
    return roles.filter(r => r.dept.toLowerCase().includes(filter.toLowerCase()) || filter.toLowerCase().includes(r.dept.toLowerCase()));
  }, [filter, roles]);

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Careers at Botmartz | Build the Future of AI Engineering",
    "description": "Join our engineering and research team building production AI systems and community around them in Indore, India and Remote.",
    "url": "https://www.botmartz.com/careers",
    "about": {
      "@type": "Organization",
      "name": "Botmartz",
      "sameAs": "https://www.botmartz.com"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": roles.map((r, i) => ({
        "@type": "JobPosting",
        "title": r.title,
        "description": r.desc,
        "jobLocation": r.location.toLowerCase().includes('remote') ? { "@type": "Place", "address": "Remote" } : { "@type": "Place", "address": { "@type": "PostalAddress", "addressLocality": "Indore", "addressCountry": "IN" } },
        "employmentType": "FULL_TIME",
        "hiringOrganization": { "@type": "Organization", "name": "Botmartz", "sameAs": "https://www.botmartz.com" }
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
            <span>Company</span>
            <span>›</span>
            <span className="text-[#00C6FF]">Careers</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div>
              <div className="font-bold text-[12px] tracking-[0.1em] text-[#00C6FF] uppercase">
                {heroContent.badge || "Careers at Botmartz"}
              </div>
              <h1 
                className="font-extrabold text-[clamp(32px,4.5vw,44px)] leading-[1.15] text-white mt-4"
                dangerouslySetInnerHTML={{ __html: heroContent.title || 'Build the Future of<br /><span class="text-[#00C6FF]">AI Engineering</span> With Us' }}
              />
              <p className="font-medium text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#8FA3C4] mt-4.5 max-w-[480px]">
                {heroContent.subtitle || "We're a small team of engineers shipping production AI systems and building the community around them. If you'd rather build than talk about building, you'll fit right in."}
              </p>
              <div className="flex flex-wrap gap-3.5 mt-7">
                <a 
                  href={heroContent.ctaLink || "#roles"} 
                  className="inline-flex items-center gap-2 bg-[#007BFF] hover:bg-[#0069DB] text-white font-bold text-[14px] px-6 py-3.5 rounded-[9px] shadow-[0_8px_24px_rgba(0,123,255,0.35)] transition-all"
                >
                  {heroContent.ctaText || "View Open Roles →"}
                </a>
                <a 
                  href="#values" 
                  className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold text-[14px] px-6 py-3.5 rounded-[9px] transition-all"
                >
                  Life at Botmartz
                </a>
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

      {/* ── HOW WE WORK / VALUES ── */}
      <div id="values" className="max-w-[1240px] mx-auto pt-14 px-6 sm:px-10">
        <div className="text-center max-w-[640px] mx-auto mb-10">
          <div className="font-bold text-[12px] tracking-[0.1em] text-[#007BFF] uppercase">
            How We Work
          </div>
          <h2 className="font-extrabold text-[28px] sm:text-[32px] leading-[1.3] text-[#0B1220] mt-3">
            What It's Like to Work Here
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, idx) => (
            <div 
              key={idx}
              className="bg-white border border-[#E7ECF3] rounded-[14px] p-5 sm:p-6 flex flex-col gap-2.5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-[34px] h-[34px] rounded-[9px] bg-[#E8F2FF] flex items-center justify-center font-bold text-[10.5px] text-[#007BFF]">
                {v.tag}
              </div>
              <div className="font-bold text-[15px] text-[#0B1220] mt-1">
                {v.title}
              </div>
              <div className="font-medium text-[13px] leading-[1.55] text-[#5B6B85]">
                {v.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── OPEN ROLES FILTER HEADER ── */}
      <div id="roles" className="max-w-[1240px] mx-auto pt-16 px-6 sm:px-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="font-bold text-[12px] tracking-[0.1em] text-[#007BFF] uppercase">
            Open Roles
          </div>
          <div className="font-extrabold text-[26px] sm:text-[30px] text-[#0B1220] mt-2">
            Join the Team
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {departments.map((dept) => {
            const active = filter === dept;
            return (
              <button
                key={dept}
                onClick={() => setFilter(dept)}
                className={`font-bold text-[12.5px] px-4 py-2.5 rounded-[8px] border transition-all ${
                  active
                    ? 'bg-[#007BFF] border-[#007BFF] text-white shadow-sm'
                    : 'bg-white border-[#E2E8F0] text-[#3A4459] hover:bg-[#F8FAFC]'
                }`}
              >
                {dept}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── ROLES LIST ── */}
      <div className="max-w-[1240px] mx-auto pt-6 px-6 sm:px-10 flex flex-col gap-3.5">
        {visibleRoles.length === 0 ? (
          <div className="bg-white border border-[#E7ECF3] rounded-[14px] p-10 text-center text-[#5B6B85]">
            No roles currently open in <span className="font-bold text-[#0B1220]">{filter}</span>. Check back soon or submit a general application below!
          </div>
        ) : (
          visibleRoles.map((role, idx) => (
            <div 
              key={role.id || idx}
              className="bg-white border border-[#E7ECF3] rounded-[14px] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-sm hover:border-[#007BFF]/40 transition-all"
            >
              <div className="flex-1 min-w-[260px]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-[10px] tracking-[0.05em] text-[#007BFF] bg-[#E8F2FF] px-2.5 py-1 rounded-[5px] uppercase">
                    {role.dept}
                  </span>
                  <span className="font-semibold text-[11.5px] text-[#8A97AC]">
                    {role.location}
                  </span>
                </div>
                <div className="font-bold text-[17px] text-[#0B1220] mt-2">
                  {role.slug ? (
                    <Link href={`/careers/${role.slug}`} className="hover:text-[#007BFF] transition-colors">
                      {role.title}
                    </Link>
                  ) : (
                    role.title
                  )}
                </div>
                <div className="font-medium text-[13px] leading-[1.6] text-[#5B6B85] mt-1.5 max-w-[620px]">
                  {role.desc}
                </div>
              </div>

              <a
                href={`mailto:sohamnsharma@gmail.com?subject=Application for ${encodeURIComponent(role.title)}`}
                className="font-bold text-[13px] text-white bg-[#007BFF] hover:bg-[#0052CC] px-5 py-3 rounded-[9px] shrink-0 transition-all text-center inline-flex items-center gap-2 shadow-[0_4px_14px_rgba(0,102,255,0.3)] hover:scale-[1.02]"
              >
                <Mail size={15} /> Send CV: sohamnsharma@gmail.com
              </a>
            </div>
          ))
        )}
      </div>

      {/* ── DON'T SEE YOUR ROLE CTA ── */}
      <div className="max-w-[1240px] mx-auto my-16 pb-22 px-6 sm:px-10">
        <div className="bg-[#060C1F] rounded-[18px] p-8 sm:p-11 relative overflow-hidden shadow-xl">
          <div 
            className="absolute w-[280px] h-[280px] rounded-full right-[-70px] bottom-[-120px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0,123,255,0.2), transparent 70%)' }}
          />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-[480px]">
              <div className="font-extrabold text-[26px] sm:text-[28px] leading-[1.3] text-white">
                Don't See Your <span className="text-[#00C6FF]">Role?</span>
              </div>
              <div className="font-medium text-[13.5px] sm:text-[14.5px] leading-[1.65] text-[#8FA3C4] mt-3">
                We're always open to meeting strong AI engineers. Send your CV to <strong className="text-[#00C6FF]">sohamnsharma@gmail.com</strong> — we'll find a place for it.
              </div>
            </div>
            <a
              href="mailto:sohamnsharma@gmail.com?subject=General Career Application — Botmartz AI"
              className="font-bold text-[13.5px] text-white bg-[#007BFF] hover:bg-[#0052CC] px-6 py-3.5 rounded-[9px] shadow-[0_8px_24px_rgba(0,123,255,0.35)] shrink-0 transition-all text-center inline-flex items-center gap-2 hover:scale-[1.02]"
            >
              <Mail size={16} /> Send CV: sohamnsharma@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
