import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ShieldAlert, Cpu, 
  Terminal, ExternalLink, Calendar, UserCheck, Layers, Sparkles, AlertTriangle, ChevronRight
} from 'lucide-react';
import { getGlossaryTermBySlug, MASTER_GLOSSARY_TERMS } from '@/lib/glossary/data';
import { GLOSSARY_CATEGORIES } from '@/lib/glossary/types';
import MathFormula from '@/app/_components/MathFormula';

interface TermPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return MASTER_GLOSSARY_TERMS.map((term) => ({
    slug: term.slug,
  }));
}

export async function generateMetadata({ params }: TermPageProps): Promise<Metadata> {
  const { slug } = await params;
  const term = getGlossaryTermBySlug(slug);

  if (!term) {
    return {
      title: 'Term Not Found | Botmartz AI Glossary',
    };
  }

  const title = `What is ${term.term}? Architecture, Equations & Examples | Botmartz`;
  const description = `${term.shortDefinition} Technical breakdown, algorithmic formulas, implementation trade-offs, and enterprise use cases.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.botmartz.com/glossary/${term.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.botmartz.com/glossary/${term.slug}`,
      type: 'article',
      images: [{
        url: 'https://www.botmartz.com/images/architecture/system-stack-architecture.svg',
        width: 1200,
        height: 630,
        alt: `${term.term} Architecture and Engineering Specification`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://www.botmartz.com/images/architecture/system-stack-architecture.svg'],
    },
  };
}

