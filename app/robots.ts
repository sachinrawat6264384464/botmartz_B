import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/llms.txt',
          '/llms-full.txt',
        ],
        disallow: [
          '/admin',
          '/admin/*',
          '/api/*',
          '/careers',
          '/careers/*',
          '/insights/updates',
          '/write-access',
          '/write-for-us',
          '/event-desk',
        ],
      },
      {
        // Explicitly invite major AI answer engines and LLM crawlers to ingest llms.txt and llms-full.txt
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Anthropic-AI', 'cohere-ai'],
        allow: [
          '/',
          '/llms.txt',
          '/llms-full.txt',
        ],
        disallow: [
          '/admin',
          '/admin/*',
          '/api/*',
          '/careers',
          '/careers/*',
          '/insights/updates',
          '/write-access',
          '/write-for-us',
          '/event-desk',
        ],
      }
    ],
    sitemap: 'https://www.botmartz.com/sitemap.xml',
  };
}
