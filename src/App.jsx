import { useState } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Categories from "./components/Categories"
import Products from "./components/Products"
import Cart from "./components/Cart"
import products from "./data/products"
import About from "./components/About"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
function App() {

     const [cart, setCart] = useState([]);
     const [isCartOpen, setIsCartOpen] = useState(false);
     const [selectedCategory, setSelectedCategory] = useState("All")
     const filteredProducts =
      selectedCategory === "All"
        ? products
        : products.filter(
            (product) => product.category === selectedCategory
      )

  return (
    <>
      <Navbar cart={cart} 
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
  )
}

export default App