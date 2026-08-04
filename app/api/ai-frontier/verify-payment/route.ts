import { NextResponse } from "next/server";
import crypto from "crypto";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, name, email, phone, plan } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET || "rzp_secret_placeholder";

    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      // Payment is successful
      
      // Save to Firebase
      if (name && email) {
        await adminDb.collection('bootcamp_registrations').add({
          name,
          email,
          phone: phone || "",
          plan: plan || "bootcamp-01",
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          amount: plan === "bundle" ? 399 : 199,
          status: 'paid',
          attendance: false,
          createdAt: new Date(),
        });
      }

      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Razorpay Verify Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
