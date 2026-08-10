import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const ScrollDownIndicator = () => {
  const indicatorRef = useRef(null)

  useGSAP(() => {
    let timeoutId
    let enabled = false

    const show = () => {
      if (!enabled) return
      const footer = document.querySelector('#footer')
      if (footer && footer.getBoundingClientRect().top < window.innerHeight + 10) return
      gsap.to(indicatorRef.current, {
        opacity: 1,
        y: 0,
        pointerEvents: 'auto',
        duration: 0.5,
        ease: 'power2.out',
        overwrite: true,
      })
    }

    const hide = () => {
      gsap.to(indicatorRef.current, {
        opacity: 0,
        y: 10,
        pointerEvents: 'none',
        duration: 0.2,
        ease: 'power2.inOut',
        overwrite: true,
      })
    }

    const onScroll = () => {
      if (!enabled) return
      hide()
      clearTimeout(timeoutId)
      timeoutId = setTimeout(show, 200)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    const updateTrigger = ScrollTrigger.create({ onUpdate: onScroll })

    const aboutTrigger = ScrollTrigger.create({
      trigger: '#about',
      start: 'top 80%',
      onEnter: () => {
        enabled = true
        show()
      },
      onLeaveBack: () => {
        enabled = false
        hide()
      },
    })

    const footerTrigger = ScrollTrigger.create({
      trigger: '#footer',
      start: 'top bottom',
      onUpdate: (self) => {
        if (self.isActive || self.progress > 0) {
          clearTimeout(timeoutId)
          hide()
        }
      },
      onEnter: () => {
        clearTimeout(timeoutId)
        hide()
      },
      onLeaveBack: () => {
        if (enabled) timeoutId = setTimeout(show, 200)
      },
    })

    gsap.set(indicatorRef.current, { opacity: 0, y: 10 })

    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timeoutId)
      updateTrigger.kill()
      aboutTrigger.kill()
      footerTrigger.kill()
    }
  })

  return (
    <div
      ref={indicatorRef}
      onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      className="fixed bottom-12 left-1/2 -translate-x-1/2 z-300 flex flex-col items-center gap-3 cursor-pointer group mix-blend-difference"
    >
      <div className="flex flex-col items-center">
        <span className="text-white text-xs tracking-[0.3em] uppercase">Scroll Down</span>
      </div>
    </div>
  )
}

export default ScrollDownIndicator
