import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
  try {
    const { checkInCode } = await req.json();

    if (!checkInCode) {
      return NextResponse.json({ error: 'Check-in code is required.' }, { status: 400 });
    }

    // Query event-registrations where checkInCode matches
    const regSnapshot = await adminDb.collection('event-registrations')
      .where('checkInCode', '==', checkInCode)
      .limit(1)
      .get();

    if (regSnapshot.empty) {
      return NextResponse.json({ error: 'Invalid or unrecognized check-in code.' }, { status: 404 });
    }

    const regDoc = regSnapshot.docs[0];
    const regData = regDoc.data();

    // Check if already attended
    if (regData.attended) {
      return NextResponse.json({ 
        error: 'Ticket already scanned.', 
        alreadyCheckedIn: true,
        attendeeName: regData.name,
        checkInTime: regData.checkInTime
      }, { status: 400 });
    }

    // Mark as attended
    const checkInTime = new Date().toISOString();
    await regDoc.ref.update({
      attended: true,
      checkInTime: checkInTime
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully checked in!',
      attendeeName: regData.name,
      attendeeType: regData.attendeeType || 'student',
      quantity: regData.quantity || 1,
      checkInTime
    });

  } catch (err: any) {
    console.error('[verify-ticket error]', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
