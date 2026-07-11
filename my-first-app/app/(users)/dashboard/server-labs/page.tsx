"use client";

import React, { useState } from 'react';

export default function ServerLabsPage() {
  const [method, setMethod] = useState<'GET' | 'POST'>('GET');
  const [endpoint, setEndpoint] = useState('/api/courses');
  const [requestBody, setRequestBody] = useState('{\n  "email": "student@apex.learning",\n  "password": "securepassword123"\n}');
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string>>({});
  const [responseBody, setResponseBody] = useState<string>('// Formatted JSON response will appear here after sending.');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    setResponseStatus(null);
    setResponseBody('// Request pending. Waiting for backend response...');

    try {
      const options: RequestInit = {
        method: method,
        headers: { 'Content-Type': 'application/json' }
      };

      if (method === 'POST') {
        options.body = requestBody;
      }

      const res = await fetch(endpoint, options);
      setResponseStatus(res.status);
      
      // Parse mock headers
      const headersObj: Record<string, string> = {
        'content-type': res.headers.get('content-type') || 'application/json',
        'x-powered-by': 'Next.js 16.2.10',
        'cache-control': 'no-store, max-age=0'
      };
      setResponseHeaders(headersObj);

      const data = await res.json();
      setResponseBody(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setResponseStatus(500);
      setResponseBody(JSON.stringify({ 
        success: false, 
        error: 'Failed to communicate with API route handler.',
        message: err.message 
      }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 text-left">
      
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Server API Labs</h1>
        <p className="text-sm text-slate-400">Perform direct REST requests to live backend payloads. Inspect status, headers, and bodies.</p>
      </div>

      {/* REST Client Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Request Pane (Left) */}
        <div className="lg:col-span-6 glass p-6 rounded-3xl border border-slate-900 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block px-1">
              Construct API Request
            </span>

            {/* Method + URL Input */}
            <div className="flex gap-2">
              <select
                value={method}
                onChange={(e) => {
                  const m = e.target.value as 'GET' | 'POST';
                  setMethod(m);
                  if (m === 'GET') {
                    setEndpoint('/api/courses');
                  } else {
                    setEndpoint('/api/auth/login');
                  }
                }}
                className="px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-xs sm:text-sm font-bold text-white focus:outline-none focus:border-violet-500"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
              </select>

              {/* Endpoint selection */}
              <select
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                className="flex-grow px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-violet-500"
              >
                {method === 'GET' ? (
                  <>
                    <option value="/api/courses">/api/courses (Get Courses)</option>
                  </>
                ) : (
                  <>
                    <option value="/api/auth/login">/api/auth/login (User Auth)</option>
                    <option value="/api/auth/register">/api/auth/register (User SignUp)</option>
                  </>
                )}
              </select>
            </div>

            {/* Request Body Area for POST */}
            {method === 'POST' && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">
                  JSON Raw Payload Body
                </label>
                <textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  rows={6}
                  className="w-full p-4 bg-slate-950 border border-slate-900 rounded-xl font-mono text-xs text-indigo-300 focus:outline-none focus:border-violet-500 resize-none leading-relaxed"
                />
              </div>
            )}
          </div>

          <button
            onClick={handleSend}
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-sm font-semibold text-white rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.25)] transition-all flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Sending Payload...</span>
              </>
            ) : (
              <span>Send API Request</span>
            )}
          </button>
        </div>

        {/* Response Pane (Right) */}
        <div className="lg:col-span-6 flex flex-col space-y-6">
          <div className="glass p-6 rounded-3xl border border-slate-900 flex-grow flex flex-col justify-between h-[380px] overflow-hidden">
            
            {/* Header info */}
            <div className="flex justify-between items-center border-b border-slate-900/60 pb-3 mb-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block px-1">
                Response Payload
              </span>
              
              {/* Status Code badge */}
              {responseStatus !== null && (
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                  responseStatus >= 200 && responseStatus < 300 
                    ? 'border-emerald-500/20 bg-emerald-950/30 text-emerald-400' 
                    : 'border-rose-500/20 bg-rose-950/30 text-rose-400'
                }`}>
                  Status: {responseStatus}
                </span>
              )}
            </div>

            {/* Headers preview if ready */}
            {responseStatus !== null && (
              <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-900/80 font-mono text-[9px] text-slate-550 space-y-0.5 mb-3 text-left">
                {Object.entries(responseHeaders).map(([key, val]) => (
                  <p key={key}>
                    <span className="text-slate-500 font-semibold">{key}:</span> {val}
                  </p>
                ))}
              </div>
            )}

            {/* Response body scroll container */}
            <div className="flex-grow overflow-auto bg-slate-950 p-4 rounded-xl border border-slate-900/60 text-left">
              <pre className="font-mono text-xs text-cyan-400 whitespace-pre-wrap leading-relaxed">
                {responseBody}
              </pre>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
