import { createSlice } from '@reduxjs/toolkit';

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    setProfileOrders: (state, action) => {
      state.data = action.payload;
    },
    setProfileFeedLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProfileFeedError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProfileOrders, setProfileFeedLoading, setProfileFeedError} = profileOrdersSlice.actions;

export default profileOrdersSlice.reducer;
