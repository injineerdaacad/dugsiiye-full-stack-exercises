import { useContext } from "react";
import CartContext from "../contexts/CartContext.js";

const ProductItem = ({ itemId, itemName, price }) => {
  const { addToCart } = useContext(CartContext);

  const handleAdd = () => addToCart({ id: itemId, name: itemName, price });

  return (
    <div>
      <p>{itemName}</p>
      <p>Price: ${price}</p>
      <button onClick={handleAdd}>Add to Cart</button>
    </div>
  );
};

export default ProductItem;