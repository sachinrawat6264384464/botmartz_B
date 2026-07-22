// app/_components/AccessibilityToolbox.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useAccessibility, TextSize, ContrastMode } from "@/app/_context/AccessibilityContext";
import {
  Accessibility,
  X,
  RotateCcw,
  Type,
  Eye,
  MousePointer,
  BookOpen,
  Sparkles,
  Volume2,
  VolumeX,
  HelpCircle,
  Check,
  ZapOff,
  Sun,
  Moon,
  Compass,
} from "lucide-react";

export function AccessibilityToolbox() {
  const { settings, updateSetting, applyPreset, resetAll, isSpeaking, stopSpeak } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"presets" | "controls" | "guide">("presets");

  // Keyboard shortcut `Alt + A` to toggle toolbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const textSizes: { label: string; value: TextSize; desc: string }[] = [
    { label: "100%", value: "normal", desc: "Default size" },
    { label: "115%", value: "medium", desc: "+15% scale" },
    { label: "130%", value: "large", desc: "+30% scale" },
    { label: "145%", value: "xlarge", desc: "+45% scale" },
  ];

  const contrastModes: { label: string; value: ContrastMode }[] = [
    { label: "Normal", value: "normal" },
    { label: "High Contrast", value: "high-contrast" },
    { label: "Dark High Contrast", value: "dark-high-contrast" },
    { label: "Monochrome", value: "monochrome" },
    { label: "Low Saturation", value: "low-saturation" },
    { label: "Invert Colors", value: "invert" },
  ];

  return (
    <>
      {/* ── FLOATING TRIGGER BUTTON ── */}
      <div className="fixed bottom-6 left-6 z-[99996] flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Accessibility Toolbox (Alt + A)"
          title="Accessibility Controls (Alt + A)"
          className="group relative flex items-center justify-center w-14 h-14 bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-full shadow-[0_4px_25px_rgba(0,102,255,0.6)] hover:shadow-[0_4px_35px_rgba(0,102,255,0.85)] transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/40"
        >
          <Accessibility className="w-7 h-7 transition-transform group-hover:rotate-12" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 text-[9px] font-bold text-white items-center justify-center">
              ✓
            </span>
          </span>
        </button>

        {/* Shortcut hint badge on hover */}
        <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/90 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border border-slate-700 pointer-events-none shadow-lg">
          Alt + A
        </div>
      </div>

      {/* ── TOOLBOX MODAL / DRAWER ── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-end sm:items-center justify-start sm:justify-start sm:pl-6 bg-black/50 backdrop-blur-sm transition-opacity"
          role="dialog"
          aria-modal="true"
          aria-label="Web Accessibility Toolbox"
        >
          <div className="relative w-full sm:w-[440px] max-h-[90vh] sm:max-h-[85vh] bg-[#060C17]/98 text-white border sm:border-2 border-[#0066FF]/60 rounded-t-3xl sm:rounded-3xl shadow-[0_15px_60px_rgba(0,102,255,0.45)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
            
            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#0066FF]/20 to-transparent border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#0066FF] rounded-xl text-white shadow-md">
                  <Accessibility className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                    Accessibility Toolbox
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-1.5 py-0.5 rounded font-mono uppercase">
                      WCAG 2.2 AA/AAA
                    </span>
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Customize your visual and cognitive experience
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close panel"
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* TAB NAVIGATION */}
            <div className="flex items-center border-b border-white/10 bg-[#0A1128]/50 px-3 pt-2 shrink-0">
              <button
                onClick={() => setActiveTab("presets")}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === "presets"
                    ? "border-[#0066FF] text-[#0066FF]"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Profiles
              </button>
              <button
                onClick={() => setActiveTab("controls")}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === "controls"
                    ? "border-[#0066FF] text-[#0066FF]"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Custom Controls
              </button>
              <button
                onClick={() => setActiveTab("guide")}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === "guide"
                    ? "border-[#0066FF] text-[#0066FF]"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                Guide
              </button>
            </div>

            {/* TAB CONTENTS */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
              
              {/* TAB 1: PRESETS */}
              {activeTab === "presets" && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-300 font-medium">
                    Select a curated accessibility profile or customize individually:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => applyPreset("visual")}
                      className="text-left p-4 rounded-2xl bg-white/5 hover:bg-[#0066FF]/15 border border-white/10 hover:border-[#0066FF]/50 transition-all flex flex-col gap-1.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                          <Eye className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                          Profile
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white mt-1">Visual Impairment</h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Large text (+30%), High Contrast theme, prominent links & focus highlights.
                      </p>
                    </button>

                    <button
                      onClick={() => applyPreset("cognitive")}
                      className="text-left p-4 rounded-2xl bg-white/5 hover:bg-[#0066FF]/15 border border-white/10 hover:border-[#0066FF]/50 transition-all flex flex-col gap-1.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="p-2 bg-purple-500/20 text-purple-400 rounded-xl group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                          Profile
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white mt-1">Cognitive & ADHD</h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Medium text (+15%), Low Saturation colors, paused animations, clear links.
                      </p>
                    </button>

                    <button
                      onClick={() => applyPreset("reading")}
                      className="text-left p-4 rounded-2xl bg-white/5 hover:bg-[#0066FF]/15 border border-white/10 hover:border-[#0066FF]/50 transition-all flex flex-col gap-1.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                          Profile
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white mt-1">Dyslexia & Reading</h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Dyslexia-friendly typography, tracking Reading Guide bar, heading underlines.
                      </p>
                    </button>

                    <button
                      onClick={() => applyPreset("motor")}
                      className="text-left p-4 rounded-2xl bg-white/5 hover:bg-[#0066FF]/15 border border-white/10 hover:border-[#0066FF]/50 transition-all flex flex-col gap-1.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                          <MousePointer className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                          Profile
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white mt-1">Motor Difficulty</h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Big mouse cursor, bright neon focus ring, frozen motion/animations.
                      </p>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: GRANULAR CONTROLS */}
              {activeTab === "controls" && (
                <div className="space-y-6">
                  
                  {/* TEXT SIZE STEPPER */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-2.5">
                      <Type className="w-3.5 h-3.5 text-[#0066FF]" />
                      Text Scaling
                    </label>
                    <div className="grid grid-cols-4 gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10">
                      {textSizes.map((item) => (
                        <button
                          key={item.value}
                          onClick={() => updateSetting("textSize", item.value)}
                          className={`py-2 px-1 rounded-lg text-xs font-bold transition-all ${
                            settings.textSize === item.value
                              ? "bg-[#0066FF] text-white shadow-md"
                              : "text-slate-400 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CONTRAST MODES */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-2.5">
                      <Sun className="w-3.5 h-3.5 text-[#0066FF]" />
                      Color & Contrast
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {contrastModes.map((item) => (
                        <button
                          key={item.value}
                          onClick={() => updateSetting("contrastMode", item.value)}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                            settings.contrastMode === item.value
                              ? "border-[#0066FF] bg-[#0066FF]/20 text-white shadow-sm"
                              : "border-white/10 bg-white/5 text-slate-300 hover:border-white/30"
                          }`}
                        >
                          <span>{item.label}</span>
                          {settings.contrastMode === item.value && (
                            <Check className="w-3.5 h-3.5 text-[#0066FF]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* TOGGLE SWITCHES */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-2.5">
                      <Compass className="w-3.5 h-3.5 text-[#0066FF]" />
                      Cognitive & Visual Assists
                    </label>
                    <div className="space-y-2">
                      
                      {/* Dyslexia Font */}
                      <ToggleRow
                        label="Dyslexia Friendly Font"
                        description="Optimized letter spacing, weight & sans-serif profile"
                        checked={settings.dyslexiaFont}
                        onChange={(val) => updateSetting("dyslexiaFont", val)}
                      />

                      {/* Reading Guide */}
                      <ToggleRow
                        label="Reading Guide (Tracking Bar)"
                        description="Horizontal highlight bar that follows mouse cursor"
                        checked={settings.readingGuide}
                        onChange={(val) => updateSetting("readingGuide", val)}
                      />

                      {/* Highlight Links */}
                      <ToggleRow
                        label="Highlight Links & Buttons"
                        description="Adds high-visibility borders/underlines to clickable items"
                        checked={settings.highlightLinks}
                        onChange={(val) => updateSetting("highlightLinks", val)}
                      />

                      {/* Highlight Headings */}
                      <ToggleRow
                        label="Highlight Headings"
                        description="Accentuates section titles with distinct underlines"
                        checked={settings.highlightHeadings}
                        onChange={(val) => updateSetting("highlightHeadings", val)}
                      />

                      {/* Stop Animations */}
                      <ToggleRow
                        label="Stop Motion & Animations"
                        description="Freezes CSS transitions, carousels & moving objects"
                        checked={settings.stopAnimations}
                        onChange={(val) => updateSetting("stopAnimations", val)}
                      />

                      {/* Big Cursor */}
                      <ToggleRow
                        label="Large High-Visibility Cursor"
                        description="Enlarges mouse pointer target area"
                        checked={settings.bigCursor}
                        onChange={(val) => updateSetting("bigCursor", val)}
                      />

                      {/* Focus Ring */}
                      <ToggleRow
                        label="Keyboard Focus Ring"
                        description="Displays a thick neon outline on currently focused elements"
                        checked={settings.focusHighlight}
                        onChange={(val) => updateSetting("focusHighlight", val)}
                      />

                      {/* Screen Reader */}
                      <ToggleRow
                        label="Hover-to-Speak Screen Reader"
                        description="Reads paragraph and heading text aloud on hover using Web Speech API"
                        checked={settings.speechReader}
                        onChange={(val) => {
                          updateSetting("speechReader", val);
                          if (!val && isSpeaking) stopSpeak();
                        }}
                      />

                    </div>
                  </div>

                </div>
              )}

              {/* TAB 3: GUIDE */}
              {activeTab === "guide" && (
                <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#0066FF]" />
                      Keyboard Navigation Shortcuts
                    </h3>
                    <p className="text-slate-400">
                      Our site is built to WCAG 2.2 AA & AAA specifications for universal accessibility.
                    </p>
                    <ul className="space-y-1.5 pt-1 border-t border-white/10 text-slate-300">
                      <li className="flex items-center justify-between">
                        <span>Toggle Accessibility Panel:</span>
                        <kbd className="px-2 py-0.5 bg-slate-800 text-white rounded border border-slate-700 font-mono text-[11px]">Alt + A</kbd>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Skip to Main Content:</span>
                        <kbd className="px-2 py-0.5 bg-slate-800 text-white rounded border border-slate-700 font-mono text-[11px]">Tab (1st press)</kbd>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Close Panel:</span>
                        <kbd className="px-2 py-0.5 bg-slate-800 text-white rounded border border-slate-700 font-mono text-[11px]">Esc</kbd>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Navigate Elements:</span>
                        <kbd className="px-2 py-0.5 bg-slate-800 text-white rounded border border-slate-700 font-mono text-[11px]">Tab / Shift + Tab</kbd>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Activate Button/Link:</span>
                        <kbd className="px-2 py-0.5 bg-slate-800 text-white rounded border border-slate-700 font-mono text-[11px]">Enter / Space</kbd>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-1">
                    <h4 className="font-bold flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-400" />
                      Our Commitment
                    </h4>
                    <p className="text-[11px] leading-relaxed opacity-90">
                      Botmartz is dedicated to making enterprise AI engineering accessible to everyone. All preferences are automatically saved to your browser session.
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* FOOTER ACTIONS */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#0A1128]/90 border-t border-white/10 shrink-0">
              <button
                onClick={resetAll}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset All Defaults
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
      <div className="pr-3">
        <div className="text-xs font-bold text-white">{label}</div>
        <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{description}</div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-offset-2 focus:ring-offset-slate-900 ${
          checked ? "bg-[#0066FF]" : "bg-slate-700"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
