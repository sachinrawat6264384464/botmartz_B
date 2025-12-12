"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Project {
  title: string;
  url: string;
  tag: string;
  result: string;
}

const PROJECTS: Project[] = [
  { title: "Lotus Skincare", url: "https://lotusskin.in/", tag: "E-commerce", result: "Upto 20% Off" },
  { title: "Safari Bags", url: "https://www.safaribags.com/", tag: "Retail", result: "Premium Collection" },
  { title: "Yashueprem", url: "https://yashueprem.com/", tag: "E-commerce", result: "Curated Products" },
  { title: "SWA Syrups", url: "https://swaartisanalsyrups.com/", tag: "Food & Bev", result: "100% Natural" },
  { title: "PlixLife", url: "https://plixlife.com/", tag: "Wellness", result: "Vegan Products" },
  { title: "Tesora", url: "https://www.tesora.shop/", tag: "Home", result: "Premium Appliances" },
  { title: "Anugami", url: "https://anugami.com/", tag: "Technology", result: "Digital Solutions" },
  { title: "The Nidhimittal", url: "https://thenidhimittal.com/", tag: "Consulting", result: "Expert Services" },
  { title: "Ziplyne", url: "https://ziplyne.com/", tag: "Logistics", result: "Fast Delivery" }
];

export function ProjectManifest() {
    return (
        <section className="py-32 bg-[#080808] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <h2 className="text-sm uppercase tracking-[0.4em] text-[#D4AF37] mb-12">Deployment Log</h2>
                <div className="flex flex-col">
                    {PROJECTS.map((project, i) => (
                        <ProjectRow key={i} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
    return (
        <motion.a 
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex items-center justify-between py-10 border-b border-white/10 hover:border-[#D4AF37]/50 transition-colors cursor-pointer"
        >
            <div className="absolute inset-0 bg-[#D4AF37]/5 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-center -z-10" />
            
            <div className="flex items-baseline gap-8 md:gap-16">
                <span className="font-mono text-xs text-gray-600 group-hover:text-[#D4AF37]">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-3xl md:text-5xl font-bold text-gray-300 group-hover:text-white transition-colors">
                    {project.title}
                </h3>
            </div>

            <div className="flex items-center gap-8 md:gap-16">
                <div className="hidden md:flex flex-col items-end text-right">
                    <span className="text-xs uppercase tracking-widest text-[#D4AF37]">{project.tag}</span>
                    <span className="text-sm text-gray-500">{project.result}</span>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-300">
                    <ArrowUpRight className="text-gray-400 group-hover:text-black transition-colors" size={20} />
                </div>
            </div>
        </motion.a>
    )
}