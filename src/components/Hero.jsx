
// import { useState, useEffect } from "react"
// import { ArrowRight } from "lucide-react"

// const heroImages = [
//   {
//     src: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=85",
//     alt: "Elegant gold jewelry",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",
//     alt: "Classic wristwatch",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85",
//     alt: "Beautiful necklace",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85",
//     alt: "Statement earrings",
//   },
// ]

// function Hero() {
//   const [activeImage, setActiveImage] = useState(0)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveImage((currentImage) =>
//         (currentImage + 1) % heroImages.length
//       )
//     }, 10000)

//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <section
//       id="home"
//       className="overflow-hidden bg-brand-pink px-6 py-12 md:px-12 md:py-20"
//     >
//       <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
//         {/* Hero text */}
//         <div>
//           <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-brand-rose">
//             Your style, your statement
//           </p>

//           <h1 className="max-w-xl text-4xl font-extrabold leading-tight text-brand-burgundy sm:text-5xl lg:text-6xl">
//             Jewelry that makes you
//             <span className="text-brand-rose"> shine.</span>
//           </h1>

//           <p className="mt-6 max-w-lg text-base leading-7 text-gray-700 md:text-lg">
//             Discover beautiful watches and timeless jewelry
//             designed to make every moment and every outfit special.
//           </p>

//           <a
//             href="#shop"
//             className="mt-8 inline-flex items-center gap-3 rounded-full bg-brand-burgundy px-7 py-4 font-semibold text-white transition duration-300 hover:bg-brand-rose"
//           >
//             Shop Collection
//             <ArrowRight size={20} />
//           </a>
//         </div>

//         {/* Automatic image slider */}
//         <div className="relative">
//           <div className="relative h-[350px] overflow-hidden rounded-[2rem] bg-white shadow-xl md:h-[520px]">
//             {heroImages.map((image, index) => (
//               <img
//                 key={image.src}
//                 src={image.src}
//                 alt={image.alt}
//                 className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
//                   activeImage === index
//                     ? "z-10 opacity-100"
//                     : "z-0 opacity-0"
//                 }`}
//               />
//             ))}

//             {/* Decorative label */}
//             <div className="absolute bottom-5 left-5 z-20 rounded-2xl bg-brand-cream/95 px-5 py-4 shadow-lg">
//               <p className="text-xs font-semibold uppercase tracking-widest text-brand-rose">
//                 Made to stand out
//               </p>
//               <p className="mt-1 text-lg font-bold text-brand-burgundy">
//                 Find your sparkle
//               </p>
//             </div>
//           </div>

//           {/* Slider navigation dots */}
//           <div className="mt-5 flex justify-center gap-3">
//             {heroImages.map((image, index) => (
//               <button
//                 key={image.src}
//                 onClick={() => setActiveImage(index)}
//                 aria-label={`Show image ${index + 1}`}
//                 aria-current={activeImage === index ? "true" : undefined}
//                 className={`h-3 rounded-full transition-all duration-300 ${
//                   activeImage === index
//                     ? "w-8 bg-brand-burgundy"
//                     : "w-3 bg-brand-rose/40 hover:bg-brand-rose"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default 




import HeroVideo from "../assets/videos/Hero-video.mp4"
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