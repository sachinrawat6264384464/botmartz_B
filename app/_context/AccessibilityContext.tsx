// app/_context/AccessibilityContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type TextSize = "normal" | "medium" | "large" | "xlarge";
export type ContrastMode =
  | "normal"
  | "high-contrast"
  | "dark-high-contrast"
  | "monochrome"
  | "low-saturation"
  | "invert";

export interface AccessibilitySettings {
  textSize: TextSize;
  contrastMode: ContrastMode;
  dyslexiaFont: boolean;
  highlightLinks: boolean;
  highlightHeadings: boolean;
  stopAnimations: boolean;
  bigCursor: boolean;
  focusHighlight: boolean;
  readingGuide: boolean;
  speechReader: boolean;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  textSize: "normal",
  contrastMode: "normal",
  dyslexiaFont: false,
  highlightLinks: false,
  highlightHeadings: false,
  stopAnimations: false,
  bigCursor: false,
  focusHighlight: false,
  readingGuide: false,
  speechReader: false,
};

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => void;
  applyPreset: (
    preset: "visual" | "cognitive" | "motor" | "reading" | "reset"
  ) => void;
  resetAll: () => void;
  speak: (text: string) => void;
  stopSpeak: () => void;
  isSpeaking: boolean;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(
  undefined
);

const STORAGE_KEY = "botmartz_accessibility_profile_v1";

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      }
    } catch (e) {
      console.error("Failed to load accessibility profile from localStorage:", e);
    }
  }, []);

  // Save to localStorage whenever settings change
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error("Failed to save accessibility profile to localStorage:", e);
    }
  }, [settings, isMounted]);

  // Sync data attributes to document.documentElement (<html>)
  useEffect(() => {
    if (!isMounted || typeof document === "undefined") return;
    const root = document.documentElement;

    root.setAttribute("data-text-size", settings.textSize);
    root.setAttribute("data-contrast", settings.contrastMode);
    root.setAttribute("data-dyslexia", String(settings.dyslexiaFont));
    root.setAttribute("data-highlight-links", String(settings.highlightLinks));
    root.setAttribute("data-highlight-headings", String(settings.highlightHeadings));
    root.setAttribute("data-stop-animations", String(settings.stopAnimations));
    root.setAttribute("data-big-cursor", String(settings.bigCursor));
    root.setAttribute("data-focus-highlight", String(settings.focusHighlight));
    root.setAttribute("data-reading-guide", String(settings.readingGuide));
  }, [settings, isMounted]);

  const updateSetting = useCallback(
    <K extends keyof AccessibilitySettings>(
      key: K,
      value: AccessibilitySettings[K]
    ) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const resetAll = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const applyPreset = useCallback(
    (preset: "visual" | "cognitive" | "motor" | "reading" | "reset") => {
      if (preset === "reset") {
        resetAll();
        return;
      }
      setSettings((prev) => {
        const base = { ...DEFAULT_SETTINGS };
        if (preset === "visual") {
          return {
            ...base,
            textSize: "large",
            contrastMode: "high-contrast",
            highlightLinks: true,
            highlightHeadings: true,
            bigCursor: true,
            focusHighlight: true,
          };
        }
        if (preset === "cognitive") {
          return {
            ...base,
            textSize: "medium",
            contrastMode: "low-saturation",
            stopAnimations: true,
            highlightLinks: true,
            focusHighlight: true,
          };
        }
        if (preset === "motor") {
          return {
            ...base,
            stopAnimations: true,
            bigCursor: true,
            focusHighlight: true,
            highlightLinks: true,
          };
        }
        if (preset === "reading") {
          return {
            ...base,
            textSize: "medium",
            dyslexiaFont: true,
            readingGuide: true,
            highlightHeadings: true,
          };
        }
        return base;
      });
    },
    [resetAll]
  );

  const stopSpeak = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();

      const cleanedText = text.replace(/\s+/g, " ").trim();
      if (!cleanedText) return;

      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    []
  );

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSetting,
        applyPreset,
        resetAll,
        speak,
        stopSpeak,
        isSpeaking,
      }}
    >
      {children}
      {isMounted && <ReadingGuideOverlay enabled={settings.readingGuide} />}
      {isMounted && (
        <SpeechReaderOverlay
          enabled={settings.speechReader}
          speak={speak}
          stopSpeak={stopSpeak}
          isSpeaking={isSpeaking}
        />
      )}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider"
    );
  }
  return context;
}

/* ─── COGNITIVE & READING ASSIST OVERLAYS ──────────────────────────────────────── */

function ReadingGuideOverlay({ enabled }: { enabled: boolean }) {
  const [mouseY, setMouseY] = useState(250);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="fixed inset-0 z-[99998] pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Top shaded mask */}
      <div
        className="absolute inset-x-0 top-0 bg-black/40 transition-all duration-75"
        style={{ height: Math.max(0, mouseY - 40) }}
      />
      {/* Reading highlight bar */}
      <div
        className="absolute inset-x-0 h-20 bg-yellow-300/25 border-y-2 border-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.6)] transition-all duration-75 flex items-center justify-between px-6"
        style={{ top: Math.max(0, mouseY - 40) }}
      >
        <span className="text-[10px] font-bold text-yellow-900 bg-yellow-400 px-2 py-0.5 rounded uppercase tracking-wider shadow opacity-80">
          Reading Guide
        </span>
      </div>
      {/* Bottom shaded mask */}
      <div
        className="absolute inset-x-0 bottom-0 bg-black/40 transition-all duration-75"
        style={{ top: Math.min(typeof window !== "undefined" ? window.innerHeight : 1000, mouseY + 40) }}
      />
    </div>
  );
}

function SpeechReaderOverlay({
  enabled,
  speak,
  stopSpeak,
  isSpeaking,
}: {
  enabled: boolean;
  speak: (text: string) => void;
  stopSpeak: () => void;
  isSpeaking: boolean;
}) {
  useEffect(() => {
    if (!enabled || typeof document === "undefined") {
      stopSpeak();
      return;
    }

    let timeoutId: NodeJS.Timeout | null = null;
    let lastSpokenElement: HTMLElement | null = null;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || target === lastSpokenElement) return;

      // Check if target matches readable tags
      const readable = target.closest(
        "p, h1, h2, h3, h4, h5, h6, li, a, button, blockquote, figcaption"
      ) as HTMLElement | null;

      if (readable && readable !== lastSpokenElement) {
        if (timeoutId) clearTimeout(timeoutId);
        lastSpokenElement = readable;

        timeoutId = setTimeout(() => {
          const text = readable.innerText || readable.textContent || "";
          if (text.trim().length > 1) {
            speak(text);
          }
        }, 400); // 400ms debounce so rapid mouse movement doesn't spam audio
      }
    };

    const handleMouseLeave = () => {
      if (timeoutId) clearTimeout(timeoutId);
    };

    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseLeave, { passive: true });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseLeave);
      stopSpeak();
    };
  }, [enabled, speak, stopSpeak]);

  if (!enabled) return null;

  return (
    <div className="fixed top-20 right-6 z-[99997] bg-[#0A1128] border-2 border-[#0066FF] text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-2.5 animate-pulse">
      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
      <span className="text-xs font-bold tracking-wide">
        {isSpeaking ? "🔊 Reading Aloud..." : "🎧 Hover over text to read"}
      </span>
      <button
        onClick={stopSpeak}
        className="ml-1 text-[11px] bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded font-semibold text-slate-300 transition-colors"
      >
        Mute
      </button>
    </div>
  );
}
