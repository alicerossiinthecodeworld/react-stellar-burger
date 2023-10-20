import { createSlice } from '@reduxjs/toolkit';
import { request } from '../utils/api-config'; 
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false, 
    loading: false,
    error: null,
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true; 
      Cookies.set('refreshToken', action.payload.refreshToken, { expires: 365 }); 
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearUser: (state) => {
      state.user = null;
    },
    updateIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    }
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  clearUser,
  updateIsAuthenticated,
} = authSlice.actions;

export const login = (userData) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const response = await request('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.success && response.user) {
      dispatch(loginSuccess(response.user))
      console.log("залогинен успешно")
      window.location.href = '/';
    } else {
      dispatch(loginFailure('Не получилось войти, проверьте данные'));
    }
  } catch (error) {
    dispatch(loginFailure(`Error: ${error.message}`));
  }
};

export default authSlice.reducer;
