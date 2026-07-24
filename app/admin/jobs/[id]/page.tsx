"use client";

import { useState, useEffect, use } from 'react';
import { Inter_Tight } from 'next/font/google';
import { Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

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

export default function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const isNew = resolvedParams.id === 'new';
  const router = useRouter();
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    department: 'AI & Engineering',
    location: 'Indore, India / Remote',
    type: 'Full-time',
    experience: '3+ Years',
    salary: 'Competitive + Equity Options',
    status: 'active',
    shortDescription: '',
    responsibilities: '',
    requirements: ''
  });

  const [niceToHave, setNiceToHave] = useState('');
  const [stackInput, setStackInput] = useState('');
  
  const [benefits, setBenefits] = useState<JobBenefit[]>([]);
  const [hiringSteps, setHiringSteps] = useState<HiringStep[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [faqs, setFaqs] = useState<JobFAQ[]>([]);

  useEffect(() => {
    if (!isNew) {
      const fetchJob = async () => {
        try {
          const docSnap = await getDoc(doc(db, "jobs", resolvedParams.id));
          if (docSnap.exists()) {
            const data = docSnap.data() as any;
            setFormData({
              title: data.title || '',
              slug: data.slug || '',
              department: data.department || 'AI & Engineering',
              location: data.location || 'Indore, India / Remote',
              type: data.type || 'Full-time',
              experience: data.experience || '3+ Years',
              salary: data.salary || 'Competitive + Equity Options',
              status: data.status || 'active',
              shortDescription: data.shortDescription || '',
              responsibilities: data.responsibilities || '',
              requirements: data.requirements || ''
            });

            if (data.niceToHave) {
              setNiceToHave(Array.isArray(data.niceToHave) ? data.niceToHave.join('\n') : data.niceToHave);
            }
            if (data.stack) {
              setStackInput(Array.isArray(data.stack) ? data.stack.join(', ') : data.stack);
            }
            if (data.benefits) setBenefits(data.benefits);
            if (data.hiringSteps) setHiringSteps(data.hiringSteps);
            if (data.team) setTeam(data.team);
            if (data.faqs) setFaqs(data.faqs);
          } else {
            setError("Job position not found");
          }
        } catch (e) {
          setError("Failed to load job position");
        }
        setLoading(false);
      };
      fetchJob();
    }
  }, [resolvedParams.id, isNew]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value };
      if (field === 'title' && isNew && !prev.slug) {
        next.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      return next;
    });
  };

  // Benefits List Manager
  const handleBenefitChange = (index: number, key: keyof JobBenefit, value: string) => {
    const updated = [...benefits];
    updated[index] = { ...updated[index], [key]: value };
    setBenefits(updated);
  };
  const addBenefit = () => setBenefits([...benefits, { tag: '', title: '', desc: '' }]);
  const removeBenefit = (index: number) => setBenefits(benefits.filter((_, i) => i !== index));

  // Hiring Steps List Manager
  const handleStepChange = (index: number, key: keyof HiringStep, value: string) => {
    const updated = [...hiringSteps];
    updated[index] = { ...updated[index], [key]: value };
    setHiringSteps(updated);
  };
  const addStep = () => setHiringSteps([...hiringSteps, { n: (hiringSteps.length + 1).toString(), title: '', desc: '' }]);
  const removeStep = (index: number) => setHiringSteps(hiringSteps.filter((_, i) => i !== index));

  // Team List Manager
  const handleTeamChange = (index: number, key: keyof TeamMember, value: string) => {
    const updated = [...team];
    updated[index] = { ...updated[index], [key]: value };
    setTeam(updated);
  };
  const addTeamMember = () => setTeam([...team, { initials: '', name: '', role: '' }]);
  const removeTeamMember = (index: number) => setTeam(team.filter((_, i) => i !== index));

  // FAQs List Manager
  const handleFaqChange = (index: number, key: keyof JobFAQ, value: string) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [key]: value };
    setFaqs(updated);
  };
  const addFaq = () => setFaqs([...faqs, { q: '', a: '' }]);
  const removeFaq = (index: number) => setFaqs(faqs.filter((_, i) => i !== index));

  const handleSave = async () => {
    if (!formData.title || !formData.slug) {
      alert("Role Title and Slug are required.");
      return;
    }
    
    setSaving(true);
    try {
      const payload = {
        ...formData,
        niceToHave: niceToHave.split('\n').map(l => l.trim()).filter(Boolean),
        stack: stackInput.split(',').map(s => s.trim()).filter(Boolean),
        benefits,
        hiringSteps,
        team,
        faqs,
        updatedAt: serverTimestamp()
      };

      if (isNew) {
        await addDoc(collection(db, "jobs"), {
          ...payload,
          createdAt: serverTimestamp()
        });
      } else {
        await setDoc(doc(db, "jobs", resolvedParams.id), payload, { merge: true });
      }
      router.push('/admin/jobs');
    } catch (e: any) {
      setError(e.message || "Failed to save job position");
    }
    setSaving(false);
  };

  if (loading) return <div className="p-12 text-center text-admin-text-muted">Loading...</div>;

  return (
    <div className={`${interTight.className} p-6 max-w-[1000px] mx-auto space-y-6 pb-24`}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/jobs" className="p-2 bg-admin-bg border border-admin-border rounded-lg text-admin-text-muted hover:text-white hover:border-admin-text-muted transition-colors">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-admin-text">{isNew ? 'Create New Job Opening' : 'Edit Job Position'}</h1>
            <p className="text-sm text-admin-text-muted mt-1">{isNew ? 'Publish a new role on the public careers portal.' : `Updating ${formData.title}`}</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-admin-accent hover:bg-admin-accent/90 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Save size={16} /> {saving ? 'Saving...' : 'Save Job Opening'}
        </button>
      </div>

      {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">{error}</div>}

      <div className="bg-admin-card border border-admin-border rounded-xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-2">Role Title *</label>
            <input 
              type="text" 
              value={formData.title} 
              onChange={e => handleChange('title', e.target.value)}
              placeholder="e.g. Senior AI & RAG Architect" 
              className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-2">URL Slug *</label>
            <input 
              type="text" 
              value={formData.slug} 
              onChange={e => handleChange('slug', e.target.value)}
              placeholder="senior-ai-rag-architect" 
              className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text font-mono focus:outline-none focus:border-admin-accent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-2">Department</label>
            <input 
              type="text" 
              value={formData.department} 
              onChange={e => handleChange('department', e.target.value)}
              placeholder="AI & Engineering" 
              className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-2">Location</label>
            <input 
              type="text" 
              value={formData.location} 
              onChange={e => handleChange('location', e.target.value)}
              placeholder="Indore, India / Remote" 
              className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-2">Job Type</label>
            <select 
              value={formData.type} 
              onChange={e => handleChange('type', e.target.value)}
              className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent"
            >
              <option value="Full-time">Full-time</option>
              <option value="Contract / Project-based">Contract / Project-based</option>
              <option value="Internship">Internship</option>
              <option value="Remote Full-time">Remote Full-time</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-2">Experience Required</label>
            <input 
              type="text" 
              value={formData.experience} 
              onChange={e => handleChange('experience', e.target.value)}
              placeholder="3+ Years" 
              className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-2">Salary Range / Compensation</label>
            <input 
              type="text" 
              value={formData.salary} 
              onChange={e => handleChange('salary', e.target.value)}
              placeholder="Competitive + Equity Options" 
              className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-2">Publish Status</label>
            <select 
              value={formData.status} 
              onChange={e => handleChange('status', e.target.value)}
              className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent"
            >
              <option value="active">Active (Visible on Public Careers Page)</option>
              <option value="draft">Draft (Hidden)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-2">Short Role Summary</label>
          <textarea 
            rows={3} 
            value={formData.shortDescription} 
            onChange={e => handleChange('shortDescription', e.target.value)}
            placeholder="We are seeking an experienced AI systems architect to build highly optimized RAG pipelines and custom LoRA models..." 
            className="w-full bg-admin-bg border border-admin-border rounded-lg p-4 text-sm text-admin-text focus:outline-none focus:border-admin-accent leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-2">Key Responsibilities (Enter one per line)</label>
          <textarea 
            rows={6} 
            value={formData.responsibilities} 
            onChange={e => handleChange('responsibilities', e.target.value)}
            placeholder="Design and implement production-grade RAG and agentic workflows&#10;Fine-tune foundation models (Llama 3, Mistral) on proprietary datasets&#10;Collaborate directly with enterprise clients" 
            className="w-full bg-admin-bg border border-admin-border rounded-lg p-4 text-sm text-admin-text focus:outline-none focus:border-admin-accent leading-relaxed font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-2">Qualifications & Requirements (Enter one per line)</label>
          <textarea 
            rows={6} 
            value={formData.requirements} 
            onChange={e => handleChange('requirements', e.target.value)}
            placeholder="3+ years of professional engineering experience in ML/AI or backend systems&#10;Strong proficiency in Python and modern LLM frameworks&#10;Hands-on experience with vector databases" 
            className="w-full bg-admin-bg border border-admin-border rounded-lg p-4 text-sm text-admin-text focus:outline-none focus:border-admin-accent leading-relaxed font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-2">Nice to Have (Enter one per line)</label>
          <textarea 
            rows={4} 
            value={niceToHave} 
            onChange={e => setNiceToHave(e.target.value)}
            placeholder="Experience with LangGraph or other agentic libraries&#10;Prior public speaking or blog writing experience" 
            className="w-full bg-admin-bg border border-admin-border rounded-lg p-4 text-sm text-admin-text focus:outline-none focus:border-admin-accent leading-relaxed font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-2">Tech Stack Tags (Comma separated)</label>
          <input 
            type="text"
            value={stackInput}
            onChange={e => setStackInput(e.target.value)}
            placeholder="Python, FastAPI, LangChain, Qdrant, Docker" 
            className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent"
          />
        </div>

        {/* Dynamic Lists Editor Sections */}
        <div className="border-t border-admin-border pt-6 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted">Compensation & Benefits</label>
              <button onClick={addBenefit} className="text-xs text-admin-accent hover:underline flex items-center gap-1"><Plus size={14} /> Add Benefit</button>
            </div>
            {benefits.length === 0 ? (
              <div className="text-xs text-admin-text-muted bg-admin-bg p-3 rounded-lg border border-admin-border border-dashed text-center">No custom benefits added. Using standard default benefits.</div>
            ) : (
              <div className="space-y-3">
                {benefits.map((b, idx) => (
                  <div key={idx} className="flex gap-3 bg-admin-bg p-3 rounded-lg border border-admin-border items-start">
                    <input className="w-16 bg-admin-card border border-admin-border rounded-lg px-3 py-1.5 text-xs text-admin-text focus:outline-none focus:border-admin-accent shrink-0" placeholder="Tag (RM)" value={b.tag} onChange={e => handleBenefitChange(idx, 'tag', e.target.value)} />
                    <input className="w-1/3 bg-admin-card border border-admin-border rounded-lg px-3 py-1.5 text-xs text-admin-text focus:outline-none focus:border-admin-accent shrink-0" placeholder="Title (Remote-Friendly)" value={b.title} onChange={e => handleBenefitChange(idx, 'title', e.target.value)} />
                    <input className="flex-1 bg-admin-card border border-admin-border rounded-lg px-3 py-1.5 text-xs text-admin-text focus:outline-none focus:border-admin-accent" placeholder="Description of benefit" value={b.desc} onChange={e => handleBenefitChange(idx, 'desc', e.target.value)} />
                    <button onClick={() => removeBenefit(idx)} className="p-1.5 text-red-500 hover:text-red-400 transition-colors bg-admin-card border border-admin-border rounded-lg"><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted">Hiring Steps</label>
              <button onClick={addStep} className="text-xs text-admin-accent hover:underline flex items-center gap-1"><Plus size={14} /> Add Step</button>
            </div>
            {hiringSteps.length === 0 ? (
              <div className="text-xs text-admin-text-muted bg-admin-bg p-3 rounded-lg border border-admin-border border-dashed text-center">No custom steps added. Using standard 5-step hiring process.</div>
            ) : (
              <div className="space-y-3">
                {hiringSteps.map((h, idx) => (
                  <div key={idx} className="flex gap-3 bg-admin-bg p-3 rounded-lg border border-admin-border items-start">
                    <input className="w-12 bg-admin-card border border-admin-border rounded-lg px-3 py-1.5 text-xs text-admin-text focus:outline-none focus:border-admin-accent shrink-0 text-center" placeholder="#" value={h.n} onChange={e => handleStepChange(idx, 'n', e.target.value)} />
                    <input className="w-1/3 bg-admin-card border border-admin-border rounded-lg px-3 py-1.5 text-xs text-admin-text focus:outline-none focus:border-admin-accent shrink-0" placeholder="Step Title (Technical Screen)" value={h.title} onChange={e => handleStepChange(idx, 'title', e.target.value)} />
                    <input className="flex-1 bg-admin-card border border-admin-border rounded-lg px-3 py-1.5 text-xs text-admin-text focus:outline-none focus:border-admin-accent" placeholder="Step description" value={h.desc} onChange={e => handleStepChange(idx, 'desc', e.target.value)} />
                    <button onClick={() => removeStep(idx)} className="p-1.5 text-red-500 hover:text-red-400 transition-colors bg-admin-card border border-admin-border rounded-lg"><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted">Job Team Members</label>
              <button onClick={addTeamMember} className="text-xs text-admin-accent hover:underline flex items-center gap-1"><Plus size={14} /> Add Team Member</button>
            </div>
            {team.length === 0 ? (
              <div className="text-xs text-admin-text-muted bg-admin-bg p-3 rounded-lg border border-admin-border border-dashed text-center">No custom team members added. Using default founders & AI engineers team.</div>
            ) : (
              <div className="space-y-3">
                {team.map((t, idx) => (
                  <div key={idx} className="flex gap-3 bg-admin-bg p-3 rounded-lg border border-admin-border items-start">
                    <input className="w-16 bg-admin-card border border-admin-border rounded-lg px-3 py-1.5 text-xs text-admin-text focus:outline-none focus:border-admin-accent shrink-0 text-center" placeholder="Initials (HS)" value={t.initials} onChange={e => handleTeamChange(idx, 'initials', e.target.value)} />
                    <input className="w-1/3 bg-admin-card border border-admin-border rounded-lg px-3 py-1.5 text-xs text-admin-text focus:outline-none focus:border-admin-accent shrink-0" placeholder="Full Name (Harsh Sahu)" value={t.name} onChange={e => handleTeamChange(idx, 'name', e.target.value)} />
                    <input className="flex-1 bg-admin-card border border-admin-border rounded-lg px-3 py-1.5 text-xs text-admin-text focus:outline-none focus:border-admin-accent" placeholder="Role Description (AI Engineer)" value={t.role} onChange={e => handleTeamChange(idx, 'role', e.target.value)} />
                    <button onClick={() => removeTeamMember(idx)} className="p-1.5 text-red-500 hover:text-red-400 transition-colors bg-admin-card border border-admin-border rounded-lg"><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted">Frequently Asked Questions (FAQ)</label>
              <button onClick={addFaq} className="text-xs text-admin-accent hover:underline flex items-center gap-1"><Plus size={14} /> Add FAQ</button>
            </div>
            {faqs.length === 0 ? (
              <div className="text-xs text-admin-text-muted bg-admin-bg p-3 rounded-lg border border-admin-border border-dashed text-center">No custom FAQs added. Using standard relocation & interview FAQs.</div>
            ) : (
              <div className="space-y-3">
                {faqs.map((f, idx) => (
                  <div key={idx} className="flex flex-col gap-2.5 bg-admin-bg p-4.5 rounded-lg border border-admin-border relative">
                    <button onClick={() => removeFaq(idx)} className="absolute top-4 right-4 p-1.5 text-red-500 hover:text-red-400 transition-colors bg-admin-card border border-admin-border rounded-lg"><Trash2 size={14} /></button>
                    <div className="w-[90%]">
                      <label className="block text-[10px] font-bold text-admin-text-muted mb-1 uppercase tracking-wider">Question</label>
                      <input className="w-full bg-admin-card border border-admin-border rounded-lg px-3 py-1.5 text-xs text-admin-text focus:outline-none focus:border-admin-accent" placeholder="Is this role remote?" value={f.q} onChange={e => handleFaqChange(idx, 'q', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-admin-text-muted mb-1 uppercase tracking-wider">Answer</label>
                      <textarea rows={2} className="w-full bg-admin-card border border-admin-border rounded-lg p-3 text-xs text-admin-text focus:outline-none focus:border-admin-accent" placeholder="Yes, this role supports remote flexibility..." value={f.a} onChange={e => handleFaqChange(idx, 'a', e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
