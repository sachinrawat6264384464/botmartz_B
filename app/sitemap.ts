import { MetadataRoute } from 'next';
import { adminDb } from '@/lib/firebase-admin';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://botmartz.com';

  // Static URLs – priority and changeFrequency tuned per page importance
  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/services/enterprise-rag`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/services/ai-agents`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/industries`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/industries/education`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/industries/logistics`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/industries/legal`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/work`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/insights`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/community`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/community/events`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    // AI Frontier 2026 — flagship event, highest event priority
    { url: `${baseUrl}/community/events/ai-frontier-2026`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cookies`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Dynamic Insights / Blog URLs from Firestore
  let insightUrls: MetadataRoute.Sitemap = [];
  try {
    const snapshot = await adminDb
      .collection('blog-posts')
      .where('status', '==', 'published')
      .get();

    insightUrls = snapshot.docs.map((doc) => {
      const data = doc.data();
      const lastModDate = data.updatedAt?.toDate
        ? data.updatedAt.toDate()
        : data.createdAt?.toDate
        ? data.createdAt.toDate()
        : new Date();

      return {
        url: `${baseUrl}/insights/${data.slug}`,
        lastModified: lastModDate,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      };
    });
  } catch (error) {
    console.error('Failed to generate sitemap for blog-posts:', error);
  }

  // Dynamic Events from Firestore
  let eventUrls: MetadataRoute.Sitemap = [];
  try {
    const snapshot = await adminDb
      .collection('events')
      .where('status', '==', 'upcoming')
      .get();

    eventUrls = snapshot.docs
      .filter((doc) => doc.data().slug !== 'ai-frontier-2026') // already included above
      .map((doc) => {
        const data = doc.data();
        return {
          url: `${baseUrl}/community/events/${data.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        };
      });
  } catch (error) {
    console.error('Failed to generate sitemap for events:', error);
  }

  return [...staticUrls, ...insightUrls, ...eventUrls];
}
