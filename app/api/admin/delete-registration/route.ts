import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Registration ID is required' }, { status: 400 });
    }

    await adminDb.collection('bootcamp_registrations').doc(id).delete();
    return NextResponse.json({ success: true, message: 'Registration deleted successfully' });

  } catch (err: any) {
    console.error('[delete-registration error]', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
