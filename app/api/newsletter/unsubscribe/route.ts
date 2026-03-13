import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, updateDoc, serverTimestamp } from 'firebase/firestore';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token) {
    return new NextResponse('Invalid link.', { status: 400 });
  }

  try {
    const email = Buffer.from(token, 'base64').toString('utf-8');
    const q = query(collection(db, 'newsletter'), where('email', '==', email));
    const snap = await getDocs(q);

    if (snap.empty) {
      return new NextResponse('Subscriber not found.', { status: 404 });
    }

    await updateDoc(snap.docs[0].ref, {
      status: 'unsubscribed',
      unsubscribedAt: serverTimestamp(),
    });

    return new NextResponse(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Unsubscribed</title>
      <style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#fafafa;}
      .box{text-align:center;padding:40px;background:#fff;border-radius:12px;border:1px solid #e4e4e7;max-width:400px;}
      h1{font-size:24px;color:#09090b;margin-bottom:8px;}p{color:#71717a;font-size:14px;}</style>
      </head><body><div class="box"><h1>Unsubscribed</h1>
      <p>You've been removed from Botmartz newsletter. You won't receive any more emails.</p>
      </div></body></html>`,
      { status: 200, headers: { 'Content-Type': 'text/html' } }
    );
  } catch (err) {
    console.error('[newsletter/unsubscribe]', err);
    return new NextResponse('Something went wrong.', { status: 500 });
  }
}
