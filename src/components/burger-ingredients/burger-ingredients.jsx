import{ useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import IngredientTabs from '../ingredient-tabs/ingredient-tabs';
import ingredientsStyles from './burger-ingredients.module.css';
import IngredientBoxItem from '../ingredient-box-item/ingredient-box-item';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { setCurrentIngredient, clearCurrentIngredient } from '../../services/ingredient-details-slice';

function BurgerIngredients() {
  const dispatch = useDispatch(); // Инициализируем useDispatch
  const ingredients = useSelector((state) => state.ingredients.data);
  const isLoading = useSelector((state) => state.ingredients.loading);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = (ingredient) => {
    dispatch(setCurrentIngredient(ingredient));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    dispatch(clearCurrentIngredient)
    setIsModalOpen(false);
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
                ingredient = {ingredient}
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
                ingredient = {ingredient}
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
                ingredient = {ingredient}
                onClick={() => handleOpenModal(ingredient)}
              />
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <IngredientDetails onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}
 


BurgerIngredients.propTypes = {
  isLoading: PropTypes.bool,
};

export default BurgerIngredients;