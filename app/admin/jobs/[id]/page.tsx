"use client";

import { useState, useEffect } from 'react';
import { Inter_Tight } from 'next/font/google';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function EditJobPage({ params }: { params: { id: string } }) {
  const isNew = params.id === 'new';
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

  useEffect(() => {
    if (!isNew) {
      const fetchJob = async () => {
        try {
          const docSnap = await getDoc(doc(db, "jobs", params.id));
          if (docSnap.exists()) {
            setFormData(docSnap.data() as any);
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
  }, [params.id, isNew]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value };
      if (field === 'title' && isNew && !prev.slug) {
        next.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      return next;
    });
  };

  const handleSave = async () => {
    if (!formData.title || !formData.slug) {
      alert("Role Title and Slug are required.");
      return;
    }
    
    setSaving(true);
    try {
      if (isNew) {
        await addDoc(collection(db, "jobs"), {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      } else {
        await setDoc(doc(db, "jobs", params.id), {
          ...formData,
          updatedAt: serverTimestamp()
        }, { merge: true });
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
          <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-2">Key Responsibilities (Enter bullet points or paragraphs)</label>
          <textarea 
            rows={6} 
            value={formData.responsibilities} 
            onChange={e => handleChange('responsibilities', e.target.value)}
            placeholder="• Design and implement production-grade RAG and agentic workflows using PyTorch, vLLM, and LangChain/LlamaIndex.&#10;• Fine-tune foundation models (Llama 3, Mistral) on proprietary domain datasets using LoRA/QLoRA.&#10;• Collaborate directly with enterprise clients to architect scalable AI systems." 
            className="w-full bg-admin-bg border border-admin-border rounded-lg p-4 text-sm text-admin-text focus:outline-none focus:border-admin-accent leading-relaxed font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-2">Qualifications & Requirements (Enter bullet points or paragraphs)</label>
          <textarea 
            rows={6} 
            value={formData.requirements} 
            onChange={e => handleChange('requirements', e.target.value)}
            placeholder="• 3+ years of professional engineering experience in ML/AI or backend systems.&#10;• Strong proficiency in Python, PyTorch, and modern LLM inference frameworks (vLLM, TensorRT-LLM).&#10;• Hands-on experience building semantic search, vector databases (Milvus, Pinecone, Qdrant), and complex evaluation pipelines." 
            className="w-full bg-admin-bg border border-admin-border rounded-lg p-4 text-sm text-admin-text focus:outline-none focus:border-admin-accent leading-relaxed font-mono"
          />
        </div>
      </div>
    </div>
  );
}
