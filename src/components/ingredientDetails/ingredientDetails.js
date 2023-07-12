import React from 'react';
import PropTypes from 'prop-types';
import ingredientStyles from './ingredientDetails.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientDetails = ({ ingredient, onClose }) => {
  return (
    <div className={ingredientStyles.ingredientWindow}>
      <h2 className={ingredientStyles.ingredientHeader}>Детали ингредиента</h2>
      <img className={ingredientStyles.ingredientPic} src={ingredient.image} alt={ingredient.name} />
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

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default IngredientDetails;