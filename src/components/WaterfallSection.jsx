import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useResponsive } from '../hooks/useResponsive'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const WaterfallSection = () => {
  const videoWrapRef = useRef(null)
  const scopeRef = useRef(null)
  const pinRef = useRef(null)
  const bushesRef = useRef(null)
  const sceneRef = useRef(null)
  const { isSmallerDevice } = useResponsive()

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: '+=1500',
          pin: true,
          scrub: 2,
        },
      })

      gsap.set(bushesRef.current, { yPercent: 100 })
      gsap.set(sceneRef.current, { opacity: 0 })

      tl.to(bushesRef.current, { yPercent: -20, duration: 1, ease: 'power2.inOut' })
        .to(sceneRef.current, { opacity: 1, duration: 1, ease: 'power2.inOut' }, '<')
        .to(bushesRef.current, { yPercent: 140, duration: 1, ease: 'power2.inOut' })
        .to(videoWrapRef.current, { opacity: 0, duration: 0.1, ease: 'power2.inOut' }, '<')
    },
    { scope: scopeRef },
  )

  return (
    <div ref={scopeRef} className="relative w-screen overflow-hidden">
      <div
        ref={pinRef}
        className="relative w-full overflow-hidden min-h-screen"
        style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
      >
        <div ref={videoWrapRef} className="relative w-full h-full z-60">
          <div className="absolute inset-x-0 inset-0 w-full h-full bg-linear-to-b from-white via-transparent via-40% to-transparent z-60 -translate-y-px" />
          <video
            src="/videos/waterfall-3.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full pointer-events-none object-cover"
          />
        </div>

        <img
          ref={bushesRef}
          src="/images/home/bushes.webp"
          alt=""
          className="absolute inset-x-0 top-0 w-full object-cover object-top z-65"
          style={{ height: 'calc(var(--vh, 1vh) * 160)' }}
        />

        <div ref={sceneRef} className="absolute inset-0 w-full h-full z-40">
          {!isSmallerDevice && (
            <>
              <img
                src="/images/home/banner-tree-left.webp"
                alt=""
                className="absolute bottom-0 w-1/2 h-full object-contain object-left z-41 brightness-75 scale-[1.3] xl:scale-[1.1]"
              />
              <img
                src="/images/home/banner-tree-right.webp"
                alt=""
                className="absolute bottom-0 right-0 w-1/2 h-full object-contain object-right z-41 brightness-75 scale-[1.3] xl:scale-[1.1]"
              />
            </>
          )}
          <img
            src="/images/home/bottle-bg.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover lg:object-contain z-40"
          />
          <img
            src="/images/home/hero-back.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-contain z-39"
          />
          <div className="absolute inset-0 w-full h-full bg-linear-to-r from-black/80 via-transparent to-transparent z-41" />
          <div className="absolute inset-0 w-full h-full bg-linear-to-l from-black/80 via-transparent to-transparent z-41" />
          <img
            src="/lightLogo.png"
            alt="Arola logo"
            className="absolute left-1/2 -translate-x-[40%] top-1/3 w-24 object-contain z-41"
          />
          <img
            src="/images/home/banner-bush.png"
            alt=""
            className="absolute -bottom-[15%] left-[0%] w-[40%] object-contain object-top z-41"
          />
          <img
            src="/images/home/negazirana-bush-bottom.png"
            alt=""
            className="absolute -bottom-[10%] lg:-bottom-[15%] left-1/2 -translate-x-1/2 w-[100%] lg:w-[40%] object-contain object-top z-41"
          />
          <img
            src="/images/home/banner-bush.png"
            alt=""
            className="absolute -bottom-[15%] right-[0%] w-[40%] object-contain object-top z-41"
          />
          {!isSmallerDevice && (
            <img
              src="/images/home/waterfall.gif"
              alt=""
              className="absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 size-16 object-contain z-41"
            />
          )}
          <img
            src="/images/home/butterfly.gif"
            alt=""
            className="absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 size-60 lg:size-80 object-contain z-41"
          />
        </div>
      </div>
    </div>
  )
}

export default WaterfallSection
