import ContactProvider from "./contexts/ContactContextProvider.jsx";
import ContactsView from "./features/contacts/ContactsView.jsx";

const App = () => {
  return (
    <ContactProvider>
      <ContactsView />
    </ContactProvider>
  );
};

export default App;