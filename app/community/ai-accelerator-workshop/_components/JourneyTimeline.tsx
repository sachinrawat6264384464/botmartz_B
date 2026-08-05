"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    id: "01",
    title: "Series 1",
    date: "Aug 9, 2026",
    subtitle: "Build Your First AI Full-Stack Application",
    description: "Build an AI-powered application from scratch using the latest AI tools.",
  },
  {
    id: "02",
    title: "Series 2",
    date: "Aug 16, 2026",
    subtitle: "Build Smarter AI Agents",
    description: "Learn how modern AI Agents think, plan and act.",
  },
  {
    id: "03",
    title: "Series 3",
    date: "Aug 22, 2026",
    subtitle: "Build Production Ready AI Applications",
    description: "Understand how modern production AI systems are engineered.",
  },
  {
    id: "04",
    title: "AI Frontier 2026",
    date: "Aug 23, 2026",
    subtitle: "The Ultimate Gathering",
    description: "Join the top AI Engineers in Indore for our flagship event.",
    isHighlight: true,
  },
];

export default function JourneyTimeline() {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#0B1C2C] tracking-tight mb-4">
            The Learning Journey
          </h2>
          <p className="text-lg text-[#475569] max-w-2xl mx-auto font-medium">
            Three live engineering bootcamps leading directly to our flagship summit.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#E2E8F0] via-[#CBD5E1] to-[#E2E8F0] -translate-x-1/2" />

          <div className="space-y-12 relative z-10">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={milestone.id}
                  className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className={`flex-1 w-full ${isEven ? "md:text-left" : "md:text-right"} pl-16 md:pl-0`}>
                    <div
                      className={`inline-block p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow relative ${
                        milestone.isHighlight ? "border-[#0066FF]/30 bg-[#0066FF]/[0.02]" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-xs font-bold tracking-widest uppercase text-[#0066FF]">
                          {milestone.title}
                        </div>
                        <span className="text-[#CBD5E1]">•</span>
                        <div className="text-xs font-bold text-[#64748B]">
                          {milestone.date}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-[#0B1C2C] mb-2">{milestone.subtitle}</h3>
                      <p className="text-[#475569] font-medium leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white border-[3px] border-[#0066FF] z-10 shadow-sm">
                    <span className="text-[10px] font-bold text-[#0066FF]">{milestone.id}</span>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
