import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const ScrollRevealText = ({ text, className = '', pClassName = '' }) => {
  const scopeRef = useRef(null)
  const paragraphRef = useRef(null)

  useGSAP(
    () => {
      if (!paragraphRef.current) return
      const words = paragraphRef.current.querySelectorAll('.word')
      gsap.fromTo(
        words,
        { opacity: 0.2 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: scopeRef.current,
            start: 'top 90%',
            end: 'bottom 45%',
            scrub: true,
          },
        },
      )
    },
    { scope: scopeRef, dependencies: [text] },
  )

  return (
    <div ref={scopeRef} className={`w-full ${className}`}>
      <p
        ref={paragraphRef}
        className={`text-white text-lg md:text-xl font-light leading-relaxed ${pClassName}`}
      >
        {text.split(' ').map((word, index) => (
          <span key={index} className="word inline-block select-none">
            {word}&nbsp;
          </span>
        ))}
      </p>
    </div>
  )
}

export default ScrollRevealText
