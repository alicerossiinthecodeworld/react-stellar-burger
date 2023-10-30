import { createSlice } from '@reduxjs/toolkit';
import { request } from '../utils/api-config';
import { updateIsAuthenticated } from './auth-slice';

const logoutSlice = createSlice({
  name: 'logout',
  initialState: {
    success: false,
    error: null,
    isAuthenticated: true, 
  },
  reducers: {
    logoutRequest: (state) => {
      state.success = false;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.success = true;
      state.isAuthenticated = false;
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
    dispatch(logoutSuccess());
    dispatch(updateIsAuthenticated(false));
    return response;
  } catch (error) {
    dispatch(logoutFailure(`Error: ${error.message}`));
  }
};

export default logoutSlice.reducer;
