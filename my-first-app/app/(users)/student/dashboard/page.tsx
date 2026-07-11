"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  category: string;
  level: string;
  progress: number;
  duration: string;
  enrolled: string;
  rating: number;
  author: { name: string; avatarBg: string; avatarText: string };
  gradient: string;
}

const initialCourses: Course[] = [
  {
    id: '1',
    title: 'Advanced Next.js 16 & Server Actions',
    category: 'Web Development',
    level: 'Advanced',
    progress: 68,
    duration: '22 Hours',
    enrolled: '14.2k',
    rating: 4.9,
    author: { name: 'Dan Abramov', avatarBg: 'bg-violet-600', avatarText: 'DA' },
    gradient: 'from-violet-600 to-indigo-750'
  },
  {
    id: '2',
    title: 'Full-Stack Agentic AI Engineering',
    category: 'Artificial Intelligence',
    level: 'Advanced',
    progress: 25,
    duration: '35 Hours',
    enrolled: '8.4k',
    rating: 4.85,
    author: { name: 'Harrison Chase', avatarBg: 'bg-cyan-650', avatarText: 'HC' },
    gradient: 'from-cyan-600 to-teal-750'
  },
  {
    id: '3',
    title: 'Systems Programming & Wasm',
    category: 'Systems Programming',
    level: 'Advanced',
    progress: 0,
    duration: '28 Hours',
    enrolled: '5.1k',
    rating: 4.92,
    author: { name: 'Ashley Williams', avatarBg: 'bg-emerald-600', avatarText: 'AW' },
    gradient: 'from-emerald-600 to-teal-800'
  }
];

