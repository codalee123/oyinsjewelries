
const categories = [
  "All",
  "Wristwatches",
  "Necklaces",
  "Earrings",
  "Bracelets",
  "Rings",
  "Hand Chains",
  "Anklets",
]

function Categories({ selectedCategory, setSelectedCategory }) {
  return (
    <section className="bg-brand-cream px-6 py-12 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-rose">
            Find your favorite
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-brand-burgundy md:text-4xl">
            Shop by category
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-5 py-3 text-sm font-semibold transition duration-300 ${
                selectedCategory === category
                  ? "border-brand-burgundy bg-brand-burgundy text-white"
                  : "border-brand-rose/30 bg-white text-brand-burgundy hover:border-brand-rose hover:bg-brand-pink"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories