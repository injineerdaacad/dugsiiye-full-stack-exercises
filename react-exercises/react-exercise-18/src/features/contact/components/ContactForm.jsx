import { useMemo } from "react";
import { useContacts } from "../contexts/ContactContext.jsx";
import useForm from "../hooks/useForm.js";

const initialEmptyContact = { id: null, name: "", email: "", phone: "", favorite: false };

const ContactForm = () => {
  const { addContact, editContact, editingContactId, setEditingContact, allContacts } = useContacts();

  const contactToEdit = useMemo(() => {
    if (editingContactId) {
      return (allContacts.find((c) => c.id === editingContactId) || initialEmptyContact);
    }
    return initialEmptyContact;
  }, [editingContactId, allContacts]);

  const isEditing = editingContactId !== null;

  const onSubmit = (formData) => {
    if (isEditing) {
      editContact(formData);
    } else {
      addContact(formData);
    }

    setEditingContact(null);
    reset();
  };

  const { values, handleChange, handleSubmit, reset } = useForm(contactToEdit, onSubmit);

  const handleCancel = () => {
    setEditingContact(null);
    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{isEditing ? "Edit Contact" : "Add New Contact"}</h3>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={values.phone || ""}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">
        {isEditing ? "Update Contact" : "Add Contact"}
      </button>

      {isEditing && (
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default ContactForm;