import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Calendar, Clock, MonitorPlay, Code2, MessageSquare, Bot, Database, Rocket, BookOpen, FolderArchive, Map, Award, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { adminDb } from '@/lib/firebase-admin';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  let title = 'Bootcamp';
  let description = 'Join our premium AI Engineering Bootcamp.';

  try {
    const q = adminDb.collection('bootcamps').where('slug', '==', resolvedParams.slug).limit(1);
    const snap = await q.get();
    if (!snap.empty) {
      const data = snap.docs[0].data();
      title = data.title;
      description = data.shortDescription || description;
    }
  } catch (e) {}

  return {
    title: `${title} | AI Accelerator Workshop`,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.botmartz.com/community/ai-accelerator-workshop/${resolvedParams.slug}`,
      type: 'website',
      images: [
        {
          url: 'https://www.botmartz.com/ai-engineering-pass-banner.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://www.botmartz.com/ai-engineering-pass-banner.jpg'],
    },
    alternates: {
      canonical: `https://www.botmartz.com/community/ai-accelerator-workshop/${resolvedParams.slug}`,
    },
  };
}

export default async function BootcampDynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  let bootcamp: any = null;

  try {
    const q = adminDb.collection('bootcamps').where('slug', '==', resolvedParams.slug).limit(1);
    const snap = await q.get();
    if (!snap.empty) {
      bootcamp = { id: snap.docs[0].id, ...snap.docs[0].data() };
    }
  } catch (e) {
    console.error("Failed to fetch bootcamp:", e);
  }

  if (!bootcamp) {
    notFound();
  }

  const techStack = Array.isArray(bootcamp.techStack) ? bootcamp.techStack : ['ChatGPT', 'Claude', 'Cursor', 'LangChain'];

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-white text-[#0B1C2C]">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#0066FF]/[0.05] blur-[100px] rounded-full" />
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-6 flex justify-center lg:justify-start animate-in slide-in-from-bottom-4 duration-500 fade-in">
                <span className="inline-flex items-center rounded-full bg-[#0066FF] px-4 py-1.5 text-xs font-bold tracking-widest text-white uppercase shadow-sm">
                  {bootcamp.status === 'Upcoming' ? 'UPCOMING BOOTCAMP' : 'BOOTCAMP'}
                </span>
              </div>

              <h1 className="text-[40px] md:text-[56px] font-bold tracking-tight leading-tight text-[#0B1C2C] mb-6 animate-in slide-in-from-bottom-4 duration-500 delay-100 fade-in fill-mode-forwards opacity-0">
                {bootcamp.title}
              </h1>

              <p className="text-lg md:text-xl text-[#475569] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium mb-10 animate-in slide-in-from-bottom-4 duration-500 delay-200 fade-in fill-mode-forwards opacity-0">
                {bootcamp.shortDescription}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-12 animate-in slide-in-from-bottom-4 duration-500 delay-300 fade-in fill-mode-forwards opacity-0">
                <div className="flex items-center gap-3 bg-[#F8FAFC] border border-[#E2E8F0] px-5 py-3 rounded-xl w-full sm:w-auto">
                  <Calendar className="w-5 h-5 text-[#0066FF]" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#64748B] uppercase">Date</p>
                    <p className="text-sm font-bold text-[#0B1C2C]">{bootcamp.date || 'TBA'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-[#F8FAFC] border border-[#E2E8F0] px-5 py-3 rounded-xl w-full sm:w-auto">
                  <Clock className="w-5 h-5 text-[#0066FF]" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#64748B] uppercase">Time</p>
                    <p className="text-sm font-bold text-[#0B1C2C]">{bootcamp.time || 'TBA'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-[#F8FAFC] border border-[#E2E8F0] px-5 py-3 rounded-xl w-full sm:w-auto">
                  <MonitorPlay className="w-5 h-5 text-[#0066FF]" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#64748B] uppercase">Format</p>
                    <p className="text-sm font-bold text-[#0B1C2C]">{bootcamp.format || 'Live Online'}</p>
                  </div>
                </div>
              </div>

              <div className="animate-in slide-in-from-bottom-4 duration-500 delay-500 fade-in fill-mode-forwards opacity-0">
                <Link 
                  href={`/community/ai-accelerator-workshop/checkout?plan=${bootcamp.slug}`}
                  className="group inline-flex items-center justify-center gap-2 bg-[#0066FF] text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-[#0052CC] transition-all shadow-[0_4px_20px_rgba(0,102,255,0.3)] hover:shadow-[0_4px_25px_rgba(0,102,255,0.5)] hover:-translate-y-1 w-full sm:w-auto"
                >
                  Register Now - ₹{bootcamp.price}
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-sm font-medium text-[#64748B] mt-4">
                  *Limited seats available. Secure your spot now.
                </p>
              </div>
            </div>

            {/* Right side Visual/Instructor */}
            <div className="flex-1 w-full max-w-md lg:max-w-none relative animate-in zoom-in-95 duration-700 fade-in fill-mode-forwards opacity-0 delay-200">
              <div className="bg-[#0B1C2C] rounded-3xl p-1 shadow-2xl relative overflow-hidden border border-[#1E293B]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/20 to-transparent pointer-events-none" />
                <div className="bg-[#0F172A] rounded-[22px] p-8 relative z-10 text-center">
                  <img src={bootcamp.instructorImage || "/Sohamsharma.jpeg"} alt={bootcamp.instructorName || "Soham Sharma"} className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-[#1E293B] shadow-xl object-cover" />
                  <div className="text-xs font-bold tracking-widest uppercase text-[#0066FF] mb-2">Lead Instructor</div>
                  <h3 className="text-2xl font-bold text-white mb-1">{bootcamp.instructorName || "Soham Sharma"}</h3>
                  <p className="text-[#8A9EB0] text-sm mb-6 whitespace-pre-wrap">{bootcamp.instructorTitle || "Founder & AI Engineer"}</p>
                  
                  <div className="grid grid-cols-2 gap-4 border-t border-[#1E293B] pt-6">
                    <div className="text-left">
                      <p className="text-[#8A9EB0] text-xs font-semibold mb-1">Part of</p>
                      <p className="text-white text-sm font-bold leading-tight">AI Frontier 2026<br/>Engineering Series</p>
                    </div>
                    <div className="text-left">
                      <p className="text-[#8A9EB0] text-xs font-semibold mb-1">Company</p>
                      <p className="text-white text-sm font-bold leading-tight">botmartz.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT YOU WILL BUILD SECTION */}
        <section className="py-20 bg-[#F8FAFC] border-y border-[#E2E8F0]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#0B1C2C] mb-4">You Will Build</h2>
              <p className="text-[#64748B] font-medium max-w-2xl mx-auto">
                Practical, hands-on engineering. We aren't just talking about AI, we are building it.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Code2, label: "AI Full-Stack Application" },
                { icon: MessageSquare, label: "AI Chat Interface" },
                { icon: Bot, label: "AI Agent Workflow" },
                { icon: Database, label: "RAG Assistant" },
                { icon: Rocket, label: "Live Deployment" },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-[#E2E8F0] p-6 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-[#0B1C2C] text-sm leading-tight">{item.label}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TECH STACK SECTION */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#0B1C2C] mb-4">Learn & Build With</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
              {techStack.map((tech: string, i: number) => (
                <div key={i} className="px-6 py-3 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] text-[#0B1C2C] font-bold shadow-sm">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT'S INCLUDED SECTION */}
        <section className="py-20 bg-[#0B1C2C] text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Every Registration Includes</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              {[
                { icon: BookOpen, label: "AI Engineering Starter Kit" },
                { icon: FolderArchive, label: "AI Developer Resource Pack" },
                { icon: Map, label: "AI Engineer Roadmap 2026" },
              ].map((item, i) => (
                <div key={i} className="bg-[#0F172A] border border-[#1E293B] p-8 rounded-2xl flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-xl bg-[#0066FF]/20 text-[#0066FF] flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-lg">{item.label}</h3>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-8 border-t border-[#1E293B] pt-12 max-w-3xl mx-auto">
              <div className="flex items-center gap-3">
                <MonitorPlay className="w-5 h-5 text-[#0066FF]" />
                <span className="font-semibold text-[#8A9EB0]">Live Coding</span>
              </div>
              <div className="flex items-center gap-3">
                <Code2 className="w-5 h-5 text-[#0066FF]" />
                <span className="font-semibold text-[#8A9EB0]">Hands-on Project</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-[#0066FF]" />
                <span className="font-semibold text-[#8A9EB0]">Certificate of Completion</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-[#0066FF]" />
                <span className="font-semibold text-[#8A9EB0]">Community Access</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
