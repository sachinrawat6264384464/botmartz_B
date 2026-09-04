"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Send, CheckCircle2, Sparkles, X, Loader2, ArrowRight } from 'lucide-react';

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
  { 
    id: 'intern-1', 
    slug: 'graphic-designer',
    dept: 'Design', 
    location: 'Remote · Flexible', 
    title: 'Graphic Designer', 
    desc: 'Create visual identity & communication assets across social media, events, workshops, campaigns, presentations, and websites.' 
  },
  { 
    id: 'intern-2', 
    slug: 'event-organizer',
    dept: 'Community', 
    location: 'Remote · Flexible', 
    title: 'Event Organizer', 
    desc: 'Plan and execute Botmartz Community events, technical sessions, workshops, webinars, hackathons, and meetups.' 
  },
  { 
    id: 'intern-3', 
    slug: 'devrel-intern',
    dept: 'Community', 
    location: 'Remote · Part-Time', 
    title: 'Developer Relations (DevRel) Intern', 
    desc: 'Build the developer ecosystem around Botmartz\'s AI Engineering work through technical content, open-source support, and developer engagement.' 
  },
  { 
    id: 'intern-4', 
    slug: 'brand-partnerships',
    dept: 'Business & Growth', 
    location: 'Remote · Flexible', 
    title: 'Brand & Partnerships', 
    desc: 'Build relationships between Botmartz and colleges, communities, startups, companies, and event partners.' 
  },
  { 
    id: 'intern-5', 
    slug: 'video-editor-photographer',
    dept: 'Design & Media', 
    location: 'Remote · Flexible', 
    title: 'Video Editor & Photographer', 
    desc: 'Transform Botmartz activities, events, workshops, projects, and people into high-quality visual stories.' 
  },
  { 
    id: 'intern-6', 
    slug: 'social-media-manager',
    dept: 'Marketing', 
    location: 'Remote · Flexible', 
    title: 'Social Media Manager', 
    desc: 'Manage and strategically grow Botmartz\'s presence across LinkedIn, Instagram, X, and community channels.' 
  },
  { 
    id: 'intern-7', 
    slug: 'content-writer',
    dept: 'Content', 
    location: 'Remote · Flexible', 
    title: 'Content Writer', 
    desc: 'Communicate what Botmartz is building through technical, educational, community, and business-oriented content.' 
  },
  { 
    id: 'intern-8', 
    slug: 'community-management-intern',
    dept: 'Community', 
    location: 'Remote · Part-Time', 
    title: 'Community Management Intern', 
    desc: 'Help us build and grow the Botmartz AI Engineering Community of AI engineers, developers, and students.' 
  }
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
  structuredData
}: { 
  initialJobs: any[];
  heroContent?: any;
  structuredData?: string;
}) {
  const [filter, setFilter] = useState('All Roles');
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedRoleTitle, setSelectedRoleTitle] = useState<string>('General Application');
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');
  
  const [applyForm, setApplyForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolioUrl: '',
    experienceLevel: 'Students / Freshers',
    coverNote: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const roles: JobRole[] = useMemo(() => {
    const firestoreRoles: JobRole[] = Array.isArray(initialJobs) ? initialJobs.map(j => ({
      id: j.id,
      slug: j.slug,
      dept: j.department || j.dept || 'Engineering',
      location: j.location || 'Remote',
      title: j.title || 'AI Engineer',
      desc: j.shortDescription || j.desc || j.responsibilities || 'Build and deploy advanced AI solutions.'
    })) : [];

    if (firestoreRoles.length > 0) {
      return firestoreRoles;
    }

    return PROTOTYPE_ROLES;
  }, [initialJobs]);

  const departments = useMemo(() => {
    const set = new Set<string>();
    roles.forEach(r => {
      if (r.dept) set.add(r.dept);
    });
    return ['All Roles', ...Array.from(set)];
  }, [roles]);

  const heroStats = useMemo(() => [
    { value: roles.length.toString(), label: 'Open Roles' },
    { value: '100%', label: 'Remote-Friendly' },
    { value: '2026', label: 'Team Founded' },
    { value: '24-48h', label: 'Response Time' },
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

  const openApplicationForm = (role?: JobRole) => {
    if (role) {
      setSelectedRoleTitle(role.title);
      setSelectedRoleId(role.id || '');
    } else {
      setSelectedRoleTitle('General Application');
      setSelectedRoleId('');
    }
    setErrorMessage('');
    setShowApplyModal(true);
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!applyForm.fullName || !applyForm.email || !applyForm.phone || !applyForm.portfolioUrl) {
      setErrorMessage('Please fill in all required fields marked with *');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: applyForm.fullName,
          email: applyForm.email,
          phone: applyForm.phone,
          roleTitle: selectedRoleTitle,
          roleId: selectedRoleId,
          portfolioUrl: applyForm.portfolioUrl,
          experienceLevel: applyForm.experienceLevel,
          coverNote: applyForm.coverNote
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setShowApplyModal(false);
          setSubmitted(false);
          setApplyForm({
            fullName: '',
            email: '',
            phone: '',
            portfolioUrl: '',
            experienceLevel: 'Students / Freshers',
            coverNote: ''
          });
        }, 3000);
      } else {
        setErrorMessage(data.error || 'Failed to submit application. Please try again.');
      }
    } catch (err: any) {
      console.error("Application submission error:", err);
      setErrorMessage("Network error occurred. Please try again.");
    }
    setSubmitting(false);
  };

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Careers at Botmartz | Build the Future of AI Engineering",
    "description": "Join our engineering and research team building production AI systems and community around them in Indore, India and Remote.",
    "url": "https://www.botmartz.com/careers"
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

          {/* HIGH IMPACT URGENCY BANNER */}
          <div className="mb-6 inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-brand/20 border border-amber-400/40 rounded-full px-4 py-2 text-amber-300 font-bold text-xs sm:text-sm animate-pulse shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>🔥 Roles Open — Apply Hurry Up & Join the Botmartz Team!</span>
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
                  href="#roles" 
                  className="inline-flex items-center gap-2 bg-[#007BFF] hover:bg-[#0069DB] text-white font-bold text-[14px] px-6 py-3.5 rounded-[9px] shadow-[0_8px_24px_rgba(0,123,255,0.35)] transition-all"
                >
                  View Open Roles →
                </a>
                <button
                  onClick={() => openApplicationForm()}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-[14px] px-6 py-3.5 rounded-[9px] shadow-lg transition-all cursor-pointer"
                >
                  Apply Directly <Send size={15} />
                </button>
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
          <div className="flex items-center gap-2">
            <span className="font-bold text-[12px] tracking-[0.1em] text-[#007BFF] uppercase">
              Open Roles
            </span>
            <span className="bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase">
              🔥 Hiring Now
            </span>
          </div>
          <div className="font-extrabold text-[26px] sm:text-[30px] text-[#0B1220] mt-2">
            Join the Team — Apply Today
          </div>
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
              className="bg-white border border-[#E7ECF3] rounded-[14px] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-sm hover:border-[#007BFF]/40 transition-all group"
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
                <div className="font-bold text-[17px] text-[#0B1220] mt-2 group-hover:text-[#007BFF] transition-colors">
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

              <div className="flex items-center gap-3 shrink-0">
                {role.slug && (
                  <Link
                    href={`/careers/${role.slug}`}
                    className="font-bold text-[13px] text-[#007BFF] bg-[#E8F2FF] hover:bg-[#D4E5FF] px-4 py-3 rounded-[9px] transition-all text-center inline-flex items-center gap-1.5"
                  >
                    Details <ArrowRight size={14} />
                  </Link>
                )}

                <button
                  onClick={() => openApplicationForm(role)}
                  className="font-bold text-[13px] text-white bg-[#007BFF] hover:bg-[#0052CC] px-5 py-3 rounded-[9px] transition-all text-center inline-flex items-center gap-2 shadow-[0_4px_14px_rgba(0,102,255,0.3)] hover:scale-[1.02] cursor-pointer"
                >
                  Apply Now <Send size={14} />
                </button>
              </div>
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
                We're always open to meeting strong engineers, designers, and community builders. Fill out the application form — we'll review it immediately!
              </div>
            </div>
            <button
              onClick={() => openApplicationForm()}
              className="font-bold text-[13.5px] text-white bg-[#007BFF] hover:bg-[#0052CC] px-6 py-3.5 rounded-[9px] shadow-[0_8px_24px_rgba(0,123,255,0.35)] shrink-0 transition-all text-center inline-flex items-center gap-2 hover:scale-[1.02] cursor-pointer"
            >
              Submit Spontaneous Application <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ── APPLICATION FORM MODAL ── */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-[#0A1224] border border-white/15 rounded-2xl w-full max-w-lg p-6 sm:p-8 text-white relative shadow-2xl my-8">
            {/* Close button */}
            <button
              onClick={() => setShowApplyModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-bold text-white">Application Received!</h3>
                <p className="text-gray-300 text-sm max-w-sm mx-auto">
                  Thank you for applying for <strong className="text-[#00C6FF]">{selectedRoleTitle}</strong>. Our team will review your profile and reach out shortly.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-[11px] font-bold text-[#00C6FF] bg-[#00C6FF]/10 px-2.5 py-1 rounded uppercase tracking-wider">
                    Careers @ Botmartz
                  </span>
                  <h2 className="text-2xl font-bold text-white mt-2">Apply for Position</h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Complete the details below to submit your application directly to our team.
                  </p>
                </div>

                {errorMessage && (
                  <div className="mb-4 p-3 bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs rounded-lg">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleApplySubmit} className="space-y-4">
                  {/* Role Dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Applying For <span className="text-rose-400">*</span>
                    </label>
                    <select
                      value={selectedRoleTitle}
                      onChange={(e) => {
                        setSelectedRoleTitle(e.target.value);
                        const matched = roles.find(r => r.title === e.target.value);
                        setSelectedRoleId(matched?.id || '');
                      }}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00C6FF]"
                      required
                    >
                      <option value="General Application" className="bg-[#0A1224] text-white">
                        General Application (Other)
                      </option>
                      {roles.map(r => (
                        <option key={r.id || r.title} value={r.title} className="bg-[#0A1224] text-white">
                          {r.title} ({r.dept})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={applyForm.fullName}
                      onChange={(e) => setApplyForm({ ...applyForm, fullName: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00C6FF]"
                      required
                    />
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={applyForm.email}
                        onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00C6FF]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                        Phone / WhatsApp <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 9876543210"
                        value={applyForm.phone}
                        onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00C6FF]"
                        required
                      />
                    </div>
                  </div>

                  {/* Portfolio / LinkedIn URL */}
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      LinkedIn / Portfolio URL <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.in/in/username or portfolio link"
                      value={applyForm.portfolioUrl}
                      onChange={(e) => setApplyForm({ ...applyForm, portfolioUrl: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00C6FF]"
                      required
                    />
                  </div>

                  {/* Experience Level */}
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Experience Level / Status
                    </label>
                    <select
                      value={applyForm.experienceLevel}
                      onChange={(e) => setApplyForm({ ...applyForm, experienceLevel: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00C6FF]"
                    >
                      <option value="Students / Freshers" className="bg-[#0A1224] text-white">Students / Freshers</option>
                      <option value="1-2 Years Experience" className="bg-[#0A1224] text-white">1-2 Years Experience</option>
                      <option value="3+ Years Experience" className="bg-[#0A1224] text-white">3+ Years Experience</option>
                    </select>
                  </div>

                  {/* Cover Note */}
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Short Cover Note / Why Botmartz?
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us briefly about your background, projects, or why you want to join..."
                      value={applyForm.coverNote}
                      onChange={(e) => setApplyForm({ ...applyForm, coverNote: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00C6FF]"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#007BFF] hover:bg-[#0052CC] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
