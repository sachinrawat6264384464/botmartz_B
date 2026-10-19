export default function StructuredData({ data }: { data: any }) {
  const seoData = data?.seo || {};

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.botmartz.com/#org",
    "name": "Botmartz",
    "legalName": "Botmartz AI Solutions Private Limited",
    "url": data?.general?.websiteUrl || "https://www.botmartz.com",
    "logo": data?.branding?.primaryLogo || "https://www.botmartz.com/BotmartznewBot.png",
    "description": seoData.geoEntityDescription || seoData.aeoBrandPersona || "Botmartz designs, implements, and benchmarks citation-grounded Enterprise RAG systems and deterministic AI agents in 4–6 week production pilots.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Indore",
      "addressRegion": "Madhya Pradesh",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91 97300 84626",
      "contactType": "sales",
      "email": "team@botmartz.com",
      "areaServed": "Global",
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": seoData.geoCitations ? seoData.geoCitations.split('\n').map((url: string) => url.trim()).filter(Boolean) : [
      "https://www.linkedin.com/company/botmartz-ai-solutions",
      "https://x.com/botmartz",
      "https://github.com/botmartz",
      "https://www.instagram.com/botmartzai_solutions/",
      "https://youtube.com/@botmartz"
    ],
    "knowsAbout": [
      "Enterprise RAG",
      "Deterministic AI Agents",
      "LangGraph State Machines",
      "Hybrid Vector Search (Qdrant, OpenSearch)",
      "RAGAS Benchmark Evaluation",
      "DPDPA Compliance Architecture"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
