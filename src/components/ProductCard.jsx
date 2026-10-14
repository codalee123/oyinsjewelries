
function ProductCard({ product, setCart }) {
  const inStock = product.in_stock !== false

  function handleAddToCart() {
    // Prevent unavailable products from being added.
    if (!inStock) return

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
  }

  return (
    <div className="group">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className={`h-full w-full object-cover transition duration-500 ${
            inStock ? "group-hover:scale-105" : "opacity-60"
          }`}
        />

        <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-medium">
          {product.category}
        </span>

        {!inStock && (
          <span className="absolute bottom-3 left-3 rounded-full bg-gray-900 px-3 py-2 text-xs font-bold text-white">
            Out of Stock
          </span>
        )}
      </div>

      <div className="flex h-45 flex-col">
        <h3 className="min-h-12 text-base font-medium leading-6">
          {product.name}
        </h3>

        <p className="mt-1 text-gray-500">
          {product.category}
        </p>

        <p className="mt-2 font-semibold">
          ₦{Number(product.price).toLocaleString()}
        </p>

        <button
          type="button"
          disabled={!inStock}
          onClick={handleAddToCart}
          className={`mt-4 w-full rounded-[50px] py-3 text-sm font-semibold transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-rose ${
            inStock
              ? "cursor-pointer bg-brand-burgundy text-white hover:bg-brand-rose active:scale-[0.98]"
              : "cursor-not-allowed bg-gray-200 text-gray-500"
          }`}
        >
          {inStock ? "Add to Cart" : "Unavailable"}
        </button>
      </div>
    </div>
  )
}

export default ProductCard
