import React from 'react';

const Stats = () => {
  return (
    <div className="space-y-6 animate-scale-in">
      <div className="glass-panel p-6 rounded-2xl border border-slate-800/80">
        <h3 className="text-lg font-bold text-white mb-4">Wartime Economic Stats by Conflict Type</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                <th className="py-3 px-4">Conflict Type</th>
                <th className="py-3 px-4 text-center">Avg GDP Contraction</th>
                <th className="py-3 px-4 text-center">Avg Inflation Rate</th>
                <th className="py-3 px-4 text-center">Avg Poverty Rate</th>
                <th className="py-3 px-4 text-center">Ongoing / Resolved Ratio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {[
                { type: "Interstate", avgGdp: -36.5, avgInf: 485.6, avgPov: 64.2, ratio: "2:5" },
                { type: "Civil War", avgGdp: -48.2, avgInf: 2504.1, avgPov: 78.4, ratio: "4:3" },
                { type: "Proxy War", avgGdp: -24.8, avgInf: 86.4, avgPov: 45.0, ratio: "1:2" },
                { type: "Insurgency", avgGdp: -12.4, avgInf: 14.2, avgPov: 34.5, ratio: "3:1" }
              ].map((stat, i) => (
                <tr key={i} className="hover:bg-slate-800/20">
                  <td className="py-4 px-4 font-bold text-slate-200">{stat.type}</td>
                  <td className="py-4 px-4 text-center font-bold text-red-400 font-mono">{stat.avgGdp}%</td>
                  <td className="py-4 px-4 text-center text-rose-400 font-mono font-semibold">{stat.avgInf?.toLocaleString()}%</td>
                  <td className="py-4 px-4 text-center text-slate-300 font-mono">{stat.avgPov}%</td>
                  <td className="py-4 px-4 text-center text-slate-400 font-mono">{stat.ratio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-slate-800/80">
        <h3 className="text-lg font-bold text-white mb-4">Shadow Economy Size & Black Market Severity</h3>
        <p className="text-xs text-slate-400 mb-6">
          Aggregation mapping the growth of wartime informal economy sizes and black market sectors.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { sector: "Energy / Fuel", level: "Dominant Severity", description: "Critical fuel pipelines and grid facilities are targeted first, forcing fuel trade into military black market boards.", color: "text-red-400 border-red-500/20 bg-red-500/5" },
            { sector: "Agriculture / Grain", level: "High Severity", description: "Supply chains breaks collapse regional farming, causing food hoarding and extreme food insecurity gap.", color: "text-amber-400 border-amber-500/20 bg-amber-500/5" },
            { sector: "Foreign Exchange", level: "Critical Severity", description: "Local currency devalues rapidly. The gap between official bank exchange rate and black market rate exceeds 200%.", color: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5" }
          ].map((item, idx) => (
            <div key={idx} className={`p-4 rounded-xl border ${item.color}`}>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider">{item.sector}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800">{item.level}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
