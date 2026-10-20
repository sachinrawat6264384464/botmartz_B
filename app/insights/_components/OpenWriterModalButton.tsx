"use client";

import React from "react";
import { PenTool, Sparkles } from "lucide-react";

interface OpenWriterModalButtonProps {
  className?: string;
  variant?: "hero" | "compact";
}

export default function OpenWriterModalButton({ className = "", variant = "hero" }: OpenWriterModalButtonProps) {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-writer-modal"));
    }
  };

  if (variant === "compact") {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-2 font-medium text-xs sm:text-sm text-[#F97316] hover:text-[#EA580C] transition-colors cursor-pointer ${className}`}
      >
        <PenTool size={14} />
        <span>Become an Author</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`btn bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] text-white font-semibold px-6 py-3 rounded text-[14px] flex items-center gap-2 shadow-[0_4px_20px_rgba(249,115,22,0.35)] hover:shadow-[0_6px_25px_rgba(249,115,22,0.5)] transition-all cursor-pointer ${className}`}
    >
      <PenTool className="w-4 h-4 text-white" />
      <span>Write for Us</span>
    </button>
  );
}
