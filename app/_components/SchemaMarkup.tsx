import React from 'react';

interface SchemaMarkupProps {
  type: 'Organization' | 'LocalBusiness' | 'FAQPage' | 'Article';
  data: Record<string, any>;
}

export default function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  let schemaData: Record<string, any> = {};

  if (type === 'Organization') {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Botmartz',
      url: 'https://botmartz.com',
      logo: 'https://botmartz.com/BotmartzNewLogo.png',
      sameAs: [
        'https://www.linkedin.com/in/soham-sharma/',
        'https://www.instagram.com/botmartzai_solutions/',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91 94073 28842',
        contactType: 'customer service',
        email: 'soham@botmartz.com',
      },
      ...data,
    };
  } else if (type === 'LocalBusiness') {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Botmartz AI Solutions',
      image: 'https://botmartz.com/BotmartzNewLogo.png',
      '@id': 'https://botmartz.com/#localbusiness',
      url: 'https://botmartz.com',
      telephone: '+91 94073 28842',
      priceRange: '$$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Indore Bypass',
        addressLocality: 'Indore',
        addressRegion: 'MP',
        postalCode: '452016',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 22.7196,
        longitude: 75.8577,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        opens: '09:00',
        closes: '19:00'
      },
      ...data,
    };
  } else if (type === 'FAQPage') {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faqs.map((faq: { q: string; a: string }) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    };
  } else if (type === 'Article') {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://botmartz.com/blog/${data.slug}`,
      },
      headline: data.title,
      description: data.excerpt,
      image: data.featuredImage || 'https://botmartz.com/BotmartzNewLogo.png',
      datePublished: data.createdAt,
      dateModified: data.updatedAt || data.createdAt,
      author: {
        '@type': 'Person',
        name: data.author || 'Soham Sharma',
        url: 'https://www.linkedin.com/in/soham-sharma/',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Botmartz',
        logo: {
          '@type': 'ImageObject',
          url: 'https://botmartz.com/BotmartzNewLogo.png',
        },
      },
      ...data.extra,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
