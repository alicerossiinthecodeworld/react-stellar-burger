import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid4 } from 'uuid';
import { Ingredient } from '../components/burger-ingredients/burger-ingredients';


type burgerConstructorState = {
  selectedIngredients:Ingredient[]|null;
  totalCost: number,
};

const initialState:burgerConstructorState= {
  selectedIngredients: null as Ingredient[] | null, 
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
      if (!state.selectedIngredients){state.selectedIngredients=[]}
      state.selectedIngredients?.push(ingredientToAdd);
    },
    removeIngredient: (state, action) => {
      const uniqueIdToRemove = action.payload.uniqueId;
      if (state.selectedIngredients !== null) {
        state.selectedIngredients = state.selectedIngredients.filter(
          (ingredient) => ingredient.uniqueId !== uniqueIdToRemove
        );
      }
    },
    calculateTotalCost: (state) => {
      if (state.selectedIngredients !== null) {
        state.totalCost = state.selectedIngredients.reduce(
          (acc, ingredient) => acc + ingredient.price,
          0
        );
      }
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
