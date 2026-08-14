"use client";

import { useState, useEffect } from "react";
import { ScanFace, Search, CheckCircle, Clock, Loader2, RefreshCw, Download, Mail } from "lucide-react";
import EventScannerModal from "@/components/EventScannerModal";
import EmailBlastModal from "@/components/EmailBlastModal";

const interTight = { className: "" };

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
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isBlastOpen, setIsBlastOpen] = useState(false);

  const fetchAttendees = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/scanner/list-attendees?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
      if (res.ok) {
        const data = await res.json();
        setAttendees(data.attendees || []);
      } else {
        alert("Session expired or invalid PIN.");
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "botmartz@gmail.com" && password === "Admin@2026##") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid Email or Password");
    }
  };

  const handleManualCheckIn = async (id: string) => {
    const confirm = window.confirm("Manually check in this attendee?");
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
      console.error(e);
      alert("Network error");
    }
  };

  const handleUndoCheckIn = async (id: string) => {
    const confirm = window.confirm("Undo check-in for this attendee?");
    if (!confirm) return;

    try {
      const res = await fetch("/api/scanner/undo-checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationId: id, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setAttendees(prev => prev.map(a => a.id === id ? { ...a, attended: false } : a));
      } else {
        alert(data.error || "Failed to undo check-in");
      }
    } catch (e) {
      console.error(e);
      alert("Network error");
    }
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Ticket Type", "Quantity", "Check-in Code", "Status"];
    const rows = attendees.map(a => [
      `"${a.name}"`,
      `"${a.email}"`,
      `"${a.attendeeType}"`,
      a.quantity,
      `"${a.checkInCode}"`,
      a.attended ? "Checked In" : "Pending"
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.join(","))
    ].join("\\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `event_attendees_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredAttendees = attendees.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.checkInCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className={`${interTight.className} min-h-screen bg-[#050C18] flex items-center justify-center p-4`}>
        <div className="bg-[#0A1120] border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
          <div className="w-16 h-16 bg-[#00B8F0]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#00B8F0]">
            <ScanFace size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Event Desk</h1>
          <p className="text-[#8A9EB0] text-sm mb-8">Enter access credentials to launch the check-in portal.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#050C18] border border-white/10 rounded-xl px-4 py-3 text-white text-center focus:outline-none focus:border-[#00B8F0] transition-colors mb-3"
                required
              />
              <input
                type="password"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#050C18] border border-white/10 rounded-xl px-4 py-3 text-white text-center focus:outline-none focus:border-[#00B8F0] transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#00B8F0] hover:bg-[#0096C7] text-white font-semibold py-3 rounded-xl transition-all hover:scale-[1.02]"
            >
              Enter Desk
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`${interTight.className} min-h-screen bg-[#050C18] text-white flex flex-col`}>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#0A1120]/90 backdrop-blur-md border-b border-white/5 px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Event Desk</h1>
          <p className="text-xs text-[#00B8F0] font-medium tracking-wide uppercase">Intern Portal</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsBlastOpen(true)}
            className="bg-indigo-500 hover:bg-indigo-400 text-white pl-3 pr-4 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all"
          >
            <Mail size={18} />
            Email Blast
          </button>
          <button 
            onClick={() => setIsScannerOpen(true)}
            className="bg-[#00B8F0] hover:bg-[#00B8F0]/90 text-white pl-3 pr-4 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-[0_0_15px_rgba(0,184,240,0.3)] transition-all"
          >
            <ScanFace size={18} />
            Scan Ticket
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 max-w-5xl mx-auto w-full space-y-4">
        {/* Search, Refresh & Export */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A9EB0]" size={18} />
            <input 
              type="text"
              placeholder="Search by name, email or code..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#0A1120] border border-white/5 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#00B8F0]/50"
            />
          </div>
          <button 
            onClick={exportToCSV}
            title="Export to CSV"
            className="bg-[#0A1120] border border-white/5 rounded-xl px-4 flex items-center gap-2 text-[#8A9EB0] hover:text-[#00B8F0] hover:border-[#00B8F0]/30 transition-colors"
          >
            <Download size={18} />
            <span className="hidden sm:inline text-sm font-semibold">Export</span>
          </button>
          <button 
            onClick={fetchAttendees}
            disabled={loading}
            title="Refresh List"
            className="bg-[#0A1120] border border-white/5 rounded-xl p-3 text-[#8A9EB0] hover:text-white transition-colors"
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {/* Stats & Live Dashboard */}
        <div className="bg-[#0A1120] border border-white/5 rounded-xl p-5 space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-[#8A9EB0] uppercase tracking-wider font-semibold mb-1">Total Registrations</p>
              <p className="text-3xl font-bold text-white">{attendees.length}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#8A9EB0] uppercase tracking-wider font-semibold mb-1">Checked In</p>
              <p className="text-3xl font-bold text-[#00B8F0]">
                {attendees.filter(a => a.attended).length} 
                <span className="text-sm text-[#8A9EB0] font-normal"> / {attendees.length}</span>
              </p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-[#00B8F0] h-full transition-all duration-500 ease-out"
              style={{ width: `${attendees.length > 0 ? (attendees.filter(a => a.attended).length / attendees.length) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Attendee List */}
        <div className="bg-[#0A1120] border border-white/5 rounded-xl overflow-hidden">
          {loading && attendees.length === 0 ? (
            <div className="p-12 flex justify-center text-[#8A9EB0]">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : filteredAttendees.length === 0 ? (
            <div className="p-12 text-center text-[#8A9EB0]">
              No attendees found.
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {filteredAttendees.map(attendee => (
                <div key={attendee.id} className="p-4 flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-white truncate">{attendee.name}</h3>
                    <p className="text-xs text-[#8A9EB0] truncate">{attendee.email}</p>
                    <div className="flex gap-3 mt-1.5 text-[11px] font-mono uppercase tracking-wider">
                      <span className="text-white/60">{attendee.checkInCode}</span>
                      <span className="text-[#00B8F0] bg-[#00B8F0]/10 px-1.5 py-0.5 rounded">{attendee.attendeeType} (x{attendee.quantity})</span>
                    </div>
                  </div>
                  
                  <div>
                    {attendee.attended ? (
                      <div className="flex flex-col items-end gap-2">
                        <span className="flex items-center gap-1 text-green-400 text-xs font-semibold bg-green-400/10 px-2 py-1 rounded-full">
                          <CheckCircle size={12} /> Checked In
                        </span>
                        <button 
                          onClick={() => handleUndoCheckIn(attendee.id)}
                          className="text-xs text-white/50 hover:text-white underline underline-offset-2 transition-colors"
                        >
                          Undo Check-in
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-end gap-2">
                        <span className="flex items-center gap-1 text-yellow-500 text-xs font-semibold">
                          <Clock size={12} /> Pending
                        </span>
                        <button 
                          onClick={() => handleManualCheckIn(attendee.id)}
                          className="text-xs text-white/50 hover:text-white underline underline-offset-2 transition-colors"
                        >
                          Manual Check-in
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <EventScannerModal 
        isOpen={isScannerOpen} 
        onClose={() => setIsScannerOpen(false)} 
        onScanSuccessHook={fetchAttendees} 
      />
      <EmailBlastModal 
        isOpen={isBlastOpen} 
        onClose={() => setIsBlastOpen(false)} 
        email={email}
        password={password}
      />
    </div>
  );
}
