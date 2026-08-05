import { NextResponse } from "next/server";
import crypto from "crypto";
import { adminDb } from "@/lib/firebase-admin";
import nodemailer from "nodemailer";
import { buildPaymentSuccessEmail, buildEventTicketEmail } from "@/lib/mail-templates";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: { rejectUnauthorized: false }
});

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, name, email, phone, plan, chargedAmount, appliedCoupon } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET || "rzp_secret_placeholder";

    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      // Use the actual amount that was charged via Razorpay
      const amount = chargedAmount ?? (plan === "bundle" ? 399 : 199);
      
      let eventTitle = "AI Frontier Bootcamp";
      let dateVal = "TBA";
      let locVal = "Live Online";

      if (plan && plan !== "bundle") {
        const bootcampDoc = await adminDb.collection('bootcamps').doc(plan).get();
        if (bootcampDoc.exists) {
          const data = bootcampDoc.data();
          eventTitle = data?.title || eventTitle;
          dateVal = data?.date || dateVal;
          locVal = data?.format || locVal;
        }
      } else if (plan === "bundle") {
        eventTitle = "AI Engineering Pass (Bundle)";
        dateVal = "9 August 2026";
      }

      const checkInCode = `REG-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;

      // Save to Firebase
      if (name && email) {
        await adminDb.collection('bootcamp_registrations').add({
          name,
          email,
          phone: phone || "",
          plan: plan || "bootcamp-01",
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          amount,
          appliedCoupon: appliedCoupon || "",
          status: 'paid',
          attendance: false,
          checkInCode,
          createdAt: new Date(),
        });

        // Send Emails
        const smtpUser = process.env.SMTP_USER;
        if (smtpUser) {
          try {
            await transporter.sendMail({
              from: `"Botmartz Accounts" <${smtpUser}>`,
              to: email,
              subject: `Payment Confirmed Invoice - ${eventTitle}`,
              html: buildPaymentSuccessEmail(name, eventTitle, amount, razorpay_payment_id),
            });

            await transporter.sendMail({
              from: `"Botmartz Events" <${smtpUser}>`,
              to: email,
              subject: `Your Registration Confirmed - ${eventTitle}`,
              html: buildEventTicketEmail(name, eventTitle, dateVal, locVal, [checkInCode]),
            });
          } catch (mailErr) {
            console.error('[Verify Payment Mail Delivery Failed]', mailErr);
          }
        }
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
