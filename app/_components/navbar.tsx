"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { 
    name: 'Services', 
    path: '/services',
    dropdown: [
      { name: 'Enterprise RAG', path: '/services/enterprise-rag' },
      { name: 'AI Agents', path: '/services/ai-agents' },
    ]
  },
  { 
    name: 'Industries', 
    path: '/industries',
    dropdown: [
      { name: 'Education', path: '/industries/education' },
      { name: 'Logistics', path: '/industries/logistics' },
      { name: 'Legal', path: '/industries/legal' },
    ]
  },
  { 
    name: 'Work', 
    path: '/work',
    dropdown: [
      { name: 'Case Studies', path: '/work/case-studies' },
      { name: 'Labs', path: '/work/labs' },
    ]
  },
  { name: 'Engineering Insights', path: '/insights' },
  { name: 'Community', path: '/community' },
  { name: 'About', path: '/about' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#050B14]/90 backdrop-blur-md border-b border-white/10">
        <div className="wrap flex items-center justify-between py-[18px]">
          
          {/* LOGO */}
          <Link href="/" className="flex flex-col items-start gap-0 cursor-pointer" aria-label="Botmartz home">
            <Image 
              src="/BotmartzNewLogo.png" 
              alt="Botmartz Logo" 
              width={240} 
              height={60} 
              className="h-[54px] w-auto object-contain"
              priority
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex gap-[30px] items-center" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.name}
                className="relative py-5 group cursor-pointer"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  href={item.path}
                  className={`font-mono text-[12px] tracking-[0.06em] uppercase transition-colors py-2 flex items-center gap-1 ${
                    pathname === item.path || (item.dropdown && item.dropdown.some(sub => pathname === sub.path)) ? 'text-[#00B8F0]' : 'text-[#8A9EB0] hover:text-white'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.dropdown && (
                    <ChevronDown className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-200" />
                  )}
                </Link>

                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-[90%] left-1/2 -translate-x-1/2 mt-2 w-60 bg-[#0A111F] border border-[#00B8F0]/20 rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.4)] p-2 flex flex-col gap-1 z-[100]"
                    >
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.path}
                          className="px-4 py-3 text-left font-mono text-[11px] font-semibold tracking-wider text-white/80 hover:text-white hover:bg-[#00B8F0]/10 rounded-lg transition-all flex items-center justify-between group/sub"
                        >
                          <span>{sub.name}</span>
                          <span className="opacity-0 group-hover/sub:opacity-100 group-hover/sub:translate-x-1 transition-all duration-200 text-[#00B8F0]">→</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA / MOBILE TOGGLE */}
          <div className="flex items-center gap-5">
            <button 
              className="lg:hidden font-mono text-[12px] border border-white/20 px-3 py-2 rounded-sm text-white flex items-center gap-2 hover:bg-white/5 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              MENU
            </button>
            <Link href="/contact" className="btn btn-primary hidden sm:inline-flex bg-[#0066FF] hover:bg-[#0052CC] border-none text-white shadow-[0_0_15px_rgba(0,102,255,0.4)]">
              Book a Call
            </Link>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#050B14]/95 backdrop-blur-xl flex flex-col"
          >
            <div className="wrap flex items-center justify-between py-[18px] border-b border-white/10 w-full">
              <Link href="/" className="flex flex-col items-start" onClick={() => setMobileMenuOpen(false)}>
                <Image 
                  src="/BotmartzNewLogo.png" 
                  alt="Botmartz Logo" 
                  width={240} 
                  height={60} 
                  className="h-[54px] w-auto object-contain"
                />
              </Link>
              <button 
                className="text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 p-8 flex-1 overflow-y-auto">
              {NAV_ITEMS.map((item) => (
                <div key={item.name} className="flex flex-col gap-2">
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-heading text-2xl font-bold text-white hover:text-[#00B8F0] transition-colors"
                  >
                    {item.name}
                  </Link>

                  {item.dropdown && (
                    <div className="flex flex-col gap-3 pl-4 border-l border-white/10 mt-1">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="font-mono text-xs text-[#8A9EB0] hover:text-[#00B8F0] transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-8">
                <Link 
                  href="/contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-primary w-full text-center justify-center py-4"
                >
                  Book a Discovery Call
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}