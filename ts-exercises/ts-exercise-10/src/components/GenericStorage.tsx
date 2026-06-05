import useLocalStorage from "../hooks/useLocalStorage";

interface User {
  name: string;
  age: number;
}

const GenericStorage = () => {
  const [user, setUser] = useLocalStorage<User>("user", {
    name: "Eng. Honest",
    age: 24,
  });

  const increaseAge = () => {
    setUser({
      ...user,
      age: user.age + 1,
    });
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="font-bold mb-2 text-center">Generic Storage</h2>

      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>

      <button onClick={increaseAge}
        className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:scale-105 transition-all duration-200 cursor-pointer"
      >
        Increase Age
      </button>
    </div>
  );
};

export default GenericStorage;