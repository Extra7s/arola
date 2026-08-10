import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useMediaQuery } from '../hooks/useResponsive'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const Hero = () => {
  const circleRef = useRef(null)
  const scrollTextRef = useRef(null)
  const sectionRef = useRef(null)
  const welcomeRef = useRef(null)
  const isSmall = useMediaQuery('(max-width: 1000px)')

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=100%',
            scrub: 1.5,
            pin: true,
            onRefresh: (self) => {
              const spacer = self.pinSpacer || sectionRef.current?.parentNode
              spacer?.style?.setProperty('pointer-events', 'none', 'important')
            },
          },
        })
        .to(circleRef.current, {
          scale: 1.3,
          borderColor: '#002684',
          borderWidth: isSmall ? 2 : 8,
          duration: 2,
          ease: 'power2.out',
        })
        .from(
          welcomeRef.current,
          { scale: 0, transformOrigin: 'center bottom', duration: 2, ease: 'power2.out' },
          '<',
        )
        .to(
          scrollTextRef.current,
          { yPercent: 200, opacity: 0, duration: 1, ease: 'power2.out' },
          0.2,
        )
    },
    { scope: sectionRef },
  )

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative z-10 h-screen pointer-events-auto overflow-y-visible"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
        <div ref={circleRef} className="size-70 lg:size-120 rounded-full border-2 border-primary" />
      </div>
      <div
        ref={scrollTextRef}
        className="absolute top-[45%] lg:top-[40%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="uppercase text-center text-2xl font-semibold text-primary">
          Please, <br />
          scroll down
        </p>
      </div>
      <div
        ref={welcomeRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[50%] flex flex-col gap-4 justify-center items-center"
      >
        <p className="text-3xl xl:text-5xl text-primary font-semibold tracking-tight text-center uppercase">
          Welcome <br className="lg:hidden" /> to <br className="lg:hidden" /> Arola
        </p>
      </div>
    </section>
  )
}

export default Hero
