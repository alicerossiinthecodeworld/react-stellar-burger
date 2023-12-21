import {useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import IngredientTabs from '../ingredient-tabs/ingredient-tabs';
import ingredientsStyles from './burger-ingredients.module.css';
import IngredientBoxItem from '../ingredient-box-item/ingredient-box-item';
import { setActiveTab } from '../../services/active-tab-slice';

export const getIngredientCount = (selectedIngredients, ingredientId) => {
  return selectedIngredients.filter((ingredient) => ingredient._id === ingredientId).length;
};

function BurgerIngredients() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.data);
  const isLoading = useSelector((state) => state.ingredients.loading);  
  const selectedIngredients = useSelector((state) => state.burgerConstructor.selectedIngredients);
  const ingredientBoxWrapperRef = useRef(null);

  const [bunRef, bunInView] = useInView({
    threshold: 0.1,
    root: ingredientBoxWrapperRef.current
  });
  const [sauceRef, sauceInView] = useInView({
    threshold: 0.1,
    root: ingredientBoxWrapperRef.current
  });
  const [mainRef, mainInView] = useInView({
    threshold: 0.1,
    root: ingredientBoxWrapperRef.current
  });

  function getView() {
    if (bunInView) {
      return 'buns';
    } 
    if (sauceInView) {
      return 'sauces';
    } 
    if (mainInView) {
      return 'fillings';
    } 
    return 'none'; 
  }
  
  useEffect(() => {
    const newActiveTab = getView();
    dispatch(setActiveTab(newActiveTab));
  }, [bunInView, sauceInView, mainInView]);


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
  console.log(ingredientBoxWrapperRef)

  return (
    <div>
      <h1 className={ingredientsStyles.ingredient__header}>Соберите бургер</h1>
      <IngredientTabs/>
      <div ref={ingredientBoxWrapperRef} className={ingredientsStyles.ingredient__boxWrapper}>
        <div ref={bunRef} className={ingredientsStyles.ingredient__box} id='buns'>
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
        <div ref={sauceRef} className={ingredientsStyles.ingredient__box} id='sauces'>
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
        <div ref={mainRef} className={ingredientsStyles.ingredient__box} id='fillings'>
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
