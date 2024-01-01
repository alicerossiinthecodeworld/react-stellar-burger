import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    data: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setOrders: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setTotalToday: (state, action) => {
      state.totalToday = action.payload
    }
  },
});

export const { setOrders, setLoading, setError, setTotal, setTotalToday } = ordersSlice.actions;

export default ordersSlice.reducer;
