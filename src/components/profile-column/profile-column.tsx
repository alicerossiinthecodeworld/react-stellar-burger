import { Link } from 'react-router-dom';
import styles from './profile-column.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { logoutUser } from '../../services/auth-slice';
import { useDispatch } from 'react-redux';
import React from 'react';


const ProfileColumn = (additionalText:{additionalText:string}) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const dispatch = useDispatch();
  const text = additionalText.additionalText
  const handleLogout = () => {
    if (refreshToken) {
      dispatch(logoutUser());
    } else {
      console.log('Refresh Token отсутствует. Невозможно выполнить логаут.');
    }
  };
  return (
    <div className={styles.buttonColumn}>
      <Link to="/profile" className={styles.navLink}>
        <Button htmlType="button" type="secondary" size="large">
          Профиль
        </Button>
      </Link>
      <Link to="/profile/orders" className={styles.navLink}>
        <Button htmlType="button" type="secondary" size="large">
          История заказов
        </Button>
      </Link>
      <Link to="/" className={styles.navLink}>
        <Button htmlType="button" type="secondary" size="large" onClick={handleLogout}>
          Выход
        </Button>
      </Link>
      <p className={styles.additionalText}>{text}</p>
    </div>
  )
}

export default ProfileColumn;
