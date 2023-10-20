import { createSlice } from '@reduxjs/toolkit';
import { request } from '../utils/api-config';

const logoutSlice = createSlice({
  name: 'logout',
  initialState: {
    success: false,
    error: null,
  },
  reducers: {
    logoutRequest: (state) => {
      state.success = false;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.success = true;
    },
    logoutFailure: (state, action) => {
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const {
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} = logoutSlice.actions;

export const logoutUser = (refreshToken) => async (dispatch) => {
  try {
    dispatch(logoutRequest());
    const response = await request('/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: refreshToken }),
    });

    if (response.success) {
      dispatch(logoutSuccess());
    } else {
      dispatch(logoutFailure(response.message));
    }
  } catch (error) {
    dispatch(logoutFailure(`Error: ${error.message}`));
  }
};

export default logoutSlice.reducer;