export default async function TermDetailPage({ params }: TermPageProps) {
  const { slug } = await params;
  const term = getGlossaryTermBySlug(slug);

  if (!term) {
    notFound();
  }

  const categoryObj = GLOSSARY_CATEGORIES.find(c => c.slug === term.category);
  const relatedTermsData = (term.relatedTerms || [])
    .map(rSlug => getGlossaryTermBySlug(rSlug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": `What is ${term.term}? Architecture, Formulation, and Implementation`,
    "description": term.shortDefinition,
    "url": `https://www.botmartz.com/glossary/${term.slug}`,
    "dateModified": "2026-11-01",
    "author": {
      "@type": "Organization",
      "name": "Botmartz Engineering Team",
      "url": "https://www.botmartz.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Botmartz AI Solutions",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.botmartz.com/Logo-removebg-preview.png"
      }
    },
    "mainEntityOfPage": `https://www.botmartz.com/glossary/${term.slug}`,
    "about": {
      "@type": "Thing",
      "name": term.term,
      "description": term.shortDefinition
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased pt-[104px] pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── BREADCRUMB HEADER ── */}
      <div className="bg-white border-b border-[#E2E8F0] py-4">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <Link href="/glossary" className="hover:text-slate-900 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Glossary Index</span>
            </Link>
            <span>/</span>
            {categoryObj && (
              <>
                <Link href={`/glossary/categories/${categoryObj.slug}`} className="hover:text-slate-900">
                  {categoryObj.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-slate-900 font-bold truncate">{term.term}</span>
          </nav>
        </div>
      </div>

      {/* ── MAIN ARTICLE CONTAINER ── */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN: PRIMARY TECHNICAL GUIDE (8 Cols) */}
          <main className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs">
            
            {/* Meta Tags Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100 mb-8">
              <div className="flex items-center gap-2">
                {categoryObj && (
                  <span className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded border ${categoryObj.badgeBg} ${categoryObj.badgeText}`}>
                    {categoryObj.name}
                  </span>
                )}
                <span className="text-[11px] font-mono uppercase bg-slate-100 text-slate-700 px-2.5 py-1 rounded font-semibold border border-slate-200">
                  {term.difficulty}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Reviewed: {term.lastReviewed}</span>
              </div>
            </div>

            {/* Term Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              {term.term}
            </h1>

            {term.aliases && term.aliases.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs text-slate-500">
                <span>Also indexed as:</span>
                {term.aliases.map((alias, idx) => (
                  <span key={idx} className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-slate-700 font-medium">
                    {alias}
                  </span>
                ))}
              </div>
            )}

            {/* Section 1: Executive Definition */}
            <section className="mb-8">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0284C7] mb-2">
                01 / Definition &amp; Core Concept
              </h2>
              <div className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed bg-[#F0F9FF] border-l-4 border-[#0284C7] p-5 rounded-r-xl">
                {term.shortDefinition}
              </div>
            </section>

            {/* Section 2: Simple Plain-English Analogy */}
            <section className="mb-10">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
                02 / Intuitive Analogy
              </h2>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm text-slate-700 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-1">How to think about this:</span>
                {term.simpleAnalogy}
              </div>
            </section>

            {/* Section 3: Technical Architecture Breakdown */}
            <section className="mb-10">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
                03 / Technical Architecture Breakdown
              </h2>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {term.technicalBreakdown.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {term.technicalBreakdown.description}
              </p>
              {term.technicalBreakdown.steps && (
                <div className="space-y-3 font-sans">
                  {term.technicalBreakdown.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                      <span className="font-mono font-bold text-[#0284C7] shrink-0 mt-0.5">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Section 4: Mathematical / Algorithmic Model */}
            {term.mathematicalOrAlgorithmicModel && (
              <section className="mb-10">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
                  04 / Mathematical &amp; Algorithmic Formulation
                </h2>
                <MathFormula
                  formula={term.mathematicalOrAlgorithmicModel.formula}
                  label={term.mathematicalOrAlgorithmicModel.label}
                  className="mb-2"
                />
                <p className="text-xs text-slate-500 mt-2 px-1 leading-relaxed">
                  {term.mathematicalOrAlgorithmicModel.explanation}
                </p>
              </section>
            )}

            {/* Section 5: Real Production Code Implementation */}
            {term.implementationExample && (
              <section className="mb-10">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
                  05 / Implementation Reference
                </h2>
                <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#060C1F]">
                  <div className="bg-slate-900 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800">
                    <span className="uppercase text-slate-300 font-bold">{term.implementationExample.language}</span>
                    <span>Production Snippet</span>
                  </div>
                  <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                    <code>{term.implementationExample.code}</code>
                  </pre>
                  <div className="bg-slate-950 p-3.5 text-xs text-slate-400 border-t border-slate-800 leading-relaxed font-sans">
                    <span className="font-bold text-slate-300">Engineering note: </span>
                    {term.implementationExample.explanation}
                  </div>
                </div>
              </section>
            )}

            {/* Section 6: When to Use vs When to Avoid */}
            <section className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-5">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>When to Deploy</span>
                </div>
                <ul className="space-y-2 text-xs text-emerald-900 leading-relaxed">
                  {term.whenToUse.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-5">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-sm mb-3">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>When to Avoid</span>
                </div>
                <ul className="space-y-2 text-xs text-amber-900 leading-relaxed">
                  {term.whenToAvoid.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Section 7: Trade-offs & Engineering Limitations */}
            <section className="mb-10">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
                06 / Trade-Offs &amp; Operational Limitations
              </h2>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 font-sans">
                {term.tradeoffsAndLimitations.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-slate-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 8: Academic & Industry References */}
            <section className="border-t border-slate-200 pt-8">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-4">
                07 / Verified Research &amp; Standard References
              </h2>
              <div className="space-y-3">
                {term.verifiedSources.map((source, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 p-4 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-slate-900">{source.title}</div>
                      <div className="text-slate-500 font-mono text-[11px] mt-0.5">
                        {source.authorOrStandard} · {source.yearOrVersion}
                      </div>
                    </div>
                    {source.link && (
                      <a
                        href={source.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0284C7] hover:underline flex items-center gap-1 font-mono shrink-0 ml-4"
                      >
                        <span>View Source</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>

          </main>

          {/* RIGHT COLUMN: CONTEXTUAL SIDEBAR & COMMERCIAL PATHWAYS (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Commercial Action Box */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-md">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-slate-800 text-[#38BDF8] font-bold mb-4">
                <Cpu className="w-3 h-3" />
                <span>Production Architecture</span>
              </div>
              <h3 className="text-lg font-bold mb-2">
                {term.commercialPathway.headline}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                {term.commercialPathway.description}
              </p>
              <Link
                href={term.commercialPathway.serviceLink}
                className="block text-center w-full py-3 px-4 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold text-xs transition-colors mb-3"
              >
                {term.commercialPathway.serviceLabel} →
              </Link>
              <Link
                href="/contact"
                className="block text-center w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors"
              >
                Book Engineering Scoping Call
              </Link>
            </div>

            {/* Related Terms Network */}
            {relatedTermsData.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>Related Knowledge Network</span>
                </h4>
                <div className="space-y-3 font-sans">
                  {relatedTermsData.map((relTerm) => (
                    <Link
                      key={relTerm.slug}
                      href={`/glossary/${relTerm.slug}`}
                      className="block p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-100 hover:border-slate-300 transition-all group"
                    >
                      <div className="font-semibold text-xs text-slate-900 group-hover:text-[#0284C7] flex items-center justify-between">
                        <span>{relTerm.term}</span>
                        <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 mt-1">
                        {relTerm.shortDefinition}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Knowledge Area Card */}
            {categoryObj && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold mb-1">Parent Subject Area</div>
                <h4 className="font-bold text-sm text-slate-900 mb-2">{categoryObj.name}</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {categoryObj.description}
                </p>
                <Link
                  href={`/glossary/categories/${categoryObj.slug}`}
                  className="text-xs font-mono font-bold text-[#0284C7] hover:underline flex items-center gap-1"
                >
                  <span>View All {categoryObj.name} Concepts</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

          </aside>

        </div>

      </div>
    </div>
  );
}
