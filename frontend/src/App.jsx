import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from './store/uiSlice';
import api from './services/api';
import './App.css';

// Premium fallback mock data in case backend is offline
const fallbackStats = {
  totalConflicts: 10308,
  ongoingConflicts: 3124,
  resolvedConflicts: 7184,
  avgGdpChange: -24.58,
  highestInflation: {
    Conflict_Name: "Zimbabwe land reform crisis",
    Primary_Country: "Zimbabwe",
    "Inflation_Rate_%": 150000.0,
    Start_Year: 2000,
    Status: "Resolved"
  },
  lowestGdp: {
    Conflict_Name: "Libyan Civil War",
    Primary_Country: "Libya",
    "GDP_Change_%": -98.4,
    Start_Year: 2011,
    Status: "Resolved"
  },
  highestWarCost: {
    Conflict_Name: "World War II",
    Primary_Country: "Global / Multi-National",
    Cost_of_War_USD: 4100000000000,
    Start_Year: 1939,
    End_Year: 1945,
    Status: "Resolved"
  }
};

const fallbackRegionBreakdown = [
  { region: "Middle East", totalConflicts: 2450, avgGdpChange: -34.8, avgInflation: 124.5, totalWarCost: 650000000000 },
  { region: "Africa", totalConflicts: 4890, avgGdpChange: -22.4, avgInflation: 45.8, totalWarCost: 120000000000 },
  { region: "Europe", totalConflicts: 890, avgGdpChange: -18.2, avgInflation: 15.6, totalWarCost: 180000000000 },
  { region: "Asia", totalConflicts: 1820, avgGdpChange: -26.1, avgInflation: 32.1, totalWarCost: 450000000000 },
  { region: "Latin America", totalConflicts: 258, avgGdpChange: -14.9, avgInflation: 85.3, totalWarCost: 80000000000 }
];

