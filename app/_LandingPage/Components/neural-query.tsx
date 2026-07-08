"use client";
import { useState, memo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Static FAQ data
const FAQS = [
  { 
    id: 'tech-stack',
    q: "What tech stack do you utilize?", 
    a: "We operate on the bleeding edge: Next.js 14, Rust for computation, Python for AI agents, and WebGL for visualization." 
  },
  { 
    id: 'support',
    q: "Do you offer post-deployment support?", 
    a: "Affirmative. We provide 24/7 system monitoring and iterative updates to ensure your infrastructure evolves." 
  },
  { 
    id: 'legacy',
    q: "Can you integrate with legacy systems?", 
    a: "Our specialized 'Bridge' protocol allows us to wrap legacy mainframes in modern API layers without disrupting operations." 
  },
  { 
    id: 'timeline',
    q: "What is the typical development timeline?", 
    a: "Timelines vary by complexity. Standard deployment ranges from 4-8 weeks for MVP, 3-6 months for enterprise architecture." 
  }
] as const;

// Memoized FAQ Item
const FAQItem = memo(({ 
  question, 
  answer, 
  isOpen, 
  onToggle 
}: { 
  question: string; 
  answer: string; 
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className="border border-white/5 bg-white/5 rounded-lg overflow-hidden transition-all duration-300 hover:border-white/10">
      <button 
        onClick={onToggle} 
        className="w-full flex items-center justify-between p-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-lg text-gray-300">{question}</span>
        <ChevronDown 
          className={`text-[#D4AF37] transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
          size={20}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-gray-500 font-light border-t border-white/5">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

FAQItem.displayName = 'FAQItem';

// Lazy video — only loads when scrolled into view
function LazyVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      src={inView ? '/botmartzhi.mp4' : undefined}
      className="w-full h-auto block"
      style={{ background: '#050505' }}
    />
  );
}

import SchemaMarkup from "@/app/_components/SchemaMarkup";

// Main Component
function NeuralQuery() {
  const [openId, setOpenId] = useState<string | null>(null);

  const createToggleHandler = useCallback((id: string) => {
    return () => setOpenId(prev => prev === id ? null : id);
  }, []);

  return (
    <section className="min-h-screen bg-black py-24 px-6 md:px-12 overflow-hidden">
      <SchemaMarkup type="FAQPage" data={{ faqs: FAQS }} />
      <h2 className="text-4xl font-bold mb-16 text-center text-white">
        EXPERT <span className="text-[#D4AF37]">INSIGHTS</span>
      </h2>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Video */}
        <div className="relative group flex flex-col items-center">
          {/* Ambient glow behind the card */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/25 via-[#D4AF37]/5 to-transparent rounded-3xl blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />

          <div className="relative w-full rounded-2xl overflow-hidden border border-[#D4AF37]/25 shadow-[0_0_40px_rgba(212,175,55,0.15)] group-hover:shadow-[0_0_60px_rgba(212,175,55,0.25)] transition-shadow duration-500 bg-[#0a0a0a]">
            {/* Gold top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent z-10" />

            <LazyVideo />

            {/* Bottom label overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 via-black/40 to-transparent px-6 py-4 flex items-end justify-between">
              <div>
                <p className="text-[#D4AF37] font-bold text-sm tracking-widest uppercase">Botmartz Support</p>
                <p className="text-white/40 text-xs mt-0.5 font-mono">Your Growth Partner</p>
              </div>
              {/* Live indicator */}
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_6px_#D4AF37]" />
                <span className="text-[#D4AF37] text-xs font-mono tracking-widest">LIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - FAQ */}
        <div className="space-y-4">
          {FAQS.map((faq) => (
            <FAQItem 
              key={faq.id} 
              question={faq.q} 
              answer={faq.a}
              isOpen={openId === faq.id}
              onToggle={createToggleHandler(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default NeuralQuery;