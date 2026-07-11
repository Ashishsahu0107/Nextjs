"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

function AuthModalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const authMode = searchParams.get('auth'); // 'login' | 'register'
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Password Recovery States
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [recoveryStep, setRecoveryStep] = useState<1 | 2 | 3>(1);
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otpSentMessage, setOtpSentMessage] = useState('');

  // Reset inputs when modal state changes
  useEffect(() => {
    if (!authMode) {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setErrorMsg('');
      setSuccessMsg('');
      setRecoveryMode(false);
      setRecoveryStep(1);
      setOtpCode('');
      setNewPassword('');
      setOtpSentMessage('');
    }
  }, [authMode]);

  if (!authMode) return null;

  // Calculate Password Strength Score (0 to 4)
  const getPasswordStrength = (val: string) => {
    if (!val) return 0;
    let score = 0;
    if (val.length >= 6) score++;
    if (val.length >= 10) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(val)) score++;
    return score;
  };

  const strengthScore = getPasswordStrength(password);
  const strengthLabels = ['Too Short', 'Weak', 'Fair', 'Medium', 'Strong'];
  const strengthColors = ['bg-rose-600', 'bg-rose-500', 'bg-amber-500', 'bg-violet-500', 'bg-emerald-500'];

  const closeOverlay = () => {
    // Remove query parameters
    const params = new URLSearchParams(searchParams.toString());
    params.delete('auth');
    const queryStr = params.toString();
    router.push(pathname + (queryStr ? `?${queryStr}` : ''));
  };

  const switchMode = (mode: 'login' | 'register') => {
    setErrorMsg('');
    setSuccessMsg('');
    const params = new URLSearchParams(searchParams.toString());
    params.set('auth', mode);
    router.push(pathname + `?${params.toString()}`);
  };

  // Submit Sign In / Sign Up
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (authMode === 'register') {
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }
      if (strengthScore < 2) {
        setErrorMsg('Password is too weak. Implement numbers or symbols.');
        return;
      }

      // Register post request
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, role })
        });
        const data = await res.json();
        if (res.ok) {
          setSuccessMsg('Account created successfully! Switching to Login...');
          setTimeout(() => {
            switchMode('login');
          }, 1500);
        } else {
          setErrorMsg(data.message || 'Registration failed.');
        }
      } catch (err) {
        setErrorMsg('Failed to connect to API routes.');
      }
    } else {
      // Login post request
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
          setSuccessMsg(`Welcome! Loading Dashboard...`);
          // Save role to simulate access
          const userRole = data.user?.role || role;
          setTimeout(() => {
            closeOverlay();
            if (userRole === 'admin') {
              router.push('/admin/dashboard');
            } else if (userRole === 'teacher') {
              router.push('/teacher/dashboard');
            } else {
              router.push('/student/dashboard');
            }
          }, 1200);
        } else {
          setErrorMsg(data.message || 'Incorrect email or password credentials.');
        }
      } catch (err) {
        setErrorMsg('Failed to connect to API routes.');
      }
    }
  };

  // Step 1: Trigger Password Reset Code
  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setOtpSentMessage('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        setOtpSentMessage('6-digit OTP code sent! Check server console log logs.');
        setRecoveryStep(2);
      } else {
        setErrorMsg(data.message || 'Failed to dispatch verification code.');
      }
    } catch (err) {
      setErrorMsg('Failed to process recovery parameters.');
    }
  };

  // Step 2: Verify code
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setOtpSentMessage('');

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpCode })
      });
      const data = await res.json();
      if (res.ok) {
        setOtpSentMessage('OTP verified. Declare new password.');
        setRecoveryStep(3);
      } else {
        setErrorMsg(data.message || 'OTP matched invalid/expired parameters.');
      }
    } catch (err) {
      setErrorMsg('Verification route error.');
    }
  };

  // Step 3: Write new password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setOtpSentMessage('');

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg('Password updated! Redirecting to login...');
        setTimeout(() => {
          setRecoveryMode(false);
          setRecoveryStep(1);
          switchMode('login');
        }, 1500);
      } else {
        setErrorMsg(data.message || 'Failed to update credentials.');
      }
    } catch (err) {
      setErrorMsg('Failed to reach password modifier API.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4 animate-fade-in text-left">
      
      {/* Container Overlay Box */}
      <div className="relative w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(139,92,246,0.15)] flex flex-col justify-between">
        
        {/* Banner Glow decoration */}
        <div className="absolute top-[-10%] left-[-10%] w-[150px] h-[150px] rounded-full bg-violet-500/10 blur-[40px] pointer-events-none" />
        
        {/* Close Button */}
        <button 
          onClick={closeOverlay}
          className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white rounded-lg hover:bg-slate-800/40 transition-colors"
        >
          ✕
        </button>

        {/* RECOVERY WORKFLOWS */}
        {recoveryMode ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Recover Credentials</h2>
              <p className="text-xs text-slate-400">Step {recoveryStep} of 3: Verification recovery loop.</p>
            </div>

            {errorMsg && <div className="p-3.5 bg-rose-950/40 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-semibold">{errorMsg}</div>}
            {otpSentMessage && <div className="p-3.5 bg-cyan-950/40 border border-cyan-500/30 rounded-xl text-cyan-400 text-xs font-semibold">{otpSentMessage}</div>}

            {/* Step 1 Form */}
            {recoveryStep === 1 && (
              <form onSubmit={handleRequestOTP} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider pl-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter account email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-805 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
                <button type="submit" className="w-full py-3.5 bg-violet-650 hover:bg-violet-600 text-xs font-bold text-white rounded-xl shadow transition-all">
                  Send Recovery OTP
                </button>
              </form>
            )}

            {/* Step 2 Form */}
            {recoveryStep === 2 && (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-455 uppercase tracking-wider pl-1">6-Digit Code</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="Enter OTP code"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-805 rounded-xl text-center font-mono text-base tracking-widest text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
                <button type="submit" className="w-full py-3.5 bg-violet-650 hover:bg-violet-600 text-xs font-bold text-white rounded-xl shadow transition-all">
                  Verify OTP Code
                </button>
              </form>
            )}

            {/* Step 3 Form */}
            {recoveryStep === 3 && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-455 uppercase tracking-wider pl-1">New Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Define secure password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-805 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
                <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-xs font-bold text-white rounded-xl shadow transition-all">
                  Save New Password
                </button>
              </form>
            )}

            <button 
              type="button"
              onClick={() => setRecoveryMode(false)}
              className="text-xs text-slate-500 hover:text-slate-350 block mx-auto font-semibold pt-2"
            >
              ← Back to Sign In
            </button>
          </div>
        ) : (
          /* LOGIN OR REGISTER MAIN FORM */
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {authMode === 'login' ? 'Sign In to APEX.' : 'Join Apex Academy'}
              </h2>
              <p className="text-xs text-slate-450">
                {authMode === 'login' ? 'Enter credentials to load dashboard.' : 'Configure profile details to enroll.'}
              </p>
            </div>

            {errorMsg && <div className="p-3 bg-rose-950/40 border border-rose-500/20 rounded-xl text-rose-455 text-xs font-semibold">{errorMsg}</div>}
            {successMsg && <div className="p-3 bg-emerald-950/40 border border-emerald-500/20 rounded-xl text-emerald-455 text-xs font-semibold">{successMsg}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="ashish@apex.learning"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-900 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-violet-550 transition-colors"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Password</label>
                  {authMode === 'login' && (
                    <button 
                      type="button" 
                      onClick={() => setRecoveryMode(true)}
                      className="text-[10px] text-slate-500 hover:text-violet-405 font-bold"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-900 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-violet-550 transition-colors"
                />
                
                {/* Strength Meter in registration */}
                {authMode === 'register' && password && (
                  <div className="space-y-1 pt-1">
                    <div className="h-1 w-full bg-slate-950 rounded-full overflow-hidden flex">
                      <div 
                        className={`h-full transition-all duration-300 ${strengthColors[strengthScore]}`} 
                        style={{ width: `${(strengthScore + 1) * 20}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-slate-500 font-semibold px-1">
                      Strength: <strong className="text-slate-350">{strengthLabels[strengthScore]}</strong>
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password in registration */}
              {authMode === 'register' && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Confirm Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-900 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-violet-550"
                  />
                </div>
              )}

              {/* Role Select in registration */}
              {authMode === 'register' && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Account Role</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'student', name: 'Student' },
                      { id: 'teacher', name: 'Teacher' },
                      { id: 'admin', name: 'Admin' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setRole(item.id as any)}
                        className={`py-2 text-[10px] font-bold rounded-lg border text-center transition-colors ${
                          role === item.id 
                            ? 'bg-violet-600 border-violet-500 text-white shadow-sm' 
                            : 'bg-slate-950 border-slate-900 hover:border-slate-805 text-slate-500'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <button 
                type="submit" 
                className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-xs font-bold text-white rounded-xl shadow-md transition-all pt-2.5"
              >
                {authMode === 'login' ? 'Sign In Workspace' : 'Create Account'}
              </button>
            </form>

            {/* Mode Switcher */}
            <div className="text-center pt-2">
              {authMode === 'login' ? (
                <p className="text-xs text-slate-500">
                  Don't have an account?{' '}
                  <button onClick={() => switchMode('register')} className="text-violet-400 font-bold hover:underline">
                    Sign Up
                  </button>
                </p>
              ) : (
                <p className="text-xs text-slate-500">
                  Already have an account?{' '}
                  <button onClick={() => switchMode('login')} className="text-violet-400 font-bold hover:underline">
                    Sign In
                  </button>
                </p>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function AuthModal() {
  return (
    <Suspense fallback={null}>
      <AuthModalContent />
    </Suspense>
  );
}
