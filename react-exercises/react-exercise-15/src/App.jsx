import LanguageProvider from "./contexts/LanguageProvider.jsx";
import Greeting from "./components/Greeting.jsx";


const App = () => {
  return (
    <LanguageProvider>
      <h2>Language Switcher</h2>
      <Greeting />
    </LanguageProvider>
  );
};

export default App;