"use client";
import React from "react";
import { motion } from "framer-motion";
import { Inter_Tight } from 'next/font/google';

const inter = Inter_Tight({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' });

interface SectionWithMockupProps {
    title: React.ReactNode;
    description: React.ReactNode;
    primaryImageSrc: string; // The main card image
    secondaryImageSrc?: string; // Optional background element
    reverseLayout?: boolean;
}

const SectionWithMockup: React.FC<SectionWithMockupProps> = ({
    title,
    description,
    primaryImageSrc,
    secondaryImageSrc,
    reverseLayout = false,
}) => {
    
    return (
        <section className="relative py-24 md:py-32 bg-black overflow-hidden">
            <div className="container max-w-[1200px] px-6 mx-auto relative z-10">
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center ${reverseLayout ? 'direction-rtl' : ''}`}>
                    
                    {/* --- TEXT COLUMN --- */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`flex flex-col items-start gap-6 ${reverseLayout ? 'md:order-2' : 'md:order-1'}`}
                    >
                        <h2 className={`${inter.className} text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight text-white`}>
                            {title}
                        </h2>
                        <div className={`${inter.className} text-[#888888] text-lg md:text-xl leading-relaxed max-w-md`}>
                            {description}
                        </div>
                    </motion.div>

                    {/* --- MOCKUP COLUMN --- */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className={`relative w-full aspect-[4/5] md:aspect-square flex items-center justify-center ${reverseLayout ? 'md:order-1' : 'md:order-2'}`}
                    >
                        {/* Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#D4AF37]/20 via-white/5 to-transparent blur-3xl rounded-full opacity-40 pointer-events-none" />

                        {/* Optional Secondary Layer (Background Card) */}
                        {secondaryImageSrc && (
                            <motion.div 
                                className="absolute top-0 right-0 w-[85%] h-[85%] rounded-[32px] overflow-hidden opacity-40 blur-[1px] brightness-50 transform translate-x-8 -translate-y-8"
                                style={{ zIndex: 0 }}
                            >
                                <img src={secondaryImageSrc} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                            </motion.div>
                        )}

                        {/* Main Mockup Card */}
                        <div className="relative w-full h-full z-10 rounded-[32px] overflow-hidden shadow-2xl border border-[#D4AF37]/30 bg-[#0A0A0A]">
                            <img 
                                src={primaryImageSrc} 
                                alt="Feature Mockup" 
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            
                            {/* Inner Glass Shine */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
                        </div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SectionWithMockup;