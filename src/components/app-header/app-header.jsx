import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './app-header.module.css';
import { Link } from 'react-router-dom';


function AppHeader() {
  return (
    <div className={headerStyles.header}>
      <Link to="/">
        <div className={headerStyles.headerItem}>
          <BurgerIcon type="primary" />
          <p className={headerStyles.headerText}>Конструктор</p>
        </div>
      </Link>
      <Link to='/feed'>
        <div className={headerStyles.headerItem}>
          <ListIcon type="primary" />
          <p className={headerStyles.headerText}>Лента заказов</p>
        </div>
      </Link>
      <Link to="/">
        <div className={headerStyles.headerLogo}>
          <Logo />
        </div>
      </Link>
      <Link to="/profile">
        <div className={headerStyles.headerItem}>
          <ProfileIcon type="primary" />
          <p className={headerStyles.headerText}>Личный кабинет</p>
        </div>
      </Link>
    </div>
  );
}

export default AppHeader;