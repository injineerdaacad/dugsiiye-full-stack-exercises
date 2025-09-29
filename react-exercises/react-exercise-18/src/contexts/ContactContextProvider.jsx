import { useReducer, useState, useMemo } from "react";
import ContactContext from "./ContactContext.js";
import { contactReducer, initialState } from "../reducers/contactReducer.js";

const ContactProvider = ({ children }) => {
  const [contacts, dispatch] = useReducer(contactReducer, initialState);
  const [editingContact, setEditingContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) return contacts;
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(normalized) ||
        c.email.toLowerCase().includes(normalized) ||
        c.phone.includes(normalized)
    );
  }, [contacts, searchTerm]);

  const counts = useMemo(() => {
    return {
      total: contacts.length,
      favorites: contacts.filter((c) => c.favorite).length,
    };
  }, [contacts]);

  const addContact = (data) => dispatch({ type: "add", payload: data });
  const updateContact = (data) => dispatch({ type: "edit", payload: data });
  const deleteContact = (id) => dispatch({ type: "delete", payload: id });
  const toggleFavorite = (id) => dispatch({ type: "toggleFavorite", payload: id });

  const value = {
    contacts: filteredContacts,
    allContacts: contacts,
    editingContact,
    setEditingContact,
    searchTerm,
    setSearchTerm,
    counts,
    addContact,
    updateContact,
    deleteContact,
    toggleFavorite,
  };

  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
};

export default ContactProvider;