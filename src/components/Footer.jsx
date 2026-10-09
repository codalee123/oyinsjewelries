import { ArrowUp } from "lucide-react"
function Footer() {
  return (
    <footer className="bg-brand-cream px-6 py-8 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 border-t border-brand-pink pt-8 sm:flex-row">
        <div className="text-center sm:text-left">
          <a
            href="#home"
            className="text-xl font-bold text-brand-burgundy"
          >
            Oyinsjewelries
          </a>

          <p className="mt-2 text-sm text-gray-600">
            Beautiful pieces. Your unique style.
          </p>

          <p className="mt-3 text-xs text-gray-500">
            © {new Date().getFullYear()} Oyinsjewelries. All rights reserved.
          </p>
        </div>

        <a
          href="#home"
          className="rounded-full border border-brand-rose/30 px-5 py-3 text-sm font-semibold text-brand-burgundy transition hover:bg-brand-pink"
        >
          <span className="inline-flex items-center gap-2">
            <ArrowUp size={16} />
            Back to Top
          </span>     
        </a>
      </div>
    </footer>
  )
}

export default Footer