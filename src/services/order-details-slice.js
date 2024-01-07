import { createSlice } from '@reduxjs/toolkit'
import { request } from '../utils/api-config';
import { refreshAccessToken } from './auth-slice';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: [],
    loading: false,
    error: null,
  },
  reducers: {
    createOrderRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    createOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearOrder: (state) => {
      state.order = [];
    },
  },
});

export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
  clearOrder,
} = orderSlice.actions;

export const createOrder = (ingredientIds) => async (dispatch) => {
  try {
    const AccessToken = await refreshAccessToken()
    dispatch(createOrderRequest());
    const response = await request('/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': AccessToken
      },
      body: JSON.stringify({ ingredients: ingredientIds }),
    });

    if (response.success && response.order) {
      dispatch(clearOrder());
      dispatch(createOrderSuccess(response.order));
    } else {
      dispatch(createOrderFailure('Failed to create order'));
    }
  } catch (error) {
    dispatch(createOrderFailure(`Error: ${error.message}`));
  }
};

export default orderSlice.reducer;
