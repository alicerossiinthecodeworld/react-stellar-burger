import { createSlice } from '@reduxjs/toolkit';
import { request } from '../utils/api-config'; 
import Cookies from 'js-cookie';


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    success: false,
    isAuthChecked: false,
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.isAuthChecked = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.success = true;
      Cookies.set('refreshToken', action.payload.refreshToken, { expires: 365 });
      state.isAuthChecked = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
      state.isAuthChecked = true;
    },
    logoutRequest: (state) => {
      state.success = false;
      state.error = null;
      state.isAuthChecked = false;
    },
    logoutSuccess: (state) => {
      state.success = true;
      state.isAuthenticated = false;
      state.isAuthChecked = true;
    },
    logoutFailure: (state, action) => {
      state.success = false;
      state.error = action.payload;
      state.isAuthChecked = true;
    },
    registrationRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.isAuthChecked = false;
    },
    registrationSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.success = true;
      Cookies.set('refreshToken', action.payload.refreshToken, { expires: 365 });
      state.isAuthChecked = true;
    },
    registrationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
      state.isAuthChecked = true;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  registrationRequest,
  registrationSuccess,
  registrationFailure,
  clearUser,
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
    } else {
      dispatch(loginFailure('Не получилось войти, проверьте данные'));
    }
  } catch (error) {
    dispatch(loginFailure(`Error: ${error.message}`));
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registrationRequest());
    const response = await request('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    console.log(response.user)
    if(response && response.user) {
      console.log("я тут")
      dispatch(registrationSuccess(response.user));
    } else {
      dispatch(registrationFailure('Не получилось зарегистрироваться, пожалуйста, проверьте данные'));
    }
  } catch (error) {
    dispatch(registrationFailure(`Error: ${error.message}`));
  }
};

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
    return response;
  } catch (error) {
    dispatch(logoutFailure(`Error: ${error.message}`));
  }
};

export default authSlice.reducer;
