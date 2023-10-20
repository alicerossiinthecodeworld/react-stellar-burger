import { createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../utils/api-config';

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchIngredientsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchIngredientsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchIngredientsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchIngredientsRequest, fetchIngredientsSuccess, fetchIngredientsFailure } = ingredientsSlice.actions;

export const fetchIngredients = () => async (dispatch) => {
  try {
    dispatch(fetchIngredientsRequest());
    const response = await fetch(`${BASE_URL}/ingredients`);
    const data = await response.json();
    if (response.ok) {
      dispatch(fetchIngredientsSuccess(data));
    } else {
      dispatch(fetchIngredientsFailure(`Ошибка ${response.status}`));
    }
  } catch (error) {
    dispatch(fetchIngredientsFailure(`Ошибка: ${error.message}`));
  }
};

export default ingredientsSlice.reducer;
