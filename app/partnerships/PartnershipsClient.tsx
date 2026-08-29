"use client";

import React, { useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  Globe,
  Search,
  Database,
  Cloud,
  Cpu,
  Layers,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Workflow,
  Server,
  Terminal,
  FileCheck,
  Building2
} from "lucide-react";
import TrackedLink from "@/app/_components/TrackedLink";

const ECOSYSTEM_SPHERES = [
  {
    category: "Enterprise AI Platforms",
    badge: "Platform Implementation",
    tagline: "Turnkey workplace search and AI knowledge platforms",
    desc: "We help organizations deploy, customize, and drive adoption for enterprise AI platforms. We develop custom data connectors, build tailored workplace agents, and provide ongoing managed optimization.",
    platforms: [
      { name: "Glean Partner Network Pathway", role: "Implementation, custom agents, connectors, adoption, and managed optimization" },
      { name: "Enterprise Workplace AI", role: "Permission mapping, enterprise RBAC integration, and user adoption tuning" }
    ],
  },
  {
    category: "Search & Retrieval Infrastructure",
    badge: "Vector & Hybrid Search",
    tagline: "High-scale retrieval engines & vector databases",
    desc: "We architect, tune, and operate hybrid search backends across open-source and commercial vector engines based on client scalability, latency, and compliance requirements.",
    platforms: [
      { name: "OpenSearch", role: "Hybrid vector + BM25 indexing, Reciprocal Rank Fusion, solutions provider ecosystem" },
      { name: "Qdrant", role: "Production RAG, high-throughput vector search architecture, filtering at scale" },
      { name: "Weaviate", role: "Multi-modal vector search schemas, hybrid retrieval, enterprise knowledge graphs" },
      { name: "Elastic Search AI", role: "Enterprise search, retrieval infrastructure, and observability integration" },
    ],
  },
  {
    category: "Cloud & Data Infrastructure",
    badge: "Cloud Foundations",
    tagline: "Private VPC and enterprise cloud deployment",
    desc: "We deploy production AI workloads securely within your existing cloud perimeter, ensuring zero external data leakage and full compliance.",
    platforms: [
      { name: "Amazon Web Services (AWS)", role: "Bedrock, OpenSearch Service, ECS/EKS, private VPC architecture" },
      { name: "Google Cloud Platform (GCP)", role: "Vertex AI, Google ADK, BigQuery integration, private endpoints" },
      { name: "Microsoft Azure Cloud", role: "Azure OpenAI Service, Cognitive Search, secure enterprise tenants" },
    ],
  },
  {
    category: "Foundation Models & State Frameworks",
    badge: "Intelligence Layer",
    tagline: "Model orchestration and deterministic execution",
    desc: "We orchestrate leading commercial and open-weight language models with state machine frameworks for controlled execution.",
    platforms: [
      { name: "Model Providers", role: "Anthropic Claude 3.5, OpenAI GPT-4o, Google Gemini 2.5, Open-Weights" },
      { name: "State Frameworks", role: "LangGraph state machines, LlamaIndex RAG pipelines, Pydantic data validation" },
    ],
  },
];

const COLLABORATION_MODELS = [
  {
    title: "Platform Vendor Co-Delivery",
    desc: "We act as the specialized technical implementation partner for enterprise software companies, deploying their platforms for end-clients with custom connectors and tailored agents.",
  },
  {
    title: "Consultancy & SI Teaming",
    desc: "We partner with global management consultancies and systems integrators providing specialized RAG, vector search, and agentic engineering depth for complex enterprise client engagements.",
  },
  {
    title: "Client-Driven Architecture",
    desc: "We evaluate the client's existing enterprise software landscape (Glean, OpenSearch, AWS, Azure) and architect the solution around their chosen stack rather than forcing a proprietary platform.",
  },
];

