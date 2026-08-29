import React from "react";
import Link from "next/link";
import { Calendar, MapPin, Ticket, Sparkles, ArrowRight, Clock } from "lucide-react";
import { adminDb } from "@/lib/firebase-admin";

export const revalidate = 60;

export default async function EventsDirectoryPage() {
  let events: any[] = [];
  try {
    const snap = await adminDb.collection("events").get();
    events = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {}

  return (
    <div className="bg-[#050B14] min-h-screen text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/30 text-[#00B8F0] font-mono text-xs uppercase tracking-widest mb-4 font-semibold">
            <Calendar size={14} /> Schedule &amp; Conferences
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Botmartz Events &amp; Meetups
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Discover in-person summits, technical keynotes, builder meetups, and developer community gatherings.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* AI Frontier 2026 Featured Card */}
          <div className="bg-[#0B1524] border border-[#00B8F0]/40 rounded-3xl p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#0066FF] text-white font-mono text-[10px] font-bold uppercase rounded-bl-xl">
              FLAGSHIP 2026
            </div>
            <div>
              <div className="text-xs font-mono text-[#00B8F0] mb-2 uppercase font-bold">Annual AI Conference</div>
              <h2 className="text-2xl font-bold text-white mb-4">AI Frontier 2026 Summit</h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                The premier annual gathering for production AI engineering. Featuring keynotes on Enterprise RAG, LangGraph agents, and retrieval architectures.
              </p>

              <div className="space-y-2.5 text-xs text-slate-400 font-mono mb-8">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-[#00B8F0]" />
                  <span>Annual Global Edition</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-[#00B8F0]" />
                  <span>Hybrid / In-Person &amp; Virtual</span>
                </div>
              </div>
            </div>

            <Link
              href="/events/ai-frontier-2026"
              className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white py-3.5 rounded-xl font-mono text-xs font-bold uppercase text-center transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Ticket size={14} /> Get Passes &amp; Agenda →
            </Link>
          </div>

          {/* Dynamic Events from Firestore if any */}
          {events.filter(e => e.slug !== 'ai-frontier-2026').map(e => (
            <div key={e.id} className="bg-[#091222] border border-white/10 rounded-3xl p-8 shadow-xl flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-slate-400 mb-2 uppercase font-bold">{e.type || "Community Meetup"}</div>
                <h2 className="text-xl font-bold text-white mb-4">{e.title}</h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {e.description || e.subtitle}
                </p>
              </div>

              <Link
                href={`/events/${e.slug || e.id}`}
                className="w-full bg-[#0B1524] border border-white/15 hover:border-[#00B8F0] text-white py-3 rounded-xl font-mono text-xs font-bold uppercase text-center transition-all flex items-center justify-center gap-2"
              >
                <span>View Event</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}
