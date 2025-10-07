import TodoProvider from "./providers/TodoProvider.jsx";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";
import SearchInput from "./components/SearchInput";

const TodoApp = () => {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex justify-center items-center py-8 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl">
          <div className="p-6 space-y-5">
            <h3 className="text-3xl font-bold text-center text-gray-900">
              My Todo List
            </h3>

            <TodoForm />
            <SearchInput />
            <TodoList />
            <TodoStats />
          </div>
        </div>
      </div>
    </TodoProvider>
  );
};

export default TodoApp;