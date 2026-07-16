import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Brain, Database, Zap, BarChart, Shield, Code, Settings, FileText } from 'lucide-react';
import DynamicIcon from '@/app/_components/DynamicIcon';
import { adminDb } from '@/lib/firebase-admin';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Model Fine-tuning Services — Custom AI Models for Your Domain | Botmartz',
    description: 'Botmartz fine-tunes foundation models on your proprietary data — creating domain-specific AI that outperforms general models on your exact tasks.',
  };
  try {
    const docSnap = await adminDb.collection('dynamic_pages').doc('model-fine-tuning').get();
    if (docSnap.exists) { const data = docSnap.data(); if (data?.metadata) meta = { ...meta, ...data.metadata }; }
  } catch (e) {}
  return { ...meta, openGraph: { title: meta.title, description: meta.description, url: 'https://botmartz.com/services/model-fine-tuning', type: 'website' }, alternates: { canonical: 'https://botmartz.com/services/model-fine-tuning' } };
}

const DEFAULT_CONTENT = {
  hero: {
    badge: 'Services / Model Fine-tuning',
    title: 'AI Models Trained on Your Data. Not Generic Ones.',
    subtitle: 'General-purpose LLMs fail at specialized tasks. We fine-tune foundation models on your proprietary data — creating AI that understands your domain, speaks your language, and outperforms out-of-the-box alternatives.',
    ctaText: 'Discuss Your Fine-tuning Project →',
    ctaLink: '/contact',
  },
  aeoQuestion: 'What is LLM fine-tuning and when do you need it?',
  aeoAnswer: 'LLM fine-tuning is the process of training a pre-trained language model further on a domain-specific dataset to improve its performance on specialized tasks. You need fine-tuning when general-purpose models produce inaccurate results for your domain (legal, medical, financial, engineering), when you need consistent formatting or tone not achievable through prompting, when latency and cost optimization require a smaller specialized model, or when you need to incorporate proprietary knowledge that cannot be embedded in context windows.',
  useCases: [
    { iconName: 'Brain', title: 'Domain Adaptation', description: 'Fine-tune models on legal, medical, financial, or technical corpora for dramatically better accuracy on specialized queries.' },
    { iconName: 'FileText', title: 'Instruction Tuning', description: 'Train models to follow specific formats, personas, and task instructions consistently across all outputs.' },
    { iconName: 'Database', title: 'Proprietary Knowledge Injection', description: 'Encode your internal documents, policies, and domain knowledge directly into model weights for always-available context.' },
    { iconName: 'Zap', title: 'Model Distillation', description: 'Distill large frontier models into smaller, faster, cheaper models that maintain high accuracy on your specific tasks.' },
    { iconName: 'BarChart', title: 'RLHF & Preference Tuning', description: 'Use reinforcement learning from human feedback (RLHF) or DPO to align model outputs with your quality standards.' },
    { iconName: 'Shield', title: 'Safety & Alignment Tuning', description: 'Fine-tune models to refuse specific types of outputs, adhere to compliance requirements, and maintain safe behavior.' },
    { iconName: 'Code', title: 'Code & Technical Models', description: 'Specialize models for your codebase, programming languages, or technical documentation for better developer tooling.' },
    { iconName: 'Settings', title: 'Evaluation & Benchmarking', description: 'Build custom evaluation datasets and benchmarks to measure model performance before and after fine-tuning.' },
  ],
  techStack: ['PyTorch', 'Hugging Face', 'LoRA / QLoRA', 'Axolotl', 'OpenAI Fine-tuning', 'Weights & Biases', 'vLLM', 'NVIDIA H100'],
  cta: {
    title: 'Ready to Build a Model That Actually Knows Your Domain?',
    subtitle: 'Stop fighting general-purpose models. Fine-tune on your data and get AI that speaks your language.',
    buttonText: 'Discuss Your Fine-tuning Project →',
  },
  structuredData: JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'LLM Fine-tuning & Model Customization',
    provider: { '@type': 'Organization', name: 'Botmartz' },
    description: 'Fine-tuning foundation models on proprietary data for domain adaptation, instruction tuning, model distillation, and RLHF alignment.',
    serviceType: 'AI Engineering Services',
    areaServed: 'Worldwide',
  }),
};

