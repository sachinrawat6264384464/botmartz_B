"use client";
import { useState, memo, useCallback } from "react";
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

export const NeuralQuery = memo(function NeuralQuery() {
  const [openId, setOpenId] = useState<string | null>(null);

  // Memoized toggle handler
  const createToggleHandler = useCallback((id: string) => {
    return () => setOpenId(prev => prev === id ? null : id);
  }, []);

  return (
    <section className="py-24 max-w-4xl mx-auto px-6 md:px-12">
      <h2 className="text-4xl font-bold mb-12 text-center">
        NEURAL <span className="text-[#D4AF37]">QUERY</span>
      </h2>
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
    </section>
  );
});

NeuralQuery.displayName = 'NeuralQuery';