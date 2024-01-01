import PropTypes from 'prop-types';

const IngredientDetailDisplay = ({ ingredient, styles }) => {
  if (!ingredient) return null;
  console.log(styles)
  return (
    <div className = {styles.page}>
      <h2 className={styles.ingredientHeader}>Детали ингредиента</h2>
      <img className={styles.ingredientPic} src={ingredient.image} alt={ingredient.name} />
      <p className={styles.ingredientTitle}>{ingredient.name}</p>
      <div className={styles.ingredientData}>
        <p className={styles.ingredientText}>Калории, ккал:</p>
        <p className={styles.ingredientText}>Белки, г:</p>
        <p className={styles.ingredientText}>Жиры, г:</p>
        <p className={styles.ingredientText}>Углеводы, г:</p>
        <p className={styles.ingredientNumber}>{ingredient.calories}</p>
        <p className={styles.ingredientNumber}>{ingredient.proteins}</p>
        <p className={styles.ingredientNumber}>{ingredient.fat}</p>
        <p className={styles.ingredientNumber}>{ingredient.carbohydrates}</p>
      </div>
    </div>
  )
}
IngredientDetailDisplay.propTypes = {
  ingredient: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

export default IngredientDetailDisplay;
