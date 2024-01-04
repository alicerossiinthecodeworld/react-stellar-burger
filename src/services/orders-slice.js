import { createSlice } from '@reduxjs/toolkit';
import { request } from '../utils/api-config';

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

export const fetchOrderById = (orderId) => async () => {
  try {
    const response = await request(`/orders/${orderId}`)
    console.log(response)
    return response.orders[0];
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

export default ordersSlice.reducer;
