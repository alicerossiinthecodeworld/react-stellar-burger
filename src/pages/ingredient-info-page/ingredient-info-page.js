import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IngredientDetailDisplay from '../../components/ingredient-detail-display/ingredient-detail-display'; 
import ingredientInfoStyles from './ingredient-info-page.module.css';

export const IngredientInfoPage = () => {
  const { ingredientId } = useParams();
  const ingredients = useSelector((state) => state.ingredients.data);

  if (!ingredients || !ingredients.data) {
    return null;
  }

  const currentIngredient = ingredients.data.find(ingredient => ingredient._id === ingredientId);

  if (!currentIngredient) {
    return null;
  }

  return (
    <div className={ingredientInfoStyles.page}>
      <IngredientDetailDisplay ingredient={currentIngredient} styles={ingredientInfoStyles} />
    </div>
  );
}

export default IngredientInfoPage;
