import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Link } from 'react-router-dom'
import AnimatedButton from './AnimatedButton'
import { catalog } from '../data/catalog'

const ProductShowcase = () => {
  const scopeRef = useRef(null)
  const bottleRef = useRef(null)
  const infoRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const product = catalog[index]

  useGSAP(
    () => {
      const from = direction >= 0 ? 500 : -500
      const rotate = direction >= 0 ? 15 : -15

      gsap.fromTo(
        bottleRef.current,
        { x: from, opacity: 0, rotate, scale: 0.8 },
        { x: 0, opacity: 1, rotate: 0, scale: 1, duration: 1.2, ease: 'power3.out' },
      )
      gsap.fromTo(
        infoRef.current,
        { x: direction >= 0 ? 20 : -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      )
    },
    { scope: scopeRef, dependencies: [index] },
  )

  const select = (next) => {
    if (next === index) return
    setDirection(next > index ? 1 : -1)
    setIndex(next)
  }

  return (
    <section
      ref={scopeRef}
      className="relative h-auto lg:min-h-dvh flex items-center overflow-x-hidden bg-linear-to-br from-[#002684] to-primary"
    >

      <div className="w-full flex flex-col lg:flex-row justify-between gap-4 lg:gap-12 items-center py-8 lg:py-16">
        <div className="w-full relative flex items-center justify-center h-full">
          <div className="relative z-10 w-full h-[45vh] md:h-[50vh] lg:h-[70vh] flex items-center justify-center">
            <img
              ref={bottleRef}
              key={product.slug}
              src={product.image}
              alt={product.name}
              className="h-full object-contain"
            />
          </div>
        </div>

        <div className="w-full text-white z-10 text-center">
          <div ref={infoRef} className="space-y-6">
            <div className="space-y-2">
              <span className="text-blue-400 font-bold uppercase tracking-widest text-xs md:text-sm">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-7xl leading-tight">{product.name}</h1>
            </div>
            <p className="hidden lg:block text-lg text-zinc-100 max-w-md mx-auto leading-relaxed">
              {product.desc}
            </p>
            <div className="space-y-8 pt-4 border-t border-white/20">
              <div className="flex items-center gap-6 justify-center">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-widest text-zinc-100 font-bold">Price</p>
                  <p className="text-xl md:text-2xl lg:text-3xl font-bold">${product.price}</p>
                </div>
                <div className="h-10 w-px bg-white/10" />
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-widest text-zinc-100 font-bold">Size</p>
                  <p className="text-lg font-bold">{product.size}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to={`/products/${product.slug}`}>
                  <AnimatedButton
                    label="View Details"
                    className="bg-transparent border-2 border-white hover:border-primary/40"
                    layerBgClassName="bg-white"
                    topTextClassName="text-white"
                    bottomTextClassName="text-primary"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-3 place-items-center gap-6 items-end justify-evenly z-20">
          {catalog.map((item, itemIndex) => (
            <button
              key={item.slug}
              onClick={() => select(itemIndex)}
              onMouseEnter={(event) => gsap.to(event.currentTarget, { scale: 1.1, duration: 0.25 })}
              onMouseLeave={(event) => gsap.to(event.currentTarget, { scale: 1, duration: 0.25 })}
              className={`relative size-16 lg:size-24 rounded-full border-2 transition-all duration-300 flex items-center justify-center overflow-hidden group cursor-pointer ${
                index === itemIndex
                  ? 'border-white shadow-2xl bg-white/50 shadow-white/10 p-px lg:p-2'
                  : 'border-white/10 hover:border-white/30 p-2 lg:p-4 bg-white/5'
              }`}
            >
              <img
                src={item.image}
                alt={item.name}
                className={`w-full h-full object-contain filter drop-shadow-lg transition-all duration-500 ${
                  index === itemIndex ? 'scale-110 rotate-6' : ''
                }`}
              />
              {index === itemIndex && (
                <div className="absolute inset-0 bg-white/5 pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase
