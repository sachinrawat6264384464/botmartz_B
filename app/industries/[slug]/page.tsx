"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import TemplateRenderer from "@/app/_components/templates";

const FALLBACK_CONFIGS: Record<string, any> = {
  education: {
    template: 'template-4',
    hero: {
      badge: 'Industries / Education & EdTech',
      title: 'Autonomous Tutoring & Educational RAG Architectures.',
      subtitle: 'We engineer fine-tuned Socratic tutoring copilots, automated curriculum grading models, and campus-wide RAG knowledge systems that scale personalized learning.',
      ctaText: 'Deploy EdTech Copilots →',
      ctaLink: '/contact'
    },
    benchmarks: [
      { metric: 'Student Retention & Course Completion', baseline: '42.5%', botmartz: '78.4%', improvement: '+35.9% Net Gain' },
      { metric: 'Grading & Rubric Evaluation Accuracy', baseline: '68.0%', botmartz: '96.2%', improvement: '+28.2% Accuracy' },
      { metric: 'Inference Latency for Socratic Dialog', baseline: '580ms', botmartz: '42ms', improvement: '13.8× Faster Response' },
    ],
    caseStudies: [
      { title: 'Personalized Socratic AI Tutor', vertical: 'Higher Ed', metric: '3.4× Engagement', desc: 'Fine-tuned Llama 3 model prompting deeper reasoning instead of direct answer dumping.' },
      { title: 'Multi-Language Campus Knowledge RAG', vertical: 'EdTech Platform', metric: '89% Resolution', desc: 'Unified vector index over 50,000 course syllabi and university regulations.' },
      { title: 'Automated Essay & Rubric Evaluator', vertical: 'K-12 Network', metric: '40hrs Saved/Wk', desc: 'Zero-shot structured feedback engine aligned with state pedagogical standards.' }
    ],
    cta: {
      title: 'Ready to build next-generation educational AI platforms?',
      subtitle: 'From personalized tutoring models to institutional RAG, we engineer educational AI with rigorous safety guardrails.',
      buttonText: 'Book an EdTech Consultation →'
    }
  },
  logistics: {
    template: 'template-2',
    hero: {
      badge: 'Industries / Logistics & Global Supply Chain',
      title: 'Predictive Routing & Supply Chain Intelligence.',
      subtitle: 'Transform logistics operations with autonomous dispatch agents, demand forecasting reinforcement loops, and real-time shipment anomaly detection models.',
      ctaText: 'Optimize Logistics AI →',
      ctaLink: '/contact'
    },
    roiMetrics: [
      { value: '38%', label: 'Reduction in Transit Bottlenecks', highlight: 'Real-time dynamic route rerouting' },
      { value: '94.6%', label: 'Demand Forecasting Accuracy', highlight: 'Prevented warehouse stockouts globally' },
      { value: '4.2hrs', label: 'Daily Dispatch Time Saved', highlight: 'Automated multi-agent fleet scheduling' },
      { value: '22%', label: 'Fuel & Fleet Maintenance Savings', highlight: 'Predictive telematics telemetry analysis' },
    ],
    useCases: [
      { iconName: 'Layers', title: 'Dynamic Multi-Agent Fleet Routing', description: 'Autonomous agents continuously re-optimizing delivery routes based on live traffic, weather patterns, and dock availability.' },
      { iconName: 'BarChart', title: 'Predictive Warehouse Demand RAG', description: 'Vector databases indexing historical seasonal orders and macroeconomic trends to automate inventory re-ordering.' },
      { iconName: 'Activity', title: 'Automated Customs & Freight Document OCR', description: 'Fine-tuned vision-language models extracting structured data from multi-lingual bills of lading instantly.' },
    ],
    cta: {
      title: 'Ready to modernize your logistics and supply chain network?',
      subtitle: 'We deploy production AI that cuts transport overhead and eliminates supply chain opacity.',
      buttonText: 'Book a Supply Chain Discovery Call →'
    }
  }
};

export default function DynamicIndustryPage({ params }: { params: any }) {
  const resolvedParams = params instanceof Promise ? use(params) : params;
  const slug = resolvedParams?.slug;

  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    async function fetchPageConfig() {
      try {
        const docRef = doc(db, "dynamic_pages", slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContent(docSnap.data());
        } else if (FALLBACK_CONFIGS[slug]) {
          setContent(FALLBACK_CONFIGS[slug]);
        }
      } catch (err) {
        console.error("Error loading dynamic industry page:", err);
        if (FALLBACK_CONFIGS[slug]) {
          setContent(FALLBACK_CONFIGS[slug]);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchPageConfig();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050B14] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-zinc-700 border-t-[#00B8F0] rounded-full animate-spin" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-[#050B14] text-white flex flex-col items-center justify-center px-4 font-sans">
        <h1 className="text-4xl font-bold mb-4 font-mono text-[#00B8F0]">404 - Industry Not Configured</h1>
        <p className="text-[#8A9EB0] mb-8 text-center max-w-[500px]">This vertical page is currently under development or awaiting configuration in the Botmartz admin panel (`/admin/pages`).</p>
        <Link href="/industries" className="btn btn-primary bg-[#00B8F0] px-6 py-3 rounded-lg font-semibold text-white hover:bg-[#0096C7] transition-colors">
          Explore All Industries
        </Link>
      </div>
    );
  }

  return (
    <main>
      {/* Dynamic SEO JSON-LD injection */}
      {content.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: typeof content.structuredData === 'string' ? content.structuredData : JSON.stringify(content.structuredData) }}
        />
      )}

      {/* Render selected template (Template 1, 2, 3, or 4) */}
      <TemplateRenderer content={content} />
    </main>
  );
}
