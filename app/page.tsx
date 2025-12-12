"use client";

import React, { useRef, useState, useEffect } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionValue, 
  AnimatePresence,
  MotionValue
} from "framer-motion";
import { ReactLenis } from "@studio-freight/react-lenis";
import { 
  ArrowRight, Terminal, Cpu, Shield, Globe, Database, 
  Zap, Layers, Code2, ArrowUpRight, LayoutTemplate,
  GitMerge, CheckCircle2, ChevronDown, TerminalSquare, 
  Fingerprint, Activity 
} from "lucide-react";
import { Space_Grotesk, Inter_Tight } from 'next/font/google';

// --- FONTS ---
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['300', '500', '700'] });
const interTight = Inter_Tight({ subsets: ['latin'], weight: ['300', '400', '500'] });

// --- TYPES ---
interface Service {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

interface Project {
  title: string;
  url: string;
  tag: string;
  result: string;
}

// --- UTILS ---
const cn = (...classes: (string | undefined | null | boolean)[]) => classes.filter(Boolean).join(' ');

// --- DATA INJECTION ---
const SERVICES: Service[] = [
  {
    title: "Custom AI Automations",
    description: "Streamlined workflows that save time, reduce costs, and eliminate repetitive manual tasks.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=350&fit=crop&q=80",
    icon: <Zap />
  },
  {
    title: "Intelligent AI Agents",
    description: "Smart, conversational agents for customer support, lead generation, and internal operations.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=350&fit=crop&q=80",
    icon: <Cpu />
  },
  {
    title: "End-to-End Web Development",
    description: "Modern, responsive, and high-performance websites tailored to your brand and goals.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=350&fit=crop&q=80",
    icon: <Globe />
  },
  {
    title: "SaaS Product Development",
    description: "Scalable, cloud-based software solutions built for performance and user experience.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=350&fit=crop&q=80",
    icon: <Layers />
  },
  {
    title: "Integration with Existing Tools",
    description: "Seamless connections with CRMs, ERPs, APIs, and third-party platforms.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=350&fit=crop&q=80",
    icon: <Code2 />
  },
  {
    title: "Data-Driven Dashboards",
    description: "Real-time analytics and visualization tools to empower smarter decision-making.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=350&fit=crop&q=80",
    icon: <Database />
  },
  {
    title: "Maintenance & Support",
    description: "Continuous improvements, monitoring, and updates to keep your systems running smoothly.",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=350&fit=crop&q=80",
    icon: <Shield />
  },
  {
    title: "Scalable Tech Architecture",
    description: "Robust infrastructure design to ensure your digital products grow effortlessly.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=350&fit=crop&q=80",
    icon: <Terminal />
  },
  {
    title: "UX Optimization",
    description: "Thoughtfully designed interfaces that maximize engagement and conversion.",
    image: "https://images.unsplash.com/photo-1545665225-b23b99e4d45e?w=600&h=350&fit=crop&q=80",
    icon: <LayoutTemplate />
  },
  {
    title: "Automation Consulting",
    description: "Expert guidance on identifying high-impact automation and AI opportunities.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=350&fit=crop&q=80",
    icon: <ArrowUpRight />
  },
];

const PROJECTS: Project[] = [
  { title: "Lotus Skincare", url: "https://lotusskin.in/", tag: "E-commerce", result: "Upto 20% Off" },
  { title: "Safari Bags", url: "https://www.safaribags.com/", tag: "Retail", result: "Premium Collection" },
  { title: "Yashueprem", url: "https://yashueprem.com/", tag: "E-commerce", result: "Curated Products" },
  { title: "SWA Syrups", url: "https://swaartisanalsyrups.com/", tag: "Food & Bev", result: "100% Natural" },
  { title: "PlixLife", url: "https://plixlife.com/", tag: "Wellness", result: "Vegan Products" },
  { title: "Tesora", url: "https://www.tesora.shop/", tag: "Home", result: "Premium Appliances" },
  { title: "Anugami", url: "https://anugami.com/", tag: "Technology", result: "Digital Solutions" },
  { title: "The Nidhimittal", url: "https://thenidhimittal.com/", tag: "Consulting", result: "Expert Services" },
  { title: "Ziplyne", url: "https://ziplyne.com/", tag: "Logistics", result: "Fast Delivery" }
];

// --- UTILS: Text Decryption Effect ---
const CHARS = "-_~=+|!@#$%^&*()[]{}";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

function ScrambleText({ text, className }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  
  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout | null = null;
    
    interval = setInterval(() => {
      setDisplayText((prev) => 
        text.split("").map((letter, index) => {
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join("")
      );
      if (iteration >= text.length && interval) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => {
        if(interval) clearInterval(interval);
    };
  }, [text]);

  return <span className={className}>{displayText}</span>;
}

// --- MAIN PAGE COMPONENT ---
export default function BotmartzMasterpiece() {
  return (
    <ReactLenis root options={{ lerp: 0.06, duration: 1.2 }}>
      <main className={cn(
        "bg-[#050505] text-[#E0E0E0] min-h-screen w-full relative overflow-x-hidden selection:bg-[#D4AF37]/30 selection:text-[#D4AF37]",
        spaceGrotesk.className
      )}>
        {/* Cinematic Grain Overlay */}
        <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.035] mix-blend-overlay" 
             style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        
        <Navbar />
        <HeroSection />
        <MarqueeSection />
        <ServicesGrid />
        
        {/* --- EXPANDED SECTIONS --- */}
        <ProcessTimeline />
        <SystemMetrics />
        <ProjectManifest />
        <ClientTransmissions />
        <NeuralQuery />
        <FinalCTA />
        
        <FooterTerminal />
      </main>
    </ReactLenis>
  );
}

// --- COMPONENTS ---

// --- UPDATED NAVBAR ---
function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center backdrop-blur-md bg-[#050505]/50 border-b border-white/5"
    >
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="relative w-8 h-8 flex items-center justify-center rounded-md border border-white/10 overflow-hidden bg-white/5 group-hover:border-[#D4AF37]/50 transition-colors">
            <div className="w-4 h-4 bg-[#D4AF37] rounded-full opacity-80" />
        </div>
        <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-widest uppercase text-white group-hover:text-[#D4AF37] transition-colors">BOTMARTZ</span>
            <span className="text-[9px] tracking-widest text-gray-500 uppercase">IT Solutions</span>
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-8">
        <div className="flex gap-8 text-xs font-medium tracking-widest text-white/60">
          {['Services', 'Work', 'About', 'Contact'].map((item) => (
            <MagneticButton key={item} className="hover:text-white transition-colors cursor-pointer relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4AF37] group-hover:w-full transition-all duration-300 ease-out" />
            </MagneticButton>
          ))}
        </div>
        <MagneticButton className="px-6 py-2 bg-[#D4AF37] text-black text-xs font-bold tracking-widest uppercase hover:bg-[#F0C545] transition-colors duration-300 rounded-sm">
          Get Started
        </MagneticButton>
      </div>
    </motion.nav>
  );
}

// --- UPDATED HERO SECTION (BRANDED) ---
function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // 3D Tilt Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);
  
  // Parallax Shards
  const shardX = useTransform(x, [-0.5, 0.5], [30, -30]);
  const shardY = useTransform(y, [-0.5, 0.5], [30, -30]);

  // Content Scroll Physics
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      ref={ref} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505] perspective-2000"
    >
      {/* 1. PULSING NEURAL CORE */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
         <div className="relative w-[60vw] h-[60vw] max-w-[800px] max-h-[800px]">
            {[...Array(3)].map((_, i) => (
               <motion.div 
                 key={i}
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1.5, opacity: [0, 0.15, 0] }}
                 transition={{ 
                   duration: 5, 
                   repeat: Infinity, 
                   delay: i * 2,
                   ease: "easeInOut"
                 }}
                 className="absolute inset-0 border border-[#D4AF37]/10 rounded-full"
               />
            ))}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_60%)]" />
         </div>
      </div>

      {/* 2. DYNAMIC BACKGROUND GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)] z-0" />

      {/* 3. FLOATING 3D CONTENT */}
      <motion.div 
        style={{ 
          y: contentY, 
          opacity,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }} 
        className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center"
      >
        
        {/* Floating Code Shards */}
        <FloatingShard x={shardX} y={shardY} top="-100px" left="5%" label="BOTMARTZ_CORE" delay={0} />
        <FloatingShard x={shardX} y={shardY} top="40%" right="5%" label="SYSTEM: ONLINE" delay={0.2} invert />
        <FloatingShard x={shardX} y={shardY} bottom="-80px" left="20%" label="V.2.5.0" delay={0.4} />

        <div className="text-center relative z-20 transform-style-3d">
            
            {/* Status Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-3 border border-white/10 bg-black/40 backdrop-blur-md rounded-full px-5 py-2 mb-10 shadow-[0_0_30px_-5px_rgba(212,175,55,0.15)]"
            >
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-gray-300 font-medium">Global IT Infrastructure</span>
            </motion.div>

            {/* BRANDING TITLE */}
            <h1 className="text-6xl md:text-[9rem] font-bold tracking-tighter leading-[0.9] text-white mix-blend-difference relative">
                {/* LINE 1: BOTMARTZ */}
                <motion.div style={{ z: 60 }} className="relative block">
                     <span className="relative inline-block">
                        <ScrambleText text="BOTMARTZ" className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400" />
                     </span>
                </motion.div>
                
                {/* LINE 2: IT SOLUTIONS */}
                <motion.div style={{ z: 40 }} className="relative block mt-2">
                      <span className="block text-[#444] mix-blend-color-dodge text-4xl md:text-[7rem] tracking-[-0.02em]" 
                            style={{ 
                              textShadow: "0 0 40px rgba(255,255,255,0.05)",
                              WebkitTextStroke: "1px rgba(255,255,255,0.1)"
                            }}>
                        IT SOLUTIONS
                      </span>
                </motion.div>
            </h1>
            
            {/* Subtext */}
            <motion.div 
                style={{ z: 30 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="pt-12 flex flex-col items-center gap-6"
            >
                <p className={`${interTight.className} text-gray-400 text-lg md:text-xl max-w-xl mx-auto font-light tracking-wide leading-relaxed`}>
                    Transforming businesses through <span className="text-[#D4AF37]">next-gen automation</span>, intelligent software, and scalable digital ecosystems.
                </p>
            </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-gray-600">Explore Capabilities</span>
        <div className="w-px h-16 bg-gradient-to-b from-[#D4AF37]/50 to-transparent" />
      </motion.div>

    </section>
  );
}

