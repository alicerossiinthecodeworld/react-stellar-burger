import React from 'react';
import PropTypes from 'prop-types';
import ingredientStyles from './ingredient-details.module.css';
import { useSelector} from 'react-redux';

const IngredientDetails = () => {
  const currentIngredient = useSelector(state => state.ingredientDetails.currentIngredient);
  console.log(currentIngredient)
  return (
    <div className={ingredientStyles.ingredientWindow}>
      <h2 className={ingredientStyles.ingredientHeader}>Детали ингредиента</h2>
      <img className={ingredientStyles.ingredientPic} src={currentIngredient.image} alt={currentIngredient.name} />
      <p className={ingredientStyles.ingredientTitle}>{currentIngredient.name}</p>
      <div className={ingredientStyles.ingredientData}>
        <p className={ingredientStyles.ingredientText}>Калории, ккал: {currentIngredient.calories}</p>
        <p className={ingredientStyles.ingredientText}>&nbsp;&nbsp;Белки, г: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{currentIngredient.proteins}</p>
        <p className={ingredientStyles.ingredientText}>&nbsp;&nbsp;Жиры, г: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{currentIngredient.fat}</p>
        <p className={ingredientStyles.ingredientText}>Углеводы, г: &nbsp;&nbsp; {currentIngredient.carbohydrates}</p>
      </div>
    </div>
  );
};

IngredientDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default IngredientDetails;