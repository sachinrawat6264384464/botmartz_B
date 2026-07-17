import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
  try {
    const { registrationId, amount } = await req.json();

    if (!registrationId || amount === undefined) {
      return NextResponse.json({ error: 'Missing registrationId or amount' }, { status: 400 });
    }

    const cleanAmount = Number(amount);

    // 1. Fetch the registration document from Firestore
    const regRef = adminDb.collection('event-registrations').doc(registrationId);
    const regDoc = await regRef.get();

    if (!regDoc.exists) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    const regData = regDoc.data();
    const eventId = regData?.eventId;

    // 2. Fetch the event details to verify the fee
    if (!eventId) {
      return NextResponse.json({ error: 'Event ID missing from registration details' }, { status: 400 });
    }

    const eventDoc = await adminDb.collection('events').doc(eventId).get();
    if (!eventDoc.exists) {
      return NextResponse.json({ error: 'Associated event not found' }, { status: 404 });
    }

    const eventData = eventDoc.data();
    // Default to 100 if entryFee is undefined/null in DB
    const expectedFee = (eventData?.entryFee !== undefined && eventData?.entryFee !== null) 
      ? Number(eventData.entryFee) 
      : 100;

    // Prevent amount tampering
    if (cleanAmount !== expectedFee) {
      return NextResponse.json({ error: 'Payment amount mismatch detected.' }, { status: 400 });
    }

    // 3. Call Razorpay API to create an Order
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json({ error: 'Razorpay credentials are not configured in system environment.' }, { status: 500 });
    }

    const authString = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const expectedAmountPaisa = Math.round(cleanAmount * 100);

    const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: expectedAmountPaisa,
        currency: 'INR',
        receipt: `receipt_${registrationId}`,
        notes: {
          registrationId: registrationId,
          eventId: eventId,
        }
      }),
    });

    if (!razorpayResponse.ok) {
      const errorText = await razorpayResponse.text();
      console.error('[Razorpay Order Creation Error]', errorText);
      return NextResponse.json({ error: 'Failed to create payment order with gateway.' }, { status: 500 });
    }

    const orderData = await razorpayResponse.json();

    // 4. Save the order ID to the registration document
    await regRef.update({
      orderId: orderData.id,
      amountPaid: cleanAmount,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      orderId: orderData.id,
      amount: expectedAmountPaisa,
      keyId,
    });

  } catch (err: any) {
    console.error('[create-order error]', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
