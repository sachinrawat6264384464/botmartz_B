"use client";

import React, { useState } from 'react';
import { Mail, MapPin, MessageSquare, Phone, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Botmartz AI Solutions",
    "description": "Book a discovery call with the Botmartz AI engineering team. Let's discuss how custom Generative AI and RAG solutions can impact your business.",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.email.trim() || !form.message.trim()) {
      setError('First Name, Work Email, and Message are required fields.');
      return;
    }

    setSubmitting(true);
    setError('');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setSuccess(true);
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        message: ''
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again later.');
    } finally {
      setSubmitting(false);
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
          <div className="font-mono text-[11px] text-[#00B8F0] uppercase tracking-[0.12em] mb-4">Get In Touch</div>
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
              
              {success ? (
                <div className="flex flex-col items-center justify-center text-center py-12 px-6 bg-emerald-50/50 border border-emerald-200 rounded-sm">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mb-4 animate-bounce" />
                  <h3 className="text-xl font-bold text-[#0d1117] mb-2">Message Sent Successfully!</h3>
                  <p className="text-[14px] text-ink-soft max-w-[400px] mb-6">
                    Thank you for reaching out to Botmartz. Our engineering team has been notified and we will get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setSuccess(false)}
                    className="btn btn-primary bg-brand text-white hover:bg-deep px-6 py-2 text-[14px] font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {error && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 text-[14px] rounded-sm">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <p>{error}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                       <label className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">First Name *</label>
                       <input 
                         type="text" 
                         name="firstName"
                         value={form.firstName}
                         onChange={handleInputChange}
                         required
                         className="border border-line rounded-sm px-4 py-3 text-[14px] focus:outline-none focus:border-brand" 
                         placeholder="Jane" 
                       />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">Last Name</label>
                       <input 
                         type="text" 
                         name="lastName"
                         value={form.lastName}
                         onChange={handleInputChange}
                         className="border border-line rounded-sm px-4 py-3 text-[14px] focus:outline-none focus:border-brand" 
                         placeholder="Doe" 
                       />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                       <label className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">Work Email *</label>
                       <input 
                         type="email" 
                         name="email"
                         value={form.email}
                         onChange={handleInputChange}
                         required
                         className="border border-line rounded-sm px-4 py-3 text-[14px] focus:outline-none focus:border-brand" 
                         placeholder="jane@company.com" 
                       />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">Company</label>
                       <input 
                         type="text" 
                         name="company"
                         value={form.company}
                         onChange={handleInputChange}
                         className="border border-line rounded-sm px-4 py-3 text-[14px] focus:outline-none focus:border-brand" 
                         placeholder="Acme Corp" 
                       />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                     <label className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">How can we help? *</label>
                     <textarea 
                       rows={5} 
                       name="message"
                       value={form.message}
                       onChange={handleInputChange}
                       required
                       className="border border-line rounded-sm px-4 py-3 text-[14px] focus:outline-none focus:border-brand resize-none" 
                       placeholder="Tell us about your project, use case, or business challenge..."
                     />
                  </div>

                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="btn btn-primary bg-brand text-white hover:bg-deep mt-2 self-start px-8 py-3 rounded-sm text-[14px] font-semibold flex items-center gap-2 justify-center min-w-[160px] disabled:opacity-75"
                  >
                    {submitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      'Submit Request'
                    )}
                  </button>
                </form>
              )}
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