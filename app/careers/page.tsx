"use client";

import { useState, useEffect } from 'react';
import { Inter_Tight } from 'next/font/google';
import { ArrowRight, Briefcase, MapPin, Clock, Sparkles, Send, CheckCircle, Heart, Zap, Users, Code, Shield, Building2 } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const DEFAULT_JOBS = [
  {
    id: 'default-1',
    title: 'Senior RAG & AI Systems Architect',
    slug: 'senior-rag-ai-systems-architect',
    department: 'AI Systems & Labs',
    location: 'Indore, India / Remote Hybrid',
    type: 'Full-time',
    experience: '4+ Years',
    salary: 'Competitive + Equity Options',
    shortDescription: 'Architect and deploy highly optimized enterprise RAG pipelines, hybrid vector search engines, and multi-agent systems for Fortune 500 healthcare and manufacturing clients.',
    responsibilities: '• Architect scalable RAG workflows using PyTorch, vLLM, LangChain, and vector databases (Milvus, Qdrant).\n• Optimize token latency and inference throughput on NVIDIA H100 clusters.\n• Lead technical design reviews and mentor junior AI engineers.',
    requirements: '• 4+ years of software engineering and ML/AI infrastructure experience.\n• Deep proficiency in Python, PyTorch, and distributed inference systems.\n• Proven track record deploying production AI systems serving 10k+ daily queries.'
  },
  {
    id: 'default-2',
    title: 'LLM Fine-tuning & LoRA Specialist',
    slug: 'llm-fine-tuning-lora-specialist',
    department: 'Model Research & Adaptation',
    location: 'Indore, India / Remote',
    type: 'Full-time',
    experience: '3+ Years',
    salary: 'Competitive + Equity Options',
    shortDescription: 'Lead proprietary dataset curation, instruction tuning, and LoRA/QLoRA domain adaptation of foundation models (Llama 3, Mistral) across specialized verticals.',
    responsibilities: '• Design data cleaning, synthetic data generation, and RLHF/DPO preference alignment pipelines.\n• Fine-tune open-weight LLMs using Axolotl, Hugging Face PEFT, and DeepSpeed.\n• Benchmark model accuracy and safety against proprietary domain standards.',
    requirements: '• Strong theoretical and practical foundation in transformer architectures.\n• Hands-on mastery of LoRA/QLoRA training and evaluation frameworks.\n• Strong background in linear algebra and GPU memory optimization.'
  },
  {
    id: 'default-3',
    title: 'Full-Stack AI Application Engineer',
    slug: 'full-stack-ai-application-engineer',
    department: 'Product Engineering',
    location: 'Indore, India / Remote',
    type: 'Full-time',
    experience: '3+ Years',
    salary: 'Competitive + Perks',
    shortDescription: 'Build ultra-fast, premium glassmorphic web applications and agent copilots combining Next.js 15, TypeScript, Tailwind CSS, and real-time streaming LLM endpoints.',
    responsibilities: '• Build production web applications using Next.js App Router, TypeScript, and Firebase/Firestore.\n• Integrate real-time Server-Sent Events (SSE) and WebSockets for streaming AI agent responses.\n• Collaborate closely with UI/UX designers to craft WOW-level user interfaces.',
    requirements: '• 3+ years of frontend and full-stack development experience with modern React/Next.js.\n• Obsession with clean UI design, responsive layouts, and sub-second performance.\n• Experience integrating OpenAI, Anthropic, or custom LLM API endpoints.'
  },
  {
    id: 'default-4',
    title: 'Enterprise AI Systems Evangelist & Growth Lead',
    slug: 'enterprise-ai-systems-evangelist',
    department: 'Growth & Partnerships',
    location: 'Indore, India / Remote',
    type: 'Full-time',
    experience: '3+ Years',
    salary: 'Base + Uncapped Commission',
    shortDescription: 'Drive technical discovery calls, solution architecture mapping, and ecosystem growth across healthcare, manufacturing, and our flagship AI Frontier 2026 conference.',
    responsibilities: '• Conduct deep technical discovery sessions with enterprise CTOs and VPs of Engineering.\n• Translate complex domain workflows into Botmartz custom AI solution proposals.\n• Speak at industry workshops and lead AI Frontier 2026 partner engagement.',
    requirements: '• Strong technical literacy in artificial intelligence, cloud architectures, and data engineering.\n• Exceptional communication, presentation, and enterprise consulting skills.\n• Passion for building long-term executive relationships and driving high-impact AI adoption.'
  }
];

