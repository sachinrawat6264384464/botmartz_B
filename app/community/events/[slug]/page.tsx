import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Calendar, MapPin, ArrowLeft, Clock, Linkedin, Terminal, Users, ExternalLink, Code } from 'lucide-react';
import Link from 'next/link';
import { adminDb } from '@/lib/firebase-admin';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import RegisterButton from './RegisterButton';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function getLocalEvent(slug: string) {
  const filePath = path.join(process.cwd(), 'content/events', `${slug}.md`);
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    return {
      id: slug,
      title: data.title,
      shortDescription: data.description,
      date: data.event_date,
      location: data.location,
      coverImage: data.og_image,
      content,
      isLocal: true,
      ...data
    };
  }
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  let title = 'Event';
  let description = 'Botmartz Community Event';

  const localEvent = getLocalEvent(resolvedParams.slug);
  if (localEvent) {
    title = localEvent.title;
    description = localEvent.shortDescription;
  } else {
    try {
      const q = adminDb.collection('events').where('slug', '==', resolvedParams.slug).limit(1);
      const snap = await q.get();
      if (!snap.empty) {
        const data = snap.docs[0].data();
        title = data.title;
        const rawDesc = data.shortDescription || description;
        description = rawDesc.length > 155 ? rawDesc.substring(0, 152) + '...' : rawDesc;
      }
    } catch (e) {}
  }

  return {
    title: `${title} | Community Events`,
    description,
    openGraph: {
      title: `${title} | Botmartz Events`,
      description,
      url: `https://www.botmartz.com/community/events/${resolvedParams.slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://www.botmartz.com/community/events/${resolvedParams.slug}`,
    },
  };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  let event: any = getLocalEvent(resolvedParams.slug);

  if (!event) {
    try {
      const q = adminDb.collection('events').where('slug', '==', resolvedParams.slug).limit(1);
      const snap = await q.get();
      if (!snap.empty) {
        event = { id: snap.docs[0].id, ...snap.docs[0].data() };
      }
    } catch (e) {
      console.error("Failed to fetch event:", e);
    }
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

      {/* IDFC PARTNER BANNER */}
      {!event.isLocal && (
        <div className="bg-[#0A1120] border-b border-white/5 py-4">
          <div className="wrap max-w-[800px] mx-auto flex flex-wrap items-center justify-center gap-4 text-[#8A9EB0] text-sm font-semibold">
            <span>Official Event Partner:</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-lg tracking-tight">IDFC FIRST Bank</span>
            </div>
          </div>
        </div>
      )}

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
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {event.content}
            </ReactMarkdown>
          </div>

          {!event.isLocal && (
            <>
              {/* HANDS-ON AGENDA */}
              <div className="mt-16 pt-12 border-t border-line">
                <h2 className="font-space-grotesk text-3xl font-bold text-ink mb-2">Event Agenda</h2>
                <p className="text-ink-soft mb-8">Build an AI agent live. No fluff, just hands-on engineering.</p>
                
                <div className="space-y-4">
                  <div className="bg-paper border border-line rounded-xl p-5 flex gap-4 hover:border-brand/30 transition-colors">
                    <div className="w-12 h-12 bg-brand/10 text-brand rounded-full flex items-center justify-center shrink-0">
                      <Terminal size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-brand uppercase tracking-wider mb-1">Session 1</div>
                      <h4 className="text-lg font-bold text-ink mb-1">The Architecture of AI Agents</h4>
                      <p className="text-ink-soft text-sm leading-relaxed mb-2">Setting the foundation. Understanding how agents think, tool calling, and RAG architectures before we start building.</p>
                      <p className="text-xs text-ink-light font-medium">Led by Promit Ray</p>
                    </div>
                  </div>

                  <div className="bg-[#050C18] border border-[#1E293B] rounded-xl p-5 flex gap-4 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00B8F0]/5 rounded-bl-[100px] pointer-events-none transition-transform group-hover:scale-110" />
                    <div className="w-12 h-12 bg-[#00B8F0]/20 text-[#00B8F0] rounded-full flex items-center justify-center shrink-0 border border-[#00B8F0]/30 z-10">
                      <Code size={20} />
                    </div>
                    <div className="z-10">
                      <div className="text-xs font-bold text-[#00B8F0] uppercase tracking-wider mb-1 flex items-center gap-2">
                        Session 2 <span className="bg-[#00B8F0]/20 text-[#00B8F0] px-2 py-0.5 rounded text-[10px]">Hands-on</span>
                      </div>
                      <h4 className="text-lg font-bold text-white mb-1">Building with GTWY AI</h4>
                      <p className="text-[#8A9EB0] text-sm leading-relaxed mb-2">A live workshop to build and deploy an agent using GTWY AI's framework. Connecting variables, pre-built tools, and LLM memory.</p>
                      <p className="text-xs text-[#00B8F0]/80 font-medium flex flex-wrap items-center gap-2">
                        Led by Harsh Sahu 
                        <a href="https://gtwy.ai" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-[#00B8F0] transition-colors underline underline-offset-2">
                          GTWY.AI <ExternalLink size={10} />
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="bg-paper border border-line rounded-xl p-5 flex gap-4 hover:border-brand/30 transition-colors">
                    <div className="w-12 h-12 bg-orange-500/10 text-orange-500 rounded-full flex items-center justify-center shrink-0">
                      <Users size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1">Panel</div>
                      <h4 className="text-lg font-bold text-ink mb-1">The Future of Agents & Q&A</h4>
                      <p className="text-ink-soft text-sm leading-relaxed mb-2">An open panel discussion on enterprise AI adoption, the future of agentic workflows, and answering your technical questions.</p>
                      <p className="text-xs text-ink-light font-medium">Panelist: Soham Sharma</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SPEAKERS */}
              <div className="mt-16 pt-12 border-t border-line">
                <h2 className="font-space-grotesk text-3xl font-bold text-ink mb-8">Featured Speakers</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Promit */}
                  <div className="bg-paper border border-line rounded-xl p-5 text-center hover:-translate-y-1 transition-transform">
                    <div className="w-20 h-20 mx-auto rounded-full bg-slate-200 mb-4 overflow-hidden">
                      <img src="https://ui-avatars.com/api/?name=Promit+Ray&background=random" alt="Promit Ray" className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-bold text-ink text-lg">Promit Ray</h4>
                    <p className="text-brand text-xs font-semibold uppercase tracking-wider mb-3">Session Lead</p>
                    <a href="https://www.linkedin.com/in/promit-ray/" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0077B5]/10 text-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-colors">
                      <Linkedin size={14} />
                    </a>
                  </div>

                  {/* Harsh */}
                  <div className="bg-[#050C18] border border-[#1E293B] rounded-xl p-5 text-center hover:-translate-y-1 transition-transform relative overflow-hidden">
                    <div className="absolute top-[-20px] left-[-20px] w-20 h-20 bg-[#00B8F0]/20 blur-[20px] rounded-full pointer-events-none" />
                    <div className="w-20 h-20 mx-auto rounded-full bg-slate-200 mb-4 overflow-hidden border-2 border-[#00B8F0]/30 relative z-10">
                      <img src="https://ui-avatars.com/api/?name=Harsh+Sahu&background=random" alt="Harsh Sahu" className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-bold text-white text-lg relative z-10">Harsh Sahu</h4>
                    <p className="text-[#00B8F0] text-xs font-semibold uppercase tracking-wider mb-3 relative z-10">GTWY AI Expert</p>
                    <a href="https://www.linkedin.com/in/harshhsahu" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0077B5]/20 text-[#00B8F0] hover:bg-[#0077B5] hover:text-white transition-colors relative z-10">
                      <Linkedin size={14} />
                    </a>
                  </div>

                  {/* Soham */}
                  <div className="bg-paper border border-line rounded-xl p-5 text-center hover:-translate-y-1 transition-transform">
                    <div className="w-20 h-20 mx-auto rounded-full bg-slate-200 mb-4 overflow-hidden">
                      <img src="https://ui-avatars.com/api/?name=Soham+Sharma&background=random" alt="Soham Sharma" className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-bold text-ink text-lg">Soham Sharma</h4>
                    <p className="text-orange-500 text-xs font-semibold uppercase tracking-wider mb-3">Panelist</p>
                    <a href="https://www.linkedin.com/in/soham-sharma/" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0077B5]/10 text-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-colors">
                      <Linkedin size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="mt-16 pt-8 border-t border-line text-center">
            <h3 className="font-space-grotesk text-2xl font-bold text-ink mb-4">Ready to Join?</h3>
            <RegisterButton event={event} />
          </div>
        </div>
      </section>
    </main>
  );
}
