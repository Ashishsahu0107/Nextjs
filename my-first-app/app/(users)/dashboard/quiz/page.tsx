"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface Question {
  id: number;
  q: string;
  options: string[];
  answer: number; // Index of options
  explanation: string;
}

const quizzesByCourse: Record<string, Question[]> = {
  '1': [
    {
      id: 1,
      q: 'Which Next.js 16 feature compiles assets dynamically using an optimized rust engine?',
      options: ['Babel Loader', 'Webpack Bundler', 'Turbopack compiler', 'Rollup compiler'],
      answer: 2,
      explanation: 'Next.js uses Turbopack, a Rust-based bundler optimized for fast development server starts and hot module replacement.'
    },
    {
      id: 2,
      q: 'What is the primary benefit of React Server Components (RSC)?',
      options: [
        'They execute on the client to optimize DOM access speed.',
        'They run on the server, reducing bundle size sent to the client.',
        'They replace the need for React state hooks entirely.',
        'They force synchronous hydration on mobile networks.'
      ],
      answer: 1,
      explanation: 'React Server Components execute on the server, meaning their dependencies are not included in the client bundle size, improving load speeds.'
    },
    {
      id: 3,
      q: 'In Tailwind CSS v4, how are custom configurations like font families declared?',
      options: [
        'Via a tailwind.config.js exports block.',
        'Using standard @import queries inside packages.',
        'Inside the CSS file using the @theme declaration.',
        'Directly inside HTML script parameters.'
      ],
      answer: 2,
      explanation: 'Tailwind CSS v4 introduces a native CSS-first configuration using the @theme directive directly inside your primary stylesheet.'
    }
  ],
  '2': [
    {
      id: 1,
      q: 'What is the primary role of a LangGraph agent?',
      options: [
        'To serve HTML pages',
        'To manage stateful multi-agent reasoning paths',
        'To style CSS elements',
        'To speed up SQL queries'
      ],
      answer: 1,
      explanation: 'LangGraph is designed to build stateful, multi-agent workflows that can loop and reason.'
    },
    {
      id: 2,
      q: 'In vector databases, what does RAG stand for?',
      options: [
        'Redundant Array Grid',
        'Routing Advanced Gateway',
        'Retrieval-Augmented Generation',
        'Recursive Agentic Graph'
      ],
      answer: 2,
      explanation: 'RAG stands for Retrieval-Augmented Generation, combining search retrievals with LLM context prompts.'
    }
  ],
  '3': [
    {
      id: 1,
      q: "What does Rust's borrow checker enforce?",
      options: [
        'Strict OOP inheritance',
        'Compile-time memory safety without a garbage collector',
        'Asynchronous threading timeouts',
        'Automatic HTML tag generation'
      ],
      answer: 1,
      explanation: 'The borrow checker enforces aliasing and mutability rules at compile time to ensure memory safety without GC pauses.'
    },
    {
      id: 2,
      q: 'Which Rust keyword defines a contract/interface for types?',
      options: ['impl', 'struct', 'trait', 'interface'],
      answer: 2,
      explanation: 'Rust traits define shared behaviors or contracts that types can implement.'
    }
  ]
};

const courseNames: Record<string, string> = {
  '1': 'Advanced Next.js 16 & Server Actions',
  '2': 'Full-Stack Agentic AI Engineering',
  '3': 'Systems Programming & Wasm'
};

