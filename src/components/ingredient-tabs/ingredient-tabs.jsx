import {useRef } from 'react';
import { setActiveTab } from '../../services/active-tab-slice';
import { useDispatch, useSelector} from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import tabsStyles from './ingredient-tabs.module.css';

function IngredientTabs () {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.activeTab.current);
  const bunsAnchorRef = useRef(null);
  const sauceAnchorRef = useRef(null);
  const fillingsAnchorRef = useRef(null);
  const scrollToAnchor = (anchorRef) => {
    if (anchorRef.current) {
      anchorRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleTabClickWithScroll = (value, anchorRef) => {
    dispatch(setActiveTab(value));
    scrollToAnchor(anchorRef);
  };

  return (
    <div className={tabsStyles.ingredient__tabs}>
      <a
        href="#buns" ref={bunsAnchorRef} 
        className={tabsStyles.ingredient__tab}
        onClick={() => handleTabClickWithScroll('buns', bunsAnchorRef)}
      >
        <Tab value="buns" active={current === 'buns'}>
          Булки
        </Tab>
      </a>
      <a
        href="#sauces"
        className={tabsStyles.ingredient__tab}
        ref={sauceAnchorRef} 
        onClick={() => handleTabClickWithScroll('sauces', sauceAnchorRef)}
      >
        <Tab value="sauces" active={current === 'sauces'}>
          Соусы
        </Tab>
      </a>
      <a
        href="#fillings"
        className={tabsStyles.ingredient__tab}
        ref={fillingsAnchorRef} 
        onClick={() => handleTabClickWithScroll('fillings', fillingsAnchorRef)}
      >
        <Tab value="fillings" active={current === 'fillings'}>
          Начинки
        </Tab>
      </a>
    </div>
  );
}

export default IngredientTabs;