// Helper Component for the floating data UI elements
interface FloatingShardProps {
    x: MotionValue<number>;
    y: MotionValue<number>;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    label: string;
    delay: number;
    invert?: boolean;
}

function FloatingShard({ x, y, top, left, right, bottom, label, delay, invert = false }: FloatingShardProps) {
    return (
        <motion.div 
            style={{ 
                x: invert ? useTransform(x, (v) => -v) : x, 
                y: invert ? useTransform(y, (v) => -v) : y,
                top, left, right, bottom,
                z: 40
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + delay, duration: 0.8 }}
            className="absolute hidden md:flex items-center gap-2 pointer-events-none"
        >
            <div className="h-px w-8 bg-white/20" />
            <div className="bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-sm">
                <span className="font-mono text-[9px] text-[#D4AF37]">{label}</span>
            </div>
        </motion.div>
    )
}

function MarqueeSection() {
    return (
        <div className="py-12 border-y border-white/5 bg-[#080808] overflow-hidden flex relative z-20">
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] z-10" />
            <motion.div 
                className="flex gap-16 whitespace-nowrap text-[#333] font-bold text-6xl uppercase tracking-tighter"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                {[...Array(4)].map((_, i) => (
                    <React.Fragment key={i}>
                        <span>Automation</span>
                        <span className="text-[#D4AF37]">•</span>
                        <span>Intelligence</span>
                        <span className="text-[#D4AF37]">•</span>
                        <span>Scale</span>
                        <span className="text-[#D4AF37]">•</span>
                    </React.Fragment>
                ))}
            </motion.div>
        </div>
    )
}

