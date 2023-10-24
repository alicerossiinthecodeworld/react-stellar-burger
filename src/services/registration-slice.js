import { createSlice } from '@reduxjs/toolkit';
import { request } from '../utils/api-config';
import { updateIsAuthenticated } from './auth-slice';
import Cookies from 'js-cookie';


const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    registrationRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    registrationSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      Cookies.set('refreshToken', action.payload.refreshToken, { expires: 365 }); 
    },
    registrationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const {
  registrationRequest,
  registrationSuccess,
  registrationFailure,
  clearUser,
} = registrationSlice.actions;

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

    if (response.success && response.user) {
      dispatch(registrationSuccess(response.user));
      dispatch(updateIsAuthenticated(true));
    } else {
      dispatch(registrationFailure('Не получилось зарегистрироваться, пожалуйста, проверьте данные'));
    }
  } catch (error) {
    dispatch(registrationFailure(`Error: ${error.message}`));
  }
};

export default registrationSlice.reducer;
