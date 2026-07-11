"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setSuccess(true);
      } else {
        setError(data.error || 'Authentication failed.');
      }
    } catch (err) {
      setError('A network error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen text-slate-100 bg-slate-950 flex flex-col justify-center items-center relative overflow-hidden px-4">
      {/* Background Glows */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-violet-600/10 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none -z-10" />

      {/* Card container */}
      <div className="w-full max-w-md glass p-8 sm:p-10 rounded-3xl border border-slate-900 shadow-2xl relative">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-cyan-500/5 pointer-events-none rounded-3xl" />
        
        {/* Logo and Header */}
        <div className="text-center space-y-3 mb-8 relative z-10">
          <div className="inline-flex h-10 w-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(139,92,246,0.35)]">
            A
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Welcome Back</h1>
          <p className="text-xs text-slate-400">Sign in to resume your learning path</p>
        </div>

        {/* Success Alert */}
        {success ? (
          <div className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 p-4 rounded-xl text-xs text-center space-y-3 mb-6 animate-fade-in relative z-10">
            <p className="font-semibold">✓ Login Successful!</p>
            <p className="text-[11px] text-emerald-500">Redirecting you to your LMS workspace...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10 text-left">
            {/* Error message */}
            {error && (
              <div className="bg-rose-950/60 border border-rose-500/40 text-rose-400 p-3.5 rounded-xl text-xs font-semibold mb-2">
                ⚠ {error}
              </div>
            )}

            {/* Email field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-4 py-3 bg-slate-950/80 border border-slate-900 hover:border-slate-800 focus:border-violet-500 focus:outline-none rounded-xl text-sm text-white placeholder-slate-600 transition-colors"
              />
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Password
                </label>
                <a href="#" className="text-[10px] font-semibold text-violet-400 hover:text-violet-300 transition-colors">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-4 pr-12 py-3 bg-slate-950/80 border border-slate-900 hover:border-slate-800 focus:border-violet-500 focus:outline-none rounded-xl text-sm text-white placeholder-slate-700 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors text-xs font-bold"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Keep me signed in */}
            <div className="flex items-center gap-2 pt-1">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded bg-slate-950 border-slate-900 text-violet-600 focus:ring-violet-500/20 focus:ring-offset-slate-950 focus:ring-2"
              />
              <label htmlFor="remember" className="text-xs text-slate-400 font-medium select-none cursor-pointer">
                Keep me signed in for 30 days
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-sm font-semibold text-white rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_25px_rgba(139,92,246,0.35)] transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
        )}

        {/* Separator */}
        <div className="relative my-6 text-center z-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-900" />
          </div>
          <span className="relative px-3 bg-slate-950/20 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Or continue with
          </span>
        </div>

        {/* SSO Login buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
          {/* GitHub OAuth Button */}
          <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 rounded-xl transition-all">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
            </svg>
            <span>GitHub</span>
          </button>

          {/* Google OAuth Button */}
          <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 rounded-xl transition-all">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.59 5.59 0 0 1 8.35 13a5.59 5.59 0 0 1 5.64-5.514c2.25 0 3.996.953 4.934 1.826l3.225-3.225C20.19 2.226 17.205 1 13.99 1 7.625 1 2.463 6.136 2.463 12.5S7.625 24 13.99 24c6.12 0 10.597-4.148 10.597-10.5 0-.756-.09-1.503-.27-2.215H12.24v-.998z"/>
            </svg>
            <span>Google</span>
          </button>
        </div>

        {/* Footer Navigation */}
        <p className="text-center text-xs text-slate-500 relative z-10">
          New to Apex?{' '}
          <Link href="/register" className="font-bold text-violet-400 hover:text-violet-300 transition-colors">
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
}
