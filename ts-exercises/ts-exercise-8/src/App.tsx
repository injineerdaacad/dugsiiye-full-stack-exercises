import Counter from "./components/Counter";
import UserCard from "./components/UserCard";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center gap-6">
      <h1 className="font-bold text-center text-2xl">Exercise 8</h1>
      <Counter />
      <UserCard />
      <TodoList />
    </div>
  );
}

export default App;