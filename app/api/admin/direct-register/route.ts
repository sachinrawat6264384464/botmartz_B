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
    const { name, email, phone, plan } = await req.json();

    if (!name || !email || !plan) {
      return NextResponse.json({ success: false, error: "Missing required fields: name, email, plan" }, { status: 400 });
    }

    // Plan labels for email
    const PLAN_LABELS: Record<string, { title: string; date: string; location: string }> = {
      "bootcamp-01": { title: "Bootcamp Series 1: Build Your First AI Full-Stack Application", date: "August 2026", location: "Live Online" },
      "bootcamp-02": { title: "Bootcamp Series 2: Build Smarter AI Agents", date: "August 2026", location: "Live Online" },
      "bootcamp-03": { title: "Bootcamp Series 3: Build Production Ready AI Applications", date: "August 2026", location: "Live Online" },
      "bundle": { title: "AI Engineering Pass (Full Bundle — All 3 Series)", date: "August 2026", location: "Live Online" },
    };

    const planInfo = PLAN_LABELS[plan] || PLAN_LABELS["bootcamp-01"];

    // Generate unique check-in code
    const checkInCode = `ADM-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;

    // Save registration to Firestore
    await adminDb.collection('bootcamp_registrations').add({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || "",
      plan,
      paymentId: `ADMIN-DIRECT-${Date.now()}`,
      orderId: `ADMIN-FREE-${Date.now()}`,
      amount: 0,
      amountPaid: 0,
      appliedCoupon: "ADMIN-DIRECT",
      paymentMethod: "ADMIN_DIRECT_REGISTER",
      status: 'paid',
      attendance: false,
      checkInCode,
      registeredBy: 'admin',
      createdAt: new Date(),
    });

    // Send confirmation + ticket emails
    const smtpUser = process.env.SMTP_USER;
    let emailSent = false;

    if (smtpUser) {
      try {
        await transporter.sendMail({
          from: `"Botmartz Accounts" <${smtpUser}>`,
          to: email.trim(),
          subject: `Registration Confirmed (Admin) - ${planInfo.title}`,
          html: buildPaymentSuccessEmail(name, planInfo.title, 0, `ADMIN-DIRECT`),
        });

        await transporter.sendMail({
          from: `"Botmartz Events" <${smtpUser}>`,
          to: email.trim(),
          subject: `Your Pass Ticket - ${planInfo.title}`,
          html: buildEventTicketEmail(name, planInfo.title, planInfo.date, planInfo.location, [checkInCode]),
        });

        emailSent = true;
      } catch (mailErr) {
        console.error('[Admin Direct Register - Email Error]', mailErr);
      }
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
