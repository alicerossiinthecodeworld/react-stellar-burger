import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './forgot-password-page.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { request } from '../../utils/api-config';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const emailData = {
    email: email,
  };


  const handleForgotPassword = () => {
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
      <form className={styles.forgotPasswordForm}>
        <h2 className={styles.headerText}>Восстановление пароля</h2>
        <Input id='email' placeholder='E-mail' onChange={handleEmailChange} value={email} extraClass ={styles.input}/>
        <Button htmlType="button" type="primary" size="small" extraClass={styles.forgotPasswordButton} onClick={handleForgotPassword}>
          Восстановить
        </Button>
      </form>
      <p className={styles.additionalText}>Вспомнили пароль? <Link to="/login"> Войти</Link></p>
    </div >
  );
}

export default ForgotPasswordPage;
