import { useTodos } from "../contexts/TodoContext.js";

const TodoItem = ({ todo }) => {
  const { toggleTodo, setEditingTodo, deleteTodo } = useTodos();

  const textClass = todo.completed ? "line-through text-gray-400" : "";

  return (
    <li className="flex items-center justify-between gap-4 p-4 bg-white rounded-lg shadow hover:bg-gray-100 transition-colors group">
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="h-5 w-5 text-purple-600 transition duration-150 ease-in-out"
        />

        <span className={`${textClass} text-gray-800 text-base break-words`}>
          {todo.text}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setEditingTodo(todo.id)}
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-md shadow transition duration-200"
        >
          Edit
        </button>

        <button
          onClick={() => deleteTodo(todo.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow transition duration-200"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;