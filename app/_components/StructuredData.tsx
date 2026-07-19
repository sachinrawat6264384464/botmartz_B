export default function StructuredData({ data }: { data: any }) {
  const seoData = data?.seo || {};

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": data?.general?.companyName || "Botmartz AI Solutions",
    "url": data?.general?.websiteUrl || "https://www.botmartz.com",
    "logo": data?.branding?.primaryLogo || "https://www.botmartz.com/BotmartznewBot.png",
    "description": seoData.geoEntityDescription || seoData.aeoBrandPersona || "Botmartz helps organizations design, build, and deploy Enterprise RAG systems and AI Agents.",
    "sameAs": seoData.geoCitations ? seoData.geoCitations.split('\n').map((url: string) => url.trim()).filter(Boolean) : [
      "https://www.linkedin.com/in/soham-sharma/"
    ],
    "knowsAbout": seoData.aeoKnowledgeContext ? seoData.aeoKnowledgeContext.split('\n').map((k: string) => k.trim()).filter(Boolean) : [
      "AI Engineering",
      "Enterprise RAG",
      "AI Agents",
      "Production AI"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
