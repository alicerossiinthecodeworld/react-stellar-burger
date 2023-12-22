import { Link } from 'react-router-dom';
import styles from './forgot-password-page.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { request } from '../../utils/api-config';
import useForm from '../../hooks/use-form';
import { useNavigate } from 'react-router-dom';


function ForgotPasswordPage() {
  const navigate = useNavigate()
  const { values, handleChange } = useForm({
    email: '',
  });

  const emailData = {
    email: values.email,
  };

  const handleForgotPassword = (event) => {
    event.preventDefault()
    request('/password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    })
      .then((data) => {
        if (data.success) {
          console.log('Письмо направлено успешно:', data);
          navigate('/reset-password', { state: { fromForgotPassword: true }});          
        } else {
          console.error('Ошибка восстановления пароля:', data.message);
        }
      })
      .catch((error) => {
        console.error('Ошибка при отправке запроса:', error);
      });
  };

  return (
    <div className={styles.page}>
      <form className={styles.forgotPasswordForm} onSubmit={handleForgotPassword}>
        <h2 className={styles.headerText}>Восстановление пароля</h2>
        <Input
          id='email'
          placeholder='E-mail'
          onChange={handleChange}
          value={values.email}
          name="email"
          extraClass={styles.input}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="small"
          extraClass={styles.forgotPasswordButton}
        >
          Восстановить
        </Button>
      </form>
      <p className={styles.additionalText}>Вспомнили пароль? <Link to="/login"> Войти</Link></p>
    </div>
  );
}

export default ForgotPasswordPage;
