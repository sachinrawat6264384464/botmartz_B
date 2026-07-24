import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');
    const password = url.searchParams.get('password');

    if (email !== 'botmartz@gmail.com' || password !== 'Admin@2026##') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all paid attendees
    const snapshot = await adminDb.collection('event-registrations')
      .where('paymentStatus', '==', 'paid')
      .get();

    const attendees = snapshot.docs.map(doc => {
      const data = doc.data();
      const createdAt = data.createdAt ? (typeof data.createdAt.toMillis === 'function' ? data.createdAt.toMillis() : new Date(data.createdAt).getTime()) : 0;
      
      return {
        id: doc.id,
        name: data.name || 'Unknown',
        email: data.email || '',
        attendeeType: data.attendeeType || 'student',
        quantity: data.quantity || 1,
        attended: data.attended || false,
        checkInCode: data.checkInCode || '',
        createdAt,
      };
    }).sort((a, b) => b.createdAt - a.createdAt);

    return NextResponse.json({ success: true, attendees });

  } catch (err: any) {
    console.error('[list-attendees error]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
