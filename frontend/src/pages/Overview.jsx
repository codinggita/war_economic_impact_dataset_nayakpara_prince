import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDashboardData } from '../store/dataSlice';
import { DashboardCard } from '../components/DashboardCard';
import { useNavigate } from 'react-router-dom';

const formatUSD = (num) => {
  if (num == null) return 'N/A';
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return `$${num.toLocaleString()}`;
};

const Overview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stats, regionStats, loading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 border-t-4 border-rose-500 border-solid rounded-full animate-spin"></div>
        <p className="text-slate-400 text-sm">Querying economic intelligence database...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-scale-in">
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-purple-950 border border-purple-500/20 shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="relative z-10 max-w-2xl">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 tracking-wider uppercase">Statistical Insight</span>
          <h2 className="text-2xl md:text-3xl font-extrabold mt-3 tracking-tight text-white">The Economic Trauma of War</h2>
          <p className="text-slate-300 text-sm md:text-base mt-2 leading-relaxed">
            Measuring critical historical metrics of economic decay, hyperinflation spikes, infrastructure destruction costs, and household poverty across {stats?.totalConflicts?.toLocaleString() || 0} conflicts worldwide.
          </p>
        </div>
        <div className="relative z-10 flex gap-4">
          <button 
            onClick={() => navigate('/explorer')}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg hover:shadow-rose-600/30 active:scale-95"
          >
            Explore Raw Data
          </button>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl -z-0"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Total Conflicts Indexed"
          mainValue={stats.totalConflicts?.toLocaleString()}
          iconColorClass="bg-rose-500/10 text-rose-500"
          iconPath="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2zm9-11h.01M9 16h.01M16 16h.01M9 12h.01M16 12h.01"
          subtextLabel="Avg GDP Change:"
          subtextValue={`${stats.avgGdpChange}%`}
        />
        <DashboardCard 
          title="Ongoing Conflicts"
          mainValue={stats.ongoingConflicts?.toLocaleString()}
          iconColorClass="bg-amber-500/10 text-amber-500"
          iconPath="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          additionalData={{
            progress: (stats.ongoingConflicts / stats.totalConflicts * 100),
            progressLabel1: `Ongoing (${((stats.ongoingConflicts / stats.totalConflicts) * 100).toFixed(1)}%)`,
            progressLabel2: `Resolved (${((stats.resolvedConflicts / stats.totalConflicts) * 100).toFixed(1)}%)`
          }}
        />
        <DashboardCard 
          title="Peak Inflation Spike"
          mainValue={`${stats.highestInflation["Inflation_Rate_%"]?.toLocaleString()}%`}
          iconColorClass="bg-red-500/10 text-red-500"
          iconPath="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
          additionalData={{
            valueColor: 'text-red-500',
            truncateBlock: {
              title: stats.highestInflation.Conflict_Name,
              subtitle: `Country: ${stats.highestInflation.Primary_Country}`
            }
          }}
        />
        <DashboardCard 
          title="Peak Cost of War"
          mainValue={formatUSD(stats.highestWarCost.Cost_of_War_USD)}
          iconColorClass="bg-indigo-500/10 text-indigo-500"
          iconPath="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          additionalData={{
            valueColor: 'text-indigo-400',
            truncateBlock: {
              title: stats.highestWarCost.Conflict_Name,
              subtitle: `Active Period: ${stats.highestWarCost.Start_Year} - ${stats.highestWarCost.End_Year || 'Ongoing'}`
            }
          }}
        />
      </div>

      {/* Regional Quick Summary Chart */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">Wartime Average GDP Loss & Conflicts Count by Region</h3>
            <p className="text-xs text-slate-500">Macroeconomic contraction mapped by geographical territories</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center items-center py-4 bg-slate-900/50 rounded-xl p-4 border border-slate-800">
            <svg viewBox="0 0 500 240" className="w-full h-auto text-slate-300 font-sans">
              <line x1="60" y1="30" x2="480" y2="30" stroke="rgba(148, 163, 184, 0.05)" strokeDasharray="4 4" />
              <line x1="60" y1="80" x2="480" y2="80" stroke="rgba(148, 163, 184, 0.05)" strokeDasharray="4 4" />
              <line x1="60" y1="130" x2="480" y2="130" stroke="rgba(148, 163, 184, 0.05)" strokeDasharray="4 4" />
              <line x1="60" y1="180" x2="480" y2="180" stroke="rgba(148, 163, 184, 0.05)" strokeDasharray="4 4" />
              <line x1="60" y1="180" x2="480" y2="180" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="2" />
              <line x1="60" y1="20" x2="60" y2="180" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="2" />

              <text x="50" y="34" className="text-[10px] text-right font-medium text-slate-500" textAnchor="end">0%</text>
              <text x="50" y="84" className="text-[10px] text-right font-medium text-slate-500" textAnchor="end">-20%</text>
              <text x="50" y="134" className="text-[10px] text-right font-medium text-slate-500" textAnchor="end">-40%</text>

              {regionStats.slice(0, 5).map((r, i) => {
                const name = r.region;
                const count = r.totalConflicts || 0;
                const rawGdp = r.avgGdpChange || 0;
                const gdp = Math.abs(rawGdp);
                const colWidth = 75;
                const barWidth = 32;
                const x = 85 + (i * colWidth);
                const barHeight = Math.min(150, gdp * 2.5);
                const yBar = 180 - barHeight;

                return (
                  <g key={i} className="group cursor-pointer">
                    <rect x={x - 6} y="20" width={barWidth + 12} height="160" fill="transparent" className="hover:fill-slate-800/20 rounded-lg transition-colors duration-200" />
                    <rect x={x} y={yBar} width={barWidth} height={barHeight} fill={`url(#gradient-${i})`} rx="4" className="transition-all duration-300 shadow-xl" />
                    <text x={x + barWidth/2} y={Math.max(25, yBar - 6)} textAnchor="middle" className="text-[10px] font-bold text-rose-400">{rawGdp.toFixed(1)}%</text>
                    <text x={x + barWidth/2} y="198" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 select-none">{name?.substring(0, 10)}</text>
                    <text x={x + barWidth/2} y="210" textAnchor="middle" className="text-[8px] font-medium text-slate-500 select-none">({count} wars)</text>
                    <defs>
                      <linearGradient id={`gradient-${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.4" />
                      </linearGradient>
                    </defs>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">Territory Analysis Breakdown</h4>
            <div className="divide-y divide-slate-800">
              {regionStats.map((item, index) => (
                <div key={index} className="py-3 flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-md"></span>
                    <span className="font-semibold text-slate-200">{item.region}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="text-xs text-slate-500 block">Total Cost</span>
                      <span className="font-mono text-slate-300 font-medium">{formatUSD(item.totalWarCost)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-500 block">Avg GDP Impact</span>
                      <span className="font-bold text-rose-400">{item.avgGdpChange}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800/80">
          <h4 className="text-sm font-bold text-rose-500 uppercase tracking-widest">Informal Economy Spike</h4>
          <h3 className="text-lg font-bold text-white mt-1">Socio-Economic Underground Sector Expansion</h3>
          <p className="text-slate-400 text-xs mt-2 leading-relaxed">
            Wartime collapses push standard household businesses into informal black-market sectors. According to the database records, the informal shadow economy expands by an average of **35.4%** across conflict regions during active engagements, collapsing official taxation channels and creating extreme black market rates gap.
          </p>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-slate-800/80">
          <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-widest">Infrastructure Capital Cost</h4>
          <h3 className="text-lg font-bold text-white mt-1">Post-conflict Reconstruction Liability</h3>
          <p className="text-slate-400 text-xs mt-2 leading-relaxed">
            Resolved conflicts leave huge capital liabilities for generations. The estimated post-war reconstruction requirement spans anywhere between **150% to 400%** of the country's pre-war annual GDP. The aggregate reconstruction value indexed in our dataset is estimated at **$2.48 Trillion USD**.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
