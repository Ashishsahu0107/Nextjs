"use client";

import React, { useState } from 'react';

interface Account {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  status: 'Active' | 'Suspended';
}

const initialAccounts: Account[] = [
  { id: 1, name: 'Ashish Sahu', email: 'student@apex.academy', role: 'student', status: 'Active' },
  { id: 2, name: 'Harrison Chase', email: 'teacher@apex.academy', role: 'teacher', status: 'Active' },
  { id: 3, name: 'Liam Devlin', email: 'liam@apex.academy', role: 'student', status: 'Active' },
  { id: 4, name: 'Ashley Williams', email: 'ashley@apex.academy', role: 'student', status: 'Suspended' }
];

export default function AdminDashboard() {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [activeTab, setActiveTab] = useState<'users' | 'certificates' | 'telemetry'>('users');
  const [searchQuery, setSearchQuery] = useState('');

  // Backup logs
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    '▲ System initial check finalized.',
    '✓ All servers listening on HTTP/WS co-binding ports.'
  ]);

  // Certificate Factory States
  const [certName, setCertName] = useState('');
  const [certCourse, setCertCourse] = useState('Advanced Next.js 16 & Server Actions');
  const [generatedCert, setGeneratedCert] = useState<{ name: string; course: string; id: string } | null>(null);

  const handleToggleStatus = (id: number) => {
    setAccounts(prev =>
      prev.map(acc => {
        if (acc.id === id) {
          const newStatus = acc.status === 'Active' ? 'Suspended' : 'Active';
          setConsoleLogs(c => [...c, `• Admin log: Toggled status of ${acc.email} to ${newStatus}.`]);
          return { ...acc, status: newStatus };
        }
        return acc;
      })
    );
  };

  const handleDeleteAccount = (id: number) => {
    const acc = accounts.find(a => a.id === id);
    if (acc) {
      setConsoleLogs(c => [...c, `✗ Admin log: Terminated account record for ${acc.email}.`]);
    }
    setAccounts(prev => prev.filter(acc => acc.id !== id));
  };

  const handleBackup = () => {
    setConsoleLogs(c => [...c, '▲ Dispatching JSON archive query...', '• Syncing document clusters...', '✓ Backup archive compiled successfully.']);
  };

  const handleGenerateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certName.trim()) return;

    const code = 'APX-' + Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCert({
      name: certName,
      course: certCourse,
      id: code
    });
    setConsoleLogs(c => [...c, `✓ Certificate Factory: Generated certificate ${code} for ${certName}.`]);
  };

  const filteredAccounts = accounts.filter(acc =>
    acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    acc.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 text-left animate-fade-in">
      
      {/* Header telemetry dashboard */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-8 border border-slate-800 shadow-xl overflow-hidden">
        
        {/* Glow indicator */}
        <div className="absolute top-[-30%] right-[-10%] w-[250px] h-[250px] rounded-full bg-cyan-555/5 blur-[50px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 z-10 relative">
          <div className="space-y-1.5">
            <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              Super Admin Cockpit 👑
            </h1>
            <p className="text-xs text-slate-400">Configure global route permissions, audit security parameters, and index telemetry.</p>
          </div>

          {/* Telemetry charts */}
          <div className="flex gap-4 sm:gap-6 flex-wrap w-full lg:w-auto">
            
            <div className="bg-slate-950/80 px-4.5 py-3 border border-slate-900 rounded-2xl flex-grow sm:flex-grow-0 text-left min-w-[100px]">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Total Revenue</span>
              <span className="text-lg font-black text-emerald-400 mt-1 block">$42,850</span>
            </div>

            <div className="bg-slate-950/80 px-4.5 py-3 border border-slate-900 rounded-2xl flex-grow sm:flex-grow-0 text-left min-w-[100px]">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Live Accounts</span>
              <span className="text-lg font-black text-white mt-1 block">{accounts.length} Users</span>
            </div>

            <div className="bg-slate-950/80 px-4.5 py-3 border border-slate-900 rounded-2xl flex-grow sm:flex-grow-0 text-left min-w-[100px]">
              <span className="text-[9px] font-bold text-slate-550 uppercase tracking-widest block">CPU Engine</span>
              <span className="text-lg font-black text-cyan-400 mt-1 block flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                14% Load
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-900 pb-1.5 overflow-x-auto custom-scrollbar">
        {[
          { id: 'users', name: 'User Accounts Directory', icon: '👥' },
          { id: 'certificates', name: 'Certificate Factory', icon: '🏆' },
          { id: 'telemetry', name: 'System Telemetry', icon: '⚙️' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === tab.id 
                ? 'bg-slate-900 text-white border border-slate-800 shadow-sm' 
                : 'text-slate-500 hover:text-slate-350'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="relative pt-2">
        
        {/* ACCOUNT DIRECTORY MODERATOR */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            
            {/* Search filter row */}
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search email, name or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-sm px-4 py-2 bg-slate-950 border border-slate-900 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-violet-550"
              />
            </div>

            {/* Users Table */}
            <div className="glass rounded-2xl border border-slate-900 overflow-hidden">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-500 uppercase font-bold text-[10px] border-b border-slate-900">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/60">
                  {filteredAccounts.map((acc) => (
                    <tr key={acc.id} className="hover:bg-slate-955/10 transition-colors">
                      <td className="p-4 font-bold text-white">{acc.name}</td>
                      <td className="p-4 text-slate-400 font-mono">{acc.email}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                          acc.role === 'admin' ? 'border-rose-500/20 bg-rose-955/20 text-rose-400' :
                          acc.role === 'teacher' ? 'border-cyan-550/20 bg-cyan-950/20 text-cyan-400' :
                          'border-slate-800 bg-slate-900 text-slate-400'
                        }`}>
                          {acc.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`text-[10px] font-bold ${acc.status === 'Active' ? 'text-emerald-450' : 'text-rose-455'}`}>
                          {acc.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleToggleStatus(acc.id)}
                          className={`px-3 py-1 rounded text-[10px] font-bold transition-all border ${
                            acc.status === 'Active' 
                              ? 'border-amber-500/20 hover:border-amber-550 text-amber-500 bg-amber-950/10' 
                              : 'border-emerald-500/20 hover:border-emerald-550 text-emerald-450 bg-emerald-950/10'
                          }`}
                        >
                          {acc.status === 'Active' ? 'Suspend' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleDeleteAccount(acc.id)}
                          className="px-3 py-1 bg-slate-950 border border-slate-900 hover:border-rose-600 text-[10px] font-bold text-slate-500 hover:text-white rounded transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* CERTIFICATE FACTORY */}
        {activeTab === 'certificates' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Column (5) */}
            <div className="lg:col-span-5 glass p-5 sm:p-6 rounded-3xl border border-slate-900 space-y-5">
              <span className="text-xs font-bold text-slate-550 uppercase tracking-widest pl-1">Factory Parameters</span>
              
              <form onSubmit={handleGenerateCertificate} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Student Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ashish Sahu"
                    value={certName}
                    onChange={(e) => setCertName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-900 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-violet-550"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Target Course Syllabus</label>
                  <select
                    value={certCourse}
                    onChange={(e) => setCertCourse(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-900 rounded-xl text-xs text-white focus:outline-none focus:border-violet-550"
                  >
                    <option value="Advanced Next.js 16 & Server Actions">Advanced Next.js 16 & Server Actions</option>
                    <option value="Full-Stack Agentic AI Engineering">Full-Stack Agentic AI Engineering</option>
                    <option value="Systems Programming & Wasm">Systems Programming & Wasm</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-xs font-bold text-white rounded-xl shadow-md transition-colors"
                >
                  Create Digital Diploma
                </button>
              </form>
            </div>

            {/* Preview Column (7) */}
            <div className="lg:col-span-7">
              {generatedCert ? (
                <div className="glass p-8 sm:p-12 rounded-3xl border border-amber-500/20 text-center space-y-6 bg-gradient-to-br from-slate-950 to-slate-900 relative overflow-hidden shadow-2xl">
                  
                  {/* Decorative corner borders */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-amber-500/40" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-amber-500/40" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-amber-500/40" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-amber-500/40" />

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-amber-500 tracking-widest uppercase">Apex Learning Academy</span>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">Certificate of Completion</h3>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-slate-500">This certifies that student developer</p>
                    <h4 className="text-lg font-black text-amber-300 italic">{generatedCert.name}</h4>
                    <p className="text-xs text-slate-500">has successfully completed all requirements of</p>
                    <p className="text-xs font-bold text-white">{generatedCert.course}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/40 flex justify-between items-center text-[9px] text-slate-500 font-mono">
                    <span>Serial: {generatedCert.id}</span>
                    <span className="text-amber-500/80 font-bold">APPROVED STATUS</span>
                  </div>

                  <button 
                    onClick={() => alert(`Simulating PDF export for code serial: ${generatedCert.id}`)}
                    className="px-5 py-2.5 bg-slate-950 border border-slate-800 hover:border-amber-500 text-[10px] font-bold text-slate-400 hover:text-amber-400 rounded-xl transition-all"
                  >
                    Download Digital PDF
                  </button>

                </div>
              ) : (
                <div className="w-full h-[320px] rounded-3xl border border-dashed border-slate-900 bg-slate-955/20 flex items-center justify-center text-slate-500 text-xs text-center p-6">
                  Input student name parameters and click Create Digital Diploma to preview layout.
                </div>
              )}
            </div>

          </div>
        )}

        {/* SYSTEM TELEMETRY */}
        {activeTab === 'telemetry' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* System Actions Controls (5) */}
            <div className="lg:col-span-5 glass p-5 rounded-3xl border border-slate-900 flex flex-col justify-between gap-4">
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-550 uppercase tracking-widest block pl-1">Server Controls</span>
                
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleBackup}
                    className="w-full py-3 bg-slate-950 border border-slate-900 hover:border-violet-500/50 hover:bg-slate-900/10 text-xs font-bold text-slate-350 hover:text-violet-300 rounded-xl transition-all text-left px-4 flex justify-between items-center"
                  >
                    <span>🗄 Trigger Database Backup archive</span>
                    <span className="text-[9px] font-mono text-slate-500 font-normal">JSON Export</span>
                  </button>

                  <button
                    onClick={() => {
                      setConsoleLogs(c => [...c, '▲ Purging session caches...', '✓ Cache records cleared. Saved 14.5MB space.']);
                    }}
                    className="w-full py-3 bg-slate-950 border border-slate-900 hover:border-violet-500/50 hover:bg-slate-900/10 text-xs font-bold text-slate-355 hover:text-violet-300 rounded-xl transition-all text-left px-4 flex justify-between items-center"
                  >
                    <span>🧼 Clear Temporary Hydration Caches</span>
                    <span className="text-[9px] font-mono text-slate-500 font-normal">Flush RAM</span>
                  </button>

                  <button
                    onClick={() => {
                      setConsoleLogs(c => [...c, '▲ Computing embedding indexing...', '• Querying vectors indexes...', '✓ Re-indexing pgvector tables resolved OK.']);
                    }}
                    className="w-full py-3 bg-slate-950 border border-slate-900 hover:border-violet-500/50 hover:bg-slate-900/10 text-xs font-bold text-slate-355 hover:text-violet-300 rounded-xl transition-all text-left px-4 flex justify-between items-center"
                  >
                    <span>🗺 Re-Index Vector DB Schema Strategy</span>
                    <span className="text-[9px] font-mono text-slate-500 font-normal">O(1) Bounds</span>
                  </button>
                </div>
              </div>

              <p className="text-[10px] text-slate-550 leading-relaxed font-semibold pl-1">
                Backup triggers download copy archives locally for local storage verification.
              </p>
            </div>

            {/* Audit Logs Console (7) */}
            <div className="lg:col-span-7">
              <div className="glass p-5 rounded-3xl border border-slate-900 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block pl-1">Administrative Audit Logs</span>
                  
                  <div className="bg-slate-955/60 border border-slate-900 rounded-xl p-4 font-mono text-[10px] text-left space-y-1.5 h-56 overflow-y-auto custom-scrollbar">
                    {consoleLogs.map((log, idx) => (
                      <p 
                        key={idx}
                        className={
                          log.startsWith('✓') ? 'text-emerald-450 font-semibold' :
                          log.startsWith('▲') ? 'text-violet-400' :
                          log.startsWith('✗') ? 'text-rose-455 font-semibold' : 'text-slate-505'
                        }
                      >
                        {log}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="text-[10px] text-slate-550 uppercase tracking-wider font-semibold border-t border-slate-900/60 pt-4 mt-4 flex justify-between items-center">
                  <span>Secured session tunnel</span>
                  <span>TLS 1.3 Active</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
