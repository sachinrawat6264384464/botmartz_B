"use client";

import React, { useState, useEffect } from "react";
import {
  Star,
  MessageSquare,
  Users,
  CheckCircle2,
  Clock,
  Download,
  RefreshCw,
  Search,
  Sparkles,
  ThumbsUp,
  MessageCircle,
  QrCode,
  ExternalLink,
  Loader2,
  BookOpen,
  Filter,
  Trash2
} from "lucide-react";
import Link from "next/link";

export default function AdminFeedbackPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<any>(null);

  const [selectedEvent, setSelectedEvent] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"submissions" | "participants">("submissions");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "student" | "professional">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "submitted" | "pending">("all");
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Bulk Selection State
  const [selectedFeedbackIds, setSelectedFeedbackIds] = useState<string[]>([]);

  const toggleSelectAllFeedback = () => {
    if (selectedFeedbackIds.length === filteredSubmissions.length && filteredSubmissions.length > 0) {
      setSelectedFeedbackIds([]);
    } else {
      setSelectedFeedbackIds(filteredSubmissions.map((f: any) => f.id));
    }
  };

  const toggleSelectFeedback = (id: string) => {
    setSelectedFeedbackIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleBulkDeleteFeedback = async () => {
    if (selectedFeedbackIds.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedFeedbackIds.length} selected feedback submission(s)?`)) return;

    try {
      await Promise.all(selectedFeedbackIds.map(id => 
        fetch("/api/admin/feedback", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        })
      ));

      setData((prevData: any) => {
        if (!prevData || !prevData.feedbacks) return prevData;
        const updatedFeedbacks = prevData.feedbacks.filter((f: any) => !selectedFeedbackIds.includes(f.id));
        return {
          ...prevData,
          feedbacks: updatedFeedbacks,
          stats: {
            ...prevData.stats,
            totalFeedbacks: Math.max(0, (prevData.stats?.totalFeedbacks || 0) - selectedFeedbackIds.length),
          },
        };
      });
      setSelectedFeedbackIds([]);
    } catch (err: any) {
      alert("Error deleting feedback items: " + (err.message || "Failed"));
    }
  };

  const handleDeleteFeedback = async (feedbackId: string) => {
    if (!confirm("Are you sure you want to delete this feedback submission? This cannot be undone.")) return;

    setDeletingId(feedbackId);
    try {
      const res = await fetch("/api/admin/feedback", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: feedbackId }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to delete feedback");

      // Remove from local state
      setData((prevData: any) => {
        if (!prevData || !prevData.feedbacks) return prevData;
        const updatedFeedbacks = prevData.feedbacks.filter((f: any) => f.id !== feedbackId);
        return {
          ...prevData,
          feedbacks: updatedFeedbacks,
          stats: {
            ...prevData.stats,
            totalFeedbacks: Math.max(0, (prevData.stats?.totalFeedbacks || 1) - 1),
          },
        };
      });
    } catch (err: any) {
      alert("Error deleting feedback: " + (err.message || "Failed"));
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleFeatured = async (feedbackId: string, targetFeaturedState: boolean) => {
    setTogglingId(feedbackId);
    // Optimistic local update
    setData((prevData: any) => {
      if (!prevData || !prevData.feedbacks) return prevData;
      return {
        ...prevData,
        feedbacks: prevData.feedbacks.map((f: any) =>
          f.id === feedbackId ? { ...f, isFeatured: targetFeaturedState } : f
        ),
      };
    });

    try {
      const res = await fetch("/api/admin/feedback/toggle-featured", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedbackId, isFeatured: targetFeaturedState }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to update featured status");
      }
    } catch (err: any) {
      alert("Error updating feedback status: " + (err.message || "Failed"));
      fetchData(selectedEvent);
    } finally {
      setTogglingId(null);
    }
  };

  const fetchData = async (eventId = selectedEvent) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/feedback?eventId=${eventId}`);
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to load feedback data.");
      setData(result);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedEvent);
  }, [selectedEvent]);

  const exportCSV = () => {
    if (!data || !data.feedbacks || data.feedbacks.length === 0) return;

    const headers = [
      "ID",
      "Event/Workshop",
      "Participant Name",
      "Email/Identifier",
      "Ticket Code",
      "Attendee Type",
      "Overall Rating",
      "Content Rating",
      "Instructor/Venue Rating",
      "Would Recommend",
      "Takeaways",
      "Comments",
      "Date"
    ];

    const rows = data.feedbacks.map((f: any) => [
      `"${f.id}"`,
      `"${f.workshopId || f.eventId || 'ai-accelerator-workshop'}"`,
      `"${f.participantName || ''}"`,
      `"${f.participantEmail || f.identifierProvided || ''}"`,
      `"${f.registrationCode || f.identifierProvided || ''}"`,
      `"${f.attendeeType || ''}"`,
      `"${f.overallRating || 5}"`,
      `"${f.contentRating || 5}"`,
      `"${f.venueRating || 5}"`,
      `"${f.recommend || 'yes'}"`,
      `"${(f.takeaways || '').replace(/"/g, '""')}"`,
      `"${(f.comments || '').replace(/"/g, '""')}"`,
      `"${f.createdAt ? new Date(f.createdAt).toLocaleString() : ''}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e: string[]) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `event_feedbacks_${selectedEvent}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter Submissions
  const filteredSubmissions = (data?.feedbacks || []).filter((f: any) => {
    const matchesSearch =
      (f.participantName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.participantEmail || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.identifierProvided || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.registrationCode || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.workshopId || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.takeaways || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.comments || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "all" || (f.attendeeType || "student") === typeFilter;
    return matchesSearch && matchesType;
  });

  // Filter Participant Status
  const filteredParticipants = (data?.participantStatusList || []).filter((p: any) => {
    const matchesSearch =
      (p.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.registrationCode || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "all" || (p.attendeeType || "student") === typeFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "submitted" && p.feedbackGiven) ||
      (statusFilter === "pending" && !p.feedbackGiven);

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="p-6 md:p-10 bg-[#040914] min-h-screen text-white font-sans space-y-8">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#00B8F0]/15 text-[#00B8F0] text-[10px] font-bold font-mono uppercase tracking-wider border border-[#00B8F0]/30">
              🌟 Event Intelligence Ledger
            </span>
          </div>
          <h1 className="text-3xl font-extrabold font-space-grotesk tracking-tight text-white flex items-center gap-3">
            Event &amp; Workshop Feedback Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Live feedback ledger, participant ratings, and survey submissions.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {selectedFeedbackIds.length > 0 && (
            <button
              onClick={handleBulkDeleteFeedback}
              className="flex items-center gap-2 px-4 py-2 bg-rose-500/15 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <Trash2 size={14} />
              Delete Selected ({selectedFeedbackIds.length})
            </button>
          )}

          {/* Event Filter Dropdown */}
          <div className="flex items-center gap-1.5 bg-[#050C18] border border-white/20 px-3 py-1.5 rounded-xl text-xs text-slate-300">
            <Filter size={14} className="text-[#00B8F0]" />
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#050C18] text-white">⚡ All Events &amp; Workshops</option>
              <option value="ai-accelerator-workshop" className="bg-[#050C18] text-white">🚀 AI Accelerator Workshop</option>
              <option value="ai-frontier-2026" className="bg-[#050C18] text-white">🎪 AI Frontier 2026 Main Event</option>
            </select>
          </div>

          <Link
            href="/community/ai-accelerator-workshop/feedback"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#050C18] border border-white/20 hover:border-[#00B8F0] text-slate-300 hover:text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors"
          >
            <BookOpen size={14} className="text-[#00B8F0]" />
            Live Workshop Form <ExternalLink size={12} />
          </Link>

          <button
            onClick={() => fetchData(selectedEvent)}
            disabled={loading}
            className="p-2.5 bg-[#050C18] border border-white/20 hover:border-white/40 text-slate-300 hover:text-white rounded-xl transition-all disabled:opacity-50"
            title="Refresh Data"
          >
            <RefreshCw size={16} className={loading ? "animate-spin text-[#00B8F0]" : ""} />
          </button>

          <button
            onClick={exportCSV}
            disabled={!data?.feedbacks?.length}
            className="flex items-center gap-2 bg-[#00B8F0] hover:bg-[#00A0D0] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-[#00B8F0]/25 disabled:opacity-50 cursor-pointer"
          >
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      {loading && !data ? (
        <div className="py-20 text-center space-y-3">
          <Loader2 size={32} className="animate-spin text-[#00B8F0] mx-auto" />
          <p className="text-xs text-slate-400 font-mono">Loading Feedback Ledger...</p>
        </div>
      ) : error ? (
        <div className="p-4 bg-rose-500/15 border border-rose-500/30 rounded-xl text-rose-300 text-xs">
          {error}
        </div>
      ) : (
        <>
          {/* STATS CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Average Rating */}
            <div className="bg-[#0A1120] border border-white/10 p-5 rounded-2xl space-y-2 relative overflow-hidden shadow-xl">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Average Rating</span>
                <Star size={18} className="text-amber-400 fill-amber-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-extrabold text-white font-mono">{data.stats.avgOverall}</h3>
                <span className="text-xs text-amber-400 font-bold">/ 5.0 ⭐</span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Content: <strong className="text-white">{data.stats.avgContent}</strong> • Instructor/Venue: <strong className="text-white">{data.stats.avgVenue}</strong>
              </p>
            </div>

            {/* Card 2: Total Feedbacks */}
            <div className="bg-[#0A1120] border border-white/10 p-5 rounded-2xl space-y-2 relative overflow-hidden shadow-xl">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Total Feedbacks</span>
                <MessageSquare size={18} className="text-[#00B8F0]" />
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-extrabold text-white font-mono">{data.stats.totalFeedbacks}</h3>
                <span className="text-xs text-[#00B8F0] font-bold">Submissions</span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                {data.stats.recommendRate}% Would recommend to peers 👍
              </p>
            </div>

            {/* Card 3: Feedback Coverage */}
            <div className="bg-[#0A1120] border border-white/10 p-5 rounded-2xl space-y-2 relative overflow-hidden shadow-xl">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Feedback Coverage</span>
                <CheckCircle2 size={18} className="text-emerald-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-extrabold text-white font-mono">{data.stats.coverageRate}%</h3>
                <span className="text-xs text-emerald-400 font-bold">
                  ({data.stats.totalFeedbacks} / {data.stats.totalRegistrations})
                </span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-emerald-400 h-full transition-all duration-500"
                  style={{ width: `${Math.min(data.stats.coverageRate, 100)}%` }}
                />
              </div>
            </div>

            {/* Card 4: Pending Feedback */}
            <div className="bg-[#0A1120] border border-white/10 p-5 rounded-2xl space-y-2 relative overflow-hidden shadow-xl">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Pending Registrations</span>
                <Clock size={18} className="text-purple-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-extrabold text-white font-mono">{data.stats.pendingCount}</h3>
                <span className="text-xs text-purple-400 font-bold">Participants</span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Awaiting feedback submission
              </p>
            </div>

          </div>

          {/* CONTROLS & TABS */}
          <div className="space-y-4">
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#0A1120] border border-white/10 p-3 rounded-2xl">
              
              {/* TABS */}
              <div className="flex items-center gap-1 bg-[#050C18] p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setActiveTab("submissions")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === "submissions"
                      ? "bg-[#00B8F0] text-white shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <MessageCircle size={14} /> Submissions ({data.stats.totalFeedbacks})
                </button>
                <button
                  onClick={() => setActiveTab("participants")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === "participants"
                      ? "bg-[#00B8F0] text-white shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Users size={14} /> Attendance Ledger ({data.stats.totalRegistrations})
                </button>
              </div>

              {/* SEARCH & FILTERS */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="relative flex-1 sm:w-64">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, code, email, feedback..."
                    className="w-full bg-[#050C18] border border-white/20 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00B8F0]"
                  />
                </div>

                <select
                  value={typeFilter}
                  onChange={(e: any) => setTypeFilter(e.target.value)}
                  className="bg-[#050C18] border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00B8F0]"
                >
                  <option value="all">All Pass Types</option>
                  <option value="student">Student</option>
                  <option value="professional">Professional</option>
                </select>

                {activeTab === "participants" && (
                  <select
                    value={statusFilter}
                    onChange={(e: any) => setStatusFilter(e.target.value)}
                    className="bg-[#050C18] border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00B8F0]"
                  >
                    <option value="all">All Feedback Statuses</option>
                    <option value="submitted">Feedback Given ✅</option>
                    <option value="pending">Pending Feedback ⏳</option>
                  </select>
                )}
              </div>

            </div>

            {/* TAB CONTENT 1: ALL SUBMISSIONS TABLE */}
            {activeTab === "submissions" && (
              <div className="bg-[#0A1120] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto max-h-[550px] overflow-y-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 z-10 bg-[#050C18]">
                      <tr className="bg-[#050C18] border-b border-white/10 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        <th className="py-3.5 px-4 w-10 text-center">
                          <input
                            type="checkbox"
                            checked={selectedFeedbackIds.length === filteredSubmissions.length && filteredSubmissions.length > 0}
                            onChange={toggleSelectAllFeedback}
                            className="w-4 h-4 rounded border-slate-600 accent-[#00B8F0] cursor-pointer"
                          />
                        </th>
                        <th className="py-3.5 px-4 text-center">Website Display</th>
                        <th className="py-3.5 px-4">Participant</th>
                        <th className="py-3.5 px-4">Session / Event</th>
                        <th className="py-3.5 px-4">Overall</th>
                        <th className="py-3.5 px-4">Content</th>
                        <th className="py-3.5 px-4">Instructor</th>
                        <th className="py-3.5 px-4">Recommend</th>
                        <th className="py-3.5 px-4">Takeaways &amp; Feedback Comments</th>
                        <th className="py-3.5 px-4">Submitted At</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs text-slate-300 font-sans">
                      {filteredSubmissions.length === 0 ? (
                        <tr>
                          <td colSpan={11} className="py-12 text-center text-slate-500 font-mono">
                            No feedback submissions found for this filter.
                          </td>
                        </tr>
                      ) : (
                        filteredSubmissions.map((f: any) => (
                          <tr key={f.id} className={`hover:bg-white/[0.02] transition-colors ${selectedFeedbackIds.includes(f.id) ? 'bg-[#00B8F0]/10' : ''}`}>
                            <td className="py-4 px-4 text-center">
                              <input
                                type="checkbox"
                                checked={selectedFeedbackIds.includes(f.id)}
                                onChange={() => toggleSelectFeedback(f.id)}
                                className="w-4 h-4 rounded border-slate-600 accent-[#00B8F0] cursor-pointer"
                              />
                            </td>
                            <td className="py-4 px-4 text-center">
                              <label className="inline-flex items-center cursor-pointer gap-2 select-none group">
                                <input
                                  type="checkbox"
                                  checked={!!f.isFeatured}
                                  disabled={togglingId === f.id}
                                  onChange={(e) => handleToggleFeatured(f.id, e.target.checked)}
                                  className="w-4 h-4 rounded border-white/30 bg-[#050C18] text-[#00B8F0] focus:ring-[#00B8F0] focus:ring-offset-0 cursor-pointer accent-[#00B8F0] transition-all disabled:opacity-50"
                                />
                                <span className={`text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded transition-all ${
                                  f.isFeatured 
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm" 
                                    : "bg-slate-800/80 text-slate-400 border border-slate-700/60"
                                }`}>
                                  {f.isFeatured ? "Ticked (Public)" : "Hidden"}
                                </span>
                              </label>
                            </td>

                            <td className="py-4 px-4">
                              <div className="font-bold text-white">{f.participantName || "Anonymous Participant"}</div>
                              <div className="text-[10px] text-slate-400 font-mono">{f.participantEmail || f.identifierProvided}</div>
                              {f.participantPhone && (
                                <div className="text-[10px] text-slate-500 font-mono">{f.participantPhone}</div>
                              )}
                            </td>

                            <td className="py-4 px-4 font-mono text-[10px]">
                              <span className="px-2 py-1 rounded bg-[#0066FF]/15 border border-[#0066FF]/30 text-[#00B8F0] font-bold uppercase inline-block">
                                {f.workshopId || f.eventId || "ai-accelerator-workshop"}
                              </span>
                            </td>

                            <td className="py-4 px-4 font-mono font-bold text-amber-400">
                              <div className="flex items-center gap-1">
                                <Star size={14} className="fill-amber-400 text-amber-400" />
                                {f.overallRating || 5}
                              </div>
                            </td>

                            <td className="py-4 px-4 font-mono text-slate-200">
                              {f.contentRating || 5} / 5
                            </td>

                            <td className="py-4 px-4 font-mono text-slate-200">
                              {f.venueRating || 5} / 5
                            </td>

                            <td className="py-4 px-4">
                              {f.recommend === "yes" || f.recommend === true ? (
                                <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px]">
                                  <ThumbsUp size={12} /> Yes 👍
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-rose-400 font-bold bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 rounded text-[10px]">
                                  Needs Work ⚠️
                                </span>
                              )}
                            </td>

                            <td className="py-4 px-4 max-w-sm">
                              {f.takeaways && (
                                <p className="text-slate-200 text-xs italic mb-1">
                                  &ldquo;{f.takeaways}&rdquo;
                                </p>
                              )}
                              {f.comments && (
                                <p className="text-slate-300 text-[11px] whitespace-pre-line bg-white/5 p-2 rounded border border-white/10">
                                  💬 {f.comments}
                                </p>
                              )}
                              {!f.takeaways && !f.comments && (
                                <span className="text-slate-600 font-mono text-[10px]">- No text -</span>
                              )}
                            </td>

                            <td className="py-4 px-4 text-[10px] text-slate-400 font-mono whitespace-nowrap">
                              {f.createdAt ? new Date(f.createdAt).toLocaleString() : "-"}
                            </td>

                            <td className="py-4 px-4 text-right">
                              <button
                                onClick={() => handleDeleteFeedback(f.id)}
                                disabled={deletingId === f.id}
                                className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 rounded-lg border border-rose-500/30 transition-all disabled:opacity-50 inline-flex items-center gap-1 text-xs font-bold cursor-pointer"
                                title="Delete Feedback"
                              >
                                {deletingId === f.id ? (
                                  <Loader2 size={14} className="animate-spin text-rose-400" />
                                ) : (
                                  <Trash2 size={14} />
                                )}
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: PARTICIPANT FEEDBACK STATUS LEDGER */}
            {activeTab === "participants" && (
              <div className="bg-[#0A1120] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto max-h-[550px] overflow-y-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 z-10 bg-[#050C18]">
                      <tr className="bg-[#050C18] border-b border-white/10 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        <th className="py-3.5 px-4">Participant Name</th>
                        <th className="py-3.5 px-4">Contact Info</th>
                        <th className="py-3.5 px-4">Ticket Code</th>
                        <th className="py-3.5 px-4">Pass Type</th>
                        <th className="py-3.5 px-4">Feedback Status</th>
                        <th className="py-3.5 px-4">Submitted Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs text-slate-300 font-sans">
                      {filteredParticipants.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-slate-500 font-mono">
                            No registered participants found matching filter.
                          </td>
                        </tr>
                      ) : (
                        filteredParticipants.map((p: any) => (
                          <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-4 px-4 font-bold text-white">
                              {p.name}
                              <div className="text-[10px] font-normal text-slate-400">{p.companyOrCollege}</div>
                            </td>

                            <td className="py-4 px-4 font-mono text-slate-300">
                              <div>{p.email}</div>
                              <div className="text-[10px] text-slate-400">{p.phone}</div>
                            </td>

                            <td className="py-4 px-4 font-mono font-bold text-[#00B8F0]">
                              {p.registrationCode}
                            </td>

                            <td className="py-4 px-4 uppercase text-[10px] font-bold font-mono">
                              <span className={`px-2 py-0.5 rounded border ${
                                p.attendeeType === "professional" 
                                  ? "bg-purple-500/15 border-purple-500/30 text-purple-300"
                                  : "bg-cyan-500/15 border-cyan-500/30 text-cyan-300"
                              }`}>
                                {p.attendeeType}
                              </span>
                            </td>

                            <td className="py-4 px-4">
                              {p.feedbackGiven ? (
                                <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[10px] uppercase font-mono">
                                  <CheckCircle2 size={12} /> Feedback Given
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-amber-400 font-bold bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-full text-[10px] uppercase font-mono">
                                  <Clock size={12} /> Pending Feedback
                                </span>
                              )}
                            </td>

                            <td className="py-4 px-4 font-mono font-bold">
                              {p.feedbackDetails ? (
                                <span className="text-amber-400 flex items-center gap-1">
                                  <Star size={14} className="fill-amber-400 text-amber-400" />
                                  {p.feedbackDetails.overallRating} / 5 Stars
                                </span>
                              ) : (
                                <span className="text-slate-600 font-normal text-[11px]">- Not Submitted -</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </>
      )}

    </div>
  );
}
