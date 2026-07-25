import React from 'react';

interface SchemaMarkupProps {
  type: 'Organization' | 'LocalBusiness' | 'FAQPage' | 'Article';
  data: Record<string, any>;
  settings?: any;
}

export default function SchemaMarkup({ type, data, settings }: SchemaMarkupProps) {
  let schemaData: Record<string, any> = {};

  const companyName = settings?.general?.companyName || 'Botmartz';
  const logoUrl = settings?.branding?.primaryLogo || 'https://www.botmartz.com/BotmartzNewLogo.png';
  const phone = settings?.general?.phone || '+91 94073 28842';
  const email = settings?.general?.email || 'soham@botmartz.com';
  const websiteUrl = settings?.general?.websiteUrl || 'https://www.botmartz.com';

  if (type === 'Organization') {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: companyName,
      url: websiteUrl,
      logo: logoUrl,
      sameAs: [
        'https://www.linkedin.com/in/soham-sharma/',
        'https://www.instagram.com/botmartzai_solutions/',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: phone,
        contactType: 'customer service',
        email: email,
      },
      ...data,
    };
  } else if (type === 'LocalBusiness') {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: companyName,
      image: logoUrl,
      '@id': `${websiteUrl}/#localbusiness`,
      url: websiteUrl,
      telephone: phone,
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
        '@id': `https://www.botmartz.com/insights/${data.slug}`,
      },
      headline: data.title,
      description: data.excerpt,
      image: data.featuredImage || logoUrl,
      datePublished: data.createdAt,
      dateModified: data.updatedAt || data.createdAt,
      author: {
        '@type': 'Person',
        name: data.author || 'Soham Sharma',
        url: 'https://www.linkedin.com/in/soham-sharma/',
      },
      publisher: {
        '@type': 'Organization',
        name: companyName,
        logo: {
          '@type': 'ImageObject',
          url: logoUrl,
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
