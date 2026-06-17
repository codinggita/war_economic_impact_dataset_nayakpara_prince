import React from 'react';

const formatUSD = (num) => {
  if (num == null) return 'N/A';
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return `$${num.toLocaleString()}`;
};

export const DashboardCard = ({ title, mainValue, iconColorClass, iconPath, subtextLabel, subtextValue, additionalData }) => {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 shadow-md relative overflow-hidden group hover:border-slate-700/80 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{title}</p>
          <h3 className={`text-3xl font-bold font-sans mt-2 ${additionalData?.valueColor || 'text-white'}`}>
            {mainValue}
          </h3>
        </div>
        <div className={`p-2.5 rounded-xl ${iconColorClass}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
          </svg>
        </div>
      </div>
      {subtextLabel && (
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
          <span className="font-medium text-slate-300">{subtextLabel}</span>
          <span className="font-bold">{subtextValue}</span>
        </div>
      )}
      {additionalData?.progress && (
        <div className="mt-4">
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${additionalData.progress}%` }}></div>
          </div>
          <div className="flex justify-between mt-1.5 text-[10px] text-slate-400">
            <span>{additionalData.progressLabel1}</span>
            <span>{additionalData.progressLabel2}</span>
          </div>
        </div>
      )}
      {additionalData?.truncateBlock && (
        <div className="mt-3 text-xs text-slate-400 truncate">
          <span className="font-semibold text-slate-300">{additionalData.truncateBlock.title || 'N/A'}</span>
          <span className="block text-[10px] text-slate-500">{additionalData.truncateBlock.subtitle || 'N/A'}</span>
        </div>
      )}
    </div>
  );
};
