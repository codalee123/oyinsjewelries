import products from "../data/products"
import ProductCard from "./ProductCard"

function Products({products,setCart}) {
  return (
    <section 
      id="shop"
      className="px-6 md:px-12 py-20">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
          Our Collection
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mt-2">
          Featured Pieces
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            setCart={setCart}
          />
        ))}
      </div>
    </section>
  )
}

export default Products