import React from 'react';

const formatUSD = (num) => {
  if (num == null) return 'N/A';
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return `$${num.toLocaleString()}`;
};

export const ConflictModal = ({ selectedConflict, onClose }) => {
  if (!selectedConflict) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in" id="conflict-detail-modal">
      <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto glass-panel border border-slate-700/80 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6 relative text-sm">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/40 hover:bg-slate-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${selectedConflict.Status === 'Ongoing' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'} uppercase tracking-wider`}>
            {selectedConflict.Status}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-2 font-sans">{selectedConflict.Conflict_Name}</h2>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
            Type: {selectedConflict.Conflict_Type} &bull; Country: {selectedConflict.Primary_Country} &bull; Region: {selectedConflict.Region}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-850/80 space-y-3">
            <h3 className="text-xs font-bold text-rose-400 uppercase tracking-widest border-b border-slate-800 pb-2">Macroeconomic Indicators</h3>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">GDP Contraction</span>
              <span className={`font-mono font-bold ${selectedConflict["GDP_Change_%"] < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                {selectedConflict["GDP_Change_%"] != null ? `${selectedConflict["GDP_Change_%"]}%` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Inflation Rate</span>
              <span className="font-mono font-bold text-rose-400">
                {selectedConflict["Inflation_Rate_%"] != null ? `${selectedConflict["Inflation_Rate_%"]?.toLocaleString()}%` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Currency Devaluation</span>
              <span className="font-mono font-bold text-slate-300">
                {selectedConflict["Currency_Devaluation_%"] != null ? `${selectedConflict["Currency_Devaluation_%"]}%` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Official vs Black-market Gap</span>
              <span className="font-mono font-bold text-slate-300">
                {selectedConflict["Currency_Black_Market_Rate_Gap_%"] != null ? `${selectedConflict["Currency_Black_Market_Rate_Gap_%"]}%` : 'N/A'}
              </span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-850/80 space-y-3">
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-800 pb-2">Employment & Sectors</h3>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Pre-war Unemployment</span>
              <span className="font-mono font-bold text-slate-300">
                {selectedConflict["Pre_War_Unemployment_%"] != null ? `${selectedConflict["Pre_War_Unemployment_%"]}%` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Wartime Unemployment</span>
              <span className="font-mono font-bold text-slate-300">
                {selectedConflict["During_War_Unemployment_%"] != null ? `${selectedConflict["During_War_Unemployment_%"]}%` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Unemployment Spike</span>
              <span className="font-mono font-bold text-indigo-400">
                {selectedConflict.Unemployment_Spike_Percentage_Points != null ? `+${selectedConflict.Unemployment_Spike_Percentage_Points} pt` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Youth Unemployment Change</span>
              <span className="font-mono font-bold text-slate-300">
                {selectedConflict["Youth_Unemployment_Change_%"] != null ? `+${selectedConflict["Youth_Unemployment_Change_%"]}%` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Most Impacted Sector</span>
              <span className="font-semibold text-slate-300">{selectedConflict.Most_Affected_Sector || 'N/A'}</span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-850/80 space-y-3">
            <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest border-b border-slate-800 pb-2">Social & Poverty Impact</h3>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Pre-war Poverty Rate</span>
              <span className="font-mono font-bold text-slate-300">
                {selectedConflict["Pre_War_Poverty_Rate_%"] != null ? `${selectedConflict["Pre_War_Poverty_Rate_%"]}%` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Wartime Poverty Rate</span>
              <span className="font-mono font-bold text-red-400 font-semibold">
                {selectedConflict["During_War_Poverty_Rate_%"] != null ? `${selectedConflict["During_War_Poverty_Rate_%"]}%` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Extreme Poverty Rate</span>
              <span className="font-mono font-bold text-slate-300">
                {selectedConflict["Extreme_Poverty_Rate_%"] != null ? `${selectedConflict["Extreme_Poverty_Rate_%"]}%` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Food Insecurity Rate</span>
              <span className="font-mono font-bold text-amber-500 font-semibold">
                {selectedConflict["Food_Insecurity_Rate_%"] != null ? `${selectedConflict["Food_Insecurity_Rate_%"]}%` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Poverty Fallen Households</span>
              <span className="font-mono font-bold text-slate-300">
                {selectedConflict.Households_Fallen_Into_Poverty_Estimate != null ? selectedConflict.Households_Fallen_Into_Poverty_Estimate?.toLocaleString() : 'N/A'}
              </span>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-850/80 space-y-4">
            <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest border-b border-slate-800 pb-2">Destruction & Capital Liability</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850">
                <span className="text-[10px] text-slate-500 block">COST OF WAR</span>
                <span className="font-mono text-base font-bold text-indigo-400">{formatUSD(selectedConflict.Cost_of_War_USD)}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850">
                <span className="text-[10px] text-slate-500 block">EST. RECONSTRUCTION</span>
                <span className="font-mono text-base font-bold text-emerald-400">{formatUSD(selectedConflict.Estimated_Reconstruction_Cost_USD)}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-850/80 space-y-3">
            <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest border-b border-slate-800 pb-2">Informal Economy & Shadow Trade</h3>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Pre-war Informal Economy Size</span>
              <span className="font-mono text-slate-300">{selectedConflict["Informal_Economy_Size_Pre_War_%"] != null ? `${selectedConflict["Informal_Economy_Size_Pre_War_%"]}%` : 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Wartime Informal Economy Size</span>
              <span className="font-mono font-bold text-amber-400">{selectedConflict["Informal_Economy_Size_During_War_%"] != null ? `${selectedConflict["Informal_Economy_Size_During_War_%"]}%` : 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Black Market Activity severity</span>
              <span className="font-bold text-slate-300">{selectedConflict.Black_Market_Activity_Level || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Primary Illicit Goods</span>
              <span className="font-semibold text-slate-300 text-right max-w-[200px] truncate">{selectedConflict.Primary_Black_Market_Goods || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">War Profiteering Documented</span>
              <span className={`px-2 py-0.2 rounded font-bold text-[10px] ${selectedConflict.War_Profiteering_Documented === 'Yes' ? 'bg-red-500/10 text-red-500' : 'bg-slate-800 text-slate-400'}`}>
                {selectedConflict.War_Profiteering_Documented || 'N/A'}
              </span>
            </div>
          </div>

        </div>

        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-all active:scale-95"
          >
            Close Modal
          </button>
        </div>

      </div>
    </div>
  );
};
