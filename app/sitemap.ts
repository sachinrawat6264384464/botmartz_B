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
    { url: `${baseUrl}/industries/healthcare`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/work`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/work/case-studies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/work/labs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/careers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/partnerships`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/insights`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/community`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/community/events`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    // AI Frontier 2026 — flagship event, highest event priority
    { url: `${baseUrl}/community/events/ai-frontier-2026`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
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

  // Static Fallback Blog URLs
  const staticBlogSlugs = [
    "building-a-scalable-enterprise-rag-system-architecture-components-best-practices",
    "inside-ai-agents-from-reasoning-to-real-world-action",
    "microservices-vs-monolith-for-ai-systems-what-we-learned",
    "observability-for-llm-applications-metrics-that-matter",
    "advanced-rag-techniques-hybrid-search-reranking-query-rewriting",
    "build-an-ai-chatbot-with-langgraph-and-openai-step-by-step",
    "open-source-projects-from-botmartz-labs-you-should-know",
    "prompt-engineering-patterns-that-actually-work-in-production",
    "how-we-built-a-legal-document-intelligence-system-for-100k-docs"
  ];
  const staticBlogUrls: MetadataRoute.Sitemap = staticBlogSlugs.map(slug => ({
    url: `${baseUrl}/insights/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic Case Studies from Firestore
  let caseStudyUrls: MetadataRoute.Sitemap = [];
  try {
    const snapshot = await adminDb
      .collection('case-studies')
      .where('status', '==', 'published')
      .get();

    caseStudyUrls = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        url: `${baseUrl}/work/case-studies/${data.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.75,
      };
    });
  } catch (error) {
    console.error('Failed to generate sitemap for case-studies:', error);
  }

  // Static Fallback Case Studies
  const staticCaseStudiesSlugs = [
    "logistics-rag",
    "saas-support",
    "legal-doc-intel",
    "logistics-planner",
    "ai-course-assistant-for-edtech-platform",
    "route-optimization-agent-for-fleet-ops",
    "clinical-documentation-copilot",
    "enterprise-rag-for-support-teams",
    "warehouse-vision-inspection",
    "patient-intake-voice-agent"
  ];
  const staticCaseStudyUrls: MetadataRoute.Sitemap = staticCaseStudiesSlugs.map(slug => ({
    url: `${baseUrl}/work/case-studies/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

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

  return [
    ...staticUrls,
    ...insightUrls,
    ...staticBlogUrls,
    ...caseStudyUrls,
    ...staticCaseStudyUrls,
    ...eventUrls
  ];
}
