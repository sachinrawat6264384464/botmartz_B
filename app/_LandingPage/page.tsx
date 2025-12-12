"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CosmicLanding() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div ref={containerRef} className="bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <motion.section 
        style={{ opacity, scale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Cosmic Background Effect */}
        <CosmicBackground />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
              style={{
                background: "linear-gradient(to bottom, #ffffff 30%, rgba(255,255,255,0.4) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              Everything Your<br />Business Needs
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              The all-in-one platform where work flows. Scale your operations with AI-powered automation.
            </motion.p>

            <motion.button
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Get Started →
            </motion.button>
          </motion.div>
        </div>

        {/* Glowing Device Mockup */}
        <DeviceMockup />
      </motion.section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Stats Section */}
      <StatsSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}

// Navigation Component
function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/10" : ""
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <motion.div 
            className="text-2xl font-bold"
            whileHover={{ scale: 1.05 }}
          >
            ⚡ Botmartz
          </motion.div>
          
          <div className="hidden md:flex items-center gap-8 text-sm">
            {["Products", "Solutions", "Resources", "Pricing"].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-sm text-gray-400 hover:text-white transition-colors">
            Sign In
          </button>
          <motion.button
            className="px-6 py-2 bg-white text-black text-sm font-semibold rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Free
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}

// Cosmic Background Effect
function CosmicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Gradient orbs
    const drawOrb = (x, y, radius, color1, color2) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Large blue orb
      drawOrb(
        canvas.width * 0.5,
        canvas.height * 0.3,
        400,
        "rgba(59, 130, 246, 0.3)",
        "rgba(59, 130, 246, 0)"
      );

      // Purple orb
      drawOrb(
        canvas.width * 0.7,
        canvas.height * 0.5,
        350,
        "rgba(168, 85, 247, 0.25)",
        "rgba(168, 85, 247, 0)"
      );

      // Cyan accent
      drawOrb(
        canvas.width * 0.3,
        canvas.height * 0.6,
        300,
        "rgba(6, 182, 212, 0.2)",
        "rgba(6, 182, 212, 0)"
      );
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      animate();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      {/* Vertical light beam */}
      <div 
        className="absolute top-0 right-1/4 w-1 h-full opacity-50"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(139, 92, 246, 0.5) 20%, rgba(59, 130, 246, 0.8) 50%, transparent)",
          boxShadow: "0 0 60px 10px rgba(139, 92, 246, 0.5)"
        }}
      />

      {/* Grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px"
        }}
      />
    </>
  );
}

// Device Mockup Component
function DeviceMockup() {
  return (
    <motion.div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.6 }}
    >
      <div className="relative">
        {/* Glow effect behind device */}
        <div 
          className="absolute inset-0 blur-3xl opacity-60"
          style={{
            background: "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.4) 0%, transparent 70%)"
          }}
        />

        {/* Device frame */}
        <div className="relative bg-gradient-to-b from-gray-900 to-black rounded-t-2xl border border-gray-800 overflow-hidden shadow-2xl">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-900/50 border-b border-gray-800">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="flex-1 mx-4 bg-gray-800/50 rounded px-3 py-1 text-xs text-gray-500">
              botmartz.com
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-6 bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <div className="grid grid-cols-4 gap-4 mb-4">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 rounded-lg p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                >
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg mb-3" />
                  <div className="h-2 bg-gray-700/50 rounded mb-2 w-3/4" />
                  <div className="h-2 bg-gray-700/30 rounded w-1/2" />
                </motion.div>
              ))}
            </div>

            {/* Chart visualization */}
            <motion.div
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 }}
            >
              <div className="flex items-end justify-between h-32 gap-2">
                {[40, 70, 45, 80, 60, 90, 55, 75, 65, 85, 70, 95].map((height, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
                    style={{ height: `${height}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: 1.6 + i * 0.05, duration: 0.5 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Automation",
      description: "Intelligent workflows that adapt to your business needs"
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Built for speed with edge computing technology"
    },
    {
      icon: "🔒",
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance standards"
    },
    {
      icon: "📊",
      title: "Advanced Analytics",
      description: "Real-time insights and predictive intelligence"
    }
  ];

  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Built for Modern Teams
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to scale your business, all in one platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Stats Section
function StatsSection() {
  const stats = [
    { value: "10M+", label: "Active Users" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "150+", label: "Countries" },
    { value: "24/7", label: "Support" }
  ];

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Transform<br />Your Business?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Join thousands of companies already using Botmartz
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-8 py-4 bg-white text-black font-semibold rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Trial
            </motion.button>
            <motion.button
              className="px-8 py-4 bg-transparent border border-white/20 font-semibold rounded-full hover:bg-white/5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Demo
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400">
          <div>© 2025 Botmartz. All rights reserved.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </section>
  );
}