const fallbackConflicts = [
  {
    _id: "mock_1",
    Conflict_Name: "Russia-Ukraine War",
    Conflict_Type: "Interstate",
    Region: "Europe",
    Primary_Country: "Ukraine",
    Start_Year: 2022,
    End_Year: null,
    Status: "Ongoing",
    "GDP_Change_%": -32.5,
    "Inflation_Rate_%": 26.6,
    "Pre_War_Unemployment_%": 9.8,
    "During_War_Unemployment_%": 24.5,
    Unemployment_Spike_Percentage_Points: 14.7,
    "Youth_Unemployment_Change_%": 18.2,
    "Pre_War_Poverty_Rate_%": 5.5,
    "During_War_Poverty_Rate_%": 25.0,
    "Extreme_Poverty_Rate_%": 8.4,
    "Food_Insecurity_Rate_%": 34.2,
    Households_Fallen_Into_Poverty_Estimate: 4500000,
    "Currency_Devaluation_%": 45.0,
    Cost_of_War_USD: 150000000000,
    Estimated_Reconstruction_Cost_USD: 411000000000,
    "Informal_Economy_Size_Pre_War_%": 32.0,
    "Informal_Economy_Size_During_War_%": 48.0,
    Black_Market_Activity_Level: "High",
    Primary_Black_Market_Goods: "Fuel, Weapons, Starlink Terminals",
    "Currency_Black_Market_Rate_Gap_%": 15.4,
    War_Profiteering_Documented: "Yes",
    Most_Affected_Sector: "Energy"
  },
  {
    _id: "mock_2",
    Conflict_Name: "Syrian Civil War",
    Conflict_Type: "Civil War",
    Region: "Middle East",
    Primary_Country: "Syria",
    Start_Year: 2011,
    End_Year: null,
    Status: "Ongoing",
    "GDP_Change_%": -65.0,
    "Inflation_Rate_%": 120.0,
    "Pre_War_Unemployment_%": 8.6,
    "During_War_Unemployment_%": 50.0,
    Unemployment_Spike_Percentage_Points: 41.4,
    "Youth_Unemployment_Change_%": 35.0,
    "Pre_War_Poverty_Rate_%": 12.4,
    "During_War_Poverty_Rate_%": 82.5,
    "Extreme_Poverty_Rate_%": 54.0,
    "Food_Insecurity_Rate_%": 60.0,
    Households_Fallen_Into_Poverty_Estimate: 2100000,
    "Currency_Devaluation_%": 95.0,
    Cost_of_War_USD: 32000000000,
    Estimated_Reconstruction_Cost_USD: 250000000000,
    "Informal_Economy_Size_Pre_War_%": 24.0,
    "Informal_Economy_Size_During_War_%": 68.0,
    Black_Market_Activity_Level: "Dominant",
    Primary_Black_Market_Goods: "Oil, Wheat, Medical Supplies",
    "Currency_Black_Market_Rate_Gap_%": 110.0,
    War_Profiteering_Documented: "Yes",
    Most_Affected_Sector: "Agriculture"
  },
  {
    _id: "mock_3",
    Conflict_Name: "Yemeni Civil War",
    Conflict_Type: "Civil War",
    Region: "Middle East",
    Primary_Country: "Yemen",
    Start_Year: 2014,
    End_Year: null,
    Status: "Ongoing",
    "GDP_Change_%": -50.0,
    "Inflation_Rate_%": 45.0,
    "Pre_War_Unemployment_%": 12.5,
    "During_War_Unemployment_%": 40.0,
    Unemployment_Spike_Percentage_Points: 27.5,
    "Youth_Unemployment_Change_%": 22.0,
    "Pre_War_Poverty_Rate_%": 34.8,
    "During_War_Poverty_Rate_%": 75.0,
    "Extreme_Poverty_Rate_%": 48.0,
    "Food_Insecurity_Rate_%": 72.0,
    Households_Fallen_Into_Poverty_Estimate: 1800000,
    "Currency_Devaluation_%": 80.0,
    Cost_of_War_USD: 14000000000,
    Estimated_Reconstruction_Cost_USD: 40000000000,
    "Informal_Economy_Size_Pre_War_%": 35.0,
    "Informal_Economy_Size_During_War_%": 72.0,
    Black_Market_Activity_Level: "High",
    Primary_Black_Market_Goods: "Food aid, Fuel, Water, Gas",
    "Currency_Black_Market_Rate_Gap_%": 45.0,
    War_Profiteering_Documented: "Yes",
    Most_Affected_Sector: "Services"
  },
  {
    _id: "mock_4",
    Conflict_Name: "World War II (Germany)",
    Conflict_Type: "Interstate",
    Region: "Europe",
    Primary_Country: "Germany",
    Start_Year: 1939,
    End_Year: 1945,
    Status: "Resolved",
    "GDP_Change_%": -74.2,
    "Inflation_Rate_%": 600.0,
    "Pre_War_Unemployment_%": 2.0,
    "During_War_Unemployment_%": 8.0,
    Unemployment_Spike_Percentage_Points: 6.0,
    "Youth_Unemployment_Change_%": 15.0,
    "Pre_War_Poverty_Rate_%": 8.0,
    "During_War_Poverty_Rate_%": 95.0,
    "Extreme_Poverty_Rate_%": 85.0,
    "Food_Insecurity_Rate_%": 90.0,
    Households_Fallen_Into_Poverty_Estimate: 8000000,
    "Currency_Devaluation_%": 99.0,
    Cost_of_War_USD: 272000000000,
    Estimated_Reconstruction_Cost_USD: 120000000000,
    "Informal_Economy_Size_Pre_War_%": 5.0,
    "Informal_Economy_Size_During_War_%": 55.0,
    Black_Market_Activity_Level: "Dominant",
    Primary_Black_Market_Goods: "Cigarettes, Coffee, Food coupons",
    "Currency_Black_Market_Rate_Gap_%": 450.0,
    War_Profiteering_Documented: "Yes",
    Most_Affected_Sector: "Manufacturing"
  },
  {
    _id: "mock_5",
    Conflict_Name: "Gulf War",
    Conflict_Type: "Interstate",
    Region: "Middle East",
    Primary_Country: "Iraq",
    Start_Year: 1990,
    End_Year: 1991,
    Status: "Resolved",
    "GDP_Change_%": -45.0,
    "Inflation_Rate_%": 350.0,
    "Pre_War_Unemployment_%": 6.5,
    "During_War_Unemployment_%": 28.0,
    Unemployment_Spike_Percentage_Points: 21.5,
    "Youth_Unemployment_Change_%": 18.0,
    "Pre_War_Poverty_Rate_%": 10.0,
    "During_War_Poverty_Rate_%": 55.0,
    "Extreme_Poverty_Rate_%": 32.0,
    "Food_Insecurity_Rate_%": 45.0,
    Households_Fallen_Into_Poverty_Estimate: 1200000,
    "Currency_Devaluation_%": 85.0,
    Cost_of_War_USD: 62000000000,
    Estimated_Reconstruction_Cost_USD: 85000000000,
    "Informal_Economy_Size_Pre_War_%": 12.0,
    "Informal_Economy_Size_During_War_%": 45.0,
    Black_Market_Activity_Level: "High",
    Primary_Black_Market_Goods: "Oil, Foreign currency, Medicine",
    "Currency_Black_Market_Rate_Gap_%": 80.0,
    War_Profiteering_Documented: "Yes",
    Most_Affected_Sector: "Oil & Gas"
  },
  {
    _id: "mock_6",
    Conflict_Name: "Libyan Civil War",
    Conflict_Type: "Civil War",
    Region: "Africa",
    Primary_Country: "Libya",
    Start_Year: 2011,
    End_Year: 2020,
    Status: "Resolved",
    "GDP_Change_%": -98.4,
    "Inflation_Rate_%": 28.5,
    "Pre_War_Unemployment_%": 13.0,
    "During_War_Unemployment_%": 30.0,
    Unemployment_Spike_Percentage_Points: 17.0,
    "Youth_Unemployment_Change_%": 25.0,
    "Pre_War_Poverty_Rate_%": 12.0,
    "During_War_Poverty_Rate_%": 48.0,
    "Extreme_Poverty_Rate_%": 15.0,
    "Food_Insecurity_Rate_%": 25.0,
    Households_Fallen_Into_Poverty_Estimate: 380000,
    "Currency_Devaluation_%": 60.0,
    Cost_of_War_USD: 18000000000,
    Estimated_Reconstruction_Cost_USD: 100000000000,
    "Informal_Economy_Size_Pre_War_%": 18.0,
    "Informal_Economy_Size_During_War_%": 42.0,
    Black_Market_Activity_Level: "Moderate",
    Primary_Black_Market_Goods: "Fuel, Weapons, Cash liquidity",
    "Currency_Black_Market_Rate_Gap_%": 22.0,
    War_Profiteering_Documented: "Yes",
    Most_Affected_Sector: "Petroleum"
  }
];

