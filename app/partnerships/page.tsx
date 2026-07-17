"use client";

import { useState, useEffect } from 'react';
import { Inter_Tight } from 'next/font/google';
import { ArrowRight, Handshake, Globe, Cpu, Users, Building2, CheckCircle, Send, Sparkles, Shield, Zap, Layers } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const DEFAULT_CONTENT = {
  heroTitle: 'Partner with Botmartz. Accelerate the Enterprise AI Ecosystem.',
  heroSubtitle: 'We collaborate with frontier cloud providers, hardware innovators, system integrators, and academic institutions to deploy high-impact AI architectures globally.',
  technologyTitle: 'Technology & Cloud Ecosystem Partners',
  technologyDescription: 'Collaborate with Botmartz on hardware acceleration (NVIDIA/AMD), cloud infrastructure (AWS/GCP/Azure), and foundation model ecosystems (OpenAI, Anthropic, Hugging Face).',
  siTitle: 'System Integrators (SI) & Solution Partners',
  siDescription: 'Enterprise consulting firms and system integrators deploying Botmartz custom RAG pipelines, fine-tuned LoRA models, and autonomous agent architectures for joint clients.',
  researchTitle: 'Research & Academic Collaborators',
  researchDescription: 'Joint R&D initiatives with academic institutions, AI research labs, and contributions to our flagship AI Frontier 2026 conference.'
};

