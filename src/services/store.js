import { configureStore } from '@reduxjs/toolkit';
import burgerConstructorReducer from './burger-constructor-reducer';
import ingredientsReducer from './ingredient-slice';

const rootReducer = {
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
