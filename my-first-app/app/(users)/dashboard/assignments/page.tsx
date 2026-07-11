"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface Assignment {
  id: number;
  courseId: string;
  title: string;
  course: string;
  dueDate: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'completed' | 'in-progress' | 'locked';
  grade?: string;
  instructions: string;
}

const initialAssignments: Assignment[] = [
  {
    id: 1,
    courseId: '1',
    title: 'Build Debounce & Throttle Hook',
    course: 'Advanced Next.js 16',
    dueDate: 'Jul 15, 2026',
    difficulty: 'Medium',
    status: 'in-progress',
    instructions: 'Write a custom React hook that debounces state changes to prevent excess rendering cycles during text inputs. Verify compile checks.'
  },
  {
    id: 2,
    courseId: '2',
    title: 'Setup pgvector Database schemas',
    course: 'Full-Stack Agentic AI Engineering',
    dueDate: 'Jul 18, 2026',
    difficulty: 'Hard',
    status: 'locked',
    instructions: 'Design postgres tables mapping course data indexes. Generate embedding column indexes utilizing pgvector.'
  },
  {
    id: 3,
    courseId: '4',
    title: 'Fluid typography styling tokens',
    course: 'Tailwind CSS v4 Design Systems',
    dueDate: 'Jul 12, 2026',
    difficulty: 'Easy',
    status: 'completed',
    grade: '98%',
    instructions: 'Configure custom font declarations inside Tailwind v4 CSS variables. Create clamp rules for header responsiveness.'
  },
  {
    id: 4,
    courseId: '1',
    title: 'Create Middleware Authorization rules',
    course: 'Advanced Next.js 16',
    dueDate: 'Jul 20, 2026',
    difficulty: 'Hard',
    status: 'locked',
    instructions: 'Write a Next.js edge middleware that reads JWT tokens from request headers and routes traffic between public and user paths.'
  },
  {
    id: 5,
    courseId: '2',
    title: 'Build Multi-Agent Node supervisor',
    course: 'Full-Stack Agentic AI Engineering',
    dueDate: 'Jul 22, 2026',
    difficulty: 'Medium',
    status: 'in-progress',
    instructions: 'Build a supervisor agent that routes tasks to specialist subagents (developer, tester, writer) and outputs compiled logs.'
  }
];

const courseNames: Record<string, string> = {
  '1': 'Advanced Next.js 16',
  '2': 'Full-Stack Agentic AI Engineering',
  '3': 'Systems Programming & Wasm',
  '4': 'Tailwind CSS v4 Design Systems'
};

function AssignmentsContent() {
  const searchParams = useSearchParams();
  const courseIdParam = searchParams.get('courseId');

  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [submittingId, setSubmittingId] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState<string>('');

  const handleMockSubmit = (id: number) => {
    setSubmittingId(id);
    setSuccessMsg('');

    setTimeout(() => {
      setSubmittingId(null);
      setSuccessMsg(`Assignment #${id} submitted successfully! Our automated test suite passed compiled logs.`);
      setAssignments(prev => prev.map(a => a.id === id ? { ...a, status: 'completed', grade: 'Pending Grading' } : a));
    }, 1500);
  };

  // 1. Filter by courseId if query parameter is present
  const courseFiltered = courseIdParam 
    ? assignments.filter(a => a.courseId === courseIdParam)
    : assignments;

  // 2. Filter by status tabs
  const filtered = courseFiltered.filter(a => {
    if (activeFilter === 'completed') return a.status === 'completed';
    if (activeFilter === 'pending') return a.status === 'in-progress' || a.status === 'locked';
    return true;
  });

  const courseNameTitle = courseIdParam ? courseNames[courseIdParam] || 'Selected Track' : 'All Courses';

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto space-y-8 text-left">
      
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Active Assignments</h1>
        <p className="text-sm text-slate-400">
          Showing assignments for: <span className="text-cyan-400 font-bold">{courseNameTitle}</span>
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-between items-center border-b border-slate-900 pb-2">
        <div className="flex gap-2">
          {[
            { id: 'all', name: 'All Tasks' },
            { id: 'pending', name: 'Pending / In Progress' },
            { id: 'completed', name: 'Completed / Graded' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeFilter === tab.id 
                  ? 'bg-slate-900 text-white' 
                  : 'text-slate-500 hover:text-slate-355'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Success notification */}
      {successMsg && (
        <div className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 p-4 rounded-xl text-xs font-semibold animate-fade-in">
          ✓ {successMsg}
        </div>
      )}

      {/* Assignment Stack */}
      {filtered.length === 0 ? (
        <div className="text-center py-10 text-slate-500">
          No assignments found matching this status filter.
        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map((item) => (
            <div 
              key={item.id}
              className="glass p-6 rounded-2xl border border-slate-900 relative flex flex-col md:flex-row justify-between gap-6 items-start"
            >
              
              {/* Left side details */}
              <div className="space-y-3 flex-grow text-left">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-900 text-cyan-400 font-bold uppercase">
                    {item.course}
                  </span>
                  
                  {/* Difficulty tag */}
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                    item.difficulty === 'Easy' ? 'border-emerald-500/20 bg-emerald-950/30 text-emerald-400' :
                    item.difficulty === 'Medium' ? 'border-violet-500/20 bg-violet-950/30 text-violet-400' :
                    'border-rose-500/20 bg-rose-950/30 text-rose-400'
                  }`}>
                    {item.difficulty}
                  </span>

                  {/* Status indicator */}
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                    item.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' :
                    item.status === 'in-progress' ? 'bg-amber-500/10 text-amber-400 animate-pulse' :
                    'bg-slate-900 text-slate-500'
                  }`}>
                    {item.status === 'completed' ? 'Completed' :
                     item.status === 'in-progress' ? 'In Progress' : 'Locked'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">{item.instructions}</p>

                <div className="flex items-center gap-4 text-[10px] text-slate-500 font-semibold pt-1">
                  <span>Due Date: {item.dueDate}</span>
                  {item.grade && <span className="text-emerald-400">Grade: {item.grade}</span>}
                </div>
              </div>

              {/* Right side Submission button */}
              <div className="w-full md:w-auto flex-shrink-0 flex items-center md:self-center">
                {item.status === 'locked' ? (
                  <button
                    disabled
                    className="w-full md:w-auto px-5 py-2.5 bg-slate-900 border border-slate-950 rounded-xl text-xs font-bold text-slate-600 flex items-center justify-center gap-1.5 cursor-not-allowed"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Locked</span>
                  </button>
                ) : item.status === 'completed' ? (
                  <button
                    disabled
                    className="w-full md:w-auto px-5 py-2.5 bg-slate-900/60 border border-slate-900 rounded-xl text-xs font-bold text-emerald-500 cursor-default"
                  >
                    Submitted
                  </button>
                ) : (
                  <button
                    onClick={() => handleMockSubmit(item.id)}
                    disabled={submittingId !== null}
                    className="w-full md:w-auto px-5 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:bg-violet-850 text-xs font-bold text-white rounded-xl shadow-md transition-colors"
                  >
                    {submittingId === item.id ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Submit Code</span>
                    )}
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default function AssignmentsPage() {
  return (
    <Suspense fallback={
      <div className="p-8 text-center text-slate-450 font-semibold">
        Loading assignments...
      </div>
    }>
      <AssignmentsContent />
    </Suspense>
  );
}
