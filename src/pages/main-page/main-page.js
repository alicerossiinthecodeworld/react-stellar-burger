import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {useLocation } from 'react-router-dom';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import styles from './main-page.module.css';
import Modal from '../../components/modal/modal';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { clearCurrentIngredient } from '../../services/ingredient-details-slice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleCloseModal = () => {
    dispatch(clearCurrentIngredient());
    navigate('/')
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.page}>
        <main className={styles.burgerZone}>
          <BurgerIngredients/>
          <BurgerConstructor />
        </main>
        {location.pathname.startsWith('/ingredient/') && (
          <Modal isOpen={true} onClose={handleCloseModal}>
            <IngredientDetails />
          </Modal>
        )}
      </div>
    </DndProvider>
  );
}

export default MainPage;