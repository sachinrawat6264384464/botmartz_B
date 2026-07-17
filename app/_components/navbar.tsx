"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, PhoneCall } from "lucide-react";
import { usePathname } from "next/navigation";

/* ─── NAV STRUCTURE (Without AI Frontier and About section, as requested) ─── */
const NAV_ITEMS: Array<{ name: string; path: string; dropdown?: Array<{ name: string; path: string }> }> = [
  { name: "Home", path: "/" },
  {
    name: "Services",
    path: "/services",
    dropdown: [
      { name: "Enterprise RAG", path: "/services/enterprise-rag" },
      { name: "AI Agents", path: "/services/ai-agents" },
    ],
  },
  {
    name: "Industries",
    path: "/industries",
    dropdown: [
      { name: "Healthcare", path: "/industries/healthcare" },
      { name: "Education", path: "/industries/education" },
      { name: "Logistics", path: "/industries/logistics" },
    ],
  },
  {
    name: "Work",
    path: "/work",
    dropdown: [
      { name: "Case Studies", path: "/work/case-studies" },
      { name: "Labs", path: "/work/labs" },
      { name: "Open Source", path: "/work/open-source" },
    ],
  },
  { name: "Engineering Insights", path: "/insights" },
  {
    name: "Community",
    path: "/community",
    dropdown: [
      { name: "Events", path: "/community/events" },
      { name: "Discord & Forum", path: "/community" },
    ],
  },
];

/* ─── COMPONENT ──────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (item: (typeof NAV_ITEMS)[number]) =>
    pathname === item.path ||
    (item.dropdown && item.dropdown.some((s) => pathname === s.path));

  return (
    <>
      {/* ── FULL-WIDTH WHITE HEADER ── */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-[0_2px_15px_rgb(0,0,0,0.04)] transition-all">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between transition-all">

          {/* LOGO (In White Container) */}
          <Link href="/" aria-label="Botmartz AI Solutions home" className="flex-shrink-0 flex items-center">
            <Image
              src="/Logo-removebg-preview.png"
              alt="Botmartz AI Solutions"
              width={190}
              height={52}
              className="h-[44px] sm:h-[48px] w-auto object-contain transition-transform hover:scale-[1.02]"
              priority
            />
          </Link>

          {/* DESKTOP NAV (Larger font size: 15px) */}
          <nav className="hidden xl:flex items-center gap-2 lg:gap-3" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.path}
                  className={`relative inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[15px] font-semibold tracking-[-0.01em] transition-colors whitespace-nowrap ${
                    isActive(item)
                      ? "text-[#007BFF]"
                      : "text-[#1A2340] hover:text-[#007BFF]"
                  }`}
                >
                  {item.name}
                  {item.dropdown && (
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                        activeDropdown === item.name ? "rotate-180 text-[#007BFF]" : ""
                      }`}
                    />
                  )}
                  {/* Active underline */}
                  {isActive(item) && (
                    <span className="absolute bottom-0.5 left-3 right-3 h-[2.5px] bg-[#007BFF] rounded-full" />
                  )}
                </Link>

                {/* DROPDOWN MENU */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.14 }}
                      className="absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 min-w-[210px] bg-white border border-gray-100 rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] p-2 z-[100]"
                    >
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.path}
                          className="flex items-center justify-between px-4 py-2.5 text-[13.5px] font-medium text-[#374151] hover:text-[#007BFF] hover:bg-[#007BFF]/5 rounded-lg transition-all group"
                        >
                          <span>{sub.name}</span>
                          <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#007BFF] text-xs font-bold">
                            →
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* RIGHT SECTION: SEPARATOR + SMALLER CTA BUTTON */}
          <div className="flex items-center gap-3">
            {/* Desktop Separator line */}
            <div className="hidden xl:block h-6 w-px bg-gray-200/80" />

            {/* Book a Discovery Call Button (Reduced size: px-4 py-2 text-[13px]) */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#007BFF] hover:bg-[#0062CC] text-white text-[13px] font-semibold px-4 py-2 rounded-lg shadow-[0_2px_10px_rgba(0,123,255,0.25)] transition-all hover:shadow-[0_4px_16px_rgba(0,123,255,0.4)] hover:-translate-y-0.5"
            >
              <PhoneCall size={13} className="shrink-0" />
              <span>Book a Discovery Call</span>
              <ArrowRight size={13} className="shrink-0" />
            </Link>

            {/* Mobile hamburger button */}
            <button
              className="xl:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-100 text-[#1A2340]"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <span className="w-5 h-0.5 bg-current rounded-full" />
              <span className="w-5 h-0.5 bg-current rounded-full" />
              <span className="w-3.5 h-0.5 bg-current rounded-full" />
            </button>
          </div>

        </div>
      </header>

      {/* ── MOBILE OVERLAY MENU ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#050B14]/98 backdrop-blur-xl flex flex-col"
          >
            <div className="max-w-[1240px] mx-auto w-full px-5 flex items-center justify-between h-[70px] border-b border-white/10">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src="/Logo-removebg-preview.png"
                  alt="Botmartz AI Solutions"
                  width={160}
                  height={44}
                  className="h-[38px] w-auto object-contain brightness-0 invert"
                />
              </Link>
              <button
                className="text-white p-2 hover:bg-white/5 rounded-lg text-2xl font-bold leading-none"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <nav className="flex flex-col gap-1 p-6 flex-1 overflow-y-auto max-w-[1240px] mx-auto w-full">
              {NAV_ITEMS.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 py-3 text-xl font-bold text-white hover:text-[#00C6FF] transition-colors"
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="flex flex-col gap-1 pl-4 border-l border-white/10 mb-3">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="py-2 text-sm text-[#8A9EB0] hover:text-[#00C6FF] transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-[#007BFF] hover:bg-[#0062CC] text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-[#007BFF]/30 transition-all"
                >
                  <PhoneCall size={15} />
                  <span>Book a Discovery Call</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}