import { NextResponse } from "next/server";
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
    const { name, email, phone, plan, couponCode } = await req.json();

    if (!name || !email || !couponCode) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const uppercaseCoupon = couponCode.trim().toUpperCase();

    // Check total workshop coupon usage limit (Max 7 allowed)
    const bcSnap = await adminDb.collection('bootcamp_registrations').get();
    let totalCouponsUsed = 0;
    let couponUsedCount = 0;

    bcSnap.forEach(doc => {
      const data = doc.data();
      if (data.appliedCoupon && data.appliedCoupon.trim() !== '') {
        totalCouponsUsed++;
        if (data.appliedCoupon.trim().toUpperCase() === uppercaseCoupon) {
          couponUsedCount++;
        }
      }
    });

    if (totalCouponsUsed >= 7) {
      return NextResponse.json({
        success: false,
        error: "All 7 promotional workshop coupons have already been claimed."
      }, { status: 400 });
    }

    if (couponUsedCount >= 1) {
      return NextResponse.json({
        success: false,
        error: `Coupon "${uppercaseCoupon}" has already been redeemed.`
      }, { status: 400 });
    }

    let eventTitle = "AI Accelerator Workshop";
    let dateVal = "August 2026";
    let locVal = "Live Online";

    if (plan && plan !== "bundle") {
      const seriesNumber = plan.split("-")[1] || "1";
      if (seriesNumber === "1") eventTitle = "Bootcamp Series 1: Build Your First AI Full-Stack Application";
      if (seriesNumber === "2") eventTitle = "Bootcamp Series 2: Build Smarter AI Agents";
      if (seriesNumber === "3") eventTitle = "Bootcamp Series 3: Build Production Ready AI Applications";
    } else if (plan === "bundle") {
      eventTitle = "AI Engineering Pass (Full Bundle)";
    }

    const checkInCode = `REG-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;

    // Store registration in Firestore
    await adminDb.collection('bootcamp_registrations').add({
      name,
      email,
      phone: phone || "",
      plan: plan || "bootcamp-01",
      paymentId: `COUPON-${uppercaseCoupon}`,
      orderId: `FREE-${Date.now()}`,
      amount: 0,
      appliedCoupon: uppercaseCoupon,
      paymentMethod: "COUPON_FREE",
      status: 'paid',
      attendance: false,
      checkInCode,
      createdAt: new Date(),
    });

    // Send emails
    const smtpUser = process.env.SMTP_USER;
    if (smtpUser) {
      try {
        await transporter.sendMail({
          from: `"Botmartz Accounts" <${smtpUser}>`,
          to: email,
          subject: `Registration Confirmed (Free Pass) - ${eventTitle}`,
          html: buildPaymentSuccessEmail(name, eventTitle, 0, `COUPON-${uppercaseCoupon}`),
        });

        await transporter.sendMail({
          from: `"Botmartz Events" <${smtpUser}>`,
          to: email,
          subject: `Your Pass Ticket - ${eventTitle}`,
          html: buildEventTicketEmail(name, eventTitle, dateVal, locVal, [checkInCode]),
        });
      } catch (mailErr) {
        console.error('[Free Registration Email Dispatch Error]', mailErr);
      }
    }

    return NextResponse.json({ success: true, checkInCode }, { status: 200 });
  } catch (err: any) {
    console.error("Free Coupon Registration Error:", err);
    return NextResponse.json({ success: false, error: err.message || "Registration failed" }, { status: 500 });
  }
}
