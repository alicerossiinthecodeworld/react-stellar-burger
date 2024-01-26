import {useRef } from 'react';
import { setActiveTab } from '../../services/active-tab-slice';
import { useDispatch, useSelector} from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import tabsStyles from './ingredient-tabs.module.css';
import { RootState } from '../../services/store';
import React from 'react';

function IngredientTabs () {
  const dispatch = useDispatch();
  const current = useSelector((state:RootState) => state.activeTab.current);
  const bunsAnchorRef = useRef(null);
  const sauceAnchorRef = useRef(null);
  const fillingsAnchorRef = useRef(null);
  const scrollToAnchor = (anchorRef: React.RefObject<HTMLElement>) => {
    if (anchorRef.current) {
      anchorRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleTabClickWithScroll = (value:string, anchorRef: React.RefObject<HTMLElement>) => {
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
        <Tab value="buns" active={current === 'buns'} onClick={() => handleTabClickWithScroll('buns', bunsAnchorRef)}>
          Булки
        </Tab>
      </a>
      <a
        href="#sauces"
        className={tabsStyles.ingredient__tab}
        ref={sauceAnchorRef} 
        onClick={() => handleTabClickWithScroll('sauces', sauceAnchorRef)}
      >
        <Tab value="sauces" active={current === 'sauces'} onClick={() => handleTabClickWithScroll('buns', bunsAnchorRef)}>
          Соусы
        </Tab>
      </a>
      <a
        href="#fillings"
        className={tabsStyles.ingredient__tab}
        ref={fillingsAnchorRef} 
        onClick={() => handleTabClickWithScroll('fillings', fillingsAnchorRef)}
      >
        <Tab value="fillings" active={current === 'fillings'} onClick={() => handleTabClickWithScroll('buns', bunsAnchorRef)}>
          Начинки
        </Tab>
      </a>
    </div>
  );
}

export default IngredientTabs;
