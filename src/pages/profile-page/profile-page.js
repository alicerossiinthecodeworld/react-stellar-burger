import { Link } from 'react-router-dom';
import styles from './profile-page.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';

import { logoutUser, updateUser } from '../../services/auth-slice';
import useForm from '../../hooks/use-form';

function ProfilePage() {
  const user = useSelector((state) => state.auth.user);
  const { values, handleChange } = useForm({
    email: user.email,
    name: user.name,
    password: '',
  });

  const dispatch = useDispatch();
  const refreshToken = localStorage.getItem('refreshToken');
  console.log(refreshToken)

  const handleLogout = () => {
    if (refreshToken) {
      dispatch(logoutUser());
    } else {
      console.log('Refresh Token отсутствует. Невозможно выполнить логаут.');
    }
  };

  const handleSave = (e) => {
    e.preventDefault(); 
    const updatedUserData = {
      email: values.email,
      name: values.name,
      password: values.password, 
    };

    dispatch(updateUser(updatedUserData, refreshToken))
      .then(() => {
        console.log('Профиль успешно обновлен');
      })
      .catch((error) => {
        console.error('Ошибка при обновлении профиля:', error);
      });
  };
  return (
    <div className={styles.page}>
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
        <form className={styles.changeProfileForm} onSubmit={handleSave}>
          <Input id="name" placeholder="Имя" onChange={handleChange} value={values.name} name="name" extraClass={styles.input} />
          <Input id="email" type='email' placeholder="E-mail" onChange={handleChange} value={values.email} name="email" extraClass={styles.input} />
          <Input
            type="password"
            id="password"
            placeholder="Пароль"
            onChange={handleChange}
            value={values.password}
            name="password"
            extraClass={styles.input}
          />
          <div className={styles.buttonsZone}>
            <Button htmlType="submit" type="secondary" size="small">
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
