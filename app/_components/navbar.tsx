"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { name: 'Services', path: '/services' },
  { name: 'Industries', path: '/industries' },
  { name: 'Work', path: '/work' },
  { name: 'Insights', path: '/insights' },
  { name: 'Community', path: '/community' },
  { name: 'About', path: '/about' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 bg-[rgba(252,253,254,0.92)] backdrop-blur-md border-b border-line">
        <div className="wrap flex items-center justify-between py-[18px]">
          
          {/* LOGO */}
          <Link href="/" className="flex flex-col items-start gap-0 cursor-pointer" aria-label="Botmartz home">
            <Image 
              src="/Logo-removebg-preview.png" 
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
              <Link 
                key={item.name} 
                href={item.path}
                className={`font-mono text-[12px] tracking-[0.06em] uppercase transition-colors ${
                  pathname === item.path ? 'text-brand' : 'text-ink-soft hover:text-brand'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA / MOBILE TOGGLE */}
          <div className="flex items-center gap-5">
            <button 
              className="lg:hidden font-mono text-[12px] border border-line px-3 py-2 rounded-sm text-ink flex items-center gap-2"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              MENU
            </button>
            <Link href="/contact" className="btn btn-primary hidden sm:inline-flex">
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
            className="fixed inset-0 z-[60] bg-paper/95 backdrop-blur-xl flex flex-col"
          >
            <div className="wrap flex items-center justify-between py-[18px] border-b border-line w-full">
              <Link href="/" className="flex flex-col items-start" onClick={() => setMobileMenuOpen(false)}>
                <Image 
                  src="/Logo-removebg-preview.png" 
                  alt="Botmartz Logo" 
                  width={240} 
                  height={60} 
                  className="h-[54px] w-auto object-contain"
                />
              </Link>
              <button 
                className="text-ink p-2"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 p-8 flex-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-heading text-2xl font-bold text-ink hover:text-brand transition-colors"
                >
                  {item.name}
                </Link>
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