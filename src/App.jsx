import React, { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard'

export default function App(){
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch(e){
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
      if (dark) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    } catch(e){}
  }, [dark]);

  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold">Dashboard</h1>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setDark(d=>!d)} className="px-3 py-1 border rounded">
            {dark ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </nav>

      <main>
       <Dashboard />
      </main>
    </div>
  );
}
