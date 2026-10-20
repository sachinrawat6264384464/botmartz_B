import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { error: 'Blog ID is required' },
    { status: 400 }
  );
}
