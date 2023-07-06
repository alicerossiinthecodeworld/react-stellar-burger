import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './appHeader.module.css';

function AppHeader() {
  return (
    <div className={headerStyles.header}>
      <div className={headerStyles.headerItem}>
        <BurgerIcon type="primary" />
        <p className={headerStyles.headerText}>Конструктор</p>
      </div>
      <div className={headerStyles.headerItem}>
        <ListIcon type="primary" />
        <p className={headerStyles.headerText}>Лента заказов</p>
      </div>
      <div className={headerStyles.headerLogo}>
        <Logo />
      </div>
      <div className={headerStyles.headerItem}>
        <ProfileIcon type="primary" />
        <p className={headerStyles.headerText}>Личный кабинет</p>
      </div>
    </div>
  );
}

export default AppHeader;