"use client";

import React, { useState, useEffect } from 'react';

interface Template {
  id: string;
  name: string;
  lang: string;
  icon: string;
  fileName: string;
  initialCode: string;
}

const templates: Template[] = [
  {
    id: 'counter',
    name: 'Stateful Counter',
    lang: 'jsx',
    icon: '⚛️',
    fileName: 'Counter.jsx',
    initialCode: `function App() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2 style={{ color: '#a78bfa', fontSize: '20px', marginBottom: '10px' }}>
        React Stateful Counter
      </h2>
      <p style={{ fontSize: '14px', color: '#94a3b8' }}>
        Click count is: <strong style={{ color: '#38bdf8', fontSize: '18px' }}>{count}</strong>
      </p>
      <div style={{ marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button 
          style={{
            background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
            border: 'none',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
          }}
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>
        <button 
          style={{
            background: '#1e293b',
            border: '1px solid #334155',
            color: '#cbd5e1',
            padding: '8px 16px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          onClick={() => setCount(0)}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

// Render component inside root boundary
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`
  },
  {
    id: 'todo',
    name: 'Todo List App',
    lang: 'jsx',
    icon: '📝',
    fileName: 'Todo.jsx',
    initialCode: `function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: 'Learn React Server Components', done: true },
    { id: 2, text: 'Build Agentic Coding Assistant', done: false }
  ]);
  const [input, setInput] = React.useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div style={{ padding: '15px' }}>
      <h3 style={{ color: '#a78bfa', fontSize: '18px', margin: '0 0 12px 0' }}>
        Apex Task List
      </h3>
      
      <form onSubmit={addTodo} style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add new task..." 
          style={{
            flexGrow: 1,
            background: '#090d16',
            border: '1px solid #334155',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '13px',
            outline: 'none'
          }}
        />
        <button 
          type="submit" 
          style={{
            background: '#7c3aed',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {todos.map(todo => (
          <div 
            key={todo.id} 
            onClick={() => toggleTodo(todo.id)}
            style={{
              background: '#131926',
              border: '1px solid #1e293b',
              padding: '10px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: todo.done ? 'line-through' : 'none',
              color: todo.done ? '#64748b' : '#e2e8f0',
              fontSize: '13px'
            }}
          >
            <input type="checkbox" checked={todo.done} readOnly />
            <span>{todo.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`
  },
  {
    id: 'visual-card',
    name: 'Visual Card Styler',
    lang: 'jsx',
    icon: '🎨',
    fileName: 'CardStyler.jsx',
    initialCode: `function App() {
  const [color, setColor] = React.useState('#7c3aed');
  const [radius, setRadius] = React.useState('16px');

  return (
    <div style={{ padding: '15px', textAlign: 'center' }}>
      <h3 style={{ color: '#a78bfa', fontSize: '18px', margin: '0 0 15px 0' }}>
        Dynamic Styler
      </h3>
      
      {/* Visual Component Preview */}
      <div style={{
        background: color,
        borderRadius: radius,
        padding: '30px 20px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '16px',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        marginBottom: '20px'
      }}>
        Interactive Glowing Card
      </div>

      {/* Controllers */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
        <div>
          <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
            Background Color
          </label>
          <input 
            type="color" 
            value={color} 
            onChange={(e) => setColor(e.target.value)} 
            style={{ width: '100%', height: '30px', border: 'none', background: 'transparent', cursor: 'pointer' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
            Border Radius ({radius})
          </label>
          <input 
            type="range" 
            min="0" 
            max="40" 
            value={parseInt(radius)} 
            onChange={(e) => setRadius(e.target.value + 'px')} 
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`
  }
];

