import { ArrowRight } from "lucide-react"
import AboutVideo from "../assets/videos/About-video.mp4"
function About() {
  return (
    <section
      id="about"
      className="bg-white px-6 py-20 md:px-12 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">

        {/* About image */}
        <div className="relative">
          <div className="absolute -inset-3 -rotate-2 rounded-4xl bg-brand-pink" />

            <div className="relative h-87.5 w-full overflow-hidden rounded-4xl bg-brand-burgundy shadow-xl md:h-130">
                        <video
                          src={AboutVideo}
                          autoPlay
                          muted
                          loop
                          playsInline
                          poster="../assets/images/Classic-Earing.avif"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
              
                   {/* Soft overlay */}
                   <div className="absolute inset-0 bg-black/15"></div>

                 </div>  
        </div>

        {/* About content */}
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-rose">
            A little about us
          </p>

          <h2 className="mt-3 text-4xl font-extrabold leading-tight text-brand-burgundy md:text-5xl">
            Every piece tells a story.
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            At Oyinsjewelries, we believe the right accessory can
            add confidence, elegance, and personality to every outfit.
            Our collection brings together beautiful pieces for
            everyday moments and special occasions.
          </p>

          <p className="mt-4 leading-8 text-gray-600">
            Whether you're dressing up for a celebration or adding
            a special touch to your everyday look, we're here to help
            you find pieces that express your personal style.
          </p>

          <a
            href="#shop"
            className="mt-8 inline-block rounded-full bg-brand-burgundy px-7 py-3 font-semibold text-white transition hover:bg-brand-rose"
          >
            <span className="inline-flex items-center gap-2">
              Explore Our Collection
              <ArrowRight size={18} />
            </span>
          </a>
        </div>

      </div>
    </section>
  )
}

export default About