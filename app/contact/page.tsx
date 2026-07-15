import { Metadata } from 'next';
import { Mail, MapPin, MessageSquare, Phone, Building } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Botmartz AI Solutions',
  description: 'Book a discovery call with the Botmartz AI engineering team. Let\'s discuss how custom Generative AI and RAG solutions can impact your business.',
  keywords: ['Contact Botmartz', 'Hire AI Engineers', 'AI Consulting', 'Book Discovery Call', 'AI Strategy Session'],
  openGraph: {
    title: 'Contact Us | Botmartz AI Solutions',
    description: 'Book a discovery call with the Botmartz AI engineering team.',
    url: 'https://botmartz.com/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Botmartz AI Solutions",
    "description": metadata.description,
    "mainEntity": {
      "@type": "Organization",
      "name": "Botmartz AI Solutions",
      "email": "soham@botmartz.com",
      "telephone": "+91 94073 28842",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Indore",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <main className="bg-paper min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* HERO SECTION */}
      <section className="relative pt-[80px] pb-[60px] bg-ink text-white overflow-hidden blueprint" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.08) 1px, transparent 1px)' }}>
        <div className="wrap relative z-10 flex flex-col items-center text-center max-w-[800px] mx-auto">
          <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mb-6">
            <MessageSquare className="w-8 h-8 text-brand" />
          </div>
          <div className="font-mono text-[11px] text-signal uppercase tracking-[0.12em] mb-4">Get In Touch</div>
          <h1 className="text-[clamp(32px,4.5vw,50px)] leading-[1.05] font-semibold mb-6">
            Let's Build <span className="text-brand">Something Great.</span>
          </h1>
          <p className="text-[17px] text-[#9FB9C8] max-w-[600px] mx-auto">
            Ready to explore how Enterprise RAG and Autonomous Agents can drive efficiency in your organization? Book a strategy session with our engineering team.
          </p>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="py-[80px]">
        <div className="wrap flex flex-col lg:flex-row gap-12">
           
           {/* Form Side */}
           <div className="lg:w-2/3 bg-white border border-line p-8 md:p-12 rounded-sm shadow-sm">
              <h2 className="text-[24px] font-semibold mb-8">Send us a message</h2>
              <form className="flex flex-col gap-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                       <label className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">First Name</label>
                       <input type="text" className="border border-line rounded-sm px-4 py-3 text-[14px] focus:outline-none focus:border-brand" placeholder="Jane" />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">Last Name</label>
                       <input type="text" className="border border-line rounded-sm px-4 py-3 text-[14px] focus:outline-none focus:border-brand" placeholder="Doe" />
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                       <label className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">Work Email</label>
                       <input type="email" className="border border-line rounded-sm px-4 py-3 text-[14px] focus:outline-none focus:border-brand" placeholder="jane@company.com" />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">Company</label>
                       <input type="text" className="border border-line rounded-sm px-4 py-3 text-[14px] focus:outline-none focus:border-brand" placeholder="Acme Corp" />
                    </div>
                 </div>

                 <div className="flex flex-col gap-2">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">How can we help?</label>
                    <textarea rows={5} className="border border-line rounded-sm px-4 py-3 text-[14px] focus:outline-none focus:border-brand resize-none" placeholder="Tell us about your project, use case, or business challenge..."></textarea>
                 </div>

                 <button type="button" className="btn btn-primary bg-brand text-white hover:bg-deep mt-2 self-start px-8">Submit Request</button>
              </form>
           </div>

           {/* Info Side */}
           <div className="lg:w-1/3 flex flex-col gap-8">
              
              <div className="bg-grid-bg border border-line rounded-sm p-8">
                 <div className="w-10 h-10 border border-brand/20 bg-brand/10 rounded flex items-center justify-center text-brand mb-4">
                    <Mail className="w-5 h-5" />
                 </div>
                 <h4 className="font-semibold text-[16px] mb-2">Email Us</h4>
                 <p className="text-[14px] text-ink-soft mb-4">For general inquiries and project requests.</p>
                 <a href="mailto:soham@botmartz.com" className="font-mono text-[13px] text-brand hover:underline">soham@botmartz.com</a>
              </div>
              
              <div className="bg-grid-bg border border-line rounded-sm p-8">
                 <div className="w-10 h-10 border border-brand/20 bg-brand/10 rounded flex items-center justify-center text-brand mb-4">
                    <Phone className="w-5 h-5" />
                 </div>
                 <h4 className="font-semibold text-[16px] mb-2">Call Us</h4>
                 <p className="text-[14px] text-ink-soft mb-4">Available during business hours (IST).</p>
                 <a href="tel:+919407328842" className="font-mono text-[13px] text-brand hover:underline">+91 94073 28842</a>
              </div>

              <div className="bg-grid-bg border border-line rounded-sm p-8">
                 <div className="w-10 h-10 border border-brand/20 bg-brand/10 rounded flex items-center justify-center text-brand mb-4">
                    <MapPin className="w-5 h-5" />
                 </div>
                 <h4 className="font-semibold text-[16px] mb-2">Headquarters</h4>
                 <p className="text-[14px] text-ink-soft mb-4">We are a globally distributed team headquartered in India.</p>
                 <span className="font-mono text-[13px] text-ink uppercase">Indore, IN</span>
              </div>

           </div>
        </div>
      </section>
    </main>
  );
}