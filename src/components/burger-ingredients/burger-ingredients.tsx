import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import IngredientTabs from '../ingredient-tabs/ingredient-tabs';
import ingredientsStyles from './burger-ingredients.module.css';
import IngredientBoxItem from '../ingredient-box-item/ingredient-box-item';
import { setActiveTab } from '../../services/active-tab-slice';
import { RootState } from '../../services/store';
import React from 'react';

export enum IngredientType {
  Bun = "bun",
  Filling = "filling",
  Sauce = "sauce",
  Main = "main"
}

export type Ingredient = {
  _id: string;
  name: string;
  type: IngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uniqueId: string;
};



export const getIngredientCount = (selectedIngredients: Ingredient[], ingredientId: string) => {
  return selectedIngredients.filter((ingredient: Ingredient) => ingredient._id === ingredientId).length;
};

function BurgerIngredients() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ingredients = useSelector((state: RootState) => state.ingredients.data)||[];
  const isLoading = useSelector((state: RootState) => state.ingredients.loading);
  const selectedIngredients = useSelector((state: RootState) => state.burgerConstructor.selectedIngredients)|| [];
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


  const handleIngredientClick = (ingredientId: string) => {
    navigate(`/ingredients/${ingredientId}`, { state: { fromIngredientClick: true } })
  };

  if (isLoading) {
    return <div>Loading ingredients...</div>;
  }

  const bunIngredients = Array.isArray(ingredients) 
    ? ingredients.filter((item: Ingredient) => item.type === IngredientType.Bun)
    : [];
  const sauceIngredients = Array.isArray(ingredients) 
    ? ingredients.filter((item: Ingredient) => item.type === IngredientType.Sauce)
    : [];
  const mainIngredients = Array.isArray(ingredients) 
    ? ingredients.filter((item: Ingredient) => item.type === IngredientType.Main)
    : [];
  return (
    <div>
      <h1 className={ingredientsStyles.ingredient__header}>Соберите бургер</h1>
      <IngredientTabs />
      <div ref={ingredientBoxWrapperRef} className={ingredientsStyles.ingredient__boxWrapper}>
        <div ref={bunRef} className={ingredientsStyles.ingredient__box} id='buns'>
          <h2 className={ingredientsStyles.ingredient__boxHeader}>Булки</h2>
          <div className={ingredientsStyles.ingredient__boxItems}>
            {bunIngredients?.map((ingredient: Ingredient, index: number) => {
              return (
                <IngredientBoxItem
                  key={index} 
                  imageSrc={ingredient.image}
                  alt={ingredient.name}
                  price={ingredient.price}
                  name={ingredient.name}
                  ingredientCount={getIngredientCount(selectedIngredients, ingredient._id)}
                  ingredient={ingredient}
                  onClick={() => handleIngredientClick(ingredient._id)}
                />
              );
            })}
          </div>

        </div>
        <div ref={sauceRef} className={ingredientsStyles.ingredient__box} id='sauces'>
          <h2 className={ingredientsStyles.ingredient__boxHeader}>Соусы</h2>
          <div className={ingredientsStyles.ingredient__boxItems}>
            {sauceIngredients?.map((ingredient: Ingredient, index: number) => (
              <IngredientBoxItem
                key={index}
                imageSrc={ingredient.image}
                alt={ingredient.name}
                price={ingredient.price}
                name={ingredient.name}
                ingredientCount={getIngredientCount(selectedIngredients, ingredient._id)}
                ingredient={ingredient}
                onClick={() => handleIngredientClick(ingredient._id)}
              />
            ))}
          </div>
        </div>
        <div ref={mainRef} className={ingredientsStyles.ingredient__box} id='fillings'>
          <h2 className={ingredientsStyles.ingredient__boxHeader}>Начинка</h2>
          <div className={ingredientsStyles.ingredient__boxItems}>
            {mainIngredients?.map((ingredient: Ingredient, index: number) => (
              <IngredientBoxItem
                key={index}
                imageSrc={ingredient.image}
                alt={ingredient.name}
                price={ingredient.price}
                name={ingredient.name}
                ingredientCount={getIngredientCount(selectedIngredients, ingredient._id)}
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


export default BurgerIngredients;
