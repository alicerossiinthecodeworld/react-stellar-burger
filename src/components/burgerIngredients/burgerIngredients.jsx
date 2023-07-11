import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IngredientTabs from '../ingredientTabs/ingredientTabs';
import ingredientsStyles from './burgerIngredients.module.css';
import IngredientBoxItem from '../ingredientBoxItem/ingredientBoxItem';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredientDetails/ingredientDetails';

function BurgerIngredients({ ingredients, isLoading, hasError }) {
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = (ingredient) => {
    setSelectedIngredient(ingredient);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <div>Loading ingredients...</div>;
  }

  if (hasError) {
    console.log("Error occurred while fetching ingredients");
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
                count={ingredient.count}
                onClick={() => handleOpenModal(ingredient)}
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
                count={ingredient.count}
                onClick={() => handleOpenModal(ingredient)}
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
                count={ingredient.count}
                onClick={() => handleOpenModal(ingredient)}
              />
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <IngredientDetails ingredient={selectedIngredient} onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}
 


BurgerIngredients.propTypes = {
  ingredients: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
};

export default BurgerIngredients;