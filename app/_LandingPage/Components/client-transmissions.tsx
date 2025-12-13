"use client";
import { motion } from "framer-motion";
import { Fingerprint } from "lucide-react";
import { Inter_Tight } from 'next/font/google';
import { memo } from 'react';

const interTight = Inter_Tight({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500'],
  display: 'swap', // Better font loading
  preload: true
});

// Memoized testimonial card to prevent re-renders
const TestimonialCard = memo(({ testimonial, index }: { testimonial: any; index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }} // Trigger earlier for smoother experience
    transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }} // Eased timing
    className="bg-[#0A0A0A] border border-white/5 p-8 rounded-xl hover:border-[#D4AF37]/30 transition-all duration-300 group"
  >
    <div className="flex items-center gap-4 mb-6 opacity-50 group-hover:opacity-100 transition-opacity">
      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#D4AF37]">
        <Fingerprint size={20} />
      </div>
      <div className="font-mono text-xs">
        <p className="text-white">{testimonial.name}</p>
        <p className="text-gray-500">{testimonial.role}</p>
      </div>
    </div>
    <p className={`${interTight.className} text-gray-400 leading-relaxed italic`}>
      "{testimonial.text}"
    </p>
  </motion.div>
));

TestimonialCard.displayName = 'TestimonialCard';

// Constant data outside component to prevent recreating on each render
const TESTIMONIALS = [
  { 
    name: "Sarah J.", 
    role: "CTO, FinTech Global", 
    text: "Botmartz didn't just build a website; they architected a digital ecosystem that handles 50k requests/sec." 
  },
  { 
    name: "David K.", 
    role: "Founder, Zenith AI", 
    text: "The operational latency dropped by 40% within weeks of deployment. A masterclass in engineering." 
  },
  { 
    name: "Elena R.", 
    role: "Director, Orbital Ops", 
    text: "Their aesthetic is matched only by their code quality. Truly the future of digital agencies." 
  },
] as const;

export const ClientTransmissions = memo(function ClientTransmissions() {
  return (
    <section className="py-32 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-sm uppercase tracking-[0.4em] text-[#D4AF37] mb-16 text-center">
          Incoming Transmissions
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.name} // More stable key than index
              testimonial={testimonial} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
});

ClientTransmissions.displayName = 'ClientTransmissions';