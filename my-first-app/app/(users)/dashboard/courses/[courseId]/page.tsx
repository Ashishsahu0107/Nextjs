"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';

// interfaces
interface Lesson {
  title: string;
  duration: string;
  completed: boolean;
}

interface SyllabusSection {
  title: string;
  lessons: Lesson[];
}

interface Question {
  id: number;
  q: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface Assignment {
  id: number;
  title: string;
  dueDate: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'completed' | 'in-progress' | 'locked';
  grade?: string;
  instructions: string;
}

interface LabStep {
  title: string;
  instructions: string;
  functionName: string;
  initialCode: string;
  assertions: { test: (code: string) => boolean; message: string }[];
}

interface CourseDetail {
  id: string;
  title: string;
  category: string;
  level: string;
  duration: string;
  rating: number;
  enrolled: string;
  desc: string;
  gradient: string;
  author: { name: string; avatarBg: string; avatarText: string; role: string };
  syllabus: SyllabusSection[];
  quiz: Question[];
  assignments: Assignment[];
  lab: LabStep[];
}

const coursesData: Record<string, CourseDetail> = {
  '1': {
    id: '1',
    title: 'Advanced Next.js 16 & Server Actions',
    category: 'Web Development',
    level: 'Advanced',
    duration: '22 Hours',
    rating: 4.9,
    enrolled: '14.2k',
    desc: 'Master caching, dynamic rendering, and Server Actions inside Next.js 16. Build edge runtime APIs and structure robust nested route files.',
    gradient: 'from-violet-600 via-indigo-750 to-slate-950',
    author: { name: 'Dan Abramov', avatarBg: 'bg-violet-600', avatarText: 'DA', role: 'Next.js Core Lead' },
    syllabus: [
      {
        title: 'Module 1: Layouts and Routing Runtimes',
        lessons: [
          { title: 'Understanding Next.js Page Directories vs App Routers', duration: '45m', completed: true },
          { title: 'Constructing Nested Layout Boundaries', duration: '1h 10m', completed: true },
          { title: 'Configuring Route Groups and Dynamic URL Params', duration: '55m', completed: true }
        ]
      },
      {
        title: 'Module 2: Turbopack and Hydration Boundary',
        lessons: [
          { title: 'Rust compiler architectures in Next 16', duration: '40m', completed: true },
          { title: 'Handling Hydration Error mismatches', duration: '1h 15m', completed: false },
          { title: 'Async Suspense streams during hydration paints', duration: '50m', completed: false }
        ]
      }
    ],
    quiz: [
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
      }
    ],
    assignments: [
      {
        id: 1,
        title: 'Build Debounce & Throttle Hook',
        dueDate: 'Jul 15, 2026',
        difficulty: 'Medium',
        status: 'in-progress',
        instructions: 'Write a custom React hook that debounces state changes to prevent excess rendering cycles during text inputs. Verify compile checks.'
      },
      {
        id: 2,
        title: 'Create Middleware Authorization rules',
        dueDate: 'Jul 20, 2026',
        difficulty: 'Hard',
        status: 'locked',
        instructions: 'Write a Next.js edge middleware that reads JWT tokens from request headers and routes traffic between public and user paths.'
      }
    ],
    lab: [
      {
        title: 'Step 1: Parse Query String Parameters',
        instructions: `Task: Write a function 'parseQuery(url)' that takes a URL string and returns an object containing its search query parameters.
        
        Example: parseQuery("https://apex.academy?course=nextjs&id=101") -> { course: "nextjs", id: "101" }`,
        functionName: 'parseQuery',
        initialCode: `function parseQuery(url) {\n  const params = {};\n  // Write query parser code here\n  \n  return params;\n}`,
        assertions: [
          { test: (c) => c.includes('parseQuery'), message: 'Must define parseQuery function.' }
        ]
      }
    ]
  },
  '2': {
    id: '2',
    title: 'Full-Stack Agentic AI Engineering',
    category: 'Artificial Intelligence',
    level: 'Advanced',
    duration: '35 Hours',
    rating: 4.85,
    enrolled: '8.4k',
    desc: 'Design reasoning agents that utilize tool integrations and coordinate complex sub-tasks. Harness LangGraph, function calling, and pgvector schemas.',
    gradient: 'from-cyan-600 via-teal-750 to-slate-950',
    author: { name: 'Harrison Chase', avatarBg: 'bg-cyan-650', avatarText: 'HC', role: 'AI Agent Architect' },
    syllabus: [
      {
        title: 'Module 1: Agent Reasoning Loops',
        lessons: [
          { title: 'Introduction to ReAct Prompt frameworks', duration: '1h 00m', completed: true },
          { title: 'Defining Model parameters (temperature, maxTokens)', duration: '50m', completed: false }
        ]
      }
    ],
    quiz: [
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
      }
    ],
    assignments: [
      {
        id: 3,
        title: 'Setup pgvector Database schemas',
        dueDate: 'Jul 18, 2026',
        difficulty: 'Hard',
        status: 'in-progress',
        instructions: 'Design postgres tables mapping course data indexes. Generate embedding column indexes utilizing pgvector.'
      }
    ],
    lab: [
      {
        title: 'Step 1: Format Prompt Templates',
        instructions: `Task: Write a function 'formatPrompt(template, variables)' that takes a string template containing '{{variableName}}' placeholders, and replaces them with corresponding values from the variables dictionary.`,
        functionName: 'formatPrompt',
        initialCode: `function formatPrompt(template, variables) {\n  // Write formatting code here\n  \n  return template;\n}`,
        assertions: [
          { test: (c) => c.includes('formatPrompt'), message: 'Must define formatPrompt function.' }
        ]
      }
    ]
  },
  '3': {
    id: '3',
    title: 'Systems Programming & Wasm',
    category: 'Systems/Cloud',
    level: 'Advanced',
    duration: '28 Hours',
    rating: 4.92,
    enrolled: '5.1k',
    desc: 'A fast-paced guide to systems programming, compile safety, and WebAssembly for web devs. Compile Rust modules to load inside Node and Edge runs.',
    gradient: 'from-emerald-600 via-emerald-850 to-slate-950',
    author: { name: 'Ashley Williams', avatarBg: 'bg-emerald-600', avatarText: 'AW', role: 'Systems Educator' },
    syllabus: [
      {
        title: 'Module 1: Memory Safety & Borrow Checker',
        lessons: [
          { title: 'Variables binding and mutable keywords', duration: '35m', completed: true },
          { title: 'Mastering the Borrow Checker: Ownership & References', duration: '1h 15m', completed: true }
        ]
      }
    ],
    quiz: [
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
      }
    ],
    assignments: [
      {
        id: 4,
        title: 'Write memory-safe custom Vector struct',
        dueDate: 'Jul 25, 2026',
        difficulty: 'Hard',
        status: 'in-progress',
        instructions: 'Implement a vector structure in Rust utilizing pointer allocations and capacity limits safely.'
      }
    ],
    lab: [
      {
        title: 'Step 1: Mutable Variable Binding',
        instructions: `Task: Declare a mutable count integer initialized to 0. Write: let mut count = 0;`,
        functionName: 'main',
        initialCode: `fn main() {\n  // Declare mutable variable count here\n}`,
        assertions: [
          { test: (c) => c.includes('let mut'), message: 'Must declare a mutable variable.' }
        ]
      }
    ]
  }
};

