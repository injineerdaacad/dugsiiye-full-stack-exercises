import TodoItem from "./TodoItem.jsx";
import { useTodos } from "../contexts/TodoContext.jsx";
import styles from "./TodoList.module.css";

const TodoList = () => {
  const { todos } = useTodos();

  if (todos.length === 0) {
    return (
      <p className={styles.emptyMessage}>No todos yet! Add some new tasks.</p>
    );
  }

  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
