import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch} from 'react-redux'; // Импортируйте хуки для работы с Redux
import { registerUser } from '../../services/registration-slice';
import AppHeader from '../../components/app-header/app-header';
import styles from './register-page.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch(); 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleRegister = () => {
    const userData = {
      email: email,
      password: password,
      name: name,
    };

    dispatch(registerUser(userData));
  };

  return (
    <div className={styles.page}>
      <AppHeader />
      <form className={styles.registerForm}>
        <h2 className={styles.headerText}>Регистрация</h2>
        <Input id='name' placeholder='Имя' onChange={handleNameChange} value={name} extraClass={styles.input} />
        <Input id='email' type='email' placeholder='E-mail' onChange={handleEmailChange} value={email} extraClass={styles.input} />
        <Input id='password' type='password' placeholder='Пароль' onChange={handlePasswordChange} value={password} extraClass={styles.input} />

        <Button htmlType="button" type="primary" size="small" extraClass={styles.registerButton} onClick={handleRegister}>
          Зарегистрироваться
        </Button>
      </form>
      <p className={styles.additionalText}>Уже зарегистрированы? <Link to="/login"> Войти</Link></p>
    </div>
  );
}

export default RegisterPage;
