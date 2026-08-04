"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What are the prerequisites for these bootcamps?",
    a: "Basic programming knowledge (Python or JavaScript) is required. You don't need prior AI experience, but familiarity with APIs and web development concepts is helpful.",
  },
  {
    q: "Are the sessions recorded?",
    a: "Yes. All live sessions are recorded and made available to attendees within 24 hours via the community portal.",
  },
  {
    q: "What is the refund policy?",
    a: "We offer a 100% money-back guarantee if you request a refund before the start of the first session. Post-commencement refunds are not provided.",
  },
  {
    q: "Do I get a certificate?",
    a: "Yes. Upon completing the required projects for each bootcamp, you will receive a verifiable Certificate of Completion from Botmartz AI Solutions.",
  },
  {
    q: "How does the AI Engineering Pass work?",
    a: "The Pass grants you access to all three bootcamps at a discounted rate, plus exclusive access to the comprehensive resource pack and early access to AI Frontier 2026 registration.",
  },
  {
    q: "Where is the community hosted?",
    a: "Our community is hosted on an exclusive Discord server for AI Engineers. You will receive an invite link immediately after registration.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#0B1C2C] tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[#475569] font-medium max-w-2xl mx-auto">
            Everything you need to know about the bootcamps and the AI Engineering Pass.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="mb-4 bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-[#F8FAFC] transition-colors"
                >
                  <span className="text-lg font-bold text-[#0B1C2C] pr-8">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#94A3B8] transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-[#475569] leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
