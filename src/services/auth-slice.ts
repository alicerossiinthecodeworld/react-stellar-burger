import { createSlice } from '@reduxjs/toolkit';
import { request, TServerResponse } from '../utils/api-config';
import { AppDispatch, CustomError } from './store';

type TUserResponse = TServerResponse<{
  user:UserType,
  accessToken:string,
  refreshToken:string,
  success:boolean
}>;

interface UserType {
  email: string;
  name: string;
  password?: string;
}

type AuthStateType = {
  user: UserType | null,
  isAuthenticated: boolean,
  loading: boolean,
  error?: object | null,
  success: boolean,
  isAuthChecked: boolean,
  refreshToken: string|null,
  accessToken: string|null
}

const authState: AuthStateType = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  success: false,
  isAuthChecked: false,
  refreshToken: localStorage.getItem('refreshToken'),
  accessToken: localStorage.getItem('accessToken')
}

const authSlice = createSlice({
  name: 'auth',
  initialState:authState,
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
      state.user = null;
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
      localStorage.setItem('refreshToken', action.payload.refreshToken);
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
    },
    saveAccessToken: (state, action) => {
      state.accessToken = action.payload
      localStorage.setItem('accessToken', action.payload);
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
  saveRefreshToken,
  saveAccessToken
} = authSlice.actions;

export const login = (userData: {
  email: string,
  password: string
}) => async (dispatch: AppDispatch) => {
  try {
    dispatch(loginRequest());
    const response = await request('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    }) as TUserResponse;
    if (response.success && response.user) {
      dispatch(loginSuccess(response.user))
      dispatch(saveRefreshToken(response.refreshToken))
      dispatch(saveAccessToken(response.accessToken))
    } else {
      dispatch(loginFailure('Не получилось войти, проверьте данные'));
    }
  } catch (error) {
    const loginError = error as CustomError; 
    dispatch(loginFailure(`Error: ${loginError.message}`));
  }
};

export const registerUser = (userData:UserType) => async (dispatch:AppDispatch) => {
  try {
    dispatch(registrationRequest());
    const response = await request('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    }) as TUserResponse;
    if (response && response) {
      dispatch(registrationSuccess(response.user));
      dispatch(saveRefreshToken(response.refreshToken));
      dispatch(saveAccessToken(response.accessToken))
    } else {
      dispatch(registrationFailure('Не получилось зарегистрироваться, пожалуйста, проверьте данные'));
    }
  } catch (error) {
    const registrationError = error as CustomError; 
    dispatch(registrationFailure(`Error: ${registrationError.message}`));
  }
};
export const updateUser = (userData:UserType) => async (dispatch:AppDispatch) => {
  const AccessToken = await refreshAccessToken()
  try {
    dispatch(updateUserRequest());
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (AccessToken) {
      headers['Authorization'] = AccessToken;
    }
    const response = await request('/auth/user', {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(userData),
    })as TUserResponse;

    if (response.success && response.user) {
      dispatch(updateUserSuccess(response.user));
    } else {
      dispatch(updateUserFailure('Не удалось обновить данные пользователя'));
    }
  } catch (error) {
    const updateUserError = error as CustomError; 
    dispatch(updateUserFailure(`Error: ${updateUserError.message}`));
  }
};

export const logoutUser = () => async (dispatch:AppDispatch) => {
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
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userData')
    return response;
  } catch (error) {
    let logoutError = error as CustomError; 
    dispatch(logoutFailure(`Error: ${logoutError.message}`));
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

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    const response = await request('/auth/token',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: refreshToken }),
    } ) as TUserResponse
    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem('accessToken', response.accessToken)
    return response.accessToken;
  }
  catch (error) {
    console.error('Failed to refresh token');
  }
}