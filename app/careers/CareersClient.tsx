"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface JobRole {
  id?: string;
  dept: string;
  department?: string;
  location: string;
  title: string;
  desc: string;
  shortDescription?: string;
}

const PROTOTYPE_ROLES: JobRole[] = [
  { id: '1', dept: 'Engineering', location: 'Indore, India · On-site', title: 'AI Engineer — Enterprise RAG', desc: 'Design and ship production RAG systems for enterprise clients, from retrieval to evaluation.' },
  { id: '2', dept: 'Engineering', location: 'Remote', title: 'Agent Systems Engineer', desc: 'Build multi-agent workflows with LangGraph for real business processes, not demos.' },
  { id: '3', dept: 'Research', location: 'Remote', title: 'AI/ML Research Engineer', desc: 'Explore new techniques in evaluation, fine-tuning and responsible AI, and bring them to production.' },
  { id: '4', dept: 'Community', location: 'Indore, India', title: 'Community & Events Lead', desc: 'Run AI Frontier, monthly meetups, and the Botmartz AI Engineering Community end-to-end.' },
  { id: '5', dept: 'Design', location: 'Remote', title: 'Product Designer', desc: 'Design interfaces for AI-native products used by engineers and enterprise teams.' },
];

export default function CareersClient({ initialJobs }: { initialJobs: any[] }) {
  const [filter, setFilter] = useState('All Roles');
  const [selectedRoleForApply, setSelectedRoleForApply] = useState<JobRole | null>(null);
  const [applyForm, setApplyForm] = useState({ name: '', email: '', phone: '', linkedinOrResume: '', note: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const departments = ['All Roles', 'Engineering', 'Research', 'Community', 'Design'];

  const heroStats = [
    { value: '5', label: 'Open Roles' },
    { value: '100%', label: 'Remote-Friendly' },
    { value: '2026', label: 'Team Founded' },
    { value: '4.8', label: 'Team Rating' },
  ];

  const values = [
    { tag: 'SH', title: 'Ship Real Systems', desc: 'We build production AI, not proof-of-concepts that never leave the lab.' },
    { tag: 'OS', title: 'Open by Default', desc: 'We open source what we can and share what we learn with the community.' },
    { tag: 'OW', title: 'High Ownership', desc: 'Small team, real autonomy — you own projects end to end.' },
    { tag: 'GR', title: 'Always Learning', desc: 'The field moves fast; we set aside real time to learn and experiment.' },
  ];

  const roles: JobRole[] = useMemo(() => {
    if (initialJobs && initialJobs.length > 0) {
      return initialJobs.map(j => ({
        id: j.id,
        dept: j.department || j.dept || 'Engineering',
        location: j.location || 'Remote',
        title: j.title || 'AI Engineer',
        desc: j.shortDescription || j.desc || j.responsibilities || 'Build and deploy advanced AI solutions.'
      }));
    }
    return PROTOTYPE_ROLES;
  }, [initialJobs]);

  const visibleRoles: JobRole[] = useMemo(() => {
    if (filter === 'All Roles') return roles;
    return roles.filter(r => r.dept.toLowerCase().includes(filter.toLowerCase()) || filter.toLowerCase().includes(r.dept.toLowerCase()));
  }, [filter, roles]);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.name || !applyForm.email) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, "job_applications"), {
        jobTitle: selectedRoleForApply?.title || 'General Application',
        department: selectedRoleForApply?.dept || 'General',
        ...applyForm,
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      setTimeout(() => {
        setSelectedRoleForApply(null);
        setSubmitted(false);
        setApplyForm({ name: '', email: '', phone: '', linkedinOrResume: '', note: '' });
      }, 2000);
    } catch (err) {
      console.error("Application submission error:", err);
    }
    setSubmitting(false);
  };

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
            <span>Company</span>
            <span>›</span>
            <span className="text-[#00C6FF]">Careers</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div>
              <div className="font-bold text-[12px] tracking-[0.1em] text-[#00C6FF] uppercase">
                Careers at Botmartz
              </div>
              <h1 className="font-extrabold text-[clamp(32px,4.5vw,44px)] leading-[1.15] text-white mt-4">
                Build the Future of<br />
                <span className="text-[#00C6FF]">AI Engineering</span> With Us
              </h1>
              <p className="font-medium text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#8FA3C4] mt-4.5 max-w-[480px]">
                We're a small team of engineers shipping production AI systems and building the community around them. If you'd rather build than talk about building, you'll fit right in.
              </p>
              <div className="flex flex-wrap gap-3.5 mt-7">
                <a 
                  href="#roles" 
                  className="inline-flex items-center gap-2 bg-[#007BFF] hover:bg-[#0069DB] text-white font-bold text-[14px] px-6 py-3.5 rounded-[9px] shadow-[0_8px_24px_rgba(0,123,255,0.35)] transition-all"
                >
                  View Open Roles →
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
                  {role.title}
                </div>
                <div className="font-medium text-[13px] leading-[1.6] text-[#5B6B85] mt-1.5 max-w-[620px]">
                  {role.desc}
                </div>
              </div>

              <button
                onClick={() => setSelectedRoleForApply(role)}
                className="font-bold text-[13px] text-white bg-[#0B1220] hover:bg-[#1A2333] px-5 py-3 rounded-[9px] shrink-0 transition-colors text-center"
              >
                Apply Now →
              </button>
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
                We're always open to meeting strong AI engineers. Send us your work — we'll find a place for it.
              </div>
            </div>
            <button
              onClick={() => setSelectedRoleForApply({ dept: 'General', location: 'Remote / Indore', title: 'General Application', desc: 'Open application for talented AI engineers and builders.' })}
              className="font-bold text-[13.5px] text-white bg-[#007BFF] hover:bg-[#0069DB] px-6 py-3.5 rounded-[9px] shadow-[0_8px_24px_rgba(0,123,255,0.35)] shrink-0 transition-all text-center"
            >
              Get In Touch →
            </button>
          </div>
        </div>
      </div>

      {/* ── APPLICATION MODAL ── */}
      {selectedRoleForApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[16px] border border-[#E7ECF3] p-6 sm:p-8 max-w-[500px] w-full relative shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => { setSelectedRoleForApply(null); setSubmitted(false); }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F1F4F9] text-[#5B6B85] hover:bg-[#E2E8F0] font-bold text-sm flex items-center justify-center transition-colors"
            >
              ✕
            </button>

            {submitted ? (
              <div className="py-8 text-center">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold mb-3">✓</div>
                <h3 className="text-xl font-bold text-[#0B1220]">Application Received!</h3>
                <p className="text-sm text-[#5B6B85] mt-1">We will review your submission for <span className="font-semibold text-[#0B1220]">{selectedRoleForApply.title}</span> and get back to you soon.</p>
              </div>
            ) : (
              <>
                <div className="font-bold text-[11px] tracking-[0.08em] text-[#007BFF] uppercase">
                  Application
                </div>
                <h3 className="font-extrabold text-[20px] text-[#0B1220] mt-1">
                  {selectedRoleForApply.title}
                </h3>
                <p className="font-medium text-xs text-[#8A97AC] mt-0.5">
                  {selectedRoleForApply.dept} · {selectedRoleForApply.location}
                </p>

                <form onSubmit={handleApplySubmit} className="mt-6 flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#3A4459] mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={applyForm.name}
                      onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] px-3.5 py-2.5 text-sm font-medium text-[#0B1220] outline-none focus:border-[#007BFF] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#3A4459] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={applyForm.email}
                      onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] px-3.5 py-2.5 text-sm font-medium text-[#0B1220] outline-none focus:border-[#007BFF] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#3A4459] mb-1">LinkedIn Profile or GitHub URL</label>
                    <input
                      type="text"
                      placeholder="https://linkedin.com/in/janedoe or github.com/janedoe"
                      value={applyForm.linkedinOrResume}
                      onChange={(e) => setApplyForm({ ...applyForm, linkedinOrResume: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] px-3.5 py-2.5 text-sm font-medium text-[#0B1220] outline-none focus:border-[#007BFF] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#3A4459] mb-1">Brief Note / Why Botmartz?</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us what systems you've built and what you want to work on..."
                      value={applyForm.note}
                      onChange={(e) => setApplyForm({ ...applyForm, note: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] px-3.5 py-2.5 text-sm font-medium text-[#0B1220] outline-none focus:border-[#007BFF] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-2 font-bold text-[13.5px] text-white bg-[#007BFF] hover:bg-[#0069DB] py-3 rounded-[8px] shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {submitting ? 'Submitting...' : 'Submit Application →'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
