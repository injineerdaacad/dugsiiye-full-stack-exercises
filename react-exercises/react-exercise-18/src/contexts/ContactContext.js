import { createContext, useContext } from "react";

const ContactContext = createContext();

export const useContacts = () => useContext(ContactContext);

export default ContactContext;