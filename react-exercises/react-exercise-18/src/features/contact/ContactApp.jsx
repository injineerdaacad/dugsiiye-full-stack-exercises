import ContactProvider from "./providers/ContactProvider.jsx";

import ContactForm from "./components/ContactForm.jsx";
import ContactList from "./components/ContactList.jsx";
import ContactStats from "./components/ContactStats.jsx";
import SearchInput from "./components/SearchInput.jsx";

const ContactApp = () => {
  return (
    <ContactProvider>
      <div>
        <h3>My Contact List</h3>
        <ContactForm />
        <SearchInput />
        <ContactList />
        <ContactStats />
      </div>
    </ContactProvider>
  );
};

export default ContactApp;