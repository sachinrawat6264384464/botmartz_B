"use client";

import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Trophy, Clock, Brain, ArrowLeft, Medal, Sparkles, Target, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface QuizScore {
  id: string;
  name: string;
  score: number;
  totalQuestions: number;
  timeTaken: number;
  createdAt: any;
}

export default function LeaderboardPage() {
  const [scores, setScores] = useState<QuizScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const q = query(
          collection(db, 'quiz-scores'),
          orderBy('score', 'desc'),
          limit(50)
        );
        const snapshot = await getDocs(q);
        const fetchedScores = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as QuizScore[];
        
        // Deduplicate by email so only 1 best score per participant appears
        const uniqueByEmail = new Map<string, QuizScore>();
        fetchedScores.forEach((s) => {
          const emailKey = (s as any).email ? (s as any).email.trim().toLowerCase() : s.name.trim().toLowerCase();
          if (!uniqueByEmail.has(emailKey)) {
            uniqueByEmail.set(emailKey, s);
          } else {
            const existing = uniqueByEmail.get(emailKey)!;
            if (s.score > existing.score || (s.score === existing.score && s.timeTaken < existing.timeTaken)) {
              uniqueByEmail.set(emailKey, s);
            }
          }
        });

        const deduplicated = Array.from(uniqueByEmail.values());

        // Tie-breaker: If score is same, lower timeTaken wins
        deduplicated.sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return a.timeTaken - b.timeTaken;
        });

        setScores(deduplicated.slice(0, 50)); // top 50
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  // Framer motion variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-24 font-sans relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-brand/10 to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header Banner */}
      <div className="w-full bg-white border-b border-gray-200 shadow-sm relative z-10 pt-8 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/quiz" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand font-medium mb-8 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Challenge
          </Link>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/30 transform -rotate-6">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-2 flex items-center gap-2">
                  Top AI Minds <Sparkles className="w-6 h-6 text-brand" />
                </h1>
                <p className="text-gray-500 text-lg">The smartest challengers on the global leaderboard.</p>
              </div>
            </div>
            
            <Link href="/quiz" className="shrink-0 bg-gray-900 hover:bg-gray-800 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
              Play Now <Zap className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Leaderboard Content */}
      <div className="max-w-4xl mx-auto px-4 mt-12 relative z-10">
        {loading ? (
          <div className="bg-white border border-gray-200 rounded-3xl p-16 shadow-xl flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium animate-pulse">Calculating rankings...</p>
          </div>
        ) : scores.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-3xl p-16 shadow-xl flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-2">
              <Target className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">No Challengers Yet</h3>
            <p className="text-gray-500 max-w-md">The leaderboard is empty. Be the first to take the AI Challenge and secure the #1 spot!</p>
            <Link href="/quiz" className="mt-6 px-8 py-3 bg-brand text-black font-semibold rounded-xl hover:bg-brand/90 transition-all shadow-lg hover:shadow-brand/20">
              Start Challenge
            </Link>
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-3"
          >
            {/* Top 3 Header Row (optional) */}
            <div className="hidden md:grid grid-cols-[80px_1fr_120px_120px] gap-4 px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
              <div className="text-center">Rank</div>
              <div>Player</div>
              <div className="text-center">Accuracy</div>
              <div className="text-right">Time</div>
            </div>

            {scores.map((s, idx) => {
              const isTop1 = idx === 0;
              const isTop2 = idx === 1;
              const isTop3 = idx === 2;
              const isTop3Any = isTop1 || isTop2 || isTop3;

              return (
                <motion.div 
                  key={s.id} 
                  variants={item}
                  className={`relative overflow-hidden group flex flex-col md:grid md:grid-cols-[80px_1fr_120px_120px] gap-4 items-center p-4 md:p-5 rounded-2xl transition-all duration-300 ${
                    isTop1 ? 'bg-gradient-to-r from-yellow-50 to-white border-2 border-yellow-400 shadow-xl shadow-yellow-500/10 scale-[1.02] z-30' :
                    isTop2 ? 'bg-gradient-to-r from-slate-50 to-white border-2 border-slate-300 shadow-lg scale-[1.01] z-20' :
                    isTop3 ? 'bg-gradient-to-r from-orange-50 to-white border-2 border-orange-300 shadow-lg scale-[1.01] z-10' :
                    'bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200'
                  }`}
                >
                  {/* Rank Badge */}
                  <div className="w-full md:w-auto flex justify-center md:block">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mx-auto ${
                      isTop1 ? 'bg-yellow-400 text-white shadow-lg shadow-yellow-400/40' :
                      isTop2 ? 'bg-slate-300 text-slate-700 shadow-md' :
                      isTop3 ? 'bg-orange-300 text-orange-800 shadow-md' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {isTop1 ? <Medal className="w-5 h-5" /> : idx + 1}
                    </div>
                  </div>

                  {/* Player Info */}
                  <div className="w-full text-center md:text-left">
                    <div className={`font-bold text-xl ${isTop1 ? 'text-yellow-700' : isTop2 ? 'text-slate-700' : isTop3 ? 'text-orange-700' : 'text-gray-800'}`}>
                      {s.name}
                    </div>
                    {isTop3Any && (
                      <div className="text-xs font-semibold uppercase tracking-wider opacity-70 mt-0.5">
                        {isTop1 ? 'Grandmaster' : isTop2 ? 'Master' : 'Expert'}
                      </div>
                    )}
                  </div>

                  {/* Score / Accuracy */}
                  <div className="w-full md:w-auto flex justify-center md:block">
                    <div className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sm border ${
                      isTop1 ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                      isTop2 ? 'bg-slate-100 text-slate-800 border-slate-200' :
                      isTop3 ? 'bg-orange-100 text-orange-800 border-orange-200' :
                      'bg-brand/10 text-brand border-brand/20'
                    }`}>
                      <Brain className="w-4 h-4 opacity-70" />
                      {s.score} / {s.totalQuestions}
                    </div>
                  </div>

                  {/* Time */}
                  <div className="w-full md:w-auto flex justify-center md:justify-end text-gray-500 font-mono text-sm">
                    <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 group-hover:bg-white transition-colors">
                      <Clock className="w-4 h-4 opacity-50" /> {s.timeTaken.toFixed(1)}s
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
