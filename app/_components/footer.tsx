"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Send, Loader2 } from "lucide-react";

const FOOTER_LINKS = {
  company: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  ecosystem: [
    { label: "AI Frontier", href: "/community" },
    { label: "Meetups", href: "/community" },
    { label: "Botmartz Academy ↗", href: "https://academy.botmartz.com" },
    { label: "GitHub ↗", href: "https://github.com/botmartz" },
  ],
  connect: [
    { label: "Book a Call", href: "/contact" },
    { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/soham-sharma/" },
    { label: "hello@botmartz.com", href: "mailto:hello@botmartz.com" },
  ],
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    
    // Simulating API call since newsletter isn't fully migrated in this rebuild yet
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <footer className="bg-[#050B14] border-t border-white/10 pt-[60px] pb-[30px]">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 mb-[50px]">
          
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image 
                src="/BotmartzNewLogo.png" 
                alt="Botmartz Logo" 
                width={240} 
                height={60} 
                className="h-[54px] w-auto object-contain"
              />
            </Link>
            <p className="text-[14px] text-[#8A9EB0] max-w-[280px] mb-6">
              Engineering production AI systems — Enterprise RAG and AI Agents.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="relative flex gap-2 max-w-[280px]">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Join our newsletter"
                className="flex-1 bg-[#0A111F] border border-white/10 rounded-sm px-3 py-2 text-[13px] text-white placeholder:text-[#8A9EB0]/50 focus:outline-none focus:border-[#00B8F0] transition-colors"
                disabled={status === "success"}
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="px-3 py-2 bg-[#00B8F0] text-[#050B14] font-mono text-[11px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#00B8F0]/80 transition-colors disabled:opacity-50"
              >
                {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : (status === "success" ? "Done" : <Send className="w-4 h-4" />)}
              </button>
            </form>
          </div>

          {/* Company */}
          <div>
            <h5 className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#8A9EB0] mb-4">Company</h5>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[14px] text-white/70 hover:text-[#00B8F0] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h5 className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#8A9EB0] mb-4">Ecosystem</h5>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.ecosystem.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[14px] text-white/70 hover:text-[#00B8F0] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h5 className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#8A9EB0] mb-4">Connect</h5>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.connect.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[14px] text-white/70 hover:text-[#00B8F0] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-wrap justify-between items-center pt-[26px] border-t border-white/10 font-mono text-[11.5px] text-[#8A9EB0] gap-3">
          <span>© {new Date().getFullYear()} BOTMARTZ AI SOLUTIONS</span>
          <span>ENTERPRISE RAG · AI AGENTS</span>
        </div>
      </div>
    </footer>
  );
}