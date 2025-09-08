import { useState } from "react";

const ShoppingCart = () => {
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [cart, setCart] = useState([]);

  const addToCart = () => {
    const parsedPrice = parseFloat(newProductPrice);

    if (!newProductName.trim()) {
      alert("Fadlan soo geli Magaca Alaabta?");
      return;
    }

    if (isNaN(parsedPrice) || parsedPrice < 0) {
      alert("Fadlan geli qiime sax ah oo doolar ah (tusaale: 1.01)");
      return;
    }

    const cents = Math.round(parsedPrice * 100);

    const newCartItem = {
      id: crypto.randomUUID(),
      name: newProductName.toUpperCase(),
      priceInCents: cents,
      quantity: 1,
    };

    setCart([...cart, newCartItem]);
    setNewProductName("");
    setNewProductPrice("");
  };

    
  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

    
  const decreaseQuantity = (id) => {
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item))
    );
  };

    
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

    
  const calculateTotal = () => {
    return (
      cart.reduce((total, item) => total + item.priceInCents * item.quantity, 0) / 100
    );
  };

  const handleNameChange = (e) => {
    setNewProductName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setNewProductPrice(e.target.value);
  };

  const handleAddToCart = () => {
    addToCart();
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  const handleIncreaseQuantity = (id) => {
    increaseQuantity(id);
  };

  const handleDecreaseQuantity = (id) => {
    decreaseQuantity(id);
  };

  return (
    <div>
      <h1>Simple Shopping Cart</h1>

      <h3>Add a Product</h3>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          placeholder="Product Name"
          value={newProductName}
          onChange={handleNameChange}
        />
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Price"
          value={newProductPrice}
          onChange={handlePriceChange}
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <h3>Products in Cart</h3>

      {cart.length === 0 ? (
        <p>No products in the cart.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong> - {" "}
              {(item.priceInCents / 100).toFixed(2)} USD
              <p>
                Quantity:{" "}
                <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>{" "}
                {item.quantity}{" "}
                <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
              </p>
              <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      <h4>Total Price: $ {calculateTotal().toFixed(2)}</h4>
    </div>
  );
};

export default ShoppingCart;