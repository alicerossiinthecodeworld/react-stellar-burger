import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ingredientInfoStyles from './ingredient-info-page.module.css'
import { fetchIngredients } from '../../services/ingredient-slice';

export const IngredientInfoPage = () => {
  const { ingredientId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  const ingredients = useSelector((state) => state.ingredients.data)
  if (!ingredients || !ingredients.data) {
    return null
  }
  const currentIngredient = ingredients.data.find(ingredient => ingredient._id === ingredientId)

  return (
    <div className = {ingredientInfoStyles.page}>
      <h2 className={ingredientInfoStyles.ingredientHeader}>Детали ингредиента</h2>
      <img className={ingredientInfoStyles.ingredientPic} src={currentIngredient.image} alt={currentIngredient.name} />
      <p className={ingredientInfoStyles.ingredientTitle}>{currentIngredient.name}</p>
      <div className={ingredientInfoStyles.ingredientData}>
        <p className={ingredientInfoStyles.ingredientText}>Калории, ккал:</p>
        <p className={ingredientInfoStyles.ingredientText}>Белки, г:</p>
        <p className={ingredientInfoStyles.ingredientText}>Жиры, г:</p>
        <p className={ingredientInfoStyles.ingredientText}>Углеводы, г:</p>
        <p className={ingredientInfoStyles.ingredientNumber}>{currentIngredient.calories}</p>
        <p className={ingredientInfoStyles.ingredientNumber}>{currentIngredient.proteins}</p>
        <p className={ingredientInfoStyles.ingredientNumber}>{currentIngredient.fat}</p>
        <p className={ingredientInfoStyles.ingredientNumber}>{currentIngredient.carbohydrates}</p>
      </div>
    </div>
  )
}

