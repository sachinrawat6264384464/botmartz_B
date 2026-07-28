import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');
    const password = url.searchParams.get('password');

    // Allow admin panel or verified credentials
    const isAdmin = url.searchParams.get('admin') === 'true' || (email === 'botmartz@gmail.com' && password === 'Admin@2026##');
    
    if (!isAdmin && email !== 'botmartz@gmail.com') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all event attendees
    const snapshot = await adminDb.collection('event-registrations').get();

    const attendees = snapshot.docs.map(doc => {
      const data = doc.data();
      const createdAt = data.createdAt ? (typeof data.createdAt.toMillis === 'function' ? data.createdAt.toMillis() : new Date(data.createdAt).getTime()) : 0;
      
      return {
        id: doc.id,
        name: data.name || 'Unknown',
        email: data.email || '',
        phone: data.phone || '',
        attendeeType: data.attendeeType || 'student',
        company: data.company || data.companyName || '',
        role: data.role || data.designation || '',
        collegeName: data.collegeName || '',
        degree: data.degree || '',
        quantity: data.quantity || 1,
        paymentStatus: data.paymentStatus || 'paid',
        attended: data.attended || false,
        checkInTime: data.checkInTime || null,
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
