import TodoApp from "./features/todo/TodoApp.jsx";
import "../index.css";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <TodoApp />
    </div>
  );
};

export default App;