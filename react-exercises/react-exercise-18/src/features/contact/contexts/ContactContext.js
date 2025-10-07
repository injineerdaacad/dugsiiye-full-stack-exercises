import { createContext, useContext } from "react";

export const ContactContext = createContext();

export const useContacts = () => useContext(ContactContext);