import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../services/auth-slice';
import styles from './login-page.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import useForm from '../../hooks/use-form';
import { RootState } from '../../services/store';
import React from 'react';

function LoginPage() {
  const { values, handleChange } = useForm({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const authError = useSelector((state:RootState) => state.auth.error);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login({ email: values.email, password: values.password }));
  };

  return (
    <div className={styles.page}>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <h2 className={styles.headerText}>Вход</h2>
        <Input id='email' placeholder='E-mail' onChange={handleChange} value={values.email} name="email" extraClass={styles.input} />
        <Input id='password' placeholder='Пароль' onChange={handleChange} value={values.password} name="password" extraClass={styles.input} />
        <Button htmlType="submit" type="primary" size="small" extraClass={styles.loginButton}>
          Войти
        </Button>
      </form>
      {authError && <p className={styles.errorText}>{authError}</p>}
      <p className={styles.additionalText}>Вы новый пользователь? <Link to="/register"> Зарегистрироваться</Link></p>
      <p className={styles.additionalText}>Забыли пароль? <Link to="/forgot-password"> Восстановить пароль</Link></p>
    </div>
  );
}

export default LoginPage;