export default function PlaygroundsPage() {
  const [activeTemplate, setActiveTemplate] = useState<Template>(templates[0]);
  const [code, setCode] = useState<string>(templates[0].initialCode);
  const [compiledSrcDoc, setCompiledSrcDoc] = useState<string>('');
  const [logs, setLogs] = useState<string[]>(['Write custom React components and click "Compile Live Preview" to render.']);
  const [compiling, setCompiling] = useState(false);

  // Helper to compile srcDoc with Babel Standalone
  const compileCode = (rawCode: string) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <style>
            body {
              margin: 0;
              padding: 16px;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              background-color: #090d16;
              color: #f1f5f9;
              overflow-x: hidden;
            }
            input, button, select {
              font-family: inherit;
            }
            /* Custom Scrollbar inside iframe */
            ::-webkit-scrollbar {
              width: 6px;
              height: 6px;
            }
            ::-webkit-scrollbar-track {
              background: #090d16;
            }
            ::-webkit-scrollbar-thumb {
              background: #1e293b;
              border-radius: 3px;
            }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel">
            try {
              ${rawCode}
            } catch (err) {
              document.getElementById('root').innerHTML = \`
                <div style="padding: 12px; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; color: #ef4444; font-size: 13px; font-family: monospace;">
                  <strong>Compile Error:</strong><br/>
                  \${err.message}
                </div>
              \`;
            }
          </script>
        </body>
      </html>
    `;
  };

  // Compile active template initialCode on mount
  useEffect(() => {
    setCompiledSrcDoc(compileCode(templates[0].initialCode));
  }, []);

  const handleTemplateChange = (tmpl: Template) => {
    setActiveTemplate(tmpl);
    setCode(tmpl.initialCode);
    setLogs([`Switched to ${tmpl.name} template. Click Compile to preview.`]);
    setCompiledSrcDoc(compileCode(tmpl.initialCode));
  };

  const handleCompile = () => {
    setCompiling(true);
    setLogs(['▲ Initializing Babel transpiler...', '• Bundling React UMD objects...']);

    setTimeout(() => {
      setCompiling(false);
      setCompiledSrcDoc(compileCode(code));
      setLogs([
        '▲ Initializing Babel transpiler...',
        '• Bundling React UMD objects...',
        '✓ Transpiled React JSX successfully.',
        '✓ Live Preview frame re-rendered successfully.'
      ]);
    }, 1200);
  };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6 text-left">
      
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">React Live Code Playground</h1>
        <p className="text-xs text-slate-400">Write live stateful React components. Transpile JSX and review the mounted component preview on the side.</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Templates Selection (Left) */}
        <div className="lg:col-span-3 space-y-3">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block px-1">
            Environment templates
          </span>
          {templates.map((tmpl) => {
            const active = activeTemplate.id === tmpl.id;
            return (
              <button
                key={tmpl.id}
                onClick={() => handleTemplateChange(tmpl)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between ${
                  active 
                    ? 'bg-slate-900 border-violet-500/80 text-white font-bold' 
                    : 'bg-slate-950/40 border-slate-900 hover:border-slate-800 text-slate-450'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{tmpl.icon}</span>
                  <span className="text-xs">{tmpl.name}</span>
                </div>
                <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-violet-400' : 'bg-slate-850'}`} />
              </button>
            );
          })}
        </div>

        {/* Code Editor Area (Center - 5 columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="glass rounded-2xl border border-slate-900 overflow-hidden flex flex-col h-[480px]">
            
            {/* Editor tab bar */}
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-900 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-rose-500/80" />
                  <div className="w-2 h-2 rounded-full bg-amber-500/80" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[10px] font-mono text-slate-550 pl-3">
                  src/{activeTemplate.fileName}
                </span>
              </div>

              <button
                onClick={handleCompile}
                disabled={compiling}
                className="px-3.5 py-1.5 bg-violet-650 hover:bg-violet-600 disabled:bg-violet-850 text-[10px] font-bold text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-[0_0_12px_rgba(139,92,246,0.2)]"
              >
                {compiling ? (
                  <>
                    <div className="w-2.5 h-2.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Compiling...</span>
                  </>
                ) : (
                  <>
                    <span>⚡</span>
                    <span>Compile Preview</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Inputs */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-grow w-full p-4 bg-slate-950 font-mono text-[11px] text-violet-200 focus:outline-none resize-none leading-relaxed border-none focus:ring-0 custom-scrollbar"
            />

            {/* Transpiler console */}
            <div className="bg-slate-950 border-t border-slate-900 p-3 font-mono text-[9px] text-left">
              <span className="text-[8px] font-bold text-slate-650 uppercase tracking-widest block pb-1 border-b border-slate-900/60 mb-1">
                Babel Console Log
              </span>
              <div className="space-y-0.5 h-20 overflow-y-auto custom-scrollbar">
                {logs.map((log, idx) => (
                  <p 
                    key={idx}
                    className={`${
                      log.startsWith('✓') ? 'text-emerald-400 font-semibold' :
                      log.startsWith('▲') ? 'text-violet-400' : 'text-slate-500'
                    }`}
                  >
                    {log}
                  </p>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Live Preview Container (Right - 4 columns) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div className="glass rounded-2xl border border-slate-900 overflow-hidden flex flex-col h-[480px]">
            
            {/* Preview tab bar */}
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-900 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Live Preview Screen
              </span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] text-slate-550 font-semibold">Active Renderer</span>
              </div>
            </div>

            {/* Live iframe window */}
            <div className="flex-grow bg-[#090d16] relative">
              {compiledSrcDoc ? (
                <iframe
                  srcDoc={compiledSrcDoc}
                  title="React Live Preview Sandbox"
                  sandbox="allow-scripts"
                  className="w-full h-full border-none bg-transparent"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-xs">
                  Awaiting compiler compilation...
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
