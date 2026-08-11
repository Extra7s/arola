import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { catalog } from '../data/catalog'

const CollectionsGrid = () => {
  const scopeRef = useRef(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.collection-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: scopeRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    },
    { scope: scopeRef },
  )

  return (
    <section ref={scopeRef} className="h-auto py-8 lg:py-16">
      <div className="mb-16 space-y-4 text-center">
        <h1 className="text-primary text-5xl leading-wider lg:text-5xl">
          Arola Water Collections
        </h1>
        <p className="text-base">
          Explore our range of pristine water <br />
          products, sourced from nature and bottled with care.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        {catalog.map((product) => (
          <div key={product.slug} className="collection-card">
            <div className="group relative block h-full overflow-hidden transition-all duration-300">
              <Link to={`/products/${product.slug}`}>
                <div className="relative flex h-80 cursor-pointer items-center justify-center rounded-2xl border-2 border-transparent bg-zinc-50 transition-all duration-300 hover:border-blue-900 lg:h-120">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="z-10 h-full w-full object-contain transition-transform duration-1000 transform group-hover:scale-110"
                  />
                </div>
              </Link>
              <div className="relative z-10 p-4">
                <div className="flex h-fit flex-col items-center justify-center gap-2 overflow-hidden">
                  <h2 className="text-primary hover:text-primary/80 flex items-center justify-between text-xl font-bold transition-colors">
                    {product.name}
                  </h2>
                  <p className="text-xl font-semibold">${product.price}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CollectionsGrid