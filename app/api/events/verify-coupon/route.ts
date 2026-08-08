import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

// Static system coupons (non-free, non-free-pass ones)
const STATIC_SYSTEM_COUPONS: Record<string, { discountType: 'percentage' | 'fixed'; discountValue: number; defaultMaxUses: number }> = {
  EARLY15: { discountType: 'percentage', discountValue: 15, defaultMaxUses: 50 },
  INFLUENCER20: { discountType: 'percentage', discountValue: 20, defaultMaxUses: 50 },
};

// GET handler - used by checkout to check limit status
export async function GET() {
  try {
    // Count free coupon redemptions (coupons with 100% discount)
    const bootcampRegSnap = await adminDb.collection('bootcamp_registrations').get();
    let freeCouponCount = 0;
    bootcampRegSnap.forEach(doc => {
      const data = doc.data();
      if (data.appliedCoupon && data.appliedCoupon.trim() !== '') {
        // Check if it's a free coupon
        const code = data.appliedCoupon.toUpperCase();
        if (code.startsWith('BMFREE') || code.startsWith('BMWORKSHOP') || code.startsWith('FREE')) {
          freeCouponCount++;
        }
      }
    });

    return NextResponse.json({
      success: true,
      totalCouponRedemptions: freeCouponCount,
      isLimitReached: false // No global limit anymore
    });
  } catch (err: any) {
    console.error('[check-coupon-limit GET error]', err);
    return NextResponse.json({ success: true, isLimitReached: false, totalCouponRedemptions: 0 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { code, plan } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'Coupon code is required' }, { status: 400 });
    }

    if (plan && plan !== 'bundle') {
      return NextResponse.json({ error: 'Coupon codes are only valid for the ₹399 AI Engineering Pass (Full Bundle).' }, { status: 400 });
    }

    const uppercaseCode = code.trim().toUpperCase();

    // 1. Check if it's a static system coupon (EARLY15, INFLUENCER20)
    if (STATIC_SYSTEM_COUPONS[uppercaseCode]) {
      const config = STATIC_SYSTEM_COUPONS[uppercaseCode];

      // Try to get dynamic maxUses from Firestore (admin can update it)
      let maxUses = config.defaultMaxUses;
      try {
        const couponDoc = await adminDb.collection('coupons').doc(uppercaseCode).get();
        if (couponDoc.exists) {
          const data = couponDoc.data()!;
          if (data.maxUses) maxUses = data.maxUses;
          if (data.isActive === false) {
            return NextResponse.json({ error: 'This coupon is currently inactive.' }, { status: 400 });
          }
        }
      } catch {}

      const regSnap = await adminDb.collection('event-registrations').where('appliedCoupon', '==', uppercaseCode).where('paymentStatus', '==', 'paid').get();
      const bcSnap = await adminDb.collection('bootcamp_registrations').where('appliedCoupon', '==', uppercaseCode).where('status', '==', 'paid').get();
      const currentUses = regSnap.size + bcSnap.size;

      if (currentUses >= maxUses) {
        return NextResponse.json({ error: `Coupon "${uppercaseCode}" has reached its maximum limit of ${maxUses} uses.` }, { status: 400 });
      }

      // Sync to Firestore for admin tracking
      await adminDb.collection('coupons').doc(uppercaseCode).set({
        code: uppercaseCode,
        discountType: config.discountType,
        discountValue: config.discountValue,
        maxUses,
        currentUses,
        isActive: true,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      return NextResponse.json({
        success: true,
        code: uppercaseCode,
        discountType: config.discountType,
        discountValue: config.discountValue,
        maxUses,
        remainingUses: maxUses - currentUses
      });
    }

    // 2. Query Firestore for ALL other coupons (free coupons + custom coupons created by admin)
    const couponQuery = await adminDb
      .collection('coupons')
      .where('code', '==', uppercaseCode)
      .limit(1)
      .get();

    if (couponQuery.empty) {
      return NextResponse.json({ error: 'Invalid coupon code. Please check the code and try again.' }, { status: 404 });
    }

    const couponDoc = couponQuery.docs[0];
    const couponData = couponDoc.data();

    if (couponData.isActive === false) {
      return NextResponse.json({ error: 'This coupon is inactive.' }, { status: 400 });
    }

    // Count actual paid uses for this coupon
    const [regSnap, bcSnap] = await Promise.all([
      adminDb.collection('event-registrations').where('appliedCoupon', '==', uppercaseCode).where('paymentStatus', '==', 'paid').get(),
      adminDb.collection('bootcamp_registrations').where('appliedCoupon', '==', uppercaseCode).where('status', '==', 'paid').get()
    ]);
    const currentUses = regSnap.size + bcSnap.size;
    const maxUses = couponData.maxUses || 1;

    if (currentUses >= maxUses) {
      return NextResponse.json({ error: `Coupon "${uppercaseCode}" has already been fully claimed.` }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      code: couponData.code,
      discountType: couponData.discountType,
      discountValue: couponData.discountValue,
      maxUses,
      remainingUses: maxUses - currentUses
    });
  } catch (err: any) {
    console.error('[verify-coupon error]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
