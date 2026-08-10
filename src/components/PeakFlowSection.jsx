import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { mineralWaterLists } from '../data/products'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const PeakFlowSection = () => {
  const scopeRef = useRef(null)
  const branchRef = useRef(null)
  const product = mineralWaterLists[0]

  useGSAP(
    () => {
      if (!branchRef.current) return
      gsap.to(branchRef.current, {
        yPercent: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: scopeRef.current,
          start: 'top 70%',
          end: 'bottom top',
          scrub: true,
        },
      })
    },
    { scope: scopeRef },
  )

  return (
    <div
      ref={scopeRef}
      className="h-[140vh] lg:min-h-[200vh] w-screen relative bg-black overflow-x-clip"
    >
      <img
        src="/images/home/vitaminska-bush-bottom.png"
        alt=""
        className="absolute -top-28 -left-[10%] w-[40%] z-30 pointer-events-none"
      />
      <img
        src="/images/home/vitaminska-bush-bottom.png"
        alt=""
        className="absolute -top-28 left-[12%] w-[40%] z-30 pointer-events-none"
      />
      <img
        src="/images/home/vitaminska-bush-bottom.png"
        alt=""
        className="absolute -top-28 -right-[10%] w-[40%] z-30 pointer-events-none"
      />
      <img
        src="/images/home/vitaminska-bush-bottom.png"
        alt=""
        className="absolute -top-28 right-[24%] w-[40%] z-30 pointer-events-none"
      />
      <img
        ref={branchRef}
        src="/images/home/stream-branch.png"
        alt=""
        className="absolute inset-0 -translate-x-[20%] lg:translate-x-0 brightness-150 z-29"
      />
      <img
        src="/images/home/banner-tree-left.webp"
        alt=""
        className="hidden lg:block absolute top-0 -left-[20%] z-29"
      />
      <img
        src="/images/home/about3-text3.png"
        alt=""
        className="absolute -right-[5%] w-[30%] top-0 z-29"
      />
      <img
        src="/images/home/about3-text3.png"
        alt=""
        className="absolute -right-[5%] -translate-x-[20%] w-[30%] top-[30%] z-28 scale-x-[-1]"
      />
      <img
        src="/images/home/stream.png"
        alt=""
        className="absolute w-full h-full inset-0 lg:brightness-150 object-cover lg:object-contain"
      />
      <img
        src="/images/home/vitaminska-rock.png"
        alt=""
        className="absolute bottom-0 left-1/2 -translate-x-1/2 brightness-125 w-[50vw] lg:w-[30vw] z-29"
      />
      <img
        src="/images/home/moss.png"
        alt=""
        className="absolute bottom-0 lg:bottom-[5%] -left-[10%] brightness-125 w-[70vw] lg:w-[50vw] z-27"
      />
      <img
        src="/images/home/trava.png"
        alt=""
        className="absolute bottom-0 -left-[20%] w-[70vw] lg:w-[50vw] brightness-75 z-26"
      />
      <img
        src="/images/home/vitaminska-fern.png"
        alt=""
        className="absolute bottom-0 left-1/2 -translate-x-1/2 brightness-125 w-screen lg:w-[70vw] z-28"
      />
      <img
        src="/images/home/negazirana-bush-right.png"
        alt=""
        className="absolute bottom-0 right-0 w-[50vw] z-31"
      />
      <img
        src="/images/home/imuno-zbun2.png"
        alt=""
        className="absolute -bottom-[15%] left-1/2 -translate-x-1/2 w-[50vw] z-60"
      />
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
        className="absolute -bottom-[10%] lg:-bottom-[15%] left-0 lg:left-[12%] w-full lg:w-[50%] z-60 pointer-events-none"
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
      <div className="absolute bottom-[4%] lg:bottom-[8%] left-1/2 -translate-x-1/2 z-50 w-[80vw] md:h-[70vh] lg:w-[40vw] flex items-center justify-center pointer-events-none mt-16">
        <div className="relative flex items-center justify-center h-full">
          <img
            src={product.image}
            alt={product.name}
            className="h-full object-contain brightness-125"
          />
        </div>
      </div>
      <div className="absolute -bottom-[22%] lg:-bottom-[20%] z-65 h-full w-full flex items-center justify-center pointer-events-none">
        <div className="absolute left-1/2 -translate-x-1/2 top-[70%] whitespace-nowrap text-white">
          <h3 className="text-4xl font-bold tracking-tighter uppercase font-poppins-bold">
            {product.name}
          </h3>
        </div>
      </div>
    </div>
  )
}

export default PeakFlowSection
