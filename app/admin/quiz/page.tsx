"use client";

import React, { useState, useEffect } from "react";
import {
  Trophy,
  Brain,
  Trash2,
  Download,
  RefreshCw,
  Search,
  Clock,
  Sparkles,
  Award,
  Loader2,
  ExternalLink,
  ShieldAlert
} from "lucide-react";
import Link from "next/link";

export default function AdminQuizPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [scores, setScores] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);

  const fetchQuizData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/quiz");
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to load quiz data.");
      setScores(result.scores || []);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  const handleDeleteScore = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quiz submission?")) return;
    setDeletingId(id);
    try {
      const res = await fetch("/api/admin/quiz", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to delete submission.");
      setScores(prev => prev.filter(s => s.id !== id));
    } catch (err: any) {
      alert(err.message || "Error deleting score");
    } finally {
      setDeletingId(null);
    }
  };

  const handleClearAll = async () => {
    if (!confirm("⚠️ CAUTION: Are you sure you want to delete ALL quiz submissions and reset the leaderboard?")) return;
    setClearing(true);
    try {
      const res = await fetch("/api/admin/quiz", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clearAll: true }),
      });
      if (!res.ok) throw new Error("Failed to clear submissions.");
      setScores([]);
      alert("All quiz submissions have been cleared successfully!");
    } catch (err: any) {
      alert(err.message || "Error clearing quiz scores");
    } finally {
      setClearing(false);
    }
  };

  const exportCSV = () => {
    if (scores.length === 0) return;
    const headers = ["ID", "Name", "Email", "Score", "Total Questions", "Accuracy %", "Time Taken (s)", "Date"];
    const rows = scores.map(s => [
      `"${s.id}"`,
      `"${s.name || ''}"`,
      `"${s.email || ''}"`,
      `"${s.score || 0}"`,
      `"${s.totalQuestions || 15}"`,
      `"${Math.round(((s.score || 0) / (s.totalQuestions || 15)) * 100)}%"`,
      `"${(s.timeTaken || 0).toFixed(1)}"`,
      `"${s.createdAt ? new Date(s.createdAt).toLocaleString() : ''}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `quiz_submissions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredScores = scores.filter(s => {
    const q = searchQuery.toLowerCase();
    return (
      (s.name || "").toLowerCase().includes(q) ||
      (s.email || "").toLowerCase().includes(q)
    );
  });

  const totalSubmissions = scores.length;
  const highestScore = scores.length > 0 ? Math.max(...scores.map(s => s.score || 0)) : 0;
  const avgScore = scores.length > 0 ? (scores.reduce((acc, s) => acc + (s.score || 0), 0) / scores.length).toFixed(1) : "0";
  const avgTime = scores.length > 0 ? (scores.reduce((acc, s) => acc + (s.timeTaken || 0), 0) / scores.length).toFixed(1) : "0";

  return (
    <div className="p-6 md:p-10 bg-[#040914] min-h-screen text-white font-sans space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 text-[10px] font-bold font-mono uppercase tracking-wider border border-amber-500/30">
              🏆 AI Engineering Challenge
            </span>
          </div>
          <h1 className="text-3xl font-extrabold font-space-grotesk tracking-tight text-white flex items-center gap-3">
            Quiz Submissions &amp; Leaderboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Live challenge submissions, email records, score accuracy, and leaderboard control.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleClearAll}
            disabled={clearing || scores.length === 0}
            className="flex items-center gap-2 px-4 py-2.5 bg-rose-500/15 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            <ShieldAlert size={15} />
            {clearing ? "Clearing Data..." : "Clear All Quiz Submissions"}
          </button>

          <Link
            href="/quiz/leaderboard"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#050C18] border border-white/20 hover:border-[#00B8F0] text-slate-300 hover:text-white px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors"
          >
            <Trophy size={14} className="text-amber-400" />
            Public Leaderboard <ExternalLink size={12} />
          </Link>

          <button
            onClick={fetchQuizData}
            disabled={loading}
            className="p-2.5 bg-[#050C18] border border-white/20 hover:border-white/40 text-slate-300 hover:text-white rounded-xl transition-all disabled:opacity-50"
            title="Refresh Data"
          >
            <RefreshCw size={16} className={loading ? "animate-spin text-[#00B8F0]" : ""} />
          </button>

          <button
            onClick={exportCSV}
            disabled={scores.length === 0}
            className="flex items-center gap-2 bg-[#00B8F0] hover:bg-[#00A0D0] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-[#00B8F0]/25 disabled:opacity-50 cursor-pointer"
          >
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      {loading && !scores.length ? (
        <div className="py-20 text-center space-y-3">
          <Loader2 size={32} className="animate-spin text-[#00B8F0] mx-auto" />
          <p className="text-xs text-slate-400 font-mono">Loading Quiz Submissions...</p>
        </div>
      ) : error ? (
        <div className="p-4 bg-rose-500/15 border border-rose-500/30 rounded-xl text-rose-300 text-xs">
          {error}
        </div>
      ) : (
        <>
          {/* STATS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#0A1120] border border-white/10 p-5 rounded-2xl space-y-2 shadow-xl">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Total Submissions</span>
                <Brain size={18} className="text-[#00B8F0]" />
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-extrabold text-white font-mono">{totalSubmissions}</h3>
                <span className="text-xs text-[#00B8F0] font-bold">Participants</span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Real-time submissions in Firestore
              </p>
            </div>

            <div className="bg-[#0A1120] border border-white/10 p-5 rounded-2xl space-y-2 shadow-xl">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Top Score</span>
                <Trophy size={18} className="text-amber-400 fill-amber-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-extrabold text-white font-mono">{highestScore}</h3>
                <span className="text-xs text-amber-400 font-bold">/ 15 Correct</span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Highest score achieved on leaderboard
              </p>
            </div>

            <div className="bg-[#0A1120] border border-white/10 p-5 rounded-2xl space-y-2 shadow-xl">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Average Score</span>
                <Award size={18} className="text-emerald-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-extrabold text-white font-mono">{avgScore}</h3>
                <span className="text-xs text-emerald-400 font-bold">/ 15 Questions</span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Overall participant average
              </p>
            </div>

            <div className="bg-[#0A1120] border border-white/10 p-5 rounded-2xl space-y-2 shadow-xl">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Avg Time Taken</span>
                <Clock size={18} className="text-purple-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-extrabold text-white font-mono">{avgTime}s</h3>
                <span className="text-xs text-purple-400 font-bold">Seconds</span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Average completion duration
              </p>
            </div>
          </div>

          {/* TABLE SECTION */}
          <div className="bg-[#0A1120] border border-white/10 rounded-2xl overflow-hidden shadow-2xl space-y-4 p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search participant name or email..."
                  className="w-full bg-[#050C18] border border-white/20 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00B8F0]"
                />
              </div>

              <div className="text-xs text-slate-400 font-mono">
                Showing {filteredScores.length} of {scores.length} entries
              </div>
            </div>

            <div className="overflow-x-auto max-h-[550px] overflow-y-auto border border-white/10 rounded-xl">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 z-10 bg-[#050C18]">
                  <tr className="bg-[#050C18] border-b border-white/10 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    <th className="py-3.5 px-4 w-12 text-center">Rank</th>
                    <th className="py-3.5 px-4">Player Name</th>
                    <th className="py-3.5 px-4">Email Address</th>
                    <th className="py-3.5 px-4 text-center">Score</th>
                    <th className="py-3.5 px-4 text-center">Accuracy %</th>
                    <th className="py-3.5 px-4 text-center">Time Taken</th>
                    <th className="py-3.5 px-4">Submitted At</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs text-slate-300 font-sans">
                  {filteredScores.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-16 text-center text-slate-500 font-mono">
                        No quiz submissions found in database.
                      </td>
                    </tr>
                  ) : (
                    filteredScores.map((s, idx) => {
                      const accuracyPct = Math.round(((s.score || 0) / (s.totalQuestions || 15)) * 100);
                      return (
                        <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 px-4 text-center font-bold font-mono text-slate-400">
                            {idx + 1}
                          </td>
                          <td className="py-4 px-4 font-bold text-white">
                            {s.name || "Anonymous Challenger"}
                          </td>
                          <td className="py-4 px-4 font-mono text-slate-400 text-[11px]">
                            {s.email || "N/A"}
                          </td>
                          <td className="py-4 px-4 text-center font-mono font-bold text-amber-400">
                            {s.score} / {s.totalQuestions || 15}
                          </td>
                          <td className="py-4 px-4 text-center font-mono font-bold text-emerald-400">
                            {accuracyPct}%
                          </td>
                          <td className="py-4 px-4 text-center font-mono text-slate-300">
                            {(s.timeTaken || 0).toFixed(1)}s
                          </td>
                          <td className="py-4 px-4 text-slate-400 text-[11px] font-mono">
                            {s.createdAt ? new Date(s.createdAt).toLocaleString() : "N/A"}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button
                              onClick={() => handleDeleteScore(s.id)}
                              disabled={deletingId === s.id}
                              className="p-1.5 text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-500 border border-rose-500/30 rounded-lg transition-all cursor-pointer disabled:opacity-50"
                              title="Delete Submission"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
