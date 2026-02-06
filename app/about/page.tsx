"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue, 
  useVelocity,
  useAnimationFrame
} from "framer-motion";
import { 
  ArrowUpRight, Mail, Linkedin, Globe, 
  CheckCircle2, Award, BookOpen, Languages 
} from "lucide-react";

// --- FULL DATA FROM PDF ---
const FOUNDER = {
  name: "SOHAM SHARMA",
  role: "GENAI ARCHITECT",
  location: "INDORE, INDIA",
  image: "/Sohamsharma.jpeg",
  contact: {
    phone: "+91-9730084626",
    email: "sohamnsharma@gmail.com"
  },
  bio: "AI/ML professional with 11+ years of experience across enterprise training, AI product development, and cloud architecture. Delivered programs to 20+ corporate clients globally.",
  stats: [
    { label: "EXP", value: "11", suffix: "YR" },
    { label: "CLIENTS", value: "20", suffix: "+" },
    { label: "ACADEMIC", value: "15", suffix: "+" },
  ],
  // Full Tech Stack from PDF
  stack: {
    core: ["Python", "Django", "FastAPI", "Next.js", "React", "PostgreSQL", "MongoDB", "Redis"],
    ai: ["PyTorch", "TensorFlow", "OpenAI GPT-4", "Gemini", "LangChain", "RAG", "Agentic AI"],
    cloud: ["AWS SageMaker", "Azure AI", "GCP Vertex", "Docker", "Kubernetes", "Terraform"],
    ops: ["MLflow", "CI/CD", "Grafana", "Prometheus", "GitLab"]
  },
  // All 5 Roles from PDF
  experience: [
    {
      company: "INTELLIPAAS",
      role: "AI Product Manager | Architect",
      year: "2025 - PRES",
      desc: "Owning end-to-end AI product lifecycle. Architecting scalable RAG systems, agentic workflows, and cloud-native AI deployment across AWS/Azure."
    },
    {
      company: "BOTMARTZ",
      role: "Corporate GenAI Trainer",
      year: "2024 - PRES",
      desc: "Delivered 20+ corporate trainings. Designed hands-on modules for LLMs, Prompt Engineering, and Cloud AI with 95% satisfaction rate."
    },
    {
      company: "ZIPLYNE",
      role: "GTM & Training Lead",
      year: "2021 - 2024",
      desc: "Led product strategy and AI integration. Drove 25% higher retention and 40% growth in new customer acquisition."
    },
    {
      company: "POWERWEAVE",
      role: "Tech Support Specialist",
      year: "2020 - 2021",
      desc: "Reduced onboarding time by 30% and improved user adoption by 25% through customized implementation plans."
    },
    {
      company: "GENESYS INT.",
      role: "GIS Trainer & QA",
      year: "2017 - 2019",
      desc: "Spearheaded GIS training programs improving productivity by 25%. Led cross-functional teams in data digitization."
    }
  ],
  // Education & Certs
  education: [
    "PG Diploma Applied Statistics - IGNOU (2024)",
    "Bachelors Aircraft Maintenance - Singhania Univ (2016)"
  ],
  certs: [
    "AWS Solutions Architect", "Six Sigma Green Belt", "MongoDB Python Dev", 
    "PowerBI + Tableau", "PostgreSQL Bootcamp", "Python Data Science"
  ],
  languages: ["English", "Hindi", "Gujarati", "French"]
};

// --- COMPONENTS ---

// 1. 3D TILT CARD
const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full aspect-[3/4] md:aspect-[4/5]"
    >
      <div 
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="absolute inset-4 md:inset-0 rounded-xl bg-black border border-white/10 shadow-[0_0_50px_-10px_rgba(212,175,55,0.3)] overflow-hidden"
      >
        {children}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none mix-blend-overlay" />
      </div>
    </motion.div>
  );
};

// 2. VELOCITY SCROLL TEXT
function ParallaxText({ children, baseVelocity = 100 }: { children: string; baseVelocity: number }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${(v % 100)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex flex-nowrap overflow-hidden whitespace-nowrap select-none opacity-30">
      <motion.div className="flex text-[8rem] md:text-[12rem] font-black uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent" style={{ x }}>
        <span className="mr-8">{children}</span>
        <span className="mr-8">{children}</span>
        <span className="mr-8">{children}</span>
        <span className="mr-8">{children}</span>
      </motion.div>
    </div>
  );
}

