"use client";

import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Trophy, Clock, Brain, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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
          limit(10)
        );
        const snapshot = await getDocs(q);
        const fetchedScores = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as QuizScore[];
        
        // Sorting in client to avoid needing a composite index in Firestore right away.
        // We order by score in DB, then tie-break by time taken.
        fetchedScores.sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return a.timeTaken - b.timeTaken;
        });

        setScores(fetchedScores);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 py-12 md:py-24 flex justify-center">
      <div className="w-full max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/quiz" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Quiz
            </Link>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <Trophy className="w-10 h-10 text-yellow-500" />
              Top AI Minds
            </h1>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
          {loading ? (
            <div className="p-12 text-center text-gray-400 flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
              Loading scores...
            </div>
          ) : scores.length === 0 ? (
            <div className="p-12 text-center text-gray-400 flex flex-col items-center gap-4">
              <Brain className="w-12 h-12 opacity-50" />
              <p>No scores yet. Be the first to take the challenge!</p>
              <Link href="/quiz" className="mt-4 px-6 py-2 bg-brand text-black font-semibold rounded-lg hover:bg-brand/90 transition-colors">
                Start Quiz
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
                    <th className="px-6 py-4 font-semibold">Rank</th>
                    <th className="px-6 py-4 font-semibold">Player</th>
                    <th className="px-6 py-4 font-semibold text-center">Score</th>
                    <th className="px-6 py-4 font-semibold text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {scores.map((s, idx) => (
                    <tr key={s.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 font-bold text-sm">
                          {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-lg">{s.name}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 text-brand font-bold text-sm border border-brand/20">
                          {s.score} / {s.totalQuestions}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-400 font-mono flex items-center justify-end gap-1.5">
                        <Clock className="w-4 h-4 opacity-50" /> {s.timeTaken.toFixed(1)}s
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
