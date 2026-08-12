"use client";

import { useState, useEffect } from 'react';
import { Inter_Tight } from 'next/font/google';
import {
  Plus,
  Edit2,
  Trash2,
  Briefcase,
  Eye,
  Search,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function JobsDashboard() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  // Bulk Selection States
  const [selectedJobIds, setSelectedJobIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchJobs = async () => {
    setLoadingJobs(true);
    try {
      const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobs(data);
    } catch (e) {
      console.error("Error fetching jobs:", e);
    }
    setLoadingJobs(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const toggleSelectAllJobs = () => {
    if (selectedJobIds.length === filteredJobs.length && filteredJobs.length > 0) {
      setSelectedJobIds([]);
    } else {
      setSelectedJobIds(filteredJobs.map(j => j.id));
    }
  };

  const toggleSelectJob = (id: string) => {
    setSelectedJobIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleDeleteJob = async (id: string) => {
    if (confirm("Are you sure you want to delete this job position? This action cannot be undone.")) {
      try {
        await deleteDoc(doc(db, "jobs", id));
        setJobs(jobs.filter(j => j.id !== id));
        setSelectedJobIds(prev => prev.filter(i => i !== id));
      } catch (e) {
        console.error("Error deleting job:", e);
        alert("Failed to delete job position.");
      }
    }
  };

  const handleBulkDeleteJobs = async () => {
    if (selectedJobIds.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedJobIds.length} selected job position(s)?`)) return;
    try {
      await Promise.all(selectedJobIds.map(id => deleteDoc(doc(db, "jobs", id))));
      setJobs(prev => prev.filter(j => !selectedJobIds.includes(j.id)));
      setSelectedJobIds([]);
    } catch (e) {
      alert("Failed to delete selected jobs.");
    }
  };

  const filteredJobs = jobs.filter(job => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (job.title || '').toLowerCase().includes(q) ||
      (job.department || '').toLowerCase().includes(q) ||
      (job.location || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className={`${interTight.className} p-6 w-full space-y-6 text-admin-text`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-admin-text flex items-center gap-2">
            <Briefcase size={24} className="text-admin-accent" /> Careers & Job Management
          </h1>
          <p className="text-sm text-admin-text-muted mt-1">
            Publish open positions for Botmartz AI Solutions. Candidates send CVs to <strong className="text-admin-accent font-mono">sohamnsharma@gmail.com</strong>.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {selectedJobIds.length > 0 && (
            <button
              onClick={handleBulkDeleteJobs}
              className="bg-rose-500/15 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Trash2 size={15} /> Delete Selected ({selectedJobIds.length})
            </button>
          )}

          <Link 
            href="/admin/jobs/new"
            className="bg-admin-accent hover:bg-admin-accent/90 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-sm"
          >
            <Plus size={16} /> New Job Position
          </Link>
        </div>
      </div>

      {/* Control & Search Bar */}
      <div className="bg-admin-card border border-admin-border rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold text-admin-text">
          <Briefcase size={18} className="text-admin-accent" />
          <span>Open Positions ({jobs.length})</span>
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-muted" />
          <input
            type="text"
            placeholder="Search job title, department, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-admin-bg border border-admin-border rounded-xl pl-9 pr-4 py-2 text-xs text-admin-text focus:outline-none focus:border-admin-accent"
          />
        </div>
      </div>

      {/* OPEN POSITIONS TABLE */}
      <div className="bg-admin-card border border-admin-border rounded-xl shadow-sm overflow-hidden">
        {loadingJobs ? (
          <div className="p-12 text-center text-admin-text-muted font-mono text-xs">Loading job openings...</div>
        ) : filteredJobs.length === 0 ? (
          <div className="p-12 text-center text-admin-text-muted space-y-3">
            <Briefcase className="mx-auto w-12 h-12 opacity-20 text-admin-accent" />
            <p className="text-sm font-medium">No job positions found.</p>
            <Link
              href="/admin/jobs/new"
              className="inline-flex items-center gap-2 text-xs font-bold text-admin-accent hover:underline"
            >
              + Create First Job Opening
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto max-h-[550px] overflow-y-auto">
            <table className="w-full text-left border-collapse min-w-[750px]">
              <thead className="bg-admin-bg sticky top-0 z-10 border-b border-admin-border text-xs font-semibold text-admin-text-muted uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-4 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={selectedJobIds.length === filteredJobs.length && filteredJobs.length > 0}
                      onChange={toggleSelectAllJobs}
                      className="w-4 h-4 rounded border-slate-600 accent-admin-accent cursor-pointer"
                    />
                  </th>
                  <th className="px-6 py-4">Role Title</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border text-sm">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className={`hover:bg-admin-bg/50 transition-colors ${selectedJobIds.includes(job.id) ? 'bg-admin-accent/5' : ''}`}>
                    <td className="px-4 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedJobIds.includes(job.id)}
                        onChange={() => toggleSelectJob(job.id)}
                        className="w-4 h-4 rounded border-slate-600 accent-admin-accent cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-admin-text">{job.title}</div>
                      <div className="text-xs text-admin-text-muted font-mono">/{job.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-admin-text font-medium">{job.department || 'Engineering'}</td>
                    <td className="px-6 py-4 text-admin-text font-medium">{job.location || 'Remote'}</td>
                    <td className="px-6 py-4 text-admin-text font-medium">{job.type || 'Full-time'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${
                        job.status === 'active' || job.status === 'published'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                      }`}>
                        {job.status || 'published'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/careers/${job.slug}`}
                          target="_blank"
                          className="p-2 text-admin-text-muted hover:text-white bg-admin-bg hover:bg-admin-border rounded-lg transition-colors"
                          title="View Public Job Page"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          href={`/admin/jobs/${job.id}`}
                          className="p-2 text-admin-text-muted hover:text-white bg-admin-bg hover:bg-admin-border rounded-lg transition-colors"
                          title="Edit Job Opening"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="p-2 text-red-500/70 hover:text-red-500 bg-admin-bg hover:bg-admin-border rounded-lg transition-colors cursor-pointer"
                          title="Delete Job Opening"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
