import { configureStore } from '@reduxjs/toolkit';
import burgerConstructorReducer from './burger-constructor-slice';
import ingredientsReducer from './ingredient-slice';
import ingredientDetailsReducer from './ingredient-details-slice';
import orderDetailsReducer from './order-details-slice';

const rootReducer = {
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
