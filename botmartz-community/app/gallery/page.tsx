"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Camera, Image as ImageIcon, Sparkles, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
  caption?: string;
}

const SAMPLE_GALLERY: GalleryImage[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80",
    title: "AI Frontier Keynote",
    category: "AI Frontier",
    caption: "Opening keynote on production agent state machines and retrieval architectures."
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80",
    title: "RAG & Vector Search Workshop",
    category: "Workshops",
    caption: "Live coding session setting up hybrid dense and sparse retrieval."
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&auto=format&fit=crop&q=80",
    title: "AI Builders Networking",
    category: "Community Meetups",
    caption: "Developers and founders networking post-talks."
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
    title: "Hackathon Sprint",
    category: "Workshops",
    caption: "Teams building autonomous research copilots."
  }
];

const CATEGORIES = ["All", "AI Frontier", "Workshops", "Community Meetups"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filtered = activeCategory === "All"
    ? SAMPLE_GALLERY
    : SAMPLE_GALLERY.filter(img => img.category === activeCategory);

  return (
    <div className="bg-[#050B14] min-h-screen text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/30 text-[#00B8F0] font-mono text-xs uppercase tracking-widest mb-4 font-semibold">
            <Camera size={14} /> Community Memories &amp; Moments
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Botmartz Community Gallery
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Glimpses from our flagship conferences, hands-on developer hackathons, and local AI engineering meetups.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#0066FF] text-white shadow-md"
                  : "bg-[#0B1524] text-slate-400 border border-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group bg-[#0B1524] border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-[#00B8F0]/50 transition-all shadow-xl"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#050B14]/80 backdrop-blur-md text-[11px] font-mono text-[#00B8F0] font-bold">
                  {item.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-[#00B8F0] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full bg-[#0B1524] border border-white/15 rounded-2xl overflow-hidden shadow-2xl">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black"
              >
                <X size={20} />
              </button>
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full max-h-[70vh] object-contain bg-black"
              />
              <div className="p-6 bg-[#0B1524]">
                <div className="text-xs font-mono text-[#00B8F0] mb-1">{selectedImage.category}</div>
                <h2 className="text-xl font-bold text-white mb-2">{selectedImage.title}</h2>
                <p className="text-sm text-slate-300">{selectedImage.caption}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
