import { useState, useEffect } from "react";
import { useTodos } from "../contexts/TodoContext.js";

const TodoForm = () => {
  const [text, setText] = useState("");
  const { addTodo, editTodo, setEditingTodo, editingTodoId, todos } =
    useTodos();

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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 mb-4"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        className="flex-1 px-5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
      />

      <button
        type="submit"
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow transition duration-200"
      >
        {isEditing ? "Update" : "Add"}
      </button>

      {isEditing && (
        <button
          type="button"
          onClick={() => setEditingTodo(null)}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow transition duration-200"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default TodoForm;