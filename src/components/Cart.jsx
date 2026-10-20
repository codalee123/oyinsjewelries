import { Heart, X, Minus, Plus, MoveRight } from "lucide-react"
import { supabase } from "../lib/supabase"
import { useState } from "react"
function Cart({ cart, setCart, setIsCartOpen }) {

  const [checkingStock, setCheckingStock] = useState(false)
  const [stockError, setStockError] = useState("")
  
  const total = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  )

  const orderMessage = cart
    .map(
      (product, index) =>
        `${index + 1}. ${product.name}
Quantity: ${product.quantity}
Price: ₦${(product.price * product.quantity).toLocaleString()}`
    )
    .join("\n\n")

  const message = `Hello, I would like to place an order.

${orderMessage}

Total: ₦${total.toLocaleString()}

Thank you.`



async function handleWhatsAppCheckout() {
  setCheckingStock(true)
  setStockError("")

  try {
    const productIds = cart.map((product) => product.id)

    const { data: latestProducts, error } = await supabase
      .from("products")
      .select("id, name, price, in_stock")
      .in("id", productIds)

    if (error) throw error

    const unavailableProducts = cart.filter((cartProduct) => {
      const latestProduct = latestProducts.find(
        (product) => product.id === cartProduct.id
      )

      return !latestProduct || !latestProduct.in_stock
    })

    if (unavailableProducts.length > 0) {
      setStockError(
        `Please remove unavailable products before checkout: ${unavailableProducts
          .map((product) => product.name)
          .join(", ")}.`
      )
      setCheckingStock(false)
      return
    }

    // Use current database prices, not potentially outdated cart prices.
    const currentCart = cart.map((cartProduct) => {
      const latestProduct = latestProducts.find(
        (product) => product.id === cartProduct.id
      )

      return {
        ...cartProduct,
        name: latestProduct.name,
        price: Number(latestProduct.price),
      }
    })

    const orderMessage = currentCart
      .map(
        (product, index) =>
          `${index + 1}. ${product.name}
Quantity: ${product.quantity}
Price: ₦${(
            product.price * product.quantity
          ).toLocaleString()}`
      )
      .join("\n\n")

    const total = currentCart.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    )

    const message = `Hello, I would like to place an order.

${orderMessage}

Total: ₦${total.toLocaleString()}

Thank you.`

    const phoneNumber = "2348108161055"

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`

    window.open(whatsappUrl, "_blank")
  } catch (error) {
    setStockError(
      "We couldn't verify product availability. Please try again."
    )
  } finally {
    setCheckingStock(false)
  }
}


  return (
    <>
      {/* Dark background behind the cart */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      />

      {/* Cart panel */}
      <section className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-brand-cream shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-brand-pink px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-rose">
              Oyinsjewelries
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-brand-burgundy">
              Your Cart ({cart.reduce((sum, product) => sum + product.quantity, 0)})
            </h2>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-pink text-xl text-brand-burgundy transition hover:bg-brand-burgundy hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart content */}
        <div className="flex-1 overflow-y-auto px-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <Heart
                size={48}
                strokeWidth={1.5}
                className="text-brand-rose"
              />

              <h3 className="mt-4 text-xl font-bold text-brand-burgundy">
                Your cart is waiting
              </h3>

              <p className="mt-2 text-gray-500">
                You haven't added any beautiful pieces yet.
              </p>

              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 rounded-full bg-brand-burgundy px-7 py-3 font-semibold text-white transition hover:bg-brand-rose"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="divide-y divide-brand-pink">
              {cart.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 py-5"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-24 w-24 rounded-2xl bg-brand-pink object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-rose">
                      {product.category}
                    </p>

                    <h3 className="mt-1 font-bold text-brand-burgundy">
                      {product.name}
                    </h3>

                    <p className="mt-1 font-semibold text-gray-800">
                      ₦{(product.price * product.quantity).toLocaleString()}
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => {
                          setCart((previousCart) =>
                            previousCart
                              .map((item) =>
                                item.id === product.id
                                  ? {
                                      ...item,
                                      quantity: item.quantity - 1,
                                    }
                                  : item
                              )
                              .filter((item) => item.quantity > 0)
                          )
                        }}
                        aria-label={`Decrease ${product.name} quantity`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-rose/40 text-brand-burgundy transition hover:bg-brand-pink"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="min-w-4 text-center font-semibold">
                        {product.quantity}
                      </span>

                      <button
                        onClick={() => {
                          setCart((previousCart) =>
                            previousCart.map((item) =>
                              item.id === product.id
                                ? {
                                    ...item,
                                    quantity: item.quantity + 1,
                                  }
                                : item
                            )
                          )
                        }}
                        aria-label={`Increase ${product.name} quantity`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-rose/40 text-brand-burgundy transition hover:bg-brand-pink"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        setCart((previousCart) =>
                          previousCart.filter(
                            (item) => item.id !== product.id
                          )
                        )
                      }}
                      className="mt-3 text-sm font-medium text-brand-rose underline underline-offset-4 hover:text-brand-burgundy"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order summary */}
        {cart.length > 0 && (
          <div className="border-t border-brand-pink bg-white px-6 py-6">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-600">
                Subtotal
              </span>

              <span className="text-2xl font-extrabold text-brand-burgundy">
                ₦{total.toLocaleString()}
              </span>
            </div>

            <p className="mt-2 text-xs text-gray-500">
              Delivery details can be confirmed on WhatsApp.
            </p>

            {stockError && (
              <p role="alert" className="mt-3 text-sm text-red-600">
                {stockError}
              </p>
            )}

            
            <button
              onClick={handleWhatsAppCheckout}
              disabled={checkingStock}
              className="mt-5 w-full rounded-full bg-brand-burgundy py-4 font-bold text-white transition duration-300 hover:bg-brand-rose disabled:cursor-not-allowed disabled:opacity-60"
            >
              {checkingStock ? (
                  "Checking availability..."
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Order via WhatsApp
                    <MoveRight size={18} />
                  </span>
                )}
            </button>
          
          </div>
        )}
      </section>
    </>
  )
}

export default Cart