export default async function ModelFineTuningPage() {
  let content = { ...DEFAULT_CONTENT };
  try {
    const docSnap = await adminDb.collection('dynamic_pages').doc('model-fine-tuning').get();
    if (docSnap.exists) {
      const data = docSnap.data();
      content = { hero: data?.hero || DEFAULT_CONTENT.hero, aeoQuestion: data?.aeoQuestion || DEFAULT_CONTENT.aeoQuestion, aeoAnswer: data?.aeoAnswer || DEFAULT_CONTENT.aeoAnswer, useCases: data?.useCases || DEFAULT_CONTENT.useCases, techStack: data?.techStack || DEFAULT_CONTENT.techStack, cta: data?.cta || DEFAULT_CONTENT.cta, structuredData: data?.structuredData || DEFAULT_CONTENT.structuredData };
    }
  } catch (e) {}

  return (
    <main className="bg-[#050B14] min-h-screen text-white">
      {content.structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: content.structuredData }} />}

      {/* HERO */}
      <section className="relative pt-[120px] pb-[80px] bg-[#050B14] text-white overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="wrap relative z-10 flex flex-col items-center text-center max-w-[800px] mx-auto">
          <div className="font-mono text-[11px] tracking-[0.14em] text-[#00B8F0] uppercase mb-6 flex items-center justify-center gap-3 font-semibold">
            <span className="w-6 h-px bg-[#00B8F0]" />{content.hero.badge}<span className="w-6 h-px bg-[#00B8F0]" />
          </div>
          <h1 className="text-[clamp(40px,6vw,64px)] leading-[1.05] font-semibold mb-6 tracking-tight text-white" dangerouslySetInnerHTML={{ __html: content.hero.title }} />
          <p className="text-[17px] sm:text-[19px] text-[#8A9EB0] mb-10 max-w-[600px] leading-relaxed font-light">{content.hero.subtitle}</p>
          <Link href={content.hero.ctaLink} className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-8 py-3.5 rounded text-[15px] flex items-center gap-2">
            {content.hero.ctaText}
          </Link>
        </div>
        <div className="mt-20 relative max-w-[1000px] mx-auto hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050B14] z-10" />
          <div className="grid grid-cols-5 gap-4 opacity-30">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="h-16 border border-[#1E293B] rounded bg-[#0A111F]/50 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#00B8F0]/30 animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AEO */}
      <section className="py-[100px] bg-[#0A111F] border-y border-[#1E293B]">
        <div className="wrap flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#050B14] border border-[#1E293B] text-[13px] text-[#8A9EB0] mb-6 font-mono">
              <span className="w-2 h-2 rounded-full bg-[#00B8F0] animate-pulse" />AEO Optimized Context
            </div>
            <h2 className="text-[32px] md:text-[40px] font-semibold mb-6 tracking-tight text-white">{content.aeoQuestion}</h2>
            <p className="text-[17px] text-[#8A9EB0] leading-relaxed">{content.aeoAnswer}</p>
          </div>
          <div className="w-full md:w-1/2">
            <div className="bg-[#050B14] border border-[#1E293B] rounded-xl p-8">
              <div className="font-mono text-[11px] text-[#8A9EB0] uppercase tracking-widest mb-6">General LLM vs. Fine-tuned Model</div>
              <div className="space-y-3">
                {[
                  { label: 'Domain Accuracy', general: '60–70%', finetuned: '90–95%', highlight: true },
                  { label: 'Token Efficiency', general: 'High (large prompts)', finetuned: 'Low (smaller context)' },
                  { label: 'Cost per Query', general: 'High', finetuned: '3–10× cheaper' },
                  { label: 'Latency', general: 'Slower', finetuned: 'Faster' },
                ].map(({ label, general, finetuned, highlight }) => (
                  <div key={label} className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-[#8A9EB0] font-medium">{label}</div>
                    <div className="text-center text-[#8A9EB0] bg-[#0A111F] border border-[#1E293B] rounded px-2 py-1">{general}</div>
                    <div className={`text-center rounded px-2 py-1 font-semibold ${highlight ? 'bg-[#00B8F0]/10 border border-[#00B8F0]/40 text-[#00B8F0]' : 'bg-[#0A111F] border border-[#1E293B] text-white'}`}>{finetuned}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-[100px] bg-[#050B14]">
        <div className="wrap">
          <div className="text-center mb-16 max-w-[700px] mx-auto">
            <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-white mb-4">Fine-tuning Capabilities</h2>
            <p className="text-[#8A9EB0] text-[17px]">From data preparation to model deployment — we handle every step of the fine-tuning pipeline.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.useCases.map((uc: any, i: number) => (
              <div key={i} className="bg-[#0A111F] border border-[#1E293B] rounded-xl p-6 hover:border-[#00B8F0]/50 hover:shadow-[0_0_30px_rgba(0,184,240,0.05)] transition-all group">
                <div className="w-12 h-12 rounded-lg bg-[#050B14] border border-[#1E293B] flex items-center justify-center mb-6 text-[#8A9EB0] group-hover:text-[#00B8F0] group-hover:border-[#00B8F0]/30 transition-colors">
                  <DynamicIcon name={uc.iconName} />
                </div>
                <h3 className="text-[18px] font-semibold text-white mb-3">{uc.title}</h3>
                <p className="text-[14px] text-[#8A9EB0] leading-relaxed">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-12 border-y border-[#1E293B] bg-[#0A111F] overflow-hidden">
        <div className="wrap flex items-center gap-8">
          <div className="font-mono text-[11px] text-[#8A9EB0] uppercase tracking-wider whitespace-nowrap shrink-0">Stack</div>
          <div className="flex-1 flex gap-8 md:gap-16 items-center overflow-x-auto text-white font-mono text-[14px]">
            {content.techStack.map((tech: string, i: number) => (
              <span key={i} className="whitespace-nowrap flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B8F0]" />{tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[100px] bg-[#050B14]">
        <div className="wrap">
          <div className="bg-gradient-to-br from-[#0A111F] to-[#050B14] border border-[#1E293B] rounded-2xl p-10 md:p-16 text-center max-w-[900px] mx-auto relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00B8F0]/10 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-white mb-6">{content.cta.title}</h2>
              <p className="text-[#8A9EB0] text-[17px] md:text-[19px] max-w-[600px] mx-auto mb-10 leading-relaxed font-light">{content.cta.subtitle}</p>
              <Link href="/contact" className="btn btn-primary bg-[#00B8F0] text-white hover:bg-[#0096C7] px-8 py-4 rounded text-[15px] inline-flex items-center gap-2 font-medium">
                {content.cta.buttonText}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
