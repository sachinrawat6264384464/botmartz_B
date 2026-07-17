import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { adminDb } from '@/lib/firebase-admin';
import InsightsDetailClient from './InsightsDetailClient';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let post: any = null;
  
  try {
    const querySnapshot = await adminDb.collection("blog-posts")
      .where("slug", "==", slug)
      .limit(1)
      .get();
      
    if (!querySnapshot.empty) {
      post = querySnapshot.docs[0].data();
    }
  } catch (e) {
    console.error("Error generating metadata for blog post:", e);
  }
  
  if (!post) {
    return {
      title: "Insight | Botmartz",
      description: "Explore engineering insights and AI research from Botmartz.",
    };
  }
  
  return {
    title: `${post.title} | Botmartz AI Insights`,
    description: post.excerpt || `Read our latest insight article about ${post.title}.`,
    openGraph: {
      title: `${post.title} | Botmartz AI Insights`,
      description: post.excerpt || `Read our latest insight article about ${post.title}.`,
      url: `https://botmartz.com/insights/${slug}`,
      type: "article",
    }
  };
}

export default async function InsightsDetailPage({ params }: Props) {
  const { slug } = await params;
  let post: any = null;
  let postId: string = "";
  
  try {
    const querySnapshot = await adminDb.collection("blog-posts")
      .where("slug", "==", slug)
      .limit(1)
      .get();
      
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      post = doc.data();
      postId = doc.id;
    }
  } catch (e) {
    console.error("Error fetching blog post:", e);
  }
  
  if (!post) {
    notFound();
  }
  
  // Fetch related articles (limit 3, other published blog posts in same category or general)
  let related: any[] = [];
  try {
    const relatedSnapshot = await adminDb.collection("blog-posts")
      .where("status", "==", "published")
      .limit(4)
      .get();
      
    related = relatedSnapshot.docs
      .map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "",
          slug: data.slug || "",
          category: data.category || "Technology",
          author: data.author || "AI Team",
          readTime: data.readTime || 5
        };
      })
      .filter(p => p.slug !== slug)
      .slice(0, 3);
  } catch (err) {
    console.error("Error fetching related posts:", err);
  }

  const formatTimestamp = (ts: any) => {
    if (!ts) return null;
    if (typeof ts.toDate === 'function') {
      return new Date(ts.toDate()).toISOString();
    }
    return new Date(ts).toISOString();
  };

  const sanitizedPost = JSON.parse(JSON.stringify({
    id: postId,
    ...post,
    createdAt: formatTimestamp(post.createdAt),
    updatedAt: formatTimestamp(post.updatedAt),
  }));

  const sanitizedRelated = JSON.parse(JSON.stringify(related));
  
  return <InsightsDetailClient post={sanitizedPost} initialRelated={sanitizedRelated} />;
}
