"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [bootcampAmount, setBootcampAmount] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
  });

  useEffect(() => {
    const fetchBootcamp = async () => {
      if (plan === "bundle") {
        setBootcampAmount(299);
        return;
      }
      if (plan) {
        try {
          const q = query(collection(db, "bootcamps"), where("slug", "==", plan));
          const snapshot = await getDocs(q);
          if (!snapshot.empty) {
            setBootcampAmount(snapshot.docs[0].data().price || 199);
          } else {
            setBootcampAmount(199);
          }
        } catch (e) {
          console.error("Error fetching bootcamp price:", e);
          setBootcampAmount(199);
        }
      }
    };
    fetchBootcamp();
  }, [plan]);

  useEffect(() => {
    if (typeof window !== "undefined" && !(window as any).Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const loadRazorpayScript = () => {
    return new Promise<boolean>((resolve) => {
      if (typeof window !== "undefined" && (window as any).Razorpay) {
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

  const getAmount = () => {
    if (plan === "bundle") return 299;
    return bootcampAmount || 199;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded || typeof (window as any).Razorpay === "undefined") {
        throw new Error("Razorpay payment gateway failed to load. Please refresh and try again.");
      }

      const res = await fetch("/api/ai-frontier/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: getAmount() }),
      });

      const orderData = await res.json();
      if (!res.ok) throw new Error(orderData.error);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Botmartz AI Solutions",
        description: plan === "bundle" ? "AI Engineering Pass" : "Bootcamp Access",
        order_id: orderData.id,
        handler: async function (response: any) {
          const verifyRes = await fetch("/api/ai-frontier/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              organization: formData.organization,
              plan: plan || "bootcamp-01",
              chargedAmount: getAmount(),
              appliedCoupon: ""
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            router.push(`/community/ai-accelerator-workshop/success?plan=${plan}`);
          } else {
            setError("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#0066FF",
        },
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.on("payment.failed", function (response: any) {
        setError(response.error.description);
      });
      rzp1.open();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const details = (() => {
    if (plan === "bundle") {
      return {
        title: "AI Engineering Pass",
        features: [
          "Access to all 3 Bootcamp Series",
          "Exclusive Zoom Community Access",
          "Digital Certificate of Completion"
        ],
      };
    }
    const seriesNumber = plan?.split("-")[1] || "1";
    let bootcampTitle = "Build Your First AI Full-Stack Application";
    if (seriesNumber === "2") bootcampTitle = "Build Smarter AI Agents";
    if (seriesNumber === "3") bootcampTitle = "Build Production Ready AI Applications";
    
    return {
      title: `Bootcamp Series ${seriesNumber}`,
      subtitle: bootcampTitle,
      features: ["Live Workshop Access", "Community Access", "Session Recordings"],
    };
  })();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-3 sm:p-6 md:p-8 pt-16 sm:pt-20">
      <div className="bg-white max-w-4xl w-full rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Order Summary */}
        <div className="md:w-5/12 bg-[#0B1C2C] p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#0066FF]/20 to-transparent blur-3xl rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-white/10 text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase px-2.5 py-0.5 sm:py-1 rounded-full mb-3 border border-white/20">
              Order Summary
            </div>
            
            <h2 className="text-xl sm:text-2xl font-extrabold mb-1.5 leading-tight text-white">
              {details.title}
            </h2>
            {details.subtitle && (
              <p className="text-[#8A9EB0] text-sm font-medium mb-5">
                {details.subtitle}
              </p>
            )}

            <div className="space-y-2.5 mb-6">
              {details.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#00B8F0] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#CBD5E1] text-xs sm:text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 pt-5 border-t border-white/10 mt-auto">
            <div className="flex items-end justify-between mb-1">
              <span className="text-[#8A9EB0] text-xs font-medium">Total (Inclusive of GST)</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                ₹{getAmount()}
              </span>
            </div>
            <p className="text-xs text-white/50 text-right">
              Secure Encrypted Payment
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-center">
          <div className="mb-5">
            <h1 className="text-xl sm:text-2xl font-bold text-[#0B1C2C]">Checkout Details</h1>
            <p className="text-[#64748B] text-xs sm:text-sm mt-0.5">
              Fill in your details to complete registration.
            </p>
          </div>

          {(plan === "bootcamp-01" || plan === "bootcamp-1") && (
            <div className="mb-4 p-3.5 bg-amber-50 border border-amber-300 text-amber-900 rounded-xl text-xs font-semibold flex items-center gap-2">
              <span className="text-base">⚠️</span>
              <span>Bootcamp 1 (Aug 9) has ended. Please register for Bootcamp 2 or 3!</span>
            </div>
          )}

          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">{error}</div>}

          <form onSubmit={handlePayment} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="John Doe"
                className="w-full py-2.5 px-3.5 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#0066FF]/40 focus:border-[#0066FF] outline-none transition-all text-sm text-[#0B1C2C] bg-[#F8FAFC]"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="john@example.com"
                className="w-full py-2.5 px-3.5 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#0066FF]/40 focus:border-[#0066FF] outline-none transition-all text-sm text-[#0B1C2C] bg-[#F8FAFC]"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+91 9876543210"
                className="w-full py-2.5 px-3.5 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#0066FF]/40 focus:border-[#0066FF] outline-none transition-all text-sm text-[#0B1C2C] bg-[#F8FAFC]"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1">
                Organization / College
                <span className="ml-1.5 text-[11px] font-normal text-[#94A3B8]">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. IIT Delhi, Google, Freelancer..."
                className="w-full py-2.5 px-3.5 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#0066FF]/40 focus:border-[#0066FF] outline-none transition-all text-sm text-[#0B1C2C] bg-[#F8FAFC]"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading || plan === "bootcamp-01" || plan === "bootcamp-1"}
              className="w-full mt-4 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_4px_14px_rgba(0,102,255,0.3)] disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (plan === "bootcamp-01" || plan === "bootcamp-1") ? (
                "Session Completed (Registration Closed)"
              ) : (
                `Pay ₹${getAmount()}`
              )}
            </button>
            <p className="text-center text-[11px] text-[#64748B] mt-2 flex items-center justify-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#00B8F0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Payments processed securely by Razorpay
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]"><Loader2 className="w-8 h-8 animate-spin text-[#0066FF]" /></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
