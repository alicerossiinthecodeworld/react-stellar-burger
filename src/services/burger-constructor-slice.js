import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedIngredients: [], 
  totalCost: 0,
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      const existingIngredient = state.selectedIngredients.find(
        (ingredient) => ingredient._id === action.payload._id
      );
      if (existingIngredient) {
        state.selectedIngredients.push(action.payload);
      } else {
        state.selectedIngredients.push(action.payload);
      }
      console.log(state.selectedIngredients)
    },
    removeIngredient: (state, action) => {
      const indexToRemove = state.selectedIngredients.findIndex(
        (ingredient) => ingredient._id === action.payload._id
      );
      
      if (indexToRemove !== -1) {
        state.selectedIngredients.splice(indexToRemove, 1);
      }
    },
    calculateTotalCost: (state) => {
      state.totalCost = state.selectedIngredients.reduce(
        (acc, ingredient) => acc + ingredient.price,
        0
      );
    },
    updateIngredientOrder: (state, action) => {
      state.selectedIngredients = [...action.payload]; 
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
