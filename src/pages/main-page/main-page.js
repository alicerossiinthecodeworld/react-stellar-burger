import AppHeader from "../../components/app-header/app-header";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import styles from "./main-page.module.css"
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function MainPage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.page}>
        <AppHeader />
        <main className={styles.burgerZone}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </div>
    </DndProvider>
  );
}

export default MainPage;
