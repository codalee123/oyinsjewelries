import HeroVideo from "../assets/videos/jewelry-video.mp4"
import { ArrowRight } from "lucide-react"
function Hero() {
  return (
    <section
      id="home"
      className="overflow-hidden bg-brand-pink px-6 py-16 md:px-12 md:py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">

        {/* Hero text */}
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-brand-rose">
            Your style, your statement
          </p>

          <h2 className="max-w-xl text-5xl font-extrabold leading-tight tracking-tight text-brand-burgundy md:text-7xl">
            Jewelry that speaks for you.
          </h2>

          <p className="mt-6 max-w-lg text-base leading-7 text-gray-700 md:text-lg">
            Discover beautiful pieces that bring elegance,
            confidence, and personality to every moment.
          </p>

          <a
            href="#shop"
            className="mt-8 inline-block rounded-full bg-brand-burgundy px-8 py-4 font-semibold text-white transition duration-300 hover:bg-brand-rose"
          >
            <span className="inline-flex items-center gap-2">
              Shop Collection
              <ArrowRight size={18} />
            </span>
          </a>

          <p className="mt-5 text-sm text-gray-600">
            Watches · Necklaces · Earrings · And more
          </p>
        </div>

        
      {/* Hero video */}
      <div className="relative">
        <div className="absolute -inset-3 rotate-3 rounded-4xl bg-brand-rose/20"></div>

        <div className="relative h-87.5 w-full overflow-hidden rounded-4xl bg-brand-burgundy shadow-xl md:h-130">
          <video
            src={HeroVideo}
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1000&q=85"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Soft overlay */}
          <div className="absolute inset-0 bg-black/15"></div>

          {/* Decorative label */}
          <div className="absolute bottom-5 left-5 rounded-2xl bg-brand-cream/95 px-5 py-4 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-rose">
              Made for your moments
            </p>
            <p className="mt-1 font-bold text-brand-burgundy">
              Find your signature style
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

export default Hero