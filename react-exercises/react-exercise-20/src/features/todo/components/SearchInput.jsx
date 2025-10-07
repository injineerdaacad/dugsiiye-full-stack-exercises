import { useTodos } from "../contexts/TodoContext.js";

const SearchInput = () => {
  const { searchTerm, setSearchTerm } = useTodos();

  return (
    <input
      type="text"
      placeholder="Search todos..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="flex-1 px-5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 hover:border-purple-400"
    />
  );
};

export default SearchInput;