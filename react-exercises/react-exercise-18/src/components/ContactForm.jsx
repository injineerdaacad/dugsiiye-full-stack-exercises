import { useEffect, useState } from "react";
import useForm from "../hooks/useForm.js";
import { useContacts } from "../contexts/ContactContext.js";

const initialEmptyContact = {
  id: null,
  name: "",
  email: "",
  phone: "",
  favorite: false,
};

const ContactForm = () => {
  const { addContact, updateContact, editingContact, setEditingContact } =
    useContacts();

  const [isEditing, setIsEditing] = useState(false);

  const onSubmit = (values) => {
    if (isEditing) {
      updateContact(values);
      setEditingContact(null);
    } else {
      addContact(values);
      setValues(initialEmptyContact);
    }
  };

  const { values, handleChange, handleSubmit, setValues } = useForm(
    editingContact || initialEmptyContact,
    onSubmit
  );

  useEffect(() => {
    if (editingContact) {
      setIsEditing(true);
      setValues(editingContact);
    } else {
      setIsEditing(false);
      setValues(initialEmptyContact);
    }
  }, [editingContact, setValues]);

  const handleCancel = () => {
    setEditingContact(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{isEditing ? "Edit Contact" : "Add New Contact"}</h3>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={values.name}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={values.phone}
        onChange={handleChange}
        required
      />
      <br />
      <button type="submit">
        {isEditing ? "Update Contact" : "Add Contact"}
      </button>
      {isEditing && (
        <button type="button" onClick={handleCancel} style={{ marginLeft: 8 }}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default ContactForm;