import { createSlice } from '@reduxjs/toolkit'
import { Order } from '../components/orders-zone/orders-zone';
import { request } from '../utils/api-config';
import { refreshAccessToken } from './auth-slice';
import { AppDispatch } from './store';


type OrderState = {
  order: Order | null; 
  loading: boolean;
  error: string | null;
};

const initialState: OrderState = {
  order: null,
  loading: false,
  error: null,
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
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
      state.order = null;
    },
  },
});

export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
  clearOrder,
} = orderSlice.actions;

export const fetchOrderById = async(orderId: number) => {
  try {
    const response = await request(`/orders/${orderId}`);
    console.log(response);
    return response.orders[0];
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
    throw error;
  }
};


export const createOrder = (ingredientIds:number[]) => async (dispatch: AppDispatch) => {
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
  } catch (error:any) {
    dispatch(createOrderFailure(`Error: ${error.message}`));
  }
};

export default orderSlice.reducer;
