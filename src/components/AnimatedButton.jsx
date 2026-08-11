import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const AnimatedButton = ({
  label,
  as = 'button',
  className = '',
  layerBgClassName = 'bg-white',
  topTextClassName = 'text-white',
  bottomTextClassName = 'text-primary',
  onClick,
}) => {
  const rootRef = useRef(null)
  const layerRef = useRef(null)
  const timeline = useRef(null)

  const { contextSafe } = useGSAP(
    () => {
      const top = rootRef.current.querySelectorAll('[data-char="top"]')
      const bottom = rootRef.current.querySelectorAll('[data-char="bottom"]')

      // Explicit starting state for every animated element, set once here --
      // nothing is left for GSAP to infer from a static CSS class.
      gsap.set(layerRef.current, { yPercent: 105 })
      gsap.set(top, { yPercent: 0 })
      gsap.set(bottom, { yPercent: 100 })

      // Built once, paused. play()/reverse() on hover -- same proven
      // pattern as AnimatedText.jsx. This guarantees a single consistent
      // end state in either direction, instead of three independent tweens
      // that could each be interrupted or overlap unpredictably.
      timeline.current = gsap
        .timeline({ paused: true, defaults: { ease: 'power3.out', duration: 0.5 } })
        .to(layerRef.current, { yPercent: 0, duration: 0.4, ease: 'power2.inOut' }, 0)
        .to(top, { yPercent: -100, stagger: 0.015 }, 0)
        .to(bottom, { yPercent: 0, stagger: 0.015 }, 0)
    },
    { scope: rootRef },
  )

  const enter = contextSafe(() => timeline.current?.play())
  const leave = contextSafe(() => timeline.current?.reverse())

  const Tag = as

  return (
    <Tag
      ref={rootRef}
      {...(as === 'button' ? { type: 'button' } : {})}
      onClick={onClick}
      onMouseEnter={enter}
      onMouseLeave={leave}
      className={`group relative overflow-hidden backdrop-blur-2xl rounded-full transition-all duration-500 w-fit px-8 py-3 select-none text-base cursor-pointer ${className}`}
    >
      <div ref={layerRef} className={`absolute inset-0 ${layerBgClassName}`} />
      <div className="relative z-10 flex items-center justify-center overflow-hidden">
        {label.split('').map((char, index) => (
          <div key={`${char}-${index}`} className="relative flex flex-col overflow-hidden">
            <span data-char="top" className={`inline-block ${topTextClassName}`}>
              {char === ' ' ? '\u00A0' : char}
            </span>
            <span data-char="bottom" className={`absolute inset-0 inline-block ${bottomTextClassName}`}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          </div>
        ))}
      </div>
    </Tag>
  )
}

export default AnimatedButton