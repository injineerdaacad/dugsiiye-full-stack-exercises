import { useState, useEffect } from "react";

const GreetingTitle = () => {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("Hello");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleGreetingChange = (e) => {
    setGreeting(e.target.value);
  };

  useEffect(() => {
    if (!name.trim()) {
      document.title = "Welcome!";
    } else {
      document.title = `${greeting}, ${name.trim()}!`;
    }
  }, [name, greeting]);

  return (
    <div>
      <h2>Enter Your Name:</h2>
      <input type="text" value={name} onChange={handleNameChange} />

      <h2>Choose a Greeting:</h2>
      <input type="text" value={greeting} onChange={handleGreetingChange} />
    </div>
  );
};

export default GreetingTitle;