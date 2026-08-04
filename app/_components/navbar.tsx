"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Menu, X, PhoneCall } from "lucide-react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export type NavDropdownItem = { name: string; path: string };
export type NavItem = { name: string; path: string; dropdown?: NavDropdownItem[] };

/* ─── DEFAULT NAV ITEMS (fallback if Firestore is empty) ─── */
const DEFAULT_NAV_ITEMS: NavItem[] = [
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
    name: "Work",
    path: "/work",
    dropdown: [
      { name: "Labs", path: "/work/labs" },
      { name: "Open Source", path: "/work/open-source" },
    ],
  },
  {
    name: "Engineering Insights",
    path: "/insights",
  },
  {
    name: "AI Frontier",
    path: "/community/events/ai-frontier-2026",
    dropdown: [
      { name: "Main Event 2026", path: "/community/events/ai-frontier-2026" },
      { name: "Engineering Bootcamps", path: "/ai-frontier/bootcamps" },
    ],
  },
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
export default function Navbar({
  navItems,
  logoUrl = "/Logo-removebg-preview.png",
}: {
  navItems?: NavItem[];
  logoUrl?: string;
}) {
  const rawItems = (navItems && navItems.length > 0) ? navItems : DEFAULT_NAV_ITEMS;
  const NAV_ITEMS = rawItems;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (item: (typeof NAV_ITEMS)[number]) =>
    pathname === item.path ||
    (item.dropdown && item.dropdown.some((s) => pathname === s.path));

  return (
    <>
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="wrap flex items-center justify-between h-[80px] sm:h-[86px]">

          {/* LOGO */}
          <Link href="/" aria-label="Botmartz home" className="flex-shrink-0 flex items-center">
            <img
              src={logoUrl}
              alt="Botmartz AI Solutions"
              className="h-[58px] sm:h-[66px] w-auto object-contain transition-transform duration-200 hover:scale-105"
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.path}
                  className={`relative inline-flex items-center gap-1 px-3 py-2 rounded-md text-[13px] font-semibold tracking-[-0.01em] transition-colors whitespace-nowrap ${
                    isActive(item)
                      ? "text-[#0066FF]"
                      : "text-[#334155] hover:text-[#0066FF]"
                  }`}
                >
                  {item.name}
                  {item.dropdown && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  )}
                  {/* Active underline */}
                  {isActive(item) && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#0066FF] rounded-full" />
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
                      className="absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 min-w-[240px] bg-white border border-slate-200 rounded-xl shadow-lg p-2 z-[100]"
                    >
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.path}
                          className="flex items-center justify-between px-4 py-2.5 text-[13px] font-medium text-[#475569] hover:text-[#0066FF] hover:bg-[#0066FF]/5 rounded-lg transition-all group whitespace-nowrap"
                        >
                          <span>{sub.name}</span>
                          <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#0066FF] text-xs">
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
            <Link
              href="/contact"
              onClick={() => trackEvent("button_click", { button_name: "navbar_book_discovery_desktop" })}
              className="hidden sm:inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-[13px] font-bold px-5 py-2.5 rounded-lg shadow-[0_4px_14px_rgba(0,102,255,0.35)] transition-all hover:shadow-[0_4px_20px_rgba(0,102,255,0.5)] hover:-translate-y-px whitespace-nowrap"
            >
              <PhoneCall size={13} className="shrink-0" />
              <span>Book a Discovery Call</span>
              <ArrowRight size={13} className="shrink-0" />
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex flex-col justify-center items-center p-2 text-[#334155] hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
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
            className="fixed inset-0 z-[60] bg-white/98 backdrop-blur-xl flex flex-col"
          >
            <div className="wrap flex items-center justify-between h-[76px] border-b border-slate-200">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                <img
                  src={logoUrl}
                  alt="Botmartz"
                  className="h-[50px] sm:h-[56px] w-auto object-contain"
                />
              </Link>
              <button
                className="text-[#334155] p-2 hover:bg-slate-100 rounded-lg flex items-center justify-center"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-1 p-6 flex-1 overflow-y-auto">
              {NAV_ITEMS.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 py-3 text-xl font-bold text-[#334155] hover:text-[#0066FF] transition-colors"
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="flex flex-col gap-1 pl-4 border-l border-slate-200 mb-3">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="py-2 text-sm text-[#475569] hover:text-[#0066FF] transition-colors"
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
                  onClick={() => { setMobileMenuOpen(false); trackEvent("button_click", { button_name: "navbar_book_discovery_mobile" }); }}
                  className="flex items-center justify-center gap-2 bg-[#0066FF] text-white font-bold py-4 rounded-xl text-base whitespace-nowrap"
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