import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedIngredients: [], // Массив для хранения выбранных ингредиентов в порядке добавления
  totalCost: 0,
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      // Добавление ингредиента в конец массива
      state.selectedIngredients.push(action.payload);
    },
    removeIngredient: (state, action) => {
      // Удаление ингредиента из массива по ID
      state.selectedIngredients = state.selectedIngredients.filter(
        (ingredient) => ingredient._id !== action.payload._id
      );
    },
    calculateTotalCost: (state) => {
      // Вычисление общей стоимости
      state.totalCost = state.selectedIngredients.reduce(
        (acc, ingredient) => acc + ingredient.price,
        0
      );
    },
    updateIngredientOrder: (state, action) => {
      state.selectedIngredients = [...action.payload]; // Создаем новый массив
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  calculateTotalCost,
  updateIngredientOrder,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
