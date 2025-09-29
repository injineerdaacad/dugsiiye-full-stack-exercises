import ContactItem from "./ContactItem.jsx";
import { useContacts } from "../contexts/ContactContext.js";

const ContactList = () => {
  const { contacts } = useContacts();

  return (
    <div>
      <h3>
        Contacts List ({contacts.length} contact
        {contacts.length !== 1 ? "s" : ""})
      </h3>
      {contacts.length ? (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
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
