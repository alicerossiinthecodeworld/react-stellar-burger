import styles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IngredientDetailDisplay from '../ingredient-detail-display/ingredient-detail-display'


const IngredientDetails = () => {
  const { ingredientId } = useParams();
  const ingredients = useSelector((state) => state.ingredients.data)
  if (!ingredients || !ingredients.data) {
    return null
  }
  const ingredient = ingredients.data.find(ingredient => ingredient._id === ingredientId)
  return (
    <div className={styles.page}>
      <IngredientDetailDisplay ingredient = {ingredient} styles={styles} />
    </div>
  );
};

export default IngredientDetails;