"use client";

import React, { useState } from "react";
import { Award, Search, CheckCircle2, AlertCircle, Download, ExternalLink, ShieldCheck, Loader2 } from "lucide-react";

export default function CertificatesPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`/api/certificate/verify?query=${encodeURIComponent(query.trim())}`);
      const data = await res.json();

      if (res.ok && data.certificate) {
        setResult(data.certificate);
      } else {
        setError(data.error || "No certificate found matching this ID or email.");
      }
    } catch (err) {
      setError("Verification request failed. Please check network connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#050B14] min-h-screen text-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/30 text-[#00B8F0] font-mono text-xs uppercase tracking-widest mb-4 font-semibold">
            <ShieldCheck size={14} /> Official Credential Verification
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Verify Botmartz Certificates
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Validate the authenticity of official completion certificates, speaker badges, and attendee credentials issued by Botmartz AI Solutions.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-[#0B1524] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl mb-10">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Certificate ID (e.g. CERT-2026-XXXX) or Email..."
                className="w-full bg-[#050B14] border border-white/15 rounded-xl pl-11 pr-4 py-3.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00B8F0]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold font-mono tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : "Verify ↗"}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
              <AlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Result Display */}
        {result && (
          <div className="bg-[#091222] border border-emerald-500/40 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-3 text-emerald-400 font-mono text-xs uppercase font-bold tracking-wider mb-6">
              <CheckCircle2 size={18} /> Valid &amp; Verified Credential
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <div className="text-xs font-mono text-slate-500 uppercase mb-1">Recipient Name</div>
                <div className="text-xl font-bold text-white">{result.name}</div>
              </div>
              <div>
                <div className="text-xs font-mono text-slate-500 uppercase mb-1">Certificate ID</div>
                <div className="text-sm font-mono text-[#00B8F0] font-bold">{result.certificateId || result.id}</div>
              </div>
              <div>
                <div className="text-xs font-mono text-slate-500 uppercase mb-1">Program / Event</div>
                <div className="text-sm font-bold text-slate-200">{result.eventTitle || result.programTitle}</div>
              </div>
              <div>
                <div className="text-xs font-mono text-slate-500 uppercase mb-1">Issue Date</div>
                <div className="text-sm text-slate-300">{result.issueDate || "2026"}</div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4">
              <a
                href={`/api/certificate/generate?id=${result.certificateId || result.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-6 py-3 rounded-xl text-xs font-mono font-bold transition-all shadow-md"
              >
                <Download size={15} /> Download PDF Certificate
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
