import { useContacts } from "../contexts/ContactContext.jsx";

const SearchInput = () => {
  const { searchTerm, setSearchTerm } = useContacts();

  return (
    <input
      type="text"
      placeholder="Search by name, email, or phone"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchInput;