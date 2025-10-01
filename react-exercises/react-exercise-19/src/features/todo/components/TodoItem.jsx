import { useTodos } from "../contexts/TodoContext.jsx";
import styles from "./TodoItem.module.css";

const TodoItem = ({ todo }) => {
  const { toggleTodo, setEditingTodo, deleteTodo } = useTodos();

  const textClass = todo.completed ? `${styles.text} ${styles.completedText}` : styles.text;

  return (
    <li className={styles.item}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className={styles.checkbox}
      />

      <span className={textClass}>{todo.text}</span>
      
      <button
        onClick={() => setEditingTodo(todo.id)}
        className={styles.editButton}
      >
        Edit
      </button>

      <button
        onClick={() => deleteTodo(todo.id)}
        className={styles.deleteButton}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;