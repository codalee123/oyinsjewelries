import { ShoppingCart, Menu, X } from "lucide-react"
import { useState } from "react"

function Navbar({ cart, setIsCartOpen }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinkStyle =
    "font-medium text-gray-700 transition-colors hover:text-brand-rose"

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-brand-pink bg-brand-cream px-6 py-5 md:px-12">

      {/* Brand name */}
      <h1 className="text-2xl font-extrabold tracking-tight text-brand-burgundy">
        Oyinsjewelries
      </h1>

      {/* Desktop navigation */}
      <div className="hidden items-center gap-6 md:flex">
        <a href="#home" className={navLinkStyle}>Home</a>
        <a href="#shop" className={navLinkStyle}>Shop</a>
        <a href="#about" className={navLinkStyle}>About</a>
        <a href="#contact" className={navLinkStyle}>Contact</a>

        <button
          onClick={() => setIsCartOpen(true)}
          aria-label={`Open cart, ${cart.length} different products`}
          className="relative rounded-full bg-brand-burgundy px-4 py-2 text-white transition-colors hover:bg-brand-rose"
        >
          <ShoppingCart size={20} />
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-rose text-xs font-bold text-white ring-2 ring-brand-cream">
            {cart.length}
          </span>
        </button>
      </div>

      {/* Mobile buttons */}
      <div className="flex items-center gap-4 md:hidden">
        <button
          onClick={() => setIsCartOpen(true)}
          aria-label={`Open cart, ${cart.length} different products`}
          className="relative rounded-full bg-brand-burgundy px-3 py-2 text-white"
        >
          <ShoppingCart size={20} />
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-rose text-xs font-bold text-white ring-2 ring-brand-cream">
            {cart.length}
          </span>
        </button>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="text-2xl text-brand-burgundy"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute left-0 top-full z-40 flex w-full flex-col gap-5 border-t border-brand-pink bg-brand-cream p-6 shadow-lg md:hidden">
          <a href="#home" className={navLinkStyle} onClick={() => setIsMenuOpen(false)}>
            Home
          </a>
          <a href="#shop" className={navLinkStyle} onClick={() => setIsMenuOpen(false)}>
            Shop
          </a>
          <a href="#about" className={navLinkStyle} onClick={() => setIsMenuOpen(false)}>
            About
          </a>
          <a href="#contact" className={navLinkStyle} onClick={() => setIsMenuOpen(false)}>
            Contact
          </a>
        </div>
      )}

    </nav>
  )
}

export default Navbar