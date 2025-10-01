import { useState, useEffect } from "react";
import { useTodos } from "../contexts/TodoContext.jsx";
import styles from "./TodoForm.module.css";

const TodoForm = () => {
  const [text, setText] = useState("");
  const { addTodo, editTodo, setEditingTodo, editingTodoId, todos } = useTodos();

  const isEditing = editingTodoId !== null;

  useEffect(() => {
    if (isEditing) {
      const todoToEdit = todos.find((todo) => todo.id === editingTodoId);
      
      if (todoToEdit) {
        setText(todoToEdit.text);
      }
    } else {
      setText("");
    }
  }, [isEditing, editingTodoId, todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      editTodo(editingTodoId, text);
    } else {
      addTodo(text);
    }
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        className={styles.input}
      />

      <button type="submit" className={styles.button}>
        {isEditing ? "Update" : "Add"}
      </button>
      
      {isEditing && (
        <button
          type="button"
          onClick={() => setEditingTodo(null)}
          className={styles.cancelButton}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default TodoForm;