import SearchInput from "../../components/SearchInput.jsx";
import ContactForm from "../../components/ContactForm.jsx";
import ContactList from "../../components/ContactList.jsx";
import Layout from "../../components/Layout.jsx";
import { useContacts } from "../../contexts/ContactContext.js";

const ContactsView = () => {
  const { counts } = useContacts();

  return (
    <Layout>
      <h2>Contacts</h2>
      <SearchInput />
      <p>
        Total: {counts.total} | Favorites: {counts.favorites}
      </p>
      <ContactForm />
      <ContactList />
    </Layout>
  );
};

export default ContactsView;