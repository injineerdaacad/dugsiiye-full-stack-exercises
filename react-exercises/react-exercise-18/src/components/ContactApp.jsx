import ContactContextProvider from "../contexts/ContactContextProvider.jsx";
import ContactForm from "./ContactForm.jsx";
import ContactList from "./ContactList.jsx";
import SearchInput from "./SearchInput.jsx";
import { useContacts } from "../../contexts/ContactContext.js";

const InnerApp = () => {
  const { counts } = useContacts();

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h2>Contacts</h2>
      <SearchInput />
      <p>
        Total: {counts.total} | Favorites: {counts.favorites}
      </p>
      <ContactForm />
      <ContactList />
    </div>
  );
};

const ContactApp = () => (
  <ContactContextProvider>
    <InnerApp />
  </ContactContextProvider>
);

export default ContactApp;
