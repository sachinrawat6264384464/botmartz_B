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
    const { name, email, phone, organization, plan, couponCode } = await req.json();

    if (!name || !email || !couponCode) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    if (plan && plan !== "bundle") {
      return NextResponse.json({
        success: false,
        error: "Coupon codes can only be redeemed for the ₹399 AI Engineering Pass."
      }, { status: 400 });
    }

    const uppercaseCoupon = couponCode.trim().toUpperCase();

    // 1. Fetch coupon details from 'coupons' collection to get true maxUses
    let maxUses = 1;
    let isActive = true;

    try {
      const couponQuery = await adminDb.collection('coupons').where('code', '==', uppercaseCoupon).limit(1).get();
      if (!couponQuery.empty) {
        const cData = couponQuery.docs[0].data();
        maxUses = Number(cData.maxUses) || 1;
        if (cData.isActive === false) {
          isActive = false;
        }
      }
    } catch (cErr) {
      console.warn('[Coupon lookup error]', cErr);
    }

    if (!isActive) {
      return NextResponse.json({
        success: false,
        error: `Coupon "${uppercaseCoupon}" is currently inactive.`
      }, { status: 400 });
    }

    // 2. Count actual redemptions from registrations
    const [bcSnap, regSnap] = await Promise.all([
      adminDb.collection('bootcamp_registrations').get(),
      adminDb.collection('event-registrations').get()
    ]);

    let couponUsedCount = 0;
    bcSnap.forEach(doc => {
      const data = doc.data();
      if (data.appliedCoupon && data.appliedCoupon.trim().toUpperCase() === uppercaseCoupon) {
        couponUsedCount++;
      }
    });
    regSnap.forEach(doc => {
      const data = doc.data();
      if (data.appliedCoupon && data.appliedCoupon.trim().toUpperCase() === uppercaseCoupon) {
        couponUsedCount++;
      }
    });

    if (couponUsedCount >= maxUses) {
      return NextResponse.json({
        success: false,
        error: `Coupon "${uppercaseCoupon}" has already reached its maximum limit of ${maxUses} use(s).`
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
      organization: organization || "",
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

    // Update coupon usage count & status in 'coupons' collection
    try {
      const couponQuery = await adminDb.collection('coupons').where('code', '==', uppercaseCoupon).limit(1).get();
      if (!couponQuery.empty) {
        const cDoc = couponQuery.docs[0];
        const cData = cDoc.data();
        const newUses = (cData.currentUses || 0) + 1;
        const maxUses = cData.maxUses || 1;
        await cDoc.ref.update({
          currentUses: newUses,
          isActive: newUses < maxUses,
          status: newUses >= maxUses ? 'redeemed' : 'active',
          updatedAt: new Date().toISOString()
        });
      }
    } catch (cErr) {
      console.error('[Coupon usage update error]', cErr);
    }

    // Send emails dynamically using getSmtpTransporter
    try {
      const smtpRes = await getSmtpTransporter();
      if (smtpRes) {
        const { transporter, smtpUser } = smtpRes;
        await transporter.sendMail({
          from: `"Botmartz Accounts" <${smtpUser}>`,
          to: email,
          subject: `Registration Confirmed (Free Pass) - ${eventTitle}`,
          html: buildPaymentSuccessEmail(name, eventTitle, 0, `COUPON-${uppercaseCoupon}`),
        });

        await transporter.sendMail({
          from: `"Botmartz Events" <${smtpUser}>`,
          to: email,
          subject: `You're In! | AI Accelerator Workshop — Bootcamp 01`,
          html: buildEventTicketEmail(name, eventTitle, dateVal, locVal, [checkInCode]),
        });
        console.log(`✅ [Coupon Registration] Emails successfully sent to ${email}`);
      } else {
        console.warn(`⚠️ [Coupon Registration] Skipped email sending: SMTP credentials not set`);
      }
    } catch (mailErr) {
      console.error('[Free Registration Email Dispatch Error]', mailErr);
    }

    return NextResponse.json({ success: true, checkInCode }, { status: 200 });
  } catch (err: any) {
    console.error("Free Coupon Registration Error:", err);
    return NextResponse.json({ success: false, error: err.message || "Registration failed" }, { status: 500 });
  }
}
