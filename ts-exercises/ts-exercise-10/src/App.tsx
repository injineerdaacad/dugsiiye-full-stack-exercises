import GenericStorage from "./components/GenericStorage";
import NumberStorage from "./components/NumberStorage";
import SettingsStorage from "./components/SettingsStorage";

function App() {
  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Exercise 10 - Custom Hooks
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        <NumberStorage />
        <SettingsStorage />
        <GenericStorage />
      </div>
    </div>
  );
}

export default App;