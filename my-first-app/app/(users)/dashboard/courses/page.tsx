"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Course {
  id: number;
  title: string;
  category: 'webdev' | 'ai' | 'systems';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  rating: number;
  enrolled: string;
  desc: string;
  author: { name: string; avatarBg: string; avatarText: string };
  gradient: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'webdev' | 'ai' | 'systems'>('all');
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/courses');
        if (res.ok) {
          const data = await res.json();
          // Adding descriptions since they are helpful for the detail page
          const detailed = data.map((c: any) => ({
            ...c,
            desc: c.id === 1 ? 'Master caching, dynamic rendering, and Server Actions inside Next.js 16.' :
                  c.id === 2 ? 'Design reasoning agents that utilize tool integrations and coordinate complex sub-tasks.' :
                  c.id === 3 ? 'A fast-paced guide to systems programming, compile safety, and Wasm for web devs.' :
                  c.id === 4 ? 'Build responsive fluid tokens and modern grids inside Tailwind CSS v4.' :
                  c.id === 5 ? 'Connect Pinecone vector structures and prompt structures to construct custom knowledge engines.' :
                  'Orchestrate cluster meshes, pod replication controllers, ingress layers, and stage integrations.'
          }));
          setCourses(detailed);
        }
      } catch (err) {
        console.error('Failed to load courses:', err);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = (id: number) => {
    if (enrolledCourses.includes(id)) return;
    setEnrolledCourses(prev => [...prev, id]);
  };

  const filtered = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Explore Courses</h1>
        <p className="text-sm text-slate-400">Expand your technical depth. Filter, search, and enroll in interactive cohorts.</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-slate-900/30 p-4 rounded-2xl border border-slate-900">
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search courses, frameworks, skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
          />
          <svg className="w-4 h-4 text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', name: 'All Domains' },
            { id: 'webdev', name: 'Web Dev' },
            { id: 'ai', name: 'Generative AI' },
            { id: 'systems', name: 'Systems/Cloud' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                categoryFilter === cat.id 
                  ? 'bg-violet-600 text-white shadow-md' 
                  : 'bg-slate-950 hover:bg-slate-900 text-slate-450 border border-slate-900 hover:border-slate-850'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((course) => {
          const isEnrolled = enrolledCourses.includes(course.id);
          return (
            <div 
              key={course.id} 
              className="glass p-5 rounded-2xl border border-slate-900 hover:border-slate-800 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between text-left group"
            >
              
              {/* Graphic Card */}
              <div className={`relative h-40 rounded-xl bg-gradient-to-tr ${course.gradient} flex items-center justify-center p-6 border border-white/5 overflow-hidden`}>
                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" />
                
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id={`course-grid-${course.id}`} width="16" height="16" patternUnits="userSpaceOnUse">
                      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#course-grid-${course.id})`} />
                </svg>

                <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950/90 text-cyan-400 border border-slate-900">
                  {course.level}
                </span>

                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-slate-950/90 px-2 py-0.5 rounded border border-slate-900 text-[10px] font-bold text-amber-400">
                  <span>★</span>
                  <span>{course.rating}</span>
                </div>

                <div className="relative z-10 font-bold text-base text-white text-center leading-snug drop-shadow-md">
                  {course.title.split(': ')[0]}
                </div>
              </div>

              {/* Title & Desc */}
              <div className="mt-5 space-y-2">
                <Link href={`/dashboard/courses/${course.id}`} className="block group/title">
                  <h3 className="font-bold text-base text-white leading-snug group-hover/title:text-violet-400 transition-colors flex items-center gap-1">
                    <span>{course.title}</span>
                    <span className="text-[11px] text-violet-400 font-normal">→</span>
                  </h3>
                </Link>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {course.desc}
                </p>
                
                {/* Details line */}
                <div className="flex items-center gap-4 text-[10px] text-slate-500 font-semibold pt-1">
                  <div className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{course.enrolled} Enrolled</span>
                  </div>
                </div>
              </div>

              {/* Author & CTA Button */}
              <div className="mt-6 pt-4 border-t border-slate-900/60 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-7.5 h-7.5 rounded-full ${course.author.avatarBg} flex items-center justify-center font-bold text-[10px] text-white`}>
                    {course.author.avatarText}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-350">{course.author.name}</span>
                </div>

                {isEnrolled ? (
                  <Link 
                    href={`/dashboard/courses/${course.id}`}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white shadow-sm transition-all duration-305"
                  >
                    Open Workspace →
                  </Link>
                ) : (
                  <button 
                    onClick={() => handleEnroll(course.id)}
                    className="px-4.5 py-2 rounded-xl text-xs font-bold bg-slate-950 border border-slate-900 hover:bg-violet-600 hover:border-violet-600 hover:text-white text-slate-300 shadow-sm transition-all duration-300"
                  >
                    Enroll Now
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
