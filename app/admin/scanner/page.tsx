"use client";

import { useEffect, useState, useCallback } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { 
  AlertCircle, CheckCircle2, ScanFace, Loader2, Search, 
  RefreshCw, UserCheck, Users, Clock, ShieldCheck, Check, RotateCcw,
  Sparkles
} from "lucide-react";

interface Attendee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  attendeeType: string;
  quantity: number;
  paymentStatus: string;
  attended: boolean;
  checkInTime?: string | null;
  checkInCode: string;
  createdAt: number;
}

export default function ScannerPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [verifyStatus, setVerifyStatus] = useState<"idle" | "loading" | "success" | "error" | "already_scanned">("idle");
  const [message, setMessage] = useState<string>("");
  const [attendeeDetails, setAttendeeDetails] = useState<{name: string, type: string, qty: number} | null>(null);

  // Attendees list state
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<"all" | "checked_in" | "pending">("all");
  const [manualCodeInput, setManualCodeInput] = useState<string>("");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Fetch live attendees list
  const fetchAttendees = useCallback(async () => {
    setLoadingList(true);
    try {
      const res = await fetch("/api/scanner/list-attendees?admin=true");
      const data = await res.json();
      if (res.ok && data.attendees) {
        setAttendees(data.attendees);
      }
    } catch (e) {
      console.error("Failed to fetch attendees:", e);
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    fetchAttendees();
  }, [fetchAttendees]);

  // Handle URL query parameter ?code=...
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const codeParam = searchParams.get('code');
    if (codeParam) {
      setScanResult(codeParam);
      verifyTicket(codeParam);
    }

    // Initialize HTML5 QR Code Scanner
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 220, height: 220 } },
      false
    );

    scanner.render(onScanSuccess, onScanFailure);

    function onScanSuccess(decodedText: string) {
      if (verifyStatus !== "loading") {
        setScanResult(decodedText);
        verifyTicket(decodedText);
      }
    }

    function onScanFailure() {
      // Ignore frame read failures
    }

    return () => {
      scanner.clear().catch(console.error);
    };
  }, []);

  const verifyTicket = async (rawCode: string) => {
    let code = rawCode.trim();
    if (!code) return;

    if (code.includes('code=')) {
      try {
        const match = code.match(/code=([^&]+)/);
        if (match) code = match[1];
      } catch (e) {}
    }

    setVerifyStatus("loading");
    setAttendeeDetails(null);
    setMessage("");

    try {
      const res = await fetch("/api/scanner/verify-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkInCode: code })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setVerifyStatus("success");
        setMessage(data.message || "Attendance marked successfully!");
        setAttendeeDetails({
          name: data.attendeeName,
          type: data.attendeeType,
          qty: data.quantity
        });
        setManualCodeInput("");
        fetchAttendees();
      } else if (res.status === 400 && data.alreadyCheckedIn) {
        setVerifyStatus("already_scanned");
        setMessage(data.error || "Ticket has already been scanned.");
        setAttendeeDetails({
          name: data.attendeeName || "Attendee",
          type: "N/A",
          qty: 0
        });
        fetchAttendees();
      } else {
        setVerifyStatus("error");
        setMessage(data.error || "Invalid check-in code.");
      }
    } catch (err) {
      console.error(err);
      setVerifyStatus("error");
      setMessage("Network error verifying ticket.");
    }

    setTimeout(() => {
      setVerifyStatus("idle");
      setScanResult(null);
    }, 4500);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCodeInput.trim()) {
      verifyTicket(manualCodeInput.trim());
    }
  };

  // Toggle manual check-in for an attendee from table
  const handleToggleCheckin = async (attendee: Attendee) => {
    setActionLoadingId(attendee.id);
    try {
      if (attendee.attended) {
        // Undo checkin
        const res = await fetch("/api/scanner/undo-checkin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ registrationId: attendee.id, admin: true })
        });
        if (res.ok) {
          fetchAttendees();
        }
      } else {
        // Manual checkin
        const res = await fetch("/api/scanner/manual-checkin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ registrationId: attendee.id, admin: true })
        });
        if (res.ok) {
          fetchAttendees();
        }
      }
    } catch (e) {
      console.error("Toggle checkin failed:", e);
    } finally {
      setActionLoadingId(null);
    }
  };

  // Stats
  const totalCount = attendees.length;
  const checkedInCount = attendees.filter(a => a.attended).length;
  const pendingCount = totalCount - checkedInCount;
  const checkedInPercent = totalCount > 0 ? Math.round((checkedInCount / totalCount) * 100) : 0;

  // Filtered attendees
  const filteredAttendees = attendees.filter(a => {
    const matchesSearch = 
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.checkInCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.phone && a.phone.includes(searchTerm));
    
    if (!matchesSearch) return false;
    if (filterStatus === "checked_in") return a.attended;
    if (filterStatus === "pending") return !a.attended;
    return true;
  });

  return (
    <div className="p-3 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6 min-w-0 max-w-full overflow-x-hidden">
      
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-admin-border pb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-linear-to-br from-[#00B8F0] to-[#0066FF] flex items-center justify-center text-white shadow-lg shadow-[#00B8F0]/20">
            <ScanFace size={22} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-space-grotesk tracking-tight text-admin-text">
              Ticket Scanner & Attendance Desk
            </h1>
            <p className="text-xs sm:text-sm text-admin-text-muted">
              Scan participant QR codes to instantly mark entry and track event check-ins.
            </p>
          </div>
        </div>

        <button
          onClick={fetchAttendees}
          disabled={loadingList}
          className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-2 rounded-xl bg-admin-card border border-admin-border text-admin-text-muted hover:text-admin-text hover:bg-admin-bg transition-colors text-xs font-semibold"
        >
          <RefreshCw size={14} className={loadingList ? "animate-spin text-[#00B8F0]" : ""} />
          <span>Refresh List</span>
        </button>
      </div>

      {/* STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-admin-card border border-admin-border rounded-xl p-4 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
            <Users size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-admin-text-muted">Total Registered</p>
            <p className="text-2xl font-bold text-admin-text">{totalCount}</p>
          </div>
        </div>

        <div className="bg-admin-card border border-admin-border rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <UserCheck size={20} />
            </div>
            <div>
              <p className="text-xs font-medium text-admin-text-muted">Checked In</p>
              <p className="text-2xl font-bold text-emerald-400">{checkedInCount}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {checkedInPercent}% Turnout
            </span>
          </div>
        </div>

        <div className="bg-admin-card border border-admin-border rounded-xl p-4 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-admin-text-muted">Pending Entry</p>
            <p className="text-2xl font-bold text-amber-400">{pendingCount}</p>
          </div>
        </div>
      </div>

      {/* SCANNER & MANUAL CODE ENTRY SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Camera Scanner Box */}
        <div className="bg-admin-card border border-admin-border rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-admin-text flex items-center gap-2">
              <Sparkles size={16} className="text-[#00B8F0]" /> Live Camera QR Reader
            </h2>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              ● Active Camera
            </span>
          </div>

          <div className="bg-[#050B14] border border-admin-border rounded-xl overflow-hidden p-2 sm:p-3 min-h-[260px] flex flex-col justify-center items-center w-full max-w-full">
            <div id="reader" className="w-full max-w-full text-white [&>div]:!border-none [&_button]:!bg-[#00B8F0] [&_button]:!text-white [&_button]:!rounded-lg [&_button]:!px-4 [&_button]:!py-2 [&_button]:!w-full [&_button]:!max-w-full [&_button]:!mt-2 [&_a]:hidden [&_select]:!bg-slate-800 [&_select]:!text-white [&_select]:!p-2 [&_select]:!rounded-lg [&_select]:!border-none [&_select]:!w-full [&_select]:!max-w-full [&_select]:!text-xs [&_video]:!max-w-full [&_video]:!w-full [&_video]:!rounded-lg" />
          </div>
        </div>

        {/* Manual Code Input & Scan Status Feedback */}
        <div className="bg-admin-card border border-admin-border rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between space-y-4 min-w-0 max-w-full overflow-hidden">
          <div className="space-y-3 min-w-0">
            <h2 className="text-sm font-semibold text-admin-text">Manual Code Entry</h2>
            <p className="text-xs text-admin-text-muted">
              Type or paste check-in code directly if QR scanner is unavailable.
            </p>

            <form onSubmit={handleManualSubmit} className="flex flex-col sm:flex-row gap-2.5 w-full min-w-0">
              <input
                type="text"
                value={manualCodeInput}
                onChange={(e) => setManualCodeInput(e.target.value)}
                placeholder="e.g. REG-3EDOM4M79"
                className="w-full sm:flex-1 bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text placeholder:text-admin-text-muted focus:outline-none focus:border-[#00B8F0] font-mono uppercase tracking-wider min-w-0"
              />
              <button
                type="submit"
                disabled={!manualCodeInput.trim() || verifyStatus === "loading"}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#00B8F0] text-white hover:bg-[#0096C7] font-semibold text-xs transition-colors disabled:opacity-50 shrink-0"
              >
                {verifyStatus === "loading" ? "Verifying..." : "Mark Check-In"}
              </button>
            </form>
          </div>

          {/* Feedback Status Display */}
          <div className="min-h-[120px] flex items-center justify-center">
            {verifyStatus === "idle" && (
              <div className="text-center py-6 text-admin-text-muted">
                <ShieldCheck size={32} className="mx-auto mb-2 opacity-40 text-[#00B8F0]" />
                <p className="text-xs">Ready to scan or type participant ticket code</p>
              </div>
            )}

            {verifyStatus === "loading" && (
              <div className="w-full bg-[#050B14] border border-[#00B8F0]/30 rounded-xl p-5 flex flex-col items-center justify-center gap-2 animate-pulse">
                <Loader2 className="w-7 h-7 text-[#00B8F0] animate-spin" />
                <p className="text-xs font-semibold text-[#00B8F0]">Verifying ticket with server...</p>
              </div>
            )}

            {verifyStatus === "success" && (
              <div className="w-full bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-start gap-3 text-emerald-400 animate-in fade-in zoom-in duration-200">
                <CheckCircle2 size={24} className="shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-emerald-300">{message}</h4>
                  <p className="text-xs font-semibold text-white mt-1">Name: {attendeeDetails?.name}</p>
                  <p className="text-[11px] text-emerald-300/80 mt-0.5 font-mono">
                    Type: {attendeeDetails?.type.toUpperCase()} • Qty: {attendeeDetails?.qty}
                  </p>
                </div>
              </div>
            )}

            {verifyStatus === "already_scanned" && (
              <div className="w-full bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3 text-amber-400 animate-in fade-in zoom-in duration-200">
                <AlertCircle size={24} className="shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-amber-300">Ticket Already Checked In</h4>
                  <p className="text-xs font-semibold text-white mt-1">Name: {attendeeDetails?.name}</p>
                  <p className="text-[11px] text-amber-300/80 mt-0.5">{message}</p>
                </div>
              </div>
            )}

            {verifyStatus === "error" && (
              <div className="w-full bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 flex items-start gap-3 text-rose-400 animate-in fade-in zoom-in duration-200">
                <AlertCircle size={24} className="shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-rose-300">Invalid Check-In Code</h4>
                  <p className="text-xs text-rose-300/80 mt-0.5">{message}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* LIVE ATTENDANCE TABLE */}
      <div className="bg-admin-card border border-admin-border rounded-2xl p-5 shadow-sm space-y-4">
        
        {/* Table Header Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-admin-text">Participating Attendees List</h2>
            <p className="text-xs text-admin-text-muted">Live event attendance records and ticket verification history.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-muted" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name, code, email..."
                className="w-full bg-admin-bg border border-admin-border rounded-xl pl-9 pr-3 py-1.5 text-xs text-admin-text placeholder:text-admin-text-muted focus:outline-none focus:border-[#00B8F0]"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex bg-admin-bg p-1 rounded-xl border border-admin-border text-xs">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-3 py-1 rounded-lg transition-colors font-medium ${filterStatus === "all" ? "bg-[#00B8F0] text-white" : "text-admin-text-muted hover:text-admin-text"}`}
              >
                All ({totalCount})
              </button>
              <button
                onClick={() => setFilterStatus("checked_in")}
                className={`px-3 py-1 rounded-lg transition-colors font-medium ${filterStatus === "checked_in" ? "bg-emerald-500 text-white" : "text-admin-text-muted hover:text-admin-text"}`}
              >
                Checked In ({checkedInCount})
              </button>
              <button
                onClick={() => setFilterStatus("pending")}
                className={`px-3 py-1 rounded-lg transition-colors font-medium ${filterStatus === "pending" ? "bg-amber-500 text-white" : "text-admin-text-muted hover:text-admin-text"}`}
              >
                Pending ({pendingCount})
              </button>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto rounded-xl border border-admin-border">
          <table className="w-full text-left text-xs text-admin-text">
            <thead className="bg-admin-bg border-b border-admin-border uppercase font-mono text-[10px] text-admin-text-muted">
              <tr>
                <th className="px-4 py-3">Participant</th>
                <th className="px-4 py-3">Check-In Code</th>
                <th className="px-4 py-3">Pass Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border/50">
              {loadingList ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-admin-text-muted">
                    <Loader2 size={24} className="animate-spin text-[#00B8F0] mx-auto mb-2" />
                    <span>Loading attendee records...</span>
                  </td>
                </tr>
              ) : filteredAttendees.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-admin-text-muted">
                    No attendees match your search query or filter.
                  </td>
                </tr>
              ) : (
                filteredAttendees.map((attendee) => (
                  <tr 
                    key={attendee.id} 
                    className={`transition-colors ${attendee.attended ? "bg-emerald-500/5 hover:bg-emerald-500/10" : "hover:bg-admin-bg/50"}`}
                  >
                    {/* Participant Info */}
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-semibold text-admin-text">{attendee.name}</p>
                        <p className="text-[11px] text-admin-text-muted">{attendee.email}</p>
                        {attendee.phone && <p className="text-[10px] text-admin-text-muted">{attendee.phone}</p>}
                      </div>
                    </td>

                    {/* Check In Code */}
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs font-bold text-[#00B8F0] bg-[#00B8F0]/10 border border-[#00B8F0]/20 px-2 py-1 rounded-md">
                        {attendee.checkInCode || "N/A"}
                      </span>
                    </td>

                    {/* Pass Type & Qty */}
                    <td className="px-4 py-3">
                      <span className="uppercase font-mono text-[11px] text-admin-text font-medium">
                        {attendee.attendeeType}
                      </span>
                      <span className="text-[11px] text-admin-text-muted ml-1">
                        (x{attendee.quantity})
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-3">
                      {attendee.attended ? (
                        <div className="flex flex-col">
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full w-max">
                            <Check size={10} /> Checked In
                          </span>
                          {attendee.checkInTime && (
                            <span className="text-[10px] text-admin-text-muted mt-1 font-mono">
                              {new Date(attendee.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full w-max">
                          Pending Entry
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleToggleCheckin(attendee)}
                        disabled={actionLoadingId === attendee.id}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1.5 ${
                          attendee.attended
                            ? "bg-admin-bg border border-admin-border text-admin-text-muted hover:text-rose-400 hover:border-rose-500/40"
                            : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm"
                        }`}
                      >
                        {actionLoadingId === attendee.id ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : attendee.attended ? (
                          <>
                            <RotateCcw size={12} /> Undo
                          </>
                        ) : (
                          <>
                            <UserCheck size={12} /> Mark Check-In
                          </>
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
    </div>
  );
}
