type ProductCardProps = {
  name: string
  price: number
  description?: string
}

const ProductCard = ({ name, price, description }: ProductCardProps) => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md">
        <h6 className="font-bold text-lg">Product Name: {name}</h6>
        <p className="text-gray-600">Price: ${price.toFixed(2)}</p>
        {description && <p className="text-gray-500">Description: {description}</p>}
    </div>
  )
}

export default ProductCard