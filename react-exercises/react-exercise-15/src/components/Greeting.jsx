import { useContext } from "react";
import LanguageContext from "../contexts/LanguageContext.js";

const Greeting = () => {
    const { language } = useContext(LanguageContext);
    const { handleSwitchLanguage } = useContext(LanguageContext);

    const messages = { en: "Hello!", es: "¡Hola!" };

    const nextLanguage = language === "en" ? "Spanish" : "English";

    return (
      <div>
        <h3>{messages[language]}</h3>
        <button onClick={handleSwitchLanguage}>Switch to {nextLanguage}</button>
      </div>
    );
};

export default Greeting;