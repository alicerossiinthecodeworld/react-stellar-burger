import { Ingredient } from "../burger-ingredients/burger-ingredients";
import React from 'react';

export type StylesType = {
  page: string;
  ingredientHeader: string;
  ingredientPic: string;
  ingredientTitle: string;
  ingredientData: string;
  ingredientText: string;
  ingredientNumber: string;
};


const IngredientDetailDisplay = ({ingredient, styles}: { ingredient: Ingredient, styles: StylesType}) => {
  if (!ingredient) return null;
  return (
    <div className = {styles.page}>
      <h2 className={styles.ingredientHeader}>Детали ингредиента</h2>
      <img className={styles.ingredientPic} src={ingredient.image} alt={ingredient.name} />
      <p className={styles.ingredientTitle}>{ingredient.name}</p>
      <div className={styles.ingredientData}>
        <p className={styles.ingredientText}>Калории, ккал:</p>
        <p className={styles.ingredientText}>Белки, г:</p>
        <p className={styles.ingredientText}>Жиры, г:</p>
        <p className={styles.ingredientText}>Углеводы, г:</p>
        <p className={styles.ingredientNumber}>{ingredient.calories}</p>
        <p className={styles.ingredientNumber}>{ingredient.proteins}</p>
        <p className={styles.ingredientNumber}>{ingredient.fat}</p>
        <p className={styles.ingredientNumber}>{ingredient.carbohydrates}</p>
      </div>
    </div>
  )
}

export default IngredientDetailDisplay;
