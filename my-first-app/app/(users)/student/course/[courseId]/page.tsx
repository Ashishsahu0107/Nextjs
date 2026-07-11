"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  completed: boolean;
}

interface Module {
  title: string;
  lessons: Lesson[];
}

interface SavedNote {
  id: number;
  timestamp: number; // in seconds
  text: string;
}

interface Question {
  id: number;
  q: string;
  options: string[];
  answer: number;
}

const courseDetailsData: Record<string, {
  title: string;
  modules: Module[];
  quiz: Question[];
  assignmentInstructions: string;
}> = {
  '1': {
    title: 'Advanced Next.js 16 & Server Actions',
    modules: [
      {
        title: 'Module 1: Server Components Foundations',
        lessons: [
          { id: '1-1', title: 'RSC vs Client Hydration Hydration Ratios', duration: '12m', videoUrl: '', completed: true },
          { id: '1-2', title: 'Structuring Nested Layout Directories', duration: '18m', videoUrl: '', completed: false }
        ]
      },
      {
        title: 'Module 2: Turbopack and Build Outputs',
        lessons: [
          { id: '2-1', title: 'Configuring compilation parameters', duration: '15m', videoUrl: '', completed: false },
          { id: '2-2', title: 'Minification techniques inside Next.js 16', duration: '20m', videoUrl: '', completed: false }
        ]
      }
    ],
    quiz: [
      {
        id: 1,
        q: 'Which hook retrieves route segment search parameters inside Next.js client modules?',
        options: ['useParams', 'useSearchParams', 'useRouter', 'usePathname'],
        answer: 1
      },
      {
        id: 2,
        q: 'What is the default rendering paradigm of page components in App Router Next.js?',
        options: ['Static Site Generation', 'Client Side Rendering', 'React Server Component', 'ISR Cache Refresh'],
        answer: 2
      }
    ],
    assignmentInstructions: 'Implement a debounce callback helper hook that pauses function triggers until 300ms of inactive input has elapsed. Submit file attachments.'
  },
  '2': {
    title: 'Full-Stack Agentic AI Engineering',
    modules: [
      {
        title: 'Module 1: Tool Integration & Function Call Loops',
        lessons: [
          { id: '2-1-1', title: 'Structuring prompt logs maps', duration: '10m', videoUrl: '', completed: true },
          { id: '2-1-2', title: 'Configuring model parsing guidelines', duration: '25m', videoUrl: '', completed: false }
        ]
      }
    ],
    quiz: [
      {
        id: 1,
        q: 'Which database indexes map vector distances efficiently for LLM lookups?',
        options: ['B-Tree indexes', 'pgvector indices', 'Full-Text Search', 'Hash tables'],
        answer: 1
      }
    ],
    assignmentInstructions: 'Construct a pgvector model table schema containing multi-dimensional embedding values. Run validation checks.'
  },
  '3': {
    title: 'Systems Programming & Wasm',
    modules: [
      {
        title: 'Module 1: Borrow Checker & Safety Guidelines',
        lessons: [
          { id: '3-1-1', title: 'Memory references models', duration: '14m', videoUrl: '', completed: true },
          { id: '3-1-2', title: 'Dynamic Pointer allocations safety', duration: '22m', videoUrl: '', completed: false }
        ]
      }
    ],
    quiz: [
      {
        id: 1,
        q: "What compiler check enforces memory safety validation inside systems programming code?",
        options: ['Garbage Collector', 'Referential Integrator', 'Borrow Checker compiler', 'JIT compiler'],
        answer: 2
      }
    ],
    assignmentInstructions: 'Declare a safe custom Vector structure implementing bounds limit validation checks. Verify compiles.'
  }
};

interface Thread {
  id: number;
  title: string;
  messages: { sender: 'user' | 'ai'; text: string }[];
}

