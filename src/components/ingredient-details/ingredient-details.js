import ingredientStyles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const IngredientDetails = () => {
  const { ingredientId } = useParams();
  const ingredients = useSelector((state) => state.ingredients.data)
  if (!ingredients || !ingredients.data) {
    return null
  }
  const currentIngredient = ingredients.data.find(ingredient => ingredient._id === ingredientId)
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

export default IngredientDetails;