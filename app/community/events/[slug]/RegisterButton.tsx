"use client";

import { useState, useEffect } from "react";
import EventRegistrationWizard from "./EventRegistrationWizard";

interface RegisterButtonProps {
  event: {
    id: string;
    title: string;
    slug: string;
    entryFee?: number;
    date?: string;
    location?: string;
  };
}

export default function RegisterButton({ event }: RegisterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const entryFee = (event.entryFee !== undefined && event.entryFee !== null) ? Number(event.entryFee) : 449;

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        suppressHydrationWarning
        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#00C6FF] to-[#007BFF] hover:from-[#00B4EE] hover:to-[#0069DB] text-white font-extrabold text-sm sm:text-[15px] px-8 py-4 rounded-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-[0_8px_25px_rgba(0,198,255,0.4)] cursor-pointer tracking-wide border border-cyan-300/30 shrink-0"
      >
        Register for Event {!mounted ? "(₹449)" : (entryFee > 0 ? `(₹${entryFee})` : '(Free)')}
      </button>

      <EventRegistrationWizard
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        event={event}
      />
    </>
  );
}
