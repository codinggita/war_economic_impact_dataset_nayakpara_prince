import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/uiSlice';

const Navbar = () => {
  const theme = useSelector((state) => state.ui.theme);
  const isApiLive = useSelector((state) => state.data?.isApiLive ?? true);
  const dispatch = useDispatch();

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/10 dark:border-slate-800/80 px-4 md:px-8 py-4 flex flex-wrap items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-tr from-rose-600 to-indigo-600 rounded-xl shadow-md shadow-rose-500/20">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight font-sans bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 dark:from-rose-400 dark:to-indigo-400">
            WAR ECONOMIC IMPACT
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Global Conflicts Loss Tracker & Quantitative Analyser</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-3 sm:mt-0">
        <div id="api-status-indicator" className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${isApiLive ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' : 'bg-amber-500/10 text-amber-500 border-amber-500/30'}`}>
          <span className={`w-2.5 h-2.5 rounded-full ${isApiLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
          {isApiLive ? 'API LIVE' : 'OFFLINE MODE'}
        </div>

        <button
          id="theme-toggle-btn"
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-xl border border-slate-700/30 hover:bg-slate-800/40 transition-colors"
          title="Toggle color theme"
        >
          {theme === 'dark' ? (
            <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clipRule="evenodd"/>
            </svg>
          ) : (
            <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
