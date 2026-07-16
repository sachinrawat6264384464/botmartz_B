"use client";

import React, { useState } from "react";
import { Github, ExternalLink, Code, GitFork, Star } from "lucide-react";
import { SiPytorch, SiGooglecloud, SiFastapi, SiPostgresql, SiRedis, SiDocker, SiAmazon } from "react-icons/si";

interface LabItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  repoUrl?: string;
  stars?: number;
  forks?: number;
  badge?: "" | "New" | "Live" | "Beta";
  status: "active" | "inactive";
  featured?: boolean;
}

const CATEGORY_COLORS: Record<string, { text: string; bg: string }> = {
  "Enterprise RAG":  { text: "text-sky-400",    bg: "bg-sky-400/10" },
  "AI Agents":       { text: "text-purple-400",  bg: "bg-purple-400/10" },
  "Computer Vision": { text: "text-emerald-400", bg: "bg-emerald-400/10" },
  "Developer Tools": { text: "text-amber-400",   bg: "bg-amber-400/10" },
  "Infrastructure":  { text: "text-rose-400",    bg: "bg-rose-400/10" },
  "Other":           { text: "text-zinc-400",    bg: "bg-zinc-400/10" },
};

const BADGE_STYLES: Record<string, string> = {
  New:  "bg-emerald-500 text-white",
  Live: "bg-[#00B8F0] text-white",
  Beta: "bg-amber-500 text-white",
};

function formatCount(n: number): string {
  if (!n) return "0";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

const CATEGORIES = ["All Labs", "Enterprise RAG", "AI Agents", "Computer Vision", "Developer Tools", "Infrastructure"];

export default function LabsClient({ initialLabs }: { initialLabs: LabItem[] }) {
  const [activeCategory, setActiveCategory] = useState("All Labs");

  const filteredLabs = activeCategory === "All Labs"
    ? initialLabs
    : initialLabs.filter((l) => l.category === activeCategory);

  return (
    <>
      {/* ── FILTER BAR ── */}
      <section className="py-5 border-b border-[#1E293B] bg-[#0A111F] sticky top-[60px] z-40" id="projects">
        <div className="wrap flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex overflow-x-auto gap-1.5 pb-1 md:pb-0 hide-scrollbar w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 text-[13px] font-semibold rounded-sm transition-colors ${
                  activeCategory === cat
                    ? "bg-[#00B8F0] text-white"
                    : "border border-[#1E293B] text-[#8A9EB0] hover:border-[#00B8F0] hover:text-[#00B8F0]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 border border-[#1E293B] px-3 py-1.5 rounded-sm shrink-0 text-[13px] text-[#8A9EB0]">
            Sort by: <span className="font-semibold text-white ml-1">Latest</span>
          </div>
        </div>
      </section>

      {/* ── LABS GRID ── */}
      <section className="py-[60px] bg-[#050B14]">
        {filteredLabs.length === 0 ? (
          <div className="wrap text-center py-24 text-[#8A9EB0]">
            <Code className="w-10 h-10 mx-auto mb-4 opacity-30" />
            <p className="text-[18px] font-semibold mb-2">No labs found</p>
            <p className="text-[14px]">Check back soon — we're always building.</p>
          </div>
        ) : (
          <div className="wrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredLabs.map((lab) => {
              const catStyle = CATEGORY_COLORS[lab.category] || CATEGORY_COLORS["Other"];
              const badgeStyle = lab.badge ? BADGE_STYLES[lab.badge] : null;

              return (
                <div
                  key={lab.id}
                  className="bg-[#0A111F] border border-[#1E293B] rounded-xl overflow-hidden hover:border-[#00B8F0] hover:shadow-[0_0_24px_rgba(0,184,240,0.15)] transition-all group flex flex-col"
                >
                  {/* ── Thumbnail ── */}
                  <div
                    className="h-[160px] relative overflow-hidden flex items-center justify-center p-4 bg-[#050B14]"
                    style={{ backgroundImage: "linear-gradient(rgba(0,184,240,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.06) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00B8F0]/15 via-transparent to-transparent" />
                    
                    {lab.badge && (
                      <span className={`absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${badgeStyle} z-10 shadow-sm`}>
                        {lab.badge}
                      </span>
                    )}
                    
                    <div className="relative z-10 w-16 h-16 rounded-xl bg-[#0A111F] border border-[#1E293B] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Code className="text-[#8A9EB0] group-hover:text-[#00B8F0] transition-colors" size={28} />
                    </div>
                  </div>

                  {/* ── Content ── */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${catStyle.bg} ${catStyle.text}`}>
                        {lab.category}
                      </span>
                    </div>

                    <h3 className="text-[17px] font-semibold text-white mb-2 leading-tight group-hover:text-[#00B8F0] transition-colors">
                      {lab.title}
                    </h3>
                    <p className="text-[13px] text-[#8A9EB0] line-clamp-3 mb-5 leading-relaxed flex-1">
                      {lab.description}
                    </p>

                    {/* Tags */}
                    {lab.tags && lab.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {lab.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-[11px] font-medium text-[#8A9EB0] bg-[#050B14] border border-[#1E293B] px-1.5 py-0.5 rounded-sm">
                            {tag}
                          </span>
                        ))}
                        {lab.tags.length > 3 && (
                          <span className="text-[11px] font-medium text-[#8A9EB0] px-1">+{lab.tags.length - 3}</span>
                        )}
                      </div>
                    )}

                    {/* Stats & Links */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#1E293B]">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-[12px] font-medium text-[#8A9EB0]">
                          <Star size={13} className="text-amber-400" />
                          <span>{formatCount(lab.stars || 0)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[12px] font-medium text-[#8A9EB0]">
                          <GitFork size={13} />
                          <span>{formatCount(lab.forks || 0)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {lab.githubUrl && (
                          <a href={lab.githubUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-[#8A9EB0] hover:text-white hover:bg-[#1E293B] rounded transition-colors" title="View Source">
                            <Github size={16} />
                          </a>
                        )}
                        {lab.demoUrl && (
                          <a href={lab.demoUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-[#00B8F0] hover:text-[#0096C7] hover:bg-[#00B8F0]/10 rounded transition-colors" title="Live Demo">
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
