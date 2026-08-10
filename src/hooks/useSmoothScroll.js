import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const instance = new Lenis({ lerp: 0.1, smoothWheel: true })

    instance.on('scroll', ScrollTrigger.update)

    const raf = (time) => instance.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    setLenis(instance)

    return () => {
      gsap.ticker.remove(raf)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return lenis
}

export function useViewportHeight() {
  useEffect(() => {
    const setVh = () =>
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
    setVh()
    window.addEventListener('resize', setVh)
    return () => window.removeEventListener('resize', setVh)
  }, [])
}
