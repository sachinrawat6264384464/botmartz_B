import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

// System Coupon Definitions
const SYSTEM_COUPONS: Record<string, { discountType: 'percentage' | 'fixed'; discountValue: number; maxUses: number }> = {
  EARLY15: { discountType: 'percentage', discountValue: 15, maxUses: 50 },
  INFLUENCER20: { discountType: 'percentage', discountValue: 20, maxUses: 50 },
  // 7 Unique 100% FREE Workshop Coupons (Single Use Each)
  "BMFREE100-1": { discountType: 'percentage', discountValue: 100, maxUses: 1 },
  "BMFREE100-2": { discountType: 'percentage', discountValue: 100, maxUses: 1 },
  "BMFREE100-3": { discountType: 'percentage', discountValue: 100, maxUses: 1 },
  "BMFREE100-4": { discountType: 'percentage', discountValue: 100, maxUses: 1 },
  "BMFREE100-5": { discountType: 'percentage', discountValue: 100, maxUses: 1 },
  "BMFREE100-6": { discountType: 'percentage', discountValue: 100, maxUses: 1 },
  "BMFREE100-7": { discountType: 'percentage', discountValue: 100, maxUses: 1 },
  // Also readable alias codes
  "BMWORKSHOP1": { discountType: 'percentage', discountValue: 100, maxUses: 1 },
  "BMWORKSHOP2": { discountType: 'percentage', discountValue: 100, maxUses: 1 },
  "BMWORKSHOP3": { discountType: 'percentage', discountValue: 100, maxUses: 1 },
  "BMWORKSHOP4": { discountType: 'percentage', discountValue: 100, maxUses: 1 },
  "BMWORKSHOP5": { discountType: 'percentage', discountValue: 100, maxUses: 1 },
  "BMWORKSHOP6": { discountType: 'percentage', discountValue: 100, maxUses: 1 },
  "BMWORKSHOP7": { discountType: 'percentage', discountValue: 100, maxUses: 1 },
  // 10% Discount Coupons (30 Uses Each - Works on ₹199 and ₹399)
  "BOTMARTZ10": { discountType: 'percentage', discountValue: 10, maxUses: 30 },
  "WORKSHOP10": { discountType: 'percentage', discountValue: 10, maxUses: 30 },
  "EARLY10": { discountType: 'percentage', discountValue: 10, maxUses: 30 },
};

// GET handler to check total workshop coupon usage (max 7 allowed total)
export async function GET() {
  try {
    const bootcampRegSnap = await adminDb
      .collection('bootcamp_registrations')
      .get();
    
    let couponCount = 0;
    bootcampRegSnap.forEach(doc => {
      const data = doc.data();
      if (data.appliedCoupon && data.appliedCoupon.trim() !== '') {
        couponCount++;
      }
    });

    const isLimitReached = couponCount >= 7;

    return NextResponse.json({
      success: true,
      totalCouponRedemptions: couponCount,
      maxAllowed: 7,
      isLimitReached
    });
  } catch (err: any) {
    console.error('[check-coupon-limit GET error]', err);
    return NextResponse.json({ success: true, isLimitReached: false, totalCouponRedemptions: 0 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'Coupon code is required' }, { status: 400 });
    }

    const uppercaseCode = code.trim().toUpperCase();

    // Check overall global limit for workshop coupons (Max 7 allowed total)
    const bootcampRegSnap = await adminDb.collection('bootcamp_registrations').get();
    let totalWorkshopCouponsUsed = 0;
    bootcampRegSnap.forEach(doc => {
      const d = doc.data();
      if (d.appliedCoupon && d.appliedCoupon.trim() !== '') totalWorkshopCouponsUsed++;
    });

    if (totalWorkshopCouponsUsed >= 7 && (uppercaseCode.startsWith("BMFREE") || uppercaseCode.startsWith("BMWORKSHOP"))) {
      return NextResponse.json({
        error: "All 7 promotional workshop coupons have already been claimed."
      }, { status: 400 });
    }

    // 1. Check System Defined Coupons
    if (SYSTEM_COUPONS[uppercaseCode]) {
      const config = SYSTEM_COUPONS[uppercaseCode];

      // Query actual completed registrations count for this coupon across both collections
      const regSnap = await adminDb
        .collection('event-registrations')
        .where('appliedCoupon', '==', uppercaseCode)
        .where('paymentStatus', '==', 'paid')
        .get();

      const bcSnap = await adminDb
        .collection('bootcamp_registrations')
        .where('appliedCoupon', '==', uppercaseCode)
        .get();

      const currentUses = regSnap.size + bcSnap.size;

      if (currentUses >= config.maxUses) {
        return NextResponse.json({ 
          error: `Coupon "${uppercaseCode}" has already been used (${config.maxUses}/${config.maxUses}).` 
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
