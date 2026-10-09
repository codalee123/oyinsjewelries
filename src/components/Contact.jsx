import { MessageCircleMore } from "lucide-react"
function Contact() {
  const phoneNumber = "2348130782284"
  const message = encodeURIComponent(
    "Hello Oyinsjewelries, I would like to make an enquiry about a product before proceeding to pay."
  )

  return (
    <section
      id="contact"
      className="bg-brand-burgundy px-6 py-16 text-white md:px-12 md:py-20"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-pink-200">
          We'd love to hear from you
        </p>

        <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
          Let's find your next favorite piece.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl leading-7 text-pink-100">
          Have a question about a product or need help with an order?
          Send us a message, and let's help you find what you're looking for.
        </p>

        <a
          href={`https://wa.me/${phoneNumber}?text=${message}`}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-semibold text-brand-burgundy transition hover:bg-brand-pink"
        >
          <span className="inline-flex items-center gap-2">
            Chat with us on WhatsApp
            <MessageCircleMore size={20} />
          </span>
        </a>
      </div>
    </section>
  )
}

export default Contact