import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../services/auth-slice';
import styles from './login-page.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch(); 
  const authError = useSelector(state => state.auth.error);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    dispatch(login({ email, password }));
  };

  return (
    <div className={styles.page}>
      <form className={styles.loginForm}>
        <h2 className={styles.headerText}>Вход</h2>
        <Input id='email' placeholder='E-mail' onChange={handleEmailChange} value={email} extraClass={styles.input} />
        <Input id='password' placeholder='Пароль' onChange={handlePasswordChange} value={password} extraClass={styles.input} />
        <Button htmlType="button" type="primary" size="small" extraClass={styles.loginButton} onClick={handleLogin}>
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
