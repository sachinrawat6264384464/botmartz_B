import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

// System Coupon Definitions
const SYSTEM_COUPONS: Record<string, { discountType: 'percentage' | 'fixed'; discountValue: number; maxUses: number }> = {
  EARLY15: { discountType: 'percentage', discountValue: 15, maxUses: 50 },
  INFLUENCER20: { discountType: 'percentage', discountValue: 20, maxUses: 50 },
};

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'Coupon code is required' }, { status: 400 });
    }

    const uppercaseCode = code.trim().toUpperCase();

    // 1. Check System Defined Coupons (EARLY15 & INFLUENCER20)
    if (SYSTEM_COUPONS[uppercaseCode]) {
      const config = SYSTEM_COUPONS[uppercaseCode];

      // Query actual completed registrations count for this coupon
      const regSnap = await adminDb
        .collection('event-registrations')
        .where('appliedCoupon', '==', uppercaseCode)
        .where('paymentStatus', '==', 'paid')
        .get();

      const currentUses = regSnap.size;

      if (currentUses >= config.maxUses) {
        return NextResponse.json({ 
          error: `Coupon "${uppercaseCode}" has reached its maximum limit of ${config.maxUses} uses.` 
        }, { status: 400 });
      }

      // Sync/Upsert into coupons collection for Admin dashboard monitoring
      const couponRef = adminDb.collection('coupons').doc(uppercaseCode);
      await couponRef.set({
        code: uppercaseCode,
        discountType: config.discountType,
        discountValue: config.discountValue,
        maxUses: config.maxUses,
        currentUses,
        isActive: true,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      return NextResponse.json({
        success: true,
        code: uppercaseCode,
        discountType: config.discountType,
        discountValue: config.discountValue,
        maxUses: config.maxUses,
        remainingUses: config.maxUses - currentUses
      });
    }

    // 2. Query Firestore for custom coupons created by admin
    const couponQuery = await adminDb
      .collection('coupons')
      .where('code', '==', uppercaseCode)
      .limit(1)
      .get();

    if (couponQuery.empty) {
      return NextResponse.json({ error: 'Invalid coupon code. Use EARLY15 or INFLUENCER20.' }, { status: 404 });
    }

    const couponDoc = couponQuery.docs[0];
    const couponData = couponDoc.data();

    // Count actual registrations with this coupon
    const regSnap = await adminDb
      .collection('event-registrations')
      .where('appliedCoupon', '==', uppercaseCode)
      .where('paymentStatus', '==', 'paid')
      .get();

    const currentUses = regSnap.size;

    if (couponData.isActive === false) {
      return NextResponse.json({ error: 'This coupon is inactive' }, { status: 400 });
    }

    if (currentUses >= (couponData.maxUses || 50)) {
      return NextResponse.json({ error: `Coupon "${uppercaseCode}" has reached its maximum limit of ${couponData.maxUses || 50} uses.` }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      code: couponData.code,
      discountType: couponData.discountType,
      discountValue: couponData.discountValue,
      maxUses: couponData.maxUses || 50,
      remainingUses: (couponData.maxUses || 50) - currentUses
    });
  } catch (err: any) {
    console.error('[verify-coupon error]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