export default function PartnershipsClient({
  heroContent,
  structuredData,
}: {
  heroContent?: any;
  structuredData?: string;
}) {
  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    website: "",
    partnerCategory: "Enterprise AI Platform Vendor",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyName || !form.contactPerson || !form.email) {
      setErrorMsg("Please fill in required fields.");
      return;
    }
    setSubmitting(true);
    setErrorMsg("");
    try {
      await addDoc(collection(db, "partnership_inquiries"), {
        ...form,
        status: "new",
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
      setForm({
        companyName: "",
        contactPerson: "",
        email: "",
        website: "",
        partnerCategory: "Enterprise AI Platform Vendor",
        message: "",
      });
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to submit inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050B14] text-white antialiased">
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      )}

      {/* ── 1. HERO SECTION ── */}
      <section className="relative pt-[130px] pb-[90px] overflow-hidden border-b border-white/10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0052FF]/15 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/30 text-[#00B8F0] font-mono text-xs uppercase tracking-widest mb-6 font-semibold">
            <Sparkles size={13} /> Enterprise AI Ecosystem
          </div>

          <h1 className="text-[clamp(36px,5vw,60px)] font-bold font-heading tracking-tight leading-[1.1] max-w-4xl mb-6">
            We Work Across the <br />
            <span className="bg-gradient-to-r from-[#00B8F0] via-[#0066FF] to-[#60A5FA] bg-clip-text text-transparent">
              Modern AI Ecosystem.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#8A9EB0] max-w-3xl leading-relaxed mb-10">
            We design solutions around client requirements rather than forcing every problem into a single technology stack. We partner and integrate across leading enterprise AI platforms, search engines, vector databases, and cloud providers.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <a
              href="#partner-inquiry"
              className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-all shadow-[0_4px_20px_rgba(0,102,255,0.4)]"
            >
              Discuss a Partnership <ArrowRight className="w-4 h-4" />
            </a>
            <TrackedLink
              href="/implementation"
              eventName="button_click"
              eventData={{ button_name: "partners_view_implementation" }}
              className="inline-flex items-center gap-2 border border-slate-700 text-white hover:border-[#00B8F0] hover:text-[#00B8F0] px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-all hover:bg-white/5"
            >
              Our Implementation Model ↓
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ── 2. ECOSYSTEM SPHERES ── */}
      <section className="py-24 bg-[#070E1B] relative border-b border-white/10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="font-mono text-xs tracking-[0.14em] text-[#00B8F0] uppercase mb-3 font-semibold">
              TECHNOLOGY STACK COVERAGE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4 text-white">
              The 4 Technology Integration Spheres
            </h2>
            <p className="text-[#8A9EB0] text-base sm:text-lg">
              How we match client requirements to proven enterprise platforms and retrieval architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ECOSYSTEM_SPHERES.map((sphere, idx) => (
              <div
                key={idx}
                className="bg-[#0B1524]/90 border border-white/10 rounded-3xl p-8 hover:border-[#00B8F0]/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-[#0066FF]/15 border border-[#0066FF]/30 text-[#60A5FA] font-mono text-xs uppercase tracking-wider mb-4">
                    {sphere.badge}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {sphere.category}
                  </h3>
                  <div className="text-xs font-mono text-[#00B8F0] mb-4">
                    {sphere.tagline}
                  </div>
                  <p className="text-sm text-[#8A9EB0] leading-relaxed mb-6">
                    {sphere.desc}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    {sphere.platforms.map((p, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-[#050B14] border border-white/5">
                        <div className="text-xs font-bold text-white mb-0.5">{p.name}</div>
                        <div className="text-[11px] text-[#8A9EB0] leading-relaxed">{p.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 3. COLLABORATION MODELS ── */}
      <section className="py-24 bg-[#050B14] relative border-b border-white/10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="font-mono text-xs tracking-[0.14em] text-[#00B8F0] uppercase mb-3 font-semibold">
              HOW WE COLLABORATE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4 text-white">
              Partner Engagement Models
            </h2>
            <p className="text-[#8A9EB0] text-base sm:text-lg">
              We collaborate with enterprise software vendors, consultancies, and systems integrators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COLLABORATION_MODELS.map((model, i) => (
              <div
                key={i}
                className="bg-[#091222] border border-white/10 rounded-2xl p-7 hover:border-white/25 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#60A5FA] flex items-center justify-center font-bold font-mono text-sm mb-5">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  {model.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#8A9EB0] leading-relaxed">
                  {model.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. PARTNERSHIP INQUIRY FORM ── */}
      <section id="partner-inquiry" className="py-24 bg-[#070E1B] relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#0B1524] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="text-center mb-8">
              <div className="font-mono text-xs text-[#00B8F0] uppercase tracking-wider font-semibold mb-2">
                ECOSYSTEM COLLABORATION
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Partner with Botmartz
              </h2>
              <p className="text-sm text-[#8A9EB0]">
                Are you an enterprise AI platform vendor, vector search company, or systems integrator looking for implementation and engineering execution? Let's connect.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center text-emerald-300">
                <CheckCircle2 size={32} className="mx-auto mb-3 text-emerald-400" />
                <h3 className="text-lg font-bold text-white mb-1">Partnership Inquiry Received</h3>
                <p className="text-xs text-emerald-200/90">
                  Our partnerships and architecture team will review your message and reach out within 1 business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Glean / Qdrant / Acme Corp"
                      value={form.companyName}
                      onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                      className="w-full bg-[#050B14] border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00B8F0]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">Contact Person *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={form.contactPerson}
                      onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                      className="w-full bg-[#050B14] border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00B8F0]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#050B14] border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00B8F0]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">Website</label>
                    <input
                      type="url"
                      placeholder="https://company.com"
                      value={form.website}
                      onChange={(e) => setForm({ ...form, website: e.target.value })}
                      className="w-full bg-[#050B14] border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00B8F0]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">Partnership Category</label>
                  <select
                    value={form.partnerCategory}
                    onChange={(e) => setForm({ ...form, partnerCategory: e.target.value })}
                    className="w-full bg-[#050B14] border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00B8F0]"
                  >
                    <option value="Enterprise AI Platform Vendor">Enterprise AI Platform Vendor (e.g. Glean Partner Network)</option>
                    <option value="Vector Search / Retrieval Infrastructure">Vector Search / Retrieval Engine (OpenSearch, Qdrant, Weaviate, Elastic)</option>
                    <option value="Cloud / Infrastructure Provider">Cloud / Infrastructure Provider (AWS, GCP, Azure)</option>
                    <option value="Consultancy / Systems Integrator">Consultancy / Systems Integrator</option>
                    <option value="Enterprise Client Implementation">Enterprise Client Implementation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">How Can We Collaborate?</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your platform, co-delivery opportunities, or implementation requirements..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#050B14] border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00B8F0]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-[0_4px_20px_rgba(0,102,255,0.4)] cursor-pointer disabled:opacity-60"
                >
                  {submitting ? "Submitting Inquiry..." : "Submit Partnership Inquiry →"}
                </button>
              </form>
            )}

          </div>

        </div>
      </section>

    </div>
  );
}
