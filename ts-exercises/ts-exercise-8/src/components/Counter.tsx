import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState<number>(0);
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md w-fit">
      <p className="text-xl font-bold mb-3">Count: {count}</p>

      <div className="flex gap-3">
        <button onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          -
        </button>

        <button
          onClick={increment}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;