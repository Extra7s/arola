import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import ScrollDownIndicator from './components/ScrollDownIndicator'
import BottleIntro from './components/BottleIntro'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import SunSection from './components/SunSection'
import MountainSection from './components/MountainSection'
import CloudHeadline from './components/CloudHeadline'
import WaterfallSection from './components/WaterfallSection'
import BlueSpringSection from './components/BlueSpringSection'
import PeakFlowSection from './components/PeakFlowSection'
import NatureSipSection from './components/NatureSipSection'
import Footer from './components/Footer'
import { useSmoothScroll, useViewportHeight } from './hooks/useSmoothScroll'

const App = () => {
  const lenis = useSmoothScroll()
  useViewportHeight()

  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  return (
    <div className="relative">
      <Navbar lenis={lenis} />
      <div className="relative">
        <ScrollDownIndicator />
        <BottleIntro />
        <Hero />
        <AboutSection />
        <SunSection />
        <MountainSection />
        <CloudHeadline />
        <WaterfallSection />
        <BlueSpringSection />
        <PeakFlowSection />
        <NatureSipSection />
        <Footer />
      </div>
    </div>
  )
}

export default App
