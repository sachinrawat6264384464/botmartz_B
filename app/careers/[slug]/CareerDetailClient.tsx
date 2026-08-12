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
  const [applyForm, setApplyForm] = useState({ name: '', email: '', phone: '', linkedinOrResume: '', note: '' });
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

  const responsibilities = parseList(job.responsibilities).length ? parseList(job.responsibilities) : [
    'Design and build retrieval pipelines — chunking, embeddings, hybrid search, reranking.',
    'Own evaluation: build eval sets, track precision/recall, and catch regressions before ship.',
    'Deploy and monitor RAG systems in production, with guardrails and observability.',
    'Work directly with enterprise clients to understand real document and query patterns.',
    'Collaborate with the agents team where RAG feeds into larger multi-step workflows.',
    'Contribute to open-source labs and occasionally speak at community events like AI Frontier.'
  ];

  const requirements = parseList(job.requirements).length ? parseList(job.requirements) : [
    '3+ years building production ML/AI systems (RAG experience strongly preferred).',
    'Strong Python fundamentals and comfort with FastAPI or similar backend frameworks.',
    'Hands-on experience with vector databases (Qdrant, Pinecone, pgvector, or similar).',
    'A track record of shipping — side projects, OSS contributions, or past production work.',
    'Comfortable working directly with clients and translating requirements into architecture.',
    'Clear written communication — you’ll document decisions for both engineers and clients.'
  ];

  const niceToHave = parseList(job.niceToHave).length ? parseList(job.niceToHave) : [
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

  const hiringSteps = job.hiringSteps && job.hiringSteps.length ? job.hiringSteps : [
    { n: '1', title: 'Application Review', desc: 'Our team reads every application within a week.' },
    { n: '2', title: 'Technical Screen', desc: '45-minute call on your background and past systems.' },
    { n: '3', title: 'System Design Interview', desc: 'Whiteboard a RAG or agent architecture together.' },
    { n: '4', title: 'Paid Take-Home', desc: 'A small, scoped project reflecting real client work.' },
    { n: '5', title: 'Founder Conversation', desc: 'Culture fit, expectations, and any open questions.' }
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

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.name || !applyForm.email) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, "job_applications"), {
        jobId: job.id,
        role: job.title,
        dept: job.department || 'Engineering',
        ...applyForm,
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      setTimeout(() => {
        setShowApplyModal(false);
        setSubmitted(false);
        setApplyForm({ name: '', email: '', phone: '', linkedinOrResume: '', note: '' });
      }, 2500);
    } catch (err) {
      console.error("Application submission error:", err);
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
            <span className="text-[#00C6FF]">{job.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-12 items-start">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="font-bold text-[10.5px] tracking-wider text-[#00C6FF] bg-[#00C6FF]/10 px-2.5 py-1 rounded-[5px] uppercase border border-[#00C6FF]/20">
                  {job.department || 'Engineering'}
                </span>
                <span className="font-bold text-[10.5px] tracking-wider text-[#0E9F6E] bg-[#0E9F6E]/10 px-2.5 py-1 rounded-[5px] uppercase border border-[#0E9F6E]/20">
                  {job.type || 'Full-Time'}
                </span>
                <span className="font-bold text-[10.5px] tracking-wider text-[#D97706] bg-[#D97706]/10 px-2.5 py-1 rounded-[5px] uppercase border border-[#D97706]/20">
                  Actively Hiring
                </span>
              </div>

              <h1 className="font-extrabold text-[34px] sm:text-[46px] leading-[1.15] text-white mt-6">
                {job.title.includes('—') ? (
                  <>
                    {job.title.split('—')[0]}—<br />
                    <span className="text-[#00C6FF]">{job.title.split('—')[1]}</span>
                  </>
                ) : (
                  job.title
                )}
              </h1>

              <p className="font-medium text-[14.5px] sm:text-[15px] leading-[1.75] text-[#8FA3C4] mt-5 max-w-[560px]">
                {job.shortDescription || 'Design and ship production systems — from ingestion pipelines to evaluation and observability. Direct ownership over systems that ship into real companies.'}
              </p>

              <div className="flex flex-wrap gap-3.5 mt-8 items-center">
                <a 
                  href={`mailto:sohamnsharma@gmail.com?subject=Application for ${encodeURIComponent(job.title)}`}
                  className="inline-flex items-center gap-2 bg-[#007BFF] hover:bg-[#0069DB] text-white font-bold text-[14px] px-7 py-3.5 rounded-[9px] shadow-[0_8px_24px_rgba(0,123,255,0.35)] transition-all cursor-pointer"
                >
                  <Mail size={16} /> Send CV: sohamnsharma@gmail.com
                </a>
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
                  <div className="font-bold text-[13.5px] text-white">{job.location || 'Indore, India'}</div>
                  <div className="font-medium text-[11.5px] text-[#7C8CAD]">On-site, relocation supported</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-[38px] h-[38px] rounded-[9px] bg-[#00C6FF]/10 border border-[#00C6FF]/30 flex items-center justify-center font-bold text-[14px] text-[#00C6FF] shrink-0">
                  <Banknote size={16} />
                </div>
                <div>
                  <div className="font-bold text-[13.5px] text-white">{job.salary || 'Competitive Package'}</div>
                  <div className="font-medium text-[11.5px] text-[#7C8CAD]">+ meaningful equity options</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-[38px] h-[38px] rounded-[9px] bg-[#00C6FF]/10 border border-[#00C6FF]/30 flex items-center justify-center font-bold text-[12px] text-[#00C6FF] shrink-0">
                  <Clock size={16} />
                </div>
                <div>
                  <div className="font-bold text-[13.5px] text-white">{job.experience || '3+ Years Exp'}</div>
                  <div className="font-medium text-[11.5px] text-[#7C8CAD]">Mid to Senior level</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-[38px] h-[38px] rounded-[9px] bg-[#00C6FF]/10 border border-[#00C6FF]/30 flex items-center justify-center font-bold text-[12px] text-[#00C6FF] shrink-0">
                  <Calendar size={16} />
                </div>
                <div>
                  <div className="font-bold text-[13.5px] text-white">Posted Recently</div>
                  <div className="font-medium text-[11.5px] text-[#7C8CAD]">Rolling applications</div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[1px] bg-white/8 mt-11" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/6 mt-[1px] py-4 rounded-xl px-4 border border-white/5 backdrop-blur-sm">
            <div className="text-center md:text-left py-2">
              <div className="font-extrabold text-[22px] text-[#00C6FF]">10</div>
              <div className="font-semibold text-[11.5px] text-[#8FA3C4] mt-1">Person Team</div>
            </div>
            <div className="text-center md:text-left py-2 border-l border-white/5">
              <div className="font-extrabold text-[22px] text-[#00C6FF]">5 Steps</div>
              <div className="font-semibold text-[11.5px] text-[#8FA3C4] mt-1">Hiring Process</div>
            </div>
            <div className="text-center md:text-left py-2 border-l border-white/5">
              <div className="font-extrabold text-[22px] text-[#00C6FF]">5 Days</div>
              <div className="font-semibold text-[11.5px] text-[#8FA3C4] mt-1">To First Response</div>
            </div>
            <div className="text-center md:text-left py-2 border-l border-white/5">
              <div className="font-extrabold text-[22px] text-[#00C6FF]">20%</div>
              <div className="font-semibold text-[11.5px] text-[#8FA3C4] mt-1">Open Source Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COVER IMAGE HERO ── */}
      <div className="max-w-[1080px] mx-auto px-6 sm:px-10">
        <div className="h-[280px] rounded-[18px] overflow-hidden -mt-8 relative shadow-[0_20px_50px_rgba(6,12,31,0.25)] border-[6px] border-white">
          <Image 
            fill
            src="/BotmartznewBot.png" 
            alt="Botmartz Team"
            className="object-cover object-center"
          />
        </div>
      </div>

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
              Send your CV directly to <strong className="text-white">sohamnsharma@gmail.com</strong>.
            </p>
            <a 
              href={`mailto:sohamnsharma@gmail.com?subject=Application for ${encodeURIComponent(job.title)}`}
              className="w-full text-center mt-4.5 font-bold text-[12.5px] text-white bg-[#007BFF] hover:bg-[#0069DB] py-3.5 rounded-[8px] cursor-pointer transition-colors block border-none flex items-center justify-center gap-2"
            >
              <Mail size={15} /> Send CV: sohamnsharma@gmail.com
            </a>
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

          {/* Future Team */}
          <div className="bg-white border border-[#E7ECF3] rounded-[14px] p-6 flex flex-col gap-4 shadow-sm">
            <h3 className="font-bold text-[13px] text-[#0B1220] uppercase tracking-wider">Meet Your Future Team</h3>
            <div className="flex flex-col gap-3.5">
              {team.map((t, idx) => (
                <div key={idx} className="flex gap-3 items-center">
                  <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#007BFF] to-[#00C6FF] flex items-center justify-center font-bold text-[12px] text-white shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-bold text-[12.5px] text-[#0B1220]">{t.name}</div>
                    <div className="font-medium text-[11px] text-[#8A97AC]">{t.role}</div>
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

      {/* ── LIFE AT BOTMARTZ GALLERY ── */}
      <section className="max-w-[1080px] mx-auto px-6 sm:px-10 mt-16">
        <div className="text-center max-w-[640px] mx-auto mb-10">
          <div className="font-bold text-[12px] tracking-[0.15em] text-[#007BFF] uppercase">Life at Botmartz</div>
          <h2 className="font-extrabold text-[26px] sm:text-[28px] leading-[1.3] text-[#0B1220] mt-3">A Small Team, Shipping Real Systems</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="h-[220px] rounded-[14px] overflow-hidden relative shadow-sm border border-[#E2E8F0]">
            <Image fill src="/labs_hero_cube_1784152647556.png" alt="Office Life 1" className="object-cover" />
          </div>
          <div className="h-[220px] rounded-[14px] overflow-hidden relative shadow-sm border border-[#E2E8F0]">
            <Image fill src="/labs_hero_cube_1784152227156.png" alt="Office Life 2" className="object-cover" />
          </div>
          <div className="h-[220px] rounded-[14px] overflow-hidden relative shadow-sm border border-[#E2E8F0]">
            <Image fill src="/BotmartznewBot.png" alt="Office Life 3" className="object-cover" />
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
            <h3 className="font-bold text-[18px] text-[#0B1220]">Don't Meet Every Requirement?</h3>
            <p className="font-medium text-[13.5px] leading-[1.6] text-[#5B6B85] mt-1.5">Send your CV to <strong className="text-[#007BFF]">sohamnsharma@gmail.com</strong> anyway — we care more about your ability to build than a checklist.</p>
          </div>
          <a 
            href={`mailto:sohamnsharma@gmail.com?subject=Application for ${encodeURIComponent(job.title)}`}
            className="font-bold text-[13.5px] text-white bg-[#007BFF] hover:bg-[#0069DB] px-6 py-3.5 rounded-[9px] cursor-pointer transition-colors inline-flex items-center gap-2 border-none shadow-[0_4px_12px_rgba(0,123,255,0.2)] whitespace-nowrap shrink-0"
          >
            <Mail size={16} /> Send CV: sohamnsharma@gmail.com
          </a>
        </div>
      </section>
    </div>
  );
}
