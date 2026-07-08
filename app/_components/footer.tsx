"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Instagram, 
  Globe,
  BookOpen,
  ArrowUpRight,
  Terminal,
  Send,
  Loader2
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
    { label: "AI Solutions", href: "/services/ai-solutions" },
    { label: "Web Development", href: "/services/web-development" },
    { label: "Training Programs", href: "https://classes.botmartz.com" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const SOCIAL_LINKS = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/soham-sharma/", label: "LinkedIn" },
  { icon: BookOpen, href: "/blog", label: "Blog" },
  { icon: Instagram, href: "https://www.instagram.com/botmartzai_solutions/", label: "AI Solutions" },
  { icon: Instagram, href: "https://www.instagram.com/botmartz_academy/", label: "Academy" },
  { icon: Globe, href: "https://maps.app.goo.gl/W4XioP5ev2zZnU1u6", label: "Location" },
];

const CONTACT_INFO = [
  { 
    icon: Mail, 
    label: "Email", 
    value: "soham@botmartz.com",
    href: "mailto:soham@botmartz.com" 
  },
  { 
    icon: Phone, 
    label: "Phone", 
    value: "+91 94073 28842",
    href: "tel:+919407328842" 
  },
  { 
    icon: MapPin, 
    label: "Location", 
    value: "Indore, India",
    href: "https://maps.app.goo.gl/W4XioP5ev2zZnU1u6" 
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Subscription failed. Please try again.");
      }
    } catch (err) {
      console.error("[newsletter/subscribe] error:", err);
      setStatus("error");
      setErrorMsg("Network error. Please try again later.");
    }
  };

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
                    src="/BotmartzNewLogo.png"
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
              
              {/* Terminal Badge / Phone CTA */}
              <div className="flex flex-wrap items-center gap-3">
                <Link 
                  href="tel:+919407328842"
                  className={`${mono.className} inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 backdrop-blur-sm hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/10 transition-all`}
                >
                  <Terminal className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="text-[11px] text-[#D4AF37] tracking-wider uppercase">
                    +91 94073 28842
                  </span>
                </Link>
              </div>

              {/* Newsletter Subscription */}
              <div className="mt-8 max-w-sm">
                <h4 className={`${mono.className} text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-3`}>
                  Subscribe to Transmissions
                </h4>
                
                {status === "success" ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl border border-green-500/20 bg-green-500/5 text-green-400 text-xs font-light leading-relaxed"
                  >
                    🚀 Transmission secured! Thank you for subscribing.
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className="relative flex gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-[#D4AF37]/5 transition-all duration-300"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="px-4 py-2.5 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-yellow-300 active:scale-[0.97] transition-all duration-300 disabled:opacity-50 flex items-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                    >
                      {status === "loading" ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <>
                          <span>Join</span>
                          <Send className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  </form>
                )}
                
                {status === "error" && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-[11px] mt-2 font-light"
                  >
                    ⚠️ {errorMsg}
                  </motion.p>
                )}
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