import { useState, type ChangeEvent, type SyntheticEvent } from "react";


// Email Form
interface EmailFormProps {onSubmit: (email: string) => void;}

export const EmailForm = ({ onSubmit }: EmailFormProps) => {
  const [email, setEmail] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value);};

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(email);
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit}
      className="p-4 bg-gray-100 rounded-md shadow-md w-80 mx-auto mt-2"
    >
      <input
        type="email"
        value={email}
        onChange={handleChange}
        placeholder="Enter your email"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <button type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 hover:scale-105 transition-all duration-200"
      >
        Submit
      </button>
    </form>
  );
};


// Age Form
interface AgeFormProps {onSubmit: (age: number) => void;}

export const AgeForm = ({ onSubmit }: AgeFormProps) => {
  const [age, setAge] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {setAge(e.target.value);};

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedAge = parseInt(age, 10);

    if (parsedAge >= 18) {
      onSubmit(parsedAge);
      setAge("");
    } else {
      alert("You must be at least 18 years old.");
    }
  };

  return (
    <form onSubmit={handleSubmit}
      className="p-4 bg-gray-100 rounded-md shadow-md w-80 mx-auto mt-2"
    >
      <input
        type="number"
        value={age}
        onChange={handleChange}
        placeholder="Enter your age"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <button type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 hover:scale-105 transition-all duration-200"
      >
        Submit
      </button>
    </form>
  );
}


// Contact Form
interface ContactFormProps {onSubmit: (data: { name: string; email: string }) => void;}

export const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {setFormData({ ...formData, [e.target.name]: e.target.value });};

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", email: "" });
  };

  return (
    <form onSubmit={handleSubmit}
      className="p-4 bg-gray-100 rounded-md shadow-md w-80 mx-auto mt-2"
    >
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your name"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <button type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 hover:scale-105 transition-all duration-200"
      >
        Submit
      </button>
    </form>
  );
}