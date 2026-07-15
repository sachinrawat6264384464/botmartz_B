"use client";
import React, { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

interface Project {
  id: string;
  title: string;
  url: string;
  tag: string;
  result: string;
}

// Fallback static data
const FALLBACK_PROJECTS: readonly Project[] = [
  { id: "lotus", title: "Lotus Skincare", url: "https://lotusskin.in/", tag: "E-commerce", result: "Upto 20% Off" },
  { id: "safari", title: "Safari Bags", url: "https://www.safaribags.com/", tag: "Retail", result: "Premium Collection" },
  { id: "yashueprem", title: "Yashueprem", url: "https://yashueprem.com/", tag: "E-commerce", result: "Curated Products" },
  { id: "swa", title: "SWA Syrups", url: "https://swaartisanalsyrups.com/", tag: "Food & Bev", result: "100% Natural" },
  { id: "plix", title: "PlixLife", url: "https://plixlife.com/", tag: "Wellness", result: "Vegan Products" },
  { id: "tesora", title: "Tesora", url: "https://www.tesora.shop/", tag: "Home", result: "Premium Appliances" },
  { id: "anugami", title: "Anugami", url: "https://anugami.com/", tag: "Technology", result: "Digital Solutions" },
  { id: "nidhi", title: "The Nidhimittal", url: "https://thenidhimittal.com/", tag: "Consulting", result: "Expert Services" },
  { id: "ziplyne", title: "Ziplyne", url: "https://ziplyne.com/", tag: "Logistics", result: "Fast Delivery" }
] as const;

// Memoized Project Row Component
const ProjectRow = memo(({ 
  project, 
  index 
}: { 
  project: Project; 
  index: number;
}) => {
  const formattedIndex = String(index + 1).padStart(2, '0');
  
  return (
    <motion.a 
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        delay: index * 0.08, 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="group relative flex items-center justify-between py-10 border-b border-white/10 hover:border-[#D4AF37]/50 transition-colors cursor-pointer"
    >
      {/* Hover Background */}
      <div className="absolute inset-0 bg-[#D4AF37]/5 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-center -z-10 will-change-transform" />
      
      {/* Left Side */}
      <div className="flex items-baseline gap-8 md:gap-16">
        <span className="font-mono text-xs text-gray-600 group-hover:text-[#D4AF37] transition-colors tabular-nums">
          {formattedIndex}
        </span>
        <h3 className="text-3xl md:text-5xl font-bold text-gray-300 group-hover:text-white transition-colors">
          {project.title}
        </h3>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-8 md:gap-16">
        <div className="hidden md:flex flex-col items-end text-right">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37]">
            {project.tag}
          </span>
          <span className="text-sm text-gray-500">
            {project.result}
          </span>
        </div>
        
        {/* Arrow Button */}
        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-300 flex-shrink-0">
          <ArrowUpRight 
            className="text-gray-400 group-hover:text-black transition-colors" 
            size={20}
            strokeWidth={2}
          />
        </div>
      </div>
    </motion.a>
  );
});

ProjectRow.displayName = 'ProjectRow';

// Main Component
export const ProjectManifest = memo(function ProjectManifest() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const list: Project[] = [];
        snap.forEach((d) => {
          list.push({ id: d.id, ...d.data() } as Project);
        });
        if (list.length > 0) {
          setProjects(list);
        } else {
          setProjects([...FALLBACK_PROJECTS]);
        }
      } catch (err) {
        console.error("Error loading project manifest:", err);
        setProjects([...FALLBACK_PROJECTS]);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <section className="py-32 bg-[#080808] relative overflow-hidden">
      {/* Optional: Add subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <h2 className="text-sm uppercase tracking-[0.4em] text-[#D4AF37] mb-12">
          Deployment Log
        </h2>
        
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-white/20 border-t-[#D4AF37] rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col">
            {projects.map((project, i) => (
              <ProjectRow 
                key={project.id} 
                project={project} 
                index={i} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

ProjectManifest.displayName = 'ProjectManifest';