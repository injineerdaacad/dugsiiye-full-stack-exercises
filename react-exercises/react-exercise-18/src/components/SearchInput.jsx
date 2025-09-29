import { useContacts } from "../contexts/ContactContext.js";

const SearchInput = () => {
  const { searchTerm, setSearchTerm } = useContacts();

  return (
    <input
      type="text"
      placeholder="Search by name, email, or phone"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ width: "100%", marginBottom: "1rem" }}
    />
  );
};

export default SearchInput;
