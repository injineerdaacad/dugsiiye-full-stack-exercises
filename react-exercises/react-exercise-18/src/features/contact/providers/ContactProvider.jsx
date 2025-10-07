import { useState, useReducer, useCallback, useMemo } from "react";
import { contactReducer, initialState } from "../contexts/contactReducer.js";
import { ContactContext } from "../contexts/ContactContext.js";

const ContactProvider = ({ children }) => {
  const [contacts, dispatch] = useReducer(contactReducer, initialState);

  const [editingContactId, setEditingContactId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const addContact = useCallback(
    (data) => dispatch({ type: "ADD_CONTACT", payload: data }),
    [dispatch]
  );

  const editContact = useCallback(
    (data) => {
      dispatch({ type: "EDIT_CONTACT", payload: data });
      setEditingContactId(null);
    },
    [dispatch]
  );

  const setEditingContact = useCallback((id) => {
    setEditingContactId(id);
  }, []);

  const deleteContact = useCallback(
    (id) => dispatch({ type: "DELETE_CONTACT", payload: id }),
    [dispatch]
  );

  const toggleFavorite = useCallback(
    (id) => dispatch({ type: "TOGGLE_FAVORITE", payload: id }),
    [dispatch]
  );

  const updateSearchTerm = useCallback((term) => {
    setSearchTerm(term);
  }, []);

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

  const value = useMemo(
    () => ({
      addContact,
      editContact,
      setEditingContact,
      deleteContact,
      toggleFavorite,
      setSearchTerm: updateSearchTerm,
      editingContactId,
      searchTerm,
      contacts: filteredContacts,
      allContacts: contacts,
      counts,
    }),
    [
      addContact,
      editContact,
      deleteContact,
      toggleFavorite,
      updateSearchTerm,
      setEditingContact,
      editingContactId,
      searchTerm,
      filteredContacts,
      contacts,
      counts,
    ]
  );

  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
};

export default ContactProvider;