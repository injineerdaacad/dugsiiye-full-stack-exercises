import {EmailForm, AgeForm, ContactForm} from "./components/Form";

function App() {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center gap-6">
      <h1 className="font-bold text-center text-2xl">Exercise 9</h1>
      <EmailForm onSubmit={(email) => console.log(email)} />
      <AgeForm onSubmit={(age) => console.log(age)} />
      <ContactForm onSubmit={(data) => console.log(data)} />
    </div>
  );
}

export default App;