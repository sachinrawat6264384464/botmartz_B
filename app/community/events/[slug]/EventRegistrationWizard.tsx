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
      const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${successCode}`);
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
        eventId: event.id,
        eventTitle: event.title,
        eventSlug: event.slug,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        role: formData.role,
        apiInfo: formData.apiInfo,
        attendeeType: formData.attendeeType,
        quantity: formData.quantity,
        amountPaid: entryFee,
        utr: "Razorpay Checkout",
        paymentStatus: entryFee === 0 ? "paid" : "pending",
        checkInCode: entryFee === 0 ? `REG-${Math.random().toString(36).substring(2, 11).toUpperCase()}` : "",
        attended: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, "event-registrations"), newReg);
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0A1120] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white font-sans">
        
        {step !== 3 && (
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-full transition-colors z-20"
          >
            <X size={18} />
          </button>
        )}

        <div className="p-6 md:p-8 space-y-6">

          {/* STEP 1: USER DETAILS */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold font-space-grotesk tracking-tight">Register for Event</h3>
                </div>
                <p className="text-sm text-[#8A9EB0] mt-1">{event.title}</p>
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle size={14} /> {error}
                </div>
              )}

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#8A9EB0] uppercase tracking-wider mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-[#050C18] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00B8F0] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#8A9EB0] uppercase tracking-wider mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="e.g. rahul@domain.com"
                      className="w-full bg-[#050C18] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00B8F0] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#8A9EB0] uppercase tracking-wider mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-[#050C18] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00B8F0] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#8A9EB0] uppercase tracking-wider mb-1">Attendee Type *</label>
                    <select
                      value={formData.attendeeType}
                      onChange={(e) => setFormData({...formData, attendeeType: e.target.value})}
                      className="w-full bg-[#050C18] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00B8F0] transition-colors"
                    >
                      <option value="student">Student (Free)</option>
                      <option value="professional">Professional (Free)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#8A9EB0] uppercase tracking-wider mb-1">Quantity * (Group Discount)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={100}
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 1})}
                      className="w-full bg-[#050C18] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00B8F0] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#8A9EB0] uppercase tracking-wider mb-1">Company / Institution</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="e.g. IIT Indore"
                      className="w-full bg-[#050C18] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00B8F0] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#8A9EB0] uppercase tracking-wider mb-1">Role / Designation</label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      placeholder="e.g. AI Engineer"
                      className="w-full bg-[#050C18] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00B8F0] transition-colors"
                    />
                  </div>
                </div>

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
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 bg-green-500/15 border border-green-500/35 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <CheckCircle size={32} />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-space-grotesk tracking-tight">Registration Secured!</h3>
                <p className="text-sm text-[#8A9EB0] max-w-[320px] mx-auto">
                  Congratulations! Your pass for <strong>{event.title}</strong> has been issued successfully.
                </p>
              </div>

              <div className="bg-[#050C18] border border-[#00B8F0] rounded-xl p-5 max-w-[340px] mx-auto text-left space-y-4 shadow-xl relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-20%] w-[100px] h-[100px] bg-[#00B8F0]/10 blur-[30px] rounded-full pointer-events-none" />
                
                <div className="border-b border-white/10 pb-3 flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-bold text-[#00B8F0] uppercase tracking-wider font-mono">OFFICIAL ENTRY PASS</span>
                    <h4 className="text-sm font-bold text-white truncate max-w-[200px] mt-0.5">{event.title}</h4>
                  </div>
                  <span className="text-[10px] bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded uppercase font-mono">FREE PASS</span>
                </div>

                <div className="flex justify-center py-2">
                  <div className="bg-white p-2 rounded-lg">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${successCode}`} 
                      alt="Pass Check-in QR" 
                      className="w-[110px] h-[110px] block" 
                    />
                  </div>
                </div>

                <div className="border-t border-white/10 pt-3 text-center space-y-1">
                  <span className="text-[10px] text-white/50 font-mono block">CHECK-IN CODE</span>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#00B8F0]">{successCode}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-4 pb-2">
                <button 
                  onClick={downloadQR}
                  className="flex items-center gap-2 bg-[#050C18] border border-[#1E293B] hover:border-[#00B8F0] text-[#8A9EB0] hover:text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
                >
                  <Download size={14} />
                  Save QR
                </button>
                <button 
                  onClick={shareToWhatsApp}
                  className="flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 hover:border-[#25D366] text-[#25D366] px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
                >
                  <Share2 size={14} />
                  WhatsApp
                </button>
                <button 
                  onClick={addToCalendar}
                  className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 hover:border-purple-500 text-purple-400 px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
                >
                  <CalendarPlus size={14} />
                  Calendar
                </button>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-xs text-[#8A9EB0] max-w-[360px] mx-auto leading-relaxed">
                  We have dispatched three email notifications to <strong>{formData.email}</strong>, containing your receipt, details, and digital entry pass.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    router.refresh();
                  }}
                  className="bg-brand/20 border border-brand/40 text-[#00B8F0] hover:bg-brand/30 px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors"
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
