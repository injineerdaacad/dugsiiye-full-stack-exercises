import TodoApp from "./features/todo/TodoApp.jsx";
import styles from "./styles/App.module.css";

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <TodoApp />
    </div>
  );
};

export default App;