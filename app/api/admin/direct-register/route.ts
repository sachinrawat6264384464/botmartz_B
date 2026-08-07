import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import nodemailer from "nodemailer";
import { buildPaymentSuccessEmail, buildEventTicketEmail, getSmtpTransporter } from "@/lib/mail-templates";

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
    const { name, email, phone, plan, organization } = await req.json();

    if (!name || !email || !plan) {
      return NextResponse.json({ success: false, error: "Missing required fields: name, email, plan" }, { status: 400 });
    }

    // Plan labels & prices for email and ledger
    const PLAN_INFO: Record<string, { title: string; date: string; location: string; price: number }> = {
      "bootcamp-01": { title: "Bootcamp Series 1: Build Your First AI Full-Stack Application", date: "August 2026", location: "Live Online", price: 199 },
      "bootcamp-02": { title: "Bootcamp Series 2: Build Smarter AI Agents", date: "August 2026", location: "Live Online", price: 199 },
      "bootcamp-03": { title: "Bootcamp Series 3: Build Production Ready AI Applications", date: "August 2026", location: "Live Online", price: 199 },
      "bundle": { title: "AI Engineering Pass (Full Bundle — All 3 Series)", date: "August 2026", location: "Live Online", price: 399 },
    };

    const planInfo = PLAN_INFO[plan] || PLAN_INFO["bootcamp-01"];
    const planPrice = planInfo.price;

    // Generate unique check-in code
    const checkInCode = `ADM-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;

    // Save registration to Firestore
    await adminDb.collection('bootcamp_registrations').add({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || "",
      organization: organization?.trim() || "",
      plan,
      paymentId: `DIRECT-PAYMENT-${Date.now()}`,
      orderId: `DIRECT-ORDER-${Date.now()}`,
      amount: planPrice,
      amountPaid: planPrice,
      appliedCoupon: "",
      paymentMethod: "Direct Payment",
      status: 'paid',
      attendance: false,
      checkInCode,
      registeredBy: 'admin',
      createdAt: new Date(),
    });

    // Send confirmation + ticket emails
    let emailSent = false;
    try {
      const smtpRes = await getSmtpTransporter();
      if (smtpRes) {
        const { transporter, smtpUser } = smtpRes;
        await transporter.sendMail({
          from: `"Botmartz Accounts" <${smtpUser}>`,
          to: email.trim(),
          subject: `Registration Confirmed - ${planInfo.title}`,
          html: buildPaymentSuccessEmail(name, planInfo.title, planPrice, `DIRECT-PAYMENT`),
        });

        await transporter.sendMail({
          from: `"Botmartz Events" <${smtpUser}>`,
          to: email.trim(),
          subject: `You're In! | AI Accelerator Workshop — Bootcamp 01`,
          html: buildEventTicketEmail(name, planInfo.title, planInfo.date, planInfo.location, [checkInCode]),
        });

        emailSent = true;
      }
    } catch (mailErr) {
      console.error('[Admin Direct Register - Email Error]', mailErr);
    }

    return NextResponse.json({
      success: true,
      checkInCode,
      emailSent,
      message: `Registration created for ${name}. Check-in code: ${checkInCode}`
    }, { status: 200 });

  } catch (err: any) {
    console.error("Admin Direct Registration Error:", err);
    return NextResponse.json({ success: false, error: err.message || "Registration failed" }, { status: 500 });
  }
}
