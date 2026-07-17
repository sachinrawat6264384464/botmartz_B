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
      }
    ],
    sitemap: 'https://botmartz.com/sitemap.xml',
  };
}
