import { Metadata } from 'next';
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, Search, Bot, ShieldCheck, CheckCircle2, Sparkles, 
  Database, Layers, Cpu, Workflow, Lock, Terminal, BarChart2, 
  Check, FileText, Code2, AlertTriangle, Scale, RefreshCw, Server, Building2, Plane
} from "lucide-react";
import TrackedLink from "@/app/_components/TrackedLink";
import IndustrySelector from "@/app/_components/IndustrySelector";

export const metadata: Metadata = {
  title: 'Enterprise AI Systems Engineering & Architecture Services | Botmartz',
  description: 'Botmartz engineers production AI systems: Enterprise RAG pipelines, deterministic LangGraph multi-agent workflows, and private VPC deployment with 100% citation grounding.',
  openGraph: {
    title: 'Enterprise AI Systems Engineering & Architecture Services | Botmartz',
    description: 'Production AI systems: Enterprise RAG pipelines, deterministic LangGraph multi-agent workflows, and private VPC deployment with 100% citation grounding.',
    url: 'https://www.botmartz.com/services',
    type: 'website',
    images: [{
      url: 'https://www.botmartz.com/images/architecture/services-architecture-overview.svg',
      width: 1200,
      height: 630,
      alt: 'Botmartz Enterprise AI Systems Engineering Capabilities',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise AI Systems Engineering & Architecture Services | Botmartz',
    description: 'Production AI systems: Enterprise RAG pipelines, deterministic LangGraph multi-agent workflows, and private VPC deployment.',
    images: ['https://www.botmartz.com/images/architecture/services-architecture-overview.svg'],
  },
  alternates: { canonical: 'https://www.botmartz.com/services' },
};

export default function ServicesPage() {
  return (
    <main className="bg-white min-h-screen text-[#0F172A] antialiased selection:bg-[#0284C7]/15 selection:text-[#0F172A]">

      {/* ── 1. HERO SECTION (CLEAN ARCHITECTURAL EDITORIAL WITH WARM ORANGE & BLUE ACCENTS) ── */}
      <section className="relative pt-[130px] pb-[85px] bg-gradient-to-b from-[#FFFDF9] via-[#FAFDFE] to-white border-b border-[#E2E8F0] overflow-hidden">
        
        {/* Subtle Architectural Grid */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-b from-[#0284C7]/10 via-[#38BDF8]/5 to-transparent blur-[120px]" />
          <div className="absolute top-[20%] right-[-5%] w-[450px] h-[450px] bg-[#0284C7]/8 blur-[160px] rounded-full" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a06_1px,transparent_1px),linear-gradient(to_bottom,#0f172a06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] text-[#0284C7] font-mono text-xs uppercase tracking-wider mb-6 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ENTERPRISE AI SYSTEMS ENGINEERING · FULL SERVICE SPECIFICATION</span>
          </div>

          <h1 className="text-[clamp(38px,5vw,66px)] font-bold tracking-tight leading-[1.08] max-w-4xl mb-6 text-[#0F172A]">
            Enterprise AI Systems. <br />
            <span className="bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#0F172A] bg-clip-text text-transparent font-serif font-normal italic">
              Engineered with Verifiable Proof.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#475569] max-w-3xl leading-relaxed mb-8 font-normal">
            We architect and deploy production-grade AI infrastructure for organizations with complex, proprietary knowledge. Every system we build operates under dirty real-world schemas, strict sub-120ms latency budgets, token-level citation grounding, and sovereign security boundaries.
          </p>

          <div className="flex flex-wrap gap-3.5 items-center mb-10">
            <TrackedLink
              href="/contact"
              eventName="button_click"
              eventData={{ button_name: "services_hero_book_review" }}
              className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white px-7 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-md hover:-translate-y-0.5"
            >
              <span>Schedule Architecture Review</span>
              <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
            </TrackedLink>
            <a
              href="#rag-systems"
              className="inline-flex items-center gap-2 border border-[#CBD5E1] bg-white text-[#334155] hover:text-[#0F172A] hover:border-[#94A3B8] px-6 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-2xs hover:-translate-y-0.5"
            >
              <span>Explore The Disciplines ↓</span>
            </a>
          </div>

          {/* SLA Benchmark Bar */}
          <div className="pt-8 border-t border-[#E2E8F0] grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono text-[#64748B]">
            <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
              <span className="block text-[#94A3B8] text-[10px] uppercase font-semibold">Retrieval Latency</span>
              <span className="font-bold text-sm text-[#0F172A] mt-0.5 block">&lt; 118ms P99 SLA</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
              <span className="block text-[#94A3B8] text-[10px] uppercase font-semibold">Attribution Guarantee</span>
              <span className="font-bold text-sm text-[#0F172A] mt-0.5 block">100% SHA-256 Citations</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
              <span className="block text-[#94A3B8] text-[10px] uppercase font-semibold">Agent Safety</span>
              <span className="font-bold text-sm text-[#0F172A] mt-0.5 block">Human-in-the-Loop Gates</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
              <span className="block text-[#94A3B8] text-[10px] uppercase font-semibold">Data Sovereignty</span>
              <span className="font-bold text-sm text-[#0F172A] mt-0.5 block">Air-Gapped Private VPC</span>
            </div>
          </div>

          {/* Visual Architecture Matrix Banner */}
          <div className="mt-12 relative w-full rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl group hover:border-[#0284C7]/40 transition-all duration-300">
            <div className="relative aspect-[16/9] w-full bg-[#F8FAFC]">
              <Image
                src="/images/architecture/services-architecture-overview.svg"
                alt="Botmartz Core Engineering Capabilities Matrix Graphic"
                fill
                priority
                className="object-contain p-2 sm:p-4 group-hover:scale-[1.01] transition-transform duration-500"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. DISCIPLINE 01: ENTERPRISE RAG SYSTEMS ── */}
      <section id="rag-systems" className="py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-14">
            <div className="lg:col-span-7">
              <div className="font-mono text-xs font-semibold text-[#0284C7] uppercase tracking-wider mb-2">
                DISCIPLINE 01 · RETRIEVAL AUGMENTED GENERATION
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
                Enterprise RAG &amp; Hybrid Search Infrastructure
              </h2>
              <p className="text-base text-[#475569] leading-relaxed mb-6 font-normal">
                Naive vector search fails when queries contain exact alphanumeric identifiers, dates, or negative constraints. We engineer production-grade hybrid retrieval systems that combine Lucene BM25 sparse search with dense ANN vector traversal, fused via Reciprocal Rank Fusion (RRF) and validated through deep cross-encoders.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="font-bold text-sm text-[#0F172A] mb-1">AST Table &amp; Layout Parsing</div>
                  <div className="text-xs text-[#64748B]">Preserves complex table hierarchies, footnotes, and multi-column flows with 0% token loss.</div>
                </div>
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="font-bold text-sm text-[#0F172A] mb-1">Multi-Tenant RBAC Filters</div>
                  <div className="text-xs text-[#64748B]">Metadata-level tenant isolation guaranteeing zero unauthorized document cross-bleed.</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <TrackedLink
                  href="/services/enterprise-rag"
                  eventName="button_click"
                  eventData={{ button_name: "services_explore_rag_deep_dive" }}
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#0284C7] hover:underline"
                >
                  <span>Read Complete Enterprise RAG Technical Deep-Dive →</span>
                </TrackedLink>
              </div>
            </div>

            {/* Code / Architecture Box */}
            <div className="lg:col-span-5 bg-[#030712] rounded-2xl border border-[#1E293B] p-6 text-white shadow-xl font-mono text-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1E293B] text-[#94A3B8]">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-[#38BDF8]" />
                  <span>hybrid_rrf_retriever.py</span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">COMPILED</span>
              </div>
              <pre className="text-[#E2E8F0] leading-relaxed overflow-x-auto">
{`async def hybrid_retrieve(query, tenant_id):
  # 1. Parallel Sparse + Dense search
  sparse = await bm25.search(query, tenant=tenant_id)
  dense = await qdrant.query(embed(query), tenant=tenant_id)
  
  # 2. Reciprocal Rank Fusion (k=60)
  rrf = merge_rrf(sparse, dense, k=60)
  
  # 3. Cross-Encoder reranking
  reranked = await cross_encoder.predict(rrf[:20])
  return reranked[:5]`}
              </pre>
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. DISCIPLINE 02: DETERMINISTIC MULTI-AGENT WORKFLOWS ── */}
      <section id="ai-agents" className="py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-14">
            <div className="lg:col-span-7">
              <div className="font-mono text-xs font-semibold text-[#0284C7] uppercase tracking-wider mb-2">
                DISCIPLINE 02 · DETERMINISTIC WORKFLOW AUTOMATION
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
                Stateful Multi-Agent Workflows &amp; LangGraph State Machines
              </h2>
              <p className="text-base text-[#475569] leading-relaxed mb-6 font-normal">
                Autonomous agent loops easily spin out of control when tool outputs fail or unexpected inputs arrive. We build deterministic, cyclical multi-agent workflows running on formal Directed Acyclic Graphs (DAGs) with state checkpointing, human-in-the-loop review gates, and automated compensation rollbacks.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
                  <div className="font-bold text-sm text-[#0F172A] mb-1">Human-in-the-Loop Sign-Off</div>
                  <div className="text-xs text-[#64748B]">Automated review gates pausing agent state before irreversible mutations are committed.</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
                  <div className="font-bold text-sm text-[#0F172A] mb-1">Transactional Checkpoints</div>
                  <div className="text-xs text-[#64748B]">Full conversation &amp; agent execution state stored in Postgres WAL with zero state drift.</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <TrackedLink
                  href="/services/ai-agents"
                  eventName="button_click"
                  eventData={{ button_name: "services_explore_agents_deep_dive" }}
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#0284C7] hover:underline"
                >
                  <span>Read Complete Deterministic AI Agents Technical Deep-Dive →</span>
                </TrackedLink>
              </div>
            </div>

            {/* Architecture Card */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
              <div className="font-mono text-xs font-bold text-[#0F172A] pb-3 mb-4 border-b border-[#E2E8F0] flex items-center justify-between">
                <span>DETERMINISTIC AGENT DAG</span>
                <span className="text-[#0284C7]">LANGGRAPH</span>
              </div>
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                  <span>01. Inbound Task Ingestion</span>
                  <span className="text-emerald-600 font-bold">✓ Validated</span>
                </div>
                <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                  <span>02. Grounded Knowledge Retrieval</span>
                  <span className="text-[#0284C7] font-bold">Fused RRF</span>
                </div>
                <div className="p-3 rounded-lg bg-[#FEF3C7] border border-[#FDE68A] text-amber-900 flex items-center justify-between">
                  <span>03. Human Approval Gate</span>
                  <span className="font-bold">Paused (HITL)</span>
                </div>
                <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                  <span>04. ERP / API Execution &amp; Log</span>
                  <span className="text-slate-400">Deterministic</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. DISCIPLINE 03: SOVEREIGN AIR-GAPPED DEPLOYMENT ── */}
      <section id="sovereign" className="py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="font-mono text-xs font-semibold text-[#0284C7] uppercase tracking-wider mb-2">
              DISCIPLINE 03 · SOVEREIGN &amp; PRIVATE VPC INFRASTRUCTURE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
              Air-Gapped Deployment &amp; Zero Training Data Retention
            </h2>
            <p className="text-base text-[#475569] leading-relaxed font-normal">
              For enterprises governed by strict data residency and customer non-disclosure agreements, public multi-tenant APIs represent unacceptable IP leakage risks. We deploy your entire retrieval, reranking, and inference stack inside your dedicated Amazon Web Services, Google Cloud, or on-premise Kubernetes clusters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] text-[#0284C7] flex items-center justify-center mb-4">
                <Lock size={18} />
              </div>
              <h3 className="font-bold text-base text-[#0F172A] mb-2">Zero Third-Party Egress</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Data never leaves your virtual network boundaries. No customer data or documents are ever shared with model providers for training.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] text-[#0284C7] flex items-center justify-center mb-4">
                <Server size={18} />
              </div>
              <h3 className="font-bold text-base text-[#0F172A] mb-2">Self-Hosted vLLM &amp; TensorRT</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                High-throughput, low-latency open-weight model serving running on dedicated H100/A100 instances with continuous batching.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] text-[#0284C7] flex items-center justify-center mb-4">
                <Code2 size={18} />
              </div>
              <h3 className="font-bold text-base text-[#0F172A] mb-2">100% IP &amp; Weights Handover</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Full handover of production code, Docker configurations, infrastructure-as-code scripts, and fine-tuned model checkpoints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. MERGED HIGH-CONSEQUENCE INDUSTRY ARCHITECTURES (SEO MASTER HUB) ── */}
      <section id="industries" className="py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-14">
            <div className="font-mono text-xs font-semibold text-[#0284C7] uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
              <span>INDUSTRY ARCHITECTURES · HIGH-CONSEQUENCE DOMAINS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
              Domain-Specific Implementations Where Accuracy Is Legally Binding
            </h2>
            <p className="text-base text-[#475569] leading-relaxed font-normal">
              Generic chatbots fail when real-world liabilities are on the line. We engineer tailored domain architectures for high-stakes industries requiring statutory verification, audit trails, and strict schema compliance.
            </p>
          </div>

          <IndustrySelector />

        </div>
      </section>

      {/* ── 6. 4-STAGE DELIVERY ROADMAP ── */}
      <section id="process" className="py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-14">
            <div className="font-mono text-xs font-semibold text-[#0284C7] uppercase tracking-wider mb-2">
              THE ENGAGEMENT MODEL
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
              From Raw Documents to Governed Production in 4–6 Weeks
            </h2>
            <p className="text-sm text-[#475569] leading-relaxed">
              We operate via fixed-milestone enterprise delivery sprints with strict evaluation gates and production deployment guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="font-mono text-xs font-bold text-[#0284C7] mb-2">STAGE 01 · WEEK 1</div>
              <h3 className="font-bold text-base text-[#0F172A] mb-2">Schema &amp; Document Audit</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">AST layout evaluation, table complexity scoring, and evaluation dataset generation with synthetic test pairs.</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="font-mono text-xs font-bold text-[#0284C7] mb-2">STAGE 02 · WEEKS 2-3</div>
              <h3 className="font-bold text-base text-[#0F172A] mb-2">Hybrid Pipeline Build</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">Dual BM25 + dense vector indexing, Reciprocal Rank Fusion tuning (k=60), and cross-encoder reranking setup.</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="font-mono text-xs font-bold text-[#0284C7] mb-2">STAGE 03 · WEEK 4</div>
              <h3 className="font-bold text-base text-[#0F172A] mb-2">RAGAS Benchmark Gate</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">Automated benchmarking targeting &gt; 95% faithfulness, zero token hallucination, and sub-120ms P99 latency.</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="font-mono text-xs font-bold text-[#0284C7] mb-2">STAGE 04 · WEEKS 5-6</div>
              <h3 className="font-bold text-base text-[#0F172A] mb-2">Sovereign Cloud Deploy</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">Production cutover inside your dedicated VPC, monitoring setup, and complete engineering handover.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── 7. CTA / NEXT STEPS ── */}
      <section className="py-24 bg-[#F8FAFC] text-center">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-[#0F172A]">
              Ready to engineer dependable intelligence?
            </h2>
            <p className="text-sm sm:text-base text-[#475569] mb-8 leading-relaxed">
              Book a direct 20-minute technical session with our lead AI architects to review your data schemas and build plan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <TrackedLink
                href="/contact"
                eventName="button_click"
                eventData={{ button_name: "services_bottom_book_call" }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white px-8 py-4 rounded-xl text-sm font-semibold transition-all shadow-md"
              >
                <span>Schedule Architecture Review</span>
                <ArrowRight size={15} className="text-[#38BDF8]" />
              </TrackedLink>
              <a
                href="https://cal.com/botmartz-ai/20min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#CBD5E1] bg-white text-[#334155] hover:text-[#0F172A] hover:border-[#94A3B8] px-8 py-4 rounded-xl text-sm font-semibold transition-all shadow-2xs"
              >
                <span>Book 20-Min Direct Consultation ↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
