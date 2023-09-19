import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { Provider } from 'react-redux'; 
import store from '../../services/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


function App() {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.page}>
          <AppHeader />
          <main className={styles.burgerZone}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </div>
      </DndProvider>
    </Provider>
  );
}

export default App;
