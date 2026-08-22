import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, score, totalQuestions = 15, timeTaken } = body;

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: 'Email address is required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = (name || '').trim() || 'Anonymous Challenger';
    const numScore = Number(score) || 0;
    const numTime = Number(timeTaken) || 0;

    const scoresRef = adminDb.collection('quiz-scores');

    // Check for duplicate attempt by email
    const existingSnap = await scoresRef.where('email', '==', cleanEmail).limit(1).get();
    if (!existingSnap.empty) {
      return NextResponse.json(
        { error: 'You have already completed the AI Challenge! Only 1 entry per email address is allowed.' },
        { status: 400 }
      );
    }

    // Save to quiz-scores collection
    const docRef = await scoresRef.add({
      name: cleanName,
      email: cleanEmail,
      score: numScore,
      totalQuestions: Number(totalQuestions) || 15,
      timeTaken: numTime,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: 'Quiz score submitted successfully!',
    });
  } catch (err: any) {
    console.error('Failed to submit quiz score:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to submit quiz score.' },
      { status: 500 }
    );
  }
}
