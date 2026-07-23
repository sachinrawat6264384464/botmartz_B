"use client";

import { useState, useEffect } from "react";
import { Inter_Tight } from "next/font/google";
import { ScanFace, Search, CheckCircle, Clock, Loader2, RefreshCw } from "lucide-react";
import EventScannerModal from "@/components/EventScannerModal";

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

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
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const fetchAttendees = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/scanner/list-attendees?pin=${pin}`);
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
    if (pin === "2026") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid Access PIN");
    }
  };

  const handleManualCheckIn = async (id: string) => {
    const confirm = window.confirm("Manually check in this attendee?");
    if (!confirm) return;

    try {
      const res = await fetch("/api/scanner/manual-checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationId: id, pin })
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
          <p className="text-[#8A9EB0] text-sm mb-8">Enter access PIN to launch the check-in portal.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password"
              placeholder="••••"
              value={pin}
              onChange={e => setPin(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-center text-xl text-white tracking-widest focus:outline-none focus:border-[#00B8F0]"
              maxLength={4}
            />
            <button 
              type="submit"
              className="w-full bg-[#00B8F0] hover:bg-[#00B8F0]/90 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Access Portal
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
        <button 
          onClick={() => setIsScannerOpen(true)}
          className="bg-[#00B8F0] hover:bg-[#00B8F0]/90 text-white pl-3 pr-4 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-[0_0_15px_rgba(0,184,240,0.3)] transition-all"
        >
          <ScanFace size={18} />
          Scan Ticket
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 max-w-5xl mx-auto w-full space-y-4">
        {/* Search & Refresh */}
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
            onClick={fetchAttendees}
            disabled={loading}
            className="bg-[#0A1120] border border-white/5 rounded-xl p-3 text-[#8A9EB0] hover:text-white transition-colors"
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#0A1120] border border-white/5 rounded-xl p-4">
            <p className="text-xs text-[#8A9EB0] uppercase tracking-wider font-semibold mb-1">Total Registrations</p>
            <p className="text-2xl font-bold text-white">{attendees.length}</p>
          </div>
          <div className="bg-[#0A1120] border border-white/5 rounded-xl p-4">
            <p className="text-xs text-[#8A9EB0] uppercase tracking-wider font-semibold mb-1">Checked In</p>
            <p className="text-2xl font-bold text-[#00B8F0]">{attendees.filter(a => a.attended).length}</p>
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
                      <div className="flex flex-col items-end gap-1">
                        <span className="flex items-center gap-1 text-green-400 text-xs font-semibold bg-green-400/10 px-2 py-1 rounded-full">
                          <CheckCircle size={12} /> Checked In
                        </span>
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
    </div>
  );
}
