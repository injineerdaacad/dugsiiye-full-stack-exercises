import ContactItem from "./ContactItem.jsx";
import { useContacts } from "../contexts/ContactContext.jsx";

const ContactList = () => {
  const { contacts } = useContacts();

  return (
    <div>
      {contacts.length ? (
        <ul>
          {contacts.map((contact) => (
            <ContactItem key={contact.id} contact={contact} />
          ))}
        </ul>
      ) : (
        <p>No contacts found.</p>
      )}
    </div>
  );
};

export default ContactList;