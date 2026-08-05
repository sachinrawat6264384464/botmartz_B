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
        setBootcampAmount(399);
        return;
      }
      if (plan) {
        try {
          const q = query(collection(db, "bootcamps"), where("slug", "==", plan));
          const snapshot = await getDocs(q);
          if (!snapshot.empty) {
            setBootcampAmount(snapshot.docs[0].data().price || 199);
          } else {
            setBootcampAmount(199); // fallback
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
    // Preload Razorpay SDK script
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

  const [couponInput, setCouponInput] = useState("");
  const [appliedCouponInfo, setAppliedCouponInfo] = useState<{
    code: string;
    discountType: string;
    discountValue: number;
  } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const getAmount = () => {
    const basePrice = plan === "bundle" ? 399 : (bootcampAmount || 199);
    if (!appliedCouponInfo) return basePrice;
    if (appliedCouponInfo.discountValue === 100) return 0;
    if (appliedCouponInfo.discountType === "percentage") {
      const discount = Math.round((basePrice * appliedCouponInfo.discountValue) / 100);
      return Math.max(0, basePrice - discount);
    }
    return basePrice;
  };

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponError("");
    setCouponSuccess("");

    try {
      const res = await fetch("/api/events/verify-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponInput.trim() }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setAppliedCouponInfo({
          code: data.code,
          discountType: data.discountType,
          discountValue: data.discountValue,
        });
        if (data.discountValue === 100) {
          setCouponSuccess(`Coupon "${data.code}" Applied! 100% FREE Access.`);
        } else {
          setCouponSuccess(`Coupon "${data.code}" Applied! ${data.discountValue}% Discount Saved.`);
        }
      } else {
        setCouponError(data.error || "Invalid coupon code");
      }
    } catch (err) {
      setCouponError("Network error validating coupon");
    } finally {
      setCouponLoading(false);
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // FREE REGISTRATION VIA 100% COUPON
    if (appliedCouponInfo && getAmount() === 0) {
      try {
        const res = await fetch("/api/ai-frontier/coupon-register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            organization: formData.organization,
            plan: plan || "bootcamp-01",
            couponCode: appliedCouponInfo.code,
          }),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          router.push(`/community/ai-accelerator-workshop/success?plan=${plan}`);
        } else {
          setError(data.error || "Free registration failed.");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
      return;
    }

    // REGULAR / DISCOUNTED RAZORPAY PAYMENT
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
              appliedCoupon: appliedCouponInfo?.code || ""
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
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 md:p-8 pt-20">
      <div className="bg-white max-w-5xl w-full rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Order Summary */}
        <div className="flex-1 bg-[#0B1C2C] p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#0066FF]/20 to-transparent blur-3xl rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-white/10 text-white text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-6 border border-white/20">
              Order Summary
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2 leading-tight text-white">
              {details.title}
            </h2>
            {details.subtitle && (
              <p className="text-[#8A9EB0] text-lg font-medium mb-8">
                {details.subtitle}
              </p>
            )}

            <div className="space-y-4 mb-8">
              {details.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#00B8F0] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#CBD5E1] font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-8 pt-8 border-t border-white/10">
            <div className="flex items-end justify-between mb-2">
              <span className="text-[#8A9EB0] font-medium">Total (Inclusive of GST)</span>
              <span className="text-3xl md:text-4xl font-bold text-white">
                {getAmount() === 0 ? <span className="text-emerald-400">FREE</span> : `₹${getAmount()}`}
              </span>
            </div>
            <p className="text-sm text-white/50 text-right">
              {getAmount() === 0 ? "100% Free Promo Access" : "Secure Encrypted Payment"}
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 p-8 md:p-12">
          <h1 className="text-2xl font-bold text-[#0B1C2C] mb-2">Checkout Details</h1>
          <p className="text-[#475569] text-sm mb-8">
            Please fill in your details to complete the registration.
          </p>

          {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">{error}</div>}

          <form onSubmit={handlePayment} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#334155] mb-1.5">Full Name</label>
              <input
                type="text"
                required
                placeholder="John Doe"
                className="w-full p-3.5 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#0066FF] outline-none transition-all text-[#0B1C2C] bg-[#F8FAFC]"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#334155] mb-1.5">Email Address</label>
              <input
                type="email"
                required
                placeholder="john@example.com"
                className="w-full p-3.5 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#0066FF] outline-none transition-all text-[#0B1C2C] bg-[#F8FAFC]"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#334155] mb-1.5">Phone Number</label>
              <input
                type="tel"
                required
                placeholder="+91 9876543210"
                className="w-full p-3.5 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#0066FF] outline-none transition-all text-[#0B1C2C] bg-[#F8FAFC]"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#334155] mb-1.5">
                Organization / College
                <span className="ml-2 text-xs font-normal text-[#94A3B8]">optional</span>
              </label>
              <input
                type="text"
                placeholder="e.g. IIT Delhi, Google, Freelancer..."
                className="w-full p-3.5 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#0066FF] outline-none transition-all text-[#0B1C2C] bg-[#F8FAFC]"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              />
            </div>


            {/* COUPON CODE INPUT FIELD (Permanently available) */}
            <div className="pt-2 border-t border-[#E2E8F0]">
              <label className="block text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1.5">Have a Coupon Code?</label>
              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  disabled={Boolean(appliedCouponInfo)}
                  className="flex-1 min-w-0 p-2.5 rounded-xl border border-[#CBD5E1] font-mono text-sm text-[#0B1C2C] bg-[#F8FAFC] uppercase tracking-wider focus:outline-none focus:border-[#0066FF] disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={couponLoading || !couponInput.trim() || Boolean(appliedCouponInfo)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0B1C2C] hover:bg-[#1E293B] text-white font-semibold text-sm transition-colors disabled:opacity-50"
                >
                  {couponLoading ? "Applying..." : appliedCouponInfo ? "✓ Applied" : "Apply Code"}
                </button>
              </div>
              {couponError && <p className="text-xs text-rose-600 font-semibold mt-1.5">{couponError}</p>}
              {couponSuccess && <p className="text-xs text-emerald-600 font-bold mt-1.5">{couponSuccess}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_4px_14px_rgba(0,102,255,0.35)] disabled:opacity-70 disabled:cursor-not-allowed text-lg"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : getAmount() === 0 ? (
                "Complete Free Registration →"
              ) : (
                `Pay ₹${getAmount()}`
              )}
            </button>
            <p className="text-center text-xs text-[#64748B] mt-4 flex items-center justify-center gap-1.5">
              <svg className="w-4 h-4 text-[#00B8F0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              {getAmount() === 0 ? "Direct Instant Confirmation" : "Payments processed securely by Razorpay"}
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