function QuizContent() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId') || '1';
  const quizData = quizzesByCourse[courseId] || quizzesByCourse['1'];
  const courseName = courseNames[courseId] || 'Selected Track';

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleSelectOption = (idx: number) => {
    if (checked) return;
    setSelectedOpt(idx);
  };

  const handleCheck = () => {
    if (selectedOpt === null || checked) return;
    setChecked(true);
    if (selectedOpt === quizData[currentIdx].answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOpt(null);
    setChecked(false);
    
    if (currentIdx + 1 < quizData.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setChecked(false);
    setScore(0);
    setQuizFinished(false);
  };

  const currentQuestion = quizData[currentIdx];

  // If there are no questions for this course
  if (!currentQuestion) {
    return (
      <div className="p-6 sm:p-8 max-w-2xl mx-auto text-center space-y-4">
        <h2 className="text-xl font-bold text-white">No quiz questions loaded for this track yet.</h2>
        <p className="text-sm text-slate-400">Please choose another active track from your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 max-w-2xl mx-auto space-y-8 text-left">
      
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Active Assessment</h1>
        <p className="text-sm text-slate-400">
          Course Track: <span className="text-cyan-400 font-bold">{courseName}</span>
        </p>
      </div>

      {/* Quiz Board */}
      <div className="glass p-6 sm:p-8 rounded-3xl border border-slate-900 shadow-xl relative">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-cyan-500/5 pointer-events-none rounded-3xl" />
        
        {quizFinished ? (
          <div className="text-center py-8 space-y-6 relative z-10">
            <span className="text-5xl">🏆</span>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white">Quiz Completed!</h2>
              <p className="text-sm text-slate-400">You scored {score} out of {quizData.length} questions correctly.</p>
            </div>
            <div className="inline-block bg-slate-950 px-4 py-2 border border-slate-900 rounded-xl text-xs font-mono text-cyan-400">
              XP Gained: +{score * 50} XP
            </div>
            <div>
              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-xs font-bold text-white rounded-xl shadow-md transition-colors"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 relative z-10">
            {/* Index Tracker */}
            <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
              <span>Question {currentIdx + 1} of {quizData.length}</span>
              <span className="font-mono text-cyan-400">Current Score: {score}</span>
            </div>

            {/* Question Text */}
            <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
              {currentQuestion.q}
            </h2>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((opt, optIdx) => {
                const isSelected = selectedOpt === optIdx;
                const isCorrect = currentQuestion.answer === optIdx;
                
                // Color formatting based on checked states
                let borderStyles = 'border-slate-900 hover:border-slate-800 bg-slate-950/60';
                let textStyles = 'text-slate-300';
                
                if (isSelected) {
                  borderStyles = 'border-violet-500 bg-violet-950/10';
                  textStyles = 'text-white font-bold';
                }

                if (checked) {
                  if (isCorrect) {
                    borderStyles = 'border-emerald-500 bg-emerald-950/20';
                    textStyles = 'text-emerald-400 font-bold';
                  } else if (isSelected) {
                    borderStyles = 'border-rose-500 bg-rose-950/20';
                    textStyles = 'text-rose-400 font-bold';
                  } else {
                    borderStyles = 'border-slate-950 opacity-40';
                    textStyles = 'text-slate-500';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={checked}
                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all duration-200 flex items-center justify-between ${borderStyles}`}
                  >
                    <span className={textStyles}>{opt}</span>
                    {checked && isCorrect && <span className="text-emerald-400">✓ Correct</span>}
                    {checked && isSelected && !isCorrect && <span className="text-rose-400">✗ Wrong</span>}
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {checked && (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-900 text-xs text-slate-400 leading-relaxed animate-fade-in">
                <span className="font-bold text-slate-200 block mb-1">Explanation:</span>
                {currentQuestion.explanation}
              </div>
            )}

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-slate-900 flex justify-end">
              {!checked ? (
                <button
                  onClick={handleCheck}
                  disabled={selectedOpt === null}
                  className="px-6 py-3 bg-violet-600 hover:bg-violet-500 disabled:bg-violet-850 text-xs font-bold text-white rounded-xl shadow-md transition-colors"
                >
                  Verify Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-xs font-bold text-white rounded-xl shadow-md transition-colors"
                >
                  {currentIdx + 1 === quizData.length ? 'Finish Quiz' : 'Next Question'}
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={
      <div className="p-8 text-center text-slate-450 font-semibold">
        Loading quiz modules...
      </div>
    }>
      <QuizContent />
    </Suspense>
  );
}
