import { createSlice } from '@reduxjs/toolkit';

export const activeTabSlice = createSlice({
  name: 'activeTab',
  initialState: {
    current: 'buns',
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.current = action.payload;
    },
  },
});

export const { setActiveTab } = activeTabSlice.actions;

export default activeTabSlice.reducer;