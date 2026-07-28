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
    
    let basePrice = attendeeType === 'student' ? 449 : 699;
    
    let discount = 0;
    if (quantity >= 10) discount = 100;
    else if (quantity >= 5) discount = 50;

    const SYSTEM_COUPONS: Record<string, { discountType: 'percentage' | 'fixed'; discountValue: number; maxUses: number }> = {
      EARLY15: { discountType: 'percentage', discountValue: 15, maxUses: 50 },
      INFLUENCER20: { discountType: 'percentage', discountValue: 20, maxUses: 50 },
    };

    let appliedCoupon = null;
    let couponAppliedSuccessfully = false;
    let expectedFee = Math.max(0, (basePrice - discount) * quantity);

    if (couponCode) {
      const uppercaseCode = couponCode.trim().toUpperCase();
      let discType = '';
      let discVal = 0;
      let maxCap = 50;

      if (SYSTEM_COUPONS[uppercaseCode]) {
        discType = SYSTEM_COUPONS[uppercaseCode].discountType;
        discVal = SYSTEM_COUPONS[uppercaseCode].discountValue;
        maxCap = SYSTEM_COUPONS[uppercaseCode].maxUses;
      } else {
        const couponQuery = await adminDb
          .collection('coupons')
          .where('code', '==', uppercaseCode)
          .limit(1)
          .get();

        if (!couponQuery.empty) {
          const couponData = couponQuery.docs[0].data();
          if (couponData.isActive !== false) {
            discType = couponData.discountType;
            discVal = couponData.discountValue;
            maxCap = couponData.maxUses || 50;
          }
        }
      }

      if (discType && discVal > 0) {
        // Check usage cap
        const regSnap = await adminDb
          .collection('event-registrations')
          .where('appliedCoupon', '==', uppercaseCode)
          .where('paymentStatus', '==', 'paid')
          .get();

        if (regSnap.size < maxCap) {
          appliedCoupon = uppercaseCode;
          couponAppliedSuccessfully = true;

          const baseAmount = Math.max(0, (basePrice - discount) * quantity);
          if (discType === 'percentage') {
            expectedFee = Math.max(0, Math.round(baseAmount * (1 - discVal / 100)));
          } else {
            expectedFee = Math.max(0, baseAmount - discVal);
          }
        }
      }
    }

    // Prevent amount tampering
    if (cleanAmount !== expectedFee) {
      return NextResponse.json({ error: `Payment amount mismatch detected. Expected ${expectedFee}, got ${cleanAmount}` }, { status: 400 });
    }

    // 3. Call Razorpay API to create an Order
    let keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
    let keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Check Firestore global settings for live/test key overrides
    try {
      const settingsSnap = await adminDb.collection('settings').doc('global').get();
      if (settingsSnap.exists) {
        const integrations = settingsSnap.data()?.integrations || {};
        if (integrations.razorpayKeyId) keyId = integrations.razorpayKeyId;
        if (integrations.razorpayKeySecret) keySecret = integrations.razorpayKeySecret;
        else if (integrations.razorpayKey && integrations.razorpayKey.includes(':')) {
          const parts = integrations.razorpayKey.split(':');
          keyId = parts[0].trim();
          keySecret = parts[1].trim();
        }
      }
    } catch (e) {
      console.warn('[create-order] Could not fetch Razorpay keys from Firestore settings:', e);
    }

    if (!keyId || !keySecret) {
      return NextResponse.json({ error: 'Razorpay credentials are not configured in system environment or admin settings.' }, { status: 500 });
    }

    const authString = Buffer.from(`${keyId.trim()}:${keySecret.trim()}`).toString('base64');
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
      console.error(`[Razorpay Order Creation Error] (KeyId used: ${keyId ? keyId.substring(0, 10) + '...' : 'none'})`, errorText);
      try {
        const parsed = JSON.parse(errorText);
        return NextResponse.json({ 
          error: parsed.error?.description || parsed.error?.code || 'Failed to create payment order with gateway.',
          details: 'Please verify Razorpay Key ID & Key Secret in your Admin Settings > Integrations or .env file.'
        }, { status: 500 });
      } catch {
        return NextResponse.json({ error: `Failed to create payment order with gateway: ${errorText}` }, { status: 500 });
      }
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
