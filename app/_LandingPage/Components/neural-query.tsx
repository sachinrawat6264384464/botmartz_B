"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function NeuralQuery() {
  const faqs = [
    { q: "What tech stack do you utilize?", a: "We operate on the bleeding edge: Next.js 14, Rust for computation, Python for AI agents, and WebGL for visualization." },
    { q: "Do you offer post-deployment support?", a: "Affirmative. We provide 24/7 system monitoring and iterative updates to ensure your infrastructure evolves." },
    { q: "Can you integrate with legacy systems?", a: "Our specialized 'Bridge' protocol allows us to wrap legacy mainframes in modern API layers without disrupting operations." },
    { q: "What is the typical development timeline?", a: "Timelines vary by complexity. Standard deployment ranges from 4-8 weeks for MVP, 3-6 months for enterprise architecture." }
  ];

  return (
    <section className="py-24 max-w-4xl mx-auto px-6 md:px-12">
       <h2 className="text-4xl font-bold mb-12 text-center">NEURAL <span className="text-[#D4AF37]">QUERY</span></h2>
       <div className="space-y-4">
         {faqs.map((faq, i) => (
           <FAQItem key={i} question={faq.q} answer={faq.a} />
         ))}
       </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/5 bg-white/5 rounded-lg overflow-hidden transition-all duration-300 hover:border-white/10">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-6 text-left">
        <span className="font-medium text-lg text-gray-300">{question}</span>
        <ChevronDown className={`text-[#D4AF37] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
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
}