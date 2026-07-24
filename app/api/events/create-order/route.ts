import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
  try {
    const { registrationId, amount, couponCode } = await req.json();

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

    // 2. Calculate dynamic fee based on registration data
    const attendeeType = regData?.attendeeType || 'student';
    const quantity = regData?.quantity || 1;
    
    let basePrice = attendeeType === 'student' ? 399 : 699;
    
    let discount = 0;
    if (quantity >= 10) discount = 100;
    else if (quantity >= 5) discount = 50;

    let appliedCoupon = null;
    let couponAppliedSuccessfully = false;
    let expectedFee = 0;

    // First attempt to fetch and validate coupon
    if (couponCode) {
      const uppercaseCode = couponCode.trim().toUpperCase();
      const couponQuery = await adminDb
        .collection('coupons')
        .where('code', '==', uppercaseCode)
        .limit(1)
        .get();

      if (!couponQuery.empty) {
        const couponDoc = couponQuery.docs[0];
        const couponData = couponDoc.data();
        
        if (couponData.isActive && couponData.currentUses < couponData.maxUses) {
          appliedCoupon = uppercaseCode;
          couponAppliedSuccessfully = true;
          
          // Base fee before coupon
          expectedFee = Math.max(0, (basePrice - discount) * quantity);
          
          if (couponData.discountType === 'percentage') {
            expectedFee = Math.max(0, Math.round(expectedFee * (1 - couponData.discountValue / 100)));
          } else if (couponData.discountType === 'fixed') {
            expectedFee = Math.max(0, expectedFee - couponData.discountValue);
          }
        }
      }
    }

    // If no coupon applied, apply early bird logic
    if (!couponAppliedSuccessfully) {
      const isEarlyBird = new Date() <= new Date("2026-07-30T23:59:59Z");
      if (isEarlyBird) {
        basePrice = Math.round(basePrice * 0.85);
      }
      expectedFee = Math.max(0, (basePrice - discount) * quantity);
    }

    // Prevent amount tampering
    if (cleanAmount !== expectedFee) {
      return NextResponse.json({ error: `Payment amount mismatch detected. Expected ${expectedFee}, got ${cleanAmount}` }, { status: 400 });
    }

    // 3. Call Razorpay API to create an Order
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
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
    const updateData: any = {
      orderId: orderData.id,
      amountPaid: cleanAmount,
      updatedAt: new Date().toISOString(),
    };
    if (appliedCoupon) {
      updateData.appliedCoupon = appliedCoupon;
    }
    await regRef.update(updateData);

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