export default function CourseWorkspacePage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = use(params);
  const courseId = resolvedParams.courseId;
  const course = coursesData[courseId] || coursesData['1'];

  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'quiz' | 'assignments' | 'lab'>('overview');

  // Quiz Stateful values
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Assignments Stateful values
  const [assignments, setAssignments] = useState<Assignment[]>(course.assignments);
  const [submittingId, setSubmittingId] = useState<number | null>(null);
  const [assignmentSuccess, setAssignmentSuccess] = useState('');

  // Lab Stateful values
  const [labCode, setLabCode] = useState('');
  const [compiledSrcDoc, setCompiledSrcDoc] = useState('');
  const [labLogs, setLabLogs] = useState<string[]>([]);
  const [labCompiling, setLabCompiling] = useState(false);
  const [labPassed, setLabPassed] = useState(false);

  // Reset tab-specific states when parameters change
  useEffect(() => {
    setAssignments(course.assignments);
    setCurrentQuizIdx(0);
    setSelectedOpt(null);
    setQuizChecked(false);
    setQuizScore(0);
    setQuizFinished(false);

    if (course.lab && course.lab[0]) {
      setLabCode(course.lab[0].initialCode);
      setLabLogs(['Write your function template and click execute parameters.']);
      setLabPassed(false);
    }
  }, [courseId, course]);

  // Handle Mock Assignment submissions
  const handleSubmitAssignment = (id: number) => {
    setSubmittingId(id);
    setAssignmentSuccess('');
    setTimeout(() => {
      setSubmittingId(null);
      setAssignmentSuccess(`Assignment submitted successfully! Unit testing tests resolved OK.`);
      setAssignments(prev => prev.map(a => a.id === id ? { ...a, status: 'completed', grade: 'Pending Grading' } : a));
    }, 1200);
  };

  // Compile code helper for iframe sandbox preview
  const compileIframeCode = (rawCode: string) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <style>
            body { margin: 0; padding: 12px; font-family: system-ui, sans-serif; background: #090d16; color: #cbd5e1; }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel">
            try {
              ${rawCode}
            } catch(e) {
              document.getElementById('root').innerHTML = '<div style="color:#ef4444; font-size:12px; font-family:monospace;">' + e.message + '</div>';
            }
          </script>
        </body>
      </html>
    `;
  };

  const handleVerifyLab = () => {
    const activeLabStep = course.lab[0];
    if (!activeLabStep) return;

    setLabCompiling(true);
    setLabLogs(['▲ Transpiling JS source modules...', '• Running unit test suite...']);

    setTimeout(() => {
      setLabCompiling(false);
      setCompiledSrcDoc(compileIframeCode(labCode));

      try {
        activeLabStep.assertions.forEach(assertion => {
          if (!assertion.test(labCode)) {
            throw new Error(assertion.message);
          }
        });
        setLabPassed(true);
        setLabLogs([
          '▲ Transpiling JS source modules...',
          '• Running unit test suite...',
          '✓ PASS  Unit tests compiled successfully.',
          '🎉 Congratulations! You resolved this lab module!'
        ]);
      } catch (err: any) {
        setLabPassed(false);
        setLabLogs([
          '▲ Transpiling JS source modules...',
          '• Running unit test suite...',
          '✗ FAIL  Test suite failed.',
          `  Error: ${err.message}`
        ]);
      }
    }, 1200);
  };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 text-left">
      
      {/* Workspace top banner */}
      <div className={`relative rounded-3xl bg-gradient-to-r ${course.gradient} p-8 sm:p-10 border border-slate-905 overflow-hidden shadow-xl`}>
        <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px]" />
        
        <div className="relative z-10 space-y-3">
          <div className="flex gap-2 items-center">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-900 text-cyan-400 font-bold uppercase">
              {course.category}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950/80 text-white">
              {course.level}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-none">
            {course.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-350 max-w-3xl leading-relaxed">
            {course.desc}
          </p>
        </div>
      </div>

      {/* Segmented workspace navigation tabs */}
      <div className="flex items-center gap-2 border-b border-slate-900 pb-1.5 overflow-x-auto custom-scrollbar flex-wrap">
        {[
          { id: 'overview', name: 'Overview', icon: '📄' },
          { id: 'syllabus', name: 'Syllabus & Modules', icon: '📚' },
          { id: 'quiz', name: 'Quiz Assessment', icon: '🧠' },
          { id: 'assignments', name: 'Assignments', icon: '📝' },
          { id: 'lab', name: 'React Coding Lab', icon: '💻' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
              activeTab === tab.id 
                ? 'bg-slate-900 border border-slate-805 text-white shadow-md' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-950/40'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="relative pt-2">
        
        {/* OVERVIEW PANEL */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            <div className="lg:col-span-8 space-y-6">
              <div className="glass p-6 rounded-2xl border border-slate-900 space-y-4">
                <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  Course Description
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {course.desc} Learn advanced patterns, state workflows, unit test parameters, and compiling safety under high-caliber technical guidance.
                </p>
              </div>

              <div className="glass p-6 rounded-2xl border border-slate-900 grid grid-cols-3 gap-6 text-center">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Duration</span>
                  <span className="text-lg font-extrabold text-white mt-1 block">{course.duration}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Cohort Rating</span>
                  <span className="text-lg font-extrabold text-amber-400 mt-1 block">★ {course.rating}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Students</span>
                  <span className="text-lg font-extrabold text-white mt-1 block">{course.enrolled}</span>
                </div>
              </div>
            </div>

            {/* Side Instructor detail */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass p-6 rounded-2xl border border-slate-900 space-y-4 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block text-left">Instructor</span>
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-14 h-14 rounded-full ${course.author.avatarBg} flex items-center justify-center font-black text-lg text-white shadow-md`}>
                    {course.author.avatarText}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{course.author.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{course.author.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SYLLABUS PANEL */}
        {activeTab === 'syllabus' && (
          <div className="max-w-4xl space-y-6 animate-fade-in">
            {course.syllabus.map((sect, sectIdx) => (
              <div key={sectIdx} className="glass p-5 rounded-2xl border border-slate-900 space-y-4">
                <h3 className="text-sm font-bold text-white border-b border-slate-900 pb-2 flex justify-between items-center">
                  <span>{sect.title}</span>
                  <span className="text-xs text-slate-505">{sect.lessons.length} sections</span>
                </h3>
                
                <div className="space-y-2">
                  {sect.lessons.map((les, lesIdx) => (
                    <div 
                      key={lesIdx}
                      className="flex items-center justify-between p-3.5 bg-slate-950/40 hover:bg-slate-950 border border-slate-900/60 rounded-xl transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5.5 h-5.5 rounded-full border text-[9px] flex items-center justify-center ${
                          les.completed 
                            ? 'border-emerald-500/20 bg-emerald-950/30 text-emerald-400 font-bold' 
                            : 'border-slate-800 bg-slate-950 text-slate-500 group-hover:border-violet-500 group-hover:text-violet-400'
                        }`}>
                          {les.completed ? '✓' : '▶'}
                        </div>
                        <span className={`text-xs font-semibold ${les.completed ? 'text-slate-350 line-through decoration-slate-650' : 'text-slate-205'}`}>
                          {les.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-600 font-mono font-bold">{les.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* QUIZ PANEL */}
        {activeTab === 'quiz' && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            {course.quiz.length === 0 ? (
              <div className="text-center py-10 text-slate-500">No quizzes available for this course.</div>
            ) : (
              <div className="glass p-6 sm:p-8 rounded-3xl border border-slate-900 shadow-xl relative">
                {quizFinished ? (
                  <div className="text-center py-6 space-y-6">
                    <span className="text-5xl">🏆</span>
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold text-white">Assessment Finished!</h2>
                      <p className="text-xs text-slate-400">Score obtained: {quizScore} / {course.quiz.length} correct responses.</p>
                    </div>
                    <div className="inline-block bg-slate-950 px-4 py-2 border border-slate-900 rounded-xl text-xs font-mono text-cyan-400">
                      XP Gained: +{quizScore * 50} XP
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setCurrentQuizIdx(0);
                          setSelectedOpt(null);
                          setQuizChecked(false);
                          setQuizScore(0);
                          setQuizFinished(false);
                        }}
                        className="px-5 py-2.5 bg-violet-650 hover:bg-violet-600 text-xs font-bold text-white rounded-xl shadow-md transition-all"
                      >
                        Retake Quiz
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                      <span>Question {currentQuizIdx + 1} of {course.quiz.length}</span>
                      <span className="text-cyan-405 font-mono">Current Score: {quizScore}</span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {course.quiz[currentQuizIdx].q}
                    </h2>

                    <div className="space-y-3 pt-1">
                      {course.quiz[currentQuizIdx].options.map((opt, optIdx) => {
                        const isSelected = selectedOpt === optIdx;
                        const isCorrect = course.quiz[currentQuizIdx].answer === optIdx;
                        
                        let borders = 'border-slate-900 bg-slate-950/60 hover:border-slate-805';
                        let texts = 'text-slate-350';

                        if (isSelected) {
                          borders = 'border-violet-500 bg-violet-950/10';
                          texts = 'text-white font-bold';
                        }
                        if (quizChecked) {
                          if (isCorrect) {
                            borders = 'border-emerald-500 bg-emerald-950/20';
                            texts = 'text-emerald-450 font-bold';
                          } else if (isSelected) {
                            borders = 'border-rose-500 bg-rose-950/20';
                            texts = 'text-rose-450 font-bold';
                          } else {
                            borders = 'border-slate-950 opacity-40';
                            texts = 'text-slate-550';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => !quizChecked && setSelectedOpt(optIdx)}
                            disabled={quizChecked}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${borders}`}
                          >
                            <span className={texts}>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {quizChecked && (
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-900 text-xs text-slate-400 leading-relaxed">
                        <span className="font-bold text-slate-200 block mb-1">Explanation:</span>
                        {course.quiz[currentQuizIdx].explanation}
                      </div>
                    )}

                    <div className="pt-3 border-t border-slate-900 flex justify-end">
                      {!quizChecked ? (
                        <button
                          onClick={() => {
                            if (selectedOpt === null) return;
                            setQuizChecked(true);
                            if (selectedOpt === course.quiz[currentQuizIdx].answer) {
                              setQuizScore(prev => prev + 1);
                            }
                          }}
                          disabled={selectedOpt === null}
                          className="px-5 py-2.5 bg-violet-650 hover:bg-violet-600 disabled:bg-violet-850 text-xs font-bold text-white rounded-xl transition-all"
                        >
                          Verify Answer
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedOpt(null);
                            setQuizChecked(false);
                            if (currentQuizIdx + 1 < course.quiz.length) {
                              setCurrentQuizIdx(prev => prev + 1);
                            } else {
                              setQuizFinished(true);
                            }
                          }}
                          className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-xs font-bold text-white rounded-xl transition-all"
                        >
                          {currentQuizIdx + 1 === course.quiz.length ? 'Finish Quiz' : 'Next Question'}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ASSIGNMENTS PANEL */}
        {activeTab === 'assignments' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            {assignmentSuccess && (
              <div className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 p-4 rounded-xl text-xs font-semibold">
                ✓ {assignmentSuccess}
              </div>
            )}

            {assignments.length === 0 ? (
              <div className="text-center py-10 text-slate-505">No assignments posted for this course.</div>
            ) : (
              <div className="space-y-4">
                {assignments.map((item) => (
                  <div key={item.id} className="glass p-5 rounded-2xl border border-slate-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
                    <div className="space-y-2 flex-grow">
                      <div className="flex gap-2 items-center flex-wrap">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                          item.difficulty === 'Easy' ? 'border-emerald-500/20 bg-emerald-950/30 text-emerald-400' :
                          item.difficulty === 'Medium' ? 'border-violet-500/20 bg-violet-950/30 text-violet-400' :
                          'border-rose-500/20 bg-rose-950/30 text-rose-450'
                        }`}>
                          {item.difficulty}
                        </span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                          item.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' :
                          item.status === 'in-progress' ? 'bg-amber-500/10 text-amber-400 animate-pulse' :
                          'bg-slate-900 text-slate-500'
                        }`}>
                          {item.status === 'completed' ? 'Completed' : item.status === 'in-progress' ? 'In Progress' : 'Locked'}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-white tracking-tight">{item.title}</h4>
                      <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">{item.instructions}</p>
                      
                      <div className="flex gap-4 text-[10px] text-slate-500 pt-1 font-semibold">
                        <span>Due Date: {item.dueDate}</span>
                        {item.grade && <span className="text-emerald-405">Grade: {item.grade}</span>}
                      </div>
                    </div>

                    <div className="w-full sm:w-auto flex-shrink-0">
                      {item.status === 'locked' ? (
                        <button disabled className="px-4 py-2 bg-slate-900 border border-slate-950 text-xs text-slate-550 font-bold rounded-lg cursor-not-allowed">Locked</button>
                      ) : item.status === 'completed' ? (
                        <button disabled className="px-4 py-2 bg-slate-900/60 text-xs text-emerald-500 font-bold rounded-lg cursor-default">Submitted</button>
                      ) : (
                        <button
                          onClick={() => handleSubmitAssignment(item.id)}
                          disabled={submittingId === item.id}
                          className="px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:bg-violet-850 text-xs font-bold text-white rounded-lg shadow transition-colors flex items-center gap-1.5"
                        >
                          {submittingId === item.id ? 'Submitting...' : 'Submit Code'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* LAB PANEL */}
        {activeTab === 'lab' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-fade-in">
            {/* Guidelines & Preview (Left 5) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="glass p-5 rounded-2xl border border-slate-900 space-y-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Instructions</span>
                <h3 className="text-sm font-bold text-white">{course.lab[0]?.title || 'Lab 1'}</h3>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {course.lab[0]?.instructions}
                </p>
              </div>

              {/* Sandboxed Live React Frame preview */}
              <div className="glass rounded-2xl border border-slate-900 overflow-hidden flex flex-col h-[280px]">
                <div className="bg-slate-950 px-4 py-2 border-b border-slate-900 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Live Preview</span>
                  <span className="text-[9px] text-emerald-450 font-bold">Active Iframe</span>
                </div>
                <div className="flex-grow bg-[#090d16]">
                  {compiledSrcDoc ? (
                    <iframe
                      srcDoc={compiledSrcDoc}
                      title="React Live Compiler"
                      sandbox="allow-scripts"
                      className="w-full h-full border-none"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-600">Click execute to mount preview screen...</div>
                  )}
                </div>
              </div>
            </div>

            {/* Code Editor (Right 7) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="glass rounded-2xl border border-slate-900 overflow-hidden flex flex-col h-[480px]">
                
                {/* Editor Bar */}
                <div className="bg-slate-950 px-4 py-3 border-b border-slate-900 flex justify-between items-center">
                  <span className="text-[10px] font-mono text-slate-550">workspace://template.jsx</span>
                  <button
                    onClick={handleVerifyLab}
                    disabled={labCompiling}
                    className="px-4 py-1.5 bg-violet-650 hover:bg-violet-600 disabled:bg-violet-850 text-xs font-bold text-white rounded-lg transition-all"
                  >
                    {labCompiling ? 'Running...' : 'Execute & Verify'}
                  </button>
                </div>

                <textarea
                  value={labCode}
                  onChange={(e) => setLabCode(e.target.value)}
                  className="flex-grow w-full p-4 bg-slate-950 font-mono text-xs text-violet-200 focus:outline-none resize-none leading-relaxed border-none focus:ring-0 custom-scrollbar"
                />

                <div className="bg-slate-950 border-t border-slate-900 p-3 font-mono text-[9px] text-left">
                  <span className="text-[8px] font-bold text-slate-650 uppercase tracking-widest block pb-1 border-b border-slate-900/60 mb-1">
                    Console output
                  </span>
                  <div className="space-y-0.5 h-16 overflow-y-auto custom-scrollbar">
                    {labLogs.map((log, idx) => (
                      <p 
                        key={idx}
                        className={`${
                          log.startsWith('✓') || log.startsWith('🎉') ? 'text-emerald-400 font-semibold' :
                          log.startsWith('▲') ? 'text-violet-400' :
                          log.startsWith('✗') ? 'text-rose-450 font-semibold' : 'text-slate-500'
                        }`}
                      >
                        {log}
                      </p>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
