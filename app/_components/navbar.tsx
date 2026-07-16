"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

/* ─── NAV STRUCTURE ─────────────────────────────────────────────────────────── */
const NAV_ITEMS: Array<{ name: string; path: string; dropdown?: Array<{ name: string; path: string }>; badge?: string }> = [
  { name: "Home", path: "/" },
  {
    name: "Services",
    path: "/services",
    dropdown: [
      { name: "Enterprise RAG", path: "/services/enterprise-rag" },
      { name: "AI Agents", path: "/services/ai-agents" },
      { name: "AI Integrations", path: "/services/ai-integrations" },
      { name: "AI Strategy", path: "/services/ai-strategy" },
      { name: "AI Consulting", path: "/services/ai-consulting" },
      { name: "Model Fine-tuning", path: "/services/model-fine-tuning" },
    ],
  },
  {
    name: "Industries",
    path: "/industries",
    dropdown: [
      { name: "Education", path: "/industries/education" },
      { name: "Logistics", path: "/industries/logistics" },
      { name: "Healthcare", path: "/industries/healthcare" },
      { name: "Legal", path: "/industries/legal" },
      { name: "Manufacturing", path: "/industries/manufacturing" },
      { name: "SaaS & Technology", path: "/industries/saas-technology" },
    ],
  },
  {
    name: "Work",
    path: "/work",
    dropdown: [
      { name: "Case Studies", path: "/work/case-studies" },
      { name: "Labs", path: "/work/labs" },
      { name: "Open Source", path: "/work" },
    ],
  },
  { name: "Engineering Insights", path: "/insights" },
  {
    name: "Community",
    path: "/community",
    dropdown: [
      { name: "Events", path: "/community/events" },
      { name: "AI Frontier 2026", path: "/community/events/ai-frontier-2026" },
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
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)]">
        <div className="wrap flex items-center justify-between h-[70px]">

          {/* LOGO */}
          <Link href="/" aria-label="Botmartz home" className="flex-shrink-0">
            <Image
              src="/Logo-removebg-preview.png"
              alt="Botmartz AI Solutions"
              width={200}
              height={56}
              className="h-[50px] w-auto object-contain"
              priority
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.path}
                  className={`relative inline-flex items-center gap-1 px-3 py-2 rounded-md text-[13.5px] font-semibold tracking-[-0.01em] transition-colors whitespace-nowrap ${
                    isActive(item)
                      ? "text-[#0052FF]"
                      : "text-[#1A2340] hover:text-[#0052FF]"
                  }`}
                >
                  {item.name}
                  {item.badge && (
                    <span className="ml-1 -mt-3 bg-[#0052FF] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                      {item.badge}
                    </span>
                  )}
                  {item.dropdown && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  )}
                  {/* Active underline */}
                  {isActive(item) && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#0052FF] rounded-full" />
                  )}
                </Link>

                {/* DROPDOWN */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.14 }}
                      className="absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 min-w-[200px] bg-white border border-gray-100 rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] p-2 z-[100]"
                    >
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.path}
                          className="flex items-center justify-between px-4 py-2.5 text-[13px] font-medium text-[#374151] hover:text-[#0052FF] hover:bg-[#0052FF]/5 rounded-lg transition-all group"
                        >
                          <span>{sub.name}</span>
                          <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#0052FF] text-xs">
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

          {/* CTA + MOBILE TOGGLE */}
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              className="xl:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="w-5 h-0.5 bg-[#1A2340] rounded-full" />
              <span className="w-5 h-0.5 bg-[#1A2340] rounded-full" />
              <span className="w-3.5 h-0.5 bg-[#1A2340] rounded-full" />
            </button>

            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 bg-[#0052FF] hover:bg-[#003FCC] text-white text-[13px] font-bold px-5 py-2.5 rounded-lg shadow-[0_4px_14px_rgba(0,82,255,0.35)] transition-all hover:shadow-[0_4px_20px_rgba(0,82,255,0.5)] hover:-translate-y-px"
            >
              Book a Discovery Call
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* ── MOBILE OVERLAY ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#050B14]/98 backdrop-blur-xl flex flex-col"
          >
            <div className="wrap flex items-center justify-between h-[70px] border-b border-white/10">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src="/Logo-removebg-preview.png"
                  alt="Botmartz"
                  width={160}
                  height={44}
                  className="h-[38px] w-auto object-contain brightness-0 invert"
                />
              </Link>
              <button
                className="text-white p-2 hover:bg-white/5 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <span className="text-2xl leading-none">×</span>
              </button>
            </div>

            <nav className="flex flex-col gap-1 p-6 flex-1 overflow-y-auto">
              {NAV_ITEMS.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 py-3 text-xl font-bold text-white hover:text-[#00B8F0] transition-colors"
                  >
                    {item.name}
                    {item.badge && (
                      <span className="text-xs bg-[#0052FF] text-white px-1.5 py-0.5 rounded-full font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                  {item.dropdown && (
                    <div className="flex flex-col gap-1 pl-4 border-l border-white/10 mb-3">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="py-2 text-sm text-[#8A9EB0] hover:text-[#00B8F0] transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-6">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-[#0052FF] text-white font-bold py-4 rounded-xl text-base"
                >
                  Book a Discovery Call <ArrowRight size={16} />
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}