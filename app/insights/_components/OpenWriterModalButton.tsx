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
        className={`inline-flex items-center gap-2 font-medium text-xs sm:text-sm text-[#0059E6] hover:text-[#003BB3] transition-colors cursor-pointer ${className}`}
      >
        <PenTool size={14} />
        <span>Become an Author</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`btn bg-gradient-to-r from-[#0059E6] to-[#003BB3] hover:from-[#0047BA] hover:to-[#002B8A] text-white font-semibold px-6 py-3 rounded text-[14px] flex items-center gap-2 shadow-[0_4px_20px_rgba(0,89,230,0.35)] hover:shadow-[0_6px_25px_rgba(0,89,230,0.5)] transition-all cursor-pointer ${className}`}
    >
      <PenTool className="w-4 h-4 text-white" />
      <span>Write for Us</span>
    </button>
  );
}
