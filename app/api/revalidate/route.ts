import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const { tag } = await request.json();

    if (!tag) {
      return NextResponse.json({ error: 'Missing tag param' }, { status: 400 });
    }

    (revalidateTag as any)(tag);
    return NextResponse.json({ revalidated: true, tag, now: Date.now() });
  } catch (err: any) {
    return NextResponse.json({ error: 'Error revalidating', message: err.message }, { status: 500 });
  }
}