export default function StudentDashboard() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [activeTab, setActiveTab] = useState<'enrolled' | 'catalog'>('enrolled');

  // Enrolling trigger for catalog items (with progress 0 initially)
  const handleEnroll = (id: string) => {
    setCourses(prev =>
      prev.map(c => c.id === id && c.progress === 0 ? { ...c, progress: 5 } : c)
    );
  };

  const enrolledCourses = courses.filter(c => c.progress > 0);
  const catalogCourses = courses;

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 text-left animate-fade-in">
      
      {/* Gamification Dashboard Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 sm:p-8 border border-slate-800 shadow-xl overflow-hidden">
        
        {/* Glow indicators */}
        <div className="absolute top-[-30%] right-[-10%] w-[250px] h-[250px] rounded-full bg-violet-650/10 blur-[50px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          
          {/* Welcome Text */}
          <div className="space-y-1.5">
            <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              Welcome back, Ashish! 👋
            </h1>
            <p className="text-xs text-slate-400">Keep coding to maintain your daily streak and earn milestones.</p>
          </div>

          {/* Gamified telemetry stats */}
          <div className="flex gap-4 sm:gap-6 flex-wrap">
            
            {/* XP Points */}
            <div className="bg-slate-950/80 px-4.5 py-3 border border-slate-900 rounded-2xl text-left min-w-[90px]">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Total XP</span>
              <span className="text-lg font-black text-violet-400 mt-1 block">420 XP</span>
            </div>

            {/* Streak Counter */}
            <div className="bg-slate-950/80 px-4.5 py-3 border border-slate-900 rounded-2xl text-left min-w-[90px]">
              <span className="text-[9px] font-bold text-slate-505 uppercase tracking-widest block">Streak</span>
              <span className="text-lg font-black text-amber-500 mt-1 block flex items-center gap-1">
                🔥 7 Days
              </span>
            </div>

            {/* Current Level Rank */}
            <div className="bg-slate-950/80 px-4.5 py-3 border border-slate-900 rounded-2xl text-left min-w-[90px]">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Rank</span>
              <span className="text-lg font-black text-cyan-400 mt-1 block">Master III</span>
            </div>

          </div>
        </div>

        {/* Milestones Achievement Badges */}
        <div className="mt-6 pt-4 border-t border-slate-800/40 flex items-center gap-3 flex-wrap">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Achievements:</span>
          {[
            { label: '🚀 Code Novice', desc: 'First lab verified' },
            { label: '🔥 Streak Starter', desc: 'Logged in 7 days' },
            { label: '🧠 Quiz Master', desc: 'Perfect score quiz' }
          ].map((badge, idx) => (
            <div 
              key={idx} 
              title={badge.desc}
              className="px-3 py-1 bg-violet-950/20 border border-violet-500/20 rounded-full text-[10px] text-violet-300 font-bold hover:bg-violet-900/10 transition-colors cursor-help"
            >
              {badge.label}
            </div>
          ))}
        </div>

      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (8): Course catalog / enrolled items */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Segment Toggle */}
          <div className="flex gap-2 border-b border-slate-900 pb-2">
            <button
              onClick={() => setActiveTab('enrolled')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'enrolled' 
                  ? 'bg-slate-900 text-white border border-slate-800' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              My Enrolled Courses ({enrolledCourses.length})
            </button>
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'catalog' 
                  ? 'bg-slate-900 text-white border border-slate-800' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Explore Course Catalog
            </button>
          </div>

          {/* Courses Container Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeTab === 'enrolled' ? (
              enrolledCourses.length === 0 ? (
                <div className="col-span-2 text-center py-12 bg-slate-955/20 border border-dashed border-slate-900 rounded-2xl text-slate-500 text-xs">
                  You are not enrolled in any courses yet. Switch to "Explore Course Catalog" to enroll.
                </div>
              ) : (
                enrolledCourses.map(course => (
                  <Link
                    key={course.id}
                    href={`/student/course/${course.id}`}
                    className="p-5 rounded-2xl border border-slate-900 bg-slate-950/40 hover:border-violet-500/60 hover:bg-slate-900/10 hover:shadow-[0_0_20px_rgba(139,92,246,0.08)] transition-all duration-300 flex flex-col justify-between text-left group"
                  >
                    <div className="space-y-3 w-full">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-900 text-cyan-405 font-bold uppercase">
                          {course.category}
                        </span>
                        <span className="text-[9px] font-bold text-violet-400 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>Enter Player</span>
                          <span>→</span>
                        </span>
                      </div>
                      <h3 className="font-extrabold text-sm text-white mt-1 group-hover:text-violet-400 transition-colors leading-snug">
                        {course.title}
                      </h3>
                      <p className="text-[10px] text-slate-500">Instructor: {course.author.name}</p>
                    </div>

                    <div className="w-full mt-5 space-y-1.5">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Course Progress</span>
                        <span className="font-bold text-white">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-900">
                        <div 
                          className="bg-gradient-to-r from-violet-650 to-cyan-500 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </Link>
                ))
              )
            ) : (
              catalogCourses.map(course => {
                const isAlreadyEnrolled = course.progress > 0;
                return (
                  <div
                    key={course.id}
                    className="p-5 rounded-2xl border border-slate-900 bg-slate-950/40 flex flex-col justify-between text-left relative"
                  >
                    <div className="space-y-3 w-full">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-900 text-cyan-405 font-bold uppercase">
                          {course.category}
                        </span>
                        <span className="text-[9px] text-slate-500 font-bold">{course.level}</span>
                      </div>
                      <h3 className="font-extrabold text-sm text-white leading-snug">
                        {course.title}
                      </h3>
                      <p className="text-[10px] text-slate-500">Instructor: {course.author.name}</p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-900/60 flex items-center justify-between gap-4 w-full">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-550 uppercase tracking-wider font-semibold">Rating</span>
                        <span className="text-xs font-bold text-amber-400">★ {course.rating}</span>
                      </div>

                      {isAlreadyEnrolled ? (
                        <Link
                          href={`/student/course/${course.id}`}
                          className="px-4 py-2 bg-violet-650 hover:bg-violet-600 text-xs font-bold text-white rounded-xl shadow-sm transition-all"
                        >
                          Workspace →
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleEnroll(course.id)}
                          className="px-4 py-2 bg-slate-950 border border-slate-900 hover:bg-violet-600 hover:border-violet-605 hover:text-white text-slate-305 text-xs font-bold rounded-xl transition-all"
                        >
                          Enroll Now
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* Right Column (4): Leaderboards and Checklists */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Streak Leaderboard */}
          <div className="glass p-5 rounded-3xl border border-slate-900 space-y-4">
            <h3 className="text-xs font-bold text-slate-450 uppercase tracking-widest pl-1">
              🏆 Student Leaderboard
            </h3>
            
            <div className="space-y-3">
              {[
                { name: 'Liam Devlin', xp: '1,420 XP', rank: 1, avatarBg: 'bg-cyan-550', avatarText: 'LD' },
                { name: 'Ashley Williams', xp: '1,280 XP', rank: 2, avatarBg: 'bg-emerald-650', avatarText: 'AW' },
                { name: 'Ashish (You)', xp: '420 XP', rank: 3, avatarBg: 'bg-violet-650', avatarText: 'AS' },
                { name: 'Dan Abramov', xp: '350 XP', rank: 4, avatarBg: 'bg-indigo-650', avatarText: 'DA' }
              ].map((student, idx) => (
                <div 
                  key={idx}
                  className={`flex items-center justify-between p-2.5 rounded-xl border ${
                    student.rank === 3 
                      ? 'bg-violet-950/10 border-violet-500/20' 
                      : 'bg-slate-950/30 border-slate-950/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7.5 h-7.5 rounded-full ${student.avatarBg} flex items-center justify-center font-bold text-[10px] text-white shadow-sm`}>
                      {student.avatarText}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{student.name}</h4>
                      <p className="text-[9px] text-slate-500 font-semibold">{student.xp}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    student.rank === 1 ? 'bg-amber-500/10 text-amber-400' :
                    student.rank === 2 ? 'bg-slate-400/10 text-slate-350' :
                    'bg-slate-950 text-slate-500'
                  }`}>
                    #{student.rank}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Daily micro learning tasks */}
          <div className="glass p-5 rounded-3xl border border-slate-900 space-y-3">
            <h3 className="text-xs font-bold text-slate-450 uppercase tracking-widest pl-1">
              📝 Daily Tasks
            </h3>
            <div className="space-y-2">
              {[
                { task: 'Complete 1 coding lab lecture', done: true },
                { task: 'Verify a JavaScript code parameter', done: false },
                { task: 'Ask AI study guide tutor a prompt', done: false }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-955/20 transition-colors">
                  <span className={`w-4 h-4 rounded-full border text-[9px] flex items-center justify-center font-bold flex-shrink-0 ${
                    item.done 
                      ? 'border-emerald-500/20 bg-emerald-950/30 text-emerald-450' 
                      : 'border-slate-800 text-transparent'
                  }`}>
                    ✓
                  </span>
                  <span className={`text-xs font-semibold ${item.done ? 'text-slate-500 line-through' : 'text-slate-350'}`}>
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
