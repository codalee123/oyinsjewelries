
import { useEffect, useState } from "react"
import { supabase } from "./lib/supabase"

function SupabaseTest() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")

      if (error) {
        setError(error.message)
      } else {
        setProducts(data)
      }

      setLoading(false)
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <p>Loading products...</p>
  }

  if (error) {
    return <p>Supabase error: {error}</p>
  }

  return (
    <div>
      <h2>Products from Supabase</h2>

      {products.map((product) => (
        <p key={product.id}>
          {product.name} — ₦{Number(product.price).toLocaleString()}
        </p>
      ))}
    </div>
  )
}

export default SupabaseTest