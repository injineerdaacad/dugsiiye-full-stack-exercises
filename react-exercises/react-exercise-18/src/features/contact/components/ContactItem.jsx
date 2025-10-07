import { useContacts } from "../contexts/ContactContext.js";

const ContactItem = ({ contact }) => {
  const { toggleFavorite, setEditingContact, deleteContact } = useContacts();

  const { id, name, email, phone, favorite } = contact;

  return (
    <li>
      <strong>{name}</strong> {favorite && "⭐ FAVORITE"}
      <br />
      <small>Email: {email}</small> <br />
      <small>Phone: {phone}</small> <br />
      <button onClick={() => toggleFavorite(id)}>
        {" "}
        {favorite ? "Unfavorite" : "Favorite"}
      </button>
      <button onClick={() => setEditingContact(id)}>Edit</button>
      <button onClick={() => deleteContact(id)}>Delete</button>
    </li>
  );
};

export default ContactItem;
