"use client";

import { useState, useEffect } from 'react';
import { Inter_Tight } from 'next/font/google';
import { Plus, Edit2, Trash2, Users, Briefcase, Eye, CheckCircle, Clock, XCircle, ExternalLink, FileText } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, orderBy, query, updateDoc } from 'firebase/firestore';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function JobsDashboard() {
  const [activeTab, setActiveTab] = useState<'positions' | 'applications'>('positions');
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingApps, setLoadingApps] = useState(true);

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

  const fetchApplications = async () => {
    setLoadingApps(true);
    try {
      const q = query(collection(db, "job_applications"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setApplications(data);
    } catch (e) {
      console.error("Error fetching applications:", e);
    }
    setLoadingApps(false);
  };

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const handleDeleteJob = async (id: string) => {
    if (confirm("Are you sure you want to delete this job position? This action cannot be undone.")) {
      try {
        await deleteDoc(doc(db, "jobs", id));
        setJobs(jobs.filter(j => j.id !== id));
      } catch (e) {
        console.error("Error deleting job:", e);
      }
    }
  };

  const handleDeleteApplication = async (id: string) => {
    if (confirm("Are you sure you want to delete this job application?")) {
      try {
        await deleteDoc(doc(db, "job_applications", id));
        setApplications(applications.filter(a => a.id !== id));
      } catch (e) {
        console.error("Error deleting application:", e);
      }
    }
  };

  const handleUpdateAppStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "job_applications", id), { status: newStatus });
      setApplications(applications.map(a => a.id === id ? { ...a, status: newStatus } : a));
    } catch (e) {
      console.error("Error updating application status:", e);
    }
  };

  return (
    <div className={`${interTight.className} p-6 w-full space-y-6`}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-admin-text">Careers & Job Management</h1>
          <p className="text-sm text-admin-text-muted mt-1">Manage open positions and track candidate applications for Botmartz AI Solutions.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="/admin/jobs/new"
            className="bg-admin-accent hover:bg-admin-accent/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Plus size={16} /> New Job Position
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-admin-border gap-6 text-sm font-medium">
        <button
          onClick={() => setActiveTab('positions')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'positions'
              ? 'border-admin-accent text-admin-accent'
              : 'border-transparent text-admin-text-muted hover:text-admin-text'
          }`}
        >
          <Briefcase size={16} /> Open Positions ({jobs.length})
        </button>
        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors relative ${
            activeTab === 'applications'
              ? 'border-admin-accent text-admin-accent'
              : 'border-transparent text-admin-text-muted hover:text-admin-text'
          }`}
        >
          <Users size={16} /> Applications ({applications.length})
          {applications.filter(a => a.status === 'new').length > 0 && (
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {applications.filter(a => a.status === 'new').length} new
            </span>
          )}
        </button>
      </div>

      {/* Tab Content: Open Positions */}
      {activeTab === 'positions' && (
        <div className="bg-admin-card border border-admin-border rounded-xl shadow-sm overflow-hidden">
          {loadingJobs ? (
            <div className="p-12 text-center text-admin-text-muted">Loading job openings...</div>
          ) : jobs.length === 0 ? (
            <div className="p-12 text-center text-admin-text-muted">
              <Briefcase className="mx-auto w-12 h-12 mb-4 opacity-20" />
              <p>No job positions found. Create your first job opening or candidates will see the default high-end positions.</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-admin-bg border-b border-admin-border text-xs font-semibold text-admin-text-muted uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Role Title</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-admin-bg/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-admin-text">{job.title}</div>
                      <div className="text-xs text-admin-text-muted font-mono">{job.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-admin-text">{job.department || 'Engineering'}</td>
                    <td className="px-6 py-4 text-sm text-admin-text">{job.location || 'Remote'}</td>
                    <td className="px-6 py-4 text-sm text-admin-text">{job.type || 'Full-time'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded ${
                        job.status === 'active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-admin-border text-admin-text-muted'
                      }`}>
                        {job.status || 'active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/careers/${job.slug}`} target="_blank" className="p-2 text-admin-text-muted hover:text-white bg-admin-bg hover:bg-admin-border rounded-lg transition-colors" title="View Public Job Page">
                          <Eye size={16} />
                        </Link>
                        <Link href={`/admin/jobs/${job.id}`} className="p-2 text-admin-text-muted hover:text-white bg-admin-bg hover:bg-admin-border rounded-lg transition-colors" title="Edit Job">
                          <Edit2 size={16} />
                        </Link>
                        <button onClick={() => handleDeleteJob(job.id)} className="p-2 text-red-500/70 hover:text-red-500 bg-admin-bg hover:bg-admin-border rounded-lg transition-colors" title="Delete Job">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Tab Content: Applications */}
      {activeTab === 'applications' && (
        <div className="bg-admin-card border border-admin-border rounded-xl shadow-sm overflow-hidden">
          {loadingApps ? (
            <div className="p-12 text-center text-admin-text-muted">Loading candidate applications...</div>
          ) : applications.length === 0 ? (
            <div className="p-12 text-center text-admin-text-muted">
              <Users className="mx-auto w-12 h-12 mb-4 opacity-20" />
              <p>No job applications received yet. Applications submitted on the frontside /careers portal will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-admin-border">
              {applications.map((app) => (
                <div key={app.id} className="p-6 hover:bg-admin-bg/40 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-admin-text">{app.candidateName || app.name}</h3>
                        <span className={`px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded border ${
                          app.status === 'new' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                          app.status === 'reviewing' ? 'bg-sky-500/20 text-sky-400 border-sky-500/30' :
                          app.status === 'interviewed' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                          app.status === 'hired' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                          'bg-zinc-800 text-zinc-400 border-zinc-700'
                        }`}>
                          {app.status || 'new'}
                        </span>
                      </div>
                      <div className="text-sm text-admin-accent font-medium">Applied for: {app.role || 'General Application'}</div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-admin-text-muted pt-1">
                        <span>Email: <a href={`mailto:${app.email}`} className="text-admin-text hover:underline">{app.email}</a></span>
                        {app.phone && <span>Phone: <a href={`tel:${app.phone}`} className="text-admin-text hover:underline">{app.phone}</a></span>}
                        {app.resumeUrl && (
                          <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline flex items-center gap-1">
                            <FileText size={13} /> View Resume / Portfolio <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                      {app.coverNote && (
                        <div className="mt-3 p-3 bg-admin-bg rounded-lg border border-admin-border text-xs text-admin-text/90 leading-relaxed">
                          <div className="font-semibold text-admin-text-muted mb-1 uppercase tracking-wider text-[10px]">Cover Note / Experience:</div>
                          {app.coverNote}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap md:flex-col items-end gap-2 shrink-0">
                      <div className="flex items-center gap-1.5 text-xs">
                        <select
                          value={app.status || 'new'}
                          onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                          className="bg-admin-bg border border-admin-border rounded-lg px-3 py-1.5 text-xs text-admin-text focus:outline-none focus:border-admin-accent"
                        >
                          <option value="new">Status: New</option>
                          <option value="reviewing">Reviewing</option>
                          <option value="interviewed">Interviewed</option>
                          <option value="hired">Hired</option>
                          <option value="rejected">Rejected</option>
                        </select>
                        <button onClick={() => handleDeleteApplication(app.id)} className="p-1.5 text-red-500/70 hover:text-red-500 bg-admin-bg hover:bg-admin-border rounded-lg transition-colors" title="Delete Application">
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
    </div>
  );
}
