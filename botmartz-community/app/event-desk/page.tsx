"use client";

import React, { useState, useEffect } from "react";
import { ScanFace, Search, CheckCircle2, Clock, Loader2, RefreshCw, Download, QrCode } from "lucide-react";

interface Attendee {
  id: string;
  name: string;
  email: string;
  attendeeType: string;
  quantity: number;
  attended: boolean;
  checkInCode: string;
}

export default function EventDeskPortal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [scanningCode, setScanningCode] = useState("");
  const [scanMessage, setScanMessage] = useState("");

  const fetchAttendees = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/scanner/list-attendees?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
      if (res.ok) {
        const data = await res.json();
        setAttendees(data.attendees || []);
      } else {
        alert("Session expired or invalid credentials.");
        setIsAuthenticated(false);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to load attendees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAttendees();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/scanner/list-attendees?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
      if (res.ok) {
        const data = await res.json();
        setAttendees(data.attendees || []);
        setIsAuthenticated(true);
      } else {
        alert("Invalid Email or Password");
        setIsAuthenticated(false);
      }
    } catch (err) {
      alert("Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleManualCheckIn = async (id: string) => {
    const confirm = window.confirm("Check in this attendee?");
    if (!confirm) return;

    try {
      const res = await fetch("/api/scanner/manual-checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationId: id, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setAttendees(prev => prev.map(a => a.id === id ? { ...a, attended: true } : a));
      } else {
        alert(data.error || "Failed to check in");
      }
    } catch (e) {
      alert("Network error");
    }
  };

  const handleCodeVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanningCode.trim()) return;

    setScanMessage("Verifying code...");
    try {
      const res = await fetch("/api/scanner/verify-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkInCode: scanningCode.trim(), email, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setScanMessage(`✅ Check-in Success: ${data.attendee.name} (${data.attendee.attendeeType})`);
        fetchAttendees();
        setScanningCode("");
      } else {
        setScanMessage(`❌ Check-in Error: ${data.error || "Invalid ticket"}`);
      }
    } catch (err) {
      setScanMessage("❌ Verification network error");
    }
  };

  const filteredAttendees = attendees.filter(a => 
    a.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.checkInCode?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const checkedInCount = attendees.filter(a => a.attended).length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050B14] flex items-center justify-center p-4">
        <div className="bg-[#0B1524] border border-white/10 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
          <div className="w-16 h-16 bg-[#00B8F0]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#00B8F0] border border-[#00B8F0]/30">
            <ScanFace size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Staff Event Desk</h1>
          <p className="text-[#8A9EB0] text-xs mb-8">Enter authorized staff credentials to launch live QR check-ins.</p>
          
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="email"
              placeholder="Staff Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#050B14] border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00B8F0]"
              required
            />
            <input
              type="password"
              placeholder="Staff Access Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#050B14] border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00B8F0]"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white py-3.5 rounded-xl text-xs font-mono font-bold uppercase transition-all shadow-md mt-4 cursor-pointer disabled:opacity-60"
            >
              {loading ? "Authenticating..." : "Unlock Event Desk →"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050B14] min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10">
          <div>
            <div className="text-xs font-mono text-[#00B8F0] uppercase font-bold">LIVE VOLUNTEER CONSOLE</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Event Check-in Desk</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-[#0B1524] border border-white/10 px-4 py-2 rounded-xl text-xs font-mono">
              <span className="text-slate-400">Checked In:</span>{" "}
              <span className="text-[#00B8F0] font-bold">{checkedInCount}</span> / {attendees.length}
            </div>
            <button
              onClick={fetchAttendees}
              className="p-2.5 bg-[#0B1524] border border-white/10 rounded-xl hover:text-[#00B8F0] transition-colors"
              title="Refresh Roster"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Quick QR / Code Verification */}
        <div className="bg-[#0B1524] border border-white/10 rounded-2xl p-6 mb-8 shadow-xl">
          <form onSubmit={handleCodeVerification} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Scan QR or Enter Ticket Check-in Code..."
              value={scanningCode}
              onChange={(e) => setScanningCode(e.target.value)}
              className="flex-1 bg-[#050B14] border border-white/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 font-mono focus:outline-none focus:border-[#00B8F0]"
            />
            <button
              type="submit"
              className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-8 py-3 rounded-xl text-xs font-mono font-bold uppercase transition-all shadow-md cursor-pointer"
            >
              Verify &amp; Admit Pass
            </button>
          </form>
          {scanMessage && (
            <div className="mt-3 text-xs font-mono text-slate-300 p-2.5 rounded-lg bg-[#050B14]">
              {scanMessage}
            </div>
          )}
        </div>

        {/* Search & Attendee Table */}
        <div className="bg-[#0B1524] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search attendee by name, email, or check-in code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#050B14] border border-white/15 rounded-xl pl-11 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00B8F0]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#070E1B] text-slate-400 font-mono uppercase text-[11px] border-b border-white/10">
                <tr>
                  <th className="p-4">Attendee Name</th>
                  <th className="p-4">Ticket Type</th>
                  <th className="p-4">Code</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredAttendees.map((a) => (
                  <tr key={a.id} className="hover:bg-white/[0.02]">
                    <td className="p-4">
                      <div className="font-bold text-white">{a.name}</div>
                      <div className="text-slate-400 text-[11px]">{a.email}</div>
                    </td>
                    <td className="p-4 text-slate-300 font-mono">{a.attendeeType || "Standard"}</td>
                    <td className="p-4 font-mono text-[#00B8F0] font-bold">{a.checkInCode}</td>
                    <td className="p-4">
                      {a.attended ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-bold font-mono">
                          <CheckCircle2 size={14} /> Checked In
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-slate-500 font-mono">
                          <Clock size={14} /> Pending
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {!a.attended && (
                        <button
                          onClick={() => handleManualCheckIn(a.id)}
                          className="px-3 py-1.5 bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-lg font-mono text-[11px] font-bold"
                        >
                          Admit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}