export default function StudentCoursePlayerPage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = use(params);
  const courseId = resolvedParams.courseId;
  const course = courseDetailsData[courseId] || courseDetailsData['1'];

  const [activeTab, setActiveTab] = useState<'lessons' | 'notes' | 'quiz' | 'assignment' | 'ai-tutor'>('lessons');
  const [activeLesson, setActiveLesson] = useState<Lesson>(course.modules[0].lessons[0]);

  // Video Mock state
  const [videoProgress, setVideoProgress] = useState(45); // in seconds, Max is 300 (5 minutes)
  const [playing, setPlaying] = useState(false);

  // Notes state
  const [notes, setNotes] = useState<SavedNote[]>([
    { id: 1, timestamp: 24, text: 'Remember to implement client components when using hooks.' }
  ]);
  const [noteText, setNoteText] = useState('');

  // Quiz state
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizTimeLeft, setQuizTimeLeft] = useState(60);

  // Assignment states
  const [assignFile, setAssignFile] = useState<File | null>(null);
  const [assignProgress, setAssignProgress] = useState(-1);
  const [assignLogs, setAssignLogs] = useState<string[]>([]);
  const [assignDeadlineSeconds, setAssignDeadlineSeconds] = useState(86400);

  // AI Tutor Thread states
  const [threads, setThreads] = useState<Thread[]>([
    { id: 1, title: 'RSC vs Client Hydration', messages: [{ sender: 'ai', text: 'Hello! I can explain RSC rendering paths. Ask me anything.' }] }
  ]);
  const [activeThreadId, setActiveThreadId] = useState(1);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiStreamingText, setAiStreamingText] = useState('');
  const [aiThinking, setAiThinking] = useState(false);

  // Video timeline simulation ticker
  useEffect(() => {
    let interval: any;
    if (playing) {
      interval = setInterval(() => {
        setVideoProgress(prev => {
          if (prev >= 300) {
            setPlaying(false);
            return 300;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [playing]);

  // Quiz Timer simulation ticker
  useEffect(() => {
    if (activeTab === 'quiz' && quizScore === null && quizTimeLeft > 0) {
      const timer = setTimeout(() => setQuizTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [activeTab, quizTimeLeft, quizScore]);

  // Format second numeric offsets to MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Add notes linked to video timestamp
  const handleSaveNote = () => {
    if (!noteText.trim()) return;
    const newNote: SavedNote = {
      id: Date.now(),
      timestamp: videoProgress,
      text: noteText
    };
    setNotes(prev => [...prev, newNote]);
    setNoteText('');
  };

  // Click note to seek video progress
  const seekToTimestamp = (seconds: number) => {
    setVideoProgress(seconds);
    setPlaying(true);
  };

  // Submit Quiz Action
  const handleSubmitQuiz = () => {
    let score = 0;
    course.quiz.forEach((q, idx) => {
      if (selectedAnswers[q.id] === q.answer) {
        score++;
      }
    });
    setQuizScore(score);
  };

  // Assignment Mock Upload
  const handleUploadAssignment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setAssignFile(files[0]);
      setAssignProgress(0);
      setAssignLogs(['▲ Initiating multi-part payload packet uploads...']);

      let prog = 0;
      const interval = setInterval(() => {
        prog += 20;
        setAssignProgress(prog);
        setAssignLogs(prev => [...prev, `• Uploading chunks: ${prog}% completed.`]);
        if (prog >= 100) {
          clearInterval(interval);
          setAssignLogs(prev => [
            ...prev,
            '✓ Chunk upload payload transmission finalized.',
            '✓ Submitted to Teacher Gradebook successfully.'
          ]);
        }
      }, 300);
    }
  };

  // AI Tutor Send Prompt
  const handleSendPrompt = () => {
    if (!aiPrompt.trim()) return;

    // Auto-rename thread title if it was first message
    const currentThread = threads.find(t => t.id === activeThreadId);
    let title = currentThread?.title || 'Study Discussion';
    if (currentThread && currentThread.messages.length === 1) {
      title = aiPrompt.split(' ').slice(0, 4).join(' ') + '...';
    }

    const updatedUserMsg = { sender: 'user' as const, text: aiPrompt };
    
    // Append user message immediately
    setThreads(prev => prev.map(t => t.id === activeThreadId ? {
      ...t,
      title,
      messages: [...t.messages, updatedUserMsg]
    } : t));

    setAiThinking(true);
    const promptRef = aiPrompt;
    setAiPrompt('');

    // Simulate word-by-word streaming output response
    const mockResponses = [
      "Let's break that down. In Next.js 16, layouts preserve state and do not re-render on navigation.",
      "React Server Components fetch data directly from the server backend runtime to decrease bundle weights.",
      "Turbopack compiles your JavaScript assets instantly utilizing optimized Rust compiler pipelines."
    ];
    const targetResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    const words = targetResponse.split(' ');
    let wordIdx = 0;
    let accumulated = '';

    const interval = setInterval(() => {
      if (wordIdx < words.length) {
        accumulated += words[wordIdx] + ' ';
        setAiStreamingText(accumulated);
        wordIdx++;
      } else {
        clearInterval(interval);
        setAiThinking(false);
        setAiStreamingText('');
        // Append finalized message
        setThreads(prev => prev.map(t => t.id === activeThreadId ? {
          ...t,
          messages: [...t.messages, { sender: 'ai' as const, text: accumulated.trim() }]
        } : t));
      }
    }, 150);
  };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 text-left animate-fade-in">
      
      {/* Back button */}
      <div className="flex justify-between items-center">
        <Link 
          href="/student/dashboard"
          className="text-xs font-bold text-slate-505 hover:text-white flex items-center gap-1.5"
        >
          ← Back to Student Workspace
        </Link>
        <span className="text-xs text-slate-550 font-mono">LMS Pro Classroom v2.0.0</span>
      </div>

      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{course.title}</h1>
        <p className="text-xs text-slate-400">Current lesson: <strong className="text-violet-400">{activeLesson.title}</strong></p>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column (7): Video Screen and Tabs Navigation */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Mock Video Canvas */}
          <div className="relative aspect-video rounded-3xl bg-slate-950 border border-slate-900 overflow-hidden flex flex-col justify-end shadow-2xl">
            
            {/* Aspect center helper graphics */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-violet-650/15 flex items-center justify-center border border-violet-500/20">
                <span className="text-2xl text-violet-400 animate-pulse">{playing ? '❙❙' : '▶'}</span>
              </div>
            </div>

            {/* Video Controls Bar */}
            <div className="p-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent space-y-3 z-10">
              
              {/* Timeline Slider */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-slate-400">{formatTime(videoProgress)}</span>
                <input 
                  type="range"
                  min={0}
                  max={300}
                  value={videoProgress}
                  onChange={(e) => setVideoProgress(Number(e.target.value))}
                  className="flex-grow accent-violet-550 h-1 rounded bg-slate-800 cursor-pointer"
                />
                <span className="text-[10px] font-mono text-slate-400">05:00</span>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setPlaying(!playing)}
                  className="px-4 py-1.5 bg-violet-600 hover:bg-violet-500 text-xs font-bold text-white rounded-lg transition-colors flex items-center gap-1.5 shadow"
                >
                  {playing ? 'Pause Lecture' : 'Play Lecture'}
                </button>

                <div className="flex items-center gap-3 text-[10px] text-slate-500 font-semibold">
                  <span>Aspect: 16:9</span>
                  <span>HD 1080p</span>
                </div>
              </div>

            </div>

          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-900 pb-1.5 overflow-x-auto custom-scrollbar">
            {[
              { id: 'lessons', name: 'Lessons Index', icon: '📚' },
              { id: 'notes', name: 'Saved Notes', icon: '📝' },
              { id: 'quiz', name: 'Practice Quiz', icon: '🧠' },
              { id: 'assignment', name: 'Assignment Submit', icon: '📎' },
              { id: 'ai-tutor', name: 'AI Tutor Guide', icon: '🤖' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === tab.id 
                    ? 'bg-slate-900 text-white border border-slate-800 shadow-md' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Tab Panel contents */}
          <div className="relative pt-1">
            
            {/* LESSONS LIST INDEX */}
            {activeTab === 'lessons' && (
              <div className="space-y-4">
                {course.modules.map((mod, modIdx) => (
                  <div key={modIdx} className="glass p-5 rounded-2xl border border-slate-900 space-y-3">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">{mod.title}</h4>
                    <div className="space-y-2">
                      {mod.lessons.map(les => (
                        <button
                          key={les.id}
                          onClick={() => setActiveLesson(les)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                            activeLesson.id === les.id 
                              ? 'bg-slate-950 border-violet-500/50 text-white font-bold' 
                              : 'bg-slate-950/20 border-slate-900/60 hover:border-slate-805 text-slate-400'
                          }`}
                        >
                          <span className="text-xs">{les.title}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{les.duration}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TIMESTAMP STUDY NOTES */}
            {activeTab === 'notes' && (
              <div className="space-y-6">
                
                {/* Notes Input Drawer */}
                <div className="glass p-5 rounded-2xl border border-slate-900 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white">Save study note at timestamp:</span>
                    <span className="text-xs font-bold font-mono text-cyan-400 bg-slate-950 border border-slate-900 px-2 py-0.5 rounded">
                      {formatTime(videoProgress)}
                    </span>
                  </div>
                  <textarea
                    placeholder="Type note message..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    className="w-full h-20 p-3 bg-slate-950 border border-slate-900 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-violet-550 resize-none leading-relaxed"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveNote}
                      disabled={!noteText.trim()}
                      className="px-4 py-2 bg-violet-650 hover:bg-violet-600 disabled:bg-violet-850 text-xs font-bold text-white rounded-lg transition-colors shadow"
                    >
                      Save Note Entry
                    </button>
                  </div>
                </div>

                {/* Notes Loop list */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Saved timestamps:</h4>
                  {notes.length === 0 ? (
                    <div className="text-center py-6 text-slate-500 text-xs">No notes saved.</div>
                  ) : (
                    notes.map(note => (
                      <div 
                        key={note.id}
                        className="p-3.5 bg-slate-950/40 border border-slate-900 rounded-xl flex items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <button
                            onClick={() => seekToTimestamp(note.timestamp)}
                            className="text-[10px] font-bold font-mono text-cyan-400 hover:text-cyan-300 bg-slate-950 border border-slate-900 px-2 py-0.5 rounded flex items-center gap-1"
                          >
                            ⏱ Seek to {formatTime(note.timestamp)}
                          </button>
                          <p className="text-xs text-slate-300 pl-1 pt-1">{note.text}</p>
                        </div>
                        <button
                          onClick={() => setNotes(prev => prev.filter(n => n.id !== note.id))}
                          className="text-[10px] text-slate-500 hover:text-rose-400 font-bold px-2 py-1"
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  )}
                </div>

              </div>
            )}

            {/* QUIZ PANEL */}
            {activeTab === 'quiz' && (
              <div className="glass p-6 sm:p-8 rounded-3xl border border-slate-900 relative">
                {quizScore !== null ? (
                  <div className="text-center py-6 space-y-6">
                    <span className="text-5xl">🏆</span>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white">Quiz Completed!</h3>
                      <p className="text-xs text-slate-400">Obtained {quizScore} / {course.quiz.length} points.</p>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setQuizScore(null);
                          setSelectedAnswers({});
                          setQuizTimeLeft(60);
                        }}
                        className="px-5 py-2.5 bg-violet-650 hover:bg-violet-600 text-xs font-bold text-white rounded-xl shadow-md"
                      >
                        Retry Quiz
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-900 pb-3">
                      <span>Quiz Mode: Practice</span>
                      <span className={`font-mono text-xs ${quizTimeLeft < 15 ? 'text-rose-500 animate-pulse font-black' : 'text-cyan-400'}`}>
                        ⏳ Timer: {quizTimeLeft}s
                      </span>
                    </div>

                    {course.quiz.map((q, idx) => (
                      <div key={q.id} className="space-y-3 text-left">
                        <h4 className="text-xs sm:text-sm font-bold text-white">{idx + 1}. {q.q}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-1">
                          {q.options.map((opt, optIdx) => (
                            <button
                              key={optIdx}
                              onClick={() => setSelectedAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                              className={`p-3 text-left rounded-xl border text-xs transition-colors ${
                                selectedAnswers[q.id] === optIdx 
                                  ? 'bg-violet-950/20 border-violet-500 text-white font-bold' 
                                  : 'bg-slate-950/60 border-slate-955 hover:border-slate-805 text-slate-405'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-end pt-3">
                      <button
                        onClick={handleSubmitQuiz}
                        disabled={Object.keys(selectedAnswers).length < course.quiz.length}
                        className="px-5 py-2.5 bg-violet-650 hover:bg-violet-600 disabled:bg-violet-850 text-xs font-bold text-white rounded-xl shadow-md transition-colors"
                      >
                        Submit Practice Quiz
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ASSIGNMENT SUBMIT FILE */}
            {activeTab === 'assignment' && (
              <div className="space-y-6">
                
                {/* Guidelines */}
                <div className="glass p-5 rounded-2xl border border-slate-900 space-y-3">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Specifications</span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {course.assignmentInstructions}
                  </p>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pt-1 flex gap-4">
                    <span>Deadline: 23 hrs left</span>
                    <span>Submission: File Upload</span>
                  </div>
                </div>

                {/* Uploader Box */}
                <div className="glass p-6 rounded-2xl border border-slate-900 text-center space-y-4">
                  <div className="border-2 border-dashed border-slate-800 rounded-xl p-8 bg-slate-950/40 hover:bg-slate-955/20 transition-colors flex flex-col items-center justify-center gap-3 relative">
                    <span className="text-3xl">📁</span>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-white">Drag & drop files here</h4>
                      <p className="text-[10px] text-slate-500">Supports PDF, JSX, ZIP formats (Max 15MB)</p>
                    </div>
                    <input 
                      type="file"
                      onChange={handleUploadAssignment}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>

                  {/* Upload Progress Bar */}
                  {assignProgress >= 0 && (
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between text-[10px] text-slate-450 font-bold uppercase pl-1">
                        <span>Uploading file payload...</span>
                        <span className="text-violet-400">{assignProgress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                        <div 
                          className="h-full bg-violet-650 transition-all duration-300"
                          style={{ width: `${assignProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Submission Logs Console */}
                  {assignLogs.length > 0 && (
                    <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 font-mono text-[9px] text-left">
                      <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest block pb-1.5 border-b border-slate-900/60 mb-2">
                        Telemetry upload console
                      </span>
                      <div className="space-y-1 h-16 overflow-y-auto custom-scrollbar">
                        {assignLogs.map((log, idx) => (
                          <p 
                            key={idx}
                            className={log.startsWith('✓') ? 'text-emerald-400 font-semibold' : 'text-slate-500'}
                          >
                            {log}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

              </div>
            )}

            {/* AI CONCEPT TUTOR CHATBOT */}
            {activeTab === 'ai-tutor' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch h-[480px]">
                
                {/* Threads Sidebar (4) */}
                <div className="md:col-span-4 glass rounded-2xl border border-slate-900 p-4 flex flex-col justify-between h-full overflow-hidden">
                  <div className="space-y-4 flex-grow overflow-y-auto custom-scrollbar pr-1">
                    <span className="text-[9px] font-bold text-slate-550 uppercase tracking-widest block pl-1">Conversations</span>
                    <div className="space-y-2">
                      {threads.map(t => (
                        <button
                          key={t.id}
                          onClick={() => {
                            setActiveThreadId(t.id);
                            setAiStreamingText('');
                          }}
                          className={`w-full text-left p-2.5 rounded-lg border text-xs truncate transition-colors block ${
                            activeThreadId === t.id 
                              ? 'bg-slate-950 border-violet-500/40 text-violet-300 font-bold' 
                              : 'bg-slate-950/20 border-slate-900 hover:border-slate-805 text-slate-500'
                          }`}
                        >
                          💬 {t.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const newId = Date.now();
                      setThreads(prev => [...prev, { id: newId, title: 'New Conversation', messages: [{ sender: 'ai', text: 'Hello! I can explain code syntax and algorithms. Ask me a question.' }] }]);
                      setActiveThreadId(newId);
                      setAiStreamingText('');
                    }}
                    className="w-full py-2 bg-slate-950 border border-slate-900 hover:border-slate-805 text-slate-400 hover:text-white text-[10px] font-bold rounded-lg transition-colors mt-4 flex-shrink-0"
                  >
                    + New Thread
                  </button>
                </div>

                {/* Chat dialogue window (8) */}
                <div className="md:col-span-8 glass rounded-2xl border border-slate-900 flex flex-col justify-between h-full overflow-hidden">
                  
                  {/* Messages list */}
                  <div className="flex-grow p-4 space-y-4 overflow-y-auto custom-scrollbar">
                    {threads.find(t => t.id === activeThreadId)?.messages.map((msg, idx) => (
                      <div 
                        key={idx}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                          msg.sender === 'user' 
                            ? 'bg-violet-650 text-white rounded-br-none' 
                            : 'bg-slate-950/80 border border-slate-900 text-slate-300 rounded-bl-none'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}

                    {/* Streaming Text */}
                    {aiStreamingText && (
                      <div className="flex justify-start">
                        <div className="max-w-[85%] bg-slate-950/80 border border-slate-900 text-slate-300 rounded-2xl rounded-bl-none p-3.5 text-xs leading-relaxed">
                          {aiStreamingText}
                          <span className="w-1.5 h-3 bg-violet-405 inline-block animate-pulse ml-0.5" />
                        </div>
                      </div>
                    )}

                    {aiThinking && !aiStreamingText && (
                      <div className="flex justify-start">
                        <div className="bg-slate-950/80 border border-slate-900 text-slate-500 rounded-2xl rounded-bl-none p-3 text-xs flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-bounce" />
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-bounce delay-100" />
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-bounce delay-200" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input field box */}
                  <div className="p-3 bg-slate-950 border-t border-slate-900 flex gap-2 flex-shrink-0">
                    <input
                      type="text"
                      placeholder="Ask concept explanations..."
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
                      className="flex-grow bg-slate-900/60 border border-slate-805 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-550"
                    />
                    <button
                      onClick={handleSendPrompt}
                      disabled={!aiPrompt.trim()}
                      className="px-4 bg-violet-650 hover:bg-violet-600 disabled:bg-violet-850 text-xs font-bold text-white rounded-xl transition-colors"
                    >
                      Send
                    </button>
                  </div>

                </div>

              </div>
            )}

          </div>

        </div>

        {/* Right Column (4): Classroom Sidebar - Modules list navigation */}
        <div className="lg:col-span-4 flex flex-col">
          
          <div className="glass p-5 rounded-3xl border border-slate-900 flex-grow flex flex-col justify-between">
            
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-slate-550 uppercase tracking-widest block pl-1">Course Curriculum</span>
              
              <div className="space-y-4 overflow-y-auto max-h-[400px] custom-scrollbar pr-1">
                {course.modules.map((mod, modIdx) => (
                  <div key={modIdx} className="space-y-2">
                    <h5 className="text-[10px] font-bold text-slate-450 uppercase pl-1">{mod.title}</h5>
                    <div className="space-y-1.5">
                      {mod.lessons.map(les => (
                        <button
                          key={les.id}
                          onClick={() => {
                            setActiveLesson(les);
                            setVideoProgress(0);
                            setPlaying(true);
                          }}
                          className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                            activeLesson.id === les.id 
                              ? 'bg-slate-950 border-violet-500/40 text-white font-bold' 
                              : 'bg-slate-950/20 border-slate-900/40 hover:border-slate-805 text-slate-500'
                          }`}
                        >
                          <div className="flex items-center gap-2 text-xs truncate">
                            <span className={`w-3.5 h-3.5 rounded-full border text-[8px] flex items-center justify-center font-bold flex-shrink-0 ${
                              les.completed 
                                ? 'border-emerald-500/20 bg-emerald-950/30 text-emerald-450' 
                                : 'border-slate-800 text-transparent'
                            }`}>
                              ✓
                            </span>
                            <span className="truncate">{les.title}</span>
                          </div>
                          <span className="text-[9px] font-mono text-slate-650 flex-shrink-0">{les.duration}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-900/60 mt-6 flex justify-between items-center flex-wrap gap-2 text-[10px] text-slate-500 font-semibold uppercase">
              <span>Syllabus: complete</span>
              <span className="text-emerald-450 font-bold">1 / 4 Complete</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
