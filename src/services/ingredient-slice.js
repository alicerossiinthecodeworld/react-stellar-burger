import { createSlice } from '@reduxjs/toolkit';
import { request } from '../utils/api-config';

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
  dispatch(fetchIngredientsRequest());
  const response = await request(`/ingredients`);
  if (response.success) {
    dispatch(fetchIngredientsSuccess(response));
  } else {

    dispatch(fetchIngredientsFailure(`Ошибка ${response.status}`));
  }
};

export default ingredientsSlice.reducer;
