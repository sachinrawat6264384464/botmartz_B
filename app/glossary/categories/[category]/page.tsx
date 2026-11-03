import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Layers, ChevronRight, Cpu } from 'lucide-react';
import { GLOSSARY_CATEGORIES } from '@/lib/glossary/types';
import { getGlossaryTermsByCategory, MASTER_GLOSSARY_TERMS } from '@/lib/glossary/data';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return GLOSSARY_CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: catSlug } = await params;
  const category = GLOSSARY_CATEGORIES.find(c => c.slug === catSlug);

  if (!category) {
    return {
      title: 'Category Not Found | Botmartz AI Glossary',
    };
  }

  const title = `${category.name} in AI Engineering | Technical Knowledge Area | Botmartz`;
  const description = `${category.description} Explore definitions, mathematical models, and implementation patterns.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.botmartz.com/glossary/categories/${category.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.botmartz.com/glossary/categories/${category.slug}`,
      type: 'website',
    },
  };
}

export default async function GlossaryCategoryPage({ params }: CategoryPageProps) {
  const { category: catSlug } = await params;
  const category = GLOSSARY_CATEGORIES.find(c => c.slug === catSlug);

  if (!category) {
    notFound();
  }

  const terms = getGlossaryTermsByCategory(category.slug);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased pt-[104px] pb-24">
      
      {/* ── HEADER ── */}
      <section className="bg-white border-b border-[#E2E8F0] pt-8 pb-12">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-6">
            <Link href="/glossary" className="hover:text-slate-900 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Glossary Index</span>
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">Categories</span>
            <span>/</span>
            <span className="text-[#0284C7] font-semibold">{category.name}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded border ${category.badgeBg} ${category.badgeText}`}>
                AREA #{category.id}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {terms.length} Dedicated Concepts Published
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
              {category.name}
            </h1>

            <p className="text-base text-slate-600 leading-relaxed mb-4">
              {category.description}
            </p>
          </div>

        </div>
      </section>

      {/* ── TERMS IN THIS CATEGORY ── */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {terms.map((term) => (
            <div
              key={term.slug}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-[#0284C7]/50 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                  <span className="uppercase text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {term.difficulty}
                  </span>
                  <span>LETTER '{term.letter}'</span>
                </div>

                <Link href={`/glossary/${term.slug}`} className="block group-hover:text-[#0284C7] transition-colors mb-2">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center justify-between">
                    <span>{term.term}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#0284C7]" />
                  </h2>
                </Link>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {term.shortDefinition}
                </p>

                {term.mathematicalOrAlgorithmicModel && (
                  <div className="bg-[#060C1F] text-[#38BDF8] font-mono text-xs p-3 rounded-lg mb-4 overflow-x-auto border border-slate-800">
                    <span className="text-slate-400 block text-[9px] uppercase font-bold mb-1">
                      {term.mathematicalOrAlgorithmicModel.label}:
                    </span>
                    {term.mathematicalOrAlgorithmicModel.formula}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                <Link
                  href={`/glossary/${term.slug}`}
                  className="font-bold text-[#0284C7] hover:underline flex items-center gap-1"
                >
                  <span>Read Full Article</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={term.commercialPathway.serviceLink}
                  className="text-slate-500 hover:text-slate-900"
                >
                  {term.commercialPathway.serviceLabel}
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* Other Categories Switcher */}
        <div className="mt-16 pt-10 border-t border-slate-200">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-400 mb-4">
            Explore Other Technical Domains
          </h3>
          <div className="flex flex-wrap gap-2">
            {GLOSSARY_CATEGORIES.filter(c => c.slug !== category.slug).map((c) => (
              <Link
                key={c.slug}
                href={`/glossary/categories/${c.slug}`}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 hover:border-[#0284C7] hover:text-[#0284C7] transition-all font-mono"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>

      </section>

    </div>
  );
}

