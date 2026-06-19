import Counter from "./components/Counter";
import Slow from "./components/Slow";

export default function Home() {

  return (
    <div className="text-center mt-10 space-y-6">
      <h1 className="text-4xl font-bold">Next.js Exercise 2</h1>
      <Counter />
      <Slow />
    </div> 
  );
}
