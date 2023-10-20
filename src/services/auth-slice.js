import { createSlice } from '@reduxjs/toolkit';
import { request } from '../utils/api-config'; // Подключите функцию для отправки запросов на сервер

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
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
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
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

export default authSlice.reducer;
