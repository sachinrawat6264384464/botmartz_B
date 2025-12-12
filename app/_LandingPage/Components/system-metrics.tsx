"use client";
export function SystemMetrics() {
  const metrics = [
    { label: "Lines of Automation", value: "2M+", desc: "Executed Code" },
    { label: "Process Efficiency", value: "99.9%", desc: "Uptime Guaranteed" },
    { label: "Client ROI", value: "300%", desc: "Average Increase" },
    { label: "Data Processed", value: "50TB", desc: "Securely Handled" },
  ];

  return (
    <section className="py-24 border-y border-white/5 bg-[#080808] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[24px_24px] opacity-20" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
          {metrics.map((metric, i) => (
            <div key={i} className="text-center md:text-left group">
              <h3 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tighter group-hover:text-[#D4AF37] transition-colors duration-300">
                {metric.value}
              </h3>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">{metric.label}</p>
              <p className="font-mono text-xs text-[#D4AF37]/60">{metric.desc}</p>
            </div>
          ))}
        </div>
    </section>
  );
}