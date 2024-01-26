import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Order } from '../components/orders-zone/orders-zone';
import { request, TServerResponse } from '../utils/api-config';
import { refreshAccessToken } from './auth-slice';
import { AppDispatch } from './store';

type OrderState = {
  order: Order|[];
  loading: boolean;
  error: string | null| undefined;
};
type TOrdersResponse = TServerResponse<{
  data: {orders:Order[]
         success:boolean,
         message?:string};
}>;

type TCreateOrderResponse = TServerResponse<{
  data: {order:Order
         success:boolean,
         message?:string};
}>;

const initialState: OrderState = {
  order: [],
  loading: false,
  error: null,
};

export const fetchOrderById = createAsyncThunk(
  'order/fetchById',
  async (orderId: number, thunkAPI) => {
    try {
      const response = await request <TOrdersResponse>(`/orders/${orderId}`);
      return response.data.orders[0]; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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
      state.order = [];
    },
    setOrder:(state, action:{payload:Order}) =>{
      state.order = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
  clearOrder,
  setOrder
} = orderSlice.actions;

export const createOrder = (ingredientIds: string[]) => async (dispatch: AppDispatch) => {
  try {
    const AccessToken = await refreshAccessToken();
    dispatch(createOrderRequest());
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (AccessToken) {
      headers['Authorization'] = AccessToken;
    }
    const response = await request<TCreateOrderResponse>('/orders', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ ingredients: ingredientIds }),
    });

    if (response.success && response.data.order) {
      dispatch(createOrderSuccess(response.data.order));
    } else {
      dispatch(createOrderFailure('Failed to create order'));
    }
  } catch (error: any) {
    dispatch(createOrderFailure(`Error: ${error.message}`));
  }
};

export default orderSlice.reducer;
