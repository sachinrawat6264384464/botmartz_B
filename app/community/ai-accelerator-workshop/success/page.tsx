"use client";

import { useEffect, useState, Suspense } from "react";
import { CheckCircle2, Calendar, Download, Users, Mail, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function SuccessContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  
  const [bootcamp, setBootcamp] = useState<any>(null);
  const [calendarData, setCalendarData] = useState<{ googleUrl: string, icsContent: string } | null>(null);

  useEffect(() => {
    const fetchBootcamp = async () => {
      if (plan && plan !== "bundle") {
        try {
          const q = query(collection(db, "bootcamps"), where("slug", "==", plan));
          const snapshot = await getDocs(q);
          if (!snapshot.empty) {
            setBootcamp(snapshot.docs[0].data());
          }
        } catch (e) {
          console.error("Error fetching bootcamp:", e);
        }
      } else if (plan === "bundle") {
        setBootcamp({
          title: "AI Engineering Pass (Bundle)",
          shortDescription: "Full access to the AI Frontier Bootcamp Series.",
          format: "Live Online",
          date: "9 August 2026",
          time: "10:00 AM - 1:00 PM"
        });
      }
    };
    fetchBootcamp();
  }, [plan]);

  useEffect(() => {
    if (bootcamp) {
      const title = bootcamp.title || 'Botmartz Bootcamp';
      const desc = bootcamp.shortDescription || '';
      const loc = bootcamp.format || 'Live Online';
      
      let startDate = new Date();
      let endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000);
      
      try {
        if (bootcamp.date) {
          const cleanDate = bootcamp.date.replace(/\(.*\)/, '').trim(); 
          const parsedDate = new Date(cleanDate);
          if (!isNaN(parsedDate.getTime())) {
            startDate = parsedDate;
            endDate = new Date(parsedDate);
          }
        }
        
        if (bootcamp.time) {
          const timeParts = bootcamp.time.split('-'); 
          const parseTimeStr = (tStr: string, dateObj: Date) => {
            const match = tStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
            if (match) {
              let hours = parseInt(match[1]);
              const mins = parseInt(match[2]);
              const ampm = match[3].toUpperCase();
              if (ampm === 'PM' && hours < 12) hours += 12;
              if (ampm === 'AM' && hours === 12) hours = 0;
              dateObj.setHours(hours, mins, 0);
            }
          };
          if (timeParts.length >= 1) parseTimeStr(timeParts[0], startDate);
          if (timeParts.length >= 2) parseTimeStr(timeParts[1], endDate);
          else endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000);
        }
      } catch (e) {
        console.warn("Date parsing failed", e);
      }

      const formatICSDate = (date: Date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      };

      const icsDateStart = formatICSDate(startDate);
      const icsDateEnd = formatICSDate(endDate);

      const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${icsDateStart}/${icsDateEnd}&details=${encodeURIComponent(desc)}&location=${encodeURIComponent(loc)}`;

      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Botmartz//AI Engineering Bootcamp//EN',
        'BEGIN:VEVENT',
        `DTSTART:${icsDateStart}`,
        `DTEND:${icsDateEnd}`,
        `SUMMARY:${title}`,
        `DESCRIPTION:${desc}`,
        `LOCATION:${loc}`,
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\n');

      setCalendarData({ googleUrl, icsContent });
    }
  }, [bootcamp]);

  const downloadICS = () => {
    if (!calendarData) return;
    const blob = new Blob([calendarData.icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'bootcamp-event.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#0066FF] shadow-sm flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#0B1C2C]">Check your email</h3>
                  <p className="text-sm text-[#64748B]">We've sent your receipt and confirmation details.</p>
                </div>
              </motion.div>

              {/* Add to Calendar */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#0066FF] shadow-sm flex-shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0B1C2C]">Add to Calendar</h3>
                    <p className="text-sm text-[#64748B]">Block your calendar so you don't miss the session.</p>
                  </div>
                </div>
                {calendarData && (
                  <div className="flex items-center gap-2 mt-3 sm:mt-0 ml-16 sm:ml-0">
                    <a 
                      href={calendarData.googleUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="px-4 py-2 text-sm font-bold bg-white border border-[#E2E8F0] text-[#0B1C2C] hover:bg-[#F1F5F9] rounded-lg transition-colors shadow-sm"
                    >
                      Google Calendar
                    </a>
                    <button 
                      onClick={downloadICS}
                      className="px-4 py-2 text-sm font-bold text-[#0066FF] bg-[#EFF6FF] hover:bg-[#DBEAFE] rounded-lg transition-colors shadow-sm"
                    >
                      Apple / Outlook (.ics)
                    </button>
                  </div>
                )}
              </motion.div>

              {/* Join Community */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#0066FF] shadow-sm flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#0B1C2C]">Join the Community</h3>
                  <p className="text-sm text-[#64748B]">Introduce yourself in our exclusive Discord.</p>
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-8 py-4 rounded-xl border border-[#E2E8F0] text-[#0B1C2C] font-bold hover:bg-[#F8FAFC] transition-all text-center"
              >
                Return Home
              </Link>
              <Link
                href="https://discord.gg/QfxuHQAZz"
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

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]"><Loader2 className="w-8 h-8 animate-spin text-[#0066FF]" /></div>}>
      <SuccessContent />
    </Suspense>
  );
}
