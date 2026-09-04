"use client";

import { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Briefcase,
  Eye,
  Search,
  ExternalLink,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  X,
  Sparkles,
  Phone,
  Mail,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';

export default function JobsDashboard() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');

  // Job Positions State
  const [jobs, setJobs] = useState<any[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [selectedJobIds, setSelectedJobIds] = useState<string[]>([]);
  const [searchJobQuery, setSearchJobQuery] = useState('');
  const [seeding, setSeeding] = useState(false);

  // Candidate Applications State
  const [applications, setApplications] = useState<any[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [appMetrics, setAppMetrics] = useState({
    total: 0,
    pending: 0,
    selected: 0,
    rejected: 0,
    roleCounts: {} as Record<string, number>
  });
  
  // Application Filters & Search
  const [searchAppQuery, setSearchAppQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [selectedAppModal, setSelectedAppModal] = useState<any | null>(null);
  const [updatingAppId, setUpdatingAppId] = useState<string | null>(null);

  // Fetch Job Openings
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

  const handleJobStatusChange = async (jobId: string, newStatus: string) => {
    try {
      const { updateDoc, doc } = await import('firebase/firestore');
      await updateDoc(doc(db, "jobs", jobId), { status: newStatus });
      setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: newStatus } : j));
    } catch (e) {
      console.error("Error updating job status:", e);
      alert("Failed to update status.");
    }
  };

  // Fetch Candidate Applications
  const fetchApplications = async () => {
    setLoadingApps(true);
    try {
      const res = await fetch('/api/admin/applications');
      const data = await res.json();
      if (data.success) {
        setApplications(data.applications || []);
        setAppMetrics(data.metrics || { total: 0, pending: 0, selected: 0, rejected: 0, roleCounts: {} });
      }
    } catch (e) {
      console.error("Error fetching applications:", e);
    }
    setLoadingApps(false);
  };

  const handleSeedJobs = async (reset: boolean = false) => {
    if (reset && !confirm("This will clear all existing duplicate job positions and reset to the exact canonical roles. Continue?")) {
      return;
    }
    setSeeding(true);
    try {
      const res = await fetch(`/api/admin/seed-jobs${reset ? '?reset=true' : ''}`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        await fetchJobs();
      } else {
        alert("Seeding failed: " + data.error);
      }
    } catch (e) {
      console.error("Error seeding jobs:", e);
    }
    setSeeding(false);
  };

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  // Job Actions
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

  // Candidate Application Actions
  const handleUpdateAppStatus = async (id: string, newStatus: 'selected' | 'rejected' | 'pending') => {
    setUpdatingAppId(id);
    try {
      const res = await fetch('/api/admin/applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
        if (selectedAppModal && selectedAppModal.id === id) {
          setSelectedAppModal({ ...selectedAppModal, status: newStatus });
        }
        await fetchApplications(); // Refresh metrics
      } else {
        alert("Failed to update status: " + data.error);
      }
    } catch (e) {
      console.error("Error updating application status:", e);
    }
    setUpdatingAppId(null);
  };

  const handleDeleteApplication = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application?")) return;
    try {
      const res = await fetch(`/api/admin/applications?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setApplications(prev => prev.filter(a => a.id !== id));
        if (selectedAppModal?.id === id) setSelectedAppModal(null);
        await fetchApplications();
      } else {
        alert("Delete failed: " + data.error);
      }
    } catch (e) {
      console.error("Error deleting application:", e);
    }
  };

  const filteredJobs = jobs.filter(job => {
    if (!searchJobQuery.trim()) return true;
    const q = searchJobQuery.toLowerCase();
    return (
      (job.title || '').toLowerCase().includes(q) ||
      (job.department || '').toLowerCase().includes(q) ||
      (job.location || '').toLowerCase().includes(q)
    );
  });

  const filteredApplications = applications.filter(app => {
    // Filter by Role
    if (selectedRoleFilter !== 'ALL' && (app.roleTitle || 'General Application') !== selectedRoleFilter) {
      return false;
    }
    // Filter by Status
    if (selectedStatusFilter !== 'ALL' && app.status !== selectedStatusFilter) {
      return false;
    }
    // Search Query
    if (searchAppQuery.trim()) {
      const q = searchAppQuery.toLowerCase();
      return (
        (app.fullName || '').toLowerCase().includes(q) ||
        (app.email || '').toLowerCase().includes(q) ||
        (app.phone || '').toLowerCase().includes(q) ||
        (app.roleTitle || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  const uniqueRolesInApps = Array.from(new Set(applications.map(a => a.roleTitle || 'General Application')));

  return (
    <div className="p-6 w-full space-y-6 text-admin-text font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-admin-text flex items-center gap-2">
            <Briefcase size={24} className="text-admin-accent" /> Careers & Candidate Applications
          </h1>
          <p className="text-sm text-admin-text-muted mt-1">
            Manage open job positions and candidate applications submitted via <strong className="text-admin-accent">/careers</strong>.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 bg-admin-card p-1.5 rounded-xl border border-admin-border">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'jobs'
                ? 'bg-admin-accent text-white shadow-sm'
                : 'text-admin-text-muted hover:text-white'
            }`}
          >
            <Briefcase size={14} /> Open Positions ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'applications'
                ? 'bg-admin-accent text-white shadow-sm'
                : 'text-admin-text-muted hover:text-white'
            }`}
          >
            <Users size={14} /> Candidate Applications ({appMetrics.total})
            {appMetrics.pending > 0 && (
              <span className="bg-amber-500 text-black text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                {appMetrics.pending}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── TOP METRICS BANNER ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-admin-card border border-admin-border rounded-xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs font-bold text-admin-text-muted uppercase">Total Applications</div>
            <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">{appMetrics.total}</div>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl border border-blue-500/20">
            <Users size={20} />
          </div>
        </div>

        <div className="bg-admin-card border border-admin-border rounded-xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs font-bold text-admin-text-muted uppercase">Pending Review</div>
            <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">{appMetrics.pending}</div>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
            <Clock size={20} />
          </div>
        </div>

        <div className="bg-admin-card border border-admin-border rounded-xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs font-bold text-admin-text-muted uppercase">Selected / Shortlisted</div>
            <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{appMetrics.selected}</div>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl border border-emerald-500/20">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div className="bg-admin-card border border-admin-border rounded-xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs font-bold text-admin-text-muted uppercase">Rejected</div>
            <div className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">{appMetrics.rejected}</div>
          </div>
          <div className="p-3 bg-rose-500/10 text-rose-500 rounded-xl border border-rose-500/20">
            <XCircle size={20} />
          </div>
        </div>
      </div>

      {/* ── TAB 1: OPEN JOB POSITIONS ── */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-admin-card border border-admin-border rounded-xl p-4">
            <div className="relative w-full sm:w-80">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-muted" />
              <input
                type="text"
                placeholder="Search job title, department, location..."
                value={searchJobQuery}
                onChange={(e) => setSearchJobQuery(e.target.value)}
                className="w-full bg-admin-bg border border-admin-border rounded-xl pl-9 pr-4 py-2 text-xs text-admin-text focus:outline-none focus:border-admin-accent"
              />
            </div>

            <div className="flex items-center gap-3">
              {selectedJobIds.length > 0 && (
                <button
                  onClick={handleBulkDeleteJobs}
                  className="bg-rose-500/15 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Trash2 size={14} /> Delete Selected ({selectedJobIds.length})
                </button>
              )}

              <button
                onClick={() => handleSeedJobs(true)}
                disabled={seeding}
                className="bg-amber-500/15 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-black px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                title="Wipe duplicate positions and reset database to exact canonical roles"
              >
                <Sparkles size={14} /> {seeding ? "Cleaning..." : "Clean Duplicates"}
              </button>

              <Link 
                href="/admin/jobs/new"
                className="bg-admin-accent hover:bg-admin-accent/90 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shadow-sm"
              >
                <Plus size={16} /> New Job Position
              </Link>
            </div>
          </div>

          <div className="bg-admin-card border border-admin-border rounded-xl shadow-sm overflow-hidden">
            {loadingJobs ? (
              <div className="p-12 text-center text-admin-text-muted font-mono text-xs">Loading job openings...</div>
            ) : filteredJobs.length === 0 ? (
              <div className="p-12 text-center text-admin-text-muted space-y-4">
                <Briefcase className="mx-auto w-12 h-12 opacity-20 text-admin-accent" />
                <p className="text-sm font-medium">No job positions found.</p>
                <button
                  onClick={() => handleSeedJobs(false)}
                  disabled={seeding}
                  className="px-4 py-2 bg-admin-accent text-white rounded-xl text-xs font-bold"
                >
                  Sync Default Positions
                </button>
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
                          <select
                            value={job.status || 'published'}
                            onChange={(e) => handleJobStatusChange(job.id, e.target.value)}
                            className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded border bg-admin-bg cursor-pointer focus:outline-none ${
                              job.status === 'published' || job.status === 'active'
                                ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                                : job.status === 'closed'
                                ? 'text-rose-400 border-rose-500/30 bg-rose-500/10'
                                : job.status === 'suspended'
                                ? 'text-amber-400 border-amber-500/30 bg-amber-500/10'
                                : 'text-zinc-400 border-zinc-700 bg-zinc-800'
                            }`}
                          >
                            <option value="published" className="bg-[#0A1224] text-emerald-400 font-bold">PUBLISHED</option>
                            <option value="closed" className="bg-[#0A1224] text-rose-400 font-bold">CLOSED</option>
                            <option value="suspended" className="bg-[#0A1224] text-amber-400 font-bold">SUSPENDED</option>
                            <option value="draft" className="bg-[#0A1224] text-zinc-400 font-bold">DRAFT</option>
                          </select>
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
      )}

      {/* ── TAB 2: CANDIDATE APPLICATIONS ── */}
      {activeTab === 'applications' && (
        <div className="space-y-6">
          {/* ROLE-WISE BREAKDOWN CARDS */}
          {Object.keys(appMetrics.roleCounts).length > 0 && (
            <div>
              <div className="text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Filter size={13} /> Application Counts by Role Position
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {Object.entries(appMetrics.roleCounts).map(([role, count]) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRoleFilter(selectedRoleFilter === role ? 'ALL' : role)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedRoleFilter === role
                        ? 'bg-admin-accent/20 border-admin-accent text-white shadow-md'
                        : 'bg-admin-card border-admin-border text-admin-text hover:bg-admin-bg'
                    }`}
                  >
                    <div className="font-bold text-xs truncate" title={role}>{role}</div>
                    <div className="text-lg font-extrabold text-admin-accent mt-1">{count} Applicants</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SEARCH & FILTERS BAR */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-admin-card border border-admin-border rounded-xl p-4">
            <div className="relative w-full sm:w-80">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-muted" />
              <input
                type="text"
                placeholder="Search candidate name, email, phone..."
                value={searchAppQuery}
                onChange={(e) => setSearchAppQuery(e.target.value)}
                className="w-full bg-admin-bg border border-admin-border rounded-xl pl-9 pr-4 py-2 text-xs text-admin-text focus:outline-none focus:border-admin-accent"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* Role Filter */}
              <select
                value={selectedRoleFilter}
                onChange={(e) => setSelectedRoleFilter(e.target.value)}
                className="bg-admin-bg border border-admin-border text-admin-text rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-admin-accent cursor-pointer"
              >
                <option value="ALL">All Roles ({applications.length})</option>
                {uniqueRolesInApps.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="bg-admin-bg border border-admin-border text-admin-text rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-admin-accent cursor-pointer"
              >
                <option value="ALL">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="selected">Selected / Shortlisted</option>
                <option value="rejected">Rejected</option>
              </select>

              {(selectedRoleFilter !== 'ALL' || selectedStatusFilter !== 'ALL' || searchAppQuery) && (
                <button
                  onClick={() => {
                    setSelectedRoleFilter('ALL');
                    setSelectedStatusFilter('ALL');
                    setSearchAppQuery('');
                  }}
                  className="p-2 text-admin-text-muted hover:text-white bg-admin-bg rounded-lg text-xs font-semibold flex items-center gap-1"
                >
                  <X size={14} /> Clear
                </button>
              )}
            </div>
          </div>

          {/* CANDIDATE APPLICATIONS TABLE */}
          <div className="bg-admin-card border border-admin-border rounded-xl shadow-sm overflow-hidden">
            {loadingApps ? (
              <div className="p-12 text-center text-admin-text-muted font-mono text-xs">Loading candidate applications...</div>
            ) : filteredApplications.length === 0 ? (
              <div className="p-12 text-center text-admin-text-muted space-y-3">
                <Users className="mx-auto w-12 h-12 opacity-20 text-admin-accent" />
                <p className="text-sm font-medium">No candidate applications found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                <table className="w-full text-left border-collapse min-w-[850px]">
                  <thead className="bg-admin-bg sticky top-0 z-10 border-b border-admin-border text-xs font-semibold text-admin-text-muted uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Candidate Name</th>
                      <th className="px-6 py-4">Role Applied</th>
                      <th className="px-6 py-4">Contact Info</th>
                      <th className="px-6 py-4">Portfolio / LinkedIn</th>
                      <th className="px-6 py-4">Submitted Date</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-admin-border text-sm">
                    {filteredApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-admin-bg/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-white">{app.fullName}</div>
                          <div className="text-xs text-admin-text-muted">{app.experienceLevel || 'Students / Freshers'}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-admin-accent bg-admin-accent/10 px-2.5 py-1 rounded-md text-xs border border-admin-accent/20">
                            {app.roleTitle || 'General Application'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs space-y-1">
                          <div className="flex items-center gap-1.5 text-admin-text">
                            <Mail size={12} className="text-admin-text-muted" /> {app.email}
                          </div>
                          <div className="flex items-center gap-1.5 text-admin-text-muted">
                            <Phone size={12} className="text-admin-text-muted" /> {app.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs">
                          {app.portfolioUrl ? (
                            <a
                              href={app.portfolioUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-admin-accent hover:underline flex items-center gap-1 font-semibold"
                            >
                              Link <ExternalLink size={12} />
                            </a>
                          ) : (
                            <span className="text-admin-text-muted">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-xs text-admin-text-muted">
                          {app.createdAt ? new Date(app.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded border ${
                            app.status === 'selected'
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                              : app.status === 'rejected'
                              ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                              : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                          }`}>
                            {app.status || 'pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* View Modal Button */}
                            <button
                              onClick={() => setSelectedAppModal(app)}
                              className="p-1.5 text-admin-text-muted hover:text-white bg-admin-bg hover:bg-admin-border rounded-lg transition-colors cursor-pointer"
                              title="View Candidate Full Profile"
                            >
                              <Eye size={15} />
                            </button>

                            {/* Select / Shortlist Button */}
                            <button
                              onClick={() => handleUpdateAppStatus(app.id, 'selected')}
                              disabled={updatingAppId === app.id || app.status === 'selected'}
                              className="p-1.5 text-emerald-400/70 hover:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg transition-colors cursor-pointer disabled:opacity-30"
                              title="Shortlist / Select Candidate"
                            >
                              <CheckCircle2 size={15} />
                            </button>

                            {/* Reject Button */}
                            <button
                              onClick={() => handleUpdateAppStatus(app.id, 'rejected')}
                              disabled={updatingAppId === app.id || app.status === 'rejected'}
                              className="p-1.5 text-amber-400/70 hover:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg transition-colors cursor-pointer disabled:opacity-30"
                              title="Reject Candidate"
                            >
                              <XCircle size={15} />
                            </button>

                            {/* Delete Button */}
                            <button
                              onClick={() => handleDeleteApplication(app.id)}
                              className="p-1.5 text-rose-500/70 hover:text-rose-500 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg transition-colors cursor-pointer"
                              title="Delete Application"
                            >
                              <Trash2 size={15} />
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
      )}

      {/* ── APPLICANT DETAILS VIEW MODAL ── */}
      {selectedAppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0A1224] border border-white/15 rounded-2xl w-full max-w-lg p-6 text-white relative shadow-2xl space-y-5">
            <button
              onClick={() => setSelectedAppModal(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-lg bg-white/5 hover:bg-white/10"
            >
              <X size={18} />
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-admin-accent bg-admin-accent/10 px-2.5 py-1 rounded border border-admin-accent/20">
                {selectedAppModal.roleTitle || 'General Application'}
              </span>
              <h2 className="text-xl font-bold text-white mt-2">{selectedAppModal.fullName}</h2>
              <p className="text-xs text-gray-400">
                Submitted on {selectedAppModal.createdAt ? new Date(selectedAppModal.createdAt).toLocaleString() : '—'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-white/5 p-3 rounded-xl border border-white/10 text-xs">
              <div>
                <div className="text-gray-400 font-semibold">Email:</div>
                <div className="text-white mt-0.5">{selectedAppModal.email}</div>
              </div>
              <div>
                <div className="text-gray-400 font-semibold">Phone:</div>
                <div className="text-white mt-0.5">{selectedAppModal.phone}</div>
              </div>
              <div>
                <div className="text-gray-400 font-semibold">Experience Level:</div>
                <div className="text-white mt-0.5">{selectedAppModal.experienceLevel || 'Freshers / Students'}</div>
              </div>
              <div>
                <div className="text-gray-400 font-semibold">Portfolio / LinkedIn:</div>
                {selectedAppModal.portfolioUrl ? (
                  <a
                    href={selectedAppModal.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-admin-accent hover:underline flex items-center gap-1 font-bold mt-0.5"
                  >
                    View Portfolio <ExternalLink size={11} />
                  </a>
                ) : (
                  <div className="text-gray-500">—</div>
                )}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                Cover Note / Why Botmartz
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-gray-200 leading-relaxed max-h-40 overflow-y-auto">
                {selectedAppModal.coverNote || 'No cover note provided.'}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Current Status:</span>
                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                  selectedAppModal.status === 'selected' ? 'bg-emerald-500/20 text-emerald-400' :
                  selectedAppModal.status === 'rejected' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {selectedAppModal.status || 'pending'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateAppStatus(selectedAppModal.id, 'selected')}
                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                >
                  <CheckCircle2 size={13} /> Select
                </button>
                <button
                  onClick={() => handleUpdateAppStatus(selectedAppModal.id, 'rejected')}
                  className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                >
                  <XCircle size={13} /> Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
