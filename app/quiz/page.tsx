"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Clock, Award, ChevronRight, Trophy, ArrowRight, Zap, Target, Database, Network, Code, Layers } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';

const QUESTIONS = [
  {
    question: "In Transformer architectures, what is the primary role of Positional Encoding?",
    options: ["To prevent overfitting in deep layers", "To inject information about the relative or absolute position of tokens", "To normalize the input embeddings", "To calculate the attention weights"],
    correct: 1,
    icon: <Layers className="w-8 h-8 text-brand" />
  },
  {
    question: "Which activation function is most commonly used to mitigate the vanishing gradient problem in deep neural networks?",
    options: ["Sigmoid", "Tanh", "ReLU", "Softmax"],
    correct: 2,
    icon: <Network className="w-8 h-8 text-blue-500" />
  },
  {
    question: "What is 'Mode Collapse' in the context of Generative Adversarial Networks (GANs)?",
    options: ["When the generator produces the exact same output or a small set of outputs", "When the discriminator becomes too accurate too quickly", "When the loss function diverges to infinity", "When the latent space dimensionality is too small"],
    correct: 0,
    icon: <Database className="w-8 h-8 text-purple-500" />
  },
  {
    question: "Which of the following optimization algorithms adapts the learning rate for each parameter individually?",
    options: ["Stochastic Gradient Descent (SGD)", "Adam", "Momentum", "Mini-batch Gradient Descent"],
    correct: 1,
    icon: <Zap className="w-8 h-8 text-yellow-500" />
  },
  {
    question: "In Reinforcement Learning, what describes the 'Exploration vs. Exploitation' dilemma?",
    options: ["Choosing between exploring new environments and exploiting existing computational resources", "Choosing between trying new, untested actions and leveraging known actions that yield high rewards", "Choosing between deepening a neural network or widening it", "Choosing between supervised and unsupervised learning techniques"],
    correct: 1,
    icon: <Target className="w-8 h-8 text-red-500" />
  },
  {
    question: "What is the primary difference between L1 (Lasso) and L2 (Ridge) regularization?",
    options: ["L1 adds a squared magnitude penalty, L2 adds an absolute value penalty", "L1 can shrink coefficients to exactly zero, performing feature selection", "L2 is only used for classification, L1 for regression", "L1 prevents exploding gradients, L2 prevents vanishing gradients"],
    correct: 1,
    icon: <Code className="w-8 h-8 text-green-500" />
  },
  {
    question: "Which evaluation metric is generally preferred for a classifier on a highly imbalanced dataset?",
    options: ["Accuracy", "Mean Squared Error", "F1 Score", "Log-Loss"],
    correct: 2,
    icon: <Brain className="w-8 h-8 text-indigo-500" />
  },
  {
    question: "In Natural Language Processing, what does TF-IDF stand for?",
    options: ["Term Frequency-Inverse Document Frequency", "Text Formatting-Internal Document Features", "Token Frequency-Index Document Format", "True False-Inverse Data Function"],
    correct: 0,
    icon: <Layers className="w-8 h-8 text-pink-500" />
  },
  {
    question: "Which specific attention mechanism was introduced in the seminal paper 'Attention Is All You Need'?",
    options: ["Bahdanau Attention", "Luong Attention", "Scaled Dot-Product Attention", "Additive Attention"],
    correct: 2,
    icon: <Network className="w-8 h-8 text-teal-500" />
  },
  {
    question: "What specific problem does 'Dropout' primarily address during the training of Neural Networks?",
    options: ["Data leakage", "Vanishing gradients", "Overfitting", "Slow convergence rate"],
    correct: 2,
    icon: <Zap className="w-8 h-8 text-orange-500" />
  },
  {
    question: "What is a key architectural advantage of an LSTM over a standard Recurrent Neural Network (RNN)?",
    options: ["LSTMs do not use backpropagation", "LSTMs process entire sequences in parallel without temporal dependencies", "LSTMs mitigate the vanishing gradient problem for long sequences", "LSTMs require significantly fewer parameters"],
    correct: 2,
    icon: <Target className="w-8 h-8 text-cyan-500" />
  },
  {
    question: "In the context of Large Language Models, what exactly is 'Few-Shot Prompting'?",
    options: ["Training the model on only a few megabytes of data", "Providing the model with a few examples of the desired task within the input prompt", "Running the model inference for only a few epochs", "Using a model with a very small parameter count"],
    correct: 1,
    icon: <Brain className="w-8 h-8 text-emerald-500" />
  },
  {
    question: "Which loss function is the standard choice for training a multi-class classification model?",
    options: ["Mean Absolute Error", "Binary Cross-Entropy", "Categorical Cross-Entropy", "Huber Loss"],
    correct: 2,
    icon: <Database className="w-8 h-8 text-rose-500" />
  },
  {
    question: "What technique does 'RAG' refer to in modern generative AI architectures?",
    options: ["Random Augmented Generation", "Retrieval-Augmented Generation", "Recursive Algorithmic Graphs", "Restricted Access Gateways"],
    correct: 1,
    icon: <Code className="w-8 h-8 text-amber-500" />
  },
  {
    question: "Which metric measures the discrepancy between two probability distributions in machine learning?",
    options: ["Cosine Similarity", "Kullback-Leibler (KL) Divergence", "Euclidean Distance", "Jaccard Index"],
    correct: 1,
    icon: <Layers className="w-8 h-8 text-violet-500" />
  }
];

