import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchConflictsList } from '../store/dataSlice';
import { ConflictModal } from '../components/ConflictModal';

const Explorer = () => {
  const dispatch = useDispatch();
  const { conflicts, totalPages, totalRecords } = useSelector((state) => state.data);

  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('-Start_Year');
  const [selectedConflict, setSelectedConflict] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchConflictsList({
      page,
      limit: 8,
      sort: sortBy,
      keyword: searchQuery || undefined,
      region: regionFilter !== 'All' ? regionFilter : undefined,
      status: statusFilter !== 'All' ? statusFilter : undefined
    }));
  }, [dispatch, page, searchQuery, regionFilter, statusFilter, sortBy]);

  const handleRowClick = (conflict) => {
    setSelectedConflict(conflict);
    setModalOpen(true);
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortBy(`-${field}`);
    } else {
      setSortBy(field);
    }
    setPage(1);
  };

  return (
    <div className="space-y-6 animate-scale-in">
      <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center flex-grow">
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search name, country or type..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 focus:border-rose-500 focus:outline-none transition-all text-sm font-sans"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>

          <div>
            <select
              value={regionFilter}
              onChange={(e) => { setRegionFilter(e.target.value); setPage(1); }}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 focus:border-rose-500 focus:outline-none transition-all text-sm"
            >
              <option value="All">All Regions</option>
              <option value="Europe">Europe</option>
              <option value="Middle East">Middle East</option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Latin America">Latin America</option>
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 focus:border-rose-500 focus:outline-none transition-all text-sm"
            >
              <option value="All">All Statuses</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
          Found <span className="text-white font-mono text-sm">{totalRecords}</span> Conflicts
        </div>
      </div>

      <div className="glass-panel rounded-2xl border border-slate-800/80 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-[11px] font-bold text-slate-400 tracking-wider uppercase select-none">
                <th className="py-4 px-6 cursor-pointer hover:text-white transition-colors" onClick={() => toggleSort('Conflict_Name')}>Conflict Name</th>
                <th className="py-4 px-6 cursor-pointer hover:text-white transition-colors" onClick={() => toggleSort('Primary_Country')}>Country</th>
                <th className="py-4 px-6 cursor-pointer hover:text-white transition-colors" onClick={() => toggleSort('Region')}>Region</th>
                <th className="py-4 px-6 cursor-pointer hover:text-white transition-colors" onClick={() => toggleSort('Status')}>Status</th>
                <th className="py-4 px-6 cursor-pointer hover:text-white transition-colors" onClick={() => toggleSort('Start_Year')}>Year</th>
                <th className="py-4 px-6 cursor-pointer hover:text-white transition-colors" onClick={() => toggleSort('GDP_Change_%')}>GDP Contraction</th>
                <th className="py-4 px-6 cursor-pointer hover:text-white transition-colors" onClick={() => toggleSort('Inflation_Rate_%')}>Inflation</th>
                <th className="py-4 px-6">Main Sector</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-xs">
              {conflicts.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-12 text-center text-slate-400 font-semibold">
                    No conflicts matching current query found.
                  </td>
                </tr>
              ) : (
                conflicts.map((conflict, index) => (
                  <tr
                    key={conflict._id || index}
                    onClick={() => handleRowClick(conflict)}
                    className="hover:bg-slate-800/35 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-6 font-bold text-white group-hover:text-rose-400 transition-colors">
                      {conflict.Conflict_Name}
                    </td>
                    <td className="py-4 px-6 text-slate-200">{conflict.Primary_Country}</td>
                    <td className="py-4 px-6 text-slate-400">{conflict.Region}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${conflict.Status === 'Ongoing' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>
                        {conflict.Status}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono text-slate-300">
                      {conflict.Start_Year} {conflict.End_Year ? `- ${conflict.End_Year}` : '(Ongoing)'}
                    </td>
                    <td className={`py-4 px-6 font-bold font-mono ${conflict["GDP_Change_%"] < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {conflict["GDP_Change_%"] != null ? `${conflict["GDP_Change_%"]}%` : 'N/A'}
                    </td>
                    <td className="py-4 px-6 font-mono text-rose-400 font-semibold">
                      {conflict["Inflation_Rate_%"] != null ? `${conflict["Inflation_Rate_%"]?.toLocaleString()}%` : 'N/A'}
                    </td>
                    <td className="py-4 px-6 text-slate-400 truncate max-w-[120px]">
                      {conflict.Most_Affected_Sector || 'N/A'}
                    </td>
                    <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleRowClick(conflict)}
                        className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white rounded-lg transition-all text-[10px] font-bold"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between p-2">
        <div className="text-xs text-slate-500">
          Page <span className="font-bold text-slate-300">{page}</span> of <span className="font-bold text-slate-300">{totalPages}</span>
        </div>
        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage(prev => Math.max(1, prev - 1))}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-all active:scale-95"
          >
            &larr; Previous Page
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-all active:scale-95"
          >
            Next Page &rarr;
          </button>
        </div>
      </div>

      {modalOpen && <ConflictModal selectedConflict={selectedConflict} onClose={() => { setModalOpen(false); setSelectedConflict(null); }} />}
    </div>
  );
};

export default Explorer;
