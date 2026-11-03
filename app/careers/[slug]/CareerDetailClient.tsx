"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
  ArrowLeft, 
  MapPin, 
  Banknote, 
  Clock, 
  Calendar, 
  Heart, 
  Share2, 
  CheckCircle,
  HelpCircle,
  Briefcase,
  Users,
  Compass,
  Smile,
  ChevronDown,
  Mail
} from 'lucide-react';

interface JobBenefit {
  tag: string;
  title: string;
  desc: string;
}

interface HiringStep {
  n: string;
  title: string;
  desc: string;
}

interface TeamMember {
  initials: string;
  name: string;
  role: string;
}

interface JobFAQ {
  q: string;
  a: string;
}

interface JobRole {
  id: string;
  title: string;
  slug: string;
  department?: string;
  location?: string;
  type?: string;
  experience?: string;
  salary?: string;
  shortDescription?: string;
  responsibilities?: string;
  requirements?: string;
  niceToHave?: string;
  stack?: string[];
  benefits?: JobBenefit[];
  hiringSteps?: HiringStep[];
  team?: TeamMember[];
  faqs?: JobFAQ[];
}

export default function CareerDetailClient({ job }: { job: JobRole }) {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Parse list fields that might be stored as newline-separated strings in Firestore
  const parseList = (val: any): string[] => {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string' && val.trim()) {
      return val
        .split('\n')
        .map(item => item.replace(/^[•\-*+✓\s]+/, '').trim())
        .filter(item => item.length > 0);
    }
    return [];
  };

  const isBrandIntern = (job.slug || job.title || '').toLowerCase().includes('brand');
  const isPartnershipsIntern = (job.slug || job.title || '').toLowerCase().includes('partner');
  const isDevRelIntern = (job.slug || job.title || '').toLowerCase().includes('devrel');
  const isInternRole = isBrandIntern || isPartnershipsIntern || isDevRelIntern || (job.title || '').toLowerCase().includes('intern');

  const responsibilities = parseList(job.responsibilities).length ? parseList(job.responsibilities) : isBrandIntern ? [
    'Manage LinkedIn, Discord, WhatsApp/Telegram, and community channels.',
    'Create and schedule community content around AI Engineering, RAG, Agents, PyTorch, etc.',
    'Engage with developers, students, founders, and AI professionals.',
    'Organize meetups, webinars, workshops, and community activities.',
    'Increase Botmartz community members and engagement.',
    'Support AI Frontier and other Botmartz events.',
    'Collect community feedback and identify potential opportunities.'
  ] : isPartnershipsIntern ? [
    'Research and identify potential technology, university, startup, community, and event partners.',
    'Reach out to companies, developer communities, colleges, AI groups, and potential sponsors.',
    'Build partnership proposals and collaboration opportunities.',
    'Manage partner communication and follow-ups.',
    'Develop collaborations for workshops, hackathons, meetups, webinars, and AI Frontier.',
    'Maintain a partnership CRM/database.',
    'Identify opportunities with AI/Cloud companies and developer ecosystems.',
    'Help create mutually beneficial programs for the Botmartz community.'
  ] : isDevRelIntern ? [
    'Build relationships with AI/ML developers and engineers.',
    'Create technical content, tutorials, demos, and developer resources.',
    'Organize technical workshops, hackathons, meetups, and developer events.',
    'Support Botmartz open-source projects and GitHub community.',
    'Engage with developers on GitHub, Discord, LinkedIn, Reddit, and other technical communities.',
    'Research emerging technologies such as PyTorch, LangGraph, LangChain, Google ADK, Transformers, RAG, and AI Agents.',
    'Collect developer feedback and communicate insights back to the engineering team.',
    'Help grow Botmartz as an AI Engineering developer brand, rather than simply a services company.'
  ] : isInternRole ? [
    'Manage and grow our Discord community of AI engineers, developers, and students.',
    'Engage actively with developers, students, and AI enthusiasts.',
    'Coordinate workshops and community events.',
    'Create content, announcements, and educational posts.',
    'Support key initiatives like AI Accelerator and AI Frontier.'
  ] : [
    'Design and build retrieval pipelines — chunking, embeddings, hybrid search, reranking.',
    'Own evaluation: build eval sets, track precision/recall, and catch regressions before ship.',
    'Deploy and monitor RAG systems in production, with guardrails and observability.',
    'Work directly with enterprise clients to understand real document and query patterns.',
    'Collaborate with the agents team where RAG feeds into larger multi-step workflows.',
    'Contribute to open-source labs and occasionally speak at community events like AI Frontier.'
  ];

  const requirements = parseList(job.requirements).length ? parseList(job.requirements) : isBrandIntern ? [
    'Communication & written presentation skills.',
    'Content creation & social media engagement.',
    'Community building on LinkedIn, Discord & WhatsApp/Telegram.',
    'Passionate interest in AI Engineering, LLMs & Agents.'
  ] : isPartnershipsIntern ? [
    'Outreach, research & communication skills.',
    'Networking, negotiation & relationship management.',
    'Experience managing CRM or structured partner databases.',
    'Ability to draft proposals for events, workshops & hackathons.'
  ] : isDevRelIntern ? [
    'Basic programming in Python & familiarity with GitHub.',
    'Interest in PyTorch, LangGraph, LangChain, Google ADK, Transformers, RAG & AI Agents.',
    'Technical writing & developer content creation.',
    'Active participation in developer communities (GitHub, Discord, Reddit).'
  ] : isInternRole ? [
    'Experience with Discord or online tech communities (PREFERRED).',
    'Strong communication and engagement skills.',
    'Self-motivated, proactive, and eager to learn.',
    'Passionate about AI, LLMs, AI Agents, and developer communities.'
  ] : [
    '3+ years building production ML/AI systems (RAG experience strongly preferred).',
    'Strong Python fundamentals and comfort with FastAPI or similar backend frameworks.',
    'Hands-on experience with vector databases (Qdrant, Pinecone, pgvector, or similar).',
    'A track record of shipping — side projects, OSS contributions, or past production work.',
    'Comfortable working directly with clients and translating requirements into architecture.',
    'Clear written communication — you’ll document decisions for both engineers and clients.'
  ];

  const niceToHave = parseList(job.niceToHave).length ? parseList(job.niceToHave) : isInternRole ? [
    'Mentorship from AI Engineering team & hands-on exposure to AI, LLMs & Agents.',
    'Certificate of Internship & Performance-based Letter of Recommendation.',
    'Active participation in AI open-source projects or tech events.'
  ] : [
    'Experience with LangGraph or another agent-orchestration framework.',
    'Prior public speaking or technical writing — blog posts, conference talks, OSS maintaining.',
    'Exposure to regulated industries (healthcare, legal, finance) and their compliance needs.'
  ];

  const stack = job.stack && job.stack.length ? job.stack : ['Python', 'LangChain', 'LangGraph', 'FastAPI', 'Qdrant', 'PostgreSQL', 'Docker', 'AWS'];

  const benefits = job.benefits && job.benefits.length ? job.benefits : [
    { tag: 'RM', title: 'Remote-Friendly', desc: 'Hybrid setup with a home base in Indore.' },
    { tag: 'EQ', title: 'Real Equity', desc: 'Meaningful ownership as an early team member.' },
    { tag: 'LR', title: 'Learning Budget', desc: 'Conference, course and book budget every year.' },
    { tag: 'OS', title: 'Open Source Time', desc: '20% time to contribute to community projects.' },
    { tag: 'HC', title: 'Health Cover', desc: 'Comprehensive medical insurance for you and family.' },
    { tag: 'PL', title: 'Flexible Leave', desc: 'No fixed PTO cap — take what you need, communicate early.' }
  ];

  const formatHeading = (str: string) => {
    if (!str) return 'Career Position';
    if (str.includes('-')) {
      return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
    return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const formattedTitle = formatHeading(job.title || job.slug);

  const hiringSteps = [
    { n: '1', title: 'Application Review', desc: 'Our team reads every application within 24–48 hours.' },
    { n: '2', title: 'Quick Screening Call', desc: 'A 20-minute conversation to discuss your background, goals, and availability.' },
    { n: '3', title: 'Selection & Onboarding', desc: 'Final role alignment, expectations, and welcome to the Botmartz team.' }
  ];

  const team = job.team && job.team.length ? job.team : [
    { initials: 'SS', name: 'Sanjay Singh', role: 'Co-founder' },
    { initials: 'HS', name: 'Harsh Sahu', role: 'AI Engineer' },
    { initials: 'PB', name: 'Promit Basu', role: 'AI/ML Engineer' }
  ];

  const faqs = job.faqs && job.faqs.length ? job.faqs : [
    { q: 'Is this role remote?', a: 'It’s primarily on-site in Indore for close collaboration, with flexibility for occasional remote days. We can support relocation.' },
    { q: 'What does the interview timeline look like?', a: 'Typically 2–3 weeks end to end, including a paid take-home project scoped to a few hours.' },
    { q: 'Do you sponsor visas?', a: 'Not at this time — this role requires existing authorization to work in India.' },
    { q: 'Can I apply if I don’t have RAG experience specifically?', a: 'Yes, if you have strong production ML/backend experience and can show a track record of shipping.' },
    { q: 'What is the team size right now?', a: 'You’d be joining a team of under ten — real ownership from day one.' }
  ];

  const [applyForm, setApplyForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolioUrl: '',
    experienceLevel: 'Students / Freshers',
    coverNote: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

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
          roleTitle: formattedTitle,
          roleId: job.id,
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
          setApplyForm({ fullName: '', email: '', phone: '', portfolioUrl: '', experienceLevel: 'Students / Freshers', coverNote: '' });
        }, 2500);
      } else {
        setErrorMessage(data.error || 'Failed to submit application.');
      }
    } catch (err) {
      console.error("Application submission error:", err);
      setErrorMessage("Network error occurred. Please try again.");
    }
    setSubmitting(false);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Role link copied to clipboard!");
  };

  const shareLinks = [
    { label: 'LinkedIn', glyph: 'in' },
    { label: 'X / Twitter', glyph: 'X' },
    { label: 'WhatsApp', glyph: 'WA' },
    { label: 'Email', glyph: '@' },
  ];

  return (
    <div className="bg-[#F5F8FC] min-h-screen text-[#0B1220] font-sans">
      
      {/* ── HEADER BANNER ── */}
      <section className="bg-[#060C1F] relative overflow-hidden pt-32 pb-16 px-6 sm:px-10">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,198,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,198,255,0.06) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 65% 30%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 65% 30%, black, transparent)'
          }}
        />
        <div className="absolute w-[420px] h-[420px] rounded-full bg-radial-gradient from-[#007BFF]/20 to-transparent -top-36 -right-20 filter blur-xl pointer-events-none" />
        
        <div className="max-w-[1080px] mx-auto relative z-10">
          <div className="font-semibold text-[12.5px] text-[#5B6B85] mb-6 tracking-wide flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <Link href="/careers" className="hover:text-white transition-colors">Careers</Link>
            <span>›</span>
            <span className="text-[#00C6FF]">{formattedTitle}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-12 items-start">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="font-bold text-[10.5px] tracking-wider text-[#00C6FF] bg-[#00C6FF]/10 px-2.5 py-1 rounded-[5px] uppercase border border-[#00C6FF]/20">
                  {job.department || 'Community & Tech'}
                </span>
                <span className="font-bold text-[10.5px] tracking-wider text-[#0E9F6E] bg-[#0E9F6E]/10 px-2.5 py-1 rounded-[5px] uppercase border border-[#0E9F6E]/20">
                  {job.type || 'Remote / Flexible'}
                </span>
                <span className="font-bold text-[10.5px] tracking-wider text-[#D97706] bg-[#D97706]/10 px-2.5 py-1 rounded-[5px] uppercase border border-[#D97706]/20">
                  Actively Hiring
                </span>
              </div>

              <h1 className="font-extrabold text-[34px] sm:text-[46px] leading-[1.15] text-white mt-6">
                {formattedTitle}
              </h1>

              <p className="font-medium text-[14.5px] sm:text-[15px] leading-[1.75] text-[#8FA3C4] mt-5 max-w-[560px]">
                {job.shortDescription || 'Join the Botmartz team to build production AI systems, organize events, and grow the AI Engineering community.'}
              </p>

              <div className="flex flex-wrap gap-3.5 mt-8 items-center">
                <button 
                  onClick={() => setShowApplyModal(true)}
                  className="inline-flex items-center gap-2 bg-[#007BFF] hover:bg-[#0069DB] text-white font-bold text-[14px] px-7 py-3.5 rounded-[9px] shadow-[0_8px_24px_rgba(0,123,255,0.35)] transition-all cursor-pointer"
                >
                  Apply Now →
                </button>
                <button 
                  onClick={() => setLiked(!liked)}
                  className={`inline-flex items-center gap-2 border px-7 py-3.5 rounded-[9px] text-[14px] font-bold transition-all cursor-pointer ${
                    liked 
                      ? 'bg-pink-500/10 border-pink-500/40 text-pink-400' 
                      : 'bg-white/5 border-white/18 text-white hover:bg-white/10'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-pink-400 text-pink-400' : ''}`} />
                  {liked ? 'Saved Role' : 'Save Role'}
                </button>
                <div className="w-[1px] h-6 bg-white/15 hidden sm:block" />
                <div className="flex gap-2">
                  {shareLinks.map((s, idx) => (
                    <button 
                      key={idx}
                      onClick={handleShare}
                      title={`Share on ${s.label}`}
                      className="w-10 h-10 border border-white/14 bg-white/6 hover:bg-white/12 text-[#C7D6EE] font-bold text-[11px] flex items-center justify-center rounded-[9px] transition-all cursor-pointer"
                    >
                      {s.glyph}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white/[0.04] border border-white/10 rounded-[16px] p-6.5 flex flex-col gap-4.5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-[38px] h-[38px] rounded-[9px] bg-[#00C6FF]/10 border border-[#00C6FF]/30 flex items-center justify-center font-bold text-[12px] text-[#00C6FF] shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <div className="font-bold text-[13.5px] text-white">{job.location || 'Remote / Flexible'}</div>
                  <div className="font-medium text-[11.5px] text-[#7C8CAD]">Remote-Friendly</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-[38px] h-[38px] rounded-[9px] bg-[#00C6FF]/10 border border-[#00C6FF]/30 flex items-center justify-center font-bold text-[14px] text-[#00C6FF] shrink-0">
                  <Banknote size={16} />
                </div>
                <div>
                  <div className="font-bold text-[13.5px] text-white">
                    {job.salary && !job.salary.toLowerCase().includes('unpaid') ? job.salary : 'Unpaid'}
                  </div>
                  <div className="font-medium text-[11.5px] text-[#7C8CAD]">
                    {job.salary && job.salary.toLowerCase().includes('competitive') ? 'Competitive Compensation' : 'Certificate + Performance LOR'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-[38px] h-[38px] rounded-[9px] bg-[#00C6FF]/10 border border-[#00C6FF]/30 flex items-center justify-center font-bold text-[12px] text-[#00C6FF] shrink-0">
                  <Clock size={16} />
                </div>
                <div>
                  <div className="font-bold text-[13.5px] text-white">Remote / Flexible</div>
                  <div className="font-medium text-[11.5px] text-[#7C8CAD]">Part-Time / Project-Based</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-[38px] h-[38px] rounded-[9px] bg-[#00C6FF]/10 border border-[#00C6FF]/30 flex items-center justify-center font-bold text-[12px] text-[#00C6FF] shrink-0">
                  <Calendar size={16} />
                </div>
                <div>
                  <div className="font-bold text-[13.5px] text-white">Actively Hiring</div>
                  <div className="font-medium text-[11.5px] text-[#7C8CAD]">Rolling Evaluations</div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[1px] bg-white/8 mt-11" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/6 mt-[1px] py-4 rounded-xl px-4 border border-white/5 backdrop-blur-sm">
            <div className="text-center md:text-left py-2">
              <div className="font-extrabold text-[22px] text-[#00C6FF]">Active Roles</div>
              <div className="font-semibold text-[11.5px] text-[#8FA3C4] mt-1">Open Positions</div>
            </div>
            <div className="text-center md:text-left py-2 border-l border-white/5">
              <div className="font-extrabold text-[22px] text-[#00C6FF]">3 Steps</div>
              <div className="font-semibold text-[11.5px] text-[#8FA3C4] mt-1">Hiring Process</div>
            </div>
            <div className="text-center md:text-left py-2 border-l border-white/5">
              <div className="font-extrabold text-[22px] text-[#00C6FF]">24/7 Hours</div>
              <div className="font-semibold text-[11.5px] text-[#8FA3C4] mt-1">Response Time</div>
            </div>
            <div className="text-center md:text-left py-2 border-l border-white/5">
              <div className="font-extrabold text-[22px] text-[#00C6FF]">100%</div>
              <div className="font-semibold text-[11.5px] text-[#8FA3C4] mt-1">Remote-Friendly</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE DETAILS & JOB SPECS ── */}
      <section className="max-w-[1080px] mx-auto px-6 sm:px-10 pt-12 grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-12 items-start">
        <div className="space-y-11">
          {/* About the Role */}
          <div>
            <div className="font-bold text-[12px] tracking-[0.1em] text-[#007BFF] uppercase">About the Role</div>
            <p className="font-medium text-[15px] leading-[1.85] text-[#2E3648] mt-4">
              {job.shortDescription || "You'll own retrieval-augmented generation systems end to end — from ingestion pipelines and hybrid search to reranking, evaluation and guardrails. Our clients run these systems in production for real support, legal and operations teams, so reliability and observability matter exactly as much as raw model performance."}
            </p>
            <p className="font-medium text-[15px] leading-[1.85] text-[#2E3648] mt-4">
              This is a generalist-leaning engineering role at a small, fast-moving team: you'll talk to clients, design the architecture, write the code, and watch it run in production — often in the same week. You'll also have room to contribute to our open-source labs and speak at community events like AI Frontier.
            </p>
          </div>

          {/* Responsibilities */}
          <div>
            <div className="font-bold text-[12px] tracking-[0.1em] text-[#007BFF] uppercase mb-4">What You'll Do</div>
            <div className="flex flex-col gap-3">
              {responsibilities.map((r, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#E4F8EF] flex items-center justify-center font-bold text-[10.5px] text-[#0E9F6E] mt-0.5 shrink-0">✓</div>
                  <div className="font-medium text-[14px] leading-[1.65] text-[#3A4459]">{r}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div>
            <div className="font-bold text-[12px] tracking-[0.1em] text-[#007BFF] uppercase mb-4">What We're Looking For</div>
            <div className="flex flex-col gap-3">
              {requirements.map((req, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#E8F2FF] flex items-center justify-center font-bold text-[10.5px] text-[#007BFF] mt-0.5 shrink-0">•</div>
                  <div className="font-medium text-[14px] leading-[1.65] text-[#3A4459]">{req}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Nice to Have */}
          {niceToHave.length > 0 && (
            <div>
              <div className="font-bold text-[12px] tracking-[0.1em] text-[#007BFF] uppercase mb-4">Nice to Have</div>
              <div className="flex flex-col gap-3">
                {niceToHave.map((n, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-[#F1EBFE] flex items-center justify-center font-bold text-[10.5px] text-[#7C3AED] mt-0.5 shrink-0">+</div>
                    <div className="font-medium text-[14px] leading-[1.65] text-[#3A4459]">{n}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech You'll Use */}
          <div>
            <div className="font-bold text-[12px] tracking-[0.1em] text-[#007BFF] uppercase mb-4">Tech You'll Use</div>
            <div className="flex flex-wrap gap-2">
              {stack.map((s, idx) => (
                <span key={idx} className="font-semibold text-[12.5px] text-[#3A4459] bg-[#E7ECF3] px-3.5 py-1.5 rounded-[7px] border border-[#D1DCEE]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Compensation & Benefits */}
          <div>
            <div className="font-bold text-[12px] tracking-[0.1em] text-[#007BFF] uppercase mb-4">Compensation & Benefits</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {benefits.map((b, idx) => (
                <div key={idx} className="bg-white border border-[#E7ECF3] rounded-[12px] p-4 flex gap-3 items-start shadow-sm">
                  <div className="w-[30px] h-[30px] rounded-[8px] bg-[#E8F2FF] flex items-center justify-center font-bold text-[10px] text-[#007BFF] shrink-0">
                    {b.tag}
                  </div>
                  <div>
                    <div className="font-bold text-[12.5px] text-[#0B1220]">{b.title}</div>
                    <div className="font-medium text-[11.5px] leading-[1.5] text-[#8A97AC] mt-1">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SIDEBAR STICKY CONTROLS ── */}
        <div className="lg:sticky lg:top-28 flex flex-col gap-4">
          <div className="bg-[#060C1F] rounded-[14px] p-6.5 text-white">
            <h3 className="font-bold text-[13px] text-white uppercase tracking-wider">Ready to Apply?</h3>
            <p className="font-medium text-xs leading-[1.6] text-[#8FA3C4] mt-2">
              Apply directly using our quick online form.
            </p>
            <button 
              onClick={() => setShowApplyModal(true)}
              className="w-full text-center mt-4.5 font-bold text-[13px] text-white bg-[#007BFF] hover:bg-[#0069DB] py-3.5 rounded-[8px] cursor-pointer transition-colors block border-none shadow-lg"
            >
              Apply Now →
            </button>
            <button 
              onClick={() => setLiked(!liked)}
              className="w-full text-center mt-2.5 font-bold text-[12.5px] text-[#C7D6EE] bg-white/6 hover:bg-white/12 border border-white/14 py-3 rounded-[8px] cursor-pointer transition-colors block"
            >
              {liked ? '★ Saved' : 'Save for Later ☆'}
            </button>
          </div>

          {/* Hiring Process */}
          <div className="bg-white border border-[#E7ECF3] rounded-[14px] p-6 flex flex-col gap-4 shadow-sm">
            <h3 className="font-bold text-[13px] text-[#0B1220] uppercase tracking-wider">Hiring Process</h3>
            <div className="flex flex-col gap-4">
              {hiringSteps.map((h, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full border border-[#C9DEFF] bg-[#E8F2FF] flex items-center justify-center font-bold text-[10.5px] text-[#007BFF] shrink-0">
                    {h.n}
                  </div>
                  <div>
                    <div className="font-bold text-[12.5px] text-[#0B1220]">{h.title}</div>
                    <div className="font-medium text-[11.5px] leading-[1.5] text-[#8A97AC] mt-0.5">{h.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Share */}
          <div className="bg-white border border-[#E7ECF3] rounded-[14px] p-6 shadow-sm">
            <h3 className="font-bold text-[13px] text-[#0B1220] uppercase tracking-wider">Share This Role</h3>
            <div className="flex gap-2 mt-3.5">
              {shareLinks.map((s, idx) => (
                <button 
                  key={idx}
                  onClick={handleShare}
                  className="w-[38px] h-[38px] rounded-[8px] bg-[#F1F4F9] hover:bg-[#E2E8F0] text-[#3A4459] font-bold text-[10.5px] flex items-center justify-center cursor-pointer transition-colors"
                >
                  {s.glyph}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-3.5 items-center bg-[#F5F8FC] border border-[#E7ECF3] rounded-[8px] p-2.5">
              <div className="flex-1 font-medium text-[11.5px] text-[#5B6B85] overflow-hidden text-overflow-ellipsis white-space-nowrap">
                {`botmartz.com/careers/${job.slug}`}
              </div>
              <button 
                onClick={handleShare}
                className="border-none bg-none font-bold text-[11px] text-[#007BFF] cursor-pointer hover:underline"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* ── COLLAPSIBLE FAQ SECTION ── */}
      <section className="max-w-[1080px] mx-auto px-6 sm:px-10 mt-16 pb-12">
        <div className="font-bold text-[12px] tracking-[0.1em] text-[#007BFF] uppercase mb-4.5">Frequently Asked Questions</div>
        <div className="flex flex-col gap-3">
          {faqs.map((f, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="bg-white border border-[#E7ECF3] rounded-[12px] overflow-hidden shadow-sm">
                <button 
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex justify-between items-center font-bold text-[14px] text-[#0B1220] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                >
                  <span>{f.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#8A97AC] transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#007BFF]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 font-medium text-[13px] leading-[1.65] text-[#5B6B85] border-t border-[#F8FAFC] pt-3.5 bg-[#FAFBFD] animate-in fade-in slide-in-from-top-1 duration-150">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── OUTRO CTA CARD ── */}
      <section className="max-w-[1080px] mx-auto px-6 sm:px-10 pb-20">
        <div className="bg-white border border-[#E7ECF3] rounded-[16px] p-7.5 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-md">
          <div className="w-[64px] h-[64px] rounded-full bg-[#E8F2FF] flex items-center justify-center font-extrabold text-[20px] text-[#007BFF] shrink-0">◇</div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-bold text-[18px] text-[#0B1220]">Apply for {formattedTitle}</h3>
            <p className="font-medium text-[13.5px] leading-[1.6] text-[#5B6B85] mt-1.5">Submit your details online to get interviewed for this role.</p>
          </div>
          <button 
            onClick={() => setShowApplyModal(true)}
            className="font-bold text-[13.5px] text-white bg-[#007BFF] hover:bg-[#0069DB] px-6 py-3.5 rounded-[9px] cursor-pointer transition-colors inline-flex items-center gap-2 border-none shadow-[0_4px_12px_rgba(0,123,255,0.2)] whitespace-nowrap shrink-0"
          >
            Apply Now →
          </button>
        </div>
      </section>

      {/* ── APPLICATION FORM MODAL ── */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-[#0A1224] border border-white/15 rounded-2xl w-full max-w-lg p-6 sm:p-8 text-white relative shadow-2xl my-8">
            <button
              onClick={() => setShowApplyModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              ✕
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-white">Application Submitted!</h3>
                <p className="text-gray-300 text-sm max-w-sm mx-auto">
                  Thank you for applying for <strong className="text-[#00C6FF]">{formattedTitle}</strong>. Our hiring team will review your application soon.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-[11px] font-bold text-[#00C6FF] bg-[#00C6FF]/10 px-2.5 py-1 rounded uppercase tracking-wider">
                    {job.department || 'Community & Tech'}
                  </span>
                  <h2 className="text-2xl font-bold text-white mt-2">Apply for {formattedTitle}</h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Fill in your details below to apply.
                  </p>
                </div>

                {errorMessage && (
                  <div className="mb-4 p-3 bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs rounded-lg">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleApplySubmit} className="space-y-4">
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

                  {/* Email & Phone */}
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

                  {/* LinkedIn or Portfolio */}
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      LinkedIn / Portfolio URL <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.in/in/username or portfolio URL"
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
                      placeholder="Tell us about your background or motivation..."
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
                    {submitting ? "Submitting..." : "Submit Application →"}
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
