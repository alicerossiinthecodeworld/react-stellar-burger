import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './reset-password-page.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { request } from '../../utils/api-config';

function ResetPasswordPage() {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const newPasswordData= {
    "password": newPassword,
    "token": code
  } 

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };


  const handleResetPassword = () => {
    request('/password-reset/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPasswordData),
    })
      .then((data) => {
        if (data.success) {
          console.log('Пароль успешно изменен:', data);
        } else {
          console.error('Ошибка изменения пароля:', data.message);
        }
      })
      .catch((error) => {
        console.error('Ошибка при отправке запроса:', error);
      });
  };

  return (
    <div className={styles.page}>
      <form className={styles.resetPasswordForm}>
        <h2 className={styles.headerText}>Восстановление пароля</h2>
        <Input id='newPassword' type='password' placeholder='Введите новый пароль' onChange={handleNewPasswordChange} value={newPassword} extraClass ={styles.input}/>
        <Input id='code' placeholder='Введите код из письма' onChange={handleCodeChange} value={code} extraClass ={styles.input}/>
        <Button htmlType="button" type="primary" size="small" extraClass={styles.resetPasswordButton} onClick={handleResetPassword}>
          Cохранить
        </Button>
      </form>
      <p className={styles.additionalText}>Вспомнили пароль? <Link to="/login"> Войти</Link></p>
    </div >
  );
}

export default ResetPasswordPage;
