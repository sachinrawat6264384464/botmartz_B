import { MetadataRoute } from 'next';
import { adminDb } from '@/lib/firebase-admin';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.botmartz.com';

  // Static URLs – priority tuned per consolidated architecture
  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/services/enterprise-rag`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/services/ai-agents`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/work`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/glossary`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/insights`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cookies`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    // Core Glossary Concept Pages
    { url: `${baseUrl}/glossary/retrieval-augmented-generation`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/glossary/hybrid-search`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/glossary/reciprocal-rank-fusion`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/glossary/ai-agent`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/glossary/vector-database`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/glossary/embeddings`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/glossary/reranking`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/glossary/rag-evaluation`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/glossary/prompt-injection`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/glossary/human-in-the-loop`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/glossary/bm25`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/glossary/large-language-model`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    // Core Glossary Category Hubs
    { url: `${baseUrl}/glossary/categories/rag-retrieval`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/glossary/categories/search-information-retrieval`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/glossary/categories/ai-agents`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/glossary/categories/evaluation-observability`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/glossary/categories/ai-security`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
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
      .map((doc) => {
        const data = doc.data();
        const slug = data.slug;
        if (!isValidSlug(slug)) return null;

        let lastMod = new Date();
        if (data.updatedAt?.toDate) {
          lastMod = data.updatedAt.toDate();
        } else if (data.createdAt?.toDate) {
          lastMod = data.createdAt.toDate();
        }

        return {
          url: `${baseUrl}/insights/${slug}`,
          lastModified: lastMod,
          changeFrequency: 'monthly' as const,
          priority: 0.75,
        };
      })
      .filter(Boolean) as MetadataRoute.Sitemap;
  } catch (err) {
    console.error('Error fetching blog posts for sitemap:', err);
  }

  return [...staticUrls, ...insightUrls];
}
