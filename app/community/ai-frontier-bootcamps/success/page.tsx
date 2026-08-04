"use client";

import { CheckCircle2, Calendar, Download, Users, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-[#E2E8F0] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#0B1C2C] p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066FF]/20 blur-[80px] rounded-full pointer-events-none" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)] relative z-10"
            >
              <CheckCircle2 className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2 relative z-10">Registration Successful</h1>
            <p className="text-[#8A9EB0] font-medium relative z-10">
              Welcome to the Botmartz AI Engineering Community.
            </p>
          </div>

          {/* Checklist */}
          <div className="p-10">
            <h2 className="text-xl font-bold text-[#0B1C2C] mb-6">Your Next Steps</h2>
            
            <div className="space-y-4 mb-10">
              {[
                { icon: Mail, title: "Check your email", desc: "We've sent your receipt and confirmation details." },
                { icon: Calendar, title: "Add to Calendar", desc: "Download the .ics file to block your calendar." },
                { icon: Download, title: "Download Setup Guide", desc: "Prepare your local environment before Series 1." },
                { icon: Users, title: "Join the Community", desc: "Introduce yourself in our exclusive Discord." },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]"
                  >
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#0066FF] shadow-sm flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-[#0B1C2C]">{item.title}</h3>
                      <p className="text-sm text-[#64748B]">{item.desc}</p>
                    </div>
                    {idx > 0 && (
                      <button className="px-4 py-2 text-sm font-bold text-[#0066FF] hover:bg-[#EFF6FF] rounded-lg transition-colors">
                        Action
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-8 py-4 rounded-xl border border-[#E2E8F0] text-[#0B1C2C] font-bold hover:bg-[#F8FAFC] transition-all text-center"
              >
                Return Home
              </Link>
              <Link
                href="https://discord.gg/d7PmsQFx9"
                target="_blank"
                className="px-8 py-4 rounded-xl bg-[#0066FF] text-white font-bold hover:bg-[#0052CC] transition-all text-center flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(0,102,255,0.35)]"
              >
                Go to Community <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
