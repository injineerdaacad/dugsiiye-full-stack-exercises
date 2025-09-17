import CartProvider from "./contexts/CartProvider.jsx";
import ProductItem from "./components/ProductItem.jsx";
import CartSummary from "./components/CartSummary.jsx";

const App = () => (
  <CartProvider>
    <h2>Shopping Cart</h2>
    <ProductItem itemId={1} itemName="Widget" price={19.99} />
    <ProductItem itemId={2} itemName="Gadget" price={29.99} />
    <CartSummary />
  </CartProvider>
);

export default App;