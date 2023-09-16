import { CALCULATE_TOTAL_COST } from '../actions/burger-constructor-actions';

import { useReducer } from 'react';

const initialState = {
  totalCost: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case CALCULATE_TOTAL_COST:
      const totalCost = action.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
      return { ...state, totalCost };
    default:
      return state;
  }
}

export function useBurgerConstructorReducer() {
  return useReducer(reducer, initialState);
}
