import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";


function App() {
  return (
    <div>
      <AppHeader />
      <div className={styles.burgerZone}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </div>
  );
}

export default App;