export default function PartnershipsPublicPage() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [form, setForm] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    website: '',
    partnershipType: 'Technology / Cloud Ecosystem Partner',
    message: ''
  });

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const docSnap = await getDoc(doc(db, "dynamic_pages", "partnerships"));
        if (docSnap.exists() && docSnap.data().hero) {
          const data = docSnap.data();
          setContent({
            heroTitle: data.hero?.title || DEFAULT_CONTENT.heroTitle,
            heroSubtitle: data.hero?.subtitle || DEFAULT_CONTENT.heroSubtitle,
            technologyTitle: DEFAULT_CONTENT.technologyTitle,
            technologyDescription: data.programs?.technology || DEFAULT_CONTENT.technologyDescription,
            siTitle: DEFAULT_CONTENT.siTitle,
            siDescription: data.programs?.si || DEFAULT_CONTENT.siDescription,
            researchTitle: DEFAULT_CONTENT.researchTitle,
            researchDescription: data.programs?.research || DEFAULT_CONTENT.researchDescription,
          });
        }
      } catch (e) {
        console.error("Error fetching partnerships dynamic content:", e);
      }
      setLoading(false);
    };
    fetchPageContent();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyName || !form.contactPerson || !form.email) {
      setErrorMsg('Please complete company name, contact person, and email.');
      return;
    }
    setSubmitting(true);
    setErrorMsg('');
    try {
      await addDoc(collection(db, "partnership_inquiries"), {
        companyName: form.companyName,
        contactPerson: form.contactPerson,
        email: form.email,
        website: form.website,
        partnershipType: form.partnershipType,
        message: form.message,
        status: 'new',
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      setForm({
        companyName: '',
        contactPerson: '',
        email: '',
        website: '',
        partnershipType: 'Technology / Cloud Ecosystem Partner',
        message: ''
      });
    } catch (err: any) {
      setErrorMsg('Failed to submit inquiry: ' + err.message);
    }
    setSubmitting(false);
  };

  return (
    <main className={`${interTight.className} bg-[#050B14] min-h-screen text-white`}>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Partnerships Ecosystem — Botmartz AI Solutions',
            description: 'Partner with Botmartz AI Solutions across cloud infrastructure, foundation models, system integration, and joint academic research.',
            url: 'https://botmartz.com/partnerships',
            publisher: {
              '@type': 'Organization',
              name: 'Botmartz AI Solutions',
              logo: 'https://botmartz.com/Logo-removebg-preview.png'
            }
          })
        }}
      />

      {/* HERO */}
      <section className="relative pt-[140px] pb-[90px] bg-[#050B14] overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[30%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[160px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-6 flex items-center justify-center gap-3 font-semibold">
            <span className="w-6 h-px bg-[#00B8F0]" />Ecosystem & Strategic Alliance<span className="w-6 h-px bg-[#00B8F0]" />
          </div>
          <h1 className="text-[clamp(40px,6vw,64px)] leading-[1.05] font-semibold mb-6 tracking-tight text-white max-w-[850px]">
            {content.heroTitle}
          </h1>
          <p className="text-[17px] sm:text-[19px] text-[#8A9EB0] mb-10 max-w-[680px] leading-relaxed font-light">
            {content.heroSubtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#inquiry-section" className="bg-[#00B8F0] hover:bg-[#0096C7] text-white px-8 py-3.5 rounded-lg text-[15px] font-medium transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(0,184,240,0.25)]">
              Become a Partner <ArrowRight size={16} />
            </a>
            <a href="#programs" className="bg-[#0A111F] hover:bg-[#1E293B] border border-[#1E293B] text-white px-8 py-3.5 rounded-lg text-[15px] font-medium transition-all">
              Explore Partnership Models
            </a>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP PROGRAMS */}
      <section id="programs" className="py-[100px] bg-[#0A111F] border-y border-[#1E293B]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16 max-w-[700px] mx-auto">
            <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-white mb-4">Strategic Partnership Models</h2>
            <p className="text-[#8A9EB0] text-[17px]">We structure mutual, high-velocity collaborations tailored to hardware, consulting, and frontier research organizations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Cpu,
                title: content.technologyTitle,
                description: content.technologyDescription,
                badge: 'Infrastructure & Models'
              },
              {
                icon: Layers,
                title: content.siTitle,
                description: content.siDescription,
                badge: 'System Integrators'
              },
              {
                icon: Globe,
                title: content.researchTitle,
                description: content.researchDescription,
                badge: 'Research & Academic'
              }
            ].map((prog, i) => {
              const Icon = prog.icon;
              return (
                <div key={i} className="bg-[#050B14] border border-[#1E293B] rounded-xl p-8 hover:border-[#00B8F0]/40 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A111F] border border-[#1E293B] text-[11px] font-mono text-[#00B8F0] uppercase tracking-wider mb-6">
                      {prog.badge}
                    </div>
                    <div className="w-14 h-14 rounded-lg bg-[#0A111F] border border-[#1E293B] flex items-center justify-center mb-6 text-[#00B8F0] group-hover:scale-110 transition-transform">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-[22px] font-semibold text-white mb-4">{prog.title}</h3>
                    <p className="text-[15px] text-[#8A9EB0] leading-relaxed mb-8">{prog.description}</p>
                  </div>
                  <a href="#inquiry-section" className="inline-flex items-center gap-2 text-sm text-[#00B8F0] font-medium group-hover:underline">
                    Inquire for this track <ArrowRight size={14} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INQUIRY FORM SECTION */}
      <section id="inquiry-section" className="py-[100px] bg-[#050B14]">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="bg-[#0A111F] border border-[#1E293B] rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00B8F0]/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="text-center mb-8">
              <div className="font-mono text-[11px] tracking-widest text-[#00B8F0] uppercase mb-2">Strategic Alliance</div>
              <h2 className="text-[28px] md:text-[36px] font-semibold tracking-tight text-white mb-2">
                Initiate a Partnership Proposal
              </h2>
              <p className="text-[#8A9EB0] text-[15px]">
                Connect with our executive leadership and solutions architecture team.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center space-y-4 my-6">
                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-2xl font-bold text-white">Proposal Received!</h3>
                <p className="text-sm text-[#8A9EB0] max-w-[500px] mx-auto leading-relaxed">
                  Thank you for proposing a strategic alliance with Botmartz AI Solutions. Our executive partnerships lead will review your submission and schedule a joint briefing within 48 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-[#050B14] border border-[#1E293B] hover:bg-[#1E293B] text-white px-6 py-2.5 rounded-lg text-xs font-medium transition-colors"
                >
                  Submit Another Proposal
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A9EB0] mb-2">Company / Organization Name *</label>
                    <input
                      type="text"
                      value={form.companyName}
                      onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                      placeholder="e.g. Apex Systems Ltd"
                      className="w-full bg-[#050B14] border border-[#1E293B] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00B8F0]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A9EB0] mb-2">Primary Contact Person *</label>
                    <input
                      type="text"
                      value={form.contactPerson}
                      onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                      placeholder="e.g. Vikram Sharma, VP of Alliances"
                      className="w-full bg-[#050B14] border border-[#1E293B] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00B8F0]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A9EB0] mb-2">Work Email Address *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="v.sharma@apexsystems.com"
                      className="w-full bg-[#050B14] border border-[#1E293B] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00B8F0]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A9EB0] mb-2">Company Website URL</label>
                    <input
                      type="url"
                      value={form.website}
                      onChange={(e) => setForm({ ...form, website: e.target.value })}
                      placeholder="https://apexsystems.com"
                      className="w-full bg-[#050B14] border border-[#1E293B] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00B8F0]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A9EB0] mb-2">Partnership Model / Track *</label>
                  <select
                    value={form.partnershipType}
                    onChange={(e) => setForm({ ...form, partnershipType: e.target.value })}
                    className="w-full bg-[#050B14] border border-[#1E293B] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00B8F0]"
                  >
                    <option value="Technology / Cloud Ecosystem Partner">Technology / Cloud Ecosystem Partner</option>
                    <option value="System Integrator (SI) / Consulting Partner">System Integrator (SI) / Consulting Partner</option>
                    <option value="Research & Academic Collaboration">Research & Academic Collaboration</option>
                    <option value="AI Frontier 2026 Sponsorship / Co-host">AI Frontier 2026 Sponsorship / Co-host</option>
                    <option value="Other / Strategic Exploration">Other / Strategic Exploration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A9EB0] mb-2">Partnership Objectives & Proposal Overview</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your goals, joint solution ideas, integration scope, or how our organizations can collaborate effectively..."
                    className="w-full bg-[#050B14] border border-[#1E293B] rounded-lg p-4 text-sm text-white focus:outline-none focus:border-[#00B8F0] leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#00B8F0] hover:bg-[#0096C7] text-white font-medium py-4 rounded-lg transition-all flex items-center justify-center gap-2 text-[15px] shadow-[0_0_25px_rgba(0,184,240,0.2)] disabled:opacity-50 mt-4"
                >
                  <Send size={17} /> {submitting ? 'Submitting Proposal...' : 'Submit Partnership Proposal'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
