import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';
import { fallbackStats, fallbackRegionBreakdown, fallbackConflicts } from '../services/mockData';

export const fetchDashboardData = createAsyncThunk('data/fetchDashboardData', async (_, { rejectWithValue }) => {
  try {
    const overviewRes = await api.get('/stats/overview');
    const regionRes = await api.get('/stats/by-region');
    const peakInf = await api.get('/stats/highest-inflation');
    const peakGdp = await api.get('/stats/lowest-gdp');
    const peakCost = await api.get('/stats/highest-war-cost');

    if (overviewRes.data && overviewRes.data.success) {
      const ovData = overviewRes.data.data;
      const transformedStats = {
        totalConflicts: ovData.overview.totalConflicts || 10308,
        ongoingConflicts: ovData.statusBreakdown?.find(s => s._id === 'Ongoing')?.count || 3124,
        resolvedConflicts: ovData.statusBreakdown?.find(s => s._id === 'Resolved')?.count || 7184,
        avgGdpChange: ovData.overview.avgGdpChange || -24.58,
        highestInflation: peakInf.data?.success && peakInf.data?.data ? peakInf.data.data : fallbackStats.highestInflation,
        lowestGdp: peakGdp.data?.success && peakGdp.data?.data ? peakGdp.data.data : fallbackStats.lowestGdp,
        highestWarCost: peakCost.data?.success && peakCost.data?.data ? peakCost.data.data : fallbackStats.highestWarCost,
      };
      
      return {
        stats: transformedStats,
        regionStats: regionRes.data?.success ? regionRes.data.data : fallbackRegionBreakdown,
        isApiLive: true
      };
    }
    throw new Error("Failed to fetch");
  } catch (err) {
    return rejectWithValue({
      stats: fallbackStats,
      regionStats: fallbackRegionBreakdown,
      isApiLive: false
    });
  }
});

export const fetchConflictsList = createAsyncThunk('data/fetchConflictsList', async (params, { rejectWithValue }) => {
  try {
    const res = await api.get('/conflicts', { params });
    if (res.data && res.data.success) {
      return {
        conflicts: res.data.data,
        totalPages: res.data.pagination.totalPages,
        totalRecords: res.data.pagination.total,
        isApiLive: true
      };
    }
    throw new Error("Failed to fetch");
  } catch (err) {
    // Offline mode client side filtering
    let localList = [...fallbackConflicts];
    if (params.keyword) {
      const query = params.keyword.toLowerCase();
      localList = localList.filter(c => 
        c.Conflict_Name.toLowerCase().includes(query) ||
        c.Primary_Country.toLowerCase().includes(query) ||
        c.Conflict_Type.toLowerCase().includes(query) ||
        c.Region.toLowerCase().includes(query)
      );
    }
    if (params.status && params.status !== 'All') {
      localList = localList.filter(c => c.Status === params.status);
    }
    if (params.region && params.region !== 'All') {
      localList = localList.filter(c => c.Region === params.region);
    }
    if (params.sort) {
      const isDesc = params.sort.startsWith('-');
      const field = isDesc ? params.sort.substring(1) : params.sort;
      localList.sort((a, b) => {
        let valA = a[field];
        let valB = b[field];
        if (valA == null) return 1;
        if (valB == null) return -1;
        if (typeof valA === 'string') return isDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
        return isDesc ? valB - valA : valA - valB;
      });
    }

    return rejectWithValue({
      conflicts: localList,
      totalPages: 1,
      totalRecords: localList.length,
      isApiLive: false
    });
  }
});

const initialState = {
  stats: fallbackStats,
  regionStats: fallbackRegionBreakdown,
  conflicts: fallbackConflicts,
  totalPages: 1,
  totalRecords: 6,
  isApiLive: true,
  loading: false,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.regionStats = action.payload.regionStats;
        state.isApiLive = action.payload.isApiLive;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.stats = action.payload.stats;
          state.regionStats = action.payload.regionStats;
          state.isApiLive = action.payload.isApiLive;
        }
      })
      .addCase(fetchConflictsList.fulfilled, (state, action) => {
        state.conflicts = action.payload.conflicts;
        state.totalPages = action.payload.totalPages;
        state.totalRecords = action.payload.totalRecords;
        state.isApiLive = action.payload.isApiLive;
      })
      .addCase(fetchConflictsList.rejected, (state, action) => {
        if (action.payload) {
          state.conflicts = action.payload.conflicts;
          state.totalPages = action.payload.totalPages;
          state.totalRecords = action.payload.totalRecords;
          state.isApiLive = action.payload.isApiLive;
        }
      });
  },
});

export default dataSlice.reducer;
