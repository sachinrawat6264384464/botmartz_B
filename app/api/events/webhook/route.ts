import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { adminDb } from '@/lib/firebase-admin';
import { 
  buildRegistrationEmail, 
  buildPaymentSuccessEmail, 
  buildEventTicketEmail,
  getSmtpTransporter
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
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // 1. Signature Verification (if secret is configured)
    if (webhookSecret && signature) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex');

      if (expectedSignature !== signature) {
        return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 400 });
      }
    }

    const payload = JSON.parse(rawBody);
    const eventType = payload.event;

    // We only care about successful captures
    if (eventType !== 'payment.captured') {
      return NextResponse.json({ received: true });
    }

    const payment = payload.payload?.payment?.entity;
    if (!payment) {
      return NextResponse.json({ error: 'No payment entity found in payload' }, { status: 400 });
    }

    // Razorpay payment details
    const notes = payment.notes || {};
    const description = payment.description || '';
    const email = payment.email || '';
    const amountPaisa = Number(payment.amount);
    const amountInr = amountPaisa / 100;
    
    const acquirer = payment.acquirer_data || {};
    const utr = acquirer.rrn || acquirer.upi_transaction_id || acquirer.bank_transaction_id || '';

    // 2. Identify Registration Document ID
    // Check notes first, then try parsing description for registration ID prefix (e.g. reg-...)
    let registrationId = notes.registrationId || notes.regId;
    
    if (!registrationId && description) {
      const match = description.match(/(reg-[A-Za-z0-9]+)/i);
      if (match) {
        registrationId = match[1];
      }
    }

    // Fallback: If no ID but we have an email, find the latest pending registration for this email
    if (!registrationId && email) {
      const pendingRegQuery = await adminDb.collection('event-registrations')
        .where('email', '==', email)
        .where('paymentStatus', '==', 'pending')
        .orderBy('createdAt', 'desc')
        .limit(1)
        .get();

      if (!pendingRegQuery.empty) {
        registrationId = pendingRegQuery.docs[0].id;
      }
    }

    if (!registrationId) {
      console.warn('[Webhook Warning] Could not link Razorpay payment to any registration:', payment.id);
      return NextResponse.json({ received: true, warning: 'Registration ID not resolved' });
    }

    // 3. Update Registration status in Firestore
    const regRef = adminDb.collection('event-registrations').doc(registrationId);
    const regDoc = await regRef.get();

    if (!regDoc.exists) {
      return NextResponse.json({ error: 'Linked registration document not found.' }, { status: 404 });
    }

    const regData = regDoc.data();
    if (regData?.paymentStatus === 'paid') {
      // Already verified via manual UTR or previous trigger
      return NextResponse.json({ success: true, message: 'Already marked as paid.' });
    }

    const checkInCode = regData?.checkInCode || `REG-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;

    // Update status to paid
    await regRef.update({
      paymentStatus: 'paid',
      utr: utr || regData?.utr || 'Auto-Captured',
      amountPaid: amountInr,
      checkInCode,
      updatedAt: new Date().toISOString(),
    });

    // 4. Send Emails via getSmtpTransporter
    if (regData) {
      const { name, email: regEmail, eventTitle, eventId } = regData;

      try {
        const smtpRes = await getSmtpTransporter();
        if (smtpRes) {
          const { transporter, smtpUser } = smtpRes;

          // Email 1: Registration Received (Immediate)
          await transporter.sendMail({
            from: `"Botmartz Events" <${smtpUser}>`,
            to: regEmail,
            subject: `Registration Details Received - ${eventTitle}`,
            html: buildRegistrationEmail(name, eventTitle),
          });

          // Sleep for 1 second
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Email 2: Invoice Receipt
          await transporter.sendMail({
            from: `"Botmartz Accounts" <${smtpUser}>`,
            to: regEmail,
            subject: `Payment Confirmed Invoice - ${eventTitle}`,
            html: buildPaymentSuccessEmail(name, eventTitle, amountInr, utr || 'Auto-Captured'),
          });

          // Email 3: Ticket Pass
          let dateVal = 'Upcoming';
          let locVal = 'Indore, India';
          if (eventId) {
            const eventDoc = await adminDb.collection('events').doc(eventId).get();
            if (eventDoc.exists) {
              const evtData = eventDoc.data();
              dateVal = evtData?.date || dateVal;
              locVal = evtData?.location || locVal;
            }
          }

          await transporter.sendMail({
            from: `"Botmartz Events" <${smtpUser}>`,
            to: regEmail,
            subject: `You're In! | AI Accelerator Workshop — Bootcamp 01`,
            html: buildEventTicketEmail(name, eventTitle, dateVal, locVal, checkInCode),
          });
        }
      } catch (mailErr) {
        console.error('[Webhook Mail Delivery Failed]', mailErr);
      }
    }

    return NextResponse.json({ success: true, registrationId });

  } catch (err: any) {
    console.error('[webhook error]', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
