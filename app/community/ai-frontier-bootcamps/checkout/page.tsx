"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const getAmount = () => {
    if (plan === "bundle") return 399;
    return 199;
  };

  useEffect(() => {
    // Load Razorpay Script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Create order
      const res = await fetch("/api/ai-frontier/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: getAmount() }),
      });

      const orderData = await res.json();
      if (!res.ok) throw new Error(orderData.error);

      // 2. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Botmartz AI Solutions",
        description: plan === "bundle" ? "AI Engineering Pass" : "Bootcamp Access",
        order_id: orderData.id,
        handler: async function (response: any) {
          // 3. Verify Payment
          const verifyRes = await fetch("/api/ai-frontier/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              plan: plan || "bootcamp-01"
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            router.push(`/ai-frontier/success?plan=${plan}`);
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl border border-[#E2E8F0] p-8">
        <h1 className="text-2xl font-bold text-[#0B1C2C] mb-2">Complete Registration</h1>
        <p className="text-[#475569] text-sm mb-6">
          You are registering for: <strong className="text-[#0B1C2C]">{plan === "bundle" ? "AI Engineering Pass" : "Individual Bootcamp"}</strong>
        </p>

        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#334155] mb-1">Full Name</label>
            <input
              type="text"
              required
              className="w-full p-3 rounded-lg border border-[#CBD5E1] focus:ring-2 focus:ring-[#0066FF] outline-none transition-all text-[#0B1C2C]"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#334155] mb-1">Email Address</label>
            <input
              type="email"
              required
              className="w-full p-3 rounded-lg border border-[#CBD5E1] focus:ring-2 focus:ring-[#0066FF] outline-none transition-all text-[#0B1C2C]"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#334155] mb-1">Phone Number</label>
            <input
              type="tel"
              required
              className="w-full p-3 rounded-lg border border-[#CBD5E1] focus:ring-2 focus:ring-[#0066FF] outline-none transition-all text-[#0B1C2C]"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="pt-4 border-t border-[#E2E8F0] mt-6 flex items-center justify-between">
            <span className="text-[#475569] font-medium">Total Amount</span>
            <span className="text-2xl font-bold text-[#0B1C2C]">₹{getAmount()}</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_4px_14px_rgba(0,102,255,0.35)] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Pay Securely"}
          </button>
        </form>
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
