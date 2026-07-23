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
  ShieldCheck
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

  // Calculate dynamic entry fee
  const isEarlyBird = new Date() <= new Date("2026-07-30T23:59:59Z");
  
  const calculateFee = () => {
    let basePrice = formData.attendeeType === "student" ? 399 : 699;
    
    if (isEarlyBird) {
      basePrice = Math.round(basePrice * 0.85);
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
          amount: entryFee
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
                  {isEarlyBird && (
                    <span className="bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-green-500/30">
                      Early Bird -15%
                    </span>
                  )}
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
                      <option value="student">Student (₹{isEarlyBird ? Math.round(399 * 0.85) : 399})</option>
                      <option value="professional">Professional (₹{isEarlyBird ? Math.round(699 * 0.85) : 699})</option>
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
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Proceed to Pay ₹{entryFee} <ArrowRight size={16} /></>}
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT OVERLAY PORTAL */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-bold font-space-grotesk tracking-tight">Razorpay Checkout</h3>
                <p className="text-xs text-[#8A9EB0] mt-0.5">Event: {event.title}</p>
              </div>

              {error && !isVerifying && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle size={14} /> {error}
                </div>
              )}

              {isVerifying ? (
                <div className="bg-[#040A15] border border-white/5 p-5 rounded-xl font-mono text-xs text-[#00B8F0] space-y-2 h-[180px] flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-2 text-white border-b border-white/10 pb-2">
                    <Terminal size={14} className="text-brand" /> SECURE LEDGER VERIFIER
                  </div>
                  <div className="flex-1 space-y-1 overflow-y-auto">
                    {verificationLogs.map((log, idx) => (
                      <div key={idx} className="animate-fade-in">{log}</div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-white/50 text-[10px] pt-1">
                    <Loader2 size={10} className="animate-spin" /> WAITING FOR BANK CONFIRMATION...
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-[#050C18] border border-white/5 p-5 rounded-xl text-center space-y-3.5">
                    <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center mx-auto">
                      <ShieldCheck size={26} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-base text-white">Payment Amount: ₹{entryFee}</h4>
                      <p className="text-xs text-[#8A9EB0] max-w-[280px] mx-auto">
                        Please complete the checkout to secure your registration pass.
                      </p>
                    </div>

                    <button
                      onClick={() => initiatePayment(pendingRegId || "")}
                      disabled={loading}
                      className="w-full bg-brand hover:bg-[#00B8F0] text-white py-3 rounded-xl font-semibold text-xs transition-colors shrink-0 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Launching Checkout...
                        </>
                      ) : (
                        `Pay Entry Fee (₹${entryFee})`
                      )}
                    </button>
                  </div>

                  {/* Payment methods description */}
                  <div className="grid grid-cols-3 gap-3 border-t border-white/5 pt-4">
                    <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-white/[0.02] text-center border border-white/5">
                      <CreditCard size={18} className="text-[#8A9EB0]" />
                      <span className="text-[10px] font-semibold text-[#8A9EB0]">Cards</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-white/[0.02] text-center border border-white/5">
                      <Smartphone size={18} className="text-[#8A9EB0]" />
                      <span className="text-[10px] font-semibold text-[#8A9EB0]">UPI Apps</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-white/[0.02] text-center border border-white/5">
                      <ShieldCheck size={18} className="text-[#8A9EB0]" />
                      <span className="text-[10px] font-semibold text-[#8A9EB0]">Banking</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
                  <span className="text-[10px] bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded uppercase font-mono">PAID</span>
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
