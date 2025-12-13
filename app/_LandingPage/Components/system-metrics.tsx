"use client";
import { memo } from "react";
import { motion } from "framer-motion";

interface Metric {
  id: string;
  label: string;
  value: string;
  desc: string;
}

// Static data outside component
const METRICS: readonly Metric[] = [
  { id: "automation", label: "Lines of Automation", value: "2M+", desc: "Executed Code" },
  { id: "efficiency", label: "Process Efficiency", value: "99.9%", desc: "Uptime Guaranteed" },
  { id: "roi", label: "Client ROI", value: "300%", desc: "Average Increase" },
  { id: "data", label: "Data Processed", value: "50TB", desc: "Securely Handled" },
] as const;

// Memoized Metric Card
const MetricCard = memo(({ 
  metric, 
  index 
}: { 
  metric: Metric; 
  index: number;
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ 
      delay: index * 0.1, 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1] 
    }}
    className="text-center md:text-left group"
  >
    <h3 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tighter group-hover:text-[#D4AF37] transition-colors duration-300 tabular-nums">
      {metric.value}
    </h3>
    <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">
      {metric.label}
    </p>
    <p className="font-mono text-xs text-[#D4AF37]/60">
      {metric.desc}
    </p>
  </motion.div>
));

MetricCard.displayName = 'MetricCard';

// Main Component
export const SystemMetrics = memo(function SystemMetrics() {
  return (
    <section className="py-24 border-y border-white/5 bg-[#080808] relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div 
        className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff03 1px, transparent 1px), linear-gradient(to bottom, #ffffff03 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
        {METRICS.map((metric, i) => (
          <MetricCard 
            key={metric.id} 
            metric={metric} 
            index={i} 
          />
        ))}
      </div>
    </section>
  );
});

SystemMetrics.displayName = 'SystemMetrics';