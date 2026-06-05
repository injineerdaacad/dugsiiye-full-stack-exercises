import useSettingsStorage from "../hooks/useSettingsStorage";

const SettingsStorage = () => {
  const [settings, setSettings] = useSettingsStorage("settings", {
    language: "English",
    notifications: true,
  });

  const toggleNotifications = () => {
    setSettings({
      ...settings,
      notifications: !settings.notifications,
    });
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="font-bold mb-2 text-center">Settings Storage</h2>

      <p>Language: {settings.language}</p>
      <p>
        Notifications: {settings.notifications ? "Enabled" : "Disabled"}
      </p>

      <button onClick={toggleNotifications}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:scale-105 transition-all duration-200 cursor-pointer"
      >
        Toggle Notifications
      </button>
    </div>
  );
};

export default SettingsStorage;