const TIME_LIMIT = 120; // 2 minutes in seconds

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState<'intro' | 'playing' | 'finished'>('intro');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailError, setEmailError] = useState('');
  
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Using ref to get latest score/currentQ in handleTimeOut without stale state
  const scoreRef = useRef(score);
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  // Timer effect
  useEffect(() => {
    if (step === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  // Watch for timer reaching 0 to auto-submit
  useEffect(() => {
    if (step === 'playing' && timeLeft === 0) {
      handleTimeOut();
    }
  }, [timeLeft, step]);

  const handleTimeOut = () => {
    finishQuiz(scoreRef.current, TIME_LIMIT);
  };

  const startQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setCheckingEmail(true);
    setEmailError('');

    const cleanEmail = email.trim().toLowerCase();

    try {
      // Check duplicate email via server API or client query
      const res = await fetch('/api/quiz/leaderboard');
      const data = await res.json();
      if (data.scores) {
        const alreadySubmitted = data.scores.some((s: any) => (s.email || '').toLowerCase() === cleanEmail);
        if (alreadySubmitted) {
          setEmailError('You have already completed the AI Challenge! Only 1 entry per email address is allowed.');
          setCheckingEmail(false);
          return;
        }
      }
    } catch (err) {
      console.error('Error checking existing email:', err);
    }

    setCheckingEmail(false);
    setScore(0);
    scoreRef.current = 0;
    setCurrentQ(0);
    setStep('playing');
    setStartTime(Date.now());
  };

  const handleAnswer = (optionIndex: number) => {
    const isCorrect = optionIndex === QUESTIONS[currentQ].correct;
    const updatedScore = isCorrect ? score + 1 : score;
    setScore(updatedScore);
    scoreRef.current = updatedScore;
    
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(c => c + 1);
    } else {
      const time = (Date.now() - startTime) / 1000;
      finishQuiz(updatedScore, time);
    }
  };

  const finishQuiz = async (finalScore: number, timeSpent: number) => {
    setTimeTaken(timeSpent);
    setStep('finished');
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          score: finalScore,
          totalQuestions: QUESTIONS.length,
          timeTaken: timeSpent
        }),
      });

      const resData = await res.json();
      if (!res.ok) {
        console.warn("Quiz submission notice:", resData.error);
      }
    } catch (err) {
      console.error("Error saving score:", err);
    }
    
    setIsSubmitting(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-xl bg-white border border-gray-200 p-8 rounded-2xl shadow-2xl relative z-10"
          >
            {/* Header Image */}
            <div className="w-full h-48 rounded-xl bg-gray-200 mb-8 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000" 
                alt="AI Brain" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <h1 className="text-3xl font-bold text-white">Botmartz AI Challenge</h1>
              </div>
            </div>
            
            <p className="text-gray-500 text-center mb-6">
              15 tough questions. 2 minutes. Prove your AI engineering mastery and climb the global leaderboard.
            </p>

            {emailError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs sm:text-sm space-y-2">
                <p className="font-bold flex items-center gap-1.5">
                  <span className="text-base">⚠️</span> Duplicate Attempt Detected
                </p>
                <p>{emailError}</p>
                <button
                  type="button"
                  onClick={() => router.push('/quiz/leaderboard')}
                  className="mt-2 text-xs font-bold text-[#0066FF] hover:underline block"
                >
                  View Leaderboard Rankings →
                </button>
              </div>
            )}
            
            <form onSubmit={startQuiz} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-brand focus:bg-white transition-colors shadow-sm"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-brand focus:bg-white transition-colors shadow-sm"
                  placeholder="john@example.com"
                />
              </div>
              <button 
                type="submit"
                disabled={checkingEmail}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl mt-6 group disabled:opacity-50"
              >
                {checkingEmail ? (
                  <>Checking Eligibility...</>
                ) : (
                  <>
                    Start Challenge <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
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
            className="w-full max-w-3xl bg-white border border-gray-200 p-6 md:p-10 rounded-3xl shadow-2xl relative z-10"
          >
            {/* Timer & Progress */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="font-bold text-gray-700">{currentQ + 1}/{QUESTIONS.length}</span>
                </div>
                <div className="h-2 w-32 md:w-48 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand transition-all duration-300"
                    style={{ width: `${((currentQ) / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className={`flex items-center gap-2 font-mono text-lg font-bold px-4 py-2 rounded-xl ${timeLeft < 30 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-700'}`}>
                <Clock className="w-5 h-5" /> {formatTime(timeLeft)}
              </div>
            </div>
            
            {/* Question Area */}
            <div className="mb-10 flex gap-6 items-start">
              <div className="hidden md:flex shrink-0 w-16 h-16 bg-gray-50 border border-gray-100 rounded-2xl items-center justify-center shadow-sm">
                {QUESTIONS[currentQ].icon}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight text-gray-800">
                {QUESTIONS[currentQ].question}
              </h2>
            </div>
            
            {/* Options */}
            <div className="space-y-3">
              {QUESTIONS[currentQ].options.map((opt, idx) => {
                const letters = ['A', 'B', 'C', 'D'];
                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="w-full text-left p-4 md:p-5 rounded-2xl border-2 border-gray-100 bg-white hover:border-brand/50 hover:bg-brand/5 transition-all flex items-center gap-4 group shadow-sm hover:shadow-md"
                  >
                    <div className="shrink-0 w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center font-bold text-sm group-hover:bg-brand group-hover:text-white transition-colors">
                      {letters[idx]}
                    </div>
                    <span className="text-lg text-gray-700 font-medium flex-1">{opt}</span>
                    <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-brand shrink-0" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {step === 'finished' && (
          <motion.div
            key="finished"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-lg bg-white border border-gray-200 p-10 rounded-3xl shadow-2xl text-center relative z-10"
          >
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center border-4 border-yellow-100 shadow-inner">
                <Trophy className="w-12 h-12 text-yellow-500" />
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-3 text-gray-900">Quiz Complete!</h2>
            <p className="text-gray-500 mb-10 text-lg">You scored {score} out of {QUESTIONS.length}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <p className="text-sm text-gray-500 mb-2 font-semibold uppercase tracking-wider">Final Score</p>
                <p className="text-4xl font-bold text-brand">{Math.round((score/QUESTIONS.length)*100)}%</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <p className="text-sm text-gray-500 mb-2 font-semibold uppercase tracking-wider">Time</p>
                <p className="text-4xl font-bold text-gray-900">{timeTaken.toFixed(1)}s</p>
              </div>
            </div>

            <button
              onClick={() => router.push('/quiz/leaderboard')}
              disabled={isSubmitting}
              className="w-full bg-gray-900 text-white hover:bg-gray-800 shadow-xl shadow-gray-900/20 font-semibold py-4 rounded-xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 text-lg group"
            >
              {isSubmitting ? (
                <>Saving score...</>
              ) : (
                <>
                  View Leaderboard 
                  <Award className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