// 3. EXPERIENCE ROW
const ExperienceRow = ({ item, index }: { item: any, index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative border-t border-white/10 py-12 md:py-16 hover:bg-white/5 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
         <div className="md:col-span-2">
            <span className="font-mono text-[#D4AF37] text-sm border border-[#D4AF37]/30 px-2 py-1 rounded">
               {item.year}
            </span>
         </div>
         <div className="md:col-span-4">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-2 group-hover:translate-x-4 transition-transform duration-300">
               {item.company}
            </h3>
            <p className="text-gray-400 font-mono text-xs tracking-widest uppercase">{item.role}</p>
         </div>
         <div className="md:col-span-5 text-gray-400 font-light leading-relaxed text-sm">
            {item.desc}
         </div>
         <div className="md:col-span-1 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight className="text-[#D4AF37] w-8 h-8" />
         </div>
      </div>
    </motion.div>
  )
}

// --- MAIN PAGE ---
export default function FounderPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative mt-20 min-h-screen flex flex-col items-center justify-center pt-24 md:pt-0 perspective-[2000px]">
         <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
            <div className="w-[600px] h-[600px] bg-[#D4AF37] rounded-full blur-[200px]" />
         </div>
         
         <div className="relative z-10 w-full max-w-7xl px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Text */}
            <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col gap-10">
               <motion.div 
                 initial={{ opacity: 0, y: 100 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8 }}
               >
                  <div className="flex items-center gap-3 mb-6">
                     <span className="w-2 h-2 bg-[#D4AF37] animate-pulse" />
                     <span className="font-mono text-xs tracking-[0.3em] text-[#D4AF37]">SYSTEM_V4.0</span>
                  </div>
                  <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-8 mix-blend-difference">
                     SOHAM<br/>SHARMA<span className="text-[#D4AF37]">.</span>
                  </h1>
                  <p className="max-w-xl text-xl text-gray-400 font-light leading-relaxed border-l-2 border-[#D4AF37] pl-6">
                     {FOUNDER.bio}
                  </p>
               </motion.div>

               <div className="flex gap-12 border-t border-white/10 pt-8">
                  {FOUNDER.stats.map((stat, i) => (
                     <div key={i}>
                        <h4 className="text-3xl font-bold">{stat.value}<span className="text-[#D4AF37] text-sm align-top">{stat.suffix}</span></h4>
                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{stat.label}</p>
                     </div>
                  ))}
               </div>
            </div>

            {/* Right: 3D Image */}
            <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center perspective-[1000px]">
               <TiltCard>
                  <Image 
                     src={FOUNDER.image} 
                     alt={FOUNDER.name}
                     fill
                     className="object-cover"
                     priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/50 to-transparent">
                     <p className="font-mono text-[#D4AF37] text-xs mb-1">ROLE</p>
                     <p className="text-2xl font-bold uppercase">{FOUNDER.role}</p>
                  </div>
               </TiltCard>
            </div>
         </div>
      </section>

      {/* 2. CREDENTIALS TICKER */}
      <section className="py-12 border-y border-white/5 bg-[#080808] overflow-hidden">
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
             {[...FOUNDER.certs, ...FOUNDER.education, ...FOUNDER.certs].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-gray-500 font-mono text-sm uppercase">
                   <Award className="text-[#D4AF37] w-4 h-4" />
                   {item}
                </div>
             ))}
          </div>
      </section>

      {/* 3. EXPERIENCE LIST */}
      <section className="py-20 bg-[#050505]">
         <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase opacity-20">Trajectory</h2>
         </div>
         <div>
            {FOUNDER.experience.map((item, i) => (
               <ExperienceRow key={i} item={item} index={i} />
            ))}
         </div>
      </section>

      {/* 4. TECH ARSENAL GRID */}
      <section className="py-20 border-t border-white/10 bg-[#080808]">
         <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="text-4xl font-black text-white mb-12 flex items-center gap-4">
               <span className="text-[#D4AF37]">///</span> TECH ARSENAL
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               
               {/* Stack Column 1 */}
               <div className="space-y-4">
                  <h3 className="text-[#D4AF37] font-mono text-sm uppercase tracking-widest border-b border-[#D4AF37]/20 pb-2">AI / GenAI</h3>
                  <ul className="space-y-2">
                     {FOUNDER.stack.ai.map((t, i) => <li key={i} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full"/>{t}</li>)}
                  </ul>
               </div>
               
               {/* Stack Column 2 */}
               <div className="space-y-4">
                  <h3 className="text-[#D4AF37] font-mono text-sm uppercase tracking-widest border-b border-[#D4AF37]/20 pb-2">Core Eng</h3>
                  <ul className="space-y-2">
                     {FOUNDER.stack.core.map((t, i) => <li key={i} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full"/>{t}</li>)}
                  </ul>
               </div>

               {/* Stack Column 3 */}
               <div className="space-y-4">
                  <h3 className="text-[#D4AF37] font-mono text-sm uppercase tracking-widest border-b border-[#D4AF37]/20 pb-2">Cloud Infra</h3>
                  <ul className="space-y-2">
                     {FOUNDER.stack.cloud.map((t, i) => <li key={i} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full"/>{t}</li>)}
                  </ul>
               </div>

               {/* Stack Column 4: Languages & Contact */}
               <div className="space-y-8">
                  <div className="space-y-4">
                     <h3 className="text-[#D4AF37] font-mono text-sm uppercase tracking-widest border-b border-[#D4AF37]/20 pb-2">Languages</h3>
                     <div className="flex flex-wrap gap-2">
                        {FOUNDER.languages.map((l, i) => <span key={i} className="px-2 py-1 bg-white/5 text-xs text-gray-300 rounded">{l}</span>)}
                     </div>
                  </div>
                  <div className="space-y-4">
                     <h3 className="text-[#D4AF37] font-mono text-sm uppercase tracking-widest border-b border-[#D4AF37]/20 pb-2">Contact</h3>
                     <p className="text-gray-400 text-sm">{FOUNDER.contact.email}</p>
                     <p className="text-gray-400 text-sm">{FOUNDER.contact.phone}</p>
                  </div>
               </div>
               
            </div>
         </div>
      </section>

      {/* 5. FOOTER */}
      <section className="h-[60vh] flex flex-col justify-center items-center bg-[#D4AF37] text-black text-center px-4 relative overflow-hidden group">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-multiply" />
         
         <div className="relative z-10 scale-90 group-hover:scale-100 transition-transform duration-700">
            <h2 className="text-[10vw] font-black leading-none mb-8 tracking-tighter">
               LET'S BUILD<br/>THE FUTURE.
            </h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
               <a href={`mailto:${FOUNDER.contact.email}`} className="px-8 py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Book Strategy Call
               </a>
               <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 border border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                     <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 border border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                     <Globe className="w-5 h-5" />
                  </a>
               </div>
            </div>
         </div>
      </section>

    </main>
  );
}