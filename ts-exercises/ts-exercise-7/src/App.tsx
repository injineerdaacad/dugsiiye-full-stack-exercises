import Welcome from "./components/Welcome";
import ProductCard from "./components/ProductCard";

function App() {
  return (
    <>
      <h1 className="font-bold text-center text-2xl">Exercise 7</h1>
      <Welcome username="Eng. Honest" isPremium={true} />
      <ProductCard name="Laptop" price={999.99} description="A high-performance laptop for all your needs." />
    </>
  )
}

export default App;
