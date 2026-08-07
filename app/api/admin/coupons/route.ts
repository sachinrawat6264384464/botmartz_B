import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET(req: NextRequest) {
  try {
    // 1. Fetch real completed paid registrations for live system coupons count
    const regSnap = await adminDb
      .collection('event-registrations')
      .get();

    let early15Count = 0;
    let influencer20Count = 0;

    regSnap.docs.forEach(d => {
      const data = d.data();
      if (data.paymentStatus === 'paid' || data.paymentStatus === 'success') {
        if (data.appliedCoupon === 'EARLY15') early15Count++;
        if (data.appliedCoupon === 'INFLUENCER20') influencer20Count++;
      }
    });

    const systemStats = {
      EARLY15: { used: early15Count, max: 50, remaining: Math.max(0, 50 - early15Count) },
      INFLUENCER20: { used: influencer20Count, max: 50, remaining: Math.max(0, 50 - influencer20Count) },
    };

    // 2. Fetch custom coupons collection
    const querySnapshot = await adminDb.collection('coupons').get();
    const data = querySnapshot.docs.map(docSnap => {
      const cData = docSnap.data();
      let currentUses = cData.currentUses || 0;
      if (cData.code === 'EARLY15') currentUses = early15Count;
      if (cData.code === 'INFLUENCER20') currentUses = influencer20Count;

      return {
        id: docSnap.id,
        code: cData.code,
        type: cData.type || (cData.code === 'EARLY15' ? 'early-bird' : 'influencer'),
        discountType: cData.discountType || 'percentage',
        discountValue: cData.discountValue || (cData.code === 'EARLY15' ? 15 : 20),
        isActive: cData.isActive !== false,
        maxUses: cData.maxUses || 50,
        currentUses
      };
    });

    const hasEarly = data.some(c => c.code === 'EARLY15');
    const hasInfluencer = data.some(c => c.code === 'INFLUENCER20');

    const fullList = [...data];
    if (!hasEarly) {
      fullList.unshift({
        id: 'sys-early15',
        code: 'EARLY15',
        type: 'early-bird',
        discountType: 'percentage',
        discountValue: 15,
        isActive: early15Count < 50,
        maxUses: 50,
        currentUses: early15Count
      });
    }
    if (!hasInfluencer) {
      fullList.unshift({
        id: 'sys-influencer20',
        code: 'INFLUENCER20',
        type: 'influencer',
        discountType: 'percentage',
        discountValue: 20,
        isActive: influencer20Count < 50,
        maxUses: 50,
        currentUses: influencer20Count
      });
    }

    return NextResponse.json({
      success: true,
      systemStats,
      coupons: fullList
    });
  } catch (err: any) {
    console.error('[admin coupons api error]', err);
    return NextResponse.json({ error: err.message || 'Failed to fetch coupon data' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id, code } = await req.json();
    if (!id && !code) {
      return NextResponse.json({ error: 'Coupon ID or Code is required' }, { status: 400 });
    }

    if (id && !id.startsWith('sys-')) {
      await adminDb.collection('coupons').doc(id).delete();
    }

    if (code) {
      const snap = await adminDb.collection('coupons').where('code', '==', String(code).trim().toUpperCase()).get();
      const batch = adminDb.batch();
      snap.docs.forEach(d => batch.delete(d.ref));
      await batch.commit();
    }

    return NextResponse.json({ success: true, message: 'Coupon deleted successfully' });
  } catch (err: any) {
    console.error('[admin coupons delete error]', err);
    return NextResponse.json({ error: err.message || 'Failed to delete coupon' }, { status: 500 });
  }
}
