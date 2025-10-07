import { useTodos } from "../contexts/TodoContext.js"; 
import styles from "./SearchInput.module.css";

const SearchInput = () => {
  const { searchTerm, setSearchTerm } = useTodos(); 

  return (
    <input
      type="text"
      placeholder="Search todos..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className={styles.input}
    />
  );
};

export default SearchInput;