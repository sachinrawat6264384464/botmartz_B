"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Camera, 
  Share2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  MessageSquare,
  Maximize2
} from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
  caption?: string;
  createdAt?: string;
}

const CATEGORIES = ["All", "AI Frontier", "Workshops", "Community Meetups", "Behind The Scenes"];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch gallery images from API
  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        if (data.success && Array.isArray(data.images)) {
          setImages(data.images);
        }
      } catch (err) {
        console.error("Failed to load gallery:", err);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  const filteredImages = images.filter(
    (img) => activeCategory === "All" || img.category === activeCategory
  );

  const selectedImage = selectedIndex !== null ? filteredImages[selectedIndex] : null;

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null && prev < filteredImages.length - 1 ? prev + 1 : 0));
  }, [selectedIndex, filteredImages.length]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredImages.length - 1));
  }, [selectedIndex, filteredImages.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    },
    [selectedIndex, handleNext, handlePrev]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleShare = (img: GalleryImage) => {
    const fullUrl = window.location.origin + img.url;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-[#0066FF] selection:text-white pb-24">
      
      {/* HERO SECTION (DARK THEME) */}
      <section className="relative pt-[130px] pb-[80px] overflow-hidden bg-[#050B14] text-white border-b border-white/10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00B8F0]/12 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#0052FF]/15 blur-[160px] rounded-full pointer-events-none" />
        
        <div className="wrap relative z-10 text-center max-w-4xl mx-auto px-4">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B8F0]/10 border border-[#00B8F0]/30 text-[#00B8F0] text-xs font-mono font-bold uppercase tracking-wider mb-6 shadow-sm">
            <Camera size={14} className="animate-pulse text-[#00B8F0]" />
            <span>BOTMARTZ AI GALLERY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15] font-heading">
            Moments, Milestones &amp; <br />
            <span className="bg-gradient-to-r from-[#00B8F0] via-[#0066FF] to-[#60A5FA] bg-clip-text text-transparent">
              AI Engineering Highlights
            </span>
          </h1>

          <p className="text-[#8A9EB0] text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Glimpses from our AI Frontier summits, hands-on agentic hackathons, developer masterclasses, and AI community sprints.
          </p>

          {/* COMMUNITY DISCORD BANNER CARD */}
          <div className="max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-[#0B1524] border border-white/10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-[#5865F2] flex items-center justify-center text-white shrink-0 shadow-md">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Join the Botmartz AI Community</h3>
                <p className="text-xs text-[#8A9EB0]">Connect with 1,000+ AI developers, share projects &amp; attend workshops.</p>
              </div>
            </div>
            <a
              href="https://discord.gg/k75ZpEnzp"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-[#5865F2]/25 flex-shrink-0"
            >
              Join Discord Community →
            </a>
          </div>
        </div>
      </section>

      {/* FILTER TABS & MAIN GALLERY GRID */}
      <section className="wrap pt-10 px-4">
        
        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedIndex(null);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#0066FF] text-white shadow-md shadow-[#0066FF]/25 scale-105 border border-[#0066FF]"
                  : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-500 font-mono border-b border-slate-200 pb-3">
          <span>Showing {filteredImages.length} photo{filteredImages.length !== 1 ? "s" : ""}</span>
          <span className="text-[#0066FF] font-medium">Click photo for full-screen view &amp; actions</span>
        </div>

        {/* GALLERY GRID (Different Card Structures) */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-64 bg-slate-200 rounded-2xl border border-slate-300" />
            ))}
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <Camera size={48} className="mx-auto text-slate-400 mb-4" />
            <p className="text-slate-600 text-lg font-semibold">No photos found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((img, idx) => {
              const isWide = idx % 5 === 0;
              return (
                <div
                  key={img.id}
                  onClick={() => setSelectedIndex(idx)}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0066FF]/40 hover:shadow-xl hover:shadow-blue-500/10 ${
                    isWide ? "sm:col-span-2 lg:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Glassmorphic Gradient Overlay for readable white title */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md border border-slate-200 text-[10px] font-bold text-[#0066FF] uppercase tracking-wider shadow-sm">
                      {img.category}
                    </span>
                  </div>

                  {/* Hover Zoom Icon */}
                  <div className="absolute top-3 right-3 z-10 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 flex items-center justify-center text-slate-800 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 shadow-md">
                    <Maximize2 size={16} />
                  </div>

                  {/* Bottom Text Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-[#00B8F0] transition-colors">
                      {img.title}
                    </h3>
                    {img.caption && (
                      <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                        {img.caption}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* FULLSCREEN IMAGE MODAL WITH ACTION BUTTONS */}
      {selectedImage && selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col justify-between animate-fadeIn text-white"
          onClick={() => setSelectedIndex(null)}
        >
          {/* TOP MODAL TOOLBAR */}
          <div 
            className="wrap w-full py-4 px-4 sm:px-8 flex items-center justify-between border-b border-white/10 bg-[#050B14]/90 backdrop-blur-md relative z-20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title & Info */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex w-9 h-9 rounded-xl bg-[#0066FF]/20 border border-[#00B8F0]/30 items-center justify-center text-[#00B8F0]">
                <Camera size={18} />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                  {selectedImage.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-[#00B8F0] font-semibold">{selectedImage.category}</span>
                  <span>•</span>
                  <span>Photo {selectedIndex + 1} of {filteredImages.length}</span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS (Share, Close) */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* SHARE BUTTON */}
              <button
                onClick={() => handleShare(selectedImage)}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95"
                title="Share Image Link"
              >
                {copied ? (
                  <>
                    <Check size={15} className="text-green-400" />
                    <span className="text-green-400 hidden sm:inline">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 size={15} className="text-[#00B8F0]" />
                    <span className="hidden sm:inline">Share</span>
                  </>
                )}
              </button>

              {/* CLOSE BUTTON */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-red-500/80 border border-white/20 text-white flex items-center justify-center transition-all ml-1"
                title="Close (Esc)"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* CENTER IMAGE PREVIEW + PREV/NEXT ARROWS */}
          <div 
            className="relative flex-1 flex items-center justify-center p-4 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* PREVIOUS BUTTON */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 z-30 w-12 h-12 rounded-2xl bg-black/60 hover:bg-[#0066FF] border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 backdrop-blur-md shadow-2xl"
              title="Previous Photo (Left Arrow)"
            >
              <ChevronLeft size={28} />
            </button>

            {/* MAIN FULL RESOLUTION IMAGE CONTAINER */}
            <div className="relative w-full h-full max-w-5xl max-h-[75vh] flex items-center justify-center">
              <Image
                src={selectedImage.url}
                alt={selectedImage.title}
                fill
                priority
                className="object-contain rounded-xl shadow-2xl"
              />
            </div>

            {/* NEXT BUTTON */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 z-30 w-12 h-12 rounded-2xl bg-black/60 hover:bg-[#0066FF] border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 backdrop-blur-md shadow-2xl"
              title="Next Photo (Right Arrow)"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* BOTTOM CAPTION BAR */}
          {selectedImage.caption && (
            <div 
              className="w-full py-4 px-6 text-center border-t border-white/10 bg-[#050B14]/90 backdrop-blur-md text-slate-300 text-sm max-w-3xl mx-auto rounded-t-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p>{selectedImage.caption}</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
