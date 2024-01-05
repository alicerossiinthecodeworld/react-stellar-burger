import styles from './profile-page.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';

import { updateUser } from '../../services/auth-slice';
import useForm from '../../hooks/use-form';
import ProfileColumn from '../../components/profile-column/profile-column';

function ProfilePage() {
  const user = useSelector((state) => state.auth.user);
  const { values, handleChange } = useForm({
    email: user.email,
    name: user.name,
    password: '',
  });

  const dispatch = useDispatch();

  const handleSave = (e) => {
    e.preventDefault(); 
    const updatedUserData = {
      email: values.email,
      name: values.name,
      password: values.password, 
    };
    
    dispatch(updateUser(updatedUserData))
      .then(() => {
        console.log('Профиль успешно обновлен');
        handleChange({ target: { name: 'email', value: updatedUserData.email } });
        handleChange({ target: { name: 'name', value: updatedUserData.name } });  
      })
      .catch((error) => {
        console.error('Ошибка при обновлении профиля:', error);
      });
  };
  return (
    <div className={styles.page}>
      <div className={styles.columns}>
        <ProfileColumn additionalText ={"В этом разделе вы можете изменить свои персональные данные"}/>
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
            <Button htmlType="button" type="secondary" size="small">
              Отмена
            </Button>
            <Button
              htmlType="submit"
              size="medium"
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
