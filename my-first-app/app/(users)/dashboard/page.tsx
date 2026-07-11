"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// Interfaces
interface ActiveCourse {
  id: number;
  title: string;
  progress: number;
  lastLesson: string;
  category: string;
  files: { name: string; content: string }[];
}

interface Message {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export default function UserDashboard() {
  // Course State
  const activeCourses: ActiveCourse[] = [
    {
      id: 1,
      title: 'Advanced Next.js 16 & Server Actions',
      progress: 68,
      lastLesson: 'Optimizing Hydration Boundaries',
      category: 'Web Development',
      files: [
        { name: 'app/page.tsx', content: `// Next.js Server Component\nimport { fetchCourses } from '@/lib/api';\n\nexport default async function Page() {\n  const data = await fetchCourses();\n  return (\n    <main className="p-8">\n      <h1 className="text-2xl font-bold">Apex Labs</h1>\n      {/* TODO: Render courses list below */}\n    </main>\n  );\n}` },
        { name: 'lib/api.ts', content: `export async function fetchCourses() {\n  const res = await fetch('https://api.apex.learning/courses');\n  return res.json();\n}` }
      ]
    },
    {
      id: 2,
      title: 'Full-Stack Agentic AI Engineering',
      progress: 25,
      lastLesson: 'Structuring Multi-Agent System Prompts',
      category: 'Artificial Intelligence',
      files: [
        { name: 'agent.ts', content: `import { ChatModel } from '@apex/ai-sdk';\n\nconst agent = new Agent({\n  model: ChatModel('gemini-3.5-flash'),\n  systemPrompt: 'You are a helpful coding tutor...',\n  tools: []\n});` },
        { name: 'prompt.txt', content: `System prompt guidelines:\n1. Keep responses concise\n2. Provide syntax code segments\n3. Suggest terminal tests` }
      ]
    }
  ];

  const [selectedCourse, setSelectedCourse] = useState<ActiveCourse>(activeCourses[0]);
  const [activeFileIdx, setActiveFileIdx] = useState<number>(0);
  const [editorContent, setEditorContent] = useState<string>(activeCourses[0].files[0].content);

  // When course changes, update files
  const handleCourseChange = (course: ActiveCourse) => {
    setSelectedCourse(course);
    setActiveFileIdx(0);
    setEditorContent(course.files[0].content);
  };

  // When file changes, update content
  const handleFileChange = (idx: number) => {
    setActiveFileIdx(idx);
    setEditorContent(selectedCourse.files[idx].content);
  };

  // Console State
  const [consoleOutput, setConsoleOutput] = useState<string[]>(['Ready to execute code...', 'Click "Run Sandbox Tests" to compile.']);
  const [running, setRunning] = useState(false);

  const handleRunCode = () => {
    setRunning(true);
    setConsoleOutput(['▲ Next.js Turbopack Compiling...', '• Parsing imports & dependencies...', '• Executing unit tests...']);
    
    setTimeout(() => {
      setRunning(false);
      setConsoleOutput([
        '▲ Next.js Turbopack Compiling...',
        '• Parsing imports & dependencies...',
        '• Executing unit tests...',
        ' ',
        '✓ PASS  tests/page.test.tsx (142ms)',
        '  └  Page Component renders correctly (ok)',
        '  └  Server API payload handles hydration (ok)',
        ' ',
        '✓ Compilation successful. All 2 tests passed.',
        '○ Sandbox endpoint: http://sandbox-localhost:3000'
      ]);
    }, 1800);
  };

  // Chat State
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'ai', text: 'Hi Ashish! I am your Apex AI Study Copilot. How can I assist you with your Next.js hydration boundaries today?', time: '10:42 AM' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [aiTyping, setAiTyping] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      sender: 'user',
      text: inputVal,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setAiTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setAiTyping(false);
      const aiReply: Message = {
        id: Date.now() + 1,
        sender: 'ai',
        text: `In Next.js, Hydration errors occur if your Server Component output differs from the initial Client Component paint. Since you are fetching courses asynchronously, make sure you wrap your list in React Suspense: <Suspense fallback={<Loader />}>. Let me know if you want me to write the snippet!`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 2000);
  };

