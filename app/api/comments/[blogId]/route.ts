import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, getDocs, limit as firestoreLimit } from 'firebase/firestore';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ blogId: string }> }
) {
  try {
    const { blogId } = await params;
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const pageLimit = parseInt(searchParams.get('limit') || '5');

    const commentsRef = collection(db, 'comments');
    
    // Fetch approved comments without composite index requirement
    const q = query(
      commentsRef,
      where('blogId', '==', blogId),
      where('status', '==', 'approved')
    );

    const querySnapshot = await getDocs(q);
    
    // Get all comments and sort in memory by createdAt descending
    const allComments = querySnapshot.docs
      .map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || (typeof data.createdAt === 'string' ? data.createdAt : new Date().toISOString()),
        };
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Manual pagination
    const total = allComments.length;
    const startIndex = (page - 1) * pageLimit;
    const endIndex = startIndex + pageLimit;
    const paginatedComments = allComments.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      comments: paginatedComments,
      total,
      page,
      totalPages: Math.ceil(total / pageLimit),
    });

  } catch (error: any) {
    console.error('Error fetching comments:', error);
    
    // Check if it's a missing index error
    if (error.code === 'failed-precondition' || error.message?.includes('index')) {
      return NextResponse.json(
        { 
          error: 'Database index required. Please create the index in Firebase Console.',
          indexUrl: error.message?.match(/https:\/\/[^\s]+/)?.[0]
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch comments', details: error.message },
      { status: 500 }
    );
  }
}
