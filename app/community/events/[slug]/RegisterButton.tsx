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

  const entryFee = (event.entryFee !== undefined && event.entryFee !== null) ? Number(event.entryFee) : 399;

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="btn btn-primary bg-brand hover:bg-[#00B8F0] text-white px-8 py-3.5 rounded-lg text-[15px] font-semibold transition-all hover:scale-[1.02] shadow-lg cursor-pointer"
      >
        Register for Event {!mounted ? "(₹399)" : (entryFee > 0 ? `(₹${entryFee})` : '(Free)')}
      </button>

      <EventRegistrationWizard
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        event={event}
      />
    </>
  );
}
