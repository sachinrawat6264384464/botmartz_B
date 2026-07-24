import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'Coupon code is required' }, { status: 400 });
    }

    const uppercaseCode = code.trim().toUpperCase();

    // Query Firestore for the coupon
    const couponQuery = await adminDb
      .collection('coupons')
      .where('code', '==', uppercaseCode)
      .limit(1)
      .get();

    if (couponQuery.empty) {
      return NextResponse.json({ error: 'Invalid coupon code' }, { status: 404 });
    }

    const couponDoc = couponQuery.docs[0];
    const couponData = couponDoc.data();

    // Validate Status and Usage
    if (!couponData.isActive) {
      return NextResponse.json({ error: 'This coupon is inactive' }, { status: 400 });
    }

    if (couponData.currentUses >= couponData.maxUses) {
      return NextResponse.json({ error: 'This coupon has reached its usage limit' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      code: couponData.code,
      type: couponData.type,
      discountType: couponData.discountType,
      discountValue: couponData.discountValue,
    });
  } catch (err: any) {
    console.error('[verify-coupon error]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
