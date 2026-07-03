import axios from "axios";

interface Product {
  id: number;
  title: string;
}

const Products = async () => {
  const res = await axios.get("https://dummyjson.com/products");
  const data = res.data;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Products</h1>

      <ul className="list-disc pl-5">
        {data.products.slice(0, 5).map((product: Product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
