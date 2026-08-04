"use client";

import React, { useState } from 'react';
import { Mail, MapPin, Phone, CheckCircle, AlertCircle, RefreshCw, HelpCircle, ShieldCheck, Clock, Layers } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface ContactClientProps {
  heroData: {
    badge: string;
    title: string;
    subtitle: string;
  };
  structuredData: any;
  settings?: any;
}

export default function ContactClient({ heroData, structuredData, settings }: ContactClientProps) {
  const email = settings?.general?.email || "soham@botmartz.com";
  const phone = settings?.general?.phone || "+91 94073 28842";
  const address = settings?.general?.address || "Indore, IN";

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

      if (res.ok) {
        setSuccess(true);
        trackEvent("form_submission", { form_name: "contact_us", company: form.company });
        setForm({ firstName: '', lastName: '', email: '', company: '', message: '' });
      } else {
        const data = await res.json();
        setError(data.error || 'Something went wrong. Please try again.');
        trackEvent("form_submission", { form_name: "contact_us", error: data.error });
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* HERO SECTION */}
      <section className="relative pt-[120px] pb-[80px] bg-white text-slate-900 overflow-hidden border-b border-slate-200">
        {/* Background glow effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="wrap relative z-10 flex flex-col items-center text-center max-w-[800px] mx-auto">
          <div className="w-16 h-16 bg-[#00B8F0]/10 border border-[#00B8F0]/20 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <Mail className="w-8 h-8 text-[#00B8F0]" />
          </div>
          <div className="font-mono text-[11px] tracking-[0.14em] text-[#007BFF] uppercase mb-4 flex items-center gap-3 font-semibold justify-center">
            <span className="w-6 h-px bg-[#007BFF]/30"></span>
            {heroData.badge}
            <span className="w-6 h-px bg-[#007BFF]/30"></span>
          </div>
          <h1 
            className="text-[clamp(36px,4.5vw,56px)] leading-[1.1] font-extrabold mb-6 tracking-tight text-slate-900"
            dangerouslySetInnerHTML={{ __html: heroData.title }}
          />
          <p className="text-[17px] text-slate-600 max-w-[600px] mx-auto">
            {heroData.subtitle}
          </p>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="py-[80px] bg-white">
        <div className="wrap flex flex-col lg:flex-row gap-12">
           
           {/* Form Side */}
           <div className="lg:w-2/3 bg-white border border-slate-200 p-8 md:p-12 rounded-xl shadow-sm">
              <h2 className="text-[24px] font-semibold mb-8 text-slate-900">Send us a message</h2>
              
              {success ? (
                <div className="flex flex-col items-center justify-center text-center py-12 px-6 bg-[#00B8F0]/5 border border-[#00B8F0]/20 rounded-xl">
                  <CheckCircle className="w-16 h-16 text-[#00B8F0] mb-4 animate-bounce" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent Successfully!</h3>
                  <p className="text-[14px] text-slate-600 max-w-[400px] mb-6">
                    Thank you for reaching out to Botmartz. Our engineering team has been notified and we will get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setSuccess(false)}
                    className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-6 py-2 text-[14px] font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {error && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-600 text-[14px] rounded-lg">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <p>{error}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                       <label className="font-mono text-[11px] uppercase tracking-wider text-slate-500 font-semibold">First Name *</label>
                       <input 
                         type="text" 
                         name="firstName"
                         value={form.firstName}
                         onChange={handleInputChange}
                         required
                         className="bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-3 text-[14px] focus:outline-none focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]" 
                         placeholder="Jane" 
                       />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="font-mono text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Last Name</label>
                       <input 
                         type="text" 
                         name="lastName"
                         value={form.lastName}
                         onChange={handleInputChange}
                         className="bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-3 text-[14px] focus:outline-none focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]" 
                         placeholder="Doe" 
                       />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                       <label className="font-mono text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Work Email *</label>
                       <input 
                         type="email" 
                         name="email"
                         value={form.email}
                         onChange={handleInputChange}
                         required
                         className="bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-3 text-[14px] focus:outline-none focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]" 
                         placeholder="jane@company.com" 
                       />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="font-mono text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Company</label>
                       <input 
                         type="text" 
                         name="company"
                         value={form.company}
                         onChange={handleInputChange}
                         className="bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-3 text-[14px] focus:outline-none focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]" 
                         placeholder="Acme Corp" 
                       />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                     <label className="font-mono text-[11px] uppercase tracking-wider text-slate-500 font-semibold">How can we help? *</label>
                     <textarea 
                       rows={5} 
                       name="message"
                       value={form.message}
                       onChange={handleInputChange}
                       required
                       className="bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-3 text-[14px] focus:outline-none focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0] resize-none" 
                       placeholder="Tell us about your project, use case, or business challenge..."
                     />
                  </div>

                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] mt-2 self-start px-8 py-3 rounded-lg text-[14px] font-semibold flex items-center gap-2 justify-center min-w-[160px] disabled:opacity-75 transition-all shadow-sm"
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
            <div className="lg:w-1/3 flex flex-col gap-6">
               
               <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 transition-colors hover:border-slate-300">
                  <div className="w-10 h-10 border border-[#00B8F0]/20 bg-[#00B8F0]/10 rounded-lg flex items-center justify-center text-[#00B8F0] mb-4">
                     <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-[16px] mb-2 text-slate-900">Email Us</h3>
                  <p className="text-[14px] text-slate-600 mb-4">For general inquiries and project requests.</p>
                  <a href={`mailto:${email}`} className="font-mono text-[13px] text-[#00B8F0] hover:underline font-semibold">{email}</a>
               </div>
               
               <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 transition-colors hover:border-slate-300">
                  <div className="w-10 h-10 border border-[#00B8F0]/20 bg-[#00B8F0]/10 rounded-lg flex items-center justify-center text-[#00B8F0] mb-4">
                     <Phone className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-[16px] mb-2 text-slate-900">Call Us</h3>
                  <p className="text-[14px] text-slate-600 mb-4">Available during business hours (IST).</p>
                  <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="font-mono text-[13px] text-[#00B8F0] hover:underline font-semibold">{phone}</a>
               </div>

               <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 transition-colors hover:border-slate-300">
                  <div className="w-10 h-10 border border-[#00B8F0]/20 bg-[#00B8F0]/10 rounded-lg flex items-center justify-center text-[#00B8F0] mb-4">
                     <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-[16px] mb-2 text-slate-900">Headquarters</h3>
                  <p className="text-[14px] text-slate-600 mb-4">We are a globally distributed team headquartered in India.</p>
                  <span className="font-mono text-[13px] text-slate-800 font-semibold uppercase tracking-wide">{address}</span>
               </div>

            </div>
         </div>
      </section>

      {/* FAQ & ENGAGEMENT PROCESS */}
      <section className="py-[100px] bg-slate-50 border-t border-slate-200">
        <div className="wrap max-w-[1100px] mx-auto">
          <div className="text-center mb-16">
            <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-3 font-semibold">Discovery & Engagement Process</div>
            <h2 className="text-[32px] md:text-[40px] font-semibold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600 text-[16px] md:text-[18px] max-w-[640px] mx-auto">
              Everything you need to know about our enterprise AI engineering workflows, security guarantees, and collaboration models.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 p-8 rounded-xl hover:border-[#00B8F0]/30 hover:shadow-md transition-all flex flex-col justify-between shadow-sm">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#00B8F0]/10 border border-[#00B8F0]/20 flex items-center justify-center text-[#00B8F0] mb-5">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h3 className="text-[20px] font-semibold text-slate-900 mb-3">What happens during the initial Discovery Call?</h3>
                <p className="text-[15px] text-slate-600 leading-relaxed">
                  During our 60-minute strategy session, our AI engineering leadership meets with your technical and executive stakeholders. We analyze your existing data systems, identify high-value workflow bottlenecks, evaluate feasibility, and sketch an initial technical architecture tailored to your goals. You walk away with a clear roadmap whether we work together or not.
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-xl hover:border-[#00B8F0]/30 hover:shadow-md transition-all flex flex-col justify-between shadow-sm">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#00B8F0]/10 border border-[#00B8F0]/20 flex items-center justify-center text-[#00B8F0] mb-5">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-[20px] font-semibold text-slate-900 mb-3">How do you ensure data privacy, security, and IP protection?</h3>
                <p className="text-[15px] text-slate-600 leading-relaxed">
                  We treat enterprise security as a first-class citizen. Before diving into proprietary codebase or dataset reviews, we execute standard mutual Non-Disclosure Agreements (NDAs). All custom RAG pipelines, autonomous agents, and fine-tuned models are built within your dedicated cloud infrastructure (AWS, Azure, or GCP), ensuring your proprietary data never leaves your VPC or trains public models.
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-xl hover:border-[#00B8F0]/30 hover:shadow-md transition-all flex flex-col justify-between shadow-sm">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#00B8F0]/10 border border-[#00B8F0]/20 flex items-center justify-center text-[#00B8F0] mb-5">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-[20px] font-semibold text-slate-900 mb-3">What is your typical project timeline and engagement model?</h3>
                <p className="text-[15px] text-slate-600 leading-relaxed">
                  We offer flexible, results-oriented engagement tiers ranging from dedicated AI engineering squads to end-to-end custom system builds. Most initial Minimum Viable Production (MVP) architectures are designed, tested, and deployed within 6 to 8 weeks, followed by continuous monitoring, optimization, and scaling phases across your enterprise.
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-xl hover:border-[#00B8F0]/30 hover:shadow-md transition-all flex flex-col justify-between shadow-sm">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#00B8F0]/10 border border-[#00B8F0]/20 flex items-center justify-center text-[#00B8F0] mb-5">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-[20px] font-semibold text-slate-900 mb-3">Do you integrate with our existing enterprise software stack?</h3>
                <p className="text-[15px] text-slate-600 leading-relaxed">
                  Absolutely. Our engineering team specializes in connecting modern AI layers (LangGraph, PyTorch, FastAPI, Milvus, Weaviate) directly into legacy enterprise systems, CRMs, SQL/NoSQL databases, and internal APIs. We ensure seamless authentication, robust error handling, and low-latency response times across all integrations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