function ServicesGrid() {
  return (
    <section className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                SYSTEM <span className="text-[#D4AF37]">CAPABILITIES</span>
            </h2>
            <p className={`${interTight.className} text-gray-500 max-w-md text-right mt-4 md:mt-0`}>
                Deploying advanced neural architectures for complex business problems.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
                <ServiceCard key={i} service={service} index={i} />
            ))}
        </div>
    </section>
  )
}

interface ServiceCardProps {
    service: Service;
    index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [15, -15]);
    const rotateY = useTransform(x, [-100, 100], [-15, 15]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.05, duration: 0.6 }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            className="group relative h-[400px] bg-[#0A0A0A] border border-white/5 rounded-xl overflow-hidden cursor-none perspective-1000"
        >
            {/* Background Image - Revealed on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 ease-out">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover grayscale mix-blend-luminosity scale-110" />
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-[#0A0A0A]/90 to-transparent z-10" />

            {/* Content */}
            <div className="relative z-20 h-full p-8 flex flex-col justify-between transform transition-transform duration-500 group-hover:translate-z-10">
                <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-[#D4AF37] border border-white/5 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300">
                        {service.icon}
                    </div>
                    <span className="font-mono text-xs text-white/30">0{index + 1}</span>
                </div>

                <div>
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#D4AF37] transition-colors">{service.title}</h3>
                    <p className={`${interTight.className} text-gray-400 text-sm leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity`}>
                        {service.description}
                    </p>
                </div>
            </div>

            {/* Hover Spotlight */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
        </motion.div>
    )
}

