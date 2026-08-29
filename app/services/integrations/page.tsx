import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  Blocks,
  Server,
  Database,
  Search,
  Lock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Cpu,
  Workflow,
  Globe
} from "lucide-react";
import TrackedLink from "@/app/_components/TrackedLink";

export const metadata: Metadata = {
  title: "Enterprise AI Platforms & Integrations | Botmartz",
  description: "Implement and integrate enterprise AI platforms, search engines, and custom data connectors into your existing infrastructure without starting from scratch.",
  openGraph: {
    title: "Enterprise AI Platforms & Integrations | Botmartz",
    description: "Connect enterprise AI platforms (e.g. Glean), search backends (OpenSearch, Qdrant), and custom connectors to your existing data environment.",
    url: "https://www.botmartz.com/services/integrations",
    type: "website",
  },
  alternates: { canonical: "https://www.botmartz.com/services/integrations" },
};

const INTEGRATION_PILLARS = [
  {
    icon: Globe,
    title: "Enterprise AI Platforms (e.g. Glean)",
    desc: "Deployment, custom agent development, connector integration, adoption support, and managed optimization for workplace search and enterprise AI platforms.",
    points: [
      "Enterprise search deployment & permission mapping",
      "Custom connector development for proprietary ERPs and DBs",
      "Custom workplace agent workflows",
      "User adoption strategy & search analytics tuning",
    ],
  },
  {
    icon: Search,
    title: "Search & Retrieval Infrastructure",
    desc: "Architect and implement high-scale vector, keyword, and hybrid search backends tailored to high-volume or regulated workloads.",
    points: [
      "OpenSearch hybrid search (dense embeddings + BM25)",
      "Qdrant high-throughput vector database clustering",
      "Weaviate multi-modal schema architecture",
      "Elastic Search AI & reranking pipelines",
    ],
  },
  {
    icon: Database,
    title: "Enterprise Data Connectors",
    desc: "Secure, permission-aware data ingestion pipelines connecting document repositories, SaaS tools, and internal databases.",
    points: [
      "SharePoint, Confluence, Google Workspace ingestion",
      "Salesforce, HubSpot, Zendesk CRM connectors",
      "PostgreSQL, Snowflake, BigQuery sync pipelines",
      "Near-real-time incremental change data capture (CDC)",
    ],
  },
  {
    icon: Lock,
    title: "Private Cloud & Governance Hardening",
    desc: "Enterprise-grade security, Role-Based Access Control (RBAC), and private VPC orchestration.",
    points: [
      "AWS, Google Cloud, and Azure VPC deployments",
      "Zero data egress & client-owned key governance",
      "Audit trail logging & DPDP compliance alignment",
      "Single Sign-On (SSO / SAML / Okta) integration",
    ],
  },
];

export default function IntegrationsServicePage() {
  return (
    <div className="min-h-screen bg-[#050B14] text-white antialiased">
      
      {/* ── HERO ── */}
      <section className="relative pt-[130px] pb-[90px] overflow-hidden border-b border-white/10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0052FF]/15 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/30 text-[#00B8F0] font-mono text-xs uppercase tracking-widest mb-6 font-semibold">
            <Sparkles size={13} /> Platform Implementation &amp; Integration
          </div>

          <h1 className="text-[clamp(36px,5vw,60px)] font-bold font-heading tracking-tight leading-[1.1] max-w-4xl mb-6">
            AI That Works With Your <br />
            <span className="bg-gradient-to-r from-[#00B8F0] via-[#0066FF] to-[#60A5FA] bg-clip-text text-transparent">
              Existing Systems.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#8A9EB0] max-w-3xl leading-relaxed mb-10">
            We integrate established enterprise AI platforms, high-performance search engines, foundation models, and custom data connectors directly into your existing enterprise infrastructure with complete security governance.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <TrackedLink
              href="/contact?type=platform-integration"
              eventName="button_click"
              eventData={{ button_name: "integrations_hero_discuss_project" }}
              className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-all shadow-[0_4px_20px_rgba(0,102,255,0.4)]"
            >
              Discuss a Platform Integration <ArrowRight className="w-4 h-4" />
            </TrackedLink>
            <TrackedLink
              href="/implementation"
              eventName="button_click"
              eventData={{ button_name: "integrations_hero_view_lifecycle" }}
              className="inline-flex items-center gap-2 border border-slate-700 text-white hover:border-[#00B8F0] hover:text-[#00B8F0] px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-all hover:bg-white/5"
            >
              Implementation Lifecycle ↓
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section className="py-24 bg-[#070E1B] relative border-b border-white/10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="font-mono text-xs tracking-[0.14em] text-[#00B8F0] uppercase mb-3 font-semibold">
              INTEGRATION SPHERES
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4 text-white">
              End-to-End Enterprise Stack Integration
            </h2>
            <p className="text-[#8A9EB0] text-base sm:text-lg">
              We bridge the gap between platform technologies, internal data silos, and end-user workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INTEGRATION_PILLARS.map((pillar, i) => (
              <div
                key={i}
                className="bg-[#0B1524]/90 border border-white/10 rounded-2xl p-8 hover:border-[#00B8F0]/40 transition-all duration-300 shadow-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0066FF]/15 border border-[#0066FF]/30 text-[#00B8F0] flex items-center justify-center mb-6">
                  <pillar.icon size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#8A9EB0] leading-relaxed mb-6">
                  {pillar.desc}
                </p>
                <ul className="space-y-2.5 pt-4 border-t border-white/10">
                  {pillar.points.map((pt, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 size={13} className="text-[#00B8F0] shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#050B14] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-white mb-4">
            Connect AI to Your Existing Enterprise Stack
          </h2>
          <p className="text-base text-[#8A9EB0] mb-8 leading-relaxed">
            Let's discuss how we can implement and integrate enterprise AI platforms, search engines, or custom connectors without disrupting day-to-day operations.
          </p>
          <TrackedLink
            href="/contact?type=platform-integration"
            eventName="button_click"
            eventData={{ button_name: "integrations_bottom_book_review" }}
            className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm px-8 py-4 rounded-xl shadow-[0_4px_20px_rgba(0,102,255,0.4)] transition-all"
          >
            Book an Architecture Review <ArrowRight size={16} />
          </TrackedLink>
        </div>
      </section>

    </div>
  );
}