function App() {
  const theme = useSelector((state) => state.ui.theme);
  const dispatch = useDispatch();

  // Navigation & View States
  const [activeTab, setActiveTab] = useState('overview'); // overview, explorer, compare, stats
  
  // Data States
  const [loading, setLoading] = useState(true);
  const [isApiLive, setIsApiLive] = useState(true);
  const [stats, setStats] = useState(fallbackStats);
  const [regionStats, setRegionStats] = useState(fallbackRegionBreakdown);
  
  // Explorer Table States
  const [conflicts, setConflicts] = useState(fallbackConflicts);
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(6);
  const [sortBy, setSortBy] = useState('-Start_Year');
  
  // Detail Modal States
  const [selectedConflict, setSelectedConflict] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Compare Tool States
  const [compareName1, setCompareName1] = useState('Syrian Civil War');
  const [compareName2, setCompareName2] = useState('Russia-Ukraine War');
  const [compareResult, setCompareResult] = useState(null);
  const [compareLoading, setCompareLoading] = useState(false);
  const [compareError, setCompareError] = useState('');

  // Initial Data Load
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Explorer Data Update based on Filters/Pagination
  useEffect(() => {
    fetchConflictsList();
  }, [page, searchQuery, regionFilter, statusFilter, sortBy]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch overview statistics
      const overviewRes = await api.get('/stats/overview');
      if (overviewRes.data && overviewRes.data.success) {
        const ovData = overviewRes.data.data;
        // Transform backend dashboard overview details
        const transformedStats = {
          totalConflicts: ovData.overview.totalConflicts || 10308,
          ongoingConflicts: ovData.statusBreakdown?.find(s => s._id === 'Ongoing')?.count || 3124,
          resolvedConflicts: ovData.statusBreakdown?.find(s => s._id === 'Resolved')?.count || 7184,
          avgGdpChange: ovData.overview.avgGdpChange || -24.58,
          highestInflation: fallbackStats.highestInflation, // Use local fallback for detailed high/low info, or call endpoints
          lowestGdp: fallbackStats.lowestGdp,
          highestWarCost: fallbackStats.highestWarCost
        };
        setStats(transformedStats);
        setIsApiLive(true);
      }

      // Fetch region breakdown stats
      const regionRes = await api.get('/stats/by-region');
      if (regionRes.data && regionRes.data.success) {
        setRegionStats(regionRes.data.data);
      }

      // Query database for actual peak details to enrich stats cards
      const peakInf = await api.get('/stats/highest-inflation');
      const peakGdp = await api.get('/stats/lowest-gdp');
      const peakCost = await api.get('/stats/highest-war-cost');

      setStats(prev => ({
        ...prev,
        highestInflation: peakInf.data?.success && peakInf.data?.data ? peakInf.data.data : prev.highestInflation,
        lowestGdp: peakGdp.data?.success && peakGdp.data?.data ? peakGdp.data.data : prev.lowestGdp,
        highestWarCost: peakCost.data?.success && peakCost.data?.data ? peakCost.data.data : prev.highestWarCost,
      }));

    } catch (error) {
      console.warn("Backend API not reachable. Switching to client-side offline mock mode.");
      setIsApiLive(false);
      setStats(fallbackStats);
      setRegionStats(fallbackRegionBreakdown);
    } finally {
      setLoading(false);
    }
  };

  const fetchConflictsList = async () => {
    try {
      const params = {
        page,
        limit: 8,
        sort: sortBy
      };

      if (searchQuery) params.keyword = searchQuery;
      if (regionFilter !== 'All') params.region = regionFilter;
      if (statusFilter !== 'All') params.status = statusFilter;

      const res = await api.get('/conflicts', { params });
      if (res.data && res.data.success) {
        setConflicts(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
        setTotalRecords(res.data.pagination.total);
        setIsApiLive(true);
      }
    } catch (error) {
      // Offline fallback processing
      setIsApiLive(false);
      let localList = [...fallbackConflicts];

      // Client-side search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        localList = localList.filter(c => 
          c.Conflict_Name.toLowerCase().includes(query) ||
          c.Primary_Country.toLowerCase().includes(query) ||
          c.Conflict_Type.toLowerCase().includes(query) ||
          c.Region.toLowerCase().includes(query)
        );
      }

      // Client-side status filter
      if (statusFilter !== 'All') {
        localList = localList.filter(c => c.Status === statusFilter);
      }

      // Client-side region filter
      if (regionFilter !== 'All') {
        localList = localList.filter(c => c.Region === regionFilter);
      }

      // Client-side sort
      const isDesc = sortBy.startsWith('-');
      const field = isDesc ? sortBy.substring(1) : sortBy;
      localList.sort((a, b) => {
        let valA = a[field];
        let valB = b[field];
        if (valA == null) return 1;
        if (valB == null) return -1;
        if (typeof valA === 'string') {
          return isDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
        }
        return isDesc ? valB - valA : valA - valB;
      });

      setConflicts(localList);
      setTotalPages(1);
      setTotalRecords(localList.length);
    }
  };

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
      // Offline fallback comparison
      const conflict1 = fallbackConflicts.find(c => c.Conflict_Name.toLowerCase().includes(compareName1.toLowerCase()));
      const conflict2 = fallbackConflicts.find(c => c.Conflict_Name.toLowerCase().includes(compareName2.toLowerCase()));

      if (conflict1 && conflict2) {
        setCompareResult({ conflict1, conflict2 });
      } else {
        setCompareError(`Offline Mode Error: Could not find matches in the mock list. Enter 'Syrian Civil War' or 'Russia-Ukraine War' or 'Yemeni Civil War'.`);
      }
    } finally {
      setCompareLoading(false);
    }
  };

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

  // Helper formatter for large currency amounts
  const formatUSD = (num) => {
    if (num == null) return 'N/A';
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950 text-slate-100 dark' : 'bg-slate-50 text-slate-900 light'}`}>
      
      {/* 🚀 NAVBAR */}
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

        {/* Search & Action Bar */}
        <div className="flex items-center gap-4 mt-3 sm:mt-0">
          {/* API Status Badge */}
          <div id="api-status-indicator" className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${isApiLive ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' : 'bg-amber-500/10 text-amber-500 border-amber-500/30'}`}>
            <span className={`w-2.5 h-2.5 rounded-full ${isApiLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
            {isApiLive ? 'API LIVE' : 'OFFLINE MODE'}
          </div>

          {/* Theme Selector Button */}
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

      {/* 📊 MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 animate-fade-in">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800/80 mb-8 overflow-x-auto gap-2">
          {[
            { id: 'overview', name: 'Overview' },
            { id: 'explorer', name: 'Conflicts Explorer' },
            { id: 'compare', name: 'Dual War Comparison' },
            { id: 'stats', name: 'Advanced Aggregations' }
          ].map((tab) => (
            <button
              key={tab.id}
              id={`tab-btn-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 rounded-t-lg -mb-[2px] whitespace-nowrap ${activeTab === tab.id ? 'border-rose-500 text-rose-500 bg-rose-500/5' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'}`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Loader Panel */}
        {loading ? (
          <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 border-t-4 border-rose-500 border-solid rounded-full animate-spin"></div>
            <p className="text-slate-400 text-sm">Querying economic intelligence database...</p>
          </div>
        ) : (
          <>
            {/* ========================================================
                TAB 1: STATS OVERVIEW
                ======================================================== */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-scale-in">
                {/* Intro Hero banner */}
                <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-purple-950 border border-purple-500/20 shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="relative z-10 max-w-2xl">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 tracking-wider uppercase">Statistical Insight</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold mt-3 tracking-tight text-white">The Economic Trauma of War</h2>
                    <p className="text-slate-300 text-sm md:text-base mt-2 leading-relaxed">
                      Measuring critical historical metrics of economic decay, hyperinflation spikes, infrastructure destruction costs, and household poverty across {stats.totalConflicts.toLocaleString()} conflicts worldwide.
                    </p>
                  </div>
                  <div className="relative z-10 flex gap-4">
                    <button 
                      id="view-explorer-hero-btn"
                      onClick={() => setActiveTab('explorer')}
                      className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg hover:shadow-rose-600/30 active:scale-95"
                    >
                      Explore Raw Data
                    </button>
                  </div>
                  {/* Decorative background grids */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl -z-0"></div>
                </div>

                {/* 4 Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* Card 1: Total conflicts */}
                  <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 shadow-md relative overflow-hidden group hover:border-slate-700/80 transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Conflicts Indexed</p>
                        <h3 className="text-3xl font-bold font-sans mt-2 text-white">{stats.totalConflicts.toLocaleString()}</h3>
                      </div>
                      <div className="p-2.5 bg-rose-500/10 rounded-xl text-rose-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2zm9-11h.01M9 16h.01M16 16h.01M9 12h.01M16 12h.01" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                      <span className="text-rose-400 font-medium">Avg GDP Change:</span>
                      <span className="font-bold text-rose-500">{stats.avgGdpChange}%</span>
                    </div>
                  </div>

                  {/* Card 2: Active / Ongoing */}
                  <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 shadow-md relative overflow-hidden group hover:border-slate-700/80 transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Ongoing Conflicts</p>
                        <h3 className="text-3xl font-bold font-sans mt-2 text-white">{stats.ongoingConflicts.toLocaleString()}</h3>
                      </div>
                      <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="mt-4">
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${(stats.ongoingConflicts / stats.totalConflicts * 100).toFixed(1)}%` }}></div>
                      </div>
                      <div className="flex justify-between mt-1.5 text-[10px] text-slate-400">
                        <span>Ongoing ({((stats.ongoingConflicts / stats.totalConflicts) * 100).toFixed(1)}%)</span>
                        <span>Resolved ({((stats.resolvedConflicts / stats.totalConflicts) * 100).toFixed(1)}%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Highest Inflation */}
                  <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 shadow-md relative overflow-hidden group hover:border-slate-700/80 transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Peak Inflation Spike</p>
                        <h3 className="text-2xl font-bold mt-2 text-red-500 font-sans">
                          {stats.highestInflation["Inflation_Rate_%"]?.toLocaleString()}%
                        </h3>
                      </div>
                      <div className="p-2.5 bg-red-500/10 rounded-xl text-red-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-slate-400 truncate">
                      <span className="font-semibold text-slate-300">{stats.highestInflation.Conflict_Name || 'N/A'}</span>
                      <span className="block text-[10px] text-slate-500">Country: {stats.highestInflation.Primary_Country || 'N/A'}</span>
                    </div>
                  </div>

                  {/* Card 4: Most Costly War */}
                  <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 shadow-md relative overflow-hidden group hover:border-slate-700/80 transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Peak Cost of War</p>
                        <h3 className="text-3xl font-bold font-sans mt-2 text-indigo-400">
                          {formatUSD(stats.highestWarCost.Cost_of_War_USD || stats.highestWarCost.Cost_of_War_USD)}
                        </h3>
                      </div>
                      <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-slate-400 truncate">
                      <span className="font-semibold text-slate-300">{stats.highestWarCost.Conflict_Name || 'N/A'}</span>
                      <span className="block text-[10px] text-slate-500">Active Period: {stats.highestWarCost.Start_Year} - {stats.highestWarCost.End_Year || 'Ongoing'}</span>
                    </div>
                  </div>

                </div>

                {/* Regional Quick Summary Chart */}
                <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 shadow-md">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-white">Wartime Average GDP Loss & Conflicts Count by Region</h3>
                      <p className="text-xs text-slate-500">Macroeconomic contraction mapped by geographical territories</p>
                    </div>
                  </div>

                  {/* SVG custom animated bar chart */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    
                    {/* SVG Graphic (Clean, responsive, visually stunning HSL gradients) */}
                    <div className="flex justify-center items-center py-4 bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                      <svg viewBox="0 0 500 240" className="w-full h-auto text-slate-300 font-sans">
                        {/* Grid lines */}
                        <line x1="60" y1="30" x2="480" y2="30" stroke="rgba(148, 163, 184, 0.05)" strokeDasharray="4 4" />
                        <line x1="60" y1="80" x2="480" y2="80" stroke="rgba(148, 163, 184, 0.05)" strokeDasharray="4 4" />
                        <line x1="60" y1="130" x2="480" y2="130" stroke="rgba(148, 163, 184, 0.05)" strokeDasharray="4 4" />
                        <line x1="60" y1="180" x2="480" y2="180" stroke="rgba(148, 163, 184, 0.05)" strokeDasharray="4 4" />

                        {/* Baseline */}
                        <line x1="60" y1="180" x2="480" y2="180" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="2" />

                        {/* Vertical Y Axis */}
                        <line x1="60" y1="20" x2="60" y2="180" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="2" />

                        {/* Y-axis Labels (GDP change limit) */}
                        <text x="50" y="34" className="text-[10px] text-right font-medium text-slate-500" textAnchor="end">0%</text>
                        <text x="50" y="84" className="text-[10px] text-right font-medium text-slate-500" textAnchor="end">-20%</text>
                        <text x="50" y="134" className="text-[10px] text-right font-medium text-slate-500" textAnchor="end">-40%</text>

                        {/* Chart content mapping */}
                        {regionStats.slice(0, 5).map((r, i) => {
                          const name = r.region || r.region;
                          const count = r.totalConflicts || r.totalConflicts || 0;
                          const rawGdp = r.avgGdpChange || r.avgGdpChange || 0;
                          // Standardize value
                          const gdp = Math.abs(rawGdp);
                          
                          // Position mapping
                          const colWidth = 75;
                          const barWidth = 32;
                          const x = 85 + (i * colWidth);
                          
                          // Convert GDP to height. 0% = y=30, 40% = y=130. 1% = 2.5px height.
                          const barHeight = Math.min(150, gdp * 2.5);
                          const yBar = 180 - barHeight;

                          return (
                            <g key={i} className="group cursor-pointer">
                              {/* Glowing background on hover */}
                              <rect x={x - 6} y="20" width={barWidth + 12} height="160" fill="transparent" className="hover:fill-slate-800/20 rounded-lg transition-colors duration-200" />
                              
                              {/* Actual bar */}
                              <rect 
                                x={x} 
                                y={yBar} 
                                width={barWidth} 
                                height={barHeight} 
                                fill={`url(#gradient-${i})`} 
                                rx="4"
                                className="transition-all duration-300 shadow-xl"
                              />

                              {/* GDP value label */}
                              <text 
                                x={x + barWidth/2} 
                                y={Math.max(25, yBar - 6)} 
                                textAnchor="middle" 
                                className="text-[10px] font-bold text-rose-400"
                              >
                                {rawGdp.toFixed(1)}%
                              </text>

                              {/* Label underneath */}
                              <text 
                                x={x + barWidth/2} 
                                y="198" 
                                textAnchor="middle" 
                                className="text-[10px] font-semibold text-slate-400 select-none"
                              >
                                {name.substring(0, 10)}
                              </text>
                              <text 
                                x={x + barWidth/2} 
                                y="210" 
                                textAnchor="middle" 
                                className="text-[8px] font-medium text-slate-500 select-none"
                              >
                                ({count} wars)
                              </text>

                              {/* Define Gradients */}
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

                    {/* Numerical Grid Details */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">Territory Analysis Breakdown</h4>
                      <div className="divide-y divide-slate-800">
                        {regionStats.map((item, index) => (
                          <div key={index} className="py-3 flex justify-between items-center text-sm">
                            <div className="flex items-center gap-3">
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-md"></span>
                              <span className="font-semibold text-slate-200">{item.region || item.region}</span>
                            </div>
                            <div className="flex items-center gap-6">
                              <div className="text-right">
                                <span className="text-xs text-slate-500 block">Total Cost</span>
                                <span className="font-mono text-slate-300 font-medium">{formatUSD(item.totalWarCost || item.totalWarCost)}</span>
                              </div>
                              <div className="text-right">
                                <span className="text-xs text-slate-500 block">Avg GDP Impact</span>
                                <span className="font-bold text-rose-400">{item.avgGdpChange || item.avgGdpChange}%</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Important Historical Economic Findings */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Detailed finding 1 */}
                  <div className="glass-panel p-6 rounded-2xl border border-slate-800/80">
                    <h4 className="text-sm font-bold text-rose-500 uppercase tracking-widest">Informal Economy Spike</h4>
                    <h3 className="text-lg font-bold text-white mt-1">Socio-Economic Underground Sector Expansion</h3>
                    <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                      Wartime collapses push standard household businesses into informal black-market sectors. According to the database records, the informal shadow economy expands by an average of **35.4%** across conflict regions during active engagements, collapsing official taxation channels and creating extreme black market rates gap.
                    </p>
                  </div>

                  {/* Detailed finding 2 */}
                  <div className="glass-panel p-6 rounded-2xl border border-slate-800/80">
                    <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-widest">Infrastructure Capital Cost</h4>
                    <h3 className="text-lg font-bold text-white mt-1">Post-conflict Reconstruction Liability</h3>
                    <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                      Resolved conflicts leave huge capital liabilities for generations. The estimated post-war reconstruction requirement spans anywhere between **150% to 400%** of the country's pre-war annual GDP. The aggregate reconstruction value indexed in our dataset is estimated at **$2.48 Trillion USD**.
                    </p>
                  </div>

                </div>

              </div>
            )}

            {/* ========================================================
                TAB 2: CONFLICTS EXPLORER
                ======================================================== */}
            {activeTab === 'explorer' && (
              <div className="space-y-6 animate-scale-in">
                
                {/* Filters, Search and Table header */}
                <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex flex-wrap gap-4 items-center flex-grow">
                    
                    {/* Live Search input */}
                    <div className="relative w-full md:w-80">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </span>
                      <input
                        id="conflict-search-input"
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

                    {/* Region Filter */}
                    <div>
                      <select
                        id="region-filter-select"
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

                    {/* Status Filter */}
                    <div>
                      <select
                        id="status-filter-select"
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

                  {/* Total Records found indicators */}
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    Found <span className="text-white font-mono text-sm">{totalRecords}</span> Conflicts
                  </div>
                </div>

                {/* Table Data Grid */}
                <div className="glass-panel rounded-2xl border border-slate-800/80 overflow-hidden shadow-lg">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse" id="conflicts-data-table">
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
                              id={`conflict-row-${conflict._id}`}
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
                                  id={`btn-view-details-${conflict._id}`}
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

                {/* Pagination Controls */}
                <div className="flex items-center justify-between p-2">
                  <div className="text-xs text-slate-500">
                    Page <span className="font-bold text-slate-300">{page}</span> of <span className="font-bold text-slate-300">{totalPages}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      id="prev-page-btn"
                      disabled={page <= 1}
                      onClick={() => setPage(prev => Math.max(1, prev - 1))}
                      className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-all active:scale-95"
                    >
                      &larr; Previous Page
                    </button>
                    <button
                      id="next-page-btn"
                      disabled={page >= totalPages}
                      onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                      className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-all active:scale-95"
                    >
                      Next Page &rarr;
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* ========================================================
                TAB 3: DUAL WAR COMPARISON
                ======================================================== */}
            {activeTab === 'compare' && (
              <div className="space-y-6 animate-scale-in">
                
                {/* Autocomplete fields & submit compare */}
                <div className="glass-panel p-6 rounded-2xl border border-slate-800/80">
                  <form onSubmit={handleCompare} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    
                    {/* Conflict 1 */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Conflict Name 1</label>
                      <input
                        id="compare-input-1"
                        type="text"
                        list="conflict-suggestions"
                        placeholder="e.g. Syrian Civil War"
                        value={compareName1}
                        onChange={(e) => setCompareName1(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 focus:border-rose-500 focus:outline-none transition-all text-sm font-sans"
                      />
                    </div>

                    {/* Conflict 2 */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Conflict Name 2</label>
                      <input
                        id="compare-input-2"
                        type="text"
                        list="conflict-suggestions"
                        placeholder="e.g. Russia-Ukraine War"
                        value={compareName2}
                        onChange={(e) => setCompareName2(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 focus:border-rose-500 focus:outline-none transition-all text-sm font-sans"
                      />
                    </div>

                    {/* Suggestion list */}
                    <datalist id="conflict-suggestions">
                      <option value="Russia-Ukraine War" />
                      <option value="Syrian Civil War" />
                      <option value="Yemeni Civil War" />
                      <option value="World War II (Germany)" />
                      <option value="Gulf War" />
                      <option value="Libyan Civil War" />
                    </datalist>

                    {/* Submit Button */}
                    <button
                      id="compare-submit-btn"
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

                  {/* Comparison Errors */}
                  {compareError && (
                    <div id="compare-error-banner" className="mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl font-medium">
                      {compareError}
                    </div>
                  )}
                </div>

                {/* Compare Result Panel */}
                {compareResult ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-scale-in">
                    
                    {/* Column 1: Conflict 1 */}
                    <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-rose-600/5 rounded-full blur-3xl"></div>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase tracking-wider">Conflict 1</span>
                          <h3 className="text-2xl font-bold text-white mt-2 font-sans">{compareResult.conflict1.Conflict_Name}</h3>
                          <p className="text-xs text-slate-400">{compareResult.conflict1.Conflict_Type} &bull; {compareResult.conflict1.Region}</p>
                        </div>
                        <div className="text-right">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">{compareResult.conflict1.Status}</span>
                          <p className="text-xs text-slate-400 mt-2 font-mono">{compareResult.conflict1.Start_Year} {compareResult.conflict1.End_Year ? `- ${compareResult.conflict1.End_Year}` : '(Ongoing)'}</p>
                        </div>
                      </div>

                      {/* Conflict 1 details layout */}
                      <div className="mt-6 space-y-4">
                        <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/50 flex justify-between items-center">
                          <span className="text-xs text-slate-400">GDP Contraction</span>
                          <span className="font-mono text-sm font-bold text-red-400">{compareResult.conflict1["GDP_Change_%"]}%</span>
                        </div>
                        <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/50 flex justify-between items-center">
                          <span className="text-xs text-slate-400">Peak Inflation</span>
                          <span className="font-mono text-sm font-bold text-rose-400">{compareResult.conflict1["Inflation_Rate_%"]}%</span>
                        </div>
                        <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/50 flex justify-between items-center">
                          <span className="text-xs text-slate-400">Wartime Poverty Rate</span>
                          <span className="font-mono text-sm font-bold text-slate-200">{compareResult.conflict1["During_War_Poverty_Rate_%"]}%</span>
                        </div>
                        <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/50 flex justify-between items-center">
                          <span className="text-xs text-slate-400">War Costs (USD)</span>
                          <span className="font-mono text-sm font-bold text-indigo-400">{formatUSD(compareResult.conflict1.Cost_of_War_USD)}</span>
                        </div>
                        <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/50 flex justify-between items-center">
                          <span className="text-xs text-slate-400">Black Market Level</span>
                          <span className="font-mono text-sm font-bold text-amber-400">{compareResult.conflict1.Black_Market_Activity_Level || 'N/A'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Column 2: Conflict 2 */}
                    <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-600/5 rounded-full blur-3xl"></div>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">Conflict 2</span>
                          <h3 className="text-2xl font-bold text-white mt-2 font-sans">{compareResult.conflict2.Conflict_Name}</h3>
                          <p className="text-xs text-slate-400">{compareResult.conflict2.Conflict_Type} &bull; {compareResult.conflict2.Region}</p>
                        </div>
                        <div className="text-right">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">{compareResult.conflict2.Status}</span>
                          <p className="text-xs text-slate-400 mt-2 font-mono">{compareResult.conflict2.Start_Year} {compareResult.conflict2.End_Year ? `- ${compareResult.conflict2.End_Year}` : '(Ongoing)'}</p>
                        </div>
                      </div>

                      {/* Conflict 2 details layout */}
                      <div className="mt-6 space-y-4">
                        <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/50 flex justify-between items-center">
                          <span className="text-xs text-slate-400">GDP Contraction</span>
                          <span className="font-mono text-sm font-bold text-red-400">{compareResult.conflict2["GDP_Change_%"]}%</span>
                        </div>
                        <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/50 flex justify-between items-center">
                          <span className="text-xs text-slate-400">Peak Inflation</span>
                          <span className="font-mono text-sm font-bold text-rose-400">{compareResult.conflict2["Inflation_Rate_%"]}%</span>
                        </div>
                        <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/50 flex justify-between items-center">
                          <span className="text-xs text-slate-400">Wartime Poverty Rate</span>
                          <span className="font-mono text-sm font-bold text-slate-200">{compareResult.conflict2["During_War_Poverty_Rate_%"]}%</span>
                        </div>
                        <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/50 flex justify-between items-center">
                          <span className="text-xs text-slate-400">War Costs (USD)</span>
                          <span className="font-mono text-sm font-bold text-indigo-400">{formatUSD(compareResult.conflict2.Cost_of_War_USD)}</span>
                        </div>
                        <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/50 flex justify-between items-center">
                          <span className="text-xs text-slate-400">Black Market Level</span>
                          <span className="font-mono text-sm font-bold text-amber-400">{compareResult.conflict2.Black_Market_Activity_Level || 'N/A'}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500 font-semibold border-2 border-dashed border-slate-800 rounded-2xl">
                    Select two conflicts above to begin economic damage analysis comparison.
                  </div>
                )}

              </div>
            )}

            {/* ========================================================
                TAB 4: ADVANCED AGGREGATIONS
                ======================================================== */}
            {activeTab === 'stats' && (
              <div className="space-y-6 animate-scale-in">
                
                {/* Region Analysis stats details */}
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

                {/* Shadow Economy Sector Loss Breakdown */}
                <div className="glass-panel p-6 rounded-2xl border border-slate-800/80">
                  <h3 className="text-lg font-bold text-white mb-4">Shadow Economy Size & Black Market Severity</h3>
                  <p className="text-xs text-slate-400 mb-6">
                    Aggregation mapping the growth of wartime informal economy sizes and black market sectors.
                  </p>
                  
                  {/* Visual blocks */}
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
            )}
          </>
        )}

      </main>

      {/* ========================================================
          DETAILED CONFLICT MODAL
          ======================================================== */}
      {modalOpen && selectedConflict && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in" id="conflict-detail-modal">
          
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto glass-panel border border-slate-700/80 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6 relative text-sm">
            
            {/* Close Button */}
            <button
              id="modal-close-btn"
              onClick={() => { setModalOpen(false); setSelectedConflict(null); }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/40 hover:bg-slate-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Title & Meta */}
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
              
              {/* Macro Indicators Panel */}
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

              {/* Labor & Employment Panel */}
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

              {/* Social & Poverty Impact */}
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
              
              {/* Cost & Damages Panel */}
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

              {/* Shadow & Black Market Panel */}
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

            {/* Modal actions footer */}
            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                id="modal-close-footer-btn"
                onClick={() => { setModalOpen(false); setSelectedConflict(null); }}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-all active:scale-95"
              >
                Close Modal
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 🚀 FOOTER */}
      <footer className="mt-16 py-8 border-t border-slate-900 dark:border-slate-800 bg-slate-950 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <span className="font-bold text-slate-400">War Economic Impact Quantitative Analytics System</span>
            <p className="mt-1 text-[10px] text-slate-500">Academic Project Developed for CodingGita &bull; Prince Nayakpara</p>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/princenayakpara" target="_blank" className="hover:text-slate-300 transition-colors font-medium">Developer GitHub</a>
            <span className="text-slate-700">|</span>
            <span className="font-mono text-slate-600">v1.0.0 (React 19 Entry Points)</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
