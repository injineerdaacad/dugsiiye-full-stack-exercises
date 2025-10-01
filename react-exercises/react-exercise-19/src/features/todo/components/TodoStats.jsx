import { useTodos } from "../contexts/TodoContext.jsx";
import styles from './TodoStats.module.css';

const TodoStats = () => {
  const { todos } = useTodos();

  return <p className={styles.stats}>Total Tasks: {todos.length}</p>;
};

export default TodoStats;