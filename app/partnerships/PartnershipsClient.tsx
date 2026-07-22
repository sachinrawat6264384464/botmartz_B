"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function PartnershipsClient({
  heroContent = {
    badge: "Partnerships",
    title: "Grow the AI<br />Engineering <span class=\"text-[#00C6FF]\">Ecosystem</span> With Us",
    subtitle: "We partner with frameworks, cloud providers, universities and incubators to bring AI Frontier, our labs, and our community further — together.",
    ctaText: "Become a Partner →",
    ctaLink: "#partner-inquiry",
  },
  structuredData,
  aeoQuestion,
  aeoAnswer,
  techStack
}: {
  heroContent?: any;
  structuredData?: string;
  aeoQuestion?: string;
  aeoAnswer?: string;
  techStack?: string[];
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    website: '',
    partnershipType: 'Ecosystem Partner',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const heroStats = [
    { value: '4', label: 'Partnership Types' },
    { value: '2026', label: 'Program Launch' },
    { value: '1', label: 'Flagship Event' },
    { value: '∞', label: 'Long-Term Focus' },
  ];

  const partnerTypes = [
    { tag: 'EC', title: 'Ecosystem Partners', desc: 'Frameworks and platforms like PyTorch, AWS and NVIDIA collaborating on content and events.' },
    { tag: 'UN', title: 'University Partners', desc: 'Departments and student communities bringing AI engineering to the next generation.' },
    { tag: 'IN', title: 'Startups & Incubators', desc: 'Early-stage AI companies looking for community, visibility and technical talent.' },
    { tag: 'ENT', title: 'Enterprise Partners', desc: 'Companies exploring production AI adoption through roundtables and workshops.' },
  ];

  const colorPalette = ['#EE4C2C', '#4285F4', '#FF9900', '#76B900', '#00C6FF', '#9333EA', '#007BFF', '#7C3AED', '#E11D48', '#10B981'];
  const getPartnerColor = (name: string, index: number) => {
    const knownColors: Record<string, string> = {
      'PyTorch': '#EE4C2C',
      'GDG': '#4285F4',
      'AWS': '#FF9900',
      'NVIDIA': '#76B900',
      'Walkover': '#00C6FF',
      'IDFC': '#9333EA',
      'Incubators': '#007BFF',
      'Universities': '#7C3AED',
    };
    return knownColors[name] || colorPalette[index % colorPalette.length];
  };

  const ecosystem = (techStack && techStack.length > 0)
    ? techStack.map((name, i) => ({ name, color: getPartnerColor(name, i) }))
    : [
        { name: 'PyTorch', color: '#EE4C2C' },
        { name: 'GDG', color: '#4285F4' },
        { name: 'AWS', color: '#FF9900' },
        { name: 'NVIDIA', color: '#76B900' },
        { name: 'Walkover', color: '#00C6FF' },
        { name: 'IDFC', color: '#9333EA' },
        { name: 'Incubators', color: '#007BFF' },
        { name: 'Universities', color: '#7C3AED' },
      ];

  const steps = [
    { n: '1', title: 'Introduce', desc: 'Tell us who you are and what you’re hoping to build with the community.' },
    { n: '2', title: 'Align', desc: 'We shape a partnership that fits both your goals and our roadmap.' },
    { n: '3', title: 'Activate', desc: 'Show up at AI Frontier, a meetup, or a labs collaboration.' },
    { n: '4', title: 'Grow', desc: 'We revisit and expand the partnership as the community grows.' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyName || !form.contactPerson || !form.email) {
      setErrorMsg('Please fill in required fields.');
      return;
    }
    setSubmitting(true);
    setErrorMsg('');
    try {
      await addDoc(collection(db, "partnership_inquiries"), {
        ...form,
        status: 'new',
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      setTimeout(() => {
        setModalOpen(false);
        setSubmitted(false);
        setForm({ companyName: '', contactPerson: '', email: '', website: '', partnershipType: 'Ecosystem Partner', message: '' });
      }, 2000);
    } catch (err: any) {
      setErrorMsg('Submission error: ' + err.message);
    }
    setSubmitting(false);
  };

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Botmartz Ecosystem & University Partnerships",
    "description": "Collaborate with Botmartz on AI Frontier, hackathons, open-source AI engineering labs, and university developer programs.",
    "url": "https://www.botmartz.com/partnerships",
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": aeoQuestion || "How can organizations partner with Botmartz?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": aeoAnswer || "Organizations can partner with Botmartz as Ecosystem Partners (frameworks/cloud providers), University Partners (student programs/research), Startup & Incubator Partners, or Enterprise Partners for workshops, AI Frontier sponsorships, and open-source collaborations."
          }
        }
      ]
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
            <span className="text-[#00C6FF]">Partnerships</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div>
              <div className="font-bold text-[12px] tracking-[0.1em] text-[#00C6FF] uppercase">
                {heroContent.badge || "Partnerships"}
              </div>
              <h1 
                className="font-extrabold text-[clamp(32px,4.5vw,44px)] leading-[1.15] text-white mt-4"
                dangerouslySetInnerHTML={{ __html: heroContent.title || 'Grow the AI<br />Engineering <span class="text-[#00C6FF]">Ecosystem</span> With Us' }}
              />
              <p className="font-medium text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#8FA3C4] mt-4.5 max-w-[480px]">
                {heroContent.subtitle || "We partner with frameworks, cloud providers, universities and incubators to bring AI Frontier, our labs, and our community further — together."}
              </p>
              <div className="flex flex-wrap gap-3.5 mt-7">
                <button 
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-[#007BFF] hover:bg-[#0069DB] text-white font-bold text-[14px] px-6 py-3.5 rounded-[9px] shadow-[0_8px_24px_rgba(0,123,255,0.35)] transition-all cursor-pointer"
                >
                  {heroContent.ctaText || "Become a Partner →"}
                </button>
                <Link 
                  href="/community/events/ai-frontier-2026" 
                  className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold text-[14px] px-6 py-3.5 rounded-[9px] transition-all"
                >
                  Sponsor AI Frontier
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

      {/* ── FOUR KINDS OF PARTNERSHIPS ── */}
      <div className="max-w-[1240px] mx-auto pt-16 px-6 sm:px-10">
        <div className="text-center max-w-[640px] mx-auto mb-10">
          <div className="font-bold text-[12px] tracking-[0.1em] text-[#007BFF] uppercase">
            Ways to Partner
          </div>
          <h2 className="font-extrabold text-[28px] sm:text-[32px] leading-[1.3] text-[#0B1220] mt-3">
            Four Kinds of Partnerships
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {partnerTypes.map((p, idx) => (
            <div 
              key={idx}
              className="bg-white border border-[#E7ECF3] rounded-[14px] p-5 sm:p-6 flex flex-col gap-2.5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-[34px] h-[34px] rounded-[9px] bg-[#E8F2FF] flex items-center justify-center font-bold text-[10.5px] text-[#007BFF]">
                {p.tag}
              </div>
              <div className="font-bold text-[15px] text-[#0B1220] mt-1">
                {p.title}
              </div>
              <div className="font-medium text-[13px] leading-[1.55] text-[#5B6B85]">
                {p.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ECOSYSTEM WE WORK WITH ── */}
      <div className="max-w-[1240px] mx-auto pt-14 px-6 sm:px-10 text-center">
        <div className="font-bold text-[11.5px] tracking-[0.08em] text-[#007BFF] uppercase">
          Ecosystem We Work With
        </div>
        <div className="flex justify-center items-center gap-7 flex-wrap mt-5">
          {ecosystem.map((e, idx) => (
            <span key={idx} className="font-bold text-[13.5px] text-[#3A4459] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }}></span>
              {e.name}
            </span>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS STEPS ── */}
      <div className="max-w-[1240px] mx-auto mt-16 px-6 sm:px-10">
        <div className="bg-[#060C1F] rounded-[18px] p-8 sm:p-11 relative overflow-hidden shadow-xl">
          <div 
            className="absolute w-[300px] h-[300px] rounded-full left-[-80px] bottom-[-120px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0,123,255,0.2), transparent 70%)' }}
          />
          <div className="relative z-10">
            <div className="font-bold text-[11.5px] tracking-[0.08em] text-[#00C6FF] uppercase">
              How It Works
            </div>
            <div className="font-extrabold text-[26px] sm:text-[28px] text-white mt-2.5">
              From Conversation to Collaboration
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

      {/* ── HAVE A PARTNERSHIP IN MIND CTA ── */}
      <div className="max-w-[1240px] mx-auto my-14 pb-22 px-6 sm:px-10">
        <div className="bg-white border border-[#E7ECF3] rounded-[16px] p-7 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-[64px] h-[64px] rounded-full bg-[#E8F2FF] flex items-center justify-center font-bold text-[20px] text-[#007BFF] shrink-0">
              ◇
            </div>
            <div>
              <div className="font-bold text-[18px] text-[#0B1220]">
                Have a Partnership in Mind?
              </div>
              <div className="font-medium text-[13.5px] leading-[1.6] text-[#5B6B85] mt-1.5">
                Tell us about your organization and what you'd like to build together.
              </div>
            </div>
          </div>
          <button 
            onClick={() => setModalOpen(true)}
            className="font-bold text-[13.5px] text-white bg-[#007BFF] hover:bg-[#0069DB] px-6 py-3.5 rounded-[9px] shrink-0 transition-colors text-center shadow-md cursor-pointer"
          >
            Start a Conversation →
          </button>
        </div>
      </div>

      {/* ── PARTNERSHIP INQUIRY MODAL ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[16px] border border-[#E7ECF3] p-6 sm:p-8 max-w-[520px] w-full relative shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => { setModalOpen(false); setSubmitted(false); }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F1F4F9] text-[#5B6B85] hover:bg-[#E2E8F0] font-bold text-sm flex items-center justify-center transition-colors"
            >
              ✕
            </button>

            {submitted ? (
              <div className="py-8 text-center">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold mb-3">✓</div>
                <h3 className="text-xl font-bold text-[#0B1220]">Inquiry Submitted!</h3>
                <p className="text-sm text-[#5B6B85] mt-1">Our partnerships team will reach out to align on collaboration opportunities soon.</p>
              </div>
            ) : (
              <>
                <div className="font-bold text-[11px] tracking-[0.08em] text-[#007BFF] uppercase">
                  Let's Collaborate
                </div>
                <h3 className="font-extrabold text-[20px] text-[#0B1220] mt-1">
                  Start a Partnership Conversation
                </h3>
                {errorMsg && <div className="text-red-500 text-xs mt-2 font-semibold">{errorMsg}</div>}

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#3A4459] mb-1">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      placeholder="Acme AI Corp"
                      value={form.companyName}
                      onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] px-3.5 py-2.5 text-sm font-medium text-[#0B1220] outline-none focus:border-[#007BFF] transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#3A4459] mb-1">Contact Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Smith"
                        value={form.contactPerson}
                        onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] px-3.5 py-2.5 text-sm font-medium text-[#0B1220] outline-none focus:border-[#007BFF] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#3A4459] mb-1">Work Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@acme.ai"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] px-3.5 py-2.5 text-sm font-medium text-[#0B1220] outline-none focus:border-[#007BFF] transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#3A4459] mb-1">Website URL</label>
                      <input
                        type="text"
                        placeholder="https://acme.ai"
                        value={form.website}
                        onChange={(e) => setForm({ ...form, website: e.target.value })}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] px-3.5 py-2.5 text-sm font-medium text-[#0B1220] outline-none focus:border-[#007BFF] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#3A4459] mb-1">Partnership Type</label>
                      <select
                        value={form.partnershipType}
                        onChange={(e) => setForm({ ...form, partnershipType: e.target.value })}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] px-3.5 py-2.5 text-sm font-medium text-[#0B1220] outline-none focus:border-[#007BFF] transition-colors"
                      >
                        <option value="Ecosystem Partner">Ecosystem Partner</option>
                        <option value="University Partner">University Partner</option>
                        <option value="Startups & Incubators">Startups & Incubators</option>
                        <option value="Enterprise Partner">Enterprise Partner</option>
                        <option value="Conference Sponsorship">Conference Sponsorship</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#3A4459] mb-1">Collaboration Ideas / Message</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us what you'd like to build or host together..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] px-3.5 py-2.5 text-sm font-medium text-[#0B1220] outline-none focus:border-[#007BFF] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-2 font-bold text-[13.5px] text-white bg-[#007BFF] hover:bg-[#0069DB] py-3 rounded-[8px] shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {submitting ? 'Submitting...' : 'Send Inquiry →'}
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
