"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  X, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle,
  Terminal,
  Loader2,
  CreditCard,
  Smartphone,
  ShieldCheck,
  Download,
  Share2,
  CalendarPlus
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, doc, onSnapshot } from "firebase/firestore";
import { trackEvent } from "@/lib/analytics";

interface EventRegistrationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    id: string;
    title: string;
    slug: string;
    entryFee?: number;
    date?: string;
    location?: string;
  };
}



export default function EventRegistrationWizard({ isOpen, onClose, event }: EventRegistrationWizardProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Step 1 states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    collegeName: "",
    degree: "",
    companyName: "",
    designation: "",
    apiInfo: "",
    attendeeType: "student",
    quantity: 1
  });

  // Step 2 states
  const [pendingRegId, setPendingRegId] = useState<string | null>(null);
  const [verificationLogs, setVerificationLogs] = useState<string[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [successCode, setSuccessCode] = useState<string | null>(null);



  const unsubscribeRef = useRef<(() => void) | null>(null);

  const entryFee = 0;

  // Cleanup listeners
  useEffect(() => {
    if (isOpen) {
      trackEvent("event_registration_started", { event_title: event.title, event_slug: event.slug });
    }
    return () => {
      if (unsubscribeRef.current) unsubscribeRef.current();
    };
  }, [isOpen, event.title, event.slug]);



  const downloadQR = async () => {
    try {
      const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=4&ecc=M&data=${encodeURIComponent(successCode || '')}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Event-Pass-${successCode}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('QR Download failed', err);
    }
  };

  const shareToWhatsApp = () => {
    const text = `I'm attending ${event.title}! Here is my Check-in Pass Code: ${successCode}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const addToCalendar = () => {
    const eventDateStr = event.date || new Date().toISOString();
    const startDate = new Date(eventDateStr);
    if (isNaN(startDate.getTime())) {
      startDate.setTime(Date.now());
    }
    
    const formatDate = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000);

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `SUMMARY:${event.title}`,
      `DTSTART:${formatDate(startDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `LOCATION:${event.location || 'TBA'}`,
      `DESCRIPTION:Your Check-in Code is: ${successCode}\\nKeep this pass ready at the entrance.`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\\n");

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Event-${event.slug}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;



  // Handle Form details submit (Step 1)
  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const newReg = {
        eventId: event.id || "",
        eventTitle: event.title || "",
        eventSlug: event.slug || "",
        name: formData.name || "",
        email: formData.email || "",
        phone: formData.phone || "",
        company: formData.company || "",
        role: formData.role || "",
        collegeName: formData.collegeName || "",
        degree: formData.degree || "",
        companyName: formData.companyName || "",
        designation: formData.designation || "",
        apiInfo: (formData as any).apiInfo || "",
        attendeeType: formData.attendeeType || "student",
        quantity: formData.quantity || 1,
        amountPaid: entryFee,
        utr: "Razorpay Checkout",
        paymentStatus: entryFee === 0 ? "paid" : "pending",
        checkInCode: entryFee === 0 ? `REG-${Math.random().toString(36).substring(2, 11).toUpperCase()}` : "",
        attended: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, "event-registrations"), newReg);
      
      // NOTE: Event registrations (AI Frontier) go ONLY to event-registrations collection.
      // Workshop registrations go to bootcamp_registrations via verify-payment API.


      // Dispatch ticket pass email via API
      fetch("/api/events/send-ticket-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          eventTitle: event.title,
          date: event.date || "August 23, 2026",
          location: event.location || "Indore, India",
          checkInCode: newReg.checkInCode,
        }),
      }).catch(err => console.error("Ticket email dispatch error:", err));

      setPendingRegId(docRef.id);
      trackEvent("event_registration_completed", { event_title: event.title, attendee_type: formData.attendeeType, quantity: formData.quantity });

      setSuccessCode(newReg.checkInCode);
      setStep(3);
    } catch (err: any) {
      console.error(err);
      setError("Failed to initialize registration. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0A1120] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white font-sans my-auto max-h-[95vh] flex flex-col">
        
        {step !== 3 && (
          <button 
            onClick={onClose} 
            className="absolute top-3 right-3 p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-full transition-colors z-20"
          >
            <X size={18} />
          </button>
        )}

        <div className="p-4 sm:p-6 md:p-8 space-y-5 overflow-y-auto max-h-[95vh]">

          {/* STEP 1: USER DETAILS */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold font-space-grotesk tracking-tight">Register for Event</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">{event.title}</p>
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle size={14} /> {error}
                </div>
              )}

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-[#050C18] border border-white/40 hover:border-white/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-slate-400"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="e.g. rahul@domain.com"
                      className="w-full bg-[#050C18] border border-white/40 hover:border-white/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-[#050C18] border border-white/40 hover:border-white/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Attendee Type *</label>
                    <select
                      value={formData.attendeeType}
                      onChange={(e) => setFormData({...formData, attendeeType: e.target.value})}
                      className="w-full bg-[#050C18] border border-white/40 hover:border-white/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                    >
                      <option value="student">Student (Free)</option>
                      <option value="professional">Professional (Free)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Quantity * (Group Discount)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={100}
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 1})}
                      className="w-full bg-[#050C18] border border-white/40 hover:border-white/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                    />
                  </div>
                </div>

                {/* CONDITIONAL FIELDS BASED ON ATTENDEE TYPE */}
                {formData.attendeeType === "student" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">College / University Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.collegeName || ""}
                        onChange={(e) => setFormData({...formData, collegeName: e.target.value, company: e.target.value})}
                        placeholder="e.g. IIT Indore / DAVV"
                        className="w-full bg-[#050C18] border border-white/40 hover:border-white/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Degree / Branch / Year *</label>
                      <input
                        type="text"
                        required
                        value={formData.degree || ""}
                        onChange={(e) => setFormData({...formData, degree: e.target.value, role: e.target.value})}
                        placeholder="e.g. B.Tech Computer Science (3rd Year)"
                        className="w-full bg-[#050C18] border border-white/40 hover:border-white/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Company / Organization *</label>
                      <input
                        type="text"
                        required
                        value={formData.companyName || ""}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value, company: e.target.value})}
                        placeholder="e.g. Botmartz / TCS / Google"
                        className="w-full bg-[#050C18] border border-white/40 hover:border-white/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Role / Designation *</label>
                      <input
                        type="text"
                        required
                        value={formData.designation || ""}
                        onChange={(e) => setFormData({...formData, designation: e.target.value, role: e.target.value})}
                        placeholder="e.g. Senior AI Engineer / Tech Lead"
                        className="w-full bg-[#050C18] border border-white/40 hover:border-white/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#8A9EB0] uppercase tracking-wider mb-1">Custom API / Project Details</label>
                  <textarea
                    rows={3}
                    value={formData.apiInfo}
                    onChange={(e) => setFormData({...formData, apiInfo: e.target.value})}
                    placeholder="Enter any custom information or API specifications requested for this event..."
                    className="w-full bg-[#050C18] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00B8F0] transition-colors resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand hover:bg-[#00B8F0] text-white py-3.5 rounded-xl font-semibold text-[14px] transition-colors flex items-center justify-center gap-2 mt-2 shadow-lg disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Complete Registration (Free) <ArrowRight size={16} /></>}
              </button>
            </form>
          )}



          {/* STEP 3: REGISTRATION SUCCESS */}
          {step === 3 && (
            <div className="text-center py-2 sm:py-4 space-y-4 sm:space-y-5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500/15 border border-green-500/35 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <CheckCircle size={28} />
              </div>

              <div className="space-y-1.5 px-2">
                <h3 className="text-xl sm:text-2xl font-bold font-space-grotesk tracking-tight text-white drop-shadow">Registration Secured!</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-[320px] mx-auto leading-relaxed">
                  Congratulations! Your pass for <strong className="text-white">{event.title}</strong> has been issued successfully.
                </p>
              </div>

              <div className="bg-[#050C18] border border-[#00B8F0]/60 rounded-xl p-3.5 sm:p-5 w-full max-w-[310px] sm:max-w-[340px] mx-auto text-left space-y-3 shadow-2xl relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-20%] w-[100px] h-[100px] bg-[#00B8F0]/10 blur-[30px] rounded-full pointer-events-none" />
                
                <div className="border-b border-white/10 pb-2.5 flex justify-between items-center gap-2">
                  <div className="min-w-0 flex-1">
                    <span className="text-[8px] sm:text-[9px] font-bold text-[#00B8F0] uppercase tracking-wider font-mono block">OFFICIAL ENTRY PASS</span>
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate max-w-[170px] sm:max-w-[200px] mt-0.5">{event.title}</h4>
                  </div>
                  <span className="text-[10px] bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded uppercase font-mono">FREE PASS</span>
                </div>

                <div className="flex justify-center py-1">
                  <div className="bg-white p-2.5 sm:p-3.5 rounded-lg shadow-md">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=350x350&margin=2&ecc=M&data=${encodeURIComponent(`https://botmartz.com/admin/scanner?code=${successCode || ''}`)}`} 
                      alt="Pass Check-in QR" 
                      className="w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] block" 
                    />
                  </div>
                </div>

                <div className="border-t border-white/10 pt-2.5 text-center space-y-0.5">
                  <span className="text-[9px] text-slate-400 font-mono block uppercase tracking-wider">CHECK-IN CODE</span>
                  <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#00B8F0]">{successCode}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-2 px-1">
                <button 
                  onClick={downloadQR}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-[#050C18] border border-white/20 hover:border-[#00B8F0] text-slate-200 hover:text-white px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
                >
                  <Download size={13} />
                  Save QR
                </button>
                <button 
                  onClick={shareToWhatsApp}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-[#25D366]/10 border border-[#25D366]/30 hover:border-[#25D366] text-[#25D366] px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
                >
                  <Share2 size={13} />
                  WhatsApp
                </button>
                <button 
                  onClick={addToCalendar}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-purple-500/10 border border-purple-500/30 hover:border-purple-500 text-purple-300 px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
                >
                  <CalendarPlus size={13} />
                  Calendar
                </button>
              </div>

              <div className="space-y-3 pt-1 pb-4">
                <p className="text-[11px] sm:text-xs text-slate-300 max-w-[340px] mx-auto leading-relaxed px-2">
                  We have dispatched email notifications to <strong className="text-white font-mono">{formData.email}</strong> with your entry pass details.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    router.refresh();
                  }}
                  className="w-full sm:w-auto bg-[#00B8F0] hover:bg-[#00A0D0] text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-lg shadow-[#00B8F0]/20"
                >
                  Done & Back to Event
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
