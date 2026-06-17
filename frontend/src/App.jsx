import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import './App.css';

// Lazy loading pages for better performance
const Overview = lazy(() => import('./pages/Overview'));
const Explorer = lazy(() => import('./pages/Explorer'));
const Compare = lazy(() => import('./pages/Compare'));
const Stats = lazy(() => import('./pages/Stats'));

// Simple loader component
const Loader = () => (
  <div className="h-screen flex flex-col items-center justify-center gap-4 bg-slate-950">
    <div className="w-16 h-16 border-t-4 border-rose-500 border-solid rounded-full animate-spin"></div>
    <p className="text-slate-400 text-sm">Loading Dashboard...</p>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Overview />} />
            <Route path="explorer" element={<Explorer />} />
            <Route path="compare" element={<Compare />} />
            <Route path="stats" element={<Stats />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
