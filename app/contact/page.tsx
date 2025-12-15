"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Phone, Send, ArrowRight } from "lucide-react";
import { Inter_Tight } from 'next/font/google';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoCardsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    setMounted(true);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!mounted || isMobile) return;

    const ctx = gsap.context(() => {
      // Animated grid background
      gsap.to(gridRef.current, {
        backgroundPosition: "100% 100%",
        duration: 20,
        repeat: -1,
        ease: "none"
      });

      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
        opacity: 0,
        y: 100,
        scale: 0.8,
      });

      // Form fields stagger
      gsap.from(".contact-field", {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 75%",
        },
        opacity: 0,
        x: -50,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
      });

      // Info cards float
      gsap.from(".info-card", {
        scrollTrigger: {
          trigger: infoCardsRef.current,
          start: "top 75%",
        },
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
      });

      // Floating particles
      gsap.utils.toArray<HTMLElement>(".particle").forEach((particle, i) => {
        gsap.to(particle, {
          y: "random(-100, 100)",
          x: "random(-100, 100)",
          duration: "random(3, 6)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [mounted, isMobile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formState);
    // Add your form submission logic here
  };

  const contactInfo = [
    { icon: Mail, label: "Email Us", value: "hello@botmartz.com", link: "mailto:hello@botmartz.com" },
    { icon: Phone, label: "Call Us", value: "+1 (555) 123-4567", link: "tel:+15551234567" },
    { icon: MapPin, label: "Visit Us", value: "San Francisco, CA", link: "#" },
  ];

  return (
    <section 
      ref={sectionRef}
      className={`${interTight.className} relative min-h-screen bg-[#050505] text-white py-24 overflow-hidden`}
    >
      {/* Animated Grid Background */}
      <div 
        ref={gridRef}
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          backgroundPosition: "0 0"
        }}
      />

      {/* Floating Particles - Desktop only */}
      {mounted && !isMobile && (
        <>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="particle absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </>
      )}

      {/* Spotlight Effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 800px at 50% 30%, rgba(255,255,255,0.05), transparent 70%)`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-xs font-mono tracking-[0.3em] text-gray-500 uppercase">
              Contact
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
            LET'S BUILD{" "}
            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              TOGETHER
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Ready to transform your business with cutting-edge automation? 
            We're here to make it happen.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Contact Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-3xl" />
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10 space-y-6"
            >
              {/* Name Field */}
              <div className="contact-field space-y-2">
                <label className="text-xs font-mono tracking-widest text-gray-400 uppercase">
                  Your Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all duration-300"
                    placeholder="John Doe"
                    required
                  />
                  {focusedField === "name" && (
                    <div className="absolute inset-0 rounded-lg border-2 border-white/20 pointer-events-none animate-pulse" />
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="contact-field space-y-2">
                <label className="text-xs font-mono tracking-widest text-gray-400 uppercase">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all duration-300"
                    placeholder="john@company.com"
                    required
                  />
                  {focusedField === "email" && (
                    <div className="absolute inset-0 rounded-lg border-2 border-white/20 pointer-events-none animate-pulse" />
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div className="contact-field space-y-2">
                <label className="text-xs font-mono tracking-widest text-gray-400 uppercase">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    rows={6}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all duration-300 resize-none"
                    placeholder="Tell us about your project..."
                    required
                  />
                  {focusedField === "message" && (
                    <div className="absolute inset-0 rounded-lg border-2 border-white/20 pointer-events-none animate-pulse" />
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="contact-field">
                <button
                  type="submit"
                  className="group relative w-full bg-white text-black font-bold py-4 rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 text-sm tracking-widest uppercase">
                    Send Message
                    <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info Cards */}
          <div ref={infoCardsRef} className="space-y-6">
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-4">Get In Touch</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Have a question or ready to start your next project? 
                Reach out through any of these channels.
              </p>
            </div>

            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                className="info-card group block relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg group-hover:bg-white/20 transition-colors">
                    <info.icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">
                      {info.label}
                    </div>
                    <div className="text-lg font-semibold text-white group-hover:text-gray-100 transition-colors">
                      {info.value}
                    </div>
                  </div>
                  <ArrowRight 
                    size={20} 
                    className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" 
                  />
                </div>
              </a>
            ))}

            {/* Social Links */}
            <div className="info-card pt-8">
              <div className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-4">
                Follow Us
              </div>
              <div className="flex gap-4">
                {["Twitter", "LinkedIn", "GitHub", "Instagram"].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}