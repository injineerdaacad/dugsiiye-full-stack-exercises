import { useState } from "react";
import LanguageContext from "./LanguageContext.js";

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const handleSwitchLanguage = () => setLanguage((prev) => (prev === "en" ? "es" : "en"));

  const contextValue = { language, handleSwitchLanguage };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;