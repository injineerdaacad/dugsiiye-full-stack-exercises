import { useState } from "react";
import useForm from "../hooks/useForm.js";

const ContactForm = () => {
  const { values, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    message: '',
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(values);
    resetForm();
  };

  const formStyle = { display: 'flex', flexDirection: 'column', gap: '1rem' };
  const formStyleButtons = { ...formStyle, flexDirection: 'row' };

  return (
    <div>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2>Contact Us</h2>

        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={values.message}
            onChange={handleChange}
            required
          />
        </div>

        <div style={formStyleButtons}>
          <button type="submit">Submit</button>
          <button type="reset" onClick={resetForm}> Reset </button>
        </div>
      </form>

      {submittedData && (
        <div>
          <h2>Submitted Data:</h2>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ContactForm;