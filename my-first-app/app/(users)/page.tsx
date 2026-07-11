"use client";

import React, { useState } from 'react';
import AuthModal from '@/components/AuthModal';

// Types
interface Course {
  id: number;
  title: string;
  category: 'webdev' | 'ai' | 'systems';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  rating: number;
  enrolled: string;
  author: {
    name: string;
    avatarBg: string;
    avatarText: string;
  };
  gradient: string;
}

interface PathStep {
  title: string;
  desc: string;
  duration: string;
  skills: string[];
}

export default function LMSLandingPage() {
  // Simulator State
  const [selectedPath, setSelectedPath] = useState<'frontend' | 'ai-engineer' | 'cloud'>('frontend');
  
  // Billing Toggle State
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');

  // Course Filter State
  const [activeFilter, setActiveFilter] = useState<'all' | 'webdev' | 'ai' | 'systems'>('all');

  // Email Signup State
  const [email, setEmail] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  // Path Simulator Data
  const pathData: Record<'frontend' | 'ai-engineer' | 'cloud', {
    role: string;
    salary: string;
    demand: string;
    steps: PathStep[];
  }> = {
    frontend: {
      role: 'Senior Frontend Engineer',
      salary: '$140k - $190k',
      demand: 'High Demand (React 19, Next.js, WebGL)',
      steps: [
        { title: 'Core Modern React & Hydration', desc: 'Master Server Components, Suspense, and state coordination.', duration: 'Weeks 1-3', skills: ['React 19', 'Next.js Router', 'DOM Hydration'] },
        { title: 'Responsive Design & Design Systems', desc: 'Build scalable CSS/Tailwind systems with premium micro-interactions.', duration: 'Weeks 4-6', skills: ['Tailwind CSS v4', 'CSS Grid', 'Custom Tokens'] },
        { title: 'Interactive Graphics & Performance', desc: 'Dive into Canvas, WebGL, CSS animations, and image optimization.', duration: 'Weeks 7-9', skills: ['Framer Motion', 'Lighthouse Optimization', 'SVG Art'] },
        { title: 'Enterprise Architecture & State', desc: 'Deploy full-stack applications with state management and Vercel analytics.', duration: 'Weeks 10-12', skills: ['Zustand', 'SWR/React Query', 'Deployment'] },
      ]
    },
    'ai-engineer': {
      role: 'Generative AI Engineer',
      salary: '$160k - $220k',
      demand: 'Exponential Growth (LLMs, RAG, Agentic AI)',
      steps: [
        { title: 'LLM Foundations & Prompt Engineering', desc: 'Understand APIs, system prompts, structure validation, and token cost tuning.', duration: 'Weeks 1-3', skills: ['OpenAI / Gemini APIs', 'Zod schema validation', 'Cost optimization'] },
        { title: 'Retrieval Augmented Generation (RAG)', desc: 'Build semantic search engines using vector databases and text embedding models.', duration: 'Weeks 4-6', skills: ['Pinecone / pgvector', 'Embeddings', 'LangChain'] },
        { title: 'Agentic Workflows & Multi-Agents', desc: 'Design systems that reason, run tools, coordinate subagents, and self-correct.', duration: 'Weeks 7-9', skills: ['LangGraph / CrewAI', 'Tool calling', 'Memory states'] },
        { title: 'AI Application Deployment & Monitoring', desc: 'Host real-time streaming interfaces and audit prompt logs at scale.', duration: 'Weeks 10-12', skills: ['Vercel AI SDK', 'Helicone', 'WebSockets'] },
      ]
    },
    cloud: {
      role: 'Cloud Architect & DevOps',
      salary: '$150k - $210k',
      demand: 'Critical Core (Docker, Kubernetes, Edge Infrastructure)',
      steps: [
        { title: 'Containerization & Local Dev', desc: 'Dockerize complex multi-service apps with isolated networks.', duration: 'Weeks 1-3', skills: ['Docker', 'Docker Compose', 'Local Registry'] },
        { title: 'CI/CD Pipelines & Testing Automation', desc: 'Build robust GitHub Actions to run tests, lint, and trigger preview staging builds.', duration: 'Weeks 4-6', skills: ['GitHub Actions', 'Jest / Playwright', 'Docker Buildx'] },
        { title: 'Kubernetes & Container Orchestration', desc: 'Manage pods, ingress, service meshes, and auto-scaling arrays.', duration: 'Weeks 7-9', skills: ['K8s Cluster', 'Helm Charts', 'Ingress Controller'] },
        { title: 'Edge Computing & Serverless Platforms', desc: 'Deploy globally distributed services close to users with minimal latency.', duration: 'Weeks 10-12', skills: ['AWS Cloudfront', 'Cloudflare Workers', 'Terraform'] },
      ]
    }
  };

  // Courses Data state (initially loaded with mock list for fast paint, then fetched from API)
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: 'Advanced Next.js 16 & Server Actions',
      category: 'webdev',
      level: 'Advanced',
      duration: '18 Hours',
      rating: 4.9,
      enrolled: '12.4k',
      author: { name: 'Sarah Chen', avatarBg: 'bg-violet-500', avatarText: 'SC' },
      gradient: 'from-violet-600 to-indigo-700'
    },
    {
      id: 2,
      title: 'Full-Stack Agentic AI Engineering',
      category: 'ai',
      level: 'Advanced',
      duration: '26 Hours',
      rating: 4.95,
      enrolled: '8.2k',
      author: { name: 'Liam Devlin', avatarBg: 'bg-cyan-500', avatarText: 'LD' },
      gradient: 'from-cyan-600 to-blue-700'
    },
    {
      id: 3,
      title: 'Rust for JavaScript Developers',
      category: 'systems',
      level: 'Intermediate',
      duration: '32 Hours',
      rating: 4.88,
      enrolled: '6.1k',
      author: { name: 'Morten Lind', avatarBg: 'bg-emerald-500', avatarText: 'ML' },
      gradient: 'from-emerald-600 to-teal-700'
    },
    {
      id: 4,
      title: 'Tailwind CSS v4: Advanced Design Systems',
      category: 'webdev',
      level: 'Intermediate',
      duration: '12 Hours',
      rating: 4.85,
      enrolled: '15.1k',
      author: { name: 'Emma Wilson', avatarBg: 'bg-pink-500', avatarText: 'EW' },
      gradient: 'from-pink-600 to-rose-700'
    },
    {
      id: 5,
      title: 'Retrieval Augmented Generation (RAG) Architecture',
      category: 'ai',
      level: 'Intermediate',
      duration: '15 Hours',
      rating: 4.92,
      enrolled: '9.4k',
      author: { name: 'Dr. Alan Patel', avatarBg: 'bg-amber-500', avatarText: 'AP' },
      gradient: 'from-amber-600 to-orange-700'
    },
    {
      id: 6,
      title: 'Kubernetes & Docker Container Workflows',
      category: 'systems',
      level: 'Advanced',
      duration: '22 Hours',
      rating: 4.82,
      enrolled: '5.5k',
      author: { name: 'Alex Mercer', avatarBg: 'bg-purple-500', avatarText: 'AM' },
      gradient: 'from-purple-600 to-fuchsia-700'
    }
  ]);

  // Fetch payload from backend courses endpoint
  React.useEffect(() => {
    const loadBackendData = async () => {
      try {
        const response = await fetch('/api/courses');
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        }
      } catch (err) {
        console.error('Failed to fetch courses backend payload:', err);
      }
    };
    loadBackendData();
  }, []);

  const filteredCourses = activeFilter === 'all' 
    ? courses 
    : courses.filter(c => c.category === activeFilter);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSignupSuccess(true);
      setEmail('');
      setTimeout(() => setSignupSuccess(false), 5000);
    }
  };

  return (
    <div className="pt-20 overflow-x-hidden min-h-screen text-slate-100 bg-slate-950 relative">
      {/* Background Orbs */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-800/10 blur-[120px] pointer-events-none -z-10 animate-pulse duration-[10s]" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-700/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] left-[20%] w-[600px] h-[600px] rounded-full bg-indigo-900/10 blur-[150px] pointer-events-none -z-10" />

      {/* ================= HERO SECTION ================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Content */}
          <div className="lg:col-span-6 space-y-8 text-left">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-950/30 text-xs font-semibold text-violet-300">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />
              Next-Gen LMS for Builders
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              The Future of <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">Tech Learning</span> is Active.
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
              Ditch passive videos. Dive into fully interactive browser-based workspaces, track custom learning paths, and receive real-time debugging guidance from your AI Copilot.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="#pricing" 
                className="px-8 py-4 text-center text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl hover:from-violet-500 hover:to-cyan-500 shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:shadow-[0_0_40px_rgba(139,92,246,0.55)] transition-all duration-300 scale-100 hover:scale-[1.02] active:scale-98"
              >
                Start Learning Free
              </a>
              <a 
                href="#courses" 
                className="px-8 py-4 text-center text-base font-semibold text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl backdrop-blur transition-all duration-200"
              >
                Explore Courses
              </a>
            </div>

            {/* Stats Summary */}
            <div className="pt-6 grid grid-cols-3 gap-6 border-t border-slate-900 max-w-md">
              <div>
                <p className="text-2xl font-bold text-white">94%</p>
                <p className="text-xs text-slate-500 mt-1">Completion Rate</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">120K+</p>
                <p className="text-xs text-slate-500 mt-1">Students Taught</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">4.92 ★</p>
                <p className="text-xs text-slate-500 mt-1">Avg Course Rating</p>
              </div>
            </div>
          </div>

          {/* Hero Visual: Interactive Live Dashboard Mockup */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full max-w-2xl mx-auto glass rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-800/80 overflow-hidden group">
              
              {/* Terminal Window Header */}
              <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-800/50 flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded border border-slate-900">
                  sandbox://app/page.tsx
                </div>
                <div className="w-4 h-4" />
              </div>

              {/* Window Layout Grid */}
              <div className="grid grid-cols-12 h-[380px] text-xs font-mono">
                {/* Left Side: Code Editor Mockup */}
                <div className="col-span-8 p-4 bg-slate-950 text-left border-r border-slate-900/60 overflow-y-auto">
                  <p className="text-slate-500">// 1. Define Server Component</p>
                  <p className="text-violet-400">export default async function <span className="text-cyan-300">CourseLayout</span>() &#123;</p>
                  <p className="text-indigo-300 pl-4">const data = await <span className="text-cyan-400">fetchModules</span>();</p>
                  <p className="text-slate-500 pl-4 mt-2">// 2. Render Interactive Sandbox</p>
                  <p className="text-violet-400 pl-4">return (</p>
                  <p className="text-pink-400 pl-8">&lt;<span className="text-emerald-400">main</span> className=&quot;grid&quot;&gt;</p>
                  <p className="text-pink-400 pl-12">&lt;<span className="text-emerald-400">TerminalWorkspace</span> data=&#123;data&#125; /&gt;</p>
                  <p className="text-pink-400 pl-12 bg-violet-950/20 border-l border-violet-500/60 py-0.5">&lt;<span className="text-emerald-400">AICopilotAssistant</span> context=&quot;nextjs&quot; /&gt;</p>
                  <p className="text-pink-400 pl-8">&lt;/<span className="text-emerald-400">main</span>&gt;</p>
                  <p className="text-violet-400 pl-4">);</p>
                  <p className="text-violet-400">&#125;</p>

                  {/* Mock Console Output */}
                  <div className="mt-8 pt-4 border-t border-slate-900">
                    <p className="text-slate-500">Localhost status:</p>
                    <p className="text-emerald-400">✓ Compiled successfully in 142ms</p>
                    <p className="text-cyan-400">○ Ready on http://localhost:3000</p>
                  </div>
                </div>

                {/* Right Side: Copilot Sidebar Mockup */}
                <div className="col-span-4 bg-slate-900/40 flex flex-col justify-between p-3">
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 border-b border-slate-800/80 pb-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="font-bold text-[10px] text-slate-300 uppercase tracking-wider">APEX AI</span>
                    </div>
                    
                    {/* Bot Message */}
                    <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800 text-[10px] text-slate-300 leading-normal">
                      I noticed you imported <span className="text-violet-400">fetchModules</span> from <span className="text-emerald-400">@/lib</span> but didn&apos;t specify cache options. Add <span className="text-cyan-400">next: &#123; revalidate: 60 &#125;</span> to optimize!
                    </div>

                    {/* Progress Card */}
                    <div className="bg-slate-950/30 p-2 rounded-lg border border-slate-900/60 text-[10px] text-slate-400">
                      <div className="flex justify-between font-bold text-slate-300 mb-1">
                        <span>Task Progress</span>
                        <span>75%</span>
                      </div>
                      <div className="w-full bg-slate-900 rounded-full h-1">
                        <div className="bg-gradient-to-r from-violet-500 to-cyan-400 h-1 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950 border border-slate-800/60 rounded px-2 py-1 text-[10px] text-slate-500 flex justify-between items-center">
                    <span>Ask AI Copilot...</span>
                    <span className="px-1 py-0.5 bg-slate-900 text-[9px] rounded border border-slate-800 text-slate-400 font-bold">↵</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Visual Floating elements */}
            <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-full opacity-20 blur-xl animate-bounce duration-[6s] pointer-events-none" />
            <div className="absolute bottom-[-15px] left-[-15px] w-32 h-32 bg-gradient-to-tr from-violet-600 to-purple-600 rounded-full opacity-20 blur-xl animate-pulse pointer-events-none" />
          </div>

        </div>
      </section>

      {/* ================= FEATURE CARDS GRID ================= */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900 relative">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-bold">Why APEX?</h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Designed for the Professional Developer.
          </p>
          <p className="text-slate-400">
            Passive videos don&apos;t teach you how to ship production applications. Apex is engineered around muscle memory and deep conceptual understanding.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Card 1 */}
          <div className="glass-light p-6 rounded-2xl border border-slate-800/60 hover:border-violet-500/40 glow-border transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-violet-950/60 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors">In-Browser Workspaces</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Code and preview full-stack Node environments directly in your browser. Zero configuration, absolute speed.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Learn more 
              <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-light p-6 rounded-2xl border border-slate-800/60 hover:border-cyan-500/40 glow-border transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">24/7 AI Code Mentoring</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Get stuck? Apex Copilot diagnoses linting bugs, syntax errors, and infrastructure slips instantly.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Learn more 
              <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-light p-6 rounded-2xl border border-slate-800/60 hover:border-emerald-500/40 glow-border transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">Career Analytics</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Receive granular skill metrics mapped directly to industry job roles. Track progress based on real projects.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Learn more 
              <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="glass-light p-6 rounded-2xl border border-slate-800/60 hover:border-pink-500/40 glow-border transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-pink-950/60 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors">Shared Cohorts</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Join live code reviews, hackathons, and pair-programming channels. Connect with top talent worldwide.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Learn more 
              <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>

        </div>
      </section>

      {/* ================= INTERACTIVE ROADMAP SIMULATOR ================= */}
      <section id="path-simulator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative bg-slate-950/20 border-t border-slate-900">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs uppercase tracking-widest text-violet-400 font-bold">Interactive Navigator</h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Choose Your Career Accelerator.
          </p>
          <p className="text-slate-400">
            Click on a career goal below to simulate your personalized roadmap. See expected duration, key modules, and the high-demand skill stack.
          </p>
        </div>

        {/* Roadmap Widget Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Path Selector Tabs */}
          <div className="lg:col-span-4 space-y-3">
            {[
              { id: 'frontend', name: 'Frontend Engineer', color: 'border-violet-500/30 text-violet-400 hover:border-violet-500' },
              { id: 'ai-engineer', name: 'Fullstack AI Engineer', color: 'border-cyan-500/30 text-cyan-400 hover:border-cyan-500' },
              { id: 'cloud', name: 'DevOps & Infrastructure', color: 'border-emerald-500/30 text-emerald-400 hover:border-emerald-500' },
            ].map((path) => {
              const active = selectedPath === path.id;
              return (
                <button
                  key={path.id}
                  onClick={() => setSelectedPath(path.id as any)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                    active 
                      ? 'bg-slate-900 border-violet-500/80 shadow-[0_0_15px_rgba(139,92,246,0.15)] text-white font-bold scale-[1.02]' 
                      : 'bg-slate-950/60 border-slate-900 hover:bg-slate-900/40 text-slate-400'
                  }`}
                >
                  <span className="text-sm font-medium">{path.name}</span>
                  <span className={`w-2 h-2 rounded-full ${active ? 'bg-violet-400 animate-ping' : 'bg-slate-800'}`} />
                </button>
              );
            })}

            {/* Path Stats */}
            <div className="mt-8 p-6 glass-light rounded-xl space-y-4 text-left border border-slate-900">
              <div>
                <p className="text-xs text-slate-500">Market Standard Salary</p>
                <p className="text-xl font-extrabold text-white mt-1">{pathData[selectedPath].salary}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Industry Growth Outlook</p>
                <p className="text-sm font-medium text-emerald-400 mt-1">{pathData[selectedPath].demand}</p>
              </div>
            </div>
          </div>

          {/* Path Timeline Content */}
          <div className="lg:col-span-8 bg-slate-900/40 border border-slate-900 p-6 sm:p-8 rounded-2xl relative text-left">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <span className="px-2 py-1 bg-violet-950 border border-violet-500/30 text-violet-300 text-xs rounded uppercase font-bold">Roadmap</span>
              <span>{pathData[selectedPath].role} Timeline</span>
            </h3>

            {/* Steps Container */}
            <div className="relative border-l border-slate-800 pl-6 sm:pl-8 space-y-8">
              {pathData[selectedPath].steps.map((step, idx) => (
                <div key={idx} className="relative group">
                  
                  {/* Timeline bullet dot */}
                  <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border border-slate-950 bg-slate-950 flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.8)] group-hover:scale-125 transition-transform duration-300" />
                  </span>

                  {/* Step content */}
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <h4 className="text-base font-bold text-white group-hover:text-violet-400 transition-colors">
                        {step.title}
                      </h4>
                      <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800 self-start sm:self-center font-mono">
                        {step.duration}
                      </span>
                    </div>

                    <p className="text-sm text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {step.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/60 text-slate-300 border border-slate-900">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ================= COURSE GRID SECTION ================= */}
      <section id="courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900 relative">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 text-left">
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-bold">Catalog</h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Explore Popular Cohorts.
            </p>
            <p className="text-slate-400 max-w-xl">
              Choose from interactive deep-dives on the hottest programming frameworks, generative AI architectures, and cloud networks.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800/80">
            {[
              { id: 'all', name: 'All Courses' },
              { id: 'webdev', name: 'Web Dev' },
              { id: 'ai', name: 'AI Engineering' },
              { id: 'systems', name: 'Systems/DevOps' },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  activeFilter === filter.id 
                    ? 'bg-violet-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-950/40'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div 
              key={course.id} 
              className="glass p-5 rounded-2xl border border-slate-900 hover:border-slate-800 hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col justify-between text-left group"
            >
              
              {/* Header Box Graphic */}
              <div className={`relative h-44 rounded-xl bg-gradient-to-tr ${course.gradient} flex items-center justify-center p-6 border border-white/5 overflow-hidden`}>
                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" />
                
                {/* Visual SVG Pattern inside cards */}
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id={`grid-pattern-${course.id}`} width="16" height="16" patternUnits="userSpaceOnUse">
                      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#grid-pattern-${course.id})`} />
                </svg>

                {/* Level Tag */}
                <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950/90 text-cyan-400 border border-slate-900">
                  {course.level}
                </span>

                {/* Course Rating Overlay */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-slate-950/90 px-2 py-0.5 rounded border border-slate-900 text-[10px] font-bold text-amber-400">
                  <span>★</span>
                  <span>{course.rating}</span>
                </div>

                <div className="relative z-10 font-bold text-lg text-white text-center leading-snug drop-shadow-md">
                  {course.title.split(': ')[0]}
                </div>
              </div>

              {/* Title & Desc */}
              <div className="mt-5 space-y-3">
                <h3 className="font-bold text-lg text-white leading-snug group-hover:text-violet-400 transition-colors">
                  {course.title}
                </h3>
                
                {/* Details line */}
                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
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
              <div className="mt-6 pt-4 border-t border-slate-900 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full ${course.author.avatarBg} flex items-center justify-center font-bold text-xs text-white`}>
                    {course.author.avatarText}
                  </div>
                  <span className="text-xs font-semibold text-slate-300">{course.author.name}</span>
                </div>

                <button className="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-violet-600 hover:border-violet-600 hover:text-white rounded-lg text-xs font-bold text-slate-300 transition-all duration-300">
                  Enroll Free
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet-600/5 blur-[100px] pointer-events-none" />

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-bold">Feedback</h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Trusted by Engineers Worldwide.
          </p>
          <p className="text-slate-400">
            Read how professionals from high-growth tech firms use Apex to stay ahead of the technology curve.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "The interactive labs are a game changer. I set up Docker and Kubernetes nodes inside my browser and had instant AI diagnostics telling me why my Ingress config was failing. Incredible.",
              name: "Marcus Vance",
              role: "Platform Engineer",
              company: "Vercel",
              stars: 5,
              avatar: "MV",
              color: "bg-blue-600"
            },
            {
              quote: "I took the Full-Stack Agentic AI course and integrated tool-calling subagents at my day job. The code execution sandbox mirrors real server deployment perfectly.",
              name: "Aisha Ray",
              role: "Senior AI Engineer",
              company: "Stripe",
              stars: 5,
              avatar: "AR",
              color: "bg-violet-600"
            },
            {
              quote: "Apex is the only platform that keeps up with Next.js releases in real-time. The Server Actions module showed me edge caching gotchas I couldn't find in standard tutorials.",
              name: "Justin Wu",
              role: "Lead Frontend Dev",
              company: "Linear",
              stars: 5,
              avatar: "JW",
              color: "bg-cyan-600"
            }
          ].map((testimonial, idx) => (
            <div key={idx} className="glass p-6 rounded-2xl border border-slate-900 text-left flex flex-col justify-between relative hover:border-slate-800/80 transition-all duration-300">
              <div className="space-y-4">
                {/* Stars */}
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: testimonial.stars }).map((_, sIdx) => (
                    <span key={sIdx} className="text-sm">★</span>
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-sm text-slate-300 italic leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-8 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${testimonial.color} flex items-center justify-center font-bold text-xs text-white`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{testimonial.name}</h4>
                  <p className="text-xs text-slate-500 font-semibold">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PRICING SECTION ================= */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900 relative">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-8">
          <h2 className="text-xs uppercase tracking-widest text-violet-400 font-bold">Pricing Plans</h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Invest in Your Technical Depth.
          </p>
          <p className="text-slate-400">
            Pick a tier that fits your learning style. Start coding in our sandbox environments completely free.
          </p>
        </div>

        {/* Toggle Billing Period */}
        <div className="flex justify-center items-center gap-4 mb-16">
          <span className={`text-sm font-semibold transition-colors ${billingPeriod === 'monthly' ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
          
          <button 
            onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
            className="w-12 h-6 rounded-full bg-slate-800 p-1 flex items-center relative transition-colors"
            aria-label="Toggle billing billingPeriod"
          >
            <span className={`w-4 h-4 rounded-full bg-violet-500 transition-transform ${billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>

          <span className={`text-sm font-semibold flex items-center gap-1.5 transition-colors ${billingPeriod === 'yearly' ? 'text-white' : 'text-slate-500'}`}>
            <span>Yearly</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-900 uppercase">Save 20%</span>
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Card 1: Free */}
          <div className="glass p-8 rounded-2xl border border-slate-900 flex flex-col justify-between text-left">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-300">Starter Free</h3>
                <p className="text-xs text-slate-500 mt-1">Start exploring modern dev.</p>
              </div>

              <div className="flex items-baseline gap-1 text-white">
                <span className="text-4xl font-extrabold">$0</span>
                <span className="text-xs text-slate-500 font-semibold">/ month</span>
              </div>

              {/* Benefits list */}
              <ul className="space-y-3.5 text-sm text-slate-400 border-t border-slate-900 pt-6">
                {[
                  'Access to 2 starter pathways',
                  'In-browser sandbox limits (1 hr/day)',
                  'Basic diagnostic lint warnings',
                  'Access to active Discord community',
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-violet-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-sm font-bold text-white rounded-xl border border-slate-850 mt-8 transition-colors">
              Get Started
            </button>
          </div>

          {/* Card 2: Pro */}
          <div className="glass p-8 rounded-2xl border-2 border-violet-600/80 shadow-[0_0_40px_rgba(139,92,246,0.15)] flex flex-col justify-between text-left relative overflow-hidden transform md:-translate-y-2">
            {/* Ribbon */}
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-violet-600 text-[10px] font-black text-white uppercase tracking-wider rounded-bl-lg">
              Most Popular
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Pro Learner</h3>
                <p className="text-xs text-violet-300 mt-1">Master advanced full-stack concepts.</p>
              </div>

              <div className="flex items-baseline gap-1 text-white">
                <span className="text-4xl font-extrabold">
                  {billingPeriod === 'yearly' ? '$24' : '$29'}
                </span>
                <span className="text-xs text-slate-500 font-semibold">/ month</span>
              </div>

              {/* Benefits list */}
              <ul className="space-y-3.5 text-sm text-slate-300 border-t border-slate-900 pt-6">
                {[
                  'Access to all premium cohorts',
                  'Unlimited workspace hours & runtimes',
                  '24/7 Apex Copilot AI Assistant',
                  'Personalized curriculum generator',
                  'Verified skill certificates',
                  'Priority Discord channels & direct assistance',
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-sm font-bold text-white rounded-xl mt-8 shadow-[0_0_25px_rgba(139,92,246,0.25)] transition-all">
              Go Pro Now
            </button>
          </div>

          {/* Card 3: Team Enterprise */}
          <div className="glass p-8 rounded-2xl border border-slate-900 flex flex-col justify-between text-left">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-300">Team Enterprise</h3>
                <p className="text-xs text-slate-500 mt-1">Scale engineering competency.</p>
              </div>

              <div className="flex items-baseline gap-1 text-white">
                <span className="text-4xl font-extrabold">Custom</span>
              </div>

              {/* Benefits list */}
              <ul className="space-y-3.5 text-sm text-slate-400 border-t border-slate-900 pt-6">
                {[
                  'SSO / SAML secure sign-in',
                  'Granular manager dashboards',
                  'Custom learning roadmap templates',
                  'API integrations with Slack & Teams',
                  'SLA response times on workspaces',
                  'Dedicated account manager assistance',
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-sm font-bold text-white rounded-xl border border-slate-850 mt-8 transition-colors">
              Contact Sales
            </button>
          </div>

        </div>
      </section>

      {/* ================= NEWSLETTER & FOOTER ================= */}
      <section className="relative border-t border-slate-900 mt-12 bg-slate-950">
        
        {/* Newsletter Banner */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="glass p-8 sm:p-12 rounded-3xl border border-slate-900/80 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-cyan-500/5 pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Stay Updated on New Cohorts</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Join our newsletter of 45K+ subscribers. We send out cutting-edge tutorial deep dives, tech stack comparison sheets, and custom workspace sandbox invites once a week.
              </p>

              {/* Input Form */}
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-2 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your professional email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-sm font-bold text-white rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all flex-shrink-0"
                >
                  Join Newsletter
                </button>
              </form>

              {signupSuccess && (
                <p className="text-xs text-emerald-400 animate-fade-in font-semibold">
                  ✓ Success! You are on the invite list. Check your inbox soon.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Link Grid */}
        <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 border-t border-slate-900 text-left">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            
            {/* Brand column */}
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center font-bold text-sm text-white">
                  A
                </div>
                <span className="text-lg font-bold text-white tracking-wider">APEX.</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
                The premier interactive LMS designed to fast-track technical careers. Ditch the video tutorials, build real software.
              </p>
              <div className="flex gap-4 pt-2">
                {/* Social media icons */}
                {['twitter', 'github', 'discord'].map((social) => (
                  <a key={social} href="#" className="w-5 h-5 text-slate-500 hover:text-white transition-colors" aria-label={social}>
                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                      {social === 'twitter' && <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>}
                      {social === 'github' && <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />}
                      {social === 'discord' && <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 004 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.873-.894.077.077 0 01-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 01.077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.246.195.373.289a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107 14.36 14.36 0 001.226 1.99.076.076 0 00.084.03 19.86 19.86 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/>}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            {[
              {
                title: 'Platform',
                links: ['All Courses', 'Simulator Paths', 'Pricing Models', 'Interactive Workspace']
              },
              {
                title: 'Resources',
                links: ['Documentation', 'Cohort Guidelines', 'System Status', 'Changelog']
              },
              {
                title: 'Company',
                links: ['About Us', 'Careers', 'Brand Assets', 'Contact Details']
              }
            ].map((col) => (
              <div key={col.title} className="space-y-4">
                <h4 className="text-xs font-black text-white uppercase tracking-wider">{col.title}</h4>
                <ul className="space-y-2 text-xs text-slate-500 font-semibold">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-white transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Legal / Copyright line */}
          <div className="pt-8 border-t border-slate-900/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 font-semibold">
            <p>© {new Date().getFullYear()} Apex Platforms Inc. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-300">Privacy Policy</a>
              <a href="#" className="hover:text-slate-300">Terms of Service</a>
              <a href="#" className="hover:text-slate-300">Cookie Preferences</a>
            </div>
          </div>
        </footer>
      </section>
      
      <AuthModal />
    </div>
  );
}