import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IngredientDetailDisplay, { StylesType } from '../../components/ingredient-detail-display/ingredient-detail-display'; 
import ingredientInfoStyles from './ingredient-info-page.module.css';
import { RootState } from '../../services/store';
import { Ingredient } from '../../components/burger-ingredients/burger-ingredients';
import React from 'react';

export const IngredientInfoPage = () => {
  const { ingredientId } = useParams();
  const ingredients = useSelector((state:RootState) => state.ingredients.data?.data);

  if (!ingredients) {
    return null;
  }

  const currentIngredient = ingredients.find((ingredient:Ingredient) => ingredient._id === ingredientId);

  if (!currentIngredient) {
    return null;
  }

  return (
    <div className={ingredientInfoStyles.page}>
      <IngredientDetailDisplay ingredient={currentIngredient} styles={ingredientInfoStyles as StylesType} />
    </div>
  );
}

export default IngredientInfoPage;
