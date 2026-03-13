import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    // Check for duplicate
    const existing = await getDocs(
      query(collection(db, 'newsletter'), where('email', '==', email.toLowerCase()))
    );

    if (!existing.empty) {
      const sub = existing.docs[0].data();
      if (sub.status === 'active') {
        return NextResponse.json({ error: 'Already subscribed.' }, { status: 409 });
      }
      // Re-subscribe if previously unsubscribed
      await updateDoc(existing.docs[0].ref, { status: 'active', resubscribedAt: serverTimestamp() });
      return NextResponse.json({ success: true, resubscribed: true });
    }

    await addDoc(collection(db, 'newsletter'), {
      email: email.toLowerCase(),
      name: name?.trim() || '',
      status: 'active',
      source: 'website',
      subscribedAt: serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[newsletter/subscribe]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
