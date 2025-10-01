import { TodoProvider } from "./contexts/TodoContext.jsx";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";
import SearchInput from "./components/SearchInput";
import styles from "./TodoApp.module.css";

const TodoApp = () => {
  return (
    <TodoProvider>
      <div className={styles.appContainer}>
        <h3 className={styles.heading}>My Todo List</h3> <TodoForm />
        <SearchInput />
        <TodoList />
        <TodoStats />
      </div>
    </TodoProvider>
  );
};

export default TodoApp;