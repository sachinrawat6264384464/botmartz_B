import { MetadataRoute } from 'next';
import { adminDb } from '@/lib/firebase-admin';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.botmartz.com';

  // Static URLs – priority and changeFrequency tuned per page importance
  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/implementation`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/media-kit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/services/enterprise-rag`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/services/ai-agents`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/industries`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/partnerships`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/insights`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cookies`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const isValidSlug = (slug: any) =>
    typeof slug === 'string' && slug.length > 2 && slug !== '-' && !slug.includes('test-');

  // Dynamic Insights / Blog URLs from Firestore
  let insightUrls: MetadataRoute.Sitemap = [];
  try {
    const snapshot = await adminDb
      .collection('blog-posts')
      .where('status', '==', 'published')
      .get();

    insightUrls = snapshot.docs
      .filter((doc) => isValidSlug(doc.data().slug))
      .map((doc) => {
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

  // Flagship Focused Insights URLs (Batched roll-out for maximum authority)
  const flagshipSlugs = [
    "how-to-build-multi-million-dollar-ai-agents-with-antigravity-and-mcp"
  ];
  const flagshipUrls: MetadataRoute.Sitemap = flagshipSlugs.map(slug => ({
    url: `${baseUrl}/insights/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [
    ...staticUrls,
    ...insightUrls,
    ...flagshipUrls
  ];
}
