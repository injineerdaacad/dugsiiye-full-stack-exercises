"use client";
import {useState} from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);


  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold">Counter: {count}</h1>

      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={increment}>
        Increment
      </button>
      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={decrement}>
        Decrement
      </button>
    </div>
  );
};

export default Counter;