// --- NEW SECTION 1: PROCESS TIMELINE ---
function ProcessTimeline() {
  const steps = [
    { title: "Discovery Phase", desc: "Analyzing operational bottlenecks and data architecture.", icon: <Activity /> },
    { title: "Neural Architecture", desc: "Designing custom AI agents and automation logic.", icon: <GitMerge /> },
    { title: "System Integration", desc: "Seamless deployment into existing ERP/CRM stacks.", icon: <TerminalSquare /> },
    { title: "Optimization Loop", desc: "Continuous learning and performance refinement.", icon: <CheckCircle2 /> },
  ];

  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative">
      <div className="mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">OPERATIONAL <span className="text-[#D4AF37]">PROTOCOL</span></h2>
        <div className="h-px w-24 bg-[#D4AF37]" />
      </div>

      <div className="grid md:grid-cols-2 gap-16 relative">
        <div className="sticky top-32 h-fit">
          <p className={`${interTight.className} text-xl text-gray-400 leading-relaxed`}>
            Our methodology is not linear; it is <span className="text-white">iterative and adaptive</span>. We dissect your business logic to reconstruct it with algorithmic precision.
          </p>
          <div className="mt-8 p-6 border border-white/5 bg-white/5 rounded-lg backdrop-blur-sm">
            <div className="flex items-center gap-3 text-[#D4AF37] mb-2 font-mono text-xs">
               <span className="animate-pulse">●</span> LIVE MONITORING
            </div>
            <div className="space-y-1 font-mono text-xs text-gray-500">
              <p>{'>'} Protocol_Start: True</p>
              <p>{'>'} Latency: 12ms</p>
              <p>{'>'} Security_Level: MAX</p>
            </div>
          </div>
        </div>

        <div className="space-y-0 relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.2 }}
              className="relative pl-16 pb-16 group"
            >
              <div className="absolute left-0 top-0 w-12 h-12 bg-[#0A0A0A] border border-white/10 rounded-full flex items-center justify-center z-10 group-hover:border-[#D4AF37] group-hover:text-[#D4AF37] transition-colors duration-500">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-200 group-hover:text-[#D4AF37] transition-colors mb-2">{step.title}</h3>
              <p className={`${interTight.className} text-gray-500`}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- NEW SECTION 2: SYSTEM METRICS ---
function SystemMetrics() {
  const metrics = [
    { label: "Lines of Automation", value: "2M+", desc: "Executed Code" },
    { label: "Process Efficiency", value: "99.9%", desc: "Uptime Guaranteed" },
    { label: "Client ROI", value: "300%", desc: "Average Increase" },
    { label: "Data Processed", value: "50TB", desc: "Securely Handled" },
  ];

  return (
    <section className="py-24 border-y border-white/5 bg-[#080808] relative overflow-hidden">
        {/* Background Grid Accent */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[24px_24px] opacity-20" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
          {metrics.map((metric, i) => (
            <div key={i} className="text-center md:text-left group">
              <h3 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tighter group-hover:text-[#D4AF37] transition-colors duration-300">
                {metric.value}
              </h3>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">{metric.label}</p>
              <p className="font-mono text-xs text-[#D4AF37]/60">{metric.desc}</p>
            </div>
          ))}
        </div>
    </section>
  );
}

function ProjectManifest() {
    return (
        <section className="py-32 bg-[#080808] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <h2 className="text-sm uppercase tracking-[0.4em] text-[#D4AF37] mb-12">Deployment Log</h2>
                
                <div className="flex flex-col">
                    {PROJECTS.map((project, i) => (
                        <ProjectRow key={i} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}

interface ProjectRowProps {
    project: Project;
    index: number;
}

function ProjectRow({ project, index }: ProjectRowProps) {
    return (
        <motion.a 
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex items-center justify-between py-10 border-b border-white/10 hover:border-[#D4AF37]/50 transition-colors cursor-pointer"
        >
            <div className="absolute inset-0 bg-[#D4AF37]/5 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-center -z-10" />
            
            <div className="flex items-baseline gap-8 md:gap-16">
                <span className="font-mono text-xs text-gray-600 group-hover:text-[#D4AF37]">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-3xl md:text-5xl font-bold text-gray-300 group-hover:text-white transition-colors">
                    {project.title}
                </h3>
            </div>

            <div className="flex items-center gap-8 md:gap-16">
                <div className="hidden md:flex flex-col items-end text-right">
                    <span className="text-xs uppercase tracking-widest text-[#D4AF37]">{project.tag}</span>
                    <span className="text-sm text-gray-500">{project.result}</span>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-300">
                    <ArrowUpRight className="text-gray-400 group-hover:text-black transition-colors" size={20} />
                </div>
            </div>
        </motion.a>
    )
}

// --- NEW SECTION 3: CLIENT TRANSMISSIONS (Testimonials) ---
function ClientTransmissions() {
  const testimonials = [
    { name: "Sarah J.", role: "CTO, FinTech Global", text: "Botmartz didn't just build a website; they architected a digital ecosystem that handles 50k requests/sec." },
    { name: "David K.", role: "Founder, Zenith AI", text: "The operational latency dropped by 40% within weeks of deployment. A masterclass in engineering." },
    { name: "Elena R.", role: "Director, Orbital Ops", text: "Their aesthetic is matched only by their code quality. Truly the future of digital agencies." },
  ];

  return (
    <section className="py-32 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-sm uppercase tracking-[0.4em] text-[#D4AF37] mb-16 text-center">Incoming Transmissions</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-[#0A0A0A] border border-white/5 p-8 rounded-xl hover:border-[#D4AF37]/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-6 opacity-50 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#D4AF37]">
                   <Fingerprint size={20} />
                </div>
                <div className="font-mono text-xs">
                  <p className="text-white">{t.name}</p>
                  <p className="text-gray-500">{t.role}</p>
                </div>
              </div>
              <p className={`${interTight.className} text-gray-400 leading-relaxed italic`}>"{t.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- NEW SECTION 4: NEURAL QUERY (FAQ) ---
function NeuralQuery() {
  const faqs = [
    { q: "What tech stack do you utilize?", a: "We operate on the bleeding edge: Next.js 14, Rust for computation, Python for AI agents, and WebGL for visualization." },
    { q: "Do you offer post-deployment support?", a: "Affirmative. We provide 24/7 system monitoring and iterative updates to ensure your infrastructure evolves." },
    { q: "Can you integrate with legacy systems?", a: "Our specialized 'Bridge' protocol allows us to wrap legacy mainframes in modern API layers without disrupting operations." },
    { q: "What is the typical development timeline?", a: "Timelines vary by complexity. Standard deployment ranges from 4-8 weeks for MVP, 3-6 months for enterprise architecture." }
  ];

  return (
    <section className="py-24 max-w-4xl mx-auto px-6 md:px-12">
       <h2 className="text-4xl font-bold mb-12 text-center">NEURAL <span className="text-[#D4AF37]">QUERY</span></h2>
       
       <div className="space-y-4">
         {faqs.map((faq, i) => (
           <FAQItem key={i} question={faq.q} answer={faq.a} />
         ))}
       </div>
    </section>
  );
}

interface FAQItemProps {
    question: string;
    answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/5 bg-white/5 rounded-lg overflow-hidden transition-all duration-300 hover:border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-medium text-lg text-gray-300">{question}</span>
        <ChevronDown 
          className={`text-[#D4AF37] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-gray-500 font-light border-t border-white/5">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- NEW SECTION 5: FINAL CTA ---
function FinalCTA() {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black">
       {/* Animated Background */}
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[#D4AF37]/10 via-black to-black opacity-50" />
       
       <div className="relative z-10 text-center px-6">
         <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
         >
           <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 mix-blend-difference text-white">
             READY TO <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] to-transparent">TRANSCEND?</span>
           </h2>
           
           <p className="max-w-xl mx-auto text-gray-500 mb-10 text-lg">
             The future doesn't wait for permission. Initialize your transformation today.
           </p>

           <div className="flex justify-center">
             <MagneticButton className="px-10 py-4 bg-white text-black font-bold tracking-widest uppercase rounded-full hover:bg-[#D4AF37] hover:scale-110 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                Begin Sequence
             </MagneticButton>
           </div>
         </motion.div>
       </div>
    </section>
  );
}

function FooterTerminal() {
  const [lines, setLines] = useState([
      "> SYSTEM STATUS: OPTIMAL",
      "> NEURAL NETWORKS: ACTIVE",
      "> READY FOR NEW PARAMETERS...",
  ]);

  return (
      <footer className="bg-black py-24 px-6 md:px-12 border-t border-white/10 font-mono text-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />
          
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
              <div>
                  <div className="h-48 bg-[#050505] border border-white/10 p-6 rounded-lg overflow-hidden relative shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)]">
                      <div className="absolute top-4 right-4 flex gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500/50" />
                          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                          <div className="w-2 h-2 rounded-full bg-green-500/50" />
                      </div>
                      <div className="space-y-2 text-[#D4AF37]/80 font-mono text-xs">
                          {lines.map((line, i) => (
                              <p key={i} className="typing-effect">{line}</p>
                          ))}
                          <span className="animate-pulse">_</span>
                      </div>
                  </div>
              </div>
              
              <div className="flex flex-col justify-between">
                  <div>
                      <h3 className="text-4xl md:text-6xl font-bold text-white mb-6">INITIATE <br/> PROTOCOL.</h3>
                      <a href="mailto:contact@botmartz.com" className="text-xl text-[#D4AF37] hover:text-white transition-colors flex items-center gap-2 group">
                          contact@botmartz.com
                          <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                      </a>
                  </div>
                  <div className="flex gap-8 mt-12 text-gray-500 text-xs tracking-widest uppercase">
                      <a href="#" className="hover:text-[#D4AF37] transition-colors">LinkedIn</a>
                      <a href="#" className="hover:text-[#D4AF37] transition-colors">Twitter</a>
                      <a href="#" className="hover:text-[#D4AF37] transition-colors">Instagram</a>
                  </div>
                  <p className="mt-8 text-[10px] text-gray-700">
                      © 2025 BOTMARTZ SOLUTIONS. ARCHITECTING THE FUTURE.
                  </p>
              </div>
          </div>
      </footer>
  );
}

// --- UTILITY COMPONENTS ---

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
}

function MagneticButton({ children, className }: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    const { x, y } = position;
    return (
        <motion.button
            style={{ x, y }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={className}
        >
            {children}
        </motion.button>
    );
}