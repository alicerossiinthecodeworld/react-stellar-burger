import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import {
  addIngredient,
  removeIngredient,
  calculateTotalCost,
  updateIngredientOrder,
} from '../../services/burger-constructor-slice';
import { fetchIngredients } from '../../services/ingredient-slice';

import { createOrder, clearOrder } from '../../services/order-details-slice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getIngredientCount } from '../burger-ingredients/burger-ingredients';
import { useNavigate } from 'react-router-dom';


function BurgerConstructor() {
  const ItemType = 'INGREDIENT';
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const totalCost = useSelector((state) => state.burgerConstructor.totalCost);
  const selectedIngredients = useSelector(
    (state) => state.burgerConstructor.selectedIngredients
  );
  const orderNumber = useSelector((state) => state.orderDetails.order.number);
  const hasSelectedIngredients = selectedIngredients.length > 0;
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  useEffect(() => {
    dispatch(calculateTotalCost(selectedIngredients));
  }, [dispatch, selectedIngredients]);

  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item) => {
      if (item.ingredient.type === 'bun' && selectedBun) {
        handleRemoveIngredient(selectedBun)
        console.log("удалил булку")
        console.log(selectedIngredients)
        selectedBun = item.ingredient;
        dispatch(addIngredient(item.ingredient));
        dispatch(calculateTotalCost(selectedIngredients));
      } else {
        dispatch(addIngredient(item.ingredient));
        dispatch(calculateTotalCost(selectedIngredients));
      }
    },
  });

  const selectedFilling = selectedIngredients.filter((item) => item.type !== 'bun');
  let selectedBun = selectedIngredients.find((item) => item.type === 'bun');
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


  const handleOrderClick = () => {
    if (isAuthenticated) {
      const ingredientIds = selectedIngredients?.map((item) => item._id);
      dispatch(createOrder(ingredientIds));
      setShowModal(true);
    } else {
      navigate('/login');
    }
  };

  const handleCloseModal = () => {
    dispatch(clearOrder());
    setShowModal(false);
  };

  const handleRemoveIngredient = (ingredient) => {
    dispatch(removeIngredient(ingredient));
    dispatch(calculateTotalCost(selectedIngredients));
    getIngredientCount(selectedIngredients, ingredient._id);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
  
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    console.log(selectedIngredients[startIndex+1])
    const updatedIngredients = [...selectedIngredients]
    const temp = updatedIngredients[startIndex+1];
    updatedIngredients[startIndex+1] = updatedIngredients[endIndex+1];
    updatedIngredients[endIndex+1] = temp;
    dispatch(updateIngredientOrder(updatedIngredients));
  };
  
  
  return (
    <div className={constructorStyles.burgerConstructor} ref={drop}>
      <DragDropContext onDragEnd={onDragEnd}>
        {hasSelectedIngredients ? (
          <div>
            {selectedBun ? (
              <div className={constructorStyles.topBun}>
                <ConstructorElement
                  text={`${selectedBun.name} (верх)`}
                  price={selectedBun.price}
                  thumbnail={selectedBun.image_large}
                  type="top"
                  isLocked
                />
              </div>
            ) : null}
            <Droppable droppableId="selectedIngredients">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={constructorStyles.ingredientsWrapper}
                >
                  <div className={constructorStyles.scrollableContent}>
                    {selectedFilling && selectedFilling.map((item, index) => (
                      <Draggable
                        key={`${item.uniqueId}`}
                        draggableId={`${item.uniqueId}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onDrag={(e) => e.preventDefault()}
                            className={constructorStyles.ingredientWrapper}
                          >
                            <DragIcon type="primary" />
                            <ConstructorElement
                              className={constructorStyles.item}
                              text={item.name}
                              price={item.price}
                              thumbnail={item.image_large}
                              type={item.type === 'bun' ? 'top' : undefined}
                              isLocked={item.type === 'bun'}
                              handleClose={() => {
                                handleRemoveIngredient(item);
                              }}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
            {selectedBun ? (
              <div className={constructorStyles.bottomBun}>
                <ConstructorElement
                  text={`${selectedBun.name} (низ)`}
                  price={selectedBun.price}
                  thumbnail={selectedBun.image_large}
                  type="bottom"
                  isLocked
                />
              </div>
            ) : null}
          </div>
        ) : (
          <Droppable droppableId="selectedIngredients">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={constructorStyles.emptyMessage}
              >
                Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа.
              </div>
            )}
          </Droppable>
        )}
      </DragDropContext>
      <div className={constructorStyles.order}>
        <div className={constructorStyles.orderPrice}>
          {totalCost}
          <CurrencyIcon className={constructorStyles.orderIcon} />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOrderClick}
          disabled={!(selectedBun && selectedIngredients.length > 1)}
        >
          Оформить заказ
        </Button>
      </div>

      {showModal && (
        <Modal isOpen={showModal} onClose={handleCloseModal}>
          <OrderDetails orderNumber={orderNumber} onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}

export default BurgerConstructor;