import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentIngredient: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    setCurrentIngredient: (state, action) => {
      state.currentIngredient = action.payload;
    },
    clearCurrentIngredient: (state) => {
      state.currentIngredient = null;
    },
  },
});

export const { setCurrentIngredient, clearCurrentIngredient} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;