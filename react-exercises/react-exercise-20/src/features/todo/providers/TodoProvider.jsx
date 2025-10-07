import { useState, useReducer, useCallback, useMemo } from "react";
import { TodoContext } from "../contexts/TodoContext.js";
import { todoReducer, initialState } from "../contexts/todoReducer.js";

const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  const [editingTodoId, setEditingTodoId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const addTodo = useCallback(
    (text) => {
      if (text && text.trim()) {
        dispatch({
          type: "ADD_TODO",
          payload: { text: text.trim().toUpperCase() },
        });
      }
    },
    [dispatch]
  );

  const editTodo = useCallback(
    (id, text) => {
      if (text && text.trim()) {
        dispatch({
          type: "EDIT_TODO",
          payload: { id, text: text.trim().toUpperCase() },
        });
        setEditingTodoId(null);
      }
    },
    [dispatch]
  );

  const setEditingTodo = useCallback((id) => {
    setEditingTodoId(id);
  }, []);

  const deleteTodo = useCallback(
    (id) => {
      dispatch({ type: "DELETE_TODO", payload: { id } });
    },
    [dispatch]
  );

  const toggleTodo = useCallback(
    (id) => {
      dispatch({ type: "TOGGLE_TODO", payload: { id } });
    },
    [dispatch]
  );

  const updateSearchTerm = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const filteredTodos = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return todos.filter((todo) => todo.text.toLowerCase().includes(term));
  }, [todos, searchTerm]);

  const contextValue = useMemo(
    () => ({
      addTodo,
      editTodo,
      setEditingTodo,
      deleteTodo,
      toggleTodo,
      setSearchTerm: updateSearchTerm,
      editingTodoId,
      searchTerm,
      todos: filteredTodos,
    }),
    [
      addTodo,
      editTodo,
      setEditingTodo,
      deleteTodo,
      toggleTodo,
      updateSearchTerm,
      editingTodoId,
      searchTerm,
      filteredTodos,
    ]
  );

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};

export default TodoProvider;