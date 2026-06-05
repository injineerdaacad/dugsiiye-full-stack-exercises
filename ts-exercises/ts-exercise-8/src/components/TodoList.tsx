import { useState } from "react";

interface Todo {
  id: string;
  task: string;
  done: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      task: `Task ${todos.length + 1}`,
      done: false,
    };

    setTodos((prev) => [...prev, newTodo]);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md w-80 mx-auto mt-10">
      
      <div className="flex justify-center">
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 hover:scale-105 transition-all duration-200"
        >
          Add Todo
        </button>
      </div>

      {/* TODO LIST */}
      <ul className="mt-4 space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="p-2 bg-white rounded-md shadow-sm flex justify-between">
            <span>{todo.task}</span>
            <span className="text-sm text-gray-500">
              {todo.done ? "Done" : "Pending"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;