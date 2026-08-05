import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import nodemailer from "nodemailer";
import { 
  buildRegistrationEmail, 
  buildPaymentSuccessEmail, 
  buildEventTicketEmail 
} from "@/lib/mail-templates";

export async function POST(req: Request) {
  try {
    const { name, email, eventTitle, date, location, checkInCode, amount } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // 1. Fetch SMTP settings from global config or env
    let settings: any = {};
    try {
      const settingsSnap = await adminDb.collection("settings").doc("global").get();
      if (settingsSnap.exists) {
        settings = settingsSnap.data();
      }
    } catch (e) {
      console.warn("Could not fetch global settings for event email:", e);
    }

    const smtpHost = settings?.email?.smtpHost || process.env.SMTP_HOST || 'smtp.hostinger.com';
    const smtpPort = settings?.email?.smtpPort || parseInt(process.env.SMTP_PORT || '465', 10);
    const smtpUser = settings?.email?.smtpUser || process.env.SMTP_USER || process.env.GMAIL_USER;
    const smtpPass = settings?.email?.smtpPass || process.env.SMTP_PASS || process.env.GMAIL_APP_PASS;

    if (!smtpUser || !smtpPass) {
      console.warn("[Send Ticket Email] SMTP credentials not configured.");
      return NextResponse.json({ success: false, message: "Email skipped: SMTP credentials not set" }, { status: 200 });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const title = eventTitle || "AI Frontier 2026";
    const dateVal = date || "August 23, 2026";
    const locVal = location || "Walkover Co-working Space, Indore";
    const code = checkInCode || `REG-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;
    const paidAmount = amount || 0;

    // Send all 3 emails (Registration Received + Confirmation Receipt + Ticket QR Pass)
    const results = await Promise.allSettled([
      // Mail 1: Registration Received
      transporter.sendMail({
        from: `"Botmartz Events" <${smtpUser}>`,
        to: email,
        subject: `Registration Confirmed - ${title}`,
        html: buildRegistrationEmail(name, title),
      }),
      // Mail 2: Payment / Receipt Confirmation
      transporter.sendMail({
        from: `"Botmartz Accounts" <${smtpUser}>`,
        to: email,
        subject: `Payment & Seat Receipt - ${title}`,
        html: buildPaymentSuccessEmail(name, title, paidAmount, code),
      }),
      // Mail 3: Digital Entry Pass with QR Code
      transporter.sendMail({
        from: `"Botmartz Entry Pass" <${smtpUser}>`,
        to: email,
        subject: `Your Official Entry Ticket & QR Pass - ${title}`,
        html: buildEventTicketEmail(name, title, dateVal, locVal, [code]),
      })
    ]);

    console.log(`✅ [Send Ticket Email] Dispatched 3 emails to ${email} for ${title}`, results);
    return NextResponse.json({ success: true, message: "All 3 emails dispatched successfully" });
  } catch (error: any) {
    console.error("[Send Ticket Email Error]", error);
    return NextResponse.json({ error: error.message || "Failed to send emails" }, { status: 500 });
  }
}
