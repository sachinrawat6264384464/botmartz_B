import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ 
    error: 'This endpoint has been deprecated. All payments now route through /api/events/verify-payment.' 
  }, { status: 410 });
}
