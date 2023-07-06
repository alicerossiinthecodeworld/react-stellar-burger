import React from 'react';
import PropTypes from 'prop-types';
import IngredientTabs from '../ingredientTabs/ingredientTabs';
import ingredientsStyles from './burgerIngredients.module.css';
import IngredientBoxItem from '../ingredientBoxItem/ingredientBoxItem';
import { data } from '../../utils/data';

function BurgerIngredients() {
  // Filter the ingredients by category
  const bunIngredients = data.filter((item) => item.type === 'bun');
  const sauceIngredients = data.filter((item) => item.type === 'sauce');
  const mainIngredients = data.filter((item) => item.type === 'main');

  return (
    <div>
      <h1 className={ingredientsStyles.ingredient__header}>Соберите бургер</h1>
      <IngredientTabs />
      <div className={ingredientsStyles.ingredient__boxWrapper}>
        <div className={ingredientsStyles.ingredient__box}>
          <h2 className={ingredientsStyles.ingredient__boxHeader}>Булки</h2>
          <div className={ingredientsStyles.ingredient__boxItems}>
            {bunIngredients.map((ingredient) => (
              <IngredientBoxItem
                key={ingredient.id}
                imageSrc={ingredient.image}
                alt={ingredient.name}
                price={ingredient.price}
                name={ingredient.name}
                count={ingredient.count}
              />
            ))}
          </div>
        </div>
        <div className={ingredientsStyles.ingredient__box}>
          <h2 className={ingredientsStyles.ingredient__boxHeader}>Соусы</h2>
          <div className={ingredientsStyles.ingredient__boxItems}>
            {sauceIngredients.map((ingredient) => (
              <IngredientBoxItem
                key={ingredient.id}
                imageSrc={ingredient.image}
                alt={ingredient.name}
                price={ingredient.price}
                name={ingredient.name}
                count={ingredient.count}
              />
            ))}
          </div>
        </div>
        <div className={ingredientsStyles.ingredient__box}>
          <h2 className={ingredientsStyles.ingredient__boxHeader}>Начинка</h2>
          <div className={ingredientsStyles.ingredient__boxItems}>
            {mainIngredients.map((ingredient) => (
              <IngredientBoxItem
                key={ingredient.id}
                imageSrc={ingredient.image}
                alt={ingredient.name}
                price={ingredient.price}
                name={ingredient.name}
                count={ingredient.count}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default BurgerIngredients;
