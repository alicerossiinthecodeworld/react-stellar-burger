import { createSlice } from '@reduxjs/toolkit';
import { Ingredient } from '../components/burger-ingredients/burger-ingredients';
import { request, TServerResponse } from '../utils/api-config';
import { AppDispatch } from './store';

type TIngredientsResponse = TServerResponse<{
  data: Ingredient[];
}>;

type IngredientState = {
  data: {data:Ingredient[]} | null; 
  loading: boolean;
  error: string | null;
};

const initialState: IngredientState = {
  data: null,
  loading: false,
  error: null,
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    fetchIngredientsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchIngredientsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    },
    fetchIngredientsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchIngredientsRequest, fetchIngredientsSuccess, fetchIngredientsFailure } = ingredientsSlice.actions;

export const fetchIngredients = () => async (dispatch:AppDispatch) => {
  dispatch(fetchIngredientsRequest());
  const response = await request<TIngredientsResponse>('/ingredients');
    if (response.success) {
    dispatch(fetchIngredientsSuccess(response));
  } else {
    dispatch(fetchIngredientsFailure(`Ошибка получения ингридиентов`));
  }
};

export default ingredientsSlice.reducer;
