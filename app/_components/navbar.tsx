"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowRight, Menu, X, PhoneCall } from "lucide-react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export type NavDropdownItem = { name: string; path: string };
export type NavItem = { name: string; path: string; dropdown?: NavDropdownItem[] };

/* ─── STREAMLINED PRODUCTION NAV ITEMS ─── */
const DEFAULT_NAV_ITEMS: NavItem[] = [
  { name: "Home", path: "/" },
  {
    name: "Solutions",
    path: "/services",
    dropdown: [
      { name: "All Services & Industries", path: "/services" },
      { name: "Enterprise RAG & Search", path: "/services/enterprise-rag" },
      { name: "AI Agents & State Machines", path: "/services/ai-agents" },
      { name: "Industry Architectures", path: "/services#industries" },
    ],
  },
  {
    name: "Work",
    path: "/work",
  },
  {
    name: "Insights",
    path: "/insights",
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
  
  const isExcluded = (str?: string) => {
    if (!str) return false;
    const lower = str.trim().toLowerCase();
    return lower.includes("community") || lower.includes("open-source") || lower.includes("/labs");
  };

  const cleanItems = rawItems
    .filter((item) => !isExcluded(item.name) && !isExcluded(item.path))
    .map((item) => {
      // Work should not have a dropdown per requirements
      if (item.path === "/work" || item.name.toLowerCase() === "work") {
        return {
          ...item,
          path: item.path ? item.path.trim().replace(/\s+/g, '-').replace(/%20/g, '-') : item.path,
          dropdown: undefined,
        };
      }
      
      const filteredDropdown = item.dropdown
        ? item.dropdown
            .filter((d) => !isExcluded(d.name) && !isExcluded(d.path))
            .map((d) => ({
              ...d,
              path: d.path ? d.path.trim().replace(/\s+/g, '-').replace(/%20/g, '-') : d.path,
            }))
        : undefined;

      return {
        ...item,
        path: item.path ? item.path.trim().replace(/\s+/g, '-').replace(/%20/g, '-') : item.path,
        dropdown: filteredDropdown && filteredDropdown.length > 0 ? filteredDropdown : undefined,
      };
    });
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
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[80px] sm:h-[86px]">

          {/* LOGO WITHOUT BORDER */}
          <Link href="/" aria-label="Botmartz home" className="flex-shrink-0 flex items-center">
            <Image
              src={logoUrl}
              alt="Botmartz AI Solutions Private Limited"
              width={200}
              height={66}
              priority
              suppressHydrationWarning
              className="h-[52px] sm:h-[60px] w-auto object-contain transition-transform duration-200 hover:scale-105"
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
                  className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 relative ${
                    isActive(item)
                      ? "text-[#0066FF] font-bold"
                      : "text-[#334155] hover:text-[#0066FF] hover:bg-slate-50"
                  }`}
                >
                  <span>{item.name}</span>
                  {item.dropdown && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  )}
                  {isActive(item) && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#0066FF] rounded-full" />
                  )}
                </Link>

                {/* DROPDOWN MENU */}
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

          {/* CTA BUTTON */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-[13px] font-bold px-5 py-2.5 rounded-lg shadow-sm transition-all hover:-translate-y-px whitespace-nowrap"
            >
              <span>Contact Us</span>
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
      <div
        className={`fixed inset-0 z-[60] bg-white/98 backdrop-blur-xl flex flex-col transition-all duration-200 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-[1280px] mx-auto w-full px-4 flex items-center justify-between h-[76px] border-b border-slate-200">
          <Link href="/" prefetch={false} onClick={() => setMobileMenuOpen(false)} className="flex items-center">
            <Image
              src={logoUrl}
              alt="Botmartz AI Solutions Private Limited"
              width={160}
              height={50}
              className="h-[46px] w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-[#334155] hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <div className="px-6 py-6 flex flex-col gap-2 overflow-y-auto flex-1">
          {NAV_ITEMS.map((item) => (
            <div key={item.name} className="py-2 border-b border-slate-100">
              <Link
                href={item.path}
                prefetch={false}
                onClick={handleDropdownNavigate}
                className={`text-base font-semibold block ${
                  isActive(item) ? "text-[#0066FF]" : "text-[#334155]"
                }`}
              >
                {item.name}
              </Link>
              {item.dropdown && (
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-slate-200">
                  {item.dropdown.map((sub) => (
                    <a
                      key={sub.name}
                      href={sub.path}
                      onClick={handleDropdownNavigate}
                      className="text-sm text-[#64748B] hover:text-[#0066FF] block py-1"
                    >
                      {sub.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="pt-6">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#0066FF] text-white font-bold text-sm py-3.5 rounded-xl shadow-md"
            >
              <span>Contact Us</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
