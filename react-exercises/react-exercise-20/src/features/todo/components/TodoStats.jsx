import { useTodos } from "../contexts/TodoContext.js";

const TodoStats = () => {
  const { todos } = useTodos();

  return (
    <p className="text-sm text-gray-500 text-right mt-4">
      Total Tasks: {todos.length}
    </p>
  );
};

export default TodoStats;