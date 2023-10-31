import { Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './register-page.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import useForm from '../../hooks/use-form';
import { registerUser } from '../../services/auth-slice';

function RegisterPage() {
  const { values, handleChange } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector((store) => store.auth.user);


  const handleRegister = () => {
    const userData = {
      email: values.email,
      password: values.password,
      name: values.name,
    };
    dispatch(registerUser(userData));
    if(user){
      navigate("/")
    }
  };

  return (
    <div className={styles.page}>
      <form className={styles.registerForm}>
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
          htmlType="button"
          type="primary"
          size="small"
          extraClass={styles.registerButton}
          onClick={handleRegister}
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
