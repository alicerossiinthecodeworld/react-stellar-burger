import AppHeader from '../../components/app-header/app-header';
import styles from './profile-page.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch} from 'react-redux';
import { logoutUser } from '../../services/logout-slice';



function ProfilePage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const dispatch = useDispatch();
  const refreshToken = Cookies.get('refreshToken');

  const handleLogout = () => {
    if (refreshToken) {
      dispatch(logoutUser(refreshToken));
    } else {
      console.log('Refresh Token отсутствует. Невозможно выполнить логаут.');
    }
  };

  const handleSave = (e) => {
    console.log(name);
    console.log(email);
    console.log(password);
  };

  return (
    <div className={styles.page}>
      <AppHeader />
      <div className={styles.columns}>
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
          <Link to="/logout" className={styles.navLink}>
            <Button htmlType="button" type="secondary" size="large" onClick={handleLogout}>
              Выход
            </Button>
          </Link>
          <p className={styles.additionalText}>В этом разделе вы можете изменить свои персональные данные</p>
        </div>
        <form className={styles.changeProfileForm}>
          <Input id="name" placeholder="Имя" onChange={handleNameChange} value={name} name="name" extraClass={styles.input} />
          <Input id="email" type='email' placeholder="E-mail" onChange={handleEmailChange} value={email} name="email" extraClass={styles.input} />
          <Input
            type="password"
            id="password"
            placeholder="Пароль"
            onChange={handlePasswordChange}
            value={password}
            name="password"
            extraClass={styles.input}
          />
          <div className={styles.buttonsZone}>
            <Button htmlType="button" type="secondary" size="small">
              отмена
            </Button>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={handleSave}
              extraClass={styles.forgotPasswordButton}
            >
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
