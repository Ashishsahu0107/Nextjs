"use client";

import React, { useState } from 'react';

interface MockSubmission {
  id: number;
  studentEmail: string;
  courseTitle: string;
  fileAttached: string;
  submittedAt: string;
  status: 'pending' | 'graded';
  grade?: string;
  feedback?: string;
}

const initialSubmissions: MockSubmission[] = [
  { id: 1, studentEmail: 'student@apex.academy', courseTitle: 'Advanced Next.js 16 & Server Actions', fileAttached: 'DebounceHook.jsx', submittedAt: '10 mins ago', status: 'pending' },
  { id: 2, studentEmail: 'liam@apex.academy', courseTitle: 'Full-Stack Agentic AI Engineering', fileAttached: 'pgvector_indexing.sql', submittedAt: '2 hrs ago', status: 'pending' },
  { id: 3, studentEmail: 'ashley@apex.academy', courseTitle: 'Systems Programming & Wasm', fileAttached: 'custom_vector.rs', submittedAt: '1 day ago', status: 'graded', grade: '95%', feedback: 'Excellent memory bounds checking logic.' }
];

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState<'gradebook' | 'builder' | 'analytics'>('gradebook');
  const [submissions, setSubmissions] = useState<MockSubmission[]>(initialSubmissions);
  const [feedbackInputs, setFeedbackInputs] = useState<Record<number, { grade: string; feedback: string }>>({});

  // Course Builder States
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Web Development');
  const [newLevel, setNewLevel] = useState('Advanced');
  const [newDuration, setNewDuration] = useState('');
  const [builderLogs, setBuilderLogs] = useState<string[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublishCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDuration.trim()) return;

    setIsPublishing(true);
    setBuilderLogs(['▲ Initializing course parameters schema...', '• Compiling modules blueprints...']);

    setTimeout(() => {
      setIsPublishing(false);
      setBuilderLogs(prev => [
        ...prev,
        '✓ Course structure compiled cleanly.',
        `✓ SUCCESS  "${newTitle}" published successfully into catalog lists.`
      ]);
      setNewTitle('');
      setNewDuration('');
    }, 1500);
  };

  const handleGradeSubmit = (id: number) => {
    const input = feedbackInputs[id];
    if (!input || !input.grade.trim()) return;

    setSubmissions(prev =>
      prev.map(sub => sub.id === id ? { ...sub, status: 'graded', grade: input.grade, feedback: input.feedback } : sub)
    );
  };

  const handleFeedbackChange = (id: number, key: 'grade' | 'feedback', val: string) => {
    setFeedbackInputs(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        grade: key === 'grade' ? val : prev[id]?.grade || '',
        feedback: key === 'feedback' ? val : prev[id]?.feedback || ''
      }
    }));
  };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 text-left animate-fade-in">
      
      {/* Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-violet-950/20 to-slate-900 p-6 sm:p-8 border border-slate-800 shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="space-y-1.5">
            <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              Instructor Workspace Console 🎓
            </h1>
            <p className="text-xs text-slate-400">Add course tracks, define syllabus exercises, and review student portfolios.</p>
          </div>

          {/* Earnings / Telemetry Stats */}
          <div className="flex gap-4 sm:gap-6 flex-wrap">
            <div className="bg-slate-950/80 px-4.5 py-3 border border-slate-900 rounded-2xl min-w-[90px]">
              <span className="text-[9px] font-bold text-slate-550 uppercase tracking-widest block">Submissions</span>
              <span className="text-lg font-black text-violet-405 mt-1 block">
                {submissions.filter(s => s.status === 'pending').length} Pending
              </span>
            </div>
            <div className="bg-slate-950/80 px-4.5 py-3 border border-slate-900 rounded-2xl min-w-[90px]">
              <span className="text-[9px] font-bold text-slate-550 uppercase tracking-widest block">Earnings</span>
              <span className="text-lg font-black text-emerald-400 mt-1 block">$8,420 / mo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-900 pb-1.5 overflow-x-auto custom-scrollbar">
        {[
          { id: 'gradebook', name: 'Student Gradebook', icon: '📝' },
          { id: 'builder', name: 'Create Course Builder', icon: '➕' },
          { id: 'analytics', name: 'Earnings & Analytics', icon: '📊' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === tab.id 
                ? 'bg-slate-900 text-white border border-slate-800 shadow' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="relative pt-2">
        
        {/* STUDENT GRADEBOOK */}
        {activeTab === 'gradebook' && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-505 uppercase tracking-widest pl-1">
              Review Homework Submissions:
            </h3>

            {submissions.map((sub) => (
              <div 
                key={sub.id} 
                className="glass p-5 rounded-2xl border border-slate-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="space-y-2 flex-grow">
                  <div className="flex gap-2 items-center">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-900 text-cyan-405 font-bold uppercase">
                      {sub.courseTitle}
                    </span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                      sub.status === 'graded' ? 'bg-emerald-500/10 text-emerald-450' : 'bg-amber-500/10 text-amber-450 animate-pulse'
                    }`}>
                      {sub.status === 'graded' ? 'Graded' : 'Needs Review'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white pl-0.5">{sub.studentEmail}</h4>
                  <p className="text-xs text-slate-450 pl-0.5">
                    File submitted: <strong className="text-violet-400 font-mono text-[11px]">{sub.fileAttached}</strong> ({sub.submittedAt})
                  </p>

                  {sub.status === 'graded' && (
                    <div className="mt-3 p-3.5 bg-slate-950 border border-slate-900 rounded-xl text-xs space-y-1 pl-3">
                      <p className="text-slate-400">Grade: <strong className="text-emerald-450">{sub.grade}</strong></p>
                      <p className="text-slate-500">Feedback: "{sub.feedback}"</p>
                    </div>
                  )}
                </div>

                {sub.status === 'pending' && (
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0 items-end sm:items-center">
                    <div className="space-y-1.5 w-full sm:w-[80px]">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Grade</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 95%"
                        value={feedbackInputs[sub.id]?.grade || ''}
                        onChange={(e) => handleFeedbackChange(sub.id, 'grade', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-900 rounded-lg text-xs text-white focus:outline-none focus:border-violet-550"
                      />
                    </div>
                    <div className="space-y-1.5 w-full sm:w-[180px]">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Review Comments</label>
                      <input 
                        type="text" 
                        placeholder="Well written code hooks..."
                        value={feedbackInputs[sub.id]?.feedback || ''}
                        onChange={(e) => handleFeedbackChange(sub.id, 'feedback', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-900 rounded-lg text-xs text-white focus:outline-none focus:border-violet-550"
                      />
                    </div>
                    <button
                      onClick={() => handleGradeSubmit(sub.id)}
                      className="px-4 py-2 bg-violet-650 hover:bg-violet-600 text-xs font-bold text-white rounded-lg shadow-md transition-colors w-full sm:w-auto h-[34px] flex items-center justify-center"
                    >
                      Verify
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* CREATE COURSE BUILDER */}
        {activeTab === 'builder' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Column (7) */}
            <div className="lg:col-span-7 glass p-5 sm:p-6 rounded-3xl border border-slate-900 space-y-6">
              <span className="text-xs font-bold text-slate-550 uppercase tracking-widest pl-1">New Syllabus Registry</span>
              
              <form onSubmit={handlePublishCourse} className="space-y-4">
                
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Course Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Advanced Rust System Interfaces"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-900 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-violet-550"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Category */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-900 rounded-xl text-xs text-white focus:outline-none focus:border-violet-550"
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="Artificial Intelligence">Artificial Intelligence</option>
                      <option value="Systems Programming">Systems Programming</option>
                    </select>
                  </div>

                  {/* Level */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-505 uppercase tracking-wider pl-1">Difficulty Level</label>
                    <select
                      value={newLevel}
                      onChange={(e) => setNewLevel(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-900 rounded-xl text-xs text-white focus:outline-none focus:border-violet-550"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                </div>

                {/* Duration */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Duration (Hours)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 24 Hours"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-900 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-violet-550"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPublishing}
                  className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-xs font-bold text-white rounded-xl shadow-md transition-colors"
                >
                  {isPublishing ? 'Publishing course...' : 'Publish Course into Catalog'}
                </button>

              </form>
            </div>

            {/* Console Output (5) */}
            <div className="lg:col-span-5 flex flex-col h-full">
              <div className="glass p-5 rounded-3xl border border-slate-900 flex-grow min-h-[220px] flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[9px] font-bold text-slate-550 uppercase tracking-widest block pl-1">Telemetry log console</span>
                  
                  <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 font-mono text-[9px] text-left space-y-1.5 h-44 overflow-y-auto custom-scrollbar">
                    {builderLogs.length === 0 ? (
                      <p className="text-slate-650">Waiting for publication action trigger parameters...</p>
                    ) : (
                      builderLogs.map((log, idx) => (
                        <p 
                          key={idx}
                          className={log.startsWith('✓') ? 'text-emerald-400 font-semibold' : 'text-slate-500'}
                        >
                          {log}
                        </p>
                      ))
                    )}
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 leading-relaxed font-semibold pl-1">
                  Once published, courses automatically append to the active Student dashboard lists.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* EARNINGS ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            
            <div className="glass p-6 rounded-2xl border border-slate-900 text-center space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Course Enrollments</span>
              <span className="text-2xl font-black text-white block">3,120</span>
              <span className="text-[9px] text-emerald-405 font-bold block">▲ +12% this month</span>
            </div>

            <div className="glass p-6 rounded-2xl border border-slate-900 text-center space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Completed Certificates</span>
              <span className="text-2xl font-black text-white block">480</span>
              <span className="text-[9px] text-cyan-405 font-bold block">▲ +18% course-level completions</span>
            </div>

            <div className="glass p-6 rounded-2xl border border-slate-900 text-center space-y-2">
              <span className="text-[10px] font-bold text-slate-550 uppercase tracking-wider block">Student Success Rate</span>
              <span className="text-2xl font-black text-white block">94.8%</span>
              <span className="text-[9px] text-slate-500 font-bold block">Cohort average</span>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
