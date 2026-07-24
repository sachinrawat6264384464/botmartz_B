"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Clock, Award, ChevronRight, Trophy, ArrowRight } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const QUESTIONS = [
  {
    question: "What does AI stand for?",
    options: ["Artificial Intelligence", "Automated Interface", "Analog Integration", "Applied Internet"],
    correct: 0
  },
  {
    question: "Which organization developed the ChatGPT model?",
    options: ["Google", "Meta", "OpenAI", "Microsoft"],
    correct: 2
  },
  {
    question: "What is the process of feeding data to an AI model so it can learn called?",
    options: ["Inference", "Training", "Deploying", "Compiling"],
    correct: 1
  },
  {
    question: "What does LLM stand for in the context of AI?",
    options: ["Local Language Model", "Large Logic Machine", "Low Latency Module", "Large Language Model"],
    correct: 3
  },
  {
    question: "Which AI concept is directly inspired by the structure of the human brain?",
    options: ["Decision Trees", "Neural Networks", "Support Vector Machines", "K-Means Clustering"],
    correct: 1
  }
];

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState<'intro' | 'playing' | 'finished'>('intro');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [timeTaken, setTimeTaken] = useState<number>(0);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const startQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setStep('playing');
    setStartTime(Date.now());
  };

  const handleAnswer = (optionIndex: number) => {
    if (optionIndex === QUESTIONS[currentQ].correct) {
      setScore(s => s + 1);
    }
    
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(c => c + 1);
    } else {
      finishQuiz(score + (optionIndex === QUESTIONS[currentQ].correct ? 1 : 0));
    }
  };

  const finishQuiz = async (finalScore: number) => {
    const time = (Date.now() - startTime) / 1000; // in seconds
    setTimeTaken(time);
    setStep('finished');
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, 'quiz-scores'), {
        name,
        email,
        score: finalScore,
        totalQuestions: QUESTIONS.length,
        timeTaken: time,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Error saving score:", err);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-brand/20 rounded-full flex items-center justify-center border border-brand/30">
                <Brain className="w-8 h-8 text-brand" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center mb-2">Botmartz AI Challenge</h1>
            <p className="text-gray-400 text-center mb-8">Test your AI knowledge and climb the leaderboard!</p>
            
            <form onSubmit={startQuiz} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand/50 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand/50 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-brand hover:bg-brand/90 text-black font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors mt-6"
              >
                Start Quiz <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}

        {step === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full max-w-2xl bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md"
          >
            <div className="flex justify-between items-center mb-8 text-gray-400 text-sm font-medium">
              <span>Question {currentQ + 1} of {QUESTIONS.length}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Time is ticking!</span>
            </div>
            
            <h2 className="text-2xl font-bold mb-8">{QUESTIONS[currentQ].question}</h2>
            
            <div className="space-y-3">
              {QUESTIONS[currentQ].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="w-full text-left p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between group"
                >
                  <span className="text-lg">{opt}</span>
                  <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-brand" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'finished' && (
          <motion.div
            key="finished"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-500/30">
                <Trophy className="w-10 h-10 text-yellow-500" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-gray-400 mb-8">You scored {score} out of {QUESTIONS.length}</p>
            
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-1">Score</p>
                <p className="text-2xl font-bold text-brand">{Math.round((score/QUESTIONS.length)*100)}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-1">Time</p>
                <p className="text-2xl font-bold text-white">{timeTaken.toFixed(1)}s</p>
              </div>
            </div>

            <button
              onClick={() => router.push('/quiz/leaderboard')}
              disabled={isSubmitting}
              className="w-full bg-white text-black hover:bg-gray-200 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving score...' : 'View Leaderboard'} <Award className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
