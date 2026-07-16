import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { adminDb } from '@/lib/firebase-admin';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  let title = 'Event';
  let description = 'Botmartz Community Event';

  try {
    const q = adminDb.collection('events').where('slug', '==', params.slug).limit(1);
    const snap = await q.get();
    if (!snap.empty) {
      const data = snap.docs[0].data();
      title = data.title;
      description = data.shortDescription || description;
    }
  } catch (e) {}

  return { title: `${title} | Botmartz Events`, description };
}

export default async function EventPage({ params }: { params: { slug: string } }) {
  let event: any = null;

  try {
    const q = adminDb.collection('events').where('slug', '==', params.slug).limit(1);
    const snap = await q.get();
    if (!snap.empty) {
      event = { id: snap.docs[0].id, ...snap.docs[0].data() };
    }
  } catch (e) {
    console.error("Failed to fetch event:", e);
  }

  if (!event) {
    notFound();
  }

  return (
    <main className="bg-paper min-h-screen pb-24">
      {/* HEADER */}
      <section className="relative pt-[120px] pb-[80px] bg-[#050B14] text-white overflow-hidden border-b border-white/10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="wrap relative z-10 flex flex-col items-center text-center max-w-[800px] mx-auto">
          <Link href="/community/events" className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-8 flex items-center gap-2 font-semibold justify-center hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> BACK TO EVENTS
          </Link>
          
          {event.badge && (
            <div className="bg-brand/20 text-brand text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-brand/30 inline-block mb-4">
              {event.badge}
            </div>
          )}

          <h1 className="text-[clamp(36px,5vw,56px)] font-bold mb-6 tracking-tight text-white font-space-grotesk">
            {event.title}
          </h1>
          
          <p className="text-[17px] text-[#8A9EB0] max-w-[600px] leading-relaxed mx-auto mb-8">
            {event.shortDescription}
          </p>

          <div className="flex flex-wrap gap-6 justify-center text-[14px]">
            {event.date && (
              <div className="flex items-center gap-2 text-white">
                <Calendar className="w-5 h-5 text-brand" /> {event.date}
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-2 text-white">
                <MapPin className="w-5 h-5 text-brand" /> {event.location}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section-pad">
        <div className="wrap max-w-[800px] mx-auto">
          {event.coverImage && (
            <div className="w-full aspect-video rounded-xl overflow-hidden mb-12 border border-line shadow-lg">
              <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="prose prose-lg prose-slate max-w-none text-ink
            prose-headings:font-space-grotesk prose-headings:font-bold prose-headings:text-ink
            prose-a:text-brand hover:prose-a:text-brand-dark
            prose-strong:text-ink font-sans leading-relaxed
            prose-li:marker:text-brand
            prose-blockquote:border-l-brand prose-blockquote:bg-grid-bg prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:text-ink-soft prose-blockquote:font-style-normal prose-blockquote:not-italic
            prose-table:border prose-table:border-line prose-th:bg-grid-bg prose-th:p-4 prose-td:p-4 prose-td:border-t prose-td:border-line
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {event.content}
            </ReactMarkdown>
          </div>

          <div className="mt-16 pt-8 border-t border-line text-center">
            <h3 className="font-space-grotesk text-2xl font-bold text-ink mb-4">Ready to Join?</h3>
            <button className="btn btn-primary bg-brand text-white hover:bg-brand-dark px-8 py-3 rounded text-[15px] font-semibold transition-colors">
              Register for Event
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
