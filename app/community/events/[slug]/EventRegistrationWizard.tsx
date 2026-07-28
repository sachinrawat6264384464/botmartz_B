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

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

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

  // Coupon states
  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    type: string;
    discountType: string;
    discountValue: number;
  } | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMessage, setCouponMessage] = useState({ text: "", type: "" });

  const unsubscribeRef = useRef<(() => void) | null>(null);

  // Calculate dynamic entry fee
  const isEarlyBird = new Date() <= new Date("2026-07-30T23:59:59Z");
  
  const calculateFee = () => {
    let basePrice = formData.attendeeType === "student" ? 449 : 699;
    
    if (appliedCoupon) {
      if (appliedCoupon.discountType === 'percentage') {
        basePrice = Math.max(0, Math.round(basePrice * (1 - appliedCoupon.discountValue / 100)));
      } else if (appliedCoupon.discountType === 'fixed') {
        basePrice = Math.max(0, basePrice - appliedCoupon.discountValue);
      }
    }

    let discount = 0;
    if (formData.quantity >= 10) discount = 100;
    else if (formData.quantity >= 5) discount = 50;
    
    return Math.max(0, (basePrice - discount) * formData.quantity);
  };
  const entryFee = calculateFee();

  // Cleanup listeners
  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) unsubscribeRef.current();
    };
  }, []);

  const handleApplyCoupon = async () => {
    if (!couponCodeInput.trim()) return;
    setCouponLoading(true);
    setCouponMessage({ text: "", type: "" });
    try {
      const res = await fetch("/api/events/verify-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCodeInput.trim() })
      });
      const data = await res.json();
      if (res.ok) {
        setAppliedCoupon(data);
        setCouponMessage({ text: "Coupon applied successfully!", type: "success" });
      } else {
        setAppliedCoupon(null);
        setCouponMessage({ text: data.error || "Invalid coupon", type: "error" });
      }
    } catch (e) {
      setCouponMessage({ text: "Failed to verify coupon", type: "error" });
    }
    setCouponLoading(false);
  };

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

  // Trigger standard Razorpay Checkout
  const initiatePayment = async (regId: string) => {
    setError("");
    setLoading(true);
    setIsVerifying(false);
    setVerificationLogs([]);

    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        setError("Failed to load Razorpay payment SDK. Check your internet connection.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/events/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationId: regId,
          amount: entryFee,
          couponCode: appliedCoupon?.code
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Failed to create checkout order.");
        setLoading(false);
        return;
      }

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: "INR",
        name: "Botmartz",
        description: event.title,
        order_id: data.orderId,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#00B8F0"
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setError("Payment checkout window was closed. You can retry the payment below.");
          }
        },
        handler: async (response: any) => {
          setStep(2);
          setLoading(false);
          setIsVerifying(true);
          setVerificationLogs([]);

          const logSteps = [
            `[⚡] Connection established with verification nodes...`,
            `[⚡] Authenticating cryptographic payment signature...`,
            `[⚡] Syncing transaction record with Razorpay registry...`,
          ];

          for (let i = 0; i < logSteps.length; i++) {
            setVerificationLogs((prev) => [...prev, logSteps[i]]);
            await new Promise((resolve) => setTimeout(resolve, 800));
          }

          try {
             const verifyRes = await fetch("/api/events/verify-payment", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({
                 registrationId: regId,
                 razorpay_payment_id: response.razorpay_payment_id,
                 razorpay_order_id: response.razorpay_order_id,
                 razorpay_signature: response.razorpay_signature,
               })
             });

             const verifyData = await verifyRes.json();
             if (verifyRes.ok && verifyData.success) {
               setVerificationLogs((prev) => [...prev, `[✓] Signature match verified! Seat secured.`]);
               await new Promise((resolve) => setTimeout(resolve, 600));
               setSuccessCode(verifyData.checkInCode);
               setStep(3);
             } else {
               setVerificationLogs((prev) => [...prev, `[✖] Verification failed: ${verifyData.error}`]);
               setError(verifyData.error || "Payment verification failed.");
               setIsVerifying(false);
             }
          } catch (verifyErr) {
             console.error(verifyErr);
             setError("Signature verification failed due to a network error.");
             setIsVerifying(false);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (err: any) {
      console.error(err);
      setError("An unexpected error occurred during payment initialization.");
      setLoading(false);
    }
  };

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
        updatedAt: new Date().toISOString(),
        appliedCoupon: appliedCoupon ? appliedCoupon.code : null
      };

      const docRef = await addDoc(collection(db, "event-registrations"), newReg);
      setPendingRegId(docRef.id);

      if (entryFee === 0) {
        setSuccessCode(newReg.checkInCode);
        setStep(3);
      } else {
        setStep(2);
        
        // Setup real-time listener for the registration document
        // If webhook catches payment, we auto-advance!
        unsubscribeRef.current = onSnapshot(doc(db, "event-registrations", docRef.id), (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data?.paymentStatus === "paid") {
              setSuccessCode(data.checkInCode);
              setStep(3);
              if (unsubscribeRef.current) unsubscribeRef.current();
            }
          }
        });

        // Trigger payment immediately
        await initiatePayment(docRef.id);
      }
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
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <h3 className="text-xl sm:text-2xl font-bold font-space-grotesk tracking-tight text-white drop-shadow-sm">Register for Event</h3>
                  {isEarlyBird && (
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-emerald-500/30">
                      Early Bird -15%
                    </span>
                  )}
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
                      <option value="student">Student (₹449)</option>
                      <option value="professional">Professional (₹699)</option>
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

                {/* PROMO COUPON CODE SECTION */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Have a Coupon / Promo Code?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                      placeholder="ENTER PROMO CODE"
                      disabled={!!appliedCoupon}
                      className="w-full bg-[#050C18] border border-white/40 hover:border-white/70 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white uppercase tracking-wider font-mono placeholder:text-slate-400 disabled:opacity-60"
                    />
                    {!appliedCoupon ? (
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        disabled={couponLoading || !couponCodeInput.trim()}
                        className="bg-brand/20 border border-brand/40 text-[#00B8F0] hover:bg-brand/30 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1.5 disabled:opacity-40"
                      >
                        {couponLoading ? <Loader2 size={12} className="animate-spin" /> : "Apply"}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => { setAppliedCoupon(null); setCouponMessage({text: "", type: ""}); setCouponCodeInput(""); }}
                        className="bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors shrink-0 flex items-center gap-1"
                        title="Remove Coupon"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                  {couponMessage.text && !appliedCoupon && (
                    <p className={`text-xs mt-1.5 font-medium ${couponMessage.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {couponMessage.text}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand hover:bg-[#00B8F0] text-white py-3.5 rounded-xl font-semibold text-[14px] transition-colors flex items-center justify-center gap-2 mt-2 shadow-lg disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Proceed to Pay ₹{entryFee} <ArrowRight size={16} /></>}
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT OVERLAY PORTAL */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#00B8F0]/15 text-[#00B8F0] text-[10px] font-bold font-mono uppercase tracking-wider border border-[#00B8F0]/30">
                    ⚡ Gateway Secure
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-space-grotesk tracking-tight text-white flex items-center gap-2">
                  Razorpay Checkout
                </h3>
                <p className="text-xs text-slate-300 mt-1 font-medium">Event: {event.title}</p>
              </div>

              {error && !isVerifying && (
                <div className="p-3.5 bg-rose-500/15 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-start gap-2.5 shadow-sm">
                  <AlertCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold text-rose-200 block">Payment Error</span>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {isVerifying ? (
                <div className="bg-[#040A15] border border-white/10 p-5 rounded-xl font-mono text-xs text-[#00B8F0] space-y-2 h-[180px] flex flex-col justify-end shadow-inner">
                  <div className="flex items-center gap-2 mb-2 text-white border-b border-white/10 pb-2">
                    <Terminal size={14} className="text-[#00B8F0]" /> SECURE LEDGER VERIFIER
                  </div>
                  <div className="flex-1 space-y-1 overflow-y-auto">
                    {verificationLogs.map((log, idx) => (
                      <div key={idx} className="animate-fade-in">{log}</div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-white/50 text-[10px] pt-1">
                    <Loader2 size={10} className="animate-spin text-[#00B8F0]" /> WAITING FOR BANK CONFIRMATION...
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-[#050C18] border border-white/10 p-5 sm:p-6 rounded-2xl text-center space-y-4 shadow-xl relative overflow-hidden">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#00B8F0]/15 border border-[#00B8F0]/30 text-[#00B8F0] flex items-center justify-center mx-auto shadow-inner">
                      <ShieldCheck size={26} />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] uppercase tracking-widest font-mono font-bold text-slate-400 block">Total Payable</span>
                      <h4 className="font-extrabold text-2xl sm:text-3xl text-white font-mono">₹{entryFee}</h4>
                      <p className="text-xs text-slate-300 max-w-[280px] mx-auto pt-1 font-medium">
                        Complete checkout to secure your official registration pass.
                      </p>
                    </div>

                    <button
                      onClick={() => initiatePayment(pendingRegId || "")}
                      disabled={loading}
                      className="w-full bg-[#00B8F0] hover:bg-[#00A0D0] text-white py-3.5 rounded-xl font-bold text-sm transition-all shrink-0 flex items-center justify-center gap-2 shadow-lg shadow-[#00B8F0]/25 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Launching Checkout...
                        </>
                      ) : (
                        `Pay Entry Fee (₹${entryFee})`
                      )}
                    </button>
                  </div>

                  {/* Payment methods description */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 border-t border-white/10 pt-4">
                    <div className="flex flex-col items-center gap-1.5 p-2.5 sm:p-3 rounded-xl bg-white/[0.03] text-center border border-white/10 hover:border-[#00B8F0]/30 transition-all">
                      <CreditCard size={18} className="text-[#00B8F0]" />
                      <span className="text-[10px] sm:text-[11px] font-bold text-slate-200">Cards</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 p-2.5 sm:p-3 rounded-xl bg-white/[0.03] text-center border border-white/10 hover:border-[#00B8F0]/30 transition-all">
                      <Smartphone size={18} className="text-[#00B8F0]" />
                      <span className="text-[10px] sm:text-[11px] font-bold text-slate-200">UPI Apps</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 p-2.5 sm:p-3 rounded-xl bg-white/[0.03] text-center border border-white/10 hover:border-[#00B8F0]/30 transition-all">
                      <ShieldCheck size={18} className="text-[#00B8F0]" />
                      <span className="text-[10px] sm:text-[11px] font-bold text-slate-200">Net Banking</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
                  <span className="text-[9px] sm:text-[10px] bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded uppercase font-mono shrink-0 border border-green-500/30">PAID</span>
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
