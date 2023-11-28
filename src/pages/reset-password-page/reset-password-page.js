import React from 'react';
import { Link } from 'react-router-dom';
import styles from './reset-password-page.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { request } from '../../utils/api-config';
import useForm from '../../hooks/use-form';

function ResetPasswordPage() {
  const { values, handleChange } = useForm({
    code: '',
    newPassword: '',
  });

  const newPasswordData = {
    password: values.newPassword,
    token: values.code,
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
      <form className={styles.resetPasswordForm} onSubmit={handleResetPassword}> 
        <h2 className={styles.headerText}>Восстановление пароля</h2>
        <Input
          id='newPassword'
          type='password'
          placeholder='Введите новый пароль'
          onChange={handleChange}
          value={values.newPassword}
          name="newPassword"
          extraClass={styles.input}
        />
        <Input
          id='code'
          placeholder='Введите код из письма'
          onChange={handleChange}
          value={values.code}
          name="code"
          extraClass={styles.input}
        />
        <Button
          htmlType="button"
          type="primary"
          size="small"
          extraClass={styles.resetPasswordButton}
          onClick={handleResetPassword}
        >
          Cохранить
        </Button>
      </form>
      <p className={styles.additionalText}>Вспомнили пароль? <Link to="/login"> Войти</Link></p>
    </div>
  );
}

export default ResetPasswordPage;
