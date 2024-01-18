import styles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IngredientDetailDisplay from '../ingredient-detail-display/ingredient-detail-display'
import { RootState } from '../../services/store';
import { Ingredient } from '../burger-ingredients/burger-ingredients';
import { StylesType } from '../ingredient-detail-display/ingredient-detail-display';

const IngredientDetails = () => {
  const { ingredientId } = useParams();
  const ingredients = useSelector((state:RootState) => state.ingredients.data)
  if (!ingredients || !ingredients.data) {
    return null
  }
  const ingredient:Ingredient = ingredients.data.find((ingredient:Ingredient) => ingredient._id === ingredientId)
  return (
    <div className={styles.page}>
      <IngredientDetailDisplay ingredient = {ingredient} styles={styles as StylesType} />
    </div>
  );
};

export default IngredientDetails;