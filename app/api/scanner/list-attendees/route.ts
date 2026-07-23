import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const pin = url.searchParams.get('pin');

    if (pin !== '2026') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all paid attendees
    const snapshot = await adminDb.collection('event-registrations')
      .where('paymentStatus', '==', 'paid')
      .get();

    const attendees = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || 'Unknown',
        email: data.email || '',
        attendeeType: data.attendeeType || 'student',
        quantity: data.quantity || 1,
        attended: data.attended || false,
        checkInCode: data.checkInCode || '',
        createdAt: data.createdAt ? data.createdAt.toMillis() : 0,
      };
    }).sort((a, b) => b.createdAt - a.createdAt);

    return NextResponse.json({ success: true, attendees });

  } catch (err: any) {
    console.error('[list-attendees error]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
