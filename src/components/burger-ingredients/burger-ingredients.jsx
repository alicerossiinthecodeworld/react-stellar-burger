import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import IngredientTabs from '../ingredient-tabs/ingredient-tabs';
import ingredientsStyles from './burger-ingredients.module.css';
import IngredientBoxItem from '../ingredient-box-item/ingredient-box-item';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

export const getIngredientCount = (selectedIngredients, ingredientId) => {
  return selectedIngredients.filter((ingredient) => ingredient._id === ingredientId).length;
};

function BurgerIngredients() {
  const navigate = useNavigate();
  const ingredients = useSelector((state) => state.ingredients.data);
  const isLoading = useSelector((state) => state.ingredients.loading);  

  const selectedIngredients = useSelector(
    (state) => state.burgerConstructor.selectedIngredients
  );

  const handleIngredientClick = (ingredientId) => {
    navigate(`/ingredient/${ingredientId}`)
  };


  if (isLoading) {
    return <div>Loading ingredients...</div>;
  }


  if (!Array.isArray(ingredients.data) || ingredients.data.length === 0) {
    return <div>No ingredients available.</div>;
  }

  const { data } = ingredients;


  const bunIngredients = data.filter((item) => item.type === 'bun');
  const sauceIngredients = data.filter((item) => item.type === 'sauce');
  const mainIngredients = data.filter((item) => item.type === 'main');

  return (
    <div>
      <h1 className={ingredientsStyles.ingredient__header}>Соберите бургер</h1>
      <IngredientTabs />
      <div className={ingredientsStyles.ingredient__boxWrapper}>
        <div className={ingredientsStyles.ingredient__box} id='buns'>
          <h2 className={ingredientsStyles.ingredient__boxHeader}>Булки</h2>
          <div className={ingredientsStyles.ingredient__boxItems}>
            {bunIngredients.map((ingredient) => (
              <IngredientBoxItem
                key={ingredient._id}
                imageSrc={ingredient.image}
                alt={ingredient.name}
                price={ingredient.price}
                name={ingredient.name}
                count={getIngredientCount(selectedIngredients, ingredient._id)}
                ingredient={ingredient}
                onClick={() => handleIngredientClick(ingredient._id)}
              />
            ))}
          </div>
        </div>
        <div className={ingredientsStyles.ingredient__box} id='sauces'>
          <h2 className={ingredientsStyles.ingredient__boxHeader}>Соусы</h2>
          <div className={ingredientsStyles.ingredient__boxItems}>
            {sauceIngredients.map((ingredient) => (
              <IngredientBoxItem
                key={ingredient._id}
                imageSrc={ingredient.image}
                alt={ingredient.name}
                price={ingredient.price}
                name={ingredient.name}
                count={getIngredientCount(selectedIngredients, ingredient._id)}
                ingredient={ingredient}
                onClick={() => handleIngredientClick(ingredient._id)}
              />
            ))}
          </div>
        </div>
        <div className={ingredientsStyles.ingredient__box} id='fillings'>
          <h2 className={ingredientsStyles.ingredient__boxHeader}>Начинка</h2>
          <div className={ingredientsStyles.ingredient__boxItems}>
            {mainIngredients.map((ingredient) => (
              <IngredientBoxItem
                key={ingredient._id}
                imageSrc={ingredient.image}
                alt={ingredient.name}
                price={ingredient.price}
                name={ingredient.name}
                count={getIngredientCount(selectedIngredients, ingredient._id)}
                ingredient={ingredient}
                onClick={() => handleIngredientClick(ingredient._id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  isLoading: PropTypes.bool,
};

export default BurgerIngredients;
