import useNumberStorage from "../hooks/useNumberStorage";

const NumberStorage = () => {
  const [count, setCount] = useNumberStorage("count", 0);

  const increment = () => {setCount(count + 1);}

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="font-bold mb-2 text-center">Number Storage</h2>

      <p className="mb-2">Count: {count}</p>

      <button onClick={increment}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:scale-105 transition-all duration-200 cursor-pointer"
      >
        Increment
      </button>
    </div>
  );
};

export default NumberStorage;