import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid4 } from 'uuid';


const initialState = {
  selectedIngredients: [], 
  totalCost: 0,
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      const ingredientToAdd = {
        ...action.payload,
        uniqueId: uuid4(),
      };
      state.selectedIngredients.push(ingredientToAdd);
    },
    removeIngredient: (state, action) => {
      const uniqueIdToRemove = action.payload.uniqueId;
      state.selectedIngredients = state.selectedIngredients.filter(
        (ingredient) => ingredient.uniqueId !== uniqueIdToRemove
      );
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
