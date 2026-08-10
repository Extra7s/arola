import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { sparklingWaterLists } from '../data/products'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const NatureSipSection = () => {
  const bottleRef = useRef(null)
  const scopeRef = useRef(null)
  const product = sparklingWaterLists[0]

  useGSAP(
    () => {
      gsap.from(bottleRef.current, {
        yPercent: 100,
        duration: 0.8,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: scopeRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      })
    },
    { scope: scopeRef },
  )

  return (
    <div ref={scopeRef} className="w-screen h-screen relative overflow-x-clip">
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/home/bush-bg.jpg"
          alt="bush background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[80vw] lg:w-[40vw] flex justify-center items-center">
        <img
          src="/images/home/imuno-deblo.png"
          alt="trunk background"
          className="w-full absolute top-1/2 -translate-y-1/2 -left-[10%] z-10"
        />
        <img
          src="/images/home/imuno-deblo-over.png"
          alt="trunk background"
          className="w-full absolute top-[30%] -left-[1%] z-30"
        />
        <div ref={bottleRef} className="absolute w-[70%] left-[13%] z-20">
          <img
            src={product.image}
            alt={product.name}
            className="h-full object-contain brightness-125"
          />
        </div>
        <img
          src="/images/home/imuno-grana.png"
          alt="trunk background"
          className="absolute left-0 lg:-left-[20%] w-[40vw] lg:w-[20vw] z-10"
        />
        <img
          src="/images/home/lijana.png"
          alt="trunk background"
          className="absolute right-0 lg:-right-[20%] w-[40vw] lg:w-[20vw] z-10"
        />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[20%] z-60 whitespace-nowrap text-white">
        <h3 className="text-4xl font-bold tracking-tighter uppercase font-poppins-bold">
          {product.name}
        </h3>
      </div>
      <img
        src="/images/home/about2-text.png"
        alt=""
        className="absolute -bottom-[15%] -left-[10%] w-[50vw] z-60"
      />
      <img
        src="/images/home/about3-text3.png"
        alt=""
        className="absolute -bottom-[30%] -right-[5%] w-[25%] z-60"
      />
      <img
        src="/images/home/about3-text3.png"
        alt=""
        className="absolute -bottom-[30%] right-[0%] w-[25%] z-60"
      />
      <img
        src="/images/home/about2-text.png"
        alt=""
        className="absolute -bottom-[15%] left-[12%] w-[50%] z-60 pointer-events-none"
      />
      <img
        src="/images/home/about2-text.png"
        alt=""
        className="absolute -bottom-[15%] right-[10%] w-[50%] z-55 pointer-events-none"
      />
      <img
        src="/images/home/about2-text.png"
        alt=""
        className="absolute -bottom-[15%] -right-[10%] w-[50%] z-55 pointer-events-none"
      />
    </div>
  )
}

export default NatureSipSection
