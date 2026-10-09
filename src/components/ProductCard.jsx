function ProductCard({ product, setCart }) {
  return (
    <div className="group">
      <div className=" relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        <span className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-medium">
          {product.category}
        </span>
      </div>

      <div className=" flex h-45 flex-col">
        <h3 className=" min-h-12 leading-6 font-medium text-base">
          {product.name}
        </h3>

        <p className="text-gray-500 mt-1">
          {product.category}
        </p>

        <p className="font-semibold mt-2">
          ₦{product.price.toLocaleString()}
        </p>

        <button 
          onClick={() => {
          setCart((previousCart) => {
            const existingProduct = previousCart.find(
              (item) => item.id === product.id
            )

            if (existingProduct) {
              return previousCart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            }

            return [...previousCart, { ...product, quantity: 1 }]
          })
        }}
         className="mt-4 w-full cursor-pointer rounded-[50px] bg-brand-burgundy py-3 text-sm font-semibold text-white transition duration-300 hover:bg-brand-rose focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-rose active:scale-[0.98]">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard