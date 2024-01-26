import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid4 } from 'uuid';
import { Ingredient } from '../components/burger-ingredients/burger-ingredients';

type BurgerConstructorState = {
  selectedIngredients: Ingredient[];
  totalCost: number,
};

const initialState: BurgerConstructorState = {
  selectedIngredients: [], 
  totalCost: 0,
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<Ingredient>) => {
      const ingredientToAdd = {
        ...action.payload,
        uniqueId: uuid4(),
      };
      state.selectedIngredients.push(ingredientToAdd);
    },
    removeIngredient: (state, action: PayloadAction<{ uniqueId: string }>) => {
      state.selectedIngredients = state.selectedIngredients.filter(
        ingredient => ingredient.uniqueId !== action.payload.uniqueId
      );
    },
    calculateTotalCost: (state) => {
      state.totalCost = state.selectedIngredients.reduce(
        (acc: number, ingredient: Ingredient) => acc + ingredient.price,
        0
      );
    },
    updateIngredientOrder: (state, action: PayloadAction<Ingredient[]>) => {
      state.selectedIngredients = action.payload;
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