  return (
    <div className="py-6 lg:py-10 text-slate-100 relative overflow-hidden text-left">
      {/* Background Orbs */}
      <div className="absolute top-[10%] left-[-10%] w-[450px] h-[450px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= GREETING & STATS BAR ================= */}
        <div className="glass p-6 sm:p-8 rounded-3xl border border-slate-900 shadow-xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-cyan-500/5 pointer-events-none rounded-3xl" />
          
          <div className="space-y-1 z-10">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Ashish</span>!
            </h1>
            <p className="text-xs text-slate-400">Track your courses, debug code, and chat with your AI mentor.</p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 z-10">
            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-900/60 flex flex-col justify-center min-w-[90px] sm:min-w-[120px]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Streak</span>
              <span className="text-xl sm:text-2xl font-black text-white mt-1">🔥 7 Days</span>
            </div>
            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-900/60 flex flex-col justify-center min-w-[90px] sm:min-w-[120px]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Total XP</span>
              <span className="text-xl sm:text-2xl font-black text-white mt-1">✨ 1,450</span>
            </div>
            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-900/60 flex flex-col justify-center min-w-[90px] sm:min-w-[120px]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Rank</span>
              <span className="text-xl sm:text-2xl font-black text-violet-400 mt-1">#4,210</span>
            </div>
          </div>
        </div>

        {/* ================= DASHBOARD GRID LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 8 COLUMNS: Courses & Code Sandbox */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Active Course Progress Panel */}
            <div className="glass p-6 rounded-3xl border border-slate-900 shadow-xl space-y-6">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
                Active Learning Tracks
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeCourses.map((course) => {
                  const active = selectedCourse.id === course.id;
                  return (
                    <Link
                      key={course.id}
                      href={`/dashboard/courses/${course.id}`}
                      className={`p-5 rounded-2xl border transition-all duration-300 relative group flex flex-col justify-between text-left ${
                        active 
                          ? 'bg-slate-905 border-violet-500/60 shadow-[0_0_20px_rgba(139,92,246,0.1)]' 
                          : 'bg-slate-950/40 border-slate-900 hover:border-slate-800'
                      }`}
                    >
                      <div className="space-y-2 w-full">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-900 text-cyan-400 uppercase font-bold">
                            {course.category}
                          </span>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleCourseChange(course);
                            }}
                            className={`text-[9px] font-bold px-2 py-0.5 rounded transition-all ${
                              active ? 'bg-violet-600 text-white' : 'bg-slate-900 hover:bg-slate-850 text-slate-400'
                            }`}
                          >
                            {active ? 'Active Sandbox' : 'Load Sandbox'}
                          </button>
                        </div>
                        <h3 className="font-bold text-sm text-white mt-2 group-hover:text-violet-400 transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          Last Lab: {course.lastLesson}
                        </p>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full mt-4 space-y-1.5">
                        <div className="flex justify-between text-[10px] text-slate-400">
                          <span>Percent Complete</span>
                          <span className="font-bold text-white">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-900">
                          <div 
                            className="bg-gradient-to-r from-violet-600 to-cyan-500 h-full rounded-full transition-all duration-500" 
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* In-Browser Code Workspace Sandbox Simulation */}
            <div className="glass rounded-3xl border border-slate-900 shadow-xl overflow-hidden">
              
              {/* Workspace Header Tab buttons */}
              <div className="bg-slate-950 px-4 py-3 border-b border-slate-900 flex justify-between items-center flex-wrap gap-3">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  
                  {/* File Tabs */}
                  <div className="flex items-center gap-1">
                    {selectedCourse.files.map((file, idx) => {
                      const isActive = activeFileIdx === idx;
                      return (
                        <button
                          key={file.name}
                          onClick={() => handleFileChange(idx)}
                          className={`px-3 py-1 rounded text-[11px] font-mono transition-colors ${
                            isActive 
                              ? 'bg-slate-900 text-white border border-slate-800' 
                              : 'text-slate-500 hover:text-slate-355'
                          }`}
                        >
                          {file.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Workspace Run actions */}
                <button
                  onClick={handleRunCode}
                  disabled={running}
                  className="px-4 py-1.5 bg-violet-600 hover:bg-violet-500 disabled:bg-violet-850 text-xs font-semibold text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                >
                  {running ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Running...</span>
                    </>
                  ) : (
                    <>
                      <span>▶</span>
                      <span>Run Sandbox Tests</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Editor Body */}
              <div className="relative">
                <textarea
                  value={editorContent}
                  onChange={(e) => setEditorContent(e.target.value)}
                  rows={10}
                  className="w-full p-6 bg-slate-950 font-mono text-xs text-indigo-200 focus:outline-none resize-none leading-relaxed border-none focus:ring-0"
                />
              </div>

              {/* Console logs output */}
              <div className="bg-slate-950 border-t border-slate-900 p-4 font-mono text-[10px]">
                <div className="flex items-center gap-2 text-slate-500 uppercase tracking-widest text-[9px] font-bold border-b border-slate-900/60 pb-2 mb-2">
                  <span>Console Shell</span>
                  <span>v16.2.10</span>
                </div>
                <div className="space-y-1 h-32 overflow-y-auto custom-scrollbar">
                  {consoleOutput.map((line, idx) => (
                    <p 
                      key={idx} 
                      className={`${
                        line.startsWith('✓') ? 'text-emerald-400 font-semibold' :
                        line.startsWith('▲') ? 'text-violet-400' :
                        line.startsWith('•') ? 'text-slate-400' :
                        line.startsWith('○') ? 'text-cyan-400' : 'text-slate-500'
                      }`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT 4 COLUMNS: AI Tutor & Badges */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* AI Tutor Chatbot Messenger */}
            <div className="glass rounded-3xl border border-slate-900 shadow-xl overflow-hidden h-[460px] flex flex-col justify-between">
              
              {/* AI Chat Header */}
              <div className="px-5 py-4 bg-slate-950 border-b border-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-sm font-bold text-white">APEX AI Tutor</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-500">
                  GPT-4o
                </span>
              </div>

              {/* Message Thread */}
              <div className="flex-grow p-4 space-y-4 overflow-y-auto max-h-[300px] text-xs">
                {messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div 
                      key={msg.id} 
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
                    >
                      <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                        isUser 
                          ? 'bg-violet-600 text-white rounded-tr-none' 
                          : 'bg-slate-905 border border-slate-900 text-slate-200 rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-slate-600 font-semibold px-1">{msg.time}</span>
                    </div>
                  );
                })}

                {/* AI Typing indicator */}
                {aiTyping && (
                  <div className="flex flex-col items-start space-y-1">
                    <div className="p-3 rounded-2xl bg-slate-905 border border-slate-900 text-slate-400 rounded-tl-none flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input Field */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-900 bg-slate-950 flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a coding question..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="flex-grow px-3 py-2 bg-slate-950 border border-slate-900 rounded-xl text-xs text-white placeholder-slate-650 focus:outline-none focus:border-violet-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-xs font-bold text-white rounded-xl transition-colors shadow-[0_0_10px_rgba(139,92,246,0.15)] flex-shrink-0"
                >
                  Send
                </button>
              </form>

            </div>

            {/* Badges / Milestones panel */}
            <div className="glass p-6 rounded-3xl border border-slate-900 shadow-xl space-y-5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>🏆</span>
                <span>Unlocked Milestones</span>
              </h3>

              <div className="space-y-4">
                {[
                  { title: 'React 19 Hydration Wizard', desc: 'Solved browser routing errors.', icon: '⚛️', date: 'Jul 10' },
                  { title: 'Tailwind v4 Dev', desc: 'Configured CSS custom variables.', icon: '🎨', date: 'Jul 08' },
                  { title: '7-Day Code streak', desc: 'Kept consistency for a week.', icon: '🔥', date: 'Jul 07' },
                ].map((badge, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4 p-3 bg-slate-950/40 border border-slate-900/60 rounded-xl hover:border-slate-800 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl bg-slate-950 border border-slate-900 w-10 h-10 rounded-lg flex items-center justify-center">
                        {badge.icon}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{badge.title}</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">{badge.desc}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-600 font-semibold">{badge.date}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
