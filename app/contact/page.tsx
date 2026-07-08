"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  Inter_Tight,
  JetBrains_Mono,
} from "next/font/google";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  BookOpen,
  Globe,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowUpRight,
  Terminal,
} from "lucide-react";

const inter = Inter_Tight({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "soham@botmartz.com",
    href: "mailto:soham@botmartz.com",
    description: "Drop us a message anytime",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 94073 28842",
    href: "tel:+919407328842",
    description: "Mon–Sat, 9am–7pm IST",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Indore, India",
    href: "https://maps.app.goo.gl/W4XioP5ev2zZnU1u6",
    description: "Visit us at our office",
  },
];

const SOCIAL_LINKS = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/soham-sharma/",
    label: "LinkedIn",
    color: "#0A66C2",
  },
  {
    icon: BookOpen,
    href: "https://blog.botmartz.com/",
    label: "Blog",
    color: "#D4AF37",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/botmartzai_solutions/",
    label: "AI Solutions",
    color: "#E1306C",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/botmartz_academy/",
    label: "Academy",
    color: "#833AB4",
  },
  {
    icon: Globe,
    href: "https://maps.app.goo.gl/W4XioP5ev2zZnU1u6",
    label: "Find Us",
    color: "#34A853",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await addDoc(collection(db, "contacts"), {
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        message: form.message.trim(),
        status: "unread",
        createdAt: serverTimestamp(),
      });
      setStatus("success");
      setForm({ name: "", email: "", company: "", message: "" });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <main className={`${inter.className} min-h-screen bg-[#080808] text-white overflow-x-hidden`}>

      {/* ── Background Effects ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Gold top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#D4AF37]/8 blur-[120px] rounded-full" />
        {/* Bottom glow */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/3 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-28">

        {/* ── HERO LOGO BLOCK ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-20 md:mb-28"
        >
          {/* Logo */}
          <Link href="/" className="group inline-block mb-8">
            <div className="relative w-[280px] h-[120px] md:w-[400px] md:h-[170px]">
              <Image
                src="/BotmartzNewLogo.png"
                alt="Botmartz AI Solutions"
                fill
                sizes="(max-width: 768px) 280px, 400px"
                className="object-contain group-hover:drop-shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-700"
                priority
              />
            </div>
          </Link>

          {/* Badge */}
          <div
            className={`${mono.className} inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/8 backdrop-blur-sm mb-6`}
          >
            <Terminal className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] text-[#D4AF37] tracking-widest uppercase">
              GenAI · Web · Cloud
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1] mb-4">
            Let&apos;s Build{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] via-yellow-200 to-[#D4AF37] bg-clip-text text-transparent">
              Something
            </span>{" "}
            Great
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed font-light">
            Engineering intelligent systems and scalable digital infrastructure for the modern enterprise.
          </p>
        </motion.div>

        {/* ── MAIN GRID: Left info + Right form ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-start">

          {/* ── LEFT: Contact Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Section Label */}
            <div>
              <p className={`${mono.className} text-xs text-[#D4AF37] uppercase tracking-[0.2em] mb-2`}>
                Get In Touch
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                We&apos;d love to hear from you
              </h2>
              <p className="text-gray-400 mt-2 font-light">
                Reach out through any channel below or fill in the form.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {CONTACT_INFO.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="group flex items-center gap-5 p-5 rounded-2xl border border-white/8 bg-white/3 hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5 backdrop-blur-md transition-all duration-400"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-all duration-300">
                    <item.icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`${mono.className} text-[10px] text-gray-500 uppercase tracking-wider mb-0.5`}>
                      {item.label}
                    </p>
                    <p className="text-white font-semibold text-sm sm:text-base truncate group-hover:text-[#D4AF37] transition-colors">
                      {item.value}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">{item.description}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" />
                </motion.a>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Social Links */}
            <div>
              <p className={`${mono.className} text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-4`}>
                Follow Us
              </p>
              <div className="flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
                    aria-label={social.label}
                    className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/10 bg-white/4 hover:scale-105 active:scale-95 transition-all duration-300 hover:border-white/25"
                    style={{ "--social-color": social.color } as React.CSSProperties}
                  >
                    <social.icon
                      className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors"
                    />
                    <span className="text-xs text-gray-400 group-hover:text-white transition-colors font-medium">
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Map Embed Preview */}
            <motion.a
              href="https://maps.app.goo.gl/W4XioP5ev2zZnU1u6"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="group block relative rounded-2xl border border-white/8 overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-400"
            >
              <div className="relative h-44 bg-gradient-to-br from-[#1a1a1a] to-[#111]">
                {/* Map placeholder with dots pattern */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: "radial-gradient(circle, #D4AF37 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center animate-pulse">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm">Indore, Madhya Pradesh</p>
                    <p className="text-gray-500 text-xs">India</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg px-3 py-1.5 group-hover:bg-[#D4AF37]/20 transition-all">
                  <span className="text-[10px] text-[#D4AF37] font-medium">Open Maps</span>
                  <ArrowUpRight className="w-3 h-3 text-[#D4AF37]" />
                </div>
              </div>
            </motion.a>
          </motion.div>

          {/* ── RIGHT: Contact Form ── */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative rounded-3xl border border-white/10 bg-white/3 backdrop-blur-xl p-8 md:p-10 shadow-[0_0_80px_rgba(212,175,55,0.06)]">

              {/* Top glow accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-5 py-16 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-gray-400 font-light">
                      Thanks for reaching out. Our team will get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-2 px-8 py-3 border border-[#D4AF37]/40 text-[#D4AF37] rounded-xl text-sm font-semibold hover:bg-[#D4AF37]/10 transition-all duration-300"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="mb-8">
                    <p className={`${mono.className} text-[10px] text-[#D4AF37] uppercase tracking-[0.2em] mb-2`}>
                      Start a Conversation
                    </p>
                    <h2 className="text-2xl font-bold text-white">Send a Message</h2>
                    <p className="text-gray-400 text-sm mt-1 font-light">
                      Tell us about your project and we&apos;ll get back to you shortly.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name + Company row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={`${mono.className} block text-[10px] text-gray-500 uppercase tracking-wider mb-2`}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                          placeholder="John Doe"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-[#D4AF37]/5 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className={`${mono.className} block text-[10px] text-gray-500 uppercase tracking-wider mb-2`}>
                          Company
                        </label>
                        <input
                          type="text"
                          value={form.company}
                          onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                          placeholder="Acme Inc. (optional)"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-[#D4AF37]/5 transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className={`${mono.className} block text-[10px] text-gray-500 uppercase tracking-wider mb-2`}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="you@company.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-[#D4AF37]/5 transition-all duration-300"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className={`${mono.className} block text-[10px] text-gray-500 uppercase tracking-wider mb-2`}>
                        Message *
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        placeholder="Tell us about your project, goals, or any questions you have…"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-[#D4AF37]/5 transition-all duration-300 resize-none"
                      />
                    </div>

                    {/* Error */}
                    {status === "error" && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-400 text-sm"
                      >
                        <AlertCircle size={14} /> {error}
                      </motion.p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group w-full relative overflow-hidden flex items-center justify-center gap-2.5 bg-[#D4AF37] text-black font-bold py-4 rounded-xl text-sm hover:bg-yellow-300 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)]"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-gray-600 text-xs">
                      We typically respond within{" "}
                      <span className="text-gray-400">24 hours</span> on business days.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* ── BOTTOM QUICK LINKS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-20 md:mt-28 pt-10 border-t border-white/8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link href="/" className="group inline-block">
              <div className="relative w-[150px] h-[60px]">
                <Image
                  src="/BotmartzNewLogo.png"
                  alt="Botmartz AI Solutions"
                  fill
                  sizes="150px"
                  className="object-contain object-left opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-6">
              {[
                { label: "Services", href: "/services" },
                { label: "Work", href: "/work" },
                { label: "About", href: "/about" },
                { label: "Blog", href: "https://blog.botmartz.com/", external: true },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={`${mono.className} text-xs text-gray-500 hover:text-[#D4AF37] transition-colors tracking-wider uppercase`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <p className={`${mono.className} text-xs text-gray-600`}>
              © {new Date().getFullYear()} Botmartz AI Solutions
            </p>
          </div>
        </motion.div>

      </div>
    </main>
  );
}