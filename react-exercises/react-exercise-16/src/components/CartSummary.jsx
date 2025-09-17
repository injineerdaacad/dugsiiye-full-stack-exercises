import { useContext } from "react";
import CartContext from "../contexts/cart-context.js";

const CartSummary = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);
    
    const totalItems = cartItems.length;

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price ?? 0), 0).toFixed(2);

    const averagePrice = totalItems > 0 ? (cartItems.reduce((sum, item) => sum + (item.price ?? 0), 0) / totalItems).toFixed(2) : 0;

    const handleRemoveFromCart = (itemId) => removeFromCart(itemId);

  return (
    <div>
      <h3>Cart Summary</h3>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button style={{ margin: "0.3rem" }} onClick={() => handleRemoveFromCart(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p>
        Total Items: {totalItems} | Total Price: ${totalPrice} | Average Price: ${averagePrice}
      </p>
    </div>
  );
};

export default CartSummary;