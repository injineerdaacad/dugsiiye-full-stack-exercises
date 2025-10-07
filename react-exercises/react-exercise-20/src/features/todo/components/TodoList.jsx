import TodoItem from "./TodoItem.jsx";
import { useTodos } from "../contexts/TodoContext.js";

const TodoList = () => {
  const { todos } = useTodos();

  if (todos.length === 0) {
    return (
      <p className="text-center text-gray-500 italic py-6">
        No todos yet! Add some new tasks.
      </p>
    );
  }

  return (
    <ul className="space-y-4 bg-white p-5 rounded-xl shadow max-h-[500px] overflow-y-auto">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;