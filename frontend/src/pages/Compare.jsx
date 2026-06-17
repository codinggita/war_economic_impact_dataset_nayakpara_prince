import React, { useState } from 'react';
import api from '../services/api';
import { fallbackConflicts } from '../services/mockData';

const formatUSD = (num) => {
  if (num == null) return 'N/A';
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return `$${num.toLocaleString()}`;
};

const Compare = () => {
  const [compareName1, setCompareName1] = useState('Syrian Civil War');
  const [compareName2, setCompareName2] = useState('Russia-Ukraine War');
  const [compareResult, setCompareResult] = useState(null);
  const [compareLoading, setCompareLoading] = useState(false);
  const [compareError, setCompareError] = useState('');

  const handleCompare = async (e) => {
    e.preventDefault();
    if (!compareName1.trim() || !compareName2.trim()) {
      setCompareError('Both conflict names are required.');
      return;
    }
    setCompareLoading(true);
    setCompareError('');
    setCompareResult(null);

    try {
      const res = await api.get(`/compare?conflict1=${encodeURIComponent(compareName1)}&conflict2=${encodeURIComponent(compareName2)}`);
      if (res.data && res.data.success) {
        setCompareResult(res.data.data);
      } else {
        setCompareError(res.data?.message || 'Comparison failed.');
      }
    } catch (err) {
      const conflict1 = fallbackConflicts.find(c => c.Conflict_Name.toLowerCase().includes(compareName1.toLowerCase()));
      const conflict2 = fallbackConflicts.find(c => c.Conflict_Name.toLowerCase().includes(compareName2.toLowerCase()));

      if (conflict1 && conflict2) {
        setCompareResult({ conflict1, conflict2 });
      } else {
        setCompareError(`Offline Mode Error: Could not find matches in the mock list.`);
      }
    } finally {
      setCompareLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-scale-in">
      <div className="glass-panel p-6 rounded-2xl border border-slate-800/80">
        <form onSubmit={handleCompare} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Conflict Name 1</label>
            <input
              type="text"
              list="conflict-suggestions"
              placeholder="e.g. Syrian Civil War"
              value={compareName1}
              onChange={(e) => setCompareName1(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 focus:border-rose-500 focus:outline-none transition-all text-sm font-sans"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Conflict Name 2</label>
            <input
              type="text"
              list="conflict-suggestions"
              placeholder="e.g. Russia-Ukraine War"
              value={compareName2}
              onChange={(e) => setCompareName2(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 focus:border-rose-500 focus:outline-none transition-all text-sm font-sans"
            />
          </div>
          <datalist id="conflict-suggestions">
            <option value="Russia-Ukraine War" />
            <option value="Syrian Civil War" />
            <option value="Yemeni Civil War" />
            <option value="World War II (Germany)" />
            <option value="Gulf War" />
            <option value="Libyan Civil War" />
          </datalist>
          <button
            type="submit"
            disabled={compareLoading}
            className="w-full py-2.5 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-rose-500/10 active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {compareLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Crunching Comparison...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                </svg>
                Compare Economic Impacts
              </>
            )}
          </button>
        </form>
        {compareError && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl font-medium">
            {compareError}
          </div>
        )}
      </div>

      {compareResult ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-scale-in">
          {[compareResult.conflict1, compareResult.conflict2].map((conflict, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-slate-800/80 relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl ${idx === 0 ? 'bg-rose-600/5' : 'bg-indigo-600/5'}`}></div>
              <div className="flex justify-between items-start">
                <div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${idx === 0 ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'}`}>
                    Conflict {idx + 1}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-2 font-sans">{conflict.Conflict_Name}</h3>
                  <p className="text-xs text-slate-400">{conflict.Conflict_Type} &bull; {conflict.Region}</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">{conflict.Status}</span>
                  <p className="text-xs text-slate-400 mt-2 font-mono">{conflict.Start_Year} {conflict.End_Year ? `- ${conflict.End_Year}` : '(Ongoing)'}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/50 flex justify-between items-center">
                  <span className="text-xs text-slate-400">GDP Contraction</span>
                  <span className="font-mono text-sm font-bold text-red-400">{conflict["GDP_Change_%"]}%</span>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/50 flex justify-between items-center">
                  <span className="text-xs text-slate-400">Peak Inflation</span>
                  <span className="font-mono text-sm font-bold text-rose-400">{conflict["Inflation_Rate_%"]}%</span>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/50 flex justify-between items-center">
                  <span className="text-xs text-slate-400">Wartime Poverty Rate</span>
                  <span className="font-mono text-sm font-bold text-slate-200">{conflict["During_War_Poverty_Rate_%"]}%</span>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/50 flex justify-between items-center">
                  <span className="text-xs text-slate-400">War Costs (USD)</span>
                  <span className="font-mono text-sm font-bold text-indigo-400">{formatUSD(conflict.Cost_of_War_USD)}</span>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/50 flex justify-between items-center">
                  <span className="text-xs text-slate-400">Black Market Level</span>
                  <span className="font-mono text-sm font-bold text-amber-400">{conflict.Black_Market_Activity_Level || 'N/A'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500 font-semibold border-2 border-dashed border-slate-800 rounded-2xl">
          Select two conflicts above to begin economic damage analysis comparison.
        </div>
      )}
    </div>
  );
};

export default Compare;
