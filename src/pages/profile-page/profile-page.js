import { Link } from 'react-router-dom';
import styles from './profile-page.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { logoutUser } from '../../services/auth-slice';
import useForm from '../../hooks/use-form';

function ProfilePage() {
  const { values, handleChange } = useForm({
    email: '',
    name: '',
    password: '',
  });

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
    e.preventDefault()
    console.log(values.name);
    console.log(values.email);
    console.log(values.password);
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
