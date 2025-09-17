import { useState } from "react";
import CartContext from "./cart-context.js";

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => setCartItems((prevItems) => [...prevItems, item]);

  const removeFromCart = (itemId) => setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));

  const contextValue = { cartItems, addToCart, removeFromCart };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;