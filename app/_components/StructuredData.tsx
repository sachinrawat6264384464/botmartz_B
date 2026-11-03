export default function StructuredData({ data }: { data: any }) {
  const seoData = data?.seo || {};

  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.botmartz.com/#org",
    "name": "Botmartz",
    "legalName": "Botmartz AI Solutions Private Limited",
    "url": data?.general?.websiteUrl || "https://www.botmartz.com",
    "logo": data?.branding?.primaryLogo || "https://www.botmartz.com/BotmartznewBot.png",
    "description": seoData.geoEntityDescription || seoData.aeoBrandPersona || "Botmartz designs, implements, and benchmarks citation-grounded Enterprise RAG systems and deterministic AI agents in production pilots.",
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
      "Enterprise RAG Systems",
      "Custom Enterprise RAG Development",
      "Deterministic Multi-Agent Systems",
      "LangGraph Production Development",
      "Hybrid Search (Lucene BM25 + pgvector/Qdrant)",
      "Reciprocal Rank Fusion (RRF Constant k=60)",
      "Cross-Encoder Neural Reranking (BGE-Reranker-Large)",
      "Cryptographic Citation Grounding (SHA-256)",
      "Private VPC Zero-Data-Retention Deployments",
      "Zero Hallucination Document Retrieval",
      "Legal RAG & Contract Clause Citation Search",
      "Aerospace Technical Manual AI & AMM Retrieval",
      "Commercial Insurance Endorsement Verification AI"
    ]
  };

  const jsonLdSoftwareService = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.botmartz.com/#software",
    "name": "Botmartz Enterprise RAG & Deterministic Agent Engine",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Cloud-Native, Linux, Kubernetes, Private VPC (AWS, GCP, Azure)",
    "description": "Production AI engineering platform combining two-stage hybrid retrieval (BM25 + Dense ANN), Reciprocal Rank Fusion, Cross-Encoder reranking, and deterministic LangGraph agent orchestration with 100% token-exact citation grounding.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Technical Discovery & Architecture Audit"
    },
    "featureList": [
      "Two-Stage Hybrid Search (BM25 Lexical + Dense ANN Traversal)",
      "Reciprocal Rank Fusion (RRF Constant k=60)",
      "Cross-Encoder Neural Reranking (BGE Large)",
      "AST Structural Document Layout Parsing",
      "Cryptographic SHA-256 Verbatim Citation Tracking",
      "Deterministic LangGraph Cyclical State Machines",
      "Postgres WAL State Persistence & Checkpointing",
      "Human-in-the-Loop Review Pause Gates for ERP/CRM Mutations",
      "Private Dedicated VPC Deployments (Zero Telemetry Leakage)"
    ]
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the difference between generic RAG and Botmartz Enterprise RAG?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Generic RAG relies on naive, fixed-size token chunking and single-stream vector similarity search, which often hallucinates or confuses specific alphanumeric part numbers. Botmartz engineers a Two-Stage Hybrid Retrieval pipeline: Lucene BM25 sparse search runs in parallel with dense vector similarity, merged via Reciprocal Rank Fusion (RRF k=60) and re-scored with a Cross-Encoder reranker. Every statement is cryptographically anchored to verbatim source spans with SHA-256 chunk hashes."
        }
      },
      {
        "@type": "Question",
        "name": "How does Botmartz prevent unauthorized database mutations in AI agents?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We engineer agents using deterministic LangGraph cyclical state machines with Postgres WAL checkpointing. Routine analytical queries execute automatically, while high-stakes state-changing ERP or CRM actions are routed through strict Human-in-the-Loop review gates requiring 1-click human authorization."
        }
      },
      {
        "@type": "Question",
        "name": "Is client data kept private and excluded from model training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Botmartz systems deploy within your private enterprise perimeter (AWS, GCP, Azure VPC, or on-premise hardware). We operate under strict zero-data-retention contracts; client proprietary data is never transmitted to public model providers or used for foundation model training."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftwareService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
    </>
  );
}
