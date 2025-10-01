import { useContacts } from "../contexts/ContactContext.jsx";

const ContactStats = () => {
  const { counts } = useContacts();

  return (
    <div>
      Contacts List: {counts.total} contact
      {counts.total !== 1 ? "s" : ""} | Favorites: {counts.favorites}
    </div>
  );
};

export default ContactStats;