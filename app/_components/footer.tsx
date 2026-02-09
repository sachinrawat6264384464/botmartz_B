"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Instagram, 
  Globe,
  ArrowUpRight,
  Terminal
} from "lucide-react";
import { Inter_Tight, JetBrains_Mono } from 'next/font/google';

const inter = Inter_Tight({ 
  subsets: ['latin'], 
  weight: ['300', '400', '600'],
  display: 'swap'
});

const mono = JetBrains_Mono({ 
  subsets: ['latin'], 
  weight: ['400'],
  display: 'swap'
});

const FOOTER_LINKS = {
  company: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "AI Solutions", href: "/services#ai" },
    { label: "Web Development", href: "/services#web" },
    { label: "Cloud Architecture", href: "/services#cloud" },
    { label: "Training Programs", href: "/services#training" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const SOCIAL_LINKS = [
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Globe, href: "#", label: "Website" },
];

const CONTACT_INFO = [
  { 
    icon: Mail, 
    label: "Email", 
    value: "sohamnsharma@gmail.com",
    href: "mailto:sohamnsharma@gmail.com" 
  },
  { 
    icon: Phone, 
    label: "Phone", 
    value: "+91-9730084626",
    href: "tel:+919730084626" 
  },
  { 
    icon: MapPin, 
    label: "Location", 
    value: "Indore, India",
    href: "#" 
  },
];

export function Footer() {
  return (
    <footer className="relative bg-[#050505] border-t border-white/5">
      {/* Top Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
      
      <div className="max-w-[1700px] mx-auto px-4 md:px-8 lg:px-12">
        
        {/* Main Footer Content */}
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Brand Column - Takes more space */}
            <div className="lg:col-span-5">
              {/* Logo */}
              <Link href="/" className="inline-block group mb-8">
                <div className="relative w-[240px] h-[100px] md:w-[300px] md:h-[125px]">
                  <Image
                    src="/Botmartz_silver.png"
                    alt="Botmartz"
                    fill
                    sizes="(max-width: 768px) 240px, 300px"
                    className="object-contain object-left group-hover:drop-shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all duration-500"
                    priority
                  />
                </div>
              </Link>
              
              {/* Description */}
              <p className={`${inter.className} text-gray-400 text-sm md:text-base leading-relaxed mb-6 max-w-md`}>
                Engineering intelligent systems and scalable digital infrastructure for the modern enterprise.
              </p>
              
              {/* Terminal Badge */}
              <div className={`${mono.className} inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 backdrop-blur-sm`}>
                <Terminal className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[11px] text-[#D4AF37] tracking-wider uppercase">
                  GenAI Architect
                </span>
              </div>
            </div>

            {/* Company Links */}
            <div className="lg:col-span-2">
              <h3 className={`${mono.className} text-xs font-semibold text-white/60 uppercase tracking-[0.15em] mb-6`}>
                Company
              </h3>
              <ul className="space-y-3.5">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className={`${inter.className} group flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-light`}
                    >
                      <span className="w-0 h-px bg-[#D4AF37] group-hover:w-4 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div className="lg:col-span-2">
              <h3 className={`${mono.className} text-xs font-semibold text-white/60 uppercase tracking-[0.15em] mb-6`}>
                Services
              </h3>
              <ul className="space-y-3.5">
                {FOOTER_LINKS.services.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className={`${inter.className} group flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-light`}
                    >
                      <span className="w-0 h-px bg-[#D4AF37] group-hover:w-4 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-3">
              <h3 className={`${mono.className} text-xs font-semibold text-white/60 uppercase tracking-[0.15em] mb-6`}>
                Get In Touch
              </h3>
              <div className="space-y-4">
                {CONTACT_INFO.map((item) => (
                  <a 
                    key={item.label}
                    href={item.href}
                    className="group flex items-start gap-3 text-sm hover:text-white transition-colors"
                  >
                    <div className="mt-0.5 p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-[#D4AF37]/50 group-hover:bg-[#D4AF37]/10 transition-all duration-300">
                      <item.icon className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <div className="flex-1">
                      <div className={`${mono.className} text-[10px] text-gray-500 uppercase tracking-wider mb-1.5`}>
                        {item.label}
                      </div>
                      <div className={`${inter.className} text-gray-300 group-hover:text-white transition-colors font-light`}>
                        {item.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom Bar */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Copyright */}
          <div className={`${mono.className} text-xs text-gray-500 order-2 md:order-1`}>
            © {new Date().getFullYear()} Botmartz. All rights reserved.
          </div>

          {/* Social Links */}
       {/* Social Links */}
<div className="flex items-center gap-3 order-1 md:order-2">
 {SOCIAL_LINKS.map((social) => (
  <a
    key={social.label}
    href={social.href}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 hover:scale-105 active:scale-95 transition-all duration-300"
    aria-label={social.label}
  >
    <social.icon className="w-4 h-4 text-gray-400 group-hover:text-[#D4AF37] transition-colors" />
  </a>
))}
</div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 order-3 text-center">
            {FOOTER_LINKS.legal.map((link, index) => (
              <React.Fragment key={link.href}>
                <Link
                  href={link.href}
                  className={`${mono.className} text-[11px] text-gray-500 hover:text-[#D4AF37] transition-colors`}
                >
                  {link.label}
                </Link>
                {index < FOOTER_LINKS.legal.length - 1 && (
                  <span className="text-gray-700">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* CTA Strip */}
        <div className="border-t border-white/5">
          <Link 
            href="/contact"
            className="group flex items-center justify-between py-6 px-4 md:px-0 hover:bg-white/[0.02] transition-all duration-300"
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_10px_#D4AF37]" />
              <span className={`${inter.className} text-sm md:text-base text-white font-medium`}>
                Ready to transform your business?
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#D4AF37] group-hover:gap-3 transition-all duration-300">
              <span className={`${mono.className} text-xs uppercase tracking-wider hidden sm:inline`}>
                Start Project
              </span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </div>
          </Link>
        </div>

      </div>
    </footer>
  );
}