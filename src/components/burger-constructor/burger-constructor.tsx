import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DropResult } from 'react-beautiful-dnd';
import { Ingredient, IngredientType } from '../burger-ingredients/burger-ingredients';
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

import { createOrder, clearOrder } from '../../services/order-details-slice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getIngredientCount } from '../burger-ingredients/burger-ingredients';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../../services/store';


type IngredientData = {
  ingredient: Ingredient
};

function BurgerConstructor() {
  const ItemType = 'INGREDIENT';
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const totalCost = useSelector((state:RootState) => state.burgerConstructor.totalCost);
  const selectedIngredients: Ingredient[] | null = useSelector(
    (state: RootState) => state.burgerConstructor.selectedIngredients
  ); 
  const orderNumber = useSelector((state:RootState) => state.orderDetails.order?.number);
  const hasSelectedIngredients =  selectedIngredients && selectedIngredients.length > 0;
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(calculateTotalCost());
  }, [dispatch, selectedIngredients]);

  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item:IngredientData) => {
      if (item.ingredient.type === IngredientType.Bun && selectedBun) {
        handleRemoveIngredient(selectedBun)
        selectedBun = item.ingredient;
        dispatch(addIngredient(item.ingredient));
        dispatch(calculateTotalCost());
      } else {
        dispatch(addIngredient(item.ingredient));
        dispatch(calculateTotalCost());
      }
    },
  });

  const selectedFilling = selectedIngredients?.filter((item:Ingredient) => item.type !== IngredientType.Bun);
  let selectedBun = selectedIngredients?.find((item:Ingredient) => item.type === IngredientType.Bun);
  const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated);


  const handleOrderClick = () => {
    if (isAuthenticated) {
      const ingredientIds = selectedIngredients?.map((item: Ingredient) => Number(item._id)) || [];
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

  const handleRemoveIngredient = (ingredient:Ingredient) => {
    dispatch(removeIngredient(ingredient));
    dispatch(calculateTotalCost());
    if (selectedIngredients) {
      getIngredientCount(selectedIngredients, ingredient._id);
    }
      };

  const onDragEnd = (result:DropResult) => {
    console.log(result)
    if (!result.destination) {
      return;
    }

    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const updatedIngredients = selectedIngredients ? [...selectedIngredients] : [];
    const temp = updatedIngredients[startIndex + 1];
    updatedIngredients[startIndex + 1] = updatedIngredients[endIndex + 1];
    updatedIngredients[endIndex + 1] = temp;
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
                    {selectedFilling && selectedFilling.map((item:Ingredient, index:number) => (
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
                            <div className = {constructorStyles.dragIcon}>
                            <DragIcon type="primary"  />
                            </div>
                            <div className={constructorStyles.item}>
                            <ConstructorElement
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
          <div className={constructorStyles.orderIcon}>
          <CurrencyIcon type='primary'/>
          </div>
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOrderClick}
          disabled={!(selectedBun && selectedIngredients && selectedIngredients.length > 1)}
        >
          Оформить заказ
        </Button>
      </div>

      {showModal && orderNumber && (
        <Modal isOpen={showModal} onClose={handleCloseModal}>
          <OrderDetails orderNumber={orderNumber} onClose={handleCloseModal}/>
        </Modal>
      )}
    </div>
  );
}

export default BurgerConstructor;