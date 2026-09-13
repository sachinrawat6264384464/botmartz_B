"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowRight, Menu, X, PhoneCall } from "lucide-react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export type NavDropdownItem = { name: string; path: string };
export type NavItem = { name: string; path: string; dropdown?: NavDropdownItem[] };

/* ─── DEFAULT NAV ITEMS (fallback if Firestore is empty) ─── */
const DEFAULT_NAV_ITEMS: NavItem[] = [
  { name: "Home", path: "/" },
  {
    name: "Solutions",
    path: "/services",
    dropdown: [
      { name: "Enterprise AI Implementation", path: "/implementation" },
      { name: "Knowledge & Search Systems", path: "/services/enterprise-rag" },
      { name: "AI Agents & Automation", path: "/services/ai-agents" },
      { name: "AI Integration & Platforms", path: "/services/integrations" },
      { name: "Custom AI Applications", path: "/services/custom-ai-applications" },
    ],
  },
  {
    name: "Industries",
    path: "/industries",
  },
  {
    name: "Implementation",
    path: "/implementation",
  },
  {
    name: "Labs",
    path: "/work/labs",
    dropdown: [
      { name: "Insurance Intelligence [Flagship]", path: "/work/labs/insurance-intelligence" },
      { name: "Reference Implementations", path: "/work/labs" },
      { name: "Open Source Projects", path: "/work/open-source" },
    ],
  },
  {
    name: "Insights",
    path: "/insights",
  },
  {
    name: "Partners",
    path: "/partnerships",
  },
  {
    name: "Company",
    path: "/about",
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
  let rawItems = (navItems && navItems.length > 0) ? navItems : DEFAULT_NAV_ITEMS;
  
  const isCommunity = (str?: string) => {
    if (!str) return false;
    const lower = str.trim().toLowerCase();
    return lower.includes("community");
  };

  const cleanItems = rawItems
    .filter((item) => !isCommunity(item.name) && !isCommunity(item.path))
    .map((item) => ({
      ...item,
      path: item.path ? item.path.trim().replace(/\s+/g, '-').replace(/%20/g, '-') : item.path,
      dropdown: item.dropdown
        ? item.dropdown
            .filter((d) => !isCommunity(d.name) && !isCommunity(d.path))
            .map((d) => ({
              ...d,
              path: d.path ? d.path.trim().replace(/\s+/g, '-').replace(/%20/g, '-') : d.path,
            }))
        : undefined,
    }));
  const NAV_ITEMS = cleanItems;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const handleDropdownNavigate = useCallback(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, []);

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
            <Image
              src={logoUrl}
              alt="Botmartz AI Solution PVT LTD."
              width={200}
              height={66}
              priority
              suppressHydrationWarning
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
                  prefetch={false}
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

                {/* DROPDOWN MENU — CSS only, no framer-motion */}
                {item.dropdown && (
                  <div
                    className={`absolute top-full left-0 pt-2 z-[100] pointer-events-auto transition-all duration-150 before:absolute before:-top-4 before:left-0 before:right-0 before:h-4 before:content-[''] ${
                      activeDropdown === item.name
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-1 pointer-events-none"
                    }`}
                  >
                    <div className="min-w-[240px] bg-white border border-slate-200 rounded-xl shadow-xl p-1.5">
                      {item.dropdown.map((sub) => (
                        <a
                          key={sub.name}
                          href={sub.path}
                          onClick={handleDropdownNavigate}
                          className="flex items-center justify-between px-3.5 py-2.5 text-[13px] font-medium text-[#475569] hover:text-[#0066FF] hover:bg-[#0066FF]/5 rounded-lg transition-all group whitespace-nowrap cursor-pointer"
                        >
                          <span>{sub.name}</span>
                          <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#0066FF] text-xs">
                            →
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA + MOBILE TOGGLE */}
          <div className="flex items-center gap-3">
            <a
              href="https://cal.com/botmartz-ai/20min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("button_click", { button_name: "navbar_talk_to_architect_desktop" })}
              className="hidden sm:inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-[13px] font-bold px-5 py-2.5 rounded-lg shadow-[0_4px_14px_rgba(0,102,255,0.35)] transition-all hover:shadow-[0_4px_20px_rgba(0,102,255,0.5)] hover:-translate-y-px whitespace-nowrap"
            >
              <PhoneCall size={13} className="shrink-0" />
              <span>Talk to an AI Architect</span>
              <ArrowRight size={13} className="shrink-0" />
            </a>

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

      {/* ── MOBILE OVERLAY — CSS transition, no framer-motion ── */}
      <div
        className={`fixed inset-0 z-[60] bg-white/98 backdrop-blur-xl flex flex-col transition-all duration-200 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="wrap flex items-center justify-between h-[76px] border-b border-slate-200">
          <Link href="/" prefetch={false} onClick={() => setMobileMenuOpen(false)} className="flex items-center">
            <img
              src={logoUrl}
              alt="Botmartz AI Solution PVT LTD."
              suppressHydrationWarning
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
                prefetch={false}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-3 text-xl font-bold text-[#334155] hover:text-[#0066FF] transition-colors"
              >
                {item.name}
              </Link>
              {item.dropdown && (
                <div className="flex flex-col gap-1 pl-4 border-l border-slate-200 mb-3">
                  {item.dropdown.map((sub) => (
                    <a
                      key={sub.name}
                      href={sub.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2 text-sm text-[#475569] hover:text-[#0066FF] transition-colors cursor-pointer"
                    >
                      {sub.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-6">
            <a
              href="https://cal.com/botmartz-ai/20min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { setMobileMenuOpen(false); trackEvent("button_click", { button_name: "navbar_talk_to_architect_mobile" }); }}
              className="flex items-center justify-center gap-2 bg-[#0066FF] text-white font-bold py-4 rounded-xl text-base whitespace-nowrap"
            >
              <PhoneCall size={15} />
              <span>Talk to an AI Architect</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}