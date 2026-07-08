import { MetadataRoute } from 'next';
import { adminDb } from '@/lib/firebase-admin';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://botmartz.com';

  // Static URLs
  const staticUrls = [
    '',
    '/about',
    '/contact',
    '/services',
    '/services/ai-solutions',
    '/services/web-development',
    '/blog',
    '/privacy',
    '/terms',
    '/cookies',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic Blog URLs from Firestore (Server-side fetch using Firebase Admin SDK)
  let blogUrls: any[] = [];
  try {
    const snapshot = await adminDb
      .collection('blog-posts')
      .where('status', '==', 'published')
      .get();

    blogUrls = snapshot.docs.map((doc) => {
      const data = doc.data();
      const lastModDate = data.updatedAt?.toDate
        ? data.updatedAt.toDate()
        : data.createdAt?.toDate
        ? data.createdAt.toDate()
        : new Date();

      return {
        url: `${baseUrl}/blog/${data.slug}`,
        lastModified: lastModDate,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      };
    });
  } catch (error) {
    console.error('Failed to generate sitemap for blog-posts:', error);
  }

  return [...staticUrls, ...blogUrls];
}
