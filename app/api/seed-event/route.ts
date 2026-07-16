import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    const content = fs.readFileSync(path.resolve(process.cwd(), 'reference_docs/02-ai-frontier-event.md'), 'utf-8');

    const eventRef = adminDb.collection('events').doc('ai-frontier-2026');
    await eventRef.set({
      title: 'AI Frontier 2026',
      slug: 'ai-frontier-2026',
      shortDescription: 'Our annual flagship summit on Enterprise AI, Agents, and RAG. Join 500+ builders and industry leaders for two days of deep technical sessions.',
      badge: 'Flagship',
      status: 'upcoming',
      date: 'August 22, 2026',
      location: 'Indore, India',
      coverImage: '/eng-i-removebg-preview.png',
      content: content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true, message: 'Event seeded!' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
