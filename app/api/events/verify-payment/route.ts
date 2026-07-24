import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { adminDb } from '@/lib/firebase-admin';
import { 
  buildRegistrationEmail, 
  buildPaymentSuccessEmail, 
  buildEventTicketEmail 
} from '@/lib/mail-templates';

// Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { 
      registrationId, 
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_signature 
    } = await req.json();

    if (!registrationId || !razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment signature verification parameters.' }, { status: 400 });
    }

    // 1. Verify Payment Signature
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json({ error: 'Razorpay secret key is not configured.' }, { status: 500 });
    }

    const payload = razorpay_order_id + "|" + razorpay_payment_id;
    const generated_signature = crypto
      .createHmac("sha256", keySecret)
      .update(payload)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: 'Payment signature validation failed. Tampering detected.' }, { status: 400 });
    }

    // 2. Fetch Registration details to update status
    const regRef = adminDb.collection('event-registrations').doc(registrationId);
    const regDoc = await regRef.get();

    if (!regDoc.exists) {
      return NextResponse.json({ error: 'Registration record not found.' }, { status: 404 });
    }

    const regData = regDoc.data();
    if (regData?.paymentStatus === 'paid') {
      return NextResponse.json({ 
        success: true, 
        checkInCode: regData.checkInCode 
      });
    }

    const quantity = regData?.quantity || 1;
    const checkInCodes = Array.from({ length: quantity }, () => `REG-${Math.random().toString(36).substring(2, 11).toUpperCase()}`);

    // Update primary registration document
    await regRef.update({
      paymentStatus: 'paid',
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      checkInCode: checkInCodes[0],
      purchasedQuantity: quantity,
      quantity: 1, // Set to 1 for individual scanning
      updatedAt: new Date().toISOString(),
    });

    // Increment coupon uses if a coupon was applied
    if (regData?.appliedCoupon) {
      try {
        const { FieldValue } = require('firebase-admin/firestore');
        const couponQuery = await adminDb
          .collection('coupons')
          .where('code', '==', regData.appliedCoupon)
          .limit(1)
          .get();

        if (!couponQuery.empty) {
          const couponDoc = couponQuery.docs[0];
          await couponDoc.ref.update({
            currentUses: FieldValue.increment(1)
          });
        }
      } catch (couponErr) {
        console.error('[Coupon Increment Failed]', couponErr);
      }
    }

    // Create sibling documents for guests
    for (let i = 1; i < quantity; i++) {
      await adminDb.collection('event-registrations').add({
        eventId: regData?.eventId || '',
        eventTitle: regData?.eventTitle || '',
        name: `${regData?.name} (Guest ${i})`,
        email: regData?.email,
        phone: regData?.phone || '',
        attendeeType: regData?.attendeeType || 'student',
        paymentStatus: 'paid',
        razorpayPaymentId: razorpay_payment_id,
        checkInCode: checkInCodes[i],
        quantity: 1,
        isGuest: true,
        primaryRegistrationId: registrationId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    const eventTitle = regData?.eventTitle || 'Community Event';
    const email = regData?.email;
    const name = regData?.name;
    const amountPaid = regData?.amountPaid || 100;

    // 3. Send Tri-Emails via Nodemailer
    const smtpUser = process.env.SMTP_USER;
    if (smtpUser && email && name) {
      try {
        // Email 1: Registration Received (Immediate)
        await transporter.sendMail({
          from: `"Botmartz Events" <${smtpUser}>`,
          to: email,
          subject: `Registration Details Received - ${eventTitle}`,
          html: buildRegistrationEmail(name, eventTitle),
        });

        // Sleep for 2 seconds before sending Invoice
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Email 2: Payment Confirmed Invoice
        await transporter.sendMail({
          from: `"Botmartz Accounts" <${smtpUser}>`,
          to: email,
          subject: `Payment Confirmed Invoice - ${eventTitle}`,
          html: buildPaymentSuccessEmail(name, eventTitle, Number(amountPaid), razorpay_payment_id),
        });

        // Email 3: Thank You & Ticket Pass (Immediate after invoice)
        let dateVal = 'Upcoming';
        let locVal = 'Indore, India';
        if (regData?.eventId) {
          const eventDoc = await adminDb.collection('events').doc(regData.eventId).get();
          if (eventDoc.exists) {
            const evtData = eventDoc.data();
            dateVal = evtData?.date || dateVal;
            locVal = evtData?.location || locVal;
          }
        }

        await transporter.sendMail({
          from: `"Botmartz Events" <${smtpUser}>`,
          to: email,
          subject: `Your Digital Entry Pass - ${eventTitle}`,
          html: buildEventTicketEmail(name, eventTitle, dateVal, locVal, checkInCodes),
        });

      } catch (mailErr) {
        console.error('[Mail Delivery Failed]', mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      checkInCode: checkInCodes[0],
    });

  } catch (err: any) {
    console.error('[verify-payment error]', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
