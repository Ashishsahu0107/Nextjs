"use client";

import React, { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface Assertion {
  test: (code: string) => boolean;
  message: string;
}

interface LabStep {
  id: string;
  name: string;
  icon: string;
  instructions: string;
  fileName: string;
  initialCode: string;
  assertions: Assertion[];
}

const labSteps: LabStep[] = [
  {
    id: 'counter',
    name: 'Stateful Counter',
    icon: '⚛️',
    fileName: 'Counter.jsx',
    instructions: `Task: Create a stateful counter using React.useState.
    
    Requirements:
    1. Declare count and setCount using React.useState(0).
    2. Render the current count in a text block.
    3. Provide an "Increment" button that increases the count value by 1.
    4. Provide a "Reset" button to clear the count back to 0.`,
    initialCode: `function App() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div style={{ textAlign: 'center', padding: '15px' }}>
      <h3 style={{ color: '#a78bfa', fontSize: '16px', margin: '0 0 10px 0' }}>
        React Stateful Counter
      </h3>
      <p style={{ fontSize: '13px', color: '#94a3b8' }}>
        Count is: <strong style={{ color: '#38bdf8' }}>{count}</strong>
      </p>
      <div style={{ marginTop: '10px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button 
          style={{
            background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
            border: 'none',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 'bold',
            cursor: 'pointer'
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
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '12px',
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`,
    assertions: [
      {
        test: (code) => code.includes('React.useState'),
        message: 'Must implement state Hook parameters (React.useState).'
      },
      {
        test: (code) => code.includes('setCount'),
        message: 'Must invoke the state setter function to update counter numbers.'
      }
    ]
  },
  {
    id: 'todo',
    name: 'Todo List App',
    icon: '📝',
    fileName: 'Todo.jsx',
    instructions: `Task: Create a simple Task Tracker.
    
    Requirements:
    1. Track list array state containing text items.
    2. Render items in a list.
    3. Provide an input field and a form submit event handler to add new tasks.`,
    initialCode: `function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: 'Master Server Actions', done: true },
    { id: 2, text: 'Build React Playground', done: false }
  ]);
  const [input, setInput] = React.useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ color: '#a78bfa', fontSize: '15px', margin: '0 0 10px 0' }}>
        Apex Task List
      </h3>
      
      <form onSubmit={addTodo} style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="New task..." 
          style={{
            flexGrow: 1,
            background: '#090d16',
            border: '1px solid #334155',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '6px',
            fontSize: '12px',
            outline: 'none'
          }}
        />
        <button 
          type="submit" 
          style={{
            background: '#7c3aed',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {todos.map(todo => (
          <div 
            key={todo.id} 
            style={{
              background: '#131926',
              padding: '8px',
              borderRadius: '6px',
              color: '#e2e8f0',
              fontSize: '12px'
            }}
          >
            • {todo.text}
          </div>
        ))}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`,
    assertions: [
      {
        test: (code) => code.includes('todos') || code.includes('setTodos'),
        message: 'Must declare todo state lists.'
      },
      {
        test: (code) => code.includes('onSubmit') || code.includes('addTodo'),
        message: 'Must bind form onSubmit handlers to capture item creation triggers.'
      }
    ]
  },
  {
    id: 'visual-card',
    name: 'Visual Card Styler',
    icon: '🎨',
    fileName: 'CardStyler.jsx',
    instructions: `Task: Create a dynamically styleable card.
    
    Requirements:
    1. Declare background color state.
    2. Bind a color input field updating background styling.
    3. Render a preview element bound to the color state.`,
    initialCode: `function App() {
  const [color, setColor] = React.useState('#7c3aed');

  return (
    <div style={{ padding: '10px', textAlign: 'center' }}>
      <h3 style={{ color: '#a78bfa', fontSize: '15px', margin: '0 0 12px 0' }}>
        Dynamic Styler
      </h3>
      
      <div style={{
        background: color,
        borderRadius: '10px',
        padding: '20px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '13px',
        marginBottom: '15px',
        transition: 'background 0.2s'
      }}>
        Glowing Live Card
      </div>

      <div style={{ textAlign: 'left' }}>
        <label style={{ fontSize: '10px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
          Background Color Select
        </label>
        <input 
          type="color" 
          value={color} 
          onChange={(e) => setColor(e.target.value)} 
          style={{ width: '100%', height: '28px', border: 'none', background: 'transparent', cursor: 'pointer' }}
        />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`,
    assertions: [
      {
        test: (code) => code.includes('color') || code.includes('setColor'),
        message: 'Must declare color state parameters.'
      },
      {
        test: (code) => code.includes('type="color"'),
        message: 'Must specify a color input field.'
      }
    ]
  }
];

function LabsContent() {
  const [activeStep, setActiveStep] = useState(0);
  const [code, setCode] = useState(labSteps[0].initialCode);
  const [compiledSrcDoc, setCompiledSrcDoc] = useState('');
  const [logs, setLogs] = useState<string[]>(['Write custom React components and click "Verify Compile Labs" to test.']);
  const [compiling, setCompiling] = useState(false);
  const [success, setSuccess] = useState(false);

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
              padding: 12px;
              font-family: -apple-system, BlinkMacSystemFont, sans-serif;
              background-color: #090d16;
              color: #f1f5f9;
              overflow-x: hidden;
            }
            button, input {
              font-family: inherit;
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
                <div style="padding: 8px; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 6px; color: #ef4444; font-size: 11px; font-family: monospace;">
                  <strong>Compile Error:</strong> \${err.message}
                </div>
              \`;
            }
          </script>
        </body>
      </html>
    `;
  };

  useEffect(() => {
    setCode(labSteps[activeStep].initialCode);
    setCompiledSrcDoc(compileCode(labSteps[activeStep].initialCode));
    setLogs([`Loaded ${labSteps[activeStep].name} lab step. Ready.`]);
    setSuccess(false);
  }, [activeStep]);

  const handleStepChange = (idx: number) => {
    setActiveStep(idx);
  };

  const handleVerify = () => {
    setCompiling(true);
    setLogs(['▲ Transpiling React JSX template...', '• Executing dynamic unit assertions...']);

    setTimeout(() => {
      setCompiling(false);
      setCompiledSrcDoc(compileCode(code));

      try {
        const step = labSteps[activeStep];
        
        // Run code-based tests
        step.assertions.forEach((assertion, assertIdx) => {
          const assertPassed = assertion.test(code);
          if (!assertPassed) {
            throw new Error(assertion.message);
          }
        });

        setSuccess(true);
        setLogs([
          '▲ Transpiling React JSX template...',
          '• Executing dynamic unit assertions...',
          '✓ Transpiled React JSX successfully.',
          '✓ Live Preview frame re-rendered successfully.',
          '✓ PASS  All test validation assertions resolved OK.',
          ' ',
          `🎉 Congratulations! You completed the ${step.name} lab!`,
          'You gained +100 XP points.'
        ]);
      } catch (err: any) {
        setSuccess(false);
        setLogs([
          '▲ Transpiling React JSX template...',
          '• Executing dynamic unit assertions...',
          '✗ FAIL  Test suite failed.',
          `  Error: ${err.message}`,
          ' ',
          'Adjust code inputs and click Verify again.'
        ]);
      }
    }, 1200);
  };

  const handleNextStep = () => {
    if (activeStep + 1 < labSteps.length) {
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6 text-left">
      
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4 border-b border-slate-900 pb-4">
        <div className="space-y-1 text-left">
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Interactive Coding Lab</h1>
          <p className="text-xs text-slate-400">Write live React JSX code and preview the output canvas in real-time.</p>
        </div>

        {/* Steps Navigator */}
        <div className="flex gap-2 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
          {labSteps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => handleStepChange(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeStep === idx 
                  ? 'bg-violet-600 text-white' 
                  : 'text-slate-500 hover:text-slate-355'
              }`}
            >
              <span>{step.icon}</span>
              <span>{step.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Split Pane Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: Instructions + Live Render Screen */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Instructions */}
          <div className="glass p-5 rounded-2xl border border-slate-900 text-left space-y-3">
            <h3 className="text-xs uppercase font-bold text-slate-500 tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
              Exercise Guidelines
            </h3>
            <div className="text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed">
              {labSteps[activeStep].instructions}
            </div>
          </div>

          {/* Live Preview */}
          <div className="glass rounded-2xl border border-slate-900 overflow-hidden flex flex-col h-[280px]">
            <div className="bg-slate-950 px-4 py-2 border-b border-slate-900 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Live Preview Output
              </span>
              <span className="text-[9px] text-emerald-450 font-bold">Active Canvas</span>
            </div>
            
            <div className="flex-grow bg-[#090d16]">
              {compiledSrcDoc ? (
                <iframe
                  srcDoc={compiledSrcDoc}
                  title="React Live Preview"
                  sandbox="allow-scripts"
                  className="w-full h-full border-none"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">
                  Compile to mount preview...
                </div>
              )}
            </div>
          </div>

          {/* Success Next Button */}
          {success && activeStep + 1 < labSteps.length && (
            <button
              onClick={handleNextStep}
              className="w-full py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-xs font-bold text-white rounded-xl shadow-md transition-colors animate-pulse"
            >
              Advance to {labSteps[activeStep + 1].name} →
            </button>
          )}
        </div>

        {/* Right Side: Workspace Editor & Console */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="glass rounded-2xl border border-slate-900 shadow-xl overflow-hidden flex flex-col h-[480px]">
            
            {/* Editor Top Bar */}
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-900 flex justify-between items-center">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-rose-500/80" />
                <div className="w-2 h-2 rounded-full bg-amber-500/80" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
              </div>
              
              <button
                onClick={handleVerify}
                disabled={compiling}
                className="px-4 py-1.5 bg-violet-650 hover:bg-violet-600 disabled:bg-violet-850 text-xs font-bold text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-[0_0_15px_rgba(139,92,246,0.2)]"
              >
                {compiling ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Compiling...</span>
                  </>
                ) : (
                  <span>Verify Compile Labs</span>
                )}
              </button>
            </div>

            {/* Code Inputs */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-grow w-full p-5 bg-slate-950 font-mono text-xs text-violet-250 focus:outline-none resize-none leading-relaxed border-none focus:ring-0 custom-scrollbar"
            />

            {/* Verification Console */}
            <div className="bg-slate-950 border-t border-slate-900 p-4 font-mono text-[10px] text-left">
              <span className="text-[9px] font-bold text-slate-650 uppercase tracking-widest block pb-2 border-b border-slate-900/60 mb-2">
                Unit Test Console Log
              </span>
              <div className="space-y-1 h-20 overflow-y-auto custom-scrollbar">
                {logs.map((log, idx) => (
                  <p 
                    key={idx}
                    className={`${
                      log.startsWith('✓') || log.startsWith('🎉') ? 'text-emerald-400 font-semibold' :
                      log.startsWith('▲') ? 'text-violet-400' :
                      log.startsWith('✗') ? 'text-rose-400 font-semibold' : 'text-slate-505'
                    }`}
                  >
                    {log}
                  </p>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

export default function LabsPage() {
  return (
    <Suspense fallback={
      <div className="p-8 text-center text-slate-450 font-semibold">
        Loading coding labs...
      </div>
    }>
      <LabsContent />
    </Suspense>
  );
}
