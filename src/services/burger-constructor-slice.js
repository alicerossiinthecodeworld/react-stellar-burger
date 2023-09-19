import { createSlice } from '@reduxjs/toolkit';

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: {
    totalCost: 0,
    selectedIngredients: [], // Добавьте массив для хранения выбранных ингредиентов
  },
  reducers: {
    calculateTotalCost: (state, action) => {
      state.totalCost = action.payload.reduce((acc, ingredient) => acc + ingredient.price, 0);
    },
    addIngredient: (state, action) => {
      state.selectedIngredients.push(action.payload);
    },
    removeIngredient: (state, action) => {
      state.selectedIngredients = state.selectedIngredients.filter(
        (ingredient) => ingredient._id !== action.payload._id
      );
    },
  },
});

export const { calculateTotalCost, addIngredient, removeIngredient } = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;