"use client";

import React, { useState } from 'react';

export default function SettingsPage() {
  const [name, setName] = useState('Ashish Sahu');
  const [email, setEmail] = useState('ashishsahu@gmail.com');
  const [dailyGoal, setDailyGoal] = useState('1h');
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyDiscord, setNotifyDiscord] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1200);
  };

  return (
    <div className="p-6 sm:p-8 max-w-3xl mx-auto space-y-8 text-left">
      
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Study Settings</h1>
        <p className="text-sm text-slate-400">Configure profile statistics, daily learning schedules, and workspace integrations.</p>
      </div>

      {/* Settings Form Card */}
      <div className="glass p-6 sm:p-8 rounded-3xl border border-slate-900 shadow-xl relative">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-cyan-500/5 pointer-events-none rounded-3xl" />
        
        <form onSubmit={handleSave} className="space-y-6 relative z-10">
          
          {/* Success Banner */}
          {saved && (
            <div className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 p-4 rounded-xl text-xs font-semibold animate-fade-in">
              ✓ Study settings updated successfully. Workspace loaded configuration parameters.
            </div>
          )}

          {/* Profile Section */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-bold text-slate-500 tracking-wider border-b border-slate-900 pb-2">
              Profile details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider pl-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-900 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider pl-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-900 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Schedule settings */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs uppercase font-bold text-slate-500 tracking-wider border-b border-slate-900 pb-2">
              Daily study schedule
            </h3>

            <div className="space-y-1.5 max-w-xs">
              <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider pl-1">
                Daily Study Target
              </label>
              <select
                value={dailyGoal}
                onChange={(e) => setDailyGoal(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-900 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-violet-500"
              >
                <option value="15m">15 Minutes / day (Starter)</option>
                <option value="30m">30 Minutes / day (Builder)</option>
                <option value="1h">1 Hour / day (Pro Practitioner)</option>
                <option value="2h">2 Hours / day (Hyper Accelerator)</option>
              </select>
            </div>
          </div>

          {/* Integration Alerts */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs uppercase font-bold text-slate-500 tracking-wider border-b border-slate-900 pb-2">
              Notification Preferences
            </h3>

            <div className="space-y-3">
              {/* Email Notifications */}
              <div className="flex items-center justify-between gap-4 p-3 bg-slate-950/40 border border-slate-900/60 rounded-xl">
                <div className="text-left">
                  <h4 className="text-xs font-bold text-white">Email Digest Updates</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Receive weekly updates, code grades, and badge summaries.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifyEmail(!notifyEmail)}
                  className={`w-11 h-6 rounded-full p-1 flex items-center relative transition-colors ${notifyEmail ? 'bg-violet-600' : 'bg-slate-800'}`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white transition-transform ${notifyEmail ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Discord Integration notifications */}
              <div className="flex items-center justify-between gap-4 p-3 bg-slate-950/40 border border-slate-900/60 rounded-xl">
                <div className="text-left">
                  <h4 className="text-xs font-bold text-white">Discord Cohort pings</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Alert on direct message code reviews and cohort hackathon announcements.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifyDiscord(!notifyDiscord)}
                  className={`w-11 h-6 rounded-full p-1 flex items-center relative transition-colors ${notifyDiscord ? 'bg-violet-600' : 'bg-slate-800'}`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white transition-transform ${notifyDiscord ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="pt-4 border-t border-slate-900 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-violet-600 hover:bg-violet-500 disabled:bg-violet-850 text-xs font-bold text-white rounded-xl shadow-md transition-colors flex items-center gap-1.5"
            >
              {saving ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving Configuration...</span>
                </>
              ) : (
                <span>Save Settings</span>
              )}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
