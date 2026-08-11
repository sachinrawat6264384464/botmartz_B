"use client";

import { useState } from "react";
import Script from "next/script";

interface RegisterButtonProps {
  event: {
    id: string;
    title: string;
    slug: string;
    entryFee?: number;
    date?: string;
    location?: string;
    lumaEventId?: string;
    lumaUrl?: string;
  };
  buttonText?: string;
  className?: string;
}

export default function RegisterButton({
  event,
  buttonText = "Register for Event",
  className,
}: RegisterButtonProps) {
  const [loadScript, setLoadScript] = useState(false);
  const lumaEventId = event?.lumaEventId || "evt-6CFhzN9rrenuAen";
  const lumaUrl = event?.lumaUrl || `https://luma.com/event/${lumaEventId}`;

  const triggerScriptLoad = () => {
    if (!loadScript) setLoadScript(true);
  };

  return (
    <>
      {loadScript && (
        <Script
          id="luma-checkout"
          src="https://embed.lu.ma/checkout-button.js"
          strategy="lazyOnload"
        />
      )}
      <div
        className="relative group inline-block"
        onMouseEnter={triggerScriptLoad}
        onTouchStart={triggerScriptLoad}
        onFocus={triggerScriptLoad}
      >
        {/* Glow aura effect */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#00C6FF] via-[#007BFF] to-[#7928CA] opacity-80 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500" />

        <a
          href={lumaUrl}
          onClick={triggerScriptLoad}
          className={
            className ||
            "luma-checkout--button relative inline-flex items-center justify-center gap-3 text-white font-extrabold cursor-pointer tracking-wide transition-all duration-300 transform group-hover:scale-[1.03] active:scale-[0.97]"
          }
          style={{
            borderRadius: "14px",
            background: "linear-gradient(135deg, #00C6FF 0%, #007BFF 50%, #0052CC 100%)",
            color: "#FFFFFF",
            padding: "16px 36px",
            fontSize: "16px",
            fontWeight: "800",
            border: "1px solid rgba(255, 255, 255, 0.35)",
            boxShadow: "0 10px 30px rgba(0, 198, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            textShadow: "0 2px 4px rgba(0,0,0,0.2)"
          }}
          data-luma-action="checkout"
          data-luma-event-id={lumaEventId}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="w-5 h-5 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
          <span>{buttonText}</span>
          <span className="text-xl leading-none font-bold">→</span>
        </a>
      </div>
    </>
  );
}
