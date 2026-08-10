import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useResponsive } from '../hooks/useResponsive'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const BottleIntro = () => {
  const scopeRef = useRef(null)
  const sectionRef = useRef(null)
  const capFrontRef = useRef(null)
  const capBackRef = useRef(null)
  const wrapperRef = useRef(null)
  const bottleRef = useRef(null)
  const { isMobile, isTablet } = useResponsive()

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: isMobile ? '+=450%' : isTablet ? '+=400%' : '+=450%',
          scrub: 2,
          pin: true,
          pinSpacing: false,
          onRefresh: (self) => {
            const spacer = self.pinSpacer || sectionRef.current?.parentNode
            spacer?.style?.setProperty('pointer-events', 'none', 'important')
          },
        },
      })

      gsap.set([capFrontRef.current, capBackRef.current], { yPercent: 75 })
      gsap.set(wrapperRef.current, { yPercent: 30 })

      tl.to(capFrontRef.current, { yPercent: -300, duration: 2, ease: 'power2.out' })
        .to(capBackRef.current, { yPercent: -300, duration: 2, ease: 'power2.out' }, '<')
        .to(bottleRef.current, { yPercent: 30, duration: 2, ease: 'power2.out' }, '<')
        .to(wrapperRef.current, { duration: 2, ease: 'power2.out' }, '<')
        .to(capFrontRef.current, { yPercent: 75, duration: 2, ease: 'power2.out' })
        .to(capBackRef.current, { yPercent: 75, duration: 2, ease: 'power2.out' }, '<')
        .to(bottleRef.current, { yPercent: 0, duration: 2, ease: 'power2.out' }, '<')
        .to(wrapperRef.current, { yPercent: 0, scale: 1.2, duration: 2, ease: 'power2.inOut' })
        .to(capBackRef.current, { opacity: 0, ease: 'power2.out' }, '<')
        .to(wrapperRef.current, { yPercent: -10, duration: 2, ease: 'power2.out' })
        .to(wrapperRef.current, { yPercent: 10, duration: 2, ease: 'power2.out' })
        .to(wrapperRef.current, {
          yPercent: 30,
          scale: 0.8,
          duration: 2,
          delay: 3,
          ease: 'power2.out',
        })
        .to(wrapperRef.current, { opacity: 0, duration: 0.5 }, '<0.5')
    },
    { scope: scopeRef },
  )

  return (
    <div ref={scopeRef} className="relative z-100">
      <section
        ref={sectionRef}
        className="absolute top-0 w-full h-screen overflow-hidden pointer-events-none select-none"
      >
        <div
          ref={wrapperRef}
          className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none select-none"
        >
          <div className="relative w-[9.6%] lg:w-[4.8%]">
            <img ref={capFrontRef} src="/images/bottle/cap_01.png" alt="cap" className="z-30 relative" />
            <img
              ref={capBackRef}
              src="/images/bottle/cap_02.png"
              alt="cap"
              className="z-10 absolute inset-0"
            />
          </div>
          <img
            ref={bottleRef}
            src="/images/bottle/Bottle_01.png"
            alt="bottle"
            className="w-[16%] lg:w-[8%] z-20 relative"
          />
        </div>
      </section>
    </div>
  )
}

export default BottleIntro
