import React from 'react';
import ingredientStyles from './ingredientDetails.module.css'
import {CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const IngredientDetails = ({ ingredient, onClose }) => {
  return (
    <div className={ingredientStyles.ingredientWindow}>
      <h2 className={ingredientStyles.ingredientHeader}>Детали ингредиента</h2>
      <img className={ingredientStyles.ingredientPic} src={ingredient.image}/>
      <p className={ingredientStyles.ingredientTitle}>{ingredient.name}</p>
      <div className={ingredientStyles.ingredientData}>
        <p className={ingredientStyles.ingredientText}>Калории, ккал: {ingredient.calories}</p>
        <p className={ingredientStyles.ingredientText}>&nbsp;&nbsp;Белки, г: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ingredient.proteins}</p>
        <p className={ingredientStyles.ingredientText}>&nbsp;&nbsp;Жиры, г: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ingredient.fat}</p>
        <p className={ingredientStyles.ingredientText}>Углеводы, г: &nbsp;&nbsp; {ingredient.carbohydrates}</p>
      </div>
      <div className={ingredientStyles.ingredientClose}>
        <CloseIcon onClick={onClose} />
      </div>
    </div>
  );
};

export default IngredientDetails;