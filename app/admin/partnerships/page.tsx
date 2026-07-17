"use client";

import { useState, useEffect } from 'react';
import { Inter_Tight } from 'next/font/google';
import { Plus, Edit2, Trash2, FileText, CheckCircle, Clock, XCircle, ExternalLink, Save, Building2, Handshake, Globe } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, getDoc, setDoc, orderBy, query, updateDoc, serverTimestamp } from 'firebase/firestore';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function PartnershipsDashboard() {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'content'>('inquiries');
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(true);
  const [loadingContent, setLoadingContent] = useState(true);
  const [savingContent, setSavingContent] = useState(false);
  const [contentMsg, setContentMsg] = useState('');

  const [pageContent, setPageContent] = useState({
    heroTitle: 'Partner with Botmartz. Accelerate the Enterprise AI Ecosystem.',
    heroSubtitle: 'We collaborate with frontier cloud providers, hardware innovators, system integrators, and academic institutions to deploy high-impact AI architectures globally.',
    technologyDescription: 'Collaborate with Botmartz on hardware acceleration (NVIDIA/AMD), cloud infrastructure (AWS/GCP/Azure), and foundation model ecosystems (OpenAI, Anthropic, Hugging Face).',
    siDescription: 'Enterprise consulting firms and system integrators deploying Botmartz custom RAG pipelines, fine-tuned LoRA models, and autonomous agent architectures for joint clients.',
    researchDescription: 'Joint R&D initiatives with academic institutions, AI research labs, and contributions to our flagship AI Frontier 2026 conference.'
  });

  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const q = query(collection(db, "partnership_inquiries"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInquiries(data);
    } catch (e) {
      console.error("Error fetching partnership inquiries:", e);
    }
    setLoadingInquiries(false);
  };

  const fetchPageContent = async () => {
    setLoadingContent(true);
    try {
      const docSnap = await getDoc(doc(db, "dynamic_pages", "partnerships"));
      if (docSnap.exists() && docSnap.data().hero) {
        const data = docSnap.data();
        setPageContent({
          heroTitle: data.hero?.title || pageContent.heroTitle,
          heroSubtitle: data.hero?.subtitle || pageContent.heroSubtitle,
          technologyDescription: data.programs?.technology || pageContent.technologyDescription,
          siDescription: data.programs?.si || pageContent.siDescription,
          researchDescription: data.programs?.research || pageContent.researchDescription,
        });
      }
    } catch (e) {
      console.error("Error fetching partnerships page content:", e);
    }
    setLoadingContent(false);
  };

  useEffect(() => {
    fetchInquiries();
    fetchPageContent();
  }, []);

  const handleDeleteInquiry = async (id: string) => {
    if (confirm("Are you sure you want to delete this partnership inquiry?")) {
      try {
        await deleteDoc(doc(db, "partnership_inquiries", id));
        setInquiries(inquiries.filter(i => i.id !== id));
      } catch (e) {
        console.error("Error deleting inquiry:", e);
      }
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "partnership_inquiries", id), { status: newStatus });
      setInquiries(inquiries.map(i => i.id === id ? { ...i, status: newStatus } : i));
    } catch (e) {
      console.error("Error updating status:", e);
    }
  };

  const handleSaveContent = async () => {
    setSavingContent(true);
    setContentMsg('');
    try {
      await setDoc(doc(db, "dynamic_pages", "partnerships"), {
        hero: {
          title: pageContent.heroTitle,
          subtitle: pageContent.heroSubtitle,
          badge: 'Partnerships & Ecosystem'
        },
        programs: {
          technology: pageContent.technologyDescription,
          si: pageContent.siDescription,
          research: pageContent.researchDescription,
        },
        updatedAt: serverTimestamp()
      }, { merge: true });
      setContentMsg('Partnerships page content updated successfully across frontside public pages!');
    } catch (e: any) {
      setContentMsg('Error saving content: ' + e.message);
    }
    setSavingContent(false);
  };

  return (
    <div className={`${interTight.className} p-6 max-w-[1200px] mx-auto space-y-6`}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-admin-text">Partnerships Ecosystem Management</h1>
          <p className="text-sm text-admin-text-muted mt-1">Review incoming partnership proposals and customize the public `/partnerships` page content.</p>
        </div>
        <Link 
          href="/partnerships"
          target="_blank"
          className="bg-admin-bg hover:bg-admin-border border border-admin-border text-admin-text px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Globe size={16} /> View Public Partnerships Page <ExternalLink size={13} />
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-admin-border gap-6 text-sm font-medium">
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors relative ${
            activeTab === 'inquiries'
              ? 'border-admin-accent text-admin-accent'
              : 'border-transparent text-admin-text-muted hover:text-admin-text'
          }`}
        >
          <Handshake size={16} /> Partnership Inquiries ({inquiries.length})
          {inquiries.filter(i => i.status === 'new').length > 0 && (
            <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {inquiries.filter(i => i.status === 'new').length} new
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('content')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'content'
              ? 'border-admin-accent text-admin-accent'
              : 'border-transparent text-admin-text-muted hover:text-admin-text'
          }`}
        >
          <FileText size={16} /> Edit Public Page Content
        </button>
      </div>

      {/* Tab Content: Inquiries */}
      {activeTab === 'inquiries' && (
        <div className="bg-admin-card border border-admin-border rounded-xl shadow-sm overflow-hidden">
          {loadingInquiries ? (
            <div className="p-12 text-center text-admin-text-muted">Loading partnership proposals...</div>
          ) : inquiries.length === 0 ? (
            <div className="p-12 text-center text-admin-text-muted">
              <Handshake className="mx-auto w-12 h-12 mb-4 opacity-20" />
              <p>No partnership proposals received yet. Submissions from the public `/partnerships` form will appear here instantly.</p>
            </div>
          ) : (
            <div className="divide-y divide-admin-border">
              {inquiries.map((inq) => (
                <div key={inq.id} className="p-6 hover:bg-admin-bg/40 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-admin-text">{inq.companyName || 'Unknown Company'}</h3>
                        <span className={`px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded border ${
                          inq.status === 'new' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                          inq.status === 'reviewing' ? 'bg-sky-500/20 text-sky-400 border-sky-500/30' :
                          inq.status === 'in_talks' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                          inq.status === 'approved' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                          'bg-zinc-800 text-zinc-400 border-zinc-700'
                        }`}>
                          {inq.status || 'new'}
                        </span>
                      </div>
                      <div className="text-sm text-admin-accent font-medium">Model: {inq.partnershipType || 'Technology Partner'}</div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-admin-text-muted pt-1">
                        <span>Contact: <strong className="text-admin-text">{inq.contactPerson}</strong></span>
                        <span>Email: <a href={`mailto:${inq.email}`} className="text-admin-text hover:underline">{inq.email}</a></span>
                        {inq.website && (
                          <a href={inq.website.startsWith('http') ? inq.website : `https://${inq.website}`} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline flex items-center gap-1">
                            Website <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                      {inq.message && (
                        <div className="mt-3 p-3 bg-admin-bg rounded-lg border border-admin-border text-xs text-admin-text/90 leading-relaxed">
                          <div className="font-semibold text-admin-text-muted mb-1 uppercase tracking-wider text-[10px]">Proposal & Objectives:</div>
                          {inq.message}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap md:flex-col items-end gap-2 shrink-0">
                      <div className="flex items-center gap-1.5 text-xs">
                        <select
                          value={inq.status || 'new'}
                          onChange={(e) => handleUpdateStatus(inq.id, e.target.value)}
                          className="bg-admin-bg border border-admin-border rounded-lg px-3 py-1.5 text-xs text-admin-text focus:outline-none focus:border-admin-accent"
                        >
                          <option value="new">Status: New</option>
                          <option value="reviewing">Under Review</option>
                          <option value="in_talks">In Talks / Exploratory</option>
                          <option value="approved">Approved Partner</option>
                          <option value="declined">Declined</option>
                        </select>
                        <button onClick={() => handleDeleteInquiry(inq.id)} className="p-1.5 text-red-500/70 hover:text-red-500 bg-admin-bg hover:bg-admin-border rounded-lg transition-colors" title="Delete Inquiry">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Page Content Editor */}
      {activeTab === 'content' && (
        <div className="bg-admin-card border border-admin-border rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-admin-border">
            <div>
              <h3 className="text-lg font-semibold text-admin-text">Frontside Partnerships Page Content</h3>
              <p className="text-xs text-admin-text-muted">Changes saved here reflect instantly on `/partnerships` via live SSR override.</p>
            </div>
            <button
              onClick={handleSaveContent}
              disabled={savingContent}
              className="bg-admin-accent hover:bg-admin-accent/90 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={16} /> {savingContent ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          {contentMsg && (
            <div className={`p-4 rounded-lg text-sm border ${contentMsg.includes('Error') ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
              {contentMsg}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-2">Hero Main Title</label>
              <input
                type="text"
                value={pageContent.heroTitle}
                onChange={(e) => setPageContent({ ...pageContent, heroTitle: e.target.value })}
                className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-2">Hero Subtitle</label>
              <textarea
                rows={3}
                value={pageContent.heroSubtitle}
                onChange={(e) => setPageContent({ ...pageContent, heroSubtitle: e.target.value })}
                className="w-full bg-admin-bg border border-admin-border rounded-lg p-4 text-sm text-admin-text focus:outline-none focus:border-admin-accent leading-relaxed"
              />
            </div>
            <div className="pt-4 border-t border-admin-border">
              <h4 className="text-sm font-semibold text-admin-text mb-4">Partnership Program Descriptions</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-2">Technology & Cloud Partners</label>
                  <textarea
                    rows={3}
                    value={pageContent.technologyDescription}
                    onChange={(e) => setPageContent({ ...pageContent, technologyDescription: e.target.value })}
                    className="w-full bg-admin-bg border border-admin-border rounded-lg p-4 text-sm text-admin-text focus:outline-none focus:border-admin-accent leading-relaxed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-2">System Integrators (SI) & Solution Partners</label>
                  <textarea
                    rows={3}
                    value={pageContent.siDescription}
                    onChange={(e) => setPageContent({ ...pageContent, siDescription: e.target.value })}
                    className="w-full bg-admin-bg border border-admin-border rounded-lg p-4 text-sm text-admin-text focus:outline-none focus:border-admin-accent leading-relaxed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-2">Research & Academic Partners</label>
                  <textarea
                    rows={3}
                    value={pageContent.researchDescription}
                    onChange={(e) => setPageContent({ ...pageContent, researchDescription: e.target.value })}
                    className="w-full bg-admin-bg border border-admin-border rounded-lg p-4 text-sm text-admin-text focus:outline-none focus:border-admin-accent leading-relaxed"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
