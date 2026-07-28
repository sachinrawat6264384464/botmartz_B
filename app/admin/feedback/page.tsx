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
  Filter,
  Sparkles,
  Award,
  ThumbsUp,
  MessageCircle,
  QrCode,
  ExternalLink,
  ChevronRight,
  Loader2
} from "lucide-react";
import Link from "next/link";

export default function AdminFeedbackPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<any>(null);

  const [activeTab, setActiveTab] = useState<"submissions" | "participants">("submissions");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "student" | "professional">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "submitted" | "pending">("all");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/feedback?eventId=ai-frontier-2026");
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
    fetchData();
  }, []);

  const exportCSV = () => {
    if (!data || !data.feedbacks || data.feedbacks.length === 0) return;

    const headers = [
      "ID",
      "Participant Name",
      "Email",
      "Ticket Code",
      "Attendee Type",
      "Overall Rating",
      "Content Rating",
      "Venue Rating",
      "Would Recommend",
      "Takeaways",
      "Comments",
      "Date"
    ];

    const rows = data.feedbacks.map((f: any) => [
      `"${f.id}"`,
      `"${f.participantName || ''}"`,
      `"${f.participantEmail || ''}"`,
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

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `event_feedbacks_ai_frontier_2026_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter Submissions
  const filteredSubmissions = (data?.feedbacks || []).filter((f: any) => {
    const matchesSearch =
      (f.participantName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.participantEmail || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.registrationCode || f.identifierProvided || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
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
              🌟 Event Intelligence
            </span>
          </div>
          <h1 className="text-3xl font-extrabold font-space-grotesk tracking-tight text-white flex items-center gap-3">
            Event Feedback Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            AI Frontier 2026 — Feedback ledger, participant ratings & response rates.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <a
            href="/community/events/ai-frontier-2026/feedback"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#050C18] border border-white/20 hover:border-[#00B8F0] text-slate-300 hover:text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors"
          >
            <QrCode size={14} className="text-[#00B8F0]" />
            Live Feedback Form <ExternalLink size={12} />
          </a>

          <button
            onClick={fetchData}
            disabled={loading}
            className="p-2.5 bg-[#050C18] border border-white/20 hover:border-white/40 text-slate-300 hover:text-white rounded-xl transition-all disabled:opacity-50"
            title="Refresh Data"
          >
            <RefreshCw size={16} className={loading ? "animate-spin text-[#00B8F0]" : ""} />
          </button>

          <button
            onClick={exportCSV}
            disabled={!data?.feedbacks?.length}
            className="flex items-center gap-2 bg-[#00B8F0] hover:bg-[#00A0D0] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-[#00B8F0]/25 disabled:opacity-50"
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
                Content: <strong className="text-white">{data.stats.avgContent}</strong> • Venue: <strong className="text-white">{data.stats.avgVenue}</strong>
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
                <span className="text-xs text-[#00B8F0] font-bold">Responses</span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                {data.stats.recommendRate}% Would recommend to friends 👍
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
                  style={{ width: `${data.stats.coverageRate}%` }}
                />
              </div>
            </div>

            {/* Card 4: Pending Feedback */}
            <div className="bg-[#0A1120] border border-white/10 p-5 rounded-2xl space-y-2 relative overflow-hidden shadow-xl">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Pending Feedback</span>
                <Clock size={18} className="text-purple-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-extrabold text-white font-mono">{data.stats.pendingCount}</h3>
                <span className="text-xs text-purple-400 font-bold">Participants</span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Awaiting venue feedback submission
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
                    placeholder="Search name, code, email..."
                    className="w-full bg-[#050C18] border border-white/20 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00B8F0]"
                  />
                </div>

                <select
                  value={typeFilter}
                  onChange={(e: any) => setTypeFilter(e.target.value)}
                  className="bg-[#050C18] border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00B8F0]"
                >
                  <option value="all">All Pass Types</option>
                  <option value="student">Student (₹449)</option>
                  <option value="professional">Professional (₹699)</option>
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
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#050C18] border-b border-white/10 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        <th className="py-3.5 px-4">Participant</th>
                        <th className="py-3.5 px-4">Pass Type</th>
                        <th className="py-3.5 px-4">Overall</th>
                        <th className="py-3.5 px-4">Content</th>
                        <th className="py-3.5 px-4">Venue</th>
                        <th className="py-3.5 px-4">Recommend</th>
                        <th className="py-3.5 px-4">Takeaways / Comments</th>
                        <th className="py-3.5 px-4">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs text-slate-300 font-sans">
                      {filteredSubmissions.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-12 text-center text-slate-500 font-mono">
                            No feedback submissions found matching filter.
                          </td>
                        </tr>
                      ) : (
                        filteredSubmissions.map((f: any) => (
                          <tr key={f.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-4 px-4">
                              <div className="font-bold text-white">{f.participantName || "Anonymous"}</div>
                              <div className="text-[10px] text-slate-400 font-mono">{f.participantEmail || f.identifierProvided}</div>
                              {f.registrationCode && (
                                <span className="inline-block mt-0.5 text-[9px] bg-[#00B8F0]/10 text-[#00B8F0] font-mono px-1.5 py-0.5 rounded border border-[#00B8F0]/20">
                                  {f.registrationCode}
                                </span>
                              )}
                            </td>

                            <td className="py-4 px-4 uppercase text-[10px] font-bold font-mono">
                              <span className={`px-2 py-0.5 rounded border ${
                                f.attendeeType === "professional" 
                                  ? "bg-purple-500/15 border-purple-500/30 text-purple-300"
                                  : "bg-cyan-500/15 border-cyan-500/30 text-cyan-300"
                              }`}>
                                {f.attendeeType || "student"}
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
                              {f.recommend === "yes" ? (
                                <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px]">
                                  <ThumbsUp size={12} /> Yes
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-rose-400 font-bold bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 rounded text-[10px]">
                                  Needs Work
                                </span>
                              )}
                            </td>

                            <td className="py-4 px-4 max-w-xs">
                              {f.takeaways && (
                                <p className="text-slate-200 text-xs italic mb-1">
                                  "{f.takeaways}"
                                </p>
                              )}
                              {f.comments && (
                                <p className="text-slate-400 text-[11px]">
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
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
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
