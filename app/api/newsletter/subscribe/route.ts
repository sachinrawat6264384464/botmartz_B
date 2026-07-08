import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check for duplicate
    const snapshot = await adminDb
      .collection('newsletter')
      .where('email', '==', normalizedEmail)
      .limit(1)
      .get();

    if (!snapshot.empty) {
      const sub = snapshot.docs[0].data();
      if (sub.status === 'active') {
        return NextResponse.json({ error: 'Already subscribed.' }, { status: 409 });
      }
      // Re-subscribe if previously unsubscribed
      await snapshot.docs[0].ref.update({
        status: 'active',
        resubscribedAt: FieldValue.serverTimestamp(),
      });
      return NextResponse.json({ success: true, resubscribed: true });
    }

    // New subscriber
    await adminDb.collection('newsletter').add({
      email: normalizedEmail,
      name: name?.trim() || '',
      status: 'active',
      source: 'website',
      subscribedAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[newsletter/subscribe] ERROR:', err?.message || err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
