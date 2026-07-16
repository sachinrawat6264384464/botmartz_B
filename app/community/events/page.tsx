import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { adminDb } from '@/lib/firebase-admin';

export const metadata: Metadata = {
  title: 'Community Events | Botmartz AI',
  description: 'Join Botmartz community events, workshops, and our flagship AI Frontier conference. Connect with engineers and researchers building the future of AI.',
};

export default async function EventsIndexPage() {
  let events: any[] = [];
  try {
    const eventsSnap = await adminDb.collection("events").orderBy("date", "desc").get();
    eventsSnap.forEach(doc => {
      events.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    console.error("Failed to fetch events:", e);
  }

  return (
    <main className="bg-paper min-h-screen">
      
      {/* HEADER */}
      <section className="relative pt-[120px] pb-[80px] bg-[#050B14] text-white overflow-hidden border-b border-white/10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="wrap relative z-10 flex flex-col items-center text-center max-w-[800px] mx-auto">
          <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-4 flex items-center gap-3 font-semibold justify-center">
            <span className="w-6 h-px bg-[#00B8F0]"></span>
            COMMUNITY EVENTS
            <span className="w-6 h-px bg-[#00B8F0]"></span>
          </div>
          <h1 className="text-[clamp(36px,5vw,56px)] font-bold mb-6 tracking-tight text-white font-space-grotesk">
            Learn, Build & <span className="text-[#00B8F0]">Connect.</span>
          </h1>
          <p className="text-[17px] text-[#8A9EB0] max-w-[600px] leading-relaxed mx-auto">
            From our annual flagship conference to local engineering meetups, this is where the AI ecosystem comes together.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="wrap flex flex-col lg:flex-row gap-12">
          
          <div className="flex-1">
            <h2 className="font-mono text-[14px] text-ink font-semibold uppercase tracking-wider mb-8 flex items-center gap-4">
              Upcoming Events
              <div className="flex-1 h-px bg-line"></div>
            </h2>

            {/* EVENTS LIST */}
            <div className="space-y-6">
              {events.length === 0 ? (
                <div className="p-12 text-center border border-dashed border-line rounded-lg text-ink-soft">
                  <Calendar className="w-8 h-8 mx-auto mb-3 opacity-50" />
                  <p>No events scheduled at the moment. Check back soon!</p>
                </div>
              ) : (
                events.map((evt) => (
                  <Link key={evt.id} href={`/community/events/${evt.slug}`} className="block group">
                    <div className="bg-white border border-line rounded-lg overflow-hidden hover:shadow-xl transition-all hover:border-brand flex flex-col sm:flex-row">
                      
                      {/* Left Badge/Image Area */}
                      <div className="w-full sm:w-[240px] shrink-0 bg-ink p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
                        {evt.coverImage ? (
                          <>
                            <img src={evt.coverImage} alt={evt.title} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-transparent"></div>
                          </>
                        ) : (
                          <div className="absolute inset-0 blueprint opacity-20"></div>
                        )}
                        <div className="relative z-10">
                          <div className="font-space-grotesk text-[20px] font-bold text-white leading-tight mb-2 px-2">
                            {evt.title}
                          </div>
                          {evt.badge && (
                            <div className="bg-brand/20 text-brand text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-brand/30 inline-block">
                              {evt.badge}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Content Area */}
                      <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                        <h3 className="text-[22px] font-semibold text-ink group-hover:text-brand transition-colors mb-2">{evt.title}</h3>
                        <p className="text-[14px] text-ink-soft mb-6 line-clamp-2">
                          {evt.shortDescription || "Join us for this exciting event!"}
                        </p>
                        
                        <div className="flex flex-wrap gap-4 text-[13px]">
                          {evt.date && (
                            <div className="flex items-center gap-2 text-ink">
                              <Calendar className="w-4 h-4 text-brand" /> {evt.date}
                            </div>
                          )}
                          {evt.location && (
                            <div className="flex items-center gap-2 text-ink">
                              <MapPin className="w-4 h-4 text-brand" /> {evt.location}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Arrow */}
                      <div className="p-6 flex items-center justify-center sm:border-l border-line bg-grid-bg sm:w-[120px]">
                        <div className="w-10 h-10 rounded-full border border-line flex items-center justify-center bg-white group-hover:border-brand group-hover:bg-brand group-hover:text-white transition-all text-ink">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
          
          {/* SIDEBAR */}
          <div className="w-full lg:w-[320px] shrink-0 space-y-8">
            <div className="bg-white border border-line rounded-xl p-6">
              <h3 className="text-[16px] font-semibold text-ink mb-4 font-space-grotesk">Stay Updated</h3>
              <p className="text-[14px] text-ink-soft mb-6 leading-relaxed">
                Join our newsletter to get notified about upcoming meetups, conferences, and open-source events.
              </p>
              <form className="space-y-3">
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full bg-paper border border-line rounded px-4 py-2.5 text-[14px] focus:outline-none focus:border-brand"
                  required
                />
                <button type="submit" className="w-full btn btn-primary text-white bg-brand hover:bg-brand-dark px-4 py-2.5 rounded text-[14px] font-semibold transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
