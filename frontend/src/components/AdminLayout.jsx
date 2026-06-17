import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';

const AdminLayout = () => {
  const theme = useSelector((state) => state.ui.theme);

  const tabs = [
    { id: '', name: 'Overview', path: '/' },
    { id: 'explorer', name: 'Conflicts Explorer', path: '/explorer' },
    { id: 'compare', name: 'Dual War Comparison', path: '/compare' },
    { id: 'stats', name: 'Advanced Aggregations', path: '/stats' }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950 text-slate-100 dark' : 'bg-slate-50 text-slate-900 light'}`}>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 animate-fade-in">
        <div className="flex border-b border-slate-800/80 mb-8 overflow-x-auto gap-2">
          {tabs.map((tab) => (
            <NavLink
              key={tab.id}
              to={tab.path}
              end={tab.path === '/'}
              className={({ isActive }) =>
                `px-6 py-3 font-semibold text-sm transition-all border-b-2 rounded-t-lg -mb-[2px] whitespace-nowrap ${
                  isActive
                    ? 'border-rose-500 text-rose-500 bg-rose-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`
              }
            >
              {tab.name}
            </NavLink>
          ))}
        </div>

        <Outlet />
      </main>

      <footer className="mt-16 py-8 border-t border-slate-900 dark:border-slate-800 bg-slate-950 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <span className="font-bold text-slate-400">War Economic Impact Quantitative Analytics System</span>
            <p className="mt-1 text-[10px] text-slate-500">Academic Project Developed for CodingGita &bull; Prince Nayakpara</p>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/princenayakpara" target="_blank" className="hover:text-slate-300 transition-colors font-medium">Developer GitHub</a>
            <span className="text-slate-700">|</span>
            <span className="font-mono text-slate-600">v1.1.0 (Refactored Router)</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
