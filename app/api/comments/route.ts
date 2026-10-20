import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

const escapeHTML = (str: string) =>
  str.replace(/[&<>'"]/g, (tag) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { blogId, researchId, authorName, authorEmail, content } = body;

    // Must have either blogId or researchId
    if ((!blogId && !researchId) || !authorName || !authorEmail || !content) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    let blogTitle = '';
    let blogSlug = '';
    if (blogId) {
      if (typeof blogId !== 'string') {
        return NextResponse.json({ error: 'Invalid blogId format' }, { status: 400 });
      }
      
      const blogSnap = await adminDb.collection('blog-posts').doc(blogId).get();
      if (!blogSnap.exists) {
        return NextResponse.json(
          { error: 'Blog not found' },
          { status: 404 }
        );
      }
      blogTitle = blogSnap.data()?.title || '';
      blogSlug = blogSnap.data()?.slug || '';
    }

    // Strict check to block scripts entirely as per pentest report
    if (/<script|javascript:|on\w+=/i.test(content) || /<iframe/i.test(content)) {
      return NextResponse.json(
        { error: 'Invalid or malicious content detected' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(authorEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (content.length < 5 || content.length > 1000) {
      return NextResponse.json(
        { error: 'Comment must be between 5 and 1000 characters' },
        { status: 400 }
      );
    }

    const commentData: any = {
      authorName: escapeHTML(authorName.trim()),
      authorEmail: authorEmail.toLowerCase().trim(),
      content: escapeHTML(content.trim()),
      status: 'pending',
      createdAt: FieldValue.serverTimestamp(),
      ipAddress: request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    };

    // Add either blogId or researchId (plus denormalized title/slug for admin display)
    if (blogId) {
      commentData.blogId = blogId;
      commentData.blogTitle = blogTitle;
      commentData.blogSlug = blogSlug;
    } else {
      commentData.researchId = researchId;
    }

    const docRef = await adminDb.collection('comments').add(commentData);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Comment submitted for approval',
        id: docRef.id 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Error submitting comment:', error);
    return NextResponse.json(
      { error: 'Failed to submit comment' },
      { status: 500 }
    );
  }
}