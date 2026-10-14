import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import AdminLogin from "./pages/AdminLogin"
import AdminDashboard from "./pages/AdminDashboard"
import {supabase} from "./lib/supabase"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Categories from "./components/Categories"
import Products from "./components/Products"
import Cart from "./components/Cart"
// import products from "./data/products"
import About from "./components/About"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
function App() {

     const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("oyinsjewelries-cart")
        return savedCart ? JSON.parse(savedCart) : []
      })
      useEffect(() => {
        localStorage.setItem(
          "oyinsjewelries-cart",
          JSON.stringify(cart)
        )
      }, [cart])
     const [isCartOpen, setIsCartOpen] = useState(false);

     const [products, setProducts] = useState([])
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState("")

      useEffect(() => {
        async function fetchProducts() {
          const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("id", { ascending: true })

          if (error) {
            setError(error.message)
          } else {
            setProducts(data)
          }

          setLoading(false)
        }

        fetchProducts()
      }, [])


     const [selectedCategory, setSelectedCategory] = useState("All")
     const filteredProducts =
      selectedCategory === "All"
        ? products
        : products.filter(
            (product) => product.category === selectedCategory
      )

  
return (
  <Routes>
    <Route
      path="/admin"
      element={<AdminLogin />}
    />

    <Route
      path="/admin/dashboard"
      element={<AdminDashboard />}
    />

    <Route
      path="*"
      element={
        <>
          <Navbar
            cart={cart}
            setIsCartOpen={setIsCartOpen}
          />

          <Hero />

          <Categories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <Products
            setCart={setCart}
            products={filteredProducts}
          />

          <About />
          <Contact />
          <Footer />

          {isCartOpen && (
            <Cart
              cart={cart}
              setCart={setCart}
              setIsCartOpen={setIsCartOpen}
            />
          )}
        </>
      }
    />
  </Routes>
)

}

export default App