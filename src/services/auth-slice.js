import { createSlice } from '@reduxjs/toolkit';
import { request } from '../utils/api-config';


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    success: false,
    isAuthChecked: false,
    refreshToken: localStorage.getItem('refreshToken')
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
      state.isAuthChecked = true;
      localStorage.setItem('userData', JSON.stringify(action.payload));
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
      state.user = undefined;
      state.isAuthenticated = false;
      state.isAuthChecked = true;
      localStorage.removeItem('userData');
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
      state.isAuthenticated = true
      localStorage.setItem('refreshToken', action.payload.refreshToken, { expires: 365 });
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
    updateUserRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.success = true;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    saveRefreshToken: (state, action) => {
      state.refreshToken = action.payload
      localStorage.setItem('refreshToken', action.payload);
    }
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
  updateUserFailure,
  updateUserRequest,
  updateUserSuccess,
  saveRefreshToken
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
      dispatch(saveRefreshToken(response.refreshToken))
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

    if (response && response.user) {
      dispatch(registrationSuccess(response.user));
      dispatch(saveRefreshToken(response.refreshToken));
    } else {
      dispatch(registrationFailure('Не получилось зарегистрироваться, пожалуйста, проверьте данные'));
    }
  } catch (error) {
    dispatch(registrationFailure(`Error: ${error.message}`));
  }
};
export const updateUser = (userData) => async (dispatch) => {
  const AccessToken = await refreshAccessToken()
  try {
    dispatch(updateUserRequest());
    const response = await request('/auth/user', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': AccessToken
      },
      body: JSON.stringify(userData),
    });

    if (response.success && response.user) {
      dispatch(updateUserSuccess(response.user));
    } else {
      dispatch(updateUserFailure('Не удалось обновить данные пользователя'));
    }
  } catch (error) {
    dispatch(updateUserFailure(`Error: ${error.message}`));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    const response = await request('/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    });
    dispatch(logoutSuccess());
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userData')
    return response;
  } catch (error) {
    dispatch(logoutFailure(`Error: ${error.message}`));
  }
};

export default authSlice.reducer;

export function getSavedUserData() {
  const userDataJson = localStorage.getItem('userData');

  if (userDataJson) {
    try {
      const userData = JSON.parse(userDataJson);
      return userData;
    } catch (error) {
      console.error('Ошибка при парсинге данных пользователя:', error);
    }
  }

  return null;
}

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    const response = await request('/auth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: refreshToken })
    })

    return response.accessToken;
  }
  catch (error) {
    console.error('Failed to refresh token');
  }
}