import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Community Events | Botmartz AI',
  description: 'Join Botmartz community events, workshops, and our flagship AI Frontier conference. Connect with engineers and researchers building the future of AI.',
};

export default function EventsIndexPage() {
  return (
    <main className="bg-paper min-h-screen">
      
      {/* HEADER */}
      <section className="relative pt-[120px] pb-[80px] bg-[#050B14] text-white overflow-hidden border-b border-white/10">
        {/* Background glow effects */}
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

            {/* UPCOMING EVENTS LIST */}
            <div className="space-y-6">
              
              {/* Featured Event: AI Frontier 2026 */}
              <Link href="/community/events/ai-frontier-2026" className="block group">
                <div className="bg-white border border-brand/30 rounded-lg overflow-hidden hover:shadow-xl transition-all hover:border-brand flex flex-col sm:flex-row">
                  <div className="w-full sm:w-[240px] shrink-0 bg-ink p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 blueprint opacity-20"></div>
                    <div className="relative z-10">
                      <div className="font-space-grotesk text-[24px] font-bold text-white leading-none mb-1">AI<br/><span className="text-brand">FRONTIER</span></div>
                      <div className="font-mono text-[11px] text-white/50 mb-4">2026</div>
                      <div className="bg-brand/20 text-brand text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-brand/30">Flagship</div>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                    <h3 className="text-[22px] font-semibold text-ink group-hover:text-brand transition-colors mb-2">AI Frontier 2026</h3>
                    <p className="text-[14px] text-ink-soft mb-6 line-clamp-2">
                      Our annual flagship summit on Enterprise AI, Agents, and RAG. Join 500+ builders and industry leaders for two days of deep technical sessions.
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-[13px]">
                      <div className="flex items-center gap-2 text-ink">
                        <Calendar className="w-4 h-4 text-brand" /> May 24-25, 2026
                      </div>
                      <div className="flex items-center gap-2 text-ink">
                        <MapPin className="w-4 h-4 text-brand" /> Bangalore, India
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 flex items-center justify-center sm:border-l border-line bg-grid-bg sm:w-[120px]">
                    <div className="w-10 h-10 rounded-full border border-line flex items-center justify-center bg-white group-hover:border-brand group-hover:bg-brand group-hover:text-white transition-all text-ink">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Smaller Event (Placeholder for next meetup) */}
              <div className="block group cursor-pointer">
                <div className="bg-white border border-line rounded-lg overflow-hidden hover:border-brand transition-all flex flex-col sm:flex-row opacity-80 hover:opacity-100">
                  <div className="w-full sm:w-[160px] shrink-0 bg-grid-bg p-6 flex flex-col justify-center items-center text-center border-r border-line">
                    <div className="font-mono text-[12px] text-brand font-bold uppercase tracking-wider mb-1">SEP 12</div>
                    <div className="font-mono text-[10px] text-ink-soft">2026</div>
                  </div>
                  
                  <div className="p-6 flex-1">
                    <div className="text-[10px] font-bold text-ink-soft uppercase tracking-widest mb-2 font-mono">Technical Meetup</div>
                    <h3 className="text-[18px] font-semibold text-ink group-hover:text-brand transition-colors mb-2">Building Agentic Workflows</h3>
                    <div className="flex items-center gap-2 text-[12px] text-ink-soft">
                      <MapPin className="w-3 h-3 text-brand" /> Remote / Online
                    </div>
                  </div>
                  
                  <div className="p-6 flex items-center justify-center">
                    <span className="text-[12px] font-semibold text-brand bg-brand/10 px-3 py-1 rounded border border-brand/20">Registrations Open Soon</span>
                  </div>
                </div>
              </div>

            </div>

            <h2 className="font-mono text-[14px] text-ink font-semibold uppercase tracking-wider mb-8 mt-16 flex items-center gap-4">
              Past Events
              <div className="flex-1 h-px bg-line"></div>
            </h2>
            
            <div className="text-center py-12 bg-white border border-line rounded border-dashed">
              <p className="text-[14px] text-ink-soft">Past event recordings and recaps will appear here.</p>
            </div>
            
          </div>

          <div className="lg:w-[320px] shrink-0">
             <div className="bg-ink p-8 rounded text-white sticky top-24">
                <h4 className="font-mono text-[11px] text-brand uppercase tracking-[0.12em] mb-4">WANT TO SPEAK?</h4>
                <p className="text-[14px] text-white/80 mb-6 leading-relaxed">
                  We are always looking for engineers, researchers, and builders who want to share their insights with the Botmartz community.
                </p>
                <a href="/contact" className="btn border border-white/20 hover:border-brand hover:text-brand px-6 py-2 rounded text-[13px] text-white flex items-center justify-between transition-colors">
                  Submit a Proposal <ExternalLink className="w-4 h-4" />
                </a>
             </div>
          </div>

        </div>
      </section>

    </main>
  );
}
