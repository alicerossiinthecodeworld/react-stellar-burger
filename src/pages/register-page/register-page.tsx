import { Link, useNavigate} from 'react-router-dom';
import { useDispatch} from 'react-redux';
import styles from './register-page.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import useForm from '../../hooks/use-form';
import { registerUser } from '../../services/auth-slice';
import { FormEvent } from 'react';
import React from 'react';

function RegisterPage() {
  const { values, handleChange } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate()


  const handleRegister = (e:FormEvent) => {
    e.preventDefault()
    const userData = {
      email: values.email,
      password: values.password,
      name: values.name,
    };
    console.log(dispatch(registerUser(userData)))
    navigate("/")
  };

  return (
    <div className={styles.page}>
      <form className={styles.registerForm} onSubmit={handleRegister}>
        <h2 className={styles.headerText}>Регистрация</h2>
        <Input
          id='name'
          placeholder='Имя'
          onChange={handleChange}
          value={values.name}
          name="name"
          extraClass={styles.input}
        />
        <Input
          id='email'
          type='email'
          placeholder='E-mail'
          onChange={handleChange}
          value={values.email}
          name="email"
          extraClass={styles.input}
        />
        <Input
          id='password'
          type='password'
          placeholder='Пароль'
          onChange={handleChange}
          value={values.password}
          name="password"
          extraClass={styles.input}
        />

        <Button
          htmlType="submit"
          type="primary"
          size="small"
          extraClass={styles.registerButton}
        >
          Зарегистрироваться
        </Button>
      </form>
      <p className={styles.additionalText}>
        Уже зарегистрированы? <Link to="/login"> Войти</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
