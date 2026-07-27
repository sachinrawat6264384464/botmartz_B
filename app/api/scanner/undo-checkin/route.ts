import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
  try {
    const { registrationId, admin } = await req.json();

    if (!admin && req.headers.get('referer')?.includes('/admin')) {
      // Allowed from admin session
    } else if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!registrationId) {
      return NextResponse.json({ error: 'Registration ID is required' }, { status: 400 });
    }

    const regRef = adminDb.collection('event-registrations').doc(registrationId);
    const doc = await regRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    if (!doc.data()?.attended) {
      return NextResponse.json({ error: 'Attendee is not checked in' }, { status: 400 });
    }

    await regRef.update({
      attended: false,
      checkInTime: null
    });

    return NextResponse.json({ success: true, message: 'Check-in canceled successfully' });

  } catch (err: any) {
    console.error('[undo-checkin error]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