export default function CareersPublicPage() {
  const [jobs, setJobs] = useState<any[]>(DEFAULT_JOBS);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [isApplying, setIsApplying] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [appForm, setAppForm] = useState({
    name: '',
    email: '',
    phone: '',
    resumeUrl: '',
    coverNote: ''
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const q = query(collection(db, "jobs"), where("status", "==", "active"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (data && data.length > 0) {
          setJobs(data);
        }
      } catch (e) {
        console.error("Error fetching jobs from Firestore, using default fallback positions:", e);
      }
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const handleApplyClick = (jobTitle: string) => {
    setSelectedRole(jobTitle);
    setIsApplying(true);
    setSubmitted(false);
    setErrorMsg('');
    setTimeout(() => {
      document.getElementById('application-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appForm.name || !appForm.email || !selectedRole) {
      setErrorMsg('Please enter your full name, email, and select a role.');
      return;
    }
    setSubmitting(true);
    setErrorMsg('');
    try {
      await addDoc(collection(db, "job_applications"), {
        candidateName: appForm.name,
        email: appForm.email,
        phone: appForm.phone,
        role: selectedRole,
        resumeUrl: appForm.resumeUrl,
        coverNote: appForm.coverNote,
        status: 'new',
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      setAppForm({ name: '', email: '', phone: '', resumeUrl: '', coverNote: '' });
    } catch (err: any) {
      setErrorMsg('Failed to submit application: ' + err.message);
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
            name: 'Careers at Botmartz AI Solutions',
            description: 'Join Botmartz and build frontier autonomous AI systems, RAG pipelines, and fine-tuned LLMs for enterprise domain workflows.',
            url: 'https://botmartz.com/careers',
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
            <span className="w-6 h-px bg-[#00B8F0]" />Careers & Engineering Labs<span className="w-6 h-px bg-[#00B8F0]" />
          </div>
          <h1 className="text-[clamp(40px,6vw,68px)] leading-[1.05] font-semibold mb-6 tracking-tight text-white max-w-[850px]">
            Shape the Frontier of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B8F0] to-[#0066FF]">Autonomous AI</span>.
          </h1>
          <p className="text-[17px] sm:text-[19px] text-[#8A9EB0] mb-10 max-w-[660px] leading-relaxed font-light">
            We are not building thin wrappers around generic APIs. At Botmartz, we engineer deep, domain-adapted foundation models, multi-agent orchestrations, and high-performance RAG architectures.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#open-positions" className="bg-[#00B8F0] hover:bg-[#0096C7] text-white px-8 py-3.5 rounded-lg text-[15px] font-medium transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(0,184,240,0.25)]">
              View Open Positions <ArrowRight size={16} />
            </a>
            <a href="#application-section" onClick={() => setSelectedRole('General Application / Future Role')} className="bg-[#0A111F] hover:bg-[#1E293B] border border-[#1E293B] text-white px-8 py-3.5 rounded-lg text-[15px] font-medium transition-all">
              Submit General Application
            </a>
          </div>
        </div>
      </section>

      {/* WHY BOTMARTZ */}
      <section className="py-[90px] bg-[#0A111F] border-y border-[#1E293B]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16 max-w-[700px] mx-auto">
            <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-white mb-4">Why Engineering at Botmartz?</h2>
            <p className="text-[#8A9EB0] text-[17px]">Work on hard technical problems with high autonomy, cutting-edge hardware access, and direct enterprise impact.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Code,
                title: 'Frontier AI Architectures',
                desc: 'Deploy custom LoRA adapters, hybrid vector + hybrid sparse/dense search pipelines, and autonomous agent loops that solve mission-critical enterprise workflows.'
              },
              {
                icon: Zap,
                title: 'High Autonomy & Velocity',
                desc: 'No endless bureaucracy or redundant meetings. We ship production AI systems rapidly, evaluate rigorously, and iterate with direct client feedback.'
              },
              {
                icon: Users,
                title: 'Global Impact & Culture',
                desc: 'Join a world-class engineering team based out of Indore, India and remotely worldwide. We host the flagship AI Frontier 2026 summit and foster deep continuous learning.'
              }
            ].map((perk, i) => {
              const Icon = perk.icon;
              return (
                <div key={i} className="bg-[#050B14] border border-[#1E293B] rounded-xl p-8 hover:border-[#00B8F0]/40 transition-all group">
                  <div className="w-12 h-12 rounded-lg bg-[#0A111F] border border-[#1E293B] flex items-center justify-center mb-6 text-[#00B8F0] group-hover:scale-110 transition-transform">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-[20px] font-semibold text-white mb-3">{perk.title}</h3>
                  <p className="text-[15px] text-[#8A9EB0] leading-relaxed">{perk.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section id="open-positions" className="py-[100px] bg-[#050B14]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="font-mono text-[11px] tracking-widest text-[#00B8F0] uppercase mb-2">Join The Team</div>
              <h2 className="text-[32px] md:text-[42px] font-semibold tracking-tight text-white">Open Roles & Positions</h2>
            </div>
            <p className="text-[#8A9EB0] text-sm max-w-[400px]">
              Don&apos;t see an exact fit? We are always hiring exceptional engineering and domain talent. Submit a general application below.
            </p>
          </div>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-[#0A111F] border border-[#1E293B] rounded-xl p-6 md:p-8 hover:border-[#00B8F0]/50 hover:shadow-[0_0_30px_rgba(0,184,240,0.05)] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 bg-[#050B14] border border-[#1E293B] rounded-full text-xs font-mono text-[#00B8F0]">
                      {job.department || 'Engineering'}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-[#8A9EB0]">
                      <MapPin size={13} className="text-[#00B8F0]" /> {job.location || 'Remote'}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-[#8A9EB0]">
                      <Clock size={13} className="text-[#00B8F0]" /> {job.type || 'Full-time'}
                    </span>
                  </div>
                  <h3 className="text-[22px] md:text-[24px] font-semibold text-white group-hover:text-[#00B8F0] transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-[15px] text-[#8A9EB0] leading-relaxed max-w-[750px]">
                    {job.shortDescription}
                  </p>
                  {job.experience && (
                    <div className="text-xs font-mono text-[#8A9EB0] pt-1">
                      Req Experience: <span className="text-white font-semibold">{job.experience}</span> | Compensation: <span className="text-white font-semibold">{job.salary || 'Competitive'}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => handleApplyClick(job.title)}
                    className="bg-[#00B8F0] hover:bg-[#0096C7] text-white px-6 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-2 shadow-sm"
                  >
                    Apply Now <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION SECTION */}
      <section id="application-section" className="py-[100px] bg-[#0A111F] border-t border-[#1E293B]">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="bg-[#050B14] border border-[#1E293B] rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00B8F0]/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="text-center mb-8">
              <h2 className="text-[28px] md:text-[36px] font-semibold tracking-tight text-white mb-2">
                {selectedRole && selectedRole !== 'General Application / Future Role' ? `Apply for: ${selectedRole}` : 'Submit Your Candidate Application'}
              </h2>
              <p className="text-[#8A9EB0] text-[15px]">
                Direct candidate portal. Our engineering leads review applications daily.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center space-y-4 my-6">
                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-2xl font-bold text-white">Application Submitted Successfully!</h3>
                <p className="text-sm text-[#8A9EB0] max-w-[500px] mx-auto leading-relaxed">
                  Thank you for applying to Botmartz AI Solutions. Your application has been logged directly into our engineering dashboard. We will get in touch soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-[#0A111F] border border-[#1E293B] hover:bg-[#1E293B] text-white px-6 py-2.5 rounded-lg text-xs font-medium transition-colors"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-5">
                {errorMsg && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A9EB0] mb-2">Role Applying For *</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full bg-[#0A111F] border border-[#1E293B] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00B8F0]"
                    required
                  >
                    <option value="">-- Select Role / Position --</option>
                    {jobs.map((job) => (
                      <option key={job.id} value={job.title}>{job.title}</option>
                    ))}
                    <option value="General Application / Future Role">General Application / Future Role</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A9EB0] mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={appForm.name}
                      onChange={(e) => setAppForm({ ...appForm, name: e.target.value })}
                      placeholder="e.g. Sachin Rawat"
                      className="w-full bg-[#0A111F] border border-[#1E293B] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00B8F0]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A9EB0] mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={appForm.email}
                      onChange={(e) => setAppForm({ ...appForm, email: e.target.value })}
                      placeholder="sachin@example.com"
                      className="w-full bg-[#0A111F] border border-[#1E293B] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00B8F0]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A9EB0] mb-2">Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      value={appForm.phone}
                      onChange={(e) => setAppForm({ ...appForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#0A111F] border border-[#1E293B] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00B8F0]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A9EB0] mb-2">Resume / Portfolio Link (Drive, GitHub, LinkedIn) *</label>
                    <input
                      type="url"
                      value={appForm.resumeUrl}
                      onChange={(e) => setAppForm({ ...appForm, resumeUrl: e.target.value })}
                      placeholder="https://github.com/... or https://linkedin.com/..."
                      className="w-full bg-[#0A111F] border border-[#1E293B] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00B8F0]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A9EB0] mb-2">Cover Note / Key Projects & Experience</label>
                  <textarea
                    rows={4}
                    value={appForm.coverNote}
                    onChange={(e) => setAppForm({ ...appForm, coverNote: e.target.value })}
                    placeholder="Tell us briefly about the most challenging AI architecture, RAG system, or software application you have built..."
                    className="w-full bg-[#0A111F] border border-[#1E293B] rounded-lg p-4 text-sm text-white focus:outline-none focus:border-[#00B8F0] leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#00B8F0] hover:bg-[#0096C7] text-white font-medium py-4 rounded-lg transition-all flex items-center justify-center gap-2 text-[15px] shadow-[0_0_25px_rgba(0,184,240,0.2)] disabled:opacity-50 mt-4"
                >
                  <Send size={17} /> {submitting ? 'Submitting Application...' : 'Submit Candidate